import { useCallback, useEffect, useRef, useState } from 'react';
import { canUseSpeechSynthesis, createJapaneseUtterance } from '../lib/audio';

type SpeakOptions = {
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
};

export function useSpeechPlayback() {
  const isSupported = canUseSpeechSynthesis();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    if (!isSupported) {
      return;
    }

    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
  }, [isSupported]);

  const speak = useCallback(
    (text: string, options?: SpeakOptions) => {
      if (!isSupported) {
        return false;
      }

      stop();

      const utterance = createJapaneseUtterance(text, options?.rate ?? 1);

      if (!utterance) {
        return false;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        options?.onStart?.();
      };

      utterance.onend = () => {
        setIsPlaying(false);
        options?.onEnd?.();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        options?.onError?.();
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    },
    [isSupported, stop],
  );

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return {
    isSupported,
    isPlaying,
    speak,
    stop,
  };
}
