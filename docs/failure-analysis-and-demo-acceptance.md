# Failure analysis and demo acceptance checklist

Date: June 27, 2026

## What failed

The previous pass shipped a review packet. That was useful after a demo, but it was
not the demo.

The user asked for a working demo that followed the wireframes. I shipped:

- a state map;
- docs;
- a sample pack;
- a sample benchmark report;
- a static page that explained the plan.

That did not let a reviewer experience the product path. A reviewer could not run
the workflow interview, watch a draft assemble, approve the write, run gates, see
claim lint, or inspect the CLI flow.

## Why it failed

I treated the artifact as a strategy repo instead of an embodied product demo. I
verified that the documents existed, but I did not verify that every wireframe path
had an interactive surface.

The wrong completion test was:

```text
Do the docs cover the plan?
```

The correct completion test is:

```text
Can a reviewer click through the product story and see the harness produce a pack,
approval moment, gate result, claim boundary, and benchmark export?
```

## Correct acceptance checklist

The demo must cover every wireframe pathway:

- 1A. Conversational workflow interview with a live draft.
- 1B. IDE split where the agent edits files and the user watches.
- 1C. Guided wizard through source, recognize, verify, structure, publish.
- 2A. Inline approval card in the chat stream.
- 2B. Full diff review before write.
- 2C. Risk-tiered action ladder.
- 3A. Pack registry card grid.
- 3B. Evidence table.
- 3C. Pack detail, fork, and PR path.
- 4A. Allowed versus cannot-say claim matrix.
- 4B. Inline claim lint.
- 4C. Claim critic gate before publish.
- 5A. CLI interview.
- 5B. CLI approval prompt.
- 5C. Gates and eval evidence.

The demo must also show:

- address state;
- local state;
- draft state;
- server cache state;
- derived state;
- service map state;
- a deterministic generated pack;
- a deterministic gate result;
- a benchmark export path;
- safe claim language.

## Verification checklist

Before calling the demo complete, run:

- `npm run check`
- `npm run build`
- `npm run docs:check`
- `npm run pack:check`
- a Playwright click-through of each major screen;
- a live Pages check that the demo contains the interactive pathways.

