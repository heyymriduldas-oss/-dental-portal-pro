
import React from 'react';
import { Mail, Phone, MapPin, Clock, Globe, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-gray-50 py-24 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 font-poppins">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're here to answer your questions and help you start your journey to a better smile.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-8">
              <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-medical-blue flex items-center justify-center mb-6">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-600 mb-4">Direct office line for all bookings and inquiries.</p>
                <a href={`tel:${CLINIC_INFO.phone}`} className="text-xl font-bold text-medical-blue hover:underline">{CLINIC_INFO.phone}</a>
              </div>

              <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-600 mb-4">Send us your medical records or general questions.</p>
                <a href={`mailto:${CLINIC_INFO.email}`} className="text-xl font-bold text-medical-blue hover:underline">{CLINIC_INFO.email}</a>
              </div>

              <div className="p-8 bg-gray-900 text-white rounded-3xl shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  {CLINIC_INFO.hours.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.day}</span>
                      <span className="text-white font-medium">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <div className="aspect-video bg-gray-200 rounded-[3rem] overflow-hidden shadow-inner relative group">
                {/* Simulated Google Map */}
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-50" alt="Map Location" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-medical-blue rounded-full animate-ping opacity-20 absolute inset-0"></div>
                    <div className="w-12 h-12 bg-medical-blue rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white relative z-10">
                      <MapPin size={24} />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur p-8 rounded-3xl border border-white flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Visit Our Clinic</h4>
                    <p className="text-gray-600 text-sm">{CLINIC_INFO.address}</p>
                  </div>
                  <button className="bg-medical-blue text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                    Open in Maps <Globe size={18} />
                  </button>
                </div>
              </div>

              <div className="p-10 lg:p-16 bg-gray-50 rounded-[3rem] border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send a Quick Message</h2>
                <form className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-medical-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Your Email</label>
                    <input type="email" className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-medical-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all" />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                    <textarea rows={6} className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-medical-blue focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none"></textarea>
                  </div>
                  <button className="sm:col-span-2 bg-gray-900 text-white py-5 rounded-2xl text-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
                    Send Inquiry <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
