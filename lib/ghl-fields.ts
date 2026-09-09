/**
 * GoHighLevel custom-field IDs, read from the environment.
 *
 * GHL addresses custom fields by ID, never by name, and the IDs differ per
 * sub-account -- so they are configuration, not constants. They are not
 * secrets; they live in env vars only so a different GHL location can be
 * pointed at without a code change.
 *
 * Anything left unset is omitted from the payload rather than sent blank, so a
 * missing ID costs one answer, never the whole lead.
 *
 * Fields NOT listed here because GHL has a standard field for them:
 *   firstName, lastName, email, phone, companyName, country
 */
export type GhlFieldKey =
    | "companySize"
    | "staffRequired"
    | "staffCount"
    | "message"
    | "smsConsent";

export const GHL_FIELD_IDS: Readonly<Record<GhlFieldKey, string>> = {
    companySize: process.env.GHL_FIELD_COMPANY_SIZE ?? "",
    staffRequired: process.env.GHL_FIELD_STAFF_REQUIRED ?? "",
    staffCount: process.env.GHL_FIELD_STAFF_COUNT ?? "",
    message: process.env.GHL_FIELD_MESSAGE ?? "",
    smsConsent: process.env.GHL_FIELD_SMS_CONSENT ?? "",
};

export interface GhlCustomField {
    readonly id: string;
    readonly value: string;
}

/** Drop unmapped IDs and empty answers; GHL rejects blank custom values. */
export function buildCustomFields(
    answers: Readonly<Record<GhlFieldKey, string>>,
): GhlCustomField[] {
    return (Object.keys(GHL_FIELD_IDS) as GhlFieldKey[])
        .map((key) => ({ id: GHL_FIELD_IDS[key], value: answers[key] }))
        .filter((f) => f.id !== "" && f.value !== "");
}
