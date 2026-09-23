# Work Breakdown Structure (WBS)

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-WBS-002  
**Standard:** IEEE/ISO/IEC 16326:2009 (Annex B — WBS Guidelines)  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. WBS Diagram

```
1.0  SDTS Project
│
├── 1.1  Project Management
│   ├── 1.1.1  Project Planning
│   ├── 1.1.2  Progress Monitoring & Control
│   ├── 1.1.3  Risk Management
│   ├── 1.1.4  Stakeholder Communication
│   └── 1.1.5  Project Closeout
│
├── 1.2  Requirements Engineering
│   ├── 1.2.1  Stakeholder Identification & Interviews
│   ├── 1.2.2  Functional Requirements Elicitation
│   ├── 1.2.3  Non-Functional Requirements Elicitation
│   ├── 1.2.4  SRS Documentation
│   ├── 1.2.5  Requirements Review & Baseline
│   └── 1.2.6  RTM Creation
│
├── 1.3  System Design
│   ├── 1.3.1  System Architecture Design
│   ├── 1.3.2  Database Design
│   ├── 1.3.3  API Design
│   ├── 1.3.4  UI/UX Wireframing
│   └── 1.3.5  AI/ML Design
│
├── 1.4  Frontend Development
│   ├── 1.4.1  Project Scaffolding (React + Vite + TypeScript)
│   ├── 1.4.2  Authentication Pages (Login, Session)
│   ├── 1.4.3  Student Dashboard & Digital Twin View
│   ├── 1.4.4  Teacher Dashboard (Attendance, Grades)
│   ├── 1.4.5  Advisor Dashboard (At-Risk, Students)
│   ├── 1.4.6  Admin Panel (Users, Courses, Enrollment)
│   ├── 1.4.7  Reports & Charts
│   └── 1.4.8  Notifications UI
│
├── 1.5  Backend Development
│   ├── 1.5.1  Project Scaffolding (Node.js + Express + TypeScript)
│   ├── 1.5.2  Database Schema & Migrations (Prisma)
│   ├── 1.5.3  Authentication Module (JWT, bcrypt)
│   ├── 1.5.4  Student Management Module
│   ├── 1.5.5  Course & Enrollment Module
│   ├── 1.5.6  Attendance Module
│   ├── 1.5.7  Grades Module
│   ├── 1.5.8  Digital Twin Sync Service
│   ├── 1.5.9  Notification Service
│   └── 1.5.10 Reporting Service
│
├── 1.6  AI/ML Development
│   ├── 1.6.1  Data Collection & Cleaning Pipeline
│   ├── 1.6.2  Feature Engineering
│   ├── 1.6.3  GPA Prediction Model
│   ├── 1.6.4  At-Risk Classification Model
│   ├── 1.6.5  Recommendation Engine
│   ├── 1.6.6  Model Evaluation & Validation
│   ├── 1.6.7  Flask API Service (endpoints)
│   └── 1.6.8  Model Deployment & Versioning
│
├── 1.7  Integration
│   ├── 1.7.1  Frontend–Backend Integration
│   ├── 1.7.2  Backend–AI Service Integration
│   ├── 1.7.3  Digital Twin End-to-End Validation
│   └── 1.7.4  System-Level Bug Fixing
│
├── 1.8  Testing
│   ├── 1.8.1  Unit Testing (Backend)
│   ├── 1.8.2  Unit Testing (Frontend)
│   ├── 1.8.3  Unit Testing (AI Service)
│   ├── 1.8.4  Integration Testing
│   ├── 1.8.5  System Testing
│   ├── 1.8.6  Performance Testing
│   ├── 1.8.7  Security Testing
│   └── 1.8.8  User Acceptance Testing
│
├── 1.9  Deployment
│   ├── 1.9.1  Environment Setup (Server + PostgreSQL + Nginx)
│   ├── 1.9.2  Backend Deployment (PM2)
│   ├── 1.9.3  Frontend Build & Static Deployment
│   ├── 1.9.4  AI Service Deployment (Gunicorn)
│   ├── 1.9.5  SSL Certificate Setup
│   └── 1.9.6  Smoke Testing & Go-Live Verification
│
└── 1.10 Documentation
    ├── 1.10.1  SRS (done in 1.2)
    ├── 1.10.2  Architecture Documentation
    ├── 1.10.3  API Documentation
    ├── 1.10.4  Database Documentation
    ├── 1.10.5  Testing Plan & Report
    ├── 1.10.6  Deployment Guide
    └── 1.10.7  User Manual
```

---

## 2. WBS Dictionary

Each work package (leaf node) is defined below.

| WBS ID | Name | Description | Deliverable | Estimated Effort |
|---|---|---|---|---|
| 1.1.1 | Project Planning | Create PMP, WBS, schedule, resource plan | PMP, WBS, Gantt | 16 hours |
| 1.1.2 | Progress Monitoring | Weekly reviews, issue tracking, status reports | Status reports | 2 h/week throughout |
| 1.1.3 | Risk Management | Maintain risk register, apply mitigations | Updated risk register | 2 h/month |
| 1.1.4 | Stakeholder Communication | Supervisor meetings, milestone presentations | Meeting minutes, slides | 4 h/milestone |
| 1.1.5 | Project Closeout | Final report, lessons learned, archive | Closeout report | 8 hours |
| 1.2.1 | Stakeholder Interviews | Identify and document user needs | Stakeholder needs list | 8 hours |
| 1.2.2 | Functional Req. | Elicit and write all functional requirements | FR sections of SRS | 24 hours |
| 1.2.3 | Non-Functional Req. | Elicit and write NFRs | NFR sections of SRS | 8 hours |
| 1.2.4 | SRS Documentation | Write and format full SRS document | SRS (5 parts) | 40 hours |
| 1.2.5 | Requirements Review | Walkthrough with supervisor, baseline | Signed-off SRS | 4 hours |
| 1.2.6 | RTM Creation | Map requirements to design/tests | RTM document | 8 hours |
| 1.3.1 | Architecture Design | Design 3-tier + AI microservice architecture | Architecture doc | 16 hours |
| 1.3.2 | Database Design | Entity-relationship design, schema | ER diagram, SQL schema | 16 hours |
| 1.3.3 | API Design | Define all REST endpoints | API specification | 12 hours |
| 1.3.4 | UI/UX Wireframing | Sketch key screens per role | Wireframes (5 screens min) | 16 hours |
| 1.3.5 | AI/ML Design | Define models, features, evaluation metrics | AI design doc | 12 hours |
| 1.4.1 | FE Scaffolding | Vite + React + TypeScript + Tailwind setup | Working FE project | 4 hours |
| 1.4.2 | Auth Pages | Login page, token storage, protected routes | Login page + routing | 8 hours |
| 1.4.3 | Student Dashboard | Twin visualization, GPA trend, recommendations | Student dashboard | 24 hours |
| 1.4.4 | Teacher Dashboard | Attendance marking, grade entry screens | Teacher dashboard | 20 hours |
| 1.4.5 | Advisor Dashboard | At-risk list, student detail view | Advisor dashboard | 16 hours |
| 1.4.6 | Admin Panel | User/course/enrollment management | Admin screens | 20 hours |
| 1.4.7 | Reports & Charts | Report generation UI, chart components | Report screens | 16 hours |
| 1.4.8 | Notifications UI | Notification bell, notification list | Notification component | 8 hours |
| 1.5.1 | BE Scaffolding | Node.js + Express + TypeScript + Prisma setup | Working BE project | 4 hours |
| 1.5.2 | Database Schema | Prisma schema, migrations, seed data | Migration files, seed | 12 hours |
| 1.5.3 | Auth Module | JWT login, bcrypt, token middleware | auth.controller.ts + routes | 12 hours |
| 1.5.4 | Student Module | CRUD for students, enrollment | student.controller.ts | 16 hours |
| 1.5.5 | Course Module | Courses, offerings, enrollment | course.controller.ts | 16 hours |
| 1.5.6 | Attendance Module | Mark, query, threshold alerts | attendance.controller.ts | 12 hours |
| 1.5.7 | Grades Module | Enter, finalize, compute GPA | grades.controller.ts | 16 hours |
| 1.5.8 | Twin Sync Service | Event-driven twin update worker | twinSync.service.ts | 16 hours |
| 1.5.9 | Notification Service | Email + in-app notification dispatch | notification.service.ts | 12 hours |
| 1.5.10 | Reporting Service | Generate PDF/CSV reports | report.service.ts | 16 hours |
| 1.6.1 | Data Pipeline | Clean and prepare historical data | data_pipeline.py | 12 hours |
| 1.6.2 | Feature Engineering | Transform raw data to ML features | features.py | 8 hours |
| 1.6.3 | GPA Model | Train regression model, evaluate | train_gpa.py, gpa_model.pkl | 16 hours |
| 1.6.4 | Risk Classifier | Train risk classification model | train_risk.py, risk_model.pkl | 16 hours |
| 1.6.5 | Recommendation Engine | Cosine similarity recommendation logic | recommender.py | 16 hours |
| 1.6.6 | Model Evaluation | Cross-validation, bias checks, metrics | Evaluation report | 8 hours |
| 1.6.7 | Flask API | Expose prediction/rec endpoints | app.py + routes | 12 hours |
| 1.6.8 | Model Deployment | Save, version, load models on startup | models/ folder, loader.py | 4 hours |
| 1.7.1 | FE-BE Integration | Connect React app to Node API | Working full frontend | 12 hours |
| 1.7.2 | BE-AI Integration | Node API calls Python AI service | twinSync calling /predict | 8 hours |
| 1.7.3 | Twin Validation | Verify twin values match raw DB data | Reconciliation test report | 8 hours |
| 1.7.4 | System Bug Fixing | Fix integration-found bugs | Updated codebase | 20 hours |
| 1.8.1 | Unit Tests BE | Jest + Supertest for all controllers | Test suite, coverage report | 16 hours |
| 1.8.2 | Unit Tests FE | Vitest + Testing Library | FE test suite | 12 hours |
| 1.8.3 | Unit Tests AI | Pytest for model functions | AI test suite | 8 hours |
| 1.8.4 | Integration Tests | API endpoint integration tests | Integration test report | 12 hours |
| 1.8.5 | System Tests | E2E scenario execution | System test report | 16 hours |
| 1.8.6 | Performance Tests | k6 load tests | Performance test report | 8 hours |
| 1.8.7 | Security Tests | OWASP ZAP + manual pen test | Security test report | 8 hours |
| 1.8.8 | UAT | Supervisor and peer walkthrough | UAT sign-off | 8 hours |
| 1.9.1 | Env Setup | Install OS, Node, Python, PostgreSQL, Nginx | Configured server | 8 hours |
| 1.9.2 | BE Deployment | PM2 process, env vars | Running API | 4 hours |
| 1.9.3 | FE Deployment | npm build, nginx serve | Static files served | 4 hours |
| 1.9.4 | AI Deployment | Gunicorn, model files deployed | Running AI service | 4 hours |
| 1.9.5 | SSL Setup | Certbot / Let's Encrypt certificate | HTTPS live | 2 hours |
| 1.9.6 | Smoke Tests | Verify all major flows in production | Go-live checklist | 4 hours |
| 1.10.2 | Architecture Doc | Write IEEE 42010 architecture description | architecture-documentation.md | 12 hours |
| 1.10.3 | API Docs | Write OpenAPI-style endpoint reference | api-documentation.md | 8 hours |
| 1.10.4 | Database Docs | Write database design document | database-documentation.md | 8 hours |
| 1.10.5 | Test Docs | Write test plan and test report | testing-plan.md, testing-report.md | 8 hours |
| 1.10.6 | Deployment Guide | Write step-by-step deployment guide | deployment-guide.md | 6 hours |
| 1.10.7 | User Manual | Write IEEE 26514 user manual | user-manual.md | 16 hours |

---

## 3. WBS Summary by Phase

| Phase (Level 1) | Total Estimated Effort |
|---|---|
| 1.1 Project Management | ~60 hours |
| 1.2 Requirements Engineering | ~92 hours |
| 1.3 System Design | ~72 hours |
| 1.4 Frontend Development | ~116 hours |
| 1.5 Backend Development | ~120 hours |
| 1.6 AI/ML Development | ~92 hours |
| 1.7 Integration | ~48 hours |
| 1.8 Testing | ~88 hours |
| 1.9 Deployment | ~26 hours |
| 1.10 Documentation | ~58 hours |
| **Total** | **~772 hours** |

> For a 3-person team over 8 months (≈32 weeks), this equates to ~8 hours/week/person — feasible as a part-time university project.
