"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
}

export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const hidden = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y };

  return (
    <motion.div
      initial={hidden}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
