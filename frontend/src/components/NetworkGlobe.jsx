import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Canvas3DErrorBoundary from './Canvas3DErrorBoundary';

const useIntersectionObserver = (options) => {
  const [inView, setInView] = useState(true); // default true for hero
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
    
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [options]);

  return [ref, inView];
};

const GlobePoints = () => {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();

  const { positions, connections, colors } = useMemo(() => {
    const pts = [];
    const conns = [];
    const cols = [];
    const isMobile = window.innerWidth < 768;
    const numPoints = isMobile ? 60 : 120;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numPoints; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
      const r = 2.2;
      pts.push(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi));
      const t = i / numPoints;
      cols.push(t < 0.5 ? 0.13 : 0.06, t < 0.5 ? 0.85 : 0.73, t < 0.5 ? 0.93 : 0.5);
    }

    for (let i = 0; i < numPoints; i++) {
      for (let j = i + 1; j < numPoints; j++) {
        const dx = pts[i*3]-pts[j*3], dy = pts[i*3+1]-pts[j*3+1], dz = pts[i*3+2]-pts[j*3+2];
        if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 1.2) {
          conns.push(pts[i*3], pts[i*3+1], pts[i*3+2], pts[j*3], pts[j*3+1], pts[j*3+2]);
        }
      }
    }
    return { positions: new Float32Array(pts), connections: new Float32Array(conns), colors: new Float32Array(cols) };
  }, []);

  // Build geometries imperatively to avoid R3F prop injection issues
  useEffect(() => {
    if (pointsRef.current) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      pointsRef.current.geometry = geo;
    }
    if (linesRef.current) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(connections, 3));
      linesRef.current.geometry = geo;
    }
  }, [positions, connections, colors]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.08;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.1;
    }
  });

  const pointsMat = useMemo(() => new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.8, sizeAttenuation: true, depthWrite: false }), []);
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.08, depthWrite: false }), []);

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} material={pointsMat} />
      <lineSegments ref={linesRef} material={lineMat} />
      <mesh>
        <torusGeometry args={[2.5, 0.005, 12, window.innerWidth < 768 ? 40 : 80]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.3, 0.005, 12, window.innerWidth < 768 ? 40 : 80]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.06} />
      </mesh>
    </group>
  );
};

const NetworkGlobe = () => {
  const observerOptions = useMemo(() => ({ threshold: 0.0, rootMargin: '200px' }), []);
  const [ref, inView] = useIntersectionObserver(observerOptions);

  return (
    <Canvas3DErrorBoundary>
      <div ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {inView && (
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 45 }}
            style={{ background: 'transparent' }}
            gl={{ 
              alpha: true, 
              antialias: true,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false,
              preserveDrawingBuffer: false
            }}
            dpr={window.devicePixelRatio > 1 ? 1 : 1.5}
          >
            <ambientLight intensity={0.5} />
            <GlobePoints />
          </Canvas>
        )}
      </div>
    </Canvas3DErrorBoundary>
  );
};

export default NetworkGlobe;
