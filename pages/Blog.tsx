
import React from 'react';
import { BLOG_POSTS } from '../constants';
import { ArrowRight, Search, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-gray-50 py-24 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 font-poppins">Oral Health Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest tips, research, and news in the world of dentistry.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/3 space-y-16">
              {BLOG_POSTS.map((post) => (
                <article key={post.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[21/9] overflow-hidden">
                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                  </div>
                  <div className="p-10">
                    <div className="flex items-center gap-6 text-sm font-bold mb-6">
                      <span className="bg-blue-50 text-medical-blue px-3 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                      <span className="flex items-center gap-1.5 text-gray-400"><Calendar size={16} /> {post.date}</span>
                      <span className="flex items-center gap-1.5 text-gray-400"><User size={16} /> By Lumina Team</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-medical-blue transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {post.excerpt}
                    </p>
                    <Link to="/blog" className="inline-flex items-center gap-2 font-bold text-medical-blue hover:gap-4 transition-all">
                      Read Full Article <ArrowRight size={20} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <aside className="lg:w-1/3 space-y-10">
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Search Articles</h3>
                <div className="relative">
                  <input type="text" placeholder="Search topics..." className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 focus:border-medical-blue outline-none transition-all" />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Categories</h3>
                <ul className="space-y-4">
                  {['Oral Care', 'Cosmetic', 'Orthodontics', 'Pediatric', 'Prevention'].map(cat => (
                    <li key={cat}>
                      <button className="w-full flex justify-between items-center text-gray-600 hover:text-medical-blue font-medium group transition-colors">
                        {cat}
                        <span className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-blue-50 text-xs flex items-center justify-center font-bold">12</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-10 bg-medical-blue rounded-[3rem] text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">Subscribe to Newsletter</h3>
                <p className="text-blue-100 text-sm mb-8 relative z-10">
                  Get monthly tips and exclusive clinic offers directly to your inbox.
                </p>
                <input type="email" placeholder="Your Email" className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 mb-4 focus:bg-white/20 outline-none transition-all" />
                <button className="w-full bg-white text-medical-blue py-4 rounded-xl font-bold hover:scale-105 transition-all">
                  Join the List
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
