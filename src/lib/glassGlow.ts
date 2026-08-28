/* =========================================================================
   Glass glow effect — tracks cursor position and creates a glow on edges
   ========================================================================= */

export function initGlassGlow(container: HTMLElement) {
  const cards = container.querySelectorAll<HTMLElement>('.glass-glow');

  function handleMouseMove(e: MouseEvent) {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only apply glow when cursor is near the card (within 80px outside)
      const isNear =
        e.clientX >= rect.left - 80 &&
        e.clientX <= rect.right + 80 &&
        e.clientY >= rect.top - 80 &&
        e.clientY <= rect.bottom + 80;

      if (isNear) {
        card.style.setProperty('--glow-x', `${x}px`);
        card.style.setProperty('--glow-y', `${y}px`);
        card.style.setProperty('--glow-opacity', '1');
      } else {
        card.style.setProperty('--glow-opacity', '0');
      }
    });
  }

  document.addEventListener('mousemove', handleMouseMove, { passive: true });

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };
}
