import { cn } from "@/lib/utils/cn";

interface SectionLabelProps {
  index: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionLabel({ index, label, tone = "light", className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "label-industrial",
          tone === "light" ? "text-orange" : "text-orange-dark"
        )}
      >
        {index}
      </span>
      <span className="h-px w-8 bg-steel-dim" aria-hidden="true" />
      <span
        className={cn(
          "label-industrial",
          tone === "light" ? "text-steel" : "text-steel-dim"
        )}
      >
        {label}
      </span>
    </div>
  );
}
