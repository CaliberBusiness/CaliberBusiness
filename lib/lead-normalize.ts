/**
 * Shaping the contact form's answers into what GoHighLevel will accept.
 *
 * Three separate mismatches are handled here, all of which fail silently in
 * GHL rather than erroring usefully:
 *   1. Phone must be E.164 or the write fails with a blank error.
 *   2. The standard `country` field stores ISO-3166 alpha-2, not a display name.
 *   3. The Company Size / No. of Staff Required dropdowns store their ranges
 *      with EN DASHES (U+2013). The form sends ASCII hyphens. A value outside a
 *      dropdown's option list is rejected.
 */
import { COUNTRIES } from "./countries";

/**
 * The form's option strings use "-" (U+002D); the GHL dropdowns were created
 * with "–" (U+2013). Verified against the live location -- these are real en
 * dashes, not mis-encoded text. Only the range separator differs, so a targeted
 * swap is safer than rewriting the form's values.
 */
export function toGhlRange(formValue: string): string {
    return formValue.replace(/(\d)-(\d)/g, "$1\u2013$2");
}

/** ISO-3166 alpha-2 for GHL's standard country field; "" when unknown. */
export function toIso2(countryName: string): string {
    return COUNTRIES[countryName]?.iso2 ?? "";
}

/**
 * Best-effort E.164. Returns "" when the number cannot be normalised with
 * confidence -- the caller then omits the phone entirely, which is the
 * deliberate choice: a contact without a phone is recoverable, a contact whose
 * write was rejected outright is not.
 */
export function toE164(rawPhone: string, countryName: string): string {
    const raw = rawPhone.trim();
    if (raw === "") return "";

    // Already international: keep the caller's own country code, just tidy it.
    if (raw.startsWith("+")) {
        const digits = raw.slice(1).replace(/\D/g, "");
        return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : "";
    }

    const dial = COUNTRIES[countryName]?.dial;
    if (!dial) return "";

    let digits = raw.replace(/\D/g, "");
    if (digits === "") return "";

    // "00" is the international prefix in much of the world.
    if (digits.startsWith("00")) {
        const rest = digits.slice(2);
        return rest.length >= 8 && rest.length <= 15 ? `+${rest}` : "";
    }
    // Someone typed the country code without the "+".
    if (digits.startsWith(dial) && digits.length > dial.length + 6) {
        return `+${digits}`;
    }
    // Strip a single national trunk prefix ("0") before prepending the code.
    if (digits.startsWith("0")) digits = digits.replace(/^0+/, "");
    if (digits === "") return "";

    const candidate = `${dial}${digits}`;
    return candidate.length >= 8 && candidate.length <= 15 ? `+${candidate}` : "";
}
