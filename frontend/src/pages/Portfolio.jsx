import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import CommandBar from '../components/CommandBar';
import MatrixRain from '../components/MatrixRain';
import HeroSection from '../components/HeroSection';
import TerminalSandbox from '../components/TerminalSandbox';
import SkillLevelingSystem from '../components/SkillLevelingSystem';
import ActiveMissions from '../components/ActiveMissions';
import ExperienceEducation from '../components/ExperienceEducation';
import PowerStack from '../components/PowerStack';
import Footer from '../components/Footer';
import Canvas3DErrorBoundary from '../components/Canvas3DErrorBoundary';
import { TerminalProvider } from '../context/TerminalContext';

const ParticleNetwork = lazy(() => import('../components/ParticleNetwork'));

// Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const Portfolio = () => {
  const [godMode, setGodMode] = useState(false);
  const [matrixRed, setMatrixRed] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo(0, 0);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      setKeySequence((prev) => {
        const newSequence = [...prev, e.key];
        if (newSequence.length > KONAMI_CODE.length) newSequence.shift();
        if (newSequence.join('').toLowerCase() === KONAMI_CODE.join('').toLowerCase()) {
          setGodMode((prevMode) => !prevMode);
          return [];
        }
        return newSequence;
      });
    },
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <TerminalProvider>
      <div className={`min-h-screen relative text-gray-200 ${godMode ? 'god-mode' : 'bg-gradient-to-br from-[#050b14] via-[#030303] to-[#0a0510]'}`}>
        {/* Ambient Glows for better viewing experience */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
        
        {/* Global Backgrounds */}
        <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none z-0" />
        <Canvas3DErrorBoundary>
          <div className="fixed inset-0 pointer-events-none z-0">
            <Suspense fallback={null}>
              <ParticleNetwork />
            </Suspense>
          </div>
        </Canvas3DErrorBoundary>
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ willChange: 'transform' }}>
          <MatrixRain opacity={0.15} color={matrixRed ? '#ef4444' : '#06b6d4'} speed={matrixRed ? 2 : 1} />
        </div>

        <CommandBar />

        <main className={`relative ${matrixRed ? 'matrix-red' : ''}`} style={{ zIndex: 2, paddingBottom: '32px' }}>
          <HeroSection setMatrixRed={setMatrixRed} />
          <TerminalSandbox />
          <ExperienceEducation />
          <ActiveMissions />
          <PowerStack />
          <SkillLevelingSystem />
          <Footer />
        </main>
      </div>
    </TerminalProvider>
  );
};

export default Portfolio;
