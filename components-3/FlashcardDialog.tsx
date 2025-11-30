import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Zap, Star, ChevronLeft, ChevronRight, RotateCcw, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FlashcardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sampleFlashcards: Flashcard[] = [
  {
    id: 1,
    question: 'What is the powerhouse of the cell?',
    answer: 'Mitochondria - They generate most of the cell\'s supply of ATP, used as a source of chemical energy.',
    category: 'Biology'
  },
  {
    id: 2,
    question: 'What is photosynthesis?',
    answer: 'The process by which green plants use sunlight to synthesize foods (glucose) from CO2 and water, releasing oxygen as a byproduct.',
    category: 'Biology'
  },
  {
    id: 3,
    question: 'What are the stages of mitosis?',
    answer: 'Prophase, Metaphase, Anaphase, and Telophase (PMAT). During these stages, the cell divides into two identical daughter cells.',
    category: 'Biology'
  },
  {
    id: 4,
    question: 'What is DNA?',
    answer: 'Deoxyribonucleic acid - A molecule that carries genetic instructions for the development, functioning, growth, and reproduction of all known organisms.',
    category: 'Biology'
  },
  {
    id: 5,
    question: 'What is the difference between prokaryotic and eukaryotic cells?',
    answer: 'Prokaryotic cells lack a nucleus and membrane-bound organelles, while eukaryotic cells have both a nucleus and membrane-bound organelles.',
    category: 'Biology'
  }
];

export function FlashcardDialog({ open, onOpenChange }: FlashcardDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [mastered, setMastered] = useState<Set<number>>(new Set());

  const currentCard = sampleFlashcards[currentIndex];
  const progress = ((currentIndex + 1) / sampleFlashcards.length) * 100;

  const handleNext = () => {
    if (currentIndex < sampleFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const toggleFavorite = () => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(currentCard.id)) {
      newFavorites.delete(currentCard.id);
    } else {
      newFavorites.add(currentCard.id);
    }
    setFavorites(newFavorites);
  };

  const toggleMastered = () => {
    const newMastered = new Set(mastered);
    if (newMastered.has(currentCard.id)) {
      newMastered.delete(currentCard.id);
    } else {
      newMastered.add(currentCard.id);
    }
    setMastered(newMastered);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMastered(new Set());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle>AI Flashcards</DialogTitle>
              <DialogDescription>
                Master your material with smart flashcards
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <Badge>{currentCard.category}</Badge>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleFavorite}
                className="flex items-center gap-1 text-sm text-slate-600 hover:text-yellow-600 transition-colors"
              >
                <Star
                  className={`w-5 h-5 ${favorites.has(currentCard.id) ? 'fill-yellow-500 text-yellow-500' : ''}`}
                />
                Favorite
              </button>
              <Badge variant="outline">
                Card {currentIndex + 1} of {sampleFlashcards.length}
              </Badge>
            </div>
          </div>

          {/* Flashcard */}
          <div
            className="relative h-80 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: '1000px' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {!isFlipped ? (
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
                        {currentCard.question}
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
                        {currentCard.answer}
                      </p>
                      <p className="text-sm text-white/60 mt-6">Click to see question</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                variant="outline"
                size="lg"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button
                  onClick={toggleMastered}
                  variant={mastered.has(currentCard.id) ? 'default' : 'outline'}
                  className={mastered.has(currentCard.id) ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={handleNext}
                disabled={currentIndex === sampleFlashcards.length - 1}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
                size="lg"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 text-sm text-slate-600">
                <span>Progress</span>
                <span>{mastered.size} / {sampleFlashcards.length} mastered</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}