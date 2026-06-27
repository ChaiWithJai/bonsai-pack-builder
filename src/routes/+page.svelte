<script lang="ts">
  import { screens, services } from '$lib/state-model';

  let selected = $state(screens[1]?.id ?? screens[0].id);
  let selectedScreen = $derived(screens.find((screen) => screen.id === selected) ?? screens[0]);
</script>

<svelte:head>
  <title>Bonsai Pack Builder</title>
  <meta
    name="description"
    content="Deep Agents and SvelteKit harness for authoring verifier-gated Bonsai workflow packs."
  />
</svelte:head>

<main class="page-shell">
  <section class="hero">
    <p class="eyebrow">Deep Agents harness seed</p>
    <h1>Bonsai Pack Builder</h1>
    <p class="lede">
      Turn regulated workflow pain into a declarative pack, synthetic evals, verifier proof,
      benchmark evidence, and publish-safe business-case copy.
    </p>
    <div class="hero-actions">
      <a href="https://github.com/ChaiWithJai/bonsai-pack-builder/blob/main/docs/advisory-brief.md">Advisory brief</a>
      <a href="https://github.com/ChaiWithJai/bonsai-pack-builder/blob/main/docs/prd.md">Read PRD</a>
      <a href="https://github.com/ChaiWithJai/bonsai-pack-builder/blob/main/docs/rfcs/0001-deepagent-pack-builder.md">Read RFC</a>
      <a href="https://github.com/ChaiWithJai/bonsai-pack-builder/blob/main/docs/demo-runbook.md">Demo runbook</a>
    </div>
  </section>

  <section class="grid">
    <article class="panel">
      <h2>Finite state map</h2>
      <div class="screen-list" aria-label="Screens">
        {#each screens as screen (screen.id)}
          <button
            class:selected={screen.id === selected}
            type="button"
            onclick={() => {
              selected = screen.id;
            }}
          >
            <span>{screen.title}</span>
            <small>{screen.route}</small>
          </button>
        {/each}
      </div>
    </article>

    <article class="panel detail">
      <p class="eyebrow">{selectedScreen.route}</p>
      <h2>{selectedScreen.title}</h2>
      <h3>Renders</h3>
      <ul>
        {#each selectedScreen.renders as item (item)}
          <li>{item}</li>
        {/each}
      </ul>
      <h3>Components</h3>
      <p>{selectedScreen.components.join(' · ')}</p>
      <h3>State</h3>
      <div class="state-grid">
        {#each Object.entries(selectedScreen.state) as [owner, values] (owner)}
          <section>
            <strong>{owner}</strong>
            <span>{values.join(', ')}</span>
          </section>
        {/each}
      </div>
      <h3>Trust gates</h3>
      <ul>
        {#each selectedScreen.gates as gate (gate)}
          <li>{gate}</li>
        {/each}
      </ul>
    </article>
  </section>

  <section class="panel">
    <h2>Service map state</h2>
    <div class="services">
      {#each services as service (service.id)}
        <article>
          <span class={`status ${service.status}`}>{service.status}</span>
          <h3>{service.name}</h3>
          <p><strong>Runs:</strong> {service.runsWhere}</p>
          <p>{service.responsibility}</p>
          <p class="next"><strong>Next proof:</strong> {service.nextProof}</p>
        </article>
      {/each}
    </div>
  </section>
</main>
