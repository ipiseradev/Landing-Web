import {
  Zap,
  Hammer,
  Nut,
  PaintRoller,
  HardHat,
  Construction,
} from "lucide-react";
import type { Category } from "./types";

export const CATEGORIES: readonly Category[] = [
  {
    id: "electricas",
    index: "01",
    name: "Herramientas eléctricas",
    description:
      "Taladros, amoladoras y equipos de potencia profesional para trabajo intensivo.",
    icon: Zap,
    image: "/images/products/electricas.jpg",
    span: "wide",
  },
  {
    id: "manuales",
    index: "02",
    name: "Herramientas manuales",
    description: "Precisión y resistencia en cada pieza: la base de todo taller.",
    icon: Hammer,
    image: "/images/products/manuales.jpg",
    span: "regular",
  },
  {
    id: "tornilleria",
    index: "03",
    name: "Tornillería y fijaciones",
    description: "Soluciones de anclaje y sujeción para cada tipo de material.",
    icon: Nut,
    image: "/images/products/tornilleria.jpg",
    span: "tall",
  },
  {
    id: "pinturas",
    index: "04",
    name: "Pinturas y accesorios",
    description: "Terminaciones profesionales con rendimiento y cobertura superior.",
    icon: PaintRoller,
    image: "/images/products/pinturas.jpg",
    span: "regular",
  },
  {
    id: "seguridad",
    index: "05",
    name: "Seguridad industrial",
    description: "Equipamiento de protección personal certificado para cada tarea.",
    icon: HardHat,
    image: "/images/products/seguridad.jpg",
    span: "regular",
  },
  {
    id: "construccion",
    index: "06",
    name: "Construcción y materiales",
    description: "Insumos de obra para proyectos de cualquier escala.",
    icon: Construction,
    image: "/images/products/construccion.jpg",
    span: "wide",
  },
] as const;

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}
