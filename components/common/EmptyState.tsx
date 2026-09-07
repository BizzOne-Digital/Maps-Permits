import { Inbox } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, icon: Icon = Inbox, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-14 h-14 rounded-full bg-[var(--sky-blue)] flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[var(--primary-blue)]" />
      </div>
      <h3 className="font-heading font-bold text-lg text-[var(--navy)] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--muted)] max-w-sm mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}
