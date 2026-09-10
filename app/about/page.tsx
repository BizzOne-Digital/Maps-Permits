import type { Metadata } from "next";
import Image from "next/image";
import { Target, Compass, ShieldCheck, MapPin, CheckCircle2, Users, ClipboardCheck, Clock, Building2, KeyRound } from "lucide-react";
import StatsCard from "@/components/common/StatsCard";
import PageHero from "@/components/common/PageHero";
import Breadcrumb from "@/components/common/Breadcrumb";
import SectionHeading from "@/components/common/SectionHeading";
import CTAButton from "@/components/common/CTAButton";
import { SERVICE_AREA_CITIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Maps & Permits provides professional drawings, permit applications, and municipal approval assistance across the GTA. Learn about our mission and approach.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="Built Around Plans, Permits & Progress"
        description="Maps & Permits helps homeowners, builders, developers, and contractors move projects forward with clear drawings, coordinated approvals, and dependable construction support."
        image="https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1600&q=80"
        breadcrumb={<Breadcrumb items={[{ label: "About Us" }]} />}
      />

      <section className="py-20 section-tint">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/about.png"
              alt="Architectural planning and drafting"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[var(--primary-blue)] mb-3">
              COMPANY
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-[var(--navy)] mb-5">
              Professional Drawings. Coordinated Approvals. Real Progress.
            </h2>
            <p className="text-[var(--muted)] mb-4">
              Maps &amp; Permits provides professional drawings, maps, permit
              applications, municipal approval assistance, and construction
              solutions — helping clients prepare construction documentation,
              obtain municipal approvals, and move projects from planning
              through construction.
            </p>
            <p className="text-[var(--muted)]">
              Our team works closely with homeowners, builders, developers,
              contractors, and investors across the GTA, translating project
              ideas into buildable, code-conscious drawings that municipalities
              can review with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 bg-[var(--navy)]">
        <div className="container-page grid grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard value="3000+" label="Projects Approved" dark />
          <StatsCard value="55+" label="Municipalities" dark />
          <StatsCard value="24 HR" label="Fast-Track Drawings" dark />
          <StatsCard value="98%" label="Client Satisfaction" dark />
        </div>
      </section>

      <section className="py-20 bg-[var(--off-white)]">
        <div className="container-page grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[var(--border)] p-7">
            <span className="w-11 h-11 rounded-lg grad-blue text-white flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg text-[var(--navy)] mb-2">Our Mission</h3>
            <p className="text-sm text-[var(--muted)]">
              To make drawings, permits and project approvals easier to
              understand, easier to manage and easier to move forward.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[var(--border)] p-7">
            <span className="w-11 h-11 rounded-lg grad-blue text-white flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg text-[var(--navy)] mb-2">Our Approach</h3>
            <p className="text-sm text-[var(--muted)]">
              We start with a clear consultation, prepare accurate
              code-conscious drawings, and stay engaged through municipal
              review so projects keep moving without unnecessary delays.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[var(--border)] p-7">
            <span className="w-11 h-11 rounded-lg grad-blue text-white flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg text-[var(--navy)] mb-2">Why Maps &amp; Permits</h3>
            <p className="text-sm text-[var(--muted)]">
              Familiarity with GTA municipal requirements, a fast-track drawing
              option, and support that spans from planning through
              construction.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="py-20 section-tint-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="WHO WE HELP"
            title="Trusted by Homeowners, Builders & Developers"
            description="Whatever stage your project is at, our team adapts our drawings and municipal coordination to fit how you work."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-14">
            {[
              {
                icon: Users,
                title: "Homeowners",
                description: "Additions, renovations, and basement units guided from idea to permit-ready drawings.",
              },
              {
                icon: Building2,
                title: "Builders & Contractors",
                description: "Reliable drawing turnaround and code-conscious documentation that keeps job sites moving.",
              },
              {
                icon: ClipboardCheck,
                title: "Developers & Investors",
                description: "Multi-project coordination and ongoing documentation support across your portfolio.",
              },
              {
                icon: Clock,
                title: "Time-Sensitive Projects",
                description: "A 24-hour fast-track drawing option for projects working against a tight timeline.",
              },
              {
                icon: KeyRound,
                title: "Realtors",
                description: "Fast permit and drawing insight to help close deals faster on properties with renovation or addition potential.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl border border-[var(--border)] bg-white shadow-sm">
                <span className="w-12 h-12 rounded-lg grad-blue text-white flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-5 h-5" />
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
              Ready to Move Your Project Forward?
            </h3>
            <p className="text-white/80">
              Tell us about your project and we&apos;ll outline the drawings and approvals you&apos;ll need.
            </p>
          </div>
          <CTAButton href="/contact" variant="primary" className="!bg-white !text-[var(--primary-blue)] hover:!bg-white/90">
            Get In Touch
          </CTAButton>
        </div>
      </section>

      <section className="py-20 bg-[var(--navy)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 10% 10%, rgba(8,120,209,0.35), transparent 40%), radial-gradient(circle at 90% 90%, rgba(100,215,25,0.25), transparent 40%)" }} />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="COVERAGE"
            title="Proudly Serving Ontario"
            description={`Based in Brampton, we support projects across ${SERVICE_AREA_CITIES.length}+ cities and municipalities within roughly 100km.`}
            light
          />
          <div className="mt-10 mb-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 text-left">
              {SERVICE_AREA_CITIES.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/85"
                >
                  <MapPin className="w-3.5 h-3.5 text-[var(--bright-green)] shrink-0" />
                  {city}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {[
              "Professional Drawings",
              "Municipal Coordination",
              "Code-Conscious Planning",
              "Construction Support",
            ].map((point) => (
              <div key={point} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--bright-green)] shrink-0" />
                <span className="text-sm font-medium text-white/85">{point}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <CTAButton href="/contact" variant="primary">Request a Consultation</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
