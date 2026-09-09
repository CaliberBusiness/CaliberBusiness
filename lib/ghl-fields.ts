/**
 * GoHighLevel custom-field IDs.
 *
 * GHL addresses custom fields by ID, never by name. These IDs are static, not
 * secret, and were read back from the live location after the fields were
 * created -- so they are checked in as defaults rather than carried as
 * deployment config. Only the API token is a secret worth an env var.
 *
 * Each still accepts an env override, for pointing a preview build at a
 * different sub-account without a code change.
 *
 * Anything resolving to "" is omitted from the payload rather than sent blank,
 * so a bad ID costs one answer, never the whole lead.
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
    // "Company Size" and "No. of Staff Required" are dropdowns whose options
    // are stored with EN DASHES -- see toGhlRange() in lib/lead-normalize.ts.
    companySize: process.env.GHL_FIELD_COMPANY_SIZE ?? "ohOizYLdqRh5JSOr2jg6",
    staffRequired: process.env.GHL_FIELD_STAFF_REQUIRED ?? "O7fycmawxy1Ei377QWOR",
    staffCount: process.env.GHL_FIELD_STAFF_COUNT ?? "ZZBsL3gzfxBmjSN1DYj0",
    message: process.env.GHL_FIELD_MESSAGE ?? "AUL2fZm9cCG38MRVWlxl",
    smsConsent: process.env.GHL_FIELD_SMS_CONSENT ?? "VtoRSUcsHvG2exax3DUy",
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
