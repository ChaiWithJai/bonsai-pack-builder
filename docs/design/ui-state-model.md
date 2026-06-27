# UI State Model

SvelteKit gives us filesystem routing and Svelte 5 gives us `$state` and `$derived`
for local computation. The product must be explicit about which state belongs where.

## Address State

State that belongs in the URL:

- route: registry, new pack, approval, claims, run evidence;
- query: step, tab, domain, runtime, sort, gate;
- path params: pack id, draft id, run id;
- review mode: diff, risk ladder, evidence.

Why: users and agents need shareable state for review and handoff.

## Local State

State that should reset with the browser/session:

- open panels;
- selected diff hunk;
- active editor focus;
- expanded trace span;
- visible help text;
- unsaved UI preferences.

Why: these are ergonomic controls, not product evidence.

## Draft State

State that must be protected until approved:

- workflow answers;
- generated pack files;
- synthetic eval drafts;
- claim copy;
- approval notes;
- pending patch.

Why: draft state is where the agent can make mistakes. Writes require HITL.

## Server Cache

State fetched or computed by the server:

- pack registry;
- pack schema;
- recognizer catalog;
- runtime catalog;
- gate runs;
- benchmark reports;
- evidence bundles.

Why: these should be consistent across reviewers and exportable.

## Derived State

State computed from other state:

- pack completeness;
- risk tier;
- unsupported claim phrases;
- required approval level;
- gate health;
- benchmark template completeness;
- PR readiness.

Why: derived state should be recomputable and should not become a hidden source of
truth.

