import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTextFit } from '../../shared/hooks/useTextFit';
import type { HandwritingCanvasState } from '../../shared/hooks/useHandwritingCanvas';
import {
  HandwritingCanvas,
  type HandwritingCanvasHandle,
} from '../../shared/ui/HandwritingCanvas';
import { PanelCard } from '../../shared/ui/PanelCard';
import { RadarChart } from '../../shared/ui/RadarChart';
import { TrainingShell } from '../../shared/ui/TrainingShell';
import { diaryItems } from './diary.data';

const initialCanvasState: HandwritingCanvasState = {
  strokeCount: 0,
  hasStrokes: false,
};

const diaryScoreRadarAppearance = {
  center: ['50%', '56%'] as [string, string],
  radius: '66%',
  showLegend: true,
  splitNumber: 4,
  axisNameColor: '#f6f7f8',
  axisNameFontSize: 11,
  axisNameFontWeight: 800,
  splitLineColor: 'rgba(255,255,255,.14)',
  axisLineColor: 'rgba(255,255,255,.14)',
  splitAreaColors: ['rgba(255,255,255,.018)', 'rgba(255,255,255,.028)'],
};

export function DiaryPage() {
  const [swapped, setSwapped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [canvasState, setCanvasState] =
    useState<HandwritingCanvasState>(initialCanvasState);
  const canvasRef = useRef<HandwritingCanvasHandle>(null);
  const promptRef = useRef<HTMLDivElement | null>(null);
  const item = diaryItems[currentIndex];

  useTextFit(promptRef.current, { minSize: 22, maxSize: 34, horizontalPadding: 20 }, [
    item.promptTitle,
  ]);

  useEffect(() => {
    setChecked(false);
    setCanvasState(initialCanvasState);
    canvasRef.current?.clear();
  }, [currentIndex]);

  const moveNext = () => {
    setChecked(false);
    setCurrentIndex((index) => (index + 1) % diaryItems.length);
  };

  const handleCheck = () => {
    canvasRef.current?.getPngDataUrl();
    setChecked(true);
  };

  const diaryScoreIndicators = item.scores.map((score) => ({
    name: score.label,
    max: 100,
  }));

  return (
    <TrainingShell
      title="日誌"
      progressTotal={6}
      progressActive={5}
      swapped={swapped}
      actions={
        <>
          <Link to="/" className="practice-button practice-button--icon" aria-label="ホーム">
            <i className="bi bi-house-door" />
          </Link>
          
          <button
            type="button"
            className="practice-button practice-button--soft"
            onClick={moveNext}
          >
            パス
          </button>
        </>
      }
      left={
        <PanelCard
          className="practice-pane-card diary-practice-card"
          bodyClassName="practice-pane-card__body"
        >
          <div className="practice-row-head">
            <div className="practice-badge practice-badge--accent">
              <i className="bi bi-journal-text" />
              日誌訓練
            </div>

            <div className="practice-row-head__group">
              <div className="practice-badge">
                <i className="bi bi-calendar3" />
                {item.topicBadge}
              </div>
              <div className="practice-badge">
                <i className="bi bi-fire" />
                {item.streakLabel}
              </div>
            </div>
          </div>

          <div ref={promptRef} className="practice-prompt-title">
            {item.promptTitle}
          </div>

          <div className="diary-assist-row">
            <span className="diary-assist-label">補助表現:</span>
            <span className="diary-assist-content">{item.hint}</span>
          </div>

          <div className="practice-question-card">
            <div className="practice-prompt-label">{item.promptLabel}</div>

            <HandwritingCanvas
              ref={canvasRef}
              overlayText="ここに今日の日誌を手書きしてください"
              exportFileName={`kotobaforge-diary-${item.id}.png`}
              onStateChange={setCanvasState}
              toolbarRight={
                <button
                  type="button"
                  className="practice-button practice-button--accent"
                  onClick={checked ? moveNext : handleCheck}
                  disabled={!checked && !canvasState.hasStrokes}
                >
                  <i className={`bi ${checked ? 'bi-arrow-right' : 'bi-check2'}`} />
                  {checked ? '次へ' : 'Check'}
                </button>
              }
            />
          </div>
        </PanelCard>
      }
      right={
        <>
          <PanelCard title="AI分析" subtitle="今回の内容に対する見立て">
            <dl className="diary-analysis-list">
              <dt>総評</dt>
              <dd>{item.opinionSummary}</dd>
              <dt>良かった点</dt>
              <dd>{item.opinionGood}</dd>
              <dt>改善点</dt>
              <dd>{item.opinionImprove}</dd>
            </dl>
          </PanelCard>

          <PanelCard
            className="practice-analysis-card--fill"
            title="今回の評価"
            subtitle="日誌の4指標"
            badge={`総合 ${item.totalScore}%`}
          >
            <RadarChart
              className="diary-score-radar"
              indicators={diaryScoreIndicators}
              series={[
                {
                  name: '今回の評価',
                  values: item.scores.map((score) => score.value),
                  lineColor: '#9fd3c7',
                  areaColor: 'rgba(159, 211, 199, 0.16)',
                },
              ]}
              appearance={diaryScoreRadarAppearance}
              ariaLabel="日誌の今回評価レーダーチャート"
            />
          </PanelCard>
        </>
      }
    />
  );
}
