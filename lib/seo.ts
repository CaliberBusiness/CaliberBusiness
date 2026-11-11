/**
 * Single source of truth for site-wide SEO values.
 *
 * Seobility limits: title <= ~65 chars (580px), description <= ~160 chars (1000px).
 */
export const SITE_URL = "https://www.caliberbusinessresource.com";

export const SITE_NAME = "Caliber Business Resource";

export const SITE_TITLE =
    "Philippines Remote Staffing & BPO | Caliber Business Resource";

export const SITE_DESCRIPTION =
    "Hire dedicated remote teams from the Philippines. Fully managed BPO staffing for customer support, data entry, accounting and tech support.";

/**
 * The shared app/opengraph-image.jpg. A page that sets its own openGraph/twitter
 * must list it, because Next.js replaces those objects instead of merging them.
 */
export const OG_IMAGE = {
    url: "/opengraph-image.jpg",
    width: 2048,
    height: 1055,
    type: "image/jpeg",
};
