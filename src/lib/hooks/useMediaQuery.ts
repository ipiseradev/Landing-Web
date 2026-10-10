"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  function subscribe(callback: () => void) {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  }

  function getSnapshot() {
    return window.matchMedia(query).matches;
  }

  function getServerSnapshot() {
    return false;
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
