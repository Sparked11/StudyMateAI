import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Cookie } from 'lucide-react';
import { motion } from 'motion/react';

interface CookiePolicyProps {
  onClose: () => void;
}

export function CookiePolicy({ onClose }: CookiePolicyProps) {
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
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl text-slate-900 mb-2">Cookie Policy</h1>
              <p className="text-slate-600">Last updated: November 6, 2025</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl text-slate-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-slate-600 leading-relaxed">
                Cookies are small text files that are placed on your device when you visit a website or use an application. They are widely used to make applications work more efficiently and provide information to the owners of the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                StudyMate.AI uses cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Keep you signed in to your account</li>
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our application</li>
                <li>Improve and optimize our services</li>
                <li>Provide personalized content and features</li>
                <li>Ensure security and prevent fraud</li>
                <li>Analyze usage patterns and trends</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl text-slate-900 mb-3">3.1 Essential Cookies</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                These cookies are necessary for the application to function properly. They enable core functionality such as security, authentication, and accessibility. The application cannot function properly without these cookies.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-purple-900">
                  <strong>Examples:</strong> Session management, authentication tokens, security cookies
                </p>
              </div>

              <h3 className="text-xl text-slate-900 mb-3">3.2 Functional Cookies</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                These cookies enable the application to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we use.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-900">
                  <strong>Examples:</strong> Language preferences, theme settings, notification preferences
                </p>
              </div>

              <h3 className="text-xl text-slate-900 mb-3">3.3 Analytics Cookies</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                These cookies help us understand how users interact with our application by collecting and reporting information anonymously. This helps us improve our services and user experience.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-green-900">
                  <strong>Examples:</strong> Page views, feature usage, session duration, error tracking
                </p>
              </div>

              <h3 className="text-xl text-slate-900 mb-3">3.4 Performance Cookies</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                These cookies allow us to monitor and improve the performance of our application. They help us identify which features are most popular and see how users navigate through the app.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-orange-900">
                  <strong>Examples:</strong> Load times, feature performance, crash reports
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                In addition to our own cookies, we may use various third-party cookies to report usage statistics and deliver content:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li><strong>Analytics Services:</strong> To understand user behavior and improve our application</li>
                <li><strong>AI Services:</strong> To power transcription and content generation features</li>
                <li><strong>Cloud Services:</strong> To securely store and sync your data</li>
                <li><strong>Authentication Providers:</strong> To enable secure sign-in options</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">5. Cookie Duration</h2>
              
              <h3 className="text-xl text-slate-900 mb-3">5.1 Session Cookies</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                These cookies are temporary and are deleted when you close your browser or app. They help us track your movements within a single session.
              </p>

              <h3 className="text-xl text-slate-900 mb-3">5.2 Persistent Cookies</h3>
              <p className="text-slate-600 leading-relaxed">
                These cookies remain on your device for a set period or until you delete them. They help us recognize you as a returning user and remember your preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">6. Managing Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You have several options for managing cookies:
              </p>
              
              <h3 className="text-xl text-slate-900 mb-3">6.1 Browser/Device Settings</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most browsers and mobile devices allow you to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>View what cookies are stored</li>
                <li>Delete cookies individually or all at once</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies</li>
                <li>Delete all cookies when you close the browser</li>
              </ul>

              <h3 className="text-xl text-slate-900 mb-3 mt-6">6.2 App Settings</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Within the StudyMate.AI app, you can manage certain cookie preferences in the Settings menu under Privacy & Data.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
                <p className="text-sm text-yellow-900">
                  <strong>Please note:</strong> Blocking or deleting certain cookies may impact the functionality of the application and your user experience. Some features may not work properly without cookies enabled.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">7. Do Not Track Signals</h2>
              <p className="text-slate-600 leading-relaxed">
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to have your online activity tracked. We respect DNT signals and will not track your activity when DNT is enabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">8. Children's Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                We do not knowingly collect information from children under 13 years of age through cookies. Our application is designed for users 13 and older. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">9. Updates to This Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically. The "Last updated" date at the top indicates when this policy was last revised.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">10. More Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                For more information about cookies and how they work, you can visit:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>All About Cookies: www.allaboutcookies.org</li>
                <li>Network Advertising Initiative: www.networkadvertising.org</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-slate-900 mb-4">11. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have questions about our use of cookies or this Cookie Policy, please contact us at:
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
