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
  const highlightFeatures = [
    {
      id: 'crop-selection',
      name: 'Smart Crop Selection',
      icon: Sprout,
      iconBg: 'bg-emerald-100/90 text-emerald-600'
    },
    {
      id: 'crop-doctor',
      name: 'AI Crop Doctor',
      icon: PlusCircle,
      iconBg: 'bg-green-100/90 text-green-600'
    },
    {
      id: 'dashboard',
      name: 'Smart Irrigation',
      icon: Droplets,
      iconBg: 'bg-sky-100/90 text-sky-600'
    },
    {
      id: 'schemes',
      name: 'Government Schemes',
      icon: Landmark,
      iconBg: 'bg-amber-100/90 text-amber-700'
    },
    {
      id: 'profit-calc',
      name: 'Profit Calculator',
      icon: TrendingUp,
      iconBg: 'bg-lime-100/90 text-emerald-700'
    },
    {
      id: 'agro-ai',
      name: 'Multilingual AI Assistant',
      icon: Bot,
      iconBg: 'bg-cyan-100/90 text-cyan-700'
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans select-none bg-[#e8f8ee]">
      {/* =========================================================================
          MAIN HERO SECTION (Realistic Agricultural Landscape + Clean HTML UI)
         ========================================================================= */}
      <section className="relative flex-1 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32">
        {/* Clean 2K Photorealistic Backdrop */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/agronex-hero-backdrop-2k.jpg')"
          }}
        >
          {/* Gentle left-side sunlight scrim for crisp text legibility without washing out crops */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/25 to-transparent w-full md:w-[58%]" />
        </div>

        {/* Hero Foreground Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
          {/* Upper Grid: Left Content + Right Visual Breathing Space */}
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
                Get AI-powered crop recommendations, disease detection, smart irrigation tips and government schemes — all in one place.
              </p>

              {/* Primary CTA: ONLY Get Started Button */}
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

            {/* Right Visual Space (Farmer & Drone in Background) */}
            <div className="lg:col-span-5 xl:col-span-6 min-h-[160px] sm:min-h-[220px] lg:min-h-[300px]" />
          </div>

          {/* =========================================================================
              FEATURE HIGHLIGHT BAR (Translucent White Frosted Glass Bar)
             ========================================================================= */}
          <div className="w-full mt-6 sm:mt-10 mb-4 sm:mb-6">
            <div className="rounded-2xl lg:rounded-full bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_12px_35px_-8px_rgba(0,0,0,0.16)] px-2 py-2 sm:px-3 sm:py-2.5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 lg:divide-x divide-gray-200/70">
                {highlightFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <button
                      key={feat.id}
                      onClick={() => onNavigate(feat.id)}
                      className="px-3 py-2.5 hover:bg-emerald-50/75 rounded-xl lg:rounded-full transition flex items-center gap-2.5 text-left group cursor-pointer"
                      title={`Open ${feat.name}`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition ${feat.iconBg}`}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-xs font-bold text-gray-800 group-hover:text-emerald-700 transition leading-snug">
                        {feat.name}
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
        <div className="relative z-10 w-full overflow-hidden leading-none mt-2">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-14 lg:h-16 block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,32 C320,76 580,6 920,42 C1190,70 1330,22 1440,30 L1440,80 L0,80 Z"
              fill="#ecfdf5"
              opacity="0.92"
            />
            <path
              d="M0,48 C380,84 720,24 1080,56 C1290,74 1390,42 1440,48 L1440,80 L0,80 Z"
              fill="#d1fae5"
              opacity="0.75"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
