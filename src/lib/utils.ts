import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso?: string | null) {
  if (!iso) return "Not detected";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Not detected";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatCompact(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export function timeAgo(iso?: string | null) {
  if (!iso) return "Not detected";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "Not detected";
  const seconds = Math.round((Date.now() - t) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 45) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 18) return `${months}mo ago`;
  return `${Math.round(days / 365)}y ago`;
}
