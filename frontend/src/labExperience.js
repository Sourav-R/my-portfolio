// Lab Experience Data parsed from n8n-university-audit.xlsx

export const labStats = {
  totalLabs: 200,
  coursesCompleted: [
    "FIT5057",
    "FIT5129",
    "FIT9137",
    "FIT5163",
    "FIT9136",
    "FIT5225",
  ],
  yearsActive: "2023-2024",
  totalHours: 600,
};

export const threatCategories = [
  { name: "Ransomware", count: 48, percentage: 24, color: "#ef4444" },
  {
    name: "Advanced Persistent Threats",
    count: 40,
    percentage: 20,
    color: "#f97316",
  },
  { name: "Network Intrusions", count: 35, percentage: 17.5, color: "#eab308" },
  { name: "DDoS Attacks", count: 25, percentage: 12.5, color: "#00d9ff" },
  { name: "Malware Analysis", count: 22, percentage: 11, color: "#8b5cf6" },
  { name: "Data Breaches", count: 18, percentage: 9, color: "#ec4899" },
  { name: "Brute Force", count: 12, percentage: 6, color: "#10b981" },
];

export const toolsProficiency = {
  "SOC & Threat Detection": [
    {
      name: "SIEM (ELK Stack)",
      level: 95,
      commands: ["elasticsearch", "logstash", "kibana"],
    },
    {
      name: "Elastic Endpoint Security",
      level: 92,
      commands: ["elastic-agent", "fleet-server", "elastic-defend"],
    },
    {
      name: "LotL Detection & EQL",
      level: 90,
      commands: ["kibana eql", "powershell parsing"],
    },
    {
      name: "Log Parsing & Beats",
      level: 88,
      commands: ["winlogbeat", "filebeat", "sysmon"],
    },
    {
      name: "Threat Hunting & IR",
      level: 85,
      commands: ["incident response", "detection engineering"],
    },
    {
      name: "Logstash Pipelines",
      level: 89,
      commands: ["logstash -f", "rubydebug"],
    },
  ],
  "Penetration Testing & VAPT": [
    {
      name: "Burp Suite",
      level: 88,
      commands: ["burpsuite", "web app testing"],
    },
    {
      name: "OWASP ZAP",
      level: 82,
      commands: ["zap", "wapiti", "vulnerability scanning"],
    },
    {
      name: "Cloud Infra VAPT",
      level: 85,
      commands: ["aws ec2 isolation", "rds brute-forcing"],
    },
    {
      name: "Kali Linux",
      level: 85,
      commands: ["kali-linux", "pentest tools"],
    },
    {
      name: "Nmap & Recon",
      level: 92,
      commands: ["nmap", "wireshark", "tcpdump"],
    },
    {
      name: "Exploitation Arrays",
      level: 80,
      commands: ["metasploit", "beef framework", "payload injection"],
    },
    {
      name: "Telecom Modeling",
      level: 75,
      commands: ["sip", "ivr", "oracle integration cloud"],
    },
  ],
  "IDS/IPS & Network Security": [
    { name: "Wireshark", level: 95, commands: ["tshark -r", "tshark -Y"] },
    {
      name: "Suricata",
      level: 82,
      commands: ["suricata -c", "suricata -i eth0"],
    },
    { name: "Snort", level: 87, commands: ["snort -r", "snort -c snort.conf"] },
    {
      name: "Network Anomaly Detection",
      level: 85,
      commands: ["tcpdump", "traffic analysis"],
    },
    {
      name: "Routing & Access Controls",
      level: 88,
      commands: ["tcp/ip", "arp", "nat/bridging", "nac"],
    },
    {
      name: "Proxy & Gateways",
      level: 80,
      commands: ["api gateways", "proxy bypasses"],
    },
  ],
  "Programming & Automation": [
    {
      name: "Python",
      level: 88,
      commands: ["python script.py", "automation scripts"],
    },
    {
      name: "Bash Scripting",
      level: 85,
      commands: ["bash script.sh", "shell scripts"],
    },
    {
      name: "SaltStack Automation",
      level: 90,
      commands: ["salt-master", "zeromq", "salt reactors"],
    },
    {
      name: "Infrastructure as Code",
      level: 88,
      commands: ["terraform", "ansible"],
    },
    {
      name: "Containerization",
      level: 85,
      commands: ["docker", "docker-compose"],
    },
    {
      name: "Event-Driven TDR",
      level: 82,
      commands: ["auto-remediation", "pipeline automation"],
    },
    { name: "C Programming", level: 70, commands: ["gcc", "compile"] },
  ],
  "Cloud & IT Infrastructure": [
    {
      name: "Linux Administration",
      level: 92,
      commands: ["systemctl", "chmod", "iptables"],
    },
    {
      name: "Virtualization (Proxmox/ESXi)",
      level: 92,
      commands: ["proxmox ve", "kvm", "lxc"],
    },
    {
      name: "Windows Enterprise (AD/GPO)",
      level: 85,
      commands: ["active directory", "group policy", "registry"],
    },
    {
      name: "AWS & Microservices",
      level: 82,
      commands: ["aws rds", "ecs", "cloud penetration"],
    },
    {
      name: "GLPI / LAMP Stack",
      level: 88,
      commands: ["mysql", "apache2ctl", "php db:check"],
    },
    { name: "Database Admin", level: 82, commands: ["mysql 8.0", "aws rds"] },
  ],
  "Security Tools & Honeypots": [
    {
      name: "T-Pot Honeypot Framework",
      level: 90,
      commands: ["t-pot", "honeypot management"],
    },
    {
      name: "OpenCanary",
      level: 85,
      commands: ["opencanaryd", "decoy services"],
    },
    {
      name: "Custom Decoy Dev",
      level: 82,
      commands: ["python flask", "fakebook logger"],
    },
    {
      name: "TLS/SSL Management",
      level: 86,
      commands: ["keystores", "p12", "mtls"],
    },
    {
      name: "Cryptography (AES/RSA)",
      level: 80,
      commands: ["openssl", "encryption"],
    },
    { name: "IPSec/VPN", level: 82, commands: ["ipsec", "vpn configuration"] },
  ],
};

export const featuredLabs = [
  {
    id: 1,
    title: "Advanced Persistent Threat Detection",
    course: "FIT5057",
    date: "2023-S2",
    objective:
      "Investigate and neutralize a sophisticated APT campaign using memory dump analysis, network traffic examination, and endpoint detection techniques.",
    toolsUsed: ["Wireshark", "Volatility", "YARA", "Splunk", "EDR"],
    commands: [
      'tshark -r capture.pcap -Y "tcp.flags.syn==1"',
      "volatility -f memory.dmp --profile=Win10x64 pslist",
      "yara -r rules.yar /suspicious/directory",
      "splunk search index=main sourcetype=windows | stats count by process_name",
    ],
    findings:
      "Identified C2 communication via DNS tunneling, extracted malicious DLL from memory, traced lateral movement across 5 hosts.",
    mitigation:
      "Isolated compromised hosts, implemented network segmentation, deployed custom YARA rules for detection.",
    difficulty: "Advanced",
    threatType: "APT",
  },
  {
    id: 2,
    title: "WannaCry Ransomware Investigation",
    course: "FIT5163",
    date: "2024-S1",
    objective:
      "Analyze WannaCry ransomware outbreak, identify infection vectors, and implement containment strategies.",
    toolsUsed: [
      "Windows Defender ATP",
      "Wireshark",
      "Sysinternals",
      "PowerShell",
    ],
    commands: [
      "Get-MpMachineStatus",
      "Get-MpThreatList",
      "netstat -ano | findstr LISTENING",
      'tshark -r traffic.pcap -Y "smb || smb2"',
    ],
    findings:
      "EternalBlue exploit via SMB, encryption of 1,247 files, attempted network propagation blocked by proper segmentation.",
    mitigation:
      "Applied MS17-010 patch, isolated infected machines, restored from backups, implemented application whitelisting.",
    difficulty: "Intermediate",
    threatType: "Ransomware",
  },
  {
    id: 3,
    title: "DDoS Attack Analysis & Mitigation",
    course: "FIT5129",
    date: "2023-S2",
    objective:
      "Detect and mitigate a simulated DDoS attack targeting web infrastructure using packet analysis and traffic shaping.",
    toolsUsed: ["Wireshark", "Hping3", "Nmap", "Snort", "iptables"],
    commands: [
      'tshark -r ddos.pcap -Y "tcp.flags.syn==1" | wc -l',
      "nmap -sn 192.168.1.0/24",
      "snort -r ddos.pcap -c snort.conf",
      "iptables -A INPUT -p tcp --syn -m limit --limit 1/s -j ACCEPT",
    ],
    findings:
      "SYN flood from 347 unique IPs, 45,000 requests/second peak, amplification via DNS reflection.",
    mitigation:
      "Implemented rate limiting, blocked malicious IPs, deployed CDN with DDoS protection, enabled SYN cookies.",
    difficulty: "Intermediate",
    threatType: "DDoS",
  },
];

export const professionalJourney = [
  {
    year: "2022",
    period: "Aug 2022 – Nov 2022",
    milestone: "Cybersecurity Intern",
    organization: "Verzeo & MVARO",
    type: "work",
    color: "orange",
    description:
      "Vulnerability assessments, IDS/IPS implementation, and SIEM operations",
    skills: [
      "IDS/IPS",
      "SIEM",
      "Firewall Configuration",
      "Vulnerability Scanning",
      "Network Security",
    ],
    achievements: [
      "25% reduction in reportable threats",
      "Identified 15 critical security weaknesses",
      "Deployed network security protocols",
    ],
  },
  {
    year: "2022-2023",
    period: "Nov 2022 – Jan 2023",
    milestone: "Ethical Hacking Intern",
    organization: "Internshala",
    type: "work",
    color: "purple",
    description:
      "Vulnerability assessment and penetration testing for live business websites",
    skills: [
      "Burp Suite",
      "OWASP ZAP",
      "Python Scripting",
      "Web Security",
      "Vulnerability Assessment",
    ],
    achievements: [
      "30% improvement in client security posture",
      "Discovered 6 critical vulnerabilities (SQLi, XSS)",
      "Automated security scanning with Python",
    ],
  },
  {
    year: "2023",
    period: "Feb 2023",
    milestone: "Master of Cybersecurity",
    organization: "Monash University",
    type: "academic",
    color: "cyan",
    description:
      "Graduate program specializing in security operations and infrastructure",
    skills: [
      "Security Operations",
      "Threat Hunting",
      "Infrastructure Security",
      "Penetration Testing",
    ],
    achievements: [
      "Started comprehensive cybersecurity graduate program",
      "200+ hands-on security labs",
      "Focus on SOC operations and threat analysis",
    ],
  },
  {
    year: "2023",
    period: "2023 S2",
    milestone: "Security Operations Foundation",
    organization: "Monash University",
    type: "academic",
    color: "blue",
    description:
      "Intensive training in threat detection, network security, and incident response",
    skills: [
      "Threat Detection",
      "Network Security",
      "IDS/IPS",
      "Incident Response",
      "SIEM Deployment",
    ],
    achievements: [
      "FIT5057: Advanced Threat Detection (45 labs)",
      "FIT5129: Network Security & Attack Simulation (35 labs)",
      "Built automated threat detection systems",
    ],
  },
  {
    year: "2024",
    period: "2024 S1",
    milestone: "Advanced Security Specialization",
    organization: "Monash University",
    type: "academic",
    color: "cyan",
    description:
      "Completed advanced courses in malware analysis, secure software, and cloud security",
    skills: [
      "Malware Analysis",
      "Reverse Engineering",
      "Secure Coding",
      "Cloud Security",
      "DevSecOps",
    ],
    achievements: [
      "FIT5163: Malware Analysis & Reverse Engineering (40 labs)",
      "FIT9136: Secure Software Development (25 labs)",
      "FIT5225: Cloud Security & Infrastructure (40 labs)",
    ],
  },
  {
    year: "2024",
    period: "2024",
    milestone: "Security Testing & Shift-Left Advocacy",
    organization: "Habitat for Wings (IE Project)",
    type: "work",
    color: "cyan",
    description:
      "Led iterative vulnerability assessments on a Cloudflare/AWS production platform, embedding security testing into the CI/CD lifecycle.",
    skills: [
      "Nikto",
      "WhatWeb",
      "CORS Hardening",
      "CSP",
      "HSTS",
      "EXIF Stripping",
      "Shift-Left Security",
    ],
    achievements: [
      "Discovered and remediated permissive CORS and missing security headers",
      "Enforced HSTS, CSP, X-Content-Type-Options across production",
      "Integrated automated malware scanning for user-uploaded content",
    ],
  },
  {
    year: "2025",
    period: "Aug 2025 – Present",
    milestone: "Jr. Security Engineer",
    organization: "THIRU Labs",
    type: "work",
    color: "emerald",
    description:
      "Architecting multi-node Elastic SIEM clusters, automated TDR pipelines, and high-interaction deception networks.",
    skills: [
      "Elastic SIEM",
      "Logstash Pipeline",
      "T-Pot Decoy",
      "Kibana EQL",
      "GLPI Architecture",
    ],
    achievements: [
      "Architected a 30+ decoy T-Pot honeypot network capturing 1,000+ weekly probes",
      "Engineered a Logstash pipeline achieving <60s detection for fileless LotL threats",
      "Deployed remote CMH agents across 40+ endpoints for 100% asset visibility",
    ],
  },
];

export const commandCheatsheet = {
  wireshark: {
    description:
      "Network protocol analyzer - Deep packet inspection and traffic analysis",
    commands: [
      { cmd: "tshark -r capture.pcap", desc: "Read packet capture file" },
      {
        cmd: "tshark -i eth0 -w output.pcap",
        desc: "Capture live traffic to file",
      },
      {
        cmd: 'tshark -r file.pcap -Y "tcp.port==443"',
        desc: "Filter HTTPS traffic",
      },
      {
        cmd: "tshark -r file.pcap -T fields -e ip.src -e ip.dst",
        desc: "Extract source/dest IPs",
      },
    ],
    useCases: [
      "Network intrusion detection",
      "Malware traffic analysis",
      "Protocol debugging",
    ],
  },
  nmap: {
    description: "Network discovery and security auditing tool",
    commands: [
      { cmd: "nmap -sP 192.168.1.0/24", desc: "Ping scan to discover hosts" },
      { cmd: "nmap -sS target_ip", desc: "SYN stealth scan" },
      { cmd: "nmap -p- target_ip", desc: "Scan all 65535 ports" },
      { cmd: "nmap -sV -O target_ip", desc: "Detect services and OS" },
    ],
    useCases: [
      "Network reconnaissance",
      "Vulnerability assessment",
      "Service enumeration",
    ],
  },
  splunk: {
    description:
      "SIEM platform for searching, monitoring, and analyzing machine data",
    commands: [
      {
        cmd: "index=main | stats count by source",
        desc: "Count events by source",
      },
      {
        cmd: "index=* sourcetype=windows | table _time, host, EventCode",
        desc: "Windows event analysis",
      },
      {
        cmd: "index=network | where bytes > 1000000",
        desc: "Find large data transfers",
      },
      {
        cmd: "index=main earliest=-24h | timechart count by severity",
        desc: "Event timeline by severity",
      },
    ],
    useCases: [
      "Security monitoring",
      "Threat hunting",
      "Log correlation",
      "Incident investigation",
    ],
  },
  yara: {
    description:
      "Pattern matching tool for malware identification and classification",
    commands: [
      {
        cmd: "yara rules.yar /path/to/scan",
        desc: "Scan directory with YARA rules",
      },
      { cmd: "yara -r rules.yar /suspicious/", desc: "Recursive scan" },
      { cmd: "yara -s rules.yar malware.exe", desc: "Show matching strings" },
      { cmd: "yara -m rules.yar sample", desc: "Show metadata" },
    ],
    useCases: [
      "Malware detection",
      "Threat hunting",
      "File classification",
      "IOC matching",
    ],
  },
  snort: {
    description: "Intrusion detection and prevention system (IDS/IPS)",
    commands: [
      { cmd: "snort -r capture.pcap", desc: "Analyze packet capture" },
      {
        cmd: "snort -v -c snort.conf",
        desc: "Run in verbose mode with config",
      },
      { cmd: "snort -A console -c snort.conf", desc: "Alert mode to console" },
      {
        cmd: "snort -r file.pcap -c snort.conf -l ./logs",
        desc: "Analyze and log to directory",
      },
    ],
    useCases: [
      "Real-time traffic analysis",
      "Attack detection",
      "Protocol anomaly detection",
    ],
  },
  metasploit: {
    description:
      "Penetration testing framework for exploitation and security assessment",
    commands: [
      { cmd: "msfconsole", desc: "Start Metasploit console" },
      { cmd: "use exploit/multi/handler", desc: "Use multi handler exploit" },
      { cmd: "search ransomware", desc: "Search for exploits" },
      { cmd: "show options", desc: "Display exploit options" },
    ],
    useCases: [
      "Vulnerability exploitation",
      "Post-exploitation",
      "Payload generation",
    ],
  },
};

export const certifications = [
  {
    name: "Microsoft Certified: Security Operations Analyst",
    organization: "Microsoft",
    status: "In Progress",
    year: "2024-2025",
    description:
      "SC-200 certification focusing on threat detection, investigation, and response using Microsoft security solutions",
    skills: [
      "Threat Detection",
      "Incident Response",
      "Microsoft Sentinel",
      "Microsoft Defender",
    ],
  },
  {
    name: "Cisco CCNA",
    organization: "Cisco",
    status: "In Progress",
    year: "2024-2025",
    description:
      "Network fundamentals, IP connectivity, security fundamentals, and automation",
    skills: ["Network Security", "Routing & Switching", "Network Automation"],
  },
  {
    name: "Azure for Architects - Networking Strategy",
    organization: "LinkedIn Learning",
    status: "Completed",
    year: "2024",
    description: "Advanced Azure networking architecture and strategy",
    skills: ["Cloud Architecture", "Azure Networking", "Security Design"],
  },
  {
    name: "Ethical Hacking & Cybersecurity Fundamentals",
    organization: "Professional Training",
    status: "Completed",
    year: "2023",
    description:
      "Comprehensive ethical hacking and cybersecurity fundamentals training",
    skills: [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Security Testing",
    ],
  },
  {
    name: "eJPT",
    organization: "INE Security",
    year: "2025",
    status: "In Progress",
    description:
      "Junior Penetration Tester certification focusing on practical penetration testing methodology and real-world assessment skills",
    skills: [
      "Penetration Testing",
      "Network Security",
      "Web Application Security",
      "Host & Network Auditing",
    ],
  },
];

export const workExperience = [
  {
    id: 1,
    company: "THIRU (Threat Incident and Response Unit)",
    role: "Security Engineer",
    period: "Aug 2025 – Present",
    location: "Melbourne, Australia",
    current: true,
    responsibilities: [
      "Engineered a multi-node Elastic SIEM cluster and integrated a GLPI asset management platform (390+ interconnected tables), achieving 100% asset visibility across 40+ endpoints.",
      'Architected a high-interaction T-Pot deception network featuring 30+ virtualized Docker decoys (e.g., custom Python Flask "FakeBank"), capturing 1,000+ weekly automated probing attempts.',
      "Configured an automated Logstash TDR pipeline polling at exact 60-second intervals to detect and extract fileless Living-off-the-Land (LotL) threats.",
      "Authored custom Kibana EQL rules mapped to MITRE ATT&CK techniques, achieving sub-minute (<60s) threat triage and automated SMTP alerting.",
      "Directed zero-downtime remote CMH agent deployments and fully automated hardware discovery sweeps across multiple /24 network subnets, eliminating physical infrastructure blind spots.",
    ],
    technologies: [
      "Elastic SIEM",
      "Logstash",
      "T-Pot Honeypot",
      "GLPI ITAM",
      "Kibana EQL",
      "Python Flask",
    ],
    achievements: [
      "Captured 1,000+ weekly attacks via 30+ custom T-Pot decoys",
      "Achieved <60s automated alerting for LotL PowerShell executions",
      "Contextualized 100% of live SIEM alerts via GLPI ITAM integration",
    ],
  },
  {
    id: 2,
    company: "Internshala",
    role: "Ethical Hacking Intern",
    period: "Nov 2022 – Jan 2023",
    location: "Remote",
    current: false,
    responsibilities: [
      "Detected and remediated critical vulnerabilities in live business websites, improving security posture by 30%",
      "Conducted manual and automated testing with Burp Suite/OWASP ZAP, discovering flaws such as SQLi/XSS",
      "Developed Python scripts to automate security scanning and reporting",
      "Communicated remediation plans to dev teams via email/Slack, strengthening client relationships",
    ],
    technologies: [
      "Burp Suite",
      "OWASP ZAP",
      "Python",
      "SQL Injection",
      "XSS",
      "Vulnerability Assessment",
    ],
    achievements: [
      "30% improvement in security posture",
      "Discovered 6 critical vulnerabilities",
      "Automated scanning with Python scripts",
    ],
  },
  {
    id: 3,
    company: "Verzeo & MVARO",
    role: "Cybersecurity Intern",
    period: "Aug 2022 – Nov 2022",
    location: "Remote",
    current: false,
    responsibilities: [
      "Implemented vulnerability assessments for web and network systems; identified and tracked 15 weaknesses, reducing reportable threats by 25%",
      "Utilized IDS/IPS and SIEM tools for threat detection and event management",
      "Presented professional-grade technical documentation and client-facing reports",
      "Updated firewall rules and collaborated on network security protocol deployment",
    ],
    technologies: [
      "IDS/IPS",
      "SIEM",
      "Firewall Configuration",
      "Vulnerability Assessment",
      "Network Security",
    ],
    achievements: [
      "25% reduction in reportable threats",
      "Identified 15 critical weaknesses",
      "Improved firewall rules and network security",
    ],
  },
];

export const education = [
  {
    id: 1,
    institution: "Monash University",
    degree: "Master of Cybersecurity",
    period: "2023 – 2025",
    location: "Melbourne, Australia",
    highlights: [
      {
        area: "Cloud & DevOps",
        items: [
          "Deployed containerized Flask API on Kubernetes (OCI) with YOLOv3-tiny for real-time ML object detection",
          "Built and optimised Docker images, orchestrated pods across controller and worker nodes with automated Locust load testing",
        ],
      },
      {
        area: "Penetration Testing",
        items: [
          "Executed full attack chains on vulnerable VMs — reconnaissance, exploitation, privilege escalation to root shell",
          "Crafted buffer overflow exploits with NOP sleds and custom shellcode to bypass ASLR, StackGuard, and NX protections",
        ],
      },
      {
        area: "Network Security & Forensics",
        items: [
          "Designed forensic-ready enterprise architecture with DMZ, WAF, IDS/IPS, and SIEM integration for continuous threat monitoring",
          "Simulated BGP hijacking and DNS cache poisoning attacks; implemented prefix filtering and DNSSEC mitigations",
        ],
      },
      {
        area: "Applied Cryptography",
        items: [
          "Established internal PKI with Root CA, X.509 certificates, and TLS 1.3 enforcement with Perfect Forward Secrecy",
          "Executed timing side-channel attacks against RSA square-and-multiply to extract secret keys",
        ],
      },
      {
        area: "Full-Stack Security (Habitat for Wings)",
        items: [
          "Secured Vue.js + Spring Boot biodiversity platform on AWS across 3 iterations",
          "Hardened CORS, CSP, HSTS headers; integrated automated malware scanning and EXIF stripping for user uploads",
        ],
      },
      {
        area: "Offensive Tooling",
        items: [
          "Built multi-threaded Python port scanners with IDS evasion (port randomisation, timing delays)",
          "Executed UNION-based SQLi, DOM XSS, and MITM attacks via custom ARP poisoning scripts",
        ],
      },
    ],
  },
];
