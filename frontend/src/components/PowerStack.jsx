import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Terminal,
  Database,
  Server,
  Cloud,
  ShieldAlert,
  Key,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TiltCard from "./TiltCard";
import { useTerminal } from "../context/TerminalContext";

const powerStack = [
  {
    id: "linux",
    name: "Linux Admin",
    icon: Terminal,
    role: "OS / ENVIRONMENT",
    tab: "Infrastructure & Network",
    log: "$ uname -a\nLinux thiru-soc 6.1.0 #1 SMP x86_64 GNU/Linux\n$ systemctl status sshd\n● active (running) since Mon; 99.9% uptime",
  },
  {
    id: "elk",
    name: "ELK Stack",
    icon: Database,
    role: "SIEM / ANALYTICS",
    tab: "Infrastructure & Network",
    log: '$ curl -s localhost:9200/_cluster/health | jq .status\n"green"\n$ elasticsearch-service status\nCluster: thiru-prod | Nodes: 3 | Shards: 42',
  },
  {
    id: "python",
    name: "Python",
    icon: Server,
    role: "AUTOMATION / SCRIPTS",
    tab: "Software Development",
    log: "$ python3 --version\nPython 3.11.6\n$ wc -l ~/scripts/**/*.py\n12,847 total lines across 89 automation scripts",
  },
  {
    id: "aws",
    name: "AWS Cloud",
    icon: Cloud,
    role: "INFRASTRUCTURE",
    tab: "Cloud Engineering",
    log: '$ aws sts get-caller-identity\nAccount: ****-thiru-prod\n$ aws ec2 describe-instances --query "Reservations[].Instances[].State"\nrunning (7 instances)',
  },
  {
    id: "burp",
    name: "Burp Suite",
    icon: ShieldAlert,
    role: "VAPT / PROXY",
    tab: "Offensive Security",
    log: "$ burpsuite --project=jago-vapt\n[SCANNER] Active scan: 142 requests queued\n[FINDINGS] 3 High, 7 Medium, 12 Info\n[PROXY] Intercepting on 127.0.0.1:8080",
  },
  {
    id: "tpot",
    name: "T-Pot Deception",
    icon: Key,
    role: "ACTIVE DEFENSE",
    tab: "Infrastructure & Network",
    log: "$ docker ps | grep honeypot\n30+ active decoy containers\n$ tail -f fakebank/auth.log\n[ALERT] Malicious IP logged",
  },
];

const PowerStack = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const navigate = useNavigate();
  const { pushLog, clearLog } = useTerminal();

  return (
    <section className="relative px-4 py-16 overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="text-white">Power</span>{" "}
            <span className="text-cyan-500">Stack</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm max-w-md">
            &gt; Top 6 Daily Drivers for enterprise engineering and offensive
            security operations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {powerStack.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 20, scale: 0.9 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="cursor-pointer"
                onClick={() => {
                  if (tool.tab) {
                    navigate("/labs", { state: { filterTab: tool.tab } });
                  }
                }}
                onMouseEnter={() => pushLog(tool.log)}
                onMouseLeave={() => clearLog()}
              >
                <TiltCard intensity={10} scale={1.03} className="h-full">
                  <div className="glass-card p-5 flex flex-col items-center justify-center text-center group h-full min-h-[120px]">
                    <Icon className="w-8 h-8 text-gray-500 mb-3 group-hover:text-cyan-400 transition-colors duration-300" />
                    <h3 className="text-gray-100 font-bold text-sm mb-1 group-hover:text-cyan-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                      {tool.role}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={() => {
            document.body.classList.add("terminal-glitch-active");
            setTimeout(() => {
              document.body.classList.remove("terminal-glitch-active");
              navigate("/ops");
            }, 200);
          }}
          className="w-full sm:w-auto px-6 py-3 border border-cyan-500/30 bg-white/5 hover:bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold tracking-widest rounded-lg transition-all flex justify-center items-center gap-2 group"
        >
          [ VIEW FULL TECHNICAL MATRIX IN ~/ops ]
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default PowerStack;
