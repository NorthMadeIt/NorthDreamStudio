"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export default function FloatingObject({ position, rotation, scale, color, geometryType = "box" }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Subtle continuous rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={hovered ? scale * 1.1 : scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geometryType === "torus" ? (
          <torusGeometry args={[1, 0.4, 16, 100]} />
        ) : geometryType === "icosahedron" ? (
          <icosahedronGeometry args={[1, 0]} />
        ) : (
          <boxGeometry args={[1, 1, 1]} />
        )}
        <meshStandardMaterial
          color={hovered ? "#e2ff70" : color || "#000000"}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}
