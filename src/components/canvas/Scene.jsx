"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import FloatingObject from "./FloatingObject";

export default function Scene({ onHoverObject }) {
  return (
    <div className="fixed inset-0 pointer-events-auto z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "#e5e7eb" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />

        {/* Scattered 3D Curiosities */}
        <FloatingObject
          position={[-2.5, 1.2, 0]}
          geometryType="torus"
          scale={0.9}
          color="#111111"
          label="Object 01 // Torus Ring"
          onHover={onHoverObject}
        />
        <FloatingObject
          position={[2.8, -0.8, -1]}
          geometryType="icosahedron"
          scale={1.1}
          color="#dedede"
          label="Object 02 // Polyhedron"
          onHover={onHoverObject}
        />
        <FloatingObject
          position={[0, -2, 1]}
          geometryType="box"
          scale={0.7}
          color="#e2ff70"
          label="Object 03 // Lime Core"
          onHover={onHoverObject}
        />
      </Canvas>
    </div>
  );
}
