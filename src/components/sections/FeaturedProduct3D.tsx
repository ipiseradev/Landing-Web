import { ArrowUpRight, Check } from "lucide-react";
import { ProductViewer3D } from "@/components/three/ProductViewer3D";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/config/brand";

const SPECS = [
  "Batería 20V",
  "Mandril de 13 mm",
  "Dos velocidades",
  "Diseño ergonómico",
] as const;

export function FeaturedProduct3D() {
  return (
    <section className="relative bg-graphite py-24 lg:py-32">
      <div className="container-edit grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal>
          <ProductViewer3D />
        </Reveal>

        <div>
          <SectionLabel index="03" label="Producto destacado" />

          <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl">
            FERROX IMPACT PRO <span className="text-orange">20V</span>
          </h2>

          <p className="mt-5 max-w-md text-steel leading-relaxed">
            Un taladro inalámbrico pensado para el uso profesional diario:
            potencia constante, autonomía real y una ergonomía que se nota
            después de la décima hora de trabajo.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {SPECS.map((spec) => (
              <li key={spec} className="flex items-center gap-3 text-sm text-warm-white">
                <Check size={16} className="text-orange" aria-hidden="true" />
                {spec}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-steel-dim">
            Ficha técnica conceptual presentada con fines de demostración de marca.
          </p>

          <div className="mt-8">
            <Button
              as="a"
              href={getWhatsAppUrl("Hola FERROX, quiero consultar disponibilidad del Impact Pro 20V.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar disponibilidad
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
