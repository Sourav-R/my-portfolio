# PRD — Sourav Ramakrishna Portfolio

## Original Problem Statement
Build a high-end, developer-centric portfolio for Sourav Ramakrishna (Jr. SOC Analyst) with a "Cyber-Minimalist" aesthetic using deep charcoal/slate-gray palette with Electric Emerald and Cobalt Blue accents.

## Core Requirements
- Terminal Hero Section with Parrot OS-style boot sequence
- Infrastructure & Home Lab Dashboard (Grafana/SIEM style)
- Security Briefs/Projects with glassmorphism cards
- Recruiter Mode Toggle (strip animations, download resume)
- Interactive "Secure Sandbox" terminal with cheat sheet
- Data from resume PDF + Excel (200+ security labs)
- Work Experience, Skills Matrix, Professional Journey timeline
- Advanced Technical Projects section (7 projects)
- Biometric Contact Form
- Interactive sidebar with scroll progress indicator

## Tech Stack
- **Frontend:** React, Tailwind CSS, shadcn-ui, Framer Motion, lucide-react
- **Backend:** FastAPI (minimal, planned)
- **Database:** MongoDB (planned)
- **Data:** All content from `/app/frontend/src/mock.js`

## What's Been Implemented
- [x] ~~Boot sequence~~ — Removed (Mar 2026), instant load now
- [x] Interactive sidebar with scroll progress + active section
- [x] **Narrative section flow (Mar 2026):** Hero → Journey → Experience → Skills → Certs → Tech Projects → Security Briefs → Lab Experience → Case Studies → Lab Monitor → Terminal → Contact
- [x] Work Experience section (from resume)
- [x] Skills Matrix with proficiency bars (static class maps)
- [x] Lab Experience dashboard (from Excel data)
- [x] Professional Journey timeline
- [x] Interactive Terminal Sandbox with command cheat sheet
- [x] Security Briefs / Projects section
- [x] Advanced Technical Projects — **Redesigned (Mar 2026):** 2-column grid, color-coded categories, expand/collapse cards, static Tailwind classes
- [x] Certifications section
- [x] Contact form (frontend mock, no backend)
- [x] Download Resume button
- [x] Recruiter Mode toggle
- [x] Footer

## Backlog
- **P1:** Backend contact form API (`/api/contact`) + MongoDB storage
- **P2:** Backend API contracts (`contracts.md`)

## Architecture
```
/app/frontend/src/
├── components/
│   ├── AdvancedProjectsSection.jsx  (redesigned Mar 2026)
│   ├── BootSequence.jsx
│   ├── CertificationsSection.jsx
│   ├── ContactSection.jsx
│   ├── FeaturedLabsSection.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── LabExperienceSection.jsx
│   ├── LabMonitor.jsx
│   ├── ProfessionalJourneySection.jsx
│   ├── ProjectsSection.jsx
│   ├── Sidebar.jsx
│   ├── SkillsMatrixSection.jsx
│   ├── TerminalSandbox.jsx
│   ├── WorkExperienceSection.jsx
│   └── ui/ (shadcn components)
├── pages/Portfolio.jsx
├── mock.js
├── App.js
└── index.css
```
