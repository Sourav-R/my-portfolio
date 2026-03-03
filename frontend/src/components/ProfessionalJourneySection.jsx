import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { professionalJourney } from '../labExperience';
import { Briefcase, GraduationCap, CheckCircle, TrendingUp } from 'lucide-react';

const ProfessionalJourneySection = ({ recruiterMode }) => {
  const getTypeIcon = (type) => {
    return type === 'work' ? Briefcase : GraduationCap;
  };

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        border: 'border-emerald-500',
        bg: 'bg-emerald-500',
        text: 'text-emerald-500',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500'
      },
      cyan: {
        border: 'border-cyan-500',
        bg: 'bg-cyan-500',
        text: 'text-cyan-500',
        badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500'
      },
      blue: {
        border: 'border-blue-500',
        bg: 'bg-blue-500',
        text: 'text-blue-500',
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500'
      },
      purple: {
        border: 'border-purple-500',
        bg: 'bg-purple-500',
        text: 'text-purple-500',
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500'
      },
      orange: {
        border: 'border-orange-500',
        bg: 'bg-orange-500',
        text: 'text-orange-500',
        badge: 'bg-orange-500/10 text-orange-400 border-orange-500'
      }
    };
    return colors[color] || colors.cyan;
  };

  return (
    <section id="professional-journey" className="min-h-screen px-4 py-20 relative bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-500">&gt;</span> Professional Journey
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Career progression showcasing continuous skill development from academic foundation to professional SOC operations.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {professionalJourney.map((item, index) => {
              const Icon = getTypeIcon(item.type);
              const colors = getColorClasses(item.color);

              return (
                <div
                  key={`${item.year}-${item.period}`}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                  style={{
                    animation: recruiterMode ? 'none' : `fadeIn 0.8s ease-out ${index * 0.2}s both`
                  }}
                >
                  {/* Timeline Node */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 ${colors.bg} rounded-full border-4 border-[#050505] z-10 shadow-lg`} 
                    style={{ boxShadow: `0 0 20px ${item.color === 'emerald' ? '#10b981' : item.color === 'cyan' ? '#00d9ff' : item.color === 'blue' ? '#3b82f6' : item.color === 'purple' ? '#8b5cf6' : '#f97316'}50` }}
                  />

                  {/* Content Card */}
                  <Card
                    className={`w-5/12 bg-[#0a0a0a]/80 backdrop-blur-lg border-cyan-500/20 p-6 hover:${colors.border} transition-all duration-300 ${
                      index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 ${item.type === 'work' ? 'bg-emerald-500/10' : 'bg-cyan-500/10'} rounded-lg`}>
                          <Icon className={`h-5 w-5 ${colors.text}`} />
                        </div>
                        <div>
                          <span className={`text-lg font-bold text-white font-mono block`}>{item.milestone}</span>
                          <span className={`text-sm ${colors.text} font-medium`}>{item.organization}</span>
                        </div>
                      </div>
                    </div>

                    {/* Period */}
                    <Badge className={`${colors.badge} mb-3`}>
                      {item.period}
                    </Badge>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.description}</p>

                    {/* Skills */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Skills Developed</p>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-cyan-500/50 text-cyan-400 bg-cyan-500/5">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <p className="text-xs text-emerald-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Key Achievements
                      </p>
                      <ul className="space-y-1">
                        {item.achievements.slice(0, 3).map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-gray-400">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-16 text-center">
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-cyan-500/20 p-8 inline-block">
            <p className="text-gray-400 mb-4">
              2+ years of continuous growth from academic foundation to professional SOC operations
            </p>
            <div className="flex gap-6 justify-center text-sm">
              <div>
                <p className="text-2xl font-bold text-cyan-500 font-mono">6</p>
                <p className="text-gray-500">Major Milestones</p>
              </div>
              <div className="border-l border-cyan-500/20" />
              <div>
                <p className="text-2xl font-bold text-emerald-500 font-mono">3</p>
                <p className="text-gray-500">Work Positions</p>
              </div>
              <div className="border-l border-cyan-500/20" />
              <div>
                <p className="text-2xl font-bold text-purple-500 font-mono">20+</p>
                <p className="text-gray-500">Skills Acquired</p>
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

export default ProfessionalJourneySection;