import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, useTexture, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

const images = [
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=85',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900&q=85',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85',
];

function PhotoPanel({ image, position, rotation, scale = 1, speed = 1 }) {
  const texture = useTexture(image);
  const panel = useRef();

  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    if (!panel.current) return;

    const time = state.clock.elapsedTime * speed;

    panel.current.position.y = position[1] + Math.sin(time * 0.8) * 0.12;

    panel.current.rotation.z = rotation[2] + Math.sin(time * 0.5) * 0.025;
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={panel} position={position} rotation={rotation} scale={scale}>
        {/* Gold outer frame */}
        <RoundedBox args={[2.35, 3.05, 0.12]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color="#c6a56b"
            metalness={0.8}
            roughness={0.25}
          />
        </RoundedBox>

        {/* Dark inner backing */}
        <mesh position={[0, 0, 0.068]}>
          <planeGeometry args={[2.25, 2.95]} />
          <meshStandardMaterial color="#101010" />
        </mesh>

        {/* Photograph */}
        <mesh position={[0, 0, 0.085]}>
          <planeGeometry args={[2.19, 2.85]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>

        {/* Glass highlight */}
        <mesh position={[0, 0, 0.095]}>
          <planeGeometry args={[2.19, 2.85]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.035} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    const targetX = pointerY * 0.22;
    const targetY = pointerX * 0.35;

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      2.5,
      delta
    );

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      2.5,
      delta
    );

    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      pointerX * 0.16,
      2,
      delta
    );
  });

  return (
    <group ref={group}>
      <PhotoPanel
        image={images[0]}
        position={[-2.45, 0, -0.3]}
        rotation={[0.05, 0.28, -0.12]}
        scale={0.82}
        speed={0.85}
      />

      <PhotoPanel
        image={images[1]}
        position={[0, 0.12, 0.65]}
        rotation={[0, -0.05, 0.04]}
        scale={1.05}
        speed={1.15}
      />

      <PhotoPanel
        image={images[2]}
        position={[2.45, -0.05, -0.35]}
        rotation={[-0.04, -0.3, 0.12]}
        scale={0.82}
        speed={1}
      />

      {/* Floating decorative light particles */}
      <mesh position={[-3.4, 1.8, 0.5]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#c6a56b" />
      </mesh>

      <mesh position={[3.4, -1.6, 0.5]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#e4c995" />
      </mesh>
    </group>
  );
}

function LoadingFallback() {
  return null;
}

export default function Hero3D() {
  return (
    <div className="hero-3d">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={1.1} />

          <directionalLight
            position={[3, 5, 5]}
            intensity={2.5}
            color="#fff0d5"
          />

          <pointLight position={[-4, 2, 3]} intensity={2} color="#c6a56b" />

          <pointLight position={[4, -2, 2]} intensity={1.5} color="#ffffff" />

          <Scene />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
