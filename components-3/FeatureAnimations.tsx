import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  FileText, 
  Zap, 
  Brain, 
  Highlighter, 
  Gamepad2,
  Star,
  Trophy,
  Target
} from 'lucide-react';

// Recording & Transcribe Animation
export function RecordAnimation() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string[]>([]);
  
  const words = ["Photosynthesis", "is", "the", "process", "of", "converting", "light", "energy"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRecording((prev) => !prev);
      if (!isRecording) {
        setTranscribedText([]);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (isRecording && transcribedText.length < words.length) {
      const timeout = setTimeout(() => {
        setTranscribedText((prev) => [...prev, words[prev.length]]);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isRecording, transcribedText, words]);

  return (
    <div className="relative h-64 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Waveform bars */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 h-24 px-8">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-t from-pink-500 to-rose-500 rounded-full flex-1"
            animate={{
              height: isRecording ? ['20%', '80%', '30%', '60%', '20%'] : '20%',
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Microphone Icon */}
      <motion.div
        className="relative z-10 mb-4"
        animate={{
          scale: isRecording ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
          <Mic className="w-8 h-8 text-white" />
        </div>
        {isRecording && (
          <motion.div
            className="absolute inset-0 bg-pink-500 rounded-full"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Transcribed Text */}
      <div className="relative z-10 h-16 flex flex-wrap gap-2 justify-center items-center">
        <AnimatePresence>
          {transcribedText.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-slate-700 bg-white px-2 py-1 rounded shadow-sm"
            >
              {word}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Smart Summary Animation
export function SummaryAnimation() {
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSummarizing(true);
      setTimeout(() => setIsSummarizing(false), 2000);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center p-6 overflow-hidden">
      <div className="relative w-full max-w-sm">
        {/* Long text blocks */}
        <div className="space-y-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="h-2 bg-purple-200 rounded-full"
              animate={{
                width: isSummarizing ? '0%' : ['60%', '80%', '70%'][i % 3],
                opacity: isSummarizing ? 0 : 1,
              }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* AI Processing Icon */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: isSummarizing ? 360 : 0,
            scale: isSummarizing ? 1 : 0,
          }}
          transition={{ duration: 1 }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Summary text */}
        <div className="space-y-2">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
              initial={{ width: '0%', opacity: 0 }}
              animate={{
                width: isSummarizing ? ['40%', '60%'][i] : '0%',
                opacity: isSummarizing ? 1 : 0,
              }}
              transition={{ duration: 1, delay: 1 + i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Flashcard Animation
export function FlashcardAnimation() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = [
    { front: "H₂O", back: "Water" },
    { front: "CO₂", back: "Carbon Dioxide" },
    { front: "O₂", back: "Oxygen" },
  ];

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 2000);

    const cardInterval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length);
      setIsFlipped(false);
    }, 4000);

    return () => {
      clearInterval(flipInterval);
      clearInterval(cardInterval);
    };
  }, []);

  return (
    <div className="relative h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center p-6 overflow-hidden">
      {/* Floating cards in background */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-20 bg-white/50 rounded-lg shadow-sm"
          style={{
            left: `${20 + i * 25}%`,
            top: '20%',
          }}
          animate={{
            y: [0, -10, 0],
            opacity: currentCard === i ? 0 : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Main flashcard */}
      <motion.div
        className="relative w-48 h-32 cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-2xl flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center">
            <p className="text-xs text-white/80 mb-2">Question</p>
            <p className="text-3xl text-white">{cards[currentCard].front}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-2xl flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center">
            <p className="text-xs text-white/80 mb-2">Answer</p>
            <p className="text-2xl text-white">{cards[currentCard].back}</p>
          </div>
        </div>
      </motion.div>

      {/* Zap icon */}
      <motion.div
        className="absolute top-4 right-4"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Zap className="w-6 h-6 text-blue-500" />
      </motion.div>
    </div>
  );
}

// Quiz Animation
export function QuizAnimation() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedAnswer(null);
      setShowCorrect(false);
      
      setTimeout(() => {
        setSelectedAnswer(1);
        setTimeout(() => setShowCorrect(true), 500);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Question */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Brain className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
        <p className="text-sm text-slate-700">What is 2 + 2?</p>
      </motion.div>

      {/* Answers */}
      <div className="space-y-2 w-full max-w-xs">
        {[
          { id: 0, text: '3', correct: false },
          { id: 1, text: '4', correct: true },
          { id: 2, text: '5', correct: false },
        ].map((answer) => (
          <motion.div
            key={answer.id}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedAnswer === answer.id
                ? showCorrect && answer.correct
                  ? 'border-green-500 bg-green-50'
                  : showCorrect
                  ? 'border-red-500 bg-red-50'
                  : 'border-emerald-500 bg-emerald-50'
                : 'border-slate-200 bg-white'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: answer.id * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-900">{answer.text}</span>
              <AnimatePresence>
                {selectedAnswer === answer.id && showCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {answer.correct ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✗</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Score indicator */}
      <AnimatePresence>
        {showCorrect && selectedAnswer === 1 && (
          <motion.div
            className="absolute top-4 right-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
          >
            <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">
              +10 pts
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Highlight Animation
export function HighlightAnimation() {
  const [highlightedWords, setHighlightedWords] = useState<number[]>([]);
  
  const words = [
    { text: "Mitochondria", important: true },
    { text: "is", important: false },
    { text: "the", important: false },
    { text: "powerhouse", important: true },
    { text: "of", important: false },
    { text: "the", important: false },
    { text: "cell", important: true },
  ];

  useEffect(() => {
    setHighlightedWords([]);
    const importantIndices = words
      .map((word, index) => (word.important ? index : -1))
      .filter((index) => index !== -1);

    importantIndices.forEach((index, i) => {
      setTimeout(() => {
        setHighlightedWords((prev) => [...prev, index]);
      }, 1000 + i * 500);
    });

    const resetInterval = setInterval(() => {
      setHighlightedWords([]);
      importantIndices.forEach((index, i) => {
        setTimeout(() => {
          setHighlightedWords((prev) => [...prev, index]);
        }, 1000 + i * 500);
      });
    }, 5000);

    return () => clearInterval(resetInterval);
  }, []);

  return (
    <div className="relative h-64 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl flex items-center justify-center p-8 overflow-hidden">
      {/* Highlighter Icon */}
      <motion.div
        className="absolute top-4 right-4"
        animate={{
          rotate: [0, -15, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Highlighter className="w-8 h-8 text-amber-500" />
      </motion.div>

      {/* Text with highlights */}
      <div className="flex flex-wrap gap-2 justify-center items-center text-lg">
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="relative px-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {highlightedWords.includes(index) && (
              <motion.span
                className="absolute inset-0 bg-yellow-300 -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            )}
            <span className={highlightedWords.includes(index) ? 'text-slate-900' : 'text-slate-600'}>
              {word.text}
            </span>
          </motion.span>
        ))}
      </div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 w-1 h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent"
        animate={{ left: ['0%', '100%'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Gamified Learning Animation
export function GamifiedAnimation() {
  const [score, setScore] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(0);
      setLevel(1);
      setShowBadge(false);

      // Animate score increase
      let currentScore = 0;
      const scoreInterval = setInterval(() => {
        currentScore += 10;
        setScore(currentScore);
        
        if (currentScore >= 50) {
          setLevel(2);
        }
        
        if (currentScore >= 100) {
          clearInterval(scoreInterval);
          setShowBadge(true);
        }
      }, 200);

      return () => clearInterval(scoreInterval);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Floating stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        </motion.div>
      ))}

      {/* Score Display */}
      <motion.div
        className="text-center mb-6"
        animate={{ scale: score > 0 ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Gamepad2 className="w-12 h-12 text-violet-600 mx-auto mb-2" />
        <div className="text-5xl text-slate-900 mb-1">{score}</div>
        <div className="text-sm text-slate-600">Points</div>
      </motion.div>

      {/* Level indicator */}
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-violet-600" />
        <motion.div
          className="text-sm text-slate-700"
          key={level}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
        >
          Level {level}
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-3 bg-slate-200 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
          initial={{ width: '0%' }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Achievement Badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            className="absolute"
            initial={{ scale: 0, rotate: -180, y: 50 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0 }}
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-4 shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <motion.div
              className="absolute inset-0 bg-yellow-400 rounded-full -z-10"
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
