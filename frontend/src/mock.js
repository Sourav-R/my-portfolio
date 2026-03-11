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

export const allProjects = [
  // ---- INFRASTRUCTURE & NETWORK ----
  {
    id: 1, title: "Multi-Campus IPSec VPN & Zero-Trust Architecture", tab: "Infrastructure & Network",
    subtitle: "Enterprise-scale secure network connecting 3 campuses",
    challenge: "Secured distributed infrastructure for Monash University across Clayton, Peninsula, and Caulfield campuses, preventing lateral movement and unauthorized access.",
    stack: ["IPSec IKEv2", "AES-256-GCM", "Mikrotik RouterOS", "GNS3", "Zero-Trust Model", "Stateful Firewall"],
    highlights: ["Mesh topology with site-to-site IPSec VPN tunnels", "Default-deny firewall with strict ACLs", "NAT bypass for seamless tunnel traffic", "100% ESP encapsulation verified via Wireshark"],
    impact: "Zero-downtime deployment with military-grade encryption", difficulty: "Advanced", type: "Enterprise",
    questions: []
  },
  {
    id: 2, title: "Next-Gen Enterprise Network (40Gbps Backbone)", tab: "Infrastructure & Network",
    subtitle: "Scalable infrastructure for 650-employee enterprise",
    challenge: "Architected high-performance network for public transport company supporting 200 concurrent users at 60Mbps each.",
    stack: ["40Gbps Fiber", "Wi-Fi 6 (802.11ax)", "Cisco Catalyst 9300x", "OSPF", "VLAN", "Layer 3 Routing"],
    highlights: ["40Gbps fiber backbone with hierarchical architecture", "Layer 3 routing to eliminate broadcast storms", "Strategic Wi-Fi 6 AP placement", "Built-in hardware redundancy (RAID, dual servers)"],
    impact: "12Gbps total capacity with enterprise-grade redundancy", difficulty: "Advanced", type: "Enterprise",
    questions: []
  },
  {
    id: 3, title: "Custom IDS Evasion & Port Scanner", tab: "Infrastructure & Network",
    subtitle: "Python-based stealth reconnaissance tool",
    challenge: "Developed custom scanner to test IDS effectiveness against advanced persistent threat tactics and signature-based detection.",
    stack: ["Python 3", "TCP SYN Scanning", "Snort IDS", "Scapy", "Multi-threading", "Evasion Techniques"],
    highlights: ["Multi-threaded TCP half-open (SYN) scanner", "Port randomization and timing delays", "Bypassed Snort community rulesets", "Packet-level TCP handshake manipulation"],
    impact: "Proved need for behavioral detection beyond signatures", difficulty: "Advanced", type: "Security Research",
    questions: []
  },
  {
    id: 4, title: "DNS Cache Poisoning Attack Simulation", tab: "Infrastructure & Network",
    subtitle: "Kaminsky-style attack demonstrating DNS vulnerability",
    challenge: "Executed sophisticated DNS cache poisoning via ARP spoofing and forged response injection to demonstrate DNSSEC necessity.",
    stack: ["Python", "Scapy", "BIND9", "ARP Poisoning", "DNS Spoofing", "Packet Crafting"],
    highlights: ["ARP poisoning for MITM positioning", "Malicious DNS responses with Scapy", "Kaminsky attack with randomized transaction IDs", "Successfully redirected legitimate domain traffic"],
    impact: "Exploited DNS trust model — demonstrated DNSSEC necessity", difficulty: "Expert", type: "Critical Infrastructure",
    questions: []
  },
  {
    id: 5, title: "Enterprise PKI & Certificate Management", tab: "Infrastructure & Network",
    subtitle: "Internal CA with TLS 1.3 enforcement",
    challenge: "Established private Root CA and enforced modern cryptographic standards to prevent eavesdropping and MITM attacks.",
    stack: ["OpenSSL", "X.509 Certificates", "RSA-2048", "ECDHE", "TLS 1.3", "Apache2", "PFS"],
    highlights: ["Internal Root CA with certificate chain validation", "RSA-2048 certificates for web servers", "ECDHE for Perfect Forward Secrecy", "Deprecated TLS 1.0/1.1 against downgrade attacks"],
    impact: "Complete PKI infrastructure preventing POODLE/BEAST attacks", difficulty: "Advanced", type: "Enterprise",
    questions: []
  },
  {
    id: 6, title: "BGP Hijacking & Route Security", tab: "Infrastructure & Network",
    subtitle: "Border Gateway Protocol attack simulation",
    challenge: "Simulated BGP prefix hijacking across multiple Autonomous Systems to demonstrate routing vulnerabilities.",
    stack: ["BGP", "Autonomous Systems", "Mikrotik RouterOS", "Prefix Filtering", "AS_PATH", "Route Validation"],
    highlights: ["Configured 4 Autonomous Systems with BGP peering", "/27 prefix hijacking via longest-match exploit", "Prefix filtering to block malicious routes", "Validated mitigation with routing table analysis"],
    impact: "Internet-scale security understanding with RPKI knowledge", difficulty: "Expert", type: "Critical Infrastructure",
    questions: []
  },
  {
    id: 7, title: "Secure Email Gateway (SPF/DKIM/DMARC)", tab: "Infrastructure & Network",
    subtitle: "Hardened mail infrastructure with cryptographic auth",
    challenge: "Implemented comprehensive email security stack combining transport encryption and end-to-end cryptography.",
    stack: ["Postfix MTA", "TLS", "OpenPGP", "S/MIME", "DKIM", "SPF", "DMARC"],
    highlights: ["Postfix with mandatory TLS encryption", "SPF, DKIM, DMARC for domain authentication", "OpenPGP and S/MIME for E2E encryption", "Proper cryptographic operation sequencing"],
    impact: "Complete email security triad with non-repudiation guarantee", difficulty: "Advanced", type: "Enterprise",
    questions: []
  },
  {
    id: 8, title: "T-Pot Honeypot & ELK Integration", tab: "Infrastructure & Network",
    subtitle: "Banking portal decoy for live threat intelligence",
    challenge: "Deployed a custom T-Pot environment disguised as a banking portal to capture and visualize live credential harvesting attempts.",
    stack: ["T-Pot", "Elastic Stack (ELK)", "Docker", "Debian"],
    highlights: ["Custom honeypot disguised as banking portal", "Real-time credential harvesting capture", "ELK-powered threat visualization dashboard", "50+ unique malicious IPs blacklisted in 48 hours"],
    impact: "Neutralized automated brute-force scripts before production pivot", difficulty: "Advanced", type: "Enterprise",
    questions: []
  },
  {
    id: 9, title: "Automated Infrastructure Hardening (SaltStack)", tab: "Infrastructure & Network",
    subtitle: "CIS Benchmark-based automated server hardening",
    challenge: "Built a scalable configuration management system to automate server hardening based on CIS Benchmarks.",
    stack: ["SaltStack", "Python", "Linux (Ubuntu/RHEL)", "CIS Benchmarks"],
    highlights: ["Automated audit-and-revert cycle", "CIS Benchmark compliance enforcement", "Configuration drift prevention", "Unauthorized changes reverted within 60 seconds"],
    impact: "Prevented configuration drift with 60-second auto-remediation", difficulty: "Advanced", type: "Enterprise",
    questions: []
  },
  {
    id: 10, title: "Ringwood Private Cloud (Home Lab)", tab: "Infrastructure & Network",
    subtitle: "HA virtualization for malware analysis & monitoring",
    challenge: "Architecture of a high-availability virtualization environment for malware analysis and network traffic monitoring.",
    stack: ["Proxmox VE", "Docker", "pfSense", "Pi-hole", "VLAN Segmentation"],
    highlights: ["High-availability Proxmox cluster", "Strict VLAN segmentation for isolation", "Dedicated malware analysis environment", "Host network logically isolated from lab VMs"],
    impact: "Zero lateral movement risk during active malware analysis", difficulty: "Advanced", type: "Enterprise",
    questions: []
  },
  // ---- CLOUD ENGINEERING ----
  {
    id: 11, title: "CloudDetect Web Service & Kubernetes Orchestration", tab: "Cloud Engineering",
    subtitle: "Flask API on OCI Kubernetes with ML object detection",
    challenge: "Deployed an object detection service processing Base64-encoded images through YOLOv3-tiny and OpenCV on a Kubernetes cluster with 1 controller and 2 worker nodes on Oracle Cloud Infrastructure.",
    stack: ["Flask", "Kubernetes", "Oracle Cloud (OCI)", "YOLOv3-tiny", "OpenCV", "Docker", "Locust"],
    highlights: ["Kubernetes cluster with 1 controller + 2 worker nodes", "Base64 JSON image pipeline through YOLOv3-tiny", "Structured JSON bounding box response data", "Load testing with Locust for concurrent user simulation"],
    impact: "Production ML inference pipeline on cloud-native Kubernetes", difficulty: "Advanced", type: "Enterprise",
    questions: ["How did you handle resource management and unexpected pod failures (e.g., memory exhaustion) under heavy concurrent user load generated by Locust?", "Walk through the data pipeline: how did Flask process Base64-encoded JSON images, pass them through YOLOv3-tiny/OpenCV, and return structured bounding box data?"]
  },
  {
    id: 12, title: "Cloud API Threat Modeling (Healthcare IoT)", tab: "Cloud Engineering",
    subtitle: "STRIDE-based threat model for IoT wearable-to-Cloud API",
    challenge: "Threat modeled a healthcare application connecting IoT wearable devices to a Cloud API, defining trust boundaries and mitigating information disclosure and spoofing threats.",
    stack: ["STRIDE Model", "Data Flow Diagrams", "RBAC", "TLS/SSL", "IoT Security", "Trust Boundaries"],
    highlights: ["Trust boundary definition in Data Flow Diagrams", "STRIDE threat identification (Spoofing, Information Disclosure)", "RBAC for data-at-rest access control", "TLS/SSL encryption for data-in-transit protection"],
    impact: "Comprehensive healthcare API threat model with STRIDE mitigations", difficulty: "Advanced", type: "Security Research",
    questions: ["How did you define trust boundaries in your DFD? Give an example of an Information Disclosure or Spoofing threat and its STRIDE mitigation.", "How do RBAC and TLS/SSL map to data at rest versus data in transit across the trust boundaries?"]
  },
  {
    id: 13, title: "Secure Enterprise Network Design", tab: "Cloud Engineering",
    subtitle: "DMZ architecture with WAF, IDS/IPS, and SSL termination",
    challenge: "Architected a secure enterprise network placing WAF in the DMZ, integrating with SSL termination and internal IDS/IPS to protect public-facing infrastructure.",
    stack: ["WAF", "DMZ Architecture", "IDS/IPS", "SSL Terminator", "Firewall", "Network Segmentation"],
    highlights: ["WAF positioned in DMZ for public-facing protection", "SSL Terminator handling encrypted traffic inspection", "Internal IDS/IPS for deep packet analysis", "Layered defense-in-depth architecture"],
    impact: "Defense-in-depth enterprise architecture securing public-facing servers", difficulty: "Advanced", type: "Enterprise",
    questions: ["Why is the DMZ the appropriate location for the WAF, and how does it interact with the SSL Terminator and internal IDS/IPS?"]
  },
  // ---- OFFENSIVE SECURITY ----
  {
    id: 14, title: "Advanced Penetration Testing (Deathnote VM)", tab: "Offensive Security",
    subtitle: "Full attack chain from enumeration to root access",
    challenge: "Executed a complete penetration test on a vulnerable VM, escalating from directory enumeration to full SSH root access through a multi-stage attack chain.",
    stack: ["WPScan", "Gobuster", "Hydra", "SSH", "WordPress", "Apache/Nginx"],
    highlights: ["Directory enumeration with WPScan and Gobuster", "Sensitive file discovery in /wp-content/uploads", "SSH brute-force escalation using Hydra", "Server hardening recommendations (disable directory listing)"],
    impact: "Full kill chain demonstrated — enumeration to root shell", difficulty: "Advanced", type: "Security Research",
    questions: ["Walk through the attack chain: from directory enumeration using WPScan/Gobuster to gaining full SSH access via Hydra brute-force.", "What server configurations (Apache/Nginx) would you recommend to disable directory listing and mitigate the file exposure?"]
  },
  {
    id: 15, title: "Web Application Vulnerability Exploitation", tab: "Offensive Security",
    subtitle: "SQL injection, DOM XSS, and CSRF attack techniques",
    challenge: "Executed UNION-based SQL injection, Reflected DOM XSS exploiting eval(), and analyzed CSRF mitigation strategies including Anti-CSRF tokens and SameSite cookies.",
    stack: ["SQL Injection", "XSS (DOM/Reflected)", "CSRF", "Burp Suite", "OWASP Top 10", "eval()"],
    highlights: ["UNION-based SQLi to extract usernames and passwords", "Determined backend query column count for UNION attack", "Reflected DOM XSS exploiting eval() function", "Anti-CSRF token and SameSite cookie analysis"],
    impact: "Demonstrated critical OWASP Top 10 exploitation techniques", difficulty: "Expert", type: "Security Research",
    questions: ["What are the prerequisites for UNION-based SQLi, and how did you determine the exact column count?", "How did you exploit the Reflected DOM XSS via eval()? How do Anti-CSRF tokens and SameSite cookies mitigate CSRF?"]
  },
  {
    id: 16, title: "Memory Corruption & Format String Attacks", tab: "Offensive Security",
    subtitle: "Buffer overflow and format string exploitation with bypass techniques",
    challenge: "Exploited buffer overflows against ASLR, StackGuard, and NX protections, and used format string vulnerabilities to overwrite memory values via %x and %n specifiers.",
    stack: ["C", "GDB", "ASLR Bypass", "StackGuard (Canaries)", "NX/DEP", "NOP Sleds", "Format Strings"],
    highlights: ["Buffer overflow against ASLR, StackGuard, NX protections", "NOP sled techniques for ASLR bypass attempts", "Format string %x stack navigation", "%n specifier for targeted memory overwrites"],
    impact: "Low-level memory exploitation demonstrating OS countermeasure limitations", difficulty: "Expert", type: "Security Research",
    questions: ["How do ASLR, StackGuard, and NX stacks complicate buffer overflows, and what techniques (NOP sleds) did you use to bypass them?", "How did you use %x and %n format specifiers to navigate the stack and overwrite secret memory values?"]
  },
  // ---- SOFTWARE DEVELOPMENT ----
  {
    id: 17, title: "Secure Chat & File Transfer Application", tab: "Software Development",
    subtitle: "End-to-end encrypted communication over untrusted networks",
    challenge: "Built a secure file transfer application implementing end-to-end encryption with hash-based integrity verification for communication over untrusted networks.",
    stack: ["Python", "Cryptography", "Socket Programming", "Hashing (SHA-256)", "E2E Encryption"],
    highlights: ["End-to-end encryption implementation", "Hash checks for message/file integrity", "Tamper-proof communication protocol", "Untrusted network resilience"],
    impact: "Fully encrypted communication channel with integrity guarantees", difficulty: "Advanced", type: "Software",
    questions: ["How did you implement E2E encryption and use hash checks to guarantee message/file integrity and prevent tampering?"]
  },
  {
    id: 18, title: "OOP Management System with Strict Validation", tab: "Software Development",
    subtitle: "Python system with complex regex and robust error handling",
    challenge: "Designed an object-oriented management system with strict data validation using complex regular expressions and structured error handling throughout.",
    stack: ["Python", "OOP Design Patterns", "Regular Expressions", "Error Handling", "Data Validation"],
    highlights: ["Complex Regex for user input validation", "Structured exception handling throughout", "Clean OOP architecture with design patterns", "Strict data validation at every boundary"],
    impact: "Production-quality Python system with zero-trust input validation", difficulty: "Intermediate", type: "Software",
    questions: ["Give an example of a complex Regex you used to validate user input, and explain your error handling structure."]
  },
  {
    id: 19, title: "RESTful API Backend (Flask)", tab: "Software Development",
    subtitle: "High-concurrency Flask API processing Base64 image payloads",
    challenge: "Built a Flask backend handling multiple concurrent HTTP POST requests with large Base64 images, addressing Python threading bottlenecks and optimizing for throughput.",
    stack: ["Flask", "Python", "REST API", "Threading", "Base64", "Concurrency"],
    highlights: ["Concurrent HTTP POST handling for large payloads", "Python threading optimization for Base64 processing", "Bottleneck identification and resolution", "High-throughput API design"],
    impact: "Optimized Python API handling heavy concurrent image processing", difficulty: "Advanced", type: "Software",
    questions: ["What Python bottlenecks or concurrency issues did you face with concurrent Base64 image POSTs, and how did you optimize?"]
  },
  // ---- FORENSICS & COMPLIANCE ----
  {
    id: 20, title: "Enterprise Forensic Readiness Architecture", tab: "Forensics & Compliance",
    subtitle: "Network designed for post-incident analysis with AAA & SIEM",
    challenge: "Designed an enterprise network with forensic readiness at its core, ensuring critical logs are captured and preserved for post-incident analysis using AAA and SIEM integration.",
    stack: ["AAA Server", "SIEM", "Network Forensics", "Log Management", "Chain of Custody"],
    highlights: ["AAA server for authentication/authorization logging", "SIEM integration for centralized log correlation", "Forensic-ready log preservation architecture", "Post-incident analysis capability from day one"],
    impact: "Enterprise network with built-in forensic evidence collection", difficulty: "Advanced", type: "Enterprise",
    questions: ["How do AAA and SIEM servers work together to ensure critical logs are captured and preserved for post-incident analysis?"]
  },
  {
    id: 21, title: "High-Profile Data Breach Analysis", tab: "Forensics & Compliance",
    subtitle: "Deep analysis of Optus & Alibaba breach failures",
    challenge: "Analyzed the 2022 Optus and Alibaba data breaches, identifying critical gaps in preventative measures, crisis communications, and root causes including missing MFA and poor patch management.",
    stack: ["Breach Analysis", "MFA", "Patch Management", "Crisis Communication", "Privacy Frameworks"],
    highlights: ["Root cause analysis of preventative measure gaps", "Crisis communication failure identification", "MFA absence as primary attack vector", "Patch management deficiency mapping"],
    impact: "Actionable breach prevention framework from real-world failures", difficulty: "Intermediate", type: "Research",
    questions: ["What were the critical gaps in Optus/Alibaba's preventative measures? Why is missing MFA often the root cause of massive exposures?"]
  },
  {
    id: 22, title: "Ethical Hacking Policy Development", tab: "Forensics & Compliance",
    subtitle: "Red team boundaries and responsible disclosure framework",
    challenge: "Developed comprehensive ethical hacking policies establishing red team boundaries, balancing vulnerability testing with business continuity and data privacy requirements.",
    stack: ["Policy Development", "Red Team Operations", "Compliance", "Data Privacy", "Risk Assessment"],
    highlights: ["Core tenets for internal red team operations", "Vulnerability testing without business disruption", "Data privacy boundary enforcement", "Responsible disclosure framework"],
    impact: "Production-ready ethical hacking policy for enterprise red teams", difficulty: "Intermediate", type: "Research",
    questions: ["What are the core tenets of an Ethical Hacking Policy? How do you balance vulnerability testing without causing disruption or violating privacy?"]
  },
  {
    id: 23, title: "Habitat for Wings — Security Assessment (IE)", tab: "Forensics & Compliance",
    subtitle: "Iterative vulnerability assessment for AI bird identification platform",
    challenge: "Conducted iterative security assessments on a Cloudflare/AWS-hosted platform with AI bird identification, discovering CORS misconfigurations, missing security headers, and implementing comprehensive hardening.",
    stack: ["Nikto", "WhatWeb", "CORS", "CSP", "HSTS", "Cloudflare", "AWS", "EXIF Stripping"],
    highlights: ["Active scanning with Nikto and WhatWeb", "Discovered permissive CORS (access-control-allow-origin: *)", "Enforced HSTS, CSP, X-Content-Type-Options headers", "Integrated malware scanning and EXIF stripping for uploads"],
    impact: "Hardened production platform from permissive CORS to full security header compliance", difficulty: "Advanced", type: "Applied",
    questions: ["What critical security gaps did you find (CORS, missing headers), and how did you remediate them across iterations?"]
  }
];

export const projectCategories = [
  "All",
  "Infrastructure & Network",
  "Cloud Engineering",
  "Offensive Security",
  "Software Development",
  "Forensics & Compliance"
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
