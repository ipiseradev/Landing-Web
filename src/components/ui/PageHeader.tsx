import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeaderProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

export function PageHeader({ index, label, title, description }: PageHeaderProps) {
  return (
    <div className="container-edit pb-16 pt-36 lg:pt-44">
      <Reveal>
        <SectionLabel index={index} label={label} />
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-lg text-steel">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
