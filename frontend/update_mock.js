const fs = require('fs');

let content = fs.readFileSync('src/mock.js', 'utf8');

// Find the start and end of the allProjects array
const startIdx = content.indexOf('export const allProjects = [');
const endIdx = content.indexOf('];\n\nexport const projectCategories');

if (startIdx === -1 || endIdx === -1) {
  console.log("Could not find allProjects array boundaries");
  process.exit(1);
}

// Extract the array string
const arrayStr = content.substring(startIdx + 'export const allProjects = '.length, endIdx + 1);

// Parse it using a safe eval (since it contains no tricky dynamic execution, just objects)
// We have to add a wrapping expression to eval an array literal
let allProjects;
try {
  allProjects = eval('(' + arrayStr + ')');
} catch (e) {
  console.log("Error parsing allProjects:", e);
  process.exit(1);
}

// Separate the projects we want to keep
// Keep:
// 1. T-Pot Honeypot & ELK Integration (id: 8)
// 2. Automated Infrastructure Hardening (SaltStack) (id: 9)
// 3. Ringwood Private Cloud (Home Lab) (id: 10)
// 4. Everything not in "Infrastructure & Network"
const keepProjectIds = [8, 9, 10];
let newProjects = [];

allProjects.forEach(p => {
  if (p.tab === "Infrastructure & Network") {
    if (keepProjectIds.includes(p.id)) {
      newProjects.push(p);
    }
  } else {
    newProjects.push(p);
  }
});

// The 5 new projects
const newInfraProjects = [
  {
    id: 1, title: "Enterprise Network Architecture & High-Speed Backbone Design", tab: "Infrastructure & Network",
    subtitle: "Scalable infrastructure for 650-employee enterprise",
    problem: "A public transport enterprise expanding to 650 employees needed a new high-speed backbone. Existing infrastructure was bottlenecked, risking broadcast storms and severe latency during peak video conferencing and web traffic.",
    stack: ["Cisco Catalyst 8500/9300x", "40Gbps Fiber", "Wi-Fi 6 (802.11ax)", "Layer 3 Routing", "VLAN Segmentation", "QoS"],
    solution: [
      "Engineered a hierarchical Layer 3 routed backbone to explicitly segment broadcast domains and prevent ARP storms.",
      "Designed an underground physical infrastructure utilizing redundant 40Gbps optical fiber links.",
      "Implemented a modified star topology for strict fault isolation with CAT 6A/7a Ethernet.",
      "Deployed a high-density WLAN utilizing Wi-Fi 6 with 11 TP-Link Omada APs per floor."
    ],
    impact: "Delivered a highly resilient, enterprise-grade network guaranteeing 20-25 Mbps per wired user. Zero risk of network-wide broadcast failures and future-proofed for over 200 concurrent peak users at 60Mbps each.", 
    difficulty: "Expert", type: "Enterprise",
    thumbnail: "/api/placeholder/600/400", demoUrl: "#", repoUrl: "#", questions: []
  },
  {
    id: 2, title: "Multi-Campus IPSec VPN & Zero-Trust Perimeter Hardening", tab: "Infrastructure & Network",
    subtitle: "Enterprise-scale secure network connecting 3 campuses",
    problem: "Monash University's three distributed campuses suffered from a flat, insecure network architecture, leaving highly sensitive internal systems vulnerable to eavesdropping and lateral movement by external threat actors.",
    stack: ["IPSec IKEv2", "AES-256-GCM", "Mikrotik RouterOS", "GNS3", "Zero-Trust Model", "Stateful Firewall"],
    solution: [
      "Deployed perimeter security gateways utilizing GNS3 and Mikrotik RouterOS at each campus edge.",
      "Engineered site-to-site VPNs using IPSec in Tunnel Mode to hide internal routing tables.",
      "Enforced military-grade encryption with IKEv2, AES-256-GCM, and SHA256 over ESP.",
      "Implemented a strict 'default-deny' stateful firewall, restricting SSH and Mail access based on client location."
    ],
    impact: "Deep packet inspection verified 100% of inter-campus traffic was successfully encapsulated and encrypted. Zero-Trust firewall neutralized lateral movement risks while allowing legitimate established connections.", 
    difficulty: "Advanced", type: "Enterprise",
    thumbnail: "/api/placeholder/600/400", demoUrl: "#", repoUrl: "#", questions: []
  },
  {
    id: 3, title: "Advanced Port Scanner Development & IDS Evasion", tab: "Infrastructure & Network",
    subtitle: "Python-based stealth reconnaissance tool",
    problem: "Standard commercial scanners were easily blocked by the network's Snort IDS. The organization needed a bespoke tool to evaluate IDS efficacy against stealthy reconnaissance tactics actively employed by APTs.",
    stack: ["Python 3", "TCP SYN Scanning", "Snort IDS", "Raw Sockets", "Evasion Techniques", "Wireshark"],
    solution: [
      "Developed a custom, multi-threaded Python network scanner utilizing raw sockets for TCP SYN (half-open) scans.",
      "Enhanced UDP scanning by sending specific protocol payloads (like DNS queries) to force responses and reduce false negatives.",
      "Implemented port randomization (random.shuffle) to neutralize linear IDS signatures.",
      "Engineered programmatic timing delays ('low and slow' approach) to throttle traffic below IDS alert thresholds."
    ],
    impact: "Successfully enumerated all open TCP and UDP ports without triggering Snort IDS alarms. Proved that rate-based/signature-based IDS configurations are vulnerable to programmatic evasion.", 
    difficulty: "Expert", type: "Security Research",
    thumbnail: "/api/placeholder/600/400", demoUrl: "#", repoUrl: "#", questions: []
  },
  {
    id: 4, title: "DNS Infrastructure Exploitation & Cache Poisoning", tab: "Infrastructure & Network",
    subtitle: "Kaminsky-style attack demonstrating DNS vulnerability",
    problem: "The organization required a practical demonstration of catastrophic DNS redirection attacks to justify the costly deployment of DNSSEC, as their existing DNS inherently lacked cryptographic authentication.",
    stack: ["Python", "Scapy", "BIND9", "ARP Poisoning", "DNS Spoofing", "Kaminsky Attack"],
    solution: [
      "Executed a local MITM spoofing attack via weaponized ARP replies using Scapy to route victim traffic through an attacker machine.",
      "Intercepted UDP port 53 traffic, injecting forged DNS responses with fake authorative NS records.",
      "Executed a remote Kaminsky-style cache poisoning attack against a BIND9 resolver by flooding it with queries for non-existent dummy subdomains.",
      "Blasted the resolver with forged UDP responses simulating upstream root servers to guess the 16-bit Transaction ID and Source Port."
    ],
    impact: "Devastatingly effective attacks successfully bypassed standard resolution and poisoned the BIND9 cache, overwriting NS records and hijacking traffic for an entire domain zone. Definitively proved the urgent need for DNSSEC.", 
    difficulty: "Expert", type: "Critical Infrastructure",
    thumbnail: "/api/placeholder/600/400", demoUrl: "#", repoUrl: "#", questions: []
  },
  {
    id: 5, title: "Public Key Infrastructure (PKI) Deployment & TLS Hardening", tab: "Infrastructure & Network",
    subtitle: "Internal CA with TLS 1.3 enforcement",
    problem: "Critical internal web applications and SMTP mail gateways were operating in plaintext or utilizing unverified, self-signed certificates, leaving the enterprise vulnerable to packet sniffing and MITM interception.",
    stack: ["OpenSSL", "X.509 Certificates", "RSA-2048", "ECDHE", "TLS Hardening", "Apache2 / Postfix"],
    solution: [
      "Established a private Root Certificate Authority (CA) using OpenSSL as the ultimate anchor of trust.",
      "Generated RSA-2048 key pairs and authored CSRs to issue cryptographically binding digital certificates for enterprise servers.",
      "Configured Apache2 VirtualHosts and Postfix MTAs to strictly enforce HTTPS and mandatory TLS encrypted transit.",
      "Negotiated TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 cipher suite to guarantee Perfect Forward Secrecy (PFS) and deprecated legacy TLS 1.0/1.1."
    ],
    impact: "Seamlessly transitioned the enterprise to a fully encrypted environment, eliminating untrusted certificate warnings. Packet analysis proved all application data payloads were securely encrypted via AES-GCM and authenticated via SHA256.", 
    difficulty: "Advanced", type: "Enterprise",
    thumbnail: "/api/placeholder/600/400", demoUrl: "#", repoUrl: "#", questions: []
  }
];

// Add the new projects to the beginning of the list to maintain them in the 'Infrastructure & Network' tab
newProjects = [...newInfraProjects, ...newProjects];

// Convert back to string formatting nicely
// It's a bit tricky to stringify back to the exact format, but JSON.stringify with a reviver to remove quotes around keys works reasonably well.
let formattedArrayStr = JSON.stringify(newProjects, null, 2);

// Optionally clean up keys
formattedArrayStr = formattedArrayStr.replace(/"([^(")"]+)":/g, "$1:");

const finalContent = content.substring(0, startIdx + 'export const allProjects = '.length) + 
                     formattedArrayStr + 
                     content.substring(endIdx);

fs.writeFileSync('src/mock.js', finalContent);
console.log("Mock data updated successfully.");
