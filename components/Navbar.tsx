import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Instagram } from 'lucide-react';
import { SALON_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Book Now', href: '#book' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-2 border-b border-gold-500/30' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl sm:text-3xl font-serif font-bold gold-gradient-text cursor-pointer">
              Elegance
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 tracking-wider uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social/Contact Icons Desktop */}
          <div className="hidden md:flex items-center space-x-4">
             <a href={`tel:${SALON_INFO.phone}`} className="text-gold-400 hover:text-white transition-colors">
               <Phone size={20} />
             </a>
             <a href={`https://instagram.com/${SALON_INFO.instagram}`} target="_blank" rel="noreferrer" className="text-gold-400 hover:text-white transition-colors">
               <Instagram size={20} />
             </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gold-400 hover:text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} bg-black/95 backdrop-blur-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-gold-400 block px-3 py-4 rounded-md text-base font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="flex justify-center space-x-6 pt-4 border-t border-gray-800">
             <a href={`tel:${SALON_INFO.phone}`} className="text-gold-400">
               <Phone size={24} />
             </a>
             <a href={`https://instagram.com/${SALON_INFO.instagram}`} target="_blank" rel="noreferrer" className="text-gold-400">
               <Instagram size={24} />
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;