import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, ChevronRight, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { workExperience, education } from '../labExperience';

const ExperienceEducation = () => {
  const [expandedJob, setExpandedJob] = useState(null);
  const [expandedEdu, setExpandedEdu] = useState(null);
  return (
    <section id="experience" className="relative px-4 py-8 md:py-16 bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 flex flex-col items-start w-full">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
            <Briefcase className="w-4 h-4" />
            [ CAREER_TRAJECTORY // ACADEMIC_BACKGROUND ]
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Experience <span className="text-cyan-500">&amp; Education</span>
          </h2>
          <p className="text-sm text-gray-400 font-mono max-w-2xl">
            Professional roles and academic background in cybersecurity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
              <Briefcase className="w-6 h-6 text-emerald-500" />
              <h3 className="text-2xl font-bold text-white tracking-tight">Professional <span className="text-gray-500">Roles</span></h3>
            </div>
            
            <div className="space-y-8 border-l-2 border-gray-800/80 pl-6 ml-3">
              {workExperience.map((job) => (
                <div key={job.id} className="relative group">
                  <div className={`absolute -left-[35px] top-1 w-4 h-4 rounded-full border-2 border-[#050505] ${job.current ? 'bg-emerald-500 animate-pulse' : 'bg-gray-700'} transition-colors duration-300`} />
                  
                  <div className="bg-[#080808] border border-gray-800 rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-500 group-hover:bg-emerald-500/10" />
                    
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4 relative z-10">
                      <div>
                        <h4 className="text-xl font-bold text-gray-100">{job.role}</h4>
                        <div className="text-emerald-400 font-mono text-sm mt-1">{job.company}</div>
                      </div>
                      <div className="flex flex-col md:items-end gap-1 font-mono text-xs text-gray-500">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {job.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                      {job.technologies.slice(0, 6).map((tech, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 bg-[#111] border border-gray-800 rounded text-gray-400 font-mono uppercase tracking-wider">{tech}</span>
                      ))}
                    </div>

                    <ul className="space-y-2 mb-0 relative z-10">
                      {job.achievements.map((ach, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-emerald-500/70 mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{ach}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expandable Responsibilities */}
                    {expandedJob === job.id && (
                      <div className="mt-5 pt-5 border-t border-gray-800/50 space-y-2.5 relative z-10">
                        <h5 className="text-[11px] uppercase tracking-widest font-mono text-gray-500 mb-2">Core Responsibilities</h5>
                        {job.responsibilities.map((r, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-500 mt-0.5 text-xs font-mono">-</span>
                            <span className="text-xs text-gray-400 leading-relaxed">{r}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="relative z-10 mt-4 border-t border-transparent">
                      <button
                        onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                        className="text-xs text-emerald-500 hover:text-emerald-400 font-mono flex items-center gap-1 transition-colors"
                      >
                        {expandedJob === job.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        {expandedJob === job.id ? 'Hide details' : 'View responsibilities'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
              <GraduationCap className="w-6 h-6 text-cyan-500" />
              <h3 className="text-2xl font-bold text-white tracking-tight">Academic <span className="text-gray-500">Background</span></h3>
            </div>

            <div className="space-y-8 border-l-2 border-gray-800/80 pl-6 ml-3">
              {education.map((edu) => (
                <div key={edu.id} className="relative group">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full border-2 border-[#050505] bg-cyan-700 transition-colors duration-300 group-hover:bg-cyan-500" />
                  
                  <div className="bg-[#080808] border border-gray-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(6,182,212,0.05)]">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-500 group-hover:bg-cyan-500/10" />
                     
                     <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6 relative z-10">
                      <div>
                        <h4 className="text-xl font-bold text-gray-100">{edu.degree}</h4>
                        <div className="text-cyan-400 font-mono text-sm mt-1">{edu.institution}</div>
                      </div>
                      <div className="flex flex-col md:items-end gap-1 font-mono text-xs text-gray-500">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {edu.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {edu.location}</span>
                      </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                      {edu.highlights.slice(0, expandedEdu === edu.id ? undefined : 3).map((hl, i) => (
                        <div key={i}>
                          <h5 className="text-[11px] uppercase tracking-widest font-mono text-gray-500 mb-2">{hl.area}</h5>
                          <ul className="space-y-2">
                            {hl.items.map((item, j) => (
                              <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-sm bg-cyan-500/30 mt-1.5 shrink-0" />
                                <span className="leading-relaxed text-xs">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      
                      {edu.highlights.length > 3 && (
                        <div className="mt-4 pt-4 border-t border-gray-800/50">
                          <button
                            onClick={() => setExpandedEdu(expandedEdu === edu.id ? null : edu.id)}
                            className="text-xs text-cyan-500 hover:text-cyan-400 font-mono flex items-center gap-1 transition-colors"
                          >
                            {expandedEdu === edu.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                            {expandedEdu === edu.id ? 'Show less' : `+ ${edu.highlights.length - 3} more technical domains mastered`}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceEducation;
