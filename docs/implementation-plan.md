# Implementation plan

This plan turns RFC-0001 into working software.

## Phase 0. Keep the review repo clean

Done when:

- the README points to all decision artifacts;
- the seed UI builds;
- the docs check passes;
- the public GitHub repo is current.

## Phase 1. Make the UI routes real

Build these routes:

- `/`
- `/new`
- `/draft/[id]`
- `/approval/[id]`
- `/claims/[id]`
- `/runs/[id]`

Done when:

- each route renders the screen from `docs/design/fsm-screen-map.md`;
- address state is visible in the URL;
- local state uses Svelte 5 `$state`;
- derived values use `$derived`;
- no route accepts real PHI examples.

## Phase 2. Add the mock Deep Agents harness

Build a mock orchestrator under `packages/deepagents-harness`.

Done when:

- it can read synthetic workflow requirements;
- it can produce a scratch pack;
- it can produce synthetic evals;
- it can produce claim guardrails;
- it blocks final writes until approval.

## Phase 3. Add verifier and gate simulation

Build a local gate runner for synthetic examples.

Done when:

- the care-navigation example can pass or fail gates;
- the run view shows the trace and latency profile;
- failure output is plain enough for a non-expert to understand.

## Phase 4. Add Bonsai adapter

Add a bounded Bonsai adapter.

Done when:

- the adapter can run against a selected local runtime;
- every call records model artifact, runtime, and timing;
- the verifier checks outputs outside the model;
- the UI names limitations before benchmark export.

## Phase 5. Export PrismML benchmark report

Build the benchmark exporter.

Done when:

- it fills `benchmark/prismml/bonsai-pack-builder-report-template.md`;
- it can be adapted into the Bonsai-demo community benchmark format;
- it includes reproduction commands and limitations.

## Phase 6. Prepare upstream contribution

Done when:

- the repo has one complete care-navigation run;
- the benchmark report is reviewable;
- a draft PR or issue can be opened against `PrismML-Eng/Bonsai-demo`.

