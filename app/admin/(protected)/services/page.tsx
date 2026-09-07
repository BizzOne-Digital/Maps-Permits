"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import AdminTable, { AdminTableColumn } from "@/components/admin/AdminTable";
import Modal from "@/components/common/Modal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import LocalImageField from "@/components/admin/LocalImageField";
import { useToast } from "@/components/common/Toast";
import { slugify } from "@/lib/validations";

interface ServiceRow {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  image?: string;
  order: number;
  published: boolean;
}

const emptyForm = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  icon: "FileText",
  image: "",
};

export default function AdminServicesPage() {
  const { showToast } = useToast();
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/services?all=1");
    const data = await res.json();
    setServices(data.services || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(service: ServiceRow) {
    setEditing(service);
    setForm({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      description: service.description,
      icon: service.icon,
      image: service.image || "",
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const res = await fetch(`/api/services/${editing._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        showToast("Service updated.");
      } else {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, order: services.length }),
        });
        if (!res.ok) throw new Error();
        showToast("Service created.");
      }
      setModalOpen(false);
      load();
    } catch {
      showToast("Failed to save service.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(service: ServiceRow) {
    const res = await fetch(`/api/services/${service._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !service.published }),
    });
    if (res.ok) {
      setServices((prev) =>
        prev.map((s) => (s._id === service._id ? { ...s, published: !s.published } : s))
      );
    }
  }

  async function move(service: ServiceRow, direction: -1 | 1) {
    const sorted = [...services].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((s) => s._id === service._id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const other = sorted[swapIdx];

    await Promise.all([
      fetch(`/api/services/${service._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: other.order }),
      }),
      fetch(`/api/services/${other._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: service.order }),
      }),
    ]);
    load();
  }

  async function confirmDelete() {
    if (!deleteId) return;
    const res = await fetch(`/api/services/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      setServices((prev) => prev.filter((s) => s._id !== deleteId));
      showToast("Service deleted.");
    } else {
      showToast("Failed to delete service.", "error");
    }
    setDeleteId(null);
  }

  const inputClass = "w-full rounded-md border border-[var(--border)] px-3.5 py-2.5 text-sm";

  const columns: AdminTableColumn<ServiceRow>[] = [
    { key: "order", header: "Order", render: (r) => r.order },
    { key: "title", header: "Title" },
    { key: "slug", header: "Slug" },
    {
      key: "published",
      header: "Status",
      render: (r) => (
        <button
          onClick={() => togglePublished(r)}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-2.5 py-1 ${
            r.published ? "bg-[var(--sky-blue)] text-[var(--primary-blue)]" : "bg-gray-100 text-gray-500"
          }`}
        >
          {r.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          {r.published ? "Published" : "Draft"}
        </button>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (r) => (
        <div className="flex items-center gap-2">
          <button onClick={() => move(r, -1)} className="text-[var(--muted)] hover:text-[var(--navy)]">
            <ArrowUp className="w-4 h-4" />
          </button>
          <button onClick={() => move(r, 1)} className="text-[var(--muted)] hover:text-[var(--navy)]">
            <ArrowDown className="w-4 h-4" />
          </button>
          <button onClick={() => openEdit(r)} className="text-[var(--primary-blue)] hover:text-[var(--deep-blue)]">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setDeleteId(r._id)} className="text-red-500 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-[var(--navy)] mb-1">Services</h1>
          <p className="text-sm text-[var(--muted)]">Manage the services shown on your site</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-md grad-green px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="w-4 h-4" /> New Service
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading services...</p>
      ) : (
        <AdminTable columns={columns} rows={services} rowKey={(r) => r._id} emptyTitle="No services yet" />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Service" : "New Service"} maxWidth="max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm((f) => ({ ...f, title, slug: editing ? f.slug : slugify(title) }));
              }}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              required
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Short Description</label>
            <input
              required
              value={form.shortDescription}
              onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icon (lucide name)</label>
            <input
              value={form.icon}
              onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
              className={inputClass}
              placeholder="FileText"
            />
          </div>
          <LocalImageField
            label="Service Image"
            folder="pages"
            value={form.image}
            onChange={(url) => setForm((f) => ({ ...f, image: url }))}
          />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-md grad-green px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Saving..." : "Save Service"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        message="Are you sure you want to delete this service?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
