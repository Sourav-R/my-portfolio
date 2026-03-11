import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Target, Zap, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { advancedProjects } from '../mock';

const AdvancedProjectsSection = ({ recruiterMode }) => {
  const [expandedProject, setExpandedProject] = useState(null);

  const getCategoryColor = (category) => {
    const colors = {
      'Infrastructure Security': 'cyan',
      'Network Infrastructure': 'blue',
      'Offensive Security': 'red',
      'Cryptography': 'purple',
      'Network Security': 'emerald',
      'Communications Security': 'orange'
    };
    return colors[category] || 'gray';
  };

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Expert' ? 'red' : difficulty === 'Advanced' ? 'orange' : 'yellow';
  };

  return (
    <section id="advanced-projects" className="min-h-screen px-4 py-20 relative bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-500">&gt;</span> Advanced Technical Projects
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Production-grade infrastructure and security projects demonstrating expertise in network architecture, cryptography, offensive security, and enterprise-scale deployments.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {advancedProjects.map((project, index) => {
            const categoryColor = getCategoryColor(project.category);
            const difficultyColor = getDifficultyColor(project.difficulty);

            return (
              <Card
                key={project.id}
                className="relative bg-[#0a0a0a]/80 backdrop-blur-lg border-cyan-500/20 p-8 hover:border-cyan-500 transition-all duration-300"
                style={{
                  animation: recruiterMode ? 'none' : `slideUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-bold text-white font-mono">{project.title}</h3>
                      <Badge className={`bg-${difficultyColor}-500/10 text-${difficultyColor}-500 border-${difficultyColor}-500`}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`bg-${categoryColor}-500/10 text-${categoryColor}-500 border-${categoryColor}-500`}>
                        {project.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                        {project.impact}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* The Challenge */}
                <div className="mb-6 pb-6 border-b border-cyan-500/10">
                  <p className="text-xs text-red-500 uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3" />
                    The Challenge (The 'Why')
                  </p>
                  <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
                </div>

                {/* Technical Stack */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-mono">Technical Stack & Protocols</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-cyan-500/50 text-cyan-400 bg-cyan-500/5 font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Expandable Details */}
                {expandedProject === project.id && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Implementation */}
                    <div>
                      <p className="text-xs text-emerald-500 uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                        <Zap className="h-3 w-3" />
                        The Implementation (The 'How')
                      </p>
                      <ul className="space-y-2">
                        {project.implementation.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                            <span className="text-emerald-500 mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Measurable Outcomes */}
                    <div>
                      <p className="text-xs text-blue-500 uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                        <Target className="h-3 w-3" />
                        Measurable Outcomes
                      </p>
                      <ul className="space-y-2">
                        {project.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recruiter Talking Points */}
                    <div className="bg-[#121212] border border-emerald-500/20 rounded-lg p-6">
                      <p className="text-xs text-emerald-500 uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                        <Shield className="h-3 w-3" />
                        Recruiter Talking Points
                      </p>
                      <ul className="space-y-3">
                        {project.recruiterPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-emerald-500 text-xl mt-0.5">"</span>
                            <p className="text-emerald-400 text-sm leading-relaxed flex-1 italic">
                              {point}
                            </p>
                            <span className="text-emerald-500 text-xl">"</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Expand/Collapse Button */}
                <div className="mt-6 pt-6 border-t border-cyan-500/10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                    className="text-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10"
                  >
                    {expandedProject === project.id ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        View Full Technical Details
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-cyan-500/20 p-6 text-center">
            <p className="text-3xl font-bold text-cyan-500 font-mono mb-2">7</p>
            <p className="text-gray-400 text-sm">Technical Projects</p>
          </Card>
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-red-500/20 p-6 text-center">
            <p className="text-3xl font-bold text-red-500 font-mono mb-2">
              {advancedProjects.filter(p => p.difficulty === 'Expert').length}
            </p>
            <p className="text-gray-400 text-sm">Expert Level</p>
          </Card>
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-emerald-500/20 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-500 font-mono mb-2">
              {advancedProjects.filter(p => p.impact === 'Enterprise').length}
            </p>
            <p className="text-gray-400 text-sm">Enterprise Scale</p>
          </Card>
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-purple-500/20 p-6 text-center">
            <p className="text-3xl font-bold text-purple-500 font-mono mb-2">6</p>
            <p className="text-gray-400 text-sm">Categories</p>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
