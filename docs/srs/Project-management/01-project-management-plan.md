# Project Management Plan

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-PMP-001  
**Standard:** IEEE/ISO/IEC 16326:2009 — Software Engineering: Life Cycle Processes — Project Management  
**Version:** 1.0  
**Date:** 2026-10-01  
**Status:** Draft

---

## Table of Contents

1. Introduction  
2. Project Overview  
3. Project Organization  
4. Managerial Process Plans  
5. Technical Process Plans  
6. Supporting Process Plans  

---

## 1. Introduction

### 1.1 Purpose

This Project Management Plan (PMP) defines the management approach, processes, and plans for the development of the Student Digital Twin System (SDTS). It governs how the project will be planned, monitored, controlled, and closed.

### 1.2 Scope

This PMP covers all phases of the SDTS project from inception through delivery and initial support. It applies to all project team members and deliverables listed in Section 2.3.

### 1.3 Applicable Standards

| Standard | Title | Use |
|---|---|---|
| IEEE/ISO/IEC 16326:2009 | Software Project Management Plan | This document |
| IEEE/ISO/IEC 12207:2017 | Software Life-Cycle Processes | Process framework |
| IEEE/ISO/IEC 29148:2018 | Requirements Engineering | SRS structure |
| IEEE/ISO/IEC 828:2012 | Configuration Management | SCM Plan |
| IEEE/ISO/IEC 16085:2006 | Risk Management | Risk Register |
| IEEE/ISO/IEC/IEEE 29119-3:2021 | Software Testing | Test Plan |

### 1.4 Definitions

| Term | Definition |
|---|---|
| SDTS | Student Digital Twin System |
| Digital Twin | A continuously updated virtual replica of a student's academic profile |
| Baseline | A formally approved version of a configuration item |
| CCB | Change Control Board |
| WBS | Work Breakdown Structure |
| PMP | Project Management Plan |

---

## 2. Project Overview

### 2.1 Project Purpose and Objectives

The SDTS creates an AI-powered academic intelligence platform that maintains a digital twin of each student, enabling:
- GPA prediction (MAE ≤ 0.30)
- At-risk classification (F1 ≥ 0.75)
- Personalized academic recommendations
- Career readiness tracking

### 2.2 Project Deliverables

| Deliverable | Description | Due Date |
|---|---|---|
| SRS | Software Requirements Specification | 2026-10-15 |
| Architecture Document | System architecture description | 2026-11-01 |
| Database Design | ER diagram + schema | 2026-11-15 |
| Frontend Prototype | React UI (key screens) | 2026-12-15 |
| Backend API v1 | Node.js REST API (core modules) | 2027-01-31 |
| AI Service v1 | Python prediction service | 2027-02-28 |
| Integration Build | All components integrated | 2027-03-31 |
| Test Report | System test results | 2027-04-30 |
| Deployment | System deployed to production server | 2027-05-15 |
| User Manual | End-user documentation | 2027-05-31 |

### 2.3 Project Schedule Summary

| Phase | Start | End | Duration |
|---|---|---|---|
| Initiation & Planning | 2026-10-01 | 2026-10-15 | 2 weeks |
| Requirements | 2026-10-01 | 2026-10-20 | 3 weeks |
| Design | 2026-10-20 | 2026-11-15 | 4 weeks |
| Frontend Development | 2026-11-15 | 2026-12-31 | 7 weeks |
| Backend Development | 2026-11-15 | 2027-01-31 | 11 weeks |
| AI/ML Development | 2026-12-01 | 2027-02-28 | 13 weeks |
| Integration & Testing | 2027-03-01 | 2027-04-30 | 9 weeks |
| Deployment & Documentation | 2027-05-01 | 2027-05-31 | 4 weeks |

### 2.4 Project Budget

This is a university project with no commercial budget. Resources are:
- Developer time (team of 1–3 students)
- University server / lab infrastructure (no cost)
- Open-source software only (no licensing cost)

---

## 3. Project Organization

### 3.1 Team Structure

| Role | Responsibilities |
|---|---|
| Project Lead / Full-Stack Developer | Architecture decisions, backend API, integration, project coordination |
| Frontend Developer | React UI, component library, dashboard, visualizations |
| AI/ML Developer | Python AI service, model training, evaluation |
| Supervisor / Reviewer | Academic oversight, milestone reviews, sign-off |

> For a team of 1, all roles are held by the same person.

### 3.2 RACI Matrix

| Activity | Project Lead | Frontend Dev | AI Dev | Supervisor |
|---|---|---|---|---|
| Requirements | R/A | C | C | I |
| Architecture Design | R/A | C | C | I |
| Database Design | R/A | I | C | I |
| Frontend Development | C | R/A | I | I |
| Backend API | R/A | C | I | I |
| AI Service | C | I | R/A | I |
| Integration Testing | R/A | C | C | I |
| Deployment | R/A | C | C | I |
| User Manual | R/A | C | C | R |
| Milestone Sign-off | C | I | I | A/R |

R = Responsible, A = Accountable, C = Consulted, I = Informed

### 3.3 Communication Plan

| Communication | Frequency | Participants | Medium |
|---|---|---|---|
| Team standup | Weekly | All team | In-person / Discord |
| Progress report to supervisor | Bi-weekly | Project Lead + Supervisor | Email |
| Milestone review | Per milestone | All team + Supervisor | In-person presentation |
| Risk review | Monthly | All team | Team meeting |
| Issue tracking | Ongoing | All team | GitHub Issues |

---

## 4. Managerial Process Plans

### 4.1 Start-up Plan

1. Finalize team roles and responsibilities (Week 1)
2. Set up version control repository (GitHub) (Week 1)
3. Configure development environment on all machines (Week 1–2)
4. Establish issue tracker and project board (Week 1)
5. Agree on coding standards and branching strategy (Week 2)

### 4.2 Work Plan

Work is organized by the WBS defined in [02-wbs.md](02-wbs.md). Progress is tracked weekly against the schedule in [03-project-schedule-gantt.md](03-project-schedule-gantt.md).

### 4.3 Control Plan

**Progress tracking:**
- Weekly team meeting: review tasks completed vs. planned
- Milestone check: formal review at each milestone; deliverable submitted to supervisor
- Issue tracker: all tasks, bugs, and changes tracked as GitHub Issues

**Scope control:**
- All scope changes go through the Change Control process (see [10-change-management.md](10-change-management.md))
- No feature added to the implementation without a corresponding SRS update

**Schedule control:**
- Any task running > 5 days late triggers a corrective action meeting
- Critical path tasks (see [04-task-network-dependencies.md](04-task-network-dependencies.md)) get priority allocation

### 4.4 Risk Management

Risks are managed per [06-risk-register.md](06-risk-register.md) and reviewed monthly.

### 4.5 Closeout Plan

1. Final deployment verified against acceptance criteria
2. All documentation submitted
3. Code repository archived
4. Post-project lessons-learned document written
5. Supervisor sign-off obtained

---

## 5. Technical Process Plans

### 5.1 Development Model

**Iterative model** with 4-week iterations:
- Each iteration delivers a potentially demonstrable increment
- Iteration review with supervisor at the end of each month
- Requirements may be refined between iterations via change control

### 5.2 Development Environment

| Tool | Purpose |
|---|---|
| VS Code | Primary IDE |
| Node.js 20 LTS | Backend runtime |
| Python 3.10+ | AI service |
| PostgreSQL 15 | Database |
| React 18 + TypeScript | Frontend |
| Git / GitHub | Version control |
| Prisma | ORM / migration |
| Docker (optional) | Local containerization |

### 5.3 Coding Standards

- **TypeScript:** strict mode (`"strict": true` in tsconfig), no `any` without justification
- **Naming:** camelCase for variables/functions, PascalCase for components/classes, UPPER_SNAKE for constants
- **Commit messages:** `type(scope): message` (Conventional Commits)
- **Branching:** `main` (production), `develop` (integration), `feature/<name>`, `fix/<name>`
- **Pull requests:** require at least one review before merge to `develop`

### 5.4 Documentation Standards

All project documents follow the IEEE standards listed in Section 1.3. Documents are maintained as Markdown files in the project repository.

### 5.5 Quality Plan

| Activity | When | Owner |
|---|---|---|
| Code review (PR review) | Every pull request | Team |
| Unit tests run | Every commit (CI) | Automated |
| Integration tests run | Every merge to develop | Automated |
| Milestone demo to supervisor | Per milestone | Project Lead |
| SRS–code consistency check | Per feature completion | Project Lead |
| AI model accuracy evaluation | After each training run | AI Developer |

---

## 6. Supporting Process Plans

### 6.1 Configuration Management Plan

See [09-scm-plan.md](09-scm-plan.md).

### 6.2 Requirements Management Plan

Requirements are baselined in the SRS at [../srs/README.md](../srs/README.md). Changes to requirements follow the change control process in [10-change-management.md](10-change-management.md). Traceability is maintained in [08-requirements-traceability-matrix.md](08-requirements-traceability-matrix.md).

### 6.3 Testing Plan

See [16-testing-plan.md](16-testing-plan.md).

### 6.4 Deployment Plan

See [18-deployment-guide.md](18-deployment-guide.md).

---

**Prepared by:** SDTS Project Team  
**Review cycle:** Updated at each milestone  
**Next review:** 2026-11-01
