import React, { useState, useEffect } from 'react';
import { PianoScroll } from './components/PianoScroll';
import { Hero, Listen, GigCalendar, Gallery, Contact, EPK } from './components/Sections';
import { Instagram, Youtube, Twitter, MessageSquare, Phone, Menu, X } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Listen', href: '#listen' },
    { name: 'Gigs', href: '#gigs' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <main className={cn("relative min-h-screen", isMenuOpen && "overflow-hidden h-screen")}>
      {/* Piano Scroll Indicator */}
      <PianoScroll />
      
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 w-full z-40 px-8 py-6 flex justify-between items-center transition-all duration-300",
        isScrolled 
          ? "bg-piano-ivory/90 backdrop-blur-md shadow-sm py-4" 
          : "bg-transparent py-6"
      )}>
        <div className={cn(
          "text-2xl font-serif transition-colors duration-300",
          isScrolled ? "text-piano-gold" : "text-white"
        )}>
          SJ
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className={cn(
                "text-xs uppercase tracking-widest font-medium transition-colors duration-300",
                isScrolled ? "text-piano-gold hover:text-piano-ebony" : "text-white hover:text-piano-gold"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={cn(
            "md:hidden p-2 transition-colors duration-300",
            isScrolled ? "text-piano-gold" : "text-white"
          )}
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Mobile Menu Overlay (Drawer) */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
              />
              
              {/* Drawer */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[80%] bg-piano-ivory z-[60] flex flex-col p-8 md:hidden shadow-2xl"
              >
                <div className="flex justify-between items-center mb-12">
                  <span className="text-2xl font-serif text-piano-gold">SJ</span>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-piano-ebony"
                  >
                    <X size={28} />
                  </button>
                </div>
                
                <div className="flex flex-col gap-8">
                  {navItems.map((item) => (
                    <a 
                      key={item.name} 
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-3xl font-serif text-piano-ebony hover:text-piano-gold transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                <div className="mt-auto pt-12 border-t border-piano-ebony/10">
                  <p className="text-xs uppercase tracking-widest text-piano-ebony/40 mb-4 font-medium">Connect</p>
                  <div className="flex gap-6">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-piano-ebony hover:text-piano-gold transition-colors">
                      <Instagram size={24} />
                    </a>
                    <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="text-piano-ebony hover:text-piano-gold transition-colors">
                      <MessageSquare size={24} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Sections */}
      <Hero />
      <Listen />
      <GigCalendar />
      <Gallery />
      <Contact />
      {/* <EPK /> */}

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-piano-ebony/5 text-center bg-piano-ivory">
        <div className="text-4xl font-serif mb-8 tracking-tighter">SHANTANU JAGIRDAR</div>
        
        {/* Contact Info in Footer */}
        <div className="flex flex-col items-center gap-2 mb-12 text-piano-ebony/60">
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-piano-gold" />
            <span className="text-sm">+91 00000 00000</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-piano-gold" />
            <span className="text-sm">WhatsApp available</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mb-12">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-piano-ebony/10 hover:border-piano-gold hover:text-piano-gold transition-all">
            <Instagram size={20} />
          </a>
          <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-piano-ebony/10 hover:border-piano-gold hover:text-piano-gold transition-all">
            <MessageSquare size={20} />
          </a>
        </div>

        <p className="text-[10px] text-piano-ebony/40 uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} &bull; All Rights Reserved
        </p>
      </footer>
    </main>
  );
}

