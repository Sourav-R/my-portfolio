import React, { useState, useEffect, useCallback } from 'react';
import CommandBar from '../components/CommandBar';
import MatrixRain from '../components/MatrixRain';
import HeroSection from '../components/HeroSection';
import TerminalSandbox from '../components/TerminalSandbox';
import SkillLevelingSystem from '../components/SkillLevelingSystem';
import WorkExperienceSection from '../components/WorkExperienceSection';
import CertificationsSection from '../components/CertificationsSection';
import ProjectsHub from '../components/ProjectsHub';
import LabExperienceSection from '../components/LabExperienceSection';
import Footer from '../components/Footer';

// Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const Portfolio = () => {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [godMode, setGodMode] = useState(false);
  const [matrixRed, setMatrixRed] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo(0, 0);
  }, []);

  // Konami Code listener
  const handleKeyDown = useCallback(
    (e) => {
      setKeySequence((prev) => {
        const newSequence = [...prev, e.key];
        // Keep only the last N keys
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }
        
        // Check if sequence matches Konami code
        if (newSequence.join('').toLowerCase() === KONAMI_CODE.join('').toLowerCase()) {
          setGodMode((prevMode) => !prevMode); // Toggle god mode
          return []; // Reset sequence after match
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
    <div className={`min-h-screen relative text-gray-200 ${godMode ? 'god-mode' : 'bg-[#030303]'}`}>
      {/* Matrix Rain Background */}
      <MatrixRain opacity={0.25} color={matrixRed ? '#ef4444' : '#06b6d4'} speed={matrixRed ? 2 : 1} />

      {/* Command Bar Navigation */}
      <CommandBar recruiterMode={recruiterMode} setRecruiterMode={setRecruiterMode} />

      {/* Main Content */}
      <main className={`relative ${recruiterMode ? 'recruiter-mode' : ''} ${matrixRed ? 'matrix-red' : ''}`} style={{ zIndex: 2 }}>
        <HeroSection recruiterMode={recruiterMode} setMatrixRed={setMatrixRed} />
        <TerminalSandbox recruiterMode={recruiterMode} />
        <SkillLevelingSystem recruiterMode={recruiterMode} />
        <WorkExperienceSection recruiterMode={recruiterMode} />
        <CertificationsSection recruiterMode={recruiterMode} />
        <ProjectsHub recruiterMode={recruiterMode} />
        <LabExperienceSection recruiterMode={recruiterMode} />
        <Footer />
      </main>
    </div>
  );
};

export default Portfolio;
