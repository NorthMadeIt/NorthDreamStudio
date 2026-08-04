"use client";

import React, { Suspense, useRef, useMemo, Component } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Catches a bad/missing image so ONE broken file can't crash the whole page.
class ImageErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn(`[Scene] Failed to load "${this.props.url}" — skipping it.`, error);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// --- Drop your background-removed PNGs into /public/images and list them here.
// baseSize = height in world units before aspect-ratio correction (width is derived from the image itself).
const IMAGES = [
  { id: "logo", url: "/images/object-01-logo.png", position: [-1.3, 1.1, -0.9], baseSize: 0.8, drift: [0.16, 0.12, 0] },
  { id: "madebynorth", url: "/images/object-02-madebynorth.png", position: [1.4, 1.0, -0.4], baseSize: 1.0, drift: [-0.2, 0.14, 0] },
  { id: "globe", url: "/images/object-03-globe.png", position: [-1.7, -0.2, -0.6], baseSize: 0.75, drift: [0.2, -0.16, 0] },
  { id: "alien", url: "/images/object-04-alien.png", position: [1.6, -0.3, -1], baseSize: 0.8, drift: [-0.16, -0.2, 0] },
  { id: "gummybears", url: "/images/object-05-gummybears.png", position: [0, -1.2, -0.3], baseSize: 0.95, drift: [0.14, 0.18, 0] },
  { id: "graffiti", url: "/images/object-06-graffiti.png", position: [-0.4, 0.3, -1.3], baseSize: 1.0, drift: [-0.12, 0.16, 0] },
  { id: "stopsign", url: "/images/object-07-stopsign.png", position: [0.6, -1.3, -0.7], baseSize: 0.8, drift: [0.18, -0.12, 0] },
  { id: "tshirt", url: "/images/object-08-tshirt.png", position: [-1.8, 1.3, -1.2], baseSize: 1.05, drift: [0.16, 0.14, 0] },
];

const BOUNDS = { x: 2.6, y: 1.6 };
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
        <ImageErrorBoundary key={img.id} url={img.url}>
          <Suspense fallback={null}>
            <FloatingImage {...img} pointerRef={pointerRef} />
          </Suspense>
        </ImageErrorBoundary>
      ))}
    </>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 touch-none" style={{ background: "#e5e7eb" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}