interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold tracking-widest uppercase mb-3 ${
            light ? "text-[var(--bright-green)]" : "text-[var(--primary-blue)]"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading font-extrabold text-3xl sm:text-4xl mb-4 ${
          light ? "text-white" : "text-[var(--navy)]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base ${light ? "text-white/75" : "text-[var(--muted)]"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
