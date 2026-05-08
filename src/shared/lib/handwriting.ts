export type HandPoint = {
  x: number;
  y: number;
};

export type DrawingMode = 'pen' | 'eraser';

export type HandStroke = {
  points: HandPoint[];
  mode: DrawingMode;
};

type HandwritingStyle = {
  lineWidth?: number;
  strokeStyle?: string;
};

type HandwritingExportOptions = {
  background?: string;
};

export function setupHandwritingContext(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  { lineWidth = 4, strokeStyle = '#f6f7f8' }: HandwritingStyle = {},
) {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(Math.floor(rect.width * ratio), 1);
  const height = Math.max(Math.floor(rect.height * ratio), 1);

  canvas.width = width;
  canvas.height = height;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.scale(ratio, ratio);
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = lineWidth;
  context.strokeStyle = strokeStyle;
  context.fillStyle = strokeStyle;
  context.imageSmoothingEnabled = true;
}

export function drawHandStroke(
  context: CanvasRenderingContext2D,
  stroke: HandStroke,
) {
  if (stroke.points.length === 0) {
    return;
  }

  context.save();
  context.globalCompositeOperation =
    stroke.mode === 'eraser' ? 'destination-out' : 'source-over';
  context.lineWidth = stroke.mode === 'eraser' ? 22 : 4;

  if (stroke.points.length === 1) {
    context.beginPath();
    context.arc(
      stroke.points[0].x,
      stroke.points[0].y,
      context.lineWidth / 2,
      0,
      Math.PI * 2,
    );
    context.fill();
    context.restore();
    return;
  }

  context.beginPath();
  context.moveTo(stroke.points[0].x, stroke.points[0].y);

  for (let index = 1; index < stroke.points.length; index += 1) {
    context.lineTo(stroke.points[index].x, stroke.points[index].y);
  }

  context.stroke();
  context.restore();
}

export function redrawHandwriting(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  strokes: HandStroke[],
  activeStroke: HandStroke = { points: [], mode: 'pen' },
) {
  const ratio = window.devicePixelRatio || 1;
  context.globalCompositeOperation = 'source-over';
  context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
  strokes.forEach((stroke) => drawHandStroke(context, stroke));

  if (activeStroke.points.length > 0) {
    drawHandStroke(context, activeStroke);
  }

  context.globalCompositeOperation = 'source-over';
}

export function exportHandwritingDataUrl(
  canvas: HTMLCanvasElement,
  { background = '#11161d' }: HandwritingExportOptions = {},
) {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height;

  const exportContext = exportCanvas.getContext('2d');

  if (!exportContext) {
    return null;
  }

  exportContext.fillStyle = background;
  exportContext.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  exportContext.drawImage(canvas, 0, 0);

  return exportCanvas.toDataURL('image/png');
}
