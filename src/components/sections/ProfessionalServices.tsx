import { ArrowUpRight, UserCheck, Building2, Cog } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/config/brand";

const PROFILES = [
  {
    icon: UserCheck,
    title: "Profesionales independientes",
    description: "Herramientas confiables para cada tarea, sin perder tiempo ni rendimiento.",
  },
  {
    icon: Building2,
    title: "Empresas y constructoras",
    description: "Equipamiento y suministros para proyectos de obra de cualquier escala.",
  },
  {
    icon: Cog,
    title: "Talleres y mantenimiento",
    description: "Insumos y herramientas pensadas para el uso intensivo del día a día.",
  },
] as const;

export function ProfessionalServices() {
  return (
    <section className="relative bg-graphite py-24 lg:py-32">
      <div className="container-edit grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionLabel index="07" label="Para profesionales" />
          <h2 className="mt-6 font-display text-balance text-4xl font-bold leading-[1.1] sm:text-5xl">
            TU PRÓXIMA OBRA EMPIEZA CON EL EQUIPO CORRECTO.
          </h2>
          <p className="mt-5 max-w-md text-steel leading-relaxed">
            Encontrá soluciones para proyectos particulares y necesidades
            profesionales. Contanos qué necesitás y te ayudamos a encontrar
            una alternativa adecuada.
          </p>
          <div className="mt-8">
            <Button
              as="a"
              href={getWhatsAppUrl("Hola FERROX, necesito asesoramiento para un proyecto.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar asesoramiento
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col">
          {PROFILES.map((profile, i) => {
            const Icon = profile.icon;
            return (
              <Reveal
                key={profile.title}
                delay={i * 0.08}
                className="group flex items-start gap-5 border-b border-graphite-soft py-7 first:border-t"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-steel-dim/40 transition-colors duration-300 group-hover:border-orange">
                  <Icon
                    size={22}
                    strokeWidth={1.25}
                    className="text-steel transition-colors duration-300 group-hover:text-orange"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{profile.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel">
                    {profile.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
