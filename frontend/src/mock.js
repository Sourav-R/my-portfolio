// Mock data for SOC-Professional Portfolio

export const profileData = {
  name: "Sourav Ramakrishna",
  role: "Jr. SOC Analyst & Home Lab Architect",
  company: "ThIRU Labs",
  location: "Melbourne, Australia",
  timezone: "Australia/Melbourne",
  email: "sourav@example.com",
  linkedin: "https://linkedin.com/in/souravramakrishna",
  github: "https://github.com/souravramakrishna",
  bio: "Infrastructure enthusiast with a passion for security operations and home lab architecture. Specializing in threat detection, network hardening, and 24/7 infrastructure management."
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
    title: "Automated Threat Detection System",
    description: "Built an automated threat detection pipeline using Python and machine learning to identify anomalous network traffic patterns.",
    tactics: ["Threat Detection", "Machine Learning", "Network Analysis"],
    stack: ["Python", "Scikit-learn", "Suricata", "ELK Stack"],
    securityFeatures: [
      "Real-time threat analysis",
      "Encrypted data transmission",
      "Role-based access control",
      "Audit logging"
    ],
    github: "https://github.com/sourav/threat-detection",
    demo: null,
    status: "production"
  },
  {
    id: 2,
    title: "Home Lab Security Dashboard",
    description: "Comprehensive security monitoring dashboard for home lab infrastructure with real-time alerts and incident tracking.",
    tactics: ["Security Monitoring", "Incident Response", "Log Analysis"],
    stack: ["React", "TypeScript", "Grafana API", "WebSocket"],
    securityFeatures: [
      "Multi-factor authentication",
      "End-to-end encryption",
      "Intrusion detection alerts",
      "Security event correlation"
    ],
    github: "https://github.com/sourav/homelab-dashboard",
    demo: "https://demo.homelab.local",
    status: "active"
  },
  {
    id: 3,
    title: "Network Hardening Toolkit",
    description: "Automated toolkit for network hardening and compliance checking across enterprise environments.",
    tactics: ["Network Hardening", "Compliance", "Vulnerability Assessment"],
    stack: ["Python", "Ansible", "Nmap", "OpenVAS"],
    securityFeatures: [
      "CIS benchmark compliance",
      "Automated vulnerability scanning",
      "Configuration management",
      "Compliance reporting"
    ],
    github: "https://github.com/sourav/network-hardening",
    demo: null,
    status: "beta"
  },
  {
    id: 4,
    title: "Incident Response Automation",
    description: "Automated incident response workflows with integration to SIEM and ticketing systems for faster threat mitigation.",
    tactics: ["Incident Response", "Automation", "SOAR Integration"],
    stack: ["Python", "REST API", "Wazuh", "TheHive"],
    securityFeatures: [
      "Automated playbook execution",
      "Chain of custody tracking",
      "Forensic data collection",
      "Integration with MITRE ATT&CK"
    ],
    github: "https://github.com/sourav/ir-automation",
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
