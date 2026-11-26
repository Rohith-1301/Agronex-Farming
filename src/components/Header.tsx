import React, { useState } from 'react';
import { useFarmer } from '../context/FarmerContext';
import { Language } from '../types';
import { Search, Bell, Globe, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenProfile: () => void;
  onNavigate: (tab: string) => void;
}

export default function Header({ currentLang, onSelectLang, onOpenProfile, onNavigate }: HeaderProps) {
  const { profile, notifications, completeNotification, snoozeNotification } = useFarmer();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeNotifs = notifications.filter((n) => n.status === 'active');

  const languages: { code: Language; label: string; native: string; flag: string }[] = [
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('crop-selection');
    }
  };

  return (
    <header className="h-20 bg-[#06150c]/90 backdrop-blur-xl border-b border-emerald-900/60 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* 1. Capsule Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-80 sm:w-96">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search anything..."
          className="w-full bg-[#030e07] border border-emerald-900/80 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 shadow-inner"
        />
      </form>

      {/* 2. Right Toolbar: Notification, Language, Avatar */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="relative p-2.5 rounded-full bg-[#030e07] hover:bg-white/10 border border-emerald-900/60 text-gray-200 transition"
          >
            <Bell className="w-4 h-4 text-emerald-400" />
            {activeNotifs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
                {activeNotifs.length}
              </span>
            )}
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#05170d] border border-emerald-700/60 rounded-3xl shadow-2xl p-4 z-50 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2.5">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  Smart Notifications ({activeNotifs.length})
                </h4>
                <button
                  onClick={() => setNotifMenuOpen(false)}
                  className="text-gray-400 hover:text-white text-xs"
                >
                  Close
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {activeNotifs.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{n.title}</span>
                      <span className="text-[10px] text-gray-400">{n.date}</span>
                    </div>
                    <p className="text-gray-300 text-[11px] leading-relaxed">{n.message}</p>
                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <button
                        onClick={() => {
                          onNavigate(n.targetTab);
                          setNotifMenuOpen(false);
                        }}
                        className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Open</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => completeNotification(n.id)}
                        className="text-gray-400 hover:text-emerald-300"
                      >
                        Mark Done
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#030e07] hover:bg-white/10 border border-emerald-900/60 text-xs font-bold text-gray-200 transition"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{languages.find((l) => l.code === currentLang)?.label || 'English'}</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-[#05170d] border border-emerald-700/60 rounded-2xl shadow-2xl p-1.5 z-50 animate-fadeIn">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    onSelectLang(l.code);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                    currentLang === l.code
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                  <span className="text-[10px] text-emerald-300">{l.native}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Farmer Avatar (Ramesh Kumar with White Turban) */}
        <div
          onClick={onOpenProfile}
          className="flex items-center gap-3 cursor-pointer group"
          title="View Ramesh Kumar's Profile"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80"
              alt="Ramesh Kumar Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
