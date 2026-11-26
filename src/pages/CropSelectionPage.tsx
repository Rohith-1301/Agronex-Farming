import React, { useState, useMemo, useEffect } from 'react';
import { useFarmer } from '../context/FarmerContext';
import {
  recommendCropsForField,
  allCropsDatabase,
  cropGrowthTimelines
} from '../data/cropSelectionData';
import { RecommendedCrop, CropGrowthStageDetail } from '../types';
import { getFieldCropImage } from '../utils/cropImages';
import {
  Sprout,
  Layers,
  Sparkles,
  Droplets,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  Check,
  TrendingUp,
  MapPin,
  X,
  FileText,
  Sliders,
  Sun,
  CloudRain,
  ShieldCheck,
  Award,
  DollarSign
} from 'lucide-react';

export default function CropSelectionPage() {
  const { fields, selectedFieldId, setSelectedFieldId, updateField, addNotification } = useFarmer();

  const currentField = fields.find((f) => f.id === selectedFieldId) || fields[0];

  // Active view tab: 'recommendations' | 'timeline' | 'crop-dossier'
  const [activeView, setActiveView] = useState<'recommendations' | 'timeline' | 'crop-dossier'>('recommendations');

  // Currently selected crop for timeline view & dossier
  const [selectedTimelineCropName, setSelectedTimelineCropName] = useState<string>('Paddy');
  const [activeCropDossier, setActiveCropDossier] = useState<RecommendedCrop>(allCropsDatabase[0]);

  // Selected growth timeline stage index
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);

  // Days after sowing interactive slider
  const [currentDaySlider, setCurrentDaySlider] = useState<number>(1);

  // Success toast for assigning crop or scheduling alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize timeline crop when current field changes
  useEffect(() => {
    if (currentField) {
      const match = allCropsDatabase.find(c => 
        currentField.currentCrop.toLowerCase().includes(c.name.toLowerCase().slice(0, 4))
      );
      if (match) {
        setSelectedTimelineCropName(match.name.split(' ')[0]);
        setActiveCropDossier(match);
      }
      if (currentField.daysAfterSowing) {
        setCurrentDaySlider(currentField.daysAfterSowing);
      }
    }
  }, [currentField?.id]);

  // Available timeline crops
  const availableTimelineCrops = Object.keys(cropGrowthTimelines);

  // Get active crop stages
  const currentTimelineStages = useMemo(() => {
    const key = availableTimelineCrops.find(k => 
      selectedTimelineCropName.toLowerCase().includes(k.toLowerCase())
    ) || 'Paddy';
    return cropGrowthTimelines[key] || cropGrowthTimelines['Paddy'];
  }, [selectedTimelineCropName, availableTimelineCrops]);

  // Max days in timeline
  const maxDays = useMemo(() => {
    if (!currentTimelineStages.length) return 135;
    return currentTimelineStages[currentTimelineStages.length - 1].endDay;
  }, [currentTimelineStages]);

  // Determine stage from day slider
  const activeStage = useMemo(() => {
    const found = currentTimelineStages.find(
      (s) => currentDaySlider >= s.startDay && currentDaySlider <= s.endDay
    );
    return found || currentTimelineStages[selectedStageIdx] || currentTimelineStages[0];
  }, [currentDaySlider, selectedStageIdx, currentTimelineStages]);

  // Field-specific AI Recommendations (independently calculated per field)
  const recommendedCrops = useMemo(() => {
    if (!currentField) return allCropsDatabase;
    return recommendCropsForField(currentField);
  }, [currentField]);

  // Handle "Select & Adopt This Crop for this field"
  const handleAssignCrop = (crop: RecommendedCrop) => {
    updateField(currentField.id, {
      currentCrop: crop.name.split(' ')[0],
      cropVariety: crop.variety,
      growthStage: 'Seed / Germination',
      daysAfterSowing: 1,
      sowingDate: new Date().toISOString().split('T')[0]
    });

    addNotification({
      fieldId: currentField.id,
      fieldName: currentField.name,
      type: 'growth_stage',
      title: `Crop Selected: ${crop.name}`,
      message: `${currentField.name} is now allocated to ${crop.name} (${crop.variety}). Basal fertilization and seedbed preparation recommended.`,
      date: 'Just now',
      priority: 'high',
      targetTab: 'crop-selection',
      status: 'active'
    });

    setSelectedTimelineCropName(crop.name.split(' ')[0]);
    setActiveCropDossier(crop);
    setCurrentDaySlider(1);
    setSelectedStageIdx(0);
    setActiveView('timeline');

    setToastMessage(`✓ ${crop.name} successfully adopted for ${currentField.name}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Switch timeline to a specific crop
  const handleOpenTimelineForCrop = (crop: RecommendedCrop) => {
    setSelectedTimelineCropName(crop.name.split(' ')[0]);
    setActiveCropDossier(crop);
    setCurrentDaySlider(1);
    setSelectedStageIdx(0);
    setActiveView('timeline');
  };

  // Add reminder from timeline
  const handleAddTimelineReminder = (type: 'irrigation' | 'fertilizer', title: string, text: string) => {
    addNotification({
      fieldId: currentField.id,
      fieldName: currentField.name,
      type,
      title,
      message: text,
      date: 'Today',
      priority: 'medium',
      targetTab: 'dashboard',
      status: 'active'
    });
    setToastMessage(`✓ Reminder added to Dashboard: ${title}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 font-bold text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-2">
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center font-mono text-[10px]">
              2
            </span>
            <span>Module 2 • AI Precision Crop Selection & Growth Timeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Crop Selection & Phenological Timeline
          </h1>
          <p className="text-sm text-emerald-300/80 mt-1 max-w-2xl">
            Intelligent field-specific crop matching, rotation optimization, and authentic stage-by-stage growth telemetry tailored for Indian farmland.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 bg-[#05160c] p-1.5 rounded-2xl border border-emerald-900/80 self-start md:self-auto">
          <button
            onClick={() => setActiveView('recommendations')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeView === 'recommendations'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>AI Recommendations</span>
          </button>

          <button
            onClick={() => setActiveView('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeView === 'timeline'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-300" />
            <span>Growth Timeline</span>
          </button>

          <button
            onClick={() => setActiveView('crop-dossier')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeView === 'crop-dossier'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-300" />
            <span>Crop Dossier</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Field Selector Bar (Shows all 4 fields with exact crop and soil) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-gray-300">
          <span className="flex items-center gap-2 text-emerald-400 uppercase tracking-wider font-mono">
            <Layers className="w-4 h-4" />
            Select Field to Analyze & Allocate:
          </span>
          <span className="text-gray-400">
            Selected: <strong className="text-white">{currentField.name}</strong> ({currentField.areaAcres} Acres • {currentField.soilType})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fields.map((f) => {
            const isSelected = f.id === currentField.id;
            return (
              <div
                key={f.id}
                onClick={() => setSelectedFieldId(f.id)}
                className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#062010] border-emerald-400 ring-2 ring-emerald-500/30 shadow-xl shadow-emerald-950/60 scale-[1.02]'
                    : 'bg-[#04140a] border-emerald-900/60 hover:border-emerald-600/60 hover:bg-[#05180d]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono tracking-wider">
                      Field #{f.fieldNumber}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{f.name}</h3>
                    <p className="text-[11px] text-gray-400">{f.areaAcres} Acres • {f.soilType}</p>
                  </div>

                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs shadow-md">
                      ✓
                    </div>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400">
                      Select
                    </span>
                  )}
                </div>

                {/* Standing Crop Thumbnail */}
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30">
                      <img
                        src={getFieldCropImage(f.currentCrop)}
                        alt={f.currentCrop}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 block uppercase font-mono">Current Crop</span>
                      <strong className="text-xs text-emerald-300 font-bold">{f.currentCrop}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-gray-400 block uppercase font-mono">pH / NPK</span>
                    <span className="text-[11px] font-mono text-gray-200">pH {f.soilPh}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          TAB 1: AI CROP RECOMMENDATIONS
          ========================================================================= */}
      {activeView === 'recommendations' && (
        <div className="space-y-6">
          <div className="bg-[#05180d] border border-emerald-800/60 rounded-3xl p-6 sm:p-7 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-5">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  Tailored For {currentField.name}
                </span>
                <h2 className="text-2xl font-black text-white mt-0.5 flex items-center gap-2">
                  <span>AI Field-Specific Crop Recommendations</span>
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </h2>
                <p className="text-xs text-emerald-300/80 mt-1">
                  Scored specifically for <strong>{currentField.soilType}</strong> (pH {currentField.soilPh}), {currentField.irrigationType}, and rotational succession after {currentField.previousCrop}.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                  {recommendedCrops.length} Crops Evaluated
                </span>
              </div>
            </div>

            {/* Recommendation Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {recommendedCrops.slice(0, 6).map((crop, idx) => {
                const isStandingCrop = currentField.currentCrop.toLowerCase().includes(crop.id.replace('crop-', ''));
                return (
                  <div
                    key={crop.id}
                    className="bg-[#030e07] border border-emerald-900/70 hover:border-emerald-500/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div>
                      {/* Crop Image Header */}
                      <div className="relative h-44 w-full overflow-hidden bg-[#020a05]">
                        <img
                          src={crop.imageUrl || getFieldCropImage(crop.name)}
                          alt={crop.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/crops/paddy.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030e07] via-black/30 to-transparent" />

                        {/* Top Match Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/50 backdrop-blur-md shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-black text-emerald-200">
                            {crop.suitabilityScore}% Match
                          </span>
                        </div>

                        {idx === 0 && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                            ★ Top Recommended
                          </div>
                        )}

                        {isStandingCrop && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-cyan-500/90 text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                            Active in Field
                          </div>
                        )}

                        {/* Crop Name on Image Base */}
                        <div className="absolute bottom-2 left-4 right-4">
                          <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">
                            {crop.name}
                          </h3>
                          <p className="text-[11px] text-emerald-300 font-medium">
                            {crop.tamilName || crop.variety}
                          </p>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 space-y-4">
                        {/* Key Economic & Duration Highlights */}
                        <div className="grid grid-cols-2 gap-2 bg-white/5 rounded-2xl p-3 border border-white/5 text-xs">
                          <div>
                            <span className="text-[10px] text-gray-400 block font-mono uppercase">Est. Net Profit</span>
                            <span className="text-sm font-black text-emerald-400">
                              ₹ {crop.estimatedNetProfitPerAcre.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[9px] text-gray-400 block">per acre / season</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-gray-400 block font-mono uppercase">Duration</span>
                            <span className="text-sm font-black text-white">
                              {crop.cropDurationDays} <span className="text-xs font-normal text-gray-400">Days</span>
                            </span>
                            <span className="text-[9px] text-emerald-300 block">{crop.bestSeason.split(' ')[0]}</span>
                          </div>
                        </div>

                        {/* Why this matches this field */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1">
                            <Info className="w-3 h-3 text-emerald-400" />
                            Why AI Recommends for {currentField.name}:
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed bg-[#05160d] p-3 rounded-xl border border-emerald-950">
                            {crop.suitabilityReason}
                          </p>
                        </div>

                        {/* Expected Yield */}
                        <div className="flex items-center justify-between text-xs py-1 border-t border-white/5">
                          <span className="text-gray-400">Expected Yield:</span>
                          <strong className="text-white text-right">{crop.expectedYieldRange}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenTimelineForCrop(crop)}
                        className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition flex items-center justify-center gap-1 border border-white/10"
                      >
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Timeline</span>
                      </button>

                      <button
                        onClick={() => handleAssignCrop(crop)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-md shadow-emerald-950/60"
                      >
                        <span>Adopt Crop</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: INTERACTIVE CROP GROWTH TIMELINE
          ========================================================================= */}
      {activeView === 'timeline' && (
        <div className="space-y-6">
          <div className="bg-[#05180d] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
            {/* Timeline Header & Crop Switcher */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-emerald-900/60 pb-6">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  Stage-by-Stage Phenological Telemetry
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-3">
                  <span>Growth Timeline: {selectedTimelineCropName}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    {maxDays} Day Life Cycle
                  </span>
                </h2>
                <p className="text-xs text-emerald-300/80 mt-1">
                  Phenological stages with authentic field photography, irrigation scheduling, nutrient doses, and pest management.
                </p>
              </div>

              {/* Crop Selector for Timeline */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400 font-bold mr-1">Switch Crop:</span>
                {availableTimelineCrops.map((cropKey) => (
                  <button
                    key={cropKey}
                    onClick={() => {
                      setSelectedTimelineCropName(cropKey);
                      setCurrentDaySlider(1);
                      setSelectedStageIdx(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      selectedTimelineCropName.toLowerCase() === cropKey.toLowerCase()
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5'
                    }`}
                  >
                    <Sprout className="w-3.5 h-3.5" />
                    <span>{cropKey}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Timeline Range Slider */}
            <div className="bg-[#030e07] p-5 sm:p-6 rounded-2xl border border-emerald-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block font-mono">
                    Current Growth Position
                  </span>
                  <span className="text-3xl font-black text-emerald-400">Day {currentDaySlider}</span>
                  <span className="text-xs text-gray-400 ml-2">DAS (Days After Sowing)</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block font-mono">
                    Active Growth Stage
                  </span>
                  <span className="text-base font-bold text-white flex items-center gap-1.5 justify-end">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    {activeStage.stageName}
                  </span>
                  <span className="text-xs text-emerald-300">{activeStage.dayRange}</span>
                </div>
              </div>

              {/* Range Slider Track */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="1"
                  max={maxDays}
                  value={currentDaySlider}
                  onChange={(e) => {
                    const day = parseInt(e.target.value) || 1;
                    setCurrentDaySlider(day);
                  }}
                  className="w-full h-3 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                  <span>Day 1 (Sowing)</span>
                  <span className="text-emerald-400 font-bold">Slide to simulate crop growth</span>
                  <span>Day {maxDays} (Harvest)</span>
                </div>
              </div>

              {/* Stage Progress Pills Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-thin">
                {currentTimelineStages.map((stage, idx) => {
                  const isActive = activeStage.stageNumber === stage.stageNumber;
                  return (
                    <button
                      key={stage.stageNumber}
                      onClick={() => {
                        setSelectedStageIdx(idx);
                        setCurrentDaySlider(stage.startDay);
                      }}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex flex-col items-start whitespace-nowrap min-w-[150px] border ${
                        isActive
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/60'
                          : 'bg-[#05150b] text-gray-300 border-emerald-900/60 hover:border-emerald-600/50 hover:bg-[#071f11]'
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-80 uppercase tracking-wider">
                        Stage #{stage.stageNumber} • {stage.dayRange}
                      </span>
                      <span className="text-xs font-bold line-clamp-1">{stage.stageName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage Dossier Card with AUTHENTIC Crop Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#030e07] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-xl">
              {/* Left Column: Authentic Crop Photo for this stage */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-emerald-500/40 shadow-xl group bg-[#020a05]">
                  <img
                    src={activeStage.imageUrl || getFieldCropImage(selectedTimelineCropName)}
                    alt={activeStage.stageName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/crops/paddy.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Stage Badge on Photo */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/50 backdrop-blur-md">
                    <span className="text-xs font-black text-emerald-200">
                      Stage #{activeStage.stageNumber} of {currentTimelineStages.length}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] font-mono text-emerald-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                      {activeStage.dayRange}
                    </span>
                    <h3 className="text-xl font-black text-white mt-1 drop-shadow-md">
                      {activeStage.stageName}
                    </h3>
                  </div>
                </div>

                {/* Quick Stage Status */}
                <div className="bg-[#05150c] p-4 rounded-2xl border border-emerald-900/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-400">Phenological Stage:</span>
                    <span className="text-emerald-300">Stage {activeStage.stageNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-400">Simulated Day:</span>
                    <span className="text-white font-mono">Day {currentDaySlider} of {maxDays}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mt-1">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((currentDaySlider / maxDays) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Agronomic Action Plan */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-emerald-400" />
                    <span>Biological Growth Description</span>
                  </h4>
                  <p className="text-sm text-gray-300 mt-1 leading-relaxed bg-[#05160d] p-4 rounded-2xl border border-emerald-950">
                    {activeStage.description}
                  </p>
                </div>

                {/* 2-Column: Water Requirements & Fertilizer Dose */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Water Requirements */}
                  <div className="bg-[#05160c] border border-cyan-900/40 p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
                        <Droplets className="w-4 h-4" />
                        <span>Irrigation Protocol</span>
                      </div>
                      <button
                        onClick={() => handleAddTimelineReminder(
                          'irrigation',
                          `${selectedTimelineCropName} Irrigation (Day ${currentDaySlider})`,
                          activeStage.waterRequirements
                        )}
                        className="text-[10px] font-bold text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900 px-2 py-0.5 rounded border border-cyan-800/50 transition"
                      >
                        + Set Reminder
                      </button>
                    </div>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      {activeStage.waterRequirements}
                    </p>
                  </div>

                  {/* Nutrient Dosage */}
                  <div className="bg-[#05160c] border border-emerald-900/40 p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                        <Sprout className="w-4 h-4" />
                        <span>Nutrient & Fertilizer</span>
                      </div>
                      <button
                        onClick={() => handleAddTimelineReminder(
                          'fertilizer',
                          `${selectedTimelineCropName} Top-Dress (Day ${currentDaySlider})`,
                          activeStage.nutrientRequirements
                        )}
                        className="text-[10px] font-bold text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900 px-2 py-0.5 rounded border border-emerald-800/50 transition"
                      >
                        + Set Reminder
                      </button>
                    </div>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      {activeStage.nutrientRequirements}
                    </p>
                  </div>
                </div>

                {/* Key Farming Activities */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Essential Agronomic Actions for this Stage</span>
                  </h5>
                  <div className="space-y-1.5">
                    {activeStage.keyFarmingActivities.map((act, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-gray-300 bg-white/5 p-2.5 rounded-xl border border-white/5"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pests & Diseases Risks */}
                <div className="bg-red-950/20 border border-red-900/40 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Critical Pest & Disease Threats at this Stage</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeStage.pestDiseaseRisks.map((risk, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-800/40 text-red-200 text-xs font-medium"
                      >
                        ⚠ {risk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: COMPREHENSIVE CROP DOSSIER
          ========================================================================= */}
      {activeView === 'crop-dossier' && (
        <div className="space-y-6">
          <div className="bg-[#05180d] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/60 pb-6">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  Full Agronomic Encyclopedia
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {activeCropDossier.name}
                </h2>
                <p className="text-xs text-emerald-300/80 mt-1">
                  Scientific Name: <em>{activeCropDossier.scientificName}</em> • Variety: {activeCropDossier.variety}
                </p>
              </div>

              {/* Crop Switcher */}
              <div className="flex items-center gap-2 flex-wrap">
                {allCropsDatabase.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCropDossier(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      activeCropDossier.id === c.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    {c.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Dossier Banner Photo */}
            <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-emerald-500/30">
              <img
                src={activeCropDossier.imageUrl || getFieldCropImage(activeCropDossier.name)}
                alt={activeCropDossier.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  Market Economic Profile
                </span>
                <h3 className="text-2xl font-black text-white">
                  ₹ {activeCropDossier.estimatedNetProfitPerAcre.toLocaleString('en-IN')}{' '}
                  <span className="text-sm font-normal text-gray-300">Net Profit / Acre</span>
                </h3>
              </div>
            </div>

            {/* Detailed Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#030e07] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
                <span className="text-gray-400 block uppercase font-mono text-[10px]">Suitable Soil</span>
                <strong className="text-white text-sm">{activeCropDossier.suitableSoil}</strong>
              </div>

              <div className="bg-[#030e07] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
                <span className="text-gray-400 block uppercase font-mono text-[10px]">Water Requirement</span>
                <strong className="text-white text-sm">{activeCropDossier.waterRequirementsMm}</strong>
              </div>

              <div className="bg-[#030e07] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
                <span className="text-gray-400 block uppercase font-mono text-[10px]">Crop Duration & Season</span>
                <strong className="text-white text-sm">{activeCropDossier.cropDurationDays} Days</strong>
                <span className="text-emerald-300 block">{activeCropDossier.bestSeason}</span>
              </div>

              <div className="bg-[#030e07] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
                <span className="text-gray-400 block uppercase font-mono text-[10px]">Seed Rate & Spacing</span>
                <strong className="text-white text-sm">{activeCropDossier.seedRequirementsKgPerAcre}</strong>
              </div>

              <div className="bg-[#030e07] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
                <span className="text-gray-400 block uppercase font-mono text-[10px]">Fertilizer Recommendation</span>
                <strong className="text-emerald-300 text-xs">{activeCropDossier.fertilizerRequirements}</strong>
              </div>

              <div className="bg-[#030e07] p-4 rounded-2xl border border-emerald-900/60 space-y-1">
                <span className="text-gray-400 block uppercase font-mono text-[10px]">Harvesting Indicator</span>
                <strong className="text-white text-xs">{activeCropDossier.harvestingInfo}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-900/60">
              <button
                onClick={() => handleOpenTimelineForCrop(activeCropDossier)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Open Growth Timeline</span>
              </button>
              <button
                onClick={() => handleAssignCrop(activeCropDossier)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg flex items-center gap-2"
              >
                <span>Adopt for {currentField.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
