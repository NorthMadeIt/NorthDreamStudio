"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function FloatingItem({ position, geometry, color, speed }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * (speed * 0.8);
      // Gentle floating motion
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === "torus" && <torusGeometry args={[0.7, 0.25, 16, 32]} />}
      {geometry === "box" && <boxGeometry args={[0.9, 0.9, 0.9]} />}
      {geometry === "sphere" && <sphereGeometry args={[0.6, 32, 32]} />}
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: "#f5f5f5" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />

        {/* Scattered 3D floating items around central card */}
        <FloatingItem position={[-2.5, 1.8, -1]} geometry="torus" color="#111111" speed={0.6} />
        <FloatingItem position={[2.6, 1.2, -1.5]} geometry="sphere" color="#e2ff70" speed={0.4} />
        <FloatingItem position={[-2.2, -1.5, -0.5]} geometry="box" color="#d1d5db" speed={0.5} />
        <FloatingItem position={[2.4, -1.6, -1]} geometry="torus" color="#000000" speed={0.7} />
      </Canvas>
    </div>
  );
}
