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
import { vocabularyItems } from './vocabulary.data';

const initialCanvasState: HandwritingCanvasState = {
  strokeCount: 0,
  hasStrokes: false,
};

export function VocabularyPage() {
  const [swapped, setSwapped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [meaningOpen, setMeaningOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [judgement, setJudgement] = useState<'correct' | 'wrong' | null>(null);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
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
    setJudgement(null);
    setSnapshotUrl(null);
    setCanvasState(initialCanvasState);
    canvasRef.current?.clear();
  }, [currentIndex]);

  const status = useMemo(() => {
    if (!checked) {
      return {
        className: '',
        text: '手書きして Check を押すと、正答と保存画像を確認できます。',
      };
    }

    if (judgement === 'correct') {
      return {
        className: 'practice-status-banner--success',
        text: '今回の解答を正解として記録しました。次の語へ進めます。',
      };
    }

    if (judgement === 'wrong') {
      return {
        className: 'practice-status-banner--danger',
        text: '今回の解答を不正解として記録しました。弱点回収候補として残します。',
      };
    }

    return {
      className: 'practice-status-banner--pending',
      text: '正答を確認して、自己判定してください。',
    };
  }, [checked, judgement]);

  const moveNext = () => {
    setCurrentIndex((index) => (index + 1) % vocabularyItems.length);
  };

  const handleCheck = () => {
    const dataUrl = canvasRef.current?.getPngDataUrl() ?? null;
    setSnapshotUrl(dataUrl);
    setChecked(true);
    setJudgement(null);
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
        <PanelCard className="practice-pane-card" bodyClassName="practice-pane-card__body">
          <div className="practice-row-head">
            <div className="practice-row-head__group">
              <div className="practice-badge practice-badge--accent">
                <i className="bi bi-layers" />
                {item.modeLabel}
              </div>
            </div>

            <div className="practice-row-head__group">
              <div className="practice-badge">
                <i className="bi bi-clock-history" />
                タイマーなし
              </div>
            </div>
          </div>

          <div className="practice-prompt-block">
            <div ref={wordRef} className="practice-prompt-title practice-prompt-title--word">
              {item.displayText}
            </div>

            <button
              type="button"
              className="practice-toggle"
              onClick={() => setMeaningOpen((value) => !value)}
            >
              {meaningOpen ? '意味を隠す' : '意味を表示'}
              <i className={`bi ${meaningOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
            </button>

            {meaningOpen ? (
              <div className="practice-hint-card">
                <div className="practice-hint-label">語義（日本語）</div>
                <div>{item.meaning}</div>
              </div>
            ) : null}
          </div>

          <div className="practice-question-card">
            <div className="practice-prompt-label">{item.promptLabel}</div>

            <HandwritingCanvas
              ref={canvasRef}
              overlayText="ここに手書きしてください"
              exportFileName={`kotobaforge-vocabulary-${item.id}.png`}
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
              正答：<strong>{item.answer}</strong>
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
                  PNG保存または Check 後に、ここへ手書き画像を表示します。
                </div>
              )}

              <div>
                <div className="practice-help">
                  OCR未接続の試作段階です。Check後は正答を表示し、手書きPNGをそのまま確認できます。
                  最終的な正誤は自己判定で記録します。
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
          <PanelCard title="今回の分析" subtitle="テキストベース" badge={item.modeLabel}>
            <div className="practice-analysis-list">
              <div className="practice-analysis-item">
                <div className="practice-analysis-inline">
                  <div>
                    <div className="practice-analysis-label">正解率</div>
                    <div className="practice-analysis-note">この練習パックの進捗</div>
                  </div>
                  <div className="practice-analysis-value">{item.accuracy}</div>
                </div>
              </div>

              <div className="practice-analysis-item">
                <div className="practice-analysis-inline">
                  <div>
                    <div className="practice-analysis-label">現在の問題</div>
                    <div className="practice-analysis-note">この単語の出題位置</div>
                  </div>
                  <div className="practice-analysis-value">{item.questionIndex}</div>
                </div>
              </div>

              <div className="practice-analysis-item">
                <div className="practice-analysis-label">現在の単語</div>
                <div className="practice-analysis-value">{item.displayText}</div>
                <div className="practice-analysis-note">今週の増分 {item.learnedAt}</div>
              </div>
            </div>
          </PanelCard>

          <PanelCard
            className="practice-analysis-card--fill"
            title="学習履歴"
            subtitle="この単語の弱点回収"
          >
            <div className="practice-analysis-list">
              <div className="practice-analysis-item">
                <div className="practice-analysis-label">出現回数</div>
                <div className="practice-analysis-value">{item.appearanceCount}</div>
              </div>

              <div className="practice-analysis-item">
                <div className="practice-analysis-label">履歴メモ</div>
                <div className="practice-analysis-value">{item.historyNote}</div>
              </div>

              <div className="practice-analysis-item">
                <div className="practice-analysis-label">次の回収ポイント</div>
                <div className="practice-analysis-value">{item.nextFocus}</div>
              </div>
            </div>
          </PanelCard>
        </>
      }
    />
  );
}
