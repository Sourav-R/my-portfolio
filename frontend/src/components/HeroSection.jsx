import React, { useState, useEffect, useRef, Suspense, lazy, useCallback } from 'react';
import { Github, Linkedin, Mail, Shield, Clock, ChevronDown, Terminal, Download } from 'lucide-react';
import { profileData, securityStatus } from '../mock';
import TiltCard from './TiltCard';
import Canvas3DErrorBoundary from './Canvas3DErrorBoundary';

const NetworkGlobe = lazy(() => import('./NetworkGlobe'));
const HeroSection = ({ recruiterMode, setMatrixRed }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bootLines, setBootLines] = useState([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [defconClicks, setDefconClicks] = useState(0);
  const [isDefcon1, setIsDefcon1] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const bootSequence = [
    { text: '$ cat ./profile.txt', delay: 0, type: 'command' },
    { text: '', delay: 400, type: 'blank' },
    { text: `  name:     ${profileData.name}`, delay: 600, type: 'output-white' },
    { text: `  role:     ${profileData.role}`, delay: 800, type: 'output-emerald' },
    { text: `  org:      ${profileData.companyFull}`, delay: 1000, type: 'output-cyan' },
    { text: `  loc:      ${profileData.location}`, delay: 1200, type: 'output' },
    { text: `  status:   ● available`, delay: 1400, type: 'output-emerald' },
    { text: '', delay: 1600, type: 'blank' },
    { text: '$ neofetch --stats', delay: 1800, type: 'command' },
    { text: '', delay: 2100, type: 'blank' },
    { text: '  ┌─────────────────────────────────┐', delay: 2300, type: 'output-dim' },
    { text: '  │  200+ Labs  │  25+ Tools  │  23 Projects  │  6 Certs  │', delay: 2500, type: 'output-cyan-large' },
    { text: '  └─────────────────────────────────┘', delay: 2700, type: 'output-dim' },
    { text: '', delay: 2900, type: 'blank' },
    { text: '$ echo $BIO | head -3', delay: 3100, type: 'command' },
    { text: '', delay: 3400, type: 'blank' },
    { text: `  ${profileData.bio.slice(0, 180)}...`, delay: 3600, type: 'output-dim' },
    { text: '', delay: 3900, type: 'blank' },
    { text: '$ _', delay: 4100, type: 'cursor' },
  ];

  useEffect(() => {
    if (recruiterMode) {
      setBootLines(bootSequence.map(l => ({ ...l, visible: true })));
      setBootComplete(true);
      return;
    }

    setBootLines([]);
    setBootComplete(false);

    const timers = bootSequence.map((line, i) => {
      return setTimeout(() => {
        setBootLines(prev => [...prev, { ...line, visible: true }]);
        if (i === bootSequence.length - 1) {
          setBootComplete(true);
        }
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, line.delay);
    });

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recruiterMode]);

  useEffect(() => {
    if (bootComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootComplete]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [bootLines, inputValue]);

  const handleTerminalInput = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const command = inputValue.trim().toLowerCase();
      
      setBootLines(prev => [
        ...prev,
        { text: `$ ${command}`, type: 'command', visible: true }
      ]);

      let response = [];
      
      switch (command) {
        case 'help':
          response = [
            { text: 'Available commands:', type: 'output-white', visible: true },
            { text: '  whoami    - Display user identity', type: 'output-cyan', visible: true },
            { text: '  matrix    - Toggle visual override', type: 'output-cyan', visible: true },
            { text: '  ping      - Check connection', type: 'output-cyan', visible: true },
            { text: '  cat       - Read files', type: 'output-cyan', visible: true },
            { text: '  sudo      - Execute as superuser', type: 'output-emerald', visible: true },
            { text: '  clear     - Clear terminal', type: 'output-cyan', visible: true }
          ];
          break;
        case 'whoami':
          response = [
            { text: 'USER IDENTITY: CLASSIFIED', type: 'output-white', visible: true },
            { text: 'ID: ████-████-019', type: 'output-dim', visible: true },
            { text: 'CLEARANCE LEVEL: TOP SECRET', type: 'output-emerald', visible: true },
            { text: 'WARNING: UNAUTHORIZED QUERY DETECTED', type: 'text-red-500', visible: true }
          ];
          break;
        case 'sudo':
        case 'sudo su':
          response = [
            { text: '[!] ACCESS DENIED.', type: 'text-red-500', visible: true },
            { text: 'This incident has been reported to the Global Sentinel Network.', type: 'output-dim', visible: true }
          ];
          break;
        case 'matrix':
          setMatrixRed(prev => !prev);
          response = [
            { text: 'PROTOCOL OVERRIDE INITIATED.', type: 'text-red-500', visible: true },
            { text: 'MATRIX COLOR SCHEME UPDATED.', type: 'output-dim', visible: true }
          ];
          break;
        case 'ping':
        case 'ping localhost':
          response = [
            { text: 'PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.', type: 'output-dim', visible: true },
            { text: '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.042 ms', type: 'output-white', visible: true },
            { text: '64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.038 ms', type: 'output-white', visible: true },
            { text: '64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.045 ms', type: 'output-white', visible: true },
            { text: 'There is no place like home.', type: 'output-emerald', visible: true }
          ];
          break;
        case 'cat /etc/shadow':
        case 'cat shadow':
          response = [
            { text: 'root:$6$xyz$abc:18823:0:99999:7:::', type: 'output-dim', visible: true },
            { text: 'daemon:*:18823:0:99999:7:::', type: 'output-dim', visible: true },
            { text: 'admin:hunter2:18823:0:99999:7:::', type: 'output-cyan', visible: true },
            { text: 'guest:*:18823:0:99999:7:::', type: 'output-dim', visible: true }
          ];
          break;
        case 'clear':
          setBootLines([]);
          setInputValue('');
          return; // don't push the cursor line back
        default:
          response = [
            { text: `bash: ${command}: command not found`, type: 'text-red-400', visible: true }
          ];
      }

      setBootLines(prev => [
        ...prev,
        ...response,
        { text: '', type: 'blank', visible: true }
      ]);
      setInputValue('');
    }
  };

  const handleDefconClick = useCallback(() => {
    setDefconClicks(prev => {
      const newClicks = prev + 1;
      if (newClicks >= 5) {
        setIsDefcon1(true);
      }
      return newClicks;
    });
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-AU', {
    timeZone: 'Australia/Melbourne', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });

  const getLineClass = (type) => {
    switch (type) {
      case 'command': return 'text-emerald-400';
      case 'output-white': return 'text-gray-200';
      case 'output-emerald': return 'text-emerald-400';
      case 'output-cyan': return 'text-cyan-400';
      case 'output-cyan-large': return 'text-cyan-400 text-sm font-bold';
      case 'output': return 'text-gray-400';
      case 'output-dim': return 'text-gray-500';
      case 'cursor': return 'text-emerald-400';
      case 'blank': return '';
      default: return 'text-gray-400';
    }
  };

  return (
    <section id="hero" className={`min-h-screen relative overflow-hidden flex items-center ${isDefcon1 ? 'defcon-1' : ''}`} data-testid="hero-section">
      {/* Background layers */}
      <div className={`absolute inset-0 ${isDefcon1 ? 'bg-red-950/20' : 'bg-[#030303]'}`} />
      <div className="absolute inset-0 bg-grid" />
      <Canvas3DErrorBoundary>
        <Suspense fallback={null}>
          <NetworkGlobe />
        </Suspense>
      </Canvas3DErrorBoundary>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Status bar */}
        <div className="flex items-center gap-3 mb-8">
          <div 
            className={`flex items-center gap-1.5 border rounded px-2.5 py-1 cursor-pointer select-none transition-colors 
              ${isDefcon1 ? 'bg-red-500/10 border-red-500/50 text-red-500 animate-pulse' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500'}`}
            onClick={handleDefconClick}
            title={!isDefcon1 ? "Click 5 times for lockdown" : ""}
          >
            <Shield className={`h-3 w-3 ${isDefcon1 ? 'text-red-500' : 'text-emerald-500'}`} />
            <span className={`text-[10px] font-mono ${isDefcon1 ? 'text-red-400 font-bold' : 'text-emerald-400'}`}>
              THREAT_LEVEL: {isDefcon1 ? 'CRITICAL / DEFCON 1' : securityStatus.level}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-cyan-500/5 border border-cyan-500/20 rounded px-2.5 py-1">
            <Clock className="h-3 w-3 text-cyan-500" />
            <span className="text-[10px] font-mono text-cyan-400">MEL {formatTime(currentTime)}</span>
          </div>
          <div className="flex-1" />
          <span className={`text-[10px] ${isDefcon1 ? 'text-red-500' : 'text-gray-700'} font-mono tracking-wider`}>
            {isDefcon1 ? 'LOCKDOWN ACTIVE' : 'SYS.ONLINE'}
          </span>
          <span className={`w-1.5 h-1.5 rounded-full ${isDefcon1 ? 'bg-red-500' : 'bg-emerald-500'} led-blink`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Identity */}
          <div>
            <p className="text-cyan-500 font-mono text-sm mb-3 tracking-wide" data-testid="hero-greeting">
              &gt; USER_ID: SOURAV_RK
            </p>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-[1.05]" data-testid="hero-name">
              {profileData.name}
            </h1>
            <h2 className="text-xl text-white font-mono font-bold mb-8" data-testid="hero-role">
              <span className="text-emerald-400">{profileData.role}</span>
              <span className="text-gray-600 mx-2">//</span>
              <span className="text-cyan-400">{profileData.location}</span>
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                data-testid="hero-resume-btn"
                className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-900 border border-emerald-500 px-6 py-3 rounded font-mono text-sm font-bold transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                onClick={() => window.open(profileData.resumeUrl, '_blank')}
              >
                <Download className="h-4 w-4" />
                <span>download resume</span>
              </button>
              <button
                data-testid="hero-contact-btn"
                className="group flex items-center gap-2 bg-transparent hover:bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:border-emerald-500 px-6 py-3 rounded font-mono text-sm transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Terminal className="h-4 w-4" />
                <span>contact me / ssh</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href={profileData.github} target="_blank" rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-cyan-400 border border-gray-800 hover:border-gray-600 rounded transition-all duration-300">
                <Github className="h-4 w-4" />
              </a>
              <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-400 border border-gray-800 hover:border-gray-600 rounded transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={`mailto:${profileData.email}`}
                className="p-2 text-gray-600 hover:text-emerald-400 border border-gray-800 hover:border-gray-600 rounded transition-all duration-300">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right: Terminal Boot Sequence */}
          <div>
            <TiltCard className="" intensity={8} scale={1.02}>
            <div className="bg-[#080808] border border-gray-700/50 rounded-lg overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-[10px] text-gray-600 font-mono ml-2">sourav@thiru-labs — bash</span>
                <Terminal className="h-3 w-3 text-gray-700 ml-auto" />
              </div>

              {/* Terminal body */}
              <div ref={terminalRef} className="p-5 font-mono text-xs leading-relaxed h-[380px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {bootLines.map((line, i) => (
                  <div key={i} className={`${getLineClass(line.type)} ${line.visible ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDuration: '0.3s' }}>
                    {line.type === 'cursor' && !bootComplete ? (
                      <span className="flex items-center gap-1">
                        <span className="text-emerald-500">$</span>
                        <span className="w-2 h-4 bg-emerald-500/60 typewriter-cursor inline-block" />
                      </span>
                    ) : line.type === 'blank' ? (
                      <br />
                    ) : line.type !== 'cursor' ? (
                      <pre className="whitespace-pre-wrap">{line.text}</pre>
                    ) : null}
                  </div>
                ))}

                {/* Interactive Input Layer */}
                {bootComplete && (
                  <div className="flex items-center gap-2 mt-1 animate-fade-in">
                    <span className="text-emerald-500 select-none">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleTerminalInput}
                      className="bg-transparent border-none outline-none flex-1 text-emerald-400 font-mono text-xs focus:ring-0 p-0 m-0"
                      spellCheck="false"
                      autoComplete="off"
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>
            </TiltCard>
          </div>
        </div>

        {/* Scroll hint */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => document.getElementById('terminal-sandbox')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs text-cyan-500/80 font-mono tracking-widest uppercase font-bold group-hover:text-cyan-400 transition-colors">scroll</span>
          <ChevronDown className="h-6 w-6 text-cyan-500/80 animate-bounce group-hover:text-cyan-400 transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
