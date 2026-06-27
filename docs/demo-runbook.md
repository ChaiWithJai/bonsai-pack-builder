# Demo runbook

This runbook shows how to review the seed repo and what a complete demo should
show once the implementation begins.

## Current seed demo

Run:

```bash
npm install
npm run dev
```

Open the local URL. The current UI shows:

- the finite state machine;
- the selected screen;
- the components for that screen;
- the trust gates for that screen;
- the service map and current implementation state.

The verified screenshot is in `docs/demo-assets/home-state-map.png`.

The concrete synthetic pack is in
`examples/care-navigation-intake/packs/care-navigation-intake`.

This is a review dashboard. It is not the full pack builder.

## What the full demo should show

The full demo should follow this path. The user starts in the registry, creates a
new pack, reviews the draft, approves the write, runs gates, checks claims, and
exports a benchmark report.

## Demo script

1. Start on the registry.
2. Choose "new pack".
3. Describe the care navigation workflow with synthetic details.
4. Watch the agent ask bounded questions.
5. Review the draft pack file tree.
6. Approve the write after reading the diff.
7. Run gates on the synthetic evals.
8. Open the claim guardrail screen.
9. Export the PrismML benchmark report.
10. Show the generated business-case memo.

## What to say

Say this:

"This harness turns a sensitive workflow into a pack, evals, verifier proof, and
a benchmark report. Bonsai is used where a small local model helps. The verifier
still owns the trust boundary."

Do not say this:

- "This is compliant."
- "This legally de-identifies data."
- "The model is the privacy gate."
- "This is ready for real patient data."

## Proof checklist

- The example is synthetic.
- The pack files are declarative.
- The diff is shown before write.
- The verifier result is visible.
- The claim critic blocks unsupported wording.
- The benchmark export states hardware, runtime, model artifact, latency, and
  limitations.
