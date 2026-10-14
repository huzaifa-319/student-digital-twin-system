# Testing Plan

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-TP-016  
**Standard:** IEEE/ISO/IEC/IEEE 29119-3:2021 — Software and Systems Engineering: Testing — Part 3: Test Documentation  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Introduction

### 1.1 Purpose

This Master Test Plan (MTP) defines the overall testing strategy, scope, approach, resources, and schedule for the SDTS project. It serves as the governing document for all test activities.

### 1.2 Test Items

The following software items are under test:

| Item ID | Item | Version |
|---|---|---|
| TI-01 | Node.js Backend API | 1.0.0 |
| TI-02 | React Frontend SPA | 1.0.0 |
| TI-03 | Python AI/ML Service | 1.0.0 |
| TI-04 | PostgreSQL Database Schema | 1.0 |
| TI-05 | Digital Twin Sync Service | 1.0.0 |

### 1.3 References

- SRS: `../srs/` (IEEE/ISO/IEC 29148:2018)
- RTM: `08-requirements-traceability-matrix.md`
- Acceptance Plan: `07-product-acceptance-plan.md`

---

## 2. Test Scope

### 2.1 Features to Test

| Feature | Test Level |
|---|---|
| User authentication (login, JWT, lockout) | Unit, Integration, System |
| Role-based access control | Unit, Integration |
| Student CRUD | Unit, Integration |
| Course / enrollment management | Integration |
| Attendance marking and upsert | Unit, Integration |
| GPA computation | Unit |
| Digital twin update on academic event | Integration, System |
| GPA prediction (AI model) | Unit (model), Integration |
| At-risk classification | Unit (model), Integration |
| Recommendation engine | Unit (model), Integration |
| Notification dispatch | Integration |
| Report generation | System |
| Performance under load | Performance |
| Security vulnerabilities | Security |
| Accessibility | Accessibility |
| End-to-end user workflows (UAT) | Acceptance |

### 2.2 Features NOT to Test

| Feature | Reason |
|---|---|
| PostgreSQL internal query optimizer | COTS component — not under project's control |
| Nginx HTTP handling | COTS component |
| React internal rendering engine | Framework — not under test |
| Email delivery (SMTP) | Third-party service; mocked in integration tests |

---

## 3. Test Approach

### 3.1 Testing Strategy

A risk-based, bottom-up testing strategy:

1. **Unit tests** — Test individual functions in isolation. Run on every commit via CI.
2. **Integration tests** — Test API endpoints against a real test database. Run on every merge to develop.
3. **System tests** — End-to-end scenarios simulating full user workflows. Run before each milestone.
4. **Performance tests** — Load tests against the full deployed system. Run before UAT.
5. **Security tests** — OWASP ZAP scan + manual checks. Run before UAT.
6. **Acceptance tests (UAT)** — Executed by representative users. Final gate before deployment.
7. **AI model tests** — Statistical accuracy evaluation. Run after each model training.

### 3.2 Test Environment

| Environment | Purpose | Setup |
|---|---|---|
| Development | Unit tests during coding | Local machine; SQLite or test PostgreSQL |
| Test | Integration + system tests | Docker Compose: Node + PostgreSQL + Python |
| UAT | User acceptance testing | University server staging instance |
| Production | Smoke tests after deployment | Live university server |

**Test database:** A separate PostgreSQL database (`sdts_test`) seeded with deterministic fixture data. Each test suite cleans up after itself (transaction rollback or table truncation).

### 3.3 Test Data Strategy

- **Fixtures:** A seed file (`tests/fixtures/seed.ts`) creates known students, courses, enrollments, grades for each test run.
- **Boundary data:** Tests explicitly cover boundary inputs (0%, 75%, 100% attendance; grade 0.0, 2.0, 4.0).
- **AI test data:** A held-out dataset (20% of historical records) used for model accuracy evaluation.
- **Sensitive data:** No real PII used in test data. All names and IDs are synthetic.

---

## 4. Test Cases

### 4.1 Authentication

| TC-ID | Test Case | Input | Expected | Priority |
|---|---|---|---|---|
| TC-001 | Valid login | Correct email + password | 200 + JWT token | High |
| TC-002 | Wrong password | Correct email + wrong password | 401 "Invalid credentials" | High |
| TC-003 | Account lockout | 5 consecutive wrong passwords | 401 "Account locked" + locked_until set | High |
| TC-004 | Expired token | Request with 8h+ old token | 401 "Token expired" | High |
| TC-005 | No token | Request with no Authorization header | 401 "No token provided" | High |
| TC-006 | Refresh token | Valid refresh token | 200 + new access token | High |
| TC-007 | Invalid refresh | Expired/revoked refresh token | 401 | High |

### 4.2 Role-Based Access Control

| TC-ID | Test Case | Input | Expected | Priority |
|---|---|---|---|---|
| TC-010 | Student reads own data | STUDENT role, own ID | 200 | High |
| TC-011 | Student reads other student | STUDENT role, other student's ID | 403 | High |
| TC-012 | Teacher accesses non-assigned course | TEACHER role, other teacher's course | 403 | High |
| TC-013 | Management reads student PII | MANAGEMENT role, GET /students/:id | 403 | High |

### 4.3 Attendance

| TC-ID | Test Case | Input | Expected | Priority |
|---|---|---|---|---|
| TC-020 | Mark attendance (30 students) | 30 records, valid courseOfferingId | 201, all 30 saved | High |
| TC-021 | Duplicate attendance | Same student + date + course | Upsert — 200, no duplicate | High |
| TC-022 | Attendance < 75% threshold | Save record that drops rate below 75% | Notification enqueued | High |
| TC-023 | Wrong teacher | Teacher marks attendance for course not assigned | 403 | High |

### 4.4 GPA Computation

| TC-ID | Test Case | Input | Expected | Priority |
|---|---|---|---|---|
| TC-030 | GPA calculation | CS-101: A (4.00, 3cr); MATH: B+ (3.33, 3cr) | GPA = 3.665 | High |
| TC-031 | CGPA across semesters | S1 GPA=3.0 (15cr), S2 GPA=3.5 (18cr) | CGPA = (3.0×15 + 3.5×18) / 33 = 3.27 | High |
| TC-032 | CGPA with no finalized grades | No finalized grades | CGPA = null (not computed) | Medium |

### 4.5 Digital Twin

| TC-ID | Test Case | Input | Expected | Priority |
|---|---|---|---|---|
| TC-040 | Twin created with student | Create student via POST /students | digital_twins row exists for student | High |
| TC-041 | Twin updates on grade entry | Finalize grade for student | Twin updated within 2 seconds | High |
| TC-042 | At-risk score stored | AI returns atRiskScore=75 | digital_twins.at_risk_score = 75, level = HIGH | High |
| TC-043 | AI unavailable fallback | Shut down AI service; enter grade | Rule-based prediction used; labeled "estimated" | High |

### 4.6 AI Model Tests

| TC-ID | Test Case | Metric | Threshold |
|---|---|---|---|
| TC-AI-01 | GPA prediction MAE | Mean Absolute Error on held-out set | ≤ 0.30 |
| TC-AI-02 | At-risk classifier F1 | F1-score on held-out set | ≥ 0.75 |
| TC-AI-03 | Recommendation relevance | % "HELPFUL" feedback | ≥ 60% |
| TC-AI-04 | AI bias check | F1 per gender/program subgroup | No subgroup F1 < 0.65 |
| TC-AI-05 | Fallback active when service down | Rule-based prediction returned | at_risk_level correctly set by rules |

### 4.7 System (End-to-End) Test Scenarios

| TC-ID | Scenario | Steps | Expected Outcome |
|---|---|---|---|
| TC-SYS-01 | Full grade entry flow | Teacher logs in → selects course → enters grade → finalizes | Student's CGPA updated; digital twin refreshed; AI prediction updated |
| TC-SYS-02 | At-risk notification flow | Grade entry drops GPA, AI score ≥ 70 | Advisor receives notification; at-risk list shows student |
| TC-SYS-03 | Student views twin | Student logs in → views dashboard → opens twin detail | All 5 twin components show correct values |
| TC-SYS-04 | Admin manages enrollment | Admin creates student → enrolls in 5 courses → twin initialized | Student can log in and see courses |
| TC-SYS-05 | Report generation | Admin requests department report → polls for completion | PDF downloaded successfully |

---

## 5. Pass/Fail Criteria

### 5.1 Test Pass Criteria

A test case **passes** when:
- The actual output matches the expected output in all respects.
- No unexpected error is thrown.
- The response time is within NFR bounds.

### 5.2 Test Fail Criteria

A test case **fails** when:
- Actual output differs from expected.
- An unhandled exception occurs.
- Response time exceeds the stated NFR.
- A security vulnerability is detected.

### 5.3 Phase Exit Criteria

| Phase | Exit Criteria |
|---|---|
| Unit Testing | 80%+ line coverage; all high-priority test cases passing |
| Integration Testing | 100% of API endpoints tested; no critical failures |
| System Testing | All TC-SYS-xx scenarios pass |
| AI Model Testing | MAE ≤ 0.30, F1 ≥ 0.75 |
| UAT | 90%+ task completion rate; no critical open defects |

---

## 6. Suspension and Resumption Criteria

**Suspend testing when:**
- A critical defect (data corruption, system crash) blocks 3+ test cases.
- The test environment is unavailable (DB down, build broken).

**Resume when:**
- The blocking defect is fixed and verified.
- The environment is restored.

---

## 7. Test Deliverables

| Deliverable | Owner | Milestone |
|---|---|---|
| This Test Plan | Project Lead | M3 — Design Baseline |
| Unit test suite (backend) | Project Lead | Ongoing |
| Unit test suite (frontend) | Frontend Dev | Ongoing |
| Unit test suite (AI) | AI Developer | M6 |
| AI model evaluation report | AI Developer | M6 |
| Integration test report | Project Lead | M7 |
| System test report | Project Lead | M8 |
| Security scan report | Project Lead | M8 |
| Performance test report | Project Lead | M8 |
| Test Summary Report | Project Lead | [17-testing-report.md](17-testing-report.md) |

---

## 8. Testing Schedule

| Test Type | Start | End | WBS Ref |
|---|---|---|---|
| Unit tests (ongoing) | Oct 2026 | Apr 2027 | 1.8.1–1.8.3 |
| Integration tests | Mar 2027 | Apr 2027 | 1.8.4 |
| System tests | Apr 2027 | Apr 2027 | 1.8.5 |
| Performance tests | Apr 2027 | Apr 2027 | 1.8.6 |
| Security tests | Apr 2027 | Apr 2027 | 1.8.7 |
| UAT | Apr 2027 | Apr 2027 | 1.8.8 |

---

## 9. Test Tools

| Tool | Purpose | Level |
|---|---|---|
| Jest | Backend unit + integration tests | Unit, Integration |
| Supertest | HTTP endpoint testing within Jest | Integration |
| Vitest | Frontend component tests | Unit |
| Pytest | AI service tests | Unit |
| Playwright | E2E browser automation | System |
| k6 | Load and performance testing | Performance |
| OWASP ZAP | Automated security scanning | Security |
| coverage (Istanbul/nyc) | Backend code coverage reporting | All |

---

## 10. Roles and Responsibilities

| Role | Testing Responsibilities |
|---|---|
| Project Lead | Write backend tests; run security tests; produce test reports |
| Frontend Developer | Write frontend component tests; participate in system tests |
| AI Developer | Write AI unit tests; run model evaluation; bias testing |
| Supervisor | Participate in UAT review; sign off on Test Summary Report |
| User Representatives | Execute UAT scenarios |

---

## 11. Risks to Testing

| Risk | Mitigation |
|---|---|
| Test database state contamination between tests | Use transaction rollback; seed data isolated per suite |
| AI model test data insufficient | Use cross-validation on available data |
| Performance test infra not available | Use cloud k6 or simulate locally with Docker |
| UAT participants unavailable | Schedule UAT 2 weeks in advance; have backup participants |
