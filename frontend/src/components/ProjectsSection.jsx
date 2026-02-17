import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, ExternalLink, Shield, CheckCircle } from 'lucide-react';
import { projects } from '../mock';

const ProjectsSection = ({ recruiterMode }) => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'production':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500';
      case 'active':
        return 'bg-blue-500/10 text-blue-500 border-blue-500';
      case 'beta':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500';
    }
  };

  return (
    <section id="projects" className="min-h-screen px-4 py-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-emerald-500">&gt;</span> Security Briefs
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Recent security projects and infrastructure implementations. Each project includes threat modeling, security audits, and production-ready deployment strategies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`relative bg-[#0a0a0a]/50 backdrop-blur-lg border-emerald-500/20 p-6 overflow-hidden group ${
                recruiterMode ? '' : 'hover:scale-[1.02]'
              } transition-all duration-300 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10`}
              onMouseEnter={() => !recruiterMode && setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                animation: recruiterMode ? 'none' : `slideUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              {/* Background Glow Effect */}
              {hoveredProject === project.id && !recruiterMode && (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 pointer-events-none" />
              )}

              <div className="relative z-10">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white pr-4 font-mono">{project.title}</h3>
                  <Badge className={`${getStatusColor(project.status)} border text-xs uppercase`}>
                    {project.status}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>

                {/* Technical Metadata Overlay */}
                <div className={`space-y-4 transition-all duration-300 ${
                  hoveredProject === project.id && !recruiterMode ? 'opacity-100' : 'opacity-100'
                }`}>
                  {/* Tactics */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <Shield className="h-3 w-3" />
                      Tactics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tactics.map((tactic, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-blue-500/50 text-blue-400 bg-blue-500/5">
                          {tactic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stack */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-emerald-500/50 text-emerald-400 bg-emerald-500/5">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Security Audit */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <CheckCircle className="h-3 w-3" />
                      Security Audit
                    </p>
                    <ul className="space-y-1">
                      {project.securityFeatures.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-emerald-500/10">
                  {project.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="h-3 w-3 mr-2" />
                      View Code
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => window.open(project.demo, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
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
      `}</style>
    </section>
  );
};

export default ProjectsSection;
