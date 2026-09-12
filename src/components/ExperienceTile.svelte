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
    class="timeline-card glass high-saturation
           w-full px-8 py-7 max_md:px-6 max_md:py-5
           text-left reveal
           opacity-0"
  >
    <div
      class="relative z-10 flex flex-wrap items-center justify-between gap-1"
    >
      <!-- Title -->
      <div
        class="flex w-full items-center justify-between gap-3
               text-left text-xl font-bold"
      >
        {role.title}

        <span
          class="shrink-0 rounded-full
                 border border-(--glass-border)
                 bg-[white]/10
                 px-3 py-0.5 max-lg:hidden
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
                 bg-(--tag-cyan-bg)
                 px-3 py-0.5
                 font-mono text-xs font-semibold
                 text-[var(--accent-cyan)] max-lg:hidden"
        >
          {role.domain}
        </span>
      </div>

      <!-- Standalone metadata row -->
      <div
        class="flex w-full items-center justify-start gap-1.5
               mt-1 lg:hidden"
      >
        <!-- Period -->
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

        <!-- Domain -->
        <span
          class="shrink-0 rounded-full
                 border border-(--glass-border)
                 bg-(--tag-cyan-bg)
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
      class="role-bullets relative z-10 mt-2!
             space-y-2 text-left"
    >
      {#each role.bullets as bullet}
        <li
          class="relative pl-(--list-item-indent)
                 text-sm
                 leading-[1.6]
                 text-[var(--text-secondary)]"
        >
          {@html bullet}
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
  .role-bullets li::before {
    content: "";
    position: absolute;
    left: 0;
    top: var(--list-marker-offset);
    width: var(--list-marker-size);
    height: var(--list-marker-size);
    border-radius: 9999px;
    background: var(--accent-cyan);
    opacity: 0.75;
  }
</style>
