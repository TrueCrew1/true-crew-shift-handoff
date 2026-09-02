# Repository AI Context — True Crew Shift Handoff

Status: repository-local AI context. Engineer-standard remains the cross-repository engineering authority.

## Repository identity

- Repository: `TrueCrew1/true-crew-shift-handoff`
- Product/role: Experimental standalone shift-handoff workflow for maintenance/operations validation.
- Lifecycle: experimental
- Canonical True Crew agent runtime: Node `24.19.0`

## Ownership

**Owns:** Only the shift-handoff experiment and its static workflow assets.

**Does not own:** True Crew OS/Command Center workflow authority, CoatOps/BayOps application data, or a generalized company task system.

## Data/runtime boundary

Static experiment; no canonical company/customer database authority.

## Deployment boundary

Do not promote as a broader True Crew platform component without explicit product reclassification and qualification.

## AI execution contract

1. Material mutation requires a current claimed Engineering Task Packet from True Crew HQ. If direct Notion access is unavailable, a trusted orchestrator must provide a current Notion-derived packet snapshot before work starts.
2. Set `TRUECREW_TASK_PACKET` to the current packet identity and run `node scripts/ai-preflight.mjs` from the intended isolated worktree before material mutation.
3. Treat a missing task packet or `BLOCKED` result as a stop condition. Never reset/stash/clean/rebase/discard unexpected state or substitute raw chat/model memory to make preflight pass.
4. When the packet supplies branch/base expectations, set `TRUECREW_EXPECTED_BRANCH` and `TRUECREW_EXPECTED_HEAD` before preflight and reconcile the generated runtime context with the packet.
5. `--allow-dirty` and `--allow-production-branch` are read-only/recovery snapshot controls only; they never authorize mutation.
6. Reference/experimental lifecycle is a real constraint: do not expand a reference or experiment into a product/runtime without explicit portfolio reclassification.
7. Baseline validation: Static HTML/CSS/JS validation appropriate to the changed surface; preserve minimal experiment scope.

## Durable documents to load when applicable

- `README.md`

## Cross-system rule

Provider and customer-product records remain owned by their source systems. Reference code never gains True Crew production authority merely because it is stored in a True Crew repository.
