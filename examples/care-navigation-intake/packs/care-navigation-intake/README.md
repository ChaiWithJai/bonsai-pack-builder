# Care navigation intake pack

This synthetic pack shows what Bonsai Pack Builder should generate first.

## Workflow

A care navigation team receives referral notes and wants to share a clean summary
with the team. The raw note must stay inside the first-party boundary. The sink
only receives a structured record after the verifier passes.

## Generated files

- `metadata.yaml`
- `variables.yaml`
- `recognizers/contact.yaml`
- `recognizers/family-detail.yaml`
- `recognizers/member-id.yaml`
- `schema/record.schema.json`
- `policy/egress.yaml`
- `sink/slack.yaml`
- `eval/golden.jsonl`
- `publish/business-case.md`
- `publish/claims.md`
- `proof/gate-run.sample.json`

## Claim boundary

Say this pack helps scrub or redact identifiers before egress.

Do not say it proves compliance, legal de-identification, or production readiness.

