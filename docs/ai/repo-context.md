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

1. Run `node scripts/ai-preflight.mjs` from the intended isolated worktree before material mutation.
2. Treat `BLOCKED` as a stop condition. Never reset/stash/clean/rebase/discard unexpected state to make the preflight pass.
3. When a packet supplies branch/base expectations, set `TRUECREW_EXPECTED_BRANCH`, `TRUECREW_EXPECTED_HEAD`, and `TRUECREW_TASK_PACKET`.
4. `--allow-dirty` and `--allow-production-branch` are read-only/recovery snapshot controls only.
5. Reference/experimental lifecycle is a real constraint: do not expand a reference or experiment into a product/runtime without explicit portfolio reclassification.
6. Baseline validation: Static HTML/CSS/JS validation appropriate to the changed surface; preserve minimal experiment scope.

## Durable documents to load when applicable

- `README.md`

## Cross-system rule

Provider and customer-product records remain owned by their source systems. Reference code never gains True Crew production authority merely because it is stored in a True Crew repository.
