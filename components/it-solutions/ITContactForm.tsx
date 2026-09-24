"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { CONTACT, IT_FLAGS, SERVICE_OPTIONS, isEnabled } from "@/lib/it-solutions";

/**
 * Section 7. The IT form.
 *
 * Mirrors the staffing form's defences rather than sharing them: the helpers
 * in components/ContactForm.tsx are local to that file, and that file is out
 * of scope for this change. Extracting both into lib/form-sanitize.ts is the
 * obvious follow-up.
 */

// --- Security: Sanitization Utilities ---
const stripHtmlTags = (input: string): string => input.replace(/<[^>]*>/g, '');
const stripScriptPatterns = (input: string): string =>
  input.replace(/<script[^>]*>.*?<\/script>/gi, '').replace(/javascript:/gi, '').replace(/on\w+\s*=/gi, '');
const sanitizeInput = (input: string): string => stripScriptPatterns(stripHtmlTags(input.trim()));

/** Mirrors MAX_LENGTHS in app/api/it-lead/route.ts. */
const MAX_LENGTHS: Record<string, number> = {
  firstName: 100,
  lastName: 100,
  companyName: 150,
  email: 254,
  itService: 120,
  currentTools: 300,
  message: 1000,
};

const SUBMISSION_COOLDOWN_MS = 300000; // 5 minute cooldown between submissions
const COOLDOWN_KEY = 'caliber_it_contact_last_submit';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  itService: string;
  currentTools: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMPTY_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  itService: "",
  currentTools: "",
  message: "",
};

export default function ITContactForm() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState(""); // Bot trap - should remain empty
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const serviceOptions = SERVICE_OPTIONS.filter((option) => isEnabled(option.requiresFlag));
  const replyTime = IT_FLAGS.showReplyTime && CONTACT.replyTime ? CONTACT.replyTime : null;

  useEffect(() => {
    const lastSubmitStr = localStorage.getItem(COOLDOWN_KEY);
    if (lastSubmitStr) {
      const elapsed = Date.now() - parseInt(lastSubmitStr, 10);
      if (elapsed < SUBMISSION_COOLDOWN_MS) {
        setCooldownRemaining(Math.ceil((SUBMISSION_COOLDOWN_MS - elapsed) / 1000));
      }
    }
  }, []);

  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setInterval(() => {
        setCooldownRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldownRemaining]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const firstName = sanitizeInput(formData.firstName);
    const lastName = sanitizeInput(formData.lastName);
    const companyName = sanitizeInput(formData.companyName);
    const email = formData.email.trim();
    const message = sanitizeInput(formData.message);

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";

    if (!email) {
      newErrors.email = "Work email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!companyName) newErrors.companyName = "Company is required";
    if (!formData.itService) newErrors.itService = "Please select a service";
    if (!message) newErrors.message = "Please tell us what isn't working";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const maxLen = MAX_LENGTHS[name];
    const clampedValue = maxLen ? value.slice(0, maxLen) : value;
    setFormData((prev) => ({ ...prev, [name]: clampedValue }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");

    if (cooldownRemaining > 0) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());

    try {
      // The honeypot is checked on the server, never here: short-circuiting in
      // the browser would silently discard a real lead whose browser autofilled
      // the hidden field, while showing them a success message.
      const sanitizedData = {
        ...formData,
        firstName: sanitizeInput(formData.firstName),
        lastName: sanitizeInput(formData.lastName),
        companyName: sanitizeInput(formData.companyName),
        currentTools: sanitizeInput(formData.currentTools),
        message: sanitizeInput(formData.message),
        email: formData.email.trim(),
        website: honeypot,
      };

      // Trailing slash required: next.config.js sets trailingSlash: true, so
      // "/api/it-lead" answers with a 308 and a POST body would depend on
      // redirect-following to survive.
      const response = await fetch("/api/it-lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      // Only a confirmed write counts as success. Never tell someone their
      // message was sent when it was not.
      const result = await response.json().catch(() => null);
      if (!response.ok || !result || result.ok !== true) {
        throw new Error("Form submission failed");
      }

      setSubmitStatus("success");
      setCooldownRemaining(0);
      setFormData(EMPTY_FORM);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-xl bg-white border border-[#d0d0d0]
    text-[#4a4a4a] placeholder-[#b0b0b0]
    focus:outline-none focus:border-[#7fffd4] focus:ring-2 focus:ring-[#7fffd4]/20
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  const labelClasses = "block text-sm font-medium text-[#4a4a4a] mb-1.5";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <section id="it-contact" className="section-padding bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left — intro */}
          <div className="lg:col-span-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9b9b9b]">
              {CONTACT.eyebrow}
            </span>
            <h2 className="heading-2 mt-3 mb-4 text-balance">{CONTACT.heading}</h2>
            <p className="body-text mb-8">{CONTACT.body}</p>

            <div className="space-y-4 text-sm">
              <p className="text-[#6b6b6b]">
                <ObfuscatedEmail
                  user={CONTACT.emailUser}
                  domain={CONTACT.emailDomain}
                  className="text-[#0d9e70] hover:underline font-medium"
                />
              </p>
              {replyTime && <p className="text-[#6b6b6b]">{replyTime}</p>}
              <p className="text-[#6b6b6b]">
                {CONTACT.crossLink.text}{' '}
                <Link href={CONTACT.crossLink.href} className="text-[#0d9e70] hover:underline font-medium">
                  {CONTACT.crossLink.label} &rarr;
                </Link>
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Honeypot — hidden from people, irresistible to bots */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="it-firstName" className={labelClasses}>First name *</label>
                  <input
                    id="it-firstName" name="firstName" type="text"
                    value={formData.firstName} onChange={handleChange}
                    disabled={isSubmitting} className={inputClasses}
                  />
                  {errors.firstName && <p className={errorClasses}>{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="it-lastName" className={labelClasses}>Last name *</label>
                  <input
                    id="it-lastName" name="lastName" type="text"
                    value={formData.lastName} onChange={handleChange}
                    disabled={isSubmitting} className={inputClasses}
                  />
                  {errors.lastName && <p className={errorClasses}>{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="it-email" className={labelClasses}>Work email *</label>
                  <input
                    id="it-email" name="email" type="email"
                    value={formData.email} onChange={handleChange}
                    disabled={isSubmitting} className={inputClasses}
                  />
                  {errors.email && <p className={errorClasses}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="it-companyName" className={labelClasses}>Company *</label>
                  <input
                    id="it-companyName" name="companyName" type="text"
                    value={formData.companyName} onChange={handleChange}
                    disabled={isSubmitting} className={inputClasses}
                  />
                  {errors.companyName && <p className={errorClasses}>{errors.companyName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="it-itService" className={labelClasses}>Service *</label>
                <select
                  id="it-itService" name="itService"
                  value={formData.itService} onChange={handleChange}
                  disabled={isSubmitting} className={inputClasses}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.value}</option>
                  ))}
                </select>
                {errors.itService && <p className={errorClasses}>{errors.itService}</p>}
              </div>

              <div>
                <label htmlFor="it-currentTools" className={labelClasses}>Current tools</label>
                <input
                  id="it-currentTools" name="currentTools" type="text"
                  value={formData.currentTools} onChange={handleChange}
                  placeholder={CONTACT.currentToolsPlaceholder}
                  disabled={isSubmitting} className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="it-message" className={labelClasses}>
                  What isn&apos;t working right now? *
                </label>
                <textarea
                  id="it-message" name="message" rows={5}
                  value={formData.message} onChange={handleChange}
                  disabled={isSubmitting} className={inputClasses}
                />
                {errors.message && <p className={errorClasses}>{errors.message}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || cooldownRemaining > 0}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Sending..."
                    : cooldownRemaining > 0
                      ? `Please wait ${cooldownRemaining}s`
                      : CONTACT.submitLabel}
                </button>

                <p className="text-xs text-[#9b9b9b] mt-3 text-center">
                  By submitting, you agree to our{' '}
                  <Link href="/privacy-policy/" className="text-[#0d9e70] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {submitStatus === "success" && (
                <p role="status" className="text-sm text-[#0d9e70] font-medium text-center">
                  Thanks — we&apos;ve got it. We&apos;ll be in touch shortly.
                </p>
              )}
              {submitStatus === "error" && (
                <p role="alert" className="text-sm text-red-500 font-medium text-center">
                  Something went wrong. Please try again, or email us directly.
                </p>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
