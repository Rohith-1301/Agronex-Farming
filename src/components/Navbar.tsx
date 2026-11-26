import React, { useState } from 'react';
import { Language } from '../types';
import { useFarmer } from '../context/FarmerContext';
import {
  Menu,
  X,
  Bell,
  Globe,
  User,
  Sprout,
  Activity,
  Droplets,
  Coins,
  Landmark,
  Bot,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Clock,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Download,
  FileSpreadsheet,
  Github
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenLoginModal: () => void;
  isLoggedIn: boolean;
  userName: string;
}

export default function Navbar({
  currentTab,
  onSelectTab,
  currentLang,
  onSelectLang,
  onOpenLoginModal,
  isLoggedIn,
  userName
}: NavbarProps) {
  const { profile, notifications, completeNotification, snoozeNotification, dismissNotification } = useFarmer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const activeNotifs = notifications.filter((n) => n.status === 'active');

  // The 6 Main Modules + Home
  const navItems = [
    {
      id: 'home',
      label: currentLang === 'ta' ? 'முகப்பு' : currentLang === 'hi' ? 'होम' : 'Home',
      badge: null
    },
    {
      id: 'dashboard',
      label: currentLang === 'ta' ? 'பண்ணை டாஷ்போர்டு' : currentLang === 'hi' ? 'फार्म डैशबोर्ड' : 'Farm Dashboard',
      moduleNum: '1'
    },
    {
      id: 'crop-selection',
      label: currentLang === 'ta' ? 'பயிர் தேர்வு & வளர்ச்சி' : currentLang === 'hi' ? 'फसल चयन व विकास' : 'Crop Selection',
      moduleNum: '2'
    },
    {
      id: 'crop-doctor',
      label: currentLang === 'ta' ? 'AI பயிர் மருத்துவர்' : currentLang === 'hi' ? 'AI फसल डॉक्टर' : 'AI Crop Doctor',
      moduleNum: '3'
    },
    {
      id: 'agro-ai',
      label: currentLang === 'ta' ? 'AGRI AI உதவியாளர்' : currentLang === 'hi' ? 'एग्री AI सहायक' : 'AGRI AI Assistant',
      moduleNum: '4'
    },
    {
      id: 'schemes',
      label: currentLang === 'ta' ? 'அரசு திட்டங்கள்' : currentLang === 'hi' ? 'सरकारी योजनाएं' : 'Govt Schemes',
      moduleNum: '5'
    },
    {
      id: 'profit-calc',
      label: currentLang === 'ta' ? 'லாபக் கணிப்பான்' : currentLang === 'hi' ? 'लाभ और हानि कैलकुलेटर' : 'Profit & Loss',
      moduleNum: '6'
    }
  ];

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#041008]/95 backdrop-blur-xl border-b border-emerald-900/60 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 1. Official AGRONEX Brand Logo */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-lg shadow-emerald-950/60 border border-emerald-500/40 group-hover:scale-105 transition bg-[#020a05] flex items-center justify-center p-0.5">
              <img
                src="/agronex-logo.jpg"
                alt="AGRONEX Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback icon if image path delayed
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-white tracking-wider font-mono">
                  AGRONEX
                </span>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-gradient-to-r from-emerald-500 to-green-400 text-black uppercase tracking-wider shadow-sm">
                  AI PRO
                </span>
              </div>
              <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">
                Smarter Farming • Greener Tomorrow
              </p>
            </div>
          </div>

          {/* 2. Desktop Navigation Menu (6 Modules) */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/60 font-black'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.moduleNum && (
                    <span
                      className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-mono ${
                        isActive ? 'bg-white text-emerald-800' : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {item.moduleNum}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3. Right Toolbar: 1M1B Tracker, Language Switcher, Notifications Center, Farmer Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 1M1B Tracker Quick Download */}
            <a
              href="/Rohith_AGRONEX_1M1B_Tracker.xlsx"
              download="Rohith_AGRONEX_1M1B_Tracker.xlsx"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 transition shadow-sm"
              title="Download 1M1B Green Internship Weekly Tracker (.xlsx)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>1M1B Tracker</span>
              <Download className="w-3 h-3 text-emerald-400/80 ml-0.5" />
            </a>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 transition"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{languages.find((l) => l.code === currentLang)?.native || 'English'}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#06180e] border border-emerald-800/80 rounded-2xl shadow-2xl p-1.5 z-50 animate-fadeIn">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLang(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                        currentLang === lang.code
                          ? 'bg-emerald-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-gray-400">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Smart Notification Center Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 transition"
                title="Smart Farm Notifications & Reminders"
              >
                <Bell className="w-4 h-4 text-emerald-400" />
                {activeNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-black text-[10px] font-black flex items-center justify-center animate-pulse">
                    {activeNotifs.length}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#05150c] border border-emerald-700/60 rounded-3xl shadow-2xl p-4 z-50 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">
                        Smart Farm Reminders ({activeNotifs.length})
                      </h4>
                    </div>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-gray-400 hover:text-white text-xs"
                    >
                      Close
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
                    {activeNotifs.length === 0 ? (
                      <div className="text-center py-6 text-xs text-gray-400 space-y-1">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500/40 mx-auto" />
                        <p>All field reminders completed!</p>
                      </div>
                    ) : (
                      activeNotifs.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-white line-clamp-1">{notif.title}</span>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap">{notif.date}</span>
                          </div>
                          <p className="text-gray-300 text-[11px] leading-relaxed">{notif.message}</p>

                          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px]">
                            <button
                              onClick={() => {
                                onSelectTab(notif.targetTab);
                                setNotificationsOpen(false);
                              }}
                              className="text-emerald-400 font-bold flex items-center gap-1 hover:underline"
                            >
                              <span>Open Module</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => snoozeNotification(notif.id)}
                                className="text-gray-400 hover:text-white transition"
                              >
                                Snooze
                              </button>
                              <button
                                onClick={() => completeNotification(notif.id)}
                                className="text-emerald-400 font-bold hover:text-emerald-300 transition"
                              >
                                Mark Done
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Farmer Profile Pill */}
            <div
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white/5 hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/40 cursor-pointer transition group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center text-black font-black text-xs shadow-md">
                {profile.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition line-clamp-1">
                  {currentLang === 'ta' ? profile.tamilName || profile.name : profile.name}
                </div>
                <div className="text-[10px] text-emerald-400/80 font-medium">
                  {profile.totalLandAreaAcres} Acres • {profile.totalFieldsCount} Fields
                </div>
              </div>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#041008] border-b border-emerald-900/60 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-600 text-white font-black shadow-md'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.moduleNum && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-[10px]">
                      {item.moduleNum}
                    </span>
                  )}
                  <span>{item.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
