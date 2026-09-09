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
    Circle as Github,
    Square as Linkedin,
    MessageCircle,
  } from "@lucide/svelte";

  import NavItem from "./NavItem.svelte";

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
  class="absolute! -top-3 left-1/2 z-40 flex -translate-x-1/2 items-center justify-center gap-2 glass p-3 pt-5 lg:flex"
>
  <span
    class="title flex items-center justify-center gap-2 font-display text-xl font-medium"
  >
    Horizon
  </span>
</a>

<!-- Left rail -->
<nav
  aria-label="Section navigation"
  class="fixed! -left-3 top-1/2 z-40 flex-col -translate-y-1/2 glass p-2 pl-5 overflow-visible! lg:flex"
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
  class="fixed! -right-3 top-1/2 z-40 flex-col -translate-y-1/2 glass p-2 pr-5 overflow-visible! lg:flex"
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
</style>
