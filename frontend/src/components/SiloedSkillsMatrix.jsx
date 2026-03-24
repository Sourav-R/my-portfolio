import React, { useState } from 'react';
import { Terminal, Cloud, Key, Database, Shield, Network, ShieldAlert, Bug, Brackets, Server } from 'lucide-react';

const opsSkills = {
  INFRASTRUCTURE: [
    { id: 'linux', name: 'Linux / RHEL', icon: Terminal, status: 'PROD_READY', log: '> [MODULE] OS_INFRA\n> [SPEC] Hardened kernel parameters, managed user access via LDAP.\n> [EXP] Deployed and managed 50+ enterprise servers.' },
    { id: 'aws', name: 'AWS Cloud', icon: Cloud, status: 'PROD_READY', log: '> [MODULE] AWS_CLOUD_INFRA\n> [SPEC] Managed VPC peering, IAM role hardening, RDS schema isolation.\n> [EXP] Secured jago.ai microservices via granular security groups.' },
    { id: 'gpo', name: 'GPO / AD', icon: Key, status: 'PROD_READY', log: '> [MODULE] WIN_GOVERNANCE\n> [SPEC] Configured domain-wide Group Policy Objects.\n> [EXP] Enforced strict password policies and restricted lateral movement.' },
  ],
  ENGINEERING: [
    { id: 'elk', name: 'ELK Stack', icon: Database, status: 'PROD_READY', log: '> [MODULE] SIEM_ELK\n> [SPEC] Designed Elasticsearch topologies and Logstash pipelines.\n> [EXP] Ingested 10k EPS across global telecom nodes.' },
    { id: 'wazuh', name: 'Wazuh XDR', icon: Shield, status: 'PROD_READY', log: '> [MODULE] XDR_WAZUH\n> [SPEC] Deployed Wazuh agents for FIM and rootkit detection.\n> [EXP] Correlated endpoint logs with Suricata network alerts.' },
    { id: 'suricata', name: 'Suricata IDS', icon: Network, status: 'PROD_READY', log: '> [MODULE] IDS_SURICATA\n> [SPEC] Tuned rule sets for zero-day threat mitigation.\n> [EXP] Reduced false positives by 40% in enterprise network.' },
  ],
  OFFENSIVE: [
    { id: 'burp', name: 'Burp Suite', icon: ShieldAlert, status: 'PROD_READY', log: '> [MODULE] VAPT_PROXY\n> [SPEC] Intercepted and manipulated HTTP/S traffic.\n> [EXP] Identified IDOR and GraphQL vulnerabilities.' },
    { id: 'metasploit', name: 'Metasploit', icon: Bug, status: 'RESEARCH', log: '> [MODULE] EXPLOITATION\n> [SPEC] Developed custom payloads for memory corruption frameworks.\n> [EXP] Successfully bypassed AMSI in controlled lab environments.' },
    { id: 'zap', name: 'OWASP ZAP', icon: Shield, status: 'PROD_READY', log: '> [MODULE] DAST_SCANNER\n> [SPEC] Automated API vulnerability scanning in CI/CD pipelines.\n> [EXP] Integrated with GitHub Actions for pre-deployment checks.' },
  ],
  AUTOMATION: [
    { id: 'python', name: 'Python', icon: Brackets, status: 'PROD_READY', log: '> [MODULE] SCRIPTING_PY\n> [SPEC] Built automated threat intel parsers and alert handlers.\n> [EXP] Replaced legacy bash scripts, reducing execution time by 80%.' },
    { id: 'bash', name: 'Bash / Shell', icon: Terminal, status: 'PROD_READY', log: '> [MODULE] OS_AUTOMATION\n> [SPEC] Wrote init scripts, cron jobs, and log rotation utilities.\n> [EXP] Maintained custom hardening scripts for generic Linux images.' },
    { id: 'saltstack', name: 'SaltStack', icon: Server, status: 'RESEARCH', log: '> [MODULE] CONFIG_MGMT\n> [SPEC] Defined state files for declarative infrastructure enforcement.\n> [EXP] Automated deployment of centralized logging agents.' },
  ]
};

const SiloedSkillsMatrix = ({ onHoverSkill }) => {
  const [activeTab, setActiveTab] = useState('INFRASTRUCTURE');

  return (
    <div className="w-full flex flex-col gap-6">
      {/* The Header: Four minimalist text tabs */}
      <div className="flex flex-wrap gap-4 border-b border-gray-800 pb-2">
        {Object.keys(opsSkills).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[11px] font-mono tracking-widest pb-2 transition-all duration-200 relative ${
              activeTab === tab ? 'text-cyan-400 font-bold' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            [ {tab} ]
            {activeTab === tab && (
              <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-cyan-500"></span>
            )}
          </button>
        ))}
      </div>

      {/* The Body: 3x3 grid of Glassmorphism Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {opsSkills[activeTab].map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.id}
              onMouseEnter={() => onHoverSkill(skill.log)}
              onMouseLeave={() => onHoverSkill("> [SYSTEM] IDLE... WAITING FOR INPUT")}
              className="bg-[rgba(0,0,0,0.5)] border border-gray-800 hover:border-cyan-500/50 rounded-sm p-4 flex flex-col justify-between aspect-square group transition-colors cursor-crosshair"
            >
              <div className="flex justify-between items-start mb-4">
                <Icon className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                <span className={`text-[9px] font-mono px-1.5 py-0.5 border rounded-sm ${
                  skill.status === 'PROD_READY' 
                    ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' 
                    : 'text-purple-500 border-purple-500/20 bg-purple-500/5'
                }`}>
                  {skill.status}
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="text-gray-200 font-sans font-bold text-sm tracking-wide group-hover:text-white transition-colors">
                  {skill.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiloedSkillsMatrix;
