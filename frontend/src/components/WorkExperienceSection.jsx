import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Building, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle, Trophy, GraduationCap, BookOpen } from 'lucide-react';
import { workExperience, education } from '../labExperience';

const WorkExperienceSection = ({ recruiterMode }) => {
  const [expandedJob, setExpandedJob] = useState(null);
  const [expandedEdu, setExpandedEdu] = useState(null);

  return (
    <section id="work-experience" className="px-4 py-20 relative" data-testid="experience-section">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2 font-mono tracking-tight flex items-center gap-3">
            <Building className="h-6 w-6 text-emerald-500" />
            <span className="text-white">Experience &</span> <span className="text-emerald-500">Education</span>
          </h2>
          <p className="text-sm text-gray-500">Professional roles and academic background in cybersecurity.</p>
        </div>

        {/* Work Experience */}
        <div className="space-y-4 mb-14">
          {workExperience.map((job, index) => (
            <div
              key={job.id}
              data-testid={`job-card-${job.id}`}
              className={`bg-[#0a0a0a] border rounded-lg p-6 transition-all duration-300 hover:border-gray-600 ${job.current ? 'border-emerald-500/30' : 'border-gray-800'
                }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-2 rounded ${job.current ? 'bg-emerald-500/10' : 'bg-cyan-500/10'}`}>
                  <Building className={`h-5 w-5 ${job.current ? 'text-emerald-500' : 'text-cyan-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-base font-bold text-emerald-50">{job.role}</h3>
                    {job.current && <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] py-0">Current</Badge>}
                  </div>
                  <p className="text-cyan-400 text-sm font-medium">{job.company}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{job.period}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                  </div>
                </div>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {job.technologies.map((tech, idx) => (
                  <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-[#111] border border-gray-800 rounded text-gray-500 font-mono">{tech}</span>
                ))}
              </div>

              {/* Achievements */}
              <div className="space-y-1.5 mb-3">
                {job.achievements.map((a, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-400">{a}</span>
                  </div>
                ))}
              </div>

              {/* Expandable responsibilities */}
              {expandedJob === job.id && (
                <div className="mt-4 pt-4 border-t border-gray-800/50 space-y-1.5">
                  {job.responsibilities.map((r, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-0.5 text-xs">-</span>
                      <span className="text-xs text-gray-500">{r}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                className="text-xs text-cyan-500 hover:text-cyan-400 font-mono mt-2 flex items-center gap-1"
              >
                {expandedJob === job.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {expandedJob === job.id ? 'less' : 'view responsibilities'}
              </button>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="text-lg font-bold font-mono mb-6 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-purple-500" />
            <span className="text-white">Academic</span> <span className="text-purple-500">Background</span>
          </h3>

          {education.map((edu) => (
            <div
              key={edu.id}
              data-testid={`edu-card-${edu.id}`}
              className="bg-[#0a0a0a] border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-purple-500/10 rounded">
                  <GraduationCap className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-purple-50">{edu.degree}</h3>
                  <p className="text-purple-400 text-sm font-medium">{edu.institution}</p>
                  <div className="flex gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{edu.period}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{edu.location}</span>
                  </div>
                </div>
              </div>

              {/* Key areas — always show first 3, expand for rest */}
              <div className="space-y-4">
                {edu.highlights.slice(0, expandedEdu === edu.id ? undefined : 3).map((h, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <BookOpen className="h-3 w-3 text-purple-400" />
                      <span className="text-xs text-purple-400 font-mono font-bold">{h.area}</span>
                    </div>
                    <div className="space-y-1 ml-5">
                      {h.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-purple-500/60 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-500">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {edu.highlights.length > 3 && (
                <button
                  onClick={() => setExpandedEdu(expandedEdu === edu.id ? null : edu.id)}
                  className="text-xs text-purple-400 hover:text-purple-300 font-mono mt-4 flex items-center gap-1"
                >
                  {expandedEdu === edu.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  {expandedEdu === edu.id ? 'less' : `+${edu.highlights.length - 3} more areas`}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;