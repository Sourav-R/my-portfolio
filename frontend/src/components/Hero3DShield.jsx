import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Canvas3DErrorBoundary from './Canvas3DErrorBoundary';

const useIntersectionObserver = (options) => {
  const [inView, setInView] = useState(true);
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); observer.disconnect(); };
  }, [options]);
  return [ref, inView];
};

/* ── Orbiting data particles ── */
const DataParticles = () => {
  const ref = useRef();
  const count = 80;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useEffect(() => {
    if (ref.current) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      ref.current.geometry = geo;
    }
  }, [positions]);

  const mat = useMemo(() => new THREE.PointsMaterial({
    size: 0.03, color: '#22d3ee', transparent: true, opacity: 0.6, sizeAttenuation: true, depthWrite: false
  }), []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.12;
  });

  return <points ref={ref} material={mat} />;
};

/* ── Shield Core ── */
const ShieldCore = () => {
  const shieldRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const ringRef3 = useRef();
  const innerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (shieldRef.current) {
      shieldRef.current.rotation.y = t * 0.15;
      shieldRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
    if (ringRef1.current) ringRef1.current.rotation.z = t * 0.3;
    if (ringRef2.current) ringRef2.current.rotation.x = t * 0.2;
    if (ringRef3.current) ringRef3.current.rotation.y = -t * 0.25;
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.4;
      innerRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <group ref={shieldRef}>
      {/* Outer octahedron wireframe — the "shield" */}
      <mesh>
        <octahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Inner icosahedron — "core" */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Glowing center sphere */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.8, 0.008, 8, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ringRef2} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.0, 0.006, 8, 64]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.1} />
      </mesh>
      <mesh ref={ringRef3} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.2, 0.005, 8, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.08} />
      </mesh>
    </group>
  );
};

/* ── Main Component ── */
const Hero3DShield = () => {
  const observerOptions = useMemo(() => ({ threshold: 0.0, rootMargin: '200px' }), []);
  const [ref, inView] = useIntersectionObserver(observerOptions);

  return (
    <Canvas3DErrorBoundary>
      <div ref={ref} className="w-full h-full" style={{ minHeight: '100%' }}>
        {inView && (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 40 }}
            style={{ background: 'transparent' }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false,
              preserveDrawingBuffer: false
            }}
            dpr={Math.min(window.devicePixelRatio, 2)}
          >
            <ambientLight intensity={0.3} />
            <ShieldCore />
            <DataParticles />
          </Canvas>
        )}
      </div>
    </Canvas3DErrorBoundary>
  );
};

export default Hero3DShield;
