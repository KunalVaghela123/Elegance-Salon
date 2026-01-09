import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone as PhoneIcon, AlertCircle, Loader2 } from 'lucide-react';
import { SERVICES, SALON_INFO } from '../constants';
import { BookingDetails } from '../types';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingDetails>({
    name: '',
    phone: '',
    date: '',
    time: '',
    service: 'hair', // Default
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSimulated, setIsSimulated] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Define available time slots
  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", 
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  // Fetch booked slots when date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formData.date) {
        setBookedSlots([]);
        return;
      }

      setIsLoadingSlots(true);
      // Reset selected time if date changes to avoid conflict
      setFormData(prev => ({ ...prev, time: '' }));

      try {
        const response = await fetch(`/api/booking?date=${formData.date}`);
        if (response.ok) {
          const data = await response.json();
          setBookedSlots(data.bookedTimes || []);
        } else {
          // If backend 404s (local dev), assume no bookings
          if (response.status === 404) {
             console.warn("Backend API not found (local dev). No slots blocked.");
             setBookedSlots([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch slots", error);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [formData.date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time: string) => {
    if (bookedSlots.includes(time)) return;
    setFormData(prev => ({ ...prev, time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.time) {
      setErrorMessage("Please select a time slot.");
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    setIsSimulated(false);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      
      if (response.ok) {
        setStatus('success');
      } else {
        // Handle 409 Conflict (Double Booking)
        if (response.status === 409) {
          const errorData = await response.json();
          throw new Error(errorData.message || "This slot was just booked by someone else.");
        }

        // HANDLE LOCAL DEV ENVIRONMENT (404)
        if (response.status === 404) {
          console.warn("Backend API not found. This is normal during local development. Simulating success for demo purposes.");
          // Simulate network delay then show success
          setTimeout(() => {
            setIsSimulated(true);
            setStatus('success');
          }, 1500);
          return;
        }

        // Handle Real Errors (500, etc)
        let errorMsg = `Error ${response.status}: ${response.statusText}`;
        try {
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
          } else {
            // const text = await response.text(); 
            if (response.status === 500) {
              errorMsg = "Database Connection Failed. Please check MongoDB IP Whitelist.";
            }
          }
        } catch (parseError) {
          // Ignore parse error
        }
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      console.error('Booking Error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to submit booking.');
      
      // Refresh slots if there was an error (likely a race condition double book)
      if (formData.date) {
        // simple re-fetch logic
        fetch(`/api/booking?date=${formData.date}`)
          .then(res => res.json())
          .then(data => setBookedSlots(data.bookedTimes || []))
          .catch(() => {});
      }
    }
  };

  // Shared classes for all inputs to ensure exact pixel matching
  const inputClasses = "w-full h-[50px] pl-10 pr-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all placeholder-gray-500 appearance-none m-0 block leading-normal min-w-0";

  return (
    <section id="book" className="py-24 relative bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1583934555026-6f85ed3dd445?q=80&w=1920&auto=format&fit=crop")' }}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1a1a1a]/95 p-8 md:p-12 rounded-2xl border border-gold-500/20 shadow-2xl min-h-[600px] flex items-center justify-center">
          
          <div className="w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">Book Your <span className="text-gold-400">Appointment</span></h2>
              <p className="text-gray-400">Timings: {SALON_INFO.timings}</p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8 animate-fade-in-up">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  <span className="text-green-500 text-4xl">✓</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-4">Request Sent Successfully</h3>
                
                {isSimulated && (
                  <div className="mb-4 inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30">
                    Demo Mode: Backend Simulated
                  </div>
                )}

                <div className="bg-white/5 p-6 rounded-xl border border-white/10 max-w-md mx-auto backdrop-blur-sm">
                   <p className="text-gray-300 leading-relaxed mb-4">
                    Thank you, <span className="text-gold-400 font-bold">{formData.name}</span>!
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    We have received your request for a <span className="text-white font-medium">{SERVICES.find(s => s.id === formData.service)?.title}</span> session on <span className="text-white font-medium">{formData.date}</span> at <span className="text-white font-medium">{formData.time}</span>.
                  </p>
                  <p className="text-gold-400 text-sm font-medium border-t border-white/10 pt-4">
                    We will contact you shortly on {formData.phone} to confirm your appointment.
                  </p>
                </div>
                
                <button 
                  onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', phone: '', date: '', time: '', service: 'hair' });
                      setIsSimulated(false);
                      setBookedSlots([]);
                  }}
                  className="mt-8 px-6 py-2 text-sm text-gray-500 hover:text-white transition-colors border border-transparent hover:border-gray-700 rounded-full"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-center mb-6 animate-fade-in-up">
                    <AlertCircle size={20} className="mr-3 flex-shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="font-bold">Booking Failed</span>
                      <span className="text-sm opacity-90">{errorMessage}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gold-500" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon size={18} className="text-gold-500" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        title="10 digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="7016924791"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Calendar size={18} className="text-gold-500" />
                      </div>
                      <input
                        type="date"
                        name="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleChange}
                        style={{ colorScheme: 'dark' }} 
                        className={`${inputClasses} relative`}
                      />
                    </div>
                  </div>

                  {/* Time - Replaced Select with Grid */}
                  <div className="relative md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-3">
                      Preferred Time Slot 
                      {formData.date && !isLoadingSlots && <span className="text-gold-500 text-xs ml-2 font-normal">(Select an available slot)</span>}
                    </label>
                    
                    {!formData.date ? (
                      <div className="w-full p-6 border border-gray-800 border-dashed rounded-lg text-center text-gray-500 text-sm">
                        Please select a date to view available time slots
                      </div>
                    ) : isLoadingSlots ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="animate-spin text-gold-500" size={32} />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 animate-fade-in-up">
                        {timeSlots.map((slot) => {
                          const isBooked = bookedSlots.includes(slot);
                          const isSelected = formData.time === slot;

                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isBooked}
                              onClick={() => handleTimeSelect(slot)}
                              className={`
                                relative py-2 px-1 text-sm font-medium rounded-md transition-all duration-300 border
                                ${isBooked 
                                  ? 'bg-gray-800/50 text-gray-600 border-transparent cursor-not-allowed opacity-60' 
                                  : isSelected
                                    ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.4)] scale-105'
                                    : 'bg-transparent text-gray-300 border-gray-700 hover:border-gold-500 hover:text-gold-400 hover:bg-white/5'
                                }
                              `}
                            >
                              {slot}
                              {isBooked && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-full h-px bg-gray-600 rotate-12 absolute"></div>
                                  <span className="text-[10px] font-bold text-red-500/70 bg-black/80 px-1 rounded absolute -top-2 -right-1">SOLD</span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Service - Full Width */}
                  <div className="md:col-span-2 mt-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Service</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {SERVICES.map((s) => (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => setFormData(prev => ({ ...prev, service: s.id }))}
                          className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-300 ${
                            formData.service === s.id
                              ? 'bg-gold-500 text-black border-gold-500 shadow-lg scale-105'
                              : 'bg-transparent text-gray-400 border-gray-700 hover:border-gold-500/50'
                          }`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !formData.time}
                    className="w-full bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold text-lg py-4 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Confirming...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;