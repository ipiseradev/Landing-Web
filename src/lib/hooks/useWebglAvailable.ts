"use client";

import { useSyncExternalStore } from "react";
import { isWebglAvailable } from "@/lib/three/isWebglAvailable";

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return true;
}

export function useWebglAvailable(): boolean {
  return useSyncExternalStore(subscribe, isWebglAvailable, getServerSnapshot);
}
