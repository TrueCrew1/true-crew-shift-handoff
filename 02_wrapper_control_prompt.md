# 02 — Wrapper Control Prompt (run before every phase)

> Template. Paste this BEFORE every build, verification, repair, or stabilization phase.
> This is NOT a phase prompt. The actual work order arrives in the phase prompt that follows.
> Replace/extend this content to match your exact handoff if needed.

Control rules for the phase prompt that follows this message:

1. Obey `.cursor/rules.md` (locked build order, prompt usage rules, guardrails, stack baseline).
2. Work on exactly ONE phase. Do not start, scaffold, or "prep" any later phase.
3. Do not do out-of-order module work. If the requested phase depends on an earlier phase
   that is not built, stop and report the blocker instead of building ahead.
4. Do not drift into speculative redesign of existing, working code.
5. Stay within the recommended stack baseline unless the phase prompt explicitly overrides it.
6. Make focused commits and keep changes reviewable.

Respond in this format:
1. What you implemented.
2. Files created or changed.
3. Assumptions kept fixed.
4. Blockers or follow-up needs.
5. Whether the phase is ready for manual review.

Acknowledge these control rules, then apply them to the single phase prompt that follows.
