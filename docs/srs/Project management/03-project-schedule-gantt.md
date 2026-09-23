# Project Schedule / Gantt Chart

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-SCH-003  
**Standard:** IEEE/ISO/IEC 16326:2009 (Annex B)  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Project Timeline Overview

**Start:** 2026-10-01 | **End:** 2027-05-31 | **Duration:** 35 weeks

---

## 2. Gantt Chart

Legend: `█` = active | `M` = milestone | `▶` = start | `◀` = end

```
TASK                              OCT    NOV    DEC    JAN    FEB    MAR    APR    MAY
                                  W1-W4  W5-W8  W9-W13 W14-W17 W18-W22 W23-W26 W27-W30 W31-W35
─────────────────────────────────────────────────────────────────────────────────────────────────
1.1 PROJECT MANAGEMENT
  1.1.1 Project Planning          ████M
  1.1.2 Progress Monitoring       ████   ████   ████   ████   ████   ████   ████   ████
  1.1.3 Risk Management           ██     ██     ██     ██     ██     ██     ██     ██
  1.1.5 Project Closeout                                                            ████M

1.2 REQUIREMENTS
  1.2.1 Stakeholder Analysis      ███
  1.2.2 Functional Req.           ████
  1.2.3 Non-Functional Req.        ██
  1.2.4 SRS Documentation         ████
  1.2.5 SRS Review & Baseline          M
  1.2.6 RTM Creation               ██

1.3 DESIGN
  1.3.1 Architecture Design            ████
  1.3.2 Database Design                ████
  1.3.3 API Design                      ███
  1.3.4 UI/UX Wireframing              ████
  1.3.5 AI/ML Design                        ██
  ── Design Baseline                         M

1.4 FRONTEND DEVELOPMENT
  1.4.1 Scaffolding                         ██
  1.4.2 Auth Pages                          ██
  1.4.3 Student Dashboard                    ████
  1.4.4 Teacher Dashboard                         ████
  1.4.5 Advisor Dashboard                              ██
  1.4.6 Admin Panel                                    ██
  1.4.7 Reports & Charts                                ███
  1.4.8 Notifications UI                                 ██
  ── Frontend Complete                                      M

1.5 BACKEND DEVELOPMENT
  1.5.1 Scaffolding                         ██
  1.5.2 DB Schema & Migrations              ██
  1.5.3 Auth Module                          ██
  1.5.4 Student Module                        ██
  1.5.5 Course Module                          ██
  1.5.6 Attendance Module                       ██
  1.5.7 Grades Module                            ██
  1.5.8 Twin Sync Service                         ██
  1.5.9 Notification Service                       ██
  1.5.10 Reporting Service                          ██
  ── Backend Complete                               M

1.6 AI/ML DEVELOPMENT
  1.6.1 Data Pipeline                         ███
  1.6.2 Feature Engineering                      ██
  1.6.3 GPA Model                                ████
  1.6.4 Risk Classifier                               ████
  1.6.5 Recommendation Engine                          ████
  1.6.6 Model Evaluation                                   ██
  1.6.7 Flask API                                            ██
  1.6.8 Model Deployment                                      ██
  ── AI Service Complete                                       M

1.7 INTEGRATION
  1.7.1 FE-BE Integration                                     ████
  1.7.2 BE-AI Integration                                      ███
  1.7.3 Twin Validation                                            ██
  1.7.4 System Bug Fixing                                           ████
  ── Integration Complete                                               M

1.8 TESTING
  1.8.1 Unit Tests BE              (ongoing during development)
  1.8.2 Unit Tests FE              (ongoing during development)
  1.8.3 Unit Tests AI              (ongoing during development)
  1.8.4 Integration Tests                                           ████
  1.8.5 System Tests                                                     ████
  1.8.6 Performance Tests                                                  ██
  1.8.7 Security Tests                                                      ██
  1.8.8 UAT                                                                  ██M

1.9 DEPLOYMENT
  1.9.1 Env Setup                                                              ██
  1.9.2-5 Deploy All Components                                                 ██
  1.9.6 Smoke Tests                                                              █M

1.10 DOCUMENTATION
  1.10.2 Architecture Doc               ██
  1.10.3 API Docs                         ██
  1.10.4 Database Docs                    ██
  1.10.5 Test Plan / Report                                                 ████
  1.10.6 Deployment Guide                                                       ██
  1.10.7 User Manual                                                             ████M
─────────────────────────────────────────────────────────────────────────────────────────────────
```

---

## 3. Key Milestones

| ID | Milestone | Target Date | Success Criteria |
|---|---|---|---|
| M1 | Project Plan Approved | 2026-10-07 | PMP reviewed and signed off by supervisor |
| M2 | SRS Baselined | 2026-10-20 | SRS approved, version-controlled, RTM created |
| M3 | Design Baselined | 2026-11-15 | Architecture, DB, API, wireframes reviewed |
| M4 | Frontend Complete | 2026-12-31 | All UI screens functional against mock API |
| M5 | Backend Complete | 2027-01-31 | All API endpoints implemented and unit tested |
| M6 | AI Service Complete | 2027-02-28 | All models trained; MAE ≤ 0.30, F1 ≥ 0.75 |
| M7 | Integration Complete | 2027-03-31 | Full end-to-end flow working |
| M8 | UAT Sign-off | 2027-04-30 | All UAT test cases passed, accepted by supervisor |
| M9 | System Deployed | 2027-05-15 | Smoke tests pass on production server |
| M10 | Final Submission | 2027-05-31 | All documents submitted, repository archived |

---

## 4. Weekly Schedule (Months 1–3 Detail)

### October 2026

| Week | Dates | Key Activities |
|---|---|---|
| W01 | Oct 01–07 | Project setup, team roles, GitHub repo, dev environment |
| W02 | Oct 08–14 | Stakeholder analysis, begin functional requirements |
| W03 | Oct 15–21 | Complete SRS Parts 1–3, begin SRS review |
| W04 | Oct 22–31 | Finalize SRS, baseline it; begin architecture design |

### November 2026

| Week | Dates | Key Activities |
|---|---|---|
| W05 | Nov 01–07 | Architecture + DB design |
| W06 | Nov 08–14 | API design + UI wireframes |
| W07 | Nov 15–21 | Design baseline; begin backend + frontend scaffolding |
| W08 | Nov 22–30 | Backend: auth + student modules; FE: auth pages |

### December 2026

| Week | Dates | Key Activities |
|---|---|---|
| W09 | Dec 01–07 | Backend: course + attendance; FE: student dashboard start |
| W10 | Dec 08–14 | Backend: grades; FE: student dashboard complete |
| W11 | Dec 15–21 | Backend: twin sync + notifications; FE: teacher dashboard |
| W12 | Dec 22–31 | Backend: reporting; FE: advisor + admin; AI: data pipeline |

---

## 5. Schedule Risk Buffers

| Phase | Buffer Built In | Reason |
|---|---|---|
| AI/ML Development | +2 weeks | Model training and evaluation can be unpredictable |
| Integration | +1 week | Cross-component bugs often emerge |
| Testing | +1 week | Regression and security testing can uncover blockers |
| Overall | +2 weeks | University exam periods may reduce availability |
