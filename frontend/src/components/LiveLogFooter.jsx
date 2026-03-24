import React from 'react';
import { motion } from 'framer-motion';

const logs = [
  "[LOG] TLS Certs Validated for Fleet Server",
  "[LOG] Hardened AWS RDS Schema Isolation",
  "[LOG] Resolved Electron-Python Bridge Latency",
  "[LOG] Deployed Wazuh Agents to 50+ Endpoints",
  "[LOG] Tuned Suricata Ruleset for Zero-Day Mitigation",
  "[LOG] Automated VPC Peering via Terraform",
];

const LiveLogFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-[#020202] border-t border-gray-800 z-50 flex items-center overflow-hidden">
      <div className="w-16 h-full bg-[#050505] border-r border-gray-800 flex items-center justify-center flex-shrink-0 z-10 shadow-[5px_0_10px_rgba(0,0,0,0.5)]">
        <span className="w-2 h-2 bg-emerald-500 rounded-sm animate-pulse"></span>
      </div>
      
      <div className="flex-1 overflow-hidden relative flex">
        {/* We use two identical motion divs for infinite seamless scrolling */}
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex whitespace-nowrap items-center min-w-full"
        >
          {logs.map((log, i) => (
            <div key={i} className="mx-8 font-mono text-[10px] sm:text-xs">
              <span className="text-cyan-500 mr-2">[SYS_LOG]</span>
              <span className="text-gray-400">{log}</span>
            </div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex whitespace-nowrap items-center min-w-full"
          aria-hidden="true"
        >
          {logs.map((log, i) => (
            <div key={`copy-${i}`} className="mx-8 font-mono text-[10px] sm:text-xs">
              <span className="text-cyan-500 mr-2">[SYS_LOG]</span>
              <span className="text-gray-400">{log}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LiveLogFooter;
