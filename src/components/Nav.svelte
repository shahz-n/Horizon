<script lang="ts">
  import { onMount } from "svelte";
  import siteData from "../data/index.json";

  let scrolled = $state(false);

  onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 60;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });
</script>

<nav class="top-nav wrap" class:scrolled>
  <a href="#hero" class="brand"
    >{siteData.brand.split(".")[0]}<span class="dot">.</span
    >{siteData.brand.split(".")[1]}</a
  >
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#projects">Projects</a></li>
  </ul>
  <a href="#contact" class="cta-btn">Get in touch</a>
</nav>

<style>
  .top-nav {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 28px;
    border-radius: var(--radius);
    background: rgba(10, 12, 30, 0.4);
    border: 1px solid rgba(140, 160, 255, 0.1);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    transition: all 0.4s ease;
  }

  .top-nav.scrolled {
    background: rgba(10, 12, 30, 0.8);
    border-color: rgba(140, 160, 255, 0.18);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  .brand {
    font-family: var(--ff-mono);
    font-size: 14px;
    letter-spacing: 0.08em;
    color: var(--text);
    text-decoration: none;
    font-weight: 500;
  }

  .dot {
    color: var(--accent-purple);
  }

  .nav-links {
    display: flex;
    gap: 36px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    font-size: 13.5px;
    font-family: var(--ff-mono);
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.25s ease;
  }

  .nav-links a:hover {
    color: var(--accent-blue);
  }

  .cta-btn {
    font-size: 13px;
    padding: 9px 20px;
    border-radius: 999px;
    color: var(--void);
    background: var(--gradient-primary);
    font-weight: 600;
    text-decoration: none;
    transition:
      box-shadow 0.3s ease,
      transform 0.3s ease;
  }

  .cta-btn:hover {
    box-shadow: 0 4px 24px rgba(123, 166, 247, 0.5);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    .top-nav {
      width: calc(100% - 32px);
    }
  }
</style>
