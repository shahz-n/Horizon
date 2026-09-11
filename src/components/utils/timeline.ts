export function updateTimelineFill(
  timelineEl: HTMLElement,
  timelineFillEl: HTMLElement,
) {
  const rect = timelineEl.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;

  const maxHeight = rect.height - 20;
  const height = Math.max(
    0,
    Math.min(maxHeight, viewportCenter - rect.top - 10),
  );

  timelineFillEl.style.height = `${height}px`;
}

export function updateTimelinePositions(
  leftCards: HTMLElement[],
  rightCards: HTMLElement[],
  staggerRatio: number,
) {
  if (window.innerWidth <= 1024) {
    [...leftCards, ...rightCards].forEach((card) => {
      card.style.marginTop = "";
    });

    return;
  }

  [...leftCards, ...rightCards].forEach((card) => {
    card.style.marginTop = "";
  });

  if (leftCards[0] && rightCards[0]) {
    const previousRect = leftCards[0].getBoundingClientRect();
    const currentRect = rightCards[0].getBoundingClientRect();

    rightCards[0].style.marginTop = `${
      previousRect.top + previousRect.height * staggerRatio - currentRect.top
    }px`;
  }

  for (let i = 1; i < leftCards.length; i++) {
    const previous = rightCards[i - 1];
    const current = leftCards[i];

    if (!previous || !current) continue;

    const previousRect = previous.getBoundingClientRect();
    const currentRect = current.getBoundingClientRect();

    current.style.marginTop = `${
      previousRect.top + previousRect.height * staggerRatio - currentRect.top
    }px`;
  }

  for (let i = 1; i < rightCards.length; i++) {
    const previous = leftCards[i];
    const current = rightCards[i];

    if (!previous || !current) continue;

    const previousRect = previous.getBoundingClientRect();
    const currentRect = current.getBoundingClientRect();

    current.style.marginTop = `${
      previousRect.top + previousRect.height * staggerRatio - currentRect.top
    }px`;
  }
}
