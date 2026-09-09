import { NextResponse } from 'next/server';
import { buildCustomFields, type GhlFieldKey } from '@/lib/ghl-fields';
import { toE164, toGhlRange, toIso2 } from '@/lib/lead-normalize';

/**
 * POST /api/lead — the contact form's destination.
 *
 * Exists so the GHL token stays server-side. The browser posts here; only this
 * route talks to GoHighLevel or Formspree. Never expose the token through a
 * NEXT_PUBLIC_ variable, which would inline it into the client bundle.
 *
 * Order is deliberate: GHL first and fatal, Formspree second and non-fatal.
 * The CRM is the system of record; the email is a convenience notification.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GHL_ENDPOINT = 'https://services.leadconnectorhq.com/contacts/upsert';
const GHL_API_VERSION = '2021-07-28';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqjnnwv';
const OUTBOUND_TIMEOUT_MS = 8000;

/** Bots fill every input they find; the visible form has no such field. */
const HONEYPOT_FIELD = 'website';

const MAX_LENGTHS: Record<string, number> = {
    firstName: 100,
    lastName: 100,
    companyName: 150,
    companySize: 60,
    phoneNumber: 30,
    email: 254,
    staffRequired: 60,
    staffCount: 10,
    country: 60,
    message: 1000,
};

interface LeadInput {
    firstName: string;
    lastName: string;
    companyName: string;
    companySize: string;
    phoneNumber: string;
    email: string;
    staffRequired: string;
    staffCount: string;
    country: string;
    message: string;
    smsConsent: boolean;
}

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(source: Record<string, unknown>, key: string): string {
    const raw = source[key];
    if (typeof raw !== 'string') return '';
    const max = MAX_LENGTHS[key];
    const trimmed = raw.trim();
    return max ? trimmed.slice(0, max) : trimmed;
}

function fail(status: number, error: string) {
    return NextResponse.json({ ok: false, error }, { status });
}

/**
 * Server-side validation. The client validates too, but that is a UX
 * affordance; this is the boundary. Mirrors the required fields in
 * components/ContactForm.tsx.
 */
function validate(body: Record<string, unknown>): { lead: LeadInput } | { error: string } {
    const lead: LeadInput = {
        firstName: readString(body, 'firstName'),
        lastName: readString(body, 'lastName'),
        companyName: readString(body, 'companyName'),
        companySize: readString(body, 'companySize'),
        phoneNumber: readString(body, 'phoneNumber'),
        email: readString(body, 'email'),
        staffRequired: readString(body, 'staffRequired'),
        staffCount: readString(body, 'staffCount'),
        country: readString(body, 'country'),
        message: readString(body, 'message'),
        smsConsent: body.smsConsent === true,
    };

    const missing: string[] = [];
    if (!lead.firstName) missing.push('first name');
    if (!lead.lastName) missing.push('last name');
    if (!lead.companyName) missing.push('company name');
    if (!lead.email) missing.push('email');
    if (!lead.staffRequired) missing.push('staff required');
    if (!lead.country) missing.push('country');
    if (!lead.message) missing.push('message');
    if (missing.length > 0) {
        return { error: `Missing required fields: ${missing.join(', ')}.` };
    }
    if (!EMAIL_PATTERN.test(lead.email)) return { error: 'Invalid email address.' };

    return { lead };
}

async function postJson(url: string, headers: HeadersInit, body: unknown): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), OUTBOUND_TIMEOUT_MS);
    try {
        return await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...headers },
            body: JSON.stringify(body),
            signal: controller.signal,
        });
    } finally {
        clearTimeout(timer);
    }
}

export async function POST(request: Request): Promise<NextResponse> {
    const body: unknown = await request.json().catch(() => null);
    if (!isRecord(body)) return fail(400, 'Malformed request.');

    // Answer a bot with success so it learns nothing, but write nowhere.
    const honeypot = body[HONEYPOT_FIELD];
    if (typeof honeypot === 'string' && honeypot.trim() !== '') {
        console.warn('[lead] bot hit: honeypot filled');
        return NextResponse.json({ ok: true });
    }

    const checked = validate(body);
    if ('error' in checked) return fail(400, checked.error);
    const { lead } = checked;

    const ghlToken = process.env.GHL_PIT;
    const ghlLocationId = process.env.GHL_LOCATION_ID;
    if (!ghlToken || !ghlLocationId) {
        console.error('[lead] GHL_PIT or GHL_LOCATION_ID is not configured; refusing to send.');
        return fail(500, 'Form is not configured. Please email us directly.');
    }

    const phone = toE164(lead.phoneNumber, lead.country);
    const iso2 = toIso2(lead.country);

    const answers: Record<GhlFieldKey, string> = {
        companySize: toGhlRange(lead.companySize),
        staffRequired: toGhlRange(lead.staffRequired),
        staffCount: lead.staffCount,
        message: lead.message,
        smsConsent: lead.smsConsent ? 'Yes' : 'No',
    };

    const payload = {
        locationId: ghlLocationId,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        companyName: lead.companyName,
        // Omit rather than send "" — GHL rejects empty strings for these.
        ...(phone ? { phone } : {}),
        ...(iso2 ? { country: iso2 } : {}),
        source: 'Website contact form',
        tags: ['website-lead', 'corporate-site'],
        customFields: buildCustomFields(answers),
    };

    let ghlResponse: Response;
    try {
        ghlResponse = await postJson(
            GHL_ENDPOINT,
            { Authorization: `Bearer ${ghlToken}`, Version: GHL_API_VERSION },
            payload,
        );
    } catch (err) {
        const reason = err instanceof Error && err.name === 'AbortError' ? 'timeout' : 'network error';
        console.error(`[lead] GHL unreachable (${reason})`);
        return fail(502, 'We could not submit your details. Please try again.');
    }

    if (!ghlResponse.ok) {
        // Read only GHL's traceId for correlation. Never log the body — it
        // echoes the submitted message and email address.
        let traceId = 'unknown';
        try {
            const parsed: unknown = await ghlResponse.json();
            if (isRecord(parsed) && typeof parsed.traceId === 'string') {
                traceId = parsed.traceId;
            }
        } catch {
            /* body was not JSON; the status code is the useful signal */
        }
        console.error(`[lead] GHL rejected contact: status=${ghlResponse.status} traceId=${traceId}`);
        return fail(502, 'We could not submit your details. Please try again.');
    }

    // Formspree keeps the email notification working. Non-fatal by design: the
    // lead is already safe in the CRM by this point.
    try {
        const formspree = await postJson(FORMSPREE_ENDPOINT, {}, {
            ...lead,
            phoneE164: phone || '(not normalised)',
        });
        if (!formspree.ok) {
            console.error(`[lead] Formspree notification failed: status=${formspree.status}`);
        }
    } catch {
        console.error('[lead] Formspree notification failed: unreachable');
    }

    return NextResponse.json({ ok: true });
}

/** The form is POST-only; anything else is a probe. */
export async function GET(): Promise<NextResponse> {
    return fail(405, 'Method not allowed.');
}
