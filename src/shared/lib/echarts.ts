import type { EChartsOption } from 'echarts';

export type RadarIndicator = {
  name: string;
  max?: number;
};

export type RadarSeriesEntry = {
  name: string;
  values: number[];
  lineColor?: string;
  areaColor?: string;
};

export type RadarAppearance = {
  center?: [string, string];
  radius?: string;
  showLegend?: boolean;
  splitNumber?: number;
  axisNameColor?: string;
  axisNameFontSize?: number;
  axisNameFontWeight?: number | 'normal' | 'bold' | 'bolder' | 'lighter';
  splitLineColor?: string;
  axisLineColor?: string;
  splitAreaColors?: string[];
};

type RadarOptionInput = {
  indicators: RadarIndicator[];
  series: RadarSeriesEntry[];
  appearance?: RadarAppearance;
};

export function createRadarOption({
  indicators,
  series,
  appearance,
}: RadarOptionInput): EChartsOption {
  return {
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(14,17,22,.96)',
      borderColor: 'rgba(255,255,255,.12)',
      textStyle: { color: '#f6f7f8' },
    },
    legend: {
      show: appearance?.showLegend ?? false,
      top: 0,
      right: 0,
      itemWidth: 10,
      itemHeight: 6,
      textStyle: {
        color: 'rgba(246,247,248,.78)',
        fontSize: 11,
        fontWeight: 700,
      },
      data: series.map((entry) => entry.name),
    },
    radar: {
      center: appearance?.center ?? ['50%', '55%'],
      radius: appearance?.radius ?? '68%',
      splitNumber: appearance?.splitNumber ?? 4,
      axisName: {
        color: appearance?.axisNameColor ?? 'rgba(255,255,255,.78)',
        fontSize: appearance?.axisNameFontSize ?? 12,
        fontWeight: appearance?.axisNameFontWeight ?? 700,
      },
      splitArea: {
        areaStyle: {
          color: appearance?.splitAreaColors ?? ['rgba(255,255,255,.02)', 'rgba(255,255,255,.01)'],
        },
      },
      splitLine: {
        lineStyle: {
          color: appearance?.splitLineColor ?? 'rgba(255,255,255,.10)',
        },
      },
      axisLine: {
        lineStyle: {
          color: appearance?.axisLineColor ?? 'rgba(255,255,255,.16)',
        },
      },
      indicator: indicators.map((indicator) => ({
        name: indicator.name,
        max: indicator.max ?? 100,
      })),
    },
    series: [
      {
        type: 'radar',
        symbol: 'circle',
        symbolSize: 5,
        data: series.map((entry) => ({
          value: entry.values,
          name: entry.name,
          lineStyle: {
            color: entry.lineColor ?? '#9fd3c7',
            width: 2,
          },
          itemStyle: {
            color: entry.lineColor ?? '#9fd3c7',
          },
          areaStyle: {
            color: entry.areaColor ?? 'rgba(159,211,199,.12)',
          },
        })),
      },
    ],
  };
}
