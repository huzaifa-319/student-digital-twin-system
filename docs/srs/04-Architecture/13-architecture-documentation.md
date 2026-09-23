# Architecture Documentation

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-ARC-013  
**Standard:** IEEE/ISO/IEC/IEEE 42010:2011 — Systems and Software Engineering: Architecture Description  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Introduction

### 1.1 Purpose

This Architecture Description (AD) identifies the stakeholders, concerns, viewpoints, and views of the SDTS system. It is the authoritative reference for architectural decisions.

### 1.2 System Overview

SDTS is a web-based academic intelligence platform with three primary software components:
1. **React Frontend** — browser-based SPA serving 6 user roles
2. **Node.js API** — REST backend with authentication, data management, and business logic
3. **Python AI Service** — Flask microservice for ML predictions and recommendations

These communicate with a **PostgreSQL 15** database.

---

## 2. Stakeholder Concerns

| Stakeholder | Key Concerns |
|---|---|
| Students | Can I see my own data? Is the recommendation private? Is the UI easy to use? |
| Teachers | Can I quickly mark attendance and enter grades? |
| Advisors | Can I see all at-risk students and their twin data? |
| Dept. Admin | Can I manage courses, enrollment, and generate reports? |
| Sys. Admin | Is the system secure? Easy to deploy and maintain? |
| Supervisor | Does it meet requirements? Is the architecture documented? |

---

## 3. Architectural Viewpoints

Following IEEE 42010, this document uses four viewpoints:

| Viewpoint | Concerns Addressed |
|---|---|
| Logical View | What components exist and how they collaborate |
| Development View | How code is organized; technology choices |
| Deployment View | How the system is deployed to infrastructure |
| Process View | How data flows and how the system behaves at runtime |

---

## 4. Logical View

### 4.1 Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  Client Browser                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React SPA (Vite + TypeScript)                           │   │
│  │                                                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │   │
│  │  │ Auth     │  │ Routing  │  │ Zustand State Store   │  │   │
│  │  │ Module   │  │ (RR v6)  │  │ (auth, session)       │  │   │
│  │  └──────────┘  └──────────┘  └───────────────────────┘  │   │
│  │                                                          │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ Page Components (per role)                         │  │   │
│  │  │  Student: Dashboard, Twin, Grades, Attendance      │  │   │
│  │  │  Teacher: Attendance Marking, Grade Entry          │  │   │
│  │  │  Advisor: At-Risk List, Student Detail             │  │   │
│  │  │  Admin: Users, Courses, Enrollment, Reports        │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐    │   │
│  │  │ Axios Instance (api.ts) — Bearer token auto-attach│   │   │
│  │  └──────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────┘
                               │ HTTPS REST
┌──────────────────────────────▼──────────────────────────────────┐
│  Node.js API (Express + TypeScript)                              │
│                                                                  │
│  Middleware Layer:                                               │
│  [Helmet] [Morgan] [CORS] [RateLimit] [JWT Auth] [Role Guard]   │
│                                                                  │
│  Route / Controller Layer:                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ /auth    │ │/students │ │/grades   │ │ /twin            │   │
│  │ /courses │ │/enroll   │ │/attend   │ │ /reports         │   │
│  │ /advisor │ │/admin    │ │/predict  │ │ /notifications   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
│                                                                  │
│  Service Layer:                                                  │
│  ┌──────────────┐ ┌─────────────────┐ ┌───────────────────┐    │
│  │ TwinSync     │ │ Notification    │ │ Report Service    │    │
│  │ Service      │ │ Service         │ │                   │    │
│  └──────────────┘ └─────────────────┘ └───────────────────┘    │
│                                                                  │
│  Data Layer: Prisma ORM                                          │
└────────────┬──────────────────────────────┬─────────────────────┘
             │ Prisma                        │ HTTP (internal only)
┌────────────▼──────────┐   ┌───────────────▼───────────────────┐
│ PostgreSQL 15          │   │ Python AI Service (Flask)         │
│                        │   │                                   │
│ Tables:                │   │ /predict/gpa    → gpa_model.pkl   │
│ users, students        │   │ /predict/risk   → risk_model.pkl  │
│ courses, enrollments   │   │ /recommend      → recommender.py  │
│ attendance, grades     │   │ /explain        → explainer.py    │
│ digital_twins          │   │                                   │
│ predictions            │   │ psycopg2 (read-only DB access)    │
│ recommendations        │   │ for feature extraction            │
│ notifications          │   │                                   │
│ audit_logs             │   └───────────────────────────────────┘
└────────────────────────┘
```

### 4.2 Module Responsibilities

| Module | Responsibility |
|---|---|
| `auth.controller.ts` | Login, JWT issue/verify, refresh token |
| `student.controller.ts` | Student CRUD, profile management |
| `course.controller.ts` | Course offerings, semester management |
| `enrollment.controller.ts` | Enroll/withdraw students |
| `attendance.controller.ts` | Mark attendance, compute %, trigger alerts |
| `grade.controller.ts` | Enter, finalize, compute GPA/CGPA |
| `twin.controller.ts` | Serve digital twin data |
| `twinSync.service.ts` | Event-driven twin refresh after academic events |
| `notification.service.ts` | Dispatch in-app + email notifications |
| `report.service.ts` | Generate PDF/CSV reports |
| `ai.controller.ts` | Proxy requests to Python AI service |
| `app.py` (Flask) | Entry point for AI service |
| `train_gpa.py` | GPA regression model training |
| `train_risk.py` | At-risk classifier training |
| `recommender.py` | Recommendation engine (cosine similarity) |

---

## 5. Development View

### 5.1 Repository Structure

```
sdts/
├── backend/
│   ├── src/
│   │   ├── config/         (prisma.ts, env.ts)
│   │   ├── controllers/    (auth, student, course, grade, attendance, twin, ai, report)
│   │   ├── middleware/     (auth, role, error, notFound)
│   │   ├── routes/         (all route files)
│   │   ├── services/       (twinSync, notification, report)
│   │   ├── types/          (index.ts — AuthRequest, etc.)
│   │   ├── utils/          (AppError, validators)
│   │   └── app.ts, server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     (Layout, Sidebar, Header, shared)
│   │   ├── pages/          (Student, Teacher, Advisor, Admin pages)
│   │   ├── services/       (api.ts — Axios instance)
│   │   ├── store/          (authStore.ts — Zustand)
│   │   ├── types/          (index.ts — all interfaces)
│   │   ├── hooks/          (useApi.ts)
│   │   └── App.tsx, main.tsx
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
│
├── ai_service/
│   ├── training/
│   │   ├── train_gpa.py
│   │   ├── train_risk.py
│   │   └── train_all.py
│   ├── models/             (.pkl files, versioned)
│   ├── routes/             (prediction.py, recommend.py)
│   ├── utils/              (features.py, explainer.py)
│   ├── tests/
│   ├── app.py              (Flask entry point)
│   └── requirements.txt
│
└── sdts-pm/                (all project documents)
```

### 5.2 Technology Stack

| Layer | Technology | Version | Reason |
|---|---|---|---|
| Frontend | React + TypeScript | 18, 5.x | Component model, type safety |
| Build | Vite | 5.x | Fast HMR, ES modules |
| Styling | Tailwind CSS | 3.x | Utility-first, no CSS files |
| State | Zustand | 4.x | Lightweight, no boilerplate |
| Forms | React Hook Form + Zod | latest | Validation, type-safe schemas |
| HTTP Client | Axios | 1.x | Interceptors for JWT auto-attach |
| Backend | Node.js + Express | 20 LTS, 4.x | Ecosystem, async support |
| ORM | Prisma | 5.x | Type-safe queries, migration tooling |
| Database | PostgreSQL | 15 | ACID, relational, JSON support |
| AI | Python + scikit-learn | 3.10+, 1.3+ | ML model support |
| AI API | Flask | 3.x | Lightweight Python API server |
| Auth | JWT + bcrypt | — | Stateless auth, password hashing |

---

## 6. Deployment View

### 6.1 Production Deployment

```
Internet
  │ HTTPS (443)
  ▼
┌───────────────────────────────────────┐
│ Ubuntu 22.04 LTS Server               │
│                                       │
│  Nginx (reverse proxy)                │
│  ├── /  → /var/www/sdts (static FE)   │
│  └── /api → localhost:5000            │
│                                       │
│  Node.js API (PM2 cluster)            │
│  Port: 5000 (internal only)           │
│                                       │
│  Python AI Service (Gunicorn)         │
│  Port: 5001 (internal only)           │
│                                       │
│  PostgreSQL 15                        │
│  Port: 5432 (internal only)           │
└───────────────────────────────────────┘
```

---

## 7. Process View — Key Flows

### 7.1 Grade Entry → Twin Update Flow

```
Teacher enters grade (React) 
  → POST /grades (JWT verified, role=TEACHER)
  → grade.controller: validate, save to DB via Prisma
  → Emit event: GRADE_ENTERED(studentId, courseId)
  → twinSync.service picks up event
  → Recompute semester GPA + CGPA
  → HTTP POST to AI service: /predict/gpa + /predict/risk
  → AI returns: predictedGpa, atRiskScore, explanation
  → Update digital_twins record
  → If atRiskScore ≥ 70: enqueue notification to advisor
  → Notification service dispatches in-app + email
```

### 7.2 Authentication Flow

```
User submits login form
  → POST /auth/login
  → Validate email/password against DB (bcrypt.compare)
  → Issue JWT (8h) + Refresh Token (7d)
  → Store refresh token in DB (hashed)
  → Return {token, user} to frontend
  → Axios interceptor attaches Authorization: Bearer <token>
  → All subsequent requests verified by authenticate middleware
```

---

## 8. Architectural Decisions

### ADR-001 — Separate AI Service (Not Embedded in Node.js)

**Decision:** The AI/ML logic lives in a separate Python Flask microservice.  
**Rationale:** Python + scikit-learn is the standard for ML; embedding Python in Node.js is not practical. Separate service allows independent scaling, retraining, and versioning.  
**Consequences:** Requires HTTP communication between Node and Python; AI service must be monitored separately.

---

### ADR-002 — Prisma ORM (Not Raw SQL)

**Decision:** Use Prisma for all database access.  
**Rationale:** Type-safe queries eliminate SQL injection by construction; migration tooling manages schema evolution; the Prisma schema is self-documenting.  
**Consequences:** Prisma is Node.js only; Python AI service uses psycopg2 with read-only DB user.

---

### ADR-003 — Zustand (Not Redux)

**Decision:** Use Zustand for frontend global state.  
**Rationale:** Redux is overly complex for a project of this size; Zustand has no boilerplate, works with TypeScript, and supports localStorage persistence for auth state.  
**Consequences:** Less ecosystem tooling (no Redux DevTools), but adequate for this scale.

---

### ADR-004 — Event-Driven Twin Sync (Not Scheduled Cron)

**Decision:** Digital twin is updated on every academic event (grade entered, attendance marked) rather than by a nightly cron job.  
**Rationale:** Near-real-time twin data is more useful for advisors and students; event-driven ensures data is always fresh within seconds.  
**Consequences:** More writes per event; mitigated by efficient Prisma upsert operations.

---

### ADR-005 — Rule-Based Fallback for AI

**Decision:** If ML service is unreachable, apply rule-based at-risk determination.  
**Rationale:** The system must remain operational even when the AI service is unavailable. Core academic functions (grades, attendance) must not depend on AI availability.  
**Consequences:** Rule-based predictions are less accurate; clearly labeled as "estimated" in the UI.
