# Bonsai Pack Builder

A Deep Agents and SvelteKit seed repo for turning regulated workflow pain into
verifier-gated Bonsai packs.

This is the next ecosystem artifact after the iPhone PHI scrubber demo. The prior
demo proved a narrow workflow. A user can capture a synthetic note, scrub
identifiers inside a first-party edge boundary, run a verifier gate, and send only
a clean structured record to Slack. This repo turns that lesson into a pack
authoring harness. The harness helps a user move through this sequence:

- interview the workflow;
- draft the pack;
- create synthetic evals;
- run gates;
- collect evidence;
- prepare a contribution.

The core claim is intentionally modest: density models such as Bonsai become useful
when they sit inside harnesses with explicit policy, evals, human approval, and
default-deny egress. They are components, not oracles.

## What is here

- [Advisory brief](docs/advisory-brief.md) - the short review note for PrismML
  founders, advisors, and ecosystem reviewers.
- [PRD](docs/prd.md) - product scope, users, MVP, acceptance criteria.
- [RFC-0001](docs/rfcs/0001-deepagent-pack-builder.md) - proposed architecture
  and delivery plan.
- [Demo runbook](docs/demo-runbook.md) - how to review the seed and what the full
  demo should show.
- [Verified seed UI screenshot](docs/demo-assets/home-state-map.png).
- [Implementation plan](docs/implementation-plan.md) - the phased path from seed
  repo to working pack builder.
- [Completion audit](docs/completion-audit.md) - requirement-by-requirement proof
  against the original goal.
- [FSM screen map](docs/design/fsm-screen-map.md) - route, screen, component, and
  gate map from the wireframes.
- [UI state model](docs/design/ui-state-model.md) - address, local, draft,
  server-cache, and derived state.
- [System architecture](docs/architecture/system-architecture.md) - Deep Agents,
  SvelteKit, Bonsai adapter, verifier, and exporter.
- [Network topology and flows](docs/architecture/network-topology-and-flows.md).
- [Service map](docs/service-map/service-map.md).
- [Means, Motivation, Opportunity](docs/strategy/means-motivation-opportunity.md).
- [PrismML benchmark template](benchmark/prismml/bonsai-pack-builder-report-template.md).
- [Care navigation sample benchmark report](benchmark/prismml/care-navigation-intake.sample-report.md).
- [Care navigation example](examples/care-navigation-intake/README.md).
- [Care navigation synthetic pack](examples/care-navigation-intake/packs/care-navigation-intake/README.md).
- [Wireframes](docs/mocks/pack-builder-wireframes.dc.html).
- [Source index](docs/research/source-index.md).

## Run the seed UI

```bash
npm install
npm run dev
```

Then open the printed local URL. The current UI is a state-map dashboard, not the
full builder.

## Verify

```bash
npm run check
npm run build
npm run docs:check
npm run pack:check
```

## Guardrails

- Synthetic examples only.
- Say scrubbed or redacted; do not claim legal de-identification.
- Do not claim HIPAA compliance.
- Bonsai is a local inference component behind policy and verifier gates.
- Human approval is required before writing generated packs, running sinks, or
  publishing external claims.

## Source context

This repo preserves source context from the prior build under `docs/research/` and
`docs/strategy/`. The public contribution target is the benchmark-template pattern
in [PrismML-Eng/Bonsai-demo](https://github.com/PrismML-Eng/Bonsai-demo), especially
the `community-benchmarks/bonsai` report templates.
