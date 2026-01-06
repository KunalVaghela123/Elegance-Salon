import React from 'react';
import { Instagram, Phone, MapPin, Clock } from 'lucide-react';
import { SALON_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-serif font-bold text-gold-400">Elegance</h3>
            <p className="text-gray-500 leading-relaxed">
              Your destination for premium beauty services. We specialize in making Indian brides look their absolute best with our modern techniques and traditional touch.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3">
              <a href={`tel:${SALON_INFO.phone}`} className="flex items-center text-gray-400 hover:text-gold-400 transition-colors">
                <Phone size={18} className="mr-3 text-gold-500" />
                {SALON_INFO.phone}
              </a>
              <div className="flex items-start text-gray-400">
                <MapPin size={18} className="mr-3 mt-1 text-gold-500 flex-shrink-0" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Clock size={18} className="mr-3 text-gold-500" />
                <span>{SALON_INFO.timings}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg uppercase tracking-wider">Follow Us</h4>
            <a
              href={`https://instagram.com/${SALON_INFO.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-[#E1306C] transition-colors group"
            >
              <div className="p-2 border border-gray-800 rounded-full group-hover:border-[#E1306C] transition-colors">
                <Instagram size={24} />
              </div>
              <span className="group-hover:translate-x-1 transition-transform">@{SALON_INFO.instagram}</span>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Payal's Elegance Beauty Salon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;