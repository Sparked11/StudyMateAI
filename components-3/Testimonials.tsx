import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Medical Student',
    avatar: 'SJ',
    rating: 5,
    text: 'StudyMate.AI completely transformed my study routine. The audio transcription saved me countless hours, and the AI-generated flashcards helped me ace my anatomy exam!',
  },
  {
    name: 'Michael Chen',
    role: 'Computer Science Major',
    avatar: 'MC',
    rating: 5,
    text: 'The quiz generation feature is incredible. It creates questions that actually help me understand the material better. My GPA has improved significantly since I started using this.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Law Student',
    avatar: 'ER',
    rating: 5,
    text: "I love the gamified study mode! It makes reviewing material actually enjoyable. The keyword highlighting feature is perfect for dense legal texts.",
  },
  {
    name: 'David Kim',
    role: 'Engineering Student',
    avatar: 'DK',
    rating: 5,
    text: 'Best study tool I\'ve ever used. The smart summaries condense my lecture notes perfectly while keeping all the important details. Highly recommend!',
  },
  {
    name: 'Jessica Taylor',
    role: 'Business Administration',
    avatar: 'JT',
    rating: 5,
    text: 'As someone who struggles with long lectures, the recording and transcription feature is a lifesaver. I can focus on listening and review the transcript later.',
  },
  {
    name: 'Alex Martinez',
    role: 'Psychology Major',
    avatar: 'AM',
    rating: 5,
    text: 'The progress tracking keeps me motivated and accountable. I can see exactly where I need to improve, and the AI adapts to my learning style.',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0">
              Testimonials
            </Badge>
            <h2 className="text-4xl lg:text-5xl text-slate-900 mb-4">
              Loved by Students Worldwide
            </h2>
            <p className="text-xl text-slate-600">
              Join thousands of students who have transformed their study habits with StudyMate.ai
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="p-6 border hover:border-purple-200 transition-all hover:shadow-lg h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-slate-900 text-sm">{testimonial.name}</div>
                        <div className="text-xs text-slate-600">{testimonial.role}</div>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-purple-200" />
                  </div>

                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 p-8 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-center">
              <div className="text-3xl text-slate-900 mb-1">4.9/5</div>
              <div className="flex gap-0.5 justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <div className="text-xs text-slate-600">Average Rating</div>
            </div>
            <div className="h-12 w-px bg-slate-300"></div>
            <div className="text-center">
              <div className="text-3xl text-slate-900 mb-1">10K+</div>
              <div className="text-xs text-slate-600">Reviews</div>
            </div>
            <div className="h-12 w-px bg-slate-300"></div>
            <div className="text-center">
              <div className="text-3xl text-slate-900 mb-1">50K+</div>
              <div className="text-xs text-slate-600">Active Users</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}