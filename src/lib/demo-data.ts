export type ViewId = 'value' | 'workflow' | 'approval' | 'registry' | 'claims' | 'cli';

export type WorkflowMode = 'chat' | 'ide' | 'wizard';

export type PackFile = {
  path: string;
  stage: string;
  summary: string;
  risk: 'low' | 'medium' | 'high';
  before: string;
  after: string;
};

export type GateRun = {
  id: string;
  label: string;
  status: 'pass' | 'needs-review' | 'blocked';
  evidence: string;
};

export type RegistryPack = {
  id: string;
  title: string;
  domain: string;
  description: string;
  gates: string;
  evalRows: number;
  residualIdentifiers: number;
  benchmark: string;
};

export const views: Array<{
  id: ViewId;
  title: string;
  route: string;
  promise: string;
}> = [
  {
    id: 'value',
    title: 'Value demo',
    route: '/?view=value',
    promise: 'Show the before, the local processing boundary, and the usable output.'
  },
  {
    id: 'workflow',
    title: 'Workflow interview',
    route: '/?view=workflow&mode=chat',
    promise: 'Capture the job, extract signals, and assemble a draft pack.'
  },
  {
    id: 'approval',
    title: 'Human approval',
    route: '/?view=approval',
    promise: 'Show every write, risk tier, and approval before files are committed.'
  },
  {
    id: 'registry',
    title: 'Pack registry',
    route: '/?view=registry',
    promise: 'Discover packs by evidence, fork them, and prepare contribution work.'
  },
  {
    id: 'claims',
    title: 'Claim guardrails',
    route: '/?view=claims',
    promise: 'Keep business copy inside the proof envelope before publish.'
  },
  {
    id: 'cli',
    title: 'CLI flow',
    route: '/?view=cli',
    promise: 'Mirror the browser flow in terminal output for repeatable work.'
  }
];

export const syntheticSensitiveNote = `Care navigator intake note.

Member: Smita Bhagat
Callback: 201-555-0142
Concern: foot nerve pain is disrupting work and sleep.
Family context: her daughter can drive her to the follow-up if needed.
Requested handoff: post a clean summary to the care team channel.`;

export const cleanOutboundRecord = {
  themes: ['pain', 'sleep disruption', 'care navigation'],
  nextStep: 'Schedule non-urgent follow-up and send coaching resources.',
  riskFlags: ['mobility concern', 'needs callback, but callback is redacted before egress'],
  slackMessage:
    'Care navigation update: member reports foot nerve pain affecting work and sleep. Follow-up should be scheduled. No direct identifiers are included.'
};

export const valueSignals = [
  {
    label: 'Raw note stays local',
    detail: 'The synthetic note and redaction map are treated as local-only inputs.'
  },
  {
    label: 'Bonsai proposes dense signals',
    detail: 'The small model helps find context that simple regex would miss, such as family detail.'
  },
  {
    label: 'Verifier owns the boundary',
    detail: 'The outbound payload is rescanned. Egress stays blocked until residual identifiers are zero.'
  },
  {
    label: 'Clean output becomes useful',
    detail: 'The team gets themes, next step, risk flags, and a reusable pack with evidence.'
  }
];

export const valueProof = [
  { metric: '0', label: 'identifiers cross the boundary' },
  { metric: '6', label: 'pack files generated from one workflow' },
  { metric: '5', label: 'gate and evidence checks visible' },
  { metric: '1', label: 'benchmark contribution path' }
];

export const workflowModes: Array<{
  id: WorkflowMode;
  label: string;
  wireframe: string;
}> = [
  { id: 'chat', label: 'Conversational draft', wireframe: '1A' },
  { id: 'ide', label: 'IDE split', wireframe: '1B' },
  { id: 'wizard', label: 'Guided wizard', wireframe: '1C' }
];

export const interviewMessages = [
  {
    from: 'Builder',
    text: 'I run care-navigation intake. We need to capture synthetic referral notes, remove identifiers, and send only clean triage themes to the team.'
  },
  {
    from: 'DeepAgent',
    text: 'I hear three signals: member identifiers, contact details, and family details. I will draft recognizers, a clean record schema, default-deny egress, synthetic eval rows, and safe claims.'
  },
  {
    from: 'Builder',
    text: 'The value story is internal adoption. Show leadership that the sensitive note stays local while the clean record reaches Slack.'
  },
  {
    from: 'DeepAgent',
    text: 'Pack draft ready in scratch space. It needs human approval before writing files or preparing an upstream benchmark report.'
  }
];

export const packFiles: PackFile[] = [
  {
    path: 'metadata.yaml',
    stage: 'source',
    summary: 'Names domain, owner, model family, and synthetic-only boundary.',
    risk: 'low',
    before: '# scratch pack\nname: care-navigation-intake\nstatus: draft',
    after:
      'name: care-navigation-intake\nversion: 0.1.0\ndomain: care navigation\nmodel_family: prism-ml/Bonsai\nsynthetic_only: true'
  },
  {
    path: 'recognizers/contact.yaml',
    stage: 'recognize',
    summary: 'Flags phone, email, address, and free-form contact mentions.',
    risk: 'medium',
    before: 'recognizers: []',
    after:
      'recognizers:\n  - id: contact-detail\n    type: pattern_and_model_vote\n    default_action: redact\n    examples: synthetic'
  },
  {
    path: 'recognizers/family-detail.yaml',
    stage: 'recognize',
    summary: 'Catches family context that plain regex misses.',
    risk: 'medium',
    before: 'recognizers: []',
    after:
      'recognizers:\n  - id: family-detail\n    type: semantic\n    proposer: bonsai\n    verifier: required'
  },
  {
    path: 'schema/record.schema.json',
    stage: 'structure',
    summary: 'Defines the clean record that a sink is allowed to see.',
    risk: 'low',
    before: '{ "type": "object" }',
    after:
      '{\n  "type": "object",\n  "required": ["themes", "next_step", "risk_flags"],\n  "additionalProperties": false\n}'
  },
  {
    path: 'policy/egress.yaml',
    stage: 'verify',
    summary: 'Default-deny policy blocks Slack until residual identifier scan passes.',
    risk: 'high',
    before: 'egress: allow',
    after:
      'egress:\n  default: deny\n  allow_when:\n    - verifier.residual_identifiers == 0\n    - sink.payload == clean_record'
  },
  {
    path: 'publish/claims.md',
    stage: 'publish',
    summary: 'Business copy that says scrubbed and redacted, not compliant.',
    risk: 'high',
    before: 'This pack is HIPAA compliant and de-identifies notes.',
    after:
      'This synthetic demo shows a local scrubber pattern. It redacts identifiers before a clean record reaches shared tools. It is not a medical device and does not claim HIPAA compliance.'
  }
];

export const wizardStages = [
  {
    id: 'source',
    title: 'Source',
    render: 'Job, user, risk, and value story',
    signal: 'Sensitive note stays local. Clean triage record is the only egress target.'
  },
  {
    id: 'recognize',
    title: 'Recognize',
    render: 'Identifier catalog plus Bonsai proposals',
    signal: 'Bonsai proposes semantic identifiers, humans accept the recognizer set.'
  },
  {
    id: 'verify',
    title: 'Verify',
    render: 'Default-deny policy and residual scan',
    signal: 'The gate checks the actual outbound payload, not just the model output.'
  },
  {
    id: 'structure',
    title: 'Structure',
    render: 'Clean record schema and sink mapping',
    signal: 'Slack sees themes, next step, and risk flags. It does not see raw note text.'
  },
  {
    id: 'publish',
    title: 'Publish',
    render: 'Safe claims and benchmark export',
    signal: 'Claims cite synthetic evals, gate proof, and runtime limits.'
  }
];

export const gateRuns: GateRun[] = [
  {
    id: 'synthetic-only',
    label: 'Synthetic data only',
    status: 'pass',
    evidence: '3 eval rows, 0 real notes, 0 raw examples in publish copy.'
  },
  {
    id: 'residual-scan',
    label: 'Residual identifier scan',
    status: 'pass',
    evidence: '0 residual identifiers in clean Slack payload.'
  },
  {
    id: 'default-deny',
    label: 'Default-deny egress',
    status: 'pass',
    evidence: 'Slack sink requires verifier.residual_identifiers == 0.'
  },
  {
    id: 'claim-critic',
    label: 'Claim critic',
    status: 'needs-review',
    evidence: 'Unsafe terms are blocked until copy says scrubbed or redacted.'
  },
  {
    id: 'benchmark-export',
    label: 'Prism benchmark export',
    status: 'pass',
    evidence: 'Report includes hardware, model family, eval size, limits, and gate result.'
  }
];

export const registryPacks: RegistryPack[] = [
  {
    id: 'care-navigation-intake',
    title: 'Care Navigation Intake',
    domain: 'Healthcare operations',
    description: 'Scrub synthetic intake notes before Slack handoff.',
    gates: '4 pass, 1 review',
    evalRows: 3,
    residualIdentifiers: 0,
    benchmark: 'Ready for upstream template'
  },
  {
    id: 'school-counseling-referral',
    title: 'School Counseling Referral',
    domain: 'Education support',
    description: 'Prototype pack for redacting family and student details.',
    gates: 'Template only',
    evalRows: 0,
    residualIdentifiers: 0,
    benchmark: 'Needs synthetic evals'
  },
  {
    id: 'finance-client-note',
    title: 'Finance Client Note',
    domain: 'Financial services',
    description: 'Future pack for client-service handoffs with account-like identifiers.',
    gates: 'Template only',
    evalRows: 0,
    residualIdentifiers: 0,
    benchmark: 'Needs policy review'
  }
];

export const allowedClaims = [
  'This synthetic demo shows how to scrub identifiers before a clean record reaches shared tools.',
  'The model proposes candidates. The verifier gate decides whether egress is allowed.',
  'The pack can be forked for a new workflow by editing declarative files and adding synthetic evals.'
];

export const blockedClaims = [
  'HIPAA compliant',
  'legally de-identified',
  'safe for real patient notes',
  'fully autonomous medical documentation'
];

export const claimRules = [
  {
    match: 'hipaa compliant',
    label: 'Compliance claim',
    replacement: 'Say what the demo proves: scrubbed synthetic workflow with a verifier gate.'
  },
  {
    match: 'de-identif',
    label: 'Legal term of art',
    replacement: 'Use scrubbed or redacted unless a legal de-identification process exists.'
  },
  {
    match: 'patient',
    label: 'Real clinical use',
    replacement: 'Use synthetic member or session note for this public demo.'
  }
];

export const cliTranscript = [
  '$ bonsai-pack interview --template care-navigation',
  '? What workflow hurts today? care-navigation intake notes before Slack handoff',
  '? What can leave the device? only clean themes, next step, and risk flags',
  'draft: wrote 6 files to scratch://care-navigation-intake',
  '$ bonsai-pack approve scratch://care-navigation-intake',
  'risk: high for policy/egress.yaml and publish/claims.md',
  'approval required: human reviewed 6 file diffs',
  '$ bonsai-pack gates examples/care-navigation-intake',
  'PASS synthetic-only',
  'PASS residual-scan: 0 identifiers',
  'PASS default-deny-egress',
  'REVIEW claim-critic: replace compliance language',
  'PASS benchmark-export: Prism template fields complete'
];
