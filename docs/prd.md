# PRD: Bonsai Pack Builder

Status: draft  
Date: June 27, 2026  
Owner: Jai / Chai With Jai

## Summary

Bonsai Pack Builder helps a healthcare or regulated-workflow builder turn a messy
workflow description into a declarative pack, synthetic eval set, verifier-gated
proof run, PrismML benchmark report, and publish-safe business-case memo.

It uses Deep Agents as the authoring harness and SvelteKit/TypeScript for the UI.
Bonsai is consumed as a local density-model component inside the harness, not as
the primary autonomous agent brain.

## Problem

The prior PHI scrubber demo proved that the hard part is not only model inference.
The hard part is the harness:

- setting the privacy boundary before inference;
- forcing synthetic examples;
- generating eval evidence before claims;
- surfacing latency and runtime limits honestly;
- giving users a way to adapt the workflow without touching the verifier core.

Healthcare hackathon builders, clinic operators, and EHR-adjacent automation owners
need this pattern packaged. They should not have to rediscover every incident from
the first demo.

## Target Users

- Healthcare hackathon participants building a credible demo in 24-48 hours.
- Operators who manage gluework in Sheets, Slack, intake forms, and EHR-adjacent
  systems.
- Internal innovation teams building a business case for first-party edge AI.
- Inference builders who want a reproducible Bonsai workflow benchmark.
- PrismML ecosystem contributors extending model runtimes and benchmark templates.

## Jobs To Be Done

1. When I describe my workflow, help me create a pack I can understand and edit.
2. When I need leadership approval, produce a one-page business case with caveats.
3. When I want to publish a demo, stop me from overclaiming compliance or privacy.
4. When I want to contribute to Bonsai, generate benchmark evidence in the format
   the ecosystem can review.
5. When an agent changes files, make the diff and risk tier visible before writes.

## MVP

- SvelteKit UI with registry, workflow interview, approval, claims, and run evidence
  screens.
- Deep Agents orchestrator with these subagents:
  - workflow interviewer;
  - pack drafter;
  - eval designer;
  - claim critic;
  - GitOps reporter;
  - benchmark reporter.
- Care-navigation-intake example pack.
- Synthetic eval generation.
- Verifier-gate wrapper that blocks outbound claims and sink simulation when residual
  identifiers are detected.
- PrismML benchmark report exporter targeting the Bonsai-demo community template.
- HITL approval before write, eval execution, external sink, or GitHub PR.

## Non-Goals

- No real PHI ingestion.
- No production Slack sending in the default agent flow.
- No legal de-identification claims.
- No HIPAA compliance claim.
- No general-purpose autonomous healthcare agent.
- No claim that Bonsai alone is a privacy gate.

## Acceptance Criteria

- A user can describe a workflow and receive a draft pack file tree.
- The UI shows which state is addressable, local, draft, cached, and derived.
- The agent asks for approval before writing pack files.
- The generated pack includes synthetic evals and claim guardrails.
- A run produces a benchmark report compatible with the PrismML community benchmark
  style.
- The final business-case copy names limitations and avoids unsupported claims.

## Risks

- Users may paste real sensitive data into the interview. Mitigation: synthetic-only
  warnings, local-only draft state, and no persistent memory for raw examples.
- Deep Agents may over-write files or run tools too broadly. Mitigation: scoped
  filesystem, scratch writes first, approval gates, sandboxed execution.
- Bonsai may be treated as the planner. Mitigation: use it as a specialized local
  inference tool for bounded proposals/classification until tool-calling reliability
  is proven.
- Benchmark reports may become marketing. Mitigation: require hardware, runtime,
  latency, failure modes, and limitations.

## Strategy Fit

This demonstrates Prism's intelligence-density thesis at the workflow level: useful
intelligence per unit of hardware, power, and integration friction. The deliverable
is not a leaderboard claim. It is a reproducible pack that shows who can now do
what locally, with evidence.

