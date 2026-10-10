import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data/categories";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ProductImage } from "@/components/ui/ProductImage";
import { cn } from "@/lib/utils/cn";

const SPAN_CLASSES: Record<string, string> = {
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  regular: "",
};

export function Categories() {
  return (
    <section id="categorias" className="relative bg-carbon py-24 lg:py-32">
      <div className="container-edit">
        <Reveal>
          <SectionLabel index="02" label="Catálogo" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl font-display text-balance text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            TODO LO QUE TU PROYECTO NECESITA.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-lg text-steel">
            Soluciones profesionales para cada desafío.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px bg-graphite-soft md:grid-cols-3">
          {CATEGORIES.map((category, i) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.id} delay={i * 0.05} className={SPAN_CLASSES[category.span]}>
                <Link
                  href={`/productos?categoria=${category.id}`}
                  className={cn(
                    "group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden p-8",
                    category.span === "tall" && "min-h-[460px]"
                  )}
                >
                  <ProductImage
                    src={category.image}
                    alt=""
                    className="absolute inset-0"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/75 to-carbon/25 transition-colors duration-300 group-hover:via-carbon/60" />

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="label-industrial text-steel-dim">{category.index}</span>
                    <Icon
                      size={28}
                      strokeWidth={1.25}
                      className="text-steel transition-all duration-300 group-hover:scale-110 group-hover:text-orange"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-display text-xl font-semibold leading-tight transition-colors group-hover:text-orange sm:text-2xl">
                      {category.name}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-steel">
                      {category.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 label-industrial text-steel-dim transition-colors group-hover:text-orange">
                      Ver productos
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
