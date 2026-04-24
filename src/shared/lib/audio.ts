export function canUseSpeechSynthesis() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function canUseVoiceRecording() {
  return (
    typeof navigator !== 'undefined' &&
    typeof MediaRecorder !== 'undefined' &&
    Boolean(navigator.mediaDevices?.getUserMedia)
  );
}

export function getJapaneseVoice() {
  if (!canUseSpeechSynthesis()) {
    return null;
  }

  return (
    window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang?.toLowerCase().startsWith('ja')) ?? null
  );
}

export function createJapaneseUtterance(text: string, rate = 1) {
  if (!canUseSpeechSynthesis() || text.trim().length === 0) {
    return null;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = rate;
  utterance.pitch = 1;
  const voice = getJapaneseVoice();

  if (voice) {
    utterance.voice = voice;
  }

  return utterance;
}
