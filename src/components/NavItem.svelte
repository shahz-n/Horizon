<script lang="ts">
  import { cn } from "../lib/utils";

  interface Props {
    href: string;
    label: string;
    icon: typeof import("@lucide/svelte").ArrowDownRight;
    external?: boolean;
    size?: number;
  }

  let {
    href,
    label,
    icon: Icon,
    external = false,
    size = 25,
  }: Props = $props();
</script>

<a
  {href}
  aria-label={label}
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
  class={cn(
    `rail-button relative flex h-11 w-11 shrink-0 items-center justify-center overflow-visible text-text-muted`,
  )}
>
  <Icon
    {size}
    strokeWidth={1.8}
    class="relative z-10 text-white stroke-white"
  />

  <!-- Tooltip to the left -->
  <div
    class="tooltip tooltip-left rounded-full! pointer-events-none absolute! right-full! top-1/2! z-50 mr-5 -translate-y-1/2 whitespace-nowrap glass-glow glass p-2 px-4 font-mono text-xs uppercase tracking-[0.08em] text-white"
  >
    {label}
  </div>

  <!-- Tooltip to the right -->
  <div
    class="tooltip tooltip-right rounded-full! pointer-events-none absolute! left-full! top-1/2! z-50 ml-5 -translate-y-1/2 whitespace-nowrap glass-glow glass p-2 px-4 font-mono text-xs uppercase tracking-[0.08em] text-white"
  >
    {label}
  </div>
</a>

<style>
  .tooltip {
    opacity: 0;
    transition: opacity 300ms ease;
  }

  a:hover .tooltip {
    opacity: 1;
  }
</style>
