<script lang="ts">
  import heroData from "../data/hero.json";
</script>

<section id="hero">
  <div class="wrap">
    <div class="hero-inner">
      <div class="eyebrow">Hey there</div>
      <h1>I'm <em>{heroData.nameFirst}</em></h1>
      <p class="role">
        I build <strong>backend architecture</strong>,
        <strong>distributed systems</strong>, and
        <strong>real-time interfaces</strong> — from fintech approval engines to
        a to-scale model of the solar system, built for the love of it.
      </p>
      <div class="hero-actions">
        <a href="#experience" class="btn btn-primary">View experience</a>
        <a href="#contact" class="btn btn-ghost">Get in touch</a>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 140px;
    padding-bottom: 180px;
  }

  .hero-inner {
    max-width: 100%;
    text-align: left;
    padding: 40px;
    margin-bottom: 20vh;
  }

  .eyebrow {
    font-family: var(--ff-mono);
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-cyan);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .eyebrow::before {
    content: "";
    width: 28px;
    height: 1px;
    background: var(--accent-cyan);
    display: inline-block;
  }

  h1 {
    font-size: clamp(48px, 10vw, 120px);
    font-weight: 700;
    color: var(--text);
    line-height: 1.02;
    letter-spacing: -0.03em;
    text-align: left;
  }

  h1 em {
    font-style: normal;
    background: var(--gradient-hero);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .role {
    margin-top: 28px;
    font-size: clamp(18px, 2.3vw, 22px);
    color: var(--text-secondary);
    max-width: 720px;
    line-height: 1.7;
    text-align: left;
  }

  .role strong {
    color: var(--text);
    font-weight: 600;
  }

  .hero-actions {
    margin-top: 48px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .hero-meta {
    margin-top: 80px;
    display: flex;
    gap: 36px;
    flex-wrap: wrap;
    font-family: var(--ff-mono);
    font-size: 13.5px;
    color: var(--text-faint);
    justify-content: flex-start;
  }

  .highlight {
    color: var(--accent-blue);
    font-weight: 500;
  }

  @media (max-width: 600px) {
    .hero-meta {
      flex-direction: column;
      gap: 12px;
    }
    .hero-actions {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
