import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Clock, Shield, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData, securityStatus } from '../mock';

const navItems = [
  { id: 'hero', label: 'home' },
  { id: 'terminal', label: 'terminal' },
  { id: 'skill-leveling', label: 'skills' },
  { id: 'work-experience', label: 'experience' },
  { id: 'certifications', label: 'certs' },
  { id: 'projects', label: 'projects' },
  { id: 'lab-experience', label: 'labs' },
];

const CommandBar = ({ recruiterMode, setRecruiterMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map(item => item.id);
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const formatTime = (date) => date.toLocaleTimeString('en-AU', {
    timeZone: 'Australia/Melbourne', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030303]/90 backdrop-blur-xl border-b border-gray-800/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          {/* Logo / Prompt */}
          <div className="flex items-center gap-2 mr-2 flex-shrink-0">
            <Terminal className="h-4 w-4 text-cyan-500" />
            <span className="text-xs font-mono text-gray-500 hidden sm:inline">
              <span className="text-cyan-500">sourav</span>
              <span className="text-gray-600">@</span>
              <span className="text-emerald-500">portfolio</span>
              <span className="text-gray-600">:~$</span>
            </span>
          </div>

          {/* Navigation Commands - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all duration-200 whitespace-nowrap ${
                  activeSection === item.id
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 font-bold shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3 ml-auto flex-shrink-0">
            {/* Status indicators */}
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-gray-600">
              <Shield className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-400">{securityStatus.level}</span>
              <span className="text-gray-700">|</span>
              <Clock className="h-3 w-3 text-gray-500" />
              <span className="text-gray-400">{formatTime(currentTime)}</span>
            </div>

            {/* Recruiter Toggle */}
            <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-md px-2.5 py-1 border border-gray-800">
              <span className="text-[10px] font-mono text-gray-500">REC</span>
              <Switch
                checked={recruiterMode}
                onCheckedChange={setRecruiterMode}
                className="data-[state=checked]:bg-emerald-500 scale-75"
              />
            </div>

            {/* Resume */}
            <Button
              size="sm"
              className="bg-white/5 hover:bg-white/10 text-gray-300 border border-gray-700 text-xs font-mono h-7 px-3"
              onClick={() => window.open(profileData.resumeUrl, '_blank')}
            >
              <Download className="h-3 w-3 mr-1.5" />
              resume
            </Button>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-1.5 text-gray-400 hover:bg-white/5 rounded"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-[#050505]/fb backdrop-blur-2xl border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-8">
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`h-12 flex items-center justify-center px-4 py-2 text-xs font-mono rounded-lg transition-all active:scale-95 ${
                        activeSection === item.id
                          ? 'text-cyan-400 bg-cyan-500/15 border border-cyan-500/50 font-bold shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                          : 'text-gray-400 bg-white/5 border border-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                        <Shield className="h-3.5 w-3.5" />
                        <span>{securityStatus.level}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>MEL {formatTime(currentTime)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[11px] font-mono text-gray-400">RECRUITER_MODE</span>
                      <Switch
                        checked={recruiterMode}
                        onCheckedChange={setRecruiterMode}
                        className="data-[state=checked]:bg-emerald-500 scale-90"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default CommandBar;
