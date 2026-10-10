import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { FeaturedProduct3D } from "@/components/sections/FeaturedProduct3D";
import { BrandManifesto } from "@/components/sections/BrandManifesto";
import { Benefits } from "@/components/sections/Benefits";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ProfessionalServices } from "@/components/sections/ProfessionalServices";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Categories />
      <FeaturedProduct3D />
      <BrandManifesto />
      <Benefits />
      <FeaturedProducts />
      <ProfessionalServices />
      <FinalCTA />
    </main>
  );
}
