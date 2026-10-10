"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { ProductCard, PRICE_FORMATTER } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { getWhatsAppUrl } from "@/lib/config/brand";
import { CATEGORIES } from "@/lib/data/categories";
import type { FeaturedProduct } from "@/lib/data/types";
import { cn } from "@/lib/utils/cn";

interface ProductCatalogProps {
  products: readonly FeaturedProduct[];
  showFilter?: boolean;
  initialCategory?: string;
  footer?: ReactNode;
}

export function ProductCatalog({
  products,
  showFilter = false,
  initialCategory,
  footer,
}: ProductCatalogProps) {
  const [activeProduct, setActiveProduct] = useState<FeaturedProduct | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(initialCategory ?? null);
  const titleId = useId();

  const filtered = useMemo(
    () =>
      categoryFilter ? products.filter((product) => product.categoryId === categoryFilter) : products,
    [products, categoryFilter]
  );

  return (
    <>
      {showFilter && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoryFilter(null)}
            className={cn(
              "label-industrial border px-4 py-2 transition-colors",
              categoryFilter === null
                ? "border-orange bg-orange text-carbon"
                : "border-steel-dim/40 text-steel hover:border-orange hover:text-orange"
            )}
          >
            Todas
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setCategoryFilter(category.id)}
              className={cn(
                "label-industrial border px-4 py-2 transition-colors",
                categoryFilter === category.id
                  ? "border-orange bg-orange text-carbon"
                  : "border-steel-dim/40 text-steel hover:border-orange hover:text-orange"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product, i) => (
          <Reveal key={product.id} delay={Math.min(i, 8) * 0.05}>
            <ProductCard product={product} onSelect={setActiveProduct} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-steel">No hay productos en esta categoría todavía.</p>
      )}

      {footer}

      <Modal open={activeProduct !== null} onClose={() => setActiveProduct(null)} titleId={titleId}>
        {activeProduct && (
          <div>
            <span className="label-industrial text-orange">{activeProduct.category}</span>
            <h3 id={titleId} className="mt-3 font-display text-2xl font-bold">
              {activeProduct.name}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              {activeProduct.shortDescription}
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {activeProduct.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-warm-white">
                  <Check size={15} className="text-orange" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-display text-xl">
              {PRICE_FORMATTER.format(activeProduct.demoPrice)}
              <span className="ml-2 text-xs font-sans text-steel-dim">(ilustrativo)</span>
            </p>
            <Button
              as="a"
              href={getWhatsAppUrl(`Hola FERROX, quiero consultar por ${activeProduct.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full justify-center"
            >
              Consultar por WhatsApp
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
