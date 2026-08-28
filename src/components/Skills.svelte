<script lang="ts">
  import { onMount } from "svelte";
  import skillsData from "../data/skills.json";
  import { cn } from "../lib/utils";

  let tiles: HTMLElement[] = [];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    tiles.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<section id="skills" class="page">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">{skillsData.eyebrow}</div>
      <h2>{skillsData.title}</h2>
      <p class="sub">{skillsData.sub}</p>
    </div>

    <div
      class={cn(`portfolio-skills-grid grid gap-2.5 w-full overflow-hidden`)}
    >
      {#each skillsData.skills as skill, i}
        <div
          class={cn(
            `skill-tile glass-glow glass relative flex flex-col items-start justify-between overflow-hidden text-left`,
            skill.size === "s-2x2" ? `lg:col-span-2 lg:row-span-2` : ``,
          )}
          bind:this={tiles[i]}
          style="transition-delay: {i * 30}ms"
        >
          <div class="glow-border"></div>

          <div
            class={cn(
              `portfolio-skill-icon absolute z-10 w-full h-[80%] flex top-0 left-0 items-center justify-center`,
            )}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              loading="lazy"
              class="w-3/4 h-3/4 object-contain"
              style="filter: drop-shadow(0 0 10px rgba(123, 166, 247, 0.25));"
            />
          </div>

          <div
            class={cn(
              `portfolio-skill-info absolute bottom-0 z-10 w-full p-4 text-center`,
            )}
          >
            <div
              class={cn(
                `portfolio-skill-name font-display font-semibold text-text text-center leading-tight`,
              )}
            >
              {skill.name}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .portfolio-skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    .portfolio-skills-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 800px) {
    .portfolio-skills-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (max-width: 1200px) {
    .portfolio-skills-grid {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .portfolio-skills-grid {
      grid-template-columns: repeat(8, 1fr);
    }
  }

  .skill-tile {
    opacity: 0;
    transform: scale(0.92);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease,
      border-color 0.3s ease,
      background 0.3s ease;
    aspect-ratio: 1 / 1;
    max-height: 400px;
  }
  .skill-tile:global(.in-view) {
    opacity: 1;
    transform: scale(1);
  }
  .portfolio-skill-name {
    font-size: clamp(12px, 1.25vw, 19px);
    line-height: 1.2;
  }
</style>
