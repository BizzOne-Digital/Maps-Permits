"use client";

import Modal from "@/components/common/Modal";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  danger = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title} maxWidth="max-w-sm">
      <div className="flex items-start gap-3 mb-6">
        <AlertTriangle
          className={`w-6 h-6 shrink-0 ${danger ? "text-red-500" : "text-[var(--primary-blue)]"}`}
        />
        <p className="text-sm text-[var(--text)]">{message}</p>
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--sky-blue)]"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${
            danger ? "bg-red-500 hover:bg-red-600" : "grad-green hover:opacity-90"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
