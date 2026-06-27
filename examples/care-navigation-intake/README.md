# Example: Care Navigation Intake

This is the first worked example for the pack builder.

## User Story

A care navigation team collects referral notes in Sheets or forms, then shares a
short summary in Slack. They need a pack that removes identifiers and writes only
a clean structured record to the team channel.

## Generated Pack Shape

```text
packs/care-navigation-intake/
  README.md
  metadata.yaml
  variables.yaml
  recognizers/member-id.yaml
  recognizers/contact.yaml
  recognizers/family-detail.yaml
  schema/record.schema.json
  policy/egress.yaml
  sink/slack.yaml
  eval/golden.jsonl
  publish/business-case.md
  publish/claims.md
  proof/gate-run.json
```

## What This Proves

- The adopter can describe a workflow without touching model code.
- The agent can draft a declarative pack.
- The eval designer can create synthetic test cases.
- The verifier can block unsafe egress.
- The claim critic can produce safe public copy.
- The benchmark reporter can translate a workflow run into PrismML ecosystem
  evidence.

## What This Does Not Prove

- It does not prove compliance.
- It does not prove legal de-identification.
- It does not use real patient data.
- It does not make Bonsai the sole privacy boundary.

