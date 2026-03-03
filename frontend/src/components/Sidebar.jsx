import React, { useState, useEffect } from 'react';
import { Home, Server, FolderGit2, Terminal, Mail, Menu, X, Award, TrendingUp, GraduationCap, BookOpen, Briefcase, Calendar } from 'lucide-react';
import { Button } from './ui/button';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: 'hero', icon: Home, label: 'Home', color: 'cyan' },
    { id: 'work-experience', icon: Briefcase, label: 'Experience', color: 'cyan' },
    { id: 'lab-experience', icon: Award, label: 'Lab Experience', color: 'emerald' },
    { id: 'skills-matrix', icon: TrendingUp, label: 'Skills Matrix', color: 'purple' },
    { id: 'certifications', icon: GraduationCap, label: 'Certifications', color: 'blue' },
    { id: 'lab', icon: Server, label: 'Lab Monitor', color: 'emerald' },
    { id: 'projects', icon: FolderGit2, label: 'Security Briefs', color: 'cyan' },
    { id: 'featured-labs', icon: BookOpen, label: 'Case Studies', color: 'blue' },
    { id: 'professional-journey', icon: TrendingUp, label: 'Journey', color: 'purple' },
    { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'emerald' },
    { id: 'contact', icon: Mail, label: 'Contact', color: 'cyan' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      // Determine active section
      const sections = navItems.map(item => item.id);
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 3 && rect.bottom >= windowHeight / 3) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#1a1a1a] border border-cyan-500/20 hover:bg-[#1a1a1a] hover:border-cyan-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5 text-cyan-500" /> : <Menu className="h-5 w-5 text-cyan-500" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-cyan-500/20 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">SR</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Sourav R.</p>
              <p className="text-gray-500 text-xs">SOC Analyst</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Portfolio Progress</span>
            <span className="text-xs text-cyan-500 font-mono">{Math.round(scrollProgress)}%</span>
          </div>
          <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 py-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? `bg-${item.color}-500/10 border border-${item.color}-500/50`
                    : 'hover:bg-[#1a1a1a] border border-transparent'
                }`}
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                }}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-${item.color}-500 rounded-r-full`} />
                )}

                {/* Icon */}
                <div className={`flex-shrink-0 transition-colors duration-300 ${
                  isActive ? `text-${item.color}-500` : 'text-gray-400 group-hover:text-white'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Label */}
                <span className={`flex-1 text-left text-sm font-medium transition-colors duration-300 ${
                  isActive ? `text-${item.color}-500` : 'text-gray-400 group-hover:text-white'
                }`}>
                  {item.label}
                </span>

                {/* Active Badge */}
                {isActive && (
                  <div className={`w-2 h-2 rounded-full bg-${item.color}-500 animate-pulse`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyan-500/20 bg-[#0a0a0a]">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-cyan-500 font-bold text-sm">200+</p>
              <p className="text-gray-500 text-xs">Labs</p>
            </div>
            <div>
              <p className="text-emerald-500 font-bold text-sm">6</p>
              <p className="text-gray-500 text-xs">Courses</p>
            </div>
            <div>
              <p className="text-purple-500 font-bold text-sm">25+</p>
              <p className="text-gray-500 text-xs">Tools</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
