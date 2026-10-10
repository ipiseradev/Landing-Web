import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/lib/data/products";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCatalog } from "@/components/catalog/ProductCatalog";

export function FeaturedProducts() {
  return (
    <section id="productos" className="relative bg-carbon py-24 lg:py-32">
      <div className="container-edit">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="06" label="Productos destacados" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl font-display text-balance text-4xl font-bold leading-[1.1] sm:text-5xl">
                SELECCIÓN PENSADA PARA EL TRABAJO REAL.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Link
              href="/productos"
              className="label-industrial flex items-center gap-2 text-orange transition-colors hover:text-orange-dark"
            >
              Ver catálogo completo
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14">
          <ProductCatalog products={FEATURED_PRODUCTS} />
        </div>
      </div>
    </section>
  );
}
