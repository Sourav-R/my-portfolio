import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield,
  Activity,
  Network,
  ChevronRight,
  Lock,
  Database,
  GitBranch,
  X,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TiltCard from "./TiltCard";
import { useTerminal } from "../context/TerminalContext";

const highlightMetrics = (text) => {
  if (!text) return text;
  const regex =
    /(100%|390\+|40\+|1,000\+|<60s|~40%|30\+|25%|30%|200\+|1,247|45,000|347|\b15\b|\b6\b|\b45\b|\b35\b|\b40\b|\b25\b|\b3\b|\b5\b)/g;
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span
        key={i}
        className="text-[#e95309] font-bold drop-shadow-[0_0_8px_rgba(233,83,9,0.4)]"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const statIcons = {
  "LAMP Stack": { type: "brand", slug: "linux", color: "FCC624" },
  "TLS/SSL Secure": { type: "lucide", icon: Lock, color: "#63e6be" },
  "Storage Optimized": { type: "lucide", icon: Database, color: "#a0a0a0" },
  "Kibana Dashboards": { type: "brand", slug: "kibana", color: "005571" },
  "Kibana EQL": { type: "brand", slug: "kibana", color: "005571" },
  Logstash: { type: "brand", slug: "logstash", color: "00bfb3" },
  "Fileless Malware Auth": { type: "lucide", icon: Shield, color: "#ff6b6b" },
  "30+ Honeypots": { type: "lucide", icon: Network, color: "#d0bfff" },
  "Python Flask": { type: "brand", slug: "flask", color: "ffffff" },
  "NGINX Reverse Proxy": { type: "brand", slug: "nginx", color: "009639" },
  "Network Scanners": { type: "lucide", icon: Activity, color: "#00bfb3" },
  "Index Routing": { type: "brand", slug: "elasticsearch", color: "FF9900" },
};

const missions = [
  {
    id: "siem",
    title: "Production-Grade SIEM Architecture",
    subtitle: "ELK Stack & GLPI Integration",
    icon: Database,
    color: "emerald",
    cols: "col-span-1 md:col-span-2 md:row-span-2",
    description:
      'Engineered a multi-node Elastic Security cluster from bare metal and integrated a "source of truth" GLPI ITAM platform to contextualize enterprise SIEM alerts.',
    stats: ["LAMP Stack", "TLS/SSL Secure", "Storage Optimized"],
    log: `[SYS_LOG] Provisioning hardened LAMP stack for GLPI 10
[CONFIG] Apache VirtualHost mapping secure /public DocumentRoot
[MYSQL] Enforcing mysql_native_password authentication
[STATUS] 390+ tables initialized via CLI. SLA mapping synced.`,
    extendedDetails: {
      situation:
        'Required a centralized "source of truth" to contextualize real-time Elastic Security alerts and track asset data across a distributed enterprise network.',
      actions: [
        "Built a hardened LAMP stack tailored for GLPI 10 asset inventory, configuring a dedicated Apache VirtualHost mapping to the secure /public DocumentRoot.",
        "Resolved MySQL 8.0 PHP compatibility by forcing mysql_native_password authentication.",
        "Executed a complete CLI-based installation, manually initializing 390+ interconnected database tables to map the entire organizational taxonomy.",
        "Integrated OS timezone databases directly into MySQL system tables to guarantee accurate ticketing SLAs.",
      ],
      impact:
        "Established a unified pipeline capable of contextualizing 100% of live SIEM alerts with precise device ownership, effectively reducing analyst context-switching during triage by ~40%.",
    },
  },
  {
    id: "tdr",
    title: "Automated TDR Pipeline",
    subtitle: "Elastic Security & Logstash",
    icon: Shield,
    color: "purple",
    cols: "col-span-1 md:col-span-1",
    description:
      "Engineered an automated pipeline bridging Elastic Security and Logstash to detect Living-off-the-Land (LotL) threats and forward alerts via SMTP.",
    stats: ["Kibana EQL", "Logstash", "Fileless Malware Auth"],
    log: `[ALERT] Malicious PowerShell "Download Cradle" detected
[EQL] Execution policy bypass matching LotL signatures
[ACTION] Thiru-mail.conf Logstash bridge triggered
[STATUS] Structured SMTP alert forwarded to SOC.`,
    extendedDetails: {
      situation:
        "Needed an automated pipeline to detect Living-off-the-Land (LotL) threats and securely forward critical telemetry alerts to the defense team.",
      actions: [
        "Engineered an Elastic Security EQL rule to detect stealthy PowerShell 'Download Cradles' executing in memory (IEX, Bypass, Hidden).",
        "Configured a hardened Logstash pipeline (ssl_enabled => true) to query remote internal indices at exact 60-second intervals.",
        "Resolved Java PKIX Path Building failures by bypassing untrusted certificates during internal network extraction.",
        "Automated SMTP payload forwarding via Logstash output modules, accurately resolving organization MX records (mail.thiru.au).",
      ],
      impact:
        "Achieved sub-minute (<60s) detection thresholds and automated structured SMTP alerting for critical fileless malware executions (e.g., PowerShell LotL attacks), eliminating manual polling.",
    },
  },
  {
    id: "honeypot",
    title: "Custom Deception Environment",
    subtitle: 'T-Pot & "FakeBank"',
    icon: Network,
    color: "blue",
    cols: "col-span-1 md:col-span-1",
    description:
      "Deployed a high-interaction deception platform with 30+ Docker honeypots to safely capture and log modern automated attack scripts.",
    stats: ["30+ Honeypots", "Python Flask", "NGINX Reverse Proxy"],
    log: `[DECOY] "FakeBank" application online
[TRAFFIC] Attacker IP detected routing through NGINX
[CAPTURE] Payload and login attempts logged via fakebank_logger
[VISUALIZE] Enriched telemetry streaming to Elasticsearch.`,
    extendedDetails: {
      situation:
        "Needed a safe, high-interaction environment to capture live threat intelligence and profile attackers actively probing infrastructure borders.",
      actions: [
        "Architected a multi-layered T-Pot honeypot network featuring 30+ virtualized decoys to safely capture 1,000+ automated probing attempts per week.",
        'Deployed a custom "FakeBank" application using Python Flask operated safely behind an NGINX reverse proxy.',
        "Routed 100% of intrusion telemetry back to the central Elasticsearch cluster for real-time visualization and pattern matching.",
      ],
      impact:
        "Successfully captured lateral movement techniques and zero-day payload drops, continuously feeding the THIRU threat intelligence dataset.",
    },
  },
  {
    id: "discovery",
    title: "SIEM Network Discovery",
    subtitle: "Dashboards & GLPI Automation",
    icon: Activity,
    color: "red",
    cols: "col-span-1 md:col-span-3",
    description:
      "Engineering real-time Elastic Dashboards to visualize daily index capacity while architecting automated GLPI network discovery sweeps.",
    stats: ["Kibana Dashboards", "Network Scanners", "Index Routing"],
    log: `[OPS] Creating dashboard: index_size_growth_per_day
[DATA_VIEW] New data views established for telemetry stream
[SCAN] Initiating GLPI automated network/device sweep
[STATUS] CMH agent deployments actively polling endpoints.`,
    extendedDetails: {
      situation:
        "Required continuous monitoring of massive telemetry ingest rates and automated tracking of unauthorized/untracked assets across physical network segments.",
      actions: [
        "Designed and implemented custom Kibana dashboards to visually track Elasitc index size growth and storage thresholds per day.",
        "Created optimized Data Views to streamline threat-hunting queries across highly-partitioned telemetry streams.",
        "Configured GLPI to execute fully automated hardware/network discovery sweeps to identify unauthorized devices.",
        "Successfully completed remote CMH deployments across 40+ endpoint devices in isolated corporate segments after-hours, scanning multiple /24 subnets.",
      ],
      impact:
        "Provided the SOC with immediate visual insights into storage capacity thresholds while eliminating asset management blind spots across 100% of the physical Marsden Park network.",
    },
  },
];

const ActiveMissions = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const navigate = useNavigate();
  const { pushLog, clearLog } = useTerminal();
  const [selectedMission, setSelectedMission] = useState(null);

  return (
    <section
      id="active-missions"
      className="relative px-4 py-8 md:py-12 overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 flex flex-col items-start">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            [ ACTIVE_MISSIONS // ENGINEERING_SCALE ]
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Active <span className="text-cyan-500">Missions</span>
          </h2>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-4">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 40, rotate: 2 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotate: 0 }
                    : { opacity: 0, y: 40, rotate: 2 }
                }
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={mission.cols}
                onMouseEnter={() => pushLog(mission.log)}
                onMouseLeave={() => clearLog()}
                onClick={() => setSelectedMission(mission)}
              >
                <TiltCard
                  intensity={8}
                  scale={1.02}
                  className="h-full cursor-pointer"
                >
                  <div className="glass-card h-full relative overflow-hidden p-6 flex flex-col group hover:border-gray-500 transition-colors">
                    {/* Background glow */}
                    <div
                      className={`absolute top-0 right-0 w-64 h-64 bg-${mission.color}-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-${mission.color}-500/20 transition-colors duration-500`}
                    />

                    <div className="relative z-10 flex flex-col h-full pointer-events-none">
                      <div className="flex justify-between items-start mb-6">
                        <div
                          className={`w-12 h-12 bg-black/40 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-${mission.color}-500/30 transition-colors`}
                        >
                          <Icon
                            className={`w-6 h-6 text-${mission.color}-500`}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-gray-600 tracking-widest bg-white/5 px-2 py-1 rounded">
                          PROD_READY
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-1 leading-tight group-hover:text-white transition-colors">
                        {mission.title}
                      </h3>
                      <p
                        className={`text-xs font-mono text-${mission.color}-400 mb-4 tracking-wide`}
                      >
                        &gt; {mission.subtitle}
                      </p>

                      <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow max-w-lg">
                        {mission.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {mission.stats.map((stat, i) => {
                          const iconMeta = statIcons[stat] || {
                            type: "lucide",
                            icon: Activity,
                            color: "#a0a0a0",
                          };
                          return (
                            <span
                              key={i}
                              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-gray-300 bg-white/5 group-hover:bg-white/10 transition-colors px-2.5 py-1.5 border border-white/5 rounded-sm shadow-sm cursor-default pointer-events-auto"
                            >
                              {iconMeta.type === "brand" ? (
                                <img
                                  src={`https://cdn.simpleicons.org/${iconMeta.slug}/${iconMeta.color.replace("#", "")}`}
                                  alt={stat}
                                  className="w-3.5 h-3.5 opacity-90"
                                  style={{
                                    filter: `drop-shadow(0 0 4px #${iconMeta.color.replace("#", "")}60)`,
                                  }}
                                />
                              ) : (
                                <iconMeta.icon
                                  size={14}
                                  color={iconMeta.color}
                                  className="opacity-90"
                                  style={{
                                    filter: `drop-shadow(0 0 4px ${iconMeta.color}60)`,
                                  }}
                                />
                              )}
                              {stat}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deep Dive Modal (Holographic Pop-up) */}
      <AnimatePresence>
        {selectedMission && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            style={{ pointerEvents: "auto" }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMission(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`mission-${selectedMission.id}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#050505] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              {(() => {
                const IconComp = selectedMission.icon;
                const mColor = selectedMission.color;

                return (
                  <>
                    {/* Topbar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#080808]">
                      <div className="flex items-center gap-3">
                        <IconComp className={`w-5 h-5 text-${mColor}-500`} />
                        <h2 className="text-lg font-bold text-white font-mono">
                          {selectedMission.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => setSelectedMission(null)}
                        className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Context */}
                        <div className="lg:col-span-2 space-y-6">
                          {/* Situation */}
                          <div className="bg-[#0a0a0a] rounded-lg p-5 border border-gray-800/50 relative overflow-hidden">
                            <div
                              className={`absolute left-0 top-0 bottom-0 w-1 bg-${mColor}-500`}
                            />
                            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full bg-${mColor}-500 animate-pulse`}
                              />
                              [S] Situation & Objective
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {selectedMission.extendedDetails.situation}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="space-y-4">
                            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 flex items-center gap-2">
                              <CheckCircle2
                                className={`w-3 h-3 text-${mColor}-500`}
                              />
                              [A] Actions Taken & Solution
                            </h4>
                            <div className="bg-[#080808] border border-gray-800 rounded-lg p-4 font-mono text-sm text-gray-300">
                              <ul className="space-y-3">
                                {selectedMission.extendedDetails.actions.map(
                                  (act, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-3"
                                    >
                                      <span className="text-gray-600 select-none mt-0.5">
                                        &gt;
                                      </span>
                                      <span className="leading-relaxed text-xs">
                                        {highlightMetrics(act)}
                                      </span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                          {/* Impact */}
                          <div
                            className={`bg-[#080808] rounded-lg p-5 border border-${mColor}-500/30 group`}
                          >
                            <h4
                              className={`text-[10px] uppercase font-mono tracking-widest text-${mColor}-400 mb-3`}
                            >
                              [R] Result / Impact
                            </h4>
                            <p className="text-sm text-gray-200 font-medium leading-relaxed">
                              {highlightMetrics(
                                selectedMission.extendedDetails.impact,
                              )}
                            </p>
                          </div>

                          {/* Tech Stack List */}
                          <div>
                            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-3">
                              Core Engine
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedMission.stats.map((tech, i) => (
                                <span
                                  key={i}
                                  className={`text-xs px-2.5 py-1 bg-[#111] border border-${mColor}-500/20 text-${mColor}-100 rounded-md font-mono`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Technical Deep Dive Terminal */}
                      <div className="mt-8 border border-gray-800 rounded-lg overflow-hidden bg-[#030303]">
                        <div className="flex items-center px-4 py-2 border-b border-gray-800 bg-[#0a0a0a]">
                          <div className="flex gap-1.5 mr-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                          </div>
                          <span className="text-xs font-mono text-gray-500">
                            {selectedMission.id}_logstream.sh
                          </span>
                        </div>
                        <div className="p-5 font-mono text-sm leading-relaxed space-y-4">
                          {selectedMission.log.split("\n").map((line, idx) => {
                            let lineStyle = "text-gray-400";
                            if (
                              line.includes("[ALERT]") ||
                              line.includes("[ATTACK]")
                            )
                              lineStyle = "text-red-400";
                            else if (
                              line.includes("[SYS_LOG]") ||
                              line.includes("[ACTION]") ||
                              line.includes("[AUTOMATION]")
                            )
                              lineStyle = "text-emerald-400";
                            else if (
                              line.includes("[PIPELINE]") ||
                              line.includes("[EQL]") ||
                              line.includes("[CAPTURE]")
                            )
                              lineStyle = "text-cyan-400";
                            else if (
                              line.includes("[STATUS]") ||
                              line.includes("[RESULT]")
                            )
                              lineStyle = "text-yellow-400";
                            else if (
                              line.includes("[OPS]") ||
                              line.includes("[DATA_VIEW]") ||
                              line.includes("[SCAN]")
                            )
                              lineStyle = "text-blue-400";

                            return (
                              <div key={idx} className={lineStyle}>
                                <span className="text-gray-600 mr-2">&gt;</span>
                                {line}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ActiveMissions;
