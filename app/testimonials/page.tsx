import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import Breadcrumb from "@/components/common/Breadcrumb";
import TestimonialCard from "@/components/common/TestimonialCard";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { FALLBACK_TESTIMONIALS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "See what homeowners, builders, and developers across the GTA say about working with Maps & Permits.",
};

async function getTestimonials() {
  try {
    await connectToDatabase();
    const testimonials = await Testimonial.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();
    if (testimonials.length > 0) return testimonials;
  } catch (err) {
    console.error("Failed to load testimonials:", err);
  }
  return FALLBACK_TESTIMONIALS.map((t, i) => ({ ...t, _id: String(i) }));
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHero
        eyebrow="TESTIMONIALS"
        title="Trusted by Homeowners, Builders & Developers"
        description="Real feedback from clients across the Greater Toronto Area."
        image="https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1600&q=80"
        breadcrumb={<Breadcrumb items={[{ label: "Testimonials" }]} />}
      />

      <section className="py-20 section-tint">
        <div className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard
              key={String(t._id)}
              name={t.name}
              location={t.location}
              projectType={t.projectType}
              rating={t.rating}
              quote={t.quote}
            />
          ))}
        </div>
      </section>
    </>
  );
}
