# SRS — Part 3: External Interfaces, Data Requirements, Database Requirements

*Chapters 9–11*

---

# Chapter 9 — External Interface Requirements

---

## 9.1 User Interface Requirements

**FR-UI-01** — The system shall provide a responsive web interface that operates correctly at viewport widths of 768px (tablet) and 1280px+ (desktop).

**FR-UI-02** — The UI shall use a consistent design language: shared navigation, typography, color palette, and spacing throughout all pages.

**FR-UI-03** — All pages shall load their primary content within 3 seconds on a standard broadband connection.

**FR-UI-04** — All interactive elements (buttons, links, dropdowns) shall have visible hover and focus states for accessibility.

**FR-UI-05** — All form fields shall display inline validation errors immediately after the user leaves the field.

**FR-UI-06** — All destructive actions (delete, deactivate) shall require a confirmation dialog before proceeding.

**FR-UI-07** — The system shall display a loading indicator whenever a data fetch takes more than 500ms.

**FR-UI-08** — Error states (API failures, empty data) shall be communicated with human-readable messages, not raw error codes.

---

## 9.2 Student Dashboard Interface

The student dashboard shall display the following regions:

| Region | Content |
|---|---|
| Header summary bar | Student name, photo, program, semester, CGPA, at-risk score badge |
| Digital Twin panel | Interactive radar chart (skills), GPA line chart, engagement score bar |
| Predictions panel | Predicted GPA for current semester with confidence score |
| Recommendations panel | Top 5 personalized recommendations with rationale |
| Attendance summary | Per-course attendance percentages with traffic-light colour coding (red < 75%, yellow 75–85%, green > 85%) |
| Upcoming deadlines | Next 3 assignment/exam deadlines with countdown |
| Notifications | In-app notification feed |

---

## 9.3 Teacher Dashboard Interface

| Region | Content |
|---|---|
| My Courses | Cards for each assigned course with quick-action buttons (Mark Attendance, Enter Grades) |
| Class Performance | Grade distribution chart per course |
| At-Risk Alert | List of at-risk students in my courses (name, risk score, alert reason) |
| Recent Activity | Last 5 attendance/grade entries I made |
| Upcoming Deadlines | Assignments due in the next 7 days |

---

## 9.4 Administrator Interface

| Region | Content |
|---|---|
| Summary metrics | Total students, total teachers, average CGPA, total at-risk count |
| Department selector | Filter all data by department |
| Student search | Full-text search with filter panel |
| User management | CRUD for user accounts |
| System settings | Grading scale, attendance threshold, semester configuration |
| Audit log viewer | Paginated, filterable audit log |
| Import/Export | CSV import for students; Excel/CSV export for any data set |
| AI model panel | Model evaluation metrics, last training date, retrain button |

---

## 9.5 Advisor Interface

| Region | Content |
|---|---|
| At-risk watchlist | Students sorted by risk score descending |
| My students | Full list of assigned students with GPA, attendance, and risk badge |
| Student search | Advisor can filter by risk level, GPA range, semester |
| Advising notes | Add/view notes on any student's profile |
| Quick reports | One-click "Student Progress Report" for any selected student |

---

## 9.6 API Interfaces

The backend exposes a REST API. All endpoints accept and return JSON.

**Base URL:** `http(s)://[server]/api`

**Authentication:** All endpoints except `/auth/login` and `/auth/reset-password` require: `Authorization: Bearer <JWT>`

**Common response format:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Error response format:**
```json
{
  "success": false,
  "message": "Human-readable error description",
  "errors": [ { "field": "email", "message": "Invalid email format" } ]
}
```

**Key API endpoints:**

| Method | Endpoint | Description | Roles |
|---|---|---|---|
| POST | /auth/login | User login | Public |
| POST | /auth/logout | Invalidate session | All |
| GET | /auth/me | Get current user | All |
| GET | /students | List students | Admin, Advisor |
| POST | /students | Create student | Admin |
| GET | /students/:id | Get student profile | Admin, Advisor, own Student |
| PATCH | /students/:id | Update profile | Admin, own Student (limited) |
| GET | /students/:id/twin | Get digital twin | Admin, Advisor, own Student, Teacher (own courses) |
| GET | /students/:id/predictions | Get AI predictions | Admin, Advisor, own Student |
| GET | /students/:id/recommendations | Get recommendations | Admin, Advisor, own Student |
| GET | /attendance | List attendance records | Teacher (own courses), Admin |
| POST | /attendance | Mark attendance | Teacher (own courses), Admin |
| GET | /grades | List grade records | Teacher (own courses), Admin |
| POST | /grades | Enter grades | Teacher (own courses), Admin |
| GET | /courses | List courses | All |
| POST | /courses | Create course | Admin |
| GET | /reports/:type | Generate report | Role-dependent |
| GET | /dashboard/stats | Dashboard statistics | All (filtered by role) |
| GET | /audit-logs | View audit logs | Sys. Admin only |

---

## 9.7 Database Interface

- The backend communicates with PostgreSQL exclusively through Prisma ORM.
- The AI/ML Python service connects via a read-only database user using psycopg2.
- No raw SQL string concatenation is permitted; all queries use parameterized statements.
- The database connection pool shall be configured with a maximum of 20 connections per server instance.

---

## 9.8 LMS Integration Interface (Optional)

If the institution operates an LMS (e.g., Moodle, Canvas, Blackboard), the system may optionally integrate via the LMS's REST API:

| Data imported from LMS | Trigger |
|---|---|
| Assignment submission timestamps | Periodic sync (every 6 hours) |
| Resource access logs | Periodic sync (every 6 hours) |
| Forum participation count | Periodic sync (daily) |

LMS integration is optional and controlled by a feature flag in system settings. If disabled, learning activity data relies only on data entered directly in SDTS.

---

## 9.9 Authentication Interface

- Authentication is handled via JWT.
- Token is stored in the browser's `localStorage` (or optionally `httpOnly` cookie in production).
- The API's auth middleware validates the token signature and expiry on every request.
- Token refresh: A refresh endpoint (`POST /auth/refresh`) issues a new access token given a valid refresh token. Refresh tokens have a 7-day expiry.

---

## 9.10 Notification Interface

| Channel | Provider | Trigger |
|---|---|---|
| In-app notification | Internal (database + WebSocket or polling) | Any alert condition |
| Email | SMTP / SendGrid API | Configurable per alert type |

Email notification request format (internal):
```json
{
  "to": "student@university.edu",
  "template": "low_attendance_warning",
  "variables": {
    "student_name": "Ali Hassan",
    "course": "Database Systems",
    "attendance_pct": "68%"
  }
}
```

---

## 9.11 Third-Party Services

| Service | Purpose | Required |
|---|---|---|
| SMTP provider (e.g., SendGrid, Mailgun) | Email notifications and password reset | Yes |
| Cloud storage (e.g., AWS S3 or local) | Student profile photo storage | Optional |
| LMS API | Learning activity data sync | Optional |
| Career API (e.g., LinkedIn, O*NET) | Live career path data | Future enhancement |

---

---

# Chapter 10 — Data Requirements

---

## 10.1 Data Overview

The SDTS manages the following major data categories:

| Data Category | Volume estimate | Sensitivity |
|---|---|---|
| Student profiles | 1 record per student | High (PII) |
| Academic records | ~6 records/student/semester (one per course) | High |
| Attendance records | ~90 records/student/course/semester | Medium |
| Assessment records | ~10–20 per student per course per semester | Medium |
| Digital twin snapshots | 1 per student, updated continuously | High |
| Prediction records | 1 per student per refresh cycle | Low |
| Recommendation records | ~5–10 per student per cycle | Low |
| Audit logs | ~50–100 entries/day/user | Medium |

---

## 10.2 Student Data

| Field | Type | Required | Constraints |
|---|---|---|---|
| student_id | String | Yes | Unique, immutable |
| first_name | String | Yes | 1–100 characters |
| last_name | String | Yes | 1–100 characters |
| date_of_birth | Date | No | Must be in the past |
| gender | Enum | No | Male / Female / Other / Prefer not to say |
| email | String | Yes | Valid email format; unique |
| phone | String | No | Valid phone format |
| address | String | No | Max 500 characters |
| program_id | FK | Yes | Must reference a valid program |
| enrollment_date | Date | Yes | Must be in the past or today |
| status | Enum | Yes | Active / Inactive / Graduated / Suspended |
| career_goal_id | FK | No | References Career table |
| photo_url | String | No | URL to stored image |

---

## 10.3 Academic Data

| Field | Type | Notes |
|---|---|---|
| enrollment_id | PK | |
| student_id | FK | → Student |
| course_id | FK | → Course |
| semester_id | FK | → Semester |
| grade_letter | Enum | A, A-, B+, B, B-, C+, C, C-, D, F |
| grade_points | Decimal(4,2) | Computed from grade_letter |
| credit_hours | Int | Copied from course |
| is_passing | Boolean | grade_points > 0 |
| finalized | Boolean | Once true, changes require admin approval |

---

## 10.4 Attendance Data

| Field | Type | Notes |
|---|---|---|
| attendance_id | PK | |
| student_id | FK | |
| course_id | FK | |
| date | Date | |
| status | Enum | Present / Absent / Late / Excused |
| marked_by | FK → User | Teacher who marked |
| notes | String | Optional teacher note |
| Unique constraint | (student_id, course_id, date) | Prevents duplicates |

---

## 10.5 Assessment Data

**Assignments:**

| Field | Type | Notes |
|---|---|---|
| assignment_id | PK | |
| course_id | FK | |
| title | String | |
| max_marks | Decimal | |
| due_date | DateTime | |
| weight_pct | Decimal | % contribution to final grade |

**Assignment Submissions:**

| Field | Type | Notes |
|---|---|---|
| submission_id | PK | |
| assignment_id | FK | |
| student_id | FK | |
| obtained_marks | Decimal | Nullable until marked |
| submission_status | Enum | On_time / Late / Not_submitted |
| submitted_at | DateTime | Nullable |

**Quizzes / Exams:** Same structure as assignments with type field (Quiz / Midterm / Final).

---

## 10.6 Course Data

| Field | Type | Notes |
|---|---|---|
| course_id | PK | |
| course_code | String | Unique, e.g. CS-301 |
| course_name | String | |
| credit_hours | Int | 1–4 |
| department_id | FK | |
| description | Text | |
| is_active | Boolean | |
| prerequisites | M:M to Course | Self-referential join |

---

## 10.7 Skills Data

| Field | Type | Notes |
|---|---|---|
| skill_id | PK | |
| name | String | E.g. "Python Programming" |
| domain | String | E.g. "Programming", "Mathematics" |
| description | Text | |

**Student Skill Competency:**

| Field | Type | Notes |
|---|---|---|
| student_id | FK | |
| skill_id | FK | |
| level | Enum | Not_assessed / Beginner / Developing / Proficient / Advanced |
| last_updated | DateTime | |
| Unique constraint | (student_id, skill_id) | |

---

## 10.8 Career Data

| Field | Type | Notes |
|---|---|---|
| career_id | PK | |
| title | String | E.g. "Data Scientist" |
| description | Text | |
| required_skills | M:M to Skill | With minimum_level for each |
| recommended_courses | M:M to Course | |
| min_cgpa | Decimal | Minimum CGPA recommended |

---

## 10.9 Learning Activity Data

| Field | Type | Notes |
|---|---|---|
| activity_id | PK | |
| student_id | FK | |
| activity_type | Enum | Login / Assignment_view / Resource_access / Quiz_attempt |
| course_id | FK | Nullable |
| timestamp | DateTime | |
| metadata | JSON | Optional additional context |

---

## 10.10 Digital Twin Data

The digital twin is not stored as a single large blob. It is assembled from the five component tables above, computed on query. However, certain derived values are cached:

| Field | Type | Notes |
|---|---|---|
| twin_id | PK | 1:1 with Student |
| student_id | FK | Unique |
| engagement_score | Decimal | Cached, recomputed on activity |
| current_cgpa | Decimal | Cached, recomputed on grade finalization |
| academic_standing | Enum | Cached |
| career_readiness_score | Decimal | Cached |
| last_synced | DateTime | |

---

## 10.11 AI/Prediction Data

| Field | Type | Notes |
|---|---|---|
| prediction_id | PK | |
| student_id | FK | |
| predicted_gpa | Decimal | |
| confidence_score | Decimal | 0–100 |
| at_risk_score | Decimal | 0–100 |
| risk_class | Enum | Low / Medium / High |
| explanation | Text | Natural-language explanation |
| generated_at | DateTime | |
| model_version | String | |

---

## 10.12 Recommendation Data

| Field | Type | Notes |
|---|---|---|
| recommendation_id | PK | |
| student_id | FK | |
| type | Enum | Course / Skill / Career / Resource |
| title | String | |
| rationale | Text | |
| priority | Int | 1 = highest |
| status | Enum | New / Viewed / Actioned / Dismissed |
| generated_at | DateTime | |
| feedback | Enum | Null / Helpful / Not_relevant |

---

## 10.13 Historical Data

- All academic records are permanent (never deleted, only soft-archived).
- All prediction records are retained per retention policy.
- All audit log entries are immutable and retained for 3 years minimum.

---

## 10.14 Data Retention Requirements

| Data Category | Retention Period | Post-retention action |
|---|---|---|
| Active student data | Indefinite while enrolled | Archive on graduation/inactive |
| Archived student data | 7 years post-graduation | Secure deletion |
| Audit logs | 3 years minimum | Secure deletion |
| AI prediction history | 2 years | Deletion |
| Notification logs | 1 year | Deletion |
| Learning activity logs | 2 years | Deletion |

---

---

# Chapter 11 — Database Requirements

---

## 11.1 Database Overview

- **DBMS:** PostgreSQL 15+
- **ORM:** Prisma (for the Node.js backend)
- **Schema approach:** Code-first with migration files
- **Encoding:** UTF-8
- **Timezone:** UTC (all timestamps stored in UTC; converted for display in the frontend)

---

## 11.2 Entity Identification

Core entities:

| Entity | Description |
|---|---|
| User | Login account for every system user |
| Student | Student profile and academic identity |
| Teacher | Teacher profile |
| AcademicAdvisor | Advisor profile (with list of assigned students) |
| Department | Academic department |
| Program | Degree program (e.g., BSCS) |
| Semester | Academic semester |
| Course | Course catalogue entry |
| CourseOffering | A specific course in a specific semester |
| Enrollment | Student enrolled in a CourseOffering |
| Attendance | Attendance record per student per day per course |
| Assignment | Assignment definition |
| AssignmentSubmission | Student's submission/mark for an assignment |
| Quiz | Quiz or exam definition |
| QuizResult | Student's mark for a quiz/exam |
| Grade | Final letter grade for an enrollment |
| Skill | Skill catalogue entry |
| StudentSkill | Student's competency level per skill |
| CareerPath | Career path definition |
| CareerPathSkill | Skills required per career path |
| StudentCareerGoal | Student's declared goal |
| DigitalTwin | Cached twin aggregate per student |
| Prediction | AI prediction record per student |
| Recommendation | AI recommendation per student |
| LearningActivity | Student activity log |
| AuditLog | System-wide audit trail |
| Notification | Notification record per user |

---

## 11.3 Entity Relationships

```
User ──────────── Student          (1:1 optional)
User ──────────── Teacher          (1:1 optional)
User ──────────── AcademicAdvisor  (1:1 optional)

Department ─────── Program[]       (1:many)
Department ─────── Course[]        (1:many)
Program ────────── Student[]       (1:many)

Student ────────── DigitalTwin     (1:1)
Student ────────── Enrollment[]    (1:many)
Student ────────── Attendance[]    (1:many)
Student ────────── AssignmentSub[] (1:many)
Student ────────── QuizResult[]    (1:many)
Student ────────── StudentSkill[]  (1:many)
Student ────────── Prediction[]    (1:many)
Student ────────── Recommendation[](1:many)
Student ────────── LearningActivity[](1:many)

AcademicAdvisor ── Student[]       (1:many — advisor is assigned students)

Course ─────────── CourseOffering[](1:many)
Course ─────────── Skill[]         (many:many via CourseSkill)
Course ─────────── Course[]        (self many:many via Prerequisite)

Semester ───────── CourseOffering[](1:many)

CourseOffering ─── Enrollment[]    (1:many)
CourseOffering ─── Assignment[]    (1:many)
CourseOffering ─── Quiz[]          (1:many)
CourseOffering ─── Attendance[]    (1:many)

Enrollment ─────── Grade           (1:1)

Assignment ─────── AssignmentSub[] (1:many)
Quiz ───────────── QuizResult[]    (1:many)

Skill ──────────── CareerPathSkill[](1:many)
CareerPath ─────── CareerPathSkill[](1:many)
CareerPath ─────── StudentCareerGoal(1:many)
```

---

## 11.4 ER Diagram (Textual Summary)

```
[User] 1──1 [Student] 1──1 [DigitalTwin]
                │
         1──* [Enrollment] *──1 [CourseOffering] *──1 [Course]
                │                      │
         1──* [Grade]           1──* [Assignment]
                                       │
                                1──* [AssignmentSubmission] *──1 [Student]

[Student] 1──* [Attendance] *──1 [CourseOffering]
[Student] 1──* [StudentSkill] *──1 [Skill] *──* [CareerPath]
[Student] 1──* [Prediction]
[Student] 1──* [Recommendation]
[Student] 1──* [LearningActivity]
[AcademicAdvisor] *──* [Student]
```

---

## 11.5 Relational Schema (Key Tables)

```sql
-- Users
users (
  id           VARCHAR(25) PRIMARY KEY,
  email        VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role         VARCHAR(20) NOT NULL,
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMP DEFAULT NOW(),
  updated_at   TIMESTAMP
)

-- Students
students (
  id              VARCHAR(25) PRIMARY KEY,
  user_id         VARCHAR(25) UNIQUE REFERENCES users(id),
  student_id_no   VARCHAR(20) UNIQUE NOT NULL,
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  date_of_birth   DATE,
  gender          VARCHAR(20),
  email           VARCHAR(255),
  phone           VARCHAR(20),
  address         TEXT,
  program_id      VARCHAR(25) REFERENCES programs(id),
  enrollment_date DATE NOT NULL,
  status          VARCHAR(20) DEFAULT 'Active',
  career_goal_id  VARCHAR(25) REFERENCES career_paths(id),
  advisor_id      VARCHAR(25) REFERENCES academic_advisors(id),
  photo_url       VARCHAR(500),
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP
)

-- Courses
courses (
  id            VARCHAR(25) PRIMARY KEY,
  course_code   VARCHAR(10) UNIQUE NOT NULL,
  course_name   VARCHAR(200) NOT NULL,
  credit_hours  INT NOT NULL,
  department_id VARCHAR(25) REFERENCES departments(id),
  description   TEXT,
  is_active     BOOLEAN DEFAULT TRUE
)

-- Course Offerings (course in a semester)
course_offerings (
  id          VARCHAR(25) PRIMARY KEY,
  course_id   VARCHAR(25) REFERENCES courses(id),
  semester_id VARCHAR(25) REFERENCES semesters(id),
  teacher_id  VARCHAR(25) REFERENCES teachers(id),
  UNIQUE (course_id, semester_id)
)

-- Enrollments
enrollments (
  id                  VARCHAR(25) PRIMARY KEY,
  student_id          VARCHAR(25) REFERENCES students(id),
  course_offering_id  VARCHAR(25) REFERENCES course_offerings(id),
  enrolled_at         TIMESTAMP DEFAULT NOW(),
  UNIQUE (student_id, course_offering_id)
)

-- Grades
grades (
  id             VARCHAR(25) PRIMARY KEY,
  enrollment_id  VARCHAR(25) UNIQUE REFERENCES enrollments(id),
  grade_letter   VARCHAR(2),
  grade_points   DECIMAL(4,2),
  is_passing     BOOLEAN,
  finalized      BOOLEAN DEFAULT FALSE,
  finalized_at   TIMESTAMP,
  created_at     TIMESTAMP DEFAULT NOW(),
  updated_at     TIMESTAMP
)

-- Attendance
attendance (
  id                 VARCHAR(25) PRIMARY KEY,
  student_id         VARCHAR(25) REFERENCES students(id),
  course_offering_id VARCHAR(25) REFERENCES course_offerings(id),
  date               DATE NOT NULL,
  status             VARCHAR(10) NOT NULL,
  marked_by          VARCHAR(25) REFERENCES users(id),
  notes              TEXT,
  UNIQUE (student_id, course_offering_id, date)
)

-- Digital Twin
digital_twins (
  id                     VARCHAR(25) PRIMARY KEY,
  student_id             VARCHAR(25) UNIQUE REFERENCES students(id),
  current_cgpa           DECIMAL(4,2),
  academic_standing      VARCHAR(20),
  engagement_score       DECIMAL(5,2),
  career_readiness_score DECIMAL(5,2),
  last_synced            TIMESTAMP
)

-- Predictions
predictions (
  id               VARCHAR(25) PRIMARY KEY,
  student_id       VARCHAR(25) REFERENCES students(id),
  predicted_gpa    DECIMAL(4,2),
  confidence_score DECIMAL(5,2),
  at_risk_score    DECIMAL(5,2),
  risk_class       VARCHAR(10),
  explanation      TEXT,
  generated_at     TIMESTAMP DEFAULT NOW(),
  model_version    VARCHAR(50)
)

-- Recommendations
recommendations (
  id              VARCHAR(25) PRIMARY KEY,
  student_id      VARCHAR(25) REFERENCES students(id),
  type            VARCHAR(20) NOT NULL,
  title           VARCHAR(300) NOT NULL,
  rationale       TEXT,
  priority        INT DEFAULT 5,
  status          VARCHAR(20) DEFAULT 'New',
  feedback        VARCHAR(20),
  generated_at    TIMESTAMP DEFAULT NOW()
)

-- Audit Logs
audit_logs (
  id          VARCHAR(25) PRIMARY KEY,
  user_id     VARCHAR(25) REFERENCES users(id),
  action      VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50),
  entity_id   VARCHAR(25),
  old_value   JSON,
  new_value   JSON,
  ip_address  VARCHAR(45),
  created_at  TIMESTAMP DEFAULT NOW()
)
```

---

## 11.6 – 11.10 Constraints, Validations, and Rules

### Primary Keys
All tables use VARCHAR(25) CUIDs as primary keys (collision-resistant, URL-safe, generated by the application layer).

### Foreign Keys
All foreign keys enforce referential integrity. Cascading delete is used only where semantically correct (e.g., deleting an enrollment cascades to grade); elsewhere, soft-deletion is used.

### Unique Constraints
- `users.email` — prevents duplicate accounts
- `students.student_id_no` — prevents duplicate student numbers
- `courses.course_code` — prevents duplicate course codes
- `enrollments(student_id, course_offering_id)` — prevents double enrollment
- `attendance(student_id, course_offering_id, date)` — prevents duplicate attendance
- `grades.enrollment_id` — one grade per enrollment

### Check Constraints
- `grades.grade_points BETWEEN 0.0 AND 4.0`
- `attendance.status IN ('Present', 'Absent', 'Late', 'Excused')`
- `enrollments.credit_hours > 0`
- `predictions.confidence_score BETWEEN 0 AND 100`

### Data Validation Rules (application layer, enforced by Zod)
- Student email must be valid RFC 5321 format
- Dates in the past for enrollment_date, date_of_birth
- Grade letter must be in configured grading scale
- Assignment max_marks > 0

---

## 11.11 Database Security

- The application connects via a dedicated `sdts_app` database user with CREATE, READ, UPDATE, DELETE on application tables.
- The AI/ML service connects via a dedicated `sdts_readonly` user with SELECT only.
- Backup operations use a separate `sdts_backup` user with pg_dump privileges.
- The `postgres` superuser account is disabled for remote connections.
- All database connections require SSL/TLS in production.

---

## 11.12 Database Backup and Recovery

| Backup type | Frequency | Retention | Storage |
|---|---|---|---|
| Full backup | Daily (at 2:00 AM UTC) | 30 days | Off-site encrypted storage |
| Incremental WAL archiving | Continuous | 7 days | On-site + off-site |
| Pre-migration snapshot | Before every migration | Indefinite | Off-site |

**Recovery Time Objective (RTO):** 4 hours  
**Recovery Point Objective (RPO):** 1 hour (due to continuous WAL archiving)

---

*Continued in [SRS-Part4-NonFunctional-to-Architecture.md](SRS-Part4-NonFunctional-to-Architecture.md)*
