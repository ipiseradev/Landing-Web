import { Drill } from "lucide-react";

export function WebGLFallback() {
  return (
    <div
      role="img"
      aria-label="Ilustración de un taladro inalámbrico profesional FERROX"
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute h-[70%] w-[70%] rotate-45 bg-gradient-to-br from-graphite-soft via-graphite to-carbon" />
      <div className="absolute h-[70%] w-[70%] rotate-45 border border-steel-dim/40" />
      <Drill
        size={120}
        strokeWidth={1}
        className="relative z-10 text-orange drop-shadow-[0_0_40px_rgba(255,106,26,0.35)]"
        aria-hidden="true"
      />
    </div>
  );
}
