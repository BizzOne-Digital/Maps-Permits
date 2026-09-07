"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, ImageOff } from "lucide-react";
import { getSafeImageUrl } from "@/lib/image";

interface LocalImageFieldProps {
  label?: string;
  folder: "products" | "gallery" | "pages" | "misc";
  value?: string;
  onChange: (url: string) => void;
}

export default function LocalImageField({
  label = "Image",
  folder,
  value,
  onChange,
}: LocalImageFieldProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("folder", folder);
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--text)]">{label}</label>
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 rounded-lg border border-[var(--border)] overflow-hidden bg-[var(--sky-blue)] flex items-center justify-center shrink-0">
          {value ? (
            <Image
              src={getSafeImageUrl(value)}
              alt="Preview"
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <ImageOff className="w-6 h-6 text-[var(--muted)]" />
          )}
          {loading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-[var(--primary-blue)]" />
            </div>
          )}
        </div>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--sky-blue)] disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {loading ? "Uploading..." : "Upload image"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
