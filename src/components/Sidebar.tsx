import React from 'react';
import {
  LayoutDashboard,
  Sprout,
  Stethoscope,
  Bot,
  Landmark,
  TrendingUp,
  User,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenProfile: () => void;
}

export default function Sidebar({ currentTab, onSelectTab, onOpenProfile }: SidebarProps) {
  const mainNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'crop-selection',
      label: 'Crop Selection',
      icon: Sprout
    },
    {
      id: 'crop-doctor',
      label: 'AI Crop Doctor',
      icon: Stethoscope
    },
    {
      id: 'agro-ai',
      label: 'AGRI AI Assistant',
      icon: Bot
    },
    {
      id: 'schemes',
      label: 'Government Schemes',
      icon: Landmark
    },
    {
      id: 'profit-calc',
      label: 'Profit Calculator',
      icon: TrendingUp
    }
  ];

  return (
    <aside className="w-64 bg-[#05140b] border-r border-emerald-900/60 flex flex-col justify-between shrink-0 min-h-screen relative z-30 select-none">
      {/* 1. Brand Logo */}
      <div className="p-6 pb-4">
        <div
          onClick={() => onSelectTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Glowing double leaf icon */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#020b06] rounded-[14px] flex items-center justify-center text-emerald-400">
              <Sprout className="w-6 h-6 stroke-[2.2] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-white tracking-wider font-mono">
                AGRONEX
              </span>
            </div>
            <p className="text-[10px] text-emerald-400/80 font-medium tracking-tight">
              Smart Farming. Smarter Future.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Items */}
      <div className="flex-1 px-4 py-4 space-y-2">
        {mainNavItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all duration-200 group text-left relative ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.45)] font-black'
                  : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-emerald-400/80 group-hover:text-emerald-300'
                }`}
              />
              <span className="tracking-wide text-xs">{item.label}</span>

              {isActive && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Bottom Links: Profile, Settings, Logout */}
      <div className="p-4 pt-2 border-t border-emerald-900/40 space-y-1 relative">
        <button
          onClick={onOpenProfile}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/[0.05] transition text-left"
        >
          <User className="w-4 h-4 text-emerald-400/70" />
          <span>Profile</span>
        </button>

        <button
          onClick={() => alert('Settings: Notifications, Language, and Device sync are active.')}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/[0.05] transition text-left"
        >
          <Settings className="w-4 h-4 text-emerald-400/70" />
          <span>Settings</span>
        </button>

        <button
          onClick={() => {
            if (confirm('Do you want to log out of AGRONEX?')) {
              window.location.reload();
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition text-left"
        >
          <LogOut className="w-4 h-4 text-red-400/70" />
          <span>Logout</span>
        </button>

        {/* Decorative corner leaves icon */}
        <div className="absolute bottom-2 left-2 opacity-20 pointer-events-none text-emerald-500">
          <Sprout className="w-12 h-12" />
        </div>
      </div>
    </aside>
  );
}
