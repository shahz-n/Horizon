/* =========================================================================
   Scroll-driven reveal animations using IntersectionObserver
   ========================================================================= */

export function initScrollReveals(container: HTMLElement) {
  const targets = container.querySelectorAll<HTMLElement>('.reveal');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.revealDelay || '0';
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
  };
}
