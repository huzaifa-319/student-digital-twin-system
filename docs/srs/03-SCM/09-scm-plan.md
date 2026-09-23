# Software Configuration Management Plan (SCM Plan)

**Project:** Student Digital Twin System (SDTS)  
**Document ID:** SDTS-SCM-009  
**Standard:** IEEE/ISO/IEC 828:2012 — Systems and Software Engineering: Configuration Management  
**Version:** 1.0  
**Date:** 2026-10-01

---

## 1. Introduction

### 1.1 Purpose

This SCM Plan defines the policies and procedures for managing the configuration of all SDTS artifacts throughout the project lifecycle. It ensures that:
- All artifacts are uniquely identified and versioned.
- Changes are controlled and traceable.
- The integrity of baselines is maintained.
- Authorized versions are consistently available.

### 1.2 Scope

This plan covers: source code, database migrations, configuration files, documentation, AI model files, test suites, and deployment scripts.

### 1.3 Definitions

| Term | Definition |
|---|---|
| CI | Configuration Item — any artifact placed under configuration control |
| Baseline | A formally approved snapshot of one or more CIs |
| CCB | Change Control Board — the body that approves changes to baselined items |
| Version | A unique identifier for a specific state of a CI |
| Change Request | A formal request to modify a baselined CI |

---

## 2. SCM Management

### 2.1 Roles and Responsibilities

| Role | Person | SCM Responsibilities |
|---|---|---|
| SCM Manager | Project Lead | Maintains CI register, enforces SCM policy, manages baselines |
| Developer | All team | Follows branching policy, writes commit messages, tags releases |
| Reviewer | Any team member | Approves pull requests before merge to develop |
| CCB Chair | Project Lead + Supervisor | Approves changes to baselined items |

### 2.2 SCM Tools

| Tool | Purpose |
|---|---|
| Git | Version control for all source files |
| GitHub | Remote repository, PR reviews, issue tracker |
| GitHub Releases | Tagging and releasing versioned builds |
| GitHub Actions | CI/CD — automated tests on each push/PR |
| npm / pip | Dependency version locking (package-lock.json, requirements.txt) |

---

## 3. SCM Activities

### 3.1 Configuration Identification

All configuration items are listed in [11-configuration-items.md](11-configuration-items.md).

**Naming conventions:**

| Artifact type | Convention | Example |
|---|---|---|
| Source file | kebab-case with extension | `auth.controller.ts` |
| Migration file | `YYYYMMDDHHMMSS_description` | `20261115093000_init_schema` |
| AI model file | `{model}_{YYYY}_{semester}.pkl` | `gpa_model_2026_fall.pkl` |
| Release tag | `vMAJOR.MINOR.PATCH` | `v1.0.0` |
| Document | kebab-case | `01-project-management-plan.md` |

### 3.2 Configuration Control

#### 3.2.1 Branching Strategy

```
main          ←── stable, production-ready code only
  ↑
develop       ←── integration branch (always potentially releasable)
  ↑
feature/<name>  ←── individual feature development
fix/<name>      ←── bug fixes
hotfix/<name>   ←── emergency fixes to main
```

**Branch policies:**
- No direct commits to `main` or `develop` (enforced via GitHub branch protection)
- All changes to `develop` via pull request with at least 1 reviewer approval
- All changes to `main` via pull request from `develop` only
- Feature branches deleted after merge

#### 3.2.2 Commit Message Convention

```
type(scope): short description

Examples:
  feat(auth): add JWT refresh token endpoint
  fix(grades): correct GPA rounding to 2 decimal places
  test(attendance): add unit test for duplicate mark
  docs(api): add endpoint description for /twin/:id
  chore(deps): upgrade prisma to 5.6.0
```

Types: `feat`, `fix`, `test`, `docs`, `chore`, `refactor`, `perf`

#### 3.2.3 Change Control Process

For changes to **baselined items**, the Change Control process defined in [10-change-management.md](10-change-management.md) must be followed before implementation.

For changes to **non-baselined items** (active development branches), the standard PR review process applies.

### 3.3 Configuration Status Accounting

The CI Register in [11-configuration-items.md](11-configuration-items.md) tracks the current version of each CI and its baseline status. It is updated:
- When a new CI is placed under control
- When a new version is released
- When a baseline is created or updated

### 3.4 Configuration Audits

#### Functional Configuration Audit (FCA)
Conducted before each milestone acceptance. Verifies:
- Does the software conform to its requirements (SRS)?
- Are all test cases passing?
- Is the RTM complete and up-to-date?

#### Physical Configuration Audit (PCA)
Conducted at release/deployment. Verifies:
- Are all files in the release tag consistent with what was tested?
- Are all configuration files (.env templates) documented?
- Do the migration files match the current schema?

---

## 4. Dependency Management

### 4.1 Backend (Node.js)

- `package-lock.json` committed to Git — exact versions locked
- Major upgrades: create a `chore(deps): upgrade X` PR; run all tests
- `npm audit` run weekly; critical vulnerabilities fixed within 5 days

### 4.2 Frontend

- Same policy as backend; `package-lock.json` committed

### 4.3 Python AI Service

- `requirements.txt` with pinned versions committed to Git
- `pip-audit` run weekly

### 4.4 Database

- All schema changes done via Prisma migrations only — never manual DDL on production
- Migration files committed to Git and never modified after applying

---

## 5. CI/CD Pipeline

```
Push to feature/* or fix/*:
  → Run unit tests (Jest + Vitest + Pytest)
  → Run linter (ESLint + mypy)
  → If pass: PR can be created

Pull Request to develop:
  → Run unit tests
  → Run integration tests
  → Code review approval required
  → If pass + approved: merge allowed

Merge to develop:
  → Deploy to staging environment (if available)
  → Run smoke tests

Merge to main (release):
  → Tag with version (vX.Y.Z)
  → GitHub Release created
  → Deployment to production (manual trigger)
```

---

## 6. SCM Plan Maintenance

This plan is reviewed at each milestone and updated as needed. All changes to the SCM Plan itself are version-controlled in Git and tracked in the CI Register (CI-013).
