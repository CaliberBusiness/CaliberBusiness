# /it-solutions/ — content spec (source of truth for copy)

Replaces docs/design/it-solutions.dc.html. Copy and structure only — styling comes
from the repo (gold #f6b130, aqua #7fffd4, #4a4a4a, rounded cards, Inter + Montserrat).

Legend:
- `FLAG: name` → render only when that flag in lib/it-solutions.ts is true (all default false)
- `TODO(chrissa)` → unapproved; keep as a comment in the data file, never render
- No numbered eyebrows ("01 —", "02 —"). Plain eyebrows only, or none.

## Section order

Hero → Hire vs Build → Who it's for → Services → What we look for → What a monthly plan covers → How support works → Your systems stay yours → Portfolio → Testimonial → How it starts → FAQ → Contact

New flag: showCoverage (default false). Items with `approved: false` never render.

---

## 1. Hero

- Eyebrow: IT Solutions
- H1: Your CRM, website and IT. **We build it and run it.** (second sentence highlighted with the repo's gold/cream highlight)
- Subtext: Our in-house IT team sets up and maintains the systems directly, as a project or a monthly plan. They're the same systems Caliber runs on every day.
- Primary button: Book a discovery call → #it-contact
- Secondary button: See the work → #work (hide button when FLAG: showWork is false; fall back to "See services" → #services)

### Right panel — "What we handle"
- Panel title: What we handle
- Panel label (right): Delivered remotely
- Group **Run** — label "Monthly plans" — chips:
  Helpdesk · Microsoft 365 / Google Workspace · Email & domains · Phone systems · Onboarding & offboarding · Security & backup (`FLAG: showSecurityBackup`)
- Group **Build** — label "Projects" — chips:
  Websites · Web apps · Mobile apps · CRM & automation · Integrations

---

## 2. Hire vs Build band

Two side-by-side panels. Option B visually emphasised (cream fill).

**Option A**
- Eyebrow: Option A
- Title: Hire a specialist
- Body: A dedicated Caliber web developer or GHL specialist joins your team full-time. You direct the work; we manage the person.
- Link: See staffing roles on the homepage → `/#services`

**Option B**
- Eyebrow: Option B · This page
- Title: We build it for you
- Body: Our IT team delivers a defined system and keeps it running. You get the outcome without managing anyone.
- Link: See what we build below ↓ → `#services`

---

## 3. Who it's for — NEW (after Hire vs Build, before Services)

- Eyebrow: Who it's for
- H2: Built for businesses without an IT department.

4 items, 2x2 grid on desktop, stacked on mobile. Title + one line each.
| Title | Body |
|---|---|
| No IT person on staff | Someone in the office became "the IT person" by accident. We take that off their desk. |
| Remote or hybrid teams | Staff log in from home, the office and overseas. We keep every seat working. |
| Outgrowing spreadsheets | Leads sit in inboxes and customer data in sheets. We move it into systems that follow up for you. |
| Your IT person just left | Passwords and admin access left with them. We get you back in control and write everything down. |

---

## 4. Services — id="services"

- H2: We keep your IT running, and build what you're missing.
- Intro: Monthly plans cover the day-to-day. Projects cover new systems. Not sure where you stand? Start with an assessment.

### Start-here strip — IT Assessment (full width, gold background)
- Eyebrow: Start here · one-time
- Title: IT Assessment
- Body: We review your devices, accounts, email, phones and backups, then hand you a written list of what to fix first.
- Includes: Device and software inventory · Account and access review · Email and domain health check · Backup and recovery check · Prioritised fix list
- Price: `FLAG: showPricing` — TODO(chrissa): assessment price
- Button: Book it → #it-contact

### Group: Run
- Heading: Run — "Managed IT for teams in-office or remote"
- Terms: Monthly plan, per seat — price `FLAG: showPricing`, TODO(chrissa): price per seat
- 6 tiles, 3-column grid, each with a Lucide icon:

| Title | Line | Includes | Icon suggestion |
|---|---|---|---|
| Managed IT & Helpdesk | Day-to-day support for your staff, wherever they log in from. | Helpdesk requests · Daily pre-shift systems checks · Device health and updates · Three-level escalation | Headset |
| Microsoft 365 & Google Workspace | Accounts, mailboxes and files set up properly and kept tidy. | Users and licenses · Mailbox migrations · Shared drives and permissions · Admin security settings | LayoutGrid |
| Email & Domains | Business email that lands in the inbox, not spam. | DNS management · SPF, DKIM and DMARC · Domain transfers · Dedicated sending domains | Mail |
| Business Phone Systems | US numbers and calling that work from any desk. | VoIP number setup · Softphones · Number porting · Calls logged to your CRM | Phone |
| Onboarding & Offboarding | Access on day one. Access removed on the last day. | Account creation · Credential management · Access revocation checklist · Device return log | KeyRound |
| Security & Backup — `FLAG: showSecurityBackup` | The basics most small teams skip until something breaks. | Multi-factor sign-in rollout · Antivirus and firewall checks · Screen lock and encryption · Cloud backup and restore tests | ShieldCheck |

TODO(chrissa): confirm IT capacity before Security & Backup goes live.
When the Security & Backup tile is hidden, the Run grid shows 5 tiles — keep the grid tidy (no empty cell styling).

### Group: Build
- Heading: Build — "Web and app development, plus the systems behind them"
- Terms: Project, scoped per build — price `FLAG: showPricing`, TODO(chrissa): project pricing
- 4 tiles, 4-column grid (2 on tablet, 1 on mobile):

| Title | Line | Includes | Tag | Icon suggestion |
|---|---|---|---|---|
| Web Development | Websites and web apps, from a landing page to a full client portal. | Business websites · Landing pages and sales funnels · Booking and inquiry systems · eCommerce and custom CMS · Web apps and client portals · SEO-ready and mobile-optimised by default | — | Code2 |
| App Development | Mobile apps for your customers or your own team. | iOS and Android apps · Cross-platform builds · Backend and admin panel · App store publishing | — | Smartphone |
| CRM & Automation | Every lead captured, tracked and followed up automatically. | GoHighLevel setup · Pipelines and lead forms · Website and Messenger chatbots · Follow-up sequences and reporting | "Most requested" | Workflow |
| Integrations | Your tools talking to each other instead of staff copying data. | Workflow automation · API connections · Data sync between apps · Reports pulled automatically | — | Link2 |

---

## 5. What we look for — NEW (after Services, before How support works)

Makes the IT Assessment concrete. General problems, not Caliber's own records, and no "most businesses have…" frequency claims.

- Eyebrow: The IT Assessment
- H2: What we look for.
- Intro: Common problems in businesses without dedicated IT. Each one is fixable, and the assessment tells you which ones you have.

6 items, 3-column grid (2 on tablet, 1 on mobile). Each: problem as title, "why it matters" as one line.
| Problem | Why it matters |
|---|---|
| Former staff still have access | People who left can still open email, files or the CRM. |
| Passwords kept in spreadsheets | One shared file holds the keys to everything, and anyone with the link can copy it. |
| Email landing in spam | Missing SPF, DKIM or DMARC records mean customers never see your emails. |
| Devices past their support date | No more security updates, so every known flaw stays open. |
| Backups nobody has tested | You find out they don't work on the day you need them. |
| One person holds every admin login | If they leave or get locked out, so does the business. |

CTA under the grid: Book an IT Assessment → #it-contact

---

## 6. What a monthly plan covers — NEW (right after "What we look for")

Two columns side by side: Included / Not included. Plain lists, no icons.

**Included**
- Helpdesk requests from your staff
- Accounts set up for new hires and removed for leavers
- Microsoft 365 or Google Workspace admin
- Email and domain upkeep
- Phone system changes
- Device health checks and updates
- Website and CRM upkeep: updates, fixes and small content changes

**Not included** — each item has `approved`
| Item | Status |
|---|---|
| On-site visits — all work is remote | approved: true |
| New builds such as websites, apps or integrations — quoted as projects | approved: true |
| Buying hardware or software licenses — you buy direct, we set it up | TODO(chrissa) |
| After-hours emergency support | TODO(chrissa) — depends on coverage hours |

---

## 7. How support works — replaces the old "How support runs" section

Reframed for a US office, not a call centre. The pre-shift check becomes one line for teams with remote staff.

- Eyebrow: How support works
- H2: Tell us what broke. We handle the rest.
- Intro: Every request follows the same four steps, so nothing sits in an inbox.

### Steps (4, horizontal on desktop, stacked on mobile)
1. **Request** — Your staff send it by email or chat. TODO(chrissa): confirm channels (no ticketing tool exists yet)
2. **Triage** — We rank it by how many people it stops from working.
3. **Fix** — Remote fix, or clear instructions if hardware needs hands on site.
4. **Report** — A monthly summary of what was fixed and what's at risk. `approved: false` — TODO(chrissa): commit to monthly reporting

- One line under the steps: Teams with remote staff also get a daily pre-shift systems check, so every seat is ready before the shift starts.

### Priority levels — keep the existing Seat status + Escalation blocks, then add:
| Priority | Meaning | First response |
|---|---|---|
| Urgent | Nobody can work | TODO(chrissa) |
| High | One person can't work | TODO(chrissa) |
| Normal | Annoying, not blocking | TODO(chrissa) |

Render the Priority table only when `FLAG: showCoverage` is true (new flag, default false). Response times depend on coverage hours.

---

## 8. Your systems stay yours — NEW (access and data handling)

Answers the first objection to remote IT: "you'll have admin access to our accounts from overseas?"

- Eyebrow: Access and data
- H2: Your systems stay yours.
- Intro: We only ever work inside accounts you own and control.

Items — each has `approved`. Render only approved items; hide the section if fewer than 3 are approved.
| Title | Body | Status |
|---|---|---|
| You stay the owner | Admin accounts, billing and domains stay in your company's name. We work through accounts you create for us. | TODO(chrissa) |
| Only the access the work needs | Each technician gets access to the systems they support, nothing more. | TODO(chrissa) |
| Two-step sign-in on every account we use | No shared passwords, no single-password logins. | TODO(chrissa) |
| Access removed on the last day | When an engagement ends, every account we used is revoked against a written checklist. | TODO(chrissa) |
| Confidentiality agreement | Everyone who touches your systems signs one before they start. | TODO(chrissa) — the homepage says this about staff; confirm it covers the IT team |
| Contract with a US entity | Caliber is registered in the US. Contract and invoice through our US entity, W-9 on request. | approved: true — already published on the homepage |

Do NOT reuse the homepage's "controlled office with monitored access" line here. IT work is not done from the Bohol office, so the claim doesn't hold for this page.

---

## 9. Portfolio — id="work" — REPLACES the old Work section

- Eyebrow: Portfolio
- H2: Work we've shipped.
- Intro: Live systems, not mockups. Each one is still running.

### Layout
1. **Featured project**: full-width row. Screenshot on the left (7/12), text on the right (5/12). On mobile, the screenshot stacks on top.
2. **Filter chips** above the grid: All · Websites · CRM & Automation · Integrations · IT support. Same chip style as the hero "What we handle" panel; the active chip is filled #4a4a4a with white text. This needs a small client component. Filtering hides cards; it never reloads the page.
   - Don't add an "Apps" filter. No shipped mobile app exists yet, so an empty filter would advertise the gap.
3. **Card grid**: 3 columns on desktop, 2 on tablet, 1 on mobile. Each card has:
   - Screenshot: 16:10, object-cover, 1px #e0e0e0 border.
   - Title.
   - One line on what it does.
   - Service tags (chips).
   - Stack, 13px, #6b6b6b.
   - "Visit site ↗" link, only when a public URL exists. Opens in a new tab with rel="noopener".
4. Caliber cards only: if a card's image file is missing, don't render that card. No grey placeholder boxes, ever. The "Built by our IT lead" group never uses images.

Flags:
- `showWork` controls the whole section, including the featured project and the "Built for Caliber" cards.
- `showExternalProjects` controls the "Built by our IT lead" list (TODO(chrissa): OK to show it).
- If only the Caliber cards are on, hide the group labels.

Images go in /public/it-solutions/portfolio/ as .webp, 1600×1000.

### Featured (Built for Caliber)
| Field | Value |
|---|---|
| Title | Caliber Business Resource website |
| Kicker | The site you're on |
| Body | Company site covering staffing and IT, with content the team edits without a developer. Every form submission goes straight into the CRM, tagged and ready for follow-up. |
| Tags | Websites · CRM & Automation |
| Stack | Next.js · Decap CMS · GoHighLevel |
| Link | none (they're already on it) |
| Image | caliber-site.webp — screenshot exists |

### Group: Built for Caliber (`showWork`)
| Title | Line | Tags | Stack | Link | Image |
|---|---|---|---|---|---|
| Caliber Medical Staffing site | Division site for remote medical staffing, built for search, with copy editable without touching code. | Websites | Next.js · TypeScript · Tailwind | TODO(xed): confirm the live URL | medical-site.webp — TODO(xed): screenshot |
| Consultation landing page | Landing page whose form creates the lead, assigns it to a rep and alerts the team. | Websites · CRM & Automation | GoHighLevel | landing.caliberbusinessresource.com | caliber-landing.webp — screenshot exists |
| Messenger chatbot | One menu for job applications, services and location questions. Every Facebook comment gets a public reply and a private message. | CRM & Automation | GoHighLevel · Facebook Messenger | none | chatbot.webp — TODO(xed): screenshot |
| CRM pipeline and lead intake | Seven-stage pipeline with automatic assignment, alerts, and duplicate-safe lead imports. | CRM & Automation · Integrations | GoHighLevel workflows | none | pipeline.webp — TODO(xed): screenshot, blur contact names |
| Business phone system | US business line on softphones, with calls logged against contacts in the CRM. | IT support | VoIP · SIP softphone · GoHighLevel | none | phones.webp — TODO(xed): screenshot, blur numbers |
| Email domain and deliverability | Moved DNS, verified a dedicated sending domain, and got bulk email out of spam. | IT support | Cloudflare DNS · SPF · DKIM · DMARC | none | email-dns.webp — TODO(xed): screenshot of the verified domain status |

### Group: Built by our IT lead (`showExternalProjects`) — LINKS ONLY, NO IMAGES

Group label: "Built by our IT lead". Sublabel: "Projects delivered before and outside Caliber."
Never label these "our clients" or "Caliber clients".
TODO(chrissa): OK to show this group on Caliber's site.

Layout: NOT cards. No screenshots, no image slots, no placeholders.
Render as a ledger list under the Caliber card grid. One row per project, hairline #e0e0e0 between rows.
- Desktop: 3 columns. Left: project name, with the link under it as "domain ↗". Middle: "What was built" bullets. Right: stack, 13px #6b6b6b.
- Mobile: stacked in that order.
- Links open in a new tab with rel="noopener noreferrer". Rows without a public URL show "Private system" in place of the link.
- The filter chips still apply: each row carries its tags, and rows hide or show with the cards.

| Project | Link | What was built | Tags | Stack |
|---|---|---|---|---|
| Elevare Remote Partners | elevarerp.com | Company website · applicant qualification platform with separate agent and VA flows · responses synced to Google Sheets with instant hot-lead email alerts | Websites · Integrations | Next.js · Supabase · Tailwind · Google Sheets API |
| UpVirtual | upvirtual.net | Full agency website · five service pages plus a cloud services page · discovery-call booking built in | Websites | Next.js · TypeScript · Tailwind · Vercel |
| Executives Events | executivesevents.com | Single-page site for a corporate events firm serving Asia-Pacific · 15 services and 4 case studies · structured data, sitemap and booking via Cal.com and Formspree | Websites | Next.js · Framer Motion · Tailwind · Vercel |
| JCI Boholana Kisses | jciboholanakisses.net | Digital souvenir magazine for a JCI chapter in Bohol · community projects, board and messages from 12 chapters · static export with search schema | Websites | Next.js · TypeScript · CSS Modules · Vercel |
| Healthcare Laundry Workshop | Private system (event has passed) | Registration funnel for the 3rd National Healthcare Laundry Workshop in Cebu · Gmail-safe HTML email campaign | Websites | Netlify · HTML email |
| Carrier lead engine | Private system | Automated pipeline that pulls public US trucking-carrier records and scores each carrier · about 15,000 ranked leads delivered to a sales team in three batches | Integrations | n8n · Claude API · Google Sheets |

Never include: The Filipina Pea and the Borongan City Tourist Guide App (ACS Solutions work, not built by Caliber's IT lead), The Kofi Chapters (concept only), DARBC, PrimeNest PH, Yeshua Manpower (never approved), AkountPH, LeadFlow and AAMS (not shipped yet).

---

## 10. Testimonial — `FLAG: showTestimonial`

- Quote: The CRM pipeline setup was exactly what we needed. Lead tracking is now seamless and the automation workflows save our team hours every week.
- Name: Eleu Lee
- Role: Founder, Clean Energy Advocates
- TODO(chrissa): confirm this testimonial can be reused on the IT page.

---

## 11. How it starts — NEW (engagement process)

Reuse the homepage's "Getting Started Is Simple" numbered-step component and styling so both pages feel like one site. Different content — the homepage steps are about hiring staff.

- Eyebrow: Getting started
- H2: From first call to running systems.

1. **Discovery call** — We learn what you run today, what's breaking, and who needs access.
2. **IT Assessment** — We review devices, accounts, email, phones and backups, and hand you a written fix list.
3. **Proposal** — A fixed-scope project or a monthly plan. Nothing starts until you approve it.
4. **Onboarding** — You create our accounts, we document your setup, and support or the build begins.

CTA under the steps: Book a discovery call → #it-contact

---

## 12. FAQ — NEW — id="it-faq"

IT-specific. Do not repeat the homepage FAQ (that one covers staffing). Last item links across.
Each item has `approved`. Render only approved items. FAQPage JSON-LD is built from the same rendered list — never from unapproved items.

| Question | Answer | Status |
|---|---|---|
| Do you come on site? | No. All work is done remotely. If a device needs physical repair, we tell you exactly what's needed so a local shop can fix it. | approved: true |
| What hours do you cover? | TODO(chrissa): coverage hours in US time zones | approved: false |
| How is IT work priced? | The IT Assessment is a one-time fee. Monthly plans are priced per seat. Projects are quoted after the discovery call, once we know the scope. | approved: true |
| Is there a minimum contract? | TODO(chrissa): minimum term and notice period | approved: false |
| We already have an IT person. Can you work alongside them? | Yes. We can take specific systems, such as your CRM or phones, and leave the rest with them. | TODO(chrissa) — confirm this is offered |
| Which tools do you work with? | Microsoft 365, Google Workspace, GoHighLevel, VoIP phone systems, and the web and app stacks we build on. If yours isn't listed, ask on the discovery call. | approved: true |
| Do you need admin access to our accounts? | Only where the work needs it. You create the accounts for us, and you can remove them at any time. | approved: true |
| Can you also provide full-time staff? | Yes. If you'd rather have a dedicated specialist on your team, see our staffing roles. (link → /#services) | approved: true |

Footer line under the FAQ: More questions about staffing? See the main FAQ → /#faq

---

## 13. Contact — id="it-contact"

Left column:
- Eyebrow: Get started
- H2: Tell us what you're running now.
- Body: We'll reply with what we'd set up first and what it would take.
- Email: info@caliberbusinessresource.com (mailto)
- Reply time — `FLAG: showReplyTime` — TODO(chrissa): reply time
- Cross-link: Looking to hire staff instead? Use the staffing form → `/#connect`

Form (right column) — posts to /api/it-lead/:
| Label | Name | Type | Required |
|---|---|---|---|
| First name | firstName | text | yes |
| Last name | lastName | text | yes |
| Work email | email | email | yes |
| Company | companyName | text | yes |
| Service | itService | select | yes |
| Current tools | currentTools | text, placeholder "e.g. HubSpot, Wix, spreadsheets" | no |
| What isn't working right now? | message | textarea | yes |
| (honeypot) | website | hidden | — |

Service dropdown options, in this order:
1. IT Assessment
2. Managed IT & Helpdesk
3. Microsoft 365 / Google Workspace
4. Email & Domains
5. Business Phone Systems
6. Onboarding & Offboarding
7. Security & Backup — omit when showSecurityBackup is false
8. Web Development
9. App Development
10. CRM & Automation
11. Integrations
12. Not sure yet

Submit button: Request a discovery call
Under button: By submitting, you agree to our Privacy Policy. (link → /privacy-policy/)

---

## Homepage changes (small, copy only)

1. **Cross-link on a third card.** Add "Technical Support" to SERVICE_CARD_CROSSLINKS. That card is staff who support *your customers*; Managed IT supports *your own team*. Link text: "Need IT support for your own team? → IT Solutions".
2. **Homepage FAQ, "What services does Caliber Business Resource offer?"** Append one sentence to the existing answer: "We also build and run IT systems for businesses directly — see IT Solutions." Link → /it-solutions/. This is a text edit in data/content/homepage.json only; no schema change, so public/admin/config.yml stays untouched.

## SEO

- Title (≤ 65 chars): IT Solutions — Managed IT, Web & App Development
- Description (≤ 160 chars): Managed IT, Microsoft 365 and Google Workspace, business phones, websites, mobile apps and CRM automation — set up and run by Caliber's in-house IT team.
- Service JSON-LD: the service names from sections 3 only (respect flags). No prices, ratings, or addresses.
