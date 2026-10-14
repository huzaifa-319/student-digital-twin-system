# Product Acceptance Plan

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-PAP-007  
**Standard:** IEEE/ISO/IEC 12207:2017 §6.4.11 — Acceptance Support Process  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Purpose

This document defines the criteria, procedures, and responsibilities for accepting the SDTS product at each major milestone and at final delivery. Acceptance confirms that the system meets its stated requirements and is fit for use.

---

## 2. Scope

This plan covers:
- Milestone-level acceptance (design, backend, frontend, AI service, integration)
- Final system acceptance (UAT)
- Post-deployment acceptance (production smoke test)

---

## 3. Acceptance Roles

| Role | Responsibility |
|---|---|
| Project Lead | Demonstrates features, provides evidence artifacts |
| University Supervisor | Reviews, signs off milestones and final acceptance |
| Academic Advisor Representative | Participates in UAT (advisor role workflows) |
| Student Representative | Participates in UAT (student role workflows) |
| Teacher Representative | Participates in UAT (teacher role workflows) |

---

## 4. Milestone Acceptance Criteria

### M2 — SRS Accepted

| Criterion | Verification |
|---|---|
| All 36 functional requirement groups documented | Review SRS Part 1 §5 |
| All NFR categories covered (13 categories) | Review SRS Part 4 §12 |
| All 6 user roles defined with capabilities | Review SRS Part 1 §4 |
| Digital twin components specified | Review SRS Part 2 §6 |
| AI/ML requirements with measurable thresholds | Review SRS Part 2 §7 (MAE ≤ 0.30, F1 ≥ 0.75) |
| RTM created linking FR IDs to test cases | Review RTM document |
| Supervisor has reviewed and approved | Signed review record |

---

### M3 — Design Accepted

| Criterion | Verification |
|---|---|
| Architecture document covers all 3 tiers + AI microservice | Review architecture-documentation.md |
| Database design has ≥ 25 entities with relationships | Review ER diagram in database-documentation.md |
| API design covers all endpoints listed in SRS §9.6 | Review api-documentation.md endpoint table |
| At least 5 key screens wireframed per role | Review wireframes |
| AI/ML models and feature sets defined | Review architecture-documentation.md §AI section |

---

### M5 — Backend API Accepted

| Criterion | Verification |
|---|---|
| All API endpoints implemented and respond correctly | Postman collection executed — all 200 OK |
| JWT authentication works for all roles | Manual test: login per role |
| RBAC enforced — role violations return 403 | Manual test: access violation attempts |
| GPA computed correctly for test data | Unit test TC-006 passes |
| Digital twin updates within 2 seconds of grade entry | Integration test timing |
| Unit test coverage ≥ 80% on core controllers | Coverage report |

---

### M6 — AI Service Accepted

| Criterion | Verification |
|---|---|
| GPA prediction MAE ≤ 0.30 on test set | Model evaluation report |
| At-risk classifier F1 ≥ 0.75 | Model evaluation report |
| Recommendation relevance ≥ 60% (simulated feedback) | Evaluation report |
| No demographic group's F1 < 0.65 | Bias evaluation report |
| Flask endpoints respond within 3 seconds | Performance test |
| Fallback rule-based predictions active when ML unavailable | Integration test with AI service offline |

---

### M7 — Integration Accepted

| Criterion | Verification |
|---|---|
| Student can log in and see their digital twin | E2E test scenario |
| Teacher can mark attendance; twin updates | E2E test scenario |
| Advisor can see at-risk list; students correctly flagged | E2E test scenario |
| Admin can create users, courses, enroll students | E2E test scenario |
| Notifications sent on threshold events | Integration test |

---

### M8 — UAT Accepted (Final Acceptance)

UAT is the final gate before deployment. All primary user stories must be completable by real users.

#### UAT Scenario List

| UAT-ID | Actor | Scenario | Pass Criteria |
|---|---|---|---|
| UAT-01 | Student | Log in, navigate to digital twin, view GPA trend and recommendations | Completes within 5 minutes without help |
| UAT-02 | Student | View attendance per course; check at-risk flag if applicable | Data matches expected; flag visible if threshold breached |
| UAT-03 | Teacher | Mark full class attendance for today | 30 records saved; no duplicates; twin updates |
| UAT-04 | Teacher | Enter final grades for a course | Grades saved; GPA computed; student notified |
| UAT-05 | Advisor | View at-risk student list; open a student's twin | List loads; twin data complete; key factors shown |
| UAT-06 | Advisor | Add advising note to a student's record | Note saved; visible on next load |
| UAT-07 | Admin | Create a new student account | Account created; student can log in |
| UAT-08 | Admin | Enroll a student in a course | Student appears in teacher's class list |
| UAT-09 | Admin | Generate a department performance report | Report downloads in PDF/Excel format |
| UAT-10 | System | All role dashboard pages load within 3 seconds | Measured with browser network tab |

#### UAT Pass Criteria

- All 10 UAT scenarios completed successfully by representative users.
- Task completion rate ≥ 90% (at least 9 of 10 scenarios passing).
- No critical (blocking) bugs discovered during UAT.
- No major usability issues reported (users unable to complete task without external help > 5 min).

---

### M9 — Deployment Accepted (Production Go-Live)

| Criterion | Verification |
|---|---|
| HTTPS active with valid SSL certificate | Browser URL bar shows padlock |
| Login works on production URL | Manual test |
| Dashboard loads in < 3 seconds | Browser timing |
| No 500 errors in first 30 minutes of use | Server logs |
| Database backup scheduled and confirmed | Cron job visible / backup file present |

---

## 5. Defect Classification and Acceptance Thresholds

| Severity | Definition | Acceptance Threshold |
|---|---|---|
| Critical | System crash, data loss, security breach | Zero critical defects open at acceptance |
| High | Major feature broken, no workaround | Zero high defects open at acceptance |
| Medium | Feature partially working, workaround exists | ≤ 3 medium defects (with documented workarounds) |
| Low | Cosmetic, minor text, non-blocking UI issue | Any number accepted (tracked for next release) |

---

## 6. Acceptance Procedure

1. Project Lead submits: (a) deliverable, (b) test results, (c) defect log.
2. Supervisor reviews within 3 working days.
3. If criteria met → supervisor signs Acceptance Record (Appendix A template).
4. If criteria not met → defects logged; re-submission date set; process repeats.

---

## 7. Acceptance Record Template

```
SDTS Acceptance Record
──────────────────────
Milestone: ___________________________
Date: ___________________________
Submitted by: ___________________________

Acceptance Criteria Summary:
  All criteria met:        [ ] Yes  [ ] No
  Outstanding items:       ___________________________

Decision:
  [ ] Accepted
  [ ] Conditionally Accepted (conditions: _____________)
  [ ] Not Accepted (reasons: _________________________)

Supervisor Signature: ___________________________
Date: ___________________________
```
