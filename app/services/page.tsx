import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import Breadcrumb from "@/components/common/Breadcrumb";
import ServiceCard from "@/components/common/ServiceCard";
import SectionHeading from "@/components/common/SectionHeading";
import StatsCard from "@/components/common/StatsCard";
import CTAButton from "@/components/common/CTAButton";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";
import { FALLBACK_SERVICES } from "@/lib/constants";

const PROCESS = [
  {
    step: "01",
    title: "Consultation",
    description: "We learn about your project and outline the drawings and approvals you'll need.",
  },
  {
    step: "02",
    title: "Planning & Drawings",
    description: "We prepare accurate, code-conscious drawings tailored to your municipality.",
  },
  {
    step: "03",
    title: "Permit Submission",
    description: "Your application and drawings are packaged and submitted for review.",
  },
  {
    step: "04",
    title: "Approval & Construction",
    description: "Once approved, we help support your project moving into construction.",
  },
];

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Permit drawings, building permit applications, architectural drawings, site plans, municipal approvals, and construction services across the GTA.",
};

async function getServices() {
  try {
    await connectToDatabase();
    const services = await Service.find({ published: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    if (services.length > 0) return services;
  } catch (err) {
    console.error("Failed to load services:", err);
  }
  return FALLBACK_SERVICES.map((s) => ({ ...s, _id: s.slug }));
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="WHAT WE OFFER"
        title="Permit, Planning & Construction Services"
        description="Complete drawing, permit, and municipal approval support for residential and commercial projects across the GTA."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
        breadcrumb={<Breadcrumb items={[{ label: "Services" }]} />}
      />

      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={String(service._id)}
                title={service.title}
                slug={service.slug}
                description={service.shortDescription}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-14 bg-[var(--navy)]">
        <div className="container-page grid grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard value="500+" label="Projects Supported" dark />
          <StatsCard value="12+" label="GTA Municipalities" dark />
          <StatsCard value="24 HR" label="Fast-Track Drawings" dark />
          <StatsCard value="98%" label="Client Satisfaction" dark />
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-[var(--off-white)]">
        <div className="container-page">
          <SectionHeading
            eyebrow="OUR PROCESS"
            title="How We Get Your Project Approved"
            description="A clear, four-step process that keeps your drawings, permits, and approvals moving without unnecessary delays."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <span className="w-14 h-14 rounded-full grad-blue text-white flex items-center justify-center font-heading font-extrabold text-lg mb-4">
                  {item.step}
                </span>
                <h3 className="font-heading font-bold text-base text-[var(--navy)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 grad-blue">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
              Not Sure Which Service You Need?
            </h3>
            <p className="text-white/80">
              Tell us about your project and we&apos;ll recommend the right drawings and approvals.
            </p>
          </div>
          <CTAButton href="/contact" variant="primary" className="!bg-white !text-[var(--primary-blue)] hover:!bg-white/90">
            Request a Consultation
          </CTAButton>
        </div>
      </section>
    </>
  );
}
