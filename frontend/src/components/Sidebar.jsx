import React, { useState } from 'react';
import { Home, Server, FolderGit2, Terminal, Mail, Menu, X, Award, TrendingUp, GraduationCap, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'lab-experience', icon: Award, label: 'Lab Experience' },
    { id: 'skills-matrix', icon: TrendingUp, label: 'Skills Matrix' },
    { id: 'lab', icon: Server, label: 'Lab Monitor' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'featured-labs', icon: BookOpen, label: 'Case Studies' },
    { id: 'academic-timeline', icon: GraduationCap, label: 'Timeline' },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ];

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
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#1a1a1a] border border-emerald-500/20 hover:bg-[#1a1a1a] hover:border-emerald-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5 text-emerald-500" /> : <Menu className="h-5 w-5 text-emerald-500" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-20 bg-[#121212] border-r border-emerald-500/20 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative flex items-center justify-center w-12 h-12 rounded-lg bg-[#1a1a1a] border border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300"
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />
              
              {/* Tooltip */}
              <span className="absolute left-full ml-4 px-3 py-1 bg-[#1a1a1a] border border-emerald-500/20 rounded text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Decorative Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent pointer-events-none" />
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
