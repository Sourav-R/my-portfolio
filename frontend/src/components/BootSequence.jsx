import React, { useState, useEffect } from "react";
import "./BootSequence.css";

const BootSequence = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [showLogo, setShowLogo] = useState(false);

  const bootCommands = [
    "> INITIALIZING SOC_CORE...",
    "> LOADING SECURE_PRO_MODULE...",
    "> MOUNTING /dev/thiru_labs...",
    "> STARTING THREAT_DETECTION_ENGINE...",
    "> ESTABLISHING SECURE_CONNECTION...",
    "> LOADING PROXMOX_ENVIRONMENT...",
    "> INITIALIZING HOME_LAB_ARCHITECTURE...",
    "> SYSTEM_CHECK: [OK]",
    "> SECURITY_STATUS: ACTIVE",
    "> WELCOME, SOURAV RAMAKRISHNA",
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
        setTerminalLines((prev) => [...prev, bootCommands[currentLine]]);
        currentLine++;
      } else {
        clearInterval(terminalInterval);
        // Complete boot sequence after last line (wait 1 extra second)
        setTimeout(() => {
          setStage(2);
          setTimeout(onComplete, 800);
        }, 2000);
      }
    }, 300);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(terminalInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`boot-sequence ${stage === 2 ? "fade-out" : ""}`}>
      {/* CRT Scanline Effect */}
      <div className="crt-scanlines" />

      {/* Background Texture */}
      <div className="boot-background" />

      {/* Main Content */}
      <div className="boot-content">
        {/* Logo Container */}
        <div className={`logo-container ${showLogo ? "animate" : ""}`}>
          {/* Particle Effects */}
          <div className="particles">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  "--delay": `${i * 0.1}s`,
                  "--x": `${Math.random() * 200 - 100}px`,
                  "--y": `${Math.random() * 200 - 100}px`,
                }}
              />
            ))}
          </div>

          {/* Parrot OS HUD Logo */}
          <svg
            className="cyber-parrot-logo"
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outermost Ring - Dashed with segments */}
            <circle
              className="logo-ring outer-ring"
              cx="150"
              cy="150"
              r="140"
              fill="none"
              stroke="#00d9ff"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              opacity="0.6"
            />

            {/* Outer segmented arcs */}
            <path
              className="logo-arc arc-1"
              d="M 150,10 A 140,140 0 0,1 270,90"
              fill="none"
              stroke="#00d9ff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              className="logo-arc arc-2"
              d="M 280,150 A 140,140 0 0,1 230,270"
              fill="none"
              stroke="#00d9ff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              className="logo-arc arc-3"
              d="M 150,290 A 140,140 0 0,1 30,210"
              fill="none"
              stroke="#00d9ff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              className="logo-arc arc-4"
              d="M 20,150 A 140,140 0 0,1 70,30"
              fill="none"
              stroke="#00d9ff"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Middle Ring - Segmented white/cyan */}
            <circle
              className="logo-ring middle-ring"
              cx="150"
              cy="150"
              r="100"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />

            {/* Middle segmented arcs - White highlights */}
            <path
              className="logo-arc middle-arc-1"
              d="M 150,50 A 100,100 0 0,1 235,115"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeDasharray="20 10"
              strokeLinecap="round"
            />
            <path
              className="logo-arc middle-arc-2"
              d="M 235,185 A 100,100 0 0,1 150,250"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeDasharray="20 10"
              strokeLinecap="round"
            />
            <path
              className="logo-arc middle-arc-3"
              d="M 65,185 A 100,100 0 0,1 50,150"
              fill="none"
              stroke="#00d9ff"
              strokeWidth="4"
              strokeDasharray="15 8"
              strokeLinecap="round"
            />

            {/* Inner Ring - Dashed */}
            <circle
              className="logo-ring inner-ring"
              cx="150"
              cy="150"
              r="70"
              fill="none"
              stroke="#00d9ff"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.7"
            />

            {/* Central Circle - Solid background for parrot */}
            <circle
              className="logo-center"
              cx="150"
              cy="150"
              r="45"
              fill="rgba(0, 217, 255, 0.1)"
              stroke="#00d9ff"
              strokeWidth="1.5"
            />

            {/* Parrot Silhouette - Simplified iconic shape */}
            <g className="parrot-icon" transform="translate(150, 150)">
              {/* Parrot body */}
              <path
                className="logo-part parrot-body"
                d="M -5,-15 Q -8,-5 -8,5 Q -8,12 -3,18 L 0,22 L 3,18 Q 8,12 8,5 Q 8,-5 5,-15 Z"
                fill="#00d9ff"
                opacity="0"
              />

              {/* Parrot head */}
              <ellipse
                className="logo-part parrot-head"
                cx="0"
                cy="-18"
                rx="10"
                ry="12"
                fill="#00d9ff"
                opacity="0"
              />

              {/* Beak */}
              <path
                className="logo-part parrot-beak"
                d="M 8,-18 L 18,-16 L 10,-14 Z"
                fill="#00d9ff"
                opacity="0"
              />

              {/* Wing */}
              <path
                className="logo-part parrot-wing"
                d="M -8,0 Q -18,-2 -22,5 Q -20,10 -12,8"
                fill="none"
                stroke="#00d9ff"
                strokeWidth="2.5"
                opacity="0"
              />

              {/* Tail */}
              <path
                className="logo-part parrot-tail"
                d="M 0,22 L -4,32 M 0,22 L 0,35 M 0,22 L 4,32"
                stroke="#00d9ff"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0"
              />
            </g>

            {/* Tech detail elements */}
            <rect
              className="tech-detail detail-1"
              x="145"
              y="5"
              width="10"
              height="3"
              fill="#00d9ff"
              opacity="0"
            />
            <rect
              className="tech-detail detail-2"
              x="290"
              y="145"
              width="5"
              height="10"
              fill="#00d9ff"
              opacity="0"
            />
            <rect
              className="tech-detail detail-3"
              x="145"
              y="292"
              width="10"
              height="3"
              fill="#00d9ff"
              opacity="0"
            />
            <rect
              className="tech-detail detail-4"
              x="5"
              y="145"
              width="5"
              height="10"
              fill="#00d9ff"
              opacity="0"
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
          {terminalLines.length > 0 &&
            terminalLines.length < bootCommands.length && (
              <span className="terminal-cursor">_</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
