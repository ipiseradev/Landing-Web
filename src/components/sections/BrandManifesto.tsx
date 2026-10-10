"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LINES = ["NO VENDEMOS", "SOLO HERRAMIENTAS.", "IMPULSAMOS IDEAS."];

export function BrandManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".manifesto-line");
      gsap.set(lines, { opacity: 0, y: 32 });
      gsap.to(lines, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });

      gsap.set(".manifesto-copy", { opacity: 0, y: 20 });
      gsap.to(".manifesto-copy", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 65%" },
      });

      gsap.to(".manifesto-depth", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-warm-white py-28 text-carbon lg:py-40"
    >
      <div
        className="manifesto-depth pointer-events-none absolute -right-32 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rotate-45 border border-carbon/10"
        aria-hidden="true"
      />
      <div
        className="manifesto-depth pointer-events-none absolute -right-10 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rotate-45 border border-orange/20"
        aria-hidden="true"
      />

      <div className="container-edit relative z-10 max-w-4xl">
        <span className="label-industrial text-orange-dark">04 / Manifiesto</span>

        <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
          {LINES.map((line) => (
            <span key={line} className="manifesto-line block text-balance">
              {line}
            </span>
          ))}
        </h2>

        <p className="manifesto-copy mt-10 max-w-xl text-lg leading-relaxed text-carbon/70">
          Detrás de cada obra, cada reparación y cada proyecto hay alguien que
          quiere hacer las cosas bien. Estamos para acompañarlo con productos
          confiables, asesoramiento cercano y soluciones pensadas para
          trabajar mejor.
        </p>
      </div>
    </section>
  );
}
