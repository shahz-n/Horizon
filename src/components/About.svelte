<script lang="ts">
  import aboutData from '../data/about.json';
  import { cn } from '../lib/utils';
</script>

<section id="about" class="page">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">{aboutData.eyebrow}</div>
      <h2>{aboutData.title}</h2>
    </div>

    <p class={cn(`summary max-w-3xl text-text-secondary text-lg leading-relaxed`)}>
      I'm a <strong>full-stack software engineer</strong> with six-plus years of hands-on
      experience building production systems across <strong>fintech, HR-tech, and marketplace</strong>
      platforms — in environments ranging from early-stage startups to large enterprises. My depth
      is in <strong>backend architecture</strong>, <strong>distributed systems</strong>, and
      <strong>performance</strong>, alongside real experience building complex frontend
      applications and real-time interfaces. I like owning systems end-to-end: architecture,
      data modeling, implementation, and deployment.
    </p>

    <div class={cn(`portfolio-stat-row mt-14 grid grid-cols-3 gap-5 max_md:grid-cols-1`)}>
      {#each aboutData.stats as stat, i}
        <div class={cn(`portfolio-stat-tile glass-glow glass reveal p-7 relative overflow-hidden`)} data-reveal-delay={i * 100}>
          <div class="glow-border"></div>
          <div class={cn(`portfolio-num gradient-text-primary font-display text-4xl font-bold leading-tight`)}>{stat.value}</div>
          <div class={cn(`portfolio-label mt-2 text-sm text-text-secondary leading-relaxed`)}>{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .stat-tile { padding: 28px 26px; position: relative; overflow: hidden; }
  .glow-border { position: absolute; inset: -1px; border-radius: inherit; background: radial-gradient(300px circle at var(--glow-x) var(--glow-y), rgba(123, 166, 247, 0.25), rgba(167, 139, 250, 0.15), transparent 70%); opacity: var(--glow-opacity); transition: opacity 0.4s ease; pointer-events: none; z-index: 0; mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: exclude; -webkit-mask-composite: xor; padding: 1px; }
  :global(.reveal) { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  :global(.reveal.revealed) { opacity: 1; transform: translateY(0); }
</style>
