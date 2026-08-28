<script lang="ts">
  import { cn } from "../lib/utils";
  import siteData from "../data/index.json";
  import {
    Compass,
    Briefcase,
    Layers,
    Folder,
    Mail,
    Phone,
    Circle as Github,
    Square as Linkedin,
    Orbit,
  } from "@lucide/svelte";

  const navigation = [
    { href: "#about", label: "About", icon: Compass },
    { href: "#experience", label: "Experience", icon: Briefcase },
    { href: "#skills", label: "Skills", icon: Layers },
    { href: "#projects", label: "Projects", icon: Folder },
  ];

  const contacts = [
    { href: `mailto:${siteData.email}`, label: "Email", icon: Mail },
    {
      href: siteData.github,
      label: "GitHub",
      icon: Github,
      external: true,
    },
    {
      href: siteData.linkedin,
      label: "LinkedIn",
      icon: Linkedin,
      external: true,
    },
    {
      href: `tel:${siteData.phone.replace(/\s/g, "")}`,
      label: "Phone",
      icon: Phone,
    },
  ];
</script>

<!-- Brand -->
<a
  href="/"
  aria-label="Horizon home"
  class={cn(
    `absolute! -top-3 left-1/2 z-40 -translate-x-1/2 flex items-center justify-center gap-2 glass-glow glass lg:flex p-3 pt-5`,
  )}
>
  <span
    class={cn(
      `title font-display font-medium text-xl flex items-center justify-center gap-2`,
    )}
  >
    <!-- <Orbit size={20} strokeWidth={2} class="text-accent-cyan" /> -->
    Horizon
  </span>
</a>

<!-- Left navigation slab -->
<nav
  aria-label="Section navigation"
  class={cn(
    `fixed! -left-3 top-1/2 z-40 -translate-y-1/2 flex-col gap-2 glass-glow glass lg:flex p-2 pl-5`,
  )}
>
  {#each navigation as item}
    <a
      href={item.href}
      aria-label={item.label}
      class={cn(
        `rail-button group flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-text-muted hover:gradient-text transition-all`,
      )}
    >
      <svelte:component this={item.icon} size={24} strokeWidth={2} />
    </a>
  {/each}
</nav>

<!-- Right contact slab -->
<aside
  aria-label="Contact links"
  class={cn(
    `fixed! -right-3 top-1/2 z-40 -translate-y-1/2 flex-col gap-2 glass-glow glass lg:flex p-2 pr-5`,
  )}
>
  {#each contacts as item}
    <a
      href={item.href}
      aria-label={item.label}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      class={cn(
        `rail-button group flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-text-muted hover:gradient-text transition-all`,
      )}
    >
      <svelte:component this={item.icon} size={20} strokeWidth={2} />
    </a>
  {/each}
</aside>

<style>
  .title::before,
  .title::after {
    content: "";
    width: 32px;
    height: 1px;
    background: var(--accent-cyan);
    opacity: 0.75;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.5rem;
  }
</style>
