
import React from 'react';
import { REVIEWS } from '../constants';
import { Star, Quote, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimonials: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-gray-50 py-24 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 font-poppins">Patient Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from people who have transformed their oral health at Lumina Dental.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {REVIEWS.map((review) => (
              <div 
                key={review.id} 
                className="break-inside-avoid bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all relative group"
              >
                <Quote size={40} className="absolute top-8 right-8 text-blue-50 opacity-10 group-hover:opacity-30 transition-opacity" />
                <div className="flex items-center gap-4 mb-6">
                  <img src={review.avatar} className="w-14 h-14 rounded-full border-2 border-white shadow-md" alt={review.author} />
                  <div>
                    <h4 className="font-bold text-gray-900 leading-none mb-1">{review.author}</h4>
                    <span className="text-xs text-medical-blue font-bold uppercase tracking-wider">{review.role}</span>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill={s <= review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed relative z-10">"{review.comment}"</p>
              </div>
            ))}
            {/* Extended list simulation */}
            {[4,5,6,7].map(i => (
              <div 
                key={i} 
                className="break-inside-avoid bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all relative"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-14 h-14 rounded-full border-2 border-white shadow-md" alt="Patient" />
                  <div>
                    <h4 className="font-bold text-gray-900 leading-none mb-1">Patient #{i}00</h4>
                    <span className="text-xs text-medical-blue font-bold uppercase tracking-wider">Local Resident</span>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 italic leading-relaxed">"The technology here is truly cutting-edge. I never thought I'd say I enjoyed a dental visit, but Lumina made it possible."</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center bg-gray-50 p-12 rounded-[3rem] border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join 10,000+ happy smiles.</h2>
            <Link to="/appointment" className="inline-flex items-center gap-2 bg-medical-blue text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 transition-all">
              <Calendar size={22} /> Start Your Transformation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
