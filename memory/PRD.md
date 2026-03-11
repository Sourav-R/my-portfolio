# PRD — Sourav Ramakrishna Portfolio

## Original Problem Statement
Build a high-end, developer-centric portfolio for Sourav Ramakrishna (Jr. SOC Analyst) with a "Cyber-Minimalist" aesthetic using deep charcoal/slate-gray palette with Electric Emerald and Cobalt Blue accents.

## Tech Stack
- **Frontend:** React, Tailwind CSS, shadcn-ui, lucide-react
- **Backend:** FastAPI (minimal, planned)
- **Database:** MongoDB (planned)
- **Data:** All content from `frontend/src/mock.js` + `frontend/src/labExperience.js`

## What's Been Implemented
- [x] ~~Boot sequence~~ — Removed (Mar 2026), instant load
- [x] **Hero Section** — Bold name, mini terminal, status badges, stats (23 projects), CTAs
- [x] Interactive sidebar with scroll progress + active section (11 nav items)
- [x] **Narrative section flow:** Hero → Journey → Experience → Skills → Certs → Projects → Lab Experience → Case Studies → Lab Monitor → Terminal → Contact
- [x] **Unified Projects Hub (Mar 2026):** 23 projects across 5 category tabs:
  - Infrastructure & Network (10): VPN, Enterprise Network, IDS Evasion, DNS Poisoning, PKI, BGP, Email Gateway, Honeypot, SaltStack, Homelab
  - Cloud Engineering (3): CloudDetect/Kubernetes, Cloud API Threat Modeling, Secure Enterprise Network
  - Offensive Security (3): Pen Testing (Deathnote VM), Web App Vulns, Memory Corruption
  - Software Development (3): Secure Chat, OOP System, RESTful API
  - Forensics & Compliance (4): Forensic Readiness, Breach Analysis, Ethical Hacking Policy, Habitat for Wings IE
- [x] Technical Deep Dive questions on project expand (interview-prep style)
- [x] Professional Journey timeline (with Habitat for Wings IE entry added)
- [x] Work Experience section
- [x] Skills Matrix with proficiency bars
- [x] Certifications section
- [x] Lab Experience dashboard (200+ labs from Excel)
- [x] Featured Lab Case Studies
- [x] Lab Monitor (Grafana/SIEM style)
- [x] Interactive Terminal Sandbox with command cheat sheet
- [x] Contact form (frontend MOCK, no backend)
- [x] Download Resume button + Recruiter Mode toggle
- [x] Footer with easter egg

## Architecture
```
/app/frontend/src/
├── components/
│   ├── ProjectsHub.jsx          (unified 23-project section with tabs)
│   ├── AdvancedProjectsSection.jsx  (deprecated, no longer imported)
│   ├── ProjectsSection.jsx          (deprecated, no longer imported)
│   ├── HeroSection.jsx
│   ├── ProfessionalJourneySection.jsx
│   ├── WorkExperienceSection.jsx
│   ├── SkillsMatrixSection.jsx
│   ├── CertificationsSection.jsx
│   ├── LabExperienceSection.jsx
│   ├── FeaturedLabsSection.jsx
│   ├── LabMonitor.jsx
│   ├── TerminalSandbox.jsx
│   ├── ContactSection.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   └── ui/ (shadcn components)
├── pages/Portfolio.jsx
├── mock.js (allProjects, projectCategories, profileData, skills, etc.)
├── labExperience.js (professionalJourney, toolsProficiency, certifications, etc.)
├── App.js
└── index.css
```

## Backlog
- **P1:** Backend contact form API (`/api/contact`) + MongoDB storage
- **P2:** Sidebar dynamic Tailwind classes fix (pre-existing cosmetic)
- **P3:** Cleanup deprecated files (AdvancedProjectsSection.jsx, ProjectsSection.jsx)
