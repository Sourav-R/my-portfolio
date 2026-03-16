import React, { useRef, useMemo, useState, Suspense, lazy } from 'react';
import { motion, useInView } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { toolsProficiency } from '../labExperience';
import { Shield, Crosshair, Database, Network, Cloud, Terminal, Brackets, Activity, Code, Bug, Server, Wrench } from 'lucide-react';
import { profileData } from '../mock';
import Canvas3DErrorBoundary from './Canvas3DErrorBoundary';

const SkillOrb = lazy(() => import('./SkillOrb'));

// Process labExperience toolsProficiency data into Radar Chart data
const radarData = [
  { subject: 'SOC Analysis', A: 90, fullMark: 100, category: 'SOC & Threat Detection' },
  { subject: 'Pentesting', A: 85, fullMark: 100, category: 'Penetration Testing' },
  { subject: 'Network Sec', A: 95, fullMark: 100, category: 'IDS/IPS & Network Security' },
  { subject: 'Automation', A: 80, fullMark: 100, category: 'Programming & Automation' },
  { subject: 'Cloud/Infra', A: 85, fullMark: 100, category: 'Cloud & Infrastructure' },
  { subject: 'Cryptography', A: 82, fullMark: 100, category: 'Security Tools & Honeypots' },
];

const categoryIcons = {
  'SOC & Threat Detection': Shield,
  'Penetration Testing': Crosshair,
  'IDS/IPS & Network Security': Network,
  'Programming & Automation': Terminal,
  'Cloud & Infrastructure': Cloud,
  'Security Tools & Honeypots': Database
};

const categoryAccents = {
  'SOC & Threat Detection': { border: 'border-cyan-500/20', hover: 'hover:border-cyan-500/50', bg: 'bg-cyan-500/10', text: 'text-cyan-400', bar: 'bg-cyan-500', glow: 'shadow-cyan-500/20' },
  'Penetration Testing': { border: 'border-purple-500/20', hover: 'hover:border-purple-500/50', bg: 'bg-purple-500/10', text: 'text-purple-400', bar: 'bg-purple-500', glow: 'shadow-purple-500/20' },
  'IDS/IPS & Network Security': { border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/50', bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-500', glow: 'shadow-emerald-500/20' },
  'Programming & Automation': { border: 'border-blue-500/20', hover: 'hover:border-blue-500/50', bg: 'bg-blue-500/10', text: 'text-blue-400', bar: 'bg-blue-500', glow: 'shadow-blue-500/20' },
  'Cloud & Infrastructure': { border: 'border-orange-500/20', hover: 'hover:border-orange-500/50', bg: 'bg-orange-500/10', text: 'text-orange-400', bar: 'bg-orange-500', glow: 'shadow-orange-500/20' },
  'Security Tools & Honeypots': { border: 'border-red-500/20', hover: 'hover:border-red-500/50', bg: 'bg-red-500/10', text: 'text-red-400', bar: 'bg-red-500', glow: 'shadow-red-500/20' },
};

// Custom Tooltip for the Radar Chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050505] border border-cyan-500/30 p-3 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <p className="font-mono text-cyan-400 text-sm font-bold">{payload[0].payload.subject}</p>
        <p className="font-mono text-gray-300 text-xs mt-1">Lvl {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const getProficiencyLabel = (level) => {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Advanced';
  if (level >= 70) return 'Intermediate';
  return 'Beginner';
};

const CommandOverlay = ({ tool, accent, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-lg bg-[#080808] border-t sm:border border-gray-800 rounded-t-2xl sm:rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${accent.bar} animate-pulse`} />
              <h3 className="text-white font-mono font-bold tracking-tight">{tool.name} Command Logs</h3>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1">
              <Brackets className="w-5 h-5 rotate-45" />
            </button>
          </div>
          
          <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
            {tool.commands.map((cmd, idx) => (
              <div key={idx} className="group relative">
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${accent.bar} opacity-40`} />
                <code className={`block text-[12px] ${accent.text} font-mono bg-[#050505] pl-4 py-3 rounded-r border-y border-r border-gray-800/50`}>
                  <span className="text-gray-600 mr-2">$</span>{cmd}
                </code>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
             <span className="text-[10px] text-gray-500 font-mono italic">SYSLOG_SEC_ACCESS_GRANTED</span>
             <button 
               onClick={onClose}
               className={`px-4 py-2 rounded font-mono text-xs font-bold text-black ${accent.bg.replace('10', '100')} ${accent.text.replace('400', '900')} active:scale-95 transition-transform`}
             >
               TERMINATE_VIEW
             </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillLevelingSystem = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const [selectedTool, setSelectedTool] = useState(null);
  const [activeCategory, setActiveCategory] = useState(Object.keys(toolsProficiency)[0]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Calculate total EXP based on average tools proficiency
  const totalExp = useMemo(() => {
    let totalScore = 0;
    let count = 0;
    Object.values(toolsProficiency).forEach(category => {
      category.forEach(skill => {
        totalScore += skill.level;
        count++;
      });
    });
    return Math.round(totalScore / count);
  }, []);

  // Gather all tool names for the orb
  const allToolNames = useMemo(() => {
    return Object.values(toolsProficiency).flat().map(t => t.name);
  }, []);

  return (
    <section id="skill-leveling" className="relative px-4 py-24 bg-[#020202] overflow-hidden" ref={containerRef}>
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#020202] to-[#020202] pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* RPG Character Sheet Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="holo-card card-3d bg-[#121212] backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 md:p-8 mb-16 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-50"></div>

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-8">
            {/* Player Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-cyan-500/50 flex items-center justify-center bg-[#050505] shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-emerald-500 text-black text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded border border-[#020202]">
                  Lvl 42
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-mono uppercase tracking-wider">
                  &gt; Sourav
                </h2>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
                  <span className="text-[10px] sm:text-xs font-mono px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded">Class: Threat Hunter</span>
                  <span className="text-[10px] sm:text-xs font-mono px-2 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded">Sub-Class: Network Spec</span>
                </div>
                <p className="text-gray-400 text-[10px] sm:text-xs font-mono">Guild: SOC Operations | 600+ Hours Active Log</p>
              </div>
            </div>

            {/* EXP Bar */}
            <div className="w-full sm:w-1/3 flex flex-col justify-center mt-4 sm:mt-0">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] text-gray-400 font-mono">GLOBAL PROFICIENCY</span>
                <span className="text-xs sm:text-sm text-cyan-400 font-mono font-bold">{totalExp}%</span>
              </div>
              <div className="h-2.5 sm:h-3 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${totalExp}%` } : {}}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
              </div>
              <div className="text-right mt-1">
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-mono">XP: 84,200 / 100,000</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Arsenal (Radar & Orb) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Radar Chart Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#121212] border border-gray-800/60 rounded-xl p-6 relative flex flex-col h-[450px]"
          >
            <h3 className="text-sm text-cyan-400 font-mono mb-2 uppercase tracking-widest text-center border-b border-gray-800/50 pb-2">Core Attributes</h3>
            <div className="flex-grow w-full flex items-center justify-center -ml-4 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                <RadarChart cx="50%" cy="50%" outerRadius="60%" data={radarData}>
                  <PolarGrid stroke="#1f2937" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#ffffff', fontSize: 10, fontFamily: 'monospace', fontWeight: '900', cursor: 'pointer' }}
                    onClick={(data) => {
                      const category = radarData.find(d => d.subject === data.value)?.category;
                      if (category) {
                        setActiveCategory(category);
                        const element = document.getElementById('skill-inventory-logs');
                        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }}
                    tickCount={5}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="#06b6d4"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 3D Skill Orb Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#121212] border border-gray-800/60 rounded-xl overflow-hidden relative flex flex-col h-[450px]"
          >
            <h3 className="text-sm text-purple-400 font-mono absolute top-6 w-full text-center uppercase tracking-widest z-10">Neural Node Matrix</h3>
            <Canvas3DErrorBoundary fallback={<div className="h-full flex items-center justify-center text-gray-600 font-mono text-xs">Loading neural map...</div>}>
              <Suspense fallback={<div className="h-full flex items-center justify-center text-gray-600 font-mono text-xs">Calibrating nodes...</div>}>
                <div className="h-full w-full pt-12 relative flex items-center justify-center">
                  <SkillOrb tools={allToolNames} />
                </div>
              </Suspense>
            </Canvas3DErrorBoundary>
          </motion.div>
        </div>

         {/* The Grimoire (Categorized Skills & Cheat Sheets) */}
        <motion.div
          id="skill-inventory-logs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800/50 pb-3 mb-8 gap-4">
            <h3 className="text-lg text-emerald-400 font-mono uppercase tracking-widest">
              Skill Inventory & Logs
            </h3>
            
            {/* Desktop Legend / Mobile Tab Info */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-gray-500 text-[10px] font-mono lowercase">interaction: tap_skill_for_shell_logs</span>
              <div className="sm:hidden flex items-center gap-2 px-2 py-1 bg-gray-900 rounded border border-gray-800">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-gray-400 font-mono">SELECTED_SUBMODULE</span>
              </div>
            </div>
          </div>

          {/* Category Tab Bar (Active on Mobile) */}
          <div className="lg:hidden flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar -mx-4 px-4 snap-x">
            {Object.keys(toolsProficiency).map((category) => {
              const Icon = categoryIcons[category] || Code;
              const accent = categoryAccents[category];
              const isActive = activeCategory === category;
              
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 snap-start flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                    isActive 
                      ? `${accent.border.replace('20', '50')} ${accent.bg} ${accent.text} shadow-lg shadow-cyan-500/10 scale-105` 
                      : 'border-gray-800 bg-gray-900/50 text-gray-500'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? accent.text : 'text-gray-600'}`} />
                  <span className="text-[11px] font-mono whitespace-nowrap uppercase tracking-tight font-bold">
                    {category.split(' & ')[0].split(' / ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(toolsProficiency).map(([category, tools], index) => {
              const Icon = categoryIcons[category] || Code;
              const accent = categoryAccents[category] || categoryAccents['Programming & Automation'];
              const isVisible = window.innerWidth >= 1024 || activeCategory === category;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`holo-card card-3d bg-[#121212] border ${accent.border} ${accent.hover} rounded-lg p-5 transition-all duration-300 hover:shadow-lg hover:${accent.glow}`}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2 ${accent.bg} rounded`}>
                      <Icon className={`h-4 w-4 ${accent.text}`} />
                    </div>
                    <h3 className="text-sm font-bold text-white font-mono">{category}</h3>
                  </div>

                  <div className="space-y-3.5">
                    {tools.map((tool) => (
                      <motion.div
                        key={tool.name}
                        whileTap={{ scale: 0.98 }}
                        className="group cursor-pointer active:brightness-125"
                        onClick={() => {
                          setSelectedTool(tool);
                          setIsOverlayOpen(true);
                        }}
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="flex items-center gap-2">
                             <span className="text-gray-300 text-xs group-hover:text-white transition-colors font-mono">
                              {tool.name}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0 ${accent.bg} ${accent.text} rounded font-mono`}>
                              {getProficiencyLabel(tool.level)}
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono ${accent.text}`}>
                            Lvl {tool.level}
                          </span>
                        </div>

                        {/* Progress Bar with neon glow */}
                        <div className="relative h-1.5 bg-[#111] rounded-full overflow-hidden">
                          <div
                            className={`absolute top-0 left-0 h-full ${accent.bar} rounded-full bar-shimmer transition-all duration-500`}
                            style={{ width: `${tool.level}%` }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Floating Command Overlay */}
        <CommandOverlay 
          tool={selectedTool} 
          accent={selectedTool ? (Object.values(categoryAccents).find(acc => acc.text.split('-')[1] === (Object.entries(toolsProficiency).find(([_, tools]) => tools.some(t => t.name === selectedTool.name))?.[0]?.split(' & ')?.[0]?.toLowerCase().includes('cloud') ? 'orange' : Object.entries(toolsProficiency).find(([cat, tools]) => tools.some(t => t.name === selectedTool.name))?.[0]?.split(' & ')?.[0]?.toLowerCase().includes('soc') ? 'cyan' : 'blue')) || categoryAccents['Programming & Automation']) : categoryAccents['Programming & Automation']}
          isOpen={isOverlayOpen}
          onClose={() => setIsOverlayOpen(false)}
        />
      </div>
    </section>
  );
};

export default SkillLevelingSystem;
