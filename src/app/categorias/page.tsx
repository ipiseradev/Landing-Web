import type { Metadata } from "next";
import { Categories } from "@/components/sections/Categories";

export const metadata: Metadata = {
  title: "Categorías | FERROX",
  description:
    "Herramientas eléctricas, manuales, tornillería, pinturas, seguridad industrial y materiales de construcción.",
};

export default function CategoriasPage() {
  return (
    <main className="flex-1">
      <div className="pt-16" />
      <Categories />
    </main>
  );
}
