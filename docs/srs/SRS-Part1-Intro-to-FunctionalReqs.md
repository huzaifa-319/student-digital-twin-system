# Software Requirements Specification

# Student Digital Twin System (SDTS)

**Version:** 1.0  
**Date:** September 2026  
**Status:** Draft  
**Prepared by:** Huzaifa Ahamd / Waqas Ahamad/Hamad Khan  
**Institution:** Quaid-i-Azam University Islamabad
**Department:** Department of Computer Science

---

---

# Chapter 1 — Introduction

---

## 1.1 Purpose

This Software Requirements Specification (SRS) document defines the complete functional and non-functional requirements for the **Student Digital Twin System (SDTS)** — an AI-powered academic intelligence platform designed for higher education institutions.

The purpose of this document is to:

- Provide a clear, unambiguous description of the system's requirements
- Serve as a contract between stakeholders and the development team
- Act as a reference for system design, implementation, and testing
- Define the scope and boundaries of the system

This document is authoritative for all development, testing, and acceptance activities related to the SDTS.

---

## 1.2 Scope of the System

The Student Digital Twin System (SDTS) is a web-based academic management and intelligence platform that creates and maintains a **digital twin** — a continuously updated virtual representation — of each enrolled student in a university or college.

**The system is within scope:**

- Student profile and academic record management
- Real-time and periodic data collection from academic activities
- Digital twin creation, synchronization, and visualization per student
- AI/ML-based performance prediction, at-risk detection, and recommendation
- Role-based dashboards for students, teachers, advisors, administrators, and management
- Automated notifications and alerts
- Comprehensive reporting and analytics

**The system is out of scope:**

- Payment processing or fee management
- Campus facility management (rooms, labs, equipment)
- HR management for non-academic staff
- Student housing or accommodation management
- Physical IoT device integration (reserved for future enhancement)

---

## 1.3 Problem Statement

Modern educational institutions generate vast quantities of student data — grades, attendance, assignment submissions, quiz scores, learning activity logs — yet this data is rarely analyzed in a timely, holistic, or personalized way.

**Current problems:**

1. **Reactive intervention:** Academic advisors and teachers typically identify struggling students only after grades have already dropped significantly — often too late for meaningful intervention.

2. **Data silos:** Student data is scattered across multiple disconnected systems — the LMS, the grade book, the attendance register, the advising notes — making it impossible for any single stakeholder to see the complete picture.

3. **One-size-fits-all:** Institutions treat all students identically, despite each student having a unique academic trajectory, learning style, skill set, and career aspiration.

4. **No predictive insight:** Without analytical tools, faculty cannot predict which students are likely to fail a course, which skills are underdeveloped, or which career paths are best aligned with a student's performance and interests.

5. **Manual reporting:** Generating progress reports, at-risk lists, and performance summaries is a time-consuming manual process that limits their frequency and coverage.

The SDTS addresses all of these problems by creating a living digital twin of every student that integrates all available data, applies AI to generate actionable insights, and delivers those insights to the right stakeholders in real time.

---

## 1.4 Project Background

The concept of a **Digital Twin** originates in industrial engineering — manufacturers create a digital replica of a physical machine that mirrors its real-time state, enabling predictive maintenance and simulation. The SDTS applies this concept to higher education: each student has a digital twin that mirrors their academic reality — grades, engagement, skills, goals — enabling predictive advising and personalized learning.

This project is developed as a final-year capstone for a Bachelor of Science in Computer Science (BSCS) program. It combines full-stack web development, database design, and machine learning in a single integrated system.

---

## 1.5 Objectives

1. Create a centralized system that aggregates all student academic data into a unified profile.
2. Build a digital twin model for every student that is continuously synchronized with real-world academic events.
3. Apply machine learning to predict student GPA/CGPA, identify at-risk students, and detect learning gaps.
4. Deliver personalized course, skill, and career recommendations to each student.
5. Provide role-appropriate dashboards so every stakeholder has actionable visibility into student performance.
6. Enable early intervention through automated alerts for at-risk students.
7. Reduce administrative overhead through automated report generation.
8. Establish a privacy-respecting, secure data management framework.

---

## 1.6 Intended Audience

This SRS is intended for:

| Audience                      | Purpose                                           |
| ----------------------------- | ------------------------------------------------- |
| Development team              | Implementation reference                          |
| Project supervisor / examiner | Evaluation of scope and completeness              |
| System testers                | Acceptance criteria reference                     |
| University stakeholders       | Understanding system capabilities and limitations |
| Future developers             | Extension and maintenance reference               |

---

## 1.7 Definitions, Acronyms, and Abbreviations

| Term                  | Definition                                                                                                                              |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| SDTS                  | Student Digital Twin System                                                                                                             |
| Digital Twin          | A continuously updated virtual representation of a real-world entity — in this case, a student                                          |
| SRS                   | Software Requirements Specification                                                                                                     |
| AI                    | Artificial Intelligence                                                                                                                 |
| ML                    | Machine Learning                                                                                                                        |
| GPA                   | Grade Point Average (semester-level)                                                                                                    |
| CGPA                  | Cumulative Grade Point Average (across all semesters)                                                                                   |
| LMS                   | Learning Management System                                                                                                              |
| RBAC                  | Role-Based Access Control                                                                                                               |
| JWT                   | JSON Web Token                                                                                                                          |
| API                   | Application Programming Interface                                                                                                       |
| ER                    | Entity-Relationship                                                                                                                     |
| DFD                   | Data Flow Diagram                                                                                                                       |
| At-risk student       | A student whose predicted or actual academic performance indicates a high probability of course failure, academic probation, or dropout |
| Learning gap          | A specific subject area or skill domain in which a student's demonstrated competency falls below the expected level                     |
| Recommendation engine | An AI component that suggests relevant courses, skills, or career paths based on a student's digital twin data                          |
| CRUD                  | Create, Read, Update, Delete                                                                                                            |
| UI                    | User Interface                                                                                                                          |
| REST                  | Representational State Transfer                                                                                                         |

---

## 1.8 References

1. IEEE Std 830-1998 — IEEE Recommended Practice for Software Requirements Specifications
2. IEEE Std 1471-2000 — Recommended Practice for Architectural Description of Software-Intensive Systems
3. Grieves, M. (2014). Digital Twin: Manufacturing Excellence through Virtual Factory Replication.
4. Lim, K. Y. H., et al. (2020). A Digital Twin-Enhanced System for Engineering Lifecycle Management.
5. Institution's current academic rules and grading policy (internal document)

---

## 1.9 Document Organization

This SRS is organized into 24 chapters:

- **Chapters 1–3:** Introduction, overall description, and system overview
- **Chapters 4–5:** Stakeholders and functional requirements
- **Chapters 6–8:** Digital twin, AI/analytics, and use case requirements
- **Chapters 9–11:** Interface, data, and database requirements
- **Chapters 12–14:** Non-functional, security, and privacy requirements
- **Chapters 15–16:** System architecture and models/diagrams
- **Chapters 17–20:** Business rules, reporting, testing, and deployment
- **Chapters 21–24:** Maintenance, constraints/risks, future enhancements, and appendices

---

---

# Chapter 2 — Overall Description

---

## 2.1 Product Perspective

The SDTS is a standalone web-based system that serves as the central intelligence hub for academic performance monitoring and student support at a university. It integrates with:

- Existing academic record systems (data import)
- Email/SMS notification services (alerts)
- Optional: Learning Management Systems (LMS) via API

The system replaces manual advising processes, spreadsheet-based grade tracking, and fragmented data analysis with a unified, AI-enhanced platform.

---

## 2.2 Product Functions

At the highest level, the SDTS performs these major functions:

1. **Data aggregation:** Collects student profiles, academic records, attendance, assignment and quiz results, and learning activities.
2. **Digital twin creation and maintenance:** Builds and continuously updates a multi-dimensional virtual model of every student.
3. **Predictive analytics:** Uses ML models to predict GPA/CGPA, flag at-risk students, and identify skill gaps.
4. **Recommendation delivery:** Generates and presents personalized recommendations for courses, skills, and careers.
5. **Dashboard and reporting:** Delivers role-specific dashboards and automated reports.
6. **Alert management:** Sends proactive notifications when thresholds are breached (e.g., attendance below 75%, GPA declining).

---

## 2.3 Product Features

| Feature                | Description                                                                       |
| ---------------------- | --------------------------------------------------------------------------------- |
| Student Digital Twin   | Per-student virtual model with academic, behavioral, skill, and career dimensions |
| Performance Prediction | ML-based predicted GPA/CGPA for the current and future semesters                  |
| At-Risk Detection      | Automatic identification of students likely to fail or drop out                   |
| Recommendation Engine  | Personalized course, skill, and career path suggestions                           |
| Learning Gap Analysis  | Subject-wise comparison of actual vs. expected competency                         |
| Role-Based Dashboards  | Tailored views for students, teachers, advisors, admins, and management           |
| Attendance Management  | Daily/subject-wise attendance tracking with automatic alerts                      |
| Automated Reporting    | One-click generation of performance, progress, and at-risk reports                |
| Data Visualization     | Interactive charts for trends, comparisons, and predictions                       |
| Audit Logging          | Complete traceable log of all data changes and user actions                       |

---

## 2.4 User Classes and Characteristics

| User Class               | Technical Level | Frequency of Use        | Primary Goal                                       |
| ------------------------ | --------------- | ----------------------- | -------------------------------------------------- |
| Student                  | Low-medium      | Daily                   | View own performance, receive recommendations      |
| Teacher/Instructor       | Medium          | Multiple times per week | Enter grades/attendance, monitor class performance |
| Academic Advisor         | Medium          | Weekly                  | Identify at-risk students, provide guidance        |
| Department Administrator | Medium          | Weekly                  | Monitor department-wide metrics                    |
| System Administrator     | High            | As needed               | Manage users, data, configuration                  |
| Management               | Low             | Monthly                 | Executive summaries and KPIs                       |

---

## 2.5 Operating Environment

- **Client:** Any modern web browser (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- **Internet connection:** Minimum 2 Mbps for smooth chart rendering
- **Server OS:** Ubuntu 22.04 LTS or Windows Server 2019+
- **Database:** PostgreSQL 15+
- **Backend runtime:** Node.js 20+ (web API) and Python 3.10+ (AI/ML service)
- **Container support:** Docker-compatible deployment

---

## 2.6 Design and Implementation Constraints

1. The system must be a web application accessible via browser — no mobile app required in the initial release.
2. All AI model training must be done on anonymized or de-identified student data.
3. The system must comply with the institution's data governance and privacy policy.
4. The backend API must follow REST architectural principles.
5. The frontend must be responsive — usable on both desktop and tablet viewports.
6. Authentication must use JWT tokens with a configurable expiry.
7. All database access must use parameterized queries or an ORM (no raw SQL string concatenation).
8. AI model predictions must include a confidence score and a brief natural-language explanation.

---

## 2.7 Assumptions and Dependencies

**Assumptions:**

1. The institution has an existing student enrollment system from which initial data can be imported.
2. Each student has a unique student ID that will serve as the primary identifier.
3. Teachers are responsible for entering grades, attendance, and assignment marks within the system.
4. The AI models will be retrained periodically (e.g., at the end of each semester) with newly available data.
5. Users have basic digital literacy and can navigate a standard web application.

**Dependencies:**

1. PostgreSQL database server must be provisioned before deployment.
2. Python environment with scikit-learn must be available for the AI service.
3. SMTP or third-party email service (e.g., SendGrid) must be configured for notifications.
4. If LMS integration is enabled, the LMS must expose an API.

---

## 2.8 System Limitations

1. Predictions are probabilistic and should supplement — not replace — human judgment in advising decisions.
2. The system's AI models require sufficient historical data to be effective; accuracy will be limited in the first semester of deployment.
3. The system does not track physical classroom behavior, only digital/recorded academic data.
4. The recommendation engine does not have access to real-time job market data unless explicitly integrated with a third-party API.
5. Real-time synchronization is limited to data that can be captured within the system; external LMS data requires a periodic sync job.

---

---

# Chapter 3 — System Overview

---

## 3.1 System Concept

The SDTS is built around a central metaphor: **every student has a digital twin** — a software entity that reflects everything academically knowable about that student. This twin is not a static record; it is a living model that updates whenever a grade is entered, an assignment is submitted, attendance is recorded, or a skill is assessed.

The system uses this continuously updated twin to answer two questions that traditional systems cannot:

- **"How is this student likely to perform?"** (prediction)
- **"What should this student do next?"** (recommendation)

---

## 3.2 Student Digital Twin Concept

A Student Digital Twin has five dimensions:

| Dimension                  | What it captures                                                        |
| -------------------------- | ----------------------------------------------------------------------- |
| **Academic Twin**          | Semester-wise grades, GPA/CGPA, course history, pass/fail status        |
| **Learning Behavior Twin** | Assignment submission patterns, study time, LMS activity, quiz attempts |
| **Skills/Competency Twin** | Assessed skills per subject domain, competency levels, skill gaps       |
| **Career Twin**            | Declared career goals, matched career paths, readiness score            |
| **Performance Twin**       | Predicted next-semester GPA, at-risk score, improvement trend           |

These five dimensions together constitute the student's complete digital twin.

---

## 3.3 System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                        │
│   React + TypeScript frontend  (Browser)                │
│   Role-based dashboards, forms, charts                  │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS / REST API
┌──────────────────────▼──────────────────────────────────┐
│                   API LAYER (Node.js / Express)          │
│   JWT Auth │ RBAC │ Validation (Zod) │ Controllers      │
└──────┬──────────────────────────────┬───────────────────┘
       │ Prisma ORM                   │ HTTP (internal)
┌──────▼──────┐             ┌─────────▼────────────────────┐
│  PostgreSQL │             │  AI/ML Service (Python/Flask) │
│  Database   │             │  Prediction │ Recommendations │
└─────────────┘             └─────────────────────────────┘
```

---

## 3.4 Major System Components

| Component            | Technology                      | Responsibility                    |
| -------------------- | ------------------------------- | --------------------------------- |
| Web Frontend         | React, TypeScript, Tailwind CSS | User interfaces and dashboards    |
| REST API Backend     | Node.js, Express, TypeScript    | Business logic, data access, auth |
| Database             | PostgreSQL + Prisma ORM         | Persistent data storage           |
| AI/ML Service        | Python, Flask, scikit-learn     | Predictions and recommendations   |
| Notification Service | Email (SMTP / SendGrid)         | Automated alerts                  |
| Authentication       | JWT (JSON Web Tokens)           | Secure session management         |

---

## 3.5 System Workflow

```
Student enrolled
       ↓
Profile created in SDTS
       ↓
Digital twin initialized (empty shell)
       ↓
Teacher enters grades / attendance / marks over time
       ↓
Digital twin updates automatically
       ↓
AI service analyzes twin data periodically
       ↓
Predictions generated (predicted GPA, at-risk score)
       ↓
Recommendations generated (courses, skills, career)
       ↓
Dashboard updated for student, teacher, advisor, admin
       ↓
Alerts sent if thresholds crossed (e.g., attendance < 75%)
       ↓
Advisor reviews at-risk list → takes action
       ↓
End of semester: models retrained with new data
```

---

## 3.6 Data Flow Overview

1. **Input data flows:** User registration → profile; teacher grade entry → academic record; attendance marking → attendance record; assignment submission → assignment record.
2. **Processing flows:** All input data flows into the digital twin model. The AI service reads the twin model, runs ML inference, and writes predictions and recommendations back.
3. **Output data flows:** Dashboards read the twin model and predictions. Report generator reads aggregated data. Notification service reads thresholds and sends alerts.

---

## 3.7 Interaction Between Components

- The **frontend** communicates exclusively with the **REST API** via HTTPS JSON requests.
- The **REST API** reads and writes to **PostgreSQL** via Prisma ORM.
- The **REST API** calls the **AI/ML service** via an internal HTTP API when predictions or recommendations are needed.
- The **AI/ML service** reads student twin data directly from the database (read-only access) and writes prediction results back via the API.
- The **notification service** is triggered by the API when alert conditions are detected.

---

---

# Chapter 4 — Stakeholders and User Roles

---

## 4.1 Stakeholder Identification

| Stakeholder               | Interest                                       | Influence               |
| ------------------------- | ---------------------------------------------- | ----------------------- |
| Students                  | Their own performance data and recommendations | High (primary end user) |
| Teachers/Instructors      | Class-level analytics and grade entry          | High                    |
| Academic Advisors         | Early warning for at-risk students             | High                    |
| Department Administrators | Department performance metrics                 | Medium                  |
| System Administrator      | System health, user management                 | High (technical)        |
| University Management     | KPIs, institutional analytics                  | Medium                  |
| IT Department             | Infrastructure, security                       | Medium                  |
| Parents/Guardians         | Student progress (future scope)                | Low (not in v1)         |

---

## 4.2 Student

**Role description:** The primary subject of the digital twin. Students can view their own profile, academic records, twin visualization, predictions, and recommendations. They cannot see other students' data.

**Capabilities:**

- View personal dashboard and digital twin
- View semester grades, GPA/CGPA, attendance record
- View predicted next-semester GPA
- Receive and view personalized skill and course recommendations
- View career path suggestions
- Update personal profile (contact info, declared career goal)
- Receive notifications (low attendance warning, grade update)

**Constraints:**

- Cannot see data of other students
- Cannot modify grades or attendance

---

## 4.3 Teacher/Instructor

**Role description:** Responsible for entering and managing academic data for the courses they teach. Can view aggregate analytics for their classes.

**Capabilities:**

- Mark attendance for enrolled students
- Enter and update assignment marks
- Enter quiz and exam results
- View class-level attendance and performance reports
- View individual student performance within their courses
- Receive alerts for students with declining performance
- Post assignments and deadlines

**Constraints:**

- Can only see data for courses they are assigned to teach
- Cannot modify other teachers' records

---

## 4.4 Academic Advisor

**Role description:** Faculty member responsible for guiding a group of students through their academic journey. Has broader read-only access than teachers.

**Capabilities:**

- View complete digital twin of any assigned student
- Access at-risk student list
- View recommendations generated for each student
- Generate student progress and skill gap reports
- Record advising session notes on a student's profile
- Filter students by risk level, GPA range, or attendance

**Constraints:**

- Cannot enter or modify grades or attendance
- Read-only access to academic records

---

## 4.5 Department Administrator

**Role description:** Administrative role managing the department's student and course data.

**Capabilities:**

- Manage course catalog and enrollment
- Manage teacher-course assignments
- View department-wide performance dashboards
- Generate department performance reports
- Manage semester configurations
- Approve student registration

**Constraints:**

- Cannot modify individual grades
- Cannot access AI model configuration

---

## 4.6 System Administrator

**Role description:** Technical administrator responsible for system configuration, user management, and data integrity.

**Capabilities:**

- Create, update, deactivate user accounts
- Assign and change roles
- Import bulk student and course data
- Configure system settings (grading scales, attendance thresholds)
- View audit logs
- Trigger AI model retraining
- Manage database backups

**Constraints:**

- Must not use admin access to view student academic content without authorization
- All admin actions must be logged

---

## 4.7 Management/Decision Maker

**Role description:** University leadership (Dean, Head of Department) requiring high-level institutional analytics.

**Capabilities:**

- View institutional dashboards (enrollment trends, average CGPA, pass rates)
- Access department comparison reports
- View at-risk statistics at department level
- Export executive summary reports

**Constraints:**

- Read-only access; cannot modify any data
- Cannot see individual student PII (only aggregate statistics)

---

## 4.8 Stakeholder Responsibilities

| Stakeholder          | Responsibility in SDTS                                    |
| -------------------- | --------------------------------------------------------- |
| Student              | Keep profile current; engage with recommendations         |
| Teacher              | Timely and accurate entry of grades and attendance        |
| Academic Advisor     | Regular review of at-risk list; document advising actions |
| Dept. Administrator  | Keep course and enrollment data current                   |
| System Administrator | Maintain system health; manage users; trigger retraining  |
| Management           | Use reports for institutional decisions                   |

---

---

# Chapter 5 — Functional Requirements

> Format: **FR-[Module]-[Number]** — unique identifier for each requirement.

---

## 5.1 User Registration and Authentication

| ID         | Requirement                                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-AUTH-01 | The system shall allow the System Administrator to create new user accounts with a specified role (Student, Teacher, Advisor, Dept. Admin, Sys. Admin, Management). |
| FR-AUTH-02 | On account creation, the system shall send a welcome email with a temporary password and a link to set a permanent password.                                        |
| FR-AUTH-03 | The system shall enforce a minimum password complexity: at least 8 characters, one uppercase letter, one digit.                                                     |
| FR-AUTH-04 | The system shall hash all passwords using bcrypt with a minimum cost factor of 12 before storing.                                                                   |
| FR-AUTH-05 | The system shall never return or expose password hashes via any API endpoint.                                                                                       |

---

## 5.2 User Login/Logout

| ID         | Requirement                                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| FR-AUTH-06 | The system shall authenticate users via email and password.                                                               |
| FR-AUTH-07 | On successful login, the system shall issue a signed JWT token with the user's ID and role embedded as claims.            |
| FR-AUTH-08 | The JWT token shall have a configurable expiry (default: 8 hours).                                                        |
| FR-AUTH-09 | The system shall provide a logout function that invalidates the current session token on the client.                      |
| FR-AUTH-10 | After 5 consecutive failed login attempts, the system shall lock the account for 15 minutes and notify the user by email. |
| FR-AUTH-11 | The system shall support password reset via a time-limited (1 hour) email link.                                           |

---

## 5.3 Role-Based Access Control

| ID         | Requirement                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| FR-AUTH-12 | Every API endpoint shall verify the caller's JWT before processing the request.                                      |
| FR-AUTH-13 | Each endpoint shall enforce role authorization; unauthorized role access shall return HTTP 403.                      |
| FR-AUTH-14 | A Student user shall only access their own data. Any attempt to access another student's data shall return HTTP 403. |
| FR-AUTH-15 | A Teacher user shall only access data for courses they are assigned to teach.                                        |
| FR-AUTH-16 | Role assignments shall be controlled exclusively by the System Administrator.                                        |

---

## 5.4 Student Profile Management

| ID        | Requirement                                                                                                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FR-STU-01 | The system shall maintain a student profile with: student ID, full name, date of birth, gender, contact email, phone, address, enrollment date, current program, current semester, and status (active/inactive/graduated/suspended). |
| FR-STU-02 | The system shall allow Dept. Admins to create and update student profiles.                                                                                                                                                           |
| FR-STU-03 | Students shall be able to update their own contact email, phone, address, and declared career goal.                                                                                                                                  |
| FR-STU-04 | The system shall display the student's profile photo (upload supported; image files only, max 2 MB).                                                                                                                                 |
| FR-STU-05 | The system shall support soft-deletion of student records (marking as inactive) rather than destructive deletion.                                                                                                                    |
| FR-STU-06 | A student's admission/student ID shall be unique and immutable once assigned.                                                                                                                                                        |

---

## 5.5 Academic Record Management

| ID        | Requirement                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| FR-ACA-01 | The system shall maintain a complete academic history for each student: semester, course, credit hours, grade, grade points.               |
| FR-ACA-02 | The system shall automatically compute semester GPA and cumulative CGPA whenever grades are added or changed.                              |
| FR-ACA-03 | The system shall maintain grade history (if a grade is revised, the original grade and revision date are preserved in an audit log).       |
| FR-ACA-04 | The system shall support the institution's grading scale (e.g., A=4.0, A-=3.7 … F=0.0), which is configurable by the System Administrator. |
| FR-ACA-05 | Academic records shall be read-only to students; editable only by authorized teachers and administrators.                                  |

---

## 5.6 Course Management

| ID        | Requirement                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-CRS-01 | The system shall maintain a course catalog with: course code, course name, credit hours, department, prerequisite courses, and description. |
| FR-CRS-02 | The system shall allow Dept. Admins to add, update, and deactivate courses.                                                                 |
| FR-CRS-03 | The system shall support course prerequisite rules: a student cannot be enrolled in a course until all prerequisites are marked as passed.  |
| FR-CRS-04 | The system shall track course enrollment: which students are enrolled in which course in which semester.                                    |
| FR-CRS-05 | The system shall allow a teacher to be assigned to a course-section per semester.                                                           |

---

## 5.7 Semester Management

| ID        | Requirement                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------- |
| FR-SEM-01 | The system shall support multiple semesters (Fall, Spring, Summer) per academic year.                     |
| FR-SEM-02 | Each semester shall have a configurable start date, end date, and status (upcoming, active, completed).   |
| FR-SEM-03 | The system shall allow Dept. Admins to create semesters and enroll students in courses for that semester. |
| FR-SEM-04 | On semester completion, the system shall compute and lock GPA for that semester and update CGPA.          |

---

## 5.8 Attendance Management

| ID        | Requirement                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| FR-ATT-01 | The system shall allow teachers to record daily or subject-wise attendance for enrolled students.                                 |
| FR-ATT-02 | Attendance status options shall be: Present, Absent, Late, Excused.                                                               |
| FR-ATT-03 | The system shall compute each student's attendance percentage per course per semester.                                            |
| FR-ATT-04 | The system shall automatically generate an alert when a student's attendance drops below a configurable threshold (default: 75%). |
| FR-ATT-05 | The system shall prevent duplicate attendance entries for the same student, date, and course.                                     |
| FR-ATT-06 | Students shall be able to view their own attendance record.                                                                       |
| FR-ATT-07 | Teachers shall be able to view attendance reports for their courses.                                                              |

---

## 5.9 Assignment Management

| ID        | Requirement                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| FR-ASN-01 | Teachers shall be able to create assignments with: title, description, due date, maximum marks, and attached course. |
| FR-ASN-02 | The system shall allow teachers to enter obtained marks for each student per assignment.                             |
| FR-ASN-03 | The system shall track submission status (Submitted on time / Late / Not submitted) for each student.                |
| FR-ASN-04 | Students shall be able to view their assignment marks and submission status.                                         |
| FR-ASN-05 | The system shall send a reminder notification to students 24 hours before an assignment deadline.                    |

---

## 5.10 Quiz and Examination Management

| ID        | Requirement                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| FR-QUZ-01 | The system shall allow teachers to create quizzes and exams with: title, date, type (quiz/midterm/final), maximum marks, and course. |
| FR-QUZ-02 | Teachers shall be able to enter marks for each student per quiz/exam.                                                                |
| FR-QUZ-03 | The system shall support multiple assessment types with configurable weightage: quizzes, assignments, midterm, and final exam.       |
| FR-QUZ-04 | The system shall compute the weighted course grade from all assessment components.                                                   |
| FR-QUZ-05 | Students shall be able to view their quiz and exam results.                                                                          |

---

## 5.11 Grades and GPA/CGPA Management

| ID        | Requirement                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| FR-GPA-01 | The system shall compute semester GPA as: Σ(grade_points × credit_hours) / Σ(credit_hours) for that semester.                       |
| FR-GPA-02 | The system shall compute CGPA as the cumulative weighted GPA across all completed semesters.                                        |
| FR-GPA-03 | The system shall display GPA and CGPA to the student, teacher (for their courses), advisor, and admin.                              |
| FR-GPA-04 | Grades shall be finalized by the teacher and locked; changes require admin approval and are logged.                                 |
| FR-GPA-05 | The system shall classify student standing: Good Standing (CGPA ≥ 2.0), Probation (1.5 ≤ CGPA < 2.0), Suspension risk (CGPA < 1.5). |

---

## 5.12 Student Performance Tracking

| ID         | Requirement                                                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| FR-PERF-01 | The system shall track performance trends over time: GPA per semester, attendance per semester, assignment completion rate per semester. |
| FR-PERF-02 | The system shall generate a performance trend chart for each student.                                                                    |
| FR-PERF-03 | The system shall identify consecutive declining GPA semesters (2 or more) and flag the student for advisor review.                       |

---

## 5.13 Learning Activity Tracking

| ID        | Requirement                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| FR-LRN-01 | The system shall log learning activities: assignment submissions, quiz attempts, login frequency, and (if LMS integrated) resource access. |
| FR-LRN-02 | The system shall compute a weekly engagement score based on learning activity frequency.                                                   |
| FR-LRN-03 | A student with zero learning activity for 7 consecutive days during an active semester shall trigger an engagement alert.                  |

---

## 5.14 Skills and Competency Management

| ID        | Requirement                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| FR-SKL-01 | The system shall maintain a skill taxonomy: skills organized by domain (e.g., Programming, Mathematics, Communication, Analysis).        |
| FR-SKL-02 | Skills shall be mapped to courses; completing a course with a passing grade updates the student's competency level in associated skills. |
| FR-SKL-03 | The system shall represent competency level as: Beginner / Developing / Proficient / Advanced.                                           |
| FR-SKL-04 | The system shall display each student's skill profile as part of their digital twin.                                                     |
| FR-SKL-05 | The system shall identify skill gaps: skills that are Below Expected Level based on the student's program and semester.                  |

---

## 5.15 Career Goal Management

| ID        | Requirement                                                                                                                                                 |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-CAR-01 | The system shall maintain a library of career paths (e.g., Software Engineer, Data Scientist, Network Engineer, Business Analyst).                          |
| FR-CAR-02 | Each career path shall have a list of recommended skills, courses, and minimum expected CGPA.                                                               |
| FR-CAR-03 | A student shall be able to set their declared career goal from the career library.                                                                          |
| FR-CAR-04 | The system shall compute a Career Readiness Score for each student based on how well their current skills and grades align with their declared career path. |

---

## 5.16 Student Digital Twin Creation

| ID       | Requirement                                                                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-DT-01 | The system shall automatically create a digital twin when a student profile is created.                                                        |
| FR-DT-02 | The digital twin shall be initialized with the student's profile data and remain empty for academic dimensions until data is entered.          |
| FR-DT-03 | Each digital twin shall have a unique identifier linked to the student ID.                                                                     |
| FR-DT-04 | The digital twin shall aggregate data from: academic records, attendance, assignments, quizzes, skills, learning activities, and career goals. |

---

## 5.17 Digital Twin Data Synchronization

| ID       | Requirement                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| FR-DT-05 | The digital twin shall be updated in near-real-time whenever grades, attendance, or assignment marks are entered. |
| FR-DT-06 | AI predictions within the digital twin shall be refreshed at least once every 24 hours during an active semester. |
| FR-DT-07 | The system shall maintain a sync log recording when the digital twin was last updated and by which event.         |

---

## 5.18 Student Performance Analytics

| ID        | Requirement                                                                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-ANA-01 | The system shall compute and display: attendance rate, assignment completion rate, average quiz score, weighted course grade, semester GPA, and CGPA. |
| FR-ANA-02 | The system shall display trend charts for GPA and attendance over all completed semesters.                                                            |
| FR-ANA-03 | The system shall display a radar/spider chart comparing the student's skill profile against the expected skill profile for their program.             |

---

## 5.19 Performance Prediction

| ID       | Requirement                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| FR-AI-01 | The system shall use an ML model to predict the student's end-of-semester GPA based on data available mid-semester. |
| FR-AI-02 | Each prediction shall include a confidence score (0–100%).                                                          |
| FR-AI-03 | Predictions shall be regenerated automatically when new grade or attendance data is entered.                        |

---

## 5.20 At-Risk Student Identification

| ID       | Requirement                                                                                                                                          |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-AI-04 | The system shall compute an At-Risk Score (0–100) for each active student.                                                                           |
| FR-AI-05 | Students with an At-Risk Score above 70 shall be automatically flagged and appear on the advisor's at-risk list.                                     |
| FR-AI-06 | The at-risk score shall consider: attendance rate, current grade trend, assignment completion rate, engagement score, and historical GPA trajectory. |
| FR-AI-07 | The system shall notify the student's assigned advisor when a student is newly flagged as at-risk.                                                   |

---

## 5.21 Learning Gap Identification

| ID       | Requirement                                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| FR-AI-08 | The system shall compare a student's actual competency levels against program-expected competency levels per semester. |
| FR-AI-09 | Gaps shall be ranked by severity (High / Medium / Low) based on the gap magnitude.                                     |
| FR-AI-10 | The system shall display learning gaps visually (bar chart or heatmap) in the student's digital twin dashboard.        |

---

## 5.22 Recommendation System

| ID        | Requirement                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------ |
| FR-REC-01 | The recommendation engine shall generate recommendations in three categories: Courses, Skills, and Career Paths.         |
| FR-REC-02 | Recommendations shall be personalized — based on the student's specific digital twin state.                              |
| FR-REC-03 | Each recommendation shall include a rationale: a brief natural-language explanation of why it was suggested.             |
| FR-REC-04 | The system shall allow students to mark recommendations as "Helpful" or "Not relevant" (feedback for model improvement). |

---

## 5.23 Personalized Learning Recommendations

| ID        | Requirement                                                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-REC-05 | The system shall recommend supplementary resources (topic names, study areas) for subjects where the student's score is below the class median. |
| FR-REC-06 | Recommendations shall be updated when new assessment data is entered.                                                                           |

---

## 5.24 Course Recommendations

| ID        | Requirement                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
| FR-REC-07 | The system shall recommend elective courses that align with the student's career goal and fill identified skill gaps. |
| FR-REC-08 | Recommended courses must satisfy prerequisite requirements based on the student's completed course history.           |

---

## 5.25 Skill Recommendations

| ID        | Requirement                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| FR-REC-09 | The system shall recommend skills the student should develop, prioritized by their importance to the student's declared career path. |
| FR-REC-10 | Each skill recommendation shall include the gap level (how far below expected) and the courses that develop that skill.              |

---

## 5.26 Career Recommendations

| ID        | Requirement                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FR-REC-11 | The system shall suggest up to three alternative career paths for which the student shows strong aptitude, even if different from their declared goal. |
| FR-REC-12 | Career recommendations shall display the student's readiness score for each suggested path.                                                            |

---

## 5.27 Student Progress Dashboard

| ID         | Requirement                                                                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-DASH-01 | The student dashboard shall display: current semester GPA, CGPA, attendance rate, at-risk score, digital twin visual, top recommendations, and upcoming assignment deadlines. |
| FR-DASH-02 | All data on the student dashboard shall reflect the most recently synchronized digital twin state.                                                                            |

---

## 5.28 Teacher Dashboard

| ID         | Requirement                                                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-DASH-03 | The teacher dashboard shall display: class-wise attendance summary, grade distribution chart, at-risk students in their courses, and pending grade entries. |

---

## 5.29 Administrator Dashboard

| ID         | Requirement                                                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-DASH-04 | The administrator dashboard shall display: total enrollment, overall pass/fail rates, department CGPA distribution, and top at-risk students. |

---

## 5.30 Academic Advisor Dashboard

| ID         | Requirement                                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-DASH-05 | The advisor dashboard shall display: their assigned students' at-risk list sorted by risk score, recent alerts, and quick access to any student's digital twin. |

---

## 5.31 Notifications and Alerts

| ID        | Requirement                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| FR-NOT-01 | The system shall support in-app notifications and email notifications.                                                         |
| FR-NOT-02 | Alert types shall include: low attendance warning, grade update, at-risk flag, assignment deadline reminder, and advisor note. |
| FR-NOT-03 | Users shall be able to configure which notification types they receive via email.                                              |
| FR-NOT-04 | All sent notifications shall be logged with timestamp and recipient.                                                           |

---

## 5.32 Reports Generation

| ID        | Requirement                                                                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-RPT-01 | The system shall generate reports in PDF and CSV formats.                                                                                                      |
| FR-RPT-02 | Report types shall include: student transcript, semester report card, attendance report, at-risk report, department performance summary, and skill gap report. |
| FR-RPT-03 | Reports shall be generated on-demand by authorized users.                                                                                                      |
| FR-RPT-04 | Generated reports shall be downloadable and optionally emailed to the requesting user.                                                                         |

---

## 5.33 Data Visualization

| ID        | Requirement                                                                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FR-VIZ-01 | The system shall provide interactive charts: line chart (GPA trend), bar chart (grade distribution, attendance), radar chart (skill profile), and gauge chart (at-risk score). |
| FR-VIZ-02 | All charts shall be responsive and render correctly on desktop and tablet viewports.                                                                                           |

---

## 5.34 Search and Filtering

| ID         | Requirement                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-SRCH-01 | Administrators and advisors shall be able to search students by: name, student ID, program, semester, GPA range, attendance range, and risk level. |
| FR-SRCH-02 | Search results shall be paginated (default: 20 per page).                                                                                          |
| FR-SRCH-03 | Advisors shall be able to filter their student list by: at-risk level (High/Medium/Low), semester, and GPA range.                                  |

---

## 5.35 Data Import/Export

| ID        | Requirement                                                                                 |
| --------- | ------------------------------------------------------------------------------------------- |
| FR-IMP-01 | The System Administrator shall be able to bulk-import student profiles from a CSV file.     |
| FR-IMP-02 | The system shall validate imported CSV data before processing and report errors row by row. |
| FR-IMP-03 | Admins shall be able to export student data (profiles, grades, attendance) as CSV or Excel. |

---

## 5.36 Audit Logs

| ID        | Requirement                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------- |
| FR-AUD-01 | The system shall log all data modifications: who changed what, when, and the before/after values. |
| FR-AUD-02 | Audit logs shall be viewable by System Administrators only.                                       |
| FR-AUD-03 | Audit logs shall be immutable — once written, they cannot be edited or deleted through the UI.    |
| FR-AUD-04 | Audit logs shall be retained for a minimum of 3 years.                                            |

---

_Continued in [SRS-Part2-DigitalTwin-AI-UseCases.md](SRS-Part2-DigitalTwin-AI-UseCases.md)_
