"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <>
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-all duration-300 ${
        scrolled ? "shadow-md py-2" : "py-4"
      }`}
    >
      <div className="container-page flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Maps & Permits" width={220} height={120} className="h-12 w-auto" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--primary-blue)] ${
                pathname === link.href ? "text-[var(--primary-blue)]" : "text-[var(--text)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md grad-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
          >
            Get a Free Consultation
          </Link>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[var(--border)] text-[var(--navy)]"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>

    {menuOpen && (
      <div className="fixed inset-0 z-[100] md:hidden">
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />
        <div className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-xl p-6 flex flex-col gap-6 animate-fade-up">
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-[var(--navy)]">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center rounded-md border border-[var(--border)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-[var(--text)] hover:text-[var(--primary-blue)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md grad-green px-4 py-3 text-sm font-semibold text-white"
          >
            Get a Free Consultation
          </Link>
        </div>
      </div>
    )}
    </>
  );
}
