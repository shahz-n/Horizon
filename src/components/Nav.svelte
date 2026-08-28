<script lang="ts">
  import { onMount } from "svelte";
  import siteData from "../data/index.json";
  import { cn } from "../lib/utils";

  let scrolled = $state(false);

  onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 60;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });
</script>

<nav
  class={cn(
    "top-nav wrap",
    "portfolio-nav",
    "fixed",
    "top-5",
    "left-1/2",
    "-translate-x-1/2",
    "z-50",
    "w-full",
    "flex",
    "items-center",
    "justify-between",
    "py-[14px]",
    "px-7",
    "rounded-[18px]",
    "bg-[rgba(10,12,30,0.4)]",
    "border",
    "border-solid",
    "border-[rgba(140,160,255,0.1)]",
    "backdrop-blur-2xl",
    "saturate-[140%]",
    "transition-all",
    "duration-400",
    "ease",
    scrolled &&
      "bg-[rgba(10,12,30,0.8)] border-[rgba(140,160,255,0.18)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
  )}
>
  <a
    href="#hero"
    class={cn(
      "brand",
      "portfolio-brand",
      "font-[var(--ff-mono)]",
      "text-[14px]",
      "tracking-[0.08em]",
      "text-[#f0eef8]",
      "no-underline",
      "font-medium"
    )}
  >
    {siteData.brand.split(".")[0]}<span class="text-[#a78bfa]">.</span
    >{siteData.brand.split(".")[1]}
  </a>
  <ul
    class={cn(
      "nav-links",
      "portfolio-nav-links",
      "flex",
      "gap-9",
      "list-none",
      "m-0",
      "p-0",
      "max-[768px]:hidden"
    )}
  >
    <li><a href="#about" class="text-[13.5px] font-[var(--ff-mono)] text-[#7a829a] no-underline transition-colors duration-250 ease hover:text-[#7ba6f7]">About</a></li>
    <li><a href="#experience" class="text-[13.5px] font-[var(--ff-mono)] text-[#7a829a] no-underline transition-colors duration-250 ease hover:text-[#7ba6f7]">Experience</a></li>
    <li><a href="#skills" class="text-[13.5px] font-[var(--ff-mono)] text-[#7a829a] no-underline transition-colors duration-250 ease hover:text-[#7ba6f7]">Skills</a></li>
    <li><a href="#projects" class="text-[13.5px] font-[var(--ff-mono)] text-[#7a829a] no-underline transition-colors duration-250 ease hover:text-[#7ba6f7]">Projects</a></li>
  </ul>
  <a
    href="#contact"
    class={cn(
      "cta-btn",
      "portfolio-cta",
      "text-[13px]",
      "py-[9px]",
      "px-5",
      "rounded-full",
      "text-[#030408]",
      "bg-[linear-gradient(135deg,#7ba6f7,#a78bfa)]",
      "font-semibold",
      "no-underline",
      "transition-[box-shadow,transform]",
      "duration-300",
      "ease",
      "hover:shadow-[0_4px_24px_rgba(123,166,247,0.5)]",
      "hover:-translate-y-px"
    )}
  >
    Get in touch
  </a>
</nav>
