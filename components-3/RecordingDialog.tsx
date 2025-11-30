import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  RotateCcw, 
  Upload,
  Loader2,
  Copy,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAudioRecorder } from '../lib/useAudioRecorder';
import { transcribeAudio, summarizeTranscript, mockTranscribeAudio, mockSummarizeTranscript } from '../lib/openai';
import { toast } from 'sonner@2.0.3';
import { Alert, AlertDescription } from './ui/alert';

interface RecordingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecordingDialog({ open, onOpenChange }: RecordingDialogProps) {
  const {
    isRecording,
    isPaused,
    duration,
    audioUrl,
    audioBlob,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
    getAmplitude,
  } = useAudioRecorder();

  const [countdown, setCountdown] = useState(0);
  const [amplitude, setAmplitude] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [micPermission, setMicPermission] = useState<'prompt' | 'granted' | 'denied' | 'unknown'>('unknown');
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const amplitudeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check microphone permission on mount
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setMicPermission(result.state as any);
        
        result.addEventListener('change', () => {
          setMicPermission(result.state as any);
        });
      } catch (error) {
        // Permissions API not supported in all browsers
        setMicPermission('prompt');
      }
    };

    if (open) {
      checkPermission();
    }
  }, [open]);

  // Monitor amplitude during recording
  useEffect(() => {
    if (isRecording && !isPaused) {
      amplitudeIntervalRef.current = setInterval(() => {
        const amp = getAmplitude();
        setAmplitude(amp);
      }, 100);
    } else {
      if (amplitudeIntervalRef.current) {
        clearInterval(amplitudeIntervalRef.current);
      }
      setAmplitude(0);
    }

    return () => {
      if (amplitudeIntervalRef.current) {
        clearInterval(amplitudeIntervalRef.current);
      }
    };
  }, [isRecording, isPaused, getAmplitude]);

  // Audio playback listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const handleStartRecording = async () => {
    // Countdown
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    try {
      const success = await startRecording();
      if (!success) {
        toast.error('Failed to start recording. Please check your microphone.');
      }
    } catch (error: any) {
      // Handle specific error types
      if (error.message === 'PERMISSION_DENIED') {
        toast.error(
          'Microphone access denied. Please allow microphone permissions in your browser settings and try again.',
          { duration: 6000 }
        );
      } else if (error.message === 'NO_MICROPHONE') {
        toast.error(
          'No microphone detected. Please connect a microphone and try again.',
          { duration: 5000 }
        );
      } else if (error.message === 'MICROPHONE_IN_USE') {
        toast.error(
          'Microphone is already in use by another application. Please close other apps using the microphone.',
          { duration: 5000 }
        );
      } else {
        toast.error(
          'Failed to start recording. Please check your microphone and browser permissions.',
          { duration: 5000 }
        );
      }
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleRedo = () => {
    resetRecording();
    setShowResults(false);
    setTranscript('');
    setNotes('');
    setUploadedFile(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/aac', 'audio/webm'];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|m4a|aac|webm)$/i)) {
        toast.error('Please upload a valid audio file (MP3, WAV, M4A, AAC)');
        return;
      }
      setUploadedFile(file);
      toast.success('File uploaded successfully!');
    }
  };

  const handleSubmit = async () => {
    const fileToProcess = uploadedFile || audioBlob;
    if (!fileToProcess) {
      toast.error('No audio to process');
      return;
    }

    setIsProcessing(true);
    setShowResults(true);

    try {
      // Use mock functions for demo (replace with real API calls when you have an API key)
      const USE_MOCK = false; // Set to false when you have a real API key

      let transcriptText: string;
      let notesText: string;

      if (USE_MOCK) {
        toast.info('Using demo mode. Add your OpenAI API key for real transcription.');
        transcriptText = await mockTranscribeAudio();
        notesText = await mockSummarizeTranscript();
      } else {
        // Real API calls
        const filename = uploadedFile ? uploadedFile.name : `recording_${Date.now()}.webm`;
        transcriptText = await transcribeAudio(fileToProcess, filename);
        notesText = await summarizeTranscript(transcriptText);
      }

      setTranscript(transcriptText);
      setNotes(notesText);
      toast.success('Audio processed successfully!');
    } catch (error) {
      toast.error('Failed to process audio. Please try again.');
      console.error('Processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    if (isRecording) {
      stopRecording();
    }
    handleRedo();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record & Transcribe Lecture</DialogTitle>
          <DialogDescription>
            Record a lecture or upload an audio file to transcribe and generate study notes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Recording Area */}
          {!showResults && (
            <div className="space-y-6">
              {/* Visual Indicator */}
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  className="relative"
                  animate={{
                    scale: isRecording && !isPaused ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isRecording && !isPaused ? Infinity : 0,
                  }}
                >
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                    isRecording 
                      ? 'bg-gradient-to-br from-red-500 to-pink-500' 
                      : 'bg-gradient-to-br from-purple-500 to-blue-500'
                  }`}>
                    <Mic className="w-16 h-16 text-white" />
                  </div>

                  {isRecording && !isPaused && (
                    <motion.div
                      className="absolute inset-0 bg-red-500 rounded-full -z-10"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Countdown */}
                <AnimatePresence>
                  {countdown > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="text-6xl mt-4"
                    >
                      {countdown}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Status */}
                <div className="mt-6 text-center">
                  {isRecording && (
                    <>
                      <p className="text-lg mb-2">
                        {isPaused ? 'Paused' : 'Recording...'}
                      </p>
                      <p className="text-3xl font-mono mb-4">{formatDuration(duration)}</p>

                      {/* Amplitude Bars */}
                      {!isPaused && (
                        <div className="flex items-center justify-center gap-1 h-12">
                          {[...Array(8)].map((_, i) => {
                            const height = Math.max(8, amplitude * 48 * (i % 2 === 0 ? 1 : 0.7));
                            return (
                              <motion.div
                                key={i}
                                className="w-2 bg-gradient-to-t from-red-500 to-pink-500 rounded-full"
                                animate={{ height: `${height}px` }}
                                transition={{ duration: 0.1 }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}

                  {audioUrl && !isRecording && (
                    <>
                      <p className="text-lg mb-4">Recording Complete</p>
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-slate-600">
                          Duration: {formatDuration(duration)}
                        </span>
                      </div>
                    </>
                  )}

                  {uploadedFile && (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-slate-600">
                        File: {uploadedFile.name}
                      </span>
                    </div>
                  )}

                  {!isRecording && !audioUrl && !uploadedFile && countdown === 0 && (
                    <p className="text-slate-600">
                      Ready to record or upload an audio file
                    </p>
                  )}
                </div>
              </div>

              {/* Hidden Audio Element */}
              {audioUrl && <audio ref={audioRef} src={audioUrl} />}

              {/* Controls */}
              <div className="flex flex-col gap-3">
                {!isRecording && !audioUrl && !uploadedFile && (
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleStartRecording}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                      size="lg"
                      disabled={countdown > 0}
                    >
                      <Mic className="mr-2 w-5 h-5" />
                      Start Recording
                    </Button>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      <Upload className="mr-2 w-5 h-5" />
                      Upload Audio
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*,.mp3,.wav,.m4a,.aac"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                )}

                {isRecording && (
                  <div className="flex gap-3">
                    <Button
                      onClick={isPaused ? resumeRecording : pauseRecording}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      {isPaused ? (
                        <>
                          <Play className="mr-2 w-5 h-5" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Pause className="mr-2 w-5 h-5" />
                          Pause
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={stopRecording}
                      variant="destructive"
                      size="lg"
                    >
                      <Square className="mr-2 w-5 h-5" />
                      Stop
                    </Button>
                  </div>
                )}

                {(audioUrl || uploadedFile) && !isRecording && (
                  <div className="flex gap-3">
                    {audioUrl && (
                      <Button
                        onClick={handlePlayPause}
                        variant="outline"
                        size="lg"
                        className="flex-1"
                      >
                        {isPlaying ? (
                          <>
                            <Square className="mr-2 w-5 h-5" />
                            Stop
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 w-5 h-5" />
                            Play
                          </>
                        )}
                      </Button>
                    )}
                    <Button
                      onClick={handleRedo}
                      variant="outline"
                      size="lg"
                    >
                      <RotateCcw className="mr-2 w-5 h-5" />
                      Redo
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Submit & Transcribe'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="space-y-4">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
                  <p className="text-lg">Processing audio...</p>
                  <p className="text-sm text-slate-600">Transcribing and generating notes</p>
                </div>
              ) : (
                <>
                  {/* Transcript */}
                  {transcript && (
                    <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg text-slate-900">Transcript</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(transcript, 'Transcript')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {transcript}
                      </p>
                    </div>
                  )}

                  {/* Notes */}
                  {notes && (
                    <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg text-slate-900">Study Notes</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(notes, 'Notes')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {notes}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleRedo}
                      variant="outline"
                      className="flex-1"
                    >
                      Record Another
                    </Button>
                    <Button
                      onClick={handleClose}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      Done
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}