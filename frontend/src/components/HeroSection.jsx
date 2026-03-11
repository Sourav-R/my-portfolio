import React, { useState, useEffect, useRef } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, Linkedin, Mail, Shield, Clock, ChevronDown, Terminal } from 'lucide-react';
import { profileData, securityStatus } from '../mock';

const HeroSection = ({ recruiterMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [typedText, setTypedText] = useState('');
  const terminalRef = useRef(null);
  const command = 'cat ./profile.txt';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (recruiterMode) { setTypedText(command); return; }
    let i = 0;
    const interval = setInterval(() => {
      if (i <= command.length) {
        setTypedText(command.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [recruiterMode]);

  const formatTime = (date) => date.toLocaleTimeString('en-AU', {
    timeZone: 'Australia/Melbourne', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });

  const isTypingDone = typedText.length >= command.length;

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center" data-testid="hero-section">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
      <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        {/* Status bar */}
        <div className="flex items-center gap-3 mb-12">
          <Badge className="bg-emerald-500/10 border-emerald-500/40 text-emerald-400 text-xs px-3 py-1">
            <Shield className="h-3 w-3 mr-1.5" />
            Threat Level: {securityStatus.level}
          </Badge>
          <Badge className="bg-cyan-500/10 border-cyan-500/40 text-cyan-400 text-xs px-3 py-1">
            <Clock className="h-3 w-3 mr-1.5" />
            MEL {formatTime(currentTime)}
          </Badge>
          <div className="flex-1" />
          <span className="text-[10px] text-gray-600 font-mono tracking-wider">SYS.ONLINE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left: Identity */}
          <div className="lg:col-span-3">
            <p className="text-emerald-500 font-mono text-sm mb-3 tracking-wide" data-testid="hero-greeting">
              &gt; Hello, I'm
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight leading-[1.1]" data-testid="hero-name">
              {profileData.name}
            </h1>
            <h2 className="text-lg text-gray-400 font-medium mb-6" data-testid="hero-role">
              {profileData.role}
              <span className="text-gray-600 mx-2">/</span>
              <span className="text-cyan-500">{profileData.location}</span>
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xl mb-8">
              {profileData.bio.slice(0, 200)}...
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                data-testid="hero-resume-btn"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 h-10 transition-all duration-200"
                onClick={() => window.open(profileData.resumeUrl, '_blank')}
              >
                Download Resume
              </Button>
              <Button
                data-testid="hero-contact-btn"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:border-emerald-500 hover:text-emerald-400 h-10 px-6 transition-all duration-200"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="h-4 w-4 mr-2" />
                Get in Touch
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-white h-10 w-10 p-0"
                onClick={() => window.open(profileData.github, '_blank')}
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-blue-400 h-10 w-10 p-0"
                onClick={() => window.open(profileData.linkedin, '_blank')}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 text-xs font-mono">
              <div><span className="text-emerald-500 text-lg font-bold">200+</span><span className="text-gray-600 ml-1.5">Labs</span></div>
              <div className="w-px h-4 bg-gray-800" />
              <div><span className="text-cyan-500 text-lg font-bold">25+</span><span className="text-gray-600 ml-1.5">Tools</span></div>
              <div className="w-px h-4 bg-gray-800" />
              <div><span className="text-purple-500 text-lg font-bold">7</span><span className="text-gray-600 ml-1.5">Projects</span></div>
              <div className="w-px h-4 bg-gray-800" />
              <div><span className="text-blue-500 text-lg font-bold">6</span><span className="text-gray-600 ml-1.5">Certs</span></div>
            </div>
          </div>

          {/* Right: Mini Terminal */}
          <div className="lg:col-span-2" ref={terminalRef}>
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden shadow-2xl shadow-emerald-500/5">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0e0e0e] border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-[10px] text-gray-600 font-mono ml-2">sourav@thiru-labs</span>
                <Terminal className="h-3 w-3 text-gray-700 ml-auto" />
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-xs leading-relaxed space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">$</span>
                  <span className="text-gray-300">{typedText}</span>
                  {!isTypingDone && <span className="w-1.5 h-3.5 bg-emerald-500 animate-pulse" />}
                </div>

                {isTypingDone && (
                  <div className="space-y-2 text-gray-500 border-t border-gray-800/50 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">name:</span>
                      <span className="text-white">{profileData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">role:</span>
                      <span className="text-emerald-400">{profileData.role.split('&')[0].trim()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">org:</span>
                      <span className="text-cyan-400">{profileData.companyFull}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">loc:</span>
                      <span className="text-gray-300">{profileData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">status:</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        available
                      </span>
                    </div>
                    <div className="border-t border-gray-800/50 pt-2 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-500">$</span>
                        <span className="w-1.5 h-3.5 bg-emerald-500/50 animate-pulse" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-700 font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 text-gray-700 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
