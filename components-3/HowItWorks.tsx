import React from 'react';
import { Badge } from './ui/badge';
import { Upload, Wand2, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your Content',
    description: 'Record lectures, upload notes, or paste text. StudyMate.AI accepts multiple formats.',
    color: 'purple',
  },
  {
    number: '02',
    icon: Wand2,
    title: 'AI Processing',
    description: 'Our advanced AI analyzes your content, identifying key concepts and creating study materials.',
    color: 'blue',
  },
  {
    number: '03',
    icon: BookOpen,
    title: 'Study & Practice',
    description: 'Access flashcards, quizzes, and summaries. Choose your preferred study mode.',
    color: 'emerald',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Monitor your improvement with detailed analytics and personalized recommendations.',
    color: 'orange',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
              How It Works
            </Badge>
            <h2 className="text-4xl lg:text-5xl text-slate-900 mb-4">
              Simple, Powerful, Effective
            </h2>
            <p className="text-xl text-slate-600">
              Get started in minutes and transform your study routine
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative"
              >
                <div className="text-center">
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center shadow-lg shadow-${step.color}-500/30`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <motion.div
                    className="text-6xl text-slate-200 mb-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.number}
                  </motion.div>
                  
                  <h3 className="text-xl text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}