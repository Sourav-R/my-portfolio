import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Canvas3DErrorBoundary from './Canvas3DErrorBoundary';

const useIntersectionObserver = (options) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      // Small optimization: don't unmount immediately when scrolling past, 
      // just mount when we get close and keep it mounted unless we need strict cleanup (for context limits we do).
      if (entry.isIntersecting) setInView(true);
      else setInView(false);
    }, options);
    
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [options]);

  return [ref, inView];
};

const Particles = ({ count = 70 }) => {
  const pointsRef = useRef();
  const linesRef = useRef();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3] = (Math.random()-0.5)*12;
      pos[i*3+1] = (Math.random()-0.5)*8;
      pos[i*3+2] = (Math.random()-0.5)*4;
      vel[i*3] = (Math.random()-0.5)*0.002;
      vel[i*3+1] = (Math.random()-0.5)*0.002;
      vel[i*3+2] = (Math.random()-0.5)*0.001;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  const linePositions = useMemo(() => new Float32Array(count * count * 6), [count]);

  // Build geometries imperatively
  useEffect(() => {
    if (pointsRef.current) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pointsRef.current.geometry = geo;
    }
    if (linesRef.current) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      linesRef.current.geometry = geo;
    }
  }, [positions, linePositions]);

  const pointsMat = useMemo(() => new THREE.PointsMaterial({ color: '#22d3ee', size: 0.045, transparent: true, opacity: 0.8, sizeAttenuation: true, depthWrite: false }), []);
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.2, depthWrite: false }), []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    if (!posAttr) return;

    for (let i = 0; i < count; i++) {
      positions[i*3] += velocities[i*3] + Math.sin(clock.elapsedTime + i) * 0.001;
      positions[i*3+1] += velocities[i*3+1] + Math.cos(clock.elapsedTime * 0.7 + i) * 0.001;
      if (Math.abs(positions[i*3]) > 6) velocities[i*3] *= -1;
      if (Math.abs(positions[i*3+1]) > 4) velocities[i*3+1] *= -1;
    }
    posAttr.needsUpdate = true;

    // Update line connections
    if (linesRef.current) {
      let lineIdx = 0;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = positions[i*3]-positions[j*3], dy = positions[i*3+1]-positions[j*3+1], dz = positions[i*3+2]-positions[j*3+2];
          if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 1.8) {
            linePositions[lineIdx++] = positions[i*3]; linePositions[lineIdx++] = positions[i*3+1]; linePositions[lineIdx++] = positions[i*3+2];
            linePositions[lineIdx++] = positions[j*3]; linePositions[lineIdx++] = positions[j*3+1]; linePositions[lineIdx++] = positions[j*3+2];
          }
        }
      }
      for (let k = lineIdx; k < linePositions.length; k++) linePositions[k] = 0;
      const lineAttr = linesRef.current.geometry.attributes.position;
      if (lineAttr) { lineAttr.needsUpdate = true; }
      linesRef.current.geometry.setDrawRange(0, lineIdx / 3);
    }
  });

  return (
    <group>
      <points ref={pointsRef} material={pointsMat} />
      <lineSegments ref={linesRef} material={lineMat} />
    </group>
  );
};

const ParticleNetwork = () => {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.0 });

  return (
    <Canvas3DErrorBoundary>
      <div ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {inView && (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ background: 'transparent' }}
            gl={{ alpha: true, antialias: false }}
            dpr={[1, 1.5]}
          >
            <Particles count={70} />
          </Canvas>
        )}
      </div>
    </Canvas3DErrorBoundary>
  );
};

export default ParticleNetwork;
