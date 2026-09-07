<script lang="ts">
  export let project: {
    title: string;
    tagline: string;
    meta: string;
    tags: string[];
    description: string;
    color: string;
  };

  export let side: "left" | "right";
</script>

<div class="relative w-full" style={`--project-color: ${project.color}`}>
  <div
    class:s-right={side === "left"}
    class:s-left={side === "right"}
    class="timeline-dot absolute top-1/2 z-5
           h-4 w-4 -translate-y-1/2 rounded-full
           border-[3px] border-[var(--text-faint)]
           bg-[var(--nebula-mid)]
           transition-[border-color,box-shadow,background,transform]
           duration-500
           [.in-view_&]:border-[var(--accent-blue)]
           [.in-view_&]:bg-[var(--accent-cyan)]
           [.in-view_&]:scale-[1.15]
           [.in-view_&]:shadow-[0_0_24px_6px_rgba(103,232,249,0.6)]"
  ></div>

  <div
    class="glass-glow glass group
           w-full overflow-hidden
           opacity-0 translate-y-8
           transition-[opacity,transform] duration-700 ease-out
           [.in-view_&]:opacity-100
           [.in-view_&]:translate-y-0"
  >
    <div class="glow-border"></div>

    <div
      class="relative h-[280px] w-full overflow-hidden
             border-b border-[var(--glass-border)]
             bg-black/40"
    >
      <div
        class="flex h-full w-full flex-col items-center justify-center gap-3
               bg-[radial-gradient(circle_at_center,rgba(120,140,255,0.05),transparent_70%)]
               text-[var(--text-faint)]"
      >
        <span class="opacity-35">
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </span>

        <span
          class="font-mono text-[0.6875rem] uppercase
                 tracking-[0.1em] opacity-35"
        >
          Project visual
        </span>
      </div>

      <div
        class="pointer-events-none absolute bottom-4 left-4 z-10
               flex flex-wrap gap-2"
      >
        {#each project.tags as tag, tagIndex}
          <span
            class="rounded-full
                   border border-[rgba(140,180,255,0.3)]
                   bg-[rgba(10,14,30,0.82)]
                   px-3 py-[5px]
                   font-mono text-[0.6875rem] text-[var(--text)]
                   opacity-0 translate-y-4
                   shadow-[0_4px_16px_rgba(0,0,0,0.4)]
                   backdrop-blur-[14px] backdrop-saturate-[150%]
                   transition-[opacity,transform] duration-350 ease-out
                   group-hover:opacity-100
                   group-hover:translate-y-0"
            style={`transition-delay: ${tagIndex * 40}ms`}
          >
            {tag}
          </span>
        {/each}
      </div>
    </div>

    <div class="p-[30px_34px] text-left">
      <div class="flex items-start justify-between gap-4">
        <div
          class="font-display text-xl font-semibold leading-tight
                 text-[var(--text)]"
        >
          {project.title}
        </div>

        <div
          class="mt-1 shrink-0 font-mono text-[0.625rem] font-medium
                 uppercase tracking-[0.12em]
                 text-[var(--accent-cyan)]"
        >
          {project.meta}
        </div>
      </div>

      <p
        class="mt-3 text-[0.90625rem] font-medium leading-relaxed
               text-[var(--accent-purple)]"
      >
        {project.tagline}
      </p>

      <p class="mt-4 text-sm leading-[1.7] text-[var(--text-secondary)]">
        {project.description}
      </p>
    </div>
  </div>
</div>

<style>
  .s-right {
    right: -38px;
  }

  .s-left {
    left: -38px;
  }
</style>
