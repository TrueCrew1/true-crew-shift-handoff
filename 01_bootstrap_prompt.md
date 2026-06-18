# 01 — Bootstrap Prompt (fresh chat / context re-entry)

> Template. Paste this when starting a NEW chat or re-entering the repo after context loss.
> This is NOT a build prompt. Do not implement features from this prompt.
> Replace/extend this content to match your exact handoff if needed.

You are working on **True Crew**. Before doing anything else:

1. Read `.cursor/rules.md` and treat it as the standing project contract.
2. Inspect the repository as it currently exists (files, stack, what is and is not built).
3. Do NOT write or change any code in response to this prompt.

Then summarize repo readiness:
- Current stack vs. the recommended stack baseline in `.cursor/rules.md`.
- Which phases (per the locked build order) appear complete, partial, or not started.
- Any setup/config gaps that would block the next phase (env vars, Supabase project, etc.).
- The single next phase that should be worked on, per the locked build order.

Stop after the summary and wait for the wrapper control prompt (`02_wrapper_control_prompt.md`)
followed by a single phase prompt.
