import React, { useState } from 'react';
import {
  Compass,
  Sprout,
  Droplets,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface StoryScene {
  step: number;
  title: string;
  tamilTitle: string;
  description: string;
  stats: string;
  badge: string;
  image: string;
  color: string;
}

const scenes: StoryScene[] = [
  {
    step: 1,
    title: 'Aerial View of the Cauvery Delta Valley',
    tamilTitle: 'காவிரி டெல்டா சமவெளி வான்வழிப் பார்வை',
    description: 'Vast continuous green paddy landscapes fed by the historic Grand Anicut (கல்லணை) canal network. Thousands of acres of heritage Samba and Kuruvai rice nurtured by fertile alluvial topsoils.',
    stats: '1.2M+ Cultivated Acres • 60+ Regulated Canal Sluices',
    badge: 'Scene 1: Aerial Farmland Landscape',
    image: '/hero-poster.jpg',
    color: 'from-emerald-900/60 to-emerald-950/80'
  },
  {
    step: 2,
    title: 'Botanical Intricacy & Dew Macro on Rice Blades',
    tamilTitle: 'நெற்பயிரின் நுட்பமான இலை அமைப்பு & பனித்துளி',
    description: 'Sweeping down into the crop canopy. Individually simulated tillers with active photosynthetic stomata, morning dew droplets, parallel monocot venation, and wind-responsive mechanical flexibility.',
    stats: '94% Chlorophyll Density • Morning Dew Infiltration',
    badge: 'Scene 2: Canopy Macro Examination',
    image: '/paddy-macro.jpg',
    color: 'from-green-900/60 to-emerald-950/80'
  },
  {
    step: 3,
    title: 'Subterranean Root & Capillary Nutrient Flow',
    tamilTitle: 'மண்ணின் கீழ் வேர் அமைப்பு மற்றும் ஊட்டச்சத்து ஓட்டம்',
    description: 'Transitioning beneath the topsoil horizon. Fine fibrous adventitious roots branching through alluvial clay loam, absorbing dissolved potassium, phosphorus, and organic nitrogen into the vascular cylinder.',
    stats: '38 cm Root Depth • 68% Moisture Retention Capacity',
    badge: 'Scene 3: Subsurface Underground Stratum',
    image: '/root-cross-section.jpg',
    color: 'from-amber-950/60 to-[#1c0f06]'
  },
  {
    step: 4,
    title: 'Precision Irrigation & Automated Solar Sluices',
    tamilTitle: 'சூரியசக்தி தானியங்கி மதகு & நீர் மேலாண்மை',
    description: 'Automated Alternate Wetting and Drying (AWD) sensors synchronize with solar-powered canal sluice gates and drone surveillance, reducing water dissipation by 30% without sacrificing yield.',
    stats: '3,200 L Saved Daily / Acre • Solar-Powered IoT',
    badge: 'Scene 4: Irrigation Hydrology',
    image: '/smart-sluice-iot.jpg',
    color: 'from-sky-950/60 to-[#04141d]'
  },
  {
    step: 5,
    title: 'Traditional Field Work & Mechanized Land Preparation',
    tamilTitle: 'விவசாயிகள் களப்பணி & டிராக்டர் உழவு',
    description: 'Real-world Indian farm operations: Mahindra tractors churning puddle mud alongside farmers transplanting healthy seedlings under golden morning sunlight.',
    stats: '2.5 Acres / Hour Puddling • Optimized Labor Efficiency',
    badge: 'Scene 5: Ground Realities & Mechanization',
    image: '/tractor-field-real.jpg',
    color: 'from-amber-900/60 to-[#1b120c]'
  },
  {
    step: 6,
    title: 'Golden Panicle Ripening & Harvest Readiness',
    tamilTitle: 'பொன் நிற கதிர்கள் முதிர்ச்சி & அறுவடை நிலை',
    description: 'The culmination of precision agriculture: Heavy drooping panicles filled with nutrient-dense Samba rice grains ready for combine harvest and direct fair-trade mandi bidding.',
    stats: '14-16% Ideal Moisture • Maximum Bidding Grade',
    badge: 'Scene 6: Golden Harvest Realized',
    image: '/paddy-golden-panicle.jpg',
    color: 'from-yellow-950/70 to-[#0e0a02]'
  }
];

export default function CinematicStoryScroll({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentScene = scenes[activeIdx];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Cinematic Agricultural Storytelling</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          From Rural Farmland to Digital Intelligence
        </h2>
        <p className="text-xs sm:text-sm text-gray-300">
          Experience the journey through aerial landscape, botanical crop structures, subterranean roots, and AI telemetry.
        </p>
      </div>

      {/* Interactive Story Progression Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Storyboard Selector */}
        <div className="lg:col-span-5 space-y-2.5">
          {scenes.map((sc, idx) => {
            const active = idx === activeIdx;
            return (
              <div
                key={sc.step}
                onClick={() => setActiveIdx(idx)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                  active
                    ? 'bg-[#0b2716] border-emerald-500 text-white shadow-xl shadow-emerald-950/60 scale-102'
                    : 'bg-[#05140b] border-emerald-900/40 text-gray-400 hover:bg-[#092013] hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      active ? 'bg-emerald-500 text-black' : 'bg-emerald-950 text-emerald-400'
                    }`}
                  >
                    0{sc.step}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-tight">{sc.title}</h4>
                    <span className="text-[10px] text-emerald-400/80 block mt-0.5">{sc.tamilTitle}</span>
                  </div>
                </div>
                {active && <ChevronRightIcon className="w-4 h-4 text-emerald-400 shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Right Column: Cinematic Scene Visual Card with Real Agricultural Photography */}
        <div className="lg:col-span-7">
          <div
            className={`bg-gradient-to-br ${currentScene.color} border border-emerald-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 transition-all duration-500`}
          >
            {/* Real Photograph with Gradient Overlay */}
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-xl border border-white/15">
              <img
                src={currentScene.image}
                alt={currentScene.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                {currentScene.badge}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90 font-medium">
                {currentScene.stats}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {currentScene.title}
                </h3>
                <span className="text-xs text-emerald-400 font-bold">Step {currentScene.step} of 6</span>
              </div>
              <p className="text-xs text-emerald-300 font-semibold">
                {currentScene.tamilTitle}
              </p>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed pt-1">
                {currentScene.description}
              </p>
            </div>

            {/* Navigation & Action Controls */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeIdx === 0}
                  onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-xl bg-gray-800 text-gray-300 text-xs disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  disabled={activeIdx === scenes.length - 1}
                  onClick={() => setActiveIdx((prev) => Math.min(scenes.length - 1, prev + 1))}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white text-xs disabled:opacity-40"
                >
                  Next
                </button>
              </div>

              <button
                onClick={() => onNavigate('digital-twin')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition"
              >
                <span>Enter 3D Digital Farm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
