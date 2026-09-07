"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Search, Trash2, Copy, Check } from "lucide-react";
import LocalImageField from "@/components/admin/LocalImageField";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import EmptyState from "@/components/common/EmptyState";
import { useToast } from "@/components/common/Toast";
import { UPLOAD_FOLDERS, UploadFolder } from "@/lib/constants";

interface MediaItem {
  _id: string;
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export default function AdminMediaPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [folder, setFolder] = useState("all");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (folder !== "all") params.set("folder", folder);
    if (search) params.set("search", search);
    const res = await fetch(`/api/media?${params.toString()}`);
    const data = await res.json();
    setItems(data.uploads || []);
    setLoading(false);
  }, [folder, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function confirmDelete() {
    if (!deleteId) return;
    const res = await fetch(`/api/media?id=${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i._id !== deleteId));
      showToast("Image deleted.");
    } else {
      showToast("Failed to delete image.", "error");
    }
    setDeleteId(null);
  }

  function copyUrl(item: MediaItem) {
    const url = `${window.location.origin}/api/uploads/${item.folder}/${item.filename}`;
    navigator.clipboard.writeText(url);
    setCopiedId(item._id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-[var(--navy)] mb-1">Media Library</h1>
        <p className="text-sm text-[var(--muted)]">Upload and manage images used across your site</p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-white p-6">
        <LocalImageField label="Upload New Image" folder="misc" onChange={() => load()} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search filename..."
            className="w-full rounded-md border border-[var(--border)] pl-9 pr-3 py-2.5 text-sm"
          />
        </div>
        <select value={folder} onChange={(e) => setFolder(e.target.value)} className="rounded-md border border-[var(--border)] px-3 py-2.5 text-sm capitalize">
          <option value="all">All folders</option>
          {UPLOAD_FOLDERS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading media...</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-white">
          <EmptyState title="No media found" description="Upload an image above to get started." />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <div key={item._id} className="rounded-xl border border-[var(--border)] bg-white overflow-hidden">
              <div className="relative aspect-square bg-[var(--sky-blue)]">
                <Image
                  src={`/api/uploads/${item.folder}/${item.filename}`}
                  alt={item.filename}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-[var(--text)] truncate mb-1">{item.filename}</p>
                <p className="text-[10px] text-[var(--muted)] mb-2 capitalize">
                  {item.folder} · {(item.size / 1024).toFixed(0)} KB
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={() => copyUrl(item)} className="flex-1 inline-flex items-center justify-center gap-1 rounded-md border border-[var(--border)] py-1.5 text-[11px] font-medium hover:bg-[var(--sky-blue)]">
                    {copiedId === item._id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedId === item._id ? "Copied" : "Copy URL"}
                  </button>
                  <button onClick={() => setDeleteId(item._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        message="Are you sure you want to delete this image? Anything referencing it will show a placeholder."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
