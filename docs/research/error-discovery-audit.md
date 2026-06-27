# Error discovery audit

Date: June 27, 2026  
Scope: seed repo docs, Svelte state map, mocks, and benchmark artifacts

This audit applies the error-discovery loop to the repo itself. The dataset is the
set of public-facing artifacts. The review question is: where could a Prism founder,
advisor, or ecosystem builder misunderstand the project or find a gap?

## Sampled artifacts

- `README.md`
- `docs/advisory-brief.md`
- `docs/prd.md`
- `docs/rfcs/0001-deepagent-pack-builder.md`
- `docs/design/fsm-screen-map.md`
- `docs/design/ui-state-model.md`
- `docs/architecture/system-architecture.md`
- `docs/architecture/network-topology-and-flows.md`
- `docs/service-map/service-map.md`
- `docs/strategy/means-motivation-opportunity.md`
- `docs/mocks/pack-builder-wireframes.dc.html`
- `src/lib/state-model.ts`
- `src/routes/+page.svelte`

## Failure modes found

### 1. Code-backed screen map was narrower than the mock map

The docs listed registry, workflow interview, draft workspace, approval, pack detail,
claims, run evidence, and benchmark export. The Svelte state model only listed
registry, workflow interview, approval, claims, and runs.

Fix: expanded `src/lib/state-model.ts` and the UI detail panel so the code-backed
state model includes pack detail, recognizer stage, policy stage, schema stage,
draft workspace, and benchmark export.

### 2. Reviewer entry path was too generic

The README opened with the seed repo, but the new audience is Prism founders,
advisors, and ecosystem reviewers. They need the point, the decision request, and
the upstream contribution path before the detailed docs.

Fix: added `docs/advisory-brief.md` and linked it from the README and UI hero.

### 3. The demo story was under-specified

The repo said the current UI was a dashboard, but it did not define the complete
demo path or the proof checklist for the future build.

Fix: added `docs/demo-runbook.md`.

### 4. The plan from seed to implementation was too implicit

The PRD and RFC described the product, but contributors needed a sequence of work.

Fix: added `docs/implementation-plan.md`.

### 5. Completion was not auditable

The prior state depended on a human reading many files to decide whether the original
goal was met.

Fix: added `docs/completion-audit.md`.

### 6. Source evidence was scattered

The research memo had citations, but the top-level docs did not give a direct
source index.

Fix: added `docs/research/source-index.md`.

## Remaining risks

- The repo is a complete seed and review artifact, not a working pack builder.
- The Deep Agents harness is designed but not implemented.
- The Bonsai adapter is designed but not implemented.
- The PrismML benchmark export template is seeded, but no completed run exists yet.
- The next pass needs a live UI route implementation and a mock pack generation path.

