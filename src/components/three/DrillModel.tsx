"use client";

import { forwardRef } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural cordless drill built from primitives — no external GLB asset.
 * Local space: bit tip points toward +Z, handle hangs toward -Y.
 */
export const DrillModel = forwardRef<THREE.Group>(function DrillModel(_props, ref) {
  return (
    <group ref={ref} dispose={null}>
      {/* Main body shell */}
      <RoundedBox args={[0.62, 0.62, 1.5]} radius={0.16} smoothness={6} position={[0, 0.05, -0.05]}>
        <meshPhysicalMaterial
          color="#1b1d20"
          roughness={0.35}
          metalness={0.15}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
        />
      </RoundedBox>

      {/* Orange accent band around the motor housing */}
      <mesh position={[0, 0.05, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.33, 0.33, 0.14, 32]} />
        <meshPhysicalMaterial color="#ff6a1a" roughness={0.4} metalness={0.1} clearcoat={0.5} />
      </mesh>

      {/* Front nose cone narrowing into the chuck */}
      <mesh position={[0, 0.05, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.26, 32]} />
        <meshPhysicalMaterial color="#1b1d20" roughness={0.3} metalness={0.2} clearcoat={0.4} />
      </mesh>

      {/* Chuck — brushed steel */}
      <mesh position={[0, 0.05, 1.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.19, 0.21, 0.3, 32]} />
        <meshStandardMaterial color="#9aa0a8" roughness={0.25} metalness={0.9} />
      </mesh>
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.05, 1.02]}
          rotation={[Math.PI / 2, 0, (i * Math.PI * 2) / 3]}
        >
          <boxGeometry args={[0.03, 0.3, 0.19]} />
          <meshStandardMaterial color="#6b7079" roughness={0.3} metalness={0.85} />
        </mesh>
      ))}

      {/* Drill bit */}
      <mesh position={[0, 0.05, 1.32]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.42, 12]} />
        <meshStandardMaterial color="#c7ccd1" roughness={0.2} metalness={1} />
      </mesh>
      <mesh position={[0, 0.05, 1.54]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.035, 0.08, 12]} />
        <meshStandardMaterial color="#c7ccd1" roughness={0.15} metalness={1} />
      </mesh>

      {/* Two-speed selector ring */}
      <mesh position={[0, 0.05, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.03, 12, 32]} />
        <meshStandardMaterial color="#2a2d31" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Handle, angled down from the rear of the body */}
      <group position={[0, -0.42, -0.62]} rotation={[0.34, 0, 0]}>
        <RoundedBox args={[0.34, 0.85, 0.36]} radius={0.14} smoothness={6}>
          <meshPhysicalMaterial
            color="#1b1d20"
            roughness={0.5}
            metalness={0.08}
            clearcoat={0.2}
          />
        </RoundedBox>

        {/* Textured rubberized grip insert */}
        <RoundedBox args={[0.36, 0.42, 0.1]} radius={0.1} smoothness={4} position={[0, 0.05, 0.19]}>
          <meshStandardMaterial color="#101113" roughness={0.9} metalness={0} />
        </RoundedBox>

        {/* Trigger */}
        <mesh position={[0, 0.3, 0.2]} rotation={[0.5, 0, 0]}>
          <boxGeometry args={[0.16, 0.22, 0.08]} />
          <meshPhysicalMaterial color="#ff6a1a" roughness={0.4} clearcoat={0.5} />
        </mesh>
      </group>

      {/* Battery pack at the base of the handle */}
      <group position={[0, -0.96, -0.86]} rotation={[0.34, 0, 0]}>
        <RoundedBox args={[0.46, 0.34, 0.5]} radius={0.1} smoothness={6}>
          <meshPhysicalMaterial color="#23262a" roughness={0.45} metalness={0.1} clearcoat={0.25} />
        </RoundedBox>
        <mesh position={[0, 0, 0.26]}>
          <boxGeometry args={[0.3, 0.06, 0.02]} />
          <meshStandardMaterial color="#ff6a1a" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
});
