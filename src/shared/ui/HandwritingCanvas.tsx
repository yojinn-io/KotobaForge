import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  type ReactNode,
} from 'react';
import {
  useHandwritingCanvas,
  type HandwritingCanvasState,
} from '../hooks/useHandwritingCanvas';

export type HandwritingCanvasHandle = {
  clear: () => void;
  undo: () => void;
  resetDrawingMode: () => void;
  getPngDataUrl: () => string | null;
  downloadPng: (fileName?: string) => string | null;
  hasStrokes: () => boolean;
  getStrokeCount: () => number;
};

type HandwritingCanvasProps = {
  overlayText: string;
  exportFileName?: string;
  className?: string;
  canvasAriaLabel?: string;
  toolbarRight?: ReactNode;
  onExport?: (dataUrl: string) => void;
  onStateChange?: (state: HandwritingCanvasState) => void;
};

const initialCanvasState: HandwritingCanvasState = {
  strokeCount: 0,
  hasStrokes: false,
};

export const HandwritingCanvas = forwardRef<HandwritingCanvasHandle, HandwritingCanvasProps>(
  function HandwritingCanvas(
    {
      overlayText,
      exportFileName,
      className,
      canvasAriaLabel,
      toolbarRight,
      onExport,
      onStateChange,
    },
    ref,
  ) {
    const [canvasState, setCanvasState] =
      useState<HandwritingCanvasState>(initialCanvasState);
    const handleStateChange = useCallback(
      (state: HandwritingCanvasState) => {
        setCanvasState((current) =>
          current.strokeCount === state.strokeCount && current.hasStrokes === state.hasStrokes
            ? current
            : state,
        );
        onStateChange?.(state);
      },
      [onStateChange],
    );
    const {
      canvasRef,
      clear,
      downloadPng,
      drawingMode,
      getPngDataUrl,
      hasStrokes,
      resetDrawingMode,
      strokeCount,
      toggleDrawingMode,
      undo,
    } = useHandwritingCanvas({
      onStateChange: handleStateChange,
    });

    const handleExport = () => {
      const dataUrl = downloadPng(exportFileName);

      if (dataUrl) {
        onExport?.(dataUrl);
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        clear,
        undo,
        resetDrawingMode,
        getPngDataUrl,
        downloadPng: (fileName) => downloadPng(fileName ?? exportFileName),
        hasStrokes: () => hasStrokes,
        getStrokeCount: () => strokeCount,
      }),
      [
        clear,
        downloadPng,
        exportFileName,
        getPngDataUrl,
        hasStrokes,
        resetDrawingMode,
        strokeCount,
        undo,
      ],
    );

    return (
      <div className={['handwriting-canvas', className].filter(Boolean).join(' ')}>
        <div
          className={[
            'handwriting-canvas__surface',
            `handwriting-canvas__surface--${drawingMode}`,
          ].join(' ')}
        >
          <canvas
            ref={canvasRef}
            className="handwriting-canvas__element"
            aria-label={canvasAriaLabel ?? overlayText}
          />
          {!canvasState.hasStrokes ? (
            <div className="handwriting-canvas__overlay">{overlayText}</div>
          ) : null}
        </div>

        <div className="handwriting-canvas__toolbar">
          <div className="practice-button-group">
            <button
              type="button"
              className="practice-button practice-button--soft"
              onClick={undo}
              disabled={!canvasState.hasStrokes}
            >
              <i className="bi bi-arrow-counterclockwise" />
              Undo
            </button>
            <button
              type="button"
              className="practice-button practice-button--soft"
              onClick={clear}
              disabled={!canvasState.hasStrokes}
            >
              <i className="bi bi-eraser" />
              Clear
            </button>
            <button
              type="button"
              className="practice-button practice-button--soft"
              onClick={handleExport}
              disabled={!canvasState.hasStrokes}
            >
              <i className="bi bi-image" />
              PNG保存
            </button>
            <button
              type="button"
              className={[
                'practice-button',
                'practice-button--soft',
                'handwriting-mode-button',
                drawingMode === 'eraser' ? 'handwriting-mode-button--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={toggleDrawingMode}
              aria-pressed={drawingMode === 'eraser'}
              aria-label={
                drawingMode === 'eraser'
                  ? '手書きペンモードに戻す'
                  : '消しゴムモードに切り替える'
              }
            >
              <i className={`bi ${drawingMode === 'eraser' ? 'bi-eraser' : 'bi-pencil'}`} />
              {drawingMode === 'eraser' ? '消しゴム' : 'ペン'}
            </button>
          </div>

          {toolbarRight ? <div className="practice-button-group">{toolbarRight}</div> : null}
        </div>
      </div>
    );
  },
);
