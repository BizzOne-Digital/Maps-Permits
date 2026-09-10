import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import Breadcrumb from "@/components/common/Breadcrumb";
import ContactForm from "@/components/common/ContactForm";
import { CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Maps & Permits to request a consultation for permit drawings, municipal approvals, and construction support across the GTA.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Let's Talk About Your Project"
        description="Tell us about your project and we'll get back to you with next steps."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
        breadcrumb={<Breadcrumb items={[{ label: "Contact" }]} />}
      />

      <section className="py-20 section-tint">
        <div className="container-page grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl border border-[var(--border)] p-6">
              <span className="w-11 h-11 rounded-lg grad-blue text-white flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </span>
              <h3 className="font-heading font-bold text-[var(--navy)] mb-1">Call Us</h3>
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="text-sm text-[var(--muted)] hover:text-[var(--primary-blue)]">
                {CONTACT_PHONE}
              </a>
            </div>
            <div className="rounded-xl border border-[var(--border)] p-6">
              <span className="w-11 h-11 rounded-lg grad-blue text-white flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </span>
              <h3 className="font-heading font-bold text-[var(--navy)] mb-1">Email Us</h3>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-[var(--muted)] hover:text-[var(--primary-blue)]">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="rounded-xl border border-[var(--border)] p-6">
              <span className="w-11 h-11 rounded-lg grad-blue text-white flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </span>
              <h3 className="font-heading font-bold text-[var(--navy)] mb-1">Service Area</h3>
              <p className="text-sm text-[var(--muted)]">
                Brampton, ON &amp; the Greater Toronto Area
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[var(--border)] p-6 sm:p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
