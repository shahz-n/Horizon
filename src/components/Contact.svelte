<script lang="ts">
  import { onMount } from 'svelte';
  import contactData from '../data/contact.json';
  import siteData from '../data/index.json';
  import { cn } from '../lib/utils';

  onMount(() => {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    const status = document.getElementById('form-status')!;

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('cf-name') as HTMLInputElement).value.trim();
      const email = (document.getElementById('cf-email') as HTMLInputElement).value.trim();
      const message = (document.getElementById('cf-message') as HTMLTextAreaElement).value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Fill in every field before sending.';
        return;
      }

      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email client…';
    });
  });
</script>

<section id="contact" class="page pb-48 max_md:pb-32">
  <div class="wrap">
    <div class={cn(`contact-inner grid grid-cols-2 gap-10 items-start text-left max_md:grid-cols-1`)}>
      <div class="contact-info">
        <div class="section-head text-left">
          <div class="eyebrow">{contactData.eyebrow}</div>
          <h2>{contactData.title}</h2>
          <p class="sub">{contactData.sub}</p>
        </div>

        <div class={cn(`contact-links mt-8 flex flex-col gap-3.5`)}>
          <!-- EMAIL -->
          <a href="mailto:{siteData.email}" class={cn(`contact-link glass-glow glass flex items-center justify-between p-5 text-text relative overflow-hidden`)}>
            <div class="glow-border"></div>
            <div class={cn(`link-left flex items-center gap-3 relative z-10`)}>
              <svg class="icon text-accent-cyan opacity-85 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="2" y="4" width="20" height="16" rx="3"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
              <span class="link-value relative z-10">{siteData.email}</span>
            </div>
            <span class={cn(`link-label font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint relative z-10`)}>Email</span>
          </a>

          <!-- GITHUB -->
          <a href={siteData.github} target="_blank" rel="noopener" class={cn(`contact-link glass-glow glass flex items-center justify-between p-5 text-text relative overflow-hidden`)}>
            <div class="glow-border"></div>
            <div class={cn(`link-left flex items-center gap-3 relative z-10`)}>
              <svg class="icon text-accent-cyan opacity-85 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              <span class="link-value relative z-10">{siteData.github.replace('https://', '')}</span>
            </div>
            <span class={cn(`link-label font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint relative z-10`)}>GitHub</span>
          </a>

          <!-- LINKEDIN -->
          <a href={siteData.linkedin} target="_blank" rel="noopener" class={cn(`contact-link glass-glow glass flex items-center justify-between p-5 text-text relative overflow-hidden`)}>
            <div class="glow-border"></div>
            <div class={cn(`link-left flex items-center gap-3 relative z-10`)}>
              <svg class="icon text-accent-cyan opacity-85 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              <span class="link-value relative z-10">{siteData.linkedin.replace('https://', '')}</span>
            </div>
            <span class={cn(`link-label font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint relative z-10`)}>LinkedIn</span>
          </a>

          <!-- PHONE -->
          <a href="tel:{siteData.phone.replace(/ /g, '')}" class={cn(`contact-link glass-glow glass flex items-center justify-between p-5 text-text relative overflow-hidden`)}>
            <div class="glow-border"></div>
            <div class={cn(`link-left flex items-center gap-3 relative z-10`)}>
              <svg class="icon text-accent-cyan opacity-85 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span class="link-value relative z-10">{siteData.phone}</span>
            </div>
            <span class={cn(`link-label font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint relative z-10`)}>Phone</span>
          </a>
        </div>
      </div>

      <form class={cn(`contact-form glass-glow glass p-9 flex flex-col gap-5 relative overflow-hidden text-left`)} id="contact-form">
        <div class="glow-border"></div>

        <div class={cn(`field relative z-10 text-left`)}>
          <label for="cf-name" class={cn(`block font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint mb-2`)}>Name</label>
          <input id="cf-name" name="name" type="text" placeholder={contactData.form.namePlaceholder} required class="form-input" />
        </div>

        <div class={cn(`field relative z-10 text-left`)}>
          <label for="cf-email" class={cn(`block font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint mb-2`)}>Email</label>
          <input id="cf-email" name="email" type="email" placeholder={contactData.form.emailPlaceholder} required class="form-input" />
        </div>

        <div class={cn(`field relative z-10 text-left`)}>
          <label for="cf-message" class={cn(`block font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint mb-2`)}>Message</label>
          <textarea id="cf-message" name="message" rows="5" placeholder={contactData.form.messagePlaceholder} required class="form-input"></textarea>
        </div>

        <button type="submit" class={cn(`btn btn-primary self-start`)}>{contactData.form.buttonText}</button>
        <div class={cn(`form-status font-mono text-sm text-accent-blue min-h-4 relative z-10 text-left`)} id="form-status" role="status" aria-live="polite"></div>
      </form>
    </div>
  </div>
</section>

<style>
  .contact-link { transition: background 0.25s ease, transform 0.2s ease; }
  .contact-link:hover { background: var(--glass-bg-hover); transform: translateX(6px); }
  .contact-form { padding: 38px; }
  .form-input { width: 100%; background: rgba(120, 140, 255, 0.04); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); padding: 14px 18px; color: var(--text); font-family: var(--ff-body); font-size: 15px; resize: vertical; transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease; }
  .form-input::placeholder { color: var(--text-faint); }
  .form-input:focus { outline: none; border-color: var(--accent-blue); background: rgba(120, 140, 255, 0.06); box-shadow: 0 0 0 3px rgba(123, 166, 247, 0.12); }
  @media (max-width: 900px) { .contact-form { padding: 26px; } }
</style>
