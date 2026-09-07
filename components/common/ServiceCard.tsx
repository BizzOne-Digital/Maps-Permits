import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icons";

interface ServiceCardProps {
  title: string;
  slug: string;
  description: string;
  icon?: string;
}

export default function ServiceCard({ title, slug, description, icon }: ServiceCardProps) {
  const Icon = getIcon(icon);

  return (
    <Link
      href={`/services/${slug}`}
      className="group flex flex-col rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <span className="w-12 h-12 rounded-lg grad-blue text-white flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" />
      </span>
      <h3 className="font-heading font-bold text-lg text-[var(--navy)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--muted)] flex-1 mb-4">{description}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--dark-green)] group-hover:gap-2.5 transition-all">
        Learn More
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
