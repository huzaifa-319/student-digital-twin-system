# SRS — Part 4: Non-Functional Requirements, Security, Privacy/Ethics, System Architecture

*Chapters 12–15*

---

# Chapter 12 — Non-Functional Requirements

---

## 12.1 Performance Requirements

| ID | Requirement |
|---|---|
| NFR-PERF-01 | Dashboard pages shall load primary data within **3 seconds** on a standard broadband connection (10 Mbps+). |
| NFR-PERF-02 | API endpoints shall return responses within **1 second** for queries on a dataset of up to 10,000 students. |
| NFR-PERF-03 | The student list search with filters shall return results within **2 seconds**. |
| NFR-PERF-04 | Attendance marking for a class of 50 students shall complete (API round-trip) within **3 seconds**. |
| NFR-PERF-05 | AI prediction generation for one student shall complete within **5 seconds** of trigger. |
| NFR-PERF-06 | AI batch prediction refresh for all active students shall complete within **1 hour**. |
| NFR-PERF-07 | Report generation (PDF) for a single student shall complete within **10 seconds**. |

---

## 12.2 Scalability Requirements

| ID | Requirement |
|---|---|
| NFR-SCALE-01 | The system shall support at least **5,000 active students** without degradation in performance. |
| NFR-SCALE-02 | The system shall support at least **200 concurrent authenticated users** without performance degradation. |
| NFR-SCALE-03 | The database shall support at least **10 years of academic history** without requiring schema changes. |
| NFR-SCALE-04 | The architecture shall allow horizontal scaling of the web API layer (multiple server instances behind a load balancer). |

---

## 12.3 Availability Requirements

| ID | Requirement |
|---|---|
| NFR-AVAIL-01 | The system shall achieve **99.5% uptime** during the academic semester (excluding scheduled maintenance). |
| NFR-AVAIL-02 | Scheduled maintenance windows shall be performed outside peak hours (weeknights 11 PM – 5 AM or weekends). |
| NFR-AVAIL-03 | Planned downtime shall be communicated to users at least **24 hours** in advance. |
| NFR-AVAIL-04 | Unplanned downtime shall be recovered within **4 hours** (RTO). |

---

## 12.4 Reliability Requirements

| ID | Requirement |
|---|---|
| NFR-REL-01 | Data submitted via forms shall not be lost due to server failure — the system shall use database transactions so writes are atomic. |
| NFR-REL-02 | If the AI/ML service is unavailable, the main web application shall continue to function using the last cached predictions. |
| NFR-REL-03 | Failed email notifications shall be retried up to 3 times with exponential backoff before being marked as failed and logged. |

---

## 12.5 Usability Requirements

| ID | Requirement |
|---|---|
| NFR-USE-01 | A new user with basic digital literacy shall be able to complete their primary task (e.g., student viewing dashboard, teacher marking attendance) within **5 minutes** of first use, without training. |
| NFR-USE-02 | All user interface text shall be in clear, plain English. Technical jargon shall be explained with tooltips. |
| NFR-USE-03 | All forms shall clearly indicate required vs. optional fields. |
| NFR-USE-04 | Error messages shall be actionable: they shall tell the user what to do, not just what went wrong. |
| NFR-USE-05 | The system shall not display raw database IDs, error stack traces, or internal codes to end users. |

---

## 12.6 Accessibility Requirements

| ID | Requirement |
|---|---|
| NFR-ACC-01 | The system shall conform to **WCAG 2.1 Level AA** guidelines for web accessibility. |
| NFR-ACC-02 | All images and icons shall have descriptive `alt` text. |
| NFR-ACC-03 | All interactive elements shall be keyboard-navigable (Tab / Shift+Tab / Enter / Space). |
| NFR-ACC-04 | The system shall maintain a minimum contrast ratio of **4.5:1** for normal text. |
| NFR-ACC-05 | Charts shall include accessible text alternatives (data table or ARIA description). |

---

## 12.7 Maintainability Requirements

| ID | Requirement |
|---|---|
| NFR-MAINT-01 | The codebase shall follow consistent naming conventions, coding style, and project structure throughout. |
| NFR-MAINT-02 | All public API endpoints shall be documented (OpenAPI / Swagger). |
| NFR-MAINT-03 | Environment-specific configuration (database URL, API keys) shall be stored in environment variables, not hardcoded. |
| NFR-MAINT-04 | Database schema changes shall be managed via numbered migration files so the schema can be reproduced from scratch. |
| NFR-MAINT-05 | The AI/ML service shall version its trained models so a previous model can be restored in under 30 minutes. |

---

## 12.8 Security Requirements

*(Detailed in Chapter 13.)*

| ID | High-level requirement |
|---|---|
| NFR-SEC-01 | All data transmission between client and server shall use HTTPS/TLS 1.2+. |
| NFR-SEC-02 | Passwords shall be stored as bcrypt hashes with cost factor ≥ 12. |
| NFR-SEC-03 | JWT tokens shall be signed with a secret of at least 256 bits. |
| NFR-SEC-04 | The system shall be protected against OWASP Top 10 vulnerabilities. |

---

## 12.9 Privacy Requirements

*(Detailed in Chapter 14.)*

| ID | High-level requirement |
|---|---|
| NFR-PRIV-01 | Student personal data shall not be accessible to users who do not have a legitimate educational interest. |
| NFR-PRIV-02 | AI models shall be trained on de-identified data. |
| NFR-PRIV-03 | Students shall be informed of what data is collected and how it is used (privacy notice on registration). |

---

## 12.10 Portability Requirements

| ID | Requirement |
|---|---|
| NFR-PORT-01 | The application shall run on any Linux-based server (Ubuntu 20.04+, Debian 11+) or Windows Server 2019+. |
| NFR-PORT-02 | The system shall be deployable as Docker containers. |
| NFR-PORT-03 | The database shall be PostgreSQL; the application shall not use PostgreSQL-specific features that would prevent migration to another RDBMS (except where performance requires it, with documentation). |

---

## 12.11 Compatibility Requirements

| ID | Requirement |
|---|---|
| NFR-COMPAT-01 | The frontend shall function correctly in Chrome 90+, Firefox 88+, Edge 90+, and Safari 14+. |
| NFR-COMPAT-02 | The frontend shall be usable on tablet-size viewports (768px width minimum). |
| NFR-COMPAT-03 | API responses shall conform to JSON (RFC 8259). |

---

## 12.12 Interoperability Requirements

| ID | Requirement |
|---|---|
| NFR-INTER-01 | The system shall accept bulk student data import via CSV with a documented column schema. |
| NFR-INTER-02 | All exported reports shall use standard file formats: PDF and CSV/Excel. |
| NFR-INTER-03 | The API shall accept and return ISO 8601 date/time strings (UTC). |

---

## 12.13 Recoverability Requirements

| ID | Requirement |
|---|---|
| NFR-REC-01 | The system shall be recoverable to within 1 hour of the last failure point (RPO = 1 hour). |
| NFR-REC-02 | The system shall be fully operational within 4 hours of a catastrophic failure (RTO = 4 hours). |
| NFR-REC-03 | A disaster recovery runbook shall be maintained and tested annually. |

---

---

# Chapter 13 — Security Requirements

---

## 13.1 Authentication

| ID | Requirement |
|---|---|
| SR-AUTH-01 | Every request to a protected endpoint shall present a valid JWT in the `Authorization: Bearer <token>` header. |
| SR-AUTH-02 | JWT tokens shall contain: user ID (sub), role, issued-at (iat), and expiry (exp). |
| SR-AUTH-03 | JWT expiry shall be configurable; default access token = 8 hours, refresh token = 7 days. |
| SR-AUTH-04 | The JWT signing secret shall be stored in an environment variable (never in source code). |
| SR-AUTH-05 | The system shall support JWT token revocation via a refresh-token blacklist stored in the database. |

---

## 13.2 Authorization

| ID | Requirement |
|---|---|
| SR-AUTHZ-01 | Every API route shall explicitly declare the roles permitted to access it. |
| SR-AUTHZ-02 | The authorization check shall occur server-side on every request — not only in the frontend. |
| SR-AUTHZ-03 | A user who attempts to access a resource belonging to another user shall receive HTTP 403 (not 404, to prevent resource enumeration). |

---

## 13.3 Role-Based Access Control

| ID | Requirement |
|---|---|
| SR-RBAC-01 | The system shall implement RBAC with the six defined roles. |
| SR-RBAC-02 | Roles shall be non-hierarchical; each role is explicitly granted specific permissions. |
| SR-RBAC-03 | Role assignments shall be audited (logged in the audit trail). |
| SR-RBAC-04 | No user shall have more than one role simultaneously. |

---

## 13.4 Password Security

| ID | Requirement |
|---|---|
| SR-PWD-01 | Minimum password length: 8 characters. Must include at least one uppercase letter, one lowercase letter, and one digit. |
| SR-PWD-02 | Passwords shall be hashed using bcrypt with a cost factor of 12. |
| SR-PWD-03 | The system shall never log, store, transmit, or return a plain-text password. |
| SR-PWD-04 | Password reset tokens shall be cryptographically random, at least 256 bits, and expire after 1 hour. |
| SR-PWD-05 | Temporary passwords issued on account creation shall be force-reset on first login. |

---

## 13.5 Data Encryption

| ID | Requirement |
|---|---|
| SR-ENC-01 | All data in transit shall be encrypted using TLS 1.2 or higher. |
| SR-ENC-02 | Sensitive fields (student ID number, date of birth, contact details) shall be encrypted at rest using AES-256 in the database. |
| SR-ENC-03 | Database backups shall be encrypted before storage. |
| SR-ENC-04 | Encryption keys shall be stored in a secrets management system (e.g., environment variables or HashiCorp Vault), not in the application code. |

---

## 13.6 Secure API Communication

| ID | Requirement |
|---|---|
| SR-API-01 | CORS shall be configured to allow requests only from the known frontend origin. |
| SR-API-02 | Security HTTP headers shall be set on all responses: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Strict-Transport-Security`. |
| SR-API-03 | The API shall not expose stack traces, database error messages, or internal server paths in error responses. |
| SR-API-04 | All request bodies shall be validated with a schema (Zod) before processing. |
| SR-API-05 | Input containing special characters shall be sanitized to prevent XSS and injection attacks. |

---

## 13.7 Session Management

| ID | Requirement |
|---|---|
| SR-SESS-01 | Access tokens shall expire after 8 hours of inactivity. |
| SR-SESS-02 | On logout, the client shall clear the access token and refresh token. |
| SR-SESS-03 | The server shall maintain a refresh token blacklist so revoked tokens cannot be used to obtain new access tokens. |
| SR-SESS-04 | Concurrent login from multiple devices shall be permitted by default; System Admin can revoke all sessions for a user. |

---

## 13.8 Data Privacy

| ID | Requirement |
|---|---|
| SR-PRIV-01 | API responses shall include only the fields needed for the requesting user's role — no excess data shall be returned. |
| SR-PRIV-02 | Student PII shall never appear in server-side application logs. |
| SR-PRIV-03 | The `select` clause in all Prisma queries shall explicitly list returned fields. |

---

## 13.9 Access Logging

| ID | Requirement |
|---|---|
| SR-LOG-01 | The system shall log every login attempt (successful and failed) with: timestamp, user ID or email attempted, IP address, user agent. |
| SR-LOG-02 | All authentication failures shall be available for review in the audit log. |
| SR-LOG-03 | Access to sensitive student data (profile, twin, grades) shall be logged: who accessed which student's record, when. |

---

## 13.10 Audit Trails

| ID | Requirement |
|---|---|
| SR-AUD-01 | All CREATE, UPDATE, and DELETE operations on core entities (Student, Grade, Enrollment, User, Role) shall be written to the `audit_logs` table. |
| SR-AUD-02 | Each audit log entry shall include: user ID, action, entity type, entity ID, old value (JSON), new value (JSON), IP address, timestamp. |
| SR-AUD-03 | Audit logs shall be immutable: no API endpoint or user action can modify or delete them. |
| SR-AUD-04 | Audit logs shall be viewable only by the System Administrator. |

---

## 13.11 Backup Security

| ID | Requirement |
|---|---|
| SR-BACK-01 | Database backups shall be encrypted with AES-256 before transmission to off-site storage. |
| SR-BACK-02 | Backup files shall be stored in an access-controlled location, separate from the production server. |
| SR-BACK-03 | Backup restoration shall be tested quarterly. |

---

## 13.12 Protection Against Common Attacks

| Attack | Mitigation |
|---|---|
| SQL Injection | Prisma ORM parameterized queries; no raw SQL string concatenation |
| XSS | React's default JSX escaping; CSP header; input sanitization |
| CSRF | JWT-based auth (stateless); SameSite cookie attribute if using cookies |
| Brute force | Account lockout after 5 failed attempts; rate limiting on auth endpoints |
| Insecure direct object reference | Every resource request verifies ownership/role before returning data |
| Sensitive data exposure | HTTPS enforced; PII encrypted at rest; minimal fields in API responses |
| JWT attacks | Strong signing secret; token expiry; refresh token blacklist |
| Mass assignment | Zod validation restricts body fields; Prisma select restricts response fields |

---

---

# Chapter 14 — Privacy and Ethical Requirements

---

## 14.1 Student Data Privacy

**PR-01** — All student data collected by the SDTS is for legitimate educational purposes only. Data shall not be used for any purpose other than academic management and student support.

**PR-02** — Student data shall be accessible only to users who have a direct educational relationship with that student, consistent with the principle of minimum necessary access.

**PR-03** — Aggregated, anonymized statistics may be used for institutional reporting. Individual student data shall never appear in management-level or public reports.

---

## 14.2 Consent and Data Collection

**PR-04** — Students shall be presented with a plain-language privacy notice on first login explaining: what data is collected, how it is used, who can see it, and their rights.

**PR-05** — The collection of learning activity data (login frequency, resource access) shall be disclosed in the privacy notice. Students shall be informed that this data is used to compute their engagement score and feed the digital twin.

**PR-06** — The institution shall maintain a formal data processing agreement (DPA) governing the use of SDTS. This is an institutional requirement, not a system requirement.

---

## 14.3 Data Minimization

**PR-07** — The system shall collect only the data that is necessary for the stated academic purposes. Fields marked optional shall genuinely be optional — they shall not degrade system functionality if absent.

**PR-08** — The AI model feature set shall use only academically relevant data (grades, attendance, assignments, engagement). Social data, physical location data, or personally identifying communications shall not be used.

---

## 14.4 Sensitive Academic Data

**PR-09** — Academic records (grades, attendance, performance predictions) are classified as sensitive educational data. They shall be encrypted in transit and at rest.

**PR-10** — No student's academic data shall be shared with external parties without explicit written consent from the student (or institution, where legally required).

---

## 14.5 Data Access Rights

**PR-11** — Students shall have the right to access all data the system holds about them. The student dashboard provides this access.

**PR-12** — Students shall have the right to request correction of inaccurate personal profile data. Grade corrections follow the institution's academic grievance procedure.

**PR-13** — Students shall have the right to request deletion of their personal data upon disenrollment, subject to the institution's legal data retention obligations.

---

## 14.6 Data Retention

**PR-14** — Student academic records shall be retained for 7 years post-graduation in compliance with typical institutional records retention policies.

**PR-15** — AI prediction history, learning activity logs, and recommendation records shall be retained for 2 years then deleted.

**PR-16** — Data deletion shall be documented: a record of when data was deleted and the reason shall be retained (without the original PII).

---

## 14.7 Data Deletion

**PR-17** — Student profile deletion (on request post-graduation) shall use secure deletion: data is overwritten or removed from all tables including backups per the retention schedule.

**PR-18** — The digital twin shall be deleted as part of the student record deletion process.

---

## 14.8 AI Transparency

**PR-19** — Students shall be informed that an AI system is used to generate predictions and recommendations about them.

**PR-20** — Students shall be able to view the explanation for any prediction made about them (see FR-AI-33).

**PR-21** — The system shall display a prominent disclaimer on all AI-generated outputs: "This is an AI-assisted estimate. It does not represent an official academic decision."

---

## 14.9 AI Bias and Fairness

**PR-22** — The AI model training pipeline shall include a bias evaluation step: model performance shall be evaluated across gender, program, and demographic groups (where such data is available) to detect disparate impact.

**PR-23** — If the bias evaluation identifies a significant performance disparity between demographic groups (e.g., higher false-positive at-risk rate for one gender), the model shall not be deployed until the disparity is investigated and addressed.

**PR-24** — The system shall not use gender, ethnicity, religion, or socioeconomic status as direct features in any AI model.

---

## 14.10 Human Oversight of AI Decisions

**PR-25** — AI predictions and recommendations shall be advisory only. No automated action (e.g., course enrollment block, scholarship removal) shall be taken based solely on an AI output without human review.

**PR-26** — At-risk flags generated by the AI shall route to a human advisor, who reviews the flag before any intervention is initiated.

**PR-27** — The System Administrator shall have the ability to override any AI-generated prediction for a specific student with a manual override and a documented reason.

---

---

# Chapter 15 — System Architecture

---

## 15.1 Architectural Overview

The SDTS follows a **three-tier architecture** with an additional **AI/ML microservice**:

| Tier | Technology | Responsibility |
|---|---|---|
| Presentation | React + TypeScript + Tailwind CSS | User interfaces and dashboards |
| Application | Node.js + Express + TypeScript | Business logic, API, auth, notifications |
| Data | PostgreSQL + Prisma ORM | Persistent storage |
| AI/ML Service | Python + Flask + scikit-learn | Predictions and recommendations |

The AI/ML service is a separate process, communicating with the main API via HTTP. It reads from the database directly (read-only user) and posts results back via the API.

---

## 15.2 Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│  CLIENT TIER                                                      │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │  React + TypeScript + Tailwind CSS (Browser)            │     │
│  │  Role-based dashboards │ Charts │ Forms │ Notifications  │     │
│  └─────────────────────────────────────────────────────────┘     │
└──────────────────────────┬───────────────────────────────────────┘
                           │ HTTPS + JSON  (REST API)
┌──────────────────────────▼───────────────────────────────────────┐
│  APPLICATION TIER                                                 │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │  Node.js + Express + TypeScript                         │     │
│  │                                                         │     │
│  │  ┌──────────┐ ┌──────────────┐ ┌────────────────────┐  │     │
│  │  │ JWT Auth │ │ RBAC Midware │ │ Zod Validation     │  │     │
│  │  └──────────┘ └──────────────┘ └────────────────────┘  │     │
│  │                                                         │     │
│  │  ┌──────────────────────────────────────────────────┐  │     │
│  │  │  Controllers / Services                          │  │     │
│  │  │  Auth │ Student │ Grade │ Attendance │ Report ... │  │     │
│  │  └──────────────────────────────────────────────────┘  │     │
│  │                                                         │     │
│  │  ┌─────────────────┐   ┌──────────────────────────┐    │     │
│  │  │  Notification   │   │  Digital Twin Sync       │    │     │
│  │  │  Service        │   │  (event-driven updates)  │    │     │
│  │  └─────────────────┘   └──────────────────────────┘    │     │
│  └─────────────────────────────────────────────────────────┘     │
└───────────────┬──────────────────────────┬───────────────────────┘
                │ Prisma ORM               │ Internal HTTP
┌───────────────▼──────────────┐  ┌────────▼──────────────────────┐
│  DATA TIER                   │  │  AI/ML SERVICE TIER            │
│                              │  │                                │
│  PostgreSQL 15+              │  │  Python + Flask                │
│                              │  │                                │
│  Tables:                     │  │  Modules:                      │
│  users, students,            │◄─┤  - GPA predictor               │
│  grades, attendance,         │  │  - At-risk classifier          │
│  digital_twins,              │  │  - Recommendation engine       │
│  predictions,                │  │  - Skill gap analyzer          │
│  recommendations,            │  │  - Career matcher              │
│  audit_logs, ...             │  │  - Model training pipeline     │
└──────────────────────────────┘  └────────────────────────────────┘
```

---

## 15.3 Frontend Architecture

```
frontend/src/
├── components/     ← Reusable UI components (Sidebar, Header, Charts, Cards)
├── pages/          ← Route-level page components (Dashboard, Students, Grades...)
├── store/          ← Zustand global state (auth, user)
├── services/       ← Axios API client with interceptors
├── hooks/          ← Reusable data-fetching hooks
├── types/          ← TypeScript interfaces (Student, Grade, Prediction...)
├── utils/          ← Helper functions (date formatting, grade formatting)
├── App.tsx         ← Route definitions + ProtectedRoute/RoleRoute guards
└── main.tsx        ← Entry point
```

Technology stack: React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Axios, Zustand, React Hook Form, Zod, Recharts (for data visualizations), React Hot Toast.

---

## 15.4 Backend Architecture

```
backend/src/
├── config/         ← env.ts (validated env vars), prisma.ts (singleton client)
├── controllers/    ← Business logic: auth, student, grade, attendance, twin...
├── middleware/     ← authenticate, authorize, errorHandler, notFound
├── routes/         ← Route files — map URLs to controllers
├── services/       ← Complex business services (twinSyncService, notificationService)
├── validators/     ← Zod schemas for all request bodies
├── utils/          ← AppError, pagination helpers, date utils
├── types/          ← AuthRequest (extends Express Request), shared types
├── app.ts          ← Express app: middleware + route mounting
└── server.ts       ← HTTP server start
```

---

## 15.5 Database Architecture

- PostgreSQL as the single source of truth.
- Prisma ORM manages schema migrations and type-safe queries.
- Connection pooling via `pg` or PgBouncer in production.
- Separate read-only database user for the AI/ML service.
- All application credentials stored in environment variables.

---

## 15.6 AI/ML Architecture

```
ai_service/
├── models/             ← Saved trained model files (.pkl)
├── training/           ← Training scripts, feature engineering, evaluation
│   ├── train_gpa.py
│   ├── train_risk.py
│   └── evaluate_models.py
├── inference/          ← Prediction and recommendation logic
│   ├── gpa_predictor.py
│   ├── risk_classifier.py
│   └── recommender.py
├── data/               ← Data loading and preprocessing from PostgreSQL
│   └── data_loader.py
├── app.py              ← Flask API server
└── config.py           ← AI service configuration
```

The AI service exposes:
- `POST /predict/student/:id` — generates predictions for one student
- `POST /predict/batch` — generates predictions for all active students
- `POST /retrain` — triggers model retraining (secured endpoint)
- `GET /model/status` — model version, accuracy metrics, last training date

---

## 15.7 Digital Twin Architecture

The digital twin is not a separate service — it is a computed aggregation pattern within the main API:

1. **Event trigger** — a grade, attendance, or assignment record is written to the database.
2. **Twin sync service** — an asynchronous job reads all data for the affected student.
3. **Cached values updated** — the `digital_twins` table's cached fields (CGPA, engagement score, etc.) are recomputed and written.
4. **AI refresh queued** — the student is added to the AI refresh queue.
5. **AI service processes the queue** — predictions and recommendations are updated and written back.

---

## 15.8 API Layer

- Express router structure: one file per resource (`auth.routes.ts`, `student.routes.ts`, etc.)
- Middleware chain per request: CORS → Helmet → Morgan → JSON parser → JWT auth → Role auth → Zod validation → Controller
- Error propagation: all `try/catch` blocks call `next(err)` → `errorMiddleware` handles all errors centrally

---

## 15.9 Authentication Layer

```
Request arrives
       ↓
JWT Middleware: extract token from Authorization header
       ↓
jwt.verify(token, JWT_SECRET) → decode { sub, role, exp }
       ↓
If invalid/expired → 401 Unauthorized
       ↓
If valid → req.user = { id, role }
       ↓
Role Middleware: roles.includes(req.user.role)?
       ↓
No → 403 Forbidden
Yes → next() → Controller
```

---

## 15.10 Data Processing Layer

Event-driven twin updates:
1. Grade saved → `twinSyncService.updateAcademicTwin(studentId)`
2. Attendance saved → `twinSyncService.updateBehaviorTwin(studentId)`
3. Assignment mark saved → `twinSyncService.updateBehaviorTwin(studentId)`
4. Career goal set → `twinSyncService.updateCareerTwin(studentId)`
5. Any twin update → `aiQueue.enqueue(studentId)` for async prediction refresh

---

## 15.11 Analytics Layer

The analytics layer is implemented as a combination of:
- **Database queries** — Prisma aggregations for computed metrics (GPA, attendance rate, etc.)
- **AI service inference** — ML predictions and recommendations
- **Cached twin values** — Pre-computed values stored in `digital_twins` table for fast dashboard loading

---

## 15.12 Deployment Architecture

**Development:**
- Backend: `ts-node-dev` on port 5000
- Frontend: Vite dev server on port 5173
- Database: PostgreSQL local instance
- AI service: Flask dev server on port 5001

**Production:**
```
                    [DNS / Domain]
                          │
              ┌───────────▼──────────────┐
              │     Nginx (reverse proxy) │
              │     SSL termination       │
              └──┬──────────┬────────────┘
                 │          │
       ┌─────────▼──┐  ┌────▼──────────┐
       │ React SPA  │  │ Node.js API   │
       │ (static)   │  │ (PM2 cluster) │
       └────────────┘  └────┬──────────┘
                            │
                   ┌────────▼────────┐
                   │  PostgreSQL     │
                   │  (separate VM)  │
                   └────────────────┘
                            │
                   ┌────────▼────────┐
                   │  Python AI Svc  │
                   │  (internal only)│
                   └────────────────┘
```

---

*Continued in [SRS-Part5-Models-to-Appendices.md](SRS-Part5-Models-to-Appendices.md)*
