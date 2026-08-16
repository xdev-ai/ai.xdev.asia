"use client";

/* xDev AI: 3D processing-pipeline flow visualization for AI-SDLC.
   Five stages: Intent → Specification → Policy Gate → Evidence → Release.
   Navy/cyan/amber brand palette, interactive orbit, lazy-loaded via Suspense. */
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text, Line } from "@react-three/drei";
import * as THREE from "three";

const COLORS = {
  navy: "#102340",
  paper: "#f7f6f1",
  ink: "#0f1726",
  cyan: "#22d3ee",
  amber: "#f59e0b",
  grid: "#b9c2d0",
  slate: "#64748b",
};

const STAGES = [
  { x: -4.6, title: "INTENT", sub: "requirement", color: COLORS.ink },
  { x: -2.3, title: "SPEC", sub: "artifact", color: COLORS.navy },
  { x: 0, title: "POLICY GATE", sub: "enforced", color: COLORS.cyan },
  { x: 2.3, title: "EVIDENCE", sub: "trace", color: COLORS.amber },
  { x: 4.6, title: "RELEASE", sub: "proven", color: COLORS.ink },
];

function Pillar({ position, title, sub, color }: {
  position: [number, number, number];
  title: string;
  sub: string;
  color: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.06;
  });

  const isCyan = color === COLORS.cyan;
  const isAmber = color === COLORS.amber;

  return (
    <group position={position}>
      <RoundedBox args={[0.9, 2.4, 0.9]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color={isCyan ? "#0e7490" : isAmber ? "#b45309" : COLORS.navy}
          emissive={isCyan ? COLORS.cyan : isAmber ? COLORS.amber : "#1e3a5f"}
          emissiveIntensity={isCyan || isAmber ? 0.35 : 0.15}
          roughness={0.4}
        />
      </RoundedBox>
      {/* node on top */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      <Text
        position={[0, -1.7, 0]}
        fontSize={0.22}
        color={COLORS.ink}
        anchorX="center"
        font={undefined}
      >
        {title}
      </Text>
      <Text
        position={[0, -2.0, 0]}
        fontSize={0.11}
        color={COLORS.slate}
        anchorX="center"
        font={undefined}
      >
        {sub}
      </Text>
    </group>
  );
}

function FlowLine({ points, color }: { points: [number, number, number][]; color: string }) {
  return <Line points={points} color={color} lineWidth={2.5} transparent opacity={0.6} />;
}

function AnimatedDataPulse({ start, end, color }: {
  start: number;
  end: number;
  color: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = (clock.getElapsedTime() * 0.35) % 1;
    const x = start + (end - start) * t;
    mesh.current.position.x = x;
    mesh.current.position.y = 1.5 + Math.sin(t * Math.PI) * 0.3;
    (mesh.current.material as THREE.MeshBasicMaterial).opacity = Math.sin(t * Math.PI);
  });
  return (
    <mesh ref={mesh} position={[start, 1.5, 0]}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

function PipelineScene() {
  const y = 0;
  const topLine: [number, number, number] = [-4.6, 1.2, 0];
  const bottomLine: [number, number, number] = [-4.6, -1.2, 0];

  const segments: [number, number, number][][] = [];
  for (let i = 0; i < STAGES.length - 1; i++) {
    const x0 = STAGES[i].x;
    const x1 = STAGES[i + 1].x;
    segments.push([
      [x0, 1.2, 0],
      [x1, 1.2, 0],
    ]);
    segments.push([
      [x0, -1.2, 0],
      [x1, -1.2, 0],
    ]);
  }

  return (
    <>
      {/* brand lighting */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} color="#eef6ff" />
      <directionalLight position={[-4, 3, -3]} intensity={0.4} color={COLORS.cyan} />
      <pointLight position={[0, 4, 0]} intensity={0.5} color={COLORS.amber} />

      {/* baseline */}
      <mesh position={[0, -2.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial color="#e8eaef" transparent opacity={0.45} roughness={1} />
      </mesh>

      {/* stages */}
      {STAGES.map((s) => (
        <Pillar key={s.x} position={[s.x, y, s.x === 0 ? 0.35 : 0]} title={s.title} sub={s.sub} color={s.color} />
      ))}

      {/* flow lines */}
      {segments.map((pts, i) => (
        <FlowLine key={i} points={pts} color={i % 2 === 0 ? COLORS.cyan : COLORS.amber} />
      ))}

      {/* data pulses */}
      {STAGES.slice(0, -1).map((s, i) => (
        <AnimatedDataPulse
          key={i}
          start={s.x}
          end={STAGES[i + 1].x}
          color={i % 2 === 0 ? COLORS.cyan : COLORS.amber}
        />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export function Pipeline3D() {
  return (
    <div className="pipeline3d" style={{ width: "100%", height: "380px" }}>
      <Suspense fallback={<div className="pipeline3d-fallback">LOADING 3D VIEW…</div>}>
        <Canvas
          camera={{ position: [0, 3.4, 9], fov: 45 }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          <PipelineScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
