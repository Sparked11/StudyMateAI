import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sparkles, ArrowRight, Apple, Play } from 'lucide-react';
import logo from 'figma:asset/8a0c24de4085e255f227ba33e48fb86c50b34e64.png';
import heroImage from 'figma:asset/92d730e014d74b673d6ff8e3733184ba4d8ad3ab.png';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white min-h-screen flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center mb-2"
            >
              <img src={logo} alt="StudyMate.AI Logo" className="h-16 sm:h-20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Study Assistant
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight max-w-4xl mx-auto"
            >
              Your Complete Study Toolkit in{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                One Place
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto"
            >
              Record lectures, create flashcards, generate quizzes, and master your subjects with AI-powered tools designed for modern learners.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-slate-900 text-white px-8 h-14 rounded-xl group"
                  onClick={() => window.open('https://apps.apple.com/app/studymate-ai', '_blank')}
                >
                  <Apple className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                  Download on App Store
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-slate-900 text-white px-8 h-14 rounded-xl group"
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.studymate.ai', '_blank')}
                >
                  <Play className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                  Get it on Google Play
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center gap-8 pt-8 text-sm text-slate-600"
            >
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Free</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>50K+ Students</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>All Features Unlocked</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Image with enhanced 3D effect */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mt-12 lg:mt-16"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
            <motion.div 
              className="relative bg-white rounded-3xl shadow-2xl p-2 border border-slate-200/50 max-w-5xl mx-auto"
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={heroImage}
                alt="Student using StudyMate.ai"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}