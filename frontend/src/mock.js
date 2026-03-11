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

export const advancedProjects = [
  {
    id: 1,
    title: "Multi-Campus IPSec VPN & Zero-Trust Perimeter Hardening",
    category: "Infrastructure Security",
    challenge: "Monash University required a secure, distributed infrastructure connecting three campuses (Clayton, Peninsula, and Caulfield) over the public internet. The business risk was lateral movement and unauthorized access to critical internal servers (FTP, SSH, Mail) from external or unauthorized internal nodes.",
    stack: ["GNS3", "Mikrotik RouterOS", "IPSec IKEv2", "ESP", "AES-256-GCM", "SHA256", "NAT", "Stateful Firewall"],
    protocols: ["IKEv2", "ESP", "AES-256-GCM", "SHA256", "modp2048", "TCP/UDP", "ICMP"],
    implementation: [
      "Architected a mesh network topology connecting three campuses via perimeter routers",
      "Established site-to-site IPSec VPN tunnels using ESP to encrypt all inter-campus traffic",
      "Configured stateful firewall with default-deny approach and specific ACLs",
      "Mitigated NAT traversal issues with bypass rules for IPSec tunnel traffic",
      "Utilized stateful inspection to allow return traffic while dropping unsolicited requests"
    ],
    outcomes: [
      "Wireshark captures proved all inter-campus traffic encapsulated within ESP packets",
      "Firewall rules successfully blocked unauthorized subnet access",
      "Zero downtime deployment across three campus sites"
    ],
    recruiterPoints: [
      "Designed highly secure, multi-site VPN architecture using IKEv2 and AES-256-GCM, ensuring military-grade encryption",
      "Implemented Zero-Trust firewall model, transitioning from flat network to strictly segmented architecture",
      "Successfully navigated complex routing challenges with NAT bypass rules for seamless IPSec functionality"
    ],
    difficulty: "Advanced",
    impact: "Enterprise"
  },
  {
    id: 2,
    title: "Next-Generation Enterprise Backbone & Wireless Architecture",
    category: "Network Infrastructure",
    challenge: "A public transport enterprise expanded from 350 to 650 employees across two new buildings. The business gap was lack of scalable, low-latency infrastructure capable of supporting high-density, data-intensive applications like high-resolution video conferencing.",
    stack: ["Cat6a/Cat7a Ethernet", "40Gbps Fiber", "Wi-Fi 6 (802.11ax)", "Cisco Catalyst 8500/9300x", "TP-Link Omada EAP660 HD", "IEEE 802.1Q", "OSPF", "LACP", "STP"],
    protocols: ["802.11ax", "VLAN", "OSPF", "LACP", "STP"],
    implementation: [
      "Designed hierarchical routed backbone connecting main office to new buildings via 40Gbps fiber",
      "Implemented Cisco Catalyst switches at core and distribution layers with Cat6a to endpoints",
      "Deployed high-density WLAN using Wi-Fi 6 APs strategically placed for concrete attenuation",
      "Chose routed backbone over switched to reduce ARP broadcast traffic",
      "Implemented hardware redundancy (RAID, dual servers) for continuous uptime"
    ],
    outcomes: [
      "Network mathematically proven to support 200 concurrent users at 60Mbps each",
      "40Gbps fiber backbone providing massive headroom for future scalability",
      "Zero broadcast storms and improved fault isolation"
    ],
    recruiterPoints: [
      "Architected enterprise-grade infrastructure with 40Gbps fiber backbones and Wi-Fi 6 for data-intensive environments",
      "Strategically utilized Layer 3 routed backbone to minimize broadcast storms and improve fault isolation",
      "Integrated comprehensive redundancy and high-availability protocols for business continuity"
    ],
    difficulty: "Advanced",
    impact: "Enterprise"
  },
  {
    id: 3,
    title: "Advanced Port Scanning & IDS Evasion Mechanics",
    category: "Offensive Security",
    challenge: "Internal Security Audit to evaluate IDS effectiveness against stealthy reconnaissance tactics used by APTs, and develop custom tooling to bypass rate-limiting heuristics.",
    stack: ["Python 3", "Nmap", "Snort IDS", "Open vSwitch", "Wireshark"],
    protocols: ["TCP", "UDP", "ICMP", "SYN/ACK/RST"],
    implementation: [
      "Configured SPAN/mirror port on Open vSwitch to feed traffic into Snort IDS",
      "Developed custom Python port scanner with multi-threading for TCP SYN scans",
      "Implemented port randomization (random.shuffle) and programmatic delays to evade detection",
      "Utilized TCP half-open scans to avoid 3-way handshake completion",
      "Tested UDP scanning reliability and firewall drop rules"
    ],
    outcomes: [
      "Custom scanner successfully mapped open ports without triggering Snort alerts",
      "Proved necessity for behavior-based anomaly detection over threshold rules",
      "Demonstrated packet-level understanding of TCP handshake manipulation"
    ],
    recruiterPoints: [
      "Developed custom Python-based network scanner capable of performing stealthy TCP SYN scans",
      "Successfully bypassed open-source IDS systems using programmatic evasion techniques",
      "Possess deep, packet-level understanding of TCP 3-way handshake and adversary exploitation methods"
    ],
    difficulty: "Advanced",
    impact: "Security Research"
  },
  {
    id: 4,
    title: "DNS Resilience & Cache Poisoning Threat Modeling",
    category: "Infrastructure Security",
    challenge: "DNS infrastructure vulnerability assessment demonstrating how attackers can intercept queries and redirect corporate traffic via cache poisoning and spoofing.",
    stack: ["Python", "Scapy", "BIND9"],
    protocols: ["ARP", "DNS", "UDP"],
    implementation: [
      "Executed two-phased attack: ARP poisoning for MITM positioning",
      "Utilized Scapy to sniff UDP port 53 and inject forged DNS responses",
      "Flooded BIND9 server with dummy queries while injecting spoofed responses",
      "Implemented Kaminsky-style attack with randomized transaction IDs",
      "Exploited lack of cryptographic authentication in standard DNS"
    ],
    outcomes: [
      "Successfully poisoned DNS cache forcing legitimate domains to resolve to attacker IPs",
      "Demonstrated critical need for DNSSEC implementation",
      "Bypassed resolver bailiwick rules with malicious glue records"
    ],
    recruiterPoints: [
      "Wrote custom packet-crafting scripts using Scapy for complex MITM attacks via ARP poisoning",
      "Successfully executed Kaminsky-style DNS cache poisoning, highlighting need for DNSSEC",
      "Deep understanding of DNS resolution mechanics and authority record manipulation"
    ],
    difficulty: "Expert",
    impact: "Critical Infrastructure"
  },
  {
    id: 5,
    title: "Public Key Infrastructure (PKI) & TLS Handshake Deep-Dive",
    category: "Cryptography",
    challenge: "Corporate web traffic vulnerable to eavesdropping and MITM attacks. Established private trust model and enforced modern cryptographic standards.",
    stack: ["OpenSSL", "Apache2", "X.509", "RSA-2048", "AES-128-GCM", "ECDHE"],
    protocols: ["TLS 1.2/1.3", "HTTPS", "SHA256/384"],
    implementation: [
      "Deployed internal Root Certificate Authority to establish chain of trust",
      "Generated RSA-2048 key pairs and CSRs for corporate web servers",
      "Configured Apache VirtualHosts to enforce HTTPS",
      "Analyzed TLS 1.2 handshake at packet level using Wireshark",
      "Deprecated legacy protocols (TLS 1.0/1.1) to prevent downgrade attacks"
    ],
    outcomes: [
      "Client browsers successfully verified X.509 certificate chain",
      "Packet analysis proved secure encryption using AES-GCM",
      "Perfect Forward Secrecy ensured via ECDHE key exchanges"
    ],
    recruiterPoints: [
      "Built and managed complete PKI, acting as internal Root CA to issue X.509 certificates",
      "Expert-level knowledge of TLS handshake with Wireshark packet analysis capability",
      "Actively hardened web servers against downgrade attacks (POODLE, BEAST)"
    ],
    difficulty: "Advanced",
    impact: "Enterprise"
  },
  {
    id: 6,
    title: "BGP Route Hijacking Emulation & Prefix Filtering",
    category: "Network Security",
    challenge: "BGP lacks built-in authentication. Simulated Infrastructure Vulnerability Assessment to emulate prefix hijacking and implement routing defenses.",
    stack: ["BGP", "Mikrotik RouterOS", "Autonomous Systems"],
    protocols: ["BGP", "AS_PATH", "ICMP"],
    implementation: [
      "Configured multiple BGP instances across four simulated Autonomous Systems",
      "Executed prefix hijacking by advertising specific /27 subnet",
      "Exploited BGP longest-prefix match routing logic for traffic redirection",
      "Engineered prefix filtering chains to discard unauthorized announcements",
      "Validated with routing tables and ICMP ping tests"
    ],
    outcomes: [
      "Successfully demonstrated BGP vulnerability to prefix hijacking",
      "Prefix filters blocked hijacked routes effectively",
      "Traffic returned to legitimate AS path after mitigation"
    ],
    recruiterPoints: [
      "Simulated complex exterior gateway routing attacks, executing and defending against BGP prefix hijacking",
      "Implemented rigorous BGP prefix filtering rules to secure routing tables",
      "Strong grasp of macro-level internet security including AS integration and RPKI deployment"
    ],
    difficulty: "Expert",
    impact: "Critical Infrastructure"
  },
  {
    id: 7,
    title: "Secure Mail Gateway & Protocol Authentication Implementation",
    category: "Communications Security",
    challenge: "Email remains primary vector for malware and phishing. Hardened SMTP server and implemented cryptographic guarantees for message authenticity and confidentiality.",
    stack: ["Postfix", "SMTP", "TLS", "OpenPGP", "S/MIME", "DKIM", "SPF", "DMARC"],
    protocols: ["SMTP", "TLS", "RSA", "AES", "Radix-64"],
    implementation: [
      "Installed and configured Postfix MTA with virtual alias maps",
      "Generated certificates to enforce TLS for SMTP connections",
      "Integrated OpenPGP and S/MIME for end-to-end encryption",
      "Implemented proper cryptographic operation sequencing (sign before encrypt)",
      "Deployed SPF, DKIM, and DMARC DNS records"
    ],
    outcomes: [
      "Packet captures confirmed transition from plaintext to encrypted TLS transit",
      "Email authentication triad established verifiable perimeter against spoofing",
      "End-to-end cryptography guaranteed confidentiality and non-repudiation"
    ],
    recruiterPoints: [
      "Engineered secure corporate email gateway using Postfix with mandatory TLS encryption",
      "Proficient in implementing complete email authentication triad (SPF, DKIM, DMARC)",
      "Hands-on experience deploying PGP and S/MIME for data confidentiality and non-repudiation"
    ],
    difficulty: "Advanced",
    impact: "Enterprise"
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
