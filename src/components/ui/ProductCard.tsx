import { ArrowUpRight } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";
import type { FeaturedProduct } from "@/lib/data/types";

const PRICE_FORMATTER = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

interface ProductCardProps {
  product: FeaturedProduct;
  onSelect: (product: FeaturedProduct) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div className="group flex flex-col border border-graphite-soft">
      <ProductImage
        src={product.image}
        alt={product.name}
        className="aspect-square border-b border-graphite-soft"
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="label-industrial text-steel-dim">{product.category}</span>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-steel">
          {product.shortDescription}
        </p>
        <p className="mt-4 font-display text-lg text-warm-white">
          {PRICE_FORMATTER.format(product.demoPrice)}
        </p>
        <p className="mt-0.5 text-[11px] text-steel-dim">Precio ilustrativo</p>
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="label-industrial mt-5 flex items-center gap-2 text-orange transition-colors hover:text-orange-dark"
        >
          Consultar producto
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export { PRICE_FORMATTER };
