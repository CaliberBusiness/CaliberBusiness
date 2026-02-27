# STATIC WEBSITE SECURITY HARDENING DIRECTIVE
Company: Caliber Business Resource
Environment: Static website with embedded Google Form + internal contact form

This is a real business website.
Focus on realistic frontend security hardening.
Do NOT add unnecessary enterprise systems.

---

# PHASE 1 — Secure the Internal Contact Form

Implement strict client-side validation:

1. Required fields enforcement
2. Email format validation using regex
3. Max length limits on:
   - Name (100 characters)
   - Company (150 characters)
   - Message (1000 characters)
4. Block HTML tags in inputs
5. Trim whitespace automatically
6. Prevent script injection attempts (strip <script> patterns)

If file upload exists:
- Allow only PDF and DOCX
- Limit size to 5MB
- Reject executable formats

---

# PHASE 2 — Anti-Spam Protection

Add:

- Google reCAPTCHA v2 or v3
- Honeypot hidden input field
- Disable multiple rapid submissions (debounce or cooldown)
- Disable submit button after click until response

Prevent form resubmission spam.

---

# PHASE 3 — Google Form Embedding Security

Since the Google Form is external:

- Use iframe sandbox attributes if possible
- Set referrerpolicy="no-referrer"
- Ensure iframe loads via HTTPS only
- Do not expose any editable Google Form links publicly
- Avoid linking to the raw Google Form editing URL

---

# PHASE 4 — Add Security Headers (If Hosting Allows)

If using GitHub Pages or similar:

Add via meta tags or hosting config:

- Content-Security-Policy (restrict scripts to trusted domains)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

Do not allow inline scripts unless necessary.

---

# PHASE 5 — HTTPS & External Script Control

Ensure:

- Website loads only over HTTPS
- All scripts are HTTPS
- No mixed content
- No exposed API keys
- No exposed private tokens

---

# PHASE 6 — Prevent Email Harvesting

If displaying email address:

- Obfuscate via JavaScript
OR
- Use contact form only
OR
- Encode email to prevent scraping bots

---

# PHASE 7 — Add Fraud Protection Notice

Add subtle disclaimer:

“Caliber Business Resource does not charge applicants any recruitment fees. Please report suspicious communications.”

This prevents impersonation scams.

---

# FINAL STANDARD

The goal is:

A hardened static business website
That minimizes spam
Reduces abuse
Protects brand credibility
Without false security claims.