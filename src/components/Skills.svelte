<script lang="ts">
  import { onMount } from "svelte";
  import skillsData from "../data/skills.json";

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
      class="grid w-full gap-1.5 md:gap-2 lg:gap-2.5 grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
    >
      {#each skillsData.skills as skill, i}
        <div
          class={`skill-tile glass reveal high-saturation relative flex aspect-square max-h-(--skill-tile-max-height) flex-col items-start justify-between overflow-hidden text-left ${skill.size === "s-2x2" ? "col-span-2 row-span-2" : ""}`}
          bind:this={tiles[i]}
        >
          <div
            class="portfolio-skill-icon absolute top-0 left-0 z-10 flex h-[80%] w-full items-center justify-center"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              loading="lazy"
              class:invert={skill.inverted}
              class="h-3/4 w-3/4 object-contain"
            />
          </div>

          <div
            class="portfolio-skill-info absolute bottom-0 z-10 w-full p-2 text-center sm:p-3 lg:p-4"
          >
            <div
              class="portfolio-skill-name text-center font-display font-semibold leading-tight text-sm lg:text-base text-text"
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
  .portfolio-skill-name {
    font-size: clamp(12px, 1.25vw, 19px);
    line-height: 1.2;
  }
</style>
