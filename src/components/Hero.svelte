<script lang="ts">
  import heroData from "../data/hero.json";
  import { cn } from "../lib/utils";
</script>

<section id="hero" class={cn(`page flex items-center justify-center relative pt-28 pb-44 max_lg:pt-28 max_lg:pb-44 max_md:pt-24 max_md:pb-32 max_sm:pt-24 max_sm:pb-30`)}>
  <div class={cn(`hero-content wrap flex flex-col items-center text-center relative z-10 w-full max_lg:max-w-5xl max_md:px-5 max_sm:px-4`)}>
    <div class={cn(`hero-eyebrow flex items-center justify-center gap-4 mb-7 text-accent-cyan font-mono text-xs tracking-[0.18em] leading-none uppercase opacity-90 max_sm:text-[9px] max_sm:tracking-[0.14em] max_sm:gap-2`)}>
      <span>Hi there</span>
    </div>

    <h1 class={cn(`hero-title m-0 font-display font-semibold text-text leading-[0.9] tracking-tighter`)} style="font-size:clamp(72px,11vw,150px)">
      I'm <em>{heroData.nameFirst}</em>
    </h1>

    <p class={cn(`intro max-w-5xl mt-12 font-body font-normal text-text-secondary leading-tight tracking-tight max_lg:max-w-3xl`)} style="font-size:clamp(16px,2.4vw,32px)">
      A <span class="gradient-text">Software Development Engineer</span>. I
      build <span class="gradient-text">backend architecture</span>,
      <span class="gradient-text">distributed systems</span>, and
      <span class="gradient-text">real-time interfaces</span>.
    </p>

    <div class={cn(`hero-actions flex items-center justify-center gap-3 mt-[42px] max_md:w-full max_md:flex-col max_md:gap-2 max_md:mt-8`)}>
      <a href="#experience" class="btn btn-primary min-w-[150px] max_md:w-[min(320px,100%)]">View experience</a>
      <a href="#contact" class="btn btn-ghost min-w-[150px] max_md:w-[min(320px,100%)]">Get in touch</a>
    </div>
  </div>
</section>

<style>
  .hero-eyebrow::before { content: ""; width: 32px; height: 1px; background: var(--accent-cyan); opacity: 0.7; }
  .hero-title em { font-style: normal; background: var(--gradient-hero); background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
  @keyframes float-arrow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
  @media (prefers-reduced-motion: reduce) { .scroll-arrow { animation: none; } }
  @media (max-width: 1024px) { .hero-title { font-size: clamp(64px,12vw,115px); } }
  @media (max-width: 768px) { .hero-title { font-size: clamp(54px,16vw,88px); line-height: 0.94; } .intro { margin-top: 34px; font-size: clamp(21px,6vw,28px); line-height: 1.3; } }
  @media (max-width: 420px) { .hero-title { font-size: 52px; } .intro { font-size: 20px; } }
</style>
