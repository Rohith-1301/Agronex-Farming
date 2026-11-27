import React from 'react';
import {
  LayoutDashboard,
  Sprout,
  PlusCircle,
  Bot,
  Landmark,
  TrendingUp,
  CloudRain,
  Layers,
  ArrowRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  // All 8 live AGRONEX modules mapped cleanly to the bottom dock
  const platformModules = [
    {
      id: 'dashboard',
      name: 'Farm Dashboard',
      icon: LayoutDashboard,
      iconBg: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 'crop-selection',
      name: 'Crop Selection',
      icon: Sprout,
      iconBg: 'bg-green-100 text-green-700'
    },
    {
      id: 'crop-doctor',
      name: 'AI Crop Doctor',
      icon: PlusCircle,
      iconBg: 'bg-teal-100 text-teal-700'
    },
    {
      id: 'agro-ai',
      name: 'AGRI AI Chat',
      icon: Bot,
      iconBg: 'bg-cyan-100 text-cyan-700'
    },
    {
      id: 'schemes',
      name: 'Govt Schemes',
      icon: Landmark,
      iconBg: 'bg-amber-100 text-amber-700'
    },
    {
      id: 'profit-calc',
      name: 'Profit & Loss',
      icon: TrendingUp,
      iconBg: 'bg-lime-100 text-emerald-700'
    },
    {
      id: 'spray-advisor',
      name: 'Spray & Irrigate',
      icon: CloudRain,
      iconBg: 'bg-sky-100 text-sky-700'
    },
    {
      id: 'intercrop-sim',
      name: 'Intercrop & Risk',
      icon: Layers,
      iconBg: 'bg-emerald-100 text-emerald-800'
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between overflow-x-hidden font-sans select-none bg-[#e8f8ee]">
      {/* =========================================================================
          MAIN HERO SECTION (Center Realistic Image Preserved Unobstructed)
         ========================================================================= */}
      <section className="relative flex-1 flex flex-col justify-between pt-6 sm:pt-10 lg:pt-12">
        {/* Clean 2K Photorealistic Backdrop (aligned top so drone & turban are 100% visible) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-top"
          style={{
            backgroundImage: "url('/agronex-hero-backdrop-2k.jpg')"
          }}
        >
          {/* Gentle left readability scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent w-full md:w-[56%]" />
        </div>

        {/* Hero Foreground Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
          {/* Upper Grid: Left Content + Right Visual Space */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4 sm:py-6">
            <div className="lg:col-span-7 xl:col-span-6 space-y-3 sm:space-y-4">
              {/* Small Heading + Green Accent Line */}
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide">
                  Empowering Indian Farmers with AI
                </span>
                <span className="h-[2px] w-12 sm:w-16 bg-emerald-600 rounded-full" />
              </div>

              {/* Brand Heading */}
              <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] font-black tracking-tight leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-900">
                AGRONEX
              </h1>

              {/* Subheading */}
              <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold text-gray-900 tracking-tight leading-tight">
                Smart Farming. Smarter Future.
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed max-w-lg pt-1">
                Get AI-powered crop recommendations, disease detection, spray timing, intercropping simulation, and government schemes — all in one place.
              </p>

              {/* Primary CTA: Get Started */}
              <div className="pt-3">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-3 px-6 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-800/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                >
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500/90 flex items-center justify-center text-white group-hover:translate-x-0.5 transition">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.75]" />
                  </span>
                  <span>Get Started</span>
                </button>
              </div>
            </div>

            {/* Right Visual Space (Drone & Farmer unobstructed) */}
            <div className="lg:col-span-5 xl:col-span-6 min-h-[180px] sm:min-h-[240px] lg:min-h-[320px]" />
          </div>

          {/* =========================================================================
              UPDATED BOTTOM BAR (All 8 Real Modules of AGRONEX)
             ========================================================================= */}
          <div className="w-full mt-6 sm:mt-8 mb-4 sm:mb-6">
            <div className="rounded-2xl xl:rounded-full bg-white/90 backdrop-blur-xl border border-white/85 shadow-[0_12px_35px_-8px_rgba(0,0,0,0.16)] p-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 divide-y sm:divide-y-0 xl:divide-x divide-gray-200/70">
                {platformModules.map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => onNavigate(mod.id)}
                      className="px-2.5 py-2 hover:bg-emerald-50/80 rounded-xl xl:rounded-full transition flex items-center gap-2 text-left group cursor-pointer"
                      title={`Open ${mod.name}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition ${mod.iconBg}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-800 group-hover:text-emerald-700 transition leading-tight">
                        {mod.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CLEAN CURVED LIGHT-GREEN LOWER WAVE TRANSITION
           ========================================================================= */}
        <div className="relative z-10 w-full overflow-hidden leading-none mt-1">
          <svg
            viewBox="0 0 1440 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-8 sm:h-12 lg:h-14 block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,28 C320,66 580,6 920,38 C1190,62 1330,18 1440,26 L1440,70 L0,70 Z"
              fill="#ecfdf5"
              opacity="0.92"
            />
            <path
              d="M0,42 C380,74 720,20 1080,48 C1290,64 1390,36 1440,42 L1440,70 L0,70 Z"
              fill="#d1fae5"
              opacity="0.75"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
