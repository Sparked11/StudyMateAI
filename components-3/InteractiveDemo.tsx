import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Mic, 
  Square, 
  FileText, 
  Zap, 
  Brain, 
  Play,
  Check,
  X,
  ChevronRight,
  Star,
  ChevronLeft,
  Highlighter,
  Gamepad2
} from 'lucide-react';
import { RecordingDialog } from './RecordingDialog';
import { SummaryDialog } from './SummaryDialog';
import { FlashcardDialog } from './FlashcardDialog';
import { QuizDialog } from './QuizDialog';
import { HighlightDialog } from './HighlightDialog';
import { GamifiedDialog } from './GamifiedDialog';
import { motion, AnimatePresence } from 'motion/react';
import { canPreviewFeature, recordPreviewUsage, getPreviewLimitMessage } from '../lib/previewLimits';
import { toast } from 'sonner@2.0.3';

export function InteractiveDemo() {
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [showFlashcard, setShowFlashcard] = useState(true);
  const [recordingDialogOpen, setRecordingDialogOpen] = useState(false);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [flashcardDialogOpen, setFlashcardDialogOpen] = useState(false);
  const [quizDialogOpen, setQuizDialogOpen] = useState(false);
  const [highlightDialogOpen, setHighlightDialogOpen] = useState(false);
  const [gamifiedDialogOpen, setGamifiedDialogOpen] = useState(false);

  const flashcardSamples = [
    {
      question: 'What is the powerhouse of the cell?',
      answer: 'Mitochondria - They generate most of the cell\'s supply of ATP, used as a source of chemical energy.'
    },
    {
      question: 'What is photosynthesis?',
      answer: 'The process by which green plants use sunlight to synthesize foods from CO2 and water, releasing oxygen as a byproduct.'
    },
    {
      question: 'What are the stages of mitosis?',
      answer: 'Prophase, Metaphase, Anaphase, and Telophase (PMAT). During these stages, the cell divides into two identical daughter cells.'
    }
  ];

  const currentFlashcard = flashcardSamples[currentFlashcardIndex];

  const handleOpenPreview = (featureName: string, setDialogOpen: (open: boolean) => void) => {
    if (canPreviewFeature(featureName)) {
      recordPreviewUsage(featureName);
      setDialogOpen(true);
      toast.success(getPreviewLimitMessage(featureName));
    } else {
      toast.error(getPreviewLimitMessage(featureName), {
        duration: 4000,
        action: {
          label: 'Download App',
          onClick: () => {
            document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  };

  const handleNextFlashcard = () => {
    if (currentFlashcardIndex < flashcardSamples.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setShowFlashcard(true);
    }
  };

  const handlePreviousFlashcard = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
      setShowFlashcard(true);
    }
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (recording) {
      interval = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordTime(0);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">
            Interactive Demo
          </Badge>
          <h2 className="text-4xl lg:text-5xl text-slate-900 mb-4">
            Experience StudyMate.AI in Action
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Try out our core features with interactive demos
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="record" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="record">
                <Mic className="w-4 h-4 mr-2" />
                Record
              </TabsTrigger>
              <TabsTrigger value="summary">
                <FileText className="w-4 h-4 mr-2" />
                Summary
              </TabsTrigger>
              <TabsTrigger value="flashcard">
                <Zap className="w-4 h-4 mr-2" />
                Flashcard
              </TabsTrigger>
              <TabsTrigger value="quiz">
                <Brain className="w-4 h-4 mr-2" />
                Quiz
              </TabsTrigger>
              <TabsTrigger value="highlight">
                <Highlighter className="w-4 h-4 mr-2" />
                Highlight
              </TabsTrigger>
              <TabsTrigger value="gamified">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Gamified
              </TabsTrigger>
            </TabsList>

            <TabsContent value="record" className="space-y-4">
              <Card className="p-8 border-2">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                    <Mic className="w-12 h-12 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl text-slate-900 mb-2">
                      Record & Transcribe Your Lectures
                    </h3>
                    <p className="text-slate-600">
                      Try our AI-powered recording and transcription feature with real OpenAI integration
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                      <h4 className="text-sm mb-2 text-slate-900">What you'll get:</h4>
                      <ul className="text-sm text-slate-700 space-y-1 text-left max-w-md mx-auto">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Audio recording with live amplitude visualization</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>AI transcription using OpenAI Whisper</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Automatic study notes generation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>File upload support (MP3, WAV, M4A)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Button 
                    size="lg"
                    onClick={() => handleOpenPreview('record', setRecordingDialogOpen)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Mic className="mr-2 w-4 h-4" />
                    Try Recording Feature
                  </Button>

                  <p className="text-xs text-slate-500">
                    Limited preview available. Download the app for unlimited access.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <Card className="p-8 border-2">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl text-slate-900 mb-2">
                      AI Smart Summaries
                    </h3>
                    <p className="text-slate-600">
                      Transform lengthy notes into concise summaries with AI
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                      <h4 className="text-sm mb-2 text-slate-900">Features:</h4>
                      <ul className="text-sm text-slate-700 space-y-1 text-left max-w-md mx-auto">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Extract key points automatically</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Condense long texts by up to 87%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Preserve important information</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Button 
                    size="lg"
                    onClick={() => handleOpenPreview('summary', setSummaryDialogOpen)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <FileText className="mr-2 w-4 h-4" />
                    Try Summary Feature
                  </Button>

                  <p className="text-xs text-slate-500">
                    Limited preview available. Download the app for unlimited access.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="flashcard" className="space-y-4">
              <Card className="p-8 border-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge>Card {currentFlashcardIndex + 1} of {flashcardSamples.length}</Badge>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-slate-600">Favorite</span>
                    </div>
                  </div>

                  <div 
                    className="relative h-80 cursor-pointer"
                    onClick={() => setShowFlashcard(!showFlashcard)}
                    style={{ perspective: '1000px' }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {showFlashcard ? (
                        <motion.div
                          key="question"
                          initial={{ rotateY: 90, opacity: 0 }}
                          animate={{ rotateY: 0, opacity: 1 }}
                          exit={{ rotateY: -90, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center p-8 text-center shadow-2xl">
                            <div>
                              <p className="text-sm text-white/80 mb-4">Question</p>
                              <h3 className="text-3xl text-white">
                                {currentFlashcard.question}
                              </h3>
                              <p className="text-sm text-white/60 mt-6">Click to reveal answer</p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="answer"
                          initial={{ rotateY: 90, opacity: 0 }}
                          animate={{ rotateY: 0, opacity: 1 }}
                          exit={{ rotateY: -90, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center p-8 text-center shadow-2xl">
                            <div>
                              <p className="text-sm text-white/80 mb-4">Answer</p>
                              <p className="text-2xl text-white leading-relaxed">
                                {currentFlashcard.answer}
                              </p>
                              <p className="text-sm text-white/60 mt-6">Click to see question</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline"
                      onClick={handlePreviousFlashcard}
                      disabled={currentFlashcardIndex === 0}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <p className="text-sm text-slate-600">Click card to flip</p>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-blue-600"
                      onClick={handleNextFlashcard}
                      disabled={currentFlashcardIndex === flashcardSamples.length - 1}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>

                  <Progress value={((currentFlashcardIndex + 1) / flashcardSamples.length) * 100} className="h-2" />

                  <Button 
                    size="lg"
                    onClick={() => handleOpenPreview('flashcard', setFlashcardDialogOpen)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Zap className="mr-2 w-4 h-4" />
                    Try Full Flashcard Feature
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    Limited preview available. Download the app for unlimited access.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-4">
              <Card className="p-8 border-2">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl text-slate-900 mb-2">
                      AI-Powered Quiz Generator
                    </h3>
                    <p className="text-slate-600">
                      Generate custom quizzes from your study material with OpenAI integration
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                      <h4 className="text-sm mb-2 text-slate-900">Features:</h4>
                      <ul className="text-sm text-slate-700 space-y-1 text-left max-w-md mx-auto">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Generate questions from any text material</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Multiple choice or short answer format</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>AI-powered answer grading</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Personalized practice suggestions</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Timed quizzes with progress tracking</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Button 
                    size="lg"
                    onClick={() => handleOpenPreview('quiz', setQuizDialogOpen)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Brain className="mr-2 w-4 h-4" />
                    Try Quiz Generator
                  </Button>

                  <p className="text-xs text-slate-500">
                    Limited preview available. Download the app for unlimited access.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="highlight" className="space-y-4">
              <Card className="p-8 border-2">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Highlighter className="w-12 h-12 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl text-slate-900 mb-2">
                      Smart Highlights
                    </h3>
                    <p className="text-slate-600">
                      AI-powered keyword and definition detection
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                      <h4 className="text-sm mb-2 text-slate-900">Features:</h4>
                      <ul className="text-sm text-slate-700 space-y-1 text-left max-w-md mx-auto">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Automatically identify key terms</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Highlight definitions and explanations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Mark important concepts</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Button 
                    size="lg"
                    onClick={() => handleOpenPreview('highlight', setHighlightDialogOpen)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Highlighter className="mr-2 w-4 h-4" />
                    Try Highlight Feature
                  </Button>

                  <p className="text-xs text-slate-500">
                    Limited preview available. Download the app for unlimited access.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="gamified" className="space-y-4">
              <Card className="p-8 border-2">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <Gamepad2 className="w-12 h-12 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl text-slate-900 mb-2">
                      Gamified Learning
                    </h3>
                    <p className="text-slate-600">
                      Track your progress and earn achievements
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                      <h4 className="text-sm mb-2 text-slate-900">Features:</h4>
                      <ul className="text-sm text-slate-700 space-y-1 text-left max-w-md mx-auto">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Earn XP and level up</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Track study streaks</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Unlock achievements</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Button 
                    size="lg"
                    onClick={() => handleOpenPreview('gamified', setGamifiedDialogOpen)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Gamepad2 className="mr-2 w-4 h-4" />
                    Try Gamified Learning
                  </Button>

                  <p className="text-xs text-slate-500">
                    Limited preview available. Download the app for unlimited access.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Recording Dialog */}
      <RecordingDialog 
        open={recordingDialogOpen}
        onOpenChange={setRecordingDialogOpen}
      />

      {/* Summary Dialog */}
      <SummaryDialog 
        open={summaryDialogOpen}
        onOpenChange={setSummaryDialogOpen}
      />

      {/* Flashcard Dialog */}
      <FlashcardDialog 
        open={flashcardDialogOpen}
        onOpenChange={setFlashcardDialogOpen}
      />

      {/* Quiz Dialog */}
      <QuizDialog 
        open={quizDialogOpen}
        onOpenChange={setQuizDialogOpen}
      />

      {/* Highlight Dialog */}
      <HighlightDialog 
        open={highlightDialogOpen}
        onOpenChange={setHighlightDialogOpen}
      />

      {/* Gamified Dialog */}
      <GamifiedDialog 
        open={gamifiedDialogOpen}
        onOpenChange={setGamifiedDialogOpen}
      />
    </section>
  );
}