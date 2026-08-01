"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function FloatingItem({ position, geometry, color, defaultSpeed, bumpTrigger }) {
  const meshRef = useRef();
  const [boost, setBoost] = useState(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Decay the click boost smoothly back to 0
      if (boost > 0) setBoost((b) => Math.max(0, b - delta * 2));

      const currentSpeed = defaultSpeed + boost;
      meshRef.current.rotation.x += delta * currentSpeed * 2;
      meshRef.current.rotation.y += delta * (currentSpeed * 1.5);
      
      // Floating wave motion + reaction displacement
      meshRef.current.position.y =
        position[1] +
        Math.sin(state.clock.elapsedTime * (defaultSpeed + 1)) * 0.3 +
        boost * 0.5;
    }
  });

  const handleObjectClick = (e) => {
    e.stopPropagation();
    setBoost(3.5); // Instant impulse boost when individual object is clicked
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleObjectClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      {geometry === "torus" && <torusGeometry args={[0.7, 0.25, 16, 32]} />}
      {geometry === "box" && <boxGeometry args={[0.9, 0.9, 0.9]} />}
      {geometry === "sphere" && <sphereGeometry args={[0.6, 32, 32]} />}
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

export default function Scene() {
  const [globalBump, setGlobalBump] = useState(0);

  // Trigger movement when clicking anywhere on the background canvas
  const handleCanvasClick = () => {
    setGlobalBump((prev) => prev + 1);
  };

  return (
    <div
      onClick={handleCanvasClick}
      className="fixed inset-0 z-0 pointer-events-auto"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: "#f5f5f5" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />

        {/* Scattered 3D floating items that react to screen & object clicks */}
        <FloatingItem
          position={[-2.5, 1.8, -1]}
          geometry="torus"
          color="#111111"
          defaultSpeed={0.6}
          bumpTrigger={globalBump}
        />
        <FloatingItem
          position={[2.6, 1.2, -1.5]}
          geometry="sphere"
          color="#e2ff70"
          defaultSpeed={0.4}
          bumpTrigger={globalBump}
        />
        <FloatingItem
          position={[-2.2, -1.5, -0.5]}
          geometry="box"
          color="#d1d5db"
          defaultSpeed={0.5}
          bumpTrigger={globalBump}
        />
        <FloatingItem
          position={[2.4, -1.6, -1]}
          geometry="torus"
          color="#000000"
          defaultSpeed={0.7}
          bumpTrigger={globalBump}
        />
      </Canvas>
    </div>
  );
}
