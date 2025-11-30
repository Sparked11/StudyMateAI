import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    icon: Zap,
    description: 'Perfect for trying out StudyMate.AI',
    features: [
      '5 audio recordings per month',
      'Basic transcription',
      '10 AI summaries',
      '50 flashcards',
      '5 quizzes per month',
      'Community support',
    ],
    cta: 'Get Started',
    popular: false,
    gradient: 'from-slate-500 to-slate-600',
  },
  {
    name: 'Student',
    price: '9.99',
    icon: Sparkles,
    description: 'For serious students who want to excel',
    features: [
      'Unlimited audio recordings',
      'Advanced transcription with timestamps',
      'Unlimited AI summaries',
      'Unlimited flashcards',
      'Unlimited quizzes',
      'Gamified study modes',
      'Progress analytics',
      'Priority support',
      'Export to PDF',
    ],
    cta: 'Start Free Trial',
    popular: true,
    gradient: 'from-purple-600 to-blue-600',
  },
  {
    name: 'Premium',
    price: '19.99',
    icon: Crown,
    description: 'Maximum power for academic excellence',
    features: [
      'Everything in Student plan',
      'AI tutor assistant',
      'Custom study schedules',
      'Collaboration tools',
      'Advanced analytics & insights',
      'API access',
      'White-label options',
      'Dedicated account manager',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-amber-500 to-orange-600',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200 border-0">
            Pricing
          </Badge>
          <h2 className="text-4xl lg:text-5xl text-slate-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All paid plans include a 14-day money-back guarantee.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden border-2 transition-all duration-300 ${
                plan.popular 
                  ? 'border-purple-300 shadow-2xl scale-105 md:scale-110' 
                  : 'border-slate-200 hover:border-purple-200 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 text-sm">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6`}>
                  <plan.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl text-slate-900 mb-2">
                  {plan.name}
                </h3>
                
                <p className="text-slate-600 mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl text-slate-900">${plan.price}</span>
                    {plan.price !== '0' && <span className="text-slate-600">/month</span>}
                  </div>
                  {plan.price !== '0' && (
                    <p className="text-sm text-slate-500 mt-1">Billed monthly or annually</p>
                  )}
                </div>

                <Button 
                  className={`w-full mb-8 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                      : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            Need a custom plan for your institution?
          </p>
          <Button variant="outline" size="lg" className="border-2">
            Contact Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
}
