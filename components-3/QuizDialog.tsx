import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Clock,
  Flag,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Upload,
  Play,
  AlertCircle,
  Award,
  TrendingUp,
} from 'lucide-react';
import {
  QuizSettings,
  QuizQuestion,
  generateQuizQuestions,
  gradeShortAnswer,
  generatePracticeSuggestions,
  mockGenerateQuizQuestions,
} from '../lib/openai';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface QuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type QuizPhase = 'setup' | 'quiz' | 'results';

export function QuizDialog({ open, onOpenChange }: QuizDialogProps) {
  // Settings
  const [numQuestions, setNumQuestions] = useState(5);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(10);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [questionType, setQuestionType] = useState<'Multiple Choice' | 'Short Answer'>('Multiple Choice');
  const [stimulus, setStimulus] = useState('');

  // Quiz state
  const [phase, setPhase] = useState<QuizPhase>('setup');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [gradedResults, setGradedResults] = useState<Record<number, boolean>>({});
  const [practiceSuggestions, setPracticeSuggestions] = useState<string[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Timer effect
  useEffect(() => {
    if (phase === 'quiz' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitQuiz(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [phase, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setStimulus(text);
        toast.success('File uploaded successfully!');
      };
      reader.readAsText(file);
    }
  };

  const handleStartQuiz = async () => {
    if (!stimulus.trim()) {
      toast.error('Please enter or upload stimulus text');
      return;
    }

    setIsGenerating(true);

    try {
      const USE_MOCK = false; // Set to false when you have a real API key

      const settings: QuizSettings = {
        numQuestions,
        difficulty,
        questionType,
        stimulus,
      };

      let generatedQuestions: QuizQuestion[];

      if (USE_MOCK) {
        toast.info('Using demo mode. Add your OpenAI API key for real quiz generation.');
        generatedQuestions = await mockGenerateQuizQuestions(settings);
      } else {
        generatedQuestions = await generateQuizQuestions(settings);
      }

      if (generatedQuestions.length === 0) {
        toast.error('Failed to generate questions');
        return;
      }

      // Shuffle options for multiple choice
      if (questionType === 'Multiple Choice') {
        generatedQuestions = generatedQuestions.map((q) => {
          if (q.options) {
            const options = [...q.options];
            // Ensure answer is in options
            if (!options.includes(q.answer)) {
              options.push(q.answer);
            }
            // Shuffle
            for (let i = options.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [options[i], options[j]] = [options[j], options[i]];
            }
            return { ...q, options };
          }
          return q;
        });
      }

      setQuestions(generatedQuestions);
      setTimeRemaining(timeLimitMinutes * 60);
      setCurrentIndex(0);
      setAnswers({});
      setMarkedForReview(new Set());
      setPhase('quiz');
      toast.success('Quiz started! Good luck!');
    } catch (error) {
      toast.error('Failed to generate quiz. Please try again.');
      console.error('Quiz generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitQuiz = async (autoSubmit = false) => {
    if (!autoSubmit) {
      // Show confirmation if there are marked questions
      if (markedForReview.size > 0) {
        const confirmed = window.confirm(
          `You have ${markedForReview.size} question(s) marked for review. Do you want to submit anyway?`
        );
        if (!confirmed) return;
      }
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsGrading(true);

    try {
      const results: Record<number, boolean> = {};

      // Grade multiple choice immediately
      if (questionType === 'Multiple Choice') {
        questions.forEach((q, i) => {
          results[i] = answers[i] === q.answer;
        });
      } else {
        // Grade short answers using AI
        const USE_MOCK = false; // Set to false for real grading

        for (let i = 0; i < questions.length; i++) {
          const q = questions[i];
          const userAnswer = answers[i] || '';
          
          if (USE_MOCK) {
            // Simple mock grading
            results[i] = userAnswer.toLowerCase().includes(q.answer.toLowerCase().split(' ')[0]);
            await new Promise((resolve) => setTimeout(resolve, 200));
          } else {
            results[i] = await gradeShortAnswer(q.question, q.answer, userAnswer);
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
        }
      }

      setGradedResults(results);

      // Generate practice suggestions for incorrect answers
      const incorrectQuestions = questions
        .map((q, i) => ({ question: q.question, answer: q.answer, index: i }))
        .filter((_, i) => !results[i]);

      if (incorrectQuestions.length > 0) {
        try {
          const USE_MOCK = false;
          let suggestions: string[];

          if (USE_MOCK) {
            suggestions = [
              'Review the fundamental concepts covered in the stimulus material',
              'Practice with similar quiz questions to reinforce understanding',
              'Create flashcards for key terms and definitions',
              'Study the areas where you made mistakes more thoroughly',
            ];
          } else {
            suggestions = await generatePracticeSuggestions(incorrectQuestions);
          }

          setPracticeSuggestions(suggestions);
        } catch (error) {
          console.error('Failed to generate suggestions:', error);
        }
      }

      setPhase('results');
      toast.success('Quiz submitted!');
    } catch (error) {
      toast.error('Failed to grade quiz');
      console.error('Grading error:', error);
    } finally {
      setIsGrading(false);
    }
  };

  const handleReset = () => {
    setPhase('setup');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setMarkedForReview(new Set());
    setGradedResults({});
    setPracticeSuggestions([]);
    setStimulus('');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setAnswers({});
    setMarkedForReview(new Set());
    setGradedResults({});
    setPracticeSuggestions([]);
    setTimeRemaining(timeLimitMinutes * 60);
    setPhase('quiz');
  };

  const calculateScore = () => {
    const correct = Object.values(gradedResults).filter((r) => r).length;
    return { correct, total: questions.length };
  };

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Smart Quiz Maker
          </DialogTitle>
          <DialogDescription>
            Create and take quizzes based on your study material.
          </DialogDescription>
        </DialogHeader>

        {/* Setup Phase */}
        {phase === 'setup' && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="stimulus">Study Material / Stimulus Text</Label>
              <Textarea
                id="stimulus"
                placeholder="Paste your study material, lecture notes, or text to generate quiz from..."
                value={stimulus}
                onChange={(e) => setStimulus(e.target.value)}
                rows={6}
                className="mt-2"
              />
              <div className="mt-2 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 w-4 h-4" />
                  Upload File
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStimulus('')}
                >
                  Clear
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numQuestions">Number of Questions</Label>
                <Input
                  id="numQuestions"
                  type="number"
                  min={1}
                  max={20}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(parseInt(e.target.value) || 5)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                <Input
                  id="timeLimit"
                  type="number"
                  min={1}
                  max={60}
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(parseInt(e.target.value) || 10)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="questionType">Question Type</Label>
                <Select value={questionType} onValueChange={(v: any) => setQuestionType(v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                    <SelectItem value="Short Answer">Short Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleStartQuiz}
              disabled={isGenerating || !stimulus.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                <>
                  <Play className="mr-2 w-5 h-5" />
                  Start Quiz
                </>
              )}
            </Button>

            <p className="text-xs text-center text-slate-500">
              Demo mode enabled. Add your OpenAI API key for real quiz generation.
            </p>
          </div>
        )}

        {/* Quiz Phase */}
        {phase === 'quiz' && !isGrading && currentQuestion && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-slate-600">
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </div>
              <div className="ml-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 ${timeRemaining < 60 ? 'text-red-600' : 'text-slate-600'}`} />
                  <span className={`font-mono ${timeRemaining < 60 ? 'text-red-600' : 'text-slate-900'}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newMarked = new Set(markedForReview);
                    if (newMarked.has(currentIndex)) {
                      newMarked.delete(currentIndex);
                    } else {
                      newMarked.add(currentIndex);
                    }
                    setMarkedForReview(newMarked);
                  }}
                >
                  <Flag
                    className={`w-4 h-4 ${
                      markedForReview.has(currentIndex) ? 'fill-yellow-500 text-yellow-500' : ''
                    }`}
                  />
                </Button>
              </div>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-200">
              <Badge variant="outline" className="mb-3">
                Q{currentIndex + 1}
              </Badge>
              <h3 className="text-xl text-slate-900">{currentQuestion.question}</h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {questionType === 'Multiple Choice' && currentQuestion.options ? (
                currentQuestion.options.map((option, idx) => {
                  const isSelected = answers[currentIndex] === option;
                  return (
                    <motion.button
                      key={idx}
                      onClick={() => setAnswers({ ...answers, [currentIndex]: option })}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-slate-200 hover:border-purple-300'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-purple-600 bg-purple-600' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-slate-900">{option}</span>
                      </div>
                    </motion.button>
                  );
                })
              ) : (
                <Textarea
                  placeholder="Type your short answer here..."
                  value={answers[currentIndex] || ''}
                  onChange={(e) => setAnswers({ ...answers, [currentIndex]: e.target.value })}
                  rows={4}
                  className="w-full"
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="mr-2 w-4 h-4" />
                Previous
              </Button>

              {markedForReview.size > 0 && (
                <Badge variant="secondary" className="gap-2">
                  <Flag className="w-3 h-3" />
                  {markedForReview.size} marked
                </Badge>
              )}

              <div className="flex gap-2">
                {currentIndex < questions.length - 1 ? (
                  <Button
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  >
                    Next
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubmitQuiz(false)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Grading Phase */}
        {isGrading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
            <p className="text-lg">Grading your answers...</p>
            <p className="text-sm text-slate-600">This may take a moment</p>
          </div>
        )}

        {/* Results Phase */}
        {phase === 'results' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl">Quiz Results</h3>
                <Award className="w-8 h-8 text-yellow-600" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Score</p>
                  <p className="text-3xl">
                    {calculateScore().correct} / {calculateScore().total}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Accuracy</p>
                  <p className="text-3xl">
                    {calculateScore().total > 0
                      ? Math.round((calculateScore().correct / calculateScore().total) * 100)
                      : 0}
                    %
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Time Taken</p>
                  <p className="text-3xl">
                    {formatTime(timeLimitMinutes * 60 - timeRemaining)}
                  </p>
                </div>
              </div>
            </div>

            {/* Question Review */}
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Question Review
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {questions.map((q, i) => {
                  const isCorrect = gradedResults[i];
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border-2 ${
                        isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm mb-1">
                            <strong>Q{i + 1}:</strong> {q.question}
                          </p>
                          {!isCorrect && (
                            <p className="text-xs text-slate-600">
                              <strong>Correct answer:</strong> {q.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Practice Suggestions */}
            {practiceSuggestions.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <h4 className="mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Practice Suggestions
                </h4>
                <ul className="space-y-2">
                  {practiceSuggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleRetake} variant="outline" className="flex-1">
                Retake Quiz
              </Button>
              <Button onClick={handleReset} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                Create New Quiz
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}