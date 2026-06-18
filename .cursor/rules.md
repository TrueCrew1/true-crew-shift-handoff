# True Crew — Standing Project Contract

This file is the standing project contract for the True Crew build. It is the source of
truth for build order and prompt usage. Keep it active and follow it for every task.

## Product

True Crew is premium software for field operations, maintenance coordination, and service
execution. The first deliverable is a shift handover / passdown tool that grows into the
broader True Crew SaaS platform (customer records, crew records, scheduling, field
execution, clock in/out, reminders, invoicing/QuickBooks, support lifecycle, inventory).

## Locked build order

Build stable foundations first. Do not work out of order.

1. Foundation, auth, app shell, RBAC.
2. Customer records.
3. Crew/painter records and invites.
4. Loader Center and import engine.
5. Jobs and drag-and-drop scheduling.
6. Painter Today view and field execution.
7. Geofenced clock in/out and admin review.
8. Reminders and customer trust communication.
9. Invoices, payments, and QuickBooks sync surfaces.
10. Support lifecycle and issue tracking.
11. Inventory, QR generation, and painter checkout.
12. Usability polish, analytics, monitoring, and release hardening.

## Prompt usage rules

- Use one prompt at a time in a fresh task.
- Do not build multiple major phases in one pass.
- After each phase, review output before moving to the next phase.
- Keep this file (`.cursor/rules.md`) active as the standing project contract.

## Guardrails

- Do not drift into speculative redesign.
- Do not do out-of-order module work.
- Stay within the scope of the current phase's prompt.
