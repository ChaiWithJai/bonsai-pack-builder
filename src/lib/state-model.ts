import type { Screen, Service } from './types';

export const screens: Screen[] = [
  {
    id: 'registry',
    route: '/',
    title: 'Pack registry',
    renders: ['Searchable pack grid', 'evidence table', 'pack detail preview', 'contribute a pack CTA'],
    components: ['PackCard', 'EvidenceTable', 'RegistryFilters', 'ContributionPanel'],
    state: {
      address: ['search', 'domain', 'runtime', 'sort'],
      local: ['selectedPackId', 'activePreviewTab'],
      draft: ['none'],
      'server-cache': ['packIndex', 'latestGateRuns', 'benchmarkReports'],
      derived: ['gateHealth', 'contributionReadiness']
    },
    gates: ['No real PHI in examples', 'Claims must link to evidence']
  },
  {
    id: 'workflow-interview',
    route: '/new?step=source',
    title: 'Workflow interview to draft pack',
    renders: ['Bounded interview', 'draft pack file tree', 'stage progress', 'risk questions'],
    components: ['AgentInterview', 'PackFileTree', 'StageStepper', 'RiskQuestionCard'],
    state: {
      address: ['step', 'template'],
      local: ['openQuestionId', 'focusedField'],
      draft: ['workflowAnswers', 'generatedPackFiles', 'claimDraft'],
      'server-cache': ['packSchema', 'recognizerCatalog', 'runtimeCatalog'],
      derived: ['missingAnswers', 'packCompleteness', 'riskTier']
    },
    gates: ['Synthetic examples only', 'HITL before writing pack files']
  },
  {
    id: 'approval',
    route: '/approval/:draftId',
    title: 'Human approval',
    renders: ['Full diff review', 'risk-tiered action ladder', 'approve write card'],
    components: ['PackDiffViewer', 'ApprovalCard', 'RiskLadder', 'EvidenceDrawer'],
    state: {
      address: ['draftId', 'reviewMode'],
      local: ['expandedFile', 'selectedDiffHunk'],
      draft: ['pendingPatch', 'approvalNotes'],
      'server-cache': ['policyRules', 'priorIncidents'],
      derived: ['requiresHumanApproval', 'blockedActions']
    },
    gates: ['No write without approval', 'No sink send from draft state']
  },
  {
    id: 'claims',
    route: '/claims/:packId',
    title: 'Claim guardrails',
    renders: ['Allowed claims', 'cannot-say list', 'inline claim lint', 'claim critic gate'],
    components: ['ClaimMatrix', 'ClaimEditor', 'CriticResult', 'EvidenceLinks'],
    state: {
      address: ['packId', 'claimTab'],
      local: ['activeClaimId', 'editorSelection'],
      draft: ['claimCopy'],
      'server-cache': ['evidenceBundle', 'publishedRunbook'],
      derived: ['claimSafety', 'unsupportedPhrases', 'publishReadiness']
    },
    gates: ['No HIPAA-compliant claim', 'Say scrubbed or redacted, not de-identified']
  },
  {
    id: 'runs',
    route: '/runs/:runId',
    title: 'Gates and benchmark evidence',
    renders: ['Gate status', 'trace review', 'latency profile', 'Prism benchmark export'],
    components: ['GateTimeline', 'TraceViewer', 'LatencyProfile', 'BenchmarkExport'],
    state: {
      address: ['runId', 'gate'],
      local: ['expandedTraceSpan'],
      draft: ['reviewAnnotations'],
      'server-cache': ['gateRun', 'traceBundle', 'hardwareProfile'],
      derived: ['failureThemes', 'benchmarkTemplateCompleteness']
    },
    gates: ['Evidence before claims', 'Exporter must name limitations']
  }
];

export const services: Service[] = [
  {
    id: 'svelte-ui',
    name: 'SvelteKit UI',
    runsWhere: 'Browser plus SvelteKit server',
    status: 'seeded',
    responsibility: 'Expose registry, interview, approval, claims, and evidence surfaces.',
    nextProof: 'Interactive mock routes with URL-synced state and screenshot proof.'
  },
  {
    id: 'deepagents-runtime',
    name: 'Deep Agents orchestrator',
    runsWhere: 'Node server process or sandbox worker',
    status: 'designed',
    responsibility: 'Coordinate interviewer, drafter, eval designer, claim critic, and reporter subagents.',
    nextProof: 'One mock care-navigation pack produced from synthetic requirements.'
  },
  {
    id: 'bonsai-adapter',
    name: 'Bonsai adapter tool',
    runsWhere: 'Local model runtime selected by harness',
    status: 'planned',
    responsibility: 'Use Bonsai as a density-model component for proposals/classification, never as an unchecked oracle.',
    nextProof: 'Benchmark export matching PrismML community template.'
  },
  {
    id: 'verifier',
    name: 'Verifier gate',
    runsWhere: 'Server-side harness and future portable core',
    status: 'designed',
    responsibility: 'Default-deny egress until residual identifier scan passes.',
    nextProof: 'Pack validation plus synthetic gate run with zero residual identifiers.'
  },
  {
    id: 'benchmark-exporter',
    name: 'PrismML benchmark exporter',
    runsWhere: 'CLI or server action',
    status: 'seeded',
    responsibility: 'Write PR-ready benchmark markdown for PrismML-Eng/Bonsai-demo templates.',
    nextProof: 'Filled care-navigation benchmark report under benchmark/prismml/.'
  }
];

