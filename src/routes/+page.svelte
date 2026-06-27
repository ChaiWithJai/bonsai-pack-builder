<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import {
    allowedClaims,
    blockedClaims,
    claimRules,
    cliTranscript,
    gateRuns,
    interviewMessages,
    packFiles,
    registryPacks,
    views,
    wizardStages,
    workflowModes,
    type ViewId,
    type WorkflowMode
  } from '$lib/demo-data';

  let activeView = $state<ViewId>('workflow');
  let workflowMode = $state<WorkflowMode>('chat');
  let selectedFile = $state(packFiles[0].path);
  let generated = $state(false);
  let approved = $state(false);
  let criticRan = $state(false);
  let preparedPr = $state(false);
  let claimDraft = $state(
    'This HIPAA compliant pack de-identifies patient notes before sending a clean Slack update.'
  );

  const currentView = $derived(views.find((view) => view.id === activeView) ?? views[0]);
  const currentFile = $derived(packFiles.find((file) => file.path === selectedFile) ?? packFiles[0]);
  const unsafeClaims = $derived(
    claimRules.filter((rule) => claimDraft.toLowerCase().includes(rule.match))
  );
  const packCompleteness = $derived(generated ? 100 : 58);
  const approvalStatus = $derived(approved ? 'approved' : 'waiting for human');
  const criticStatus = $derived(unsafeClaims.length === 0 ? 'pass' : criticRan ? 'blocked' : 'not run');
  const canPublish = $derived(generated && approved && unsafeClaims.length === 0);
  const queryPreview = $derived(
    `?view=${activeView}${activeView === 'workflow' ? `&mode=${workflowMode}` : ''}`
  );
  const riskTier = $derived(
    activeView === 'approval' || unsafeClaims.length > 0 || currentFile.risk === 'high'
      ? 'high'
      : 'medium'
  );
  const generatedFiles = $derived(generated ? packFiles.length : 2);

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    const mode = params.get('mode');

    if (isViewId(view)) {
      activeView = view;
    }

    if (isWorkflowMode(mode)) {
      workflowMode = mode;
    }
  });

  function isViewId(value: string | null): value is ViewId {
    return value !== null && views.some((view) => view.id === value);
  }

  function isWorkflowMode(value: string | null): value is WorkflowMode {
    return value !== null && workflowModes.some((mode) => mode.id === value);
  }

  function setView(view: ViewId) {
    activeView = view;
    syncAddress();
  }

  function setWorkflow(mode: WorkflowMode) {
    workflowMode = mode;
    activeView = 'workflow';
    syncAddress();
  }

  function syncAddress() {
    if (!browser) return;

    const params = new URLSearchParams();
    params.set('view', activeView);
    if (activeView === 'workflow') {
      params.set('mode', workflowMode);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }

  function useSafeCopy() {
    claimDraft =
      'This synthetic demo shows how a local pack can scrub identifiers before a clean record reaches shared tools. The verifier gate blocks egress until residual identifiers are zero.';
    criticRan = true;
  }
</script>

<svelte:head>
  <title>Bonsai Pack Builder Working Demo</title>
  <meta
    name="description"
    content="Working Svelte demo for a Deep Agents harness that turns a regulated workflow into verifier-gated Bonsai packs."
  />
</svelte:head>

<main class="demo-shell">
  <section class="hero">
    <div>
      <p class="eyebrow">Working demo · intelligence density harness</p>
      <h1>Bonsai Pack Builder</h1>
      <p class="lede">
        Convert a healthcare operations workflow into a declarative pack, route model output
        through human approval and verifier gates, then export evidence for Prism-style Bonsai
        benchmarks.
      </p>
    </div>
    <aside class="hero-proof" aria-label="Demo proof">
      <strong>{packCompleteness}%</strong>
      <span>draft completeness</span>
      <small>{generatedFiles} files visible · {approvalStatus} · claim critic {criticStatus}</small>
    </aside>
  </section>

  <nav class="path-tabs" aria-label="Demo pathways">
    {#each views as view (view.id)}
      <button
        type="button"
        class:active={view.id === activeView}
        aria-pressed={view.id === activeView}
        onclick={() => setView(view.id)}
      >
        <span>{view.title}</span>
        <small>{view.promise}</small>
      </button>
    {/each}
  </nav>

  <section class="signal-strip" aria-label="Signal processing model">
    {#each wizardStages as stage, index (stage.id)}
      <article class:done={generated || index < 2} class:current={stage.id === currentFile.stage}>
        <span>{index + 1}</span>
        <strong>{stage.title}</strong>
        <small>{stage.signal}</small>
      </article>
    {/each}
  </section>

  <section class="workspace">
    <aside class="state-card">
      <p class="eyebrow">Addressable state</p>
      <h2>{currentView.title}</h2>
      <code>{queryPreview}</code>
      <dl>
        <div>
          <dt>Local</dt>
          <dd>{workflowMode} view, {selectedFile}</dd>
        </div>
        <div>
          <dt>Draft</dt>
          <dd>{generatedFiles} files, {approvalStatus}</dd>
        </div>
        <div>
          <dt>Server cache</dt>
          <dd>{registryPacks.length} packs, {gateRuns.length} gate records</dd>
        </div>
        <div>
          <dt>Derived</dt>
          <dd>{riskTier} risk, publish {canPublish ? 'ready' : 'blocked'}</dd>
        </div>
      </dl>
    </aside>

    <section class="active-panel">
      {#if activeView === 'workflow'}
        <div class="panel-heading">
          <p class="eyebrow">Wireframes 1A · 1B · 1C</p>
          <h2>Workflow interview to draft pack</h2>
          <div class="segmented" aria-label="Workflow mode">
            {#each workflowModes as mode (mode.id)}
              <button
                type="button"
                class:active={workflowMode === mode.id}
                onclick={() => setWorkflow(mode.id)}
              >
                {mode.wireframe} {mode.label}
              </button>
            {/each}
          </div>
        </div>

        {#if workflowMode === 'chat'}
          <section class="chat-and-draft">
            <div class="chat-stream">
              {#each interviewMessages as message, index (`${message.from}-${index}`)}
                <article class:agent={message.from === 'DeepAgent'}>
                  <strong>{message.from}</strong>
                  <p>{message.text}</p>
                </article>
              {/each}
            </div>
            <div class="draft-meter">
              <h3>Draft assembles alongside the interview</h3>
              <p>
                The agent converts workflow pain into recognizers, policy, schema, eval rows,
                safe claims, and a benchmark report.
              </p>
              <button
                type="button"
                class="primary-action"
                onclick={() => {
                  generated = true;
                  workflowMode = 'ide';
                  syncAddress();
                }}
              >
                Assemble draft pack
              </button>
            </div>
          </section>
        {:else if workflowMode === 'ide'}
          <section class="ide-grid">
            <div class="file-tree">
              <h3>Pack files</h3>
              {#each packFiles as file (file.path)}
                <button
                  type="button"
                  class:active={file.path === selectedFile}
                  onclick={() => {
                    selectedFile = file.path;
                  }}
                >
                  <span>{file.path}</span>
                  <small>{file.risk} risk · {file.stage}</small>
                </button>
              {/each}
            </div>
            <article class="code-card">
              <div class="code-title">
                <div>
                  <p class="eyebrow">{currentFile.stage}</p>
                  <h3>{currentFile.path}</h3>
                </div>
                <span class={`risk ${currentFile.risk}`}>{currentFile.risk}</span>
              </div>
              <p>{currentFile.summary}</p>
              <div class="diff">
                <pre><code>{currentFile.before}</code></pre>
                <pre><code>{currentFile.after}</code></pre>
              </div>
            </article>
          </section>
        {:else}
          <section class="wizard-grid">
            {#each wizardStages as stage, index (stage.id)}
              <article>
                <span>{index + 1}</span>
                <h3>{stage.title}</h3>
                <p>{stage.render}</p>
                <small>{stage.signal}</small>
              </article>
            {/each}
          </section>
        {/if}
      {:else if activeView === 'approval'}
        <div class="panel-heading">
          <p class="eyebrow">Wireframes 2A · 2B · 2C</p>
          <h2>Human-in-the-loop approval</h2>
        </div>
        <section class="approval-grid">
          <article class="approval-card">
            <h3>Inline approval card</h3>
            <p>
              The agent requests permission to write {packFiles.length} files. High-risk files
              require explicit review before any durable change.
            </p>
            <button
              type="button"
              class="primary-action"
              onclick={() => {
                approved = true;
                generated = true;
              }}
            >
              Approve write
            </button>
          </article>
          <article class="diff-review">
            <h3>Full diff before write</h3>
            {#each packFiles.slice(0, 4) as file (file.path)}
              <details open={file.path === currentFile.path}>
                <summary>{file.path}</summary>
                <pre><code>{file.after}</code></pre>
              </details>
            {/each}
          </article>
          <article class="risk-ladder">
            <h3>Risk-tiered action ladder</h3>
            <ol>
              <li><strong>Low:</strong> draft in scratch space.</li>
              <li><strong>Medium:</strong> write files after human review.</li>
              <li><strong>High:</strong> run gates and claim critic before publish.</li>
              <li><strong>Outward:</strong> prepare PR only when evidence is complete.</li>
            </ol>
          </article>
        </section>
      {:else if activeView === 'registry'}
        <div class="panel-heading">
          <p class="eyebrow">Wireframes 3A · 3B · 3C</p>
          <h2>Registry, evidence table, fork path</h2>
        </div>
        <section class="registry-grid">
          <div class="pack-grid">
            {#each registryPacks as pack (pack.id)}
              <article class="pack-card">
                <p class="eyebrow">{pack.domain}</p>
                <h3>{pack.title}</h3>
                <p>{pack.description}</p>
                <span>{pack.gates}</span>
              </article>
            {/each}
          </div>
          <div class="evidence-table" role="table" aria-label="Pack evidence">
            <div role="row" class="table-head">
              <span>Pack</span>
              <span>Eval rows</span>
              <span>Residual IDs</span>
              <span>Benchmark</span>
            </div>
            {#each registryPacks as pack (pack.id)}
              <div role="row">
                <span>{pack.title}</span>
                <span>{pack.evalRows}</span>
                <span>{pack.residualIdentifiers}</span>
                <span>{pack.benchmark}</span>
              </div>
            {/each}
          </div>
          <article class="fork-card">
            <h3>Pack detail to fork to PR</h3>
            <p>
              Fork the care-navigation pack, replace the synthetic evals, run gates, export the
              benchmark report, and open a contribution against the Bonsai demo template.
            </p>
            <button
              type="button"
              class="primary-action"
              onclick={() => {
                preparedPr = true;
              }}
            >
              Prepare contribution checklist
            </button>
            {#if preparedPr}
              <p class="success">Checklist ready: evals, policy proof, safe claims, benchmark report.</p>
            {/if}
          </article>
        </section>
      {:else if activeView === 'claims'}
        <div class="panel-heading">
          <p class="eyebrow">Wireframes 4A · 4B · 4C</p>
          <h2>Claim guardrails and critic gate</h2>
        </div>
        <section class="claims-grid">
          <article>
            <h3>Allowed</h3>
            <ul>
              {#each allowedClaims as claim (claim)}
                <li>{claim}</li>
              {/each}
            </ul>
          </article>
          <article>
            <h3>Cannot say</h3>
            <ul>
              {#each blockedClaims as claim (claim)}
                <li>{claim}</li>
              {/each}
            </ul>
          </article>
          <article class="claim-editor">
            <label for="claim-copy">Inline lint</label>
            <textarea id="claim-copy" bind:value={claimDraft}></textarea>
            <div class="claim-actions">
              <button
                type="button"
                onclick={() => {
                  criticRan = true;
                }}
              >
                Run claim critic
              </button>
              <button type="button" class="primary-action" onclick={useSafeCopy}>Use safe copy</button>
            </div>
            {#if unsafeClaims.length > 0}
              <div class="lint-list">
                {#each unsafeClaims as rule (rule.match)}
                  <p><strong>{rule.label}:</strong> {rule.replacement}</p>
                {/each}
              </div>
            {:else}
              <p class="success">Claim critic passes. Copy cites the proof without overclaiming.</p>
            {/if}
          </article>
        </section>
      {:else}
        <div class="panel-heading">
          <p class="eyebrow">Wireframes 5A · 5B · 5C</p>
          <h2>CLI interview, approval, gates</h2>
        </div>
        <section class="terminal-card" aria-label="CLI transcript">
          {#each cliTranscript as line (line)}
            <code class:pass={line.startsWith('PASS')} class:review={line.startsWith('REVIEW')}>
              {line}
            </code>
          {/each}
        </section>
      {/if}
    </section>
  </section>

  <section class="gate-board">
    <div>
      <p class="eyebrow">Evidence before claims</p>
      <h2>Verifier and benchmark state</h2>
    </div>
    <div class="gates">
      {#each gateRuns as gate (gate.id)}
        <article class={gate.status}>
          <span>{gate.status}</span>
          <h3>{gate.label}</h3>
          <p>{gate.evidence}</p>
        </article>
      {/each}
    </div>
  </section>
</main>
