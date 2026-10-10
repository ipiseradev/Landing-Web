import { ShieldCheck, MessageCircle, Boxes, PhoneCall } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const BENEFITS = [
  {
    index: "01",
    icon: ShieldCheck,
    title: "Calidad profesional",
    description: "Productos seleccionados para responder a las exigencias del trabajo diario.",
  },
  {
    index: "02",
    icon: MessageCircle,
    title: "Asesoramiento real",
    description: "Te ayudamos a encontrar la herramienta correcta para cada necesidad.",
  },
  {
    index: "03",
    icon: Boxes,
    title: "Variedad y soluciones",
    description: "Un catálogo pensado para profesionales, talleres y proyectos particulares.",
  },
  {
    index: "04",
    icon: PhoneCall,
    title: "Atención directa",
    description: "Consultá disponibilidad y recibí una respuesta clara, sin vueltas.",
  },
] as const;

export function Benefits() {
  return (
    <section className="relative bg-carbon py-24 lg:py-32">
      <div className="container-edit">
        <Reveal>
          <SectionLabel index="05" label="Ventajas" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 border-t border-graphite-soft sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Reveal
                key={benefit.index}
                delay={i * 0.06}
                className="group border-b border-r border-graphite-soft p-8 transition-colors duration-300 hover:bg-graphite last:border-r-0 sm:[&:nth-child(2)]:border-r-0 lg:p-10 lg:last:border-r-0 lg:[&:nth-child(2)]:border-r"
              >
                <span className="label-industrial text-steel-dim">{benefit.index}</span>
                <Icon
                  size={30}
                  strokeWidth={1.25}
                  className="mt-6 text-orange transition-transform duration-300 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-display text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{benefit.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
