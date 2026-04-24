import { PanelCard } from '../../shared/ui/PanelCard';
import { RadarChart } from '../../shared/ui/RadarChart';
import type { RadarAppearance, RadarIndicator, RadarSeriesEntry } from '../../shared/lib/echarts';
import type { HomeMetricCard, HomeMiniCard } from './home.data';

type OverallAnalysisPanelProps = {
  overview: {
    rank: string;
    rankCaptionLines: string[];
    rankScoreText: string;
    jlpt: string;
    cefr: string;
    retention: string;
    overallScoreLabel: string;
    overallScore: string;
  };
  metricCards: HomeMetricCard[];
  miniCards: HomeMiniCard[];
  radarIndicators: RadarIndicator[];
  radarSeries: RadarSeriesEntry[];
  radarAppearance?: RadarAppearance;
};

export function OverallAnalysisPanel({
  overview,
  metricCards,
  miniCards,
  radarIndicators,
  radarSeries,
  radarAppearance,
}: OverallAnalysisPanelProps) {
  return (
    <PanelCard
      className="home-analysis-panel"
      title="全体分析"
      subtitle="現在の状態を優先表示"
      bodyClassName="home-analysis-panel__body"
    >
      <div className="home-analysis-layout">
        <div className="home-analysis-left">
          <div className="home-analysis-grid">
            <div className="home-surface-card home-rank-card">
              <div className="home-rank-wrap">
                <div className="home-rank-label">RANK</div>
                <div className="home-rank-circle">
                  <div className="home-rank-letter">{overview.rank}</div>
                </div>
                <div className="home-rank-caption">
                  {overview.rankCaptionLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
                <div className="home-rank-score">{overview.rankScoreText}</div>
              </div>
            </div>

            <div className="home-surface-card home-overview-card">
              <div className="home-overview-left">
                <div className="home-pill-row">
                  <div className="home-metric-pill">
                    <i className="bi bi-award" />
                    <span>{overview.jlpt}</span>
                  </div>
                  <div className="home-metric-pill">
                    <i className="bi bi-globe2" />
                    <span>{overview.cefr}</span>
                  </div>
                  <div className="home-metric-pill">
                    <span>{overview.retention}</span>
                  </div>
                </div>

              </div>

              {/* <div className="home-overview-right">
                <div className="home-overview-score-label">{overview.overallScoreLabel}</div>
                <div className="home-overview-score">{overview.overallScore}</div>
              </div> */}
            </div>

            {metricCards.map((metric) => (
              <div className="home-surface-card home-metric-card" key={metric.label}>
                <div className="home-metric-card__label">{metric.label}</div>
                <div className="home-metric-card__value">{metric.value}</div>
                <div className="home-metric-card__note">{metric.note}</div>
              </div>
            ))}

            {miniCards.map((miniCard) => (
              <div className="home-surface-card home-mini-card" key={miniCard.label}>
                <div className="home-mini-card__label">{miniCard.label}</div>
                <div
                  className={[
                    'home-mini-card__value',
                    miniCard.tone ? `is-${miniCard.tone}` : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {miniCard.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="home-analysis-right">
          <div className="home-surface-card home-radar-card">
            <div className="home-radar-head">
              <h3 className="home-radar-title">能力バランス</h3>
              <div className="home-radar-note">強みと弱みを直観表示</div>
            </div>
            <RadarChart
              indicators={radarIndicators}
              series={radarSeries}
              appearance={radarAppearance}
              className="home-radar-chart"
              ariaLabel="home overall analysis radar chart"
            />
          </div>
        </div>
      </div>
    </PanelCard>
  );
}
