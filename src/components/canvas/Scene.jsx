"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function FloatingItem({ position, geometry, color, defaultSpeed }) {
  const meshRef = useRef();
  const [boost, setBoost] = useState(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (boost > 0) setBoost((b) => Math.max(0, b - delta * 3));

      const currentSpeed = defaultSpeed + boost;
      meshRef.current.rotation.x += delta * currentSpeed * 2.5;
      meshRef.current.rotation.y += delta * (currentSpeed * 2);
      meshRef.current.position.y =
        position[1] +
        Math.sin(state.clock.elapsedTime * (defaultSpeed + 1.2)) * 0.25 +
        boost * 0.4;
    }
  });

  const handleInteraction = (e) => {
    e.stopPropagation();
    setBoost(4.0); // Boost speed on touch or click
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerDown={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {geometry === "torus" && <torusGeometry args={[0.7, 0.25, 16, 32]} />}
      {geometry === "box" && <boxGeometry args={[0.85, 0.85, 0.85]} />}
      {geometry === "sphere" && <sphereGeometry args={[0.6, 32, 32]} />}
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
    </mesh>
  );
}

export default function Scene() {
  const [globalBoost, setGlobalBoost] = useState(0);

  const handleCanvasTouch = () => {
    setGlobalBoost((prev) => prev + 1);
  };

  return (
    <div
      onPointerDown={handleCanvasTouch}
      onTouchStart={handleCanvasTouch}
      className="fixed inset-0 z-0 pointer-events-auto touch-none"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: "#f5f5f5" }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[10, 10, 10]} intensity={2.2} />

        <FloatingItem
          position={[-2.4, 1.8, -1]}
          geometry="torus"
          color="#111111"
          defaultSpeed={0.5}
        />
        <FloatingItem
          position={[2.5, 1.3, -1.5]}
          geometry="sphere"
          color="#e2ff70"
          defaultSpeed={0.4}
        />
        <FloatingItem
          position={[-2.2, -1.6, -0.5]}
          geometry="box"
          color="#c4c4c4"
          defaultSpeed={0.6}
        />
        <FloatingItem
          position={[2.4, -1.7, -1]}
          geometry="torus"
          color="#000000"
          defaultSpeed={0.7}
        />
      </Canvas>
    </div>
  );
}
