
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, Mail, MapPin, ChevronRight, Instagram, Facebook, Linkedin, User } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { CLINIC_INFO } from './constants';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Hide header on admin pages
  if (pathname.startsWith('/admin')) return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-medical-blue text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-medium">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone size={14} /> {CLINIC_INFO.phone}</span>
            <span className="flex items-center gap-2"><Mail size={14} /> {CLINIC_INFO.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-blue-200 transition-colors flex items-center gap-2">
              <User size={14} /> Staff Login
            </Link>
          </div>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <div>
            <span className="text-xl font-bold font-poppins text-gray-900 block leading-none">LUMINA</span>
            <span className="text-[10px] tracking-widest text-medical-blue font-bold uppercase">Dental Clinic</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-semibold transition-colors hover:text-medical-blue ${pathname === link.path ? 'text-medical-blue' : 'text-gray-600'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-600 hover:text-medical-blue transition-colors font-bold text-sm">
              Login
            </Link>
            <Link 
              to="/appointment"
              className="bg-medical-blue text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Calendar size={18} />
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t absolute top-full left-0 w-full shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium p-2 text-gray-700"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium p-2 text-medical-blue font-bold"
            >
              Patient Login
            </Link>
            <Link 
              to="/appointment"
              onClick={() => setIsOpen(false)}
              className="bg-medical-blue text-white text-center py-4 rounded-xl font-bold mt-2"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin') || pathname === '/login') return null;

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-bold font-poppins">LUMINA</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Providing premium dental care for families and professionals. We combine modern technology with a patient-first approach to ensure every visit is comfortable and effective.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-medical-blue transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-medical-blue transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-medical-blue transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Our Services</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/services/cosmetic" className="hover:text-white transition-colors">Cosmetic Dentistry</Link></li>
            <li><Link to="/services/orthodontics" className="hover:text-white transition-colors">Orthodontics</Link></li>
            <li><Link to="/services/pediatric" className="hover:text-white transition-colors">Pediatric Dentistry</Link></li>
            <li><Link to="/services/implants" className="hover:text-white transition-colors">Dental Implants</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">View All Services</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex gap-3"><MapPin size={18} className="text-medical-blue shrink-0" /> {CLINIC_INFO.address}</li>
            <li className="flex gap-3"><Phone size={18} className="text-medical-blue shrink-0" /> {CLINIC_INFO.phone}</li>
            <li className="flex gap-3"><Mail size={18} className="text-medical-blue shrink-0" /> {CLINIC_INFO.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Working Hours</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            {CLINIC_INFO.hours.map((item, idx) => (
              <li key={idx} className="flex justify-between border-b border-gray-800 pb-2">
                <span>{item.day}</span>
                <span className="text-white">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Lumina Dental Clinic. All rights reserved. | <a href="#" className="hover:underline">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
