<script lang="ts">
  import TimelineDot from "./TimelineDot.svelte";

  export let project: {
    title: string;
    tagline: string;
    meta: string[];
    tags: string[];
    description: string;
    color: string;
  };

  export let side: "left" | "right";
</script>

<div class="relative w-full" style={`--project-color: ${project.color}`}>
  <TimelineDot {side} />

  <div
    class="project-card glass high-saturation group
           w-full overflow-hidden
           text-left
           opacity-0 translate-y-8
           transition-[opacity,transform]
           duration-700 ease-out
           [.in-view_&]:translate-y-0
           [.in-view_&]:opacity-100"
  >
    <!-- Project visual -->
    <div
      class="relative h-(--project-visual-height) w-full overflow-hidden
             border-b border-(--glass-border)
             bg-black/40"
    >
      <div
        class="flex h-full w-full flex-col items-center justify-center gap-3
               bg-(image:--project-visual-bg)
               text-(--text-faint)"
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
          class="font-mono text-[length:var(--project-visual-label-size)] uppercase
                 tracking-[0.1em] opacity-35"
        >
          Project visual
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="px-8 py-7 max_md:px-5 max_md:py-5">
      <div class="flex flex-col items-center justify-center gap-1">
        <div
          class="relative z-10 flex w-full items-center
                 justify-between gap-3"
        >
          <!-- Title -->
          <h3
            class="text-xl font-bold leading-tight max_md:text-lg
                   text-(--text)"
          >
            {project.title}
          </h3>

          <div class="flex flex-wrap justify-end gap-1.5">
            {#each project.meta as tag}
              <span
                class="shrink-0 rounded-full
                       border border-(--glass-border)
                       bg-(--tag-cyan-bg)
                       px-3 py-0.5
                       font-mono text-xs font-semibold
                       text-(--accent-cyan)"
              >
                {tag}
              </span>
            {/each}
          </div>
        </div>

        <!-- Tagline -->
        <p
          class="w-full text-sm font-medium max_sm:text-xs
                 leading-relaxed text-(--accent-purple)"
        >
          {project.tagline}
        </p>
      </div>

      <!-- Description -->
      <p
        class="mt-4! text-sm
               leading-[1.6] text-(--text-secondary)"
      >
        {project.description}
      </p>

      <!-- Stack -->
      <div
        class="relative z-10 mt-3 flex flex-wrap
               gap-1.5 border-t border-(--glass-border)
               pt-4"
      >
        {#each project.tags as tech}
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
</div>
