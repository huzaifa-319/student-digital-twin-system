# SRS — Part 5: System Models, Business Rules, Testing, Deployment, Maintenance, Risks, Future, Appendices

*Chapters 16–24*

---

# Chapter 16 — System Models and Diagrams

> Note: All diagrams below are described in a structured textual format. Formal UML diagrams should be drawn in a tool such as draw.io, Lucidchart, or StarUML for submission. The text descriptions below specify exactly what each diagram must contain.

---

## 16.1 Context Diagram (Level 0 DFD)

```
                      ┌─────────────────────────────┐
   Student ──────────►│                             │◄──────── Teacher
   (views twin,       │                             │  (enters grades,
    receives recs)    │   Student Digital Twin      │   marks attendance)
                      │       System                │
   Advisor ──────────►│       (SDTS)                │◄──────── Dept. Admin
   (views at-risk,    │                             │  (manages courses,
    adds notes)       │                             │   enrollment)
                      │                             │
   Sys. Admin ───────►│                             │
   (configures,       │                             │
    manages users)    └─────────────────────────────┘
                                  │
                          Email System
                          (notifications)
```

**External entities:** Student, Teacher, Academic Advisor, Department Administrator, System Administrator, Management, Email/Notification System.

**Central process:** SDTS (the system boundary).

**Key data flows:**
- Student → SDTS: Login, profile updates, career goal
- Teacher → SDTS: Grade entry, attendance marking, assignment marks
- Dept. Admin → SDTS: Course management, enrollment
- SDTS → Student: Dashboard data, recommendations, alerts
- SDTS → Advisor: At-risk list, digital twin data
- SDTS → Email: Notification triggers
- SDTS → Management: Aggregate reports

---

## 16.2 Use Case Diagram

(See Chapter 8.1 for the textual use case diagram description.)

The formal UML use case diagram shall contain:
- All 6 actors (Student, Teacher, Advisor, Dept. Admin, Sys. Admin, Management)
- All use cases listed in Section 8.1
- `<<include>>` relationships (e.g., "Mark Attendance" includes "Authenticate")
- `<<extend>>` relationships (e.g., "View Digital Twin" extends "View Dashboard")

---

## 16.3 Activity Diagrams

### AD-01: Student Login Flow

```
[Start]
  ↓
Enter email and password
  ↓
Click "Sign In"
  ↓
[Validate credentials?]
  ├── No → Display error message
  │         ↓
  │       [Account locked after 5 failures?]
  │         ├── Yes → Lock account, send email → [End]
  │         └── No → Return to login form
  └── Yes
         ↓
       Issue JWT token
         ↓
       Redirect to role dashboard
         ↓
       [End]
```

### AD-02: Teacher Marks Attendance

```
[Start]
  ↓
Select course and date
  ↓
System loads enrolled student list
  ↓
[For each student]
  ↓
Set status (Present/Absent/Late/Excused)
  ↓
[All students done?]
  ├── No → Next student
  └── Yes
        ↓
Click "Save"
  ↓
System validates (no duplicates)
  ↓
Save attendance records
  ↓
Update digital twin (behavior component)
  ↓
[Attendance < threshold for any student?]
  ├── Yes → Queue attendance alert notification
  └── No
        ↓
[End]
```

### AD-03: AI Prediction Refresh

```
[Trigger: new grade/attendance entered]
  ↓
Add student to AI refresh queue
  ↓
AI service picks up request
  ↓
Load student digital twin data from database
  ↓
Feature engineering (normalize inputs)
  ↓
GPA regression model → predicted GPA
  ↓
At-risk classifier → at-risk score + class
  ↓
[At-risk score > 70?]
  ├── Yes → Set flag, notify advisor
  └── No
        ↓
Recommendation engine → generate top N recommendations
  ↓
Write predictions + recommendations to database
  ↓
Update digital twin Performance component
  ↓
[End]
```

---

## 16.4 Sequence Diagrams

### SD-01: Login Sequence

```
Student     Browser      React App      API           DB
  │            │             │            │             │
  │─ enters ──►│             │            │             │
  │  email+pwd │             │            │             │
  │            │─ submit ───►│            │             │
  │            │             │─ POST ────►│             │
  │            │             │ /auth/login│             │
  │            │             │            │─ findUser ─►│
  │            │             │            │◄─ user ─────│
  │            │             │            │─ bcrypt.cmp │
  │            │             │            │─ jwt.sign   │
  │            │             │◄─ {token} ─│             │
  │            │◄─ store ────│            │             │
  │            │  token+user │            │             │
  │◄─ redirect ┤             │            │             │
  │  /dashboard│             │            │             │
```

### SD-02: View Digital Twin

```
Student   React App       API          DB          AI Service
  │           │            │            │               │
  │─ navigate►│            │            │               │
  │ /twin     │            │            │               │
  │           │─ GET ─────►│            │               │
  │           │ /twin/:id  │            │               │
  │           │            │─ auth+role►│               │
  │           │            │─ query ───►│               │
  │           │            │ (twin+     │               │
  │           │            │  predictions)              │
  │           │            │◄── data ───│               │
  │           │◄── JSON ───│            │               │
  │           │ (twin data)│            │               │
  │◄─ render ─│            │            │               │
  │ dashboard │            │            │               │
```

---

## 16.5 Class Diagram (Key Classes)

```
┌──────────────────┐       ┌───────────────────────┐
│ User             │       │ Student               │
│─────────────────-│       │───────────────────────│
│ id               │1     0│ id                    │
│ email            ├───────┤ user_id (FK)          │
│ passwordHash     │       │ studentIdNo           │
│ role             │       │ firstName, lastName   │
│ isActive         │       │ program               │
│──────────────────│       │ status                │
│ login()          │       │─────────────────────  │
│ logout()         │       │ getDigitalTwin()      │
│ changePassword() │       │ getGPA()              │
└──────────────────┘       │ getAttendanceRate()   │
                           └───────────┬───────────┘
                                       │1
                                       │
                            ┌──────────▼──────────┐
                            │ DigitalTwin          │
                            │─────────────────────│
                            │ studentId (FK)       │
                            │ currentCgpa          │
                            │ engagementScore      │
                            │ careerReadiness      │
                            │─────────────────────│
                            │ refresh()            │
                            │ getPrediction()      │
                            │ getRecommendations() │
                            └─────────────────────┘

┌──────────────────┐       ┌──────────────────────┐
│ CourseOffering   │       │ Grade                │
│──────────────────│       │──────────────────────│
│ id               │1     *│ id                   │
│ courseId         ├───────┤ enrollmentId (FK)    │
│ semesterId       │       │ gradeLetter          │
│ teacherId        │       │ gradePoints          │
│──────────────────│       │ finalized            │
│ getEnrollments() │       │──────────────────────│
│ getAttendance()  │       │ finalize()           │
└──────────────────┘       └──────────────────────┘

┌──────────────────┐       ┌──────────────────────┐
│ Prediction       │       │ Recommendation       │
│──────────────────│       │──────────────────────│
│ studentId        │       │ studentId            │
│ predictedGpa     │       │ type                 │
│ atRiskScore      │       │ title                │
│ confidence       │       │ rationale            │
│ explanation      │       │ priority             │
│ modelVersion     │       │ feedback             │
└──────────────────┘       └──────────────────────┘
```

---

## 16.6 ER Diagram

(See Chapter 11.3 and 11.4 for the ER diagram specification. The formal diagram shall use Chen notation or Crow's Foot notation as required by the institution's standards.)

---

## 16.7 Data Flow Diagram — Level 0

Same as Context Diagram (16.1).

---

## 16.8 Data Flow Diagram — Level 1

Level 1 decomposes the SDTS into its main processes:

```
Processes:
  P1: User Authentication
  P2: Student Profile Management
  P3: Academic Data Management
  P4: Attendance Management
  P5: Digital Twin Maintenance
  P6: AI Predictions & Recommendations
  P7: Dashboard & Reporting
  P8: Notification Management

Data Stores:
  DS1: Users
  DS2: Students
  DS3: Grades/Enrollments
  DS4: Attendance
  DS5: Digital Twins
  DS6: Predictions
  DS7: Recommendations
  DS8: Audit Logs

Key Level-1 Flows:
  Teacher → P3 (grade entry) → DS3 (grades) → P5 (twin update) → DS5 (twin)
  DS5 (twin) → P6 (AI inference) → DS6 (predictions) + DS7 (recommendations)
  DS5 + DS6 + DS7 → P7 (dashboard query) → Student/Advisor/Admin
  P3 + P4 → P8 (threshold check) → Email/Notification
```

---

## 16.9 Component Diagram

```
┌─────────────────────────────────────────────────────┐
│  Frontend (React)                                    │
│  ┌──────────┐ ┌──────────┐ ┌─────────────────────┐ │
│  │ Auth     │ │ Dashboard│ │ Student Pages       │ │
│  │ Module   │ │ Module   │ │ (list, detail, twin)│ │
│  └──────────┘ └──────────┘ └─────────────────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌─────────────────────┐ │
│  │ Reports  │ │ Charts   │ │ Notifications       │ │
│  │ Module   │ │ Module   │ │ Module              │ │
│  └──────────┘ └──────────┘ └─────────────────────┘ │
└────────────────────────┬────────────────────────────┘
                         │ REST API
┌────────────────────────▼────────────────────────────┐
│  Backend (Node.js)                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐ │
│  │ Auth     │ │ Student  │ │ Grade/Attendance     │ │
│  │ Service  │ │ Service  │ │ Service              │ │
│  └──────────┘ └──────────┘ └──────────────────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐ │
│  │ Twin     │ │ Report   │ │ Notification         │ │
│  │ Sync Svc │ │ Service  │ │ Service              │ │
│  └──────────┘ └──────────┘ └──────────────────────┘ │
└────────────────────────┬────────────────────────────┘
                         │ Prisma / HTTP
          ┌──────────────┴────────────────┐
          │                               │
┌─────────▼──────────┐    ┌───────────────▼───────────┐
│ PostgreSQL          │    │  AI/ML Service (Python)   │
│ (data persistence)  │    │  (predictions + recs)     │
└────────────────────┘    └───────────────────────────┘
```

---

## 16.10 Deployment Diagram

```
┌────────────────────────────────────────────────────┐
│  Production Server (Ubuntu 22.04)                   │
│                                                    │
│  ┌─────────────────────────────────────────────┐   │
│  │  Nginx (reverse proxy, SSL termination)      │   │
│  └───────────┬──────────────────┬──────────────┘   │
│              │                  │                   │
│  ┌───────────▼──────┐  ┌────────▼───────────────┐  │
│  │  Static Files    │  │  Node.js API (PM2)     │  │
│  │  (React build)   │  │  Port 5000             │  │
│  └──────────────────┘  └────────┬───────────────┘  │
│                                 │                   │
│  ┌──────────────────────────────▼────────────────┐  │
│  │  Python AI Service (Gunicorn)                 │  │
│  │  Port 5001 (internal only)                    │  │
│  └──────────────────────────────────────────────┘  │
└──────────────────────────┬─────────────────────────┘
                           │
              ┌────────────▼────────────┐
              │  Database Server        │
              │  PostgreSQL 15          │
              │  Port 5432 (private)    │
              └─────────────────────────┘
```

---

## 16.11 – 16.13 (Digital Twin Model, Workflow Diagram)

*These are summarized in Section 3.2 (Digital Twin Concept), Section 3.5 (Workflow), and Chapter 6 (Digital Twin Requirements). Formal diagrams to be drawn in draw.io or equivalent.*

---

---

# Chapter 17 — Business Rules

---

## 17.1 Academic Rules

| ID | Rule |
|---|---|
| BR-ACA-01 | A student must pass all prerequisites before being enrolled in a course. |
| BR-ACA-02 | A grade can only be finalized by the assigned teacher of the course. |
| BR-ACA-03 | Once a grade is finalized, it can only be changed by a System Administrator after a formal appeal, and the change is logged in the audit trail. |
| BR-ACA-04 | A student cannot be enrolled in the same course offering twice. |
| BR-ACA-05 | Semester GPA is computed only after at least one finalized grade exists for that semester. |

---

## 17.2 GPA/CGPA Rules

| ID | Rule |
|---|---|
| BR-GPA-01 | Semester GPA = Σ(grade_points × credit_hours) ÷ Σ(credit_hours) for all finalized courses in the semester. |
| BR-GPA-02 | CGPA = Σ(grade_points × credit_hours) ÷ Σ(credit_hours) for all finalized courses across all semesters. |
| BR-GPA-03 | A repeated course: both attempts appear on the transcript, but only the higher grade is counted in the GPA calculation (configurable). |
| BR-GPA-04 | GPA and CGPA shall be stored to 2 decimal places (e.g., 3.45). |

---

## 17.3 Attendance Rules

| ID | Rule |
|---|---|
| BR-ATT-01 | Attendance percentage for a course = (Present + Late) ÷ Total sessions × 100. |
| BR-ATT-02 | If a student's attendance in any course drops below 75%, an automatic low-attendance alert is generated and sent to the student and their advisor. |
| BR-ATT-03 | Attendance below 75% may result in a failing grade for that course — this is an institution rule enforced manually; the system flags but does not auto-fail. |
| BR-ATT-04 | A "Late" status counts as 0.5 in attendance calculation for the purposes of GPA prediction (configurable). |

---

## 17.4 Course Prerequisite Rules

| ID | Rule |
|---|---|
| BR-CRS-01 | A prerequisite is considered satisfied if the student has a passing grade (grade_points > 0) in the prerequisite course. |
| BR-CRS-02 | Prerequisites are checked at enrollment time. A student blocked by prerequisites cannot be enrolled without an admin override. |
| BR-CRS-03 | Prerequisite overrides must include a reason and are logged in the audit trail. |

---

## 17.5 Student Status Rules

| ID | Rule |
|---|---|
| BR-STU-01 | A student with CGPA < 1.5 after two consecutive semesters shall automatically receive the status "At Risk of Suspension". |
| BR-STU-02 | A student with CGPA between 1.5 and 1.99 shall receive "Academic Probation" status. |
| BR-STU-03 | A student with CGPA ≥ 2.0 has "Good Standing". |
| BR-STU-04 | Status changes are computed automatically at semester lock and stored in the student record. |

---

## 17.6 At-Risk Classification Rules

| ID | Rule |
|---|---|
| BR-RISK-01 | At-Risk Score 70–100 → High Risk. Advisor is notified automatically. |
| BR-RISK-02 | At-Risk Score 40–69 → Medium Risk. Visible on advisor dashboard; no automatic notification. |
| BR-RISK-03 | At-Risk Score 0–39 → Low Risk. No alert generated. |
| BR-RISK-04 | At-risk thresholds are configurable by System Administrator. |
| BR-RISK-05 | A student who was High Risk and drops below 70 on the next prediction cycle shall be removed from the High Risk list; the change is logged. |

---

## 17.7 Recommendation Rules

| ID | Rule |
|---|---|
| BR-REC-01 | Recommendations are regenerated at least every 24 hours during an active semester. |
| BR-REC-02 | A recommendation dismissed by the student shall not reappear in the same semester. |
| BR-REC-03 | Course recommendations must comply with prerequisite rules: only courses the student is eligible for shall be recommended. |
| BR-REC-04 | Career recommendations require at least 2 completed semesters of data to be generated. |

---

## 17.8 Access Control Rules

| ID | Rule |
|---|---|
| BR-ACC-01 | A teacher can only access data for courses they are currently assigned to teach. Historical data for past assignments is accessible in read-only mode. |
| BR-ACC-02 | An academic advisor can access any student assigned to them by the Dept. Admin. |
| BR-ACC-03 | A student can only view their own data. |
| BR-ACC-04 | Management users cannot see any individual student PII. |

---

## 17.9 Notification Rules

| ID | Rule |
|---|---|
| BR-NOT-01 | Assignment deadline reminder: sent 24 hours before due date if submission is absent. |
| BR-NOT-02 | Attendance alert: sent when attendance in any course drops below the threshold (default 75%). |
| BR-NOT-03 | At-risk notification to advisor: sent when a student newly enters "High Risk" status. |
| BR-NOT-04 | Grade update notification: sent to student when a final grade is posted for any course. |
| BR-NOT-05 | The same notification type shall not be sent to the same recipient more than once per 24 hours for the same trigger event. |

---

---

# Chapter 18 — Reporting Requirements

---

## 18.1 Student Performance Report

**Audience:** Student, Advisor, Admin  
**Contents:** Student profile summary, per-semester GPA and CGPA trend, course-by-course grade breakdown, skills profile, career readiness score, AI predictions summary.  
**Format:** PDF  
**Frequency:** On-demand

---

## 18.2 Attendance Report

**Audience:** Student, Teacher, Advisor, Admin  
**Contents:** Per-course attendance breakdown (Present/Absent/Late/Excused counts and %), trend chart, alerts history.  
**Format:** PDF / CSV  
**Frequency:** On-demand; automated monthly

---

## 18.3 Grade Report / Transcript

**Audience:** Student (official), Admin  
**Contents:** All enrolled semesters, all courses per semester, grade letter, grade points, credit hours, semester GPA, cumulative CGPA, academic standing per semester.  
**Format:** PDF (official layout)  
**Frequency:** On-demand

---

## 18.4 Semester Progress Report

**Audience:** Advisor, Dept. Admin  
**Contents:** All active students in the department — current semester grades (where available), attendance rates, assignment completion rates, at-risk flags.  
**Format:** Excel / CSV  
**Frequency:** On-demand; automated at mid-semester and end-of-semester

---

## 18.5 Skill Gap Report

**Audience:** Student, Advisor  
**Contents:** Per-domain skill comparison: expected level vs. actual level, gap severity, recommended actions.  
**Format:** PDF (with radar chart embedded)  
**Frequency:** On-demand; once per semester automatically

---

## 18.6 Career Recommendation Report

**Audience:** Student, Advisor  
**Contents:** Declared career goal, career readiness score, gap-to-goal skills list, top 3 alternative career suggestions with readiness scores.  
**Format:** PDF  
**Frequency:** On-demand

---

## 18.7 At-Risk Student Report

**Audience:** Advisor, Dept. Admin, Management (aggregate only)  
**Contents:** List of students with High/Medium risk classification, key contributing factors, last advising date, trend (improving/stable/worsening).  
**Format:** Excel / PDF  
**Frequency:** On-demand; automated weekly during active semester

---

## 18.8 Department Performance Report

**Audience:** Dept. Admin, Management  
**Contents:** Department-wide enrollment count, average CGPA distribution, pass/fail rates per course, at-risk student count, semester-over-semester trends.  
**Format:** PDF / Excel  
**Frequency:** End-of-semester; on-demand

---

## 18.9 Digital Twin Report

**Audience:** Student, Advisor  
**Contents:** All five digital twin components visualized: academic history, behavior metrics, skills profile, career readiness, performance predictions. Includes historical comparison where data is available.  
**Format:** PDF (with embedded charts)  
**Frequency:** On-demand

---

## 18.10 AI Analytics Report

**Audience:** System Administrator, Management  
**Contents:** AI model performance metrics (MAE for GPA predictor, F1 for risk classifier), prediction accuracy vs. actual outcomes (post-semester), recommendation feedback rates, model version and training date.  
**Format:** PDF  
**Frequency:** Post-semester (after grades are finalized)

---

---

# Chapter 19 — Testing Requirements

---

## 19.1 Testing Strategy

The testing strategy follows a bottom-up approach: unit tests first, then integration tests, then system tests, then acceptance tests.

- **Unit tests** — Test individual functions and services in isolation.
- **Integration tests** — Test interactions between backend services and the database.
- **System tests** — End-to-end tests simulating full user workflows.
- **Acceptance tests** — Tests against the functional requirements; verified by stakeholders.
- **Performance tests** — Load testing to verify NFR-PERF requirements.
- **Security tests** — Penetration testing and vulnerability scanning.
- **AI model tests** — Statistical validation of prediction accuracy.

---

## 19.2 Unit Testing

**Scope:** Controllers, service functions, utility functions, Zod validators, AI feature engineering pipeline.  
**Framework:** Jest (backend), Vitest (frontend), Pytest (AI service).  
**Target coverage:** ≥ 80% line coverage on core business logic.

Example unit tests:
- `computeSemesterGPA()` — test with known grade sets
- `computeAtRiskScore()` — test boundary cases (0%, 75%, 100% attendance)
- `loginSchema.safeParse()` — test valid and invalid inputs
- `generateReceiptNo()` — test uniqueness property

---

## 19.3 Integration Testing

**Scope:** API endpoint tests that hit a real test database.  
**Framework:** Jest + Supertest (backend), Pytest + requests (AI service).  
**Approach:** Use a dedicated test PostgreSQL database seeded with fixture data; each test runs in a transaction that is rolled back after the test.

Example integration tests:
- `POST /auth/login` — correct credentials → JWT returned
- `POST /attendance` — teacher submits 30 records → all saved, attendance_rate updated
- `GET /students/:id/twin` — returns all 5 twin components correctly

---

## 19.4 System Testing

**Scope:** Full end-to-end workflows via the React UI (or Playwright E2E tests).  
**Tool:** Playwright or Cypress.

Example system test scenarios:
- Teacher logs in → navigates to attendance → marks class → saves → student's attendance rate updated on their dashboard
- Admin creates student → enrolls in course → teacher enters grade → student's GPA computed → digital twin updated

---

## 19.5 Acceptance Testing

**Approach:** Stakeholders (university representatives) execute pre-defined test scripts against the acceptance environment.  
**Pass criteria:** All functional requirements FR-* must be demonstrable; all critical non-functional requirements (performance, security) must pass their acceptance tests.

---

## 19.6 Performance Testing

**Tool:** k6 or Apache JMeter.

| Test scenario | Simulated load | Pass criteria |
|---|---|---|
| Dashboard page load | 200 concurrent users | P95 response time < 3s |
| Student list search | 50 concurrent queries | Response < 2s |
| Attendance bulk save (50 students) | 20 concurrent teachers | API response < 3s |
| AI prediction batch | 5000 students | Completes within 1 hour |

---

## 19.7 Security Testing

- **OWASP ZAP** automated scan against all API endpoints (run in CI pipeline)
- **Manual pen test** for: authentication bypass, IDOR, SQL injection, XSS, JWT manipulation
- **Dependency vulnerability scan:** `npm audit` and `pip-audit` run on each build

---

## 19.8 Usability Testing

- Moderated usability sessions with 3–5 representative users per role (student, teacher, advisor)
- Task completion rate target: ≥ 90% for primary tasks
- Time-on-task target: primary tasks completable within 5 minutes

---

## 19.9 AI Model Testing

| Test | Method | Pass threshold |
|---|---|---|
| GPA prediction accuracy | MAE on held-out test set | MAE ≤ 0.30 |
| At-risk classification F1 | F1-score on held-out test set | F1 ≥ 0.75 |
| Recommendation relevance | User feedback ("Helpful" rate) | ≥ 60% |
| Bias evaluation | Performance metrics split by gender/program | No group's F1 < 0.65 |

---

## 19.10 Digital Twin Validation

- Verify that the digital twin values (CGPA, attendance rate, engagement score) match independent manual calculations from raw data.
- Run a reconciliation script at the end of each test cycle comparing twin cached values against database-computed values.

---

## 19.11 Sample Test Cases

| TC-ID | Module | Test | Input | Expected Output |
|---|---|---|---|---|
| TC-001 | Login | Valid credentials | email: admin@university.edu, password: Admin@123 | JWT token returned, redirect to dashboard |
| TC-002 | Login | Wrong password | email: valid, password: wrong | HTTP 401, "Invalid credentials" |
| TC-003 | Login | Locked account | 5 failed attempts | HTTP 401, "Account locked" |
| TC-004 | Attendance | Mark attendance | 30 students, all Present | 30 records created, no duplicates |
| TC-005 | Attendance | Duplicate mark | Same student, date, course | HTTP 409 or upsert (update existing) |
| TC-006 | Grade | Compute GPA | CS-101: A (3cr), MATH-101: B+ (3cr) | GPA = (4.0×3 + 3.3×3) / 6 = 3.65 |
| TC-007 | Auth | Access other student | Student A requests Student B's data | HTTP 403 Forbidden |
| TC-008 | Twin | Update on grade entry | Grade entered for student | Twin academic component updated within 2s |
| TC-009 | At-risk | High risk flag | At-risk score = 75 | Student flagged, advisor notified |
| TC-010 | Report | Generate transcript | Student with 3 semesters | PDF with all semesters generated |

---

## 19.12 Acceptance Criteria

The system is accepted when:
1. All functional requirements FR-* are demonstrably implemented and testable.
2. All test cases TC-001 through TC-010 (and the full test suite) pass.
3. Performance tests pass at specified load levels.
4. No critical (CVSS ≥ 7.0) security vulnerabilities remain open.
5. AI model accuracy meets minimum thresholds (MAE ≤ 0.30, F1 ≥ 0.75).
6. Usability test task completion rate ≥ 90% for primary tasks.

---

---

# Chapter 20 — Deployment Requirements

---

## 20.1 Deployment Environment

Two environments are required:

| Environment | Purpose |
|---|---|
| Development | Local developer machines; full stack running locally |
| Production | Single-server deployment (for university project); university server or cloud VM |

---

## 20.2 Hardware Requirements (Production)

| Component | Minimum specification |
|---|---|
| CPU | 4-core, 2.4 GHz+ |
| RAM | 8 GB (16 GB recommended) |
| Storage | 100 GB SSD |
| Network | 100 Mbps uplink |

---

## 20.3 Software Requirements (Production)

| Software | Version |
|---|---|
| Ubuntu Server | 22.04 LTS |
| Node.js | 20 LTS |
| Python | 3.10+ |
| PostgreSQL | 15+ |
| Nginx | 1.24+ |
| PM2 (Node process manager) | Latest |
| Certbot (SSL) | Latest |

---

## 20.4 Server Requirements

- The Node.js API shall run under PM2 in cluster mode (one process per CPU core) for load distribution.
- The Python AI service shall run under Gunicorn (2 workers).
- Nginx acts as the reverse proxy: routes `/api` requests to Node.js, `/` to the React build, and `/ai` (internal only) to the Python service.

---

## 20.5 Database Deployment

- PostgreSQL runs on the same server (for the university project) or a dedicated DB server (production).
- The database must be initialized with: `npx prisma migrate deploy` (applies all migrations).
- Initial seed data: `npx prisma db seed` (creates admin account).
- PostgreSQL configuration: `max_connections = 100`, `shared_buffers = 256MB`.

---

## 20.6 AI Model Deployment

- Trained model files (`.pkl`) are stored in the `ai_service/models/` directory.
- The Flask AI service is started with: `gunicorn -w 2 -b 127.0.0.1:5001 app:app`
- The API server communicates with the AI service via `http://127.0.0.1:5001` (internal only, not exposed publicly).
- The first-run model training is triggered via: `python training/train_all.py`

---

## 20.7 Network Requirements

- HTTPS (TLS 1.2+) required for all public-facing endpoints.
- SSL certificate from Let's Encrypt (Certbot) or institution's CA.
- Ports exposed publicly: 443 (HTTPS), 80 (HTTP, redirected to 443).
- Ports internal only: 5000 (Node.js), 5001 (Python), 5432 (PostgreSQL).
- Firewall: only ports 80 and 443 open to the internet.

---

## 20.8 Configuration Requirements

All environment-specific configuration shall be in `.env` files:

**Backend `.env`:**
```env
PORT=5000
NODE_ENV=production
DATABASE_URL="postgresql://sdts_app:password@localhost:5432/sdts_production"
JWT_SECRET="256-bit-random-value"
JWT_EXPIRES_IN="8h"
REFRESH_TOKEN_SECRET="another-256-bit-random"
FRONTEND_URL="https://sdts.university.edu"
AI_SERVICE_URL="http://127.0.0.1:5001"
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASS="sendgrid-api-key"
```

---

## 20.9 Backup Strategy

| Backup type | Schedule | Location |
|---|---|---|
| Full PostgreSQL dump | Daily, 2:00 AM | Off-site storage |
| WAL streaming | Continuous | Same server, replicated off-site |
| Application code | Git repository | GitHub/university GitLab |
| AI model files | After each retraining | Off-site storage |

---

## 20.10 Disaster Recovery

1. Restore from the most recent full backup + WAL segments.
2. Redeploy application from Git repository.
3. Reconfigure environment variables.
4. Run `npx prisma migrate deploy` to ensure schema is current.
5. Verify AI models are restored; retrain if files are missing.
6. Run smoke tests: login, grade entry, dashboard load.
7. Target RTO: 4 hours.

---

---

# Chapter 21 — Maintenance and Support

---

## 21.1 System Maintenance

- **Scheduled maintenance window:** Sundays 11 PM – 5 AM (communicated 24 hours in advance).
- **Maintenance activities:** Dependency updates, Node.js version upgrades, OS security patches.
- **Versioning:** Semantic versioning (MAJOR.MINOR.PATCH) for all releases.

---

## 21.2 Database Maintenance

- Weekly `VACUUM ANALYZE` on all high-write tables (attendance, learning_activity, audit_logs).
- Monthly index health check: identify and rebuild fragmented indexes.
- Quarterly backup restoration test.

---

## 21.3 AI Model Maintenance

- Models retrained at the start of each new semester.
- Model evaluation report generated after each retraining (see Section 7.11).
- Model files versioned with date suffix: `gpa_model_2026_spring.pkl`.
- If model accuracy drops below threshold between semesters, fall back to previous version until retraining.

---

## 21.4 Digital Twin Maintenance

- End-of-semester full twin reconciliation: compare all cached twin values against ground truth database computations; report and fix discrepancies.
- On schema changes that affect twin computation (e.g., new attendance rule), a migration script shall recompute affected twin fields for all students.

---

## 21.5 Bug Fixing

- Critical bugs (system unavailability, data corruption): fix and deploy within 24 hours.
- High-priority bugs (major feature broken): fix within 5 business days.
- Low-priority bugs (cosmetic, minor): fix in next scheduled release.

---

## 21.6 Version Management

- Source code managed in Git (GitHub or university GitLab).
- Branch strategy: `main` (production), `develop` (integration), feature branches for new work.
- Releases tagged with semantic version on `main`.
- Changelog maintained for every release.

---

## 21.7 System Monitoring

| Metric | Tool | Alert threshold |
|---|---|---|
| Server CPU usage | Server monitoring (e.g., Prometheus/Grafana) | > 85% for 5 minutes |
| API response time | Application logs | P95 > 3 seconds |
| Database query time | pg_stat_statements | Any query > 1 second |
| Error rate | Application logs | > 1% of requests in 5 minutes |
| Disk space | OS monitoring | < 10 GB remaining |
| AI service availability | Health endpoint poll | Unavailable > 5 minutes |

---

## 21.8 Technical Support

- First-level support: System Administrator (account issues, data entry errors).
- Second-level support: Development team (bugs, feature issues).
- Support request channels: internal helpdesk ticket system.
- Response SLA: critical within 4 hours; high within 1 business day; low within 5 business days.

---

---

# Chapter 22 — Project Constraints and Risks

---

## 22.1 Technical Constraints

1. The system must run on the university's existing server hardware (4-core, 8 GB RAM).
2. The AI/ML implementation is limited to scikit-learn models (no deep learning frameworks) due to computational constraints.
3. The frontend must be browser-based; no native mobile application in v1.
4. Real-time features (live dashboard updates) are limited to polling; WebSockets are a future enhancement.

---

## 22.2 Resource Constraints

1. Development team: 1 to 3 developers (university project team).
2. Timeline: single academic year for design, development, and testing.
3. Budget: no commercial cloud hosting budget — must use available university infrastructure.
4. AI training data: limited to historical data available from the institution (may be 1–3 years).

---

## 22.3 Data Availability Constraints

1. Initial deployment may have insufficient historical data for accurate AI model training (< 100 student-semester records).
2. Mitigation: rule-based fallback predictions until sufficient data accumulates (see FR-AI-28).
3. LMS integration data may not be available in the first deployment.

---

## 22.4 Privacy Risks

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| Unauthorized access to student data | High | Medium | RBAC, audit logs, encryption |
| Data breach via API vulnerability | High | Low | HTTPS, input validation, security testing |
| AI model trained on insufficiently anonymized data | Medium | Low | De-identification pipeline in training |

---

## 22.5 Security Risks

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| JWT secret compromise | High | Low | Strong secret, env var, rotate regularly |
| SQL injection | High | Low | Prisma ORM parameterized queries |
| XSS attack | Medium | Medium | React escaping, CSP header |
| Brute force login | Medium | Medium | Account lockout, rate limiting |

---

## 22.6 AI/ML Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Insufficient training data | Low accuracy predictions | Rule-based fallback; communicate uncertainty |
| Model bias against demographic groups | Unfair at-risk flagging | Bias evaluation in training pipeline |
| Overfitting to historical cohort | Poor generalization | Cross-validation; retrain each semester |
| AI service unavailability | No predictions available | Cache last predictions; main app continues without AI |

---

## 22.7 Integration Risks

| Risk | Mitigation |
|---|---|
| LMS API changes break sync | Version-pin LMS API; graceful degradation |
| Email provider outage | Queue failed emails; retry with exponential backoff |
| Database version upgrade breaks Prisma schema | Test migration on staging before production |

---

## 22.8 Performance Risks

| Risk | Mitigation |
|---|---|
| Slow dashboard loads at semester start (peak) | Database indexing; query optimization; caching twin values |
| AI batch prediction runs too long | Background job; asynchronous; progress indicator for admin |
| Large report generation blocks server | Async report generation; download link emailed when ready |

---

## 22.9 Risk Mitigation Strategies Summary

1. **Regular security audits:** OWASP ZAP scan in CI/CD pipeline.
2. **Automated testing:** Minimum 80% code coverage; integration tests run on every pull request.
3. **Gradual rollout:** Deploy to a pilot group (one department) before university-wide rollout.
4. **Data validation:** All imports and API inputs validated with Zod before database writes.
5. **AI fallback:** Rule-based predictions when ML confidence is too low or model is unavailable.
6. **Backup and recovery:** Daily backups with tested restoration procedure.

---

---

# Chapter 23 — Future Enhancements

---

## 23.1 Mobile Application

Develop iOS and Android apps (React Native) providing students and teachers with full access to their most-used features: dashboard, attendance marking, grade checking, and notifications.

---

## 23.2 Advanced AI Predictions

- Degree completion probability (will the student graduate in n years?)
- Course difficulty prediction (how likely is a specific student to struggle with a specific course?)
- Peer comparison analytics (how does the student rank within their cohort, by subject domain?)

---

## 23.3 Generative AI Assistant

Integrate an LLM-powered academic assistant that students can converse with: "Why is my GPA dropping?", "What courses should I take next semester?", "Am I on track for my career goal?" The assistant queries the student's digital twin and provides personalized, natural-language answers.

---

## 23.4 Real-Time Digital Twin

Move from periodic synchronization to a fully event-driven, real-time digital twin using WebSockets or Server-Sent Events, so the dashboard reflects any grade or attendance change within seconds.

---

## 23.5 IoT/Learning Device Integration

Integrate with smart campus IoT devices (e.g., smart attendance systems using ID card readers or facial recognition) to automatically populate attendance data without manual teacher entry.

---

## 23.6 Parent/Guardian Portal

Add a parent-facing portal with a limited view of their child's academic progress, attendance, and at-risk status, with the ability to send messages to the academic advisor.

---

## 23.7 University-Wide Integration

Connect the SDTS to university ERP systems (for enrollment, fees, and HR data), library systems, and research management systems, creating a fully integrated academic intelligence platform.

---

## 23.8 Advanced Career Simulation

Integrate with live job market data (e.g., LinkedIn API, O*NET) to provide real-time career path analysis: which skills are in demand, what salary ranges are associated with each career path, and how the student's profile compares to successful graduates in their target field.

---

## 23.9 Automated Academic Advising

Use the digital twin and AI to draft personalized advising agendas: before each advising session, the system automatically generates a list of topics to discuss based on the student's current twin state (e.g., "Discuss declining Math performance; review career goal alignment").

---

---

# Chapter 24 — Appendices

---

## 24.1 Glossary

*(See Chapter 1.7 for the main definitions list. Additional terms:)*

| Term | Definition |
|---|---|
| Academic Twin | The sub-model of the Digital Twin capturing grades, GPA/CGPA, and academic history |
| Engagement Score | A computed 0–100 metric representing a student's participation level: assignment submission timeliness, login frequency, quiz participation |
| Career Readiness Score | A 0–100 metric indicating how well a student's current skills and GPA align with their declared career goal |
| At-Risk Score | A 0–100 ML-generated metric representing the probability that a student will fail a course or drop out |
| Feature Engineering | The process of transforming raw data into input features suitable for machine learning models |
| Soft Deletion | Marking a record as inactive or deleted without removing it from the database, preserving historical integrity |
| Upsert | Database operation: insert the record if it doesn't exist; update it if it does |

---

## 24.2 Acronyms

| Acronym | Full Form |
|---|---|
| SDTS | Student Digital Twin System |
| AI | Artificial Intelligence |
| ML | Machine Learning |
| GPA | Grade Point Average |
| CGPA | Cumulative Grade Point Average |
| RBAC | Role-Based Access Control |
| JWT | JSON Web Token |
| API | Application Programming Interface |
| REST | Representational State Transfer |
| ORM | Object-Relational Mapper |
| WCAG | Web Content Accessibility Guidelines |
| OWASP | Open Web Application Security Project |
| TLS | Transport Layer Security |
| PII | Personally Identifiable Information |
| RTO | Recovery Time Objective |
| RPO | Recovery Point Objective |
| SRS | Software Requirements Specification |
| DFD | Data Flow Diagram |
| ER | Entity-Relationship |
| UML | Unified Modeling Language |
| CI/CD | Continuous Integration / Continuous Deployment |
| PM2 | Process Manager 2 (Node.js process manager) |
| MAE | Mean Absolute Error |

---

## 24.3 References

1. IEEE Std 830-1998 — IEEE Recommended Practice for Software Requirements Specifications
2. Grieves, M. (2014). Digital Twin: Manufacturing Excellence through Virtual Factory Replication. White Paper.
3. Lim, K. Y. H., et al. (2020). A Digital Twin-Enhanced System for Engineering Lifecycle Management. Journal of Manufacturing Science and Engineering.
4. Pedregosa, F. et al. (2011). Scikit-learn: Machine Learning in Python. JMLR, 12, pp. 2825-2830.
5. OWASP Top Ten Project. https://owasp.org/www-project-top-ten/
6. WCAG 2.1 Guidelines. https://www.w3.org/TR/WCAG21/
7. Prisma Documentation. https://www.prisma.io/docs
8. React Documentation. https://react.dev
9. ISO/IEC 25010:2011 — Systems and software quality models

---

## 24.4 Sample Screens

*(Wireframes / mockup sketches to be added separately. Key screens:)*

1. **Login page** — Email/password form, "Forgot password" link
2. **Student dashboard** — Twin visualization, GPA trend, at-risk gauge, recommendations panel
3. **Teacher dashboard** — My courses cards, class performance chart, at-risk alerts
4. **Attendance marking screen** — Student list, status buttons (Present/Absent/Late/Excused), Save
5. **Grade entry screen** — Enrollment list, grade letter dropdown per student
6. **At-risk student list** — Advisor view: sortable table with risk score, key factors, last advising date
7. **Digital twin detail page** — All 5 component panels: academic, behavior, skills, career, performance
8. **Report generation page** — Report type selector, parameter inputs, Generate/Download buttons

---

## 24.5 Sample Reports

*(To be included as appendices to the formal submission:)*

1. **Student Transcript** — A4 layout with institution header, student details, semester-by-semester grade table, CGPA summary
2. **At-Risk Report** — Table of flagged students with risk scores, primary contributing factors, and advisor assignment
3. **AI Analytics Report** — Model accuracy metrics, prediction vs. actual outcome comparison chart

---

## 24.6 Data Dictionary

*(Key fields defined — supplement to Chapter 10.)*

| Field | Table | Type | Description |
|---|---|---|---|
| student_id_no | students | VARCHAR(20) | Unique, immutable admission number assigned by the institution |
| grade_letter | grades | VARCHAR(2) | Letter grade from the institution's scale (A, A-, B+, ..., F) |
| grade_points | grades | DECIMAL(4,2) | Numeric GPA equivalent of the grade letter (e.g., A = 4.00) |
| at_risk_score | predictions | DECIMAL(5,2) | 0–100 ML-computed probability-based risk metric |
| engagement_score | digital_twins | DECIMAL(5,2) | 0–100 computed from behavioral data (see Section 6.5) |
| career_readiness_score | digital_twins | DECIMAL(5,2) | 0–100 cosine similarity between current skill vector and career requirement vector |
| confidence_score | predictions | DECIMAL(5,2) | 0–100 estimate of how reliable the GPA prediction is |

---

## 24.7 API Documentation

*(Full OpenAPI/Swagger specification to be generated from the implemented backend using Swagger-JSDoc or similar. Key endpoints are listed in Section 9.6.)*

The API documentation shall be:
- Auto-generated from JSDoc annotations using `swagger-jsdoc`
- Served at `/api/docs` in development environments
- Exported as a static `openapi.json` for the project submission

---

## 24.8 Requirements Traceability Matrix

| FR ID | Chapter | Test Case | Status |
|---|---|---|---|
| FR-AUTH-01 | 5.1 | TC-001 | To be implemented |
| FR-AUTH-06 | 5.2 | TC-001, TC-002, TC-003 | To be implemented |
| FR-STU-01 | 5.4 | TC-007 | To be implemented |
| FR-ATT-01 | 5.8 | TC-004, TC-005 | To be implemented |
| FR-GPA-01 | 5.11 | TC-006 | To be implemented |
| FR-DT-01 | 5.16 | TC-008 | To be implemented |
| FR-AI-04 | 5.20 | TC-009 | To be implemented |
| FR-RPT-01 | 5.32 | TC-010 | To be implemented |

*(Complete RTM with all ~100 FR IDs to be populated in the project's final submission spreadsheet.)*

---

---

**End of Software Requirements Specification**

**Document:** Student Digital Twin System (SDTS) SRS v1.0  
**Total Chapters:** 24  
**Classification:** University Project — Confidential  
**Review Status:** Draft — pending supervisor review
