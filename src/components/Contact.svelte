<script lang="ts">
  import { ArrowUpRight, Circle, Mail, Phone, Square } from "@lucide/svelte";
  import contactData from "../data/contact.json";
  import siteData from "../data/index.json";

  const contacts = [
    {
      label: "Email",
      value: siteData.email,
      href: `mailto:${siteData.email}`,
      icon: Mail,
    },
    {
      label: "GitHub",
      value: siteData.github.replace("https://", ""),
      href: siteData.github,
      icon: Circle,
      external: true,
    },
    {
      label: "LinkedIn",
      value: siteData.linkedin.replace("https://", ""),
      href: siteData.linkedin,
      icon: Square,
      external: true,
    },
    {
      label: "Phone",
      value: siteData.phone,
      href: `tel:${siteData.phone.replace(/ /g, "")}`,
      icon: Phone,
    },
  ];
</script>

<section
  id="contact"
  class="page pb-48 max_md:pb-32 flex items-center justify-center relative"
>
  <div class="wrap">
    <div class="contact-info">
      <div class="section-head text-left">
        <div class="eyebrow">{contactData.eyebrow}</div>
        <h2>{contactData.title}</h2>
        <p class="sub">{contactData.sub}</p>
      </div>

      <div class="mt-10 grid grid-cols-2 gap-4 max_md:grid-cols-1">
        {#each contacts as contact}
          <a
            href={contact.href}
            target={contact.external ? "_blank" : undefined}
            rel={contact.external ? "noopener noreferrer" : undefined}
            class="contact-link glass-glow glass relative flex flex-col gap-5 overflow-hidden p-6 text-text"
          >
            <div class="relative z-10 flex items-center gap-3">
              <svelte:component
                this={contact.icon}
                size={20}
                strokeWidth={2}
                class="text-accent-cyan"
              />

              <span
                class="font-mono font-normal text-sm uppercase tracking-[0.08em] text-accent-cyan"
              >
                {contact.label}
              </span>

              {#if contact.external}
                <ArrowUpRight
                  size={20}
                  strokeWidth={1}
                  class="ml-auto text-accent-cyan"
                />
              {/if}
            </div>

            <span
              class="relative z-10 text-lg leading-snug [overflow-wrap:anywhere]"
            >
              {contact.value}
            </span>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
