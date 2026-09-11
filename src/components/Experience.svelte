<script lang="ts">
  import { onMount } from "svelte";
  import expData from "../data/experience.json";
  import ExperienceTile from "./ExperienceTile.svelte";
  import {
    updateTimelineFill,
    updateTimelinePositions,
  } from "./utils/timeline";

  let timelineEl: HTMLElement;
  let timelineFillEl: HTMLElement;
  let leftCards: HTMLElement[] = [];
  let rightCards: HTMLElement[] = [];

  const STAGGER_RATIO = 0.8;

  const leftRoles = expData.roles.filter((role) => role.side === "left");
  const rightRoles = expData.roles.filter((role) => role.side === "right");

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

    [...leftCards, ...rightCards].forEach((card) => {
      if (card) observer.observe(card);
    });

    const resizeObserver = new ResizeObserver(() => {
      updateTimelinePositions(leftCards, rightCards, STAGGER_RATIO);
      updateTimelineFill(timelineEl, timelineFillEl);
    });

    leftCards.forEach((card) => resizeObserver.observe(card));
    rightCards.forEach((card) => resizeObserver.observe(card));

    function handleResize() {
      updateTimelinePositions(leftCards, rightCards, STAGGER_RATIO);
      updateTimelineFill(timelineEl, timelineFillEl);
    }

    function handleScroll() {
      updateTimelineFill(timelineEl, timelineFillEl);
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    requestAnimationFrame(() => {
      updateTimelinePositions(leftCards, rightCards, STAGGER_RATIO);
      updateTimelineFill(timelineEl, timelineFillEl);
    });

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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

    <div class="relative w-full" bind:this={timelineEl}>
      <div class="timeline-track glass max_md:hidden"></div>

      <div class="timeline-fill max_md:hidden" bind:this={timelineFillEl}></div>

      <div
        class="relative grid grid-cols-2 gap-(--timeline-column-gap) max_lg:flex max_lg:flex-col max_lg:gap-6"
      >
        <div class="flex flex-col max_lg:gap-6">
          {#each leftRoles as role, i}
            <div bind:this={leftCards[i]} class="experience-item">
              <ExperienceTile {role} side="left" />
            </div>
          {/each}
        </div>

        <div class="flex flex-col max_lg:mt-0 max_lg:gap-6">
          {#each rightRoles as role, i}
            <div bind:this={rightCards[i]} class="experience-item">
              <ExperienceTile {role} side="right" />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .timeline-track {
    position: absolute;
    left: 50%;
    top: 10px;
    bottom: 10px;
    width: 4px;
    transform: translateX(-50%);
    box-shadow: none;
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
    border-radius: 4px;
  }
</style>
