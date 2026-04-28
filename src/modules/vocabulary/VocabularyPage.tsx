import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTextFit } from '../../shared/hooks/useTextFit';
import type { HandwritingCanvasState } from '../../shared/hooks/useHandwritingCanvas';
import {
  checkVocabularyAnswer,
  exportHandwritingImage,
} from '../../shared/api/trainingApi';
import {
  HandwritingCanvas,
  type HandwritingCanvasHandle,
} from '../../shared/ui/HandwritingCanvas';
import { PanelCard } from '../../shared/ui/PanelCard';
import { RadarChart } from '../../shared/ui/RadarChart';
import { TrainingShell } from '../../shared/ui/TrainingShell';
import { vocabularyItems } from './vocabulary.data';

const initialCanvasState: HandwritingCanvasState = {
  strokeCount: 0,
  hasStrokes: false,
};

const vocabularyHistoryRadarIndicators = [
  { name: '漢字', max: 20 },
  { name: '発音', max: 20 },
  { name: '詞義', max: 20 },
  { name: '句子', max: 20 },
];

const vocabularyHistoryRadarSeries = [
  {
    name: '出現回数',
    values: [12, 10, 14, 6],
    lineColor: '#9fd3c7',
    areaColor: 'rgba(159, 211, 199, 0.14)',
  },
  {
    name: '正解数',
    values: [8, 7, 11, 3],
    lineColor: '#b9c8ff',
    areaColor: 'rgba(185, 200, 255, 0.12)',
  },
];

const vocabularyHistoryRadarAppearance = {
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

export function VocabularyPage() {
  const [swapped, setSwapped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [meaningOpen, setMeaningOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [canvasState, setCanvasState] =
    useState<HandwritingCanvasState>(initialCanvasState);
  const canvasRef = useRef<HandwritingCanvasHandle>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);
  const item = vocabularyItems[currentIndex];

  useTextFit(wordRef.current, { minSize: 24, maxSize: 54, horizontalPadding: 20 }, [
    item.displayText,
  ]);

  useEffect(() => {
    setMeaningOpen(false);
    setChecked(false);
    setCanvasState(initialCanvasState);
    canvasRef.current?.clear();
  }, [currentIndex]);

  const moveNext = () => {
    setMeaningOpen(false);
    setCurrentIndex((index) => (index + 1) % vocabularyItems.length);
  };

  const handleCheck = async () => {
    const dataUrl = canvasRef.current?.getPngDataUrl() ?? null;

    setChecked(true);
    await checkVocabularyAnswer({
      questionId: item.id,
      expectedAnswer: item.answer,
      imageDataUrl: dataUrl,
    });
  };

  const handleExport = (dataUrl: string) => {
    void exportHandwritingImage({
      questionId: item.id,
      imageDataUrl: dataUrl,
    });
  };

  return (
    <TrainingShell
      title="単語"
      progressTotal={6}
      progressActive={0}
      swapped={swapped}
      actions={
        <>
          <Link to="/" className="practice-button practice-button--icon" aria-label="ホーム">
            <i className="bi bi-house-door" />
          </Link>
          <button
            type="button"
            className="practice-button practice-button--soft"
            onClick={() => setSwapped((value) => !value)}
          >
            <i className="bi bi-arrow-left-right" />
            左右切替
          </button>
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
          className="practice-pane-card vocabulary-practice-card"
          bodyClassName="practice-pane-card__body"
        >
          <header className="practice-row-head">
            <div className="practice-badge practice-badge--accent">
              <i className="bi bi-layers" />
              {item.modeLabel}
            </div>

            <div className="practice-badge">
              <i className="bi bi-clock-history" />
              タイマーなし
            </div>
          </header>

          <div ref={wordRef} className="practice-prompt-title practice-prompt-title--word">
            {item.displayText}
          </div>

          <div className="vocabulary-hint-row">
            <span className="vocabulary-hint-label">ヒント:</span>
            {meaningOpen ? (
              <span className="vocabulary-hint-content">意味: {item.meaning}</span>
            ) : (
              <button
                type="button"
                className="practice-toggle"
                onClick={() => setMeaningOpen(true)}
              >
                意味を表示
              </button>
            )}
          </div>

          <div className="practice-question-card" aria-label="手書き回答">
            <div className="practice-prompt-label">{item.promptLabel}</div>

            <HandwritingCanvas
              ref={canvasRef}
              overlayText="ここに手書きしてください"
              exportFileName={`kotobaforge-vocabulary-${item.id}.png`}
              onStateChange={setCanvasState}
              onExport={handleExport}
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
          <PanelCard title="今回の分析" subtitle="テキストベース" badge={item.modeLabel}>
            <dl className="vocabulary-summary-list">
              <dt>正解率</dt>
              <dd>
                <strong>{item.accuracy}</strong>
                <span>この練習パックの進捗</span>
              </dd>
              <dt>現在の問題</dt>
              <dd>
                <strong>{item.questionIndex}</strong>
                <span>この単語の出題位置</span>
              </dd>
              <dt>現在の単語</dt>
              <dd>
                <strong>{item.displayText}</strong>
                <span>今週の増分 {item.learnedAt}</span>
              </dd>
            </dl>
          </PanelCard>

          <PanelCard
            className="practice-analysis-card--fill vocabulary-history-card"
            title="学習履歴"
            subtitle="訓練タイプ別の出現回数 / 正解数"
          >
            <RadarChart
              className="vocabulary-history-radar"
              indicators={vocabularyHistoryRadarIndicators}
              series={vocabularyHistoryRadarSeries}
              appearance={vocabularyHistoryRadarAppearance}
              ariaLabel="単語学習履歴のレーダーチャート"
            />
          </PanelCard>
        </>
      }
    />
  );
}
