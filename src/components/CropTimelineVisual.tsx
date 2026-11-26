import React from 'react';
import { CropGrowthStageDetail } from '../types';
import { getFieldCropImage } from '../utils/cropImages';
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
}

const CROP_META: Record<string, CropMetadata> = {
  Paddy: {
    title: 'Paddy (Rice) Growth Timeline',
    duration: '110 – 150 Days',
    waterReq: '≈ 1200 – 1500 mm',
    npk: '≈ 120:60:60 kg/ha',
    climate: 'Tropical & Subtropical',
    soilType: 'Clay, Loam, Alluvial'
  },
  Banana: {
    title: 'Banana (Grand Naine) Growth Timeline',
    duration: '270 – 330 Days',
    waterReq: '≈ 1800 – 2200 mm',
    npk: '≈ 200:60:300 g/plant',
    climate: 'Warm Humid Tropical',
    soilType: 'Deep Loam, Clay Loam'
  },
  Sugarcane: {
    title: 'Sugarcane (Co 86032) Growth Timeline',
    duration: '300 – 360 Days',
    waterReq: '≈ 1800 – 2500 mm',
    npk: '≈ 275:63:115 kg/ha',
    climate: 'Hot Sunny Tropical',
    soilType: 'Loam, Deep Clay Loam'
  },
  Groundnut: {
    title: 'Groundnut (Kadiri 6) Growth Timeline',
    duration: '100 – 115 Days',
    waterReq: '≈ 500 – 650 mm',
    npk: '≈ 25:50:75 kg/ha + Gypsum',
    climate: 'Warm Dry & Semi-Arid',
    soilType: 'Red Loam, Sandy Loam'
  },
  Turmeric: {
    title: 'Erode Turmeric Growth Timeline',
    duration: '210 – 240 Days',
    waterReq: '≈ 1200 – 1500 mm',
    npk: '≈ 150:60:108 kg/ha',
    climate: 'Warm Humid Monsoon',
    soilType: 'Well-drained Red/Loam'
  },
  Ragi: {
    title: 'Finger Millet (Ragi) Growth Timeline',
    duration: '95 – 110 Days',
    waterReq: '≈ 350 – 450 mm',
    npk: '≈ 60:30:30 kg/ha',
    climate: 'Semi-Arid & Drought Prone',
    soilType: 'Red Loam, Sandy Loam'
  },
  Maize: {
    title: 'Hybrid Maize Growth Timeline',
    duration: '95 – 110 Days',
    waterReq: '≈ 500 – 750 mm',
    npk: '≈ 135:62:50 kg/ha',
    climate: 'Warm Sunny Subtropical',
    soilType: 'Fertile Loam, Red Loam'
  },
  Cotton: {
    title: 'Bt Cotton Growth Timeline',
    duration: '150 – 170 Days',
    waterReq: '≈ 700 – 900 mm',
    npk: '≈ 120:60:60 kg/ha',
    climate: 'Warm Semi-Arid',
    soilType: 'Black Cotton, Clay Loam'
  }
};

export default function CropTimelineVisual({
  cropKey,
  stages,
  activeStageNumber,
  onSelectStage
}: CropTimelineVisualProps) {
  const meta = CROP_META[cropKey] || CROP_META['Paddy'];
  const fallbackImg = getFieldCropImage(cropKey);

  return (
    <div className="rounded-3xl overflow-hidden border border-emerald-500/40 shadow-2xl bg-[#04140a]">
      {/* 1. TOP BANNER HEADER */}
      <div className="bg-gradient-to-r from-[#062413] via-[#0a361d] to-[#062413] px-5 py-4 border-b border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl overflow-hidden border border-emerald-400/50 shadow-md shrink-0">
            <img
              src={fallbackImg}
              alt={cropKey}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[11px] font-black text-emerald-300 uppercase tracking-widest block">
              AGRONEX • {cropKey} Lifecycle
            </span>
            <span className="text-xs text-gray-300">
              Verified Field Phenological Progression
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

      {/* 2. REALISTIC SKY-TO-SOIL PHOTOGRAPHIC PROGRESSION SCENE */}
      <div className="relative overflow-x-auto">
        <div
          className="min-w-[820px] relative pt-8 bg-cover bg-center"
          style={{ backgroundImage: "url('/dashboard-bg.jpg')" }}
        >
          {/* Bright daylight sky-to-field gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 via-transparent to-[#071f10]/85 pointer-events-none" />

          {/* Progressive Realistic Stage Nodes stepped upward */}
          <div
            className="relative z-10 grid px-4 pt-2 items-end"
            style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
          >
            {stages.map((stage, idx) => {
              const progress = stages.length > 1 ? idx / (stages.length - 1) : 1;
              const isActive = stage.stageNumber === activeStageNumber;
              // Step elevation upward from seed (0px) to harvest (48px)
              const stemHeight = Math.round(14 + progress * 46);
              const photoSize = Math.round(70 + progress * 18);
              const stageImg = stage.imageUrl || fallbackImg;

              return (
                <div
                  key={stage.stageNumber}
                  onClick={() => onSelectStage(stage, idx)}
                  className="flex flex-col items-center cursor-pointer group relative"
                >
                  {/* Floating Day + Stage Pill */}
                  <div
                    className={`mb-2 px-2.5 py-1.5 rounded-xl text-center shadow-lg border transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-300 scale-105'
                        : 'bg-white/95 text-gray-900 border-white group-hover:bg-emerald-50'
                    }`}
                  >
                    <div className="text-[11px] font-black leading-tight">{stage.dayRange}</div>
                    <div className="text-[9px] font-semibold opacity-85 line-clamp-1 max-w-[105px]">
                      ({stage.stageName.split(' ')[0]})
                    </div>
                  </div>

                  {/* Thin Connector Line */}
                  <div
                    className={`w-[2px] h-3 transition-colors ${
                      isActive ? 'bg-emerald-400' : 'bg-white/80'
                    }`}
                  />

                  {/* Realistic Photographic Stage Circle */}
                  <div
                    style={{ width: `${photoSize}px`, height: `${photoSize}px` }}
                    className={`rounded-2xl overflow-hidden shadow-2xl border-2 transition-all duration-300 group-hover:scale-105 bg-black ${
                      isActive
                        ? 'border-emerald-400 ring-4 ring-emerald-400/40'
                        : 'border-white/90'
                    }`}
                  >
                    <img
                      src={stageImg}
                      alt={stage.stageName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImg;
                      }}
                    />
                  </div>

                  {/* Stem down into the topsoil */}
                  <div
                    style={{ height: `${stemHeight}px` }}
                    className={`w-[2.5px] transition-colors ${
                      isActive ? 'bg-emerald-400' : 'bg-emerald-300/80'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Rich Soil Cross-Section Strip */}
          <div className="relative z-20 h-9 bg-gradient-to-b from-[#451a03] via-[#361503] to-[#1c0a01] border-t-4 border-[#65a30d] shadow-inner flex items-center justify-center px-4">
            <span className="text-[10px] font-mono text-amber-200/70 tracking-widest uppercase">
              Topsoil Root Horizon • {meta.soilType}
            </span>
          </div>
        </div>
      </div>

      {/* 3. REALISTIC PHOTO STAGE CARDS STRIP */}
      <div className="p-4 sm:p-5 bg-[#04140a] overflow-x-auto">
        <div
          className="min-w-[820px] grid gap-3"
          style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
        >
          {stages.map((stage, idx) => {
            const isActive = stage.stageNumber === activeStageNumber;
            const shortTitle = stage.stageName.split('&')[0].split('(')[0].trim();
            const stageImg = stage.imageUrl || fallbackImg;

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

                {/* Realistic High-Resolution Stage Photo */}
                <div className="h-28 w-full relative overflow-hidden border-b border-emerald-200 bg-black">
                  <img
                    src={stageImg}
                    alt={stage.stageName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImg;
                    }}
                  />
                  <span className="absolute bottom-1.5 right-1.5 text-[8px] font-bold uppercase px-1.5 py-0.5 rounded bg-black/75 text-emerald-300 backdrop-blur-xs">
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
