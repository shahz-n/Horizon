<script lang="ts">
  import { onMount } from 'svelte';
  import skillsData from '../data/skills.json';

  let tiles: HTMLElement[] = [];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    tiles.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<section id="skills">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">{skillsData.eyebrow}</div>
      <h2>{skillsData.title}</h2>
      <p class="sub">{skillsData.sub}</p>
    </div>

    <div class="skills-grid">
      {#each skillsData.skills as skill, i}
        <div
          class="skill-tile glass-glow glass {skill.size}"
          bind:this={tiles[i]}
          style="transition-delay: {i * 30}ms"
        >
          <div class="glow-border"></div>

          <!-- Logo container scales proportionally to card dimensions -->
          <div class="skill-icon-wrapper">
            <img src={skill.icon} alt={skill.name} loading="lazy" />
          </div>

          <div class="skill-info">
            <div class="name">{skill.name}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-auto-flow: dense;
    gap: 16px;
    width: 100%;
  }

  .skill-tile {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    overflow: hidden;
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, background 0.3s ease;
    text-align: left;
    aspect-ratio: 1 / 1;
    width: 100%;
  }

  .skill-tile:global(.in-view) {
    opacity: 1;
    transform: scale(1);
  }

  .skill-tile:hover {
    border-color: var(--glass-border-hover);
    background: var(--glass-bg-hover);
  }

  .skill-icon-wrapper {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 80%;
    display: flex;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
  }

  .skill-icon-wrapper img {
    width: 75%;
    height: 75%;
    object-fit: contain;
    min-width: 100%;
    filter: drop-shadow(0 0 10px rgba(123, 166, 247, 0.25));
  }

  .skill-info {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;
    padding: 1rem;
    text-align: center;
  }

  .name {
    font-family: var(--ff-display);
    font-weight: 600;
    color: var(--text);
    font-size: clamp(12px, 1.25vw, 19px);
    line-height: 1.2;
    text-align: center;
  }

  .s-1x1 {
    grid-column: span 1;
    grid-row: span 1;
  }
  .s-2x2 {
    grid-column: span 2;
    grid-row: span 2;
  }

  @media (max-width: 1200px) {
    .skills-grid {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  @media (max-width: 800px) {
    .skills-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
  }

  @media (max-width: 500px) {
    .skills-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }
</style>
