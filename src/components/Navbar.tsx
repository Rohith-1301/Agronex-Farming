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

  const activeLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  // If on public HomePage, render the clean, white/translucent rounded floating navbar matching the reference
  if (currentTab === 'home') {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 px-3 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto rounded-full bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-4 sm:px-6 py-2 flex items-center justify-between pointer-events-auto">
          {/* Left: Brand Logo & Tagline */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 border border-emerald-500/30 flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition">
              <img
                src="/agronex-logo.jpg"
                alt="AGRONEX Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black text-gray-900 tracking-tight font-sans">
                  AGRONEX
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-[10px] text-gray-500 font-semibold tracking-wide hidden sm:block">
                Smart Farming. Smarter Future.
              </p>
            </div>
          </div>

          {/* Center: Clean Rounded Navigation Items */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={() => onSelectTab('home')}
              className="px-4 py-1.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition"
            >
              Home
            </button>

            <button
              onClick={() => onSelectTab('dashboard')}
              className="px-3.5 py-1.5 rounded-full text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80 font-bold text-xs transition"
            >
              Features
            </button>

            <button
              onClick={() => {
                alert('AGRONEX AI PRO is an intelligent precision agriculture ecosystem built for Indian farmers with ICAR & TNAU datasets, multi-field telemetry, and 20 government welfare schemes.');
              }}
              className="px-3.5 py-1.5 rounded-full text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80 font-bold text-xs transition"
            >
              About
            </button>

            <button
              onClick={() => onSelectTab('schemes')}
              className="px-3.5 py-1.5 rounded-full text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80 font-bold text-xs transition"
            >
              Schemes
            </button>

            <button
              onClick={() => {
                window.open('tel:18001801551');
              }}
              className="px-3.5 py-1.5 rounded-full text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80 font-bold text-xs transition"
              title="Kisan Call Centre Toll-Free Helpline: 1800-180-1551"
            >
              Support
            </button>
          </nav>

          {/* Right: Language Selector & Login Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-800 text-xs font-bold transition border border-gray-200/60 shadow-xs"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeLangObj.native}</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-50 space-y-1 animate-fadeIn">
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
                          : 'text-gray-700 hover:bg-emerald-50'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-gray-400">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={onOpenLoginModal}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>{isLoggedIn ? (profile.name.split(' ')[0] || 'Profile') : 'Login'}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-gray-100 text-gray-700 hover:text-black"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-7xl bg-white/95 backdrop-blur-xl border border-gray-200 rounded-3xl p-4 shadow-xl space-y-2 animate-fadeIn text-gray-800 text-xs font-bold pointer-events-auto">
            <button
              onClick={() => {
                onSelectTab('home');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold"
            >
              Home
            </button>
            <button
              onClick={() => {
                onSelectTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-emerald-50 text-gray-800"
            >
              Features & Farm Dashboard
            </button>
            <button
              onClick={() => {
                onSelectTab('schemes');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-emerald-50 text-gray-800"
            >
              Government Schemes (20)
            </button>
            <button
              onClick={() => {
                window.open('tel:18001801551');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-emerald-50 text-gray-800 flex items-center justify-between"
            >
              <span>Kisan Support Helpline</span>
              <span className="text-emerald-600">1800-180-1551</span>
            </button>
          </div>
        )}
      </header>
    );
  }

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
