import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { RadarAppearance, RadarIndicator, RadarSeriesEntry } from '../lib/echarts';
import { createRadarOption } from '../lib/echarts';

type UseRadarChartArgs = {
  indicators: RadarIndicator[];
  series: RadarSeriesEntry[];
  appearance?: RadarAppearance;
};

export function useRadarChart(
  element: HTMLDivElement | null,
  { indicators, series, appearance }: UseRadarChartArgs,
) {
  const chartRef = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (!element) {
      return;
    }

    if (!chartRef.current) {
      chartRef.current = echarts.init(element, undefined, { renderer: 'canvas' });
    }

    const chart = chartRef.current;
    chart.setOption(createRadarOption({ indicators, series, appearance }));

    const resize = () => chart.resize();
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => resize())
        : null;

    observer?.observe(element);
    window.addEventListener('resize', resize);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [appearance, element, indicators, series]);

  useEffect(() => {
    return () => {
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);
}
