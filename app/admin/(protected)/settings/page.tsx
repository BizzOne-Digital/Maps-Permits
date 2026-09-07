"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import LocalImageField from "@/components/admin/LocalImageField";
import { useToast } from "@/components/common/Toast";

interface Settings {
  businessName: string;
  phone: string;
  primaryEmail: string;
  secondaryEmail?: string;
  address?: string;
  serviceArea?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  logo?: string;
  favicon?: string;
  footerText?: string;
  consultationButtonText?: string;
  consultationButtonLink?: string;
}

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data.settings));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      showToast("Settings saved.");
    } catch {
      showToast("Failed to save settings.", "error");
    } finally {
      setSaving(false);
    }
  }

  if (!settings) return <p className="text-sm text-[var(--muted)]">Loading settings...</p>;

  const inputClass = "w-full rounded-md border border-[var(--border)] px-3.5 py-2.5 text-sm";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-[var(--navy)] mb-1">Site Settings</h1>
        <p className="text-sm text-[var(--muted)]">Manage your business information and branding</p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 rounded-xl border border-[var(--border)] bg-white p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Business Name</label>
          <input value={settings.businessName} onChange={(e) => setSettings({ ...settings, businessName: e.target.value })} className={inputClass} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Primary Email</label>
            <input value={settings.primaryEmail} onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Secondary Email</label>
            <input value={settings.secondaryEmail || ""} onChange={(e) => setSettings({ ...settings, secondaryEmail: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input value={settings.address || ""} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Service Area</label>
          <input value={settings.serviceArea || ""} onChange={(e) => setSettings({ ...settings, serviceArea: e.target.value })} className={inputClass} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Facebook</label>
            <input value={settings.facebook || ""} onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Instagram</label>
            <input value={settings.instagram || ""} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <input value={settings.linkedin || ""} onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LocalImageField label="Logo" folder="misc" value={settings.logo} onChange={(url) => setSettings({ ...settings, logo: url })} />
          <LocalImageField label="Favicon" folder="misc" value={settings.favicon} onChange={(url) => setSettings({ ...settings, favicon: url })} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Footer Text</label>
          <input value={settings.footerText || ""} onChange={(e) => setSettings({ ...settings, footerText: e.target.value })} className={inputClass} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Consultation Button Text</label>
            <input value={settings.consultationButtonText || ""} onChange={(e) => setSettings({ ...settings, consultationButtonText: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Consultation Button Link</label>
            <input value={settings.consultationButtonLink || ""} onChange={(e) => setSettings({ ...settings, consultationButtonLink: e.target.value })} className={inputClass} />
          </div>
        </div>
        <div className="pt-2">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-md grad-green px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
