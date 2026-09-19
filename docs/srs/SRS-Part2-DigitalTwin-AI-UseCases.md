# SRS — Part 2: Digital Twin Requirements, AI/Analytics, Use Cases

*Chapters 6–8*

---

# Chapter 6 — Digital Twin Requirements

---

## 6.1 Digital Twin Definition

Within the SDTS, a **Student Digital Twin** is defined as:

> A persistent, continuously synchronized, multi-dimensional software model of a real student that mirrors their academic profile, learning behaviors, skill competencies, career aspirations, and performance trajectory — and can be analyzed, queried, and simulated independently of the student's real-time interaction with the system.

The twin is not a snapshot. It is a living model. It can answer questions about the past ("how has this student's GPA trended over 6 semesters?"), the present ("what is their current at-risk score?"), and the future ("what GPA are they predicted to achieve this semester?").

---

## 6.2 Digital Twin Components

Each Student Digital Twin consists of five component sub-models:

| Component | Data it contains | Update trigger |
|---|---|---|
| Academic Twin | Semester grades, GPA/CGPA, credit hours completed, standing | Grade entry, semester lock |
| Learning Behavior Twin | Assignment submission frequency/timeliness, quiz attempt count, login frequency, engagement score | Any assignment/quiz activity |
| Skills/Competency Twin | Competency level per skill domain, skill gaps, improvement over time | Course grade finalization, skill assessment |
| Career Twin | Declared career goal, career readiness score, alternative career matches | Career goal update, grade changes |
| Performance Twin | Predicted GPA, at-risk score, performance trend classification | AI model refresh cycle |

---

## 6.3 Student Digital Profile

**FR-DT-08** — The digital profile sub-model shall store:
- Student ID, full name, enrollment date, program, current semester
- Profile photo URL
- Contact information
- Academic standing classification
- Enrollment status

**FR-DT-09** — The digital profile shall link to all five component sub-models via the student's unique ID.

---

## 6.4 Academic Twin

**FR-DT-10** — The Academic Twin shall contain:
- List of all courses taken: course code, semester, grade, grade points, credit hours, pass/fail
- Per-semester GPA (computed and stored for each completed semester)
- Cumulative CGPA (recomputed whenever a semester is locked)
- Total credit hours completed
- Academic standing: Good Standing / Probation / Suspension Risk

**FR-DT-11** — The Academic Twin shall maintain a full grade history. If a grade is revised, both the original and revised grades are stored with timestamps.

---

## 6.5 Learning Behavior Twin

**FR-DT-12** — The Learning Behavior Twin shall track:
- Number of assignments submitted on time vs. late vs. not submitted (per semester)
- Average assignment score (per course, per semester)
- Number of quiz attempts
- Average quiz score
- Weekly login count during the active semester
- Engagement score: a computed value (0–100) based on submission timeliness, login frequency, and quiz participation

**FR-DT-13** — Engagement score formula:
```
Engagement Score = 
  (0.40 × assignment_submission_rate) +
  (0.30 × on_time_submission_rate) +
  (0.20 × login_frequency_score) +
  (0.10 × quiz_participation_rate)
```
All component scores are normalized to 0–100 before weighting.

---

## 6.6 Skills/Competency Twin

**FR-DT-14** — The Skills/Competency Twin shall maintain a record of the student's assessed competency level for each skill in the system's skill taxonomy.

**FR-DT-15** — Competency levels:
| Level | Description |
|---|---|
| Not Yet Assessed | Student has not completed any course developing this skill |
| Beginner | Student completed introductory course(s) with passing grade |
| Developing | Student completed intermediate course(s) |
| Proficient | Student completed advanced course(s) with grade ≥ B |
| Advanced | Student completed advanced course(s) with grade ≥ A |

**FR-DT-16** — The system shall compare each student's current competency levels against expected levels for their program and current semester to produce the skill gap analysis.

---

## 6.7 Career Twin

**FR-DT-17** — The Career Twin shall contain:
- Declared career goal (from the career path library)
- Career Readiness Score: 0–100, computed by comparing current skills and GPA against the target career path's requirements
- Alternative career path suggestions (top 3, computed by the AI service)
- Gap-to-goal analysis: which required skills and courses are still missing for the declared career path

---

## 6.8 Performance Twin

**FR-DT-18** — The Performance Twin shall contain:
- Predicted end-of-semester GPA (from the ML model)
- Prediction confidence score
- At-Risk Score: 0–100
- Risk classification: Low (0–39), Medium (40–69), High (70–100)
- Performance trend: Improving / Stable / Declining (based on last 2 completed semesters)
- Last AI model refresh timestamp

---

## 6.9 Digital Twin Data Sources

| Data Source | What it feeds |
|---|---|
| Student enrollment record | Digital Profile |
| Grade entry by teacher | Academic Twin, Performance Twin |
| Attendance record | Learning Behavior Twin, Performance Twin |
| Assignment marks | Learning Behavior Twin |
| Quiz/exam marks | Academic Twin, Learning Behavior Twin |
| Login events | Learning Behavior Twin |
| Skill assessments | Skills/Competency Twin |
| Career goal declaration | Career Twin |
| AI model inference | Performance Twin |

---

## 6.10 Digital Twin Data Updating

**FR-DT-19** — The digital twin shall be updated via event-driven triggers. Each data entry event (grade, attendance mark, assignment score) shall trigger the corresponding twin component update.

**FR-DT-20** — Twin updates shall complete within 2 seconds of the triggering data entry event.

**FR-DT-21** — The AI-derived components (Performance Twin, Career Twin career recommendations) shall be updated asynchronously — they are queued for refresh and do not block the user's data entry action.

---

## 6.11 Real-Time/Periodic Synchronization

**FR-DT-22** — Academic, behavioral, and skill components shall update in near-real-time (within seconds of data entry).

**FR-DT-23** — AI-derived predictions and recommendations shall be refreshed on a configurable schedule — default: every 24 hours during active semester, and triggered immediately whenever the at-risk factors change significantly (e.g., attendance drops below threshold).

**FR-DT-24** — At semester end (after final grades are locked), a full twin synchronization shall be triggered to finalize all metrics.

---

## 6.12 Digital Twin Lifecycle

```
Student enrolled → Twin Created (empty shell)
         ↓
Semester starts → Twin accumulates data
         ↓
Mid-semester → Performance predictions generated
         ↓
End of semester → Grades locked → Twin finalized for that semester
         ↓
New semester → Twin continues accumulating (carries forward history)
         ↓
Graduation → Twin archived (read-only, retained per data policy)
         ↓
Student request for data deletion → Twin deleted per privacy policy
```

---

## 6.13 Digital Twin Analytics

**FR-DT-25** — The system shall support the following analytical queries against a student's digital twin:
- Performance over time (GPA trend)
- Skills growth over time
- Engagement trend (semester-by-semester)
- Career readiness growth over time
- Comparison of predicted vs. actual GPA (post-semester)

---

## 6.14 Digital Twin Visualization

**FR-DT-26** — The student dashboard shall include a visual digital twin panel showing:
- Radar chart: skill profile (actual vs. expected)
- Line chart: GPA trend across semesters
- Gauge: current at-risk score
- Progress bar: career readiness score
- Badge list: top skills and competency levels

---

## 6.15 Digital Twin Historical Data

**FR-DT-27** — Every version of the digital twin's AI-derived components (predictions, recommendations) shall be stored with a timestamp, enabling historical comparison (e.g., "predicted GPA was 3.1 in week 4, 2.9 in week 8; actual final GPA was 2.8").

**FR-DT-28** — Historical twin data shall be used by the AI model retraining pipeline as ground truth.

---

## 6.16 Digital Twin Privacy and Security

**FR-DT-29** — A student's digital twin data shall be accessible only to: the student themselves, their assigned academic advisor, teachers (only the courses they teach), department administrators, and system administrators.

**FR-DT-30** — No student's individual twin data shall appear in any management-level report; only aggregated, anonymized statistics shall be presented at that level.

**FR-DT-31** — Twin data shall be encrypted at rest in the database for sensitive personal fields.

---

---

# Chapter 7 — Artificial Intelligence and Analytics Requirements

---

## 7.1 AI/ML Component Overview

The SDTS AI/ML layer is a separate Python-based microservice that:
1. Is called by the main API when predictions or recommendations are needed
2. Reads from the database directly (read-only access to the digital twin data)
3. Writes back predictions and recommendations via the main API
4. Is retrained periodically using historical data

Three primary AI capabilities are provided:

| AI Capability | Algorithm class | Output |
|---|---|---|
| GPA/CGPA Prediction | Regression | Predicted GPA + confidence score |
| At-Risk Detection | Classification | At-risk score (0–100) + risk class |
| Recommendation Generation | Content-based + rule-based filtering | Ordered list of recommendations with rationale |

---

## 7.2 Student Performance Prediction

**FR-AI-09** — The system shall use a regression model to predict the student's final course grade for each enrolled course based on: attendance rate to date, assignment scores to date, quiz scores to date, and historical GPA trajectory.

**FR-AI-10** — Predictions shall be clearly labelled as "Predicted" to distinguish them from actual grades in the UI.

**FR-AI-11** — The prediction confidence shall be displayed as a percentage; predictions with confidence below 60% shall be flagged with a disclaimer.

---

## 7.3 GPA/CGPA Prediction

**FR-AI-12** — The system shall predict the student's end-of-semester GPA by aggregating predicted course grades weighted by credit hours.

**FR-AI-13** — The system shall also predict the student's CGPA after the current semester completes, by incorporating the predicted semester GPA with the running CGPA history.

---

## 7.4 At-Risk Student Prediction

**FR-AI-14** — The at-risk classification model shall use a binary classifier (e.g., Gradient Boosting or Random Forest) trained on historical student data, with the following features:

| Feature | Source |
|---|---|
| Current attendance rate (%) | Attendance records |
| Current average assignment score | Assignment records |
| Current average quiz score | Quiz records |
| Engagement score | Learning behavior twin |
| GPA in previous semester | Academic twin |
| GPA trend (improving/stable/declining) | Academic twin |
| Number of courses with grade below 60% | Grade records |
| Number of consecutive absent days | Attendance records |

**FR-AI-15** — The model output shall be a probability (0.0–1.0) scaled to an At-Risk Score (0–100). The risk class thresholds shall be configurable by System Administrator.

---

## 7.5 Learning Pattern Analysis

**FR-AI-16** — The system shall analyze learning patterns to identify student behavioral clusters: e.g., "Early Submitter", "Last-Minute Submitter", "Low Engagement", "High Engagement". These clusters shall be displayed in the advisor view.

**FR-AI-17** — Learning pattern labels shall be used as additional features in the at-risk prediction model.

---

## 7.6 Skill Gap Analysis

**FR-AI-18** — The system shall programmatically compare a student's Skills/Competency Twin against the expected skill profile for their semester and program.

**FR-AI-19** — Gap severity shall be classified as:
- **High:** Student is 2+ competency levels below expected
- **Medium:** Student is 1 competency level below expected
- **Low:** Student is at or above expected level

---

## 7.7 Personalized Recommendations

**FR-AI-20** — The recommendation engine shall generate up to 10 total recommendations per student per refresh cycle, distributed across: learning resources (max 4), courses (max 3), skills (max 2), career paths (max 2), subject-adjustable by system configuration.

**FR-AI-21** — Recommendations shall be ranked by expected impact: the recommendation predicted to most improve the student's academic trajectory is ranked first.

---

## 7.8 Career Path Recommendations

**FR-AI-22** — Career path matching shall use a cosine similarity computation between the student's current skill vector and each career path's required skill vector.

**FR-AI-23** — Top 3 career paths with highest similarity scores shall be returned, even if different from the declared goal.

---

## 7.9 Recommendation Generation

**FR-AI-24** — Each recommendation record shall be stored in the database with: recommendation type, text, rationale, generated timestamp, and status (new / viewed / actioned / dismissed).

**FR-AI-25** — The student shall see only their most recent recommendation set. Previous recommendation sets shall be archived and accessible for historical review.

---

## 7.10 Model Training Data

**FR-AI-26** — AI models shall be trained on de-identified historical data: actual grades, attendance, assignment scores, and final outcomes from past semesters.

**FR-AI-27** — The training data pipeline shall include data cleaning, normalization, and outlier handling before model fitting.

**FR-AI-28** — A minimum of 100 student-semester records shall be required to train a reliable model; below this, the system shall use rule-based fallbacks instead of ML.

---

## 7.11 Model Evaluation

**FR-AI-29** — Model performance shall be evaluated on a held-out test set at the end of each training cycle.

**FR-AI-30** — Evaluation metrics:

| Model | Primary metric | Minimum acceptable |
|---|---|---|
| GPA prediction (regression) | Mean Absolute Error (MAE) | MAE ≤ 0.30 GPA points |
| At-risk classification | F1-Score | F1 ≥ 0.75 |
| Recommendation relevance | User feedback rate "Helpful" | ≥ 60% |

---

## 7.12 Prediction Accuracy Requirements

**FR-AI-31** — The system shall display a model accuracy indicator to advisors and administrators, showing the last evaluation metrics and training date.

**FR-AI-32** — If model performance falls below the minimum acceptable threshold, the system shall fall back to rule-based prediction and notify the System Administrator.

---

## 7.13 Explainability of AI Recommendations

**FR-AI-33** — Every AI-generated prediction shall include a brief natural-language explanation: e.g., "Predicted GPA is 2.8 because attendance rate (62%) and assignment completion rate (55%) are below expected levels."

**FR-AI-34** — The explanation shall cite the top 2–3 contributing factors with their current values.

**FR-AI-35** — The system shall NOT present AI outputs as definitive facts. All predictions shall be labelled: "AI-assisted estimate — consult your advisor for guidance."

---

## 7.14 AI Model Updating

**FR-AI-36** — AI models shall be retrained at the start of each new semester using all finalized data from previous semesters.

**FR-AI-37** — The System Administrator shall be able to manually trigger a model retraining via the admin panel.

**FR-AI-38** — All trained model versions shall be versioned and stored, so the system can roll back to a previous model if needed.

**FR-AI-39** — Model retraining shall run asynchronously and shall not impact system availability.

---

---

# Chapter 8 — Use Case Requirements

---

## 8.1 Use Case Diagram (Textual Description)

The primary actors and their use cases:

```
┌─────────────────────────────────────────────────────┐
│                      SDTS System                    │
│                                                     │
│  ┌─ Student ──────────────────────────────────┐    │
│  │  UC-S-01: View own digital twin            │    │
│  │  UC-S-02: View performance dashboard       │    │
│  │  UC-S-03: View grades and GPA              │    │
│  │  UC-S-04: View attendance record           │    │
│  │  UC-S-05: View recommendations             │    │
│  │  UC-S-06: Set career goal                  │    │
│  │  UC-S-07: Update profile                   │    │
│  └────────────────────────────────────────────┘    │
│                                                     │
│  ┌─ Teacher ──────────────────────────────────┐    │
│  │  UC-T-01: Mark attendance                  │    │
│  │  UC-T-02: Enter/update grades              │    │
│  │  UC-T-03: Create assignment                │    │
│  │  UC-T-04: Enter assignment marks           │    │
│  │  UC-T-05: View class performance           │    │
│  │  UC-T-06: View at-risk students (own class)│    │
│  └────────────────────────────────────────────┘    │
│                                                     │
│  ┌─ Academic Advisor ─────────────────────────┐    │
│  │  UC-A-01: View at-risk student list        │    │
│  │  UC-A-02: View student digital twin        │    │
│  │  UC-A-03: Add advising note                │    │
│  │  UC-A-04: Generate student progress report │    │
│  └────────────────────────────────────────────┘    │
│                                                     │
│  ┌─ Department Admin ─────────────────────────┐    │
│  │  UC-DA-01: Manage course catalog           │    │
│  │  UC-DA-02: Enroll students in courses      │    │
│  │  UC-DA-03: Manage semester                 │    │
│  │  UC-DA-04: Assign teachers to courses      │    │
│  │  UC-DA-05: View department dashboard       │    │
│  └────────────────────────────────────────────┘    │
│                                                     │
│  ┌─ System Admin ─────────────────────────────┐    │
│  │  UC-SA-01: Manage user accounts            │    │
│  │  UC-SA-02: Import student data             │    │
│  │  UC-SA-03: Configure system settings       │    │
│  │  UC-SA-04: View audit logs                 │    │
│  │  UC-SA-05: Trigger AI model retraining     │    │
│  └────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## 8.7 Detailed Use Case Specifications

---

### UC-AUTH-01: User Login

| Field | Detail |
|---|---|
| **Use Case ID** | UC-AUTH-01 |
| **Use Case Name** | User Login |
| **Actor** | All users (Student, Teacher, Advisor, Dept. Admin, Sys. Admin, Management) |
| **Description** | A registered user authenticates to the system using their email and password. |
| **Preconditions** | 1. User has a registered account. 2. Account is active (not locked or deactivated). |
| **Postconditions** | User is authenticated; JWT token is issued; user is redirected to their role-specific dashboard. |
| **Main Flow** | 1. User navigates to the login page. 2. User enters email and password. 3. User clicks "Sign In". 4. System validates credentials. 5. System issues JWT and sets it on the client. 6. System redirects user to their dashboard. |
| **Alternative Flow** | A1 — Password reset: User clicks "Forgot Password", enters email, receives reset link, sets new password. |
| **Exception Flow** | E1 — Wrong credentials: System returns "Invalid email or password" (same message for both to prevent user enumeration). E2 — Account locked: System displays "Account temporarily locked. Try again in 15 minutes." |
| **Business Rules** | BR-AUTH-01, BR-AUTH-02 (see Chapter 17) |

---

### UC-T-01: Mark Attendance

| Field | Detail |
|---|---|
| **Use Case ID** | UC-T-01 |
| **Use Case Name** | Mark Attendance |
| **Actor** | Teacher |
| **Description** | Teacher records the attendance status for each student enrolled in a specific course for a specific date. |
| **Preconditions** | 1. Teacher is authenticated. 2. Teacher is assigned to the course. 3. Students are enrolled in the course. |
| **Postconditions** | 1. Attendance records are created or updated. 2. Student's Learning Behavior Twin is updated. 3. If attendance drops below threshold, an alert is queued. |
| **Main Flow** | 1. Teacher selects the course and date. 2. System displays the enrolled student list with default status "Present". 3. Teacher updates status for absent/late/excused students. 4. Teacher clicks "Save". 5. System validates (no duplicate for same student/date/course). 6. System saves records. 7. System updates each affected student's digital twin. |
| **Alternative Flow** | A1 — Teacher re-marks already recorded attendance: System shows existing statuses; teacher modifies; system updates (upsert). |
| **Exception Flow** | E1 — Network failure: System stores the attendance data locally (session) and retries. E2 — Unauthorized: Teacher tries to mark attendance for a course not assigned to them — system returns 403. |
| **Business Rules** | BR-ATT-01: A student with attendance < 75% in any course receives an automatic alert. |

---

### UC-S-01: View Own Digital Twin

| Field | Detail |
|---|---|
| **Use Case ID** | UC-S-01 |
| **Use Case Name** | View Own Digital Twin |
| **Actor** | Student |
| **Description** | Student views their complete digital twin: all five component models visualized on their dashboard. |
| **Preconditions** | 1. Student is authenticated. 2. Student's digital twin exists and has been synchronized. |
| **Postconditions** | Student sees up-to-date twin data. No data is modified. |
| **Main Flow** | 1. Student logs in. 2. Student navigates to "My Digital Twin". 3. System retrieves all five twin components. 4. System renders visualizations: GPA trend chart, skill radar, at-risk gauge, career readiness bar, engagement summary. 5. Student explores each component. |
| **Alternative Flow** | A1 — Twin not yet populated (new student): System displays "Your digital twin is building — data will appear as your courses progress." |
| **Exception Flow** | E1 — Data load failure: System displays an error message and a retry button. |
| **Business Rules** | BR-PRIV-01: Student can only see their own twin. |

---

### UC-A-01: View At-Risk Student List

| Field | Detail |
|---|---|
| **Use Case ID** | UC-A-01 |
| **Use Case Name** | View At-Risk Student List |
| **Actor** | Academic Advisor |
| **Description** | Advisor views a list of their assigned students flagged as at-risk, sorted by risk score descending. |
| **Preconditions** | Advisor is authenticated. At-risk predictions have been computed. |
| **Postconditions** | Advisor can see which students need intervention. No data is modified. |
| **Main Flow** | 1. Advisor navigates to "At-Risk Students". 2. System queries for all assigned students with At-Risk Score > 70. 3. System displays list: student name, risk score, main risk factors, last advising date. 4. Advisor clicks a student to open their digital twin. |
| **Alternative Flow** | A1 — No at-risk students: System displays "No students currently flagged as at-risk." |
| **Exception Flow** | E1 — AI service unavailable: System displays cached risk scores with a "Last updated: X hours ago" disclaimer. |
| **Business Rules** | BR-RISK-01: At-Risk Score > 70 → High Risk → Advisor notified automatically. |

---

### UC-T-02: Enter Grades

| Field | Detail |
|---|---|
| **Use Case ID** | UC-T-02 |
| **Use Case Name** | Enter / Update Course Grades |
| **Actor** | Teacher |
| **Description** | Teacher enters final grades for each student enrolled in their course for the current semester. |
| **Preconditions** | 1. Teacher is authenticated and assigned to the course. 2. Semester is active. |
| **Postconditions** | 1. Grades are saved. 2. Student's Academic Twin and Performance Twin are updated. 3. GPA/CGPA is recomputed. |
| **Main Flow** | 1. Teacher selects course and semester. 2. System lists enrolled students with any existing grades. 3. Teacher enters letter grade or score for each student. 4. System validates: grade must be a valid value in the grading scale. 5. Teacher submits. 6. System saves grades, triggers GPA recomputation, updates digital twin. |
| **Alternative Flow** | A1 — Partial save: Teacher can save partial grades and return later. |
| **Exception Flow** | E1 — Invalid grade value: System highlights invalid cells and prevents submission until corrected. E2 — Semester locked: System returns "Grades for this semester are locked." |
| **Business Rules** | BR-GPA-01 through BR-GPA-03 |

---

### UC-SA-01: Manage User Accounts

| Field | Detail |
|---|---|
| **Use Case ID** | UC-SA-01 |
| **Use Case Name** | Manage User Accounts |
| **Actor** | System Administrator |
| **Description** | System Admin creates, updates, and deactivates user accounts and assigns roles. |
| **Preconditions** | Admin is authenticated with ADMIN role. |
| **Postconditions** | User account created/updated/deactivated; action logged in audit trail. |
| **Main Flow** | 1. Admin navigates to User Management. 2. Admin creates new user: enters email, full name, role. 3. System generates temporary password and sends welcome email. 4. System creates the user account. 5. Action is written to audit log. |
| **Alternative Flow** | A1 — Update role: Admin changes a user's role; new role takes effect on next login. A2 — Deactivate user: Admin marks user as inactive; user can no longer log in. |
| **Exception Flow** | E1 — Email already in use: System returns "An account with this email already exists." |
| **Business Rules** | BR-AUTH-03: Only System Admin can assign or change roles. |

---

### UC-DA-02: Enroll Students in Courses

| Field | Detail |
|---|---|
| **Use Case ID** | UC-DA-02 |
| **Use Case Name** | Enroll Students in Courses |
| **Actor** | Department Administrator |
| **Description** | Dept. Admin enrolls students in courses for the active semester, checking prerequisite rules. |
| **Preconditions** | 1. Student and course exist in the system. 2. Semester is in "upcoming" or "active" status. |
| **Postconditions** | 1. Enrollment record created. 2. Student's digital twin is updated to include the new course. |
| **Main Flow** | 1. Admin selects semester and course. 2. Admin adds students (individually or bulk from CSV). 3. System checks prerequisites for each student. 4. System enrolls students that pass the prerequisite check. 5. System reports any students blocked by unmet prerequisites. |
| **Alternative Flow** | A1 — Prerequisite override: Admin with appropriate permission can override a prerequisite check with a documented reason. |
| **Exception Flow** | E1 — Student already enrolled: System skips duplicate enrollments and reports them. |
| **Business Rules** | BR-CRS-01: Prerequisite rules must be satisfied unless explicitly overridden. |

---

*Continued in [SRS-Part3-Interfaces-Data-Database.md](SRS-Part3-Interfaces-Data-Database.md)*
