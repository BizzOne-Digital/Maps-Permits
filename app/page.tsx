import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Building2,
  HardHat,
  ShieldCheck,
  PencilRuler,
  ClipboardCheck,
  Phone,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import SectionHeading from "@/components/common/SectionHeading";
import CTAButton from "@/components/common/CTAButton";
import ServiceCard from "@/components/common/ServiceCard";
import TestimonialCard from "@/components/common/TestimonialCard";
import StatsCard from "@/components/common/StatsCard";
import {
  FALLBACK_SERVICES,
  FALLBACK_TESTIMONIALS,
  SERVICE_AREA_CITIES,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
} from "@/lib/constants";

export const dynamic = "force-dynamic";

async function getServices() {
  try {
    await connectToDatabase();
    const services = await Service.find({ published: true })
      .sort({ order: 1, createdAt: 1 })
      .limit(6)
      .lean();
    if (services.length > 0) return services;
  } catch (err) {
    console.error("Failed to load services:", err);
  }
  return FALLBACK_SERVICES.slice(0, 6).map((s) => ({ ...s, _id: s.slug }));
}

async function getTestimonials() {
  try {
    await connectToDatabase();
    const testimonials = await Testimonial.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();
    if (testimonials.length > 0) return testimonials;
  } catch (err) {
    console.error("Failed to load testimonials:", err);
  }
  return FALLBACK_TESTIMONIALS.map((t, i) => ({ ...t, _id: String(i) }));
}

const HOW_IT_WORKS = [
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

export default async function HomePage() {
  const [services, testimonials] = await Promise.all([getServices(), getTestimonials()]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--navy)]">
        <Image
          src="/hero.png"
          alt="Toronto skyline architecture"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="100vw"
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none hidden sm:block"
          viewBox="0 0 800 600"
          fill="none"
        >
          <path d="M0 500 L200 500 L200 350 L400 350 L400 450 L800 450" stroke="#64D719" strokeWidth="1.5" />
          <path d="M100 600 L100 200 L500 200 L500 100 L800 100" stroke="#0878D1" strokeWidth="1.5" />
          <circle cx="200" cy="350" r="4" fill="#64D719" />
          <circle cx="500" cy="100" r="4" fill="#0878D1" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/40 via-[var(--navy)]/55 to-[var(--navy)]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/85 via-[var(--navy)]/40 to-transparent" />

        <div className="container-page relative py-20 sm:py-32">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-[var(--bright-green)] mb-5">
            BUILD TODAY. A BRIGHTER TOMORROW.
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl leading-[1.05] max-w-3xl mb-6">
            <span className="text-white">Plans Approved.</span>{" "}
            <span className="text-[var(--bright-green)]">Projects Moving.</span>
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mb-8">
            Professional drawings, permit applications, municipal approvals, and
            construction solutions across the GTA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <CTAButton href="/contact" variant="primary">
              Get Your Permit Started
            </CTAButton>
            <CTAButton href="/services" variant="outline" className="!text-white !border-white/40 hover:!bg-white/10">
              Explore Services
            </CTAButton>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { icon: FileText, label: "Permit Drawings", sub: "Accurate & Code Compliant" },
              { icon: Building2, label: "Municipal Approvals", sub: "Navigate with Confidence" },
              { icon: HardHat, label: "Construction Services", sub: "From Plans to Progress" },
            ].map((chip) => (
              <div
                key={chip.label}
                className="flex items-center gap-3 rounded-lg bg-white/10 border border-white/15 px-4 py-3 backdrop-blur-sm"
              >
                <chip.icon className="w-5 h-5 text-[var(--bright-green)] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">{chip.label}</p>
                  <p className="text-xs text-white/60 leading-tight">{chip.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {["GTA", ...SERVICE_AREA_CITIES.map((c) => c.toUpperCase()), "AND BEYOND"].map((city) => (
              <span
                key={city}
                className="text-[11px] font-semibold tracking-wide uppercase text-white/60 border border-white/15 rounded-full px-3 py-1"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex absolute top-24 right-16 items-center gap-3 rounded-xl bg-white shadow-xl px-5 py-4 z-10">
          <span className="w-10 h-10 rounded-lg grad-green flex items-center justify-center text-white shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </span>
          <div>
            <p className="font-heading font-extrabold text-lg text-[var(--navy)] leading-none">24 HOUR</p>
            <p className="text-xs text-[var(--muted)]">Permit Drawing Submission</p>
          </div>
        </div>
      </section>

      {/* TRUST / INTRO */}
      <section className="py-20 bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[var(--primary-blue)] mb-3">
              MAPS &amp; PERMITS
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--navy)] mb-5">
              From Plans to Approval, We Keep Your Project Moving
            </h2>
            <p className="text-[var(--muted)] mb-8">
              Maps &amp; Permits provides professional drawings, maps, permit
              applications, municipal approval assistance, and construction
              solutions — helping clients prepare construction documentation,
              obtain municipal approvals, and move projects from planning through
              construction.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: PencilRuler, label: "Professional Drawings" },
                { icon: Building2, label: "Municipal Coordination" },
                { icon: ShieldCheck, label: "Code-Conscious Planning" },
                { icon: HardHat, label: "Construction Support" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-md bg-[var(--sky-blue)] flex items-center justify-center shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-[var(--primary-blue)]" />
                  </span>
                  <span className="text-sm font-medium text-[var(--text)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/home1.png"
              alt="Architectural blueprint and construction planning"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-[var(--off-white)]">
        <div className="container-page">
          <SectionHeading
            eyebrow="OUR SERVICES"
            title="Complete Permit & Construction Solutions"
            description="From first drawings to final approval, our services are built to keep your project on schedule."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
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

      {/* 24-HOUR OFFER */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="container-page text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[var(--bright-green)] bg-white/10 rounded-full px-4 py-1.5 mb-5">
            FAST-TRACK SERVICE
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-4">
            Need Permit Drawings Fast?
          </h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8">
            Get your permit drawings prepared for submission within 24 hours.*
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <CTAButton href="/contact" variant="primary">Start Your Project</CTAButton>
            <CTAButton href={`tel:${CONTACT_PHONE_TEL}`} variant="outline" className="!text-white !border-white/40 hover:!bg-white/10">
              <Phone className="w-4 h-4" /> Call {CONTACT_PHONE}
            </CTAButton>
          </div>
          <p className="text-xs text-white/40">
            *Turnaround depends on project requirements and availability.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="OUR PROCESS" title="A Clear Path From Idea to Approval" />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-[var(--border)]" />
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <span className="w-12 h-12 rounded-full grad-blue text-white flex items-center justify-center font-heading font-bold z-10 mb-4">
                  {item.step}
                </span>
                <h3 className="font-heading font-bold text-lg text-[var(--navy)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-[var(--off-white)]">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="WHY CHOOSE US"
              title="Permit Expertise You Can Build On"
              description="We combine drawing accuracy, municipal know-how, and construction awareness to help your project move without unnecessary delays."
            />
            <ul className="mt-6 space-y-3">
              {[
                "Code-conscious drawing preparation",
                "Familiarity with GTA municipal requirements",
                "Clear communication at every step",
                "Support from planning through construction",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-[var(--text)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--dark-green)] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatsCard value="100 KM+" label="Service Radius" />
            <StatsCard value="24 HR" label="Fast-Track Drawing Option" />
            <StatsCard value="GTA" label="Focused Service Area" />
            <StatsCard value="End-to-End" label="Project Support" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="container-page">
          <SectionHeading
            light
            eyebrow="TESTIMONIALS"
            title="Trusted by Homeowners, Builders & Developers Across the GTA."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {testimonials.map((t) => (
              <TestimonialCard
                key={String(t._id)}
                name={t.name}
                location={t.location}
                projectType={t.projectType}
                rating={t.rating}
                quote={t.quote}
                dark
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="py-20 bg-white">
        <div className="container-page text-center">
          <SectionHeading
            eyebrow="SERVICE AREA"
            title="Serving Brampton and Communities Across the GTA"
            description={`We proudly serve homeowners, builders, developers, and contractors across ${SERVICE_AREA_CITIES.join(", ")}, and surrounding areas within about 100km of Brampton, Ontario.`}
          />
          <div className="flex flex-wrap justify-center gap-2 mt-8 mb-10">
            {SERVICE_AREA_CITIES.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary-blue)] bg-[var(--sky-blue)] rounded-full px-3.5 py-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                {city}
              </span>
            ))}
          </div>
          <CTAButton href="/contact" variant="primary">Check Your Project Area</CTAButton>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 grad-blue">
        <div className="container-page text-center">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-8">
            Ready to Get Your Project Moving?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md grad-green px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:opacity-90"
            >
              Request a Consultation
            </Link>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white/10 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/20"
            >
              <Phone className="w-4 h-4" /> Call {CONTACT_PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
