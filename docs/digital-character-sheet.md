---
title: character sheet
icon: material/badge-account-horizontal
---

<div class="sheet-app">
  <header class="sheet-header">
    <div>
      <h1>TNC Character Sheet</h1>
      <p class="muted">Stored in browser localStorage</p>
    </div>
  </header>

  <section class="hud">
    <div class="hud-item">
      <label>Name</label>
      <input id="name" />
    </div>
    <div class="hud-item">
      <label>Level</label>
      <input id="level" type="number" value="1" />
    </div>
    <div class="hud-item">
      <label>HP</label>
      <div class="inline-pair">
        <input id="hpCur" type="number" value="10" />
        <span>/</span>
        <input id="hpMax" type="number" value="10" />
      </div>
    </div>
    <div class="hud-item">
      <label>Infection</label>
      <input id="infectionLevel" type="number" value="0" />
    </div>
    <div class="hud-item">
      <label>Chance Pool</label>
      <div class="inline-pair">
        <input id="chanceCur" type="number" value="0" />
        <span>/</span>
        <input id="chanceMax" type="number" value="0" />
      </div>
    </div>
    <div class="hud-item">
      <label>Defense</label>
      <input id="defense" disabled />
    </div>
    <div class="hud-item">
      <label>Speed</label>
      <input id="speed" disabled />
    </div>
  </section>

  <nav class="tabs">
    <button class="tab-btn active" data-tab="play">Play</button>
    <button class="tab-btn" data-tab="build">Build</button>
    <button class="tab-btn" data-tab="gear">Gear</button>
    <button class="tab-btn" data-tab="mutation">Mutation</button>
    <button class="tab-btn" data-tab="story">Story</button>
  </nav>

  <main>
    <section class="tab-panel active" id="tab-play"></section>
    <section class="tab-panel" id="tab-build"></section>
    <section class="tab-panel" id="tab-gear"></section>
    <section class="tab-panel" id="tab-mutation"></section>
    <section class="tab-panel" id="tab-story"></section>
  </main>
</div>

<style>
  :root {
    --panel: #f8f8f8;
    --border: #d8d8d8;
    --text: #222;
    --muted: #666;
    --accent: #7b1e1e;
    --radius: 14px;
    --gap: 12px;
  }

  * {
    box-sizing: border-box;
  }

  .sheet-app {
    max-width: 1200px;
    margin: 0 auto;
  }

  .sheet-header {
    margin-bottom: 1rem;
  }

  .muted {
    color: var(--muted);
    font-size: 0.95rem;
  }

  .hud {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--gap);
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  background: var(--bg);
  padding: 0.25rem 0;
  z-index: 10;
  }

  .hud-item,
  .card {
    min-height: 100px;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.75rem;
  }

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.35rem;
    color: var(--text);
  }

  input,
  textarea,
  select,
  button {
    font: inherit;
    color: var(--text);
  }

  input,
  textarea,
  select {
    width: 100%;
    border: 1px solid #c9c9c9;
    border-radius: 10px;
    padding: 0.6rem 0.7rem;
    background: white;
  }

  textarea {
    resize: vertical;
  }

  .inline-pair {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tab-btn {
    border: 1px solid var(--border);
    background: white;
    color: var(--text);
    border-radius: 999px;
    padding: 0.65rem 1rem;
    cursor: pointer;
  }

  .tab-btn.active {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
  }

  .tab-panel {
    display: none;
  }

  .tab-panel.active {
    display: block;
  }

  .panel-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--gap);
  }

  .card h3 {
    margin-top: 0;
  }

  .col-3 { grid-column: span 3; }
  .col-4 { grid-column: span 4; }
  .col-5 { grid-column: span 5; }
  .col-6 { grid-column: span 6; }
  .col-7 { grid-column: span 7; }
  .col-8 { grid-column: span 8; }
  .col-12 { grid-column: span 12; }

  .row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .btn {
    border: 1px solid #333;
    background: white;
    padding: 0.6rem 0.9rem;
    border-radius: 10px;
    cursor: pointer;
  }

  .mini {
    font-size: 0.8rem;
  }

  @media (max-width: 900px) {
    .hud {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-12 {
      grid-column: span 12;
    }
  }
</style>

<script>
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      tabButtons.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(`tab-${target}`).classList.add("active");
    });
  });
</script>
