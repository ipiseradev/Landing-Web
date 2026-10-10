import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-orange text-carbon hover:bg-orange-dark focus-visible:bg-orange-dark",
  secondary:
    "border border-steel-dim text-warm-white hover:border-orange hover:text-orange",
  ghost: "text-warm-white hover:text-orange",
};

interface ButtonOwnProps {
  variant?: ButtonVariant;
  className?: string;
}

type ButtonAsButton = ButtonOwnProps & { as?: "button" } & Omit<
  ComponentPropsWithoutRef<"button">,
  "className"
>;

type ButtonAsAnchor = ButtonOwnProps & { as: "a" } & Omit<
  ComponentPropsWithoutRef<"a">,
  "className"
>;

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const { variant = "primary", className } = props;
  const classes = cn(
    "inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide uppercase transition-colors duration-200",
    VARIANT_CLASSES[variant],
    className
  );

  if (props.as === "a") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, variant: _variant, className: _className, children, href, ...anchorProps } = props;

    if (typeof href === "string" && href.startsWith("/") && anchorProps.target !== "_blank") {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, variant: _variant, className: _className, children, ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
