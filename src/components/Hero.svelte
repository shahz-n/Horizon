<script lang="ts">
  import heroData from "../data/hero.json";
  import { cn } from "../lib/utils";
</script>

<section
  id="hero"
  class={cn(
    `page flex items-center justify-center relative pt-28 pb-44 max_lg:pt-28 max_lg:pb-44 max_md:pt-24 max_md:pb-32 max_sm:pt-24 max_sm:pb-30`,
  )}
>
  <div
    class={cn(
      `hero-content wrap flex flex-col items-center text-center relative z-10 w-full max_lg:max-w-5xl max_md:px-5 max_sm:px-4`,
    )}
  >
    <div
      class={cn(
        `eyebrow flex items-center justify-center gap-4 mb-7 text-accent-cyan font-mono text-xs tracking-[0.18em] leading-none uppercase opacity-90 max_sm:text-xs max_sm:tracking-[0.14em] max_sm:gap-2`,
      )}
    >
      <span>Hi there</span>
    </div>

    <h1
      class={cn(
        `hero-title m-0 font-display font-semibold text-text leading-[0.9] tracking-tighter text-7xl md:text-8xl lg:text-9xl`,
      )}
    >
      I'm <em>{heroData.nameFirst}</em>
    </h1>

    <p
      class={cn(
        `intro max-w-5xl mt-6! font-body font-normal text-text  max_lg:max-w-3xl md:text-xl lg:text-2xl`,
      )}
    >
      A <span class="font-medium">Full-Stack Software Development Engineer</span
      >. I build
      <span class="font-medium">backend architecture</span>,
      <span class="font-medium">distributed systems</span>,
      <span class="font-medium">real-time interfaces</span>, and more.
    </p>

    <div
      class={cn(
        `hero-actions flex items-center justify-center gap-3 mt-[42px] max_md:w-full max_md:flex-col max_md:gap-2 max_md:mt-8`,
      )}
    >
      <a
        href="#experience"
        class="btn btn-primary min-w-[150px] max_md:w-[min(320px,100%)]"
        >View experience</a
      >
      <a
        href="#contact"
        class="btn btn-ghost min-w-[150px] max_md:w-[min(320px,100%)]"
        >Get in touch</a
      >
    </div>
  </div>
</section>

<style>
  /* .hero-eyebrow::before { content: ""; width: 32px; height: 1px; background: var(--accent-cyan); opacity: 0.7; } */
  .hero-title em {
    font-style: normal;
    background: var(--gradient-hero);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
</style>
