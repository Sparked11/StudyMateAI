import React, { useState } from 'react';
import { Card } from './ui/card';
import { 
  Mic, 
  FileText, 
  Zap, 
  Brain, 
  Highlighter, 
  Gamepad2,
  ArrowRight 
} from 'lucide-react';
import { Badge } from './ui/badge';
import { 
  RecordAnimation,
  SummaryAnimation,
  FlashcardAnimation,
  QuizAnimation,
  HighlightAnimation,
  GamifiedAnimation
} from './FeatureAnimations';
import { RecordingDialog } from './RecordingDialog';
import { SummaryDialog } from './SummaryDialog';
import { FlashcardDialog } from './FlashcardDialog';
import { QuizDialog } from './QuizDialog';
import { HighlightDialog } from './HighlightDialog';
import { GamifiedDialog } from './GamifiedDialog';
import { motion } from 'motion/react';
import { canPreviewFeature, recordPreviewUsage, getPreviewLimitMessage } from '../lib/previewLimits';
import { toast } from 'sonner@2.0.3';

const features = [
  {
    icon: Mic,
    title: 'Record & Transcribe',
    description: 'Capture every lecture with high-quality audio recording and instant AI transcription. Never miss a detail again.',
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50',
    animation: RecordAnimation,
    dialogKey: 'record',
  },
  {
    icon: FileText,
    title: 'Smart Summaries',
    description: 'Transform lengthy notes into concise, digestible summaries. Save hours of study time with AI-powered condensation.',
    gradient: 'from-purple-500 to-indigo-500',
    bgGradient: 'from-purple-50 to-indigo-50',
    animation: SummaryAnimation,
    dialogKey: 'summary',
  },
  {
    icon: Zap,
    title: 'Auto Flashcards',
    description: 'Generate flashcards automatically from your content. Perfect for memorization and quick review sessions.',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    animation: FlashcardAnimation,
    dialogKey: 'flashcard',
  },
  {
    icon: Brain,
    title: 'Quick Quizzes',
    description: 'Test your knowledge with AI-generated quizzes. Get instant feedback and identify areas for improvement.',
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
    animation: QuizAnimation,
    dialogKey: 'quiz',
  },
  {
    icon: Highlighter,
    title: 'Smart Highlights',
    description: 'Automatically identify and highlight key terms, definitions, and important concepts in your materials.',
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50',
    animation: HighlightAnimation,
    dialogKey: 'highlight',
  },
  {
    icon: Gamepad2,
    title: 'Gamified Learning',
    description: 'Stay motivated with interactive study modes, achievements, and progress tracking. Make learning fun!',
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50',
    animation: GamifiedAnimation,
    dialogKey: 'gamified',
  },
];

export function Features() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 border-0">
              Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl text-slate-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-slate-600">
              Powerful AI tools designed to transform the way you study and retain information
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const AnimationComponent = feature.animation;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card 
                  onClick={() => setOpenDialog(feature.dialogKey)}
                  className="group relative overflow-hidden border hover:border-purple-300 transition-all duration-300 hover:shadow-xl cursor-pointer h-full"
                >
                  {/* Animated Video Demo */}
                  <div className="mb-4 overflow-hidden">
                    <AnimationComponent />
                  </div>

                  <div className="px-6 pb-6">
                    <motion.div 
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>

                    <motion.div 
                      className="flex items-center text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">Try it now</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10 pointer-events-none`}></div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dialogs */}
      <RecordingDialog 
        open={openDialog === 'record'}
        onOpenChange={(open) => setOpenDialog(open ? 'record' : null)}
      />
      <SummaryDialog 
        open={openDialog === 'summary'}
        onOpenChange={(open) => setOpenDialog(open ? 'summary' : null)}
      />
      <FlashcardDialog 
        open={openDialog === 'flashcard'}
        onOpenChange={(open) => setOpenDialog(open ? 'flashcard' : null)}
      />
      <QuizDialog 
        open={openDialog === 'quiz'}
        onOpenChange={(open) => setOpenDialog(open ? 'quiz' : null)}
      />
      <HighlightDialog 
        open={openDialog === 'highlight'}
        onOpenChange={(open) => setOpenDialog(open ? 'highlight' : null)}
      />
      <GamifiedDialog 
        open={openDialog === 'gamified'}
        onOpenChange={(open) => setOpenDialog(open ? 'gamified' : null)}
      />
    </section>
  );
}