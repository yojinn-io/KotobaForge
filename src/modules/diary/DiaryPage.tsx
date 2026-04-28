import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTextFit } from '../../shared/hooks/useTextFit';
import type { HandwritingCanvasState } from '../../shared/hooks/useHandwritingCanvas';
import {
  HandwritingCanvas,
  type HandwritingCanvasHandle,
} from '../../shared/ui/HandwritingCanvas';
import { PanelCard } from '../../shared/ui/PanelCard';
import { TrainingShell } from '../../shared/ui/TrainingShell';
import { diaryItems } from './diary.data';

const initialCanvasState: HandwritingCanvasState = {
  strokeCount: 0,
  hasStrokes: false,
};

export function DiaryPage() {
  const [swapped, setSwapped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [judgement, setJudgement] = useState<'correct' | 'wrong' | null>(null);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
  const [canvasState, setCanvasState] =
    useState<HandwritingCanvasState>(initialCanvasState);
  const canvasRef = useRef<HandwritingCanvasHandle>(null);
  const promptRef = useRef<HTMLDivElement | null>(null);
  const item = diaryItems[currentIndex];

  useTextFit(promptRef.current, { minSize: 22, maxSize: 34, horizontalPadding: 20 }, [
    item.promptTitle,
  ]);

  useEffect(() => {
    setHintOpen(false);
    setChecked(false);
    setJudgement(null);
    setSnapshotUrl(null);
    setCanvasState(initialCanvasState);
    canvasRef.current?.clear();
  }, [currentIndex]);

  const status = useMemo(() => {
    if (!checked) {
      return {
        className: '',
        text: 'テーマに沿って 2〜4 文ほど書き、Check で模範文とAIコメントを確認します。',
      };
    }

    if (judgement === 'correct') {
      return {
        className: 'practice-status-banner--success',
        text: '今回の日誌を正解として記録しました。次のテーマへ進めます。',
      };
    }

    if (judgement === 'wrong') {
      return {
        className: 'practice-status-banner--danger',
        text: '今回の日誌は弱点候補として残しました。あとで再挑戦できます。',
      };
    }

    return {
      className: 'practice-status-banner--pending',
      text: '模範文とAIコメントを見て、自己判定してください。',
    };
  }, [checked, judgement]);

  const moveNext = () => {
    setCurrentIndex((index) => (index + 1) % diaryItems.length);
  };

  const handleCheck = () => {
    const dataUrl = canvasRef.current?.getPngDataUrl() ?? null;
    setSnapshotUrl(dataUrl);
    setChecked(true);
    setJudgement(null);
  };

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
        <PanelCard className="practice-pane-card" bodyClassName="practice-pane-card__body">
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

          <div className="practice-prompt-block">
            <div ref={promptRef} className="practice-prompt-title">
              {item.promptTitle}
            </div>

            <button
              type="button"
              className="practice-toggle"
              onClick={() => setHintOpen((value) => !value)}
            >
              {hintOpen ? '補助表現を隠す' : '補助表現を表示'}
              <i className={`bi ${hintOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
            </button>

            {hintOpen ? (
              <div className="practice-hint-card">
                <div className="practice-hint-label">補助表現</div>
                <div>{item.hint}</div>
              </div>
            ) : null}
          </div>

          <div className="practice-question-card">
            <div className="practice-prompt-label">{item.promptLabel}</div>

            <HandwritingCanvas
              ref={canvasRef}
              overlayText="ここに今日の日誌を手書きしてください"
              exportFileName={`kotobaforge-diary-${item.id}.png`}
              onStateChange={setCanvasState}
              onExport={setSnapshotUrl}
              toolbarRight={
                <button
                  type="button"
                  className="practice-button practice-button--accent"
                  onClick={handleCheck}
                  disabled={!canvasState.hasStrokes}
                >
                  <i className="bi bi-check2" />
                  Check
                </button>
              }
            />
          </div>

          <div className="practice-feedback-card">
            <div className={['practice-status-banner', status.className].filter(Boolean).join(' ')}>
              {status.text}
            </div>

            <div className="practice-answer-line">
              模範文：<strong>{item.modelText}</strong>
            </div>

            <div className="practice-answer-line">
              AIコメント：<strong>{item.aiComment}</strong>
            </div>

            <div className="practice-feedback-grid">
              {snapshotUrl ? (
                <img
                  src={snapshotUrl}
                  alt="手書き画像プレビュー"
                  className="practice-snapshot"
                />
              ) : (
                <div className="practice-snapshot--empty">
                  保存した手書きPNGを、ここでそのまま確認できます。
                </div>
              )}

              <div>
                <div className="practice-help">
                  OCRと自動添削はまだ未接続です。いまは模範文・AIコメント・手書きPNG確認までを共通の試作フローで扱います。
                </div>

                <div className="practice-self-judge">
                  <button
                    type="button"
                    className="practice-button practice-button--success"
                    onClick={() => setJudgement('correct')}
                    disabled={!checked}
                  >
                    <i className="bi bi-check-circle" />
                    正解として記録
                  </button>
                  <button
                    type="button"
                    className="practice-button practice-button--danger"
                    onClick={() => setJudgement('wrong')}
                    disabled={!checked}
                  >
                    <i className="bi bi-x-circle" />
                    不正解として記録
                  </button>
                </div>
              </div>
            </div>

            <div className="practice-bottom-actions">
              <button
                type="button"
                className="practice-button practice-button--accent"
                onClick={moveNext}
                disabled={!checked || judgement === null}
              >
                <i className="bi bi-arrow-right" />
                次へ
              </button>
            </div>
          </div>
        </PanelCard>
      }
      right={
        <>
          <PanelCard title="AI分析" subtitle="今回の内容に対する見立て">
            <div className="practice-analysis-list">
              <div className="practice-analysis-item">
                <div className="practice-analysis-label">総評</div>
                <div className="practice-analysis-value">{item.opinionSummary}</div>
              </div>

              <div className="practice-analysis-item">
                <div className="practice-analysis-label">良かった点</div>
                <div className="practice-analysis-value">{item.opinionGood}</div>
              </div>

              <div className="practice-analysis-item">
                <div className="practice-analysis-label">改善点</div>
                <div className="practice-analysis-value">{item.opinionImprove}</div>
              </div>
            </div>
          </PanelCard>

          <PanelCard
            className="practice-analysis-card--fill"
            title="今回の評価"
            subtitle="日誌の4指標"
            badge={`総合 ${item.totalScore}%`}
          >
            <div className="practice-score-list">
              {item.scores.map((score) => (
                <div key={score.label} className="practice-score-row">
                  <div className="practice-score-label">{score.label}</div>
                  <div className="practice-score-track">
                    <div
                      className="practice-score-fill"
                      style={{ width: `${score.value}%` }}
                    />
                  </div>
                  <div className="practice-score-value">{score.value}%</div>
                </div>
              ))}
            </div>
          </PanelCard>
        </>
      }
    />
  );
}
