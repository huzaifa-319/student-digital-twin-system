# Change Management / Change Control

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-CHG-010  
**Standard:** IEEE/ISO/IEC 828:2012 §4.3 — Configuration Control  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Purpose

This document defines the change control process for the SDTS project. It governs how proposed changes to baselined project artifacts are requested, evaluated, approved or rejected, and implemented.

---

## 2. When Change Control Applies

Change control is required for modifications to any **baselined configuration item**. The following items are under change control once baselined:

| Baselined Item | Baseline Event |
|---|---|
| Software Requirements Specification (SRS) | M2 — SRS Accepted |
| Architecture Documentation | M3 — Design Accepted |
| Database Schema (migrations) | M3 — Design Accepted |
| API Specification | M3 — Design Accepted |
| Test Plan | M3 — Design Accepted |
| Any released code tag (vX.Y.Z) | At release |

Changes to items **not yet baselined** (active development) follow the standard Git PR review process only.

---

## 3. Change Control Board (CCB)

| Role | Member | Voting |
|---|---|---|
| CCB Chair | Project Lead | Yes |
| Academic Representative | University Supervisor | Yes |
| Technical Lead | Project Lead (or senior developer) | Yes |

**Quorum:** 2 of 3 members for a valid decision.  
**Approval threshold:** Majority vote.

---

## 4. Change Request Process

### Step 1 — Raise Change Request

Anyone on the project team (or the supervisor) may raise a Change Request (CR). Fill in the CR form (Section 7) and submit it to the Project Lead.

### Step 2 — Initial Triage (Project Lead, within 2 working days)

Project Lead reviews the CR:
- If **invalid** (duplicate, already addressed, out of scope) → reject immediately and notify submitter.
- If **trivial** (documentation typo, no semantic change) → approve directly, no CCB needed.
- Otherwise → assign CR number, schedule CCB review.

### Step 3 — Impact Assessment (Technical Lead, 2–5 working days)

Assess the impact across:
- **Schedule:** additional days required
- **Scope:** features added / removed
- **Cost:** additional effort hours
- **Risk:** any new risks introduced
- **Requirements:** which SRS requirements are affected
- **Testing:** which test cases need to be added or updated

### Step 4 — CCB Decision (within 5 working days of impact assessment)

CCB votes:
- **Approved:** CR enters implementation queue; RTM and SRS updated.
- **Approved with modifications:** Specific conditions placed on the change.
- **Deferred:** Change is valid but scheduled for a future release.
- **Rejected:** Change denied; reason documented.

### Step 5 — Implementation

- Developer implements the change on a `feature/cr-NNN` branch.
- RTM, SRS, and affected documents updated as part of the change.
- Standard PR review applies.

### Step 6 — Verification

- The change is verified against the updated requirements.
- Test cases updated or added in the test plan.
- CI Register and RTM updated to reflect new versions.

### Step 7 — Closure

Project Lead marks the CR as Closed. CI Register updated with new baseline version.

---

## 5. Change Request Status Flow

```
[Submitted] → [Triaged] → [Under Assessment] → [Pending CCB] → [Approved / Rejected / Deferred]
                                                                        ↓ (if Approved)
                                                                 [In Implementation]
                                                                        ↓
                                                                   [Verified]
                                                                        ↓
                                                                    [Closed]
```

---

## 6. Change Log

| CR-ID | Date | Title | Submitted By | Status | Decision Date |
|---|---|---|---|---|---|
| CR-001 | (to be filled) | | | | |

---

## 7. Change Request Form Template

```
────────────────────────────────────────────────────────
SDTS CHANGE REQUEST FORM
────────────────────────────────────────────────────────
CR Number:           CR-___
Date Submitted:      ___________________
Submitted By:        ___________________
Priority:            [ ] Critical  [ ] High  [ ] Medium  [ ] Low

CHANGE DESCRIPTION
Title:               ___________________
Affected Item(s):    ___________________  (SRS / API Spec / DB Schema / Code)
Baseline Version:    ___________________
Reason for Change:   ___________________
Description:
  ___________________________________________________
  ___________________________________________________

IMPACT ASSESSMENT (completed by Technical Lead)
Schedule Impact:     ___  working days
Effort Impact:       ___  hours
Affected SRS FRs:    ___________________
Affected Test Cases: ___________________
Risks Introduced:    ___________________

CCB DECISION
Date:                ___________________
Decision:            [ ] Approved  [ ] Approved with Modifications
                     [ ] Deferred  [ ] Rejected
Conditions / Notes:  ___________________

Signatures:
  CCB Chair:         ___________________
  Academic Rep:      ___________________
  Technical Lead:    ___________________

IMPLEMENTATION RECORD
Developer:           ___________________
Branch:              feature/cr-___
Completed Date:      ___________________
Verified By:         ___________________
Closed Date:         ___________________
────────────────────────────────────────────────────────
```

---

## 8. Emergency Change Procedure

For critical production defects (data corruption, security breach, system down):

1. Project Lead declares Emergency Change.
2. Fix implemented on `hotfix/<name>` branch.
3. Deployed to production after minimum 1 reviewer approval.
4. CR form completed retrospectively within 24 hours.
5. CCB review conducted within 3 working days.
