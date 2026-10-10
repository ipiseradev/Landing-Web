import { cn } from "@/lib/utils/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-display", className)}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M4 20L20 4L36 20L20 36L4 20Z" stroke="#FF6A1A" strokeWidth="3" />
        <path d="M14 20L20 14L26 20L20 26L14 20Z" fill="#FF6A1A" />
      </svg>
      <span className="text-lg font-bold tracking-tight">FERROX</span>
    </span>
  );
}
