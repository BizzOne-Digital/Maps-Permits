"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Trash2 } from "lucide-react";
import AdminTable, { AdminTableColumn } from "@/components/admin/AdminTable";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useToast } from "@/components/common/Toast";
import { LEAD_STATUSES } from "@/lib/constants";

interface LeadRow {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  municipality?: string;
  message?: string;
  status: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const { showToast } = useToast();
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/leads?${params.toString()}`);
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  async function updateStatus(id: string, status: string) {
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
      showToast("Lead status updated.");
    } else {
      showToast("Failed to update lead.", "error");
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    const res = await fetch(`/api/leads?id=${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l._id !== deleteId));
      showToast("Lead deleted.");
    } else {
      showToast("Failed to delete lead.", "error");
    }
    setDeleteId(null);
  }

  const columns: AdminTableColumn<LeadRow>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone", render: (r) => r.phone || "—" },
    { key: "projectType", header: "Project", render: (r) => r.projectType || "—" },
    { key: "municipality", header: "Municipality", render: (r) => r.municipality || "—" },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <select
          value={r.status}
          onChange={(e) => updateStatus(r._id, e.target.value)}
          className="text-xs rounded-md border border-[var(--border)] px-2 py-1.5 capitalize"
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "createdAt",
      header: "Received",
      render: (r) => new Date(r.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "",
      render: (r) => (
        <button
          onClick={() => setDeleteId(r._id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete lead"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-[var(--navy)] mb-1">Leads</h1>
        <p className="text-sm text-[var(--muted)]">Manage project inquiries submitted through the site</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="w-full rounded-md border border-[var(--border)] pl-9 pr-3 py-2.5 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-[var(--border)] px-3 py-2.5 text-sm capitalize"
        >
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading leads...</p>
      ) : (
        <AdminTable
          columns={columns}
          rows={leads}
          rowKey={(r) => r._id}
          emptyTitle="No leads found"
          emptyDescription="Try adjusting your search or filter."
        />
      )}

      <ConfirmDialog
        open={!!deleteId}
        message="Are you sure you want to delete this lead? This cannot be undone."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
