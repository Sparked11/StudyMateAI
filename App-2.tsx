import React from 'react';
import { FloatingNav } from './components/FloatingNav';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Testimonials } from './components/Testimonials';
import { AppDownload } from './components/AppDownload';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { CookiePolicy } from './components/CookiePolicy';
import { Toaster } from './components/ui/sonner';

type PageView = 'home' | 'privacy' | 'terms' | 'cookies';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<PageView>('home');

  React.useEffect(() => {
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (currentPage === 'privacy') {
    return (
      <>
        <CustomCursor />
        <PrivacyPolicy onClose={() => setCurrentPage('home')} />
      </>
    );
  }

  if (currentPage === 'terms') {
    return (
      <>
        <CustomCursor />
        <TermsOfService onClose={() => setCurrentPage('home')} />
      </>
    );
  }

  if (currentPage === 'cookies') {
    return (
      <>
        <CustomCursor />
        <CookiePolicy onClose={() => setCurrentPage('home')} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <FloatingNav />
      <Hero />
      <Features />
      <HowItWorks />
      <InteractiveDemo />
      <Testimonials />
      <AppDownload />
      <CTA />
      <Footer 
        onOpenPrivacyPolicy={() => setCurrentPage('privacy')}
        onOpenTermsOfService={() => setCurrentPage('terms')}
        onOpenCookiePolicy={() => setCurrentPage('cookies')}
      />
      <Toaster />
    </div>
  );
}