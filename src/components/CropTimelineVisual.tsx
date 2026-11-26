import React from 'react';
import { CropGrowthStageDetail } from '../types';
import {
  Calendar,
  Droplets,
  Sun,
  Sprout,
  Layers,
  ChevronRight,
  Package
} from 'lucide-react';

interface CropTimelineVisualProps {
  cropKey: string;
  stages: CropGrowthStageDetail[];
  activeStageNumber: number;
  onSelectStage: (stage: CropGrowthStageDetail, index: number) => void;
}

interface CropMetadata {
  title: string;
  duration: string;
  waterReq: string;
  npk: string;
  climate: string;
  soilType: string;
  accentColor: string;
}

const CROP_META: Record<string, CropMetadata> = {
  Paddy: {
    title: 'Paddy (Rice) Growth Timeline',
    duration: '110 – 150 Days',
    waterReq: '≈ 1200 – 1500 mm',
    npk: '≈ 120:60:60 kg/ha',
    climate: 'Tropical & Subtropical',
    soilType: 'Clay, Loam, Alluvial',
    accentColor: '#eab308'
  },
  Banana: {
    title: 'Banana (Grand Naine) Growth Timeline',
    duration: '270 – 330 Days',
    waterReq: '≈ 1800 – 2200 mm',
    npk: '≈ 200:60:300 g/plant',
    climate: 'Warm Humid Tropical',
    soilType: 'Deep Loam, Clay Loam',
    accentColor: '#84cc16'
  },
  Sugarcane: {
    title: 'Sugarcane (Co 86032) Growth Timeline',
    duration: '300 – 360 Days',
    waterReq: '≈ 1800 – 2500 mm',
    npk: '≈ 275:63:115 kg/ha',
    climate: 'Hot Sunny Tropical',
    soilType: 'Loam, Deep Clay Loam',
    accentColor: '#22c55e'
  },
  Groundnut: {
    title: 'Groundnut (Kadiri 6) Growth Timeline',
    duration: '100 – 115 Days',
    waterReq: '≈ 500 – 650 mm',
    npk: '≈ 25:50:75 kg/ha + Gypsum',
    climate: 'Warm Dry & Semi-Arid',
    soilType: 'Red Loam, Sandy Loam',
    accentColor: '#f59e0b'
  },
  Turmeric: {
    title: 'Erode Turmeric Growth Timeline',
    duration: '210 – 240 Days',
    waterReq: '≈ 1200 – 1500 mm',
    npk: '≈ 150:60:108 kg/ha',
    climate: 'Warm Humid Monsoon',
    soilType: 'Well-drained Red/Loam',
    accentColor: '#f97316'
  },
  Ragi: {
    title: 'Finger Millet (Ragi) Growth Timeline',
    duration: '95 – 110 Days',
    waterReq: '≈ 350 – 450 mm',
    npk: '≈ 60:30:30 kg/ha',
    climate: 'Semi-Arid & Drought Prone',
    soilType: 'Red Loam, Sandy Loam',
    accentColor: '#b45309'
  },
  Maize: {
    title: 'Hybrid Maize Growth Timeline',
    duration: '95 – 110 Days',
    waterReq: '≈ 500 – 750 mm',
    npk: '≈ 135:62:50 kg/ha',
    climate: 'Warm Sunny Subtropical',
    soilType: 'Fertile Loam, Red Loam',
    accentColor: '#facc15'
  },
  Cotton: {
    title: 'Bt Cotton Growth Timeline',
    duration: '150 – 170 Days',
    waterReq: '≈ 700 – 900 mm',
    npk: '≈ 120:60:60 kg/ha',
    climate: 'Warm Semi-Arid',
    soilType: 'Black Cotton, Clay Loam',
    accentColor: '#f8fafc'
  }
};

/**
 * Renders a crop-specific botanical SVG plant at a given growth progress (0 to 1)
 */
function CropBotanicalSvg({
  cropKey,
  progress,
  compact = false
}: {
  cropKey: string;
  progress: number;
  compact?: boolean;
}) {
  const scale = 0.45 + progress * 0.55;
  const h = compact ? 76 : 128;
  const w = compact ? 76 : 96;

  // Stage 0: Seed / Rhizome / Sett in soil
  if (progress <= 0.05) {
    return (
      <svg width={w} height={h} viewBox="0 0 100 120" className="overflow-visible">
        {cropKey === 'Banana' ? (
          <g transform="translate(50, 102)">
            <ellipse cx="0" cy="4" rx="14" ry="10" fill="#78350f" />
            <path d="M-4,0 Q0,-18 6,-14 Q4,-4 2,2 Z" fill="#84cc16" />
          </g>
        ) : cropKey === 'Sugarcane' ? (
          <g transform="translate(50, 106)">
            <rect x="-18" y="-5" width="36" height="10" rx="4" fill="#a3e635" stroke="#4d7c0f" strokeWidth="1.5" />
            <circle cx="-6" cy="-5" r="2.5" fill="#fef08a" />
            <circle cx="8" cy="-5" r="2.5" fill="#fef08a" />
          </g>
        ) : cropKey === 'Turmeric' ? (
          <g transform="translate(50, 104)">
            <ellipse cx="-5" cy="2" rx="12" ry="7" fill="#ea580c" />
            <ellipse cx="8" cy="4" rx="9" ry="5" fill="#f97316" />
            <path d="M-2,-3 Q2,-14 6,-12" stroke="#84cc16" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <g transform="translate(50, 105)">
            <ellipse cx="-6" cy="2" rx="8" ry="5" fill="#d97706" transform="rotate(-15)" />
            <ellipse cx="6" cy="3" rx="8" ry="5" fill="#f59e0b" transform="rotate(12)" />
          </g>
        )}
      </svg>
    );
  }

  // Germination sprout
  if (progress <= 0.22) {
    return (
      <svg width={w} height={h} viewBox="0 0 100 120" className="overflow-visible">
        <g transform="translate(50, 112)">
          <path d="M0,0 Q-2,12 -8,16 M0,0 Q3,10 7,15" stroke="#d97706" strokeWidth="1.5" fill="none" />
          <ellipse cx="-4" cy="-2" rx="6" ry="4" fill="#f59e0b" />
          <path d="M0,-2 Q2,-22 10,-28 Q4,-18 2,-2 Z" fill="#84cc16" />
          <path d="M0,-4 Q-6,-18 -12,-22 Q-5,-14 -1,-2 Z" fill="#65a30d" />
        </g>
      </svg>
    );
  }

  // Crop-specific progressive morphology
  if (cropKey === 'Banana') {
    const stemH = 28 + progress * 62;
    const hasFlower = progress >= 0.62;
    const hasBunch = progress >= 0.78;
    return (
      <svg width={w} height={h} viewBox="0 0 100 120" className="overflow-visible">
        <g transform="translate(50, 112)">
          {/* Fibrous roots */}
          <path d="M-4,0 Q-10,10 -18,14 M0,0 L0,15 M4,0 Q12,9 18,13" stroke="#a16207" strokeWidth="1.5" fill="none" />
          {/* Broad paddle leaves */}
          <path d={`M-2,-${stemH * 0.75} Q-38,-${stemH + 14} -42,-${stemH - 6} Q-22,-${stemH - 12} -2,-${stemH * 0.65} Z`} fill="#22c55e" />
          <path d={`M2,-${stemH * 0.75} Q38,-${stemH + 16} 42,-${stemH - 4} Q22,-${stemH - 12} 2,-${stemH * 0.65} Z`} fill="#16a34a" />
          <path d={`M0,-${stemH} Q-20,-${stemH + 28} -30,-${stemH + 8} Q-12,-${stemH - 2} 0,-${stemH * 0.85} Z`} fill="#4ade80" />
          <path d={`M0,-${stemH} Q22,-${stemH + 26} 32,-${stemH + 6} Q12,-${stemH - 2} 0,-${stemH * 0.85} Z`} fill="#22c55e" />
          {/* Pseudostem */}
          <rect x="-5" y={-stemH} width="10" height={stemH} rx="3" fill="#65a30d" />
          {/* Inflorescence / Banana Bunch */}
          {hasFlower && (
            <g transform={`translate(10, -${stemH - 4})`}>
              <path d="M-8,0 Q4,-6 10,8" stroke="#4d7c0f" strokeWidth="3" fill="none" />
              {hasBunch && (
                <g transform="translate(8, 8)">
                  <path d="M-6,0 Q0,4 6,0 L5,7 Q0,10 -5,7 Z" fill={progress > 0.9 ? '#facc15' : '#84cc16'} />
                  <path d="M-5,8 Q0,12 5,8 L4,15 Q0,18 -4,15 Z" fill={progress > 0.9 ? '#eab308' : '#65a30d'} />
                </g>
              )}
            </g>
          )}
        </g>
      </svg>
    );
  }

  if (cropKey === 'Sugarcane') {
    const caneH = 35 + progress * 68;
    const stalks = progress > 0.45 ? [-10, 0, 10] : [-5, 5];
    return (
      <svg width={w} height={h} viewBox="0 0 100 120" className="overflow-visible">
        <g transform="translate(50, 112)">
          <path d="M-6,0 Q-12,10 -18,14 M0,0 L0,15 M6,0 Q12,10 18,14" stroke="#a16207" strokeWidth="1.5" fill="none" />
          {stalks.map((x, idx) => (
            <g key={idx} transform={`translate(${x}, 0)`}>
              {/* Jointed cane stalk */}
              <rect x="-2.5" y={-caneH} width="5" height={caneH} rx="2" fill={progress > 0.85 ? '#bef264' : '#65a30d'} />
              {/* Internode rings */}
              {[0.25, 0.5, 0.75].map((r, ri) => (
                <line key={ri} x1="-3" y1={-caneH * r} x2="3" y2={-caneH * r} stroke="#365314" strokeWidth="1.2" />
              ))}
              {/* Long arching cane leaves */}
              <path d={`M0,-${caneH} Q-18,-${caneH + 18} -28,-${caneH - 4}`} stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d={`M0,-${caneH} Q18,-${caneH + 18} 28,-${caneH - 4}`} stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d={`M0,-${caneH * 0.85} Q-14,-${caneH + 6} -22,-${caneH - 14}`} stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>
          ))}
        </g>
      </svg>
    );
  }

  if (cropKey === 'Groundnut') {
    const bushW = 16 + progress * 24;
    const bushH = 22 + progress * 34;
    const hasFlowers = progress >= 0.45 && progress <= 0.78;
    const hasPods = progress >= 0.62;
    return (
      <svg width={w} height={h} viewBox="0 0 100 120" className="overflow-visible">
        <g transform="translate(50, 110)">
          {/* Underground taproot & peanut pods */}
          <path d="M0,0 L0,18 M0,6 Q-10,12 -16,14 M0,6 Q10,12 16,14" stroke="#b45309" strokeWidth="1.5" fill="none" />
          {hasPods && (
            <g>
              <path d="M-12,0 L-14,10" stroke="#a3e635" strokeWidth="1.5" />
              <path d="M12,0 L14,10" stroke="#a3e635" strokeWidth="1.5" />
              <ellipse cx="-14" cy="12" rx="6" ry="3.5" fill="#d97706" />
              <ellipse cx="14" cy="12" rx="6" ry="3.5" fill="#d97706" />
              <ellipse cx="-6" cy="14" rx="5" ry="3" fill="#f59e0b" />
            </g>
          )}
          {/* Bushy tetrafoliate foliage */}
          <ellipse cx="0" cy={-bushH * 0.55} rx={bushW} ry={bushH * 0.55} fill={progress > 0.88 ? '#84cc16' : '#22c55e'} />
          <ellipse cx={-bushW * 0.45} cy={-bushH * 0.4} rx={bushW * 0.55} ry={bushH * 0.4} fill="#16a34a" />
          <ellipse cx={bushW * 0.45} cy={-bushH * 0.4} rx={bushW * 0.55} ry={bushH * 0.4} fill="#4ade80" />
          {/* Yellow flowers */}
          {hasFlowers && (
            <g>
              <circle cx="-12" cy={-bushH * 0.5} r="3.5" fill="#facc15" />
              <circle cx="11" cy={-bushH * 0.6} r="3.5" fill="#facc15" />
              <circle cx="0" cy={-bushH * 0.8} r="3" fill="#fde047" />
            </g>
          )}
        </g>
      </svg>
    );
  }

  if (cropKey === 'Turmeric') {
    const leafH = 30 + progress * 55;
    const hasRhizomes = progress >= 0.6;
    return (
      <svg width={w} height={h} viewBox="0 0 100 120" className="overflow-visible">
        <g transform="translate(50, 110)">
          {hasRhizomes && (
            <g>
              <ellipse cx="-10" cy="8" rx="8" ry="4.5" fill="#ea580c" />
              <ellipse cx="8" cy="9" rx="9" ry="4.5" fill="#f97316" />
              <ellipse cx="0" cy="12" rx="7" ry="4" fill="#fb923c" />
            </g>
          )}
          {/* Broad lanceolate turmeric leaves */}
          <path d={`M0,0 Q-26,-${leafH * 0.7} -22,-${leafH} Q-4,-${leafH * 0.5} 0,0 Z`} fill={progress > 0.88 ? '#eab308' : '#16a34a'} />
          <path d={`M0,0 Q26,-${leafH * 0.7} 22,-${leafH} Q4,-${leafH * 0.5} 0,0 Z`} fill={progress > 0.88 ? '#ca8a04' : '#22c55e'} />
          <path d={`M0,0 Q-10,-${leafH * 0.9} 0,-${leafH + 10} Q10,-${leafH * 0.9} 0,0 Z`} fill={progress > 0.88 ? '#facc15' : '#4ade80'} />
        </g>
      </svg>
    );
  }

  if (cropKey === 'Maize') {
    const stalkH = 32 + progress * 68;
    const hasTassel = progress >= 0.62;
    const hasCob = progress >= 0.7;
    return (
      <svg width={w} height={h} viewBox="0 0 100 120" className="overflow-visible">
        <g transform="translate(50, 112)">
          <path d="M-4,0 Q-10,10 -15,14 M0,0 L0,15 M4,0 Q10,10 15,14" stroke="#a16207" strokeWidth="1.5" fill="none" />
          {/* Broad waving corn leaves */}
          <path d={`M0,-${stalkH * 0.4} Q-22,-${stalkH * 0.6} -30,-${stalkH * 0.35}`} stroke="#16a34a" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d={`M0,-${stalkH * 0.55} Q22,-${stalkH * 0.75} 30,-${stalkH * 0.5}`} stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d={`M0,-${stalkH * 0.78} Q-20,-${stalkH * 0.95} -26,-${stalkH * 0.72}`} stroke="#4ade80" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <rect x="-3" y={-stalkH} width="6" height={stalkH} rx="2" fill="#65a30d" />
          {hasTassel && (
            <path d={`M0,-${stalkH} L-8,-${stalkH + 12} M0,-${stalkH} L0,-${stalkH + 14} M0,-${stalkH} L8,-${stalkH + 12}`} stroke="#facc15" strokeWidth="2" />
          )}
          {hasCob && (
            <ellipse cx="7" cy={-stalkH * 0.52} rx="5" ry="11" fill={progress > 0.85 ? '#eab308' : '#84cc16'} transform={`rotate(22, 7, -${stalkH * 0.52})`} />
          )}
        </g>
      </svg>
    );
  }

  if (cropKey === 'Cotton') {
    const bushH = 28 + progress * 58;
    const hasFlower = progress >= 0.55 && progress < 0.82;
    const hasBolls = progress >= 0.75;
    return (
      <svg width={w} height={h} viewBox="0 0 100 120" className="overflow-visible">
        <g transform="translate(50, 112)">
          <path d="M0,0 L0,16" stroke="#92400e" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2={-bushH} stroke="#78350f" strokeWidth="3" />
          <line x1="0" y1={-bushH * 0.4} x2="-20" y2={-bushH * 0.65} stroke="#78350f" strokeWidth="2" />
          <line x1="0" y1={-bushH * 0.5} x2="20" y2={-bushH * 0.75} stroke="#78350f" strokeWidth="2" />
          <circle cx="-18" cy={-bushH * 0.68} r="10" fill="#16a34a" />
          <circle cx="18" cy={-bushH * 0.76} r="10" fill="#22c55e" />
          <circle cx="0" cy={-bushH * 0.9} r="12" fill="#15803d" />
          {hasFlower && (
            <>
              <circle cx="-16" cy={-bushH * 0.72} r="4.5" fill="#fbcfe8" />
              <circle cx="16" cy={-bushH * 0.82} r="4.5" fill="#fef08a" />
            </>
          )}
          {hasBolls && (
            <>
              <circle cx="-18" cy={-bushH * 0.65} r="5.5" fill={progress > 0.85 ? '#ffffff' : '#4d7c0f'} stroke="#d1d5db" strokeWidth="1" />
              <circle cx="18" cy={-bushH * 0.75} r="5.5" fill={progress > 0.85 ? '#ffffff' : '#4d7c0f'} stroke="#d1d5db" strokeWidth="1" />
              <circle cx="0" cy={-bushH * 0.88} r="6" fill={progress > 0.85 ? '#ffffff' : '#4d7c0f'} stroke="#d1d5db" strokeWidth="1" />
            </>
          )}
        </g>
      </svg>
    );
  }

  // Default / Paddy & Ragi: Grass tillers + Panicles / Finger Earheads
  const blades = Math.round(3 + progress * 7);
  const stalkH = 30 + progress * 64;
  const hasGrain = progress >= 0.65;
  const grainColor = cropKey === 'Ragi' ? '#b45309' : progress > 0.85 ? '#eab308' : '#a3e635';
  const leafColor = progress > 0.88 ? '#ca8a04' : '#22c55e';

  return (
    <svg width={w} height={h} viewBox="0 0 100 120" className="overflow-visible">
      <g transform="translate(50, 112)">
        <path d="M-5,0 Q-12,10 -16,15 M0,0 L0,16 M5,0 Q12,10 16,15" stroke="#a16207" strokeWidth="1.3" fill="none" />
        {Array.from({ length: blades }).map((_, i) => {
          const offset = (i - (blades - 1) / 2) * (18 / blades) * 2;
          const curve = offset * 1.4;
          return (
            <g key={i}>
              <path
                d={`M0,0 Q${curve * 0.4},-${stalkH * 0.5} ${curve},-${stalkH}`}
                stroke={i % 2 === 0 ? leafColor : '#16a34a'}
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
              />
              {hasGrain && i % 2 === 0 && (
                <path
                  d={`M${curve},-${stalkH} Q${curve + (offset >= 0 ? 10 : -10)},-${stalkH + 6} ${curve + (offset >= 0 ? 14 : -14)},-${stalkH - 8}`}
                  stroke={grainColor}
                  strokeWidth="3.2"
                  fill="none"
                  strokeLinecap="round"
                />
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default function CropTimelineVisual({
  cropKey,
  stages,
  activeStageNumber,
  onSelectStage
}: CropTimelineVisualProps) {
  const meta = CROP_META[cropKey] || CROP_META['Paddy'];

  return (
    <div className="rounded-3xl overflow-hidden border border-emerald-500/40 shadow-2xl bg-[#04140a]">
      {/* 1. TOP BANNER HEADER (Matching Reference Image 1) */}
      <div className="bg-gradient-to-r from-[#062413] via-[#0a361d] to-[#062413] px-5 py-4 border-b border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-black text-emerald-300 uppercase tracking-widest block">
              AGRONEX Botanical Lifecycle
            </span>
            <span className="text-xs text-gray-300">
              {cropKey} • Field Phenological Progression
            </span>
          </div>
        </div>

        {/* Center Green Pill Title */}
        <div className="text-center">
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-700 to-green-600 border border-emerald-400/50 shadow-lg">
            <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
              {meta.title}
            </h3>
          </div>
          <p className="text-[11px] text-emerald-200/80 font-medium mt-1">
            From Seed to Harvest – Complete Growth Journey
          </p>
        </div>

        {/* Right Total Duration Box */}
        <div className="flex items-center gap-2.5 bg-black/40 border border-emerald-500/30 px-4 py-2 rounded-2xl">
          <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Total Duration</span>
            <span className="text-sm font-black text-white">{meta.duration}</span>
          </div>
        </div>
      </div>

      {/* 2. SKY-TO-SOIL PROGRESSIVE GROWTH TIMELINE SCENE */}
      <div className="relative overflow-x-auto bg-gradient-to-b from-sky-400/85 via-sky-200/80 to-emerald-100/90">
        {/* Sunny Sky & Horizon Farmland Hills */}
        <div className="min-w-[820px] relative pt-6">
          {/* Sun & Horizon */}
          <div className="absolute top-3 left-8 w-16 h-16 rounded-full bg-yellow-200/70 blur-xl pointer-events-none" />
          <div
            className="absolute inset-x-0 bottom-14 h-24 opacity-40 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 25% 100%, #15803d 0%, transparent 65%), radial-gradient(ellipse at 75% 100%, #166534 0%, transparent 65%)'
            }}
          />

          {/* Plant Progression Row */}
          <div
            className="relative z-10 grid px-4 pt-2 items-end"
            style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
          >
            {stages.map((stage, idx) => {
              const progress = stages.length > 1 ? idx / (stages.length - 1) : 1;
              const isActive = stage.stageNumber === activeStageNumber;
              return (
                <div
                  key={stage.stageNumber}
                  onClick={() => onSelectStage(stage, idx)}
                  className="flex flex-col items-center cursor-pointer group relative"
                >
                  {/* Floating Day + Stage Pill */}
                  <div
                    className={`mb-2 px-2.5 py-1.5 rounded-xl text-center shadow-md border transition-all ${
                      isActive
                        ? 'bg-emerald-700 text-white border-emerald-300 scale-105'
                        : 'bg-white/95 text-gray-900 border-emerald-200 group-hover:bg-emerald-50'
                    }`}
                  >
                    <div className="text-[11px] font-black leading-tight">{stage.dayRange}</div>
                    <div className="text-[9px] font-semibold opacity-85 line-clamp-1 max-w-[100px]">
                      ({stage.stageName.split(' ')[0]})
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div
                    className={`w-[1.5px] h-5 transition-colors ${
                      isActive ? 'bg-emerald-700' : 'bg-gray-600/50'
                    }`}
                  />

                  {/* Crop-Specific Botanical Plant SVG */}
                  <div className="transition-transform duration-300 group-hover:scale-105 -mb-2">
                    <CropBotanicalSvg cropKey={cropKey} progress={progress} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rich Soil Cross-Section Strip */}
          <div className="relative z-20 h-10 bg-gradient-to-b from-[#451a03] via-[#361503] to-[#1c0a01] border-t-4 border-[#65a30d] shadow-inner flex items-center justify-around px-4">
            <span className="text-[10px] font-mono text-amber-200/40 tracking-widest uppercase">
              Topsoil Root Horizon • {meta.soilType}
            </span>
          </div>
        </div>
      </div>

      {/* 3. STAGE CARDS STRIP BELOW SOIL (Matching Reference Image 1 Bottom Cards) */}
      <div className="p-4 sm:p-5 bg-[#04140a] overflow-x-auto">
        <div
          className="min-w-[820px] grid gap-3"
          style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
        >
          {stages.map((stage, idx) => {
            const progress = stages.length > 1 ? idx / (stages.length - 1) : 1;
            const isActive = stage.stageNumber === activeStageNumber;
            const shortTitle = stage.stageName.split('&')[0].split('(')[0].trim();
            return (
              <div
                key={stage.stageNumber}
                onClick={() => onSelectStage(stage, idx)}
                className={`rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'border-emerald-400 ring-2 ring-emerald-400/50 bg-[#f0fdf4] -translate-y-1 shadow-xl'
                    : 'border-emerald-900/60 bg-white/95 hover:border-emerald-400/60'
                }`}
              >
                {/* Green Stage Title Header */}
                <div className="bg-gradient-to-r from-emerald-700 to-green-600 px-2.5 py-2 text-center">
                  <span className="text-[11px] font-black text-white line-clamp-1">
                    {stage.stageNumber}. {shortTitle}
                  </span>
                </div>

                {/* Stage Visual Preview (Crop-Specific!) */}
                <div className="h-24 bg-gradient-to-b from-sky-100 to-emerald-100 flex items-center justify-center relative overflow-hidden border-b border-emerald-200">
                  <CropBotanicalSvg cropKey={cropKey} progress={progress} compact />
                  <span className="absolute bottom-1 right-1.5 text-[8px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-800/80 text-white">
                    {cropKey}
                  </span>
                </div>

                {/* Day / Stage / Action Summary */}
                <div className="p-2.5 text-[10px] text-gray-800 space-y-1 flex-1">
                  <div>
                    <strong className="text-emerald-800">Day:</strong> {stage.dayRange.replace('Day ', '')}
                  </div>
                  <div>
                    <strong className="text-emerald-800">Stage:</strong>{' '}
                    <span className="line-clamp-1">{stage.stageName}</span>
                  </div>
                  <div className="pt-0.5 border-t border-emerald-900/10">
                    <strong className="text-emerald-800">Action:</strong>{' '}
                    <span className="text-gray-700 line-clamp-2">
                      {stage.keyFarmingActivities[0] || stage.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BOTTOM AGRONOMIC SUMMARY BAR */}
      <div className="bg-[#030f07] border-t border-emerald-900/70 px-5 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto flex-1 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Water Requirement</span>
              <strong className="text-white">{meta.waterReq}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Fertilizer (NPK)</span>
              <strong className="text-white">{meta.npk}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-yellow-500/15 text-yellow-400 flex items-center justify-center shrink-0">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Suitable Climate</span>
              <strong className="text-white">{meta.climate}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Soil Type</span>
              <strong className="text-white">{meta.soilType}</strong>
            </div>
          </div>
        </div>

        <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shrink-0">
          <Sprout className="w-4 h-4" />
          <span>Healthy {cropKey}, Happy Farmer</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
