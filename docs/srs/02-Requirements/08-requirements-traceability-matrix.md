# Requirements Traceability Matrix (RTM)

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-RTM-008  
**Standard:** IEEE/ISO/IEC 29148:2018 §6.2.5 — Traceability  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Purpose

The RTM ensures every requirement in the SRS is:
- Traced to a design component
- Traced to at least one test case
- Traced to a source stakeholder need

Gaps in the matrix indicate requirements that are not designed, implemented, or tested — and must be resolved before milestone acceptance.

---

## 2. Column Definitions

| Column | Description |
|---|---|
| FR ID | Requirement identifier from SRS |
| Requirement Summary | Short description |
| Priority | High / Medium / Low |
| SRS Section | Chapter and section in SRS |
| Design Reference | Architecture / DB / API section |
| WBS | WBS work package that implements it |
| Test Case(s) | Test case IDs that verify it |
| Status | Not Started / In Progress / Implemented / Verified |

---

## 3. Authentication Requirements

| FR ID | Requirement Summary | Priority | SRS Ref | Design Ref | WBS | Test Cases | Status |
|---|---|---|---|---|---|---|---|
| FR-AUTH-01 | Login with email + password | High | §5.1 | api-doc §Auth, arc §3.3 | 1.5.3 | TC-001, UAT-01 | Not Started |
| FR-AUTH-02 | JWT access token, 8h expiry | High | §5.2 | api-doc §Auth | 1.5.3 | TC-001 | Not Started |
| FR-AUTH-03 | Refresh token, 7d expiry | High | §5.3 | api-doc §Auth | 1.5.3 | TC-INT-04 | Not Started |
| FR-AUTH-04 | Role-based JWT payload | High | §5.4 | api-doc §Auth | 1.5.3 | TC-007 | Not Started |
| FR-AUTH-05 | Account lockout after 5 failures | High | §5.5 | api-doc §Auth | 1.5.3 | TC-003 | Not Started |
| FR-AUTH-06 | Password hashing bcrypt cost ≥ 12 | High | §5.6 | sec-doc §4.4 | 1.5.3 | TC-SEC-01 | Not Started |

---

## 4. Student Management Requirements

| FR ID | Requirement Summary | Priority | SRS Ref | Design Ref | WBS | Test Cases | Status |
|---|---|---|---|---|---|---|---|
| FR-STU-01 | Create student record | High | §5.4 | api-doc §Students | 1.5.4 | UAT-07, TC-INT-07 | Not Started |
| FR-STU-02 | Update student profile | High | §5.4 | api-doc §Students | 1.5.4 | TC-INT-08 | Not Started |
| FR-STU-03 | Enroll student in course | High | §5.4 | api-doc §Enrollment | 1.5.5 | UAT-08, TC-INT-09 | Not Started |
| FR-STU-04 | View own student data | High | §5.4 | api-doc §Students | 1.5.4 | TC-007 | Not Started |
| FR-STU-05 | Role isolation (student sees own data only) | High | §5.4 | sec-doc §4.2 | 1.5.3, 1.5.4 | TC-007 | Not Started |

---

## 5. Attendance Requirements

| FR ID | Requirement Summary | Priority | SRS Ref | Design Ref | WBS | Test Cases | Status |
|---|---|---|---|---|---|---|---|
| FR-ATT-01 | Mark attendance per student per class session | High | §5.8 | api-doc §Attendance | 1.5.6 | TC-004, UAT-03 | Not Started |
| FR-ATT-02 | Upsert attendance (no duplicate per date+course+student) | High | §5.8 | api-doc §Attendance | 1.5.6 | TC-005 | Not Started |
| FR-ATT-03 | Compute attendance percentage per course | High | §5.8 | db-doc §attendance_summary | 1.5.6, 1.5.8 | TC-INT-05 | Not Started |
| FR-ATT-04 | Alert when attendance < 75% | High | §5.8 | api-doc §Notifications | 1.5.6, 1.5.9 | TC-INT-10 | Not Started |
| FR-ATT-05 | Teacher can only mark attendance for assigned courses | High | §5.8 | sec-doc §4.2 | 1.5.3, 1.5.6 | TC-SEC-02 | Not Started |

---

## 6. Grade / GPA Requirements

| FR ID | Requirement Summary | Priority | SRS Ref | Design Ref | WBS | Test Cases | Status |
|---|---|---|---|---|---|---|---|
| FR-GPA-01 | Teacher enters grade per enrolled student | High | §5.11 | api-doc §Grades | 1.5.7 | TC-006, UAT-04 | Not Started |
| FR-GPA-02 | System computes semester GPA from finalized grades | High | §5.11 | db-doc §gpa_computation | 1.5.7, 1.5.8 | TC-006 | Not Started |
| FR-GPA-03 | System computes CGPA across all semesters | High | §5.11 | db-doc §gpa_computation | 1.5.7, 1.5.8 | TC-INT-06 | Not Started |
| FR-GPA-04 | Grade finalized only by assigned teacher | High | §5.11 | sec-doc §BR-ACA-02 | 1.5.7 | TC-SEC-03 | Not Started |
| FR-GPA-05 | Admin can override finalized grade (with audit log) | Medium | §5.11 | api-doc §Grades | 1.5.7 | TC-INT-07 | Not Started |

---

## 7. Digital Twin Requirements

| FR ID | Requirement Summary | Priority | SRS Ref | Design Ref | WBS | Test Cases | Status |
|---|---|---|---|---|---|---|---|
| FR-DT-01 | Digital twin created on student creation | High | §5.16 | arc-doc §2 | 1.5.8 | TC-008 | Not Started |
| FR-DT-02 | Twin updated within 2 seconds of academic event | High | §5.16 | arc-doc §4 | 1.5.8 | TC-008 | Not Started |
| FR-DT-03 | Twin stores 5 components (academic, behavior, skills, career, performance) | High | §5.16 | db-doc §digital_twins | 1.5.8 | TC-INT-11 | Not Started |
| FR-DT-04 | Student can view own digital twin | High | §5.16 | api-doc §Twin | 1.4.3, 1.5.8 | UAT-01 | Not Started |
| FR-DT-05 | Advisor can view any assigned student's twin | High | §5.16 | api-doc §Twin | 1.4.5 | UAT-05 | Not Started |
| FR-DT-06 | Twin shows GPA trend over time | High | §5.16 | api-doc §Twin | 1.4.3 | UAT-01 | Not Started |
| FR-DT-07 | Engagement score computed from formula | High | §5.16 (§6.5) | db-doc §engagement | 1.5.8 | TC-INT-12 | Not Started |

---

## 8. AI/ML Requirements

| FR ID | Requirement Summary | Priority | SRS Ref | Design Ref | WBS | Test Cases | Status |
|---|---|---|---|---|---|---|---|
| FR-AI-01 | GPA prediction (MAE ≤ 0.30) | High | §5.20 | arc-doc §AI | 1.6.3 | TC-AI-01 | Not Started |
| FR-AI-02 | At-risk classification (F1 ≥ 0.75) | High | §5.20 | arc-doc §AI | 1.6.4 | TC-009, TC-AI-02 | Not Started |
| FR-AI-03 | Recommendation engine (≥ 60% helpful rate) | High | §5.20 | arc-doc §AI | 1.6.5 | TC-AI-03 | Not Started |
| FR-AI-04 | High at-risk (score ≥ 70) → advisor notification | High | §5.20 | api-doc §Notifications | 1.5.9 | TC-009 | Not Started |
| FR-AI-05 | Recommendation dismissal persists within semester | Medium | §5.20 | db-doc §recommendations | 1.6.5 | TC-INT-13 | Not Started |
| FR-AI-06 | AI model predictions include top 2–3 explanatory factors | High | §5.20 §7.10 | arc-doc §AI | 1.6.3, 1.6.4 | UAT-05 | Not Started |
| FR-AI-07 | Rule-based fallback when ML unavailable | High | §5.20 §7.12 | arc-doc §AI fallback | 1.6.7 | TC-AI-04 | Not Started |
| FR-AI-08 | AI bias evaluation — no demographic group F1 < 0.65 | High | §5.20 §7.11 | arc-doc §AI bias | 1.6.6 | TC-AI-05 | Not Started |
| FR-AI-28 | Minimum 100 training records required | High | §5.28 | arc-doc §AI data | 1.6.1 | TC-AI-06 | Not Started |

---

## 9. Reporting Requirements

| FR ID | Requirement Summary | Priority | SRS Ref | Design Ref | WBS | Test Cases | Status |
|---|---|---|---|---|---|---|---|
| FR-RPT-01 | Generate student performance report (PDF) | High | §5.32 | api-doc §Reports | 1.5.10 | TC-010 | Not Started |
| FR-RPT-02 | Generate transcript (PDF) | High | §5.32 | api-doc §Reports | 1.5.10 | TC-010 | Not Started |
| FR-RPT-03 | At-risk student report (Excel/PDF) | High | §5.32 | api-doc §Reports | 1.5.10 | UAT-09 | Not Started |
| FR-RPT-04 | Department performance report | Medium | §5.32 | api-doc §Reports | 1.5.10 | UAT-09 | Not Started |

---

## 10. Notification Requirements

| FR ID | Requirement Summary | Priority | SRS Ref | Design Ref | WBS | Test Cases | Status |
|---|---|---|---|---|---|---|---|
| FR-NOT-01 | Attendance alert when < threshold | High | §5.35 | api-doc §Notifications | 1.5.9 | TC-INT-10 | Not Started |
| FR-NOT-02 | Grade posted → student notification | Medium | §5.35 | api-doc §Notifications | 1.5.9 | TC-INT-14 | Not Started |
| FR-NOT-03 | High risk → advisor notification | High | §5.35 | api-doc §Notifications | 1.5.9 | TC-009 | Not Started |
| FR-NOT-04 | Same notification not repeated within 24 hours | Medium | §5.35 | api-doc §Notifications | 1.5.9 | TC-INT-15 | Not Started |

---

## 11. Non-Functional Requirement Traceability

| NFR ID | Requirement | Test Reference | Status |
|---|---|---|---|
| NFR-PERF-01 | Dashboard load P95 < 3s | TC-PERF-01 | Not Started |
| NFR-PERF-02 | API response < 2s for standard queries | TC-PERF-02 | Not Started |
| NFR-SEC-01 | HTTPS TLS 1.2+ | TC-SEC-04 | Not Started |
| NFR-SEC-02 | OWASP Top 10 mitigations applied | TC-SEC-05 | Not Started |
| NFR-AVAIL-01 | System availability 99.5% uptime | TC-AVAIL-01 | Not Started |
| NFR-WCAG-01 | WCAG 2.1 Level AA compliance | TC-ACCESS-01 | Not Started |
| NFR-SCALE-01 | Supports 5000 students, 200 concurrent | TC-PERF-03 | Not Started |

---

## 12. RTM Coverage Summary

| Requirement Group | Count | With Design | With Test Case | Implemented | Verified |
|---|---|---|---|---|---|
| Authentication | 6 | 6 | 6 | 0 | 0 |
| Student Management | 5 | 5 | 5 | 0 | 0 |
| Attendance | 5 | 5 | 5 | 0 | 0 |
| Grades / GPA | 5 | 5 | 5 | 0 | 0 |
| Digital Twin | 7 | 7 | 7 | 0 | 0 |
| AI/ML | 9 | 9 | 9 | 0 | 0 |
| Reporting | 4 | 4 | 4 | 0 | 0 |
| Notifications | 4 | 4 | 4 | 0 | 0 |
| NFRs | 7 | 7 | 7 | 0 | 0 |
| **Total** | **52** | **52** | **52** | **0** | **0** |

> The Status and Implemented/Verified columns are updated as development progresses.
