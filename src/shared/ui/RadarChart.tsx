import { useState } from 'react';
import { useRadarChart } from '../hooks/useRadarChart';
import type { RadarAppearance, RadarIndicator, RadarSeriesEntry } from '../lib/echarts';

type RadarChartProps = {
  indicators: RadarIndicator[];
  series: RadarSeriesEntry[];
  appearance?: RadarAppearance;
  className?: string;
  ariaLabel?: string;
};

export function RadarChart({
  indicators,
  series,
  appearance,
  className,
  ariaLabel = 'radar chart',
}: RadarChartProps) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  useRadarChart(element, { indicators, series, appearance });

  return (
    <div
      ref={setElement}
      className={['radar-chart', className].filter(Boolean).join(' ')}
      role="img"
      aria-label={ariaLabel}
    />
  );
}
