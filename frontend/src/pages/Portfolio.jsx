import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HeroSection from '../components/HeroSection';
import ProfessionalJourneySection from '../components/ProfessionalJourneySection';
import WorkExperienceSection from '../components/WorkExperienceSection';
import SkillsMatrixSection from '../components/SkillsMatrixSection';
import CertificationsSection from '../components/CertificationsSection';
import ProjectsHub from '../components/ProjectsHub';
import LabExperienceSection from '../components/LabExperienceSection';
import FeaturedLabsSection from '../components/FeaturedLabsSection';
import LabMonitor from '../components/LabMonitor';
import TerminalSandbox from '../components/TerminalSandbox';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { profileData } from '../mock';

const Portfolio = () => {
  const [recruiterMode, setRecruiterMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200">
      {/* Recruiter Mode Toggle & Resume Download - Fixed Position */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium shadow-lg"
          onClick={() => window.open(profileData.resumeUrl, '_blank')}
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Resume
        </Button>
        <div className="flex items-center gap-3 bg-[#1a1a1a] border border-emerald-500/20 rounded-lg px-4 py-2 backdrop-blur-lg">
          <span className="text-sm font-medium text-gray-300">Recruiter Mode</span>
          <Switch 
            checked={recruiterMode} 
            onCheckedChange={setRecruiterMode}
            className="data-[state=checked]:bg-emerald-500"
          />
        </div>
      </div>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        <main className={recruiterMode ? 'recruiter-mode' : ''}>
          <HeroSection recruiterMode={recruiterMode} />
          <ProfessionalJourneySection recruiterMode={recruiterMode} />
          <WorkExperienceSection recruiterMode={recruiterMode} />
          <SkillsMatrixSection recruiterMode={recruiterMode} />
          <CertificationsSection recruiterMode={recruiterMode} />
          <ProjectsHub recruiterMode={recruiterMode} />
          <LabExperienceSection recruiterMode={recruiterMode} />
          <FeaturedLabsSection recruiterMode={recruiterMode} />
          <LabMonitor recruiterMode={recruiterMode} />
          <TerminalSandbox recruiterMode={recruiterMode} />
          <ContactSection recruiterMode={recruiterMode} />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Portfolio;
