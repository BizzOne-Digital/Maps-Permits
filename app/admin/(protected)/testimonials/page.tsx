"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";
import AdminTable, { AdminTableColumn } from "@/components/admin/AdminTable";
import Modal from "@/components/common/Modal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import LocalImageField from "@/components/admin/LocalImageField";
import { useToast } from "@/components/common/Toast";

interface TestimonialRow {
  _id: string;
  name: string;
  location: string;
  projectType: string;
  rating: number;
  quote: string;
  image?: string;
  published: boolean;
}

const emptyForm = {
  name: "",
  location: "",
  projectType: "",
  rating: 5,
  quote: "",
  image: "",
};

export default function AdminTestimonialsPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TestimonialRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/testimonials?all=1");
    const data = await res.json();
    setItems(data.testimonials || []);
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

  function openEdit(t: TestimonialRow) {
    setEditing(t);
    setForm({
      name: t.name,
      location: t.location,
      projectType: t.projectType,
      rating: t.rating,
      quote: t.quote,
      image: t.image || "",
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        const res = await fetch(`/api/testimonials/${editing._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        showToast("Testimonial updated.");
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        showToast("Testimonial created.");
      }
      setModalOpen(false);
      load();
    } catch {
      showToast("Failed to save testimonial.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(t: TestimonialRow) {
    const res = await fetch(`/api/testimonials/${t._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !t.published }),
    });
    if (res.ok) {
      setItems((prev) => prev.map((i) => (i._id === t._id ? { ...i, published: !i.published } : i)));
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    const res = await fetch(`/api/testimonials/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i._id !== deleteId));
      showToast("Testimonial deleted.");
    } else {
      showToast("Failed to delete testimonial.", "error");
    }
    setDeleteId(null);
  }

  const inputClass = "w-full rounded-md border border-[var(--border)] px-3.5 py-2.5 text-sm";

  const columns: AdminTableColumn<TestimonialRow>[] = [
    { key: "name", header: "Name" },
    { key: "location", header: "Location" },
    { key: "projectType", header: "Project" },
    {
      key: "rating",
      header: "Rating",
      render: (r) => (
        <span className="flex items-center gap-0.5">
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[var(--bright-green)] text-[var(--bright-green)]" />
          ))}
        </span>
      ),
    },
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
          <h1 className="font-heading font-extrabold text-2xl text-[var(--navy)] mb-1">Testimonials</h1>
          <p className="text-sm text-[var(--muted)]">Manage client testimonials shown on your site</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-md grad-green px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="w-4 h-4" /> New Testimonial
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading testimonials...</p>
      ) : (
        <AdminTable columns={columns} rows={items} rowKey={(r) => r._id} emptyTitle="No testimonials yet" />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Testimonial" : "New Testimonial"} maxWidth="max-w-lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input required value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Type</label>
              <input required value={form.projectType} onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
              <input
                type="number"
                min={1}
                max={5}
                required
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quote</label>
            <textarea required rows={4} value={form.quote} onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))} className={inputClass} />
          </div>
          <LocalImageField label="Photo (optional)" folder="misc" value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-md grad-green px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Saving..." : "Save Testimonial"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        message="Are you sure you want to delete this testimonial?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
