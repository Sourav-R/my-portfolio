import React, { useEffect } from 'react';
import CommandBar from '../components/CommandBar';
import Footer from '../components/Footer';
import { certifications } from '../labExperience';
import { Award, Clock, CheckCircle, GraduationCap, Download, ChevronRight, Terminal } from 'lucide-react';
import { profileData } from '../mock';

const educationData = [
  {
    degree: "Master of Cybersecurity",
    institution: "Monash University",
    year: "2023",
    status: "Completed",
    details: "Specialized in Network Security, Cryptography, and Advanced Ethical Hacking."
  },
  {
    degree: "Bachelor of Computer Science",
    institution: "Monash University",
    year: "2021",
    status: "Completed",
    details: "Major in Software Engineering and Systems Architecture."
  }
];

const getStatusAccent = (status) => {
  if (status === 'Completed') return { border: 'border-emerald-500/20', text: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-500', hover: 'hover:border-emerald-500/40' };
  if (status === 'In Progress') return { border: 'border-blue-500/20', text: 'text-blue-400', bg: 'bg-blue-500/10', dot: 'bg-blue-500', hover: 'hover:border-blue-500/40' };
  return { border: 'border-gray-700', text: 'text-gray-400', bg: 'bg-gray-500/10', dot: 'bg-gray-500', hover: 'hover:border-gray-600' };
};

const Vault = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200">
      <CommandBar />

      <main className="relative z-10 pt-24 pb-16 px-4 max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-mono text-purple-500 mb-2 border-b border-gray-800 pb-2 flex items-center gap-3">
            <Award className="w-6 h-6" />
            ~/vault
          </h1>
          <p className="text-gray-500 text-sm font-mono">&gt; SECURE CREDENTIAL STORAGE & VERIFICATION</p>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Column 1: Certifications (60%) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
              <span className="text-purple-500">#</span> CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => {
                const accent = getStatusAccent(cert.status);
                return (
                  <div key={index} className={`bg-[#050505] border ${accent.border} ${accent.hover} rounded-md p-5 transition-colors group flex flex-col`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2 ${accent.bg} rounded`}>
                        {cert.status === 'Completed'
                          ? <CheckCircle className={`h-4 w-4 ${accent.text}`} />
                          : <Clock className={`h-4 w-4 ${accent.text}`} />
                        }
                      </div>
                      <span className={`text-[9px] font-mono px-2 py-0.5 border ${accent.border} ${accent.text} ${accent.bg} rounded-full flex items-center gap-1.5`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} ${cert.status === 'In Progress' ? 'animate-pulse' : ''}`}></span>
                        {cert.status.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-200 mb-1">{cert.name}</h3>
                    <p className="text-xs text-gray-500 font-mono mb-4">{cert.organization} // {cert.year}</p>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills?.slice(0, 3)?.map((skill, idx) => (
                          <span key={idx} className={`text-[9px] px-1.5 py-0.5 bg-[#0a0a0a] border border-gray-800 text-gray-400 rounded font-mono`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Education (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6">
            <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
              <span className="text-purple-500">#</span> EDUCATION
            </h2>
            <div className="flex flex-col gap-4">
              {educationData.map((edu, idx) => (
                <div key={idx} className="bg-[#050505] border border-gray-800 hover:border-purple-500/30 rounded-md p-5 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/10 rounded">
                      <GraduationCap className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-200 leading-tight">{edu.degree}</h3>
                      <p className="text-xs text-purple-400 font-mono">{edu.institution}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-mono mb-2">{edu.year} // {edu.status}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{edu.details}</p>
                </div>
              ))}
            </div>

            {/* Resume Download Prompt */}
            <div className="mt-8 bg-[#0a0a0a] border border-dashed border-gray-800 rounded-md p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-purple-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
              <h3 className="text-sm font-bold text-gray-300 font-mono mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-500" />
                GET /vault/resume.pdf
              </h3>
              <p className="text-xs text-gray-500 font-mono mb-6">
                &gt; Secure download of complete professional history and verified credentials.
              </p>
              <button 
                onClick={() => window.open(profileData.resumeUrl, '_blank')}
                className="w-full group/btn flex items-center justify-between bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 px-4 py-3 rounded text-xs font-mono font-bold tracking-widest transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  [ EXECUTE_DOWNLOAD ]
                </div>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Vault;
