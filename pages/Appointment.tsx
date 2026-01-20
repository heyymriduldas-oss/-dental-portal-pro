
import React, { useState } from 'react';
import { Calendar, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLINIC_INFO, SERVICES } from '../constants';

const Appointment: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="max-w-lg w-full bg-white p-8 md:p-12 rounded-3xl md:rounded-[3rem] shadow-2xl text-center border border-gray-100">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
            <CheckCircle2 size={32} className="md:w-10 md:h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">Request Received!</h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed">
            Thank you for choosing Lumina Dental. We will call you within <span className="text-medical-blue font-bold">2 business hours</span> to finalize your appointment.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-medical-blue font-bold hover:underline flex items-center gap-2 mx-auto"
          >
            Submit another request <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-gray-50 py-12 md:py-24 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">Schedule Your Visit</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Book your consultation today. Experience premium dental care in a state-of-the-art facility.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="bg-white p-6 md:p-12 rounded-2xl md:rounded-[3rem] border border-gray-100 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1 md:space-y-2">
                    <label className="text-xs md:text-sm font-bold text-gray-700 ml-1">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-medical-blue outline-none transition-all text-sm md:text-base" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <label className="text-xs md:text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                    <input required type="tel" placeholder="(555) 000-0000" className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-medical-blue outline-none transition-all text-sm md:text-base" />
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="text-xs md:text-sm font-bold text-gray-700 ml-1">Email Address</label>
                  <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-medical-blue outline-none transition-all text-sm md:text-base" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="text-xs md:text-sm font-bold text-gray-700 ml-1">Preferred Treatment</label>
                  <select className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-medical-blue outline-none transition-all text-sm md:text-base appearance-none">
                    <option>General Checkup / Cleaning</option>
                    {SERVICES.map(s => <option key={s.id}>{s.title}</option>)}
                    <option>Other / Consultation</option>
                  </select>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="text-xs md:text-sm font-bold text-gray-700 ml-1">Preferred Date</label>
                  <input required type="date" className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-medical-blue outline-none transition-all text-sm md:text-base" />
                </div>
                <button type="submit" className="w-full bg-medical-blue text-white py-4 md:py-5 rounded-xl md:rounded-2xl text-lg md:text-xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all mt-4">
                  Request Appointment
                </button>
              </form>
            </div>

            <div className="space-y-8 md:space-y-12 py-4 md:py-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Need Immediate Help?</h2>
                <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  For dental emergencies or same-day appointments, please call us directly. Our triage team is available to assist you immediately.
                </p>
                <a 
                  href={`tel:${CLINIC_INFO.phone}`} 
                  className="flex items-center gap-4 bg-white border-2 border-gray-100 p-4 md:p-6 rounded-2xl md:rounded-3xl hover:border-medical-blue transition-all group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-full flex items-center justify-center text-medical-blue group-hover:bg-medical-blue group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] md:text-sm font-bold text-gray-500 uppercase tracking-widest">Emergency Line</div>
                    <div className="text-lg md:text-2xl font-bold text-gray-900">{CLINIC_INFO.phone}</div>
                  </div>
                </a>
              </div>

              <div className="p-8 md:p-10 bg-gray-900 rounded-[2rem] md:rounded-[3rem] text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Clinic Info</h3>
                <div className="space-y-4 mb-8">
                  <p className="flex items-start gap-3 text-sm text-gray-400">
                    <MapPin className="text-medical-blue mt-1 shrink-0" size={18} />
                    {CLINIC_INFO.address}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Calendar className="text-medical-blue shrink-0" size={18} />
                    Open Mon-Sat, 8am - 7pm
                  </div>
                </div>
                <button className="w-full py-3 md:py-4 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-all border border-white/10 text-sm">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
