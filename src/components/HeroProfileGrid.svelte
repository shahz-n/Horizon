<script lang="ts">
  import { onMount } from "svelte";

  interface Segment {
    text: string;
    highlight?: boolean;
  }

  interface Tile {
    segments: Segment[];
    area: string;
    className?: string;
  }

  const tiles: Tile[] = [
    {
      segments: [{ text: "06+", highlight: true }, { text: " years" }],
      area: "years",
      className: "metric",
    },
    {
      segments: [{ text: "03+", highlight: true }, { text: " domains" }],
      area: "domains",
      className: "metric",
    },
    {
      segments: [
        { text: "Distributed", highlight: true },
        { text: " systems" },
      ],
      area: "distributed",
      className: "capability wide",
    },
    {
      segments: [
        { text: "Backend", highlight: true },
        { text: " architecture" },
      ],
      area: "backend",
      className: "capability",
    },
    {
      segments: [{ text: "Real-time", highlight: true }, { text: " systems" }],
      area: "realtime",
      className: "capability",
    },
  ];

  let tileElements: HTMLElement[] = [];

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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    tileElements.forEach((el, i) => {
      if (el) {
        el.style.transitionDelay = `${i * 50}ms`;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  });
</script>

<div class="hero-profile-grid" aria-label="Profile highlights">
  {#each tiles as tile, i}
    <div
      class="profile-tile glass-glow glass {tile.className ?? ''} {tile.area}"
      bind:this={tileElements[i]}
    >
      <div class="glow-border"></div>

      <div class="tile-content">
        {#each tile.segments as segment}
          {#if segment.highlight}
            <span class="tile-highlight">{segment.text}</span>
          {:else}
            <span class="tile-text">{segment.text}</span>
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .hero-profile-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(5, minmax(0, 1fr));

    grid-template-areas:
      "years years domains domains"
      "years years domains domains"
      "distributed distributed distributed distributed"
      "backend backend realtime realtime"
      "backend backend realtime realtime";

    gap: 10px;
    width: 100%;
    max-width: 600px;
    height: 48vh;
    min-height: 420px;
    pointer-events: none;
  }

  .profile-tile {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding: 28px 30px;

    opacity: 0;
    transform: translateY(10px) scale(0.98);

    transition:
      opacity 0.6s ease,
      transform 0.6s ease,
      border-color 0.3s ease,
      background 0.3s ease;

    pointer-events: auto;
  }

  :global(.profile-tile.in-view) {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .profile-tile:hover {
    border-color: var(--glass-border-hover);
    background: var(--glass-bg-hover);
  }

  .tile-content {
    position: relative;
    z-index: 1;

    width: 100%;

    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    align-content: center;

    column-gap: 0.35em;
    row-gap: 0.05em;

    color: var(--text);
    font-family: var(--ff-body);
    font-size: clamp(21px, 2.1vw, 30px);
    font-weight: 400;
    line-height: 1.15;
    letter-spacing: -0.025em;
  }

  .tile-highlight {
    flex: 0 0 auto;

    font-family: var(--ff-display);
    font-size: clamp(38px, 4.5vw, 64px);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.055em;

    background: var(--gradient-hero);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .tile-text {
    flex: 0 0 auto;

    color: var(--text);
    font-family: var(--ff-body);
    font-size: inherit;
    font-weight: 400;
    line-height: inherit;
  }

  .metric .tile-content {
    font-size: clamp(22px, 2.2vw, 32px);
  }

  .capability .tile-content {
    font-size: clamp(22px, 2.3vw, 34px);
  }

  .wide .tile-content {
    font-size: clamp(25px, 2.7vw, 38px);
  }

  .years {
    grid-area: years;
  }

  .domains {
    grid-area: domains;
  }

  .distributed {
    grid-area: distributed;
  }

  .backend {
    grid-area: backend;
  }

  .realtime {
    grid-area: realtime;
  }

  @media (max-width: 1024px) {
    .hero-profile-grid {
      max-width: 460px;
      height: 440px;
      min-height: 0;
      gap: 8px;
    }

    .profile-tile {
      padding: 22px 20px;
    }

    .tile-content {
      font-size: clamp(18px, 2vw, 20px);
    }

    .tile-highlight {
      font-size: clamp(32px, 4vw, 40px);
    }
  }

  @media (max-width: 640px) {
    .hero-profile-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: repeat(8, minmax(0, 1fr));

      grid-template-areas:
        "years domains"
        "years domains"
        "distributed distributed"
        "distributed distributed"
        "backend realtime"
        "backend realtime"
        "backend realtime"
        "backend realtime";

      max-width: 100%;
      height: 440px;
      gap: 8px;
    }

    .profile-tile {
      padding: 18px 16px;
    }

    .tile-content {
      font-size: clamp(17px, 4.5vw, 23px);
    }

    .tile-highlight {
      font-size: clamp(28px, 8vw, 42px);
    }

    .wide .tile-content {
      font-size: clamp(19px, 5vw, 27px);
    }
  }

  @media (max-width: 420px) {
    .hero-profile-grid {
      height: 380px;
      gap: 6px;
    }

    .profile-tile {
      padding: 14px 12px;
    }

    .tile-content {
      font-size: 16px;
    }

    .tile-highlight {
      font-size: 28px;
    }

    .wide .tile-content {
      font-size: 17px;
    }
  }
</style>
