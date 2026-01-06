import React from 'react';
import { GALLERY_IMAGES } from '../constants';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">Latest <span className="text-gold-400">Creations</span></h2>
            <p className="text-gray-400">Witness the transformation of our beautiful brides.</p>
          </div>
          <a href="https://www.instagram.com/elegancebeautysalon95" target="_blank" rel="noreferrer" className="text-gold-400 hover:text-white underline decoration-gold-500 underline-offset-4 transition-colors">
            View more on Instagram
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((item, index) => (
            <div
              key={item.id}
              className={`relative group overflow-hidden rounded-lg cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            >
              {/* Overlay for warm tone */}
              <div className="absolute inset-0 bg-gold-500/20 mix-blend-overlay z-10 pointer-events-none"></div>

              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 min-h-[300px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-6">
                <span className="text-gold-400 text-xs uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.category}</span>
                <h3 className="text-white font-serif text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;