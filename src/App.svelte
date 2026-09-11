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
    history.scrollRestoration = "manual";

    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  onMount(() => {
    sceneAPI = initEngine(canvasEl);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
      },
    );

    document.querySelectorAll(".glass").forEach((element) => {
      observer.observe(element);
    });
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
