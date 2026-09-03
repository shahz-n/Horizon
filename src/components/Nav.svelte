<script lang="ts">
  import { cn } from "../lib/utils";
  import siteData from "../data/index.json";
  import {
    CirclePlay,
    Compass,
    Briefcase,
    Layers,
    Folder,
    Mail,
    Phone,
    Circle as Github,
    Square as Linkedin,
    MessageCircle,
  } from "@lucide/svelte";

  const leftNavigation = [
    { href: "#hero", label: "Home", icon: CirclePlay },
    { href: "#experience", label: "Experience", icon: Briefcase },
    { href: "#projects", label: "Projects", icon: Folder },
  ];

  const rightNavigation = [
    { href: "#about", label: "About", icon: Compass },
    { href: "#skills", label: "Tech Stack", icon: Layers },
    { href: "#contact", label: "Contact", icon: MessageCircle },
  ];

  const leftContacts = [
    { href: siteData.github, label: "GitHub", icon: Github, external: true },
    { href: `mailto:${siteData.email}`, label: "Email", icon: Mail },
  ];

  const rightContacts = [
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
    `absolute! -top-3 left-1/2 z-40 -translate-x-1/2 flex items-center justify-center gap-2 glass-glow glass p-3 pt-5 lg:flex`,
  )}
>
  <span
    class={cn(
      `title flex items-center justify-center gap-2 font-display text-xl font-medium`,
    )}
  >
    Horizon
  </span>
</a>

<!-- Left rail -->
<nav
  aria-label="Section navigation"
  class={cn(
    `fixed! -left-3 top-1/2 z-40 -translate-y-1/2 flex-col glass-glow glass p-2 pl-5 lg:flex`,
  )}
>
  {#each leftNavigation as item}
    <a
      href={item.href}
      aria-label={item.label}
      class={cn(
        `rail-button group flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-text-muted transition-all hover:gradient-text`,
      )}
    >
      <svelte:component this={item.icon} size={24} strokeWidth={2} />
    </a>
  {/each}

  {#each leftContacts as item}
    <a
      href={item.href}
      aria-label={item.label}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      class={cn(
        `rail-button group flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-text-muted transition-all hover:gradient-text`,
      )}
    >
      <svelte:component this={item.icon} size={20} strokeWidth={2} />
    </a>
  {/each}
</nav>

<!-- Right rail -->
<aside
  aria-label="Section and contact links"
  class={cn(
    `fixed! -right-3 top-1/2 z-40 -translate-y-1/2 flex-col glass-glow glass p-2 pr-5 lg:flex`,
  )}
>
  {#each rightNavigation as item}
    <a
      href={item.href}
      aria-label={item.label}
      class={cn(
        `rail-button group flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-text-muted transition-all hover:gradient-text`,
      )}
    >
      <svelte:component this={item.icon} size={24} strokeWidth={2} />
    </a>
  {/each}

  {#each rightContacts as item}
    <a
      href={item.href}
      aria-label={item.label}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      class={cn(
        `rail-button group flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-text-muted transition-all hover:gradient-text`,
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
