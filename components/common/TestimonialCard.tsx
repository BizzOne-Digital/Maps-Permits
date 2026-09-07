import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  projectType: string;
  rating: number;
  quote: string;
  dark?: boolean;
}

export default function TestimonialCard({
  name,
  location,
  projectType,
  rating,
  quote,
  dark = false,
}: TestimonialCardProps) {
  return (
    <div
      className={`rounded-xl p-6 h-full flex flex-col ${
        dark
          ? "bg-white/5 border border-white/10"
          : "bg-white border border-[var(--border)] shadow-sm"
      }`}
    >
      <Quote
        className={`w-8 h-8 mb-3 ${dark ? "text-[var(--bright-green)]" : "text-[var(--sky-blue)]"}`}
      />
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-[var(--bright-green)] text-[var(--bright-green)]"
                : dark
                ? "text-white/20"
                : "text-[var(--border)]"
            }`}
          />
        ))}
      </div>
      <p className={`text-sm flex-1 mb-5 ${dark ? "text-white/85" : "text-[var(--text)]"}`}>
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <p className={`font-semibold text-sm ${dark ? "text-white" : "text-[var(--navy)]"}`}>
          {name}
        </p>
        <p className={`text-xs ${dark ? "text-white/60" : "text-[var(--muted)]"}`}>
          {location} · {projectType}
        </p>
      </div>
    </div>
  );
}
