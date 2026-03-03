import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Award, Clock, CheckCircle } from 'lucide-react';
import { certifications } from '../labExperience';

const CertificationsSection = ({ recruiterMode }) => {
  const getStatusColor = (status) => {
    return status === 'Completed' ? 'emerald' : status === 'In Progress' ? 'blue' : 'gray';
  };

  return (
    <section id="certifications" className="min-h-screen px-4 py-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-500">&gt;</span> Certifications & Training
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Professional certifications and specialized training programs demonstrating expertise in cybersecurity operations, cloud security, and network architecture.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => {
            const statusColor = getStatusColor(cert.status);

            return (
              <Card
                key={index}
                className={`bg-[#0a0a0a]/50 backdrop-blur-lg border-${statusColor}-500/20 p-6 hover:border-${statusColor}-500 transition-all duration-300`}
                style={{
                  animation: recruiterMode ? 'none' : `slideIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${statusColor === 'emerald' ? 'bg-emerald-500/10' : statusColor === 'blue' ? 'bg-blue-500/10' : 'bg-gray-500/10'}`}>
                    {cert.status === 'Completed' ? (
                      <CheckCircle className={`h-6 w-6 ${statusColor === 'emerald' ? 'text-emerald-500' : 'text-blue-500'}`} />
                    ) : (
                      <Clock className={`h-6 w-6 ${statusColor === 'blue' ? 'text-blue-500' : 'text-gray-500'}`} />
                    )}
                  </div>
                  <Badge className={`${statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500' : statusColor === 'blue' ? 'bg-blue-500/10 text-blue-500 border-blue-500' : 'bg-gray-500/10 text-gray-500 border-gray-500'}`}>
                    {cert.status}
                  </Badge>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-400">{cert.organization}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-400">{cert.year}</span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{cert.description}</p>

                  {/* Skills */}
                  {cert.skills && (
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className={`text-xs ${statusColor === 'emerald' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/5' : statusColor === 'blue' ? 'border-blue-500/50 text-blue-400 bg-blue-500/5' : 'border-gray-500/50 text-gray-400 bg-gray-500/5'}`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Courses (if applicable) */}
                  {cert.courses && (
                    <div className="mt-4 pt-4 border-t border-cyan-500/10">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Courses Completed</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.courses.map((course, idx) => (
                          <Badge key={idx} className="bg-cyan-500/10 text-cyan-400 border-cyan-500/50 text-xs font-mono">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-emerald-500/20 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-500 font-mono mb-2">
              {certifications.filter(c => c.status === 'Completed').length}
            </p>
            <p className="text-gray-400 text-sm">Certifications Completed</p>
          </Card>
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-blue-500/20 p-6 text-center">
            <p className="text-3xl font-bold text-blue-500 font-mono mb-2">
              {certifications.filter(c => c.status === 'In Progress').length}
            </p>
            <p className="text-gray-400 text-sm">In Progress</p>
          </Card>
          <Card className="bg-[#0a0a0a]/50 backdrop-blur-lg border-cyan-500/20 p-6 text-center">
            <p className="text-3xl font-bold text-cyan-500 font-mono mb-2">{certifications.length}</p>
            <p className="text-gray-400 text-sm">Total Credentials</p>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default CertificationsSection;
