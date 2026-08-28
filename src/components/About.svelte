<script lang="ts">
  import aboutData from '../data/about.json';
</script>

<section id="about">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">{aboutData.eyebrow}</div>
      <h2>{aboutData.title}</h2>
    </div>

    <p class="summary">
      I'm a <strong>full-stack software engineer</strong> with six-plus years of hands-on
      experience building production systems across <strong>fintech, HR-tech, and marketplace</strong>
      platforms — in environments ranging from early-stage startups to large enterprises. My depth
      is in <strong>backend architecture</strong>, <strong>distributed systems</strong>, and
      <strong>performance</strong>, alongside real experience building complex frontend
      applications and real-time interfaces. I like owning systems end-to-end: architecture,
      data modeling, implementation, and deployment.
    </p>

    <div class="stat-row">
      {#each aboutData.stats as stat, i}
        <div class="stat-tile glass-glow glass reveal" data-reveal-delay={i * 100}>
          <div class="glow-border"></div>
          <div class="num">{stat.value}</div>
          <div class="label">{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .summary {
    max-width: 780px;
    color: var(--text-secondary);
    font-size: 18px;
    line-height: 1.8;
  }

  .summary strong {
    color: var(--text);
    font-weight: 600;
  }

  .stat-row {
    margin-top: 56px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .stat-tile {
    padding: 28px 26px;
    position: relative;
    overflow: hidden;
  }

  .num {
    font-family: var(--ff-display);
    font-size: 36px;
    font-weight: 700;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .label {
    margin-top: 8px;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .glass-glow {
    --glow-x: 50%;
    --glow-y: 50%;
    --glow-opacity: 0;
  }

  .glow-border {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: radial-gradient(
      300px circle at var(--glow-x) var(--glow-y),
      rgba(123, 166, 247, 0.25),
      rgba(167, 139, 250, 0.15),
      transparent 70%
    );
    opacity: var(--glow-opacity);
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 0;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    padding: 1px;
  }

  :global(.reveal) {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  :global(.reveal.revealed) {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 800px) {
    .stat-row {
      grid-template-columns: 1fr;
    }
  }
</style>
