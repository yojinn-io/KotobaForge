type FitTextOptions = {
  minSize?: number;
  maxSize?: number;
  horizontalPadding?: number;
};

export function fitTextToParent(
  element: HTMLElement,
  { minSize = 20, maxSize = 42, horizontalPadding = 12 }: FitTextOptions = {},
) {
  const parent = element.parentElement;

  if (!parent) {
    return maxSize;
  }

  const availableWidth = Math.max(parent.clientWidth - horizontalPadding, minSize);
  let low = minSize;
  let high = maxSize;
  let best = minSize;

  element.style.fontSize = `${maxSize}px`;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    element.style.fontSize = `${mid}px`;

    if (element.scrollWidth <= availableWidth) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  element.style.fontSize = `${best}px`;
  return best;
}
