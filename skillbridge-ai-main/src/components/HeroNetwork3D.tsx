import { Environment, Float, Lightformer, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { HeroNetworkFallback } from "@/components/HeroNetworkFallback";

const NODE_POSITIONS: [number, number, number][] = [
  [-3.4, 1.8, 0.4],
  [-2.5, -1.7, 0.2],
  [-0.9, 2.7, -0.7],
  [1.8, 2.2, 0.2],
  [3.4, 0.3, -0.4],
  [2.3, -2.1, 0.5],
  [-0.5, -2.8, -0.3],
];

function NetworkScene() {
  const network = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const reducedMotion = useRef(false);
  const lines = useMemo(
    () => NODE_POSITIONS.map((position) => [[0, 0, 0] as [number, number, number], position]),
    [],
  );

  useLayoutEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!network.current || reducedMotion.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        network.current?.scale ?? { x: 1, y: 1, z: 1 },
        { x: 0.62, y: 0.62, z: 0.62 },
        { x: 1, y: 1, z: 1, duration: 1.4, ease: "power3.out" },
      );
      gsap.fromTo(
        network.current?.rotation ?? { x: 0, y: 0, z: 0 },
        { y: -0.65 },
        { y: 0, duration: 1.6, ease: "power3.out" },
      );
    });
    return () => context.revert();
  }, []);

  useFrame(({ pointer }, rawDelta) => {
    if (!network.current) return;
    const delta = Math.min(rawDelta, 0.05);
    const motionScale = reducedMotion.current ? 0 : 1;
    network.current.rotation.y += delta * 0.08 * motionScale;
    network.current.rotation.x = THREE.MathUtils.damp(
      network.current.rotation.x,
      pointer.y * 0.12 * motionScale,
      4,
      delta,
    );
    network.current.rotation.z = THREE.MathUtils.damp(
      network.current.rotation.z,
      -pointer.x * 0.08 * motionScale,
      4,
      delta,
    );
    if (core.current && !reducedMotion.current) core.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={network} rotation={[0.12, 0, -0.06]}>
      {lines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index % 2 === 0 ? "#6975e8" : "#39a887"}
          lineWidth={1.2}
          transparent
          opacity={0.48}
        />
      ))}

      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.32}>
        <mesh ref={core} castShadow>
          <icosahedronGeometry args={[1.05, 2]} />
          <meshStandardMaterial color="#5260d9" metalness={0.35} roughness={0.22} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.5, 0.025, 8, 80]} />
          <meshStandardMaterial color="#69c7ad" emissive="#69c7ad" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      {NODE_POSITIONS.map((position, index) => (
        <Float key={index} speed={0.8 + index * 0.08} floatIntensity={0.2} rotationIntensity={0.18}>
          <group position={position}>
            <mesh castShadow>
              <dodecahedronGeometry args={[index % 3 === 0 ? 0.38 : 0.28, 0]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? "#6470df" : "#37a685"}
                roughness={0.3}
                metalness={0.18}
              />
            </mesh>
            <mesh scale={1.55}>
              <sphereGeometry args={[index % 3 === 0 ? 0.38 : 0.28, 16, 16]} />
              <meshBasicMaterial color="#8090ed" transparent opacity={0.1} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

export default function HeroNetwork3D() {
  const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
      setWebGLAvailable(Boolean(context));
    } catch {
      setWebGLAvailable(false);
    }
  }, []);

  if (webGLAvailable !== true) return <HeroNetworkFallback />;

  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        fallback={<HeroNetworkFallback />}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 9], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 6, 7]} intensity={2.4} castShadow />
        <pointLight position={[-4, -2, 4]} intensity={1.2} color="#71d1b4" />
        <NetworkScene />
        <Environment>
          <Lightformer intensity={2} position={[0, 4, 2]} scale={[8, 8, 1]} />
          <Lightformer
            intensity={1.2}
            color="#9aa4ee"
            position={[-5, 1, 1]}
            rotation-y={Math.PI / 2}
            scale={[8, 2, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
