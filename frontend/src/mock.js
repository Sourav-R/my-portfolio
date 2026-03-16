// Mock data for SOC-Professional Portfolio

export const profileData = {
  name: "Sourav Ramakrishna",
  role: "Jr. SOC Analyst",
  company: "ThIRU Labs",
  companyFull: "THIRU (Threat Incident and Response Unit)",
  location: "Melbourne, Australia",
  timezone: "Australia/Melbourne",
  email: "Sourav.rk.21@gmail.com",
  phone: "+61 493670389",
  linkedin: "https://www.linkedin.com/in/sourav-ramakrishna-b6189a204/",
  github: "https://github.com/Sourav-R",
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
  {
    id: 1,
    title: "Enterprise Network Architecture & High-Speed Backbone Design",
    tab: "Infrastructure & Network",
    subtitle: "Scalable infrastructure for 650-employee enterprise",
    problem: "A public transport enterprise expanding to 650 employees needed a new high-speed backbone. Existing infrastructure was bottlenecked, risking broadcast storms and severe latency during peak video conferencing and web traffic.",
    stack: [
      "Cisco Catalyst 8500/9300x",
      "40Gbps Fiber",
      "Wi-Fi 6 (802.11ax)",
      "Layer 3 Routing",
      "VLAN Segmentation",
      "QoS"
    ],
    solution: [
      "Engineered a hierarchical Layer 3 routed backbone to explicitly segment broadcast domains and prevent ARP storms.",
      "Designed an underground physical infrastructure utilizing redundant 40Gbps optical fiber links.",
      "Implemented a modified star topology for strict fault isolation with CAT 6A/7a Ethernet.",
      "Deployed a high-density WLAN utilizing Wi-Fi 6 with 11 TP-Link Omada APs per floor."
    ],
    impact: "Delivered a highly resilient, enterprise-grade network guaranteeing 20-25 Mbps per wired user. Zero risk of network-wide broadcast failures and future-proofed for over 200 concurrent peak users at 60Mbps each.",
    difficulty: "Expert",
    type: "Enterprise",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: []
  },
  {
    id: 2,
    title: "Multi-Campus IPSec VPN & Zero-Trust Perimeter Hardening",
    tab: "Infrastructure & Network",
    subtitle: "Enterprise-scale secure network connecting 3 campuses",
    problem: "Monash University's three distributed campuses suffered from a flat, insecure network architecture, leaving highly sensitive internal systems vulnerable to eavesdropping and lateral movement by external threat actors.",
    stack: [
      "IPSec IKEv2",
      "AES-256-GCM",
      "Mikrotik RouterOS",
      "GNS3",
      "Zero-Trust Model",
      "Stateful Firewall"
    ],
    solution: [
      "Deployed perimeter security gateways utilizing GNS3 and Mikrotik RouterOS at each campus edge.",
      "Engineered site-to-site VPNs using IPSec in Tunnel Mode to hide internal routing tables.",
      "Enforced military-grade encryption with IKEv2, AES-256-GCM, and SHA256 over ESP.",
      "Implemented a strict 'default-deny' stateful firewall, restricting SSH and Mail access based on client location."
    ],
    impact: "Deep packet inspection verified 100% of inter-campus traffic was successfully encapsulated and encrypted. Zero-Trust firewall neutralized lateral movement risks while allowing legitimate established connections.",
    difficulty: "Advanced",
    type: "Enterprise",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: []
  },
  {
    id: 3,
    title: "Advanced Port Scanner Development & IDS Evasion",
    tab: "Infrastructure & Network",
    subtitle: "Python-based stealth reconnaissance tool",
    problem: "Standard commercial scanners were easily blocked by the network's Snort IDS. The organization needed a bespoke tool to evaluate IDS efficacy against stealthy reconnaissance tactics actively employed by APTs.",
    stack: [
      "Python 3",
      "TCP SYN Scanning",
      "Snort IDS",
      "Raw Sockets",
      "Evasion Techniques",
      "Wireshark"
    ],
    solution: [
      "Developed a custom, multi-threaded Python network scanner utilizing raw sockets for TCP SYN (half-open) scans.",
      "Enhanced UDP scanning by sending specific protocol payloads (like DNS queries) to force responses and reduce false negatives.",
      "Implemented port randomization (random.shuffle) to neutralize linear IDS signatures.",
      "Engineered programmatic timing delays ('low and slow' approach) to throttle traffic below IDS alert thresholds."
    ],
    impact: "Successfully enumerated all open TCP and UDP ports without triggering Snort IDS alarms. Proved that rate-based/signature-based IDS configurations are vulnerable to programmatic evasion.",
    difficulty: "Expert",
    type: "Security Research",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: []
  },
  {
    id: 4,
    title: "DNS Infrastructure Exploitation & Cache Poisoning",
    tab: "Infrastructure & Network",
    subtitle: "Kaminsky-style attack demonstrating DNS vulnerability",
    problem: "The organization required a practical demonstration of catastrophic DNS redirection attacks to justify the costly deployment of DNSSEC, as their existing DNS inherently lacked cryptographic authentication.",
    stack: [
      "Python",
      "Scapy",
      "BIND9",
      "ARP Poisoning",
      "DNS Spoofing",
      "Kaminsky Attack"
    ],
    solution: [
      "Executed a local MITM spoofing attack via weaponized ARP replies using Scapy to route victim traffic through an attacker machine.",
      "Intercepted UDP port 53 traffic, injecting forged DNS responses with fake authorative NS records.",
      "Executed a remote Kaminsky-style cache poisoning attack against a BIND9 resolver by flooding it with queries for non-existent dummy subdomains.",
      "Blasted the resolver with forged UDP responses simulating upstream root servers to guess the 16-bit Transaction ID and Source Port."
    ],
    impact: "Devastatingly effective attacks successfully bypassed standard resolution and poisoned the BIND9 cache, overwriting NS records and hijacking traffic for an entire domain zone. Definitively proved the urgent need for DNSSEC.",
    difficulty: "Expert",
    type: "Critical Infrastructure",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: []
  },
  {
    id: 5,
    title: "Public Key Infrastructure (PKI) Deployment & TLS Hardening",
    tab: "Infrastructure & Network",
    subtitle: "Internal CA with TLS 1.3 enforcement",
    problem: "Critical internal web applications and SMTP mail gateways were operating in plaintext or utilizing unverified, self-signed certificates, leaving the enterprise vulnerable to packet sniffing and MITM interception.",
    stack: [
      "OpenSSL",
      "X.509 Certificates",
      "RSA-2048",
      "ECDHE",
      "TLS Hardening",
      "Apache2 / Postfix"
    ],
    solution: [
      "Established a private Root Certificate Authority (CA) using OpenSSL as the ultimate anchor of trust.",
      "Generated RSA-2048 key pairs and authored CSRs to issue cryptographically binding digital certificates for enterprise servers.",
      "Configured Apache2 VirtualHosts and Postfix MTAs to strictly enforce HTTPS and mandatory TLS encrypted transit.",
      "Negotiated TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 cipher suite to guarantee Perfect Forward Secrecy (PFS) and deprecated legacy TLS 1.0/1.1."
    ],
    impact: "Seamlessly transitioned the enterprise to a fully encrypted environment, eliminating untrusted certificate warnings. Packet analysis proved all application data payloads were securely encrypted via AES-GCM and authenticated via SHA256.",
    difficulty: "Advanced",
    type: "Enterprise",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: []
  },
  {
    id: 8,
    title: "T-Pot Honeypot & ELK Integration",
    tab: "Infrastructure & Network",
    subtitle: "Banking portal decoy for live threat intelligence",
    problem: "Deployed a custom T-Pot environment disguised as a banking portal to capture and visualize live credential harvesting attempts.",
    stack: [
      "T-Pot",
      "Elastic Stack (ELK)",
      "Docker",
      "Debian"
    ],
    solution: [
      "Custom honeypot disguised as banking portal",
      "Real-time credential harvesting capture",
      "ELK-powered threat visualization dashboard",
      "50+ unique malicious IPs blacklisted in 48 hours"
    ],
    impact: "Neutralized automated brute-force scripts before production pivot",
    difficulty: "Advanced",
    type: "Enterprise",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: []
  },
  {
    id: 9,
    title: "Automated Infrastructure Hardening (SaltStack)",
    tab: "Infrastructure & Network",
    subtitle: "CIS Benchmark-based automated server hardening",
    problem: "Built a scalable configuration management system to automate server hardening based on CIS Benchmarks.",
    stack: [
      "SaltStack",
      "Python",
      "Linux (Ubuntu/RHEL)",
      "CIS Benchmarks"
    ],
    solution: [
      "Automated audit-and-revert cycle",
      "CIS Benchmark compliance enforcement",
      "Configuration drift prevention",
      "Unauthorized changes reverted within 60 seconds"
    ],
    impact: "Prevented configuration drift with 60-second auto-remediation",
    difficulty: "Advanced",
    type: "Enterprise",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: []
  },
  {
    id: 10,
    title: "Ringwood Private Cloud (Home Lab)",
    tab: "Infrastructure & Network",
    subtitle: "HA virtualization for malware analysis & monitoring",
    problem: "Architecture of a high-availability virtualization environment for malware analysis and network traffic monitoring.",
    stack: [
      "Proxmox VE",
      "Docker",
      "pfSense",
      "Pi-hole",
      "VLAN Segmentation"
    ],
    solution: [
      "High-availability Proxmox cluster",
      "Strict VLAN segmentation for isolation",
      "Dedicated malware analysis environment",
      "Host network logically isolated from lab VMs"
    ],
    impact: "Zero lateral movement risk during active malware analysis",
    difficulty: "Advanced",
    type: "Enterprise",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: []
  },
  {
    id: 11,
    title: "CloudDetect Web Service & Kubernetes Orchestration",
    tab: "Cloud Engineering",
    subtitle: "Flask API on OCI Kubernetes with ML object detection",
    problem: "Deployed an object detection service processing Base64-encoded images through YOLOv3-tiny and OpenCV on a Kubernetes cluster with 1 controller and 2 worker nodes on Oracle Cloud Infrastructure.",
    stack: [
      "Flask",
      "Kubernetes",
      "Oracle Cloud (OCI)",
      "YOLOv3-tiny",
      "OpenCV",
      "Docker",
      "Locust"
    ],
    solution: [
      "Kubernetes cluster with 1 controller + 2 worker nodes",
      "Base64 JSON image pipeline through YOLOv3-tiny",
      "Structured JSON bounding box response data",
      "Load testing with Locust for concurrent user simulation"
    ],
    impact: "Production ML inference pipeline on cloud-native Kubernetes",
    difficulty: "Advanced",
    type: "Enterprise",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "How did you handle resource management and unexpected pod failures (e.g., memory exhaustion) under heavy concurrent user load generated by Locust?",
      "Walk through the data pipeline: how did Flask process Base64-encoded JSON images, pass them through YOLOv3-tiny/OpenCV, and return structured bounding box data?"
    ]
  },
  {
    id: 12,
    title: "Cloud API Threat Modeling (Healthcare IoT)",
    tab: "Cloud Engineering",
    subtitle: "STRIDE-based threat model for IoT wearable-to-Cloud API",
    problem: "Threat modeled a healthcare application connecting IoT wearable devices to a Cloud API, defining trust boundaries and mitigating information disclosure and spoofing threats.",
    stack: [
      "STRIDE Model",
      "Data Flow Diagrams",
      "RBAC",
      "TLS/SSL",
      "IoT Security",
      "Trust Boundaries"
    ],
    solution: [
      "Trust boundary definition in Data Flow Diagrams",
      "STRIDE threat identification (Spoofing, Information Disclosure)",
      "RBAC for data-at-rest access control",
      "TLS/SSL encryption for data-in-transit protection"
    ],
    impact: "Comprehensive healthcare API threat model with STRIDE mitigations",
    difficulty: "Advanced",
    type: "Security Research",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "How did you define trust boundaries in your DFD? Give an example of an Information Disclosure or Spoofing threat and its STRIDE mitigation.",
      "How do RBAC and TLS/SSL map to data at rest versus data in transit across the trust boundaries?"
    ]
  },
  {
    id: 13,
    title: "Secure Enterprise Network Design",
    tab: "Cloud Engineering",
    subtitle: "DMZ architecture with WAF, IDS/IPS, and SSL termination",
    problem: "Architected a secure enterprise network placing WAF in the DMZ, integrating with SSL termination and internal IDS/IPS to protect public-facing infrastructure.",
    stack: [
      "WAF",
      "DMZ Architecture",
      "IDS/IPS",
      "SSL Terminator",
      "Firewall",
      "Network Segmentation"
    ],
    solution: [
      "WAF positioned in DMZ for public-facing protection",
      "SSL Terminator handling encrypted traffic inspection",
      "Internal IDS/IPS for deep packet analysis",
      "Layered defense-in-depth architecture"
    ],
    impact: "Defense-in-depth enterprise architecture securing public-facing servers",
    difficulty: "Advanced",
    type: "Enterprise",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "Why is the DMZ the appropriate location for the WAF, and how does it interact with the SSL Terminator and internal IDS/IPS?"
    ]
  },
  {
    id: 14,
    title: "Advanced Penetration Testing (Deathnote VM)",
    tab: "Offensive Security",
    subtitle: "Full attack chain from enumeration to root access",
    problem: "Executed a complete penetration test on a vulnerable VM, escalating from directory enumeration to full SSH root access through a multi-stage attack chain.",
    stack: [
      "WPScan",
      "Gobuster",
      "Hydra",
      "SSH",
      "WordPress",
      "Apache/Nginx"
    ],
    solution: [
      "Directory enumeration with WPScan and Gobuster",
      "Sensitive file discovery in /wp-content/uploads",
      "SSH brute-force escalation using Hydra",
      "Server hardening recommendations (disable directory listing)"
    ],
    impact: "Full kill chain demonstrated — enumeration to root shell",
    difficulty: "Advanced",
    type: "Security Research",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "Walk through the attack chain: from directory enumeration using WPScan/Gobuster to gaining full SSH access via Hydra brute-force.",
      "What server configurations (Apache/Nginx) would you recommend to disable directory listing and mitigate the file exposure?"
    ]
  },
  {
    id: 15,
    title: "Web Application Vulnerability Exploitation",
    tab: "Offensive Security",
    subtitle: "SQL injection, DOM XSS, and CSRF attack techniques",
    problem: "Executed UNION-based SQL injection, Reflected DOM XSS exploiting eval(), and analyzed CSRF mitigation strategies including Anti-CSRF tokens and SameSite cookies.",
    stack: [
      "SQL Injection",
      "XSS (DOM/Reflected)",
      "CSRF",
      "Burp Suite",
      "OWASP Top 10",
      "eval()"
    ],
    solution: [
      "UNION-based SQLi to extract usernames and passwords",
      "Determined backend query column count for UNION attack",
      "Reflected DOM XSS exploiting eval() function",
      "Anti-CSRF token and SameSite cookie analysis"
    ],
    impact: "Demonstrated critical OWASP Top 10 exploitation techniques",
    difficulty: "Expert",
    type: "Security Research",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "What are the prerequisites for UNION-based SQLi, and how did you determine the exact column count?",
      "How did you exploit the Reflected DOM XSS via eval()? How do Anti-CSRF tokens and SameSite cookies mitigate CSRF?"
    ]
  },
  {
    id: 16,
    title: "Memory Corruption & Format String Attacks",
    tab: "Offensive Security",
    subtitle: "Buffer overflow and format string exploitation with bypass techniques",
    problem: "Exploited buffer overflows against ASLR, StackGuard, and NX protections, and used format string vulnerabilities to overwrite memory values via %x and %n specifiers.",
    stack: [
      "C",
      "GDB",
      "ASLR Bypass",
      "StackGuard (Canaries)",
      "NX/DEP",
      "NOP Sleds",
      "Format Strings"
    ],
    solution: [
      "Buffer overflow against ASLR, StackGuard, NX protections",
      "NOP sled techniques for ASLR bypass attempts",
      "Format string %x stack navigation",
      "%n specifier for targeted memory overwrites"
    ],
    impact: "Low-level memory exploitation demonstrating OS countermeasure limitations",
    difficulty: "Expert",
    type: "Security Research",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "How do ASLR, StackGuard, and NX stacks complicate buffer overflows, and what techniques (NOP sleds) did you use to bypass them?",
      "How did you use %x and %n format specifiers to navigate the stack and overwrite secret memory values?"
    ]
  },
  {
    id: 17,
    title: "Secure Chat & File Transfer Application",
    tab: "Software Development",
    subtitle: "End-to-end encrypted communication over untrusted networks",
    problem: "Built a secure file transfer application implementing end-to-end encryption with hash-based integrity verification for communication over untrusted networks.",
    stack: [
      "Python",
      "Cryptography",
      "Socket Programming",
      "Hashing (SHA-256)",
      "E2E Encryption"
    ],
    solution: [
      "End-to-end encryption implementation",
      "Hash checks for message/file integrity",
      "Tamper-proof communication protocol",
      "Untrusted network resilience"
    ],
    impact: "Fully encrypted communication channel with integrity guarantees",
    difficulty: "Advanced",
    type: "Software",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "How did you implement E2E encryption and use hash checks to guarantee message/file integrity and prevent tampering?"
    ]
  },
  {
    id: 18,
    title: "OOP Management System with Strict Validation",
    tab: "Software Development",
    subtitle: "Python system with complex regex and robust error handling",
    problem: "Designed an object-oriented management system with strict data validation using complex regular expressions and structured error handling throughout.",
    stack: [
      "Python",
      "OOP Design Patterns",
      "Regular Expressions",
      "Error Handling",
      "Data Validation"
    ],
    solution: [
      "Complex Regex for user input validation",
      "Structured exception handling throughout",
      "Clean OOP architecture with design patterns",
      "Strict data validation at every boundary"
    ],
    impact: "Production-quality Python system with zero-trust input validation",
    difficulty: "Intermediate",
    type: "Software",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "Give an example of a complex Regex you used to validate user input, and explain your error handling structure."
    ]
  },
  {
    id: 19,
    title: "RESTful API Backend (Flask)",
    tab: "Software Development",
    subtitle: "High-concurrency Flask API processing Base64 image payloads",
    problem: "Built a Flask backend handling multiple concurrent HTTP POST requests with large Base64 images, addressing Python threading bottlenecks and optimizing for throughput.",
    stack: [
      "Flask",
      "Python",
      "REST API",
      "Threading",
      "Base64",
      "Concurrency"
    ],
    solution: [
      "Concurrent HTTP POST handling for large payloads",
      "Python threading optimization for Base64 processing",
      "Bottleneck identification and resolution",
      "High-throughput API design"
    ],
    impact: "Optimized Python API handling heavy concurrent image processing",
    difficulty: "Advanced",
    type: "Software",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "What Python bottlenecks or concurrency issues did you face with concurrent Base64 image POSTs, and how did you optimize?"
    ]
  },
  {
    id: 20,
    title: "Enterprise Forensic Readiness Architecture",
    tab: "Forensics & Compliance",
    subtitle: "Network designed for post-incident analysis with AAA & SIEM",
    problem: "Designed an enterprise network with forensic readiness at its core, ensuring critical logs are captured and preserved for post-incident analysis using AAA and SIEM integration.",
    stack: [
      "AAA Server",
      "SIEM",
      "Network Forensics",
      "Log Management",
      "Chain of Custody"
    ],
    solution: [
      "AAA server for authentication/authorization logging",
      "SIEM integration for centralized log correlation",
      "Forensic-ready log preservation architecture",
      "Post-incident analysis capability from day one"
    ],
    impact: "Enterprise network with built-in forensic evidence collection",
    difficulty: "Advanced",
    type: "Enterprise",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "How do AAA and SIEM servers work together to ensure critical logs are captured and preserved for post-incident analysis?"
    ]
  },
  {
    id: 21,
    title: "High-Profile Data Breach Analysis",
    tab: "Forensics & Compliance",
    subtitle: "Deep analysis of Optus & Alibaba breach failures",
    problem: "Analyzed the 2022 Optus and Alibaba data breaches, identifying critical gaps in preventative measures, crisis communications, and root causes including missing MFA and poor patch management.",
    stack: [
      "Breach Analysis",
      "MFA",
      "Patch Management",
      "Crisis Communication",
      "Privacy Frameworks"
    ],
    solution: [
      "Root cause analysis of preventative measure gaps",
      "Crisis communication failure identification",
      "MFA absence as primary attack vector",
      "Patch management deficiency mapping"
    ],
    impact: "Actionable breach prevention framework from real-world failures",
    difficulty: "Intermediate",
    type: "Research",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "What were the critical gaps in Optus/Alibaba's preventative measures? Why is missing MFA often the root cause of massive exposures?"
    ]
  },
  {
    id: 22,
    title: "Ethical Hacking Policy Development",
    tab: "Forensics & Compliance",
    subtitle: "Red team boundaries and responsible disclosure framework",
    problem: "Developed comprehensive ethical hacking policies establishing red team boundaries, balancing vulnerability testing with business continuity and data privacy requirements.",
    stack: [
      "Policy Development",
      "Red Team Operations",
      "Compliance",
      "Data Privacy",
      "Risk Assessment"
    ],
    solution: [
      "Core tenets for internal red team operations",
      "Vulnerability testing without business disruption",
      "Data privacy boundary enforcement",
      "Responsible disclosure framework"
    ],
    impact: "Production-ready ethical hacking policy for enterprise red teams",
    difficulty: "Intermediate",
    type: "Research",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "What are the core tenets of an Ethical Hacking Policy? How do you balance vulnerability testing without causing disruption or violating privacy?"
    ]
  },
  {
    id: 23,
    title: "Habitat for Wings — Security Assessment (IE)",
    tab: "Forensics & Compliance",
    subtitle: "Iterative vulnerability assessment for AI bird identification platform",
    problem: "Conducted iterative security assessments on a Cloudflare/AWS-hosted platform with AI bird identification, discovering CORS misconfigurations, missing security headers, and implementing comprehensive hardening.",
    stack: [
      "Nikto",
      "WhatWeb",
      "CORS",
      "CSP",
      "HSTS",
      "Cloudflare",
      "AWS",
      "EXIF Stripping"
    ],
    solution: [
      "Active scanning with Nikto and WhatWeb",
      "Discovered permissive CORS (access-control-allow-origin: *)",
      "Enforced HSTS, CSP, X-Content-Type-Options headers",
      "Integrated malware scanning and EXIF stripping for uploads"
    ],
    impact: "Hardened production platform from permissive CORS to full security header compliance",
    difficulty: "Advanced",
    type: "Applied",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "What critical security gaps did you find (CORS, missing headers), and how did you remediate them across iterations?"
    ]
  },
  {
    id: 24,
    title: "Advanced Persistent Threat Detection",
    tab: "Featured Labs",
    subtitle: "Investigate and neutralize a sophisticated APT campaign",
    problem: "Conduct memory dump analysis, network traffic examination, and endpoint detection techniques to identify and neutralize an APT.",
    stack: [
      "Wireshark",
      "Volatility",
      "YARA",
      "Splunk",
      "EDR"
    ],
    solution: [
      "Findings: Identified C2 communication via DNS tunneling, extracted malicious DLL from memory, traced lateral movement across 5 hosts.",
      "Mitigation: Isolated compromised hosts, implemented network segmentation, deployed custom YARA rules for detection."
    ],
    impact: "Threat Type: APT (Advanced)",
    difficulty: "Advanced",
    type: "Case Study",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "Key Commands Executed:",
      "$ tshark -r capture.pcap -Y \"tcp.flags.syn==1\"",
      "$ volatility -f memory.dmp --profile=Win10x64 pslist",
      "$ yara -r rules.yar /suspicious/directory",
      "$ splunk search index=main sourcetype=windows | stats count by process_name"
    ]
  },
  {
    id: 25,
    title: "WannaCry Ransomware Investigation",
    tab: "Featured Labs",
    subtitle: "Analyze outbreak and implement containment strategies",
    problem: "Analyze WannaCry ransomware outbreak, identify infection vectors, and implement containment strategies to prevent propagation.",
    stack: [
      "Windows Defender ATP",
      "Wireshark",
      "Sysinternals",
      "PowerShell"
    ],
    solution: [
      "Findings: EternalBlue exploit via SMB, encryption of 1,247 files, attempted network propagation blocked by proper segmentation.",
      "Mitigation: Applied MS17-010 patch, isolated infected machines, restored from backups, implemented application whitelisting."
    ],
    impact: "Threat Type: Ransomware (Intermediate)",
    difficulty: "Intermediate",
    type: "Case Study",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "Key Commands Executed:",
      "$ Get-MpMachineStatus",
      "$ Get-MpThreatList",
      "$ netstat -ano | findstr LISTENING",
      "$ tshark -r traffic.pcap -Y \"smb || smb2\""
    ]
  },
  {
    id: 26,
    title: "DDoS Attack Analysis & Mitigation",
    tab: "Featured Labs",
    subtitle: "Detect and mitigate simulated DDoS targeting web infrastructure",
    problem: "Detect and mitigate a simulated DDoS attack targeting web infrastructure using packet analysis and traffic shaping.",
    stack: [
      "Wireshark",
      "Hping3",
      "Nmap",
      "Snort",
      "iptables"
    ],
    solution: [
      "Findings: SYN flood from 347 unique IPs, 45,000 requests/second peak, amplification via DNS reflection.",
      "Mitigation: Implemented rate limiting, blocked malicious IPs, deployed CDN with DDoS protection, enabled SYN cookies."
    ],
    impact: "Threat Type: DDoS (Intermediate)",
    difficulty: "Intermediate",
    type: "Case Study",
    thumbnail: "/api/placeholder/600/400",
    demoUrl: "#",
    repoUrl: "#",
    questions: [
      "Key Commands Executed:",
      "$ tshark -r ddos.pcap -Y \"tcp.flags.syn==1\" | wc -l",
      "$ nmap -sn 192.168.1.0/24",
      "$ snort -r ddos.pcap -c snort.conf",
      "$ iptables -A INPUT -p tcp --syn -m limit --limit 1/s -j ACCEPT"
    ]
  }
];

export const projectCategories = [
  "All",
  "Infrastructure & Network",
  "Cloud Engineering",
  "Offensive Security",
  "Software Development",
  "Forensics & Compliance",
  "Featured Labs"
];

export const skills = {
  security: [
    "Zero-Trust Architecture",
    "Threat Detection & Analysis",
    "Security Information and Event Management (SIEM)",
    "Incident Response",
    "Network Security & Firewalling",
    "Vulnerability & IDS Evasion Assessment",
    "Applied Cryptography (PKI/TLS)",
    "MITRE ATT&CK Framework"
  ],
  infrastructure: [
    "Enterprise Network Architecture (L3 Routing)",
    "Proxmox Virtualization",
    "Docker & Container Orchestration",
    "Multi-Campus IPSec VPNs",
    "Linux System Administration",
    "Server Management & Hardening"
  ],
  tools: [
    "Cisco Catalyst (8500/9300x)",
    "Mikrotik RouterOS",
    "BIND9",
    "pfSense & OPNSense",
    "Wazuh",
    "Snort/Suricata IDS",
    "Wireshark / Scapy",
    "OpenSSL",
    "GNS3",
    "Metasploit"
  ],
  programming: [
    "Python",
    "Bash Scripting",
    "JavaScript/TypeScript",
    "Socket Programming",
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
