import React from 'react';
import { Twitter, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from 'figma:asset/8a0c24de4085e255f227ba33e48fb86c50b34e64.png';

interface FooterProps {
  onOpenPrivacyPolicy?: () => void;
  onOpenTermsOfService?: () => void;
  onOpenCookiePolicy?: () => void;
}

export function Footer({ onOpenPrivacyPolicy, onOpenTermsOfService, onOpenCookiePolicy }: FooterProps) {
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing! We'll send updates to ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="StudyMate.AI" className="h-10 brightness-0 invert" />
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Transform your study routine with AI-powered tools designed for modern learners. Excel in your academics with intelligent features that adapt to your learning style.
            </p>
            <div className="flex gap-3">
              <a href="https://twitter.com/studymateai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/studymateai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/studymateai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@studymateai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-slate-400 hover:text-white transition text-sm">Features</a></li>
              <li><a href="#download" className="text-slate-400 hover:text-white transition text-sm">Download</a></li>
              <li><a href="#features" className="text-slate-400 hover:text-white transition text-sm">Demo</a></li>
              <li><a href="#how-it-works" className="text-slate-400 hover:text-white transition text-sm">How It Works</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-lg mb-2">Subscribe to our newsletter</h3>
            <p className="text-slate-400 mb-4">Get the latest updates, tips, and study resources delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 whitespace-nowrap">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2025 StudyMate.AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <button onClick={onOpenTermsOfService} className="text-slate-400 hover:text-white transition">Terms of Service</button>
            <button onClick={onOpenPrivacyPolicy} className="text-slate-400 hover:text-white transition">Privacy Policy</button>
            <button onClick={onOpenCookiePolicy} className="text-slate-400 hover:text-white transition">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}