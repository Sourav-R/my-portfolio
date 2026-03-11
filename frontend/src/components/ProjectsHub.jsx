import React, { useState, useMemo } from 'react';
import { Badge } from './ui/badge';
import { CheckCircle2, ChevronRight, MessageSquare, Shield, Cloud, Sword, Code, Scale, Network, Lock, Globe, Mail, Server, Bug, FileSearch } from 'lucide-react';
import { allProjects, projectCategories } from '../mock';

const TAB_STYLES = {
  'Infrastructure & Network': { border: 'border-l-cyan-500', accent: 'text-cyan-500', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30', icon: Shield, glow: 'hover:shadow-cyan-500/5' },
  'Cloud Engineering': { border: 'border-l-blue-500', accent: 'text-blue-500', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: Cloud, glow: 'hover:shadow-blue-500/5' },
  'Offensive Security': { border: 'border-l-red-500', accent: 'text-red-500', badge: 'bg-red-500/10 text-red-400 border-red-500/30', icon: Sword, glow: 'hover:shadow-red-500/5' },
  'Software Development': { border: 'border-l-emerald-500', accent: 'text-emerald-500', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: Code, glow: 'hover:shadow-emerald-500/5' },
  'Forensics & Compliance': { border: 'border-l-purple-500', accent: 'text-purple-500', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30', icon: Scale, glow: 'hover:shadow-purple-500/5' },
};

const DIFFICULTY_STYLES = {
  'Expert': 'bg-red-500/10 text-red-400 border-red-500/30',
  'Advanced': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  'Intermediate': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
};

const DEFAULT_STYLE = { border: 'border-l-gray-500', accent: 'text-gray-500', badge: 'bg-gray-500/10 text-gray-400 border-gray-500/30', icon: Shield, glow: '' };

const TAB_ACTIVE = {
  'All': 'border-white text-white',
  'Infrastructure & Network': 'border-cyan-500 text-cyan-400',
  'Cloud Engineering': 'border-blue-500 text-blue-400',
  'Offensive Security': 'border-red-500 text-red-400',
  'Software Development': 'border-emerald-500 text-emerald-400',
  'Forensics & Compliance': 'border-purple-500 text-purple-400',
};

const ProjectCard = ({ project, isExpanded, onToggle }) => {
  const style = TAB_STYLES[project.tab] || DEFAULT_STYLE;
  const IconComp = style.icon;
  const hasQuestions = project.questions && project.questions.length > 0;

  return (
    <div
      data-testid={`project-card-${project.id}`}
      onClick={onToggle}
      className={`group relative border-l-2 ${style.border} bg-[#0c0c0c] rounded-r-lg cursor-pointer
        transition-all duration-300 ${style.glow} hover:shadow-lg hover:bg-[#0e0e0e]
        ${isExpanded ? 'col-span-1 md:col-span-2 shadow-lg' : ''}`}
    >
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className={`mt-0.5 ${style.accent} opacity-60`}>
            <IconComp className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white font-mono leading-snug mb-1 group-hover:text-gray-100 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">{project.subtitle}</p>
          </div>
          <ChevronRight className={`h-4 w-4 text-gray-600 flex-shrink-0 mt-1 transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mb-3 ml-7">
          <Badge className={`${style.badge} text-[10px] px-1.5 py-0 h-5 font-normal border`}>{project.tab}</Badge>
          <Badge className={`${DIFFICULTY_STYLES[project.difficulty] || ''} text-[10px] px-1.5 py-0 h-5 font-normal border`}>{project.difficulty}</Badge>
          <Badge className="bg-[#111]/80 text-gray-500 border-gray-700/50 text-[10px] px-1.5 py-0 h-5 font-normal border">{project.type}</Badge>
        </div>

        <div className="flex flex-wrap gap-1 ml-7">
          {project.stack.slice(0, 5).map((tech, idx) => (
            <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-[#111] border border-gray-800 rounded text-gray-500 font-mono">{tech}</span>
          ))}
          {project.stack.length > 5 && (
            <span className="text-[10px] px-1.5 py-0.5 text-gray-600">+{project.stack.length - 5}</span>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 ml-7 space-y-4 border-t border-gray-800/50 pt-4">
            <p className="text-xs text-gray-400 leading-relaxed">{project.challenge}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {project.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className={`h-3 w-3 ${style.accent} mt-0.5 flex-shrink-0 opacity-70`} />
                  <span className="text-xs text-gray-400">{h}</span>
                </div>
              ))}
            </div>

            <div className={`text-xs ${style.accent} font-mono opacity-80 bg-[#080808] rounded px-3 py-2 border border-gray-800/50`}>
              {project.impact}
            </div>

            {hasQuestions && (
              <div className="space-y-2 pt-2 border-t border-gray-800/30">
                <p className="text-[10px] text-gray-600 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <MessageSquare className="h-3 w-3" /> Technical Deep Dive
                </p>
                {project.questions.map((q, idx) => (
                  <div key={idx} className="text-xs text-gray-500 leading-relaxed bg-[#080808] rounded px-3 py-2 border-l border-gray-700">
                    {q}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectsHub = ({ recruiterMode }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

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

  return (
    <section id="projects" className="px-4 py-20 bg-[#050505]" data-testid="projects-hub-section">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 font-mono tracking-tight">
            <span className="text-cyan-500 mr-1">&gt;</span>Projects
          </h2>
          <div className="flex items-center gap-4 text-xs text-gray-600 font-mono">
            <span>{allProjects.length} projects</span>
            <span className="w-px h-3 bg-gray-700" />
            <span>{projectCategories.length - 1} categories</span>
            <span className="w-px h-3 bg-gray-700" />
            <span>{allProjects.filter(p => p.difficulty === 'Expert').length} expert-level</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 mb-8 border-b border-gray-800 pb-px" data-testid="project-tabs">
          {projectCategories.map(cat => (
            <button
              key={cat}
              data-testid={`tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => { setActiveTab(cat); setExpandedId(null); }}
              className={`px-3 py-2 text-xs font-mono border-b-2 transition-all duration-200 ${
                activeTab === cat
                  ? `${TAB_ACTIVE[cat]} font-medium`
                  : 'border-transparent text-gray-600 hover:text-gray-400'
              }`}
            >
              {cat}
              <span className="ml-1.5 text-[10px] opacity-60">{tabCounts[cat]}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsHub;
