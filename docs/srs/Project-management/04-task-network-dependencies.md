# Task Network / Activity Dependencies

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-NET-004  
**Standard:** IEEE/ISO/IEC 16326:2009 (Annex B — Schedule Planning)  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Activity List

| Act ID | Activity Name | WBS Ref | Duration (days) | Predecessor(s) | Successor(s) |
|---|---|---|---|---|---|
| A01 | Project Planning | 1.1.1 | 5 | — | A02, A03 |
| A02 | Stakeholder Analysis | 1.2.1 | 3 | A01 | A03 |
| A03 | Functional Requirements | 1.2.2 | 7 | A02 | A04 |
| A04 | Non-Functional Requirements | 1.2.3 | 3 | A03 | A05 |
| A05 | SRS Documentation | 1.2.4 | 10 | A03, A04 | A06 |
| A06 | SRS Review & Baseline | 1.2.5 | 2 | A05 | A07, A08 |
| A07 | RTM Creation | 1.2.6 | 3 | A06 | A26 |
| A08 | Architecture Design | 1.3.1 | 7 | A06 | A09, A10, A11 |
| A09 | Database Design | 1.3.2 | 5 | A08 | A15 |
| A10 | API Design | 1.3.3 | 4 | A08 | A16 |
| A11 | UI/UX Wireframing | 1.3.4 | 5 | A08 | A14 |
| A12 | AI/ML Design | 1.3.5 | 3 | A08 | A19 |
| A13 | Design Baseline | (milestone) | 1 | A09, A10, A11, A12 | A14, A15, A16, A19 |
| A14 | FE Scaffolding | 1.4.1 | 1 | A11, A13 | A16-FE |
| A15 | DB Schema & Migrations | 1.5.2 | 3 | A09, A13 | A16-BE |
| A16 | BE Scaffolding | 1.5.1 | 1 | A13 | A17 |
| A17 | Auth Module (BE) | 1.5.3 | 3 | A15, A16 | A18 |
| A18 | Student Module (BE) | 1.5.4 | 4 | A17 | A20 |
| A19 | AI Data Pipeline | 1.6.1 | 4 | A12, A13 | A20-AI |
| A20 | Course Module (BE) | 1.5.5 | 4 | A18 | A21 |
| A21 | Attendance Module (BE) | 1.5.6 | 3 | A20 | A22 |
| A22 | Grades Module (BE) | 1.5.7 | 4 | A21 | A23 |
| A23 | Twin Sync Service (BE) | 1.5.8 | 4 | A22 | A24 |
| A24 | Notification Service (BE) | 1.5.9 | 3 | A23 | A25 |
| A25 | Reporting Service (BE) | 1.5.10 | 4 | A24 | A29 |
| A26 | Auth Pages (FE) | 1.4.2 | 2 | A14 | A27 |
| A27 | Student Dashboard (FE) | 1.4.3 | 6 | A26 | A28 |
| A28 | Teacher Dashboard (FE) | 1.4.4 | 5 | A27 | A30 |
| A29 | Feature Engineering (AI) | 1.6.2 | 3 | A19 | A31 |
| A30 | Advisor Dashboard (FE) | 1.4.5 | 4 | A28 | A34 |
| A31 | GPA Model (AI) | 1.6.3 | 6 | A29 | A32 |
| A32 | Risk Classifier (AI) | 1.6.4 | 6 | A31 | A33 |
| A33 | Recommendation Engine (AI) | 1.6.5 | 6 | A32 | A35 |
| A34 | Admin Panel (FE) | 1.4.6 | 5 | A30 | A36 |
| A35 | Model Evaluation (AI) | 1.6.6 | 3 | A33 | A37 |
| A36 | Reports & Charts (FE) | 1.4.7 | 4 | A34 | A38 |
| A37 | Flask API (AI) | 1.6.7 | 3 | A35 | A40 |
| A38 | Notifications UI (FE) | 1.4.8 | 2 | A36 | A39 |
| A39 | Frontend Complete | (milestone) | 1 | A38 | A40 |
| A40 | FE-BE Integration | 1.7.1 | 4 | A25, A39, A37 | A41 |
| A41 | BE-AI Integration | 1.7.2 | 3 | A40 | A42 |
| A42 | Twin Validation | 1.7.3 | 2 | A41 | A43 |
| A43 | System Bug Fixing | 1.7.4 | 5 | A42 | A44 |
| A44 | Integration Tests | 1.8.4 | 4 | A43 | A45 |
| A45 | System Tests | 1.8.5 | 5 | A44 | A46 |
| A46 | Performance Tests | 1.8.6 | 3 | A45 | A47 |
| A47 | Security Tests | 1.8.7 | 3 | A45 | A48 |
| A48 | UAT | 1.8.8 | 3 | A46, A47 | A49 |
| A49 | Environment Setup | 1.9.1 | 2 | A48 | A50 |
| A50 | Deploy All Components | 1.9.2–1.9.5 | 3 | A49 | A51 |
| A51 | Smoke Tests | 1.9.6 | 1 | A50 | A52 |
| A52 | User Manual | 1.10.7 | 6 | A48 | A53 |
| A53 | Project Closeout | 1.1.5 | 3 | A51, A52 | END |

---

## 2. Critical Path Analysis

The critical path is the longest path through the network with zero total float.

### Critical Path (0 float)

```
A01 → A02 → A03 → A04 → A05 → A06 → A08 → A09 → A13 → A15
→ A16 → A17 → A18 → A20 → A21 → A22 → A23 → A24 → A25
→ A40 → A41 → A42 → A43 → A44 → A45 → A46 → A48
→ A49 → A50 → A51 → A53
```

**Critical path duration:** ~105 working days (~21 weeks)  
**Spans:** October 2026 → March 2027 (with buffer weeks remaining before May 2027)

### Float Analysis Summary

| Activity | Total Float (days) | Status |
|---|---|---|
| A01–A06 (Requirements) | 0 | Critical |
| A08–A09–A15 (DB Chain) | 0 | Critical |
| A16–A25 (Full Backend Chain) | 0 | Critical |
| A11, A14, A26–A38 (Frontend Chain) | ~5 | Near-critical |
| A12, A19, A29–A37 (AI Chain) | ~10 | Has float |
| A07 (RTM) | ~10 | Has float |
| A10 (API Design) | ~5 | Near-critical |

---

## 3. Network Diagram (Simplified)

```
[A01]──►[A02]──►[A03]──►[A04]──►[A05]──►[A06]────────────►[A07]
                                            │
                                         [A08]
                                    ┌──────┼────────┐
                                  [A09]  [A10]    [A11]──►[A14]
                                    │      │         │       │
                                  [A13]◄───┴─────────┘    [A26]
                                    │                        │
                       ┌────────────┤                      [A27]
                     [A15]        [A12]──►[A19]──►[A29]     │
                       │                    │      [A31]   [A28]
                     [A16]──►[A17]──►[A18]  │      [A32]     │
                               ▼            │      [A33]   [A30]
                             [A20]──►[A21]──►[A22]  │      [A34]
                               ▼             ▼      │      [A36]
                             [A23]──►[A24]──►[A25]  │      [A38]──►[A39]
                                              │     ▼
                                            [A37] [A35]
                                              └────┘
                                               ▼
                                             [A40]──►[A41]──►[A42]──►[A43]
                                                               ▼
                                                             [A44]──►[A45]
                                                                ├──►[A46]──►[A48]──►[A49]──►[A50]──►[A51]
                                                                └──►[A47]──────────────────────────────┘
                                                                                        │
                                                                                      [A52]
                                                                                        │
                                                                                      [A53]
```

---

## 4. Parallel Workstreams

The project benefits from three parallel development tracks after the design baseline (A13):

| Track | Activities | Can Run In Parallel With |
|---|---|---|
| Backend | A15–A25 | Frontend, AI |
| Frontend | A14, A26–A39 | Backend, AI |
| AI/ML | A19, A29–A37 | Backend, Frontend |

All three tracks converge at **A40 (FE-BE Integration)** and **A41 (BE-AI Integration)**.

---

## 5. Activity Duration Assumptions

- Working days: Monday–Friday (5 days/week)
- Available hours per day: 4 hours (part-time university project)
- Activities can run in parallel when performed by different team members
- University exam/holiday periods account for built-in schedule buffers
