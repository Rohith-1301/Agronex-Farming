import React, { useState } from 'react';
import { initialFarmData } from '../data/farmData';
import { Farm, FieldSection, CropType } from '../types';
import {
  Layers,
  Droplets,
  Sprout,
  Activity,
  Compass,
  PlusCircle,
  X,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Flame,
  Volume2,
  Maximize2,
  MapPin,
  Sparkles,
  Waves,
  Sun,
  ShieldCheck,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { TNAU_CROPS_DATABASE } from '../data/tnauMasterDataset';

export type LayerMode = 'crop' | 'moisture' | 'irrigation' | 'health' | 'soil';

export default function DigitalTwinPage() {
  const [farm, setFarm] = useState<Farm>(initialFarmData);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('sec-1');
  const [layerMode, setLayerMode] = useState<LayerMode>('health');
  const [showAddModal, setShowAddModal] = useState(false);

  // New plot state
  const [newSection, setNewSection] = useState({
    name: 'Plot E (South-Central)',
    crop: 'paddy' as CropType,
    cropName: 'Paddy (CO 51)',
    areaAcres: 1.5,
    soilType: 'alluvial' as any,
    soilPh: 6.8
  });

  const selectedSection = farm.sections.find((s) => s.id === selectedSectionId) || farm.sections[0];

  // Helper color for layer
  const getSectionColor = (section: FieldSection) => {
    switch (layerMode) {
      case 'moisture':
        if (section.soilMoisture > 70) return 'from-sky-900/60 to-blue-600/40 border-sky-400';
        if (section.soilMoisture > 50) return 'from-sky-950/60 to-cyan-700/40 border-cyan-400';
        return 'from-amber-950/60 to-orange-700/40 border-orange-400';
      case 'health':
        if (section.healthScore >= 90) return 'from-emerald-950/60 to-emerald-600/40 border-emerald-400';
        if (section.healthScore >= 75) return 'from-yellow-950/60 to-yellow-600/40 border-yellow-400';
        return 'from-red-950/60 to-red-600/40 border-red-400';
      case 'irrigation':
        return section.irrigationStatus === 'needs_water'
          ? 'from-amber-950/60 to-amber-600/40 border-amber-400'
          : 'from-cyan-950/60 to-cyan-600/40 border-cyan-400';
      case 'soil':
        return 'from-[#2e1709] to-[#452714] border-amber-700';
      case 'crop':
      default:
        return 'from-emerald-950/60 to-green-700/40 border-emerald-500';
    }
  };

  const handleAddSection = () => {
    const newId = `sec-${Date.now()}`;
    const newPlot: FieldSection = {
      id: newId,
      name: newSection.name,
      crop: newSection.crop,
      cropName: newSection.cropName,
      areaAcres: newSection.areaAcres,
      plantationDate: '2026-10-15',
      growthStage: 'vegetative',
      healthScore: 92,
      soilMoisture: 72,
      soilType: newSection.soilType,
      soilPh: newSection.soilPh,
      nitrogen: 165,
      phosphorus: 48,
      potassium: 52,
      irrigationStatus: 'optimal',
      nextAction: 'Run cono-weeder to incorporate green weeds into soil.',
      fertilizerSchedule: 'Apply 25 kg/ha Urea + Potash top dressing at 40 DAS.',
      zoneColor: '#10b981',
      x: 0,
      z: 0,
      width: 4,
      depth: 4
    };

    setFarm({
      ...farm,
      sections: [...farm.sections, newPlot],
      totalAcres: farm.totalAcres + newSection.areaAcres
    });
    setSelectedSectionId(newId);
    setShowAddModal(false);
  };

  const readOutDetails = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${selectedSection.name}. Crop: ${selectedSection.cropName}. Health Score: ${selectedSection.healthScore} percent. Soil moisture: ${selectedSection.soilMoisture} percent. Next action: ${selectedSection.nextAction}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-[#061e11] to-black border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Smart Satellite & IoT Telemetry Twin</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{farm.name}</h1>
          <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {farm.location} • Owner: {farm.ownerName} • Total Cultivated Area: {farm.totalAcres} Acres
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Field Plot</span>
          </button>
        </div>
      </div>

      {/* Layer Selector Bar */}
      <div className="bg-[#0b2114]/90 backdrop-blur-md p-2.5 rounded-2xl border border-emerald-900/50 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
          <span>Active Telemetry Layer:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'health', label: '1. NDVI Crop Health (ஆரோக்கியம்)', icon: CheckCircle2, color: 'text-green-400' },
            { id: 'moisture', label: '2. Soil Moisture (ஈரப்பதம்)', icon: Droplets, color: 'text-sky-400' },
            { id: 'irrigation', label: '3. Irrigation Network (பாசனம்)', icon: Activity, color: 'text-cyan-400' },
            { id: 'crop', label: '4. Crop Phenology (பயிர் வகை)', icon: Sprout, color: 'text-emerald-400' },
            { id: 'soil', label: '5. Soil Horizons (மண் வகை)', icon: Flame, color: 'text-amber-400' }
          ].map((l) => {
            const Icon = l.icon;
            const active = layerMode === l.id;
            return (
              <button
                key={l.id}
                onClick={() => setLayerMode(l.id as LayerMode)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  active
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50'
                    : 'bg-[#06180e] text-gray-300 hover:bg-[#0e2c1a]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : l.color}`} />
                <span>{l.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace: Interactive Field Layout Map + In-Depth Plot Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive 2D Farmland Plot Map (8 Cols) */}
        <div className="lg:col-span-8 bg-[#040e07] border border-emerald-900/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Precision GIS Field Plots Layout
              </h3>
            </div>
            <span className="text-[11px] text-gray-400">
              Click any plot to inspect live root-zone telemetry & actions
            </span>
          </div>

          {/* Interactive Plots Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {farm.sections.map((section) => {
              const isSelected = section.id === selectedSectionId;
              const colorClass = getSectionColor(section);
              return (
                <div
                  key={section.id}
                  onClick={() => setSelectedSectionId(section.id)}
                  className={`relative p-5 rounded-3xl border-2 transition cursor-pointer shadow-xl bg-gradient-to-br ${colorClass} ${
                    isSelected ? 'ring-4 ring-emerald-400/50 scale-[1.02]' : 'hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                        {section.id} • {section.areaAcres} Acres
                      </span>
                      <h4 className="text-base font-black text-white mt-0.5">{section.name}</h4>
                      <p className="text-xs text-gray-200 font-medium">{section.cropName}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-black/60 text-xs font-bold border border-white/20">
                      {layerMode === 'moisture'
                        ? `${section.soilMoisture}% Moist`
                        : layerMode === 'health'
                        ? `${section.healthScore}% Health`
                        : layerMode === 'irrigation'
                        ? section.irrigationStatus.toUpperCase()
                        : section.soilType.toUpperCase()}
                    </span>
                  </div>

                  {/* Micro Indicators */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-[11px] text-gray-300 text-center">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Moisture</span>
                      <strong className="text-sky-300">{section.soilMoisture}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">NPK Status</span>
                      <strong className="text-amber-300">{section.nitrogen} kg/ha</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Soil pH</span>
                      <strong className="text-emerald-300">{section.soilPh}</strong>
                    </div>
                  </div>

                  {/* Active Selection Indicator */}
                  {isSelected && (
                    <div className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[9px] font-black uppercase tracking-wider shadow-md">
                      Selected
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Irrigation Canal & Sluice Gate Real-Time Status Card */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <Waves className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block">Main Feeder Canal & Automated Sluice Gate</strong>
                <span className="text-gray-400">
                  Solar-powered discharge sensor: 142 L/min • Water depth: 45 cm
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                AWD Safe
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: In-Depth Field Inspector Drawer (4 Cols) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#071f11] via-[#05170d] to-black border border-emerald-500/30 rounded-3xl p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Plot Telemetry Drawer
              </span>
              <h3 className="text-xl font-black text-white mt-0.5">{selectedSection.name}</h3>
            </div>
            <button
              onClick={readOutDetails}
              title="Voice Guidance"
              className="p-2 rounded-xl bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/50 p-3 rounded-2xl border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Canopy Health</span>
              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-emerald-400">{selectedSection.healthScore}%</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            <div className="bg-black/50 p-3 rounded-2xl border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Root Moisture</span>
              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-sky-400">{selectedSection.soilMoisture}%</span>
                <Droplets className="w-4 h-4 text-sky-400" />
              </div>
            </div>
          </div>

          {/* Detailed Agronomic Breakdown */}
          <div className="space-y-2.5 text-xs text-gray-300 bg-black/40 p-4 rounded-2xl border border-white/5">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Crop Cultivar:</span>
              <span className="font-bold text-white">{selectedSection.cropName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Growth Stage:</span>
              <span className="font-bold text-emerald-400 uppercase">
                {selectedSection.growthStage} (Planted {selectedSection.plantationDate})
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Soil Stratum:</span>
              <span className="font-bold text-amber-300 capitalize">{selectedSection.soilType.replace('_', ' ')} (pH {selectedSection.soilPh})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-400">Water Budget:</span>
              <span className="font-bold text-sky-300">18,500 L / acre</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">Harvest Forecast:</span>
              <span className="font-bold text-white">75 days remaining (Est.)</span>
            </div>
          </div>

          {/* Action Boxes */}
          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-1">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Recommended Agronomic Action:</span>
            </span>
            <p className="text-gray-200 leading-relaxed text-[11px]">{selectedSection.nextAction}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-1">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>TNAU STCR-IPNS Fertilizer Protocol:</span>
            </span>
            <p className="text-gray-300 leading-relaxed text-[11px]">{selectedSection.fertilizerSchedule}</p>
          </div>
        </div>
      </div>

      {/* Modal: Add New Field Plot */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0b2215] border border-emerald-700/60 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-emerald-800/60">
              <h3 className="text-lg font-bold text-white">Add New Agricultural Field Plot</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 mb-1 font-medium">Plot Name / ID</label>
                <input
                  type="text"
                  value={newSection.name}
                  onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
                  className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1 font-medium">Crop Type</label>
                  <select
                    value={newSection.crop}
                    onChange={(e) => {
                      const crop = e.target.value as CropType;
                      setNewSection({
                        ...newSection,
                        crop,
                        cropName:
                          crop === 'paddy'
                            ? 'Paddy (CO 51)'
                            : crop === 'coconut'
                            ? 'Coconut Palm'
                            : crop === 'banana'
                            ? 'Grand Naine Banana'
                            : 'Hybrid Maize / Millets'
                      });
                    }}
                    className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="paddy">Paddy (நெல்)</option>
                    <option value="coconut">Coconut (தென்னை)</option>
                    <option value="banana">Banana (வாழை)</option>
                    <option value="millets">Maize / Millets (சோளம்)</option>
                    <option value="turmeric">Turmeric (மஞ்சள்)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 font-medium">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newSection.areaAcres}
                    onChange={(e) => setNewSection({ ...newSection, areaAcres: parseFloat(e.target.value) || 1 })}
                    className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1 font-medium">Soil Classification</label>
                  <select
                    value={newSection.soilType}
                    onChange={(e) => setNewSection({ ...newSection, soilType: e.target.value as any })}
                    className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="alluvial">Alluvial (வண்டல் மண்)</option>
                    <option value="clay_loam">Clay Loam (களிமண்)</option>
                    <option value="red_loam">Red Loam (செம்மண்)</option>
                    <option value="black_cotton">Black Cotton (கரிசல்)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 font-medium">Soil pH</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newSection.soilPh}
                    onChange={(e) => setNewSection({ ...newSection, soilPh: parseFloat(e.target.value) || 6.5 })}
                    className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-emerald-800/60">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSection}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-900/50"
              >
                Create Plot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
