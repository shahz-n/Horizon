<script lang="ts">
  import heroData from "../data/hero.json";
</script>

<section
  id="hero"
  class="page relative flex items-center justify-center pt-28 pb-44 max_lg:pt-28 max_lg:pb-44 max_md:pt-24 max_md:pb-32 max_sm:pt-24 max_sm:pb-30"
>
  <div
    class="hero-content wrap relative z-10 flex w-full flex-col items-center text-center max_lg:max-w-5xl max_md:px-5 max_sm:px-4"
  >
    <div
      class="eyebrow mb-7 flex items-center justify-center gap-4 font-mono text-xs leading-none tracking-[0.18em] text-accent-cyan uppercase opacity-90 max_sm:gap-2 max_sm:text-xs max_sm:tracking-[0.14em]"
    >
      <span>{heroData.greeting}</span>
    </div>

    <h1
      class="hero-title m-0 text-7xl font-display font-semibold leading-(--hero-title-leading) tracking-tighter text-text md:text-8xl lg:text-9xl"
    >
      I'm <em>{heroData.nameFirst}</em>
    </h1>

    <p
      class="intro mt-6! max-w-5xl font-body font-normal text-text max_lg:max-w-3xl md:text-xl lg:text-2xl"
    >
      {heroData.intro}
    </p>

    <div
      class="hero-actions mt-(--hero-action-offset) flex items-center justify-center gap-3 max_md:mt-8 max_md:w-full max_md:flex-col max_md:gap-2"
    >
      <a
        href={heroData.primaryAction.href}
        class="glass rounded-full! py-3 px-9 text-lg font-bold text-black! font-family-display bg-[image:var(--gradient-hero)]!"
        >{heroData.primaryAction.label}</a
      >
      <a
        href={heroData.resumeAction.href}
        download
        class="glass rounded-full! py-3 px-9 text-lg font-semibold font-family-display low-saturation"
        >{heroData.resumeAction.label}</a
      >
    </div>
  </div>
</section>

<style>
  .hero-title em {
    font-style: normal;
    background: var(--gradient-hero);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
</style>
