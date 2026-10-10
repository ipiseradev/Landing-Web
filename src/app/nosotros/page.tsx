import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { BrandManifesto } from "@/components/sections/BrandManifesto";
import { Benefits } from "@/components/sections/Benefits";
import { ProfessionalServices } from "@/components/sections/ProfessionalServices";

export const metadata: Metadata = {
  title: "Nosotros | FERROX",
  description:
    "Conocé la propuesta de FERROX: calidad profesional, asesoramiento real y soluciones para cada proyecto.",
};

export default function NosotrosPage() {
  return (
    <main className="flex-1 bg-carbon">
      <PageHeader
        index="04"
        label="Nosotros"
        title="HERRAMIENTAS CON CRITERIO, NO SOLO CATÁLOGO."
        description="Marca conceptual de demostración de portfolio."
      />
      <BrandManifesto />
      <Benefits />
      <ProfessionalServices />
    </main>
  );
}
