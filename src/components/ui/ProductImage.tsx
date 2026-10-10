import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface ProductImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders stock photography with a carbon/orange duotone treatment so every
 * source photo reads as one coherent FERROX visual system.
 */
export function ProductImage({ src, alt, sizes, priority, className }: ProductImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-graphite", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"}
        className="object-cover grayscale contrast-125 brightness-[0.85] transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-carbon via-graphite to-orange-dark mix-blend-color"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-carbon/25" aria-hidden="true" />
    </div>
  );
}
