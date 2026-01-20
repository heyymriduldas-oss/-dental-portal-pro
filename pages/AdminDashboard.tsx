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
  CreditCard,
  BrainCircuit,
  Sparkles,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
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
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  
  // State for appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patient: 'Sarah Johnson', phone: '+1 555-123-0001', type: 'Checkup', time: '09:00 AM', status: 'Confirmed', doctor: 'Dr. Chen' },
    { id: 2, patient: 'Michael Brown', phone: '+1 555-123-0002', type: 'Root Canal', time: '10:30 AM', status: 'Pending', doctor: 'Dr. Vance' },
    { id: 3, patient: 'Emily Davis', phone: '+1 555-123-0003', type: 'Cleaning', time: '11:15 AM', status: 'Confirmed', doctor: 'Dr. Smith' },
    { id: 4, patient: 'James Wilson', phone: '+1 555-123-0004', type: 'Emergency', time: '01:00 PM', status: 'Cancelled', doctor: 'Dr. Chen' },
    { id: 5, patient: 'Linda Garcia', phone: '+1 555-123-0005', type: 'Invisalign', time: '02:30 PM', status: 'Pending', doctor: 'Dr. Vance' },
  ]);

  // Mock Data for Team & Logs
  const staffMembers = [
    { id: 1, name: 'Dr. Emily Chen', role: 'Senior Dentist', status: 'Active', access: 'Admin' },
    { id: 2, name: 'Dr. Michael Vance', role: 'Orthodontist', status: 'Active', access: 'Standard' },
    { id: 3, name: 'Jessica Miller', role: 'Head Receptionist', status: 'Active', access: 'Standard' },
    { id: 4, name: 'Dr. Sarah Smith', role: 'Pediatric Specialist', status: 'Away', access: 'Standard' },
  ];

  const auditLogs = [
    { id: 1, action: 'Login Success', user: 'Admin', time: '2 mins ago', details: 'IP: 192.168.1.45' },
    { id: 2, action: 'Appointment Confirmed', user: 'Jessica M.', time: '15 mins ago', details: 'Patient: Sarah J.' },
    { id: 3, action: 'System Config Changed', user: 'Admin', time: '1 hr ago', details: 'Updated slot duration to 30m' },
    { id: 4, action: 'Export Triggered', user: 'Admin', time: '3 hrs ago', details: 'Format: PDF' },
  ];

  const metrics = {
    appointments: { total: 428, confirmed: 340, pending: 68, cancelled: 20, peak_times: "10:00 AM - 02:00 PM" },
    clinical_activity: { procedures: ["Checkups", "Cleanings", "Root Canals", "Invisalign"], avg_time: "32 mins" },
    demographics: { age_peak: "20-45 years", returning_ratio: "72%" },
    financial: { mrr: "$84,200", growth: "+12.5%", insurance_split: "65% Insurance / 35% Self-Pay" },
    satisfaction: { rating: "4.9/5", responses: 1240 }
  };

  const generateAiInsights = async () => {
    setAiLoading(true);
    setAiInsights(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Analyze these dental clinic metrics and provide a 3-bullet executive summary with strategic advice. 
      Metrics: ${JSON.stringify(metrics)}. 
      Focus on maximizing operational efficiency and patient retention. Keep it professional and concise.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      setAiInsights(response.text || "Analysis complete. Optimization recommended for peak afternoon slots.");
    } catch (error) {
      setAiInsights("AI Analysis currently unavailable. Please check your system configuration.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const id = appointments.length + 1;
    setAppointments([{ ...newApt, id, status: 'Pending' }, ...appointments]);
    setIsModalOpen(false);
    setNewApt({ patient: '', phone: '', type: 'Checkup', doctor: 'Dr. Chen', time: '09:00 AM' });
    setActiveView('appointments');
  };

  // Form state for new appointment
  const [newApt, setNewApt] = useState({
    patient: '',
    phone: '',
    type: 'Checkup',
    doctor: 'Dr. Emily Chen',
    time: '09:00 AM'
  });

  const initiateCall = (patient: string) => {
    setCalling(patient);
    setTimeout(() => setCalling(null), 3000);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  const filteredData = useMemo(() => {
    let data = [...appointments];
    if (activeView === 'pending') data = data.filter(a => a.status === 'Pending');
    else if (activeView === 'patients') {
      const unique = new Map();
      data.forEach(a => { if (!unique.has(a.patient)) unique.set(a.patient, a); });
      data = Array.from(unique.values());
    }
    if (searchQuery) {
      data = data.filter(a => a.patient.toLowerCase().includes(searchQuery.toLowerCase()) || a.type.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return data;
  }, [appointments, activeView, searchQuery]);

  return (
    <div className="flex min-h-screen bg-gray-50 relative font-inter selection:bg-blue-100 selection:text-medical-blue">
      {/* Call Overlay */}
      {calling && (
        <div className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-12 rounded-[3rem] text-center space-y-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <PhoneCall size={48} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Secure Line</h2>
              <p className="text-medical-blue font-bold text-xl mt-2 tracking-tight">{calling}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
              <Loader2 className="animate-spin" size={16} /> HIPAA Compliant Link...
            </div>
            <button onClick={() => setCalling(null)} className="w-full py-5 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-100 transition-all uppercase tracking-widest text-xs">
              End Connection
            </button>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8">
            <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-medical-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100"><UserPlus size={24} /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 leading-tight">New Patient</h2>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Operational Intake</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white rounded-full transition-colors text-gray-400"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddAppointment} className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Legal Name</label>
                  <input required value={newApt.patient} onChange={e => setNewApt({...newApt, patient: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue font-bold transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile</label>
                  <input required value={newApt.phone} onChange={e => setNewApt({...newApt, phone: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue font-bold transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Time</label>
                  <input required value={newApt.time} onChange={e => setNewApt({...newApt, time: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-medical-blue font-bold transition-all" />
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-medical-blue text-white rounded-[1.25rem] font-black shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-widest text-xs">
                Book Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-10 border-b border-gray-50">
          <Link to="/" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-medical-blue rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-100">L</div>
            <div className="leading-tight">
              <p className="text-xl font-black text-gray-900 tracking-tighter">LUMINA</p>
              <p className="text-[9px] font-black text-medical-blue uppercase tracking-[0.2em]">Management</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-8 space-y-2 mt-4">
          {[
            { id: 'appointments', label: 'Daily Queue', icon: <Calendar size={20} /> },
            { id: 'pending', label: 'Priority review', icon: <Clock size={20} /> },
            { id: 'patients', label: 'Patient Index', icon: <Users size={20} /> },
            { id: 'analytics', label: 'Clinic Health', icon: <BarChart3 size={20} /> },
            { id: 'settings', label: 'Admin Terminal', icon: <Settings size={20} /> },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveView(item.id as DashboardView)} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-sm transition-all ${activeView === item.id ? 'bg-medical-blue text-white shadow-2xl shadow-blue-100' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-8 border-t border-gray-50">
          <button onClick={() => navigate('/login')} className="w-full flex items-center gap-4 px-5 py-4 text-red-400 hover:bg-red-50 rounded-2xl font-black text-sm transition-all group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Exit Terminal
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 min-w-0">
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 h-24 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-6 flex-1">
            <button className="lg:hidden p-3 text-gray-400"><Menu size={24} /></button>
            <div className="relative w-full max-w-lg hidden md:block">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Universal record search..." className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] focus:ring-4 focus:ring-blue-50 focus:bg-white outline-none transition-all text-sm font-medium" />
            </div>
          </div>
          <div className="flex items-center gap-8 ml-8">
            <button className="p-3 text-gray-400 hover:bg-gray-50 rounded-2xl transition-all relative">
              <Bell size={24} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full shadow-sm"></span>
            </button>
            <div className="flex items-center gap-5 border-l pl-10 border-gray-100">
               <div className="text-right hidden xl:block">
                 <p className="text-sm font-black text-gray-900 leading-none">Senior Admin</p>
                 <p className="text-[10px] text-medical-blue font-black uppercase tracking-widest mt-1.5">Full Privileges</p>
               </div>
               <img src="https://i.pravatar.cc/150?u=admin" className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm ring-1 ring-gray-100" alt="Admin" />
            </div>
          </div>
        </header>

        <div className="p-10">
          {/* Header Dashboard Title */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter capitalize">{activeView.replace('_', ' ')}</h1>
              <p className="text-gray-400 font-medium text-sm mt-2">Managing Operations for <span className="text-medical-blue font-bold">Lumina Dental Clinic HQ</span></p>
            </div>
            {activeView === 'appointments' && (
              <button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto bg-medical-blue text-white px-10 py-4 rounded-[1.25rem] font-black shadow-2xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                <Plus size={24} /> New Admission
              </button>
            )}
          </div>

          {/* VIEW: ANALYTICS (AI POWERED) */}
          {activeView === 'analytics' && (
            <div className="space-y-10 animate-in fade-in duration-700">
              {/* Top AI Insights Bar */}
              <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-medical-blue rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20"><BrainCircuit size={32} /></div>
                          <div>
                             <h3 className="text-2xl font-black tracking-tight">Clinical Intelligence</h3>
                             <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Gemini AI Model: 3.0 Flash Preview</p>
                          </div>
                       </div>
                       <button 
                         onClick={generateAiInsights} 
                         disabled={aiLoading}
                         className="px-8 py-3 bg-white text-gray-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-medical-blue hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
                       >
                         {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                         {aiInsights ? 'Refresh Analysis' : 'Generate AI Report'}
                       </button>
                    </div>
                    {aiInsights ? (
                       <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 animate-in slide-in-from-top-4 duration-500">
                          <div className="flex gap-4 items-start">
                             <TrendingUp className="text-medical-blue mt-1 shrink-0" />
                             <p className="text-lg text-gray-200 leading-relaxed font-medium italic whitespace-pre-line">
                                {aiInsights}
                             </p>
                          </div>
                       </div>
                    ) : (
                       <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                          Request a data-driven analysis of your clinic's performance. The AI evaluates procedural volume, peak slot utilization, and patient satisfaction trends to provide executive guidance.
                       </p>
                    )}
                 </div>
                 <Globe className="absolute -bottom-20 -right-20 text-white/5 group-hover:scale-125 transition-transform duration-1000" size={300} />
              </div>

              {/* Financial Metrics */}
              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { label: 'Monthly Revenue', value: metrics.financial.mrr, change: metrics.financial.growth, icon: <DollarSign />, color: 'text-green-500', bg: 'bg-green-50' },
                   { label: 'Total Patients', value: metrics.appointments.total, change: '+4.2%', icon: <Users />, color: 'text-blue-500', bg: 'bg-blue-50' },
                   { label: 'Satisfaction', value: metrics.satisfaction.rating, change: 'Stable', icon: <CheckCircle2 />, color: 'text-teal-500', bg: 'bg-teal-50' }
                 ].map((card, i) => (
                   <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                      <div className="flex justify-between items-start mb-6">
                         {/* Fixed: Use React.ReactElement<any> to avoid TypeScript error with unknown props */}
                         <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>{React.cloneElement(card.icon as React.ReactElement<any>, { size: 28 })}</div>
                         <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase ${card.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>{card.change}</span>
                      </div>
                      <h4 className="text-4xl font-black text-gray-900 tracking-tighter mb-1">{card.value}</h4>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{card.label}</p>
                   </div>
                 ))}
              </div>

              {/* Procedural Data Breakdown */}
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                 <div className="flex justify-between items-center mb-10">
                    <h4 className="text-xl font-black text-gray-900 tracking-tight">Financial & Clinical Distribution</h4>
                    <button className="text-xs font-black text-medical-blue uppercase tracking-widest hover:underline">Full Audit Link</button>
                 </div>
                 <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Revenue by Service Line</p>
                       {[
                         { name: 'Cosmetic Dentistry', share: '45%', val: '$37,890', color: 'bg-medical-blue' },
                         { name: 'Orthodontics', share: '30%', val: '$25,260', color: 'bg-teal-400' },
                         { name: 'General Dental', share: '25%', val: '$21,050', color: 'bg-blue-200' }
                       ].map((r, i) => (
                         <div key={i} className="space-y-3">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                               <span className="text-gray-900">{r.name}</span>
                               <span className="text-gray-500">{r.val}</span>
                            </div>
                            <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden p-0.5 border border-gray-100">
                               <div className={`${r.color} h-full rounded-full transition-all duration-1000`} style={{ width: r.share }}></div>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center justify-center text-center">
                       <CreditCard className="text-medical-blue mb-6" size={48} />
                       <h5 className="text-lg font-black text-gray-900 mb-2">Billing Composition</h5>
                       <p className="text-sm text-gray-400 font-medium mb-8 max-w-xs">{metrics.financial.insurance_split}</p>
                       <div className="flex gap-4">
                          <button className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">Claims Report</button>
                          <button className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">Invoices</button>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* VIEW: SETTINGS (TERMINAL) */}
          {activeView === 'settings' && (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[700px]">
               <aside className="w-full md:w-80 bg-gray-50/20 border-r border-gray-50 p-10 space-y-2">
                  <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-10 ml-4">Terminal Navigation</h4>
                  {[
                    { id: 'general', label: 'Clinic profile', icon: <Globe size={18} /> },
                    { id: 'team', label: 'Staff Roster', icon: <Users size={18} /> },
                    { id: 'scheduling', label: 'Operation Rules', icon: <Calendar size={18} /> },
                    { id: 'notifications', label: 'Comms Engine', icon: <Mail size={18} /> },
                    { id: 'security', label: 'Audit & Safety', icon: <Lock size={18} /> },
                    { id: 'integrations', label: 'Cloud Bridge', icon: <Smartphone size={18} /> },
                  ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveSettingsTab(tab.id as SettingsTab)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all ${activeSettingsTab === tab.id ? 'bg-white text-medical-blue shadow-xl shadow-blue-50 border border-gray-50' : 'text-gray-400 hover:bg-white hover:text-gray-900'}`}>
                      {tab.icon} {tab.label}
                    </button>
                  ))}
               </aside>

               <div className="flex-1 p-12 md:p-20 overflow-y-auto max-h-[800px]">
                  {activeSettingsTab === 'team' && (
                    <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
                       <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight">Staff Roster</h3>
                            <p className="text-sm text-gray-400 font-medium mt-1">Managed clinic roles and session status.</p>
                          </div>
                          <button className="bg-medical-blue text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg shadow-blue-100 flex items-center gap-2">
                             <UserPlus size={16} /> Add Member
                          </button>
                       </div>
                       <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                          <table className="w-full text-left">
                             <thead className="bg-gray-50/50">
                                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                   <th className="px-8 py-5">Staff Member</th>
                                   <th className="px-8 py-5">Position</th>
                                   <th className="px-8 py-5">Role</th>
                                   <th className="px-8 py-5 text-right">Status</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-gray-50">
                                {staffMembers.map(staff => (
                                   <tr key={staff.id} className="hover:bg-gray-50/30 transition-colors">
                                      <td className="px-8 py-5 font-bold text-gray-900 text-sm">{staff.name}</td>
                                      <td className="px-8 py-5 text-gray-500 text-sm">{staff.role}</td>
                                      <td className="px-8 py-5"><span className="text-[10px] font-black px-2 py-1 bg-blue-50 text-medical-blue rounded uppercase tracking-widest">{staff.access}</span></td>
                                      <td className="px-8 py-5 text-right"><span className={`w-2.5 h-2.5 rounded-full inline-block ${staff.status === 'Active' ? 'bg-green-500 shadow-sm shadow-green-200 animate-pulse' : 'bg-orange-400'}`}></span></td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>
                  )}

                  {activeSettingsTab === 'scheduling' && (
                    <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
                       <div>
                          <h3 className="text-3xl font-black text-gray-900 tracking-tight">Operational Bounds</h3>
                          <p className="text-sm text-gray-400 font-medium mt-1">Configure appointment logic and clinical limits.</p>
                       </div>
                       <div className="grid gap-6">
                          {[
                            { label: 'Slot Duration', desc: 'Default minutes for basic procedures', value: '30 Minutes', icon: <Clock /> },
                            { label: 'Booking Buffer', desc: 'Minimum notice for online booking', value: '12 Hours', icon: <Calendar /> },
                            { label: 'Daily Load Limit', desc: 'Max patients across all specialists', value: '45 Visits', icon: <Activity /> },
                            { label: 'Emergency Reserve', desc: 'Slots reserved for urgent triage', value: '3 / Day', icon: <Plus /> }
                          ].map((rule, i) => (
                            <div key={i} className="flex items-center justify-between p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                               <div className="flex items-center gap-6">
                                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-medical-blue shadow-sm border border-gray-50 group-hover:scale-110 transition-transform">{rule.icon}</div>
                                  <div>
                                     <p className="font-black text-gray-900 leading-none">{rule.label}</p>
                                     <p className="text-xs text-gray-400 font-medium mt-1">{rule.desc}</p>
                                  </div>
                               </div>
                               <div className="flex items-center gap-4">
                                  <span className="text-sm font-black text-medical-blue">{rule.value}</span>
                                  <ChevronRight className="text-gray-300" size={18} />
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {activeSettingsTab === 'security' && (
                    <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
                       <div className="p-10 bg-red-50 rounded-[3rem] border border-red-100 flex items-start gap-8">
                          <div className="w-16 h-16 bg-red-500 text-white rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-2xl shadow-red-100"><Shield size={32} /></div>
                          <div>
                             <h4 className="text-2xl font-black text-red-900 mb-2 tracking-tight">System Integrity Check</h4>
                             <p className="text-sm text-red-700 leading-relaxed mb-6">Database encrypted with AES-256. HIPAA Compliance active. Two-factor authentication (2FA) is currently mandatory for all Staff and Admin accounts.</p>
                             <button className="px-8 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-red-700 transition-all">Audit Security Core</button>
                          </div>
                       </div>
                       <div className="space-y-6">
                          <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">Terminal Access Logs</h5>
                          <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                             {auditLogs.map(log => (
                                <div key={log.id} className="px-10 py-6 border-b border-gray-50 flex justify-between items-center hover:bg-gray-50/30 transition-colors">
                                   <div>
                                      <p className="text-sm font-black text-gray-900 leading-none">{log.action}</p>
                                      <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">By: {log.user} • {log.details}</p>
                                   </div>
                                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{log.time}</span>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  )}

                  {/* Other tabs remain consistent with placeholders */}
                  {!['team', 'scheduling', 'security'].includes(activeSettingsTab) && (
                    <div className="flex flex-col items-center justify-center py-48 text-center animate-in fade-in duration-500">
                       <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-200 mb-10 border-2 border-dashed border-gray-100">
                         <Database size={40} className="animate-pulse" />
                       </div>
                       <h4 className="text-3xl font-black text-gray-900 tracking-tighter capitalize">{activeSettingsTab} Module</h4>
                       <p className="text-gray-400 font-medium max-w-xs mx-auto mt-2 leading-relaxed">Initializing cloud data hooks for clinical automation. Secure endpoint handshake in progress.</p>
                       <button className="mt-10 px-12 py-4 bg-medical-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Authenticate Module</button>
                    </div>
                  )}
               </div>
            </div>
          )}

          {/* MAIN TABLES (Appointments View) */}
          {(activeView === 'appointments' || activeView === 'pending' || activeView === 'patients') && (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px] animate-in slide-in-from-bottom-6 duration-700">
               <div className="p-10 border-b border-gray-50 flex flex-col xl:flex-row justify-between items-center bg-gray-50/20 gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-300 shadow-sm"><Filter size={20} /></div>
                    <h3 className="font-black text-gray-900 text-2xl tracking-tight">
                      {activeView === 'patients' ? 'Global Patient Records' : 'Daily Operations Ledger'}
                    </h3>
                  </div>
                  <div className="flex gap-4 w-full xl:w-auto">
                     <button onClick={handleExport} className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 transition-all text-xs font-black text-gray-600 shadow-sm">
                        {exporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} Export PDF
                     </button>
                     <button className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 transition-all text-xs font-black text-gray-600 shadow-sm">
                        <History size={18} /> Operation Log
                     </button>
                  </div>
               </div>

               <div className="overflow-x-auto">
                 {filteredData.length > 0 ? (
                   <table className="w-full text-left min-w-[1000px]">
                     <thead>
                        <tr className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] border-b border-gray-50 bg-gray-50/10">
                           <th className="px-12 py-8">Patient Profile</th>
                           {activeView !== 'patients' && <th className="px-12 py-8">Medical Case</th>}
                           {activeView !== 'patients' && <th className="px-12 py-8">Schedule</th>}
                           {activeView !== 'patients' && <th className="px-12 py-8">Status</th>}
                           <th className="px-12 py-8 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {filteredData.map(apt => (
                          <tr key={apt.id} className="hover:bg-blue-50/20 transition-all group">
                             <td className="px-12 py-8">
                                <div className="flex items-center gap-6">
                                   <div className="w-16 h-16 rounded-[1.25rem] bg-medical-blue/5 text-medical-blue flex items-center justify-center text-sm font-black border-2 border-white shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                      {apt.patient.split(' ').map(n => n[0]).join('')}
                                   </div>
                                   <div className="min-w-0">
                                      <div className="text-lg font-black text-gray-900 leading-none group-hover:text-medical-blue transition-colors">{apt.patient}</div>
                                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] mt-2 flex items-center gap-2">
                                         <Phone size={12} className="text-medical-blue/40" /> {apt.phone}
                                      </p>
                                   </div>
                                </div>
                             </td>
                             {activeView !== 'patients' && (
                               <td className="px-12 py-8">
                                  <div className="space-y-2">
                                     <span className="text-[11px] font-black px-4 py-1.5 bg-white border border-gray-100 rounded-xl text-gray-700 shadow-sm block w-fit">{apt.type}</span>
                                     <span className="text-[10px] text-gray-400 font-black uppercase tracking-tight block ml-1">Dr. {apt.doctor.split(' ')[1]}</span>
                                  </div>
                               </td>
                             )}
                             {activeView !== 'patients' && (
                               <td className="px-12 py-8">
                                  <div className="text-base font-black text-gray-800 font-mono tracking-tighter">{apt.time}</div>
                                  <div className="text-[10px] text-teal-500 font-black uppercase tracking-widest mt-1">Confirmed Slot</div>
                               </td>
                             )}
                             {activeView !== 'patients' && (
                               <td className="px-12 py-8">
                                  <div className="flex items-center gap-3">
                                     {apt.status === 'Confirmed' ? <CheckCircle2 className="text-green-500" size={18} /> : apt.status === 'Pending' ? <Clock className="text-orange-400" size={18} /> : <XCircle className="text-red-400" size={18} />}
                                     <span className={`text-[11px] font-black uppercase tracking-widest ${apt.status === 'Confirmed' ? 'text-green-600' : apt.status === 'Pending' ? 'text-orange-500' : 'text-red-500'}`}>{apt.status}</span>
                                  </div>
                               </td>
                             )}
                             <td className="px-12 py-8">
                                <div className="flex justify-end gap-3">
                                   <button onClick={() => initiateCall(apt.patient)} className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-medical-blue flex items-center justify-center hover:bg-medical-blue hover:text-white transition-all shadow-sm"><Phone size={20} /></button>
                                   <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-400 flex items-center justify-center hover:bg-white hover:border-gray-300 transition-all shadow-sm"><MoreHorizontal size={20} /></button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                 ) : (
                   <div className="flex flex-col items-center justify-center py-60 space-y-8 animate-in fade-in zoom-in-95">
                      <div className="w-40 h-40 bg-gray-50 rounded-[3rem] flex items-center justify-center text-gray-100 shadow-inner"><Search size={80} /></div>
                      <div className="text-center">
                         <h4 className="text-3xl font-black text-gray-900 tracking-tighter">Zero results matched</h4>
                         <p className="text-gray-400 max-w-sm mx-auto mt-3 font-medium">Verify your search query or check the archived patient data terminal.</p>
                         <button onClick={() => setSearchQuery('')} className="mt-10 px-12 py-4 bg-gray-900 text-white rounded-[1.25rem] font-black text-sm hover:scale-105 transition-all shadow-xl shadow-gray-200">Clear Search Buffer</button>
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