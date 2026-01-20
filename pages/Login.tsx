
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, User, Stethoscope, Info, Phone, Key } from 'lucide-react';

const Login: React.FC = () => {
  const [role, setRole] = useState<'patient' | 'staff'>('patient');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      if (role === 'staff') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-medical-blue rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <span className="text-2xl font-bold font-poppins text-gray-900">LUMINA</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900 font-poppins">
            {role === 'staff' ? 'Staff Portal' : 'Patient Login'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 'phone' ? 'Secure access with your phone number' : 'Check your phone for a 6-digit code'}
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex p-1 bg-gray-100 rounded-2xl">
          <button
            onClick={() => { setRole('patient'); setStep('phone'); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
              role === 'patient' ? 'bg-white text-medical-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User size={18} /> Patient
          </button>
          <button
            onClick={() => { setRole('staff'); setStep('phone'); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
              role === 'staff' ? 'bg-white text-medical-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Stethoscope size={18} /> Staff
          </button>
        </div>

        {/* Demo Mode Notice */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3">
          <Info className="text-medical-blue shrink-0" size={20} />
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Demo Mode:</strong> Use any 10-digit number. {role === 'staff' ? 'Staff role grants access to the dashboard.' : 'Patient role returns you home.'}
          </p>
        </div>

        <form className="mt-4 space-y-6" onSubmit={step === 'phone' ? handleSendOTP : handleLogin}>
          <div className="space-y-4">
            {step === 'phone' ? (
              <div className="relative">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
                <div className="relative mt-1">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-medical-blue outline-none transition-all"
                    placeholder="555-000-0000"
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Enter OTP</label>
                <div className="relative mt-1">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-medical-blue outline-none transition-all tracking-[0.5em] text-center font-bold text-2xl"
                    placeholder="000000"
                  />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500">Didn't get the code?</span>
                  <button type="button" onClick={() => setStep('phone')} className="text-xs font-bold text-medical-blue hover:underline">Resend OTP</button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-medical-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-blue shadow-xl shadow-blue-100 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : step === 'phone' ? 'Send OTP Code' : 'Verify & Sign In'}
            {!loading && <ArrowRight className="ml-2" size={24} />}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 uppercase tracking-widest text-xs font-bold">Secure Access</span>
            </div>
          </div>
          <div className="mt-6 flex justify-center items-center gap-2 text-gray-400 text-xs">
            <ShieldCheck size={14} />
            Lumina OTP Verification Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
