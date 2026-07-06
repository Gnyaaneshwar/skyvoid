import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingOrbs({ count = 500 }) { // Drastically reduced for a clean, sparse look
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate initial properties for our shiny orbs
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10,
        // Individual spread offsets so they don't clump into a single dot
        offsetX: (Math.random() - 0.5) * 18,
        offsetY: (Math.random() - 0.5) * 18,
        // Unique speeds for their idle floating animation
        speed: 0.01 + Math.random() * 0.03,
        timeOffset: Math.random() * 100, 
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    // Grab the live mouse position and map it to the 3D world space
    const mouseX = (state.mouse.x * state.viewport.width) / 2;
    const mouseY = (state.mouse.y * state.viewport.height) / 2;

    particles.forEach((p, i) => {
      // 1. Idle Animation: Sine waves create a gentle floating effect
      const t = state.clock.elapsedTime + p.timeOffset;
      const floatX = Math.sin(t * p.speed) * 2;
      const floatY = Math.cos(t * p.speed) * 2;

      // 2. Target Calculation: Cursor Position + Spread Offset + Floating offset
      const targetX = mouseX + p.offsetX + floatX;
      const targetY = mouseY + p.offsetY + floatY;

      // 3. Smooth Interpolaion: Pull the particle towards the target
      p.x += (targetX - p.x) * 0.04; // Adjust 0.04 to make them follow faster or slower
      p.y += (targetY - p.y) * 0.04;

      // Apply coordinates to the dummy object
      dummy.position.set(p.x, p.y, p.z);
      dummy.updateMatrix();
      
      // Update the actual mesh instance
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    // Notify Three.js that the grid has updated this frame
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      {/* Reduced the radius from 0.06 to 0.025 for tiny particles */}
      <sphereGeometry args={[0.020, 16, 16]} />
      
      {/* Emissive cyan material with additive blending for a "shiny" aesthetic */}
      <meshBasicMaterial
        color="#58E1FF"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function WeatherCursor() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none", // Ensures buttons underneath remain clickable
      }}
    >
      <Canvas camera={{ position: [0, 0, 10] }}>
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}