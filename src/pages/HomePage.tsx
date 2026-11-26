import React, { useState } from 'react';
import { useFarmer } from '../context/FarmerContext';
import { getFieldCropImage } from '../utils/cropImages';
import {
  Sparkles,
  ArrowRight,
  Sprout,
  Droplets,
  Coins,
  Landmark,
  Bot,
  Activity,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  ShieldCheck,
  PlusCircle,
  FileSpreadsheet,
  Download,
  Github,
  Zap,
  Layers,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { profile, fields } = useFarmer();
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  // The 6 signature features matching the realistic banner
  const quickPills = [
    {
      id: 'crop-selection',
      name: 'Smart Crop Selection',
      icon: Sprout,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30',
      badge: 'Rotation-Aware',
      desc: 'Soil pH & rotation matching'
    },
    {
      id: 'crop-doctor',
      name: 'AI Crop Doctor',
      icon: PlusCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30',
      badge: '9 ICAR Diseases',
      desc: 'Instant leaf diagnosis'
    },
    {
      id: 'dashboard',
      name: 'Smart Irrigation',
      icon: Droplets,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30',
      badge: 'Moisture Sensors',
      desc: 'Automated water scheduling'
    },
    {
      id: 'schemes',
      name: 'Government Schemes',
      icon: Landmark,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30',
      badge: '20 Schemes',
      desc: 'Subsidies & welfare'
    },
    {
      id: 'profit-calc',
      name: 'Profit Calculator',
      icon: TrendingUp,
      color: 'text-lime-400',
      bg: 'bg-lime-500/10 hover:bg-lime-500/20 border-lime-500/30',
      badge: 'MSP Market Rates',
      desc: 'Yield & expense ledgers'
    },
    {
      id: 'agro-ai',
      name: 'Multilingual AI Assistant',
      icon: Bot,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 hover:bg-teal-500/20 border-teal-500/30',
      badge: '5 Languages + Voice',
      desc: 'Tamil, Hindi, Telugu, Kn, En'
    }
  ];

  return (
    <div className="space-y-12 pb-24 text-gray-100">
      {/* =========================================================================
          1. REALISTIC HERO BANNER (REPRODUCED AS REQUESTED WITH REALISTIC IMAGE)
         ========================================================================= */}
      <section className="relative px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Card Container with Glowing Emerald Border */}
          <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border-2 border-emerald-500/40 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] bg-[#020a05]">
            {/* The Realistic Landing Image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[2.15/1] overflow-hidden select-none">
              <img
                src="/landing-hero-farmer.jpg"
                alt="AGRONEX Smart Farming Banner with Realistic Indian Farmer and Drone"
                className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.02]"
              />

              {/* Interactive Hotspot Over "Get Started" Button in the image */}
              <button
                onClick={() => onNavigate('dashboard')}
                className="absolute left-[5%] top-[51%] sm:top-[53%] w-[16%] sm:w-[13.5%] h-[12%] sm:h-[13%] rounded-full opacity-0 hover:opacity-100 bg-white/20 backdrop-blur-[2px] border-2 border-white cursor-pointer transition-all duration-300 flex items-center justify-center shadow-lg group"
                title="Click to Open Farm Dashboard"
              >
                <span className="sr-only">Get Started</span>
                <span className="text-[10px] sm:text-xs font-black text-white bg-black/70 px-2 py-0.5 rounded-full shadow pointer-events-none group-hover:scale-110 transition">
                  Enter ➔
                </span>
              </button>

              {/* Interactive Hotspots for the 6 Floating Pills in the image */}
              <div className="absolute left-[3.5%] bottom-[7%] sm:bottom-[8.5%] w-[93%] h-[15%] sm:h-[16%] grid grid-cols-6 gap-1 sm:gap-2">
                {/* 1. Smart Crop Selection */}
                <button
                  onClick={() => onNavigate('crop-selection')}
                  className="w-full h-full rounded-2xl opacity-0 hover:opacity-100 bg-emerald-500/25 border-2 border-emerald-400 transition-all cursor-pointer flex items-center justify-center"
                  title="Open Smart Crop Selection"
                >
                  <span className="text-[9px] font-black text-white bg-black/80 px-2 py-0.5 rounded-full shadow hidden sm:inline-block">
                    View Crops
                  </span>
                </button>

                {/* 2. AI Crop Doctor */}
                <button
                  onClick={() => onNavigate('crop-doctor')}
                  className="w-full h-full rounded-2xl opacity-0 hover:opacity-100 bg-emerald-500/25 border-2 border-emerald-400 transition-all cursor-pointer flex items-center justify-center"
                  title="Open AI Crop Doctor"
                >
                  <span className="text-[9px] font-black text-white bg-black/80 px-2 py-0.5 rounded-full shadow hidden sm:inline-block">
                    Scan Disease
                  </span>
                </button>

                {/* 3. Smart Irrigation */}
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full h-full rounded-2xl opacity-0 hover:opacity-100 bg-cyan-500/25 border-2 border-cyan-400 transition-all cursor-pointer flex items-center justify-center"
                  title="Open Smart Irrigation Telemetry"
                >
                  <span className="text-[9px] font-black text-white bg-black/80 px-2 py-0.5 rounded-full shadow hidden sm:inline-block">
                    Water Stats
                  </span>
                </button>

                {/* 4. Government Schemes */}
                <button
                  onClick={() => onNavigate('schemes')}
                  className="w-full h-full rounded-2xl opacity-0 hover:opacity-100 bg-amber-500/25 border-2 border-amber-400 transition-all cursor-pointer flex items-center justify-center"
                  title="Explore 20 Government Schemes"
                >
                  <span className="text-[9px] font-black text-white bg-black/80 px-2 py-0.5 rounded-full shadow hidden sm:inline-block">
                    20 Schemes
                  </span>
                </button>

                {/* 5. Profit Calculator */}
                <button
                  onClick={() => onNavigate('profit-calc')}
                  className="w-full h-full rounded-2xl opacity-0 hover:opacity-100 bg-lime-500/25 border-2 border-lime-400 transition-all cursor-pointer flex items-center justify-center"
                  title="Open Profit & Loss Calculator"
                >
                  <span className="text-[9px] font-black text-white bg-black/80 px-2 py-0.5 rounded-full shadow hidden sm:inline-block">
                    Profit & Loss
                  </span>
                </button>

                {/* 6. Multilingual AI Assistant */}
                <button
                  onClick={() => onNavigate('agro-ai')}
                  className="w-full h-full rounded-2xl opacity-0 hover:opacity-100 bg-teal-500/25 border-2 border-teal-400 transition-all cursor-pointer flex items-center justify-center"
                  title="Talk to Multilingual AGRI AI"
                >
                  <span className="text-[9px] font-black text-white bg-black/80 px-2 py-0.5 rounded-full shadow hidden sm:inline-block">
                    Chat AI
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FLOATING INTERACTIVE FEATURE DOCK (CRISP & TAP-FRIENDLY ON ALL DEVICES)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#05160d]/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-3 sm:p-4 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {quickPills.map((pill) => {
              const IconComponent = pill.icon;
              return (
                <button
                  key={pill.id}
                  onClick={() => onNavigate(pill.id)}
                  onMouseEnter={() => setHoveredModule(pill.id)}
                  onMouseLeave={() => setHoveredModule(null)}
                  className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-2 group transform hover:-translate-y-1 ${pill.bg}`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center ${pill.color}`}>
                      <IconComponent className="w-5 h-5 group-hover:scale-110 transition" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-gray-400 group-hover:text-white transition">
                      ➔
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-white group-hover:text-emerald-300 transition line-clamp-1">
                      {pill.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                      {pill.desc}
                    </p>
                  </div>

                  <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 text-emerald-300 font-semibold w-fit">
                    {pill.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. REAL-TIME FARM TELEMETRY STRIP (RAMESH KUMAR • 4 FIELDS • 5.5 ACRES)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#061d11] via-[#04140b] to-[#020b05] border border-emerald-500/30 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center text-black font-black text-lg shadow-md">
                R
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white">
                    {profile.name} (Ramesh Kumar)
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Active Farm
                  </span>
                </div>
                <p className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{profile.village}, {profile.district}, Tamil Nadu • <strong>5.5 Acres</strong> Total</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3.5 py-2 rounded-2xl bg-black/40 border border-white/10 text-right">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Expected Profit</span>
                <span className="text-sm font-black text-emerald-400">₹52,000 (+12%)</span>
              </div>

              <button
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition flex items-center gap-1.5 shadow-md shadow-emerald-950/60"
              >
                <span>Full Farm Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4 Distinct Field Cards with Live Crops */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {fields.map((f, idx) => (
              <div
                key={f.id}
                onClick={() => onNavigate('crop-selection')}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-emerald-950/40 border border-white/5 hover:border-emerald-500/40 cursor-pointer transition group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                    FIELD #{idx + 1}
                  </span>
                  <span className="text-xs font-black text-emerald-400">
                    {f.areaAcres} Acres
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                    <img
                      src={getFieldCropImage(f.currentCrop)}
                      alt={f.currentCrop}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-white group-hover:text-emerald-300 transition">
                      {f.currentCrop}
                    </h5>
                    <span className="text-[10px] text-gray-400 block">
                      {f.soilType} • pH {f.soilPh}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      {f.growthStage}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-gray-400">
                  <span>Moisture: <strong className="text-white">{f.soilMoisturePercent}%</strong></span>
                  <span className="text-emerald-400 font-bold group-hover:underline flex items-center gap-0.5">
                    Manage ➔
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. THE 6 INTEGRATED MODULES (DEEP DIVE BENTO GRID)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Full Precision Agriculture Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Six Comprehensive Farmer Operating Modules
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              All tools share live state across your 4 fields, soil chemistry, disease telemetry, and government subsidies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Quick Access:</span>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-emerald-400"
            >
              1. Dashboard
            </button>
            <button
              onClick={() => onNavigate('schemes')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-amber-400"
            >
              5. Schemes
            </button>
          </div>
        </div>

        {/* 6 Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Module 1 */}
          <div
            onClick={() => onNavigate('dashboard')}
            className="p-6 rounded-3xl bg-[#06180e] border border-emerald-900/60 hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-xs font-black">
                  1
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
                  Farmer Profile & Smart Farm Dashboard
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Manage individual field boundaries, soil pH, NPK nutrients, water holding capacity, and live irrigation reminders across all your 4 operational plots.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Module 2 */}
          <div
            onClick={() => onNavigate('crop-selection')}
            className="p-6 rounded-3xl bg-[#06180e] border border-emerald-900/60 hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 group-hover:scale-110 transition">
                  <Sprout className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center font-mono text-xs font-black">
                  2
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition">
                  AI Precision Crop Selection & Growth Timeline
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Field-specific crop recommendation scoring based on individual soil and irrigation conditions, with authentic crop photography and phenological growth telemetry.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Explore Crop Recommendations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Module 3 */}
          <div
            onClick={() => onNavigate('crop-doctor')}
            className="p-6 rounded-3xl bg-[#06180e] border border-emerald-900/60 hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono text-xs font-black">
                  3
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                  AI Crop Doctor & Clinical Pathology
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Upload leaf photos to diagnose 9 certified ICAR & TNAU diseases. Receive exact chemical active ingredients, dosages per liter/acre, organic biocontrols, and direct purchase links.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Scan Crop Pathology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Module 4 */}
          <div
            onClick={() => onNavigate('agro-ai')}
            className="p-6 rounded-3xl bg-[#06180e] border border-emerald-900/60 hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono text-xs font-black">
                  4
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition">
                  Multilingual AGRI AI Assistant
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Conversational agricultural copilot supporting English, Tamil, Hindi, Telugu, and Kannada with speech recognition, text-to-speech, and live field telemetry awareness.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Talk to AGRI AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Module 5 */}
          <div
            onClick={() => onNavigate('schemes')}
            className="p-6 rounded-3xl bg-[#06180e] border border-emerald-900/60 hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono text-xs font-black">
                  5
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                  Government Agriculture Schemes & Subsidies
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Explore 20 verified schemes including PM-KISAN, PMFBY, KCC, PMKSY, and Namo Drone Didi. Features natural language AI matching and official government portal routing.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>View 20 Government Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Module 6 */}
          <div
            onClick={() => onNavigate('profit-calc')}
            className="p-6 rounded-3xl bg-[#06180e] border border-emerald-900/60 hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-lime-500/15 border border-lime-500/30 flex items-center justify-center text-lime-400 group-hover:scale-110 transition">
                  <Coins className="w-6 h-6" />
                </div>
                <span className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-300 flex items-center justify-center font-mono text-xs font-black">
                  6
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-lime-300 transition">
                  AI-Based Farm Profit & Loss Calculation
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Field-by-field cultivation expenses, MSP market selling prices, disease risk financial impacts, and whole-farm ROI economics for informed commercial decisions.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-lime-400 group-hover:translate-x-1 transition pt-3 border-t border-white/5">
              <span>Calculate Farm Profit & Loss</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. 1M1B GREEN INTERNSHIP & GITHUB REPO INTEGRATION BANNER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-[#062415] to-emerald-950/50 border border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                1M1B Youth Impact & Readiness Program (YIRP)
              </span>
              <span className="text-xs text-gray-400">Mentor: Paramjeet</span>
            </div>
            <h3 className="text-xl font-black text-white">
              Official Project Repository & Weekly Progress Tracker
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Complete project milestone documentation, agronomic telemetry benchmarks, and synchronized GitHub repository for AGRONEX AI PRO.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://github.com/Rohith-1301/Agronex-Farming"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/10 shadow-md"
            >
              <Github className="w-4 h-4 text-emerald-400" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </a>

            <a
              href="/Rohith_AGRONEX_1M1B_Tracker.xlsx"
              download="Rohith_AGRONEX_1M1B_Tracker.xlsx"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs transition shadow-lg shadow-emerald-950/60"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download Tracker (.XLSX)</span>
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}