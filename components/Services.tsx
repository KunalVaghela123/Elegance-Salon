import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-[#0f0f0f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Our Premium <span className="text-gold-400">Services</span></h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">Experience the art of beauty with our specialized treatments designed to make you shine on your special day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="glass-card rounded-xl overflow-hidden hover:bg-white/5 transition-all duration-500 group transform hover:-translate-y-2 flex flex-col border border-gold-500/10"
            >
              {/* Image Container with Overlay */}
              <div className="h-56 overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60 z-10"></div>
                 <img 
                   src={service.image} 
                   alt={service.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
                 {/* Decorative gold border bottom */}
                 <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>
                <div className="flex items-center justify-between border-t border-gray-800 pt-4 mt-auto">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Starts at</span>
                  <span className="text-gold-400 font-bold text-lg">{service.priceStart}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;