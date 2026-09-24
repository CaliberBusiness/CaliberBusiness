/**
 * Content and feature flags for /it-solutions/.
 *
 * Everything the page repeats lives here rather than in JSX, so a copy change
 * is one edit in one file. Deliberately a typed module under lib/ and not a
 * JSON file under data/content/: this is not CMS-editable copy. The flags and
 * `approved` booleans below gate commercial claims -- pricing, a testimonial,
 * portfolio work, security and contract promises -- that must not be switched
 * on by an editor without approval.
 *
 * TWO SEPARATE GATES
 *   FLAGS      whole blocks of the page. All default to false.
 *   approved   individual items. An item with approved: false never renders,
 *              regardless of any flag, and never reaches the JSON-LD.
 *
 * UNSET VALUES
 * Anything unapproved is `null` plus a TODO comment -- never a placeholder
 * string. There is deliberately no "[PRICE - Chrissa]" or "[confirm]" text
 * anywhere in this file, so no component can print one by accident. A null
 * value renders no element at all, not an empty one.
 */

/* ------------------------------------------------------------------ flags */

export type FlagKey =
    | "showPricing"
    | "showSecurityBackup"
    | "showWork"
    | "showExternalProjects"
    | "showTestimonial"
    | "showReplyTime"
    | "showCoverage";

export type ItFlags = Readonly<Record<FlagKey, boolean>>;

export const IT_FLAGS: ItFlags = {
    showPricing: false,
    showSecurityBackup: false,
    showWork: false,
    showExternalProjects: false,
    showTestimonial: false,
    showReplyTime: false,
    showCoverage: false,
};

/**
 * Items carry an optional `requiresFlag`. No flag means always shown, which is
 * why this treats `undefined` as visible rather than as falsy.
 */
export function isEnabled(flag: FlagKey | undefined, flags: ItFlags = IT_FLAGS): boolean {
    return flag === undefined || flags[flag];
}

/** Anything with an `approved` boolean can be filtered with this. */
export interface Approvable {
    readonly approved: boolean;
}

export function approvedOnly<T extends Approvable>(items: readonly T[]): T[] {
    return items.filter((item) => item.approved);
}

/* -------------------------------------------------------------------- seo */

export const IT_SEO = {
    /**
     * Applied as an ABSOLUTE title. The root layout's "%s | Caliber Business
     * Resource" template would stretch this to 77 characters, past the ~65
     * the rest of the site is held to (see lib/seo.ts).
     */
    title: "IT Solutions — Managed IT, Web & App Development",
    description:
        "Managed IT, Microsoft 365 and Google Workspace, business phones, websites, mobile apps and CRM automation — set up and run by Caliber's in-house IT team.",
    /** trailingSlash: true in next.config.js -- the slash is not optional. */
    path: "/it-solutions/",
} as const;

/* ------------------------------------------------------------------- hero */

export interface Chip {
    readonly label: string;
    readonly requiresFlag?: FlagKey;
}

export interface ChipGroup {
    readonly title: string;
    readonly label: string;
    readonly chips: readonly Chip[];
}

export const HERO = {
    eyebrow: "IT Solutions",
    headline: "Your CRM, website and IT.",
    headlineHighlight: "We build it and run it.",
    subtext:
        "Our in-house IT team sets up and maintains the systems directly, as a project or a monthly plan. They're the same systems Caliber runs on every day.",
    primaryCta: { label: "Book a discovery call", href: "#it-contact" },
    /** Used only when the portfolio will actually render. */
    secondaryCta: { label: "See the work", href: "#work" },
    secondaryCtaFallback: { label: "See services", href: "#services" },
    panelTitle: "What we handle",
    panelLabel: "Delivered remotely",
} as const;

export const HERO_CHIP_GROUPS: readonly ChipGroup[] = [
    {
        title: "Run",
        label: "Monthly plans",
        chips: [
            { label: "Helpdesk" },
            { label: "Microsoft 365 / Google Workspace" },
            { label: "Email & domains" },
            { label: "Phone systems" },
            { label: "Onboarding & offboarding" },
            { label: "Security & backup", requiresFlag: "showSecurityBackup" },
        ],
    },
    {
        title: "Build",
        label: "Projects",
        chips: [
            { label: "Websites" },
            { label: "Web apps" },
            { label: "Mobile apps" },
            { label: "CRM & automation" },
            { label: "Integrations" },
        ],
    },
];

/* ---------------------------------------------------------- hire vs build */

export interface HireBuildOption {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly linkLabel: string;
    readonly href: string;
    readonly emphasised: boolean;
}

export const HIRE_VS_BUILD: readonly HireBuildOption[] = [
    {
        eyebrow: "Option A",
        title: "Hire a specialist",
        body: "A dedicated Caliber web developer or GHL specialist joins your team full-time. You direct the work; we manage the person.",
        linkLabel: "See staffing roles on the homepage",
        // The homepage services grid. Absolute, so it resolves from this route.
        href: "/#services",
        emphasised: false,
    },
    {
        eyebrow: "Option B · This page",
        title: "We build it for you",
        body: "Our IT team delivers a defined system and keeps it running. You get the outcome without managing anyone.",
        linkLabel: "See what we build below",
        href: "#services",
        emphasised: true,
    },
];

/* ------------------------------------------------------------ who it's for */

export interface AudienceItem {
    readonly title: string;
    readonly body: string;
}

export const WHO_ITS_FOR = {
    eyebrow: "Who it's for",
    heading: "Built for businesses without an IT department.",
} as const;

export const AUDIENCE_ITEMS: readonly AudienceItem[] = [
    {
        title: "No IT person on staff",
        body: "Someone in the office became “the IT person” by accident. We take that off their desk.",
    },
    {
        title: "Remote or hybrid teams",
        body: "Staff log in from home, the office and overseas. We keep every seat working.",
    },
    {
        title: "Outgrowing spreadsheets",
        body: "Leads sit in inboxes and customer data in sheets. We move it into systems that follow up for you.",
    },
    {
        title: "Your IT person just left",
        body: "Passwords and admin access left with them. We get you back in control and write everything down.",
    },
];

/* --------------------------------------------------------------- services */

export interface ServiceTile {
    readonly title: string;
    readonly line: string;
    readonly includes: readonly string[];
    /** Lucide export name, resolved through the iconMap in ITServices.tsx. */
    readonly icon: string;
    readonly tag: string | null;
    readonly requiresFlag?: FlagKey;
}

export interface ServiceGroup {
    readonly key: "run" | "build";
    readonly heading: string;
    readonly subheading: string;
    readonly terms: string;
    readonly price: string | null;
    readonly tiles: readonly ServiceTile[];
}

export const SERVICES_INTRO = {
    heading: "We keep your IT running, and build what you're missing.",
    intro:
        "Monthly plans cover the day-to-day. Projects cover new systems. Not sure where you stand? Start with an assessment.",
} as const;

export const IT_ASSESSMENT = {
    eyebrow: "Start here · one-time",
    title: "IT Assessment",
    body: "We review your devices, accounts, email, phones and backups, then hand you a written list of what to fix first.",
    includes: [
        "Device and software inventory",
        "Account and access review",
        "Email and domain health check",
        "Backup and recovery check",
        "Prioritised fix list",
    ],
    // TODO(chrissa): assessment price. Stays null until approved -- null
    // renders no price element at all, even when showPricing is true.
    price: null as string | null,
    ctaLabel: "Book it",
    ctaHref: "#it-contact",
} as const;

export const SERVICE_GROUPS: readonly ServiceGroup[] = [
    {
        key: "run",
        heading: "Run",
        subheading: "Managed IT for teams in-office or remote",
        terms: "Monthly plan, per seat",
        // TODO(chrissa): price per seat.
        price: null,
        tiles: [
            {
                title: "Managed IT & Helpdesk",
                line: "Day-to-day support for your staff, wherever they log in from.",
                includes: [
                    "Helpdesk requests",
                    "Daily pre-shift systems checks",
                    "Device health and updates",
                    "Three-level escalation",
                ],
                icon: "Headset",
                tag: null,
            },
            {
                title: "Microsoft 365 & Google Workspace",
                line: "Accounts, mailboxes and files set up properly and kept tidy.",
                includes: [
                    "Users and licenses",
                    "Mailbox migrations",
                    "Shared drives and permissions",
                    "Admin security settings",
                ],
                icon: "LayoutGrid",
                tag: null,
            },
            {
                title: "Email & Domains",
                line: "Business email that lands in the inbox, not spam.",
                includes: [
                    "DNS management",
                    "SPF, DKIM and DMARC",
                    "Domain transfers",
                    "Dedicated sending domains",
                ],
                icon: "Mail",
                tag: null,
            },
            {
                title: "Business Phone Systems",
                line: "US numbers and calling that work from any desk.",
                includes: [
                    "VoIP number setup",
                    "Softphones",
                    "Number porting",
                    "Calls logged to your CRM",
                ],
                icon: "Phone",
                tag: null,
            },
            {
                title: "Onboarding & Offboarding",
                line: "Access on day one. Access removed on the last day.",
                includes: [
                    "Account creation",
                    "Credential management",
                    "Access revocation checklist",
                    "Device return log",
                ],
                icon: "KeyRound",
                tag: null,
            },
            {
                // TODO(chrissa): confirm IT capacity before Security & Backup
                // goes live. Hidden by showSecurityBackup; until then the Run
                // grid simply renders 5 tiles and reflows.
                title: "Security & Backup",
                line: "The basics most small teams skip until something breaks.",
                includes: [
                    "Multi-factor sign-in rollout",
                    "Antivirus and firewall checks",
                    "Screen lock and encryption",
                    "Cloud backup and restore tests",
                ],
                icon: "ShieldCheck",
                tag: null,
                requiresFlag: "showSecurityBackup",
            },
        ],
    },
    {
        key: "build",
        heading: "Build",
        subheading: "Web and app development, plus the systems behind them",
        terms: "Project, scoped per build",
        // TODO(chrissa): project pricing.
        price: null,
        tiles: [
            {
                title: "Web Development",
                line: "Websites and web apps, from a landing page to a full client portal.",
                includes: [
                    "Business websites",
                    "Landing pages and sales funnels",
                    "Booking and inquiry systems",
                    "eCommerce and custom CMS",
                    "Web apps and client portals",
                    "SEO-ready and mobile-optimised by default",
                ],
                icon: "Code2",
                tag: null,
            },
            {
                title: "App Development",
                line: "Mobile apps for your customers or your own team.",
                includes: [
                    "iOS and Android apps",
                    "Cross-platform builds",
                    "Backend and admin panel",
                    "App store publishing",
                ],
                icon: "Smartphone",
                tag: null,
            },
            {
                title: "CRM & Automation",
                line: "Every lead captured, tracked and followed up automatically.",
                includes: [
                    "GoHighLevel setup",
                    "Pipelines and lead forms",
                    "Website and Messenger chatbots",
                    "Follow-up sequences and reporting",
                ],
                icon: "Workflow",
                tag: "Most requested",
            },
            {
                title: "Integrations",
                line: "Your tools talking to each other instead of staff copying data.",
                includes: [
                    "Workflow automation",
                    "API connections",
                    "Data sync between apps",
                    "Reports pulled automatically",
                ],
                icon: "Link2",
                tag: null,
            },
        ],
    },
];

/** Service names for the Service JSON-LD, flags respected. Services only. */
export function itServiceNames(flags: ItFlags = IT_FLAGS): string[] {
    return [
        IT_ASSESSMENT.title,
        ...SERVICE_GROUPS.flatMap((group) =>
            group.tiles
                .filter((tile) => isEnabled(tile.requiresFlag, flags))
                .map((tile) => tile.title),
        ),
    ];
}

/* ------------------------------------------------------- what we look for */

export interface AssessmentCheck {
    readonly problem: string;
    readonly why: string;
}

/**
 * Makes the IT Assessment concrete. These are general problems in businesses
 * without dedicated IT -- deliberately NOT Caliber's own findings, and with no
 * "most businesses have..." frequency claims, which we cannot substantiate.
 */
export const ASSESSMENT_INTRO = {
    eyebrow: "The IT Assessment",
    heading: "What we look for.",
    intro:
        "Common problems in businesses without dedicated IT. Each one is fixable, and the assessment tells you which ones you have.",
    ctaLabel: "Book an IT Assessment",
    ctaHref: "#it-contact",
} as const;

export const ASSESSMENT_CHECKS: readonly AssessmentCheck[] = [
    {
        problem: "Former staff still have access",
        why: "People who left can still open email, files or the CRM.",
    },
    {
        problem: "Passwords kept in spreadsheets",
        why: "One shared file holds the keys to everything, and anyone with the link can copy it.",
    },
    {
        problem: "Email landing in spam",
        why: "Missing SPF, DKIM or DMARC records mean customers never see your emails.",
    },
    {
        problem: "Devices past their support date",
        why: "No more security updates, so every known flaw stays open.",
    },
    {
        problem: "Backups nobody has tested",
        why: "You find out they don't work on the day you need them.",
    },
    {
        problem: "One person holds every admin login",
        why: "If they leave or get locked out, so does the business.",
    },
];

/* ------------------------------------------------ what a monthly plan covers */

export interface PlanExclusion extends Approvable {
    readonly text: string;
}

export const MONTHLY_PLAN = {
    heading: "What a monthly plan covers.",
    includedLabel: "Included",
    excludedLabel: "Not included",
} as const;

export const PLAN_INCLUDED: readonly string[] = [
    "Helpdesk requests from your staff",
    "Accounts set up for new hires and removed for leavers",
    "Microsoft 365 or Google Workspace admin",
    "Email and domain upkeep",
    "Phone system changes",
    "Device health checks and updates",
    "Website and CRM upkeep: updates, fixes and small content changes",
];

export const PLAN_EXCLUDED: readonly PlanExclusion[] = [
    { text: "On-site visits — all work is remote", approved: true },
    {
        text: "New builds such as websites, apps or integrations — quoted as projects",
        approved: true,
    },
    {
        // TODO(chrissa): confirm.
        text: "Buying hardware or software licenses — you buy direct, we set it up",
        approved: false,
    },
    {
        // TODO(chrissa): depends on coverage hours.
        text: "After-hours emergency support",
        approved: false,
    },
];

/* ------------------------------------------------------- how support works */

export type StatusTone = "ready" | "attention" | "critical";

export interface SupportStep extends Approvable {
    readonly title: string;
    readonly body: string;
}

export interface SeatStatus {
    readonly label: string;
    readonly tone: StatusTone;
    readonly description: string;
}

export interface EscalationLevel {
    readonly level: string;
    readonly who: string;
    readonly handles: string;
}

export interface PriorityLevel {
    readonly priority: string;
    readonly meaning: string;
    /** Null until coverage hours are agreed. See PRIORITY_LEVELS below. */
    readonly firstResponse: string | null;
}

export const SUPPORT = {
    eyebrow: "How support works",
    heading: "Tell us what broke. We handle the rest.",
    intro: "Every request follows the same four steps, so nothing sits in an inbox.",
    remoteStaffLine:
        "Teams with remote staff also get a daily pre-shift systems check, so every seat is ready before the shift starts.",
} as const;

export const SUPPORT_STEPS: readonly SupportStep[] = [
    {
        // TODO(chrissa): confirm channels -- no ticketing tool exists yet, so
        // "email or chat" is the claim being made. Approved per the content
        // spec, which marked only the Report step unapproved.
        title: "Request",
        body: "Your staff send it by email or chat.",
        approved: true,
    },
    {
        title: "Triage",
        body: "We rank it by how many people it stops from working.",
        approved: true,
    },
    {
        title: "Fix",
        body: "Remote fix, or clear instructions if hardware needs hands on site.",
        approved: true,
    },
    {
        // TODO(chrissa): commit to monthly reporting before this renders.
        title: "Report",
        body: "A monthly summary of what was fixed and what's at risk.",
        approved: false,
    },
];

export const SEAT_STATUSES: readonly SeatStatus[] = [
    { label: "Ready", tone: "ready", description: "Fully working" },
    { label: "Needs attention", tone: "attention", description: "Minor issue, staff can still work" },
    { label: "Critical", tone: "critical", description: "Can't start the shift until fixed" },
];

export const ESCALATION_LEVELS: readonly EscalationLevel[] = [
    {
        level: "Level 1",
        who: "IT support",
        handles: "Password resets, headsets, browsers, printers",
    },
    {
        level: "Level 2",
        who: "Systems administrator",
        handles: "Network outages, VPN, domain sign-in, servers",
    },
    {
        level: "Level 3",
        who: "Vendor",
        handles: "Software platform, phone carrier or internet provider outages",
    },
];

/**
 * Gated by showCoverage AND by having a real firstResponse. Response times
 * depend on coverage hours that are not agreed yet, so every row is null and
 * the table renders nothing even if the flag is flipped early -- a priority
 * table with blank response cells is worse than no table.
 */
export const PRIORITY_LEVELS: readonly PriorityLevel[] = [
    // TODO(chrissa): first-response target for each priority.
    { priority: "Urgent", meaning: "Nobody can work", firstResponse: null },
    { priority: "High", meaning: "One person can't work", firstResponse: null },
    { priority: "Normal", meaning: "Annoying, not blocking", firstResponse: null },
];

/* ------------------------------------------------ your systems stay yours */

export interface SystemsItem extends Approvable {
    readonly title: string;
    readonly body: string;
}

/**
 * Answers "you'll have admin access to our accounts from overseas?". Every
 * line is a security or contractual promise, so each needs sign-off
 * individually. The section hides entirely below SYSTEMS_MIN_APPROVED -- three
 * claims is the point at which it reads as a policy rather than an assertion.
 *
 * Deliberately absent: the homepage's "controlled office with monitored
 * access" line. IT work is not done from the Bohol office, so that claim does
 * not hold on this page.
 */
export const SYSTEMS_MIN_APPROVED = 3;

export const SYSTEMS = {
    eyebrow: "Access and data",
    heading: "Your systems stay yours.",
    intro: "We only ever work inside accounts you own and control.",
} as const;

export const SYSTEMS_ITEMS: readonly SystemsItem[] = [
    {
        // TODO(chrissa): confirm.
        title: "You stay the owner",
        body: "Admin accounts, billing and domains stay in your company's name. We work through accounts you create for us.",
        approved: false,
    },
    {
        // TODO(chrissa): confirm.
        title: "Only the access the work needs",
        body: "Each technician gets access to the systems they support, nothing more.",
        approved: false,
    },
    {
        // TODO(chrissa): confirm.
        title: "Two-step sign-in on every account we use",
        body: "No shared passwords, no single-password logins.",
        approved: false,
    },
    {
        // TODO(chrissa): confirm.
        title: "Access removed on the last day",
        body: "When an engagement ends, every account we used is revoked against a written checklist.",
        approved: false,
    },
    {
        // TODO(chrissa): the homepage says this about staff; confirm it covers
        // the IT team specifically.
        title: "Confidentiality agreement",
        body: "Everyone who touches your systems signs one before they start.",
        approved: false,
    },
    {
        // Already published on the homepage.
        title: "Contract with a US entity",
        body: "Caliber is registered in the US. Contract and invoice through our US entity, W-9 on request.",
        approved: true,
    },
];

/* --------------------------------------------------------------- portfolio */

/**
 * id="work" -- the hero's "See the work" button targets it.
 *
 * TWO DIFFERENT SHAPES, on purpose:
 *   Caliber cards      screenshots. A card whose image file is missing is
 *                      dropped entirely (see lib/portfolio-images.ts). No grey
 *                      placeholder boxes, ever.
 *   IT lead ledger     LINKS ONLY. No screenshots, no image field, so there is
 *                      nothing to go missing and no placeholder to render.
 *
 * NEVER ADD, and do not let them creep back in: The Filipina Pea and the
 * Borongan City Tourist Guide App (ACS Solutions work, not built by Caliber's
 * IT lead), The Kofi Chapters (concept only), DARBC, PrimeNest PH, Yeshua
 * Manpower (never approved), AkountPH, LeadFlow, AAMS (not shipped).
 *
 * Elevare Remote Partners was on that list at one point as a competitor. It is
 * deliberately NOT excluded now: it serves real-estate clients only, so it
 * does not compete with Caliber. Decision confirmed 2026-09-24 -- do not
 * re-remove it without checking.
 */

/** The filter chips, minus "All". No "Apps": no shipped mobile app exists
 *  yet, and an empty filter would advertise the gap. */
export type PortfolioTag =
    | "Websites"
    | "CRM & Automation"
    | "Integrations"
    | "IT support";

export const PORTFOLIO_TAGS: readonly PortfolioTag[] = [
    "Websites",
    "CRM & Automation",
    "Integrations",
    "IT support",
];

/** Relative to /public. 1600x1000 .webp. Caliber cards only. */
export const PORTFOLIO_IMAGE_DIR = "it-solutions/portfolio";

export interface PortfolioItem {
    readonly title: string;
    readonly line: string;
    readonly tags: readonly PortfolioTag[];
    /** Null when the stack has not been written down yet. */
    readonly stack: string | null;
    /** Absolute https URL, or null when there is no public site to link to. */
    readonly url: string | null;
    /** Filename inside PORTFOLIO_IMAGE_DIR. Missing file => item not rendered. */
    readonly image: string;
}

export interface PortfolioGroup {
    readonly key: string;
    readonly label: string;
    readonly items: readonly PortfolioItem[];
    readonly requiresFlag?: FlagKey;
}

/** A ledger row. Note there is no `image` field at all -- by design. */
export interface LedgerItem {
    readonly title: string;
    /** Absolute https URL, or null to render "Private system". */
    readonly url: string | null;
    /** Parenthetical shown after "Private system", e.g. "event has passed". */
    readonly privateNote: string | null;
    readonly built: readonly string[];
    readonly tags: readonly PortfolioTag[];
    readonly stack: string;
}

export const PORTFOLIO = {
    eyebrow: "Portfolio",
    heading: "Work we've shipped.",
    intro: "Live systems, not mockups. Each one is still running.",
    allLabel: "All",
    visitLabel: "Visit site",
    calibreGroupLabel: "Built for Caliber",
    privateLabel: "Private system",
} as const;

/** Full-width row above the grid. Same missing-image rule as the cards. */
export const PORTFOLIO_FEATURED = {
    title: "Caliber Business Resource website",
    kicker: "The site you're on",
    body: "Company site covering staffing and IT, with content the team edits without a developer. Every form submission goes straight into the CRM, tagged and ready for follow-up.",
    tags: ["Websites", "CRM & Automation"] as readonly PortfolioTag[],
    stack: "Next.js · Decap CMS · GoHighLevel",
    // No link: the visitor is already on it.
    url: null as string | null,
    image: "caliber-site.webp",
} as const;

export const PORTFOLIO_GROUPS: readonly PortfolioGroup[] = [
    {
        key: "caliber",
        label: "Built for Caliber",
        items: [
            {
                title: "Caliber Medical Staffing site",
                line: "Division site for remote medical staffing, built for search, with copy editable without touching code.",
                tags: ["Websites"],
                stack: "Next.js · TypeScript · Tailwind",
                // TODO(xed): confirm the live URL.
                url: null,
                // TODO(xed): screenshot.
                image: "medical-site.webp",
            },
            {
                title: "Consultation landing page",
                line: "Landing page whose form creates the lead, assigns it to a rep and alerts the team.",
                tags: ["Websites", "CRM & Automation"],
                stack: "GoHighLevel",
                url: "https://landing.caliberbusinessresource.com",
                image: "caliber-landing.webp",
            },
            {
                title: "Messenger chatbot",
                line: "One menu for job applications, services and location questions. Every Facebook comment gets a public reply and a private message.",
                tags: ["CRM & Automation"],
                stack: "GoHighLevel · Facebook Messenger",
                url: null,
                // TODO(xed): screenshot.
                image: "chatbot.webp",
            },
            {
                title: "CRM pipeline and lead intake",
                line: "Seven-stage pipeline with automatic assignment, alerts, and duplicate-safe lead imports.",
                tags: ["CRM & Automation", "Integrations"],
                stack: "GoHighLevel workflows",
                url: null,
                // TODO(xed): screenshot -- blur contact names.
                image: "pipeline.webp",
            },
            {
                title: "Business phone system",
                line: "US business line on softphones, with calls logged against contacts in the CRM.",
                tags: ["IT support"],
                stack: "VoIP · SIP softphone · GoHighLevel",
                url: null,
                // TODO(xed): screenshot -- blur numbers.
                image: "phones.webp",
            },
            {
                title: "Email domain and deliverability",
                line: "Moved DNS, verified a dedicated sending domain, and got bulk email out of spam.",
                tags: ["IT support"],
                stack: "Cloudflare DNS · SPF · DKIM · DMARC",
                url: null,
                // TODO(xed): screenshot of the verified domain status.
                image: "email-dns.webp",
            },
        ],
    },
];

/**
 * Links only, no images. Never label these "our clients" or "Caliber clients"
 * -- they were delivered before and outside Caliber, and the wording matters.
 *
 * TODO(chrissa): OK to show this group on Caliber's site.
 */
export const LEDGER = {
    label: "Built by our IT lead",
    sublabel: "Projects delivered before and outside Caliber.",
    builtLabel: "What was built",
    requiresFlag: "showExternalProjects" as FlagKey,
} as const;

export const LEDGER_ITEMS: readonly LedgerItem[] = [
    {
        title: "Elevare Remote Partners",
        url: "https://elevarerp.com",
        privateNote: null,
        built: [
            "Company website",
            "Applicant qualification platform with separate agent and VA flows",
            "Responses synced to Google Sheets with instant hot-lead email alerts",
        ],
        tags: ["Websites", "Integrations"],
        stack: "Next.js · Supabase · Tailwind · Google Sheets API",
    },
    {
        title: "UpVirtual",
        url: "https://upvirtual.net",
        privateNote: null,
        built: [
            "Full agency website",
            "Five service pages plus a cloud services page",
            "Discovery-call booking built in",
        ],
        tags: ["Websites"],
        stack: "Next.js · TypeScript · Tailwind · Vercel",
    },
    {
        title: "Executives Events",
        url: "https://executivesevents.com",
        privateNote: null,
        built: [
            "Single-page site for a corporate events firm serving Asia-Pacific",
            "15 services and 4 case studies",
            "Structured data, sitemap and booking via Cal.com and Formspree",
        ],
        tags: ["Websites"],
        stack: "Next.js · Framer Motion · Tailwind · Vercel",
    },
    {
        title: "JCI Boholana Kisses",
        url: "https://jciboholanakisses.net",
        privateNote: null,
        built: [
            "Digital souvenir magazine for a JCI chapter in Bohol",
            "Community projects, board and messages from 12 chapters",
            "Static export with search schema",
        ],
        tags: ["Websites"],
        stack: "Next.js · TypeScript · CSS Modules · Vercel",
    },
    {
        title: "Healthcare Laundry Workshop",
        url: null,
        privateNote: "event has passed",
        built: [
            "Registration funnel for the 3rd National Healthcare Laundry Workshop in Cebu",
            "Gmail-safe HTML email campaign",
        ],
        tags: ["Websites"],
        stack: "Netlify · HTML email",
    },
    {
        title: "Carrier lead engine",
        url: null,
        privateNote: null,
        built: [
            "Automated pipeline that pulls public US trucking-carrier records and scores each carrier",
            "About 15,000 ranked leads delivered to a sales team in three batches",
        ],
        tags: ["Integrations"],
        stack: "n8n · Claude API · Google Sheets",
    },
];

/* ------------------------------------------------------------- testimonial */

// TODO(chrissa): confirm this testimonial can be reused on the IT page.
// Gated by showTestimonial until that confirmation exists.
export const TESTIMONIAL = {
    quote:
        "The CRM pipeline setup was exactly what we needed. Lead tracking is now seamless and the automation workflows save our team hours every week.",
    name: "Eleu Lee",
    role: "Founder, Clean Energy Advocates",
} as const;

/* ----------------------------------------------------------- how it starts */

export interface StartStep {
    /** Lucide export name, resolved by the iconMap in components/HowItWorks.tsx. */
    readonly icon: string;
    readonly number: string;
    readonly title: string;
    readonly description: string;
}

/**
 * Shaped to match HowItWorksProps in components/HowItWorks.tsx so the
 * homepage's numbered-step component renders this directly -- same styling,
 * no second implementation to keep in sync.
 */
export const HOW_IT_STARTS = {
    title: "From first call to",
    titleHighlight: "running systems.",
    subtitle: "Getting started",
    steps: [
        {
            icon: "MessageSquare",
            number: "01",
            title: "Discovery call",
            description: "We learn what you run today, what's breaking, and who needs access.",
        },
        {
            icon: "ClipboardCheck",
            number: "02",
            title: "IT Assessment",
            description:
                "We review devices, accounts, email, phones and backups, and hand you a written fix list.",
        },
        {
            icon: "Handshake",
            number: "03",
            title: "Proposal",
            description: "A fixed-scope project or a monthly plan. Nothing starts until you approve it.",
        },
        {
            icon: "Rocket",
            number: "04",
            title: "Onboarding",
            description:
                "You create our accounts, we document your setup, and support or the build begins.",
        },
    ] as readonly StartStep[],
    cta: { label: "Book a discovery call", href: "#it-contact" },
} as const;

/* --------------------------------------------------------------------- faq */

export interface FaqItem extends Approvable {
    readonly question: string;
    readonly answer: string;
    /** Optional in-answer link, rendered after the answer text. */
    readonly link: { readonly label: string; readonly href: string } | null;
}

/**
 * IT-specific only -- the homepage FAQ covers staffing.
 *
 * The FAQPage JSON-LD on this route is built from approvedOnly(IT_FAQ_ITEMS),
 * the same list the page renders, so an unapproved answer can never reach
 * structured data and show up as a rich result.
 */
export const IT_FAQ = {
    heading: "Frequently Asked",
    headingHighlight: "Questions",
    footerText: "More questions about staffing?",
    footerLabel: "See the main FAQ",
    footerHref: "/#faq",
} as const;

export const IT_FAQ_ITEMS: readonly FaqItem[] = [
    {
        question: "Do you come on site?",
        answer:
            "No. All work is done remotely. If a device needs physical repair, we tell you exactly what's needed so a local shop can fix it.",
        link: null,
        approved: true,
    },
    {
        // TODO(chrissa): coverage hours in US time zones.
        question: "What hours do you cover?",
        answer: "",
        link: null,
        approved: false,
    },
    {
        question: "How is IT work priced?",
        answer:
            "The IT Assessment is a one-time fee. Monthly plans are priced per seat. Projects are quoted after the discovery call, once we know the scope.",
        link: null,
        approved: true,
    },
    {
        // TODO(chrissa): minimum term and notice period.
        question: "Is there a minimum contract?",
        answer: "",
        link: null,
        approved: false,
    },
    {
        // TODO(chrissa): confirm this is actually offered before publishing.
        question: "We already have an IT person. Can you work alongside them?",
        answer:
            "Yes. We can take specific systems, such as your CRM or phones, and leave the rest with them.",
        link: null,
        approved: false,
    },
    {
        question: "Which tools do you work with?",
        answer:
            "Microsoft 365, Google Workspace, GoHighLevel, VoIP phone systems, and the web and app stacks we build on. If yours isn't listed, ask on the discovery call.",
        link: null,
        approved: true,
    },
    {
        question: "Do you need admin access to our accounts?",
        answer:
            "Only where the work needs it. You create the accounts for us, and you can remove them at any time.",
        link: null,
        approved: true,
    },
    {
        question: "Can you also provide full-time staff?",
        answer:
            "Yes. If you'd rather have a dedicated specialist on your team, see our staffing roles.",
        link: { label: "See staffing roles", href: "/#services" },
        approved: true,
    },
];

/* ----------------------------------------------------------------- contact */

export interface ServiceOption {
    readonly value: string;
    readonly requiresFlag?: FlagKey;
}

export const CONTACT = {
    eyebrow: "Get started",
    heading: "Tell us what you're running now.",
    body: "We'll reply with what we'd set up first and what it would take.",
    // Split for ObfuscatedEmail, matching how the footer handles the address.
    emailUser: "info",
    emailDomain: "caliberbusinessresource.com",
    // TODO(chrissa): reply time. Gated by showReplyTime and null until agreed,
    // so no unbacked response-time promise can appear.
    replyTime: null as string | null,
    crossLink: {
        text: "Looking to hire staff instead?",
        label: "Use the staffing form",
        href: "/#connect",
    },
    submitLabel: "Request a discovery call",
    currentToolsPlaceholder: "e.g. HubSpot, Wix, spreadsheets",
} as const;

/** Order matters -- this is the dropdown order the form renders. */
export const SERVICE_OPTIONS: readonly ServiceOption[] = [
    { value: "IT Assessment" },
    { value: "Managed IT & Helpdesk" },
    { value: "Microsoft 365 / Google Workspace" },
    { value: "Email & Domains" },
    { value: "Business Phone Systems" },
    { value: "Onboarding & Offboarding" },
    { value: "Security & Backup", requiresFlag: "showSecurityBackup" },
    { value: "Web Development" },
    { value: "App Development" },
    { value: "CRM & Automation" },
    { value: "Integrations" },
    { value: "Not sure yet" },
];

/* ------------------------------------------------ homepage cross-sell hook */

/**
 * Keyed by the service title in data/content/homepage.json, so the homepage
 * grid can offer a build-it-for-you route without adding a field to the CMS
 * schema. A title that is not a key here renders no link at all.
 *
 * Technical Support gets different wording on purpose: that card is staff who
 * support YOUR CUSTOMERS, where Managed IT supports YOUR OWN TEAM.
 */
export const SERVICE_CARD_CROSSLINKS: Readonly<
    Record<string, { readonly label: string; readonly href: string }>
> = {
    "Technical Support": {
        label: "Need IT support for your own team? → IT Solutions",
        href: "/it-solutions/",
    },
    "Web Development": {
        label: "Want it built for you instead? → IT Solutions",
        href: "/it-solutions/",
    },
    "GHL Systems Specialist": {
        label: "Want it built for you instead? → IT Solutions",
        href: "/it-solutions/",
    },
};
