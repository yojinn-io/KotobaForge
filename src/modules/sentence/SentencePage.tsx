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
import { sentenceItems } from './sentence.data';

const initialCanvasState: HandwritingCanvasState = {
  strokeCount: 0,
  hasStrokes: false,
};

export function SentencePage() {
  const [swapped, setSwapped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [meaningOpen, setMeaningOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [judgement, setJudgement] = useState<'correct' | 'wrong' | null>(null);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
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
    setJudgement(null);
    setSnapshotUrl(null);
    setCanvasState(initialCanvasState);
    canvasRef.current?.clear();
  }, [currentIndex]);

  const status = useMemo(() => {
    if (!checked) {
      return {
        className: '',
        text: '文法を使って1文を書き、Check で模範文とAIコメントを確認します。',
      };
    }

    if (judgement === 'correct') {
      return {
        className: 'practice-status-banner--success',
        text: '今回の造句を正解として保存しました。次の文法へ進めます。',
      };
    }

    if (judgement === 'wrong') {
      return {
        className: 'practice-status-banner--danger',
        text: '今回の造句は弱点候補として残しました。復習キューへ回せます。',
      };
    }

    return {
      className: 'practice-status-banner--pending',
      text: '模範解答とAIコメントを見て、自己判定してください。',
    };
  }, [checked, judgement]);

  const moveNext = () => {
    setCurrentIndex((index) => (index + 1) % sentenceItems.length);
  };

  const handleCheck = () => {
    const dataUrl = canvasRef.current?.getPngDataUrl() ?? null;
    setSnapshotUrl(dataUrl);
    setChecked(true);
    setJudgement(null);
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

          <div className="practice-prompt-block">
            <div ref={promptRef} className="practice-prompt-title">
              {item.promptTitle}
            </div>

            <button
              type="button"
              className="practice-toggle"
              onClick={() => setMeaningOpen((value) => !value)}
            >
              {meaningOpen ? '文法の説明を隠す' : '文法の説明を表示'}
              <i className={`bi ${meaningOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
            </button>

            {meaningOpen ? (
              <div className="practice-hint-card">
                <div className="practice-hint-label">文法説明（日本語）</div>
                <div>{item.explanation}</div>
              </div>
            ) : null}
          </div>

          <div className="practice-question-card">
            <div className="practice-prompt-label">{item.promptLabel}</div>

            <HandwritingCanvas
              ref={canvasRef}
              overlayText="ここに日本語の文を書いてください"
              exportFileName={`kotobaforge-sentence-${item.id}.png`}
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
              模範解答：<strong>{item.modelAnswer}</strong>
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
                  Check 後に現在の造句PNGをここで確認できます。
                </div>
              )}

              <div>
                <div className="practice-help">
                  OCRと自動添削はまだ未接続ですが、手書き・保存・模範文確認までは共通フローで扱えます。
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
          <PanelCard title="今回の分析" subtitle="文法出力の確認" badge={item.grammarLabel}>
            <div className="practice-analysis-list">
              <div className="practice-analysis-item">
                <div className="practice-analysis-inline">
                  <div>
                    <div className="practice-analysis-label">正解率</div>
                    <div className="practice-analysis-note">この造句パックの進捗</div>
                  </div>
                  <div className="practice-analysis-value">{item.accuracy}</div>
                </div>
              </div>

              <div className="practice-analysis-item">
                <div className="practice-analysis-inline">
                  <div>
                    <div className="practice-analysis-label">現在の問題</div>
                    <div className="practice-analysis-note">この文法の出題位置</div>
                  </div>
                  <div className="practice-analysis-value">{item.questionIndex}</div>
                </div>
              </div>
            </div>
          </PanelCard>

          <PanelCard
            className="practice-analysis-card--fill"
            title="文法チェック"
            subtitle="出力の観点整理"
          >
            <div className="practice-analysis-list">
              <div className="practice-analysis-item">
                <div className="practice-analysis-label">文法正確さ</div>
                <div className="practice-analysis-value">{item.grammarCheck}</div>
              </div>

              <div className="practice-analysis-item">
                <div className="practice-analysis-label">助詞</div>
                <div className="practice-analysis-value">{item.particleCheck}</div>
              </div>

              <div className="practice-analysis-item">
                <div className="practice-analysis-label">自然さ</div>
                <div className="practice-analysis-value">{item.naturalness}</div>
              </div>

              <div className="practice-analysis-item">
                <div className="practice-analysis-label">文の完結性</div>
                <div className="practice-analysis-value">{item.completeness}</div>
              </div>
            </div>
          </PanelCard>
        </>
      }
    />
  );
}
