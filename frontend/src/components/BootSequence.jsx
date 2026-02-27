import React, { useState, useEffect } from 'react';
import './BootSequence.css';

const BootSequence = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [showLogo, setShowLogo] = useState(false);

  const bootCommands = [
    '> INITIALIZING SOC_CORE...',
    '> LOADING SECURE_PRO_MODULE...',
    '> MOUNTING /dev/thiru_labs...',
    '> STARTING THREAT_DETECTION_ENGINE...',
    '> ESTABLISHING SECURE_CONNECTION...',
    '> LOADING PROXMOX_ENVIRONMENT...',
    '> INITIALIZING HOME_LAB_ARCHITECTURE...',
    '> SYSTEM_CHECK: [OK]',
    '> SECURITY_STATUS: ACTIVE',
    '> WELCOME, SOURAV RAMAKRISHNA'
  ];

  useEffect(() => {
    // Start logo assembly
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 500);

    // Terminal text animation
    let currentLine = 0;
    const terminalInterval = setInterval(() => {
      if (currentLine < bootCommands.length) {
        setTerminalLines(prev => [...prev, bootCommands[currentLine]]);
        currentLine++;
      } else {
        clearInterval(terminalInterval);
        // Complete boot sequence after last line
        setTimeout(() => {
          setStage(2);
          setTimeout(onComplete, 800);
        }, 1000);
      }
    }, 300);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(terminalInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`boot-sequence ${stage === 2 ? 'fade-out' : ''}`}>
      {/* CRT Scanline Effect */}
      <div className="crt-scanlines" />
      
      {/* Background Texture */}
      <div className="boot-background" />

      {/* Main Content */}
      <div className="boot-content">
        {/* Logo Container */}
        <div className={`logo-container ${showLogo ? 'animate' : ''}`}>
          {/* Particle Effects */}
          <div className="particles">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  '--delay': `${i * 0.1}s`,
                  '--x': `${Math.random() * 200 - 100}px`,
                  '--y': `${Math.random() * 200 - 100}px`
                }}
              />
            ))}
          </div>

          {/* Cyber Parrot Logo */}
          <svg
            className="cyber-parrot-logo"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Parrot Body - Main shape */}
            <path
              className="logo-part body"
              d="M100,50 Q120,60 130,80 Q135,100 130,120 Q120,140 100,145 Q80,140 70,120 Q65,100 70,80 Q80,60 100,50 Z"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset="300"
            />
            
            {/* Parrot Head */}
            <circle
              className="logo-part head"
              cx="100"
              cy="55"
              r="18"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="120"
              strokeDashoffset="120"
            />
            
            {/* Beak */}
            <path
              className="logo-part beak"
              d="M110,55 L125,50 L115,60 Z"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="50"
              strokeDashoffset="50"
            />
            
            {/* Wing */}
            <path
              className="logo-part wing"
              d="M85,90 Q70,85 60,95 Q55,100 65,105 Q75,100 85,100"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
            
            {/* Tail Feathers */}
            <path
              className="logo-part tail"
              d="M100,145 L95,165 M100,145 L100,170 M100,145 L105,165"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="80"
              strokeDashoffset="80"
            />
            
            {/* Eye */}
            <circle
              className="logo-part eye"
              cx="105"
              cy="52"
              r="3"
              fill="#10b981"
              opacity="0"
            />

            {/* Circuit patterns */}
            <path
              className="logo-part circuit"
              d="M130,100 L145,100 M140,95 L140,105"
              stroke="#10b981"
              strokeWidth="1"
              strokeDasharray="30"
              strokeDashoffset="30"
              opacity="0.6"
            />
            <path
              className="logo-part circuit"
              d="M70,100 L55,100 M60,95 L60,105"
              stroke="#10b981"
              strokeWidth="1"
              strokeDasharray="30"
              strokeDashoffset="30"
              opacity="0.6"
            />
          </svg>

          {/* Scanning Light Effect */}
          <div className="scan-light" />

          {/* Code Strings */}
          <div className="code-strings">
            <span>01001010</span>
            <span>11010101</span>
            <span>10101110</span>
            <span>01110010</span>
          </div>

          {/* Glow Effect */}
          <div className="logo-glow" />
        </div>

        {/* Terminal Output */}
        <div className="terminal-output">
          {terminalLines.map((line, index) => (
            <div key={index} className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-text">{line}</span>
            </div>
          ))}
          {terminalLines.length > 0 && terminalLines.length < bootCommands.length && (
            <span className="terminal-cursor">_</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
