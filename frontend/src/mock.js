// Mock data for SOC-Professional Portfolio

export const profileData = {
  name: "Sourav Ramakrishna",
  role: "Jr. SOC Analyst & Home Lab Architect",
  company: "ThIRU Labs",
  companyFull: "THIRU (Threat Incident and Response Unit)",
  location: "Melbourne, Australia",
  timezone: "Australia/Melbourne",
  email: "Sourav.rk.21@gmail.com",
  phone: "+61 493670389",
  linkedin: "https://linkedin.com/in/sourav-ramakrishna",
  github: "https://github.com/souravramakrishna",
  resumeUrl: "https://customer-assets.emergentagent.com/job_ringwood-secure/artifacts/gqj74rvj_Sourav_Ramakrishna_Jr.SOC_analyst.pdf",
  bio: "Based in Melbourne, I am a Jr. SOC Analyst at ThIRU (Threat Incident and Response Unit). I specialize in bridging the gap between proactive infrastructure management and reactive threat defense. When I'm not monitoring live incident logs or hardening client environments, I'm architecting my own private cloud infrastructure. My approach to security is grounded in the philosophy that you can't defend what you don't understand—which is why I spend my time breaking and building systems in my Proxmox-based home lab."
};

export const securityStatus = {
  level: "Low",
  uptime: "99.8%",
  lastScan: "2 hours ago",
  activeMonitoring: true
};

export const homeLabServices = [
  {
    id: 1,
    name: "Proxmox VE",
    type: "Virtualization",
    status: "running",
    uptime: "99.9%",
    cpu: "12%",
    memory: "45%",
    containers: 8
  },
  {
    id: 2,
    name: "Docker Swarm",
    type: "Container Orchestration",
    status: "running",
    uptime: "99.7%",
    cpu: "23%",
    memory: "62%",
    containers: 15
  },
  {
    id: 3,
    name: "pfSense Firewall",
    type: "Network Security",
    status: "running",
    uptime: "100%",
    cpu: "8%",
    memory: "28%",
    containers: 0
  },
  {
    id: 4,
    name: "Wazuh SIEM",
    type: "Security Monitoring",
    status: "running",
    uptime: "98.5%",
    cpu: "15%",
    memory: "38%",
    containers: 3
  },
  {
    id: 5,
    name: "Nginx Reverse Proxy",
    type: "Web Server",
    status: "running",
    uptime: "99.9%",
    cpu: "5%",
    memory: "18%",
    containers: 2
  },
  {
    id: 6,
    name: "Grafana + Prometheus",
    type: "Monitoring",
    status: "running",
    uptime: "99.2%",
    cpu: "10%",
    memory: "32%",
    containers: 4
  }
];

export const projects = [
  {
    id: 1,
    title: "Brief 01: T-Pot \"Fakebank\" Honeypot & ELK Integration",
    mission: "Deployed a custom T-Pot environment disguised as a banking portal to capture and visualize live credential harvesting attempts.",
    stack: ["T-Pot", "Elastic Stack (ELK)", "Docker", "Debian"],
    threatMitigated: "Identified and blacklisted over 50+ unique malicious IPs within 48 hours, neutralizing automated brute-force scripts before they could pivot to production-adjacent targets.",
    github: "https://github.com/sourav/tpot-honeypot",
    demo: null,
    status: "active"
  },
  {
    id: 2,
    title: "Brief 02: Automated Infrastructure Hardening (SaltStack)",
    mission: "Built a scalable configuration management system using Python and SaltStack to automate server hardening based on CIS Benchmarks.",
    stack: ["SaltStack", "Python", "Linux (Ubuntu/RHEL)"],
    threatMitigated: "Prevented 'Configuration Drift'—an automated audit-and-revert cycle ensures that unauthorized changes to critical system files are neutralized and restored to a secure state within 60 seconds.",
    github: "https://github.com/sourav/saltstack-hardening",
    demo: null,
    status: "production"
  },
  {
    id: 3,
    title: "Brief 03: The \"Ringwood\" Private Cloud (Home Lab)",
    mission: "Architecture of a high-availability virtualization environment for malware analysis and network traffic monitoring.",
    stack: ["Proxmox VE", "Docker", "pfSense", "Pi-hole"],
    threatMitigated: "Lateral Movement Risk—Implemented strict VLAN segmentation to ensure that even if a lab environment is compromised during a malware analysis session, the host network and primary data remain logically isolated and unreachable.",
    github: "https://github.com/sourav/ringwood-homelab",
    demo: null,
    status: "active"
  }
];

export const skills = {
  security: [
    "Threat Detection & Analysis",
    "Security Information and Event Management (SIEM)",
    "Incident Response",
    "Network Security",
    "Vulnerability Assessment",
    "Log Analysis",
    "MITRE ATT&CK Framework"
  ],
  infrastructure: [
    "Proxmox Virtualization",
    "Docker & Container Orchestration",
    "Linux System Administration",
    "Network Architecture",
    "Server Management",
    "Backup & Disaster Recovery",
    "Infrastructure as Code"
  ],
  tools: [
    "Wazuh",
    "Suricata",
    "pfSense",
    "ELK Stack",
    "Grafana",
    "Prometheus",
    "Wireshark",
    "Nmap",
    "Metasploit",
    "Ansible"
  ],
  programming: [
    "Python",
    "Bash Scripting",
    "JavaScript/TypeScript",
    "SQL",
    "PowerShell"
  ]
};

export const terminalCommands = {
  help: {
    output: `Available commands:
  help        - Show this help message
  whoami      - Display profile information
  skills      - List technical skills
  projects    - Show recent projects
  contact     - Display contact information
  lab         - Show home lab status
  secret      - ???
  clear       - Clear terminal

Type any command to execute.`
  },
  whoami: {
    output: `Name: ${profileData.name}
Role: ${profileData.role}
Company: ${profileData.company}
Location: ${profileData.location}
Passion: Infrastructure & Security Operations`
  },
  skills: {
    output: `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Security Operations:
  • Threat Detection & Analysis
  • SIEM (Wazuh, Splunk)
  • Incident Response
  
Infrastructure:
  • Proxmox Virtualization
  • Docker Orchestration
  • Linux Administration
  
Programming:
  • Python, Bash, JavaScript/TypeScript
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
  },
  projects: {
    output: `Recent Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[1] Automated Threat Detection System
[2] Home Lab Security Dashboard
[3] Network Hardening Toolkit
[4] Incident Response Automation

Use project ID for more details.`
  },
  contact: {
    output: `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:    ${profileData.email}
LinkedIn: ${profileData.linkedin}
GitHub:   ${profileData.github}

Preferred: Email or LinkedIn`
  },
  lab: {
    output: `Home Lab Status:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Uptime: 99.8%
Active Services: 6
Total Containers: 32
Security Level: SECURE

All systems operational.`
  },
  secret: {
    output: `Accessing classified data...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Interests:
{
  "reading": "The Mortal Instruments",
  "tech": "S25 Ultra Architecture",
  "hobby": "24/7 Home Lab Tinkering",
  "coffee_consumption": "excessive"
}

You found the easter egg! 🎯`
  },
  clear: {
    output: "CLEAR_TERMINAL"
  }
};

export const currentInterests = {
  reading: "The Mortal Instruments",
  tech: "S25 Ultra Architecture",
  hobby: "24/7 Home Lab Management"
};
