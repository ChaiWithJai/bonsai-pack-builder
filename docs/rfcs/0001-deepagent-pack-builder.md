# RFC-0001: Deep Agents Harness For Bonsai Pack Builder

Status: draft  
Date: June 27, 2026

## Summary

Build `bonsai-pack-builder`: a Deep Agents-powered authoring harness that turns a
regulated workflow description into a declarative pack with synthetic evals, verifier
proof, claim guardrails, and a PrismML benchmark export.

## Background

The PHI scrubber demo taught one durable lesson: density models should be deployed
inside harnesses, not trusted raw. Bonsai helped identify contextual identifiers,
but the verifier gate, pack structure, seeded passes, synthetic evals, phone HTTPS
observability, and claim guardrails made the demo credible.

This RFC packages that learning into an ecosystem tool. It follows the delivery
shape of:

- HashiCorp RFCs: explain background, proposal, UX, implementation surface, and
  rejected ideas before code.
- Nomad Pack: package repeatable operational patterns as configurable packs.
- Packer: make builds reproducible through ordered stages and explicit plugins.
- Deep Agents: use planning, virtual filesystem, subagents, HITL, and sandboxing
  as the harness.
- Hamel/Shankar eval practice: inspect traces and failures before claims.

## Proposal

Create a SvelteKit UI and Deep Agents backend with these stages:

```text
source
recognize
verify
structure
publish
contribute
```

The generated pack shape:

```text
packs/<name>/
  README.md
  metadata.yaml
  variables.yaml
  recognizers/
  schema/
  policy/
  sink/
  eval/golden.jsonl
  publish/business-case.md
  publish/claims.md
  proof/gate-run.json
```

## Deep Agents Configuration

The harness should configure:

- model: a strong planner model for orchestration;
- tools: pack schema read, scratch write, validate pack, run gates, Bonsai propose,
  benchmark export;
- subagents: interviewer, drafter, eval designer, claim critic, GitOps reporter,
  benchmark reporter;
- HITL: required before write, execute, external sink, GitHub PR, or publish claim;
- filesystem: scratch-first, deny `.env`, secrets, and production sink configs;
- memory: stable constitution only, no raw workflow examples.

## Bonsai Role

Bonsai is not the planner in the MVP. It is a bounded inference component used for:

- proposing recognizer candidates;
- classifying synthetic text spans;
- comparing Bonsai runtime results across hardware;
- generating benchmark evidence for the PrismML ecosystem.

The verifier remains outside the model.

## UX

The UI exposes five addressable surfaces:

- `/` pack registry and evidence browser;
- `/new?step=source|recognize|verify|structure|publish` workflow interview;
- `/approval/:draftId` human approval and diff review;
- `/claims/:packId` claim guardrails;
- `/runs/:runId` gate and benchmark evidence.

The mocks are preserved in `docs/mocks/pack-builder-wireframes.dc.html`.

## Verification

MVP proof requires:

- one care-navigation example pack;
- synthetic eval set;
- gate run;
- claim critic output;
- benchmark report matching PrismML community template conventions;
- docs check;
- Svelte type/build check.

## Rejected Ideas

- Fully autonomous PHI agent: rejected because this would repeat the exact trust
  boundary failure the first demo avoided.
- Bonsai as primary agent brain: rejected for MVP because the first value is bounded
  local inference plus evidence, not planning novelty.
- Write directly to repo without approval: rejected because pack files encode policy
  and claims.
- Real patient examples: rejected because the repo is a public ecosystem artifact.

## Open Questions

- Should packs be YAML-first or use mixed YAML/JSON Schema files?
- Should generated evals live inside each pack or in a global eval registry?
- Should the first Deep Agents implementation be a SvelteKit server route or a
  separate Node package under `packages/deepagents-harness`?
- What benchmark fields should be submitted upstream to PrismML first?
