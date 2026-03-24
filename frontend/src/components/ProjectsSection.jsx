import React, { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, Shield, AlertTriangle } from "lucide-react";
import { projects } from "../mock";

const ProjectsSection = ({ recruiterMode }) => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "production":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500";
      case "active":
        return "bg-blue-500/10 text-blue-500 border-blue-500";
      case "beta":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500";
    }
  };

  return (
    <section id="projects" className="min-h-screen px-4 py-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 font-mono">
            <span className="text-emerald-500">&gt;</span>{" "}
            <span className="text-white">Security</span>{" "}
            <span className="text-emerald-500">Briefs</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Recent security projects and infrastructure implementations. Each
            brief includes threat modeling, security audits, and
            production-ready deployment strategies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`relative bg-[#0a0a0a]/50 backdrop-blur-lg border-emerald-500/20 p-8 overflow-hidden group ${
                recruiterMode ? "" : "hover:scale-[1.01]"
              } transition-all duration-300 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10`}
              onMouseEnter={() =>
                !recruiterMode && setHoveredProject(project.id)
              }
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                animation: recruiterMode
                  ? "none"
                  : `slideUp 0.6s ease-out ${index * 0.15}s both`,
              }}
            >
              {/* Background Glow Effect */}
              {hoveredProject === project.id && !recruiterMode && (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 pointer-events-none" />
              )}

              <div className="relative z-10">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-emerald-50 pr-4 font-mono leading-tight group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>
                  <Badge
                    className={`${getStatusColor(project.status)} border text-xs uppercase whitespace-nowrap`}
                  >
                    {project.status === "production"
                      ? "PROD"
                      : project.status.toUpperCase()}
                  </Badge>
                </div>

                {/* The Mission */}
                <div className="mb-6 pb-6 border-b border-emerald-500/10">
                  <p className="text-xs text-emerald-500 uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    The Mission
                  </p>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {project.mission}
                  </p>
                </div>

                {/* Technical Stack */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-mono">
                    Technical Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs border-emerald-500/50 text-emerald-400 bg-emerald-500/5 font-mono"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Threat Mitigated */}
                <div className="mb-6">
                  <p className="text-xs text-red-400 uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3" />
                    Threat Mitigated
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.threatMitigated}
                  </p>
                </div>

                {/* Action Buttons */}
                {project.github && (
                  <div className="flex gap-3 pt-6 border-t border-emerald-500/10">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 font-mono"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="h-3 w-3 mr-2" />
                      View Repository
                    </Button>
                  </div>
                )}
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
