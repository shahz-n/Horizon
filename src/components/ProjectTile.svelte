<script lang="ts">
  import Github from "./icons/Github.svelte";
  import TimelineDot from "./TimelineDot.svelte";

  export let project: {
    title: string;
    tagline: string;
    meta: string[];
    tags: string[];
    description: string;
    color: string;
    image: string;
    github?: string;
  };

  export let side: "left" | "right";

  let imageError = false;
</script>

<div class="relative w-full" style={`--project-color: ${project.color}`}>
  <TimelineDot {side} />

  <div
    class="project-card glass high-saturation group
           w-full overflow-hidden
           text-left reveal
           opacity-0"
  >
    <div class="relative w-full px-8 pt-8 max_md:px-6 max_md:pt-6">
      <div class="relative aspect-video overflow-hidden rounded-sm bg-black/30">
        {#if project.image && !imageError}
          <img
            src={project.image}
            alt={project.title}
            class="block h-full w-full object-cover"
            onerror={() => (imageError = true)}
          />
        {:else}
          <div
            class="flex h-full w-full items-center justify-center
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
          </div>
        {/if}

        {#if project.github}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            class="absolute! bottom-4 right-4
                   flex items-center gap-2
                   rounded-sm! border border-(--glass-border)
                   bg-black/50! px-3 py-3 pr-4
                   font-mono text-sm font-medium
                   text-white opacity-0!
                   backdrop-blur-sm
                   glass
                   transition-opacity duration-300
                   group-hover:opacity-100!"
          >
            <Github class="h-5 w-5" />
            View on GitHub
          </a>
        {/if}
      </div>
    </div>

    <div class="px-8 py-7 max_md:px-5 max_md:py-5">
      <div class="flex flex-col items-center justify-center gap-1">
        <div
          class="relative z-10 flex w-full items-center
                 justify-between gap-3"
        >
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

        <p
          class="w-full text-sm font-medium max_sm:text-xs
                 leading-relaxed text-(--accent-purple)"
        >
          {project.tagline}
        </p>
      </div>

      <p
        class="mt-4! text-sm
               leading-[1.6] text-(--text-secondary)"
      >
        {@html project.description}
      </p>

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
