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

  <div
    class="timeline-card glass-glow glass high-saturation
           w-full px-8 py-7
           text-left
           opacity-0 translate-y-8
           transition-[opacity,transform]
           duration-700 ease-out
           [.in-view_&]:translate-y-0
           [.in-view_&]:opacity-100"
  >
    <div class="glow-border"></div>

    <div
      class="relative z-10 flex flex-wrap items-center justify-between gap-1"
    >
      <!-- Title -->
      <div
        class="flex w-full items-center justify-between gap-3
               text-left text-xl font-bold text-[var(--text)]"
      >
        {role.title}

        <span
          class="shrink-0 rounded-full
                 border border-(--glass-border)
                 bg-[white]/10
                 px-3 py-0.5
                 font-mono text-xs font-semibold
                 text-[var(--text-secondary)]"
        >
          {role.period}
        </span>
      </div>

      <!-- Company -->
      <div
        class="flex w-full items-center justify-between gap-3
               text-left text-sm font-bold text-[var(--accent-purple)]"
      >
        {role.company}

        <span
          class="shrink-0 rounded-full
                 border border-(--glass-border)
                 bg-[rgba(103,232,249,0.08)]
                 px-3 py-0.5
                 font-mono text-xs font-semibold
                 text-[var(--accent-cyan)]"
        >
          {role.domain}
        </span>
      </div>

      <!-- Summary -->
      <p
        class="relative z-10 mt-4! w-full
               text-left text-base font-medium
               leading-relaxed text-[var(--text)]"
      >
        {role.summary}
      </p>
    </div>

    <!-- Responsibilities -->
    <ul
      class="role-bullets relative z-10 mt-4
             space-y-2 text-left"
    >
      {#each role.bullets as bullet}
        <li
          class="relative pl-[18px]
                 text-sm font-medium
                 leading-[1.6]
                 text-[var(--text-secondary)]"
        >
          {bullet}
        </li>
      {/each}
    </ul>

    <!-- Stack -->
    <div
      class="relative z-10 mt-3 flex flex-wrap
             gap-1.5 border-t border-(--glass-border)
             pt-4"
    >
      {#each role.stack as tech}
        <span
          class="rounded-full
                 border border-(--glass-border-strong)
                 bg-(--accent-blue)/10
          
                 px-3 py-0.5
                 font-mono text-xs font-semibold
                 text-(--accent-blue)"
        >
          {tech}
        </span>
      {/each}
    </div>
  </div>
</div>

<style>
  /* Custom bullet marker */
  .role-bullets li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 10px;
    width: 5px;
    height: 5px;
    border-radius: 9999px;
    background: var(--accent-cyan);
    opacity: 0.75;
  }
</style>
