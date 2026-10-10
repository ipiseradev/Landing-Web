"use client";

import { Suspense, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, ContactShadows } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { Hand, RotateCcw } from "lucide-react";
import { DrillModel } from "@/components/three/DrillModel";
import { WebGLFallback } from "@/components/three/WebGLFallback";
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";
import { PRODUCT_HOTSPOTS } from "@/lib/data/products";
import { useWebglAvailable } from "@/lib/hooks/useWebglAvailable";
import { cn } from "@/lib/utils/cn";

interface ScreenPoint {
  x: number;
  y: number;
  visible: boolean;
}

/**
 * Projects each hotspot's 3D anchor to 2D screen space every rendered frame,
 * so markers render as plain DOM overlays instead of drei's <Html> portal
 * (which conflicts with Motion's animated unmount during page transitions).
 */
function HotspotProjector({
  anchorsRef,
  onUpdate,
}: {
  anchorsRef: RefObject<(THREE.Object3D | null)[]>;
  onUpdate: (points: Record<string, ScreenPoint>) => void;
}) {
  const { camera, size } = useThree();
  const vector = useRef(new THREE.Vector3());

  useFrame(() => {
    const next: Record<string, ScreenPoint> = {};
    PRODUCT_HOTSPOTS.forEach((hotspot, i) => {
      const anchor = anchorsRef.current[i];
      if (!anchor) return;
      anchor.getWorldPosition(vector.current);
      vector.current.project(camera);
      next[hotspot.id] = {
        x: (vector.current.x * 0.5 + 0.5) * size.width,
        y: (-vector.current.y * 0.5 + 0.5) * size.height,
        visible: vector.current.z < 1,
      };
    });
    onUpdate(next);
  });

  return null;
}

function Scene({
  anchorsRef,
  onUpdate,
}: {
  anchorsRef: RefObject<(THREE.Object3D | null)[]>;
  onUpdate: (points: Record<string, ScreenPoint>) => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <>
      <color attach="background" args={["#101113"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 2]} intensity={1.7} color="#fff3e8" />
      <directionalLight position={[-3, 1, -3]} intensity={0.5} color="#9db6ff" />

      <Environment resolution={128}>
        <Lightformer intensity={2} color="#ffffff" position={[0, 4, 2]} scale={8} form="rect" />
        <Lightformer intensity={1} color="#ff6a1a" position={[-4, 1, 2]} scale={4} form="rect" />
      </Environment>

      <group position={[0, 0.15, 0]} rotation={[0, Math.PI * 0.15, 0]}>
        <DrillModel />
        {PRODUCT_HOTSPOTS.map((hotspot, i) => (
          <object3D
            key={hotspot.id}
            position={hotspot.position}
            ref={(node) => {
              anchorsRef.current[i] = node;
            }}
          />
        ))}
        <HotspotProjector anchorsRef={anchorsRef} onUpdate={onUpdate} />
      </group>

      <ContactShadows position={[0, -1.35, 0]} opacity={0.5} scale={6} blur={2.4} far={2} />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        minDistance={3.5}
        maxDistance={6.5}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.7}
        target={[0, -0.1, 0]}
        rotateSpeed={0.6}
      />
    </>
  );
}

export function ProductViewer3D() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [points, setPoints] = useState<Record<string, ScreenPoint>>({});
  const webglOk = useWebglAvailable();
  const [resetKey, setResetKey] = useState(0);
  const anchorsRef = useRef<(THREE.Object3D | null)[]>([]);

  function handleToggle(id: string) {
    setActiveId((current) => (current === id ? null : id));
    setHasInteracted(true);
  }

  function handleReset() {
    setActiveId(null);
    setResetKey((k) => k + 1);
  }

  if (!webglOk) {
    return (
      <div className="relative aspect-square w-full overflow-hidden lg:aspect-auto lg:h-[560px]">
        <WebGLFallback />
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden border border-graphite-soft bg-carbon lg:aspect-auto lg:h-[560px]">
      <CanvasErrorBoundary fallback={<WebGLFallback />}>
        <Suspense fallback={<WebGLFallback />}>
          <Canvas
            key={resetKey}
            frameloop="demand"
            dpr={[1, 2]}
            camera={{ position: [0, 0.3, 5], fov: 32 }}
            onPointerDown={() => setHasInteracted(true)}
          >
            <Scene anchorsRef={anchorsRef} onUpdate={setPoints} />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>

      <div className="pointer-events-none absolute inset-0">
        {PRODUCT_HOTSPOTS.map((hotspot, i) => {
          const point = points[hotspot.id];
          if (!point || !point.visible) return null;
          return (
            <div
              key={hotspot.id}
              className="pointer-events-auto absolute"
              style={{ left: point.x, top: point.y, transform: "translate(-50%, -50%)" }}
            >
              <button
                type="button"
                onClick={() => handleToggle(hotspot.id)}
                aria-expanded={activeId === hotspot.id}
                aria-label={`Ver detalle: ${hotspot.label}`}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors",
                  activeId === hotspot.id
                    ? "border-orange bg-orange text-carbon"
                    : "border-orange/70 bg-carbon/80 text-orange hover:bg-orange hover:text-carbon"
                )}
              >
                {i + 1}
              </button>
              {activeId === hotspot.id && (
                <div className="absolute left-1/2 top-9 w-48 -translate-x-1/2 rounded-sm border border-steel-dim/40 bg-carbon/95 p-3 text-left shadow-xl backdrop-blur-sm">
                  <p className="label-industrial text-orange">{hotspot.label}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-steel">{hotspot.detail}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!hasInteracted && (
        <div className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-steel-dim/40 bg-carbon/80 px-4 py-2 text-xs text-steel backdrop-blur-sm">
          <Hand size={14} className="text-orange" aria-hidden="true" />
          Arrastrá para rotar el modelo
        </div>
      )}

      <button
        type="button"
        onClick={handleReset}
        className="absolute right-4 top-4 flex items-center gap-2 border border-steel-dim/40 bg-carbon/80 px-3 py-2 text-xs text-steel backdrop-blur-sm transition-colors hover:border-orange hover:text-orange"
      >
        <RotateCcw size={14} aria-hidden="true" />
        Restablecer vista
      </button>
    </div>
  );
}
