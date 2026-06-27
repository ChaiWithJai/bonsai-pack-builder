import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const packRoot = 'examples/care-navigation-intake/packs/care-navigation-intake';

const required = [
  'README.md',
  'metadata.yaml',
  'variables.yaml',
  'recognizers/contact.yaml',
  'recognizers/family-detail.yaml',
  'recognizers/member-id.yaml',
  'schema/record.schema.json',
  'policy/egress.yaml',
  'sink/slack.yaml',
  'eval/golden.jsonl',
  'publish/business-case.md',
  'publish/claims.md',
  'proof/gate-run.sample.json'
];

for (const file of required) {
  const path = join(packRoot, file);
  if (!existsSync(path)) {
    throw new Error(`missing ${path}`);
  }
}

JSON.parse(readFileSync(join(packRoot, 'schema/record.schema.json'), 'utf8'));
JSON.parse(readFileSync(join(packRoot, 'proof/gate-run.sample.json'), 'utf8'));

const evalLines = readFileSync(join(packRoot, 'eval/golden.jsonl'), 'utf8')
  .trim()
  .split('\n')
  .filter(Boolean);

if (evalLines.length < 3) {
  throw new Error('expected at least 3 synthetic eval rows');
}

for (const line of evalLines) {
  const row = JSON.parse(line);
  if (!row.id || !row.input || !Array.isArray(row.expected_redactions)) {
    throw new Error(`invalid eval row: ${line}`);
  }
}

console.log('example pack ok');

