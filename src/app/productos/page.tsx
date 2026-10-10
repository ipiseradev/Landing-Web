import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCatalog } from "@/components/catalog/ProductCatalog";
import { PRODUCTS } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Catálogo de productos | FERROX",
  description:
    "Explorá el catálogo completo de herramientas, fijaciones, pinturas, seguridad y materiales de construcción de FERROX.",
};

interface CatalogSectionProps {
  searchParams: Promise<{ categoria?: string }>;
}

async function CatalogSection({ searchParams }: CatalogSectionProps) {
  const { categoria } = await searchParams;
  return <ProductCatalog products={PRODUCTS} showFilter initialCategory={categoria} />;
}

interface ProductosPageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default function ProductosPage({ searchParams }: ProductosPageProps) {
  return (
    <main className="flex-1 bg-carbon">
      <PageHeader
        index="06"
        label="Catálogo"
        title="PRODUCTOS PARA CADA ETAPA DEL PROYECTO."
        description="Catálogo conceptual de demostración. Precios ilustrativos."
      />
      <div className="container-edit pb-24 lg:pb-32">
        <Suspense fallback={null}>
          <CatalogSection searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
