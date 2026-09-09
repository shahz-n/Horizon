<script lang="ts">
  export let side: "left" | "right";
</script>

<div
  class:s-right={side === "left"}
  class:s-left={side === "right"}
  class="timeline-dot absolute! top-1/2 z-5
         h-[14px] w-[14px] -translate-y-1/2
         rounded-full
         glass border-[1.5px]! border-(--accent-cyan)
         transition-[border-color,box-shadow,background,transform]
         duration-500"
>
  <div
    class="h-2 w-2 min-w-2 min-h-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan"
  ></div>
</div>

<style>
  .s-right {
    right: -37px;
  }

  .s-left {
    left: -37px;
  }
  .timeline-dot {
    background: var(--gradient-glass-hover);
  }
</style>
