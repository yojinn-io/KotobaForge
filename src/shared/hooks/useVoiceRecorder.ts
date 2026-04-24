import { useCallback, useEffect, useRef, useState } from 'react';
import { canUseVoiceRecording } from '../lib/audio';

export type VoiceRecorderStatus = 'idle' | 'recording' | 'ready' | 'error';

export function useVoiceRecorder() {
  const isSupported = canUseVoiceRecording();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [status, setStatus] = useState<VoiceRecorderStatus>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clear = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl(null);
    setError(null);
    setStatus('idle');
  }, [audioUrl]);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const start = useCallback(async () => {
    if (!isSupported) {
      setStatus('error');
      setError('Voice recording is not supported in this browser.');
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      clear();

      streamRef.current = stream;
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const nextUrl = URL.createObjectURL(blob);
        setAudioUrl(nextUrl);
        setStatus('ready');
        stopStream();
      };

      recorder.onerror = () => {
        setStatus('error');
        setError('Recording failed.');
        stopStream();
      };

      recorder.start();
      setStatus('recording');
      return true;
    } catch (nextError) {
      setStatus('error');
      setError(nextError instanceof Error ? nextError.message : 'Recording permission failed.');
      stopStream();
      return false;
    }
  }, [clear, isSupported, stopStream]);

  const stop = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      mediaRecorderRef.current?.stop();
      stopStream();
    };
  }, [audioUrl, stopStream]);

  return {
    isSupported,
    status,
    audioUrl,
    error,
    start,
    stop,
    clear,
  };
}
