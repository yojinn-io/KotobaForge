import { useLayoutEffect } from 'react';
import { fitTextToParent } from '../lib/textFit';

type UseTextFitOptions = {
  minSize?: number;
  maxSize?: number;
  horizontalPadding?: number;
};

export function useTextFit<T extends HTMLElement>(
  element: T | null,
  options?: UseTextFitOptions,
  deps: unknown[] = [],
) {
  useLayoutEffect(() => {
    if (!element) {
      return;
    }

    const update = () => fitTextToParent(element, options);
    update();

    const target = element.parentElement ?? element;
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => update())
        : null;

    observer?.observe(target);
    window.addEventListener('resize', update);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [element, options?.horizontalPadding, options?.maxSize, options?.minSize, ...deps]);
}
