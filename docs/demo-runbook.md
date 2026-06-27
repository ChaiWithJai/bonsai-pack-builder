# Demo runbook

This runbook shows how to review the working static demo.

## Working demo

Open the live demo:

```text
https://chaiwithjai.github.io/bonsai-pack-builder/
```

Or run it locally:

Run:

```bash
npm install
npm run dev
```

Open the local URL. The UI shows:

- a value demo with a synthetic sensitive note;
- local signal processing and verifier boundary;
- a clean outbound team artifact;
- a business case and extension path;
- workflow interview;
- draft pack assembly;
- IDE-style file diff;
- guided wizard;
- human approval;
- registry cards;
- evidence table;
- fork to PR path;
- claim guardrails;
- CLI interview, approval, and gates.

Verified screenshots:

- `docs/demo-assets/working-demo-value-after.png`
- `docs/demo-assets/working-demo-value-mobile.png`
- `docs/demo-assets/working-demo-ide.png`
- `docs/demo-assets/working-demo-claims-pass.png`
- `docs/demo-assets/working-demo-cli.png`

The concrete synthetic pack is in
`examples/care-navigation-intake/packs/care-navigation-intake`.

## Demo script

1. Start on the workflow interview.
2. Click "Run local value demo".
3. Point to the before/process/after transformation.
4. Click "Inspect the generated pack".
5. Inspect the IDE split and select `policy/egress.yaml`.
6. Open the guided wizard.
7. Open human approval and click "Approve write".
8. Open the registry and click "Prepare contribution checklist".
9. Open claim guardrails. Note the unsafe phrases.
10. Click "Use safe copy". Confirm publish changes from blocked to ready.
11. Open CLI flow. Confirm the same interview, approval, gates, and benchmark
    export appear in terminal form.

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
- The benchmark export path names the Prism template fields and limitations.
- The state panel shows address, local, draft, server-cache, and derived state.
