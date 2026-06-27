# Business case

## Request

Run a small synthetic pilot for care navigation intake notes.

## Why this workflow

The workflow is easy to understand. A team receives referral notes and wants to
share a short summary. The sensitive note should stay inside the first-party
boundary. The shared record should contain only clean fields.

## What the harness proves

- A pack can declare recognizers, schema, policy, sink shape, evals, and claims.
- Bonsai can help propose contextual spans inside the harness.
- The verifier decides whether anything leaves the boundary.
- The benchmark report can show hardware, runtime, latency, and limitations.

## What the harness does not prove

- It does not prove compliance.
- It does not prove legal de-identification.
- It does not process real patient data.
- It does not make the model the trust boundary.

