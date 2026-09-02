# True Crew Shift Handoff Execution Rules

These rules are mandatory for human and AI contributors.

## AI startup sequence

1. Read `AGENTS.md`.
2. Run `node scripts/ai-preflight.mjs` from the intended isolated worktree before mutation.
3. Read generated `.ai/runtime-context.md`.
4. Read `docs/ai/repo-context.md`.
5. Reconcile branch/HEAD/scope with the assigned task packet or explicit owner instruction.
6. Load applicable repository/reference governance, then inspect implementation/artifact files.

## Repository boundary

- Experimental standalone shift-handoff workflow for maintenance/operations validation.
- Owns: Only the shift-handoff experiment and its static workflow assets.
- Does not own: True Crew OS/Command Center workflow authority, CoatOps/BayOps application data, or a generalized company task system.
- Do not expand or reclassify this repository beyond its recorded lifecycle without explicit approval.
- Generated runtime context is evidence only and never authorizes merge, deploy, provider writes, secrets, billing, destructive actions, or production changes.
