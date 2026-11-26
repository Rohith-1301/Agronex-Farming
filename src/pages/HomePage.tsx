import React from 'react';
import { useFarmer } from '../context/FarmerContext';
import {
  Sparkles,
  ArrowRight,
  Layers,
  Sprout,
  Droplets,
  Coins,
  Landmark,
  Bot,
  Camera,
  Activity,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { profile, fields } = useFarmer();

  return (
    <div className="space-y-16 pb-20">
      {/* 1. CINEMATIC AGRONEX HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black text-white px-4 sm:px-6 lg:px-8">
        {/* Cinematic Backdrop Image with Atmospheric Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=85"
            alt="Indian Farmland Landscape"
            className="w-full h-full object-cover scale-105 filter brightness-[0.70] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041008] via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041008]/90 via-[#041008]/40 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Branding, Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Logo & Slogan Header */}
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-emerald-500/40 px-4 py-2 rounded-2xl w-fit shadow-lg">
              <div className="w-8 h-8 rounded-xl overflow-hidden bg-[#020a05] border border-emerald-400/40 p-0.5">
                <img
                  src="/agronex-logo.jpg"
                  alt="AGRONEX Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-black text-white tracking-wider font-mono">
                  AGRONEX
                </span>
                <span className="text-[10px] text-emerald-400 font-bold ml-2 tracking-wide uppercase">
                  Smarter Farming • Greener Tomorrow
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-xl">
              Precision Agricultural <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-lime-300">
                Operating Intelligence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-xl drop-shadow-md">
              Complete farm operating platform empowering Indian farmers with multi-field agronomics, AI crop selection & phenological timelines, AI pathology doctor, multilingual AGRI AI, and 20 verified government schemes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-black font-black text-sm shadow-xl shadow-green-950/80 transition transform hover:-translate-y-0.5"
              >
                <span>Open Farm Dashboard</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => onNavigate('schemes')}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-400/50 text-emerald-300 font-bold text-sm shadow-lg transition transform hover:-translate-y-0.5"
              >
                <Landmark className="w-4 h-4" />
                <span>Govt Schemes (20 Schemes)</span>
              </button>

              <button
                onClick={() => onNavigate('agro-ai')}
                className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm shadow-lg transition transform hover:-translate-y-0.5"
              >
                <Bot className="w-4 h-4" />
                <span>AGRI AI Chat</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Telemetry Preview Card for Farmer Selvaraj */}
          <div className="lg:col-span-5 bg-black/60 backdrop-blur-xl border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Farm Telemetry • {profile.district}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-md">
                Kisan ID: {profile.kisanId}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">{profile.name}</h3>
              <p className="text-xs text-gray-300">
                {profile.totalLandAreaAcres} Total Acres • {fields.length} Operational Plots in {profile.village}
              </p>
            </div>

            {/* 4 Mini Plot Statuses */}
            <div className="space-y-2 pt-1 text-xs">
              {fields.map((f) => (
                <div
                  key={f.id}
                  onClick={() => onNavigate('dashboard')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between cursor-pointer transition"
                >
                  <div>
                    <strong className="text-white block text-xs">{f.name}</strong>
                    <span className="text-[10px] text-gray-400">
                      {f.soilType} • {f.growthStage}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold text-xs">{f.areaAcres} Acres</span>
                    <span className="text-[10px] text-gray-400 block">Moisture: {f.soilMoisturePercent}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-gray-400">
              <span>Weather: 31°C • Light Showers 40%</span>
              <button
                onClick={() => onNavigate('crop-selection')}
                className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Field Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SIX CORE MODULES COMMAND HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Operating Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Six Comprehensive Agriculture Modules
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Engineered specifically for Indian farmers with interconnected soil, crop, disease, scheme, and financial records.
          </p>
        </div>

        {/* 6 Bento Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* MODULE 1 */}
          <div
            onClick={() => onNavigate('dashboard')}
            className="group bg-[#06160c] border border-emerald-900/60 hover:border-emerald-500/60 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-xs font-bold">
                  1
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition">
                  Farmer Profile & Farm Dashboard
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Manage individual field boundaries, soil pH, NPK nutrients, water holding capacity, and live irrigation reminders across all your plots.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* MODULE 2 */}
          <div
            onClick={() => onNavigate('crop-selection')}
            className="group bg-[#06160c] border border-emerald-900/60 hover:border-emerald-500/60 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 group-hover:scale-110 transition">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center font-mono text-xs font-bold">
                  2
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition">
                  AI Crop Selection & Growth Timeline
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Field-specific crop recommendation scoring based on individual soil and irrigation conditions, with day-by-day phenological growth stages.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Select Crops & Growth Stages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* MODULE 3 */}
          <div
            onClick={() => onNavigate('crop-doctor')}
            className="group bg-[#06160c] border border-emerald-900/60 hover:border-emerald-500/60 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono text-xs font-bold">
                  3
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                  AI Crop Doctor & Fertilizer Advisor
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Upload leaf photo to diagnose pests, blast, or wilt. Receive verified organic & chemical remedies, direct purchase links, and custom STCR fertilizer schedules.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Scan Crop & Fertilizers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* MODULE 4 */}
          <div
            onClick={() => onNavigate('agro-ai')}
            className="group bg-[#06160c] border border-emerald-900/60 hover:border-emerald-500/60 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono text-xs font-bold">
                  4
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition">
                  Multilingual AGRI AI Assistant
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Conversational AI agronomist supporting Tamil, English, Hindi, Telugu, and Kannada with live context of your fields, weather, and crop stages.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Chat with AGRI AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* MODULE 5 */}
          <div
            onClick={() => onNavigate('schemes')}
            className="group bg-[#06160c] border border-emerald-900/60 hover:border-emerald-500/60 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono text-xs font-bold">
                  5
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                  Government Schemes & Insurance
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  20 verified central and state schemes including PM-KISAN, PMFBY, KCC, and PMKSY. AI search box with guided application and official portal routing.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Explore 20 Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* MODULE 6 */}
          <div
            onClick={() => onNavigate('profit-calc')}
            className="group bg-[#06160c] border border-emerald-900/60 hover:border-emerald-500/60 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-lime-500/15 border border-lime-500/30 flex items-center justify-center text-lime-400 group-hover:scale-110 transition">
                  <Coins className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-300 flex items-center justify-center font-mono text-xs font-bold">
                  6
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-lime-300 transition">
                  Farm Profit & Loss Calculation
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Field-by-field cultivation cost breakdowns, market selling prices, disease risk financial impacts, and whole-farm ROI economics.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-lime-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Calculate Economics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
