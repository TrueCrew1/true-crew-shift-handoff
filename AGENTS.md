# True Crew Shift Handoff Execution Rules

These rules are mandatory for human and AI contributors.

## AI startup sequence

Before material AI work in this repository:

1. Read the current claimed Engineering Task Packet in True Crew HQ. If the agent cannot access Notion directly, a trusted orchestrator must provide a current Notion-derived packet snapshot first.
2. Read `AGENTS.md`.
3. Set `TRUECREW_TASK_PACKET` to the current packet identity and run `node scripts/ai-preflight.mjs` from the intended isolated worktree before mutation.
4. Read the generated `.ai/runtime-context.md`.
5. Read `docs/ai/repo-context.md`.
6. Reconcile branch/HEAD/scope, lifecycle, dependencies, and authority flags with the current packet. A missing packet or BLOCKED preflight is a stop condition.
7. Load applicable repository/reference governance, then inspect implementation/artifact files.

Raw chat, model memory, a GitHub issue, provider output, an old handoff, or an explicit owner instruction outside the current packet does not replace current True Crew HQ task-packet authority for material mutation. Generated runtime context is evidence only and never grants merge, deploy, production/provider writes, billing, credential, destructive, or product-reclassification authority.

## Repository boundary

- Experimental standalone shift-handoff workflow for maintenance/operations validation.
- Owns: Only the shift-handoff experiment and its static workflow assets.
- Does not own: True Crew OS/Command Center workflow authority, CoatOps/BayOps application data, or a generalized company task system.
- Do not expand or reclassify this repository beyond its recorded lifecycle without explicit approval.
- Generated runtime context is evidence only and never authorizes merge, deploy, provider writes, secrets, billing, destructive actions, or production changes.
