import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  icon?: boolean;
  className?: string;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  icon = true,
  className = "",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-all";

  const variants: Record<string, string> = {
    primary: "grad-green text-white shadow-md hover:opacity-90",
    secondary: "bg-[var(--navy)] text-white hover:bg-[var(--deep-blue)]",
    outline:
      "border-2 border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-[var(--sky-blue)]",
  };

  const isExternal = href.startsWith("tel:") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
        {icon && <ArrowRight className="w-4 h-4" />}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {icon && <ArrowRight className="w-4 h-4" />}
    </Link>
  );
}
