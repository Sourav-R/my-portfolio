import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Building, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle, Trophy } from 'lucide-react';
import { workExperience } from '../labExperience';

const WorkExperienceSection = ({ recruiterMode }) => {
  const [expandedJob, setExpandedJob] = useState(null);

  return (
    <section id="work-experience" className="min-h-screen px-4 py-20 relative bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-500">&gt;</span> Work Experience
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Professional experience in SOC operations, penetration testing, and vulnerability assessment across enterprise and consulting environments.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {workExperience.map((job, index) => (
            <Card
              key={job.id}
              className={`relative bg-[#0a0a0a]/50 backdrop-blur-lg border-cyan-500/20 p-8 hover:border-cyan-500 transition-all duration-300 ${
                job.current ? 'border-emerald-500/50' : ''
              }`}
              style={{
                animation: recruiterMode ? 'none' : `slideUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              {/* Current Job Badge */}
              {job.current && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500 animate-pulse">
                    Current Position
                  </Badge>
                </div>
              )}

              {/* Job Header */}
              <div className="mb-6">
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <Building className="h-6 w-6 text-cyan-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{job.role}</h3>
                    <p className="text-cyan-400 text-lg font-medium mb-2">{job.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {job.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.technologies.map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs border-cyan-500/50 text-cyan-400 bg-cyan-500/5 font-mono"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Key Achievements (Always Visible) */}
              <div className="mb-4">
                <p className="text-xs text-emerald-500 uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                  <Trophy className="h-3 w-3" />
                  Key Achievements
                </p>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expandable Responsibilities */}
              {expandedJob === job.id && (
                <div className="mt-6 pt-6 border-t border-cyan-500/10 animate-fadeIn">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-mono">
                    Key Responsibilities
                  </p>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-cyan-500 mt-1">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expand/Collapse Button */}
              <div className="mt-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="text-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10"
                >
                  {expandedJob === job.id ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      View All Responsibilities
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-cyan-500/20 p-6 text-center">
            <p className="text-3xl font-bold text-cyan-500 font-mono mb-2">2+</p>
            <p className="text-gray-400 text-sm">Years Experience</p>
          </Card>
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-emerald-500/20 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-500 font-mono mb-2">3</p>
            <p className="text-gray-400 text-sm">Organizations</p>
          </Card>
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-purple-500/20 p-6 text-center">
            <p className="text-3xl font-bold text-purple-500 font-mono mb-2">30%</p>
            <p className="text-gray-400 text-sm">Security Improvement</p>
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

export default WorkExperienceSection;
