import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-slate-200 z-10">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl text-slate-900 mb-2">Privacy Policy</h1>
              <p className="text-slate-600">Last updated: November 6, 2025</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed">
                Welcome to StudyMate.AI ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl text-slate-900 mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Account information (name, email address, profile picture)</li>
                <li>Audio recordings and transcriptions you create</li>
                <li>Notes, flashcards, and study materials you generate</li>
                <li>Quiz responses and study progress</li>
                <li>Feedback and communications with us</li>
              </ul>

              <h3 className="text-xl text-slate-900 mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Device information (type, operating system, unique identifiers)</li>
                <li>Usage data (features used, time spent, interaction patterns)</li>
                <li>Log data (IP address, browser type, access times)</li>
                <li>Analytics and performance data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and transcribe your audio recordings using AI</li>
                <li>Generate summaries, flashcards, and quizzes from your content</li>
                <li>Personalize your learning experience</li>
                <li>Analyze usage patterns to enhance features</li>
                <li>Send you updates, newsletters, and important notifications</li>
                <li>Respond to your requests and provide customer support</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">4. Data Storage and Security</h2>
              <p className="text-slate-600 leading-relaxed">
                We implement industry-standard security measures to protect your personal information. Your data is encrypted both in transit and at rest. We use secure cloud storage services and regularly update our security protocols to prevent unauthorized access, disclosure, alteration, or destruction of your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">5. Third-Party Services</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use third-party services to help us provide and improve our application:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>OpenAI for AI-powered transcription and content generation</li>
                <li>Cloud storage providers for data backup</li>
                <li>Analytics services to understand usage patterns</li>
                <li>Payment processors for future premium features</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                These third parties have their own privacy policies and we encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Access and review your personal data</li>
                <li>Request corrections to inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Export your study materials and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Limit data collection and processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">7. Children's Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                StudyMate.AI is designed for users aged 13 and older. We do not knowingly collect personal information from children under 13. If we become aware that we have collected data from a child under 13, we will take steps to delete that information promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">9. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-slate-50 rounded-xl">
                <p className="text-slate-900">Email: privacy@studymate.ai</p>
                <p className="text-slate-900">Address: 123 Learning Street, Education City, ED 12345</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
