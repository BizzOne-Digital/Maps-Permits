import Image from "next/image";
import { getSafeImageUrl } from "@/lib/image";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  breadcrumb?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, description, image, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative bg-[var(--navy)] overflow-hidden">
      <Image
        src={getSafeImageUrl(image)}
        alt={title}
        fill
        priority
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/80 via-[var(--navy)]/85 to-[var(--navy)]" />
      <div className="container-page relative py-20 sm:py-28">
        {breadcrumb && <div className="mb-5">{breadcrumb}</div>}
        {eyebrow && (
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[var(--bright-green)] mb-3">
            {eyebrow}
          </span>
        )}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white max-w-3xl mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-white/75 max-w-2xl text-base sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
