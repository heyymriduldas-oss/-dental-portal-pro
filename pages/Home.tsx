
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Clock, 
  ShieldCheck, 
  Star, 
  Activity,
  Calendar,
  ChevronRight,
  Phone
} from 'lucide-react';
import { SERVICES, REVIEWS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center bg-gray-50 overflow-hidden py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000" 
            alt="Dental Clinic Interior" 
            className="w-full h-full object-cover opacity-10 md:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/95 to-transparent"></div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 text-medical-blue rounded-full text-xs md:text-sm font-bold border border-blue-100">
              <ShieldCheck size={14} className="md:w-4 md:h-4" />
              <span>Ranked #1 Clinic in the Region</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
              Modern Dentistry for your <span className="text-medical-blue">Perfect Smile.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Experience premium dental care tailored to your unique needs. We combine advanced clinical technology with a compassionate touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/appointment" 
                className="bg-medical-blue text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Schedule Now
                <ArrowRight size={20} />
              </Link>
              <a 
                href="tel:5551234567" 
                className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-bold border-2 border-gray-100 hover:border-medical-blue hover:text-medical-blue transition-all flex items-center justify-center gap-2"
              >
                Call Clinic
              </a>
            </div>
            <div className="flex items-center gap-4 md:gap-6 pt-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white" alt="Patient" />
                ))}
              </div>
              <div className="text-xs md:text-sm font-medium text-gray-600">
                <div className="flex text-yellow-400 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="currentColor" />)}
                </div>
                <span>Trusted by 10k+ patients</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000" 
                alt="Smiling Patient" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-bounce-slow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Activity />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 leading-none">Healthy Results</h4>
                  <span className="text-xs text-gray-500">Updated 2 mins ago</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium italic">"The most gentle dental experience I've ever had."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Experience', value: '15+', icon: <ShieldCheck className="text-medical-blue" /> },
              { label: 'Patients', value: '10k+', icon: <Users className="text-medical-blue" /> },
              { label: 'Awards', value: '24', icon: <Star className="text-medical-blue" /> },
              { label: 'Care Team', value: '18+', icon: <Activity className="text-medical-blue" /> }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 md:p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  {/* Fixed: Use React.ReactElement<any> to avoid TypeScript error with unknown props */}
                  {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <h4 className="text-medical-blue font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4">Our Specialties</h4>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Complete Oral Care Solutions <br className="hidden md:block" /> for Your Entire Family.
              </h2>
            </div>
            <Link to="/services" className="flex items-center gap-2 text-medical-blue font-bold hover:gap-4 transition-all pb-2 border-b-2 border-medical-blue">
              View All Services
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SERVICES.map((service) => (
              <Link 
                to={`/services/${service.id}`} 
                key={service.id}
                className="group bg-white rounded-3xl p-6 md:p-8 border border-gray-100 hover:shadow-2xl hover:shadow-blue-100/50 transition-all flex flex-col h-full"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-50 text-medical-blue flex items-center justify-center mb-6 md:mb-8 group-hover:bg-medical-blue group-hover:text-white transition-colors">
                  {/* Fixed: Use React.ReactElement<any> to avoid TypeScript error with unknown props */}
                  {React.cloneElement(service.icon as React.ReactElement<any>, { size: 24 })}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 flex-grow leading-relaxed">
                  {service.shortDescription}
                </p>
                <div className="flex items-center gap-2 text-medical-blue font-bold text-sm md:text-base group-hover:gap-4 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Testimonials */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200" 
                alt="Clinic Professional" 
                className="relative z-10 rounded-3xl md:rounded-[3rem] shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 z-20 bg-medical-blue p-6 md:p-8 rounded-2xl md:rounded-3xl text-white shadow-xl">
                <div className="text-2xl md:text-3xl font-bold mb-1">99%</div>
                <div className="text-[10px] md:text-sm opacity-80 uppercase tracking-widest font-bold">Patient Satisfaction</div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h4 className="text-medical-blue font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4">Patient Stories</h4>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-10 leading-tight">
                What Our Patients Say About Lumina Experience.
              </h2>
              <div className="space-y-6 md:space-y-8">
                {REVIEWS.slice(0, 2).map((review) => (
                  <div key={review.id} className="p-6 md:p-8 bg-gray-50 rounded-2xl md:rounded-3xl relative">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                      <img src={review.avatar} className="w-10 h-10 md:w-14 md:h-14 rounded-full" alt={review.author} />
                      <div>
                        <h4 className="text-sm md:text-base font-bold text-gray-900">{review.author}</h4>
                        <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-bold">{review.role}</span>
                      </div>
                      <div className="ml-auto flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 italic leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
              </div>
              <Link to="/testimonials" className="mt-8 inline-flex items-center gap-2 font-bold text-medical-blue hover:underline">
                Read More Reviews <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-medical-blue rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 relative overflow-hidden flex flex-col items-center text-center text-white">
            <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 max-w-4xl relative z-10 leading-tight">
              Ready to restore your dental health and confidence?
            </h2>
            <p className="text-base md:text-xl text-blue-100 mb-8 md:mb-12 max-w-2xl relative z-10 leading-relaxed">
              New patients receive a comprehensive consultation and digital X-rays for only $99.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 relative z-10 w-full sm:w-auto">
              <Link 
                to="/appointment" 
                className="bg-white text-medical-blue px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl text-lg md:text-xl font-bold hover:bg-blue-50 transition-all shadow-2xl flex items-center justify-center gap-3"
              >
                <Calendar size={20} />
                Book Your Visit
              </Link>
              <a 
                href="tel:5551234567" 
                className="bg-blue-600/30 text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl text-lg md:text-xl font-bold backdrop-blur-md hover:bg-blue-600/50 transition-all flex items-center justify-center gap-3"
              >
                <Phone size={20} />
                Call Clinic
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
