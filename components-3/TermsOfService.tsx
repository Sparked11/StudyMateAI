import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface TermsOfServiceProps {
  onClose: () => void;
}

export function TermsOfService({ onClose }: TermsOfServiceProps) {
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl text-slate-900 mb-2">Terms of Service</h1>
              <p className="text-slate-600">Last updated: November 6, 2025</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing or using StudyMate.AI ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service. We reserve the right to update these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">2. Description of Service</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                StudyMate.AI is an AI-powered study application that provides the following features:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Audio recording and AI-powered transcription</li>
                <li>Automated note summarization</li>
                <li>Flashcard generation from study materials</li>
                <li>Quiz creation and testing</li>
                <li>Keyword and definition highlighting</li>
                <li>Gamified learning experiences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">3. User Accounts</h2>
              <h3 className="text-xl text-slate-900 mb-3">3.1 Account Creation</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                You may need to create an account to access certain features. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate and current.
              </p>

              <h3 className="text-xl text-slate-900 mb-3">3.2 Account Security</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h3 className="text-xl text-slate-900 mb-3">3.3 Age Requirements</h3>
              <p className="text-slate-600 leading-relaxed">
                You must be at least 13 years old to use StudyMate.AI. Users between 13 and 18 should have parental or guardian consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">4. User Content and Conduct</h2>
              <h3 className="text-xl text-slate-900 mb-3">4.1 Your Content</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                You retain ownership of all content you create, upload, or record through the Service. By using the Service, you grant us a license to process, store, and use your content solely for the purpose of providing and improving the Service.
              </p>

              <h3 className="text-xl text-slate-900 mb-3">4.2 Prohibited Conduct</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Upload content that infringes on intellectual property rights</li>
                <li>Share inappropriate, offensive, or harmful content</li>
                <li>Attempt to gain unauthorized access to the Service or other accounts</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated tools to access the Service without permission</li>
                <li>Resell or redistribute the Service without authorization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">5. Intellectual Property</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Service, including its original content, features, and functionality, is owned by StudyMate.AI and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-slate-600 leading-relaxed">
                You may not copy, modify, distribute, sell, or lease any part of our Service or included software without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">6. AI-Generated Content</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our Service uses artificial intelligence to generate summaries, flashcards, quizzes, and other study materials. While we strive for accuracy:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>AI-generated content may contain errors or inaccuracies</li>
                <li>You should verify important information from reliable sources</li>
                <li>We are not responsible for decisions made based on AI-generated content</li>
                <li>The quality of output depends on the quality of input provided</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">7. Free Service</h2>
              <p className="text-slate-600 leading-relaxed">
                StudyMate.AI is currently offered as a free service. We reserve the right to introduce premium features or subscription plans in the future. Any such changes will be communicated to users in advance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">8. Service Availability</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We strive to provide reliable service, but we cannot guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Uninterrupted or error-free operation</li>
                <li>That defects will be corrected immediately</li>
                <li>That the Service will be available at all times</li>
                <li>That data loss will never occur</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                We recommend regularly backing up your important study materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-slate-600 leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, STUDYMATE.AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">11. Termination</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Suspend or terminate your account for violation of these Terms</li>
                <li>Modify or discontinue the Service at any time</li>
                <li>Remove content that violates our policies</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                You may terminate your account at any time through the app settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">12. Governing Law</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which StudyMate.AI operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">13. Contact Information</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-slate-50 rounded-xl">
                <p className="text-slate-900">Email: legal@studymate.ai</p>
                <p className="text-slate-900">Address: 123 Learning Street, Education City, ED 12345</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
