"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ObfuscatedEmail from "./ObfuscatedEmail";

// --- Security: Sanitization Utilities ---
const stripHtmlTags = (input: string): string => input.replace(/<[^>]*>/g, '');
const stripScriptPatterns = (input: string): string => input.replace(/<script[^>]*>.*?<\/script>/gi, '').replace(/javascript:/gi, '').replace(/on\w+\s*=/gi, '');
const sanitizeInput = (input: string): string => stripScriptPatterns(stripHtmlTags(input.trim()));

const MAX_LENGTHS: Record<string, number> = {
  firstName: 100,
  lastName: 100,
  companyName: 150,
  phoneNumber: 30,
  email: 254,
  staffCount: 10,
  message: 1000,
};

const SUBMISSION_COOLDOWN_MS = 300000; // 5 minute cooldown between submissions

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

const staffRequired = [
  "1-5 staff",
  "6-10 staff",
  "11-20 staff",
  "21-50 staff",
  "50+ staff",
];

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Belgium",
  "Belize",
  "Bolivia",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Cambodia",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malaysia",
  "Maldives",
  "Malta",
  "Mexico",
  "Monaco",
  "Mongolia",
  "Morocco",
  "Myanmar",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Venezuela",
  "Vietnam",
  "Zimbabwe",
];

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  companySize: string;
  phoneNumber: string;
  email: string;
  staffRequired: string;
  staffCount: string;
  country: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email?: string;
  staffRequired?: string;
  country?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    companySize: "",
    phoneNumber: "",
    email: "",
    staffRequired: "",
    staffCount: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // --- Phase 2: Anti-Spam ---
  const [honeypot, setHoneypot] = useState(""); // Bot trap - should remain empty
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // Check localStorage on mount for existing cooldown
  useEffect(() => {
    const lastSubmitStr = localStorage.getItem('caliber_contact_last_submit');
    if (lastSubmitStr) {
      const lastSubmit = parseInt(lastSubmitStr, 10);
      const elapsed = Date.now() - lastSubmit;

      if (elapsed < SUBMISSION_COOLDOWN_MS) {
        setCooldownRemaining(Math.ceil((SUBMISSION_COOLDOWN_MS - elapsed) / 1000));
      }
    }
  }, []);

  // Update cooldown timer every second if active
  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setInterval(() => {
        setCooldownRemaining(prev => Math.max(0, prev - 1));
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

    if (!firstName) {
      newErrors.firstName = "First name is required";
    } else if (firstName.length > MAX_LENGTHS.firstName) {
      newErrors.firstName = `First name must be under ${MAX_LENGTHS.firstName} characters`;
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.length > MAX_LENGTHS.lastName) {
      newErrors.lastName = `Last name must be under ${MAX_LENGTHS.lastName} characters`;
    }

    if (!companyName) {
      newErrors.companyName = "Company name is required";
    } else if (companyName.length > MAX_LENGTHS.companyName) {
      newErrors.companyName = `Company name must be under ${MAX_LENGTHS.companyName} characters`;
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.staffRequired) {
      newErrors.staffRequired = "Please select staff required";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    if (!message) {
      newErrors.message = "Message is required";
    } else if (message.length > MAX_LENGTHS.message) {
      newErrors.message = `Message must be under ${MAX_LENGTHS.message} characters`;
    }

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

    // Phase 2: Honeypot check — if filled, silently reject
    if (honeypot) {
      setSubmitStatus("success"); // Fake success to not alert bots
      return;
    }

    // Phase 2: Persistent Cooldown check
    if (cooldownRemaining > 0) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Save submission time to localStorage
    localStorage.setItem('caliber_contact_last_submit', Date.now().toString());

    try {
      // Sanitize all text inputs before submission
      const sanitizedData = {
        ...formData,
        firstName: sanitizeInput(formData.firstName),
        lastName: sanitizeInput(formData.lastName),
        companyName: sanitizeInput(formData.companyName),
        message: sanitizeInput(formData.message),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
      };

      const response = await fetch("https://formspree.io/f/xpqjnnwv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setSubmitStatus("success");
      setCooldownRemaining(0);
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        companySize: "",
        phoneNumber: "",
        email: "",
        staffRequired: "",
        staffCount: "",
        country: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
    text-white placeholder-gray-500 
    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
    transition-all duration-300
    hover:bg-white/10 hover:border-white/20
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const labelClasses = "block text-sm font-medium text-gray-300 mb-2";

  const errorClasses = "text-red-400 text-xs mt-1";

  return (
    <section id="connect" className="pt-8 sm:pt-12 pb-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Scale <span className="text-primary">With Confidence?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Partner with Caliber Business Resource for premium managed staffing solutions.<br />
            Reduce overhead while improving your operational efficiency.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
              <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Looking for a Job?
              </h3>
              <p className="text-sm text-primary/80 mb-4">
                This form is for business partnerships and client inquiries.
              </p>
              <a href="#open-roles" className="text-sm font-bold text-white hover:text-primary transition-colors flex items-center gap-1 w-max">
                View Open Roles
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 1.621.497 3.142 1.358 4.412l-.78 3.538a.5.5 0 0 0 .654.654l3.538-.78A7.96 7.96 0 0 0 12 18c4.418 0 8-3.582 8-8z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Visit Us</p>
                    <p className="text-white">
                      Ruberen Complex Commercial Building,<br />
                      Venancio P. Inting Avenue,<br />
                      Tagbilaran City, Bohol
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Call Us</p>
                    <a href="tel:+14059268324" className="text-white hover:text-primary transition-colors">
                      +1 (405) 926-8324
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Us</p>
                    <ObfuscatedEmail
                      user="info"
                      domain="caliberbusinessresource.com"
                      className="text-white hover:text-primary transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="space-y-4">
              <a
                href="https://www.facebook.com/profile.php?id=61561838143537"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 rounded-2xl bg-blue-600/10 border border-blue-500/30 hover:border-blue-500 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold group-hover:text-blue-400 transition-colors">Facebook</h4>
                    <p className="text-blue-400 text-sm">@CaliberBusinessResource</p>
                  </div>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/caliber-business-resource-bpo-inc/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 rounded-2xl bg-blue-700/10 border border-blue-600/30 hover:border-blue-600 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.5,2h-17A1.5,1.5,0,0,0,2,3.5v17A1.5,1.5,0,0,0,3.5,22h17a1.5,1.5,0,0,0,1.5-1.5v-17A1.5,1.5,0,0,0,20.5,2ZM8,19H5v-9h3ZM6.5,8.25A1.75,1.75,0,1,1,8.25,6.5,1.75,1.75,0,0,1,6.5,8.25ZM19,19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74,1.74,0,0,0,13,14.19a.66.66,0,0,0,.14.03h.14V13h-3v-9h3V9A3,3,0,0,1,15.46,6.06c1.58,0,2.54,1,2.54,2.93Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold group-hover:text-blue-400 transition-colors">LinkedIn</h4>
                    <p className="text-blue-400 text-sm">Caliber Business Resource</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              {submitStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="bg-primary hover:bg-primary/90 text-background px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(255,193,7,0.5)]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Phase 2: Honeypot — hidden field to catch bots */}
                  <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Leave this empty</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className={labelClasses}>
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.firstName ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                        placeholder="John"
                        maxLength={MAX_LENGTHS.firstName}
                      />
                      {errors.firstName && <p className={errorClasses}>{errors.firstName}</p>}
                    </div>

                    <div>
                      <label htmlFor="lastName" className={labelClasses}>
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.lastName ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                        placeholder="Doe"
                        maxLength={MAX_LENGTHS.lastName}
                      />
                      {errors.lastName && <p className={errorClasses}>{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="companyName" className={labelClasses}>
                        Company Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.companyName ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                        placeholder="Acme Inc."
                        maxLength={MAX_LENGTHS.companyName}
                      />
                      {errors.companyName && <p className={errorClasses}>{errors.companyName}</p>}
                    </div>

                    <div>
                      <label htmlFor="companySize" className={labelClasses}>
                        Company Size
                      </label>
                      <select
                        id="companySize"
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%239ca3af%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem_1.5rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                      >
                        <option value="" className="bg-slate-800">Select company size</option>
                        {companySizes.map((size) => (
                          <option key={size} value={size} className="bg-slate-800">
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phoneNumber" className={labelClasses}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                        placeholder="john@company.com"
                        maxLength={MAX_LENGTHS.email}
                      />
                      {errors.email && <p className={errorClasses}>{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="staffRequired" className={labelClasses}>
                        Staff Required <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="staffRequired"
                        name="staffRequired"
                        value={formData.staffRequired}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%239ca3af%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem_1.5rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${errors.staffRequired ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                      >
                        <option value="" className="bg-slate-800">Select staff required</option>
                        {staffRequired.map((staff) => (
                          <option key={staff} value={staff} className="bg-slate-800">
                            {staff}
                          </option>
                        ))}
                      </select>
                      {errors.staffRequired && <p className={errorClasses}>{errors.staffRequired}</p>}
                    </div>

                    <div>
                      <label htmlFor="staffCount" className={labelClasses}>
                        No. of Staff Required
                      </label>
                      <input
                        type="number"
                        id="staffCount"
                        name="staffCount"
                        value={formData.staffCount}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="e.g., 5"
                        min="1"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className={labelClasses}>
                      Country <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%239ca3af%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem_1.5rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${errors.country ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                    >
                      <option value="" className="bg-slate-800">Select country</option>
                      {countries.map((country) => (
                        <option key={country} value={country} className="bg-slate-800">
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.country && <p className={errorClasses}>{errors.country}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`${inputClasses} resize-none ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                      placeholder="Tell us about your needs..."
                      maxLength={MAX_LENGTHS.message}
                    />
                    <p className="text-gray-600 text-xs text-right mt-1">
                      {formData.message.length}/{MAX_LENGTHS.message}
                    </p>
                    {errors.message && <p className={errorClasses}>{errors.message}</p>}
                  </div>

                  {cooldownRemaining > 0 && (
                    <p className="text-yellow-400 text-sm text-center">
                      Please wait {Math.floor(cooldownRemaining / 60)}m {cooldownRemaining % 60}s before submitting again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || cooldownRemaining > 0}
                    className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-background px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(255,193,7,0.5)] transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </>
                    )}
                  </button>

                  {submitStatus === "error" && (
                    <p className="text-red-400 text-center text-sm">
                      Something went wrong. Please try again later.
                    </p>
                  )}

                  <p className="text-center text-gray-500 text-sm">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
