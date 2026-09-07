<script lang="ts">
  import { onMount } from "svelte";
  import projectsData from "../data/projects.json";
  import ProjectTile from "./ProjectTile.svelte";

  let timelineEl: HTMLElement;
  let timelineFillEl: HTMLElement;
  let cards: HTMLElement[] = [];

  const leftProjects = projectsData.projects.filter(
    (project) => project.side === "left",
  );

  const rightProjects = projectsData.projects.filter(
    (project) => project.side === "right",
  );

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
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

    window.addEventListener("scroll", updateTimelineFill, {
      passive: true,
    });

    window.addEventListener("resize", updateTimelineFill);

    updateTimelineFill();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateTimelineFill);
      window.removeEventListener("resize", updateTimelineFill);
    };
  });
</script>

<section id="projects" class="page">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">{projectsData.eyebrow}</div>
      <h2>{projectsData.title}</h2>
      <p class="sub">{projectsData.sub}</p>
    </div>

    <div class="projects-timeline" bind:this={timelineEl}>
      <div class="timeline-track"></div>

      <div class="timeline-fill" bind:this={timelineFillEl}></div>

      <div class="projects-grid">
        <div class="column left-column">
          {#each leftProjects as project, i}
            <div bind:this={cards[i * 2]} class="project-item">
              <ProjectTile {project} side="left" />
            </div>
          {/each}
        </div>

        <div class="column right-column">
          {#each rightProjects as project, i}
            <div bind:this={cards[i * 2 + 1]} class="project-item">
              <ProjectTile {project} side="right" />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .projects-timeline {
    position: relative;
    width: 100%;
  }

  .timeline-track {
    position: absolute;
    left: 50%;
    top: 10px;
    bottom: 10px;
    width: 4px;
    transform: translateX(-50%);
    background: rgba(140, 160, 255, 0.1);
    border-radius: 4px;
  }

  .timeline-fill {
    position: absolute;
    left: 50%;
    top: 10px;
    width: 4px;
    height: 0;
    transform: translateX(-50%);
    background: linear-gradient(
      180deg,
      var(--accent-cyan),
      var(--accent-blue),
      var(--accent-purple)
    );
    box-shadow: 0 0 24px 4px rgba(123, 166, 247, 0.55);
    border-radius: 4px;
    transition: height 0.08s linear;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    position: relative;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 20vh;
  }

  .right-column {
    margin-top: 40vh;
  }

  .project-item {
    width: 100%;
  }
</style>
