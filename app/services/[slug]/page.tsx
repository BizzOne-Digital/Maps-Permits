import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import Breadcrumb from "@/components/common/Breadcrumb";
import CTAButton from "@/components/common/CTAButton";
import ServiceCard from "@/components/common/ServiceCard";
import connectToDatabase from "@/lib/mongodb";
import Service, { IService } from "@/models/Service";
import { FALLBACK_SERVICES } from "@/lib/constants";
import { getSafeImageUrl } from "@/lib/image";

export const dynamic = "force-dynamic";

type ServiceData = Partial<IService> & {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string;
  image?: string;
  features?: string[];
  process?: { step: string; title: string; description: string }[];
};

async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  try {
    await connectToDatabase();
    const service = await Service.findOne({ slug, published: true }).lean();
    if (service) return service as unknown as ServiceData;
  } catch (err) {
    console.error("Failed to load service:", err);
  }
  const fallback = FALLBACK_SERVICES.find((s) => s.slug === slug);
  return fallback || null;
}

async function getRelatedServices(slug: string): Promise<ServiceData[]> {
  try {
    await connectToDatabase();
    const services = await Service.find({ published: true, slug: { $ne: slug } })
      .sort({ order: 1 })
      .limit(3)
      .lean();
    if (services.length > 0) return services as unknown as ServiceData[];
  } catch (err) {
    console.error("Failed to load related services:", err);
  }
  return FALLBACK_SERVICES.filter((s) => s.slug !== slug).slice(0, 3);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const related = await getRelatedServices(slug);

  return (
    <>
      <PageHero
        eyebrow="SERVICE"
        title={service.title}
        description={service.shortDescription}
        image={service.image}
        breadcrumb={
          <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: service.title }]} />
        }
      />

      <section className="py-20 bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-heading font-extrabold text-2xl text-[var(--navy)] mb-4">
              Overview
            </h2>
            <p className="text-[var(--muted)] mb-8 leading-relaxed">{service.description}</p>

            {service.features && service.features.length > 0 && (
              <>
                <h3 className="font-heading font-bold text-xl text-[var(--navy)] mb-4">
                  Features &amp; Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[var(--dark-green)] shrink-0" />
                      <span className="text-sm text-[var(--text)]">{f}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {service.process && service.process.length > 0 && (
              <>
                <h3 className="font-heading font-bold text-xl text-[var(--navy)] mb-6">
                  Our Process
                </h3>
                <div className="space-y-6 mb-10">
                  {service.process.map((step) => (
                    <div key={step.step} className="flex gap-4">
                      <span className="w-10 h-10 rounded-full grad-blue text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">
                        {step.step}
                      </span>
                      <div>
                        <h4 className="font-semibold text-[var(--navy)] mb-1">{step.title}</h4>
                        <p className="text-sm text-[var(--muted)]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="rounded-xl bg-[var(--off-white)] border border-[var(--border)] p-8 text-center">
              <h3 className="font-heading font-bold text-xl text-[var(--navy)] mb-2">
                Ready to get started with {service.title}?
              </h3>
              <p className="text-sm text-[var(--muted)] mb-5">
                Request a free consultation and we&apos;ll help outline next steps for your project.
              </p>
              <CTAButton href="/contact" variant="primary">Get Your Free Consultation</CTAButton>
            </div>
          </div>

          <div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-md mb-6">
              <Image
                src={getSafeImageUrl(service.image)}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-white p-6">
              <h4 className="font-heading font-bold text-[var(--navy)] mb-3">Need Help Fast?</h4>
              <p className="text-sm text-[var(--muted)] mb-4">
                Permit drawings can be fast-tracked for submission within 24 hours.*
              </p>
              <CTAButton href="tel:4377776887" variant="secondary" className="w-full">
                Call 437-777-6887
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 bg-[var(--off-white)]">
          <div className="container-page">
            <h2 className="font-heading font-extrabold text-2xl text-[var(--navy)] mb-8 text-center">
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((s) => (
                <ServiceCard
                  key={s.slug}
                  title={s.title}
                  slug={s.slug}
                  description={s.shortDescription}
                  icon={s.icon}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
