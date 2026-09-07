interface StatsCardProps {
  value: string;
  label: string;
  dark?: boolean;
}

export default function StatsCard({ value, label, dark = false }: StatsCardProps) {
  return (
    <div
      className={`rounded-xl p-6 text-center border ${
        dark
          ? "bg-white/5 border-white/10"
          : "bg-white border-[var(--border)] shadow-sm"
      }`}
    >
      <p
        className={`font-heading font-extrabold text-3xl mb-1 ${
          dark ? "text-[var(--bright-green)]" : "text-[var(--primary-blue)]"
        }`}
      >
        {value}
      </p>
      <p className={`text-sm ${dark ? "text-white/70" : "text-[var(--muted)]"}`}>
        {label}
      </p>
    </div>
  );
}
