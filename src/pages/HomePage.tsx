import React from 'react';
import {
  Sprout,
  PlusCircle,
  Droplets,
  Landmark,
  TrendingUp,
  Bot,
  ArrowRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  // The six features for the floating highlight bar
  const highlightFeatures = [
    {
      id: 'crop-selection',
      name: 'Smart Crop Selection',
      icon: Sprout,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'crop-doctor',
      name: 'AI Crop Doctor',
      icon: PlusCircle,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'dashboard',
      name: 'Smart Irrigation',
      icon: Droplets,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50 text-blue-500'
    },
    {
      id: 'schemes',
      name: 'Government Schemes',
      icon: Landmark,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 text-amber-600'
    },
    {
      id: 'profit-calc',
      name: 'Profit Calculator',
      icon: TrendingUp,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'agro-ai',
      name: 'Multilingual AI Assistant',
      icon: Bot,
      iconColor: 'text-cyan-600',
      iconBg: 'bg-cyan-50 text-cyan-600'
    }
  ];

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between overflow-x-hidden font-sans select-none bg-gradient-to-b from-[#f0fbf4] via-[#f7fdf9] to-[#dcfce7]/60">
      {/* =========================================================================
          1. MAIN HERO SECTION (Lush Agricultural Landscape with Realistic Visuals)
         ========================================================================= */}
      <section className="relative flex-1 flex flex-col justify-between pt-6 sm:pt-10 lg:pt-14 pb-4">
        {/* Photorealistic Agricultural Landscape Backdrop */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-[center_top]"
          style={{
            backgroundImage: "url('/agronex-hero-backdrop-2k.jpg')"
          }}
        >
          {/* Subtle natural daylight gradient overlay on the left to ensure 100% typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent w-full md:w-[65%]" />
        </div>

        {/* Content Container (Constrained & Responsive) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
          {/* Upper Hero Grid: Left Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 sm:pt-6">
            <div className="lg:col-span-7 xl:col-span-6 space-y-3 sm:space-y-4">
              {/* Small Tagline with Green Accent Line */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide">
                  Empowering Indian Farmers with AI
                </span>
                <span className="h-[2px] w-12 sm:w-16 bg-emerald-600 rounded-full" />
              </div>

              {/* Main Brand Title: AGRONEX */}
              <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.98] text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-900 drop-shadow-sm">
                AGRONEX
              </h1>

              {/* Secondary Bold Subtitle */}
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-black text-gray-900 tracking-tight leading-tight">
                Smart Farming. Smarter Future.
              </h2>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base lg:text-[1.05rem] text-gray-700 font-medium leading-relaxed max-w-lg pt-1 pb-2">
                Get AI-powered crop recommendations, disease detection, smart irrigation tips and government schemes — all in one place.
              </p>

              {/* Primary Call to Action: ONLY Get Started Button */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-3.5 px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-700/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                  </div>
                  <span>Get Started</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Area Spacer (Farmer & Drone are integrated in background) */}
            <div className="lg:col-span-5 xl:col-span-6 min-h-[140px] sm:min-h-[200px] lg:min-h-[280px]" />
          </div>

          {/* =========================================================================
              2. FEATURE HIGHLIGHT BAR (Wide Translucent White Glass Bar with 6 Items)
             ========================================================================= */}
          <div className="w-full mt-8 sm:mt-12 lg:mt-16">
            <div className="rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-2xl border border-white/75 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.18)] p-1.5 sm:p-2.5 transition-all">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/60">
                {highlightFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <button
                      key={feat.id}
                      onClick={() => onNavigate(feat.id)}
                      className="px-2.5 sm:px-3 py-2.5 sm:py-3 hover:bg-emerald-50/70 rounded-xl sm:rounded-full transition flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer"
                      title={`Open ${feat.name}`}
                    >
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-xs shrink-0 group-hover:scale-110 transition ${feat.iconBg}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs sm:text-[13px] font-extrabold text-gray-900 group-hover:text-emerald-700 transition block leading-tight">
                          {feat.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. SMOOTH LIGHT-GREEN LOWER CURVED WAVES (Ends cleanly as in reference)
           ========================================================================= */}
        <div className="relative w-full overflow-hidden leading-none mt-6 sm:mt-8">
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-16 lg:h-20 block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,35 C320,80 560,10 880,45 C1180,75 1320,20 1440,30 L1440,90 L0,90 Z"
              fill="#dcfce7"
              opacity="0.85"
            />
            <path
              d="M0,50 C360,95 680,25 1040,60 C1280,85 1380,40 1440,50 L1440,90 L0,90 Z"
              fill="#bbf7d0"
              opacity="0.65"
            />
            <path
              d="M0,65 C420,95 820,45 1200,75 L1440,65 L1440,90 L0,90 Z"
              fill="#86efac"
              opacity="0.45"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}