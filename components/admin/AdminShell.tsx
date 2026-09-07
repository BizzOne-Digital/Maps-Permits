"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Wrench,
  MessageSquareQuote,
  Users,
  Image as ImageIcon,
  Settings,
  LogOut,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Pages", href: "/admin/pages", icon: FileText },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const SidebarContent = (
    <>
      <Link href="/admin/dashboard" className="flex items-center gap-2 px-5 py-5">
        <span className="w-9 h-9 rounded-lg grad-blue text-white flex items-center justify-center">
          <MapPin className="w-5 h-5" />
        </span>
        <span className="font-heading font-extrabold text-white">Maps &amp; Permits</span>
      </Link>
      <nav className="flex-1 px-3 space-y-1">
        {NAV.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white w-full"
        >
          <LogOut className="w-4.5 h-4.5" />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-[var(--off-white)]">
      <aside className="hidden lg:flex flex-col w-64 bg-[var(--navy)] shrink-0">
        {SidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-[var(--navy)] flex flex-col">
            {SidebarContent}
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden flex items-center justify-between bg-white border-b border-[var(--border)] px-4 py-3">
          <span className="font-heading font-bold text-[var(--navy)]">Admin</span>
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <main className="flex-1 p-5 sm:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
