# AGENTS.md

This repo is a seed for the Bonsai ecosystem pack-builder work. Treat docs and
architecture as the system of record until RFC-0001 is accepted.

## Operating loop

1. Read `README.md`, `docs/prd.md`, and `docs/rfcs/0001-deepagent-pack-builder.md`.
2. Do the smallest task that advances the PRD/RFC.
3. Keep generated examples synthetic.
4. Run `npm run docs:check`; run Svelte checks when editing `src/`.
5. Commit focused changes.

## Non-negotiables

- Do not process real PHI.
- Do not weaken verifier-gate language.
- Do not claim HIPAA compliance or legal de-identification.
- Do not expose secrets or production sinks to the agent.
- Deep Agents may draft files, but human approval is required before writes,
  eval execution, GitHub PRs, or publishable claims.

## Design posture

The product teaches a repeatable harness pattern:

```text
adopter pain -> pack -> eval -> proof -> story -> contribution
```

The repo should remain understandable to two audiences:

- healthcare/gluework adopters who need a credible hackathon or internal business
  case;
- inference ecosystem builders who want to extend Bonsai runtimes, packs, and
  benchmark templates.

