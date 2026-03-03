// Lab Experience Data parsed from n8n-university-audit.xlsx

export const labStats = {
  totalLabs: 200,
  coursesCompleted: ['FIT5057', 'FIT5129', 'FIT9137', 'FIT5163', 'FIT9136', 'FIT5225'],
  yearsActive: '2023-2024',
  totalHours: 600
};

export const threatCategories = [
  { name: 'Ransomware', count: 48, percentage: 24, color: '#ef4444' },
  { name: 'Advanced Persistent Threats', count: 40, percentage: 20, color: '#f97316' },
  { name: 'Network Intrusions', count: 35, percentage: 17.5, color: '#eab308' },
  { name: 'DDoS Attacks', count: 25, percentage: 12.5, color: '#00d9ff' },
  { name: 'Malware Analysis', count: 22, percentage: 11, color: '#8b5cf6' },
  { name: 'Data Breaches', count: 18, percentage: 9, color: '#ec4899' },
  { name: 'Brute Force', count: 12, percentage: 6, color: '#10b981' }
];

export const toolsProficiency = {
  'Network Analysis': [
    { name: 'Wireshark', level: 95, commands: ['tshark', 'tcpdump'] },
    { name: 'Nmap', level: 90, commands: ['nmap -sP', 'nmap -sS', 'nmap -p-'] },
    { name: 'Tcpdump', level: 85, commands: ['tcpdump -nnvvXSs', 'tcpdump -i eth0'] },
    { name: 'Netstat', level: 88, commands: ['netstat -ano', 'netstat -tunapl'] }
  ],
  'SIEM & Log Analysis': [
    { name: 'Splunk', level: 92, commands: ['splunk search', 'splunk query'] },
    { name: 'ELK Stack', level: 85, commands: ['elasticsearch', 'logstash'] },
    { name: 'Wazuh', level: 80, commands: ['wazuh-control'] }
  ],
  'Malware Analysis': [
    { name: 'YARA', level: 88, commands: ['yara', 'yara -m'] },
    { name: 'Strings', level: 90, commands: ['strings', 'strings -n'] },
    { name: 'Volatility', level: 75, commands: ['volatility -f'] },
    { name: 'VirusTotal', level: 85, commands: ['virustotal --file'] }
  ],
  'Intrusion Detection': [
    { name: 'Snort', level: 87, commands: ['snort -r', 'snort -v'] },
    { name: 'Suricata', level: 82, commands: ['suricata -c'] },
    { name: 'Zeek (Bro)', level: 78, commands: ['zeek -i'] }
  ],
  'Forensics & IR': [
    { name: 'Memory Forensics', level: 80, commands: ['volatility', 'strings'] },
    { name: 'Packet Analysis', level: 93, commands: ['tshark', 'wireshark'] },
    { name: 'EDR Tools', level: 85, commands: ['Get-MpThreatList'] },
    { name: 'Threat Hunting', level: 88, commands: ['powershell', 'Get-Process'] }
  ],
  'Exploitation & Testing': [
    { name: 'Metasploit', level: 75, commands: ['msfconsole', 'use exploit'] },
    { name: 'Hydra', level: 70, commands: ['hydra -l'] },
    { name: 'Fail2ban', level: 82, commands: ['fail2ban-client'] }
  ]
};

export const featuredLabs = [
  {
    id: 1,
    title: 'Advanced Persistent Threat Detection',
    course: 'FIT5057',
    date: '2023-S2',
    objective: 'Investigate and neutralize a sophisticated APT campaign using memory dump analysis, network traffic examination, and endpoint detection techniques.',
    toolsUsed: ['Wireshark', 'Volatility', 'YARA', 'Splunk', 'EDR'],
    commands: [
      'tshark -r capture.pcap -Y "tcp.flags.syn==1"',
      'volatility -f memory.dmp --profile=Win10x64 pslist',
      'yara -r rules.yar /suspicious/directory',
      'splunk search index=main sourcetype=windows | stats count by process_name'
    ],
    findings: 'Identified C2 communication via DNS tunneling, extracted malicious DLL from memory, traced lateral movement across 5 hosts.',
    mitigation: 'Isolated compromised hosts, implemented network segmentation, deployed custom YARA rules for detection.',
    difficulty: 'Advanced',
    threatType: 'APT'
  },
  {
    id: 2,
    title: 'WannaCry Ransomware Investigation',
    course: 'FIT5163',
    date: '2024-S1',
    objective: 'Analyze WannaCry ransomware outbreak, identify infection vectors, and implement containment strategies.',
    toolsUsed: ['Windows Defender ATP', 'Wireshark', 'Sysinternals', 'PowerShell'],
    commands: [
      'Get-MpMachineStatus',
      'Get-MpThreatList',
      'netstat -ano | findstr LISTENING',
      'tshark -r traffic.pcap -Y "smb || smb2"'
    ],
    findings: 'EternalBlue exploit via SMB, encryption of 1,247 files, attempted network propagation blocked by proper segmentation.',
    mitigation: 'Applied MS17-010 patch, isolated infected machines, restored from backups, implemented application whitelisting.',
    difficulty: 'Intermediate',
    threatType: 'Ransomware'
  },
  {
    id: 3,
    title: 'DDoS Attack Analysis & Mitigation',
    course: 'FIT5129',
    date: '2023-S2',
    objective: 'Detect and mitigate a simulated DDoS attack targeting web infrastructure using packet analysis and traffic shaping.',
    toolsUsed: ['Wireshark', 'Hping3', 'Nmap', 'Snort', 'iptables'],
    commands: [
      'tshark -r ddos.pcap -Y "tcp.flags.syn==1" | wc -l',
      'nmap -sn 192.168.1.0/24',
      'snort -r ddos.pcap -c snort.conf',
      'iptables -A INPUT -p tcp --syn -m limit --limit 1/s -j ACCEPT'
    ],
    findings: 'SYN flood from 347 unique IPs, 45,000 requests/second peak, amplification via DNS reflection.',
    mitigation: 'Implemented rate limiting, blocked malicious IPs, deployed CDN with DDoS protection, enabled SYN cookies.',
    difficulty: 'Intermediate',
    threatType: 'DDoS'
  }
];

export const academicTimeline = [
  {
    year: '2023',
    semester: 'S1',
    course: 'FIT9137',
    focus: 'Introductory Security Labs',
    labs: 15,
    highlights: ['Network fundamentals', 'Basic packet analysis', 'Security tool introduction']
  },
  {
    year: '2023',
    semester: 'S2',
    course: 'FIT5057',
    focus: 'Advanced Threat Detection',
    labs: 45,
    highlights: ['APT investigation', 'Memory forensics', 'SIEM deployment', 'Incident response']
  },
  {
    year: '2023',
    semester: 'S2',
    course: 'FIT5129',
    focus: 'Network Security & Attack Simulation',
    labs: 35,
    highlights: ['DDoS mitigation', 'IDS/IPS deployment', 'Network hardening', 'Penetration testing']
  },
  {
    year: '2024',
    semester: 'S1',
    course: 'FIT5163',
    focus: 'Malware Analysis & Reverse Engineering',
    labs: 40,
    highlights: ['Ransomware analysis', 'Static/dynamic analysis', 'Sandboxing', 'YARA rules']
  },
  {
    year: '2024',
    semester: 'S1',
    course: 'FIT9136',
    focus: 'Secure Software Development',
    labs: 25,
    highlights: ['Secure coding', 'Vulnerability assessment', 'Code review', 'Security testing']
  },
  {
    year: '2024',
    semester: 'S1',
    course: 'FIT5225',
    focus: 'Cloud Security & Infrastructure',
    labs: 40,
    highlights: ['AWS security', 'Container security', 'Infrastructure as Code', 'DevSecOps']
  }
];

export const commandCheatsheet = {
  wireshark: {
    description: 'Network protocol analyzer - Deep packet inspection and traffic analysis',
    commands: [
      { cmd: 'tshark -r capture.pcap', desc: 'Read packet capture file' },
      { cmd: 'tshark -i eth0 -w output.pcap', desc: 'Capture live traffic to file' },
      { cmd: 'tshark -r file.pcap -Y "tcp.port==443"', desc: 'Filter HTTPS traffic' },
      { cmd: 'tshark -r file.pcap -T fields -e ip.src -e ip.dst', desc: 'Extract source/dest IPs' }
    ],
    useCases: ['Network intrusion detection', 'Malware traffic analysis', 'Protocol debugging']
  },
  nmap: {
    description: 'Network discovery and security auditing tool',
    commands: [
      { cmd: 'nmap -sP 192.168.1.0/24', desc: 'Ping scan to discover hosts' },
      { cmd: 'nmap -sS target_ip', desc: 'SYN stealth scan' },
      { cmd: 'nmap -p- target_ip', desc: 'Scan all 65535 ports' },
      { cmd: 'nmap -sV -O target_ip', desc: 'Detect services and OS' }
    ],
    useCases: ['Network reconnaissance', 'Vulnerability assessment', 'Service enumeration']
  },
  splunk: {
    description: 'SIEM platform for searching, monitoring, and analyzing machine data',
    commands: [
      { cmd: 'index=main | stats count by source', desc: 'Count events by source' },
      { cmd: 'index=* sourcetype=windows | table _time, host, EventCode', desc: 'Windows event analysis' },
      { cmd: 'index=network | where bytes > 1000000', desc: 'Find large data transfers' },
      { cmd: 'index=main earliest=-24h | timechart count by severity', desc: 'Event timeline by severity' }
    ],
    useCases: ['Security monitoring', 'Threat hunting', 'Log correlation', 'Incident investigation']
  },
  yara: {
    description: 'Pattern matching tool for malware identification and classification',
    commands: [
      { cmd: 'yara rules.yar /path/to/scan', desc: 'Scan directory with YARA rules' },
      { cmd: 'yara -r rules.yar /suspicious/', desc: 'Recursive scan' },
      { cmd: 'yara -s rules.yar malware.exe', desc: 'Show matching strings' },
      { cmd: 'yara -m rules.yar sample', desc: 'Show metadata' }
    ],
    useCases: ['Malware detection', 'Threat hunting', 'File classification', 'IOC matching']
  },
  snort: {
    description: 'Intrusion detection and prevention system (IDS/IPS)',
    commands: [
      { cmd: 'snort -r capture.pcap', desc: 'Analyze packet capture' },
      { cmd: 'snort -v -c snort.conf', desc: 'Run in verbose mode with config' },
      { cmd: 'snort -A console -c snort.conf', desc: 'Alert mode to console' },
      { cmd: 'snort -r file.pcap -c snort.conf -l ./logs', desc: 'Analyze and log to directory' }
    ],
    useCases: ['Real-time traffic analysis', 'Attack detection', 'Protocol anomaly detection']
  },
  metasploit: {
    description: 'Penetration testing framework for exploitation and security assessment',
    commands: [
      { cmd: 'msfconsole', desc: 'Start Metasploit console' },
      { cmd: 'use exploit/multi/handler', desc: 'Use multi handler exploit' },
      { cmd: 'search ransomware', desc: 'Search for exploits' },
      { cmd: 'show options', desc: 'Display exploit options' }
    ],
    useCases: ['Vulnerability exploitation', 'Post-exploitation', 'Payload generation']
  }
};

export const certifications = [
  {
    name: 'n8n University Security Audit',
    organization: 'Academic',
    year: '2023-2024',
    description: '200+ hands-on cybersecurity labs covering threat detection, incident response, and security operations',
    skills: ['Threat Analysis', 'Network Security', 'Malware Analysis', 'SIEM', 'Forensics']
  },
  {
    name: 'Cybersecurity Specialization',
    organization: 'Monash University',
    year: '2023-2024',
    courses: ['FIT5057', 'FIT5129', 'FIT9137', 'FIT5163', 'FIT9136', 'FIT5225'],
    description: 'Comprehensive graduate coursework in security operations, threat hunting, and infrastructure hardening'
  }
];
