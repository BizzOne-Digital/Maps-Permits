import Link from "next/link";
import { redirect } from "next/navigation";
import { Users, Inbox, Wrench, MessageSquareQuote, Image as ImageIcon } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import StoredUpload from "@/models/StoredUpload";
import AdminTable, { AdminTableColumn } from "@/components/admin/AdminTable";

export const dynamic = "force-dynamic";

interface LeadRow {
  _id: string;
  name: string;
  email: string;
  projectType?: string;
  status: string;
  createdAt: string;
}

export default async function AdminDashboardPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  await connectToDatabase();

  const [newLeadsCount, totalLeads, publishedServices, testimonialsCount, mediaCount, recentLeads] =
    await Promise.all([
      Lead.countDocuments({ status: "new" }),
      Lead.countDocuments(),
      Service.countDocuments({ published: true }),
      Testimonial.countDocuments(),
      StoredUpload.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).limit(8).lean(),
    ]);

  const cards = [
    { label: "New Leads", value: newLeadsCount, icon: Inbox, href: "/admin/leads" },
    { label: "Total Leads", value: totalLeads, icon: Users, href: "/admin/leads" },
    { label: "Published Services", value: publishedServices, icon: Wrench, href: "/admin/services" },
    { label: "Testimonials", value: testimonialsCount, icon: MessageSquareQuote, href: "/admin/testimonials" },
    { label: "Uploaded Images", value: mediaCount, icon: ImageIcon, href: "/admin/media" },
  ];

  const columns: AdminTableColumn<LeadRow>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "projectType", header: "Project Type", render: (r) => r.projectType || "—" },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <span className="inline-block rounded-full bg-[var(--sky-blue)] text-[var(--primary-blue)] text-xs font-semibold px-2.5 py-1 capitalize">
          {r.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Received",
      render: (r) => new Date(r.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-[var(--navy)] mb-1">Dashboard</h1>
        <p className="text-sm text-[var(--muted)]">Overview of your site activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-[var(--border)] p-5 hover:shadow-md transition-shadow"
          >
            <span className="w-10 h-10 rounded-lg grad-blue text-white flex items-center justify-center mb-3">
              <card.icon className="w-5 h-5" />
            </span>
            <p className="font-heading font-extrabold text-2xl text-[var(--navy)]">{card.value}</p>
            <p className="text-xs text-[var(--muted)]">{card.label}</p>
          </Link>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-lg text-[var(--navy)]">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm font-medium text-[var(--primary-blue)] hover:underline">
            View all
          </Link>
        </div>
        <AdminTable
          columns={columns}
          rows={JSON.parse(JSON.stringify(recentLeads))}
          rowKey={(r) => r._id}
          emptyTitle="No leads yet"
          emptyDescription="Leads submitted through the contact form will appear here."
        />
      </div>
    </div>
  );
}
