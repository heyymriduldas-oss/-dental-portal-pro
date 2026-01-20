
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Search, 
  Bell, 
  Settings, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  LogOut, 
  Phone, 
  Check, 
  PhoneCall, 
  Loader2, 
  Menu,
  X,
  UserPlus,
  Filter,
  MoreHorizontal,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  Mail,
  Smartphone,
  Globe,
  Lock,
  Database,
  History,
  Trash2,
  Share2,
  ExternalLink,
  CreditCard
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Appointment } from '../types';

type DashboardView = 'appointments' | 'pending' | 'patients' | 'analytics' | 'settings';
type SettingsTab = 'general' | 'team' | 'scheduling' | 'notifications' | 'security' | 'integrations';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<DashboardView>('appointments');
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTab>('general');
  const [calling, setCalling] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [exporting, setExporting] = useState(false);
  
  // State for appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patient: 'Sarah Johnson', phone: '+1 555-123-0001', type: 'Checkup', time: '09:00 AM', status: 'Confirmed', doctor: 'Dr. Chen' },
    { id: 2, patient: 'Michael Brown', phone: '+1 555-123-0002', type: 'Root Canal', time: '10:30 AM', status: 'Pending', doctor: 'Dr. Vance' },
    { id: 3, patient: 'Emily Davis', phone: '+1 555-123-0003', type: 'Cleaning', time: '11:15 AM', status: 'Confirmed', doctor: 'Dr. Smith' },
    { id: 4, patient: 'James Wilson', phone: '+1 555-123-0004', type: 'Emergency', time: '01:00 PM', status: 'Cancelled', doctor: 'Dr. Chen' },
    { id: 5, patient: 'Linda Garcia', phone: '+1 555-123-0005', type: 'Invisalign', time: '02:30 PM', status: 'Pending', doctor: 'Dr. Vance' },
  ]);

  // Mock Audit Logs
  const auditLogs = [
    { id: 1, action: 'Login Success', user: 'Admin', time: '2 mins ago', ip: '192.168.1.45' },
    { id: 2, action: 'Appointment Confirmed', user: 'Receptionist', time: '15 mins ago', target: 'Sarah Johnson' },
    { id: 3, action: 'Settings Updated', user: 'Admin', time: '1 hr ago', target: 'Scheduling Rules' },
    { id: 4, action: 'Data Export Started', user: 'Admin', time: '3 hrs ago', status: 'Completed' },
  ];

  // Form state for new appointment
  const [newApt, setNewApt] = useState({
    patient: '',
    phone: '',
    type: 'Checkup',
    doctor: 'Dr. Chen',
    time: '09:00 AM'
  });

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const id = appointments.length + 1;
    setAppointments([{ ...newApt, id, status: 'Pending' }, ...appointments]);
    setIsModalOpen(false);
    setNewApt({ patient: '', phone: '', type: 'Checkup', doctor: 'Dr. Chen', time: '09:00 AM' });
    setActiveView('appointments');
  };

  const approveAppointment = (id: number) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: 'Confirmed' } : apt
    ));
  };

  const cancelAppointment = (id: number) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: 'Cancelled' } : apt
    ));
  };

  const initiateCall = (patient: string) => {
    setCalling(patient);
    setTimeout(() => setCalling(null), 3000);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  // Filtered data based on active view and search
  const filteredData = useMemo(() => {
    let data = [...appointments];
    
    if (activeView === 'pending') {
      data = data.filter(a => a.status === 'Pending');
    } else if (activeView === 'patients') {
      const uniquePatients = new Map();
      data.forEach(a => {
        if (!uniquePatients.has(a.patient)) {
          uniquePatients.set(a.patient, a);
        }
      });
      data = Array.from(uniquePatients.values());
    }

    if (searchQuery) {
      data = data.filter(a => 
        a.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return data;
  }, [appointments, activeView, searchQuery]);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Confirmed': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'Pending': return <Clock size={16} className="text-yellow-500" />;
      case 'Cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative font-inter selection:bg-blue-100 selection:text-medical-blue">
      {/* Call Overlay */}
      {calling && (
        <div className="fixed inset-0 z-[100] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] text-center space-y-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <PhoneCall size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Encrypted Line</h2>
              <p className="text-medical-blue font-bold text-lg mt-1">{calling}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Loader2 className="animate-spin" size={14} />
              Connecting secure HIPAA line...
            </div>
            <button onClick={() => setCalling(null)} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all">
              Disconnect Call
            </button>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-medical-blue rounded-xl flex items-center justify-center text-white">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Clinical Admission</h2>
                  <p className="text-xs text-gray-500 font-medium tracking-tight">Staff Priority Booking System</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleAddAppointment} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Patient Name</label>
                  <input required type="text" value={newApt.patient} onChange={e => setNewApt({...newApt, patient: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all" placeholder="Legal full name" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Primary Mobile</label>
                  <input required type="tel" value={newApt.phone} onChange={e => setNewApt({...newApt, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all" placeholder="555-000-0000" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Slot Start Time</label>
                  <input required type="text" value={newApt.time} onChange={e => setNewApt({...newApt, time: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all" placeholder="09:00 AM" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Procedure</label>
                  <select value={newApt.type} onChange={e => setNewApt({...newApt, type: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all">
                    <option>Checkup & Clean</option>
                    <option>Deep Cleaning</option>
                    <option>Root Canal Therapy</option>
                    <option>Cosmetic Bonding</option>
                    <option>Emergency Triage</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assigned Dentist</label>
                  <select value={newApt.doctor} onChange={e => setNewApt({...newApt, doctor: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all">
                    <option>Dr. Emily Chen</option>
                    <option>Dr. Michael Vance</option>
                    <option>Dr. Sarah Smith</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-medical-blue text-white rounded-2xl font-bold shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
                Finalize & Book Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8 border-b border-gray-50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-medical-blue rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">L</div>
            <div>
              <span className="text-lg font-bold text-gray-900 tracking-tighter block leading-none">LUMINA</span>
              <span className="text-[9px] font-black text-medical-blue uppercase tracking-widest">Medical Staff</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-6 space-y-1.5 mt-4">
          <button 
            onClick={() => setActiveView('appointments')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${
              activeView === 'appointments' ? 'bg-medical-blue text-white shadow-xl shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Calendar size={18} /> Operation Queue
          </button>
          <button 
            onClick={() => setActiveView('pending')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${
              activeView === 'pending' ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Clock size={18} /> Priority Review
          </button>
          <button 
            onClick={() => setActiveView('patients')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${
              activeView === 'patients' ? 'bg-blue-50 text-medical-blue' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Users size={18} /> Patient Index
          </button>
          <div className="pt-10 pb-4">
             <span className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Clinical Reports</span>
          </div>
          <button 
            onClick={() => setActiveView('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${
              activeView === 'analytics' ? 'bg-medical-blue text-white shadow-xl shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <BarChart3 size={18} /> Clinic Analytics
          </button>
          <button 
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all text-sm ${
              activeView === 'settings' ? 'bg-medical-blue text-white shadow-xl shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Settings size={18} /> Admin Controls
          </button>
        </nav>
        <div className="p-6 border-t border-gray-50">
          <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-all text-sm group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> Exit Dashboard
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-gray-50/50">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-6 flex-1">
            <button className="lg:hidden p-2 text-gray-500"><Menu size={20} /></button>
            <div className="relative w-full max-w-xl hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Find patients, records, or procedures..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:bg-white outline-none transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-8 ml-4">
            <div className="flex items-center gap-2">
               <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200"></span>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Clinic Live</span>
            </div>
            <button className="p-2.5 text-gray-400 hover:text-medical-blue hover:bg-blue-50 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="flex items-center gap-4 border-l pl-8 border-gray-100">
              <div className="text-right hidden xl:block">
                <p className="text-sm font-black text-gray-900 leading-none">Admin Terminal</p>
                <p className="text-[10px] text-medical-blue font-bold uppercase tracking-widest mt-1">Full Access</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gray-100 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=staff" className="w-full h-full object-cover" alt="Staff" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-black text-gray-900 font-poppins capitalize tracking-tight">
                {activeView.replace('_', ' ')}
              </h1>
              <p className="text-gray-400 text-sm font-medium mt-1">Operational view for Lumina Dental Clinic.</p>
            </div>
            {activeView !== 'settings' && activeView !== 'analytics' && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-medical-blue text-white px-8 py-4 rounded-[1.25rem] font-bold shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={22} /> New Patient Entry
              </button>
            )}
          </div>

          {/* Quick Stats Grid (Functional Filters) */}
          {(activeView === 'appointments' || activeView === 'pending' || activeView === 'patients') && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
              <button 
                onClick={() => setActiveView('patients')}
                className={`p-8 rounded-[2.5rem] border transition-all text-left group overflow-hidden relative ${
                  activeView === 'patients' ? 'bg-white border-medical-blue shadow-2xl shadow-blue-100' : 'bg-white border-gray-100 hover:border-medical-blue/30'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${activeView === 'patients' ? 'bg-medical-blue text-white shadow-lg shadow-blue-100' : 'bg-blue-50 text-medical-blue group-hover:bg-medical-blue group-hover:text-white'}`}>
                  <Users size={28} />
                </div>
                <div className="text-4xl font-black text-gray-900 tracking-tight">{new Set(appointments.map(a => a.patient)).size}</div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-[0.15em] mt-1.5">Registered Patients</div>
                <Users className="absolute -bottom-4 -right-4 text-gray-50 opacity-10 group-hover:scale-150 transition-transform" size={100} />
              </button>
              
              <button 
                onClick={() => setActiveView('appointments')}
                className={`p-8 rounded-[2.5rem] border transition-all text-left group overflow-hidden relative ${
                  activeView === 'appointments' ? 'bg-white border-medical-blue shadow-2xl shadow-blue-100' : 'bg-white border-gray-100 hover:border-medical-blue/30'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${activeView === 'appointments' ? 'bg-medical-blue text-white shadow-lg shadow-blue-100' : 'bg-teal-50 text-teal-600 group-hover:bg-medical-blue group-hover:text-white'}`}>
                  <Calendar size={28} />
                </div>
                <div className="text-4xl font-black text-gray-900 tracking-tight">{appointments.filter(a => a.status !== 'Cancelled').length}</div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-[0.15em] mt-1.5">Scheduled Queue</div>
                <Calendar className="absolute -bottom-4 -right-4 text-gray-50 opacity-10 group-hover:scale-150 transition-transform" size={100} />
              </button>

              <button 
                onClick={() => setActiveView('pending')}
                className={`p-8 rounded-[2.5rem] border transition-all text-left group overflow-hidden relative ${
                  activeView === 'pending' ? 'bg-white border-orange-400 shadow-2xl shadow-orange-50' : 'bg-white border-gray-100 hover:border-orange-400/30'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${activeView === 'pending' ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' : 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'}`}>
                  <Clock size={28} />
                </div>
                <div className="text-4xl font-black text-gray-900 tracking-tight">{appointments.filter(a => a.status === 'Pending').length}</div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-[0.15em] mt-1.5">Pending Approval</div>
                <Clock className="absolute -bottom-4 -right-4 text-gray-50 opacity-10 group-hover:scale-150 transition-transform" size={100} />
              </button>
            </div>
          )}

          {/* VIEW: MAIN TABLE (Appointments/Patients/Pending) */}
          {(activeView === 'appointments' || activeView === 'pending' || activeView === 'patients') && (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
              <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center bg-gray-50/20 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm"><Filter size={18} /></div>
                  <h3 className="font-black text-gray-900 text-lg">
                    {activeView === 'patients' ? 'Global Patient Directory' : 'Daily Operations Queue'}
                  </h3>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 transition-all text-xs font-bold text-gray-600">
                    {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} 
                    Export Data
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 transition-all text-xs font-bold text-gray-600">
                    <History size={16} /> Audit History
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                {filteredData.length > 0 ? (
                  <table className="w-full text-left min-w-[900px]">
                    <thead>
                      <tr className="text-[11px] text-gray-400 uppercase tracking-[0.15em] font-black border-b border-gray-50 bg-gray-50/30">
                        <th className="px-10 py-6">Patient Identification</th>
                        {activeView !== 'patients' && <th className="px-10 py-6">Procedure Type</th>}
                        {activeView !== 'patients' && <th className="px-10 py-6">Schedule</th>}
                        {activeView !== 'patients' && <th className="px-10 py-6">Current Status</th>}
                        <th className="px-10 py-6 text-right">Clinical Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredData.map((apt) => (
                        <tr key={apt.id} className="hover:bg-blue-50/20 transition-all group cursor-pointer">
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 rounded-2xl bg-medical-blue/5 text-medical-blue flex items-center justify-center text-sm font-black border-2 border-white shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                {apt.patient.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="min-w-0">
                                <div className="text-base font-black text-gray-900 group-hover:text-medical-blue transition-colors">{apt.patient}</div>
                                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-1.5 mt-1">
                                  <Phone size={12} className="text-medical-blue/50" /> {apt.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          {activeView !== 'patients' && (
                            <td className="px-10 py-6">
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-black px-3 py-1 bg-white border border-gray-100 rounded-lg text-gray-700 w-fit shadow-sm">{apt.type}</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight ml-1">Dr. {apt.doctor.split(' ')[1]}</span>
                              </div>
                            </td>
                          )}
                          {activeView !== 'patients' && (
                            <td className="px-10 py-6">
                              <div className="text-sm font-black text-gray-700 font-mono tracking-tighter">{apt.time}</div>
                              <div className="text-[10px] text-green-500 font-black uppercase tracking-widest mt-0.5">Today</div>
                            </td>
                          )}
                          {activeView !== 'patients' && (
                            <td className="px-10 py-6">
                              <div className="flex items-center gap-2.5">
                                {getStatusIcon(apt.status)}
                                <span className={`text-[11px] font-black uppercase tracking-widest ${
                                  apt.status === 'Confirmed' ? 'text-green-500' : 
                                  apt.status === 'Pending' ? 'text-orange-500' : 'text-red-500'
                                }`}>{apt.status}</span>
                              </div>
                            </td>
                          )}
                          <td className="px-10 py-6">
                            <div className="flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={(e) => { e.stopPropagation(); initiateCall(apt.patient); }}
                                className="w-11 h-11 rounded-2xl bg-white text-medical-blue flex items-center justify-center hover:bg-medical-blue hover:text-white transition-all shadow-sm border border-gray-100"
                                title="Contact Patient"
                              >
                                <Phone size={18} />
                              </button>
                              {apt.status === 'Pending' && (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); approveAppointment(apt.id); }}
                                  className="w-11 h-11 rounded-2xl bg-white text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all border border-gray-100 shadow-sm"
                                  title="Confirm Admission"
                                >
                                  <Check size={18} />
                                </button>
                              )}
                              <button className="w-11 h-11 rounded-2xl bg-white text-gray-400 flex items-center justify-center hover:bg-white hover:border-gray-300 transition-all border border-gray-100 shadow-sm">
                                <MoreHorizontal size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-48 space-y-6">
                    <div className="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-100">
                      <Search size={64} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-black text-gray-900 text-2xl tracking-tight">Zero matches found</h4>
                      <p className="text-gray-400 max-w-sm mx-auto mt-2">Try expanding your search parameters or checking the archived records.</p>
                      <button onClick={() => setSearchQuery('')} className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:scale-105 transition-all">Reset All Filters</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: ANALYTICS (Functional Metrics Engine) */}
          {activeView === 'analytics' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Analytics Header Controls */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col xl:flex-row justify-between items-center gap-8">
                <div className="flex flex-wrap items-center gap-6 w-full xl:w-auto">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Reporting Period</label>
                    <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                      {['Daily', 'Monthly', 'Annual'].map(p => (
                        <button key={p} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${p === 'Monthly' ? 'bg-white text-medical-blue shadow-sm shadow-blue-50' : 'text-gray-400 hover:text-gray-600'}`}>{p}</button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Clinical Filtering</label>
                    <select className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 text-xs font-black appearance-none min-w-[200px] cursor-pointer">
                      <option>Consolidated (All Doctors)</option>
                      <option>Dr. Emily Chen</option>
                      <option>Dr. Michael Vance</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 w-full xl:w-auto">
                  <button onClick={handleExport} className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 text-white rounded-[1.25rem] font-bold text-sm hover:bg-black hover:-translate-y-1 transition-all shadow-xl shadow-gray-200">
                    {exporting ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />} Download Full Report (PDF)
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-10">
                {/* Main Visualization Column */}
                <div className="lg:col-span-2 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm group">
                      <div className="flex justify-between items-start mb-8">
                        <h4 className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">Clinical Capacity</h4>
                        <div className="w-10 h-10 bg-blue-50 text-medical-blue rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform"><Activity size={20} /></div>
                      </div>
                      <div className="flex items-end gap-3 mb-4">
                        <span className="text-5xl font-black text-gray-900 tracking-tighter">84.2%</span>
                        <span className="text-green-500 font-black text-sm mb-2 flex items-center gap-1"><TrendingUp size={16} /> +5.2%</span>
                      </div>
                      <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden border border-gray-100 p-0.5">
                        <div className="bg-gradient-to-r from-medical-blue to-blue-400 h-full rounded-full transition-all duration-1000" style={{ width: '84%' }}></div>
                      </div>
                      <div className="mt-8 flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                         <span>Efficiency Goal: 90%</span>
                         <span className="text-medical-blue">Optimal Range</span>
                      </div>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm group">
                      <div className="flex justify-between items-start mb-8">
                        <h4 className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">Patient Satisfaction</h4>
                        <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><CheckCircle2 size={20} /></div>
                      </div>
                      <div className="flex items-center gap-5">
                        <span className="text-5xl font-black text-gray-900 tracking-tighter">4.92</span>
                        <div className="flex flex-col">
                           <div className="text-yellow-400 flex gap-0.5">
                             {[1,2,3,4,5].map(i => <Plus key={i} size={14} fill="currentColor" stroke="none" />)}
                           </div>
                           <span className="text-[10px] text-gray-400 font-bold mt-1 uppercase">1.2k Verified Reviews</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-8 font-medium leading-relaxed italic border-l-2 border-gray-100 pl-4">"Highest rated dental clinic in the Tri-State area for Q1 2024."</p>
                    </div>
                  </div>

                  {/* Procedure Analysis Bar Chart (Visual) */}
                  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                      <div>
                        <h4 className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">Clinical Performance by Procedure</h4>
                        <p className="text-xs text-gray-400 font-medium mt-1">Comparing monthly volume vs previous quarter</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span> This Month</div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase"><span className="w-2.5 h-2.5 bg-gray-100 rounded-full"></span> Avg</div>
                      </div>
                    </div>
                    <div className="space-y-8">
                      {[
                        { label: 'Routine Checkups', val: 182, goal: 200, color: 'bg-blue-500', width: '91%' },
                        { label: 'Deep Cleanings', val: 145, goal: 150, color: 'bg-teal-400', width: '75%' },
                        { label: 'Orthodontic Slots', val: 92, goal: 100, color: 'bg-purple-500', width: '60%' },
                        { label: 'Restorative Cases', val: 54, goal: 60, color: 'bg-orange-400', width: '45%' },
                        { label: 'Emergency Triage', val: 38, goal: 40, color: 'bg-red-500', width: '30%' }
                      ].map((item, i) => (
                        <div key={i} className="group">
                          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-3 text-gray-500">
                             <span>{item.label}</span>
                             <span className="text-gray-900 font-mono">{item.val} / {item.goal}</span>
                          </div>
                          <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden border border-gray-100 p-0.5">
                             <div className={`${item.color} h-full rounded-full shadow-sm shadow-black/5 transition-all duration-1000`} style={{ width: item.width }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Secondary Data Sidebar */}
                <div className="space-y-10">
                   {/* Demographics Card */}
                   <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                      <div className="relative z-10">
                        <h4 className="text-gray-500 text-[11px] font-black uppercase tracking-[0.2em] mb-10">Patient Demographics</h4>
                        <div className="space-y-7">
                          {[
                            { label: 'Pediatric (0-16)', val: '22%', color: 'bg-blue-400' },
                            { label: 'Adults (17-55)', val: '64%', color: 'bg-medical-blue' },
                            { label: 'Seniors (55+)', val: '14%', color: 'bg-teal-400' }
                          ].map((d, i) => (
                            <div key={i} className="space-y-2">
                               <div className="flex justify-between text-xs font-bold">
                                 <span className="text-gray-400">{d.label}</span>
                                 <span>{d.val}</span>
                               </div>
                               <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                 <div className={`${d.color} h-full rounded-full transition-all duration-1000`} style={{ width: d.val }}></div>
                               </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-12 pt-8 border-t border-gray-800 flex justify-between items-center">
                           <div>
                             <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Returning Rate</p>
                             <p className="text-2xl font-black">78.5%</p>
                           </div>
                           <PieChart className="text-medical-blue opacity-50" size={40} />
                        </div>
                      </div>
                      <Globe className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-125 transition-transform duration-1000" size={200} />
                   </div>

                   {/* Marketing Performance */}
                   <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                      <h4 className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8">Marketing Attribution</h4>
                      <div className="space-y-6">
                        {[
                          { source: 'Website (Direct)', rate: '42%', leads: 145 },
                          { source: 'Google Search', rate: '28%', leads: 96 },
                          { source: 'Social Media', rate: '18%', leads: 62 },
                          { source: 'Referrals', rate: '12%', leads: 41 }
                        ].map((m, i) => (
                          <div key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-medical-blue flex items-center justify-center font-black text-[10px] group-hover:bg-medical-blue group-hover:text-white transition-all">{m.rate}</div>
                            <div className="flex-1">
                               <p className="text-xs font-black text-gray-800 leading-none">{m.source}</p>
                               <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{m.leads} Conversions</p>
                            </div>
                            <Share2 size={16} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                   </div>

                   {/* System Health */}
                   <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-center gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-medical-blue shadow-sm shadow-blue-100"><Shield size={22} /></div>
                      <div>
                         <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-0.5">Database Health</p>
                         <p className="text-sm font-black text-blue-900">Synchronized (Live)</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SETTINGS (Functional Management Suite) */}
          {activeView === 'settings' && (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden min-h-[700px] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-500">
              {/* Settings Nav Sidebar */}
              <aside className="w-full md:w-80 border-r border-gray-100 bg-gray-50/20 p-8 space-y-2">
                <div className="px-4 mb-8">
                   <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Management Suite</h4>
                </div>
                {[
                  { id: 'general', label: 'Clinic Profile', icon: <Globe size={18} /> },
                  { id: 'team', label: 'Staff Roster', icon: <Users size={18} /> },
                  { id: 'scheduling', label: 'Operation Rules', icon: <Calendar size={18} /> },
                  { id: 'notifications', label: 'Patient Comms', icon: <Mail size={18} /> },
                  { id: 'security', label: 'Security & Logs', icon: <Lock size={18} /> },
                  { id: 'integrations', label: 'Integrations', icon: <Smartphone size={18} /> }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveSettingsTab(tab.id as SettingsTab)} 
                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-black transition-all ${
                      activeSettingsTab === tab.id ? 'bg-white text-medical-blue shadow-xl shadow-blue-50 border border-gray-100' : 'text-gray-500 hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
                
                <div className="pt-16 mt-16 border-t border-gray-100 space-y-3 px-4">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">System Utilities</p>
                  <button className="w-full flex items-center gap-3 py-2 text-xs font-black text-gray-400 hover:text-medical-blue transition-all group">
                    <Database size={16} className="group-hover:scale-110 transition-transform" /> Full Backup (DB)
                  </button>
                  <button className="w-full flex items-center gap-3 py-2 text-xs font-black text-red-400 hover:text-red-600 transition-all group">
                    <Trash2 size={16} className="group-hover:rotate-12 transition-transform" /> Purge Cache
                  </button>
                </div>
              </aside>

              {/* Settings Content Terminal */}
              <div className="flex-1 p-10 md:p-16 overflow-y-auto max-h-[800px] bg-white">
                {activeSettingsTab === 'general' && (
                  <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Facility Identity</h3>
                        <p className="text-sm text-gray-400 font-medium mt-1">Configure your clinic's public-facing metadata.</p>
                      </div>
                      <div className="w-20 h-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-medical-blue hover:text-medical-blue transition-all cursor-pointer">
                        <Plus size={24} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-2 col-span-2 xl:col-span-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Clinic Operating Name</label>
                        <input type="text" defaultValue="Lumina Dental Clinic HQ" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all font-bold" />
                      </div>
                      <div className="space-y-2 col-span-2 xl:col-span-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Support Email</label>
                        <input type="email" defaultValue="clinical-hq@luminadental.com" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all font-bold" />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Physical Facility Address</label>
                        <textarea defaultValue="123 Medical Plaza, Suite 400, New York, NY 10001" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all resize-none h-32 font-bold"></textarea>
                      </div>
                    </div>
                    <div className="pt-8">
                      <button className="bg-medical-blue text-white px-12 py-5 rounded-[1.25rem] font-black shadow-2xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all text-sm">
                        Update System Profile
                      </button>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'security' && (
                  <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
                    <div>
                      <h3 className="text-3xl font-black text-gray-900 tracking-tight">Security & Governance</h3>
                      <p className="text-sm text-gray-400 font-medium mt-1">Audit logs and access control protocols.</p>
                    </div>

                    <div className="p-10 bg-red-50 rounded-[3rem] border border-red-100 flex flex-col xl:flex-row items-center gap-10">
                      <div className="w-20 h-20 bg-red-500 text-white rounded-[1.75rem] flex items-center justify-center shrink-0 shadow-2xl shadow-red-100">
                        <Lock size={32} />
                      </div>
                      <div className="flex-1 text-center xl:text-left">
                        <h4 className="text-xl font-black text-red-900 mb-2">Two-Factor Enforcement Required</h4>
                        <p className="text-sm text-red-700/80 leading-relaxed max-w-2xl">Compliance audit detected 2 active staff sessions without multi-factor authentication. Update your clinical security policy to maintain HIPAA compliance.</p>
                      </div>
                      <button className="w-full xl:w-auto px-10 py-4 bg-red-600 text-white rounded-2xl font-black text-xs hover:bg-red-700 hover:scale-105 transition-all shadow-xl shadow-red-200">Enforce Global 2FA</button>
                    </div>

                    <div className="space-y-6">
                       <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Live Audit Feed</h5>
                       <div className="bg-gray-50 rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                          <table className="w-full text-left">
                             <thead>
                                <tr className="text-[10px] font-black text-gray-300 uppercase tracking-widest border-b border-gray-100">
                                   <th className="px-8 py-4">Action</th>
                                   <th className="px-8 py-4">User</th>
                                   <th className="px-8 py-4">Timestamp</th>
                                   <th className="px-8 py-4 text-right">Details</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-gray-100/50">
                                {auditLogs.map(log => (
                                   <tr key={log.id} className="text-xs hover:bg-white transition-colors">
                                      <td className="px-8 py-4 font-black text-gray-800">{log.action}</td>
                                      <td className="px-8 py-4 text-gray-500 font-bold">{log.user}</td>
                                      <td className="px-8 py-4 text-gray-400">{log.time}</td>
                                      <td className="px-8 py-4 text-right"><span className="text-[10px] font-black text-medical-blue bg-blue-50 px-2.5 py-1 rounded-md">{log.ip || log.target}</span></td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                          <button className="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-white hover:text-medical-blue transition-all">Download Full 90-Day Audit Log</button>
                       </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'integrations' && (
                   <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
                      <div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Ecosystem Bridge</h3>
                        <p className="text-sm text-gray-400 font-medium mt-1">Connect Lumina with third-party clinical and marketing tools.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {[
                           { name: 'Twilio SMS Gateway', desc: 'Patient reminders & SMS triage', active: true, icon: <Smartphone className="text-red-500" /> },
                           { name: 'Google Calendar Sync', desc: 'Sync staff schedules in real-time', active: true, icon: <Calendar className="text-blue-500" /> },
                           { name: 'SendGrid Email', desc: 'Marketing and automated follow-ups', active: false, icon: <Mail className="text-blue-400" /> },
                           { name: 'Stripe Payments', desc: 'Process deposits and copays', active: false, icon: <CreditCard className="text-purple-500" /> },
                           { name: 'WhatsApp Business', desc: 'Direct encrypted patient comms', active: false, icon: <Phone className="text-green-500" /> },
                           { name: 'Audit Hub API', desc: 'Connect with external compliance tools', active: true, icon: <Database className="text-gray-500" /> }
                         ].map((item, i) => (
                           <div key={i} className={`p-8 rounded-[2.5rem] border transition-all relative group ${item.active ? 'bg-white border-medical-blue shadow-xl shadow-blue-50' : 'bg-gray-50/50 border-gray-100 grayscale hover:grayscale-0'}`}>
                              <div className="flex justify-between items-start mb-6">
                                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm ${item.active ? 'bg-blue-50' : 'bg-gray-100'}`}>
                                    {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                                 </div>
                                 <div className={`w-14 h-7 rounded-full relative transition-all cursor-pointer shadow-inner ${item.active ? 'bg-medical-blue' : 'bg-gray-300'}`}>
                                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${item.active ? 'left-8' : 'left-1'}`}></div>
                                 </div>
                              </div>
                              <h5 className="text-base font-black text-gray-900 mb-1">{item.name}</h5>
                              <p className="text-xs text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                              {item.active ? (
                                <button className="mt-8 flex items-center gap-2 text-[10px] font-black text-medical-blue uppercase tracking-widest hover:underline">
                                  Configure Keys <ExternalLink size={12} />
                                </button>
                              ) : (
                                <button className="mt-8 flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-medical-blue">
                                  Connect App
                                </button>
                              )}
                           </div>
                         ))}
                      </div>
                   </div>
                )}

                {/* Default placeholder for other tabs */}
                {['team', 'scheduling', 'notifications'].includes(activeSettingsTab) && (
                   <div className="flex flex-col items-center justify-center py-40 text-center animate-in fade-in duration-500">
                      <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-200 mb-8 border-2 border-dashed border-gray-100">
                        <Settings size={40} className="animate-spin-slow" />
                      </div>
                      <h4 className="text-2xl font-black text-gray-900 tracking-tight capitalize">{activeSettingsTab.replace('_', ' ')} Center</h4>
                      <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">Configure role-based access control and system limits for this clinical section.</p>
                      <button className="mt-10 px-10 py-4 bg-medical-blue text-white rounded-2xl font-black text-xs hover:scale-105 transition-all">Initialize Module</button>
                   </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
