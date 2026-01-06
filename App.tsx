import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white font-sans selection:bg-gold-500 selection:text-black">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default App;