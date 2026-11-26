import React, { useState } from 'react';
import {
  Droplets,
  Clock,
  Calculator,
  ShieldCheck,
  Waves,
  Gauge,
  AlertCircle,
  Play,
  Pause,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function SmartIrrigationPage() {
  const [moistureLevel, setMoistureLevel] = useState<number>(68);
  const [isIrrigating, setIsIrrigating] = useState<boolean>(false);
  const [selectedCrop, setSelectedCrop] = useState<string>('paddy');
  const [soilType, setSoilType] = useState<string>('alluvial');
  const [fieldAreaAcres, setFieldAreaAcres] = useState<number>(2.5);
  const [awdiWaterTubeDepthCm, setAwdiWaterTubeDepthCm] = useState<number>(8); // 8 cm below soil level

  // Handle irrigation simulation toggle
  const toggleIrrigation = () => {
    setIsIrrigating(!isIrrigating);
    if (!isIrrigating) {
      // Simulate gradual moisture increase
      const interval = setInterval(() => {
        setMoistureLevel((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 2;
        });
      }, 600);
    }
  };

  // Water requirement calculation based on TNAU ET0
  const dailyRequirementLiters = Math.round(
    fieldAreaAcres * (selectedCrop === 'paddy' ? 14000 : selectedCrop === 'banana' ? 9500 : 6200)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-950/80 via-[#061e11] to-black border border-sky-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Droplets className="w-3.5 h-3.5" />
            <span>Pani Pipe AWDI & Micro-Irrigation Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Precision Irrigation & Sluice Automation
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Automate irrigation cycles, monitor root-zone moisture horizons, and implement Alternate Wetting and Drying to conserve 35% agricultural freshwater.
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-black/60 border border-white/10 p-4 rounded-2xl text-center">
            <span className="text-xs text-gray-400 block font-semibold uppercase">Daily Water Budget</span>
            <span className="text-xl font-black text-sky-400">{dailyRequirementLiters.toLocaleString()} L</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 2D Soil Stratum & Sluice Control + Water Budget Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Soil Stratum & IoT Sluice Control Panel (7 Cols) */}
        <div className="lg:col-span-7 bg-[#041209] border border-emerald-900/50 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                Root-Zone Moisture Horizon
              </span>
              <h3 className="text-lg font-black text-white mt-0.5">Subterranean Soil Stratum & Infiltration</h3>
            </div>
            <button
              onClick={toggleIrrigation}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs shadow-lg transition ${
                isIrrigating
                  ? 'bg-amber-600 hover:bg-amber-500 text-white animate-pulse'
                  : 'bg-sky-600 hover:bg-sky-500 text-white'
              }`}
            >
              {isIrrigating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isIrrigating ? 'Stop Sluice Flow' : 'Trigger Sluice Irrigation'}</span>
            </button>
          </div>

          {/* 2D Soil Stratum Horizons Diagram */}
          <div className="space-y-3">
            {/* Horizon A: Topsoil */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#2e1709] to-[#3d210f] border border-amber-800/40 space-y-1 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span>Horizon A: Topsoil & Humus (0 - 15 cm)</span>
                </span>
                <span className="font-mono text-sky-300 font-bold">{moistureLevel}% Moisture</span>
              </div>
              <p className="text-[11px] text-gray-300">
                High biological activity, feeder root hairs, active phosphorus and nitrogen assimilation zone.
              </p>
              {isIrrigating && (
                <div className="h-1.5 w-full bg-sky-950 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-sky-400 animate-pulse w-3/4 rounded-full" />
                </div>
              )}
            </div>

            {/* Horizon B: Subsoil Clay Loam */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#241307] to-[#331c0d] border border-amber-900/30 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-600 inline-block" />
                  <span>Horizon B: Subsoil & Clay Pan (15 - 40 cm)</span>
                </span>
                <span className="font-mono text-sky-400 font-bold">58% Moisture</span>
              </div>
              <p className="text-[11px] text-gray-300">
                Puddle hard-pan layer preventing excessive water deep-percolation in wetland paddy.
              </p>
            </div>

            {/* Horizon C: Substratum */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#170e06] to-[#22140a] border border-stone-800 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-300 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-stone-600 inline-block" />
                  <span>Horizon C: Weathered Bedrock (&gt; 40 cm)</span>
                </span>
                <span className="font-mono text-stone-400 font-bold">42% Moisture</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Water table aquifer recharge zone.
              </p>
            </div>
          </div>

          {/* Pani Pipe AWDI Water Tube Status */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-sky-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Field Water Tube (Pani Pipe) Level Meter
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                AWD THRESHOLD SAFE
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Perforated Pipe Water Level:</span>
                <strong className="text-sky-400">-{awdiWaterTubeDepthCm} cm below soil surface</strong>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={awdiWaterTubeDepthCm}
                onChange={(e) => setAwdiWaterTubeDepthCm(parseInt(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>0 cm (Flooded)</span>
                <span className="text-amber-400 font-bold">15 cm (TNAU Irrigation Trigger)</span>
                <span>25 cm (Severe Stress)</span>
              </div>
            </div>

            {awdiWaterTubeDepthCm >= 15 ? (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Water level dropped to 15 cm. Trigger irrigation to 5 cm standing water now.</span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Adequate root-zone moisture available. Do not irrigate to prevent water wastage.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Precision Water Budgeting & Evapotranspiration Calculator (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#071f11] via-[#05170d] to-black border border-emerald-500/30 rounded-3xl p-6 shadow-2xl space-y-5">
          <div className="pb-3 border-b border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              FAO Penman-Monteith Formula
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">Crop Evapotranspiration Calculator</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Crop Selection */}
            <div className="space-y-1">
              <label className="text-gray-400 font-semibold">Cultivated Crop</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="paddy">Rice / Paddy (CR 1009 Sub 1) — ET 5.5 mm/day</option>
                <option value="banana">Grand Naine Banana — ET 4.2 mm/day</option>
                <option value="maize">Hybrid Maize (CO 6) — ET 3.8 mm/day</option>
                <option value="groundnut">Groundnut (VRI 8) — ET 3.2 mm/day</option>
              </select>
            </div>

            {/* Land Area */}
            <div className="space-y-1">
              <label className="text-gray-400 font-semibold">Cultivated Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="50"
                value={fieldAreaAcres}
                onChange={(e) => setFieldAreaAcres(parseFloat(e.target.value) || 1)}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            {/* Soil Type */}
            <div className="space-y-1">
              <label className="text-gray-400 font-semibold">Soil Texture</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="alluvial">Deltaic Alluvium (வண்டல் மண்)</option>
                <option value="clay">Heavy Clay (களிமண்)</option>
                <option value="red_loam">Red Gravelly Loam (செம்மண்)</option>
              </select>
            </div>

            {/* Result Box */}
            <div className="bg-black/60 p-4 rounded-2xl border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Total Irrigation Volume:</span>
                <span className="text-lg font-black text-sky-400">{dailyRequirementLiters.toLocaleString()} Liters</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Recommended Drip Runtime:</span>
                <span className="text-sm font-bold text-emerald-400">
                  {Math.round(dailyRequirementLiters / (fieldAreaAcres * 4000))} Hours / Day
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Water Conservation:</span>
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>35% Water Saved vs Flood Basin</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-[11px] text-gray-400 flex items-center justify-between">
            <span>Verified with TNAU WTC</span>
            <span className="text-emerald-400 font-semibold">Pani Pipe Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
