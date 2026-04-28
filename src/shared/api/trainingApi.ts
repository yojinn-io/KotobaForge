export type CheckVocabularyAnswerPayload = {
  questionId: string;
  expectedAnswer: string;
  imageDataUrl: string | null;
};

export type CheckVocabularyAnswerResult = {
  status: 'ready' | 'pending-image';
  feedback: string;
};

export type ExportHandwritingImagePayload = {
  questionId: string;
  imageDataUrl: string;
};

export type ExportHandwritingImageResult = {
  imageDataUrl: string;
  stored: boolean;
};

export type VocabularyHistoryResult = {
  questionId: string;
  entries: Array<{
    label: string;
    value: string;
  }>;
};

export async function checkVocabularyAnswer(
  payload: CheckVocabularyAnswerPayload,
): Promise<CheckVocabularyAnswerResult> {
  if (!payload.imageDataUrl) {
    return {
      status: 'pending-image',
      feedback: '手書き画像を取得できませんでした。もう一度書いてから Check してください。',
    };
  }

  return {
    status: 'ready',
    feedback: `画像は取得済みです。外部判定 API 接続後に「${payload.expectedAnswer}」との照合結果をここへ表示します。`,
  };
}

export async function exportHandwritingImage(
  payload: ExportHandwritingImagePayload,
): Promise<ExportHandwritingImageResult> {
  return {
    imageDataUrl: payload.imageDataUrl,
    stored: false,
  };
}

export async function fetchVocabularyHistory(
  questionId: string,
): Promise<VocabularyHistoryResult> {
  return {
    questionId,
    entries: [],
  };
}
