import type {
  RadarAppearance,
  RadarIndicator,
  RadarSeriesEntry,
} from '../../shared/lib/echarts';

export type HomeMetricCard = {
  label: string;
  value: string;
  note: string;
};

export type HomeMiniCard = {
  label: string;
  value: string;
  tone?: 'good' | 'warn';
};

export type HomeListItem = {
  title: string;
  subtitle: string;
  meta: string;
};

export const homeTopBarPills = [
  { icon: 'bi bi-fire', label: '連続 28日' },
  { icon: 'bi bi-calendar-check', label: '今日 42分' },
];

export const homeOverview = {
  rank: 'A',
  rankCaptionLines: ['CURRENT', 'RANK'],
  rankScoreText: '総合スコア 72 / 100',
  jlpt: 'JLPT N3',
  cefr: 'CEFR B1',
  retention: '定着率 81%',
  overallScoreLabel: '総合スコア',
  overallScore: '78',
};

export const homeMetricCards: HomeMetricCard[] = [
  { label: '累計単語', value: '1,248', note: '今週 +84' },
  { label: '累計造句', value: '326', note: '今週 +21' },
  { label: '日誌連続', value: '14日', note: '最高 18日' },
  { label: '対話評価', value: '76%', note: '今週 +4' },
];

export const homeMiniCards: HomeMiniCard[] = [
  { label: '今週一番伸びた', value: '発音 +8', tone: 'good' },
  { label: '今週の注意', value: '助詞 -3', tone: 'warn' },
  { label: '今日の負荷', value: '中' },
];

export const homeRadarIndicators: RadarIndicator[] = [
  { name: '単語' },
  { name: '対話' },
  { name: '読解' },
  { name: '発音' },
  { name: '文章' },
  { name: '造句' },
];

export const homeRadarSeries: RadarSeriesEntry[] = [
  {
    name: '現在の能力バランス',
    values: [84, 71, 69, 81, 77, 73],
    lineColor: '#9fd3c7',
    areaColor: 'rgba(159,211,199,.18)',
  },
];

export const homeRadarAppearance: RadarAppearance = {
  center: ['50%', '54%'],
  radius: '74%',
  splitNumber: 4,
  axisNameColor: '#f6f7f8',
  axisNameFontSize: 12,
  axisNameFontWeight: 800,
  splitLineColor: 'rgba(255,255,255,.18)',
  axisLineColor: 'rgba(255,255,255,.18)',
  splitAreaColors: ['rgba(255,255,255,.015)', 'rgba(255,255,255,.025)'],
};

export const homeAdvice = {
  badge: '今週の重点',
  markdown: `## 今週の方針
現在は学習量を増やすより、**短くても正確な出力**を積み重ねる方が効率的です。とくに助詞と抑揚の修正を優先すると、全体の安定度が上がります。

### 推奨タスク
- **単語復習**: 漢字→読み 6問 / 文脈 2問（8分）
- **造句**: N3文法 3問 / 助詞補強（7分）
- **跟読 + 日誌**: 音読確認 4本 / 日誌 1本（9分）

### 出力時の注意
- 日誌では毎回「理由」を1文入れる
- 跟読では語尾の抑揚を意識する
- 造句では似た助詞の差を比較する`,
};

export const homeWeaknessItems: HomeListItem[] = [
  { title: '助詞の選択', subtitle: '「で / に / を」で再発が多い', meta: '高' },
  { title: '語尾の抑揚', subtitle: '跟読で後半が平坦になりやすい', meta: '中' },
  { title: '理由の展開', subtitle: '日誌と対話で具体例が不足しやすい', meta: '中' },
];
