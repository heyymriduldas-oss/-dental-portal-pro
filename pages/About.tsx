
import React from 'react';
import { ShieldCheck, Heart, Award, Zap, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <section className="bg-gray-50 py-24 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">About Our Clinic</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Leading the way in modern dentistry with a commitment to clinical excellence and a compassionate, patient-first philosophy.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-bold border border-teal-100 uppercase tracking-widest">
              Our Philosophy
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              We treat patients, not just teeth.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Lumina Dental, we understand that visiting the dentist can be an anxious experience for many. That's why we've redesigned the entire patient journey to prioritize your comfort, clarity, and convenience.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: 'Excellence', desc: 'Continuous education and latest technology.', icon: <Award className="text-medical-blue" /> },
                { title: 'Compassion', desc: 'Gentle care tailored to your comfort.', icon: <Heart className="text-medical-blue" /> },
                { title: 'Integrity', desc: 'Transparent pricing and honest advice.', icon: <ShieldCheck className="text-medical-blue" /> },
                { title: 'Innovation', desc: 'Pain-free digital dentistry tools.', icon: <Zap className="text-medical-blue" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <img 
               src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" 
               className="rounded-[3rem] shadow-2xl" 
               alt="Dentist Working"
             />
             <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
               <div className="text-4xl font-bold text-medical-blue mb-1">15+</div>
               <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Years of Service</div>
             </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Meet Our Specialists</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team consists of board-certified specialists who are leaders in their respective dental fields.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                name: 'Dr. Emily Chen', 
                role: 'Senior Cosmetic Dentist', 
                bio: 'Specializing in smile design and minimally invasive veneers with over 12 years of clinical experience.',
                img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600'
              },
              { 
                name: 'Dr. Michael Vance', 
                role: 'Orthodontic Surgeon', 
                bio: 'A Diamond Plus Invisalign provider dedicated to creating perfect functional bites for teens and adults.',
                img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600'
              },
              { 
                name: 'Dr. Sarah Smith', 
                role: 'Pediatric Specialist', 
                bio: 'Passionate about child psychology and preventative dentistry to ensure children love coming to the dentist.',
                img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=600'
              },
            ].map((doc, idx) => (
              <div key={idx} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={doc.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={doc.name} />
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">{doc.name}</h4>
                  <p className="text-medical-blue font-bold text-sm uppercase tracking-widest mb-4">{doc.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{doc.bio}</p>
                  <Link to="/appointment" className="text-sm font-bold flex items-center gap-2 text-gray-900 hover:text-medical-blue transition-colors">
                    Book with {doc.name.split(' ')[1]} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-12">Proud Member of Professional Bodies</h4>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             {/* Replace with actual logo placeholders if available */}
             <div className="text-2xl font-bold text-gray-500">American Dental Association</div>
             <div className="text-2xl font-bold text-gray-500">AACD Accredited</div>
             <div className="text-2xl font-bold text-gray-500">Invisalign Diamond</div>
             <div className="text-2xl font-bold text-gray-500">ISO 9001 Medical</div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-medical-blue text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">Ready to experience the Lumina difference?</h2>
          <Link to="/appointment" className="bg-white text-medical-blue px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 transition-all flex items-center gap-2">
            <Calendar size={20} /> Schedule Your Visit
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
