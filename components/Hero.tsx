import React from 'react';

const Hero: React.FC = () => {
  return (
    <div id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay - Indian Bride */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1767426818189-22da7e08d8d7?q=80&w=1920&auto=format&fit=crop"
          alt="Indian Bride Background"
          className="w-full h-full object-cover scale-105 animate-float"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-maroon-900/40 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-gold-400 tracking-[0.2em] text-sm md:text-lg uppercase mb-4 animate-[fadeInUp_1s_ease-out_0.5s_both]">
          Payal's
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-white mb-6 animate-[fadeInUp_1s_ease-out_0.8s_both]">
          Elegance <br/> <span className="text-4xl md:text-6xl lg:text-8xl italic text-gold-400">Beauty Salon</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-[fadeInUp_1s_ease-out_1.1s_both]">
          Unveil your inner radiance with our exclusive Indian bridal makeovers, premium skin care, and artistic styling.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[fadeInUp_1s_ease-out_1.4s_both]">
          <a
            href="#book"
            className="px-8 py-4 bg-gold-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.5)]"
          >
            Book Appointment
          </a>
          <a
            href="#services"
            className="px-8 py-4 border border-gold-500 text-gold-400 font-bold uppercase tracking-widest hover:bg-gold-500/10 transition-all duration-300"
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent z-20"></div>
    </div>
  );
};

export default Hero;
