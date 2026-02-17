import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, Linkedin, Mail, Shield, Clock } from 'lucide-react';
import { profileData, securityStatus } from '../mock';

const HeroSection = ({ recruiterMode }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const lines = [
    'sourav@thiru-labs:~$ whoami',
    `Name: ${profileData.name}`,
    `Role: ${profileData.role}`,
    'System initialized. Security protocols active.'
  ];

  useEffect(() => {
    if (recruiterMode || currentLine >= lines.length) return;

    const currentLineText = lines[currentLine];
    const typingSpeed = currentLine === 0 ? 50 : 30;

    if (displayText.length < currentLineText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentLineText.slice(0, displayText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (currentLine < lines.length - 1) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText + '\n');
        setCurrentLine(currentLine + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [displayText, currentLine, lines, recruiterMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-AU', {
      timeZone: 'Australia/Melbourne',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="max-w-5xl w-full relative z-10">
        {/* Security Status Badge */}
        <div className="absolute top-0 right-0 flex flex-col gap-2">
          <Badge className="bg-emerald-500/10 border-emerald-500 text-emerald-500 animate-pulse px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Security Status: {securityStatus.level}
          </Badge>
          <Badge className="bg-blue-500/10 border-blue-500 text-blue-500 px-4 py-2">
            <Clock className="h-4 w-4 mr-2" />
            MEL {formatTime(currentTime)}
          </Badge>
        </div>

        {/* Terminal Window */}
        <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-lg overflow-hidden shadow-2xl shadow-emerald-500/10">
          {/* Terminal Header */}
          <div className="bg-[#121212] border-b border-emerald-500/20 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs text-gray-500 ml-2 font-mono">terminal@soc-portfolio</span>
          </div>

          {/* Terminal Content */}
          <div className="p-8 font-mono text-sm md:text-base">
            {recruiterMode ? (
              <div className="space-y-2">
                <div className="text-emerald-500">sourav@thiru-labs:~$ whoami</div>
                <div className="text-gray-300">Name: {profileData.name}</div>
                <div className="text-gray-300">Role: {profileData.role}</div>
                <div className="text-emerald-400 mt-4">System initialized. Security protocols active.</div>
              </div>
            ) : (
              <pre className="text-emerald-400 whitespace-pre-wrap">
                {displayText}
                <span className="animate-pulse">_</span>
              </pre>
            )}

            {/* Bio Section */}
            <div className="mt-8 pt-8 border-t border-emerald-500/20">
              <p className="text-gray-400 leading-relaxed mb-6">
                {profileData.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium"
                  onClick={() => window.open(profileData.github, '_blank')}
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
                  onClick={() => window.open(profileData.linkedin, '_blank')}
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button 
                  variant="outline"
                  className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center animate-bounce">
          <div className="w-6 h-10 border-2 border-emerald-500/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-emerald-500 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
