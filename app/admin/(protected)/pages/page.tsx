"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminTable, { AdminTableColumn } from "@/components/admin/AdminTable";
import Modal from "@/components/common/Modal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useToast } from "@/components/common/Toast";
import { slugify } from "@/lib/validations";

interface PageRow {
  _id: string;
  slug: string;
  title: string;
  sections: Record<string, unknown>;
  seo?: { title?: string; description?: string };
}

const emptyForm = {
  title: "",
  slug: "",
  sectionsJson: "{}",
  seoTitle: "",
  seoDescription: "",
};

export default function AdminPagesPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PageRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/pages");
    const data = await res.json();
    setItems(data.pages || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setJsonError(null);
    setModalOpen(true);
  }

  function openEdit(p: PageRow) {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      sectionsJson: JSON.stringify(p.sections || {}, null, 2),
      seoTitle: p.seo?.title || "",
      seoDescription: p.seo?.description || "",
    });
    setJsonError(null);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    let sections: Record<string, unknown> = {};
    try {
      sections = JSON.parse(form.sectionsJson || "{}");
    } catch {
      setJsonError("Sections must be valid JSON.");
      return;
    }
    setJsonError(null);
    setSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug,
      sections,
      seo: { title: form.seoTitle, description: form.seoDescription },
    };

    try {
      if (editing) {
        const res = await fetch(`/api/pages/${editing._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        showToast("Page updated.");
      } else {
        const res = await fetch("/api/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error);
        }
        showToast("Page created.");
      }
      setModalOpen(false);
      load();
    } catch (err) {
      showToast(err instanceof Error && err.message ? err.message : "Failed to save page.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    const res = await fetch(`/api/pages/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i._id !== deleteId));
      showToast("Page deleted.");
    } else {
      showToast("Failed to delete page.", "error");
    }
    setDeleteId(null);
  }

  const inputClass = "w-full rounded-md border border-[var(--border)] px-3.5 py-2.5 text-sm";

  const columns: AdminTableColumn<PageRow>[] = [
    { key: "title", header: "Title" },
    { key: "slug", header: "Slug" },
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
          <h1 className="font-heading font-extrabold text-2xl text-[var(--navy)] mb-1">Pages</h1>
          <p className="text-sm text-[var(--muted)]">Manage custom page content and SEO metadata</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-md grad-green px-4 py-2.5 text-sm font-semibold text-white">
          <Plus className="w-4 h-4" /> New Page
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading pages...</p>
      ) : (
        <AdminTable columns={columns} rows={items} rowKey={(r) => r._id} emptyTitle="No pages yet" emptyDescription="Create custom page content for use across the site." />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Page" : "New Page"} maxWidth="max-w-2xl">
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
            <input required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SEO Title</label>
            <input value={form.seoTitle} onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SEO Description</label>
            <input value={form.seoDescription} onChange={(e) => setForm((f) => ({ ...f, seoDescription: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sections (JSON)</label>
            <textarea
              rows={8}
              value={form.sectionsJson}
              onChange={(e) => setForm((f) => ({ ...f, sectionsJson: e.target.value }))}
              className={`${inputClass} font-mono text-xs`}
            />
            {jsonError && <p className="text-xs text-red-500 mt-1">{jsonError}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-md grad-green px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Saving..." : "Save Page"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        message="Are you sure you want to delete this page?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
