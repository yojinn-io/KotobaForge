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
import { sentenceItems } from './sentence.data';

const initialCanvasState: HandwritingCanvasState = {
  strokeCount: 0,
  hasStrokes: false,
};

const sentenceGrammarRadarIndicators = [
  { name: '文法正確さ', max: 100 },
  { name: '助詞', max: 100 },
  { name: '自然さ', max: 100 },
  { name: '文の完結性', max: 100 },
];

const sentenceGrammarRadarAppearance = {
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

export function SentencePage() {
  const [swapped, setSwapped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [meaningOpen, setMeaningOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [canvasState, setCanvasState] =
    useState<HandwritingCanvasState>(initialCanvasState);
  const canvasRef = useRef<HandwritingCanvasHandle>(null);
  const promptRef = useRef<HTMLDivElement | null>(null);
  const item = sentenceItems[currentIndex];

  useTextFit(promptRef.current, { minSize: 22, maxSize: 34, horizontalPadding: 20 }, [
    item.promptTitle,
  ]);

  useEffect(() => {
    setMeaningOpen(false);
    setChecked(false);
    setCanvasState(initialCanvasState);
    canvasRef.current?.clear();
  }, [currentIndex]);

  const moveNext = () => {
    setMeaningOpen(false);
    setChecked(false);
    setCurrentIndex((index) => (index + 1) % sentenceItems.length);
  };

  const handleCheck = () => {
    canvasRef.current?.getPngDataUrl();
    setChecked(true);
  };

  return (
    <TrainingShell
      title="造句"
      progressTotal={6}
      progressActive={1}
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
          className="practice-pane-card sentence-practice-card"
          bodyClassName="practice-pane-card__body"
        >
          <div className="practice-row-head">
            <div className="practice-badge practice-badge--accent">
              <i className="bi bi-chat-square-text" />
              造句訓練
            </div>

            <div className="practice-row-head__group">
              <div className="practice-badge">
                <i className="bi bi-bookmark-star" />
                {item.grammarLabel}
              </div>
              <div className="practice-badge">
                <i className="bi bi-clock-history" />
                タイマーなし
              </div>
            </div>
          </div>

          <div ref={promptRef} className="practice-prompt-title">
            {item.promptTitle}
          </div>

          <div className="sentence-hint-row">
            <span className="sentence-hint-label">文法:</span>
            {meaningOpen ? (
              <span className="sentence-hint-content">説明: {item.explanation}</span>
            ) : (
              <button
                type="button"
                className="practice-toggle"
                onClick={() => setMeaningOpen(true)}
              >
                文法の説明を表示
              </button>
            )}
          </div>

          <div className="practice-question-card">
            <div className="practice-prompt-label">{item.promptLabel}</div>

            <HandwritingCanvas
              ref={canvasRef}
              overlayText="ここに日本語の文を書いてください"
              exportFileName={`kotobaforge-sentence-${item.id}.png`}
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
          <PanelCard title="今回の分析" subtitle="文法出力の確認" badge={item.grammarLabel}>
            <dl className="sentence-summary-list">
              <dt>正解率</dt>
              <dd>
                <strong>{item.accuracy}</strong>
                <span>この造句パックの進捗</span>
              </dd>
              <dt>現在の問題</dt>
              <dd>
                <strong>{item.questionIndex}</strong>
                <span>この文法の出題位置</span>
              </dd>
            </dl>
          </PanelCard>

          <PanelCard
            className="practice-analysis-card--fill sentence-grammar-card"
            title="文法チェック"
            subtitle="既存4項目の今回評価"
          >
            <RadarChart
              className="sentence-grammar-radar"
              indicators={sentenceGrammarRadarIndicators}
              series={[
                {
                  name: '今回の評価',
                  values: item.grammarRadarScores,
                  lineColor: '#9fd3c7',
                  areaColor: 'rgba(159, 211, 199, 0.16)',
                },
              ]}
              appearance={sentenceGrammarRadarAppearance}
              ariaLabel="造句の文法チェックレーダーチャート"
            />
          </PanelCard>
        </>
      }
    />
  );
}
