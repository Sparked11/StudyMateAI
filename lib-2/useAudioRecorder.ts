import { useState, useRef, useCallback, useEffect } from 'react';

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioUrl: string | null;
  audioBlob: Blob | null;
}

export function useAudioRecorder() {
  const [state, setState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    audioUrl: null,
    audioBlob: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Get audio amplitude for visualization
  const getAmplitude = useCallback((): number => {
    if (!analyserRef.current) return 0;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteTimeDomainData(dataArray);
    
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = (dataArray[i] - 128) / 128;
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / dataArray.length);
    return rms;
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Setup audio analysis
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setState((prev) => ({
          ...prev,
          audioUrl: url,
          audioBlob: blob,
          isRecording: false,
          isPaused: false,
        }));
      };

      mediaRecorder.start();

      // Start duration timer
      timerRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          duration: prev.duration + 1,
        }));
      }, 1000);

      setState((prev) => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        duration: 0,
        audioUrl: null,
        audioBlob: null,
      }));

      return true;
    } catch (error: any) {
      console.error('Error starting recording:', error);
      
      // Provide specific error messages based on error type
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        // User denied permission or permission was blocked
        throw new Error('PERMISSION_DENIED');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        // No microphone found
        throw new Error('NO_MICROPHONE');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        // Microphone is already in use
        throw new Error('MICROPHONE_IN_USE');
      } else {
        // Other errors
        throw new Error('UNKNOWN_ERROR');
      }
    }
  }, []);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording && !state.isPaused) {
      mediaRecorderRef.current.pause();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setState((prev) => ({ ...prev, isPaused: true }));
    }
  }, [state.isRecording, state.isPaused]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording && state.isPaused) {
      mediaRecorderRef.current.resume();
      timerRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          duration: prev.duration + 1,
        }));
      }, 1000);
      setState((prev) => ({ ...prev, isPaused: false }));
    }
  }, [state.isRecording, state.isPaused]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  }, [state.isRecording]);

  const resetRecording = useCallback(() => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }
    setState({
      isRecording: false,
      isPaused: false,
      duration: 0,
      audioUrl: null,
      audioBlob: null,
    });
  }, [state.audioUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (state.audioUrl) {
        URL.revokeObjectURL(state.audioUrl);
      }
    };
  }, []);

  return {
    ...state,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
    getAmplitude,
  };
}