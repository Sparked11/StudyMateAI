import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Apple, Play, Star } from 'lucide-react';
import { motion } from 'motion/react';
import phoneMockup from 'figma:asset/84b544fea6a1920703bdf43139a9c1a2e5fd4cbd.png';

export function AppDownload() {
  return (
    <section id="download" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">
                <Star className="w-3 h-3 mr-1" />
                50,000+ Active Users
              </Badge>
              <h2 className="text-4xl lg:text-5xl text-slate-900 mb-4">
                Download StudyMate.AI
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Available on iOS and Android. Start your journey to academic excellence today.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* App Store Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg"
                    className="w-full bg-black hover:bg-slate-900 text-white h-16 rounded-xl group justify-start px-6"
                    onClick={() => window.open('https://apps.apple.com/app/studymate-ai', '_blank')}
                  >
                    <Apple className="w-10 h-10 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-slate-400">Download on the</div>
                      <div className="text-lg">App Store</div>
                    </div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg"
                    className="w-full bg-black hover:bg-slate-900 text-white h-16 rounded-xl group justify-start px-6"
                    onClick={() => window.open('https://play.google.com/store/apps/details?id=com.studymate.ai', '_blank')}
                  >
                    <Play className="w-10 h-10 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-slate-400">Get it on</div>
                      <div className="text-lg">Google Play</div>
                    </div>
                  </Button>
                </motion.div>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">4.9/5 Rating</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative max-w-lg mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-3xl blur-3xl"></div>
                <motion.img
                  src={phoneMockup}
                  alt="StudyMate.ai App Interface"
                  className="relative w-full h-auto drop-shadow-2xl"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}