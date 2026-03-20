import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { toolsProficiency } from '../labExperience';
import {
  Shield, Crosshair, Database, Network, Cloud, Terminal, Code, X, Activity,
  Search, AlertTriangle, Skull, Mail, Bug, Globe, FileCode, Settings, Key, Lock, Eye
} from 'lucide-react';

/* ── Per-tool icon mapping ── */
// 'type: brand' fetches the exact color logo from SimpleIcons CDN. 'type: lucide' uses the fallback native icons.
const toolIcons = {
  'SIEM (ELK Stack)': { type: 'brand', slug: 'elasticstack', color: '#005571' },
  'LotL Detection & EQL': { type: 'lucide', icon: Search, color: '#ff6b6b' },
  'Logstash Pipelines': { type: 'brand', slug: 'logstash', color: '#00bfb3' },
  'GLPI / LAMP Stack': { type: 'brand', slug: 'apache', color: '#D22128' },
  'AWS & Microservices': { type: 'brand', slug: 'amazonaws', color: '#FF9900' },
  'Alert Investigation': { type: 'lucide', icon: Eye, color: '#4dabf7' },
  'Incident Triage': { type: 'lucide', icon: AlertTriangle, color: '#fcc419' },
  'Threat Analysis': { type: 'lucide', icon: Skull, color: '#9775fa' },
  'Phishing Analysis': { type: 'lucide', icon: Mail, color: '#69db7c' },
  'Kali Linux': { type: 'brand', slug: 'kalilinux', color: '#557C94' },
  'Burp Suite': { type: 'lucide', icon: Bug, color: '#FF6633' }, // No exact simpleicon for burp
  'OWASP ZAP': { type: 'brand', slug: 'owasp', color: '#cfcfcf' },
  'Metasploit': { type: 'lucide', icon: Crosshair, color: '#1B4783' },
  'Nmap': { type: 'lucide', icon: Globe, color: '#27346A' },
  'Snort': { type: 'lucide', icon: Shield, color: '#e8590c' },
  'Suricata': { type: 'lucide', icon: Shield, color: '#F16930' },
  'Network Anomaly Detection': { type: 'lucide', icon: Activity, color: '#20c997' },
  'Wireshark': { type: 'brand', slug: 'wireshark', color: '#1679A7' },
  'Log Analysis': { type: 'lucide', icon: FileCode, color: '#adb5bd' },
  'Python': { type: 'brand', slug: 'python', color: '#3776AB' },
  'Bash Scripting': { type: 'brand', slug: 'gnubash', color: '#4EAA25' },
  'C Programming': { type: 'brand', slug: 'c', color: '#A8B9CC' },
  'SaltStack': { type: 'lucide', icon: Settings, color: '#00D1D1' },
  'AWS': { type: 'brand', slug: 'amazonaws', color: '#FF9900' },
  'Oracle Cloud': { type: 'brand', slug: 'oracle', color: '#F80000' },
  'Linux Administration': { type: 'brand', slug: 'linux', color: '#FCC624' },
  'Network Protocols': { type: 'lucide', icon: Network, color: '#74c0fc' },
  'T-Pot Honeypot': { type: 'lucide', icon: Bug, color: '#d0bfff' },
  'Cryptography (AES/RSA)': { type: 'lucide', icon: Key, color: '#ffd43b' },
  'SSL/TLS': { type: 'lucide', icon: Lock, color: '#63e6be' },
  'IPSec/VPN': { type: 'lucide', icon: Lock, color: '#ff8787' },
};

const categoryMeta = {
  'SOC & Threat Detection': {
    icon: Shield,
    color: '#06b6d4',
    dimColor: 'rgba(6,182,212,0.08)',
    tagline: 'Real-time threat monitoring, SIEM engineering, and incident response.',
    index: '01',
  },
  'Penetration Testing': {
    icon: Crosshair,
    color: '#a855f7',
    dimColor: 'rgba(168,85,247,0.08)',
    tagline: 'Offensive security assessments across web, network, and infrastructure.',
    index: '02',
  },
  'IDS/IPS & Network Security': {
    icon: Network,
    color: '#10b981',
    dimColor: 'rgba(16,185,129,0.08)',
    tagline: 'Network anomaly detection, deep packet inspection, and IDS rule authoring.',
    index: '03',
  },
  'Programming & Automation': {
    icon: Terminal,
    color: '#3b82f6',
    dimColor: 'rgba(59,130,246,0.08)',
    tagline: 'Security automation, scripting, and infrastructure-as-code development.',
    index: '04',
  },
  'Cloud & Infrastructure': {
    icon: Cloud,
    color: '#f97316',
    dimColor: 'rgba(249,115,22,0.08)',
    tagline: 'Cloud architecture, Linux administration, and secure network design.',
    index: '05',
  },
  'Security Tools & Honeypots': {
    icon: Database,
    color: '#ef4444',
    dimColor: 'rgba(239,68,68,0.08)',
    tagline: 'Honeypot deployment, cryptographic implementations, and PKI management.',
    index: '06',
  },
};

/* ── Animated counter ── */
const Counter = ({ value, color, active }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const duration = 900;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(current));
    }, step);
    return () => clearInterval(timer);
  }, [active, value]);
  return (
    <span style={{
      fontFamily: "'Courier New', monospace",
      fontSize: 13,
      fontWeight: 900,
      color,
      letterSpacing: '-0.02em',
      textShadow: `0 0 8px ${color}70`,
    }}>
      {display}<span style={{ fontSize: 8, opacity: 0.5, fontWeight: 400 }}>%</span>
    </span>
  );
};

/* ── Command Overlay ── */
const CommandOverlay = ({ tool, color, isOpen, onClose }) => {
  if (!isOpen || !tool) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="w-full max-w-xl overflow-hidden"
          style={{
            background: '#080808',
            border: `1px solid ${color}30`,
            borderRadius: '2px',
            boxShadow: `0 0 0 1px #ffffff08, 0 40px 80px rgba(0,0,0,0.9), 0 0 40px ${color}15`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: `1px solid ${color}20`, background: `${color}08` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              <span className="text-[11px] font-mono tracking-[0.15em] uppercase" style={{ color }}>
                {tool.name}
              </span>
              <span className="text-[10px] font-mono text-gray-600">/ shell.log</span>
            </div>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-300 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-2 max-h-[55vh] overflow-y-auto">
            {tool.commands.map((cmd, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex gap-3 font-mono text-[12px] leading-relaxed"
              >
                <span style={{ color: `${color}60` }} className="select-none mt-0.5">▸</span>
                <code style={{ color: `${color}dd` }}>{cmd}</code>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid #ffffff08' }}>
            <span className="text-[10px] font-mono text-gray-700 tracking-widest">
              ACCESS_GRANTED · {tool.commands?.length} ENTRIES
            </span>
            <button
              onClick={onClose}
              className="text-[10px] font-mono tracking-widest px-3 py-1.5 transition-all"
              style={{ color: '#000', backgroundColor: color, borderRadius: '1px' }}
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Icon Tool Tile ── */
const ToolTile = ({ tool, color, cardActive, onToolClick }) => {
  const [hovered, setHovered] = useState(false);
  const meta = toolIcons[tool.name] || { type: 'lucide', icon: Code, color: '#888' };
  const brandColor = meta.color;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onToolClick(tool, color)}
      whileHover={{ y: -2 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        padding: '24px 16px 20px',
        borderRadius: 8,
        border: `1px solid ${hovered ? color + '45' : 'rgba(255,255,255,0.05)'}`,
        background: hovered ? `${color}0c` : 'rgba(255,255,255,0.02)',
        cursor: 'pointer',
        transition: 'border-color 0.18s, background 0.18s',
        boxShadow: hovered ? `0 0 18px ${color}12, inset 0 1px 0 rgba(255,255,255,0.05)` : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Icon box */}
      <div style={{
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        background: hovered ? `${color}18` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? color + '35' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.18s',
        boxShadow: hovered ? `0 0 14px ${color}20` : 'none',
        flexShrink: 0,
      }}>
        {meta.type === 'brand' ? (
          <img 
            src={`https://cdn.simpleicons.org/${meta.slug}/${brandColor.replace('#', '')}`}
            alt={tool.name}
            style={{
              width: 26,
              height: 26,
              filter: hovered ? `drop-shadow(0 0 8px ${brandColor}80)` : 'none',
              transition: 'all 0.2s',
              transform: hovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        ) : (
          <meta.icon size={26} color={brandColor} style={{
            filter: hovered ? `drop-shadow(0 0 8px ${brandColor}80)` : 'none',
            transition: 'all 0.2s',
            transform: hovered ? 'scale(1.1)' : 'scale(1)'
          }} />
        )}
      </div>

      {/* Tool name */}
      <span style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 8.5,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: hovered ? '#c8c8c8' : '#686868',
        textAlign: 'center',
        lineHeight: 1.35,
        transition: 'color 0.18s',
        maxWidth: 76,
        wordBreak: 'break-word',
      }}>
        {tool.name}
      </span>

      {/* Progress bar */}
      <div style={{
        width: '100%',
        height: 2,
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 1,
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={cardActive ? { width: `${tool.level}%` } : {}}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}55, ${color})`,
            borderRadius: 1,
            boxShadow: `0 0 5px ${color}80`,
          }}
        />
      </div>

      {/* Animated level */}
      <Counter value={tool.level} color={color} active={cardActive} />
    </motion.div>
  );
};

/* ── SkillCard ── */
const SkillCard = ({ category, tools, meta, cardIndex, totalCards, onToolClick }) => {
  const stickyRef = useRef(null);
  const triggerRef = useRef(null);
  const hasEntered = useInView(triggerRef, { once: true, amount: 1 });

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start start', 'end start'],
  });

  const buriedScale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const buriedOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0.5]);

  const isLast = cardIndex === totalCards - 1;
  const CategoryIcon = meta.icon;

  return (
    <>
      <div ref={triggerRef} style={{ height: '1px', marginBottom: '-1px' }} />

      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: '80px',
          zIndex: cardIndex + 1,
          marginBottom: isLast ? 0 : '2rem',
        }}
      >
        <motion.div style={{ scale: buriedScale, opacity: buriedOpacity, transformOrigin: 'top center' }}>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={hasEntered ? { y: 0, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 1 }}
          >
            {/* Card shell — glassmorphism */}
            <div
              style={{
                background: 'rgba(12, 12, 16, 0.55)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: `1px solid rgba(255,255,255,0.06)`,
                borderTop: `1px solid ${meta.color}45`,
                borderRadius: '12px',
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.03),
                  0 8px 32px rgba(0,0,0,0.5),
                  0 32px 64px rgba(0,0,0,0.4),
                  inset 0 1px 0 rgba(255,255,255,0.07),
                  inset 0 -1px 0 rgba(0,0,0,0.3),
                  0 0 80px ${meta.color}0a
                `,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Frosted inner sheen */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(160deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)`,
                pointerEvents: 'none', zIndex: 0,
              }} />

              {/* Colored glow bloom — top right */}
              <div style={{
                position: 'absolute', top: -80, right: -80, width: 260, height: 260,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${meta.color}18 0%, transparent 65%)`,
                pointerEvents: 'none', zIndex: 0,
              }} />

              {/* Colored glow bloom — bottom left */}
              <div style={{
                position: 'absolute', bottom: -60, left: -60, width: 180, height: 180,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${meta.color}0c 0%, transparent 70%)`,
                pointerEvents: 'none', zIndex: 0,
              }} />

              {/* Top bar */}
              <div style={{
                position: 'relative', zIndex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: meta.color, opacity: 0.9 }} />
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: '0.18em', color: '#333', textTransform: 'uppercase' }}>
                    sys.module_{meta.index}
                  </span>
                </div>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: '0.12em', color: '#222', textTransform: 'uppercase' }}>
                  {category}.exe
                </span>
              </div>

              {/* Main content */}
              <div style={{ position: 'relative', zIndex: 1, padding: '40px 48px 48px' }}>

                {/* Category header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={hasEntered ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  style={{ marginBottom: 24 }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <div style={{ width: 20, height: 1, backgroundColor: meta.color, opacity: 0.6 }} />
                        <span style={{
                          fontFamily: "'Courier New', monospace", fontSize: 10,
                          letterSpacing: '0.25em', color: meta.color, textTransform: 'uppercase', opacity: 0.6,
                        }}>
                          0{cardIndex + 1} //
                        </span>
                      </div>

                      <h3 style={{
                        fontSize: 'clamp(18px, 2.2vw, 24px)',
                        fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.02em',
                        lineHeight: 1.1, marginBottom: 8,
                        fontFamily: "'Courier New', monospace",
                        textTransform: 'uppercase', fontStyle: 'italic',
                      }}>
                        {category}
                      </h3>

                      <p style={{
                        fontSize: 12, color: '#505050',
                        fontFamily: "'Courier New', monospace",
                        lineHeight: 1.6, maxWidth: 440, letterSpacing: '0.01em',
                      }}>
                        {meta.tagline}
                      </p>
                    </div>

                    <div style={{
                      width: 44, height: 44,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${meta.color}30`, borderRadius: '8px', flexShrink: 0,
                      background: `rgba(255,255,255,0.04)`, backdropFilter: 'blur(8px)',
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px ${meta.color}15`,
                    }}>
                      <CategoryIcon style={{ width: 20, height: 20, color: meta.color, opacity: 0.85 }} />
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{
                    marginTop: 18, height: 1,
                    background: `linear-gradient(90deg, ${meta.color}40 0%, rgba(255,255,255,0.06) 50%, transparent 100%)`,
                  }} />
                </motion.div>

                {/* ── Icon grid (screenshot-style) ── */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                  gap: 16,
                }}>
                  {tools.map((tool, toolIdx) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={hasEntered ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        type: 'spring', stiffness: 260, damping: 22,
                        delay: 0.18 + toolIdx * 0.055,
                      }}
                    >
                      <ToolTile
                        tool={tool}
                        color={meta.color}
                        cardActive={hasEntered}
                        onToolClick={onToolClick}
                      />
                    </motion.div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

/* ── Main Component ── */
const SkillLevelingSystem = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#06b6d4');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const categories = Object.entries(toolsProficiency);

  const handleToolClick = (tool, color) => {
    setSelectedTool(tool);
    setSelectedColor(color);
    setIsOverlayOpen(true);
  };

  return (
    <section
      id="skill-leveling"
      style={{
        position: 'relative',
        padding: `96px 24px 0`,
        paddingBottom: `${categories.length * 140}px`,
        background: '#020202',
        minHeight: '100vh',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)',
      }} />

      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300,
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 96 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}
          >
            <Activity size={14} color="#06b6d4" />
            <span style={{
              fontFamily: 'monospace', fontSize: 10,
              letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555',
            }}>
              System Capability Matrix
            </span>
          </motion.div>

          <h1 style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 'clamp(44px, 7vw, 72px)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
            marginBottom: 24, textTransform: 'uppercase',
          }}>
            <span style={{ color: '#efefef' }}>Ski</span>
            <span style={{ color: '#2a2a2a' }}>lls</span>
          </h1>

          <p style={{
            maxWidth: 480, fontFamily: 'monospace', fontSize: 13,
            color: '#404040', lineHeight: 1.7, letterSpacing: '0.02em',
          }}>
            A comprehensive overview of specialized tools and proficiency levels
            within cybersecurity infrastructure. Select a node to extract runtime
            command logs.
          </p>
        </motion.header>

        {/* Stacking cards */}
        <div style={{ position: 'relative' }}>
          {categories.map(([category, tools], index) => {
            const meta = categoryMeta[category] || {
              icon: Code, color: '#6b7280',
              dimColor: 'rgba(107,114,128,0.08)',
              tagline: 'Technical proficiency area.',
              index: String(index + 1).padStart(2, '0'),
            };
            return (
              <SkillCard
                key={category}
                category={category}
                tools={tools}
                meta={meta}
                cardIndex={index}
                totalCards={categories.length}
                onToolClick={handleToolClick}
              />
            );
          })}
        </div>
      </div>

      <CommandOverlay
        tool={selectedTool}
        color={selectedColor}
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </section>
  );
};

export default SkillLevelingSystem;
