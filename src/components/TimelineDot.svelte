<script lang="ts">
  export let side: "left" | "right";
</script>

<div
  class:s-right={side === "left"}
  class:s-left={side === "right"}
  class="timeline-dot absolute! top-1/2 z-5
         h-[20px] w-[20px] -translate-y-1/2
         rounded-full
         glass
         transition-[border-color,box-shadow,background,transform]
         duration-500
         flex items-center justify-center"
>
  <div class="h-3 w-3 min-w-3 min-h-3 rounded-full bg-accent-cyan"></div>
</div>

<style>
  .s-right {
    right: -40px;
  }

  .s-left {
    left: -40px;
  }
  .timeline-dot {
    background: var(--gradient-glass-hover);
  }
</style>
