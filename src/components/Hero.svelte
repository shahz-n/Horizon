<script lang="ts">
  import heroData from "../data/hero.json";
</script>

<section
  id="hero"
  class="page relative flex items-center justify-center pt-28 pb-44 max_lg:pt-28 max_lg:pb-44"
>
  <div
    class="hero-content wrap relative z-10 flex w-full flex-col items-center text-center max_lg:max-w-5xl"
  >
    <div
      class="eyebrow hero-reveal mb-7 flex items-center justify-center gap-4 font-mono text-xs leading-none tracking-[0.18em] text-accent-cyan uppercase opacity-90 max_sm:gap-2 max_sm:text-xs max_sm:tracking-[0.14em]"
    >
      <span>{heroData.greeting}</span>
    </div>

    <h1
      class="hero-title hero-reveal hero-reveal-2 m-0 text-6xl font-display font-semibold leading-[0.95] tracking-tighter text-text md:text-8xl lg:text-9xl"
    >
      I'm <em>{heroData.nameFirst}</em>
    </h1>

    <p
      class="intro hero-reveal hero-reveal-3 mt-5! max-w-xl font-body font-medium text-text sm:mt-6! md:max-w-3xl text-lg lg:max-w-5xl lg:text-2xl"
    >
      {heroData.intro}
    </p>

    <div
      class="hero-actions mt-8 flex w-full items-center justify-center gap-2 px-4 sm:w-auto sm:gap-3 lg:mt-(--hero-action-offset)"
    >
      <a
        href={heroData.primaryAction.href}
        class="glass w-full hero-reveal hero-reveal-4 rounded-full! px-5 md:px-7 py-3 text-base font-bold text-black! font-family-display bg-[image:var(--gradient-hero)]! sm:w-auto sm:px-9 sm:text-lg"
        >{heroData.primaryAction.label}</a
      >
      <a
        href={heroData.resumeAction.href}
        download
        class="glass w-full hero-reveal-4 hero-reveal rounded-full! px-5 md:px-7 py-3 text-base font-semibold font-family-display low-saturation sm:w-auto sm:px-9 sm:text-lg"
        >{heroData.resumeAction.label}</a
      >
    </div>
  </div>
</section>

<style>
  .hero-reveal {
    opacity: 0;
    transform: translateY(-40px);
    animation: hero-in 0.6s var(--ease-smooth) forwards;
    animation-delay: 0.1s;
  }

  .hero-reveal-2 {
    animation-delay: 0.2s;
  }

  .hero-reveal-3 {
    animation-delay: 0.3s;
  }

  .hero-reveal-4 {
    animation-delay: 0.4s;
  }

  @keyframes hero-in {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-title em {
    font-style: normal;
    background: var(--gradient-hero);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
</style>
