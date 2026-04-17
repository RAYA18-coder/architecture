import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import type { Group, InstancedMesh, Mesh } from "three";
import { Object3D, Color } from "three";

function Butterfly({ position, scale = 1, delay = 0, color = "#c9a26b" }: { position: [number, number, number]; scale?: number; delay?: number; color?: string }) {
  const group = useRef<Group>(null);
  const left = useRef<Mesh>(null);
  const right = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    const flap = Math.sin(t * 8) * 1.1;
    if (left.current) left.current.rotation.y = -flap;
    if (right.current) right.current.rotation.y = flap;
    if (group.current) {
      group.current.position.x = position[0] + Math.sin(t * 0.6) * 0.4;
      group.current.position.y = position[1] + Math.sin(t * 0.9) * 0.25;
      group.current.position.z = position[2] + Math.cos(t * 0.5) * 0.3;
      group.current.rotation.z = Math.sin(t * 0.7) * 0.2;
      group.current.rotation.y = Math.sin(t * 0.4) * 0.5;
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* body */}
      <mesh>
        <capsuleGeometry args={[0.04, 0.25, 6, 12]} />
        <meshStandardMaterial color="#3a2a18" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* left wing */}
      <mesh ref={left} position={[-0.02, 0, 0]}>
        <planeGeometry args={[0.55, 0.45, 1, 1]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} transparent opacity={0.92} side={2} emissive={color} emissiveIntensity={0.25} />
      </mesh>
      {/* right wing */}
      <mesh ref={right} position={[0.02, 0, 0]}>
        <planeGeometry args={[0.55, 0.45, 1, 1]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} transparent opacity={0.92} side={2} emissive={color} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function Glitter({ count = 120 }: { count?: number }) {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 5,
        z: (Math.random() - 0.5) * 3,
        s: 0.015 + Math.random() * 0.04,
        speed: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      })),
    [count]
  );
  const colorA = useMemo(() => new Color("#e8c989"), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((p, i) => {
      const y = p.y + Math.sin(t * p.speed + p.phase) * 0.5;
      const x = p.x + Math.cos(t * p.speed * 0.6 + p.phase) * 0.2;
      const twinkle = 0.5 + Math.abs(Math.sin(t * 2 + p.phase)) * 0.5;
      dummy.position.set(x, y, p.z);
      dummy.scale.setScalar(p.s * twinkle);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={colorA} metalness={1} roughness={0.1} emissive={colorA} emissiveIntensity={1.2} toneMapped={false} />
    </instancedMesh>
  );
}

export function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 3]} intensity={0.8} color="#f6e3b5" />
        <pointLight position={[-2, 1, 2]} intensity={0.5} color="#1f5c3f" />

        <Glitter count={140} />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
          <Butterfly position={[1.2, 0.6, 0]} scale={1.1} delay={0} color="#c9a26b" />
        </Float>
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
          <Butterfly position={[-0.8, -0.4, 0.5]} scale={0.9} delay={1.4} color="#e3c084" />
        </Float>
        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.7}>
          <Butterfly position={[0.3, 1.1, -0.6]} scale={0.75} delay={2.2} color="#1f5c3f" />
        </Float>
        <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.9}>
          <Butterfly position={[-1.6, 0.9, -0.3]} scale={0.65} delay={3.1} color="#b58a4f" />
        </Float>
        <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.7}>
          <Butterfly position={[1.6, -0.8, 0.2]} scale={0.8} delay={0.6} color="#d4af6d" />
        </Float>
      </Suspense>
    </Canvas>
  );
}
