import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Calendar, Award } from 'lucide-react';
import { featuredLabs } from '../labExperience';

const FeaturedLabsSection = ({ recruiterMode }) => {
  const [expandedLab, setExpandedLab] = useState(null);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Advanced': return 'red';
      case 'Intermediate': return 'yellow';
      case 'Beginner': return 'green';
      default: return 'gray';
    }
  };

  const getThreatColor = (threat) => {
    const colors = {
      'APT': 'purple',
      'Ransomware': 'red',
      'DDoS': 'blue',
      'Malware': 'orange',
      'Intrusion': 'cyan'
    };
    return colors[threat] || 'gray';
  };

  return (
    <section id="featured-labs" className="min-h-screen px-4 py-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-500">&gt;</span> Featured Lab Case Studies
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Detailed write-ups of selected high-complexity security labs demonstrating practical incident response, threat hunting, and forensic analysis skills.
          </p>
        </div>

        {/* Featured Labs */}
        <div className="space-y-6">
          {featuredLabs.map((lab, index) => (
            <Card
              key={lab.id}
              className="bg-[#0a0a0a]/50 backdrop-blur-lg border-cyan-500/20 p-8 hover:border-cyan-500 transition-all duration-300"
              style={{
                animation: recruiterMode ? 'none' : `slideUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              {/* Lab Header */}
              <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white font-mono">{lab.title}</h3>
                    <Badge className={`bg-${getDifficultyColor(lab.difficulty)}-500/10 text-${getDifficultyColor(lab.difficulty)}-500 border-${getDifficultyColor(lab.difficulty)}-500`}>
                      {lab.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {lab.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {lab.course}
                    </span>
                  </div>
                </div>
                <Badge className={`bg-${getThreatColor(lab.threatType)}-500/10 text-${getThreatColor(lab.threatType)}-500 border-${getThreatColor(lab.threatType)}-500`}>
                  {lab.threatType}
                </Badge>
              </div>

              {/* Objective */}
              <div className="mb-6">
                <p className="text-xs text-cyan-500 uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
                  Lab Objective
                </p>
                <p className="text-gray-300 leading-relaxed">{lab.objective}</p>
              </div>

              {/* Tools Used */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-mono">Tools & Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {lab.toolsUsed.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-xs border-cyan-500/50 text-cyan-400 bg-cyan-500/5 font-mono">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Expandable Details */}
              {expandedLab === lab.id && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Commands Used */}
                  <div>
                    <p className="text-xs text-emerald-500 uppercase tracking-wider mb-3 font-mono">Key Commands Executed</p>
                    <div className="bg-[#121212] border border-cyan-500/20 rounded-lg p-4 space-y-2">
                      {lab.commands.map((cmd, idx) => (
                        <code key={idx} className="block text-sm text-cyan-400 font-mono">
                          $ {cmd}
                        </code>
                      ))}
                    </div>
                  </div>

                  {/* Findings */}
                  <div>
                    <p className="text-xs text-yellow-500 uppercase tracking-wider mb-2 font-mono">Key Findings</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{lab.findings}</p>
                  </div>

                  {/* Mitigation */}
                  <div>
                    <p className="text-xs text-emerald-500 uppercase tracking-wider mb-2 font-mono">Mitigation & Response</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{lab.mitigation}</p>
                  </div>
                </div>
              )}

              {/* Expand/Collapse Button */}
              <div className="mt-6 pt-6 border-t border-cyan-500/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedLab(expandedLab === lab.id ? null : lab.id)}
                  className="text-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10"
                >
                  {expandedLab === lab.id ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      View Full Case Study
                    </>
                  )}
                </Button>
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default FeaturedLabsSection;