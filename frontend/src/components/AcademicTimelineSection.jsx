import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { academicTimeline } from '../labExperience';
import { GraduationCap, CheckCircle } from 'lucide-react';

const AcademicTimelineSection = ({ recruiterMode }) => {
  return (
    <section id="academic-timeline" className="min-h-screen px-4 py-20 relative bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-500">&gt;</span> Academic Journey
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Progression through advanced cybersecurity coursework at Monash University, demonstrating continuous skill development and specialization in security operations.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {academicTimeline.map((item, index) => (
              <div
                key={`${item.year}-${item.semester}`}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                style={{
                  animation: recruiterMode ? 'none' : `fadeIn 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyan-500 rounded-full border-4 border-[#050505] z-10 shadow-lg shadow-cyan-500/50" />

                {/* Content Card */}
                <Card
                  className={`w-5/12 bg-[#0a0a0a]/80 backdrop-blur-lg border-cyan-500/20 p-6 hover:border-cyan-500 transition-all duration-300 ${
                    index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-cyan-500" />
                      <span className="text-lg font-bold text-white font-mono">{item.course}</span>
                    </div>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500">
                      {item.year} {item.semester}
                    </Badge>
                  </div>

                  {/* Focus Area */}
                  <p className="text-emerald-400 font-semibold mb-2">{item.focus}</p>
                  <p className="text-gray-500 text-sm mb-4">{item.labs} labs completed</p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Key Topics</p>
                    {item.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-cyan-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-400">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-16 text-center">
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-cyan-500/20 p-8 inline-block">
            <p className="text-gray-400 mb-4">
              Comprehensive graduate-level training in cybersecurity operations, threat detection, and infrastructure security
            </p>
            <div className="flex gap-6 justify-center text-sm">
              <div>
                <p className="text-2xl font-bold text-cyan-500 font-mono">6</p>
                <p className="text-gray-500">Courses</p>
              </div>
              <div className="border-l border-cyan-500/20" />
              <div>
                <p className="text-2xl font-bold text-cyan-500 font-mono">200+</p>
                <p className="text-gray-500">Labs</p>
              </div>
              <div className="border-l border-cyan-500/20" />
              <div>
                <p className="text-2xl font-bold text-cyan-500 font-mono">2</p>
                <p className="text-gray-500">Years</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default AcademicTimelineSection;