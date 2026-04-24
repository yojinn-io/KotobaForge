export type HandPoint = {
  x: number;
  y: number;
};

export type HandStroke = HandPoint[];

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
  if (stroke.length === 0) {
    return;
  }

  if (stroke.length === 1) {
    context.beginPath();
    context.arc(stroke[0].x, stroke[0].y, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();
    return;
  }

  context.beginPath();
  context.moveTo(stroke[0].x, stroke[0].y);

  for (let index = 1; index < stroke.length; index += 1) {
    context.lineTo(stroke[index].x, stroke[index].y);
  }

  context.stroke();
}

export function redrawHandwriting(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  strokes: HandStroke[],
  activeStroke: HandStroke = [],
) {
  const ratio = window.devicePixelRatio || 1;
  context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
  strokes.forEach((stroke) => drawHandStroke(context, stroke));

  if (activeStroke.length > 0) {
    drawHandStroke(context, activeStroke);
  }
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
