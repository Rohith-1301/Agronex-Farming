import React, { useState } from 'react';
import { UserRole } from '../types';
import { X, User, Phone, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, role: UserRole) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<UserRole>('farmer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Thanjavur');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(name || 'செல்வராஜ் முனியப்பன் (Selvaraj)', role);
    onClose();
  };

  const loginAsDemo = (demoName: string, demoRole: UserRole) => {
    onLoginSuccess(demoName, demoRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#091f13] border border-emerald-700/60 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pb-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-2">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {isRegister ? 'Farmer Registration' : 'Farmer Portal Login (உள்நுழைவு)'}
          </h3>
          <p className="text-xs text-gray-400">Access personalized 3D farm digital twins and mandi listings</p>
        </div>

        {/* Quick Demo Instant Logins */}
        <div className="bg-[#05140b] p-3 rounded-2xl border border-emerald-900/60 space-y-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Instant Demo Sign-in:
          </span>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => loginAsDemo('செல்வராஜ் (Farmer)', 'farmer')}
              className="p-2 rounded-xl bg-emerald-700/50 hover:bg-emerald-600 text-white font-medium text-center transition"
            >
              🧑‍🌾 Farmer
            </button>
            <button
              type="button"
              onClick={() => loginAsDemo('Sree Rice Mill (Buyer)', 'buyer')}
              className="p-2 rounded-xl bg-sky-800/50 hover:bg-sky-600 text-white font-medium text-center transition"
            >
              🏢 Buyer
            </button>
            <button
              type="button"
              onClick={() => loginAsDemo('Dr. K. Ramasamy (Expert)', 'expert')}
              className="p-2 rounded-xl bg-amber-800/50 hover:bg-amber-600 text-white font-medium text-center transition"
            >
              🎓 Expert
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-gray-300 mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            >
              <option value="farmer">Farmer (விவசாயி)</option>
              <option value="buyer">Produce Buyer / Trader (வியாபாரி)</option>
              <option value="expert">Agronomist / Expert (வேளாண் விஞ்ஞானி)</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. செல்வராஜ் முனியப்பன்"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Mobile Number (Aadhaar / OTP)</label>
            <input
              type="tel"
              required
              placeholder="+91 94432 XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">District (மாவட்டம்)</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            >
              <option value="Thanjavur">Thanjavur (தஞ்சாவூர்)</option>
              <option value="Coimbatore">Coimbatore (கோவை)</option>
              <option value="Madurai">Madurai (மதுரை)</option>
              <option value="Tiruchirappalli">Tiruchirappalli (திருச்சி)</option>
              <option value="Erode">Erode (ஈரோடு)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/60 transition mt-2"
          >
            {isRegister ? 'Complete Registration' : 'Sign In to Farm Dashboard'}
          </button>
        </form>

        <div className="text-center pt-2 text-[11px] text-gray-400">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-emerald-400 hover:underline font-semibold"
          >
            {isRegister ? 'Already have an account? Sign In' : 'New Farmer? Register your land here'}
          </button>
        </div>
      </div>
    </div>
  );
}
