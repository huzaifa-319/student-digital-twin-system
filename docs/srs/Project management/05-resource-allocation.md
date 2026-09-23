# Resource Allocation Plan

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-RES-005  
**Standard:** IEEE/ISO/IEC 16326:2009 §6.4 — Managerial Process Plans  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Human Resources

### 1.1 Team Roles

| Role | Count | Responsibilities | Required Skills |
|---|---|---|---|
| Project Lead / Backend Dev | 1 | Architecture, Node.js API, integration, coordination | TypeScript, Node.js, PostgreSQL, Prisma, Express |
| Frontend Developer | 1 | React UI, dashboard, charts, component library | React, TypeScript, Tailwind CSS, Zustand, Chart.js |
| AI/ML Developer | 1 | Python models, Flask API, evaluation | Python, scikit-learn, pandas, numpy, Flask |

> **Single-developer teams:** all roles are held by one person; effort estimates remain the same but timeline extends proportionally.

### 1.2 Role Allocation by Phase

| Phase | Project Lead | Frontend Dev | AI/ML Dev |
|---|---|---|---|
| Planning | 100% | 20% | 20% |
| Requirements | 80% | 30% | 30% |
| Design | 60% | 40% | 30% |
| Frontend Dev | 20% | 100% | 0% |
| Backend Dev | 100% | 20% | 0% |
| AI/ML Dev | 20% | 0% | 100% |
| Integration | 50% | 40% | 40% |
| Testing | 40% | 30% | 30% |
| Deployment | 80% | 30% | 30% |
| Documentation | 50% | 30% | 30% |

### 1.3 Supervisor / Stakeholder Time

| Person | Role | Time Commitment | Activities |
|---|---|---|---|
| University Supervisor | Academic oversight | ~2 hours/bi-weekly meeting | Milestone reviews, SRS sign-off, UAT, final submission |

---

## 2. Technical Resources

### 2.1 Development Hardware

| Resource | Specification | Owner | Usage |
|---|---|---|---|
| Developer Laptop 1 | 16 GB RAM, modern CPU, SSD | Team member | Primary development |
| Developer Laptop 2 | 8 GB RAM minimum | Team member | Frontend development |
| Developer Laptop 3 | 8 GB RAM minimum | Team member | AI/ML development |
| University Server | 8-core, 16 GB RAM | University | Production deployment |
| University Lab PCs | Standard spec | University | Backup development |

### 2.2 Software Resources

All software is open-source (zero licensing cost).

| Software | Version | License | Purpose |
|---|---|---|---|
| Node.js | 20 LTS | MIT | Backend runtime |
| React | 18 | MIT | Frontend library |
| TypeScript | 5.x | Apache 2.0 | Type safety |
| PostgreSQL | 15 | PostgreSQL License | Database |
| Python | 3.10+ | PSF | AI service |
| scikit-learn | 1.3+ | BSD | ML models |
| Flask | 3.x | BSD | AI API server |
| Prisma | 5.x | Apache 2.0 | ORM |
| Tailwind CSS | 3.x | MIT | Styling |
| Nginx | 1.24+ | BSD | Reverse proxy |
| PM2 | Latest | AGPL | Process manager |
| Git | 2.x | LGPL | Version control |
| VS Code | Latest | MIT | IDE |
| Postman | Latest | Free tier | API testing |
| k6 | Latest | AGPL | Performance testing |
| OWASP ZAP | Latest | Apache 2.0 | Security testing |

### 2.3 Cloud / Hosting Resources

| Resource | Provider | Cost |
|---|---|---|
| Source code repository | GitHub (free tier) | Free |
| Production server | University infrastructure | Free |
| SSL certificate | Let's Encrypt (Certbot) | Free |
| Email delivery | University SMTP or free tier (Mailhog for dev) | Free |

---

## 3. Resource Loading Table

The table shows estimated hours per role per month.

| Month | Task Focus | PL Hours | FE Hours | AI Hours | Total |
|---|---|---|---|---|---|
| Oct 2026 | Planning + Requirements | 40 | 16 | 16 | 72 |
| Nov 2026 | Design + Scaffolding | 36 | 32 | 16 | 84 |
| Dec 2026 | Backend Dev + FE Start | 52 | 48 | 24 | 124 |
| Jan 2027 | Backend Complete + FE | 48 | 48 | 36 | 132 |
| Feb 2027 | AI/ML Dev | 20 | 24 | 52 | 96 |
| Mar 2027 | Integration | 40 | 32 | 32 | 104 |
| Apr 2027 | Testing | 32 | 24 | 24 | 80 |
| May 2027 | Deployment + Docs | 36 | 24 | 20 | 80 |
| **Total** | | **304** | **248** | **220** | **772** |

---

## 4. Skills Matrix

| Skill | Project Lead | Frontend Dev | AI/ML Dev | Required For |
|---|---|---|---|---|
| TypeScript | ✅ Expert | ✅ Expert | ⚠ Basic | All code |
| Node.js / Express | ✅ Expert | ⚠ Basic | ❌ | Backend |
| React / Hooks | ⚠ Intermediate | ✅ Expert | ❌ | Frontend |
| Tailwind CSS | ⚠ Basic | ✅ Expert | ❌ | Frontend |
| PostgreSQL | ✅ Expert | ⚠ Basic | ⚠ Basic | Database |
| Prisma ORM | ✅ Expert | ❌ | ❌ | Backend |
| JWT / Auth | ✅ Expert | ⚠ Basic | ❌ | Auth |
| Python 3 | ⚠ Basic | ❌ | ✅ Expert | AI service |
| scikit-learn | ❌ | ❌ | ✅ Expert | ML models |
| Flask | ❌ | ❌ | ✅ Expert | AI API |
| Git / GitHub | ✅ Expert | ✅ Expert | ✅ Expert | All phases |
| Docker | ⚠ Basic | ❌ | ❌ | Optional |
| Nginx | ✅ Expert | ❌ | ❌ | Deployment |

✅ = Proficient | ⚠ = Needs training | ❌ = Not required for role

---

## 5. Training Requirements

| Skill Gap | Who | Training Action | When |
|---|---|---|---|
| Prisma ORM (if unfamiliar) | Backend team | Self-study: prisma.io docs (8h) | Week 1 |
| React + Zustand (if unfamiliar) | Frontend team | Self-study: react.dev + Zustand docs (8h) | Week 1 |
| scikit-learn (if unfamiliar) | AI team | Self-study: scikit-learn.org tutorials (16h) | Week 4 |
| Nginx deployment | Project Lead | DigitalOcean/Nginx deployment guides (4h) | Week 30 |

---

## 6. Resource Constraints

1. **Time constraint:** All team members are part-time (university students); realistic availability is 4–6 hours/day.
2. **Skill constraint:** If a team member lacks a skill, training time is budgeted before the relevant phase begins.
3. **Infrastructure constraint:** The university server must be provisioned before the deployment phase (Week 30).
4. **Data constraint:** AI model training requires historical academic records; minimum 100 student-semester records needed (see SRS FR-AI-28).
5. **Single-developer risk:** If team size is 1, the timeline must extend by ~50% or scope must be reduced (see Risk Register R-007).
