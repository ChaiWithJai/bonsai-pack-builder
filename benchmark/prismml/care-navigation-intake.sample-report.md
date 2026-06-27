# Bonsai Pack Builder Benchmark Report

## Summary

- Pack: `care-navigation-intake`
- Runtime: `mac-edge` sample path
- Model artifact: Bonsai family placeholder
- Hardware: personal laptop edge node
- Date: June 27, 2026
- Reporter: Chai With Jai

## Task

Scrub a synthetic care-navigation referral note, produce a clean structured record,
and block the sink if residual identifiers remain.

## Synthetic inputs

The inputs live in `examples/care-navigation-intake/packs/care-navigation-intake/eval/golden.jsonl`.
No real patient data is used.

## Harness

The harness uses Bonsai for bounded span proposals and clean record assistance.
The verifier checks the outbound payload outside the model.

## Results

| Metric | Value |
| --- | --- |
| Total latency | 16.65 seconds sample |
| Bonsai call count | 5 scrub passes plus 1 structure call in prior demo shape |
| Tokens/sec | Not measured in this seed |
| Peak memory | Not measured in this seed |
| Gate pass/fail | pass in sample proof |
| Residual identifier count | 0 in sample proof |

## Claim boundary

Allowed claims:

- This is a synthetic benchmark report shape.
- The verifier is the trust boundary.
- The report names missing measurements.

Do not say:

- This proves compliance.
- This proves legal de-identification.
- This is production ready.

## Reproduction

```bash
npm run docs:check
```

The live Deep Agents and Bonsai runner does not exist yet. This report is a target
shape for the first implementation pass.

## Limitations

- This is a seed report.
- It has not been submitted upstream.
- It has not run against the live Bonsai-demo benchmark harness.
- It does not include memory, power, or token throughput.

## Upstream fit

This report is intended to be adapted into the `PrismML-Eng/Bonsai-demo`
community benchmark format after the live runner exists.

