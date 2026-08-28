<script lang="ts">
  import heroData from "../data/hero.json";
</script>

<section id="hero">
  <div class="wrap">
    <div class="hero-content">
      <div class="eyebrow">
        <span>Hi there</span>
      </div>

      <h1>
        I'm <em>{heroData.nameFirst}</em>
      </h1>

      <p class="intro">
        I build
        <span class="gradient-text">backend architecture</span>,
        <span class="gradient-text">distributed systems</span>, and
        <span class="gradient-text">real-time interfaces</span>.
      </p>

      <p class="subtext">
        From fintech approval engines to a to-scale model of the solar system, I
        like building things that are unnecessarily interesting.
      </p>

      <div class="hero-actions">
        <a href="#experience" class="btn btn-primary"> View experience </a>

        <a href="#contact" class="btn btn-ghost"> Get in touch </a>
      </div>

      <a
        class="scroll-indicator"
        href="#about"
        aria-label="Scroll to experience"
      >
        <span class="scroll-label">SCROLL TO EXPLORE</span>
        <span class="scroll-arrow">↓</span>
      </a>
    </div>
  </div>
</section>

<style>
  section {
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    padding-top: 120px;
    padding-bottom: 190px;

    position: relative;
  }

  .hero-content {
    width: 100%;
    /* max-width: 1180px; */

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;

    position: relative;
    z-index: 2;
  }

  /* ─────────────────────────────
     Eyebrow
  ───────────────────────────── */

  .eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;

    margin-bottom: 30px;

    color: var(--accent-cyan);

    font-family: var(--ff-mono);
    font-size: 11px;
    letter-spacing: 0.18em;
    line-height: 1;

    text-transform: uppercase;

    opacity: 0.9;
  }

  .eyebrow::before {
    content: "";
    width: 32px;
    height: 1px;
    background: var(--accent-cyan);
    opacity: 0.7;
  }

  /* ─────────────────────────────
     Name
  ───────────────────────────── */

  h1 {
    margin: 0;

    font-family: var(--ff-display);
    font-size: clamp(72px, 11vw, 150px);
    font-weight: 700;

    line-height: 0.9;
    letter-spacing: -0.065em;

    color: var(--text);
  }

  h1 em {
    font-style: normal;

    background: var(--gradient-hero);
    background-clip: text;
    -webkit-background-clip: text;

    color: transparent;
    -webkit-text-fill-color: transparent;
  }

  /* ─────────────────────────────
     Main statement
  ───────────────────────────── */

  .intro {
    max-width: 950px;

    margin: 48px 0 0;

    font-family: var(--ff-body);
    font-size: clamp(25px, 3vw, 40px);
    font-weight: 400;

    line-height: 1.25;
    letter-spacing: -0.035em;

    color: var(--text-secondary);
  }

  .gradient-text {
    font-family: var(--ff-display);
    font-weight: 600;

    background: var(--gradient-hero);
    background-clip: text;
    -webkit-background-clip: text;

    color: transparent;
    -webkit-text-fill-color: transparent;
  }

  /* ─────────────────────────────
     Supporting copy
  ───────────────────────────── */

  .subtext {
    max-width: 690px;

    margin: 20px 0 0;

    color: var(--text-muted);

    font-family: var(--ff-body);
    font-size: clamp(16px, 1.5vw, 19px);
    font-weight: 400;

    line-height: 1.65;
    letter-spacing: -0.01em;
  }

  /* ─────────────────────────────
     Actions
  ───────────────────────────── */

  .hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 12px;

    margin-top: 42px;
  }

  .hero-actions .btn {
    min-width: 150px;
  }

  /* ─────────────────────────────
     Scroll indicator
  ───────────────────────────── */

  .scroll-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;

    gap: 12px;

    bottom: -10rem;

    color: var(--text-faint);

    text-decoration: none;

    transition:
      color 0.3s ease,
      transform 0.3s ease;
  }

  .scroll-indicator:hover {
    color: var(--text-secondary);
    transform: translateY(4px);
  }

  .scroll-label {
    font-family: var(--ff-mono);
    font-size: 9px;
    letter-spacing: 0.18em;
  }

  .scroll-arrow {
    width: 5rem;
    height: 5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid var(--glass-border);
    border-radius: 50%;

    color: var(--text-secondary);

    font-family: var(--ff-body);
    font-size: 18px;
    line-height: 1;

    background: rgba(120, 140, 255, 0.025);

    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    animation: float-arrow 2.5s ease-in-out infinite;
  }

  @keyframes float-arrow {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(5px);
    }
  }

  /* ─────────────────────────────
     Tablet
  ───────────────────────────── */

  @media (max-width: 1024px) {
    section {
      padding-top: 110px;
      padding-bottom: 160px;
    }

    .hero-content {
      max-width: 900px;
    }

    h1 {
      font-size: clamp(64px, 12vw, 115px);
    }

    .intro {
      max-width: 760px;
    }
  }

  /* ─────────────────────────────
     Mobile
  ───────────────────────────── */

  @media (max-width: 768px) {
    section {
      min-height: 100svh;

      padding-top: 100px;
      padding-bottom: 120px;
    }

    .hero-content {
      padding: 0 20px;
    }

    .eyebrow {
      font-size: 9px;
      letter-spacing: 0.14em;
      gap: 9px;
    }

    h1 {
      font-size: clamp(54px, 16vw, 88px);
      line-height: 0.94;
    }

    .intro {
      margin-top: 34px;

      font-size: clamp(21px, 6vw, 28px);
      line-height: 1.3;
    }

    .subtext {
      margin-top: 16px;

      font-size: 15px;
      line-height: 1.6;
    }

    .hero-actions {
      width: 100%;

      margin-top: 32px;

      flex-direction: column;
    }

    .hero-actions .btn {
      width: min(320px, 100%);
    }

    .scroll-indicator {
      margin-top: 55px;
    }
  }

  @media (max-width: 420px) {
    section {
      padding-top: 90px;
    }

    .hero-content {
      padding: 0 16px;
    }

    h1 {
      font-size: 52px;
    }

    .intro {
      font-size: 20px;
    }

    .subtext {
      font-size: 14px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scroll-arrow {
      animation: none;
    }
  }
</style>
