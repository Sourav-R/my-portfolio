import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HeroSection from '../components/HeroSection';
import LabMonitor from '../components/LabMonitor';
import ProjectsSection from '../components/ProjectsSection';
import TerminalSandbox from '../components/TerminalSandbox';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BootSequence from '../components/BootSequence';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Moon, Sun } from 'lucide-react';

const Portfolio = () => {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleBootComplete = () => {
    setBootComplete(true);
  };

  // Show boot sequence on first load
  if (!bootComplete) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200">
      {/* Recruiter Mode Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-[#1a1a1a] border border-emerald-500/20 rounded-lg px-4 py-2 backdrop-blur-lg">
        <span className="text-sm font-medium text-gray-300">Recruiter Mode</span>
        <Switch 
          checked={recruiterMode} 
          onCheckedChange={setRecruiterMode}
          className="data-[state=checked]:bg-emerald-500"
        />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-20">
        <main className={recruiterMode ? 'recruiter-mode' : ''}>
          <HeroSection recruiterMode={recruiterMode} />
          <LabMonitor recruiterMode={recruiterMode} />
          <ProjectsSection recruiterMode={recruiterMode} />
          <TerminalSandbox recruiterMode={recruiterMode} />
          <ContactSection recruiterMode={recruiterMode} />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Portfolio;
