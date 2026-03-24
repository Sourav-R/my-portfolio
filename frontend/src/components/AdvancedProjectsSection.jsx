import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { CheckCircle2, ChevronRight, Shield, Network, Sword, Lock, Globe, Mail } from 'lucide-react';
import { advancedProjects } from '../mock';

const CATEGORY_STYLES = {
  'Infrastructure Security': {
    border: 'border-l-cyan-500',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    icon: Shield,
    accent: 'text-cyan-500',
    glow: 'hover:shadow-cyan-500/5',
  },
  'Network Architecture': {
    border: 'border-l-blue-500',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    icon: Network,
    accent: 'text-blue-500',
    glow: 'hover:shadow-blue-500/5',
  },
  'Offensive Security': {
    border: 'border-l-red-500',
    badge: 'bg-red-500/10 text-red-400 border-red-500/30',
    icon: Sword,
    accent: 'text-red-500',
    glow: 'hover:shadow-red-500/5',
  },
  'Cryptography': {
    border: 'border-l-purple-500',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    icon: Lock,
    accent: 'text-purple-500',
    glow: 'hover:shadow-purple-500/5',
  },
  'Network Security': {
    border: 'border-l-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: Globe,
    accent: 'text-emerald-500',
    glow: 'hover:shadow-emerald-500/5',
  },
  'Email Security': {
    border: 'border-l-orange-500',
    badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    icon: Mail,
    accent: 'text-orange-500',
    glow: 'hover:shadow-orange-500/5',
  },
};

const DIFFICULTY_STYLES = {
  'Expert': 'bg-red-500/10 text-red-400 border-red-500/30',
  'Advanced': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
};

const DEFAULT_STYLE = {
  border: 'border-l-gray-500',
  badge: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  icon: Shield,
  accent: 'text-gray-500',
  glow: 'hover:shadow-gray-500/5',
};

const ProjectCard = ({ project, isExpanded, onToggle, index }) => {
  const style = CATEGORY_STYLES[project.category] || DEFAULT_STYLE;
  const IconComp = style.icon;

  return (
    <div
      data-testid={`project-card-${project.id}`}
      onClick={onToggle}
      className={`group relative border-l-2 ${style.border} bg-[#0c0c0c] rounded-r-lg cursor-pointer
        transition-all duration-300 ${style.glow} hover:shadow-lg hover:bg-[#0e0e0e]
        ${isExpanded ? 'col-span-1 md:col-span-2 shadow-lg' : ''}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="p-5">
        {/* Top row: icon + title + badges */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`mt-0.5 ${style.accent} opacity-60`}>
            <IconComp className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-cyan-50 font-mono leading-snug mb-1 group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">{project.subtitle}</p>
          </div>
          <ChevronRight className={`h-4 w-4 text-gray-600 flex-shrink-0 mt-1 transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3 ml-7">
          <Badge className={`${style.badge} text-[10px] px-1.5 py-0 h-5 font-normal border`}>
            {project.category}
          </Badge>
          <Badge className={`${DIFFICULTY_STYLES[project.difficulty] || 'bg-gray-500/10 text-gray-400 border-gray-500/30'} text-[10px] px-1.5 py-0 h-5 font-normal border`}>
            {project.difficulty}
          </Badge>
          <Badge className="bg-[#111]/80 text-gray-500 border-gray-700/50 text-[10px] px-1.5 py-0 h-5 font-normal border">
            {project.type}
          </Badge>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1 ml-7">
          {project.stack.map((tech, idx) => (
            <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-[#111] border border-gray-800 rounded text-gray-500 font-mono">
              {tech}
            </span>
          ))}
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-4 ml-7 space-y-4 border-t border-gray-800/50 pt-4">
            {/* Challenge */}
            <p className="text-xs text-gray-400 leading-relaxed">{project.challenge}</p>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {project.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className={`h-3 w-3 ${style.accent} mt-0.5 flex-shrink-0 opacity-70`} />
                  <span className="text-xs text-gray-400">{h}</span>
                </div>
              ))}
            </div>

            {/* Impact */}
            <div className={`text-xs ${style.accent} font-mono opacity-80 bg-[#080808] rounded px-3 py-2 border border-gray-800/50`}>
              {project.impact}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdvancedProjectsSection = ({ recruiterMode }) => {
  const [expandedId, setExpandedId] = useState(null);

  const categories = [...new Set(advancedProjects.map(p => p.category))];
  const expertCount = advancedProjects.filter(p => p.difficulty === 'Expert').length;
  const enterpriseCount = advancedProjects.filter(p => p.type === 'Enterprise').length;

  return (
    <section id="advanced-projects" className="px-4 py-20 bg-[#050505]" data-testid="advanced-projects-section">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2 font-mono tracking-tight">
            <span className="text-cyan-500 mr-1">&gt;</span><span className="text-white">Advanced Technical</span> <span className="text-cyan-500">Projects</span>
          </h2>
          <div className="flex items-center gap-4 text-xs text-gray-600 font-mono">
            <span>{advancedProjects.length} projects</span>
            <span className="w-px h-3 bg-gray-700" />
            <span>{categories.length} categories</span>
            <span className="w-px h-3 bg-gray-700" />
            <span>{expertCount} expert-level</span>
            <span className="w-px h-3 bg-gray-700" />
            <span>{enterpriseCount} enterprise</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {advancedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedId === project.id}
              onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedProjectsSection;
