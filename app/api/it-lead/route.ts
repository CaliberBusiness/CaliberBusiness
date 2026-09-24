import { NextResponse } from 'next/server';
import { buildItCustomFields, type GhlItFieldKey } from '@/lib/ghl-it-fields';

/**
 * POST /api/it-lead — the IT Solutions form's destination.
 *
 * Sibling of app/api/lead/route.ts, which serves the staffing form: same
 * security posture, same GHL-first-and-fatal / Formspree-second-and-non-fatal
 * order. Only the question set and the tags differ.
 *
 * Kept as its own route rather than a branch inside /api/lead because the two
 * forms' required fields do not overlap — /api/lead hard-requires country and
 * staffRequired, which this form never asks for.
 *
 * No phone or country here, so none of the E.164 / ISO-2 normalisation in
 * lib/lead-normalize.ts applies.
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
    email: 254,
    itService: 120,
    currentTools: 300,
    message: 1000,
};

interface ItLeadInput {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    itService: string;
    currentTools: string;
    message: string;
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
 * components/it-solutions/ITContactForm.tsx — "current tools" is
 * deliberately the one optional answer.
 */
function validate(body: Record<string, unknown>): { lead: ItLeadInput } | { error: string } {
    const lead: ItLeadInput = {
        firstName: readString(body, 'firstName'),
        lastName: readString(body, 'lastName'),
        companyName: readString(body, 'companyName'),
        email: readString(body, 'email'),
        itService: readString(body, 'itService'),
        currentTools: readString(body, 'currentTools'),
        message: readString(body, 'message'),
    };

    const missing: string[] = [];
    if (!lead.firstName) missing.push('first name');
    if (!lead.lastName) missing.push('last name');
    if (!lead.email) missing.push('work email');
    if (!lead.companyName) missing.push('company');
    if (!lead.itService) missing.push('service');
    if (!lead.message) missing.push('what is not working');
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
        console.warn('[it-lead] bot hit: honeypot filled');
        return NextResponse.json({ ok: true });
    }

    const checked = validate(body);
    if ('error' in checked) return fail(400, checked.error);
    const { lead } = checked;

    const ghlToken = process.env.GHL_PIT;
    const ghlLocationId = process.env.GHL_LOCATION_ID;
    if (!ghlToken || !ghlLocationId) {
        console.error('[it-lead] GHL_PIT or GHL_LOCATION_ID is not configured; refusing to send.');
        return fail(500, 'Form is not configured. Please email us directly.');
    }

    const answers: Record<GhlItFieldKey, string> = {
        itService: lead.itService,
        currentTools: lead.currentTools,
        message: lead.message,
    };

    const payload = {
        locationId: ghlLocationId,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        companyName: lead.companyName,
        source: 'Website IT form',
        tags: ['website-lead', 'it-lead'],
        customFields: buildItCustomFields(answers),
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
        console.error(`[it-lead] GHL unreachable (${reason})`);
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
        console.error(`[it-lead] GHL rejected contact: status=${ghlResponse.status} traceId=${traceId}`);
        return fail(502, 'We could not submit your details. Please try again.');
    }

    // Formspree keeps the email notification working. Non-fatal by design: the
    // lead is already safe in the CRM by this point. `formName` is the only
    // thing telling the two forms apart — they share one Formspree inbox.
    try {
        const formspree = await postJson(FORMSPREE_ENDPOINT, {}, {
            formName: 'IT Solutions',
            ...lead,
        });
        if (!formspree.ok) {
            console.error(`[it-lead] Formspree notification failed: status=${formspree.status}`);
        }
    } catch {
        console.error('[it-lead] Formspree notification failed: unreachable');
    }

    return NextResponse.json({ ok: true });
}

/** The form is POST-only; anything else is a probe. */
export async function GET(): Promise<NextResponse> {
    return fail(405, 'Method not allowed.');
}
