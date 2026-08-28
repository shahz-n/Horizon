<script lang="ts">
  import { onMount } from "svelte";
  import { initEngine, type SceneAPI } from "./engine";
  import { initGlassGlow } from "./lib/glassGlow";
  import { initScrollReveals } from "./lib/scrollReveal";
  import Hero from "./components/Hero.svelte";
  import About from "./components/About.svelte";
  import Experience from "./components/Experience.svelte";
  import Skills from "./components/Skills.svelte";
  import Projects from "./components/Projects.svelte";
  import Contact from "./components/Contact.svelte";

  let canvasEl: HTMLCanvasElement;
  let siteEl: HTMLElement;
  let sceneAPI: SceneAPI | null = null;

  onMount(() => {
    // Initialize Three.js 3D Engine
    sceneAPI = initEngine(canvasEl);

    // Initialize glass glow effects
    const destroyGlow = initGlassGlow(siteEl);

    // Initialize scroll reveal animations
    const destroyReveal = initScrollReveals(siteEl);

    return () => {
      sceneAPI?.destroy();
      destroyGlow();
      destroyReveal();
    };
  });
</script>

<canvas id="bg-canvas" bind:this={canvasEl} aria-hidden="true"></canvas>

<div class="site" bind:this={siteEl}>
  <Hero />
  <About />
  <Experience />
  <Skills />
  <Projects />
  <Contact />
</div>

<style>
  #bg-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    display: block;
    z-index: 0;
    background: var(--void);
    pointer-events: none;
  }

  .site {
    position: relative;
    z-index: 1;
  }
</style>
