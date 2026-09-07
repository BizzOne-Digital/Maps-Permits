"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/components/common/Toast";

const PROJECT_TYPES = [
  "Permit Drawings",
  "Building Permit Application",
  "Architectural Drawings",
  "Site Plan / Mapping",
  "Municipal Approval",
  "Renovation",
  "Addition",
  "Basement / Secondary Unit",
  "Commercial Project",
  "Other",
];

export default function ContactForm() {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) {
      setErrors({ agree: "Please confirm you agree to be contacted." });
      return;
    }
    setSubmitting(true);
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        showToast(data.error || "Something went wrong. Please try again.", "error");
        return;
      }

      showToast("Thank you. Your project inquiry has been submitted.", "success");
      form.reset();
      setAgreed(false);
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-[var(--border)] px-3.5 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">
            Full Name
          </label>
          <input name="name" required className={inputClass} placeholder="John Smith" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className={inputClass}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">Phone</label>
          <input name="phone" className={inputClass} placeholder="(437) 000-0000" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">
            Postal Code
          </label>
          <input name="postalCode" className={inputClass} placeholder="L6T 0A1" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">
            Project Type
          </label>
          <select name="projectType" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select a project type
            </option>
            {PROJECT_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">
            Municipality
          </label>
          <input name="municipality" className={inputClass} placeholder="Brampton" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1">
          Property Address
        </label>
        <input
          name="propertyAddress"
          className={inputClass}
          placeholder="123 Main St, Brampton, ON"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1">Message</label>
        <textarea
          name="message"
          required
          rows={4}
          className={inputClass}
          placeholder="Tell us about your project..."
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      <label className="flex items-start gap-2 text-sm text-[var(--muted)]">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 accent-[var(--dark-green)]"
        />
        I agree to be contacted regarding my project.
      </label>
      {errors.agree && <p className="text-xs text-red-500 -mt-2">{errors.agree}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-md grad-green px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 disabled:opacity-60 w-full sm:w-auto"
      >
        {submitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        Request Consultation
      </button>
    </form>
  );
}
