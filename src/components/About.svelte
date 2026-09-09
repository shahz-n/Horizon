<script lang="ts">
  import aboutData from "../data/about.json";
</script>

<section id="about" class="page">
  <div class="wrap">
    <div class="section-head text-center">
      <div class="eyebrow">{aboutData.eyebrow}</div>
      <h2>{aboutData.title}</h2>
    </div>

    <div
      class="mx-auto mt-10 grid grid-cols-12 gap-8 text-sm md:text-base leading-relaxed text-secondary max_lg:grid-cols-1 max_lg:gap-4"
    >
      {#each aboutData.paragraphs as paragraph, index}
        {#if index === 2 || index === 3}
          <div class="col-span-3 max_lg:hidden"></div>
        {/if}
        <p
          class={`glass col-span-6 p-4 md:p-5 lg:p-6 max_lg:col-span-1 ${index >= 3 ? "max_lg:hidden" : ""}`}
        >
          {@html paragraph}
        </p>
      {/each}
    </div>
  </div>
</section>
