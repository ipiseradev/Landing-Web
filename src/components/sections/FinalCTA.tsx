"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useWebglAvailable } from "@/lib/hooks/useWebglAvailable";
import { getWhatsAppUrl } from "@/lib/config/brand";

const CTADrillAccent = dynamic(
  () => import("@/components/three/CTADrillAccent").then((mod) => mod.CTADrillAccent),
  { ssr: false }
);

export function FinalCTA() {
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();
  const webglOk = useWebglAvailable();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-graphite py-28 lg:py-36"
    >
      <div className="bg-blueprint absolute inset-0 opacity-30" aria-hidden="true" />

      {webglOk && !reducedMotion && (
        <div className="pointer-events-none absolute -right-20 top-1/2 hidden h-[480px] w-[480px] -translate-y-1/2 opacity-40 lg:block">
          <CanvasErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <CTADrillAccent active={inView} />
            </Suspense>
          </CanvasErrorBoundary>
        </div>
      )}

      <div className="container-edit relative z-10 max-w-2xl">
        <h2 className="font-display text-balance text-4xl font-bold leading-[1.08] sm:text-6xl">
          EL PRÓXIMO PROYECTO
          <br />
          EMPIEZA <span className="text-orange">ACÁ.</span>
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-steel">
          Contanos qué necesitás. Encontramos la herramienta adecuada para
          llevarlo adelante.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            as="a"
            href={getWhatsAppUrl("Hola FERROX, quiero empezar un proyecto.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
          <Button as="a" variant="secondary" href="/categorias">
            Ver categorías
          </Button>
        </div>
      </div>
    </section>
  );
}
