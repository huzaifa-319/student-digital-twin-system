# Risk Register / Risk Management Plan

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-RSK-006  
**Standard:** IEEE/ISO/IEC 16085:2006 — Life Cycle Management: Risk Management  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Risk Management Approach

### 1.1 Process

1. **Identify** — Brainstorm risks at the start of each phase and continuously during the project.  
2. **Analyze** — Assess each risk for probability and impact.  
3. **Prioritize** — Use risk exposure (Probability × Impact) to rank risks.  
4. **Plan responses** — Define mitigate / avoid / transfer / accept strategies.  
5. **Monitor** — Review risk register monthly; update status.

### 1.2 Probability Scale

| Level | Label | Description |
|---|---|---|
| 1 | Very Low | Unlikely; < 10% chance |
| 2 | Low | Possible; 10–30% chance |
| 3 | Medium | Likely; 30–60% chance |
| 4 | High | Very likely; 60–80% chance |
| 5 | Very High | Almost certain; > 80% chance |

### 1.3 Impact Scale

| Level | Label | Description |
|---|---|---|
| 1 | Negligible | No effect on schedule, scope, or quality |
| 2 | Minor | Minor delay (< 1 week); workaround available |
| 3 | Moderate | 1–2 week delay; requires plan adjustment |
| 4 | Major | 2–4 week delay; significant scope impact |
| 5 | Critical | Project failure or complete redesign required |

### 1.4 Risk Exposure = Probability × Impact

| Exposure | Level | Action required |
|---|---|---|
| 1–4 | Low | Accept; log and monitor |
| 5–9 | Medium | Plan mitigation; review monthly |
| 10–16 | High | Active mitigation; weekly monitoring |
| 17–25 | Critical | Immediate action; escalate to supervisor |

---

## 2. Risk Register

| ID | Risk | Category | Probability | Impact | Exposure | Response | Status |
|---|---|---|---|---|---|---|---|
| R-001 | Insufficient historical data for AI training (< 100 records) | Data | 4 | 4 | 16 High | Implement rule-based fallback; communicate data need to institution early | Open |
| R-002 | AI model accuracy below threshold (MAE > 0.30 or F1 < 0.75) | Technical | 3 | 4 | 12 High | Tune hyperparameters; collect more features; use ensemble methods | Open |
| R-003 | Team member unavailability (illness, exams) | Resource | 3 | 3 | 9 Medium | Cross-train team; document all code; reduce scope if needed | Open |
| R-004 | Integration failures between Node.js and Python AI service | Technical | 3 | 3 | 9 Medium | Define clear API contract early; integration tests from day one; mock AI service in FE dev | Open |
| R-005 | University server not provisioned in time for deployment | Infrastructure | 2 | 4 | 8 Medium | Request server provisioning by Week 25; have backup (local demo) | Open |
| R-006 | PostgreSQL migration failure on production | Technical | 2 | 4 | 8 Medium | Test all migrations on staging; keep pre-migration snapshot | Open |
| R-007 | Single developer / team of 1 | Resource | 4 | 3 | 12 High | Reduce scope for MVP; prioritize core features (twin + grades + risk) | Open |
| R-008 | Scope creep from supervisor or self-initiated | Scope | 3 | 3 | 9 Medium | Enforce change control process; maintain baselined SRS | Open |
| R-009 | Security vulnerability discovered in deployed system | Security | 2 | 4 | 8 Medium | OWASP ZAP scan before go-live; follow OWASP Top 10 mitigations | Open |
| R-010 | JWT secret or database credentials accidentally committed to Git | Security | 2 | 5 | 10 High | .gitignore for .env files; pre-commit hook to scan for secrets | Open |
| R-011 | Third-party library vulnerability (npm/pip audit) | Security | 3 | 2 | 6 Medium | Run npm audit + pip-audit weekly; update promptly | Open |
| R-012 | Student data privacy breach | Privacy | 1 | 5 | 5 Medium | Role-based access control; encryption at rest; anonymized AI training data | Open |
| R-013 | Performance bottleneck at peak usage (semester start) | Performance | 3 | 3 | 9 Medium | Index all FK columns; cache digital twin values; test with k6 before go-live | Open |
| R-014 | React state management complexity causing UI bugs | Technical | 2 | 2 | 4 Low | Use Zustand for global state; component-level state otherwise | Open |
| R-015 | Prisma schema migration conflict in team development | Technical | 3 | 2 | 6 Medium | Only one developer manages migrations; peer review before run | Open |
| R-016 | AI bias flagged in risk classification (unfair to a demographic group) | Ethics | 2 | 4 | 8 Medium | Bias evaluation in training pipeline; F1 per subgroup ≥ 0.65 | Open |
| R-017 | University exam period reduces team availability | Schedule | 4 | 3 | 12 High | Build exam-period buffers into schedule (Dec, Apr/May) | Open |
| R-018 | Loss of development work (machine failure, no backup) | Infrastructure | 2 | 4 | 8 Medium | Push to GitHub daily; never work only locally | Open |
| R-019 | CORS / networking misconfiguration blocks frontend–backend | Technical | 2 | 2 | 4 Low | Set CORS config in early backend setup; test with actual frontend URL | Open |
| R-020 | PDF report generation is slow (> 10 seconds for large reports) | Performance | 2 | 2 | 4 Low | Async report generation; deliver via download link | Open |

---

## 3. Mitigation Action Plans (High-Exposure Risks)

### R-001: Insufficient Training Data

**Action plan:**
1. Identify the institution's data custodian in Week 1.
2. Request at minimum 3 years of anonymized grade and attendance records.
3. If < 100 records available by Week 18 (start of AI development), activate the rule-based fallback system:
   - If CGPA < 2.0 → High Risk
   - If attendance < 75% → High Risk
   - Recommendations based on static rule tables

**Owner:** AI Developer / Project Lead  
**Deadline:** 2026-12-01 (data request) / 2027-01-01 (fallback decision)

---

### R-002: AI Accuracy Below Threshold

**Action plan:**
1. Evaluate model on held-out test set after each training run.
2. If MAE > 0.30 after first training: try feature engineering improvements, ridge/lasso regularization.
3. If still failing after 2 iterations: ensemble GPA predictor + rule-based → weighted combination.
4. If F1 < 0.75: adjust class threshold; use SMOTE if classes are imbalanced.

**Owner:** AI Developer  
**Deadline:** 2027-02-15 (final model lock)

---

### R-007: Single Developer

**Scope reduction plan (if team = 1):**

| Feature | Priority | Keep in MVP? |
|---|---|---|
| Student login + digital twin view | Critical | Yes |
| Teacher attendance marking | Critical | Yes |
| Grade entry + GPA computation | Critical | Yes |
| At-risk classification | Critical | Yes |
| GPA prediction | High | Yes |
| Recommendations | High | Yes |
| Career readiness tracking | Medium | Optional |
| Parent portal | Low | No |
| Reports PDF generation | Medium | Optional (CSV only) |
| Real-time notifications | Low | No |

**Owner:** Project Lead  
**Decision deadline:** 2026-10-15 (after team size is confirmed)

---

### R-010: Secrets in Git

**Prevention measures:**
1. Add `.env`, `*.env`, `.env.*` to `.gitignore` on Day 1.
2. Install `git-secrets` or `detect-secrets` pre-commit hook.
3. Store all secrets in environment variables only; never hardcode.
4. If accidentally committed: immediately rotate the secret; use `git filter-branch` or BFG Repo-Cleaner to remove from history.

**Owner:** Project Lead  
**Status:** Set up in Week 1 during repo initialization.

---

## 4. Risk Monitoring Log

| Date | Risk ID | Status Change | Notes |
|---|---|---|---|
| 2026-10-01 | All | Open | Initial register created |
| *(to be updated monthly)* | | | |
