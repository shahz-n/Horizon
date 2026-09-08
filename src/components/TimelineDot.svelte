<script lang="ts">
  export let side: "left" | "right";
</script>

<div
  class:s-right={side === "left"}
  class:s-left={side === "right"}
  class="timeline-dot absolute top-1/2 z-5
         h-4 w-4 -translate-y-1/2 rounded-full
         border-3
         border-[#0008]
         bg-accent-cyan
         transition-[border-color,box-shadow,background,transform]
         duration-500
         [.in-view_&]:scale-[1.15]
         [.in-view_&]:shadow-[0_0_24px_6px_rgba(103,232,249,0.6)]"
></div>

<style>
  .s-right {
    right: -38px;
  }

  .s-left {
    left: -38px;
  }
</style>
