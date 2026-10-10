"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="label-industrial flex items-center gap-2 text-warm-white transition-colors hover:text-orange"
    >
      Volver arriba
      <ArrowUp size={14} aria-hidden="true" />
    </button>
  );
}
