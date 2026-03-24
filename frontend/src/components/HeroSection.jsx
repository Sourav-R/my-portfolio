import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, Shield, Clock, ChevronDown, Terminal, Download } from 'lucide-react';
import { profileData, securityStatus } from '../mock';
import TiltCard from './TiltCard';


/* ── Playfair Display ── */
if (typeof document !== 'undefined' && !document.getElementById('hero-fonts')) {
  const link = document.createElement('link');
  link.id = 'hero-fonts';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap';
  document.head.appendChild(link);
}

/* ── Typewriter hook ── */
const useTypewriter = (text, speed = 90, startDelay = 400) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return { displayed, done };
};

const HeroSection = ({ setMatrixRed }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bootLines, setBootLines] = useState([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [defconClicks, setDefconClicks] = useState(0);
  const [isDefcon1, setIsDefcon1] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const { displayed: typedName, done: nameDone } = useTypewriter(profileData.name, 90, 400);

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
    { text: '  ┌─────────────────────────────┐', delay: 2300, type: 'output-dim' },
    { text: '  │  Focus:  SIEM & TDR         │', delay: 2400, type: 'output-cyan-large' },
    { text: '  │  Tools:  25+ Enterprise     │', delay: 2500, type: 'output-cyan-large' },
    { text: '  │  Status: THIRU Active       │', delay: 2600, type: 'output-cyan-large' },
    { text: '  │  Verify: 6 Certifications   │', delay: 2700, type: 'output-cyan-large' },
    { text: '  └─────────────────────────────┘', delay: 2800, type: 'output-dim' },
    { text: '', delay: 2900, type: 'blank' },
    { text: '$ echo $THE_MISSION', delay: 3100, type: 'command' },
    { text: '', delay: 3400, type: 'blank' },
    { text: `  Security Engineer architecting Elastic SIEM clusters,`, delay: 3500, type: 'output-dim' },
    { text: `  automated TDR pipelines, and hardened cloud infrastructure.`, delay: 3600, type: 'output-dim' },
    { text: '', delay: 3900, type: 'blank' },
    { text: '$ _', delay: 4100, type: 'cursor' },
  ];

  useEffect(() => {
    setBootLines([]);
    setBootComplete(false);
    const timers = bootSequence.map((line, i) =>
      setTimeout(() => {
        setBootLines(prev => [...prev, { ...line, visible: true }]);
        if (i === bootSequence.length - 1) setBootComplete(true);
        if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bootComplete && inputRef.current) inputRef.current.focus();
  }, [bootComplete]);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [bootLines, inputValue]);

  const handleTerminalInput = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const command = inputValue.trim().toLowerCase();
      setBootLines(prev => [...prev, { text: `$ ${command}`, type: 'command', visible: true }]);
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
            { text: '  clear     - Clear terminal', type: 'output-cyan', visible: true },
          ]; break;
        case 'whoami':
          response = [
            { text: 'USER IDENTITY: CLASSIFIED', type: 'output-white', visible: true },
            { text: 'ID: ████-████-019', type: 'output-dim', visible: true },
            { text: 'CLEARANCE LEVEL: TOP SECRET', type: 'output-emerald', visible: true },
            { text: 'WARNING: UNAUTHORIZED QUERY DETECTED', type: 'text-red-500', visible: true },
          ]; break;
        case 'sudo':
        case 'sudo su':
          response = [
            { text: '[!] ACCESS DENIED.', type: 'text-red-500', visible: true },
            { text: 'This incident has been reported to the Global Sentinel Network.', type: 'output-dim', visible: true },
          ]; break;
        case 'matrix':
          setMatrixRed(prev => !prev);
          response = [
            { text: 'PROTOCOL OVERRIDE INITIATED.', type: 'text-red-500', visible: true },
            { text: 'MATRIX COLOR SCHEME UPDATED.', type: 'output-dim', visible: true },
          ]; break;
        case 'ping':
        case 'ping localhost':
          response = [
            { text: 'PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.', type: 'output-dim', visible: true },
            { text: '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.042 ms', type: 'output-white', visible: true },
            { text: '64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.038 ms', type: 'output-white', visible: true },
            { text: '64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.045 ms', type: 'output-white', visible: true },
            { text: 'There is no place like home.', type: 'output-emerald', visible: true },
          ]; break;
        case 'cat /etc/shadow':
        case 'cat shadow':
          response = [
            { text: 'root:$6$xyz$abc:18823:0:99999:7:::', type: 'output-dim', visible: true },
            { text: 'daemon:*:18823:0:99999:7:::', type: 'output-dim', visible: true },
            { text: 'admin:hunter2:18823:0:99999:7:::', type: 'output-cyan', visible: true },
            { text: 'guest:*:18823:0:99999:7:::', type: 'output-dim', visible: true },
          ]; break;
        case 'clear':
          setBootLines([]); setInputValue(''); return;
        default:
          response = [{ text: `bash: ${command}: command not found`, type: 'text-red-400', visible: true }];
      }
      setBootLines(prev => [...prev, ...response, { text: '', type: 'blank', visible: true }]);
      setInputValue('');
    }
  };

  const handleDefconClick = useCallback(() => {
    setDefconClicks(prev => {
      const next = prev + 1;
      if (next >= 5) setIsDefcon1(true);
      return next;
    });
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-AU', {
    timeZone: 'Australia/Melbourne', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
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
    <section
      id="hero"
      data-testid="hero-section"
      className={`min-h-screen relative overflow-hidden flex items-center ${isDefcon1 ? 'defcon-1' : ''}`}
    >
      {/* Background layers */}
      <div className={`absolute inset-0 ${isDefcon1 ? 'bg-red-950/20' : 'bg-transparent'}`} />

      {/* Fine dot grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Noise grain overlay */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
      }} />

      {/* Cyan glow behind name area */}
      <div className="absolute pointer-events-none" style={{
        top: '20%', left: '-5%',
        width: '55%', height: '60%',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.05) 0%, transparent 65%)',
      }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 lg:py-0">

        {/* ── Status bar ── */}
        <div className="flex items-center gap-3 mb-12">
          <div
            className={`flex items-center gap-1.5 border rounded px-2.5 py-1 cursor-pointer select-none transition-colors
              ${isDefcon1 ? 'bg-red-500/10 border-red-500/50 animate-pulse' : 'bg-emerald-500/5 border-emerald-500/20'}`}
            onClick={handleDefconClick}
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
          <span className={`text-[10px] font-mono tracking-wider ${isDefcon1 ? 'text-red-500' : 'text-gray-700'}`}>
            {isDefcon1 ? 'LOCKDOWN ACTIVE' : 'SYS.ONLINE'}
          </span>
          <span className={`w-1.5 h-1.5 rounded-full led-blink ${isDefcon1 ? 'bg-red-500' : 'bg-emerald-500'}`} />
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: plain bio, no card ── */}
          <div className="relative">
            {/* Vertical accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{
              background: 'linear-gradient(to bottom, transparent, rgba(6,182,212,0.3) 20%, rgba(6,182,212,0.15) 60%, transparent)',
              marginLeft: '-24px',
            }} />

            {/* Large watermark character behind name */}
            <div className="absolute select-none pointer-events-none" style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(200px, 22vw, 320px)',
              fontWeight: 900, fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.02)',
              lineHeight: 1,
              top: '50px', left: '-20px',
              userSelect: 'none',
              zIndex: 0,
            }}>S</div>
            {/* Available tag */}
            <div className="mb-8 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 led-blink" />
                <span className="text-[10px] font-mono text-emerald-400 tracking-[0.2em] uppercase font-bold">
                  Available
                </span>
              </div>
              <p className="text-[12px] font-mono text-gray-300 tracking-wide pl-3.5">
                Open to full-time roles, internships, and contract work in cybersecurity.
              </p>
            </div>

            {/* Name */}
            <h1
              className="relative z-10 font-bold text-white tracking-tight leading-[1.02] mb-5"
              data-testid="hero-name"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(40px, 3.5vw, 70px)',
                fontStyle: 'italic',
                fontWeight: 900,
                color: '#f2f2f2',
              }}
            >
              {typedName}
              {!nameDone && (
                <span
                  style={{ display: 'inline-block', width: 3, height: '0.8em', background: '#e95309', marginLeft: 4, verticalAlign: 'middle', opacity: 1 }}
                  className="animate-pulse"
                />
              )}
            </h1>

            {/* Role + location */}
            <div className="flex flex-wrap items-center gap-2 mb-4" data-testid="hero-role">
              <span className="text-[#e95309] font-mono text-sm font-semibold tracking-wide">
                {profileData.role}
              </span>
              <span className="text-gray-700 text-xs">//</span>
              <span className="text-cyan-500 font-mono text-sm">
                {profileData.location}
              </span>
            </div>

            {/* Org */}
            <p className="text-gray-600 font-mono text-xs tracking-wide mb-8">
              {profileData.companyFull}
            </p>

            {/* Divider */}
            <div className="h-px mb-8" style={{ background: "linear-gradient(to right, rgba(6,182,212,0.3), rgba(255,255,255,0.06) 40%, transparent)" }} />

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                data-testid="hero-resume-btn"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-900 px-5 py-2.5 rounded font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-[0_0_14px_rgba(16,185,129,0.25)] hover:shadow-[0_0_22px_rgba(16,185,129,0.4)]"
                onClick={() => window.open(profileData.resumeUrl, '_blank')}
              >
                <Download className="h-3.5 w-3.5" />
                Resume
              </button>
              <button
                data-testid="hero-contact-btn"
                className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600 px-5 py-2.5 rounded font-mono text-xs tracking-widest uppercase transition-all duration-200"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Terminal className="h-3.5 w-3.5" />
                Contact
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a href={profileData.github} target="_blank" rel="noopener noreferrer"
                className="p-2.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-gray-700 hover:border-gray-500 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Github className="h-5 w-5" />
              </a>
              <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2.5 text-gray-400 hover:text-blue-400 bg-white/5 hover:bg-blue-500/10 border border-gray-700 hover:border-blue-500/50 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={`mailto:${profileData.email}`}
                className="p-2.5 text-gray-400 hover:text-emerald-400 bg-white/5 hover:bg-emerald-500/10 border border-gray-700 hover:border-emerald-500/50 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* ── RIGHT: Terminal card ── */}
          <div className="order-first lg:order-last">
            <TiltCard intensity={8} scale={1.02}>
              <div className="bg-[#080808] rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(16,185,129,0.35)", boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 24px 48px rgba(0,0,0,0.5), 0 0 60px rgba(16,185,129,0.04)" }}>
                {/* Chrome bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border-b border-gray-800/60">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[10px] text-gray-600 font-mono ml-2">sourav@thiru-labs — bash</span>
                  <Terminal className="h-3 w-3 text-gray-700 ml-auto" />
                </div>

                {/* Terminal body */}
                <div
                  ref={terminalRef}
                  className="p-5 font-mono text-[11px] leading-relaxed h-[220px] sm:h-[300px] lg:h-[420px] overflow-y-auto"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {bootLines.map((line, i) => (
                    <div
                      key={i}
                      className={`${getLineClass(line.type)} ${line.visible ? 'animate-fade-in' : 'opacity-0'}`}
                      style={{ animationDuration: '0.3s' }}
                    >
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

                  {bootComplete && (
                    <div className="flex items-center gap-2 mt-1 animate-fade-in">
                      <span className="text-emerald-500 select-none">$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
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
          <span className="text-xs text-gray-700 font-mono tracking-widest uppercase group-hover:text-gray-500 transition-colors">scroll</span>
          <ChevronDown className="h-5 w-5 text-gray-700 animate-bounce group-hover:text-gray-500 transition-colors" />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;