<script lang="ts">
  import { onMount } from "svelte";
  import { initEngine, type SceneAPI } from "./engine";
  import Hero from "./components/Hero.svelte";
  import About from "./components/About.svelte";
  import Experience from "./components/Experience.svelte";
  import Skills from "./components/Skills.svelte";
  import Projects from "./components/Projects.svelte";
  import Contact from "./components/Contact.svelte";
  import Nav from "./components/Nav.svelte";

  let canvasEl: HTMLCanvasElement;
  let sceneAPI: SceneAPI | null = null;

  onMount(() => {
    sceneAPI = initEngine(canvasEl);

    return () => {
      sceneAPI?.destroy();
    };
  });
</script>

<canvas id="bg-canvas" bind:this={canvasEl} aria-hidden="true"></canvas>
<Nav />

<div class="site">
  <Hero />
  <About />
  <Experience />
  <Skills />
  <Projects />
  <Contact />
</div>
