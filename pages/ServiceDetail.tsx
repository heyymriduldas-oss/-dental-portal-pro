
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { CheckCircle2, ArrowLeft, Calendar, HelpCircle, Phone } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      <section className="relative h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 w-full pb-20 relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium transition-colors">
            <ArrowLeft size={18} /> Back to All Services
          </Link>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">{service.title}</h1>
          <p className="text-xl text-white/80 max-w-2xl">{service.shortDescription}</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Procedure</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-8 bg-blue-50 rounded-3xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-medical-blue" />
                  Key Benefits
                </h3>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-700 font-medium italic">
                      <div className="w-1.5 h-1.5 rounded-full bg-medical-blue mt-2 shrink-0"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 bg-gray-50 rounded-3xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <HelpCircle className="text-medical-blue" />
                  What to Expect
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  During your initial consultation, we will perform a digital scan and discuss your goals. We'll provide a clear timeline and transparent cost estimate before any work begins.
                </p>
              </div>
            </div>

            {/* Before After Placeholder */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Clinical Results</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative">
                    <img src="https://picsum.photos/800/450?random=1" className="w-full h-full object-cover" alt="Before" />
                    <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur">Before</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative">
                    <img src="https://picsum.photos/800/450?random=2" className="w-full h-full object-cover" alt="After" />
                    <span className="absolute top-4 left-4 bg-medical-blue text-white px-3 py-1 rounded-full text-xs font-bold uppercase">After Treatment</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 italic text-center">*Actual Lumina patient results. Results may vary based on clinical condition.</p>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl sticky top-28">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Book a Consultation</h3>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Take the first step toward your new smile. Our specialists are ready to discuss your options.
              </p>
              <div className="space-y-4">
                <Link to="/appointment" className="w-full bg-medical-blue text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                  <Calendar size={18} /> Schedule Now
                </Link>
                <a href="tel:5551234567" className="w-full bg-white border-2 border-gray-100 text-gray-900 py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:border-medical-blue hover:text-medical-blue transition-all">
                  <Phone size={18} /> Call Us
                </a>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Insurance Accepted</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-8 bg-gray-50 rounded flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delta Dental</div>
                  <div className="h-8 bg-gray-50 rounded flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aetna</div>
                  <div className="h-8 bg-gray-50 rounded flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cigna</div>
                  <div className="h-8 bg-gray-50 rounded flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">MetLife</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
