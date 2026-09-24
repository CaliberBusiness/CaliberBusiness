/**
 * GoHighLevel custom-field IDs for the IT Solutions form.
 *
 * Companion to lib/ghl-fields.ts, which serves the staffing form. Split
 * deliberately rather than merged: the two forms ask different questions, and
 * a shared map would have to carry every key for both and hand each route a
 * pile of blanks.
 *
 * "message" is NOT a new field. The IT form's "What isn't working right now?"
 * writes to the same GHL field the staffing form's message uses, so both land
 * in one place on the contact record.
 *
 * itService and currentTools do NOT exist in GHL yet. They are intentionally
 * empty: buildItCustomFields() drops any field with a blank ID, so an unfilled
 * placeholder costs that one answer and never the whole lead.
 */
import { GHL_FIELD_IDS, type GhlCustomField } from "./ghl-fields";

export type GhlItFieldKey = "itService" | "currentTools" | "message";

export const GHL_IT_FIELD_IDS: Readonly<Record<GhlItFieldKey, string>> = {
    // TODO(chrissa): create the "IT Service Interested In" dropdown in the GHL
    // sub-account, then paste its field ID here (or set GHL_FIELD_IT_SERVICE).
    itService: process.env.GHL_FIELD_IT_SERVICE ?? "",
    // TODO(chrissa): create the "Current Tools" single-line text field in GHL,
    // then paste its ID here (or set GHL_FIELD_IT_CURRENT_TOOLS).
    currentTools: process.env.GHL_FIELD_IT_CURRENT_TOOLS ?? "",
    // Reused from the staffing form. Already exists; nothing to create.
    message: GHL_FIELD_IDS.message,
};

/** Drop unmapped IDs and empty answers; GHL rejects blank custom values. */
export function buildItCustomFields(
    answers: Readonly<Record<GhlItFieldKey, string>>,
): GhlCustomField[] {
    return (Object.keys(GHL_IT_FIELD_IDS) as GhlItFieldKey[])
        .map((key) => ({ id: GHL_IT_FIELD_IDS[key], value: answers[key] }))
        .filter((f) => f.id !== "" && f.value !== "");
}
