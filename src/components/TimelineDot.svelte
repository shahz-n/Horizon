<script lang="ts">
  export let side: "left" | "right";
</script>

<div
  class:s-right={side === "left"}
  class:s-left={side === "right"}
  class="timeline-dot absolute! top-1/2 z-5 max_md:hidden
         size-(--timeline-dot-size) -translate-y-1/2
         rounded-full
         glass border! border-(--accent-cyan)
         transition-[border-color,box-shadow,background,transform]
         duration-500 max-lg:hidden"
>
  <div
    class="h-2 w-2 min-w-2 min-h-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan"
  ></div>
</div>

<style>
  .s-right {
    right: var(--timeline-marker-offset);
  }

  .s-left {
    left: var(--timeline-marker-offset);
  }
  .timeline-dot {
    background: var(--gradient-glass-hover);
  }
</style>
