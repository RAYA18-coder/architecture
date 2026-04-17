import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

function BrassRing({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.18, 64, 128]} />
        <meshStandardMaterial color="#c9a26b" metalness={1} roughness={0.15} envMapIntensity={1.4} />
      </mesh>
    </Float>
  );
}

function EmeraldOrb() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <sphereGeometry args={[1.4, 96, 96]} />
        <MeshDistortMaterial color="#1f5c3f" metalness={0.6} roughness={0.2} distort={0.28} speed={1.2} envMapIntensity={1.2} />
      </mesh>
    </Float>
  );
}

function BrassPedestal() {
  return (
    <mesh position={[0, -1.7, 0]} receiveShadow>
      <cylinderGeometry args={[1.6, 1.8, 0.18, 64]} />
      <meshStandardMaterial color="#b58a4f" metalness={1} roughness={0.25} />
    </mesh>
  );
}

export function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.5], fov: 38 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 4]} intensity={1.2} color="#f6e3b5" />
        <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#1f5c3f" />
        <EmeraldOrb />
        <BrassRing position={[0, 0, 0]} scale={2.2} />
        <BrassRing position={[0, 0, 0]} scale={2.7} />
        <BrassPedestal />
        <ContactShadows position={[0, -1.6, 0]} opacity={0.45} scale={8} blur={2.5} far={4} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}
