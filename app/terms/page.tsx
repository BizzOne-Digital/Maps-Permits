import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import Breadcrumb from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for using the Maps & Permits website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        breadcrumb={<Breadcrumb items={[{ label: "Terms" }]} />}
      />
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl prose">
          <p className="text-[var(--muted)] mb-4">
            By using this website, you agree to use it only for lawful
            purposes related to inquiring about our drawing, permit, and
            construction services.
          </p>
          <p className="text-[var(--muted)] mb-4">
            Information provided on this site is for general informational
            purposes and does not constitute a guarantee of permit approval
            or project timelines, which depend on municipal requirements and
            project-specific factors.
          </p>
          <p className="text-[var(--muted)]">
            For questions about these terms, contact us at
            maps.permit@gmail.com.
          </p>
        </div>
      </section>
    </>
  );
}
