"use client";

import { useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { DrillModel } from "@/components/three/DrillModel";

interface PointerState {
  x: number;
  y: number;
}

interface RigProps {
  pointerRef: RefObject<PointerState>;
  scrollRef: RefObject<number>;
  reducedMotion: boolean;
}

function Rig({ pointerRef, scrollRef, reducedMotion }: RigProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const pointer = pointerRef.current;
    const scroll = scrollRef.current;
    const idle = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

    const targetY = Math.PI * 0.18 + pointer.x * 0.5 + idle;
    const targetX = -0.08 + pointer.y * 0.22 + scroll * -0.35;
    const targetPosY = 0.05 - scroll * 0.4;

    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 4, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 4, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, targetPosY, 4, delta);
  });

  return (
    <group ref={groupRef} scale={1} position={[0.1, 0, 0]}>
      <DrillModel />
    </group>
  );
}

interface HeroSceneProps {
  pointerRef: RefObject<PointerState>;
  scrollRef: RefObject<number>;
  reducedMotion: boolean;
  active: boolean;
  isMobile: boolean;
}

export function HeroScene({ pointerRef, scrollRef, reducedMotion, active, isMobile }: HeroSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, isMobile ? 1.5 : 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.2, 5.4], fov: 30 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#101113"]} />

      <ambientLight intensity={0.25} />
      <directionalLight
        position={[3, 4, 2]}
        intensity={1.9}
        color="#fff3e8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 1.2, -3]} intensity={0.5} color="#9db6ff" />
      <pointLight position={[-2.2, -0.6, 1.6]} intensity={1.3} color="#ff6a1a" distance={7} />

      <Environment resolution={128}>
        <Lightformer intensity={2} color="#ffffff" position={[0, 4, 2]} scale={8} form="rect" />
        <Lightformer intensity={1.2} color="#ff6a1a" position={[-4, 1, 2]} scale={4} form="rect" />
        <Lightformer intensity={0.8} color="#8fb4ff" position={[4, 0, -3]} scale={5} form="rect" />
      </Environment>

      <Rig pointerRef={pointerRef} scrollRef={scrollRef} reducedMotion={reducedMotion} />

      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={0.55}
        scale={7}
        blur={2.6}
        far={2.2}
        color="#000000"
      />

      {!isMobile && !reducedMotion && (
        <Sparkles count={40} scale={4} size={1.4} speed={0.2} opacity={0.18} color="#8b9199" />
      )}
    </Canvas>
  );
}
