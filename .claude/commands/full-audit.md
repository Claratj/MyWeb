---
description: Orchestrated read-only audit — collect diff/tsc/build once, then run pr-auditor, health-checker, token-auditor and a11y-auditor in parallel and synthesize.
argument-hint: "[base branch, default: main]"
allowed-tools: Bash(git*), Bash(npx tsc*), Bash(npm run build), Task, Read
---

Run a full read-only audit. The four auditor subagents are read-only (no Write/Edit/Bash). To avoid every agent re-running the same setup, **YOU (main loop) collect the shared context exactly once**, then fan the agents out in parallel.

## Step 1 — collect shared context ONCE

Base branch = `$1` if provided, else `main`. Run and capture:

1. `git diff <base>...HEAD` and `git diff --stat <base>...HEAD`.
2. `npx tsc --noEmit` — the typecheck gate (capture pass/fail + errors).
3. `npm run build` — the build gate (vite build; capture pass/fail + errors).

The quality gate for this repo is **`tsc --noEmit` + `vite build`** — there is no lint and no test runner; do not run or invent them. Collect this once; the subagents cannot run git/tsc/build themselves.

## Step 2 — launch the four auditors in parallel

In ONE message, send four `Task` calls so they run concurrently:

- **pr-auditor** — pass the full `git diff`, the `tsc --noEmit` output, and the `npm run build` output. Ask for the dimensioned ✅/⚠️/❌ tables + executive summary, scoped to the diff.
- **health-checker** — whole-repo static grep; no diff needed (it greps itself). Pass the base branch for reference only.
- **token-auditor** — self-sufficient; just invoke.
- **a11y-auditor** — self-sufficient; just invoke.

All four must ignore `_archive/`, `TimelineData.json` and `README.md` (their prompts already say so).

## Step 3 — synthesize

Lead with a **consolidated executive summary**: overall verdict, total ❌/⚠️ across all auditors, and the top 5 prioritized fixes (❌ first), each tagged with the auditor that raised it and `file:line`. Then include each auditor's report verbatim under its own heading. Deduplicate overlapping findings (e.g. a hardcoded hex caught by both health-checker and token-auditor) and note the overlap. Do not modify any files — this is an audit.
