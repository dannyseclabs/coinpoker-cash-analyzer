# AGENTS.md

## Project Overview

This project is a local-first CoinPoker NLH Cash Game 6-max hand history analyzer.

The app imports CoinPoker `.txt` hand history files, parses them into structured data, calculates poker statistics, displays a dashboard, and detects basic leaks using rule-based logic.

V1 scope is intentionally narrow:

- CoinPoker only
- NLH only
- Cash Games only
- 6-max only
- Hero-only analysis
- Local file upload only
- No backend initially
- No authentication
- No payments
- No solver
- No RAG
- No AI coach in V1

The goal of V1 is data correctness, parser reliability, and a clean analytical dashboard.

---

## Core Rule

Before making changes:

1. Read this `AGENTS.md`.
2. Inspect the project structure.
3. Explain the planned file changes.
4. Modify only the files required for the task.
5. Avoid unrelated rewrites.
6. Preserve existing behavior unless the task explicitly requires changing it.
7. Add or update tests for parser/statistics logic when relevant.

---

## Recommended Reasoning Mode

Use:

- Medium reasoning for small UI changes.
- High reasoning for parser, statistics, and data model changes.
- Extra high reasoning for architecture, parsing edge cases, and refactors.

---

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Zustand
- Vitest

---

## V1 Feature Scope

### Upload

The user can upload one `.txt` CoinPoker hand history file.

The app should validate:

- file is `.txt`
- file contains `CoinPoker Hand`
- file contains `NLH`
- file contains `Hero`

### Parser

Parser should extract:

- hand ID
- date
- table name
- stakes
- button seat
- players
- Hero seat
- Hero cards
- Hero position
- preflop actions
- flop actions
- turn actions
- river actions
- board
- showdown
- total pot
- rake
- Hero net result

### Statistics

V1 should calculate:

- hands played
- total profit
- BB/100
- VPIP
- PFR
- 3Bet %
- Fold to 3Bet %
- Limp %
- CBet Flop %
- Fold to CBet Flop %
- WTSD
- W$SD
- position stats

### Dashboard

V1 should include:

- overview cards
- preflop stats
- postflop stats
- position table
- biggest winning hands
- biggest losing hands
- hand list
- hand detail view

### Leak Detector

V1 uses rule-based detection only.

Initial leaks:

- VPIP too low
- VPIP/PFR gap too high
- 3Bet too low
- Limp too high
- CBet too low
- WTSD too high
- W$SD too low

---

## Architecture Guidelines

Keep parser logic separate from UI.

Preferred structure:

```text
src/
  app/
  components/
  lib/
    parser/
    stats/
    leaks/
  types/
  tests/
    fixtures/
```
