<script lang="ts">
  import { onMount } from "svelte";
  import { cn } from "../lib/utils";
  import projectsData from "../data/projects.json";

  let timelineEl: HTMLElement;
  let timelineFillEl: HTMLElement;
  let cards: HTMLElement[] = [];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    cards.forEach((el) => {
      if (el) observer.observe(el);
    });

    function updateTimelineFill() {
      if (!timelineEl || !timelineFillEl) return;
      const rect = timelineEl.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH * 0.5;
      const covered = viewportH * 0.5 - rect.top;
      const pct = Math.max(0, Math.min(1, covered / total)) * 100;
      timelineFillEl.style.height = `${pct}%`;
    }

    const onScroll = () => updateTimelineFill();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateTimelineFill();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
      <!-- Middle divider line -->
      <div class="timeline-track"></div>
      <div class="timeline-fill" bind:this={timelineFillEl}></div>

      <!-- Staggered 2-Column Interleaved Grid with Vertical Overlap -->
      <div class="projects-grid">
        <!-- LEFT COLUMN PROJECTS -->
        <div class="column left-column">
          {#each projectsData.projects.filter((p) => p.side === "left") as project, i}
            <div
              class="project-item left-item"
              bind:this={cards[i * 2]}
              style="--project-color: {project.color}"
            >
              <div class="timeline-dot dot-right"></div>
              <div class="project-card glass-glow glass">
                <div class="glow-border"></div>

                <!-- TALLER Project Image Visual (280px) with Hover Glass Capsules -->
                <div class="project-image">
                  <div class="image-placeholder">
                    <span class="placeholder-icon">
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
                    <span class="placeholder-text">Project visual</span>
                  </div>

                  <!-- Glass capsules floating from bottom left on hover -->
                  <div
                    class={cn(
                      `glass-capsules-container absolute bottom-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none`,
                    )}
                  >
                    {#each project.tags as tag}
                      <span class="glass-capsule">{tag}</span>
                    {/each}
                  </div>
                </div>

                <!-- Project Content -->
                <div class={cn(`project-content p-8 text-left`)}>
                  <div
                    class={cn(
                      `p-title font-display text-xl font-semibold text-text text-left`,
                    )}
                  >
                    {project.title}
                  </div>
                  <p
                    class={cn(
                      `p-tagline text-base text-accent-purple font-medium mt-1 text-left`,
                    )}
                  >
                    {project.tagline}
                  </p>

                  <ul class={cn(`p-bullets mt-4 list-none p-0 text-left`)}>
                    {#each project.bullets as bullet}
                      <li>{bullet}</li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- RIGHT COLUMN PROJECTS (STAGGERED DOWN BY 160px FOR ~25% VERTICAL OVERLAP) -->
        <div class="column right-column">
          {#each projectsData.projects.filter((p) => p.side === "right") as project, i}
            <div
              class="project-item right-item"
              bind:this={cards[i * 2 + 1]}
              style="--project-color: {project.color}"
            >
              <div class="timeline-dot dot-left"></div>
              <div class="project-card glass-glow glass">
                <div class="glow-border"></div>

                <!-- TALLER Project Image Visual (280px) with Hover Glass Capsules -->
                <div class="project-image">
                  <div class="image-placeholder">
                    <span class="placeholder-icon">
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
                    <span class="placeholder-text">Project visual</span>
                  </div>

                  <!-- Glass capsules floating from bottom left on hover -->
                  <div
                    class={cn(
                      `glass-capsules-container absolute bottom-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none`,
                    )}
                  >
                    {#each project.tags as tag}
                      <span class="glass-capsule">{tag}</span>
                    {/each}
                  </div>
                </div>

                <!-- Project Content -->
                <div class={cn(`project-content p-8 text-left`)}>
                  <div
                    class={cn(
                      `p-title font-display text-xl font-semibold text-text text-left`,
                    )}
                  >
                    {project.title}
                  </div>
                  <p
                    class={cn(
                      `p-tagline text-base text-accent-purple font-medium mt-1 text-left`,
                    )}
                  >
                    {project.tagline}
                  </p>

                  <ul class={cn(`p-bullets mt-4 list-none p-0 text-left`)}>
                    {#each project.bullets as bullet}
                      <li>{bullet}</li>
                    {/each}
                  </ul>
                </div>
              </div>
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
    height: 0%;
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
    position: relative;
    width: 100%;
  }

  .timeline-dot {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--nebula-mid);
    border: 3px solid var(--text-faint);
    z-index: 5;
    transition:
      border-color 0.5s ease,
      box-shadow 0.5s ease,
      background 0.5s ease,
      transform 0.4s ease;
  }

  .dot-right {
    right: -38px;
  }
  .dot-left {
    left: -38px;
  }

  .project-item:global(.in-view) .timeline-dot {
    border-color: var(--accent-blue);
    background: var(--accent-cyan);
    box-shadow: 0 0 24px 6px rgba(103, 232, 249, 0.6);
    transform: scale(1.15);
  }

  .project-card {
    padding: 0;
    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity 0.7s ease,
      transform 0.7s ease;
    overflow: hidden;
    width: 100%;
  }

  .project-item:global(.in-view) .project-card {
    opacity: 1;
    transform: translateY(0);
  }

  .project-image {
    width: 100%;
    height: 280px;
    background: rgba(0, 0, 0, 0.4);
    border-bottom: 1px solid var(--glass-border);
    position: relative;
    overflow: hidden;
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--text-faint);
    background: radial-gradient(
      circle at center,
      rgba(120, 140, 255, 0.05),
      transparent 70%
    );
  }

  .placeholder-icon {
    opacity: 0.35;
  }
  .placeholder-text {
    font-family: var(--ff-mono);
    font-size: 0.6875rem;
    opacity: 0.35;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .glass-capsules-container {
    position: absolute;
    bottom: 16px;
    left: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    z-index: 5;
    pointer-events: none;
  }

  .glass-capsule {
    font-family: var(--ff-mono);
    font-size: 0.6875rem;
    color: var(--text);
    background: rgba(10, 14, 30, 0.82);
    border: 1px solid rgba(140, 180, 255, 0.3);
    backdrop-filter: blur(14px) saturate(150%);
    -webkit-backdrop-filter: blur(14px) saturate(150%);
    padding: 5px 12px;
    border-radius: 999px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.35s ease,
      transform 0.35s ease;
  }

  .project-card:hover .glass-capsule {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card:hover .glass-capsule:nth-child(1) {
    transition-delay: 0ms;
  }
  .project-card:hover .glass-capsule:nth-child(2) {
    transition-delay: 40ms;
  }
  .project-card:hover .glass-capsule:nth-child(3) {
    transition-delay: 80ms;
  }
  .project-card:hover .glass-capsule:nth-child(4) {
    transition-delay: 120ms;
  }
  .project-card:hover .glass-capsule:nth-child(5) {
    transition-delay: 160ms;
  }

  .project-content {
    padding: 30px 34px;
    text-align: left;
  }

  .p-title {
    font-family: var(--ff-display);
    font-size: 1.375rem;
    font-weight: 600;
    color: var(--text);
    text-align: left;
  }

  .p-tagline {
    color: var(--accent-purple);
    font-size: 0.90625rem;
    margin-top: 4px;
    font-weight: 500;
    text-align: left;
  }

  .p-bullets {
    margin-top: 16px;
    list-style: none;
    padding: 0;
    text-align: left;
  }

  .p-bullets li {
    position: relative;
    padding-left: 18px;
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: 9px;
    line-height: 1.65;
    text-align: left;
  }

  .p-bullets li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--project-color, var(--accent-cyan));
    opacity: 0.8;
  }
</style>
