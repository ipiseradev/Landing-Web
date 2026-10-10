"use client";

import { Suspense, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";
import { WebGLFallback } from "@/components/three/WebGLFallback";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useInView } from "@/lib/hooks/useInView";
import { useWebglAvailable } from "@/lib/hooks/useWebglAvailable";
import { getWhatsAppUrl } from "@/lib/config/brand";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inViewRef, inView] = useInView<HTMLDivElement>({ threshold: 0 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const webglOk = useWebglAvailable();

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      pointerRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    }

    function handleScroll() {
      const section = sectionRef.current;
      if (!section) return;
      const progress = Math.min(
        Math.max(window.scrollY / section.offsetHeight, 0),
        1
      );
      scrollRef.current = progress;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-carbon lg:block"
    >
      <div
        ref={inViewRef}
        className="relative h-[50vh] w-full shrink-0 lg:absolute lg:inset-0 lg:h-full"
      >
        {webglOk ? (
          <CanvasErrorBoundary fallback={<WebGLFallback />}>
            <Suspense fallback={<WebGLFallback />}>
              <HeroScene
                pointerRef={pointerRef}
                scrollRef={scrollRef}
                reducedMotion={reducedMotion}
                active={inView}
                isMobile={isMobile}
              />
            </Suspense>
          </CanvasErrorBoundary>
        ) : (
          <WebGLFallback />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent lg:bg-gradient-to-r lg:from-carbon lg:via-carbon/55 lg:to-transparent" />
      </div>

      <div className="container-edit relative z-10 flex flex-1 flex-col justify-center gap-8 py-14 lg:min-h-screen lg:max-w-xl lg:py-0">
        <p className="label-industrial text-orange">FERROX / EQUIPAMIENTO &amp; SUMINISTROS</p>

        <h1 className="font-display text-balance text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[3.6rem]">
          HERRAMIENTAS
          <br />
          PARA LOS QUE
          <br />
          CONSTRUYEN EL <span className="text-orange">FUTURO.</span>
        </h1>

        <p className="max-w-md text-base leading-relaxed text-steel sm:text-lg">
          Todo lo que necesitás para construir, reparar y crear. Herramientas
          profesionales, materiales de calidad y asesoramiento que hace la
          diferencia.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button as="a" href="#productos">
            Explorar productos
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button
            as="a"
            variant="secondary"
            href={getWhatsAppUrl("Hola FERROX, quiero hablar con un especialista.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar con un especialista
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </div>

        <p className="label-industrial text-steel-dim">
          Calidad profesional · Atención personalizada · Soluciones para cada proyecto
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-steel-dim lg:flex">
        <span className="label-industrial">Scroll</span>
        <ChevronDown
          size={16}
          className={reducedMotion ? "" : "animate-bounce"}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
