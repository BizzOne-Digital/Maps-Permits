import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import Breadcrumb from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Maps & Permits collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        breadcrumb={<Breadcrumb items={[{ label: "Privacy Policy" }]} />}
      />
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl prose">
          <p className="text-[var(--muted)] mb-4">
            Maps &amp; Permits collects information you submit through our
            contact form — including your name, email, phone number, and
            project details — solely to respond to your inquiry and provide
            requested services.
          </p>
          <p className="text-[var(--muted)] mb-4">
            We do not sell or share your personal information with third
            parties for marketing purposes. Information is retained only as
            long as needed to support your project and our business records.
          </p>
          <p className="text-[var(--muted)]">
            If you have questions about how your information is handled,
            contact us at maps.permit@gmail.com.
          </p>
        </div>
      </section>
    </>
  );
}
