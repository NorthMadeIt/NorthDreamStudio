"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// --- Drop your background-removed PNGs into /public/images and list them here.
// baseSize = height in world units before aspect-ratio correction (width is derived from the image itself).
const IMAGES = [
  { id: "img-1", url: "/images/object-01.png", position: [-2.3, 1.2, -0.3], baseSize: 1.4, drift: [0.35, 0.22, 0] },
  { id: "img-2", url: "/images/object-02.png", position: [2.2, 0.8, -0.7], baseSize: 1.1, drift: [-0.3, 0.28, 0] },
  { id: "img-3", url: "/images/object-03.png", position: [-1.7, -1.3, -0.2], baseSize: 1.3, drift: [0.26, -0.24, 0] },
  { id: "img-4", url: "/images/object-04.png", position: [2.1, -1.1, -0.6], baseSize: 1.0, drift: [-0.32, -0.2, 0] },
  { id: "img-5", url: "/images/object-05.png", position: [0.2, 1.7, -1], baseSize: 1.2, drift: [0.18, -0.3, 0] },
  { id: "img-6", url: "/images/object-06.png", position: [-0.3, -1.8, -1.1], baseSize: 0.9, drift: [-0.22, 0.26, 0] },
];

const BOUNDS = { x: 3.4, y: 2.1 };
const REPEL_RADIUS = 1.7;
const REPEL_STRENGTH = 5.5;
const IMPULSE_STRENGTH = 7;
const DAMPING = 0.94;

function usePointerWorld() {
  const { viewport } = useThree();
  const worldPointer = useRef(new THREE.Vector2(999, 999));

  useFrame((state) => {
    worldPointer.current.set(
      state.pointer.x * (viewport.width / 2),
      state.pointer.y * (viewport.height / 2)
    );
  });

  return worldPointer;
}

function FloatingImage({ id, url, position, baseSize, drift, pointerRef }) {
  const texture = useTexture(url);
  const aspect =
    texture.image && texture.image.width
      ? texture.image.width / texture.image.height
      : 1;

  const meshRef = useRef();
  const velocity = useRef(new THREE.Vector3(...drift));
  const pos = useRef(new THREE.Vector3(...position));
  const spinSpeed = useRef((Math.random() - 0.5) * 0.4);

  const applyImpulse = (dir) => {
    velocity.current.x += dir.x * IMPULSE_STRENGTH;
    velocity.current.y += dir.y * IMPULSE_STRENGTH;
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    const away = new THREE.Vector2(
      pos.current.x - pointerRef.current.x,
      pos.current.y - pointerRef.current.y
    );
    if (away.lengthSq() === 0) away.set(Math.random() - 0.5, Math.random() - 0.5);
    away.normalize();
    applyImpulse(away);
  };

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = pointerRef.current;

    const dx = pos.current.x - p.x;
    const dy = pos.current.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < REPEL_RADIUS && dist > 0.0001) {
      const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
      velocity.current.x += (dx / dist) * force * dt;
      velocity.current.y += (dy / dist) * force * dt;
    }

    pos.current.x += velocity.current.x * dt;
    pos.current.y += velocity.current.y * dt;

    if (pos.current.x > BOUNDS.x || pos.current.x < -BOUNDS.x) {
      velocity.current.x *= -1;
      pos.current.x = THREE.MathUtils.clamp(pos.current.x, -BOUNDS.x, BOUNDS.x);
    }
    if (pos.current.y > BOUNDS.y || pos.current.y < -BOUNDS.y) {
      velocity.current.y *= -1;
      pos.current.y = THREE.MathUtils.clamp(pos.current.y, -BOUNDS.y, BOUNDS.y);
    }

    velocity.current.multiplyScalar(DAMPING);
    const driftSpeed = Math.hypot(drift[0], drift[1]);
    const currentSpeed = Math.hypot(velocity.current.x, velocity.current.y);
    if (currentSpeed < driftSpeed * 0.5) {
      velocity.current.x += drift[0] * dt * 0.6;
      velocity.current.y += drift[1] * dt * 0.6;
    }

    if (meshRef.current) {
      meshRef.current.position.set(pos.current.x, pos.current.y, pos.current.z);
      meshRef.current.rotation.z += dt * spinSpeed.current;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[baseSize * aspect, baseSize, 1]}
      onPointerDown={handlePointerDown}
      onTouchStart={handlePointerDown}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.1}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function SceneContents() {
  const pointerRef = usePointerWorld();
  const images = useMemo(() => IMAGES, []);

  return (
    <>
      <ambientLight intensity={1.8} />
      {images.map((img) => (
        <FloatingImage key={img.id} {...img} pointerRef={pointerRef} />
      ))}
    </>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 touch-none" style={{ background: "#f5f5f5" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
