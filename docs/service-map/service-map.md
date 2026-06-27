# Service Map

| Service | State | Runs Where | Responsibility | Current Evidence | Next Step |
| --- | --- | --- | --- | --- | --- |
| SvelteKit UI | seeded | browser + SvelteKit server | screen/state map and approval surfaces | `src/routes/+page.svelte` | add route bodies from FSM |
| Deep Agents orchestrator | designed | Node process | plan, subagents, scratch FS, HITL | RFC-0001 | implement mock agent script |
| Workflow interviewer | planned | Deep Agents subagent | bounded workflow requirements | PRD | define prompt and schema |
| Pack drafter | planned | Deep Agents subagent | draft declarative pack files | care navigation example | scratch writer tool |
| Eval designer | planned | Deep Agents subagent | synthetic evals and failure hypotheses | research memo | generate `golden.jsonl` |
| Claim critic | planned | Deep Agents subagent | allowed/cannot-say/publish safety | claim guardrail docs | lint claim copy |
| Bonsai adapter | planned | local runtime tool | bounded proposals and benchmark runs | prior demo evidence | wrapper with structured output |
| Verifier gate | designed | server-side harness | default-deny residual checks | prior PHI scrubber architecture | port minimal verifier wrapper |
| Benchmark exporter | seeded | CLI/server action | PrismML report markdown | template in `benchmark/prismml` | fill first example report |
| GitHub exporter | planned | approval-gated tool | branch, PR, contribution summary | AGENTS guardrails | add public repo loop later |

## State Definitions

- `seeded`: repo artifact exists.
- `designed`: architecture and acceptance criteria are documented.
- `planned`: next implementation is known but not coded.
- `mocked`: UI or CLI mock exists without live backend.
- `blocked`: cannot proceed without an external decision or credential.

