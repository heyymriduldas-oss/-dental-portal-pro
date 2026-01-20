
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
  Trash2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Appointment } from '../types';

type DashboardView = 'appointments' | 'pending' | 'patients' | 'analytics' | 'settings';
type SettingsTab = 'general' | 'team' | 'scheduling' | 'notifications' | 'security';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<DashboardView>('appointments');
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTab>('general');
  const [calling, setCalling] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patient: 'Sarah Johnson', phone: '+1 555-123-0001', type: 'Checkup', time: '09:00 AM', status: 'Confirmed', doctor: 'Dr. Chen' },
    { id: 2, patient: 'Michael Brown', phone: '+1 555-123-0002', type: 'Root Canal', time: '10:30 AM', status: 'Pending', doctor: 'Dr. Vance' },
    { id: 3, patient: 'Emily Davis', phone: '+1 555-123-0003', type: 'Cleaning', time: '11:15 AM', status: 'Confirmed', doctor: 'Dr. Smith' },
    { id: 4, patient: 'James Wilson', phone: '+1 555-123-0004', type: 'Emergency', time: '01:00 PM', status: 'Cancelled', doctor: 'Dr. Chen' },
    { id: 5, patient: 'Linda Garcia', phone: '+1 555-123-0005', type: 'Invisalign', time: '02:30 PM', status: 'Pending', doctor: 'Dr. Vance' },
  ]);

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
    <div className="flex min-h-screen bg-gray-50 relative font-inter">
      {/* Call Overlay */}
      {calling && (
        <div className="fixed inset-0 z-[100] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] text-center space-y-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <PhoneCall size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Calling Patient</h2>
              <p className="text-medical-blue font-bold text-lg mt-1">{calling}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Loader2 className="animate-spin" size={14} />
              Secure encrypted line...
            </div>
            <button onClick={() => setCalling(null)} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all">
              End Call
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
                  <h2 className="text-xl font-bold text-gray-900">Add Appointment</h2>
                  <p className="text-xs text-gray-500 font-medium">Front Desk Staff Access</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleAddAppointment} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Patient Name</label>
                  <input required type="text" value={newApt.patient} onChange={e => setNewApt({...newApt, patient: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" placeholder="Enter full name" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Mobile</label>
                  <input required type="tel" value={newApt.phone} onChange={e => setNewApt({...newApt, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" placeholder="555-000-0000" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Arrival Time</label>
                  <input required type="text" value={newApt.time} onChange={e => setNewApt({...newApt, time: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" placeholder="09:00 AM" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Treatment Type</label>
                  <select value={newApt.type} onChange={e => setNewApt({...newApt, type: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all">
                    <option>Checkup</option>
                    <option>Cleaning</option>
                    <option>Root Canal</option>
                    <option>Invisalign</option>
                    <option>Extraction</option>
                    <option>Consultation</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Assigned Doctor</label>
                  <select value={newApt.doctor} onChange={e => setNewApt({...newApt, doctor: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all">
                    <option>Dr. Emily Chen</option>
                    <option>Dr. Michael Vance</option>
                    <option>Dr. Sarah Smith</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-medical-blue text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                Save to Database
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-medical-blue rounded-lg flex items-center justify-center text-white font-bold">L</div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">LUMINA STAFF</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 mt-4">
          <button 
            onClick={() => setActiveView('appointments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
              activeView === 'appointments' ? 'bg-medical-blue text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Calendar size={18} /> Daily Schedule
          </button>
          <button 
            onClick={() => setActiveView('pending')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
              activeView === 'pending' ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Clock size={18} /> Pending Approval
          </button>
          <button 
            onClick={() => setActiveView('patients')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
              activeView === 'patients' ? 'bg-blue-50 text-medical-blue' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Users size={18} /> Patient Database
          </button>
          <div className="pt-8 pb-4">
             <span className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reports</span>
          </div>
          <button 
            onClick={() => setActiveView('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
              activeView === 'analytics' ? 'bg-medical-blue text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <BarChart3 size={18} /> Clinic Analytics
          </button>
          <button 
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
              activeView === 'settings' ? 'bg-medical-blue text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-gray-50">
          <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all text-sm">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button className="lg:hidden p-2 text-gray-500"><Menu size={20} /></button>
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Universal search..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6 ml-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-6 border-gray-100">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900 leading-tight">Admin User</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Clinic Director</p>
              </div>
              <img src="https://i.pravatar.cc/150?u=staff" className="w-10 h-10 rounded-full border border-gray-100" alt="Staff" />
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-poppins capitalize">
                {activeView.replace('_', ' ')}
              </h1>
              <nav className="flex gap-2 text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
                <span>Lumina</span>
                <span>/</span>
                <span className="text-medical-blue">{activeView}</span>
              </nav>
            </div>
            {activeView !== 'settings' && activeView !== 'analytics' && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-medical-blue text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={20} /> New Appointment
              </button>
            )}
          </div>

          {/* Quick Stats Grid (Functional Filters) */}
          {(activeView === 'appointments' || activeView === 'pending' || activeView === 'patients') && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <button 
                onClick={() => setActiveView('patients')}
                className={`p-6 rounded-[2rem] border transition-all text-left group ${
                  activeView === 'patients' ? 'bg-white border-medical-blue shadow-xl' : 'bg-white border-gray-100 hover:border-medical-blue/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${activeView === 'patients' ? 'bg-medical-blue text-white' : 'bg-blue-50 text-medical-blue group-hover:bg-medical-blue group-hover:text-white'}`}>
                  <Users size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900">{new Set(appointments.map(a => a.patient)).size}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total Patients</div>
              </button>
              
              <button 
                onClick={() => setActiveView('appointments')}
                className={`p-6 rounded-[2rem] border transition-all text-left group ${
                  activeView === 'appointments' ? 'bg-white border-medical-blue shadow-xl' : 'bg-white border-gray-100 hover:border-medical-blue/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${activeView === 'appointments' ? 'bg-medical-blue text-white' : 'bg-teal-50 text-teal-600 group-hover:bg-medical-blue group-hover:text-white'}`}>
                  <Calendar size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900">{appointments.filter(a => a.status !== 'Cancelled').length}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Active Queue</div>
              </button>

              <button 
                onClick={() => setActiveView('pending')}
                className={`p-6 rounded-[2rem] border transition-all text-left group ${
                  activeView === 'pending' ? 'bg-white border-orange-400 shadow-xl' : 'bg-white border-gray-100 hover:border-orange-400/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${activeView === 'pending' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'}`}>
                  <Clock size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900">{appointments.filter(a => a.status === 'Pending').length}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Awaiting Approval</div>
              </button>
            </div>
          )}

          {/* VIEW: MAIN TABLE (Appointments/Patients/Pending) */}
          {(activeView === 'appointments' || activeView === 'pending' || activeView === 'patients') && (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div className="flex items-center gap-3">
                  <Filter size={18} className="text-gray-400" />
                  <h3 className="font-bold text-gray-900">
                    {activeView === 'patients' ? 'Global Patient Directory' : 'Daily Operations Queue'}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-colors text-gray-500"><Download size={18} /></button>
                  <button className="px-4 py-2.5 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-colors text-xs font-bold text-gray-600 flex items-center gap-2">
                    <History size={14} /> View Logs
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                {filteredData.length > 0 ? (
                  <table className="w-full text-left min-w-[800px]">
                    <thead>
                      <tr className="text-[10px] text-gray-400 uppercase tracking-widest font-bold border-b border-gray-50">
                        <th className="px-8 py-5">Patient Details</th>
                        {activeView !== 'patients' && <th className="px-8 py-5">Clinical Procedure</th>}
                        {activeView !== 'patients' && <th className="px-8 py-5">Scheduled Time</th>}
                        {activeView !== 'patients' && <th className="px-8 py-5">Status</th>}
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredData.map((apt) => (
                        <tr key={apt.id} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-medical-blue/5 text-medical-blue flex items-center justify-center text-xs font-bold border border-medical-blue/10 shrink-0">
                                {apt.patient.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-bold text-gray-900 group-hover:text-medical-blue transition-colors">{apt.patient}</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tight flex items-center gap-1 mt-0.5">
                                  <Phone size={10} /> {apt.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          {activeView !== 'patients' && (
                            <td className="px-8 py-5">
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700 w-fit">{apt.type}</span>
                                <span className="text-[9px] text-gray-400 mt-2 font-bold uppercase tracking-tight">Assigned: {apt.doctor}</span>
                              </div>
                            </td>
                          )}
                          {activeView !== 'patients' && (
                            <td className="px-8 py-5">
                              <div className="text-sm font-bold text-gray-700 font-mono tracking-tight">{apt.time}</div>
                              <div className="text-[9px] text-gray-400 mt-1 font-bold">TODAY</div>
                            </td>
                          )}
                          {activeView !== 'patients' && (
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(apt.status)}
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                  apt.status === 'Confirmed' ? 'text-green-500' : 
                                  apt.status === 'Pending' ? 'text-orange-500' : 'text-red-500'
                                }`}>{apt.status}</span>
                              </div>
                            </td>
                          )}
                          <td className="px-8 py-5">
                            <div className="flex justify-end gap-2.5">
                              <button 
                                onClick={() => initiateCall(apt.patient)}
                                className="w-10 h-10 rounded-xl bg-blue-50 text-medical-blue flex items-center justify-center hover:bg-medical-blue hover:text-white transition-all shadow-sm border border-blue-100"
                              >
                                <Phone size={16} />
                              </button>
                              {apt.status === 'Pending' && (
                                <button 
                                  onClick={() => approveAppointment(apt.id)}
                                  className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all border border-green-100"
                                >
                                  <Check size={16} />
                                </button>
                              )}
                              <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-white hover:border-gray-200 transition-all border border-transparent">
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-40 space-y-4">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-100">
                      <Search size={48} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-gray-900 text-lg">No matching records</h4>
                      <p className="text-sm text-gray-400 max-w-xs mx-auto">Try clearing your filters or searching for another patient name or treatment.</p>
                      <button onClick={() => setSearchQuery('')} className="mt-4 text-medical-blue font-bold text-sm hover:underline">Clear Search</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: ANALYTICS */}
          {activeView === 'analytics' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Analytics Controls */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Period</label>
                    <select className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-medical-blue/20 text-sm font-bold">
                      <option>Last 30 Days</option>
                      <option>Last Quarter</option>
                      <option>This Year</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Specialist</label>
                    <select className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-medical-blue/20 text-sm font-bold">
                      <option>All Doctors</option>
                      <option>Dr. Chen</option>
                      <option>Dr. Vance</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all">
                    <Download size={18} /> Export PDF
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all text-gray-600">
                    <PieChart size={18} /> Detailed View
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Metrics Breakdown */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Clinic Capacity</h4>
                      <div className="flex items-end gap-3 mb-2">
                        <span className="text-4xl font-black text-gray-900">84%</span>
                        <span className="text-green-500 font-bold text-sm mb-1">+5.2%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-medical-blue h-full rounded-full" style={{ width: '84%' }}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-4 font-medium italic">Peak times: 10:00 AM - 02:00 PM</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Patient Satisfaction</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-black text-gray-900">4.9</span>
                        <div className="flex text-yellow-400">
                          <Activity size={24} />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-6 font-medium">Based on 1,200+ post-visit survey responses</p>
                    </div>
                  </div>

                  {/* Procedures Chart (Custom Visual) */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Procedures by Type</h4>
                      <span className="text-[10px] font-bold text-medical-blue bg-blue-50 px-3 py-1 rounded-full uppercase">Monthly Total: 428</span>
                    </div>
                    <div className="space-y-6">
                      {[
                        { label: 'Checkups', value: 142, color: 'bg-blue-500', percent: '33%' },
                        { label: 'Cleanings', value: 98, color: 'bg-teal-400', percent: '22%' },
                        { label: 'Root Canals', value: 45, color: 'bg-orange-400', percent: '10%' },
                        { label: 'Invisalign', value: 82, color: 'bg-purple-500', percent: '19%' },
                        { label: 'Emergency', value: 61, color: 'bg-red-500', percent: '16%' }
                      ].map((bar, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-gray-600">{bar.label}</span>
                            <span className="text-gray-900">{bar.value} visits</span>
                          </div>
                          <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden">
                            <div className={`${bar.color} h-full rounded-full transition-all duration-1000`} style={{ width: bar.percent }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                   {/* Demographics */}
                   <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-xl">
                      <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">Patient Demographics</h4>
                      <div className="space-y-6">
                        {[
                          { age: 'Children (0-12)', val: '22%', color: 'border-blue-400' },
                          { age: 'Teen (13-19)', val: '18%', color: 'border-teal-400' },
                          { age: 'Adult (20-60)', val: '45%', color: 'border-purple-400' },
                          { age: 'Senior (60+)', val: '15%', color: 'border-orange-400' }
                        ].map((dem, i) => (
                          <div key={i} className="flex justify-between items-center border-l-2 pl-4 border-gray-700">
                             <span className="text-sm font-medium text-gray-400">{dem.age}</span>
                             <span className="text-lg font-black">{dem.val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-12 pt-8 border-t border-gray-800">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">New vs Returning</div>
                        <div className="flex h-4 rounded-full overflow-hidden">
                          <div className="bg-medical-blue w-[30%]" title="New: 30%"></div>
                          <div className="bg-teal-500 w-[70%]" title="Returning: 70%"></div>
                        </div>
                      </div>
                   </div>

                   {/* Productivity */}
                   <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Doctor Productivity</h4>
                      <div className="space-y-6">
                        {[
                          { name: 'Dr. Chen', load: '92%', apts: 145 },
                          { name: 'Dr. Vance', load: '78%', apts: 112 },
                          { name: 'Dr. Smith', load: '85%', apts: 130 }
                        ].map((doc, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-xs">{doc.name[4]}</div>
                            <div className="flex-1">
                              <div className="flex justify-between text-[11px] font-bold mb-1">
                                <span>{doc.name}</span>
                                <span className="text-medical-blue">{doc.load}</span>
                              </div>
                              <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-medical-blue h-full" style={{ width: doc.load }}></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SETTINGS */}
          {activeView === 'settings' && (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col md:flex-row animate-in fade-in duration-500">
              {/* Settings Nav */}
              <aside className="w-full md:w-72 border-r border-gray-100 bg-gray-50/30 p-8 space-y-2">
                <button onClick={() => setActiveSettingsTab('general')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeSettingsTab === 'general' ? 'bg-white text-medical-blue shadow-md border border-gray-100' : 'text-gray-500 hover:bg-white'}`}>
                  <Globe size={18} /> Clinic Info
                </button>
                <button onClick={() => setActiveSettingsTab('team')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeSettingsTab === 'team' ? 'bg-white text-medical-blue shadow-md border border-gray-100' : 'text-gray-500 hover:bg-white'}`}>
                  <Users size={18} /> Team Management
                </button>
                <button onClick={() => setActiveSettingsTab('scheduling')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeSettingsTab === 'scheduling' ? 'bg-white text-medical-blue shadow-md border border-gray-100' : 'text-gray-500 hover:bg-white'}`}>
                  <Clock size={18} /> Scheduling Rules
                </button>
                <button onClick={() => setActiveSettingsTab('notifications')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeSettingsTab === 'notifications' ? 'bg-white text-medical-blue shadow-md border border-gray-100' : 'text-gray-500 hover:bg-white'}`}>
                  <Bell size={18} /> Notifications
                </button>
                <button onClick={() => setActiveSettingsTab('security')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeSettingsTab === 'security' ? 'bg-white text-medical-blue shadow-md border border-gray-100' : 'text-gray-500 hover:bg-white'}`}>
                  <Shield size={18} /> Security & Auth
                </button>
                
                <div className="pt-12 mt-12 border-t border-gray-100 space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-gray-400 hover:text-medical-blue hover:bg-white transition-all">
                    <Database size={18} /> Export Records
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-50 transition-all">
                    <Trash2 size={18} /> Wipe Cache
                  </button>
                </div>
              </aside>

              {/* Settings Panels */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[700px]">
                {activeSettingsTab === 'general' && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Clinic Identity</h3>
                      <p className="text-sm text-gray-500 font-medium">Global settings for your medical facility profile.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2 col-span-2 sm:col-span-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Clinic Public Name</label>
                        <input type="text" defaultValue="Lumina Dental Clinic" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all" />
                      </div>
                      <div className="space-y-2 col-span-2 sm:col-span-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Email</label>
                        <input type="email" defaultValue="care@luminadental.com" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all" />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Facility Address</label>
                        <textarea defaultValue="123 Medical Plaza, Suite 400, New York, NY 10001" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue transition-all resize-none h-24"></textarea>
                      </div>
                    </div>
                    <div className="pt-6">
                      <button className="bg-medical-blue text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'scheduling' && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Appointment Configuration</h3>
                      <p className="text-sm text-gray-500 font-medium">Control slot intervals and booking availability.</p>
                    </div>
                    <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">Standard Slot Duration</p>
                          <p className="text-xs text-gray-500">Default time allocated per checkup</p>
                        </div>
                        <select className="bg-white border border-gray-100 px-4 py-2 rounded-xl text-sm font-bold">
                          <option>15 Minutes</option>
                          <option selected>30 Minutes</option>
                          <option>45 Minutes</option>
                          <option>60 Minutes</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900">Online Booking Buffer</p>
                          <p className="text-xs text-gray-500">Minimum notice required for new bookings</p>
                        </div>
                        <select className="bg-white border border-gray-100 px-4 py-2 rounded-xl text-sm font-bold">
                          <option>2 Hours</option>
                          <option selected>12 Hours</option>
                          <option>24 Hours</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-blue-100">
                        <div>
                          <p className="font-bold text-gray-900">Limit Daily Appointments</p>
                          <p className="text-xs text-gray-500">Maximum visits per day across clinic</p>
                        </div>
                        <input type="number" defaultValue={40} className="w-20 bg-white border border-gray-100 px-3 py-2 rounded-xl text-center font-bold" />
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'notifications' && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Automated Reminders</h3>
                      <p className="text-sm text-gray-500 font-medium">Managed how and when patients are notified.</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: 'SMS Reminders', desc: 'Send 24h before appointment', icon: <Smartphone />, active: true },
                        { label: 'Email Confirmation', desc: 'Instant message upon booking', icon: <Mail />, active: true },
                        { label: 'WhatsApp Updates', desc: 'Secure treatment follow-ups', icon: <Phone />, active: false },
                        { label: 'Staff Alerts', desc: 'Internal notifications for no-shows', icon: <Bell />, active: true }
                      ].map((n, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${n.active ? 'bg-medical-blue text-white' : 'bg-gray-200 text-gray-400'}`}>
                              {React.cloneElement(n.icon as React.ReactElement, { size: 18 })}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{n.label}</p>
                              <p className="text-xs text-gray-400">{n.desc}</p>
                            </div>
                          </div>
                          <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${n.active ? 'bg-medical-blue' : 'bg-gray-300'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${n.active ? 'left-7' : 'left-1'}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSettingsTab === 'security' && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    <div className="p-8 bg-red-50 rounded-[2rem] border border-red-100 flex items-start gap-6">
                      <div className="w-14 h-14 bg-red-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-100">
                        <Lock size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-red-900 mb-2">2FA Protection Required</h4>
                        <p className="text-sm text-red-700 leading-relaxed mb-4">Clinic policy requires all staff accounts to have Two-Factor Authentication enabled. Currently, 2 of 12 staff members are non-compliant.</p>
                        <button className="px-6 py-2.5 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-all">Enforce Multi-Factor</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
                        <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><History size={18} /> Audit Trail</h5>
                        <p className="text-xs text-gray-500 mb-6">Last login: Today, 08:42 AM from New York, US</p>
                        <button className="w-full py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-white transition-all">View Access Logs</button>
                      </div>
                      <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
                        <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Shield size={18} /> Permissions</h5>
                        <p className="text-xs text-gray-500 mb-6">Define what different staff roles can access.</p>
                        <button className="w-full py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-white transition-all">Edit Role Matrix</button>
                      </div>
                    </div>
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
