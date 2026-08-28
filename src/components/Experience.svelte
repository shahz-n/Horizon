<script lang="ts">
  import { onMount } from "svelte";
  import expData from "../data/experience.json";

  let timelineEl: HTMLElement;
  let timelineFillEl: HTMLElement;
  let items: HTMLElement[] = [];

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

    items.forEach((el) => {
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

<section id="experience">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">{expData.eyebrow}</div>
      <h2>{expData.title}</h2>
      <p class="sub">{expData.sub}</p>
    </div>

    <div class="timeline" bind:this={timelineEl}>
      <!-- Center 4px glowing divider track -->
      <div class="timeline-track"></div>
      <div class="timeline-fill" bind:this={timelineFillEl}></div>

      <!-- Staggered 2-Column Interleaved Layout with Vertical Overlap -->
      <div class="timeline-grid">
        <!-- LEFT COLUMN CARDS -->
        <div class="column left-column">
          {#each expData.roles.filter((e) => e.side === "left") as exp, i}
            <div class="timeline-item left-item" bind:this={items[i * 2]}>
              <div class="timeline-dot dot-right"></div>
              <div class="timeline-card glass-glow glass">
                <div class="glow-border"></div>
                <div class="card-header">
                  <div>
                    <div class="role-title">{exp.title}</div>
                    <div class="role-company">{exp.company}</div>
                  </div>
                  <div class="role-meta">
                    <span class="tag domain-tag">{exp.domain}</span>
                    <span class="tag period-tag">{exp.period}</span>
                  </div>
                </div>

                <p class="role-summary">{exp.summary}</p>

                <ul class="role-bullets">
                  {#each exp.bullets as bullet}
                    <li>{bullet}</li>
                  {/each}
                </ul>

                <div class="stack-list">
                  {#each exp.stack as tech}
                    <span class="tech-badge">{tech}</span>
                  {/each}
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- RIGHT COLUMN CARDS (STAGGERED DOWN BY 140px FOR ~25% VERTICAL OVERLAP) -->
        <div class="column right-column">
          {#each expData.roles.filter((e) => e.side === "right") as exp, i}
            <div class="timeline-item right-item" bind:this={items[i * 2 + 1]}>
              <div class="timeline-dot dot-left"></div>
              <div class="timeline-card glass-glow glass">
                <div class="glow-border"></div>
                <div class="card-header">
                  <div>
                    <div class="role-title">{exp.title}</div>
                    <div class="role-company">{exp.company}</div>
                  </div>
                  <div class="role-meta">
                    <span class="tag domain-tag">{exp.domain}</span>
                    <span class="tag period-tag">{exp.period}</span>
                  </div>
                </div>

                <p class="role-summary">{exp.summary}</p>

                <ul class="role-bullets">
                  {#each exp.bullets as bullet}
                    <li>{bullet}</li>
                  {/each}
                </ul>

                <div class="stack-list">
                  {#each exp.stack as tech}
                    <span class="tech-badge">{tech}</span>
                  {/each}
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
  .timeline {
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

  .timeline-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    position: relative;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 30vh;
  }

  .right-column {
    margin-top: 30vh;
  }

  .timeline-item {
    position: relative;
    width: 100%;
  }

  .timeline-dot {
    position: absolute;
    top: 32px;
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

  .timeline-item:global(.in-view) .timeline-dot {
    border-color: var(--accent-blue);
    background: var(--accent-cyan);
    box-shadow: 0 0 24px 6px rgba(103, 232, 249, 0.6);
    transform: scale(1.15);
  }

  .timeline-card {
    padding: 34px 38px;
    width: 100%;
    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity 0.7s ease,
      transform 0.7s ease;
    text-align: left;
  }

  .timeline-item:global(.in-view) .timeline-card {
    opacity: 1;
    transform: translateY(0);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
    text-align: left;
  }

  .role-title {
    font-size: 21px;
    font-weight: 600;
    color: var(--text);
    text-align: left;
  }
  .role-company {
    font-size: 15px;
    color: var(--accent-purple);
    font-weight: 500;
    margin-top: 4px;
    text-align: left;
  }

  .role-meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }

  .tag {
    padding: 3px 12px;
    border-radius: 999px;
    border: 1px solid var(--glass-border);
    font-family: var(--ff-mono);
    font-size: 11.5px;
  }
  .domain-tag {
    color: var(--accent-cyan);
    background: rgba(103, 232, 249, 0.08);
  }
  .period-tag {
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.04);
  }

  .role-summary {
    margin-top: 14px;
    font-size: 15.5px;
    color: var(--text);
    font-weight: 500;
    position: relative;
    z-index: 1;
    text-align: left;
  }

  .role-bullets {
    margin-top: 16px;
    position: relative;
    z-index: 1;
    text-align: left;
  }
  .role-bullets li {
    position: relative;
    padding-left: 18px;
    color: var(--text-secondary);
    font-size: 14.5px;
    margin-bottom: 9px;
    line-height: 1.65;
    text-align: left;
  }
  .role-bullets li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent-blue);
    opacity: 0.7;
  }

  .stack-list {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid rgba(140, 160, 255, 0.08);
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  .tech-badge {
    font-family: var(--ff-mono);
    font-size: 11px;
    color: var(--accent-blue);
    background: rgba(123, 166, 247, 0.08);
    border: 1px solid rgba(123, 166, 247, 0.15);
    padding: 3px 9px;
    border-radius: 6px;
  }

  @media (max-width: 960px) {
    .timeline-track,
    .timeline-fill {
      left: 20px;
      transform: none;
    }
    .timeline-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .right-column {
      margin-top: 0;
    }
    .timeline-item {
      padding-left: 44px;
    }
    .timeline-dot {
      left: 12px;
      top: 24px;
    }
    .timeline-card {
      padding: 26px;
    }
  }
</style>
