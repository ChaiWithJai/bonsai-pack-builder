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
    id: 'pack-detail',
    route: '/pack/:packId',
    title: 'Pack detail and contribution',
    renders: ['Pack README', 'gate history', 'fork path', 'PR checklist'],
    components: ['PackReadme', 'GateHealthPanel', 'ForkPackButton', 'ContributionChecklist'],
    state: {
      address: ['packId', 'tab'],
      local: ['activeSection', 'expandedGateId'],
      draft: ['forkIntent'],
      'server-cache': ['packMetadata', 'gateHistory', 'benchmarkReports'],
      derived: ['forkReadiness', 'missingContributionEvidence']
    },
    gates: ['Forks inherit guardrails', 'Contribution copy must cite run evidence']
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
    id: 'recognizer-stage',
    route: '/new?step=recognize',
    title: 'Recognizer stage',
    renders: ['Identifier catalog', 'Bonsai proposals', 'manual accept and reject controls'],
    components: ['RecognizerCatalog', 'BonsaiProposalPanel', 'RecognizerDecisionList'],
    state: {
      address: ['step', 'draftId'],
      local: ['selectedRecognizerId', 'showRejected'],
      draft: ['acceptedRecognizers', 'rejectedRecognizers', 'reviewNotes'],
      'server-cache': ['recognizerCatalog', 'modelProposalRun'],
      derived: ['coverageByIdentifierType', 'unreviewedModelSuggestions']
    },
    gates: ['Model proposals are advisory', 'Human must approve recognizer set']
  },
  {
    id: 'policy-stage',
    route: '/new?step=verify',
    title: 'Verifier and policy stage',
    renders: ['Default-deny policy', 'egress controls', 'risk tier'],
    components: ['PolicyEditor', 'EgressRuleList', 'RiskTierSummary'],
    state: {
      address: ['step', 'draftId'],
      local: ['expandedPolicyRule'],
      draft: ['policyYaml', 'egressRules'],
      'server-cache': ['policyTemplates', 'priorIncidentRules'],
      derived: ['weakPolicyWarnings', 'requiredApprovalLevel']
    },
    gates: ['Default-deny egress', 'Verifier cannot be weakened by pack files']
  },
  {
    id: 'schema-stage',
    route: '/new?step=structure',
    title: 'Clean record schema stage',
    renders: ['JSON schema editor', 'clean payload preview', 'sink mapping'],
    components: ['SchemaEditor', 'CleanPayloadPreview', 'SinkMappingPanel'],
    state: {
      address: ['step', 'draftId'],
      local: ['selectedSchemaField'],
      draft: ['recordSchema', 'sinkMapping'],
      'server-cache': ['schemaTemplates', 'sinkTemplates'],
      derived: ['schemaCompleteness', 'unsafeSinkFields']
    },
    gates: ['Sink only sees clean record fields', 'Raw text and redaction map stay out of sink']
  },
  {
    id: 'draft-workspace',
    route: '/draft/:draftId',
    title: 'Draft pack workspace',
    renders: ['IDE split', 'pack file tree', 'agent todo list', 'unsaved file editor'],
    components: ['PackFileTree', 'AgentTodoList', 'FileEditor', 'UnsavedChangesBar'],
    state: {
      address: ['draftId', 'file'],
      local: ['openFolders', 'cursorPosition'],
      draft: ['scratchFiles', 'unsavedEdits', 'agentTodos'],
      'server-cache': ['packSchema', 'validationRules'],
      derived: ['changedFiles', 'filesRequiringApproval']
    },
    gates: ['Scratch first', 'No final write without approval']
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
  },
  {
    id: 'benchmark-export',
    route: '/runs/:runId/export',
    title: 'PrismML benchmark export',
    renders: ['Report fields', 'template completeness', 'copy to PR controls'],
    components: ['BenchmarkReportEditor', 'TemplateCompletenessMeter', 'UpstreamChecklist'],
    state: {
      address: ['runId', 'format'],
      local: ['expandedSection'],
      draft: ['benchmarkMarkdown'],
      'server-cache': ['gateRun', 'hardwareProfile', 'runtimeProfile'],
      derived: ['missingBenchmarkFields', 'upstreamPrReadiness']
    },
    gates: ['Report limitations', 'Use synthetic inputs only', 'State verifier result']
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
