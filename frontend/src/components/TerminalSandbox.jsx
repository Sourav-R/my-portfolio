import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { RotateCcw, Terminal as TerminalIcon } from "lucide-react";
import Canvas3DErrorBoundary from "./Canvas3DErrorBoundary";

const ParticleNetwork = lazy(() => import("./ParticleNetwork"));
import {
  terminalCommands,
  profileData,
  allProjects,
  projectCategories,
  skills,
  homeLabServices,
} from "../mock";
import {
  commandCheatsheet,
  toolsProficiency,
  certifications,
  workExperience,
  professionalJourney,
  featuredLabs,
  labStats,
  threatCategories,
} from "../labExperience";

// Build rich outputs from actual data
const buildExperienceOutput = () => {
  let out =
    "Experience & Education:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  workExperience.forEach((job, i) => {
    out += `\n[${i + 1}] ${job.role} — ${job.company}\n`;
    out += `    Period: ${job.period} | Location: ${job.location}\n`;
    out += `    Tech: ${job.technologies.slice(0, 5).join(", ")}\n`;
    out += `    Achievements:\n`;
    job.achievements.forEach((a) => {
      out += `      ✓ ${a}\n`;
    });
  });
  out += '\nType "experience <number>" for full responsibilities.';
  return out;
};

const buildExperienceDetail = (num) => {
  const job = workExperience[num - 1];
  if (!job)
    return `No experience entry #${num}. Valid: 1-${workExperience.length}`;
  let out = `${job.role} — ${job.company}\n`;
  out += `${"━".repeat(50)}\n`;
  out += `Period: ${job.period} | Location: ${job.location}\n\n`;
  out += `Technologies: ${job.technologies.join(", ")}\n\n`;
  out += "Responsibilities:\n";
  job.responsibilities.forEach((r, i) => {
    out += `  ${i + 1}. ${r}\n`;
  });
  out += "\nAchievements:\n";
  job.achievements.forEach((a) => {
    out += `  ✓ ${a}\n`;
  });
  return out;
};

const buildJourneyOutput = () => {
  let out =
    "Professional Journey:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  professionalJourney.forEach((item, i) => {
    const icon = item.type === "work" ? "💼" : "🎓";
    out += `\n${icon} ${item.milestone} — ${item.organization} (${item.period})\n`;
    out += `   ${item.description}\n`;
    out += `   Skills: ${item.skills.slice(0, 4).join(", ")}\n`;
  });
  return out;
};

const buildSkillsOutput = () => {
  let out =
    "Technical Proficiency Matrix:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  Object.entries(toolsProficiency).forEach(([category, tools]) => {
    out += `\n[${category}]\n`;
    tools.forEach((tool) => {
      const bar =
        "█".repeat(Math.floor(tool.level / 10)) +
        "░".repeat(10 - Math.floor(tool.level / 10));
      out += `  ${tool.name.padEnd(28)} ${bar} ${tool.level}%\n`;
    });
  });
  out += '\nType a tool name (e.g. "wireshark", "nmap") for cheat sheets.';
  return out;
};

const buildCertsOutput = () => {
  let out =
    "Certifications & Training:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  certifications.forEach((cert, i) => {
    const status = cert.status === "Completed" ? "✓" : "⟳";
    out += `\n${status} ${cert.name}\n`;
    out += `  Org: ${cert.organization} | Year: ${cert.year} | Status: ${cert.status}\n`;
    out += `  ${cert.description}\n`;
  });
  return out;
};

const buildProjectsOutput = () => {
  let out = `Projects (${allProjects.length} total):\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  const categories = {};
  allProjects.forEach((p) => {
    if (!categories[p.tab]) categories[p.tab] = [];
    categories[p.tab].push(p);
  });
  Object.entries(categories).forEach(([cat, projects]) => {
    out += `\n[${cat}] (${projects.length})\n`;
    projects.forEach((p) => {
      out += `  #${String(p.id).padStart(2, "0")} ${p.title} [${p.difficulty}]\n`;
    });
  });
  out += '\nType "project <id>" for full details (e.g. "project 1").';
  return out;
};

const buildProjectDetail = (id) => {
  const p = allProjects.find((proj) => proj.id === id);
  if (!p) return `No project with ID ${id}. Valid: 1-${allProjects.length}`;
  let out = `${p.title}\n${"━".repeat(50)}\n`;
  out += `Category: ${p.tab} | Difficulty: ${p.difficulty} | Type: ${p.type}\n\n`;
  out += `${p.subtitle}\n\n`;
  out += `Challenge:\n  ${p.challenge}\n\n`;
  out += `Stack: ${p.stack.join(", ")}\n\n`;
  out += "Highlights:\n";
  p.highlights.forEach((h) => {
    out += `  ✓ ${h}\n`;
  });
  out += `\nImpact: ${p.impact}\n`;
  if (p.questions && p.questions.length > 0) {
    out += "\nTechnical Deep Dive:\n";
    p.questions.forEach((q, i) => {
      out += `  Q${i + 1}. ${q}\n`;
    });
  }
  return out;
};

const buildLabOutput = () => {
  let out = `Home Lab Status:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  out += `Service               Status    Uptime   CPU    Memory  Containers\n`;
  out += `${"─".repeat(75)}\n`;
  homeLabServices.forEach((svc) => {
    out += `${svc.name.padEnd(22)} ${svc.status.padEnd(10)} ${svc.uptime.padEnd(8)} ${svc.cpu.padEnd(7)} ${svc.memory.padEnd(8)} ${svc.containers}\n`;
  });
  out += `\nTotal Containers: ${homeLabServices.reduce((s, svc) => s + svc.containers, 0)}`;
  out += `\nAll systems operational.`;
  return out;
};

const buildLabsExpOutput = () => {
  let out = `Lab Experience Stats:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  out += `\n  Total Labs: ${labStats.totalLabs}+`;
  out += `\n  Lab Hours:  ${labStats.totalHours}+`;
  out += `\n  Active:     ${labStats.yearsActive}`;
  out += `\n  Courses:    ${labStats.coursesCompleted.join(", ")}\n`;
  out += `\nThreat Distribution:\n`;
  threatCategories.forEach((cat) => {
    const bar =
      "█".repeat(Math.floor(cat.percentage / 3)) +
      "░".repeat(10 - Math.floor(cat.percentage / 3));
    out += `  ${cat.name.padEnd(28)} ${bar} ${cat.count} (${cat.percentage}%)\n`;
  });
  out += '\nType "casestudies" for featured lab case studies.';
  return out;
};

const buildCaseStudiesOutput = () => {
  let out = `Featured Lab Case Studies:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  featuredLabs.forEach((lab, i) => {
    out += `\n[${i + 1}] ${lab.title} (${lab.course} — ${lab.date})\n`;
    out += `    Difficulty: ${lab.difficulty} | Threat: ${lab.threatType}\n`;
    out += `    ${lab.objective}\n`;
    out += `    Tools: ${lab.toolsUsed.join(", ")}\n`;
    out += `    Findings: ${lab.findings}\n`;
    out += `    Mitigation: ${lab.mitigation}\n`;
    if (lab.commands.length > 0) {
      out += `    Commands:\n`;
      lab.commands.forEach((cmd) => {
        out += `      $ ${cmd}\n`;
      });
    }
  });
  return out;
};

const HELP_TEXT = `Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  PROFILE
    whoami          Display profile information
    bio             Read full bio

  CAREER
    experience      Experience & Education (use "experience <#>" for details)
    certs           Certifications & clearances

  TECHNICAL
    skills          Technical Proficiency matrix
    missions        Active Missions & Deployments
    projects        List all ${allProjects.length} Architecture Projects
    project <id>    Project details (e.g. "project 1")

  CHEAT SHEETS
    wireshark       Wireshark commands
    nmap            Nmap commands
    splunk          Splunk commands
    snort           Snort commands
    yara            YARA commands
    metasploit      Metasploit commands

  LABS
    labs            Cyber Range Labs & stats
    casestudies     Featured lab case studies
    lab             Home lab infrastructure status

  MISC
    resume          Open resume (PDF)
    secret          ???

  NAVIGATION
    goto <section>  Jump to section (experience, skills, certs, missions,
                    projects, labs, casestudies)

  UTILITY
    help            Show this help
    clear           Clear terminal`;

const SECTION_MAP = {
  home: "hero",
  experience: "experience",
  skills: "skill-leveling",
  certs: "certifications",
  certifications: "certifications",
  missions: "active-missions",
  projects: "projects",
  labs: "lab-experience",
  casestudies: "lab-experience",
  terminal: "terminal",
};

const TerminalSandbox = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      content: "╔══════════════════════════════════════════════════════════╗",
    },
    {
      type: "system",
      content: "║   The System Shell v2.0 — Interactive Portfolio Hub      ║",
    },
    {
      type: "system",
      content: "╚══════════════════════════════════════════════════════════╝",
    },
    { type: "output", content: "" },
    { type: "system", content: 'Type "help" for all available commands.' },
    {
      type: "system",
      content:
        "Try: whoami, skills, projects, experience, labs, or tool cheat sheets.",
    },
    {
      type: "system",
      content: 'Navigate: "goto journey", "goto projects", etc.',
    },
    { type: "prompt", content: "" },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [history]);

  const addOutput = (type, content) => {
    setHistory((prev) => [
      ...prev.slice(0, -1),
      { type, content },
      { type: "prompt", content: "" },
    ]);
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    const lower = trimmed.toLowerCase();
    const parts = lower.split(/\s+/);
    const base = parts[0];
    const arg = parts.slice(1).join(" ");

    setHistory((prev) => [
      ...prev.slice(0, -1),
      { type: "input", content: `sourav@soc-terminal:~$ ${trimmed}` },
    ]);
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (lower === "") {
      setHistory((prev) => [...prev, { type: "prompt", content: "" }]);
      return;
    }

    if (lower === "clear") {
      setHistory([
        {
          type: "system",
          content: 'Terminal cleared. Type "help" for commands.',
        },
        { type: "prompt", content: "" },
      ]);
      return;
    }

    // Navigation
    if (base === "goto" || base === "go" || base === "cd" || base === "nav") {
      const target = arg || "";
      const sectionId = SECTION_MAP[target];
      if (sectionId) {
        addOutput("output", `Navigating to ${target}...`);
        setTimeout(() => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
        return;
      } else {
        addOutput(
          "error",
          `Unknown section "${target}". Valid: ${Object.keys(SECTION_MAP).join(", ")}`,
        );
        return;
      }
    }

    // Help
    if (lower === "help") {
      addOutput("output", HELP_TEXT);
      return;
    }

    // Profile
    if (lower === "whoami") {
      addOutput(
        "output",
        `Name:     ${profileData.name}\nRole:     ${profileData.role}\nOrg:      ${profileData.companyFull}\nLocation: ${profileData.location}\nTimezone: ${profileData.timezone}\nEmail:    ${profileData.email}\nGitHub:   ${profileData.github}\nLinkedIn: ${profileData.linkedin}`,
      );
      return;
    }
    if (lower === "bio") {
      addOutput("output", profileData.bio);
      return;
    }

    // Career
    if (lower === "missions") {
      addOutput(
        "output",
        'Active Missions:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n[1] Production-Grade SIEM Architecture\n[2] Custom Deception Environment\n[3] Automated TDR Pipeline\n[4] Cloud Infrastructure VAPT\n\nUse "goto missions" to view full deployment details.',
      );
      return;
    }
    if (base === "experience" && arg) {
      const num = parseInt(arg);
      if (!isNaN(num)) {
        addOutput("output", buildExperienceDetail(num));
        return;
      }
    }
    if (lower === "experience") {
      addOutput("output", buildExperienceOutput());
      return;
    }
    if (lower === "certs" || lower === "certifications") {
      addOutput("output", buildCertsOutput());
      return;
    }

    // Skills
    if (lower === "skills") {
      addOutput("output", buildSkillsOutput());
      return;
    }

    // Projects
    if (base === "project" && arg) {
      const id = parseInt(arg);
      if (!isNaN(id)) {
        addOutput("output", buildProjectDetail(id));
        return;
      }
    }
    if (lower === "projects") {
      addOutput("output", buildProjectsOutput());
      return;
    }

    // Labs
    if (lower === "labs") {
      addOutput("output", buildLabsExpOutput());
      return;
    }
    if (lower === "casestudies" || lower === "case-studies") {
      addOutput("output", buildCaseStudiesOutput());
      return;
    }

    // Contact & Resume
    if (lower === "resume") {
      addOutput("output", "Opening resume in new tab...");
      window.open(profileData.resumeUrl, "_blank");
      return;
    }

    // Secret
    if (lower === "secret") {
      addOutput("output", terminalCommands.secret.output);
      return;
    }

    // Cheat sheets
    if (commandCheatsheet[lower]) {
      const cheat = commandCheatsheet[lower];
      let output = `\n${cheat.description}\n`;
      output += `\n${"━".repeat(55)}\n\n`;
      output += "COMMON COMMANDS:\n";
      cheat.commands.forEach((c, i) => {
        output += `\n  ${i + 1}. ${c.cmd}\n     → ${c.desc}\n`;
      });
      output += `\n${"━".repeat(55)}\n\n`;
      output += "USE CASES:\n";
      cheat.useCases.forEach((useCase) => {
        output += `  • ${useCase}\n`;
      });
      addOutput("output", output);
      return;
    }

    // Fallback
    addOutput(
      "error",
      `Command not found: ${lower}\nType "help" for available commands.`,
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleCommand(input);
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || "");
      }
    }
  };

  const handleReset = () => {
    setHistory([
      { type: "system", content: 'Terminal reset. Type "help" for commands.' },
      { type: "prompt", content: "" },
    ]);
    setInput("");
    setCommandHistory([]);
    setHistoryIndex(-1);
  };

  return (
    <section
      id="terminal"
      className="relative px-4 py-8 md:py-12 bg-transparent"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 flex flex-col items-start w-full">
          <div className="flex w-full items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
                <TerminalIcon className="w-4 h-4" />[ SYSTEM_SHELL //
                INTERACTIVE ]
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Terminal <span className="text-emerald-500">Sandbox</span>
              </h2>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-600 rounded px-3 py-1.5 transition-all mt-2 md:mt-0"
            >
              <RotateCcw className="h-3.5 w-3.5" /> reset
            </button>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="bg-[#060606] border border-gray-700/50 rounded-lg overflow-hidden float-terminal">
          {/* Terminal Header */}
          <div className="bg-[#080808] border-b border-gray-800 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-[10px] text-gray-600 ml-2 font-mono">
              secure-sandbox@soc-terminal — bash
            </span>
          </div>

          {/* Terminal Content */}
          <div
            className="p-5 font-mono text-sm h-[520px] overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
            style={{ scrollbarWidth: "thin" }}
          >
            {history.map((entry, index) => {
              if (entry.type === "system") {
                return (
                  <div key={index} className="text-blue-400/70 mb-1.5 text-xs">
                    {entry.content}
                  </div>
                );
              }
              if (entry.type === "input") {
                return (
                  <div key={index} className="text-gray-300 mb-1.5 text-xs">
                    {entry.content}
                  </div>
                );
              }
              if (entry.type === "output") {
                return (
                  <pre
                    key={index}
                    className="text-emerald-400/80 mb-3 whitespace-pre-wrap text-xs"
                  >
                    {entry.content}
                  </pre>
                );
              }
              if (entry.type === "error") {
                return (
                  <pre
                    key={index}
                    className="text-red-400/70 mb-3 whitespace-pre-wrap text-xs"
                  >
                    {entry.content}
                  </pre>
                );
              }
              if (entry.type === "prompt") {
                return (
                  <div
                    key={index}
                    className="flex items-center text-gray-300 text-xs"
                  >
                    <span className="text-emerald-500 mr-2">
                      sourav@soc-terminal:~$
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none caret-emerald-500 text-gray-200"
                      autoFocus
                      spellCheck={false}
                    />
                    <span className="w-2 h-4 bg-emerald-500/50 typewriter-cursor inline-block" />
                  </div>
                );
              }
              return null;
            })}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Helper */}
        <div className="mt-3 text-center text-[10px] text-gray-300 font-mono">
          ↑/↓ navigate history • type "help" for all commands • "goto
          &lt;section&gt;" to navigate
        </div>
      </div>
    </section>
  );
};

export default TerminalSandbox;
