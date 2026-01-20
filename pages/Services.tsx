
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-gray-50 py-24 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From routine checkups to complex aesthetic restorations, we provide a full spectrum of dental care under one roof.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto h-full overflow-hidden">
                    <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={service.title} />
                  </div>
                  <div className="p-10 flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-medical-blue flex items-center justify-center mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                      {service.shortDescription}
                    </p>
                    <Link 
                      to={`/services/${service.id}`} 
                      className="inline-flex items-center gap-2 font-bold text-medical-blue hover:gap-4 transition-all"
                    >
                      Explore Service Details <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Care Banner */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold">Don't see what you're looking for?</h2>
            <p className="text-xl text-gray-400">
              We offer several other specialized treatments including Root Canal Therapy, Wisdom Teeth Extractions, and Periodontal Care. Contact us for a full list of available treatments.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link to="/contact" className="bg-medical-blue text-white py-5 rounded-2xl text-center font-bold text-lg hover:bg-blue-600 transition-colors">
              Contact Clinical Team
            </Link>
            <Link to="/appointment" className="bg-white text-gray-900 py-5 rounded-2xl text-center font-bold text-lg hover:bg-gray-100 transition-colors">
              Book General Checkup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
