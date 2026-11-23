import type React from "react";

export function applyHover(e: React.MouseEvent) {
  const el = (e.target as HTMLElement).closest("[data-hover]") as HTMLElement | null;
  if (!el || !el.dataset.hover || el.dataset.hovering === "1") return;
  try {
    const hover = JSON.parse(el.dataset.hover) as Record<string, string>;
    const prev: Record<string, string> = {};
    for (const key of Object.keys(hover)) {
      prev[key] =
        el.style.getPropertyValue(key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())) ||
        (el.style as unknown as Record<string, string>)[key] ||
        "";
      (el.style as unknown as Record<string, string>)[key] = hover[key];
    }
    el.dataset.hoverPrev = JSON.stringify(prev);
    el.dataset.hovering = "1";
  } catch {
    /* ignore */
  }
}

export function clearHover(e: React.MouseEvent) {
  const el = (e.target as HTMLElement).closest("[data-hover]") as HTMLElement | null;
  if (!el || el.dataset.hovering !== "1") return;
  const related = e.relatedTarget as Node | null;
  if (related && el.contains(related)) return;
  try {
    const prev = JSON.parse(el.dataset.hoverPrev || "{}") as Record<string, string>;
    for (const [key, value] of Object.entries(prev)) {
      (el.style as unknown as Record<string, string>)[key] = value;
    }
  } catch {
    /* ignore */
  }
  delete el.dataset.hovering;
  delete el.dataset.hoverPrev;
}
