import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { advancedProjects } from '../mock';

const AdvancedProjectsSection = ({ recruiterMode }) => {
  const [expandedProject, setExpandedProject] = useState(null);

  const getCategoryColor = (category) => {
    const colors = {
      'Infrastructure Security': 'cyan',
      'Network Architecture': 'blue',
      'Offensive Security': 'red',
      'Cryptography': 'purple',
      'Network Security': 'emerald',
      'Email Security': 'orange'
    };
    return colors[category] || 'gray';
  };

  return (
    <section id="advanced-projects" className="min-h-screen px-4 py-20 relative bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-500">&gt;</span> Advanced Technical Projects
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Production-grade infrastructure and security implementations demonstrating enterprise-scale architecture, cryptography, and offensive security expertise.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {advancedProjects.map((project, index) => {
            const categoryColor = getCategoryColor(project.category);
            const isExpanded = expandedProject === project.id;

            return (
              <Card
                key={project.id}
                className="bg-[#0a0a0a]/80 backdrop-blur-lg border-cyan-500/20 hover:border-cyan-500 transition-all duration-300 overflow-hidden"
                style={{
                  animation: recruiterMode ? 'none' : `slideUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 font-mono">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{project.subtitle}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`bg-${categoryColor}-500/10 text-${categoryColor}-400 border-${categoryColor}-500/50 text-xs`}>
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {project.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {project.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Challenge - Always Visible */}
                  <div className="mb-4 pb-4 border-b border-cyan-500/10">
                    <p className="text-gray-300 text-sm leading-relaxed">{project.challenge}</p>
                  </div>

                  {/* Tech Stack - Always Visible */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 6).map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-cyan-500/5 border border-cyan-500/30 rounded text-cyan-400 font-mono">
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 6 && (
                        <span className="text-xs px-2 py-1 text-gray-500">+{project.stack.length - 6} more</span>
                      )}
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div className="space-y-4 pt-4 border-t border-cyan-500/10 animate-fadeIn">
                      {/* Key Highlights */}
                      <div>
                        <p className="text-xs text-emerald-500 uppercase tracking-wide mb-3 font-mono">Implementation Highlights</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {project.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-400 text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Impact */}
                      <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-500 p-4 rounded">
                        <p className="text-xs text-cyan-500 uppercase tracking-wide mb-2 font-mono">Impact & Results</p>
                        <p className="text-white text-sm font-medium">{project.impact}</p>
                      </div>
                    </div>
                  )}

                  {/* Expand Button */}
                  <div className="mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                      className="text-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10 w-full"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          View Technical Details
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-cyan-500/20 p-4 text-center">
            <p className="text-2xl font-bold text-cyan-500 font-mono mb-1">{advancedProjects.length}</p>
            <p className="text-gray-400 text-xs">Projects</p>
          </Card>
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-red-500/20 p-4 text-center">
            <p className="text-2xl font-bold text-red-500 font-mono mb-1">
              {advancedProjects.filter(p => p.difficulty === 'Expert').length}
            </p>
            <p className="text-gray-400 text-xs">Expert Level</p>
          </Card>
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-emerald-500/20 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-500 font-mono mb-1">
              {advancedProjects.filter(p => p.type === 'Enterprise').length}
            </p>
            <p className="text-gray-400 text-xs">Enterprise</p>
          </Card>
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-purple-500/20 p-4 text-center">
            <p className="text-2xl font-bold text-purple-500 font-mono mb-1">6</p>
            <p className="text-gray-400 text-xs">Categories</p>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default AdvancedProjectsSection;
