<script lang="ts">
  import { onMount } from 'svelte';
  import contactData from '../data/contact.json';
  import siteData from '../data/index.json';

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

<section id="contact">
  <div class="wrap">
    <div class="contact-inner">
      <div class="contact-info">
        <div class="section-head">
          <div class="eyebrow">{contactData.eyebrow}</div>
          <h2>{contactData.title}</h2>
          <p class="sub">{contactData.sub}</p>
        </div>

        <div class="contact-links">
          <!-- EMAIL -->
          <a href="mailto:{siteData.email}" class="contact-link glass-glow glass">
            <div class="glow-border"></div>
            <div class="link-left">
              <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="2" y="4" width="20" height="16" rx="3"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
              <span class="link-value">{siteData.email}</span>
            </div>
            <span class="link-label">Email</span>
          </a>

          <!-- GITHUB -->
          <a href={siteData.github} target="_blank" rel="noopener" class="contact-link glass-glow glass">
            <div class="glow-border"></div>
            <div class="link-left">
              <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              <span class="link-value">{siteData.github.replace('https://', '')}</span>
            </div>
            <span class="link-label">GitHub</span>
          </a>

          <!-- LINKEDIN -->
          <a href={siteData.linkedin} target="_blank" rel="noopener" class="contact-link glass-glow glass">
            <div class="glow-border"></div>
            <div class="link-left">
              <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              <span class="link-value">{siteData.linkedin.replace('https://', '')}</span>
            </div>
            <span class="link-label">LinkedIn</span>
          </a>

          <!-- PHONE -->
          <a href="tel:{siteData.phone.replace(/ /g, '')}" class="contact-link glass-glow glass">
            <div class="glow-border"></div>
            <div class="link-left">
              <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span class="link-value">{siteData.phone}</span>
            </div>
            <span class="link-label">Phone</span>
          </a>
        </div>
      </div>

      <form class="contact-form glass-glow glass" id="contact-form">
        <div class="glow-border"></div>
        <div class="field">
          <label for="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" placeholder={contactData.form.namePlaceholder} required />
        </div>
        <div class="field">
          <label for="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" placeholder={contactData.form.emailPlaceholder} required />
        </div>
        <div class="field">
          <label for="cf-message">Message</label>
          <textarea id="cf-message" name="message" rows="5" placeholder={contactData.form.messagePlaceholder} required></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="align-self:flex-start;">{contactData.form.buttonText}</button>
        <div class="form-status" id="form-status" role="status" aria-live="polite"></div>
      </form>
    </div>
  </div>
</section>

<style>
  section {
    padding-bottom: clamp(180px, 24vh, 320px);
  }

  .contact-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
    text-align: left;
  }

  .section-head {
    margin-bottom: 0;
    text-align: left;
  }

  .contact-links {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .contact-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    font-size: 15px;
    color: var(--text);
    transition: background 0.25s ease, transform 0.2s ease;
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }

  .contact-link:hover {
    background: var(--glass-bg-hover);
    transform: translateX(6px);
  }

  .link-left {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .icon {
    color: var(--accent-cyan);
    opacity: 0.85;
    flex-shrink: 0;
  }

  .link-value {
    position: relative;
    z-index: 1;
  }

  .link-label {
    color: var(--text-faint);
    font-family: var(--ff-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    position: relative;
    z-index: 1;
  }

  .contact-form {
    padding: 38px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    overflow: hidden;
    text-align: left;
  }

  .field {
    position: relative;
    z-index: 1;
    text-align: left;
  }

  .field label {
    display: block;
    font-family: var(--ff-mono);
    font-size: 11.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-faint);
    margin-bottom: 8px;
    text-align: left;
  }

  .field input,
  .field textarea {
    width: 100%;
    background: rgba(120, 140, 255, 0.04);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-sm);
    padding: 14px 18px;
    color: var(--text);
    font-family: var(--ff-body);
    font-size: 15px;
    resize: vertical;
    transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }

  .field input::placeholder,
  .field textarea::placeholder {
    color: var(--text-faint);
  }

  .field input:focus,
  .field textarea:focus {
    outline: none;
    border-color: var(--accent-blue);
    background: rgba(120, 140, 255, 0.06);
    box-shadow: 0 0 0 3px rgba(123, 166, 247, 0.12);
  }

  .form-status {
    font-family: var(--ff-mono);
    font-size: 13px;
    color: var(--accent-blue);
    min-height: 16px;
    position: relative;
    z-index: 1;
    text-align: left;
  }

  @media (max-width: 900px) {
    .contact-inner {
      grid-template-columns: 1fr;
    }
  }
</style>
