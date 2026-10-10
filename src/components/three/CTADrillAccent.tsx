"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { DrillModel } from "@/components/three/DrillModel";

function SlowSpin({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!active || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={groupRef} rotation={[0.1, 0.6, 0]} scale={1.1}>
      <DrillModel />
    </group>
  );
}

export function CTADrillAccent({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 4.2], fov: 30 }}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 2]} intensity={1.4} color="#fff3e8" />
      <directionalLight position={[-3, 0, -2]} intensity={0.6} color="#ff6a1a" />
      <Environment resolution={64}>
        <Lightformer intensity={1.5} color="#ffffff" position={[0, 3, 2]} scale={6} form="rect" />
      </Environment>
      <SlowSpin active={active} />
    </Canvas>
  );
}
