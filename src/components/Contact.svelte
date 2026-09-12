<script lang="ts">
  import { ArrowUpRight, Mail, Phone } from "@lucide/svelte";
  import Github from "./icons/Github.svelte";
  import Linkedin from "./icons/Linkedin.svelte";
  import contactData from "../data/contact.json";

  const contactIcons: Record<string, any> = {
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
    phone: Phone,
  };
</script>

<section id="contact" class="page relative flex items-center justify-center">
  <div class="wrap">
    <div class="contact-info">
      <div class="section-head">
        <div class="eyebrow">{contactData.eyebrow}</div>
        <h2>{contactData.title}</h2>
        <p class="sub">{contactData.sub}</p>
      </div>

      <div class="mt-10 grid grid-cols-2 gap-4 max_lg:grid-cols-1 max_md:gap-3">
        {#each contactData.contacts as contact}
          <a
            href={contact.href}
            target={contact.external ? "_blank" : undefined}
            rel={contact.external ? "noopener noreferrer" : undefined}
            class="contact-link glass reveal relative flex flex-col gap-5 overflow-hidden p-6 text-text"
          >
            <div class="relative z-10 flex items-center gap-3">
              <svelte:component
                this={contactIcons[contact.icon]}
                size={20}
                strokeWidth={2}
                class="text-accent-cyan"
              />

              <span
                class="font-mono font-medium text-sm uppercase tracking-[0.08em] text-accent-cyan"
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

            <span class="relative z-10 text-lg leading-snug wrap-anywhere">
              {contact.display}
            </span>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
