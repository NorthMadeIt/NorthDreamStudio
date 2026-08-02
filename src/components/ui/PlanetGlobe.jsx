"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function RotatingSphere() {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.5;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.8;
  });

  return (
    <group>
      {/* Central Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial color="#e2e2e2" wireframe />
      </mesh>
      
      {/* Orbital Ring with Indicator */}
      <group ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <mesh position={[1.4, 0, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      </group>
    </group>
  );
}

export default function PlanetGlobe() {
  return (
    <div className="w-full h-full bg-[#4a2e18] relative flex flex-col justify-between p-2 overflow-hidden select-none">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <RotatingSphere />
        </Canvas>
      </div>

      <div className="relative z-10 text-[#ffffff] font-bold text-[11px] tracking-tight">
        Online
      </div>
      <div className="relative z-10 text-[#ffffff] font-mono text-[10px] text-right">
        1
      </div>
    </div>
  );
}
