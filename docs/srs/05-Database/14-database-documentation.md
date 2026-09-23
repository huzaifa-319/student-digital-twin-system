# Database Documentation

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-DBD-014  
**Standard:** IEEE/ISO/IEC 12207:2017 — Software Design Process  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Overview

**DBMS:** PostgreSQL 15  
**ORM:** Prisma 5 (Node.js backend)  
**Read-only access:** psycopg2 (Python AI service)  
**Encoding:** UTF-8  
**Timezone:** UTC (stored), converted to local time in application layer

---

## 2. Entity List

| # | Entity | Description |
|---|---|---|
| 1 | users | All system users (authentication + role) |
| 2 | students | Student profile and academic status |
| 3 | teachers | Teacher profile |
| 4 | advisors | Academic advisor profile |
| 5 | departments | University departments |
| 6 | programs | Degree programs within departments |
| 7 | semesters | Academic semesters (Fall 2026, Spring 2027, …) |
| 8 | courses | Master course catalog |
| 9 | course_offerings | A course offered in a specific semester by a teacher |
| 10 | enrollments | Student enrolled in a course offering |
| 11 | attendance_records | Per-session attendance per student |
| 12 | grades | Final grade per enrollment |
| 13 | gpa_history | Computed semester GPA + CGPA per semester |
| 14 | digital_twins | One twin record per student (aggregated metrics) |
| 15 | skill_profiles | Student skill-domain competency levels |
| 16 | career_profiles | Declared career goal + readiness score |
| 17 | predictions | AI-generated GPA predictions + at-risk scores |
| 18 | recommendations | AI-generated recommendations per student |
| 19 | advising_notes | Advisor notes on a student |
| 20 | notifications | In-app + email notification queue |
| 21 | audit_logs | Immutable activity audit trail |
| 22 | refresh_tokens | JWT refresh token blacklist table |
| 23 | prerequisites | Course prerequisite relationships |
| 24 | learning_activities | Raw engagement events (logins, quiz attempts, etc.) |
| 25 | report_jobs | Async report generation jobs |

---

## 3. Key Table Schemas

### 3.1 users

```sql
CREATE TABLE users (
  id            VARCHAR(30)  PRIMARY KEY,          -- CUID
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,             -- bcrypt, cost 12
  role          VARCHAR(20)  NOT NULL,             -- STUDENT|TEACHER|ADVISOR|DEPT_ADMIN|SYS_ADMIN|MANAGEMENT
  is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  last_login    TIMESTAMPTZ,
  failed_attempts INT        NOT NULL DEFAULT 0,
  locked_until  TIMESTAMPTZ
);
```

### 3.2 students

```sql
CREATE TABLE students (
  id            VARCHAR(30)  PRIMARY KEY,
  user_id       VARCHAR(30)  NOT NULL UNIQUE REFERENCES users(id),
  student_id_no VARCHAR(20)  NOT NULL UNIQUE,     -- admission number
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  gender        VARCHAR(20),
  phone         VARCHAR(20),
  program_id    VARCHAR(30)  REFERENCES programs(id),
  enrollment_year INT,
  status        VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',  -- ACTIVE|PROBATION|SUSPENDED|GRADUATED
  current_cgpa  DECIMAL(4,2),
  advisor_id    VARCHAR(30)  REFERENCES advisors(id),
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
```

### 3.3 course_offerings

```sql
CREATE TABLE course_offerings (
  id            VARCHAR(30)  PRIMARY KEY,
  course_id     VARCHAR(30)  NOT NULL REFERENCES courses(id),
  semester_id   VARCHAR(30)  NOT NULL REFERENCES semesters(id),
  teacher_id    VARCHAR(30)  NOT NULL REFERENCES teachers(id),
  room          VARCHAR(50),
  schedule      VARCHAR(100),
  max_capacity  INT          NOT NULL DEFAULT 30,
  UNIQUE(course_id, semester_id, teacher_id)
);
```

### 3.4 enrollments

```sql
CREATE TABLE enrollments (
  id                VARCHAR(30) PRIMARY KEY,
  student_id        VARCHAR(30) NOT NULL REFERENCES students(id),
  course_offering_id VARCHAR(30) NOT NULL REFERENCES course_offerings(id),
  enrolled_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status            VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',  -- ACTIVE|DROPPED|COMPLETED
  UNIQUE(student_id, course_offering_id)
);
```

### 3.5 attendance_records

```sql
CREATE TABLE attendance_records (
  id                  VARCHAR(30) PRIMARY KEY,
  enrollment_id       VARCHAR(30) NOT NULL REFERENCES enrollments(id),
  session_date        DATE        NOT NULL,
  status              VARCHAR(10) NOT NULL,  -- PRESENT|ABSENT|LATE|EXCUSED
  marked_by           VARCHAR(30) NOT NULL REFERENCES users(id),
  marked_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(enrollment_id, session_date)        -- prevents duplicates per business rule BR-ATT-02
);
```

### 3.6 grades

```sql
CREATE TABLE grades (
  id            VARCHAR(30)  PRIMARY KEY,
  enrollment_id VARCHAR(30)  NOT NULL UNIQUE REFERENCES enrollments(id),
  grade_letter  VARCHAR(2)   NOT NULL,  -- A, A-, B+, B, …, F
  grade_points  DECIMAL(4,2) NOT NULL,  -- 4.00, 3.67, …, 0.00
  finalized     BOOLEAN      NOT NULL DEFAULT FALSE,
  finalized_at  TIMESTAMPTZ,
  finalized_by  VARCHAR(30)  REFERENCES users(id),
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
```

### 3.7 digital_twins

```sql
CREATE TABLE digital_twins (
  id                    VARCHAR(30)  PRIMARY KEY,
  student_id            VARCHAR(30)  NOT NULL UNIQUE REFERENCES students(id),
  -- Academic component
  current_cgpa          DECIMAL(4,2),
  total_credits_earned  INT          NOT NULL DEFAULT 0,
  -- Behavior component
  engagement_score      DECIMAL(5,2),  -- 0-100
  avg_attendance_rate   DECIMAL(5,2),  -- 0-100
  assignment_submission_rate DECIMAL(5,2),
  -- Career component
  career_readiness_score DECIMAL(5,2), -- 0-100
  -- Performance component
  at_risk_score         DECIMAL(5,2),  -- 0-100
  at_risk_level         VARCHAR(10),   -- LOW|MEDIUM|HIGH
  last_refreshed_at     TIMESTAMPTZ,
  updated_at            TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
```

### 3.8 predictions

```sql
CREATE TABLE predictions (
  id             VARCHAR(30)  PRIMARY KEY,
  student_id     VARCHAR(30)  NOT NULL REFERENCES students(id),
  predicted_gpa  DECIMAL(4,2) NOT NULL,
  at_risk_score  DECIMAL(5,2) NOT NULL,
  confidence     DECIMAL(5,2),
  explanation    JSONB,       -- {"factors": [{"name": "attendance", "weight": 0.35}, ...]}
  model_version  VARCHAR(50)  NOT NULL,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
-- Retain only latest N predictions per student; archive older via cron
```

### 3.9 recommendations

```sql
CREATE TABLE recommendations (
  id           VARCHAR(30)  PRIMARY KEY,
  student_id   VARCHAR(30)  NOT NULL REFERENCES students(id),
  type         VARCHAR(30)  NOT NULL,  -- COURSE|STUDY_HABIT|CAREER|SUPPORT
  title        VARCHAR(255) NOT NULL,
  description  TEXT,
  rationale    TEXT,
  priority     INT          NOT NULL DEFAULT 1,  -- 1=highest
  dismissed    BOOLEAN      NOT NULL DEFAULT FALSE,
  dismissed_at TIMESTAMPTZ,
  feedback     VARCHAR(20),                      -- HELPFUL|NOT_HELPFUL
  semester_id  VARCHAR(30)  REFERENCES semesters(id),
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
```

### 3.10 audit_logs

```sql
CREATE TABLE audit_logs (
  id          BIGSERIAL    PRIMARY KEY,   -- auto-increment, never CUID
  user_id     VARCHAR(30)  REFERENCES users(id),
  action      VARCHAR(100) NOT NULL,  -- e.g. GRADE_FINALIZED, STUDENT_CREATED
  entity_type VARCHAR(50),
  entity_id   VARCHAR(30),
  old_value   JSONB,
  new_value   JSONB,
  ip_address  INET,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
  -- No UPDATE, no DELETE on this table — append only
);
```

---

## 4. Key Relationships

```
users 1──────0..1 students
users 1──────0..1 teachers
users 1──────0..1 advisors

programs *──────1 departments
students *──────1 programs
students *──────0..1 advisors

courses *──────1 departments
course_offerings *──────1 courses
course_offerings *──────1 semesters
course_offerings *──────1 teachers

enrollments *──────1 students
enrollments *──────1 course_offerings
attendance_records *──────1 enrollments
grades 1──────1 enrollments

digital_twins 1──────1 students
predictions *──────1 students
recommendations *──────1 students
gpa_history *──────1 students
```

---

## 5. Database Security

| Role | Database User | Permissions |
|---|---|---|
| Application | `sdts_app` | SELECT, INSERT, UPDATE, DELETE on all application tables; no DDL |
| AI Service | `sdts_ai_readonly` | SELECT only on students, enrollments, grades, attendance, digital_twins |
| Migration | `sdts_migrate` | All DDL permissions (used by Prisma migrate only) |
| Backup | `sdts_backup` | SELECT on all tables, pg_dump privileges |

---

## 6. Indexing Strategy

```sql
-- All FK columns indexed automatically by PostgreSQL when referenced
-- Additional performance indexes:

CREATE INDEX idx_attendance_student_date ON attendance_records(enrollment_id, session_date);
CREATE INDEX idx_grades_enrollment ON grades(enrollment_id);
CREATE INDEX idx_predictions_student_created ON predictions(student_id, created_at DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_digital_twins_at_risk ON digital_twins(at_risk_level, at_risk_score DESC);
CREATE INDEX idx_recommendations_student_dismissed ON recommendations(student_id, dismissed, semester_id);
```

---

## 7. GPA Computation Query

```sql
-- Compute semester GPA for a given student and semester
SELECT 
  SUM(g.grade_points * c.credit_hours) / SUM(c.credit_hours) AS semester_gpa
FROM grades g
JOIN enrollments e ON g.enrollment_id = e.id
JOIN course_offerings co ON e.course_offering_id = co.id
JOIN courses c ON co.course_id = c.id
WHERE e.student_id = $1
  AND co.semester_id = $2
  AND g.finalized = TRUE;
```

---

## 8. Data Migration Strategy

- All schema changes via Prisma migration files (`prisma migrate dev`)
- Migration files are immutable after applying — never edited
- Production deployment: `prisma migrate deploy` (applies pending migrations only)
- Pre-migration: take a database snapshot
- Roll-back: restore snapshot if migration fails (Prisma does not auto-rollback)
