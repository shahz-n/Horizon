<script lang="ts">
  import siteData from '../data/index.json';
</script>

<footer>
  <div class="wrap">
    <div class="foot-line">
      {#each siteData.certifications as cert}
        <span>{cert}</span>
      {/each}
      {#each siteData.languages as lang}
        <span>{lang}</span>
      {/each}
    </div>
    <div class="credit">{siteData.credit}</div>
  </div>
</footer>

<style>
  footer {
    position: relative;
    padding: 44px 0 52px;
    text-align: center;
    border-top: 1px solid rgba(140, 160, 255, 0.06);
  }

  .foot-line {
    font-family: var(--ff-mono);
    font-size: 12px;
    color: var(--text-faint);
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .credit {
    margin-top: 16px;
    font-size: 11px;
    color: var(--text-faint);
    opacity: 0.5;
  }
</style>
