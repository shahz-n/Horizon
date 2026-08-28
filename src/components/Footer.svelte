<script lang="ts">
  import siteData from '../data/index.json';
  import { cn } from '../lib/utils';
</script>

<footer
  class={cn(
    'portfolio-footer',
    'relative',
    'py-[44px]',
    'pb-[52px]',
    'text-center',
    'border-t',
    'border-solid',
    'border-[rgba(140,160,255,0.06)]'
  )}
>
  <div class="wrap">
    <div
      class={cn(
        'portfolio-foot-line',
        'font-[var(--ff-mono)]',
        'text-[12px]',
        'text-[#4a5068]',
        'flex',
        'justify-center',
        'gap-5',
        'flex-wrap'
      )}
    >
      {#each siteData.certifications as cert}
        <span>{cert}</span>
      {/each}
      {#each siteData.languages as lang}
        <span>{lang}</span>
      {/each}
    </div>
    <div
      class={cn(
        'portfolio-credit',
        'mt-4',
        'text-[11px]',
        'text-[#4a5068]',
        'opacity-50'
      )}
    >
      {siteData.credit}
    </div>
  </div>
</footer>
