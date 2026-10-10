import type { LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  index: string;
  name: string;
  description: string;
  icon: LucideIcon;
  image: string;
  span: "wide" | "tall" | "regular";
}

export interface FeaturedProduct {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  category: string;
  shortDescription: string;
  features: readonly string[];
  demoPrice: number;
  image: string;
  featured: boolean;
}

export interface ProductHotspot {
  id: string;
  label: string;
  detail: string;
  position: readonly [number, number, number];
}
