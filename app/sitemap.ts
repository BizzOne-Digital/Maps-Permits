import type { MetadataRoute } from "next";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";
import { FALLBACK_SERVICES } from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mapsandpermits.ca";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[] = FALLBACK_SERVICES.map((s) => s.slug);
  try {
    await connectToDatabase();
    const services = await Service.find({ published: true }).select("slug").lean();
    if (services.length > 0) slugs = services.map((s) => s.slug);
  } catch {
    // fall back to static slugs
  }

  const staticRoutes = ["", "/about", "/services", "/testimonials", "/contact"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })
  );

  const serviceRoutes = slugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes];
}
