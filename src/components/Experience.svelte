<script lang="ts">
  import { onMount } from "svelte";
  import expData from "../data/experience.json";
  import ExperienceTile from "./ExperienceTile.svelte";

  let timelineEl: HTMLElement;
  let timelineFillEl: HTMLElement;
  let cards: HTMLElement[] = [];

  const leftRoles = expData.roles.filter((role) => role.side === "left");
  const rightRoles = expData.roles.filter((role) => role.side === "right");

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    cards.forEach((card) => {
      if (card) observer.observe(card);
    });

    function updateTimelineFill() {
      if (!timelineEl || !timelineFillEl) return;
      const rect = timelineEl.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH * 0.5;
      const covered = viewportH * 0.5 - rect.top;
      const percentage = Math.max(0, Math.min(1, covered / total)) * 100;
      timelineFillEl.style.height = `${percentage}%`;
    }

    window.addEventListener("scroll", updateTimelineFill, { passive: true });
    window.addEventListener("resize", updateTimelineFill);
    updateTimelineFill();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateTimelineFill);
      window.removeEventListener("resize", updateTimelineFill);
    };
  });
</script>

<section id="experience" class="page">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">{expData.eyebrow}</div>
      <h2>{expData.title}</h2>
      <p class="sub">{expData.sub}</p>
    </div>

    <div class="experience-timeline" bind:this={timelineEl}>
      <div class="timeline-track"></div>
      <div class="timeline-fill" bind:this={timelineFillEl}></div>

      <div class="experience-grid">
        <div class="column left-column">
          {#each leftRoles as role, i}
            <div bind:this={cards[i * 2]} class="experience-item">
              <ExperienceTile {role} side="left" />
            </div>
          {/each}
        </div>

        <div class="column right-column">
          {#each rightRoles as role, i}
            <div bind:this={cards[i * 2 + 1]} class="experience-item">
              <ExperienceTile {role} side="right" />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .experience-timeline { position: relative; width: 100%; }
  .timeline-track { position: absolute; left: 50%; top: 10px; bottom: 10px; width: 4px; transform: translateX(-50%); background: rgba(140, 160, 255, 0.1); border-radius: 4px; }
  .timeline-fill { position: absolute; left: 50%; top: 10px; width: 4px; height: 0; transform: translateX(-50%); background: linear-gradient(180deg, var(--accent-cyan), var(--accent-blue), var(--accent-purple)); box-shadow: 0 0 24px 4px rgba(123, 166, 247, 0.55); border-radius: 4px; transition: height 0.08s linear; }
  .experience-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; position: relative; }
  .column { display: flex; flex-direction: column; gap: 20vh; }
  .right-column { margin-top: 20vh; }
  .experience-item { width: 100%; }
</style>
