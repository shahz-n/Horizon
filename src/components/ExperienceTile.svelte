<script lang="ts">
  import TimelineDot from "./TimelineDot.svelte";

  export let role: {
    title: string;
    company: string;
    domain: string;
    period: string;
    summary: string;
    bullets: string[];
    stack: string[];
  };

  export let side: "left" | "right";
</script>

<div class="relative w-full">
  <TimelineDot {side} />

  <div class="timeline-card glass-glow glass">
    <div class="glow-border"></div>
    <div class="card-header flex justify-between items-start gap-4 flex-wrap relative z-10 text-left">
      <div>
        <div class="role-title text-xl font-semibold text-text text-left">{role.title}</div>
        <div class="role-company text-base text-accent-purple font-medium mt-1 text-left">{role.company}</div>
      </div>
      <div class="role-meta flex gap-2 flex-wrap items-center">
        <span class="tag domain-tag px-3 py-0.5 rounded-full border border-[rgba(140,160,255,0.12)] font-mono text-xs text-accent-cyan bg-[rgba(103,232,249,0.08)]">{role.domain}</span>
        <span class="tag period-tag px-3 py-0.5 rounded-full border border-[rgba(140,160,255,0.12)] font-mono text-xs text-text-secondary bg-[rgba(255,255,255,0.04)]">{role.period}</span>
      </div>
    </div>
    <p class="role-summary mt-3.5 text-base text-text font-medium leading-relaxed relative z-10 text-left">{role.summary}</p>
    <ul class="role-bullets mt-4 relative z-10 text-left">
      {#each role.bullets as bullet}
        <li>{bullet}</li>
      {/each}
    </ul>
    <div class="stack-list mt-5 pt-4 border-t border-[rgba(140,160,255,0.08)] flex gap-2 flex-wrap relative z-10">
      {#each role.stack as tech}
        <span class="tech-badge font-mono text-xs text-accent-blue bg-[rgba(123,166,247,0.08)] border border-[rgba(123,166,247,0.15)] px-2 py-0.5 rounded">{tech}</span>
      {/each}
    </div>
  </div>
</div>

<style>
  .timeline-card { padding: 34px 38px; width: 100%; opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; text-align: left; }
  :global(.in-view) .timeline-card { opacity: 1; transform: translateY(0); }
  .role-title { font-size: 21px; font-weight: 600; color: var(--text); }
  .role-company { font-size: 15px; color: var(--accent-purple); font-weight: 500; margin-top: 4px; }
  .tag { padding: 3px 12px; border-radius: 999px; border: 1px solid var(--glass-border); font-family: var(--ff-mono); font-size: 11.5px; }
  .domain-tag { color: var(--accent-cyan); background: rgba(103, 232, 249, 0.08); }
  .period-tag { color: var(--text-secondary); background: rgba(255, 255, 255, 0.04); }
  .role-summary { margin-top: 14px; font-size: 15.5px; color: var(--text); font-weight: 500; }
  .role-bullets { margin-top: 16px; }
  .role-bullets li { position: relative; padding-left: 18px; color: var(--text-secondary); font-size: 14.5px; margin-bottom: 9px; line-height: 1.65; }
  .role-bullets li::before { content: ""; position: absolute; left: 0; top: 9px; width: 5px; height: 5px; border-radius: 50%; background: var(--accent-blue); opacity: 0.7; }
  .stack-list { margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(140, 160, 255, 0.08); }
  .tech-badge { font-family: var(--ff-mono); font-size: 11px; color: var(--accent-blue); background: rgba(123, 166, 247, 0.08); border: 1px solid rgba(123, 166, 247, 0.15); padding: 3px 9px; border-radius: 6px; }
</style>
