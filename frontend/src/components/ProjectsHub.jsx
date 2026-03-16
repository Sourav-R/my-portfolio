import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { Code, Github, ExternalLink, ChevronRight, CheckCircle2, Shield, Cloud, Sword, Scale, Terminal, X } from 'lucide-react';
import { allProjects, projectCategories } from '../mock';

const TAB_STYLES = {
  'Infrastructure & Network': { border: 'border-l-cyan-500', accent: 'text-cyan-500', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', icon: Shield, glow: 'hover:shadow-cyan-500/10' },
  'Cloud Engineering': { border: 'border-l-blue-500', accent: 'text-blue-500', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: Cloud, glow: 'hover:shadow-blue-500/10' },
  'Offensive Security': { border: 'border-l-red-500', accent: 'text-red-500', badge: 'bg-red-500/10 text-red-400 border-red-500/20', icon: Sword, glow: 'hover:shadow-red-500/10' },
  'Software Development': { border: 'border-l-emerald-500', accent: 'text-emerald-500', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: Code, glow: 'hover:shadow-emerald-500/10' },
  'Forensics & Compliance': { border: 'border-l-purple-500', accent: 'text-purple-500', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Scale, glow: 'hover:shadow-purple-500/10' },
  'Featured Labs': { border: 'border-l-amber-500', accent: 'text-amber-500', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Terminal, glow: 'hover:shadow-amber-500/10' },
};

const DIFFICULTY_STYLES = {
  'Expert': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Advanced': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Intermediate': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const DEFAULT_STYLE = { border: 'border-l-gray-500', accent: 'text-gray-500', badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: Shield, glow: '' };

const TAB_ACTIVE = {
  'All': 'border-white text-white',
  'Infrastructure & Network': 'border-cyan-500 text-cyan-400',
  'Cloud Engineering': 'border-blue-500 text-blue-400',
  'Offensive Security': 'border-red-500 text-red-400',
  'Software Development': 'border-emerald-500 text-emerald-400',
  'Forensics & Compliance': 'border-purple-500 text-purple-400',
  'Featured Labs': 'border-amber-500 text-amber-400'
};

const ProjectsHub = ({ recruiterMode }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'All') return allProjects;
    return allProjects.filter(p => p.tab === activeTab);
  }, [activeTab]);

  const tabCounts = useMemo(() => {
    const counts = { 'All': allProjects.length };
    projectCategories.slice(1).forEach(cat => {
      counts[cat] = allProjects.filter(p => p.tab === cat).length;
    });
    return counts;
  }, []);

  // Use a fallback terminal icon box if no specific image is provided (or if using the placeholder text)
  const getThumbnail = (project, style) => {
    const IconComp = style.icon;
    return (
      <div className="w-full h-48 bg-[#050505] flex flex-col items-center justify-center border-b border-gray-800 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <IconComp className={`w-16 h-16 ${style.accent} opacity-20 mb-3 group-hover:opacity-40 transition-opacity duration-300`} />
        <span className="text-gray-600 font-mono text-xs opacity-50">&lt; /&gt;</span>
        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${style.accent.split('-')[1]}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      </div>
    );
  };

  return (
    <section id="projects" className="relative px-4 py-24 bg-[#030303]" data-testid="projects-hub-section">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="mb-12">
          <div className="section-cmd mb-3">
            <span className="prompt">$</span> find ./projects -type f
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 font-mono tracking-tight">
            Projects <span className="text-gray-500 font-light">&amp;</span> Architecture
          </h2>
          <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mt-4">
            <span className="px-2 py-1 bg-[#0a0a0a] rounded border border-gray-800">{allProjects.length} Total Projects</span>
            <span className="hidden sm:inline w-px h-3 bg-gray-800" />
            <span className="hidden sm:inline">{projectCategories.length - 1} Specializations</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-800/50 pb-2" data-testid="project-tabs">
          {projectCategories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveTab(cat); }}
              className={`px-4 py-2 text-xs font-mono rounded-t-md transition-all duration-300 relative ${
                activeTab === cat
                  ? `bg-[#0a0a0a] border-t border-l border-r border-gray-800 text-white`
                  : 'text-gray-500 hover:text-gray-300 hover:bg-[#080808]'
              }`}
            >
              {cat}
              <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === cat ? 'bg-gray-800 text-white' : 'bg-[#050505]'}`}>
                {tabCounts[cat]}
              </span>
              {activeTab === cat && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${TAB_ACTIVE[cat]?.split(' ')[0].replace('border-', 'bg-') || 'bg-white'}`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid (2 or 3 columns depending on screen) */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const style = TAB_STYLES[project.tab] || DEFAULT_STYLE;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`holo-card card-3d group cursor-pointer flex flex-col bg-[#080808] border ${style.border?.replace('l-', '')} border-opacity-30 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ${style.glow}`}
                >
                  {/* Thumbnail Placeholder */}
                  <div className="overflow-hidden relative">
                     {getThumbnail(project, style)}
                     <div className={`absolute top-3 right-3 ${style.badge} px-2 py-1 rounded text-[10px] font-mono border backdrop-blur-md`}>
                       {project.type}
                     </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-white font-mono leading-tight mb-2 group-hover:text-gray-200 line-clamp-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-grow">
                      {project.subtitle || project.problem || "Advanced implementation requiring complex architectural decisions."}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-[#111] border border-gray-800 rounded-full text-gray-400 font-mono">
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 bg-[#111] border border-gray-800/50 rounded-full text-gray-600 font-mono">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-900 mt-auto">
                      <span className={`text-[10px] uppercase font-mono tracking-wider ${style.accent} flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity`}>
                        <ChevronRight className="w-3 h-3" /> Execute Deep Dive
                      </span>
                      <Badge className={`${DIFFICULTY_STYLES[project.difficulty] || ''} text-[9px] px-1.5 py-0 h-4 border font-mono uppercase tracking-wider`}>
                        {project.difficulty}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Deep Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ pointerEvents: 'auto' }}>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`modal-${selectedProject.id}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#050505] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              {(() => {
                const style = TAB_STYLES[selectedProject.tab] || DEFAULT_STYLE;
                const IconComp = style.icon;
                
                return (
                  <>
                    {/* Modal Header/Topbar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#080808]">
                      <div className="flex items-center gap-3">
                        <IconComp className={`w-5 h-5 ${style.accent}`} />
                        <h2 className="text-lg font-bold text-white font-mono">{selectedProject.title}</h2>
                      </div>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Modal Scrollable Body */}
                    <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
                      
                      {/* Overview Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Main Context */}
                        <div className="lg:col-span-2 space-y-6">
                          
                          {/* Situation / Problem */}
                          <div className="bg-[#0a0a0a] rounded-lg p-5 border border-gray-800/50 relative overflow-hidden">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.bg ? style.bg.replace('bg-', '') : 'bg-gray-700'}`}></div>
                            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${style.accent.replace('text-', 'bg-')} animate-pulse`}></span>
                              [S] Situation & Problem
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {selectedProject.problem || selectedProject.challenge || "Identified security gaps and infrastructure vulnerabilities requiring immediate architectural redesign."}
                            </p>
                          </div>

                          {/* Action / Solution */}
                          <div className="space-y-4">
                            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 flex items-center gap-2">
                               <CheckCircle2 className={`w-3 h-3 ${style.accent}`} />
                               [A] Actions Taken & Solution
                            </h4>
                            <div className="bg-[#080808] border border-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300">
                              <ul className="space-y-3">
                                {(selectedProject.solution || selectedProject.highlights || ["Implemented zero-trust architecture.", "Hardened network boundaries.", "Deployed continuous monitoring."]).map((sol, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <span className="text-gray-600 select-none mt-0.5">{`>`}</span>
                                    <span className="leading-relaxed">{sol}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                          
                          {/* Impact */}
                          <div className={`bg-[#080808] rounded-lg p-5 border ${style.border} group`}>
                            <h4 className={`text-[10px] uppercase font-mono tracking-widest ${style.accent} mb-3`}>
                              [R] Result / Impact
                            </h4>
                            <p className="text-sm text-gray-200 font-medium leading-relaxed">
                              {selectedProject.impact}
                            </p>
                          </div>

                          {/* Tech Stack Detailed */}
                          <div>
                            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-3">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.stack.map((tech, i) => (
                                <span key={i} className="text-xs px-2.5 py-1 bg-gray-900 border border-gray-800 rounded-md text-gray-400 font-mono">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-4 border-t border-gray-800/80 flex flex-col gap-3">
                            {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                              <button className={`w-full py-2.5 rounded-md font-mono text-xs font-bold text-black ${style.accent.replace('text-', 'bg-')} hover:brightness-110 flex items-center justify-center gap-2 transition-all`}>
                                <ExternalLink className="w-4 h-4" /> Live Demo
                              </button>
                            )}
                            {selectedProject.repoUrl && selectedProject.repoUrl !== '#' && (
                              <button className="w-full py-2.5 rounded-md font-mono text-xs font-bold text-white bg-[#111] border border-gray-700 hover:bg-gray-800 flex items-center justify-center gap-2 transition-all">
                                <Github className="w-4 h-4" /> View Repository
                              </button>
                            )}
                            {/* Fallback button if no URLs */}
                            {(!selectedProject.demoUrl || selectedProject.demoUrl === '#') && (!selectedProject.repoUrl || selectedProject.repoUrl === '#') && (
                              <button disabled className="w-full py-2.5 rounded-md font-mono text-xs text-gray-600 border border-gray-800 cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden">
                                <span className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm z-0"></span>
                                <Lock className="w-3 h-3 relative z-10" /> <span className="relative z-10">Private / Enterprise Code</span>
                              </button>
                            )}
                          </div>

                        </div>
                      </div>

                      {/* Technical Deep Dive (Terminal Style) */}
                      {selectedProject.questions && selectedProject.questions.length > 0 && (
                        <div className="mt-8 border border-gray-800 rounded-lg overflow-hidden bg-[#030303]">
                          <div className="flex items-center px-4 py-2 border-b border-gray-800 bg-[#0a0a0a]">
                            <div className="flex gap-1.5 mr-4">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            </div>
                            <span className="text-xs font-mono text-gray-500">technical_deep_dive.sh</span>
                          </div>
                          <div className="p-5 font-mono text-sm leading-relaxed space-y-4">
                            {selectedProject.questions.map((q, idx) => (
                              <div key={idx} className="text-gray-400">
                                <span className={style.accent}>{`$ `}</span>
                                {q.startsWith('$') ? (
                                   <span className="text-cyan-400">{q.substring(1)}</span>
                                ) : (
                                  <span>{q}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Needs importing Lock from lucide-react if used
import { Lock } from 'lucide-react';
export default ProjectsHub;
