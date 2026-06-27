# Advisory brief

Audience: PrismML founders, advisors, and ecosystem reviewers  
Status: seed brief for review  
Date: June 27, 2026

## The point

Bonsai Pack Builder is a harness for turning one useful local AI demo into many
useful local AI demos.

The first PHI scrubber showed that a small local model can help with sensitive
workflow data when the model sits behind a verifier gate. The next problem is
repeatability. A clinic operator, hackathon team, or internal innovation team
should be able to describe a workflow and get a pack, evals, proof commands, and
publish-safe copy without becoming a model runtime expert.

## What this proves for Prism

This project turns the intelligence-density thesis into a workflow artifact. It
asks who can now do useful work locally because Bonsai is small enough to run near
the data.

The pack builder answers that question with a repeatable loop. The user describes
workflow pain. The harness drafts a pack. The harness creates a synthetic eval.
The verifier produces proof. The benchmark reporter prepares a report. The
contributor has something concrete to share.

## Why Deep Agents

Deep Agents gives us planning, subagents, file editing, memory, permissions, and
human approval in one harness. Those are the controls we had to build around the
scrubber demo by hand.

The first version should use Deep Agents for orchestration and use Bonsai as a
bounded inference tool. That keeps Bonsai in the part of the system where it can
prove value now: local proposals, classification, and benchmark runs inside a
guarded workflow.

## Why SvelteKit

The product needs a clear review surface, not a chat box alone. The UI must show:

- which workflow state is in the URL;
- which state is only local to the browser;
- which state is a draft that needs approval;
- which state came from the server;
- which values are derived from evidence.

SvelteKit is a good fit because it gives us file-based routes, TypeScript, form
actions, and a small client surface. Svelte 5 runes make local and derived state
visible in code.

## What we copied from the first demo

- Synthetic-only examples.
- No positive compliance claims.
- A verifier outside the model.
- Latency and runtime evidence before public claims.
- A first-party edge posture.
- A clear story for adopters and builders.

## What this should contribute upstream

The first upstream contribution should not be another app. It should be a benchmark
report that fits the `PrismML-Eng/Bonsai-demo` community benchmark pattern.

The report should show:

- the pack;
- the task;
- the hardware;
- the runtime;
- the Bonsai model artifact;
- the latency profile;
- the verifier result;
- the limitation.

That gives Pasha and the Bonsai demo maintainers a reviewable artifact, and it
gives the community a format to copy.

## Decision request

The next decision is whether this repo should become:

1. a product-facing pack builder;
2. a benchmark authoring harness;
3. both, with the benchmark exporter as the first accepted contribution path.

The recommendation is option 3. It serves adopters and builders at the same time.
