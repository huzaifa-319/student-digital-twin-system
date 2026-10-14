# Configuration Items (CI) List

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-CIL-011  
**Standard:** IEEE/ISO/IEC 828:2012 §4.1 — Configuration Identification  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. CI Classification

| Type | Description |
|---|---|
| DOC | Project documentation (SRS, PMP, design docs) |
| SRC | Source code (frontend, backend, AI service) |
| CFG | Configuration files (.env templates, tsconfig, nginx.conf) |
| DB | Database artifacts (Prisma schema, migration files) |
| MDL | AI/ML model files (.pkl) |
| TST | Test suites and test data |
| DEP | Deployment scripts and CI/CD pipelines |

---

## 2. Configuration Item Register

| CI-ID | Name | Type | Repository Path | Current Version | Baseline | Owner |
|---|---|---|---|---|---|---|
| CI-001 | SRS Part 1 (Intro to Functional Reqs) | DOC | `srs/SRS-Part1-Intro-to-FunctionalReqs.md` | 1.0 | SRS-BL-v1.0 | Project Lead |
| CI-002 | SRS Part 2 (Digital Twin + AI) | DOC | `srs/SRS-Part2-DigitalTwin-AI-UseCases.md` | 1.0 | SRS-BL-v1.0 | Project Lead |
| CI-003 | SRS Part 3 (Interfaces + DB) | DOC | `srs/SRS-Part3-Interfaces-Data-Database.md` | 1.0 | SRS-BL-v1.0 | Project Lead |
| CI-004 | SRS Part 4 (NFR + Architecture) | DOC | `srs/SRS-Part4-NonFunctional-to-Architecture.md` | 1.0 | SRS-BL-v1.0 | Project Lead |
| CI-005 | SRS Part 5 (Models to Appendices) | DOC | `srs/SRS-Part5-Models-to-Appendices.md` | 1.0 | SRS-BL-v1.0 | Project Lead |
| CI-006 | Architecture Documentation | DOC | `sdts-pm/13-architecture-documentation.md` | 1.0 | DES-BL-v1.0 | Project Lead |
| CI-007 | Database Documentation | DOC | `sdts-pm/14-database-documentation.md` | 1.0 | DES-BL-v1.0 | Project Lead |
| CI-008 | API Documentation | DOC | `sdts-pm/15-api-documentation.md` | 1.0 | DES-BL-v1.0 | Project Lead |
| CI-009 | Project Management Plan | DOC | `sdts-pm/01-project-management-plan.md` | 1.0 | — | Project Lead |
| CI-010 | Test Plan | DOC | `sdts-pm/16-testing-plan.md` | 1.0 | DES-BL-v1.0 | Project Lead |
| CI-011 | RTM | DOC | `sdts-pm/08-requirements-traceability-matrix.md` | 1.0 | SRS-BL-v1.0 | Project Lead |
| CI-012 | SCM Plan | DOC | `sdts-pm/09-scm-plan.md` | 1.0 | — | Project Lead |
| CI-013 | Backend Source Code | SRC | `backend/src/` | 0.1.0-dev | — | Project Lead |
| CI-014 | Frontend Source Code | SRC | `frontend/src/` | 0.1.0-dev | — | Frontend Dev |
| CI-015 | AI Service Source Code | SRC | `ai_service/` | 0.1.0-dev | — | AI Developer |
| CI-016 | Prisma Schema | DB | `backend/prisma/schema.prisma` | 1.0 | DES-BL-v1.0 | Project Lead |
| CI-017 | Database Migrations | DB | `backend/prisma/migrations/` | — | Per migration | Project Lead |
| CI-018 | Backend package.json (locked) | CFG | `backend/package-lock.json` | — | Per release | Project Lead |
| CI-019 | Frontend package.json (locked) | CFG | `frontend/package-lock.json` | — | Per release | Frontend Dev |
| CI-020 | AI Service requirements.txt | CFG | `ai_service/requirements.txt` | — | Per release | AI Developer |
| CI-021 | Backend tsconfig.json | CFG | `backend/tsconfig.json` | 1.0 | DES-BL-v1.0 | Project Lead |
| CI-022 | Frontend Vite/TypeScript config | CFG | `frontend/tsconfig.json`, `vite.config.ts` | 1.0 | DES-BL-v1.0 | Frontend Dev |
| CI-023 | Nginx configuration | CFG | `deployment/nginx.conf` | 1.0 | DEP-BL-v1.0 | Project Lead |
| CI-024 | .env template (backend) | CFG | `backend/.env.example` | 1.0 | DES-BL-v1.0 | Project Lead |
| CI-025 | .env template (AI service) | CFG | `ai_service/.env.example` | 1.0 | DES-BL-v1.0 | AI Developer |
| CI-026 | GPA Prediction Model | MDL | `ai_service/models/gpa_model_*.pkl` | — | Per training run | AI Developer |
| CI-027 | Risk Classifier Model | MDL | `ai_service/models/risk_model_*.pkl` | — | Per training run | AI Developer |
| CI-028 | Backend Test Suite | TST | `backend/tests/` | — | Per release | Project Lead |
| CI-029 | Frontend Test Suite | TST | `frontend/src/**/*.test.tsx` | — | Per release | Frontend Dev |
| CI-030 | AI Test Suite | TST | `ai_service/tests/` | — | Per release | AI Developer |
| CI-031 | GitHub Actions CI workflow | DEP | `.github/workflows/ci.yml` | 1.0 | — | Project Lead |
| CI-032 | Deployment scripts | DEP | `deployment/deploy.sh` | 1.0 | DEP-BL-v1.0 | Project Lead |
| CI-033 | Prisma seed file | DB | `backend/prisma/seed.ts` | 1.0 | DES-BL-v1.0 | Project Lead |

---

## 3. Baseline Register

| Baseline ID | Description | CIs Included | Date |
|---|---|---|---|
| SRS-BL-v1.0 | SRS Baseline (Milestone M2) | CI-001 to CI-005, CI-011 | 2026-10-20 (planned) |
| DES-BL-v1.0 | Design Baseline (Milestone M3) | CI-006 to CI-010, CI-016, CI-021 to CI-025 | 2026-11-15 (planned) |
| INT-BL-v1.0 | Integration Baseline (Milestone M7) | All SRC, all DB, all CFG | 2027-03-31 (planned) |
| REL-BL-v1.0 | Release Baseline (Milestone M9) | All CIs at v1.0.0 | 2027-05-15 (planned) |
| DEP-BL-v1.0 | Deployment Baseline | CI-023, CI-031, CI-032 | 2027-05-15 (planned) |

---

## 4. CI Versioning Rules

| CI Type | Versioning scheme |
|---|---|
| DOC | Semantic: `1.0`, `1.1`, `2.0` |
| SRC | Semantic: `vMAJOR.MINOR.PATCH` (Git tags) |
| DB Migrations | Timestamp prefix: `YYYYMMDDHHMMSS` |
| AI Models | Date + semester: `gpa_model_2027_spring.pkl` |
| CFG | Same as SRC release tag |

---

## 5. CI Update Procedure

1. Propose change via Change Request (if item is baselined).
2. After CCB approval (or PR approval if non-baselined), make changes on feature branch.
3. Update this CI Register with new version number after merge.
4. If a new baseline is created, update the Baseline Register.
