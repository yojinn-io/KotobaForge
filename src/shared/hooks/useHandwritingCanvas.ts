import { useCallback, useEffect, useRef, useState } from 'react';
import type { DrawingMode, HandPoint, HandStroke } from '../lib/handwriting';
import {
  exportHandwritingDataUrl,
  redrawHandwriting,
  setupHandwritingContext,
} from '../lib/handwriting';

export type HandwritingCanvasState = {
  strokeCount: number;
  hasStrokes: boolean;
};

type UseHandwritingCanvasOptions = {
  onStateChange?: (state: HandwritingCanvasState) => void;
};

function getCanvasPoint(event: PointerEvent, canvas: HTMLCanvasElement): HandPoint {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export function useHandwritingCanvas({ onStateChange }: UseHandwritingCanvasOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const strokesRef = useRef<HandStroke[]>([]);
  const currentStrokeRef = useRef<HandStroke>({ points: [], mode: 'pen' });
  const pointerIdRef = useRef<number | null>(null);
  const onStateChangeRef = useRef(onStateChange);
  const [strokeCount, setStrokeCount] = useState(0);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>('pen');

  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!canvas || !context) {
      return;
    }

    redrawHandwriting(canvas, context, strokesRef.current, currentStrokeRef.current);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!canvas || !context) {
      return;
    }

    setupHandwritingContext(canvas, context);
    redraw();
  }, [redraw]);

  const clear = useCallback(() => {
    strokesRef.current = [];
    currentStrokeRef.current = { points: [], mode: 'pen' };
    setStrokeCount(0);
    setDrawingMode('pen');
    redraw();
  }, [redraw]);

  const undo = useCallback(() => {
    currentStrokeRef.current = { points: [], mode: drawingMode };
    strokesRef.current.pop();
    setStrokeCount(strokesRef.current.length);
    redraw();
  }, [drawingMode, redraw]);

  const toggleDrawingMode = useCallback(() => {
    setDrawingMode((mode) => (mode === 'pen' ? 'eraser' : 'pen'));
  }, []);

  const resetDrawingMode = useCallback(() => {
    setDrawingMode('pen');
  }, []);

  const getPngDataUrl = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas ? exportHandwritingDataUrl(canvas) : null;
  }, []);

  const downloadPng = useCallback(
    (fileName = 'kotobaforge-handwriting.png') => {
      const dataUrl = getPngDataUrl();

      if (!dataUrl) {
        return null;
      }

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = fileName;
      link.click();

      return dataUrl;
    },
    [getPngDataUrl],
  );

  useEffect(() => {
    onStateChangeRef.current?.({
      strokeCount,
      hasStrokes: strokeCount > 0,
    });
  }, [strokeCount]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    contextRef.current = context;
    resizeCanvas();

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) {
        return;
      }

      event.preventDefault();
      pointerIdRef.current = event.pointerId;
      canvas.setPointerCapture(event.pointerId);
      currentStrokeRef.current = {
        points: [getCanvasPoint(event, canvas)],
        mode: drawingMode,
      };
      redraw();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) {
        return;
      }

      event.preventDefault();
      currentStrokeRef.current.points.push(getCanvasPoint(event, canvas));
      redraw();
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) {
        return;
      }

      event.preventDefault();
      pointerIdRef.current = null;

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }

      if (currentStrokeRef.current.points.length > 0) {
        strokesRef.current.push({
          mode: currentStrokeRef.current.mode,
          points: [...currentStrokeRef.current.points],
        });
        currentStrokeRef.current = { points: [], mode: drawingMode };
        setStrokeCount(strokesRef.current.length);
      }

      redraw();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerEnd);
    canvas.addEventListener('pointercancel', onPointerEnd);

    const resizeTarget = canvas.parentElement ?? canvas;
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => resizeCanvas())
        : null;

    observer?.observe(resizeTarget);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerEnd);
      canvas.removeEventListener('pointercancel', onPointerEnd);
      observer?.disconnect();
    };
  }, [drawingMode, redraw, resizeCanvas]);

  return {
    canvasRef,
    clear,
    undo,
    drawingMode,
    setDrawingMode,
    toggleDrawingMode,
    resetDrawingMode,
    resizeCanvas,
    getPngDataUrl,
    downloadPng,
    strokeCount,
    hasStrokes: strokeCount > 0,
  };
}
