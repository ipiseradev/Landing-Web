"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options ?? { threshold: 0.15 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}
