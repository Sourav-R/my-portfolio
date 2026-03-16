import React from 'react';
import { Badge } from './ui/badge';
import { Award, Clock, CheckCircle } from 'lucide-react';
import { certifications } from '../labExperience';
import ScrollReveal from './ScrollReveal';

const CertificationsSection = ({ recruiterMode }) => {
  const getStatusAccent = (status) => {
    if (status === 'Completed') return { border: 'border-emerald-500/20', text: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-500', hover: 'hover:border-emerald-500/40' };
    if (status === 'In Progress') return { border: 'border-blue-500/20', text: 'text-blue-400', bg: 'bg-blue-500/10', dot: 'bg-blue-500', hover: 'hover:border-blue-500/40' };
    return { border: 'border-gray-700', text: 'text-gray-400', bg: 'bg-gray-500/10', dot: 'bg-gray-500', hover: 'hover:border-gray-600' };
  };

  return (
    <section id="certifications" className="relative px-4 py-24 bg-[#030303]">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-cmd mb-3">
            <span className="prompt">$</span> ls -la ./certifications/
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 font-mono tracking-tight">
            Certifications & Training
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm">
            Professional certifications and specialized training in cybersecurity operations, cloud security, and network architecture.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, index) => {
            const accent = getStatusAccent(cert.status);
            return (
              <div
                key={index}
                className={`holo-card card-3d bg-[#080808] border ${accent.border} ${accent.hover} rounded-lg p-5 transition-all duration-300 hover:shadow-lg`}
                style={{ animation: recruiterMode ? 'none' : `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 ${accent.bg} rounded`}>
                    {cert.status === 'Completed'
                      ? <CheckCircle className={`h-5 w-5 ${accent.text}`} />
                      : <Clock className={`h-5 w-5 ${accent.text}`} />
                    }
                  </div>
                  <Badge className={`${accent.bg} ${accent.text} border-current/30 text-[10px] font-mono`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} ${cert.status === 'In Progress' ? 'led-blink' : ''} mr-1.5 inline-block`} />
                    {cert.status}
                  </Badge>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-white mb-2 font-mono leading-snug">{cert.name}</h3>
                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 font-mono">
                  <Award className="h-3 w-3" />
                  <span>{cert.organization}</span>
                  <span className="text-gray-700">•</span>
                  <span>{cert.year}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{cert.description}</p>

                {/* Skills */}
                {cert.skills && (
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, idx) => (
                      <span key={idx} className={`text-[10px] px-2 py-0.5 ${accent.bg} ${accent.text} rounded font-mono border border-current/10`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Courses */}
                {cert.courses && (
                  <div className="mt-4 pt-3 border-t border-gray-800/50">
                    <p className="text-[9px] text-gray-600 uppercase tracking-wider mb-2 font-mono">courses</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.courses.map((course, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 rounded font-mono">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { val: certifications.filter(c => c.status === 'Completed').length, label: 'Completed', color: 'text-emerald-500', border: 'border-emerald-500/20' },
            { val: certifications.filter(c => c.status === 'In Progress').length, label: 'In Progress', color: 'text-blue-500', border: 'border-blue-500/20' },
            { val: certifications.length, label: 'Total', color: 'text-cyan-500', border: 'border-cyan-500/20' },
          ].map((s, i) => (
            <div key={i} className={`text-center bg-[#080808] border ${s.border} rounded-lg p-5`}>
              <p className={`text-2xl font-bold ${s.color} font-mono`}>{s.val}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
