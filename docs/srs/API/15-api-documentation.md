# API Documentation

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-API-015  
**Standard:** IEEE/ISO/IEC 12207:2017 — Software Design Process  
**Version:** 1.0  
**Base URL:** `https://sdts.university.edu/api`  
**Date:** 2026-10-01

---

## 1. General Conventions

### 1.1 Authentication

All endpoints (except `/auth/login` and `/auth/refresh`) require:

```
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

A missing or invalid token returns `401 Unauthorized`.

### 1.2 Response Format

```json
{
  "success": true,
  "data": { ... }
}
```

Errors:
```json
{
  "success": false,
  "message": "Descriptive error message",
  "errors": [ ... ]  // Optional: validation errors array
}
```

### 1.3 HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | OK — successful GET/PUT |
| 201 | Created — successful POST |
| 204 | No Content — successful DELETE |
| 400 | Bad Request — validation error |
| 401 | Unauthorized — missing/invalid token |
| 403 | Forbidden — valid token, insufficient role |
| 404 | Not Found — resource does not exist |
| 409 | Conflict — unique constraint violation |
| 422 | Unprocessable Entity — business rule violation |
| 500 | Internal Server Error |

### 1.4 Pagination

List endpoints support:
```
GET /students?page=1&limit=20&search=john
```
Response includes:
```json
{
  "data": [...],
  "meta": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 }
}
```

---

## 2. Authentication Endpoints

### POST /auth/login

Log in and receive JWT tokens.

**Request body:**
```json
{
  "email": "student@university.edu",
  "password": "SecurePass@123"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGci...",
    "refreshToken": "eyJhbGci...",
    "user": {
      "id": "clxxx",
      "email": "student@university.edu",
      "role": "STUDENT"
    }
  }
}
```

**Response 401:** `"Invalid email or password"`  
**Response 401:** `"Account is locked until 2026-11-01T10:00:00Z"`

---

### POST /auth/refresh

Exchange a valid refresh token for a new access token.

**Request body:**
```json
{ "refreshToken": "eyJhbGci..." }
```

**Response 200:** `{ "token": "eyJhbGci...", "refreshToken": "eyJhbGci..." }`  
**Response 401:** `"Refresh token invalid or expired"`

---

### POST /auth/logout

Invalidate the refresh token.

**Request body:** `{ "refreshToken": "..." }`  
**Response 200:** `{ "success": true, "message": "Logged out" }`  
**Auth required:** Yes

---

### PUT /auth/change-password

**Roles:** All  
**Request body:** `{ "currentPassword": "...", "newPassword": "..." }`  
**Response 200:** `{ "success": true, "message": "Password updated" }`

---

## 3. Student Endpoints

### GET /students

List all students (paginated, searchable).  
**Roles:** ADVISOR, DEPT_ADMIN, SYS_ADMIN, MANAGEMENT  
**Query params:** `page`, `limit`, `search` (name/student ID), `programId`, `status`

**Response 200:**
```json
{
  "data": [
    {
      "id": "clxxx",
      "studentIdNo": "U2024001",
      "firstName": "Ali",
      "lastName": "Khan",
      "program": "Computer Science",
      "status": "ACTIVE",
      "currentCgpa": 3.42,
      "atRiskLevel": "LOW"
    }
  ],
  "meta": { "page": 1, "total": 245 }
}
```

---

### GET /students/:id

Get full student profile.  
**Roles:** STUDENT (own only), ADVISOR (assigned only), ADMIN  
**Response 200:** Full student object with program, advisor, enrollment summary.

---

### POST /students

Create a new student account.  
**Roles:** SYS_ADMIN, DEPT_ADMIN  
**Request body:**
```json
{
  "email": "newstudent@university.edu",
  "password": "Temp@12345",
  "studentIdNo": "U2026001",
  "firstName": "Fatima",
  "lastName": "Hassan",
  "programId": "clyyy",
  "enrollmentYear": 2026
}
```
**Response 201:** Created student object.

---

### PUT /students/:id

Update student profile.  
**Roles:** SYS_ADMIN, DEPT_ADMIN  
**Request body:** Partial student fields.

---

### DELETE /students/:id

Soft-delete (set status = INACTIVE).  
**Roles:** SYS_ADMIN only  
**Response 204**

---

## 4. Course & Enrollment Endpoints

### GET /courses

List all courses in catalog.  
**Roles:** All authenticated  

### POST /courses

Create a course.  
**Roles:** DEPT_ADMIN, SYS_ADMIN  

### POST /course-offerings

Create a course offering (course + semester + teacher).  
**Roles:** DEPT_ADMIN, SYS_ADMIN  

### POST /enrollments

Enroll a student in a course offering.  
**Roles:** DEPT_ADMIN, SYS_ADMIN  
**Request body:** `{ "studentId": "...", "courseOfferingId": "..." }`  
**Response 201** or **409** if already enrolled or prerequisite not met.

### DELETE /enrollments/:id

Withdraw a student.  
**Roles:** DEPT_ADMIN, SYS_ADMIN  

---

## 5. Attendance Endpoints

### GET /attendance

Get attendance records.  
**Roles:** TEACHER (own courses), ADVISOR, ADMIN  
**Query:** `courseOfferingId`, `date`, `studentId`

### POST /attendance

Mark attendance for a session.  
**Roles:** TEACHER (assigned courses only)  
**Request body:**
```json
{
  "courseOfferingId": "clxxx",
  "sessionDate": "2026-11-10",
  "records": [
    { "studentId": "clyyy", "status": "PRESENT" },
    { "studentId": "clzzz", "status": "ABSENT" }
  ]
}
```
**Response 201:** `{ "saved": 30, "updated": 0 }`  
**Note:** Uses upsert — duplicate date+course+student updates the existing record.

---

### GET /attendance/summary/:studentId

Get attendance percentage per course for a student.  
**Roles:** STUDENT (own), ADVISOR, ADMIN  
**Response 200:**
```json
{
  "data": [
    {
      "courseOfferingId": "clxxx",
      "courseName": "Data Structures",
      "attendanceRate": 82.5,
      "present": 33, "absent": 5, "late": 2, "excused": 0
    }
  ]
}
```

---

## 6. Grade Endpoints

### GET /grades/:enrollmentId

Get grade for an enrollment.  
**Roles:** STUDENT (own), TEACHER (own courses), ADVISOR, ADMIN  

### POST /grades

Enter or update a grade.  
**Roles:** TEACHER (assigned courses only)  
**Request body:**
```json
{
  "enrollmentId": "clxxx",
  "gradeLetter": "A-",
  "gradePoints": 3.67
}
```
**Response 201** or **200** if updating.

### PUT /grades/:id/finalize

Finalize a grade (no more edits by teacher).  
**Roles:** TEACHER (assigned courses only)  
**Response 200:** Finalized grade object.

---

## 7. Digital Twin Endpoints

### GET /twin/:studentId

Get the full digital twin for a student.  
**Roles:** STUDENT (own), ADVISOR (assigned), ADMIN  
**Response 200:**
```json
{
  "data": {
    "studentId": "clxxx",
    "academic": {
      "currentCgpa": 3.42,
      "totalCreditsEarned": 60,
      "gpaHistory": [
        { "semester": "Fall 2024", "gpa": 3.2 },
        { "semester": "Spring 2025", "gpa": 3.5 }
      ]
    },
    "behavior": {
      "engagementScore": 78.5,
      "avgAttendanceRate": 85.0,
      "assignmentSubmissionRate": 92.0
    },
    "skills": [
      { "domain": "Programming", "level": 3, "expectedLevel": 4 }
    ],
    "career": {
      "goal": "Software Engineer",
      "readinessScore": 72.0
    },
    "performance": {
      "predictedGpa": 3.50,
      "atRiskScore": 22.5,
      "atRiskLevel": "LOW",
      "explanation": ["Strong attendance", "Consistent submission rate"]
    },
    "lastRefreshedAt": "2026-11-10T09:30:00Z"
  }
}
```

---

## 8. Recommendation Endpoints

### GET /recommendations/:studentId

Get active recommendations for a student.  
**Roles:** STUDENT (own), ADVISOR (assigned)  

### PUT /recommendations/:id/feedback

Record student feedback on a recommendation.  
**Request body:** `{ "feedback": "HELPFUL" | "NOT_HELPFUL" }`  
**Response 200**

### PUT /recommendations/:id/dismiss

Dismiss a recommendation (won't show again this semester).  
**Response 200**

---

## 9. Report Endpoints

### POST /reports

Request a report. Report generation is async.  
**Roles:** Depends on report type  
**Request body:**
```json
{
  "type": "STUDENT_PERFORMANCE" | "TRANSCRIPT" | "AT_RISK" | "DEPARTMENT",
  "params": {
    "studentId": "clxxx",
    "semesterId": "clyyy",
    "format": "PDF" | "CSV"
  }
}
```
**Response 202 Accepted:** `{ "jobId": "clzzz", "estimatedReadyIn": 15 }`

### GET /reports/:jobId

Poll for report status / download when ready.  
**Response 200 (ready):** `{ "status": "READY", "downloadUrl": "/reports/files/clzzz.pdf" }`  
**Response 202 (pending):** `{ "status": "PENDING" }`

---

## 10. Notification Endpoints

### GET /notifications

Get current user's notifications (paginated).  
**Query:** `unreadOnly=true`  
**Response 200:** Array of notification objects.

### PUT /notifications/:id/read

Mark a notification as read.  
**Response 200**

### PUT /notifications/read-all

Mark all notifications as read.  
**Response 200**

---

## 11. Admin Endpoints

### GET /admin/stats

System-wide statistics dashboard.  
**Roles:** SYS_ADMIN, MANAGEMENT  
**Response 200:**
```json
{
  "data": {
    "totalStudents": 1200,
    "activeStudents": 980,
    "atRiskHigh": 47,
    "atRiskMedium": 132,
    "avgCgpa": 2.87
  }
}
```

### GET /admin/users

List all users.  
**Roles:** SYS_ADMIN  

### POST /admin/users

Create any system user.  
**Roles:** SYS_ADMIN  

---

## 12. AI Service Endpoints (Internal — not exposed to public)

These endpoints are called by the Node.js backend only. They are not accessible via the public API.

### POST /predict/gpa

**Input:**
```json
{
  "studentId": "clxxx",
  "features": {
    "cgpa": 3.2, "attendanceRate": 0.85, "submissionRate": 0.92,
    "creditsCompleted": 60, "semesterLoad": 18, "failedCourses": 0,
    "engagementScore": 78, "semesterNumber": 5
  }
}
```
**Output:** `{ "predictedGpa": 3.45, "confidence": 0.82, "explanation": [...] }`

### POST /predict/risk

**Input:** Same features as above.  
**Output:** `{ "atRiskScore": 22.5, "atRiskClass": "LOW", "factors": [...] }`

### POST /recommend

**Input:** `{ "studentId": "...", "twinData": { ... } }`  
**Output:** `{ "recommendations": [ { "type": "COURSE", "title": "...", "rationale": "..." } ] }`
