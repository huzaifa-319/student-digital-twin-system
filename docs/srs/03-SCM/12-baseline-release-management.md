# Baseline / Release Management

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-BRL-012  
**Standard:** IEEE/ISO/IEC 828:2012 §4.4 — Configuration Status Accounting  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Purpose

This document defines the procedures for establishing, controlling, and releasing baselines throughout the SDTS project lifecycle. A baseline is a formally approved, stable reference point used for further development, testing, or delivery.

---

## 2. Baseline Types

| Baseline Type | Purpose | When Created |
|---|---|---|
| Functional Baseline | Approved system requirements (SRS) | After M2 — SRS Acceptance |
| Design Baseline | Approved architecture, DB, API, UI designs | After M3 — Design Acceptance |
| Integration Baseline | Integrated and tested codebase | After M7 — Integration Acceptance |
| Release Baseline | Final system ready for deployment | After M8 — UAT Acceptance |
| Operational Baseline | Deployed production system | After M9 — Deployment Acceptance |

---

## 3. Baseline Procedure

### 3.1 Creating a Baseline

1. All relevant CIs (see [11-configuration-items.md](11-configuration-items.md)) must be in a stable, reviewed state.
2. Acceptance criteria for the milestone must be met (see [07-product-acceptance-plan.md](07-product-acceptance-plan.md)).
3. Project Lead creates a Git tag:
   - SRS Baseline: `srs-v1.0`
   - Design Baseline: `design-v1.0`
   - Release Baseline: `v1.0.0`
4. Supervisor signs the Acceptance Record.
5. CI Register is updated with baseline IDs.
6. Baseline Register (in [11-configuration-items.md](11-configuration-items.md) §3) updated.

### 3.2 Git Tagging Commands

```bash
# Create the SRS baseline tag
git tag -a srs-v1.0 -m "SRS Baseline v1.0 — accepted 2026-10-20"
git push origin srs-v1.0

# Create a release tag
git tag -a v1.0.0 -m "Release v1.0.0 — Production deployment 2027-05-15"
git push origin v1.0.0
```

### 3.3 Baseline Change Procedure

Changes to a baselined item follow the Change Control Process in [10-change-management.md](10-change-management.md):
- CCB approval required
- New version assigned
- If change is significant, a new baseline version is created (e.g., `srs-v1.1`)

---

## 4. Release Process

### 4.1 Release Types

| Release Type | When Used | Example |
|---|---|---|
| Major (X.0.0) | Incompatible API or major feature change | v2.0.0 — major redesign |
| Minor (X.Y.0) | New backward-compatible features | v1.1.0 — reports module added |
| Patch (X.Y.Z) | Bug fixes, security patches | v1.0.1 — login fix |

### 4.2 Release Checklist

Before creating a release tag, verify all of the following:

```
Pre-Release Checklist
─────────────────────
[ ] All CI/CD pipeline tests pass on develop branch
[ ] No critical or high-severity open defects
[ ] All documentation updated (API docs, user manual, changelog)
[ ] package-lock.json and requirements.txt committed
[ ] .env.example files reflect any new environment variables
[ ] Database migrations tested on a clean database
[ ] Performance test passed (P95 < 3s dashboard load)
[ ] Security scan (npm audit + OWASP ZAP) completed
[ ] Acceptance criteria met and Acceptance Record signed
[ ] Supervisor notified
```

### 4.3 Release Notes Template

```
## SDTS v1.0.0 — 2027-05-15

### Summary
Initial production release of the Student Digital Twin System.

### New Features
- Student digital twin dashboard (5 components)
- GPA prediction and at-risk classification
- Personalized academic recommendations
- Teacher attendance and grade entry
- Academic advisor at-risk monitoring
- Admin panel (users, courses, enrollment)
- PDF/CSV report generation

### Bug Fixes
- (none — first release)

### Known Issues
- Career readiness score requires at least 2 semesters of data

### Deployment Notes
- Requires PostgreSQL 15+
- Run: npx prisma migrate deploy
- Run: npx prisma db seed

### Breaking Changes
- None (first release)
```

---

## 5. Version History of This Document

| Version | Date | Author | Description |
|---|---|---|---|
| 1.0 | 2026-10-01 | Project Lead | Initial draft |

---

## 6. Baseline and Release Timeline

| Event | Target Date | Tag / Version |
|---|---|---|
| SRS Baseline | 2026-10-20 | `srs-v1.0` |
| Design Baseline | 2026-11-15 | `design-v1.0` |
| Backend Release Candidate | 2027-01-31 | `v0.5.0-rc` |
| Integration Baseline | 2027-03-31 | `integration-v1.0` |
| UAT Release Candidate | 2027-04-30 | `v1.0.0-rc` |
| Production Release | 2027-05-15 | `v1.0.0` |
| Final Submission Snapshot | 2027-05-31 | `v1.0.0-final` |
