import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import Canvas3DErrorBoundary from './Canvas3DErrorBoundary';

const useIntersectionObserver = (options) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Set state directly; avoid unnecessary logic in the observer callback
      setInView(entry.isIntersecting);
    }, options);
    
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [options]);

  return [ref, inView];
};

const TagCloud = ({ tools }) => {
  const groupRef = useRef();
  const isDragging = useRef(false);
  const dragVelocity = useRef({ x: 0.002, y: 0.003 });
  const prevMouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    return tools.map((_, i) => {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / tools.length);
      const r = 2.2;
      return new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    });
  }, [tools]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dragVelocity.current.x;
      groupRef.current.rotation.x += dragVelocity.current.y * 0.3;
      if (!isDragging.current) {
        dragVelocity.current.x *= 0.998;
        dragVelocity.current.y *= 0.998;
        if (Math.abs(dragVelocity.current.x) < 0.001) dragVelocity.current.x = 0.002;
      }
    }
  });

  const handlePointerDown = (e) => {
    isDragging.current = true;
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;
    dragVelocity.current = { x: dx * 0.0005, y: dy * 0.0005 };
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = () => { isDragging.current = false; };

  const colors = ['#22d3ee', '#10b981', '#8b5cf6', '#3b82f6', '#f59e0b'];
  const sphereMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#22d3ee', wireframe: true, transparent: true, opacity: 0.03 }), []);

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {tools.map((tool, i) => (
        <Text
          key={i}
          position={positions[i]}
          fontSize={0.16}
          color={colors[i % colors.length]}
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.85}
        >
          {tool}
        </Text>
      ))}
      <mesh material={sphereMat}>
        <sphereGeometry args={[2.4, 16, 16]} />
      </mesh>
    </group>
  );
};

const SkillOrb = ({ tools = [] }) => {
  const observerOptions = useMemo(() => ({ threshold: 0.1, rootMargin: '100px' }), []);
  const [ref, inView] = useIntersectionObserver(observerOptions);
  const [webglError, setWebglError] = useState(false);

  if (tools.length === 0) return null;

  return (
    <div ref={ref} className="w-full h-[400px] relative">
      {inView ? (
        webglError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a] rounded-xl border border-rose-500/20 shadow-[inset_0_0_50px_rgba(225,29,72,0.05)]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <div className="text-rose-400 font-mono text-xs uppercase tracking-widest font-bold">Secure Node Recovery - 2D Fallback Active</div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-h-64 overflow-y-auto w-full custom-scrollbar pr-2">
              {tools.map((tool, i) => (
                <span key={i} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono rounded hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:text-white transition-all cursor-default">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <Canvas3DErrorBoundary
            fallback={
              <div className="w-full h-full flex items-center justify-center text-rose-500 font-mono text-xs text-center px-4 border border-rose-500/20 rounded-xl bg-[#0a0a0a]">
                3D render initialization failed.<br/> Falling back to structural memory.
              </div>
            }
          >
            <div className="w-full h-full cursor-grab active:cursor-grabbing">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: 'transparent' }}
                gl={{ 
                  alpha: true, 
                  antialias: true,
                  powerPreference: "high-performance",
                  failIfMajorPerformanceCaveat: false,
                  preserveDrawingBuffer: false
                }}
                dpr={window.devicePixelRatio > 1 ? 1 : 1.5}
                onCreated={({ gl }) => {
                  const handleContextLost = (e) => {
                    e.preventDefault();
                    setWebglError(true);
                  };
                  const handleContextRestored = () => {
                    setWebglError(false);
                  };
                  gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
                  gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);
                }}
              >
                <ambientLight intensity={0.8} />
                <TagCloud tools={tools} />
              </Canvas>
              <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-gray-600 font-mono pointer-events-none">
                drag to rotate
              </div>
            </div>
          </Canvas3DErrorBoundary>
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-600 font-mono text-xs">
          Loading 3D visualization...
        </div>
      )}
    </div>
  );
};

export default SkillOrb;
