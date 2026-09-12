<script lang="ts">
  import siteData from "../data/index.json";
  import {
    CirclePlay,
    Compass,
    Briefcase,
    Layers,
    Folder,
    Mail,
    Phone,
    MessageCircle,
  } from "@lucide/svelte";

  import Github from "./icons/Github.svelte";
  import Linkedin from "./icons/Linkedin.svelte";

  import NavItem from "./NavItem.svelte";

  const leftNavigation = [
    { href: "#hero", label: "Hi there", icon: CirclePlay },
    { href: "#experience", label: "Experience", icon: Briefcase },
    { href: "#projects", label: "Projects", icon: Folder },
  ];

  const rightNavigation = [
    { href: "#about", label: "About", icon: Compass },
    { href: "#skills", label: "Skills", icon: Layers },
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
  class="absolute! -top-3 left-1/2 z-40 flex -translate-x-1/2 items-center justify-center gap-2 glass p-2 pt-4 lg:p-3 lg:pt-5 lg:flex nav-reveal-brand"
>
  <span
    class="title flex items-center justify-center gap-2 font-display text-base lg:text-lg font-medium"
  >
    Horizon
  </span>
</a>

<!-- Left rail -->
<nav
  aria-label="Section navigation"
  class="fixed! -left-3 top-1/2 z-40 flex -translate-y-1/2 flex-col glass p-2 pl-5 overflow-visible! max_md:hidden nav-reveal-left"
>
  {#each leftNavigation as item}
    <NavItem {...item} />
  {/each}

  {#each leftContacts as item}
    <NavItem {...item} size={20} />
  {/each}
</nav>

<!-- Right rail -->
<aside
  aria-label="Section and contact links"
  class="fixed! -right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col glass p-2 pr-5 overflow-visible! max_md:hidden nav-reveal-right"
>
  {#each rightNavigation as item}
    <NavItem {...item} />
  {/each}

  {#each rightContacts as item}
    <NavItem {...item} size={20} />
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

  .nav-reveal-brand {
    opacity: 0;
    transform: translateY(-60px);
    animation: nav-brand-in 0.6s var(--ease-smooth) forwards;
    animation-delay: 0.5s;
  }

  .nav-reveal-left {
    opacity: 0;
    transform: translateX(-80px);
    animation: nav-left-in 0.6s var(--ease-smooth) forwards;
    animation-delay: 0.5s;
  }

  .nav-reveal-right {
    opacity: 0;
    transform: translateX(80px);
    animation: nav-right-in 0.6s var(--ease-smooth) forwards;
    animation-delay: 0.5s;
  }

  @keyframes nav-brand-in {
    from {
      opacity: 0;
      transform: translateY(-60px);
    }
    to {
      opacity: 1;
      transform: translate(0);
    }
  }

  @keyframes nav-left-in {
    from {
      opacity: 0;
      transform: translateX(-80px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes nav-right-in {
    from {
      opacity: 0;
      transform: translateX(80px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
