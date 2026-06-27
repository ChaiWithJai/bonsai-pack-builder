#!/usr/bin/env bash
set -euo pipefail

required=(
  README.md
  docs/advisory-brief.md
  docs/demo-runbook.md
  docs/demo-assets/home-state-map.png
  docs/implementation-plan.md
  docs/completion-audit.md
  docs/failure-analysis-and-demo-acceptance.md
  docs/prd.md
  docs/research/error-discovery-audit.md
  docs/rfcs/0001-deepagent-pack-builder.md
  docs/design/fsm-screen-map.md
  docs/design/ui-state-model.md
  docs/architecture/system-architecture.md
  docs/architecture/network-topology-and-flows.md
  docs/service-map/service-map.md
  docs/strategy/means-motivation-opportunity.md
  docs/research/source-index.md
  benchmark/prismml/bonsai-pack-builder-report-template.md
  benchmark/prismml/care-navigation-intake.sample-report.md
  examples/care-navigation-intake/packs/care-navigation-intake/metadata.yaml
  examples/care-navigation-intake/packs/care-navigation-intake/eval/golden.jsonl
)

for file in "${required[@]}"; do
  test -s "$file" || {
    echo "missing or empty: $file" >&2
    exit 1
  }
done

if grep -R "is HIPAA-compliant\\|are HIPAA-compliant\\|HIPAA-compliant solution" \
  README.md docs/prd.md docs/rfcs docs/design docs/architecture docs/service-map docs/strategy benchmark examples; then
  echo "Unsupported positive compliance claim found." >&2
  exit 1
fi

echo "docs ok"
