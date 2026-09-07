import {
  FileText,
  Building2,
  PencilRuler,
  Map,
  Stamp,
  HardHat,
  Home,
  LayoutGrid,
  Layers,
  Building,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Building2,
  PencilRuler,
  Map,
  Stamp,
  HardHat,
  Home,
  LayoutGrid,
  Layers,
  Building,
  ClipboardList,
};

export function getIcon(name?: string): LucideIcon {
  if (name && ICON_MAP[name]) return ICON_MAP[name];
  return FileText;
}
