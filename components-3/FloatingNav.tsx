import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import logo from 'figma:asset/8a0c24de4085e255f227ba33e48fb86c50b34e64.png';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? 'w-[95%] max-w-6xl'
            : 'w-[95%] max-w-7xl'
        }`}
      >
        <div
          className={`backdrop-blur-xl bg-white/90 border border-slate-200/50 rounded-2xl shadow-2xl transition-all duration-500 ${
            scrolled ? 'shadow-xl py-3' : 'py-4'
          }`}
        >
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <img src={logo} alt="StudyMate.AI" className={`transition-all duration-500 ${scrolled ? 'h-7' : 'h-8'}`} />
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {[
                  { label: 'Features', id: 'features' },
                  { label: 'How It Works', id: 'how-it-works' },
                  { label: 'Demo', id: 'demo' },
                  { label: 'Download', id: 'download' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors rounded-lg group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-3/4 transition-all duration-300"
                    />
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => scrollToSection('download')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-purple-500/30"
                  >
                    Download App
                  </Button>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 backdrop-blur-xl bg-white/95 border border-slate-200/50 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {[
                  { label: 'Features', id: 'features' },
                  { label: 'How It Works', id: 'how-it-works' },
                  { label: 'Demo', id: 'demo' },
                  { label: 'Download', id: 'download' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <Button
                  onClick={() => scrollToSection('download')}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl mt-2"
                >
                  Download App
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}