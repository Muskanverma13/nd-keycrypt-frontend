
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

function Particles({ count = 300 }) {
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map((v) => (
      (Math.random() - 0.5) * 40
    ));
    return new Float32Array(p);
  }, [count]);

  const particleRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count * 3; i += 3) {
      particleRef.current.geometry.attributes.position.array[i] += Math.sin(time + i) * 0.01;
      particleRef.current.geometry.attributes.position.array[i + 1] += Math.cos(time + i) * 0.01;
    }
    particleRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particleRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00ffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingSpheres() {
  const spherePositions = useMemo(() => [
    [-8, 3, -5],
    [8, -3, -5],
    [-8, -4, 5],
    [8, 4, 5],
    [-4, 6, 0],
    [4, -6, 0],
  ], []);

  const colors = ['#ff3366', '#00ffff', '#33ff99', '#ff9933', '#9933ff', '#ffff33'];

  return spherePositions.map((position, i) => (
    <AnimatedSphere key={i} position={position} color={colors[i]} />
  ));
}

function AnimatedSphere({ position, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.5;
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.1;
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.8, 32, 32]}>
      <MeshDistortMaterial
        color={color}
        roughness={0.1}
        metalness={1}
        distort={0.4}
        speed={2}
      />
    </Sphere>
  );
}

function DynamicLines() {
  const lineCount = 8;
  const lines = useMemo(() => {
    return new Array(lineCount).fill(0).map(() => ({
      points: [
        new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30),
        new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30),
      ],
      color: `hsl(${Math.random() * 360}, 100%, 75%)`,
    }));
  }, []);

  return lines.map((line, i) => (
    <AnimatedLine key={i} points={line.points} color={line.color} />
  ));
}

function AnimatedLine({ points, color }) {
  const lineRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.forEach((point) => {
      point.y += Math.sin(time + point.x) * 0.01;
      point.x += Math.cos(time + point.y) * 0.01;
    });
    lineRef.current.geometry.setFromPoints(points);
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color={color} opacity={0.4} transparent linewidth={2} />
    </line>
  );
}

function FloatingObjects() {
  const objects = useMemo(() => [
    {
      type: 'torus',
      position: [-12, 2, -5],
      rotation: [0.5, 0.3, 0],
      scale: 2.5,
      color: '#ff3366'
    },
    {
      type: 'torus',
      position: [12, -2, -5],
      rotation: [-0.2, 0.5, 0],
      scale: 2,
      color: '#00ffaa'
    },
    {
      type: 'box',
      position: [-8, -6, 2],
      rotation: [0.5, 0.5, 0],
      scale: 2,
      color: '#ff9933'
    },
    {
      type: 'box',
      position: [8, 6, 2],
      rotation: [-0.3, -0.2, 0],
      scale: 1.8,
      color: '#33ccff'
    }
  ], []);

  return objects.map((obj, i) => (
    <FloatingObject key={i} {...obj} />
  ));
}

function FloatingObject({ type, position, rotation, scale, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.8;
    meshRef.current.rotation.x = rotation[0] + time * 0.2;
    meshRef.current.rotation.y = rotation[1] + time * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === 'torus' ? (
        <Torus args={[1, 0.4, 16, 32]}>
          <MeshDistortMaterial
            color={color}
            roughness={0.1}
            metalness={0.8}
            distort={0.3}
            speed={2}
          />
        </Torus>
      ) : (
        <Box args={[1, 1, 1]}>
          <MeshDistortMaterial
            color={color}
            roughness={0.1}
            metalness={0.8}
            distort={0.2}
            speed={1.5}
          />
        </Box>
      )}
    </mesh>
  );
}

export default function IsometricBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#030012] via-[#1a0033] to-[#000066]">
      <Canvas
        camera={{
          position: [0, 0, 25],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
      >
        <fog attach="fog" args={['#1a0033', 20, 35]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff3366" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#00ffaa" />
        <Stars 
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0.5}
          fade
          speed={1}
        />
        <Particles count={200} />
        <DynamicLines />
        <FloatingObjects />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.15}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}