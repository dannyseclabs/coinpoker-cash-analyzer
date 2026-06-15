# AGENTS.md

## Project

CoinPoker Cash Analyzer

Desktop-first poker analytics application for analyzing CoinPoker 6-max NLH cash game hand histories.

Purpose:

- Personal poker improvement
- Session review
- Leak detection
- Portfolio project

This is NOT:

- SaaS
- Real-time HUD
- Multiplayer application
- Mobile-first product

---

# Tech Stack

- Next.js
- React
- TypeScript
- Tailwind
- Vitest

---

# Development Rules

Before making any changes:

1. Read AGENTS.md
2. Inspect existing project structure
3. Explain planned changes
4. List files that will be modified
5. Modify only required files
6. Avoid unrelated refactors

If something works:

- do not rewrite it
- do not redesign architecture
- do not rename files without reason

Priority:

1. Data correctness
2. Poker accuracy
3. Desktop UX
4. Performance
5. Mobile support

---

# Core Product Philosophy

This is a poker analytics tool.

Whenever profit is displayed:

Preferred:

+166 BB
₮3.32

Never:

₮3.32

without BB context.

BB is always the primary metric.

Currency is secondary.

---

# Current Features

## Hand Import

- CoinPoker hand history parser
- Hero detection
- Board parsing
- Action timeline parsing
- Showdown detection

---

## Summary

Main stats:

- Hands Played
- Total Profit
- BB/100
- VPIP
- PFR
- 3BET
- Limp
- CBet Flop
- WTSD
- W$SD

---

## Summary Insights

Insights include:

- Most Profitable Starting Hand
- Worst Starting Hand
- Most Played Starting Hand
- Biggest Winning Hand
- Biggest Losing Hand
- Biggest Splash Pot Won
- Biggest Splash Pot Lost
- Best Position
- Worst Position

Normal insights exclude splash pots.

Splash pots have dedicated insight cards.

---

## Splash Pot System

Location:

src/lib/splashPots.ts

Rules:

potBb = totalPot / bigBlind

Thresholds:

- 300 BB+ = Splash Pot Candidate
- 500 BB+ = Splash Pot

Splash pots:

- count toward profit
- count toward session results
- are excluded from normal biggest win/loss calculations
- have dedicated splash insight cards

Never remove this behavior without explicit request.

---

## Session Detection

Location:

src/lib/sessions.ts

Sessions are generated from hand timestamps.

Rule:

Gap <= 30 minutes:
same session

Gap > 30 minutes:
new session

Session metrics:

- Start Time
- End Time
- Duration
- Hands
- Profit
- BB
- BB/100
- VPIP
- PFR
- WTSD
- Estimated Tables
- Splash Pot Count

Session View button filters Hand Explorer to session hands.

---

## Position Analysis

Metrics:

- Profit
- BB
- BB/100
- VPIP
- PFR
- WTSD
- W$SD

Position cards:

- Best Position
- Worst Position
- Most Active Position

Profit column shows:

BB first
Currency second

Example:

+120 BB
₮2.39

---

## Hole Card Matrix

Purpose:

Starting hand performance analysis.

Metrics:

- BB/100
- Total Profit
- Hands Played
- VPIP Frequency

Color system:

Dark Green:
Strong Positive

Light Green:
Positive

Grey:
No Sample

Light Red:
Negative

Dark Red:
Strong Negative

Matrix drill-down opens hand list for selected starting hand.

---

## Leak Detection

Current leaks:

- Too Passive Preflop
- High WTSD
- Heavy BB Losses

Leak logic should remain conservative.

Avoid generating leaks from extremely small samples.

Future versions should use confidence scoring.

---

## Hand Explorer

Primary investigation tool.

Current filters:

- Position
- Result
- Showdown
- Splash Pots
- Hero Cards
- Date
- Sort
- Direction

Current table:

- Hand ID
- Date
- Table
- Blinds
- Position
- Hero Cards
- Board
- Pot
- Hero Net
- Showdown

Display format:

BB first
Currency second

Example:

14.5 BB
₮0.29

---

## Hand Detail Drawer

Shows:

### Summary

- Stakes
- Table
- Hero Cards
- Hero Position
- Hero Net
- Pot
- Result
- Showdown
- Ended On
- Players

### Players Table

Shows:

- Seat
- Player
- Stack

Stacks displayed:

BB first
Currency second

### Board

- Flop
- Turn
- River

### Action Timeline

Streets:

- Preflop
- Flop
- Turn
- River

Current rule:

Player identifiers may remain anonymized.

Future version should optionally show seat labels.

---

# Current Roadmap

## V1.1

Accuracy & Fixes

- Confidence scores
- Sample thresholds
- Better leak validation
- Better sorting/filtering
- Hand detail improvements

---

## V1.5

UX Upgrade

- Better matrix drilldown
- Better hand review UX
- Improved insight cards

---

## V2

Progress System

- Skill Score
- Poker Rank
- Progress Tracking
- Session History
- Achievements

---

## V3

Advanced Analytics

- Profit Over Time
- BB/100 Over Time
- Activity Calendar
- Period Comparison
- Advanced Leak Analysis
- Session Dashboard

---

## Future AI Features

Planned:

- Session review
- Leak explanations
- Study recommendations
- Poker quizzes
- Hand review assistant
- Personalized improvement plans

AI should never provide GTO certainty from small samples.

Always consider sample size first.

---

# Important UX Rules

Target products:

- PokerTracker
- Holdem Manager
- GTO Wizard

Avoid:

- SaaS landing page design
- Startup dashboards
- Excessive whitespace
- Decorative animations

Goal:

Dense information.
Fast scanning.
Professional poker software.
