"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Share2, Camera, Briefcase } from "lucide-react";

const SERVICES = [
  "Permit Drawings",
  "Building Permit Applications",
  "Architectural Drawings",
  "Site Plans & Mapping",
  "Municipal Approvals",
  "Construction Services",
];

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="container-page py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg grad-blue text-white">
              <MapPin className="w-5 h-5" />
            </span>
            <span className="font-heading font-extrabold text-lg">
              Maps &amp; Permits
            </span>
          </Link>
          <p className="text-sm text-white/70 mb-1">Plans Approved. Projects Moving.</p>
          <p className="text-sm text-white/60">
            Architecture, engineering, permit drawings, municipal approvals and
            construction solutions across the GTA.
          </p>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-[var(--bright-green)] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-white/75">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/testimonials" className="hover:text-white">Testimonials</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-[var(--bright-green)] mb-4">
            Services
          </h3>
          <ul className="space-y-2 text-sm text-white/75">
            {SERVICES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-[var(--bright-green)] mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--bright-green)]" />
              <a href="tel:4377776887" className="hover:text-white">437-777-6887</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--bright-green)]" />
              <a href="mailto:maps.permit@gmail.com" className="hover:text-white">
                maps.permit@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--bright-green)]" />
              <span>Brampton &amp; the GTA</span>
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="https://facebook.com/maps.permits"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/maps.permits"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            >
              <Camera className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/maps.permits"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            >
              <Briefcase className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Maps & Permits. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
