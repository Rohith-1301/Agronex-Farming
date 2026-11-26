import React, { useState } from 'react';
import { useFarmer } from '../context/FarmerContext';
import { FieldRecord, SoilType, IrrigationType, WaterAvailability, GrowthStageName } from '../types';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Award,
  Layers,
  Sprout,
  Plus,
  Edit2,
  Trash2,
  Droplets,
  Calendar,
  AlertCircle,
  TrendingUp,
  Activity,
  CheckCircle2,
  X,
  Compass,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CloudSun,
  Thermometer,
  Wind
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const {
    profile,
    updateProfile,
    fields,
    addField,
    updateField,
    deleteField,
    selectedFieldId,
    setSelectedFieldId,
    notifications,
    completeNotification,
    snoozeNotification
  } = useFarmer();

  // Modals state
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [fieldModalOpen, setFieldModalOpen] = useState(false);
  const [fieldDetailsModal, setFieldDetailsModal] = useState<FieldRecord | null>(null);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

  // Field Form State (for Add / Edit)
  const [fieldName, setFieldName] = useState('');
  const [fieldAreaAcres, setFieldAreaAcres] = useState(2.0);
  const [fieldSoilType, setFieldSoilType] = useState<SoilType>('Clay Loam');
  const [fieldSoilPh, setFieldSoilPh] = useState(6.8);
  const [fieldFertility, setFieldFertility] = useState<'High' | 'Medium' | 'Low'>('High');
  const [fieldN, setFieldN] = useState(115);
  const [fieldP, setFieldP] = useState(48);
  const [fieldK, setFieldK] = useState(165);
  const [fieldWaterCapacity, setFieldWaterCapacity] = useState<'High' | 'Moderate' | 'Low'>('High');
  const [fieldIrrigation, setFieldIrrigation] = useState<IrrigationType>('Canal / Sluice');
  const [fieldWaterAvail, setFieldWaterAvail] = useState<WaterAvailability>('Abundant (Year-round)');
  const [fieldLocation, setFieldLocation] = useState('Survey Plot 142/3');
  const [fieldPrevCrop, setFieldPrevCrop] = useState('Black Gram');
  const [fieldCurrCrop, setFieldCurrCrop] = useState('Paddy');
  const [fieldCropVariety, setFieldCropVariety] = useState('CR 1009 Sub 1');
  const [fieldSowingDate, setFieldSowingDate] = useState('2026-09-20');
  const [fieldGrowthStage, setFieldGrowthStage] = useState<GrowthStageName>('Tillering');

  // Profile Form State
  const [profName, setProfName] = useState(profile.name);
  const [profPhone, setProfPhone] = useState(profile.phone);
  const [profVillage, setProfVillage] = useState(profile.village);
  const [profDistrict, setProfDistrict] = useState(profile.district);
  const [profState, setProfState] = useState(profile.state);
  const [profExp, setProfExp] = useState(profile.farmingExperienceYears);

  // Open Add Field Modal
  const handleOpenAddField = () => {
    setEditingFieldId(null);
    setFieldName(`Field ${fields.length + 1} – Samba Plot`);
    setFieldAreaAcres(2.0);
    setFieldSoilType('Clay Loam');
    setFieldSoilPh(6.8);
    setFieldFertility('High');
    setFieldN(110);
    setFieldP(45);
    setFieldK(160);
    setFieldWaterCapacity('High');
    setFieldIrrigation('Canal / Sluice');
    setFieldWaterAvail('Abundant (Year-round)');
    setFieldLocation(`Survey 14${fields.length + 2}/1`);
    setFieldPrevCrop('Pulses');
    setFieldCurrCrop('Paddy');
    setFieldCropVariety('CO 51');
    setFieldSowingDate('2026-10-01');
    setFieldGrowthStage('Seedling Stage');
    setFieldModalOpen(true);
  };

  // Open Edit Field Modal
  const handleOpenEditField = (f: FieldRecord) => {
    setEditingFieldId(f.id);
    setFieldName(f.name);
    setFieldAreaAcres(f.areaAcres);
    setFieldSoilType(f.soilType);
    setFieldSoilPh(f.soilPh);
    setFieldFertility(f.fertilityLevel);
    setFieldN(f.nitrogenKgHa);
    setFieldP(f.phosphorusKgHa);
    setFieldK(f.potassiumKgHa);
    setFieldWaterCapacity(f.waterHoldingCapacity);
    setFieldIrrigation(f.irrigationType);
    setFieldWaterAvail(f.waterAvailability);
    setFieldLocation(f.location);
    setFieldPrevCrop(f.previousCrop);
    setFieldCurrCrop(f.currentCrop);
    setFieldCropVariety(f.cropVariety);
    setFieldSowingDate(f.sowingDate);
    setFieldGrowthStage(f.growthStage);
    setFieldModalOpen(true);
  };

  // Save Field Form
  const handleSaveField = () => {
    const areaHectares = parseFloat((fieldAreaAcres * 0.404686).toFixed(2));
    const payload = {
      name: fieldName,
      fieldNumber: editingFieldId
        ? (fields.find((f) => f.id === editingFieldId)?.fieldNumber || fields.length)
        : fields.length + 1,
      areaAcres: fieldAreaAcres,
      areaHectares,
      soilType: fieldSoilType,
      soilPh: fieldSoilPh,
      fertilityLevel: fieldFertility,
      nitrogenKgHa: fieldN,
      phosphorusKgHa: fieldP,
      potassiumKgHa: fieldK,
      waterHoldingCapacity: fieldWaterCapacity,
      irrigationType: fieldIrrigation,
      waterAvailability: fieldWaterAvail,
      location: fieldLocation,
      previousCrop: fieldPrevCrop,
      currentCrop: fieldCurrCrop,
      cropVariety: fieldCropVariety,
      sowingDate: fieldSowingDate,
      growthStage: fieldGrowthStage,
      daysAfterSowing: 45,
      expectedHarvestDate: '2027-02-15',
      healthScore: 92,
      soilMoisturePercent: 72,
      lastIrrigationDate: '2026-11-18',
      nextIrrigationDate: '2026-11-22',
      estimatedYieldQuintals: Math.round(24 * fieldAreaAcres),
      estimatedRevenue: Math.round(24 * fieldAreaAcres * 2300)
    };

    if (editingFieldId) {
      updateField(editingFieldId, payload);
    } else {
      addField(payload);
    }
    setFieldModalOpen(false);
  };

  // Save Profile Form
  const handleSaveProfile = () => {
    updateProfile({
      name: profName,
      phone: profPhone,
      village: profVillage,
      district: profDistrict,
      state: profState,
      farmingExperienceYears: profExp
    });
    setProfileModalOpen(false);
  };

  // Calculations
  const totalRevenue = fields.reduce((sum, f) => sum + f.estimatedRevenue, 0);
  const activeReminders = notifications.filter((n) => n.status === 'active');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Header & Module Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/50 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-2">
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center font-mono text-[10px]">
              1
            </span>
            <span>Module 1 • Farmer Profile & Smart Farm Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Smart Farm Command Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-1 max-w-2xl">
            Live telemetry, individual multi-field agronomic records, growth tracking, and automated reminders for your agricultural land.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAddField}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-950/80"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Field</span>
          </button>
        </div>
      </div>

      {/* 2. Farmer Profile Card & Key Farm Telemetry Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Farmer Profile Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#072213] via-[#05170d] to-[#020b06] border border-emerald-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 p-0.5 shadow-xl">
                  <div className="w-full h-full bg-[#031107] rounded-[14px] flex items-center justify-center text-emerald-300 text-2xl font-black">
                    {profile.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">{profile.name}</h2>
                  <p className="text-xs text-emerald-300 font-semibold mt-0.5">
                    {profile.tamilName}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-400 bg-black/40 px-2 py-0.5 rounded-md mt-1 border border-white/5">
                    <span>Kisan ID: {profile.kisanId}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setProfileModalOpen(true)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
                title="Edit Farmer Profile"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Meta Info */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>Location</span>
                </div>
                <div className="text-white font-bold">{profile.village}</div>
                <div className="text-gray-400 text-[11px]">{profile.district}, {profile.state}</div>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Award className="w-3 h-3 text-emerald-400" />
                  <span>Experience</span>
                </div>
                <div className="text-white font-bold">{profile.farmingExperienceYears} Years</div>
                <div className="text-gray-400 text-[11px]">Progressive Cultivator</div>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>Contact</span>
                </div>
                <div className="text-white font-bold">{profile.phone}</div>
                <div className="text-gray-400 text-[11px]">Aadhaar: {profile.aadhaarMasked}</div>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Layers className="w-3 h-3 text-emerald-400" />
                  <span>Total Holding</span>
                </div>
                <div className="text-white font-bold">{profile.totalLandAreaAcres} Acres</div>
                <div className="text-gray-400 text-[11px]">{fields.length} Active Fields</div>
              </div>
            </div>

            {/* Main Crops Chips */}
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Main Crops Cultivated:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {profile.mainCrops.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Summary Telemetry Cards (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Card 1: Total Holding */}
          <div className="bg-[#06180e] border border-emerald-900/60 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Total Land
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                {profile.totalLandAreaAcres} <span className="text-xs text-gray-400 font-normal">Acres</span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium mt-1">
                {(profile.totalLandAreaAcres * 0.404686).toFixed(2)} Hectares
              </p>
            </div>
          </div>

          {/* Card 2: Active Fields */}
          <div className="bg-[#06180e] border border-emerald-900/60 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Active Fields
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                {fields.length} <span className="text-xs text-gray-400 font-normal">Plots</span>
              </div>
              <p className="text-[11px] text-cyan-400 font-medium mt-1">
                100% Cultivated
              </p>
            </div>
          </div>

          {/* Card 3: Pending Reminders */}
          <div className="bg-[#06180e] border border-emerald-900/60 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Farm Alerts
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                {activeReminders.length} <span className="text-xs text-gray-400 font-normal">Tasks</span>
              </div>
              <p className="text-[11px] text-amber-400 font-medium mt-1">
                Needs attention
              </p>
            </div>
          </div>

          {/* Card 4: Estimated Farm Income */}
          <div className="bg-[#06180e] border border-emerald-900/60 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-lime-500/15 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Est. Farm Income
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                ₹{(totalRevenue / 100000).toFixed(1)}L
              </div>
              <p className="text-[11px] text-lime-400 font-medium mt-1">
                Across 4 Fields
              </p>
            </div>
          </div>

          {/* Live Weather Widget for Thanjavur District (spans across 4 cols) */}
          <div className="col-span-2 sm:col-span-4 bg-gradient-to-r from-[#061e12] via-[#04140b] to-[#020b06] border border-emerald-800/60 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <CloudSun className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  Live Agro-Weather Telemetry • {profile.district}
                </div>
                <div className="text-lg font-black text-white">
                  31°C • Partly Cloudy (Northeast Monsoon Phase)
                </div>
                <div className="text-xs text-gray-300">
                  Ideal conditions for samba paddy tillering and banana bunch swelling.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-300 border-t sm:border-t-0 sm:border-l border-emerald-900/60 pt-2 sm:pt-0 sm:pl-4">
              <div>
                <span className="text-gray-400 block text-[10px]">Humidity</span>
                <strong className="text-white">76%</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Wind</span>
                <strong className="text-white">12 km/h NE</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Rain Forecast</span>
                <strong className="text-emerald-400">Light Showers (40%)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INDIVIDUAL FIELD MANAGEMENT SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Individual Field Management ({fields.length} Fields)
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Every field has its own soil type, pH, NPK fertility, crop, and irrigation setup.
            </p>
          </div>

          <button
            onClick={handleOpenAddField}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-md self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Field</span>
          </button>
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fields.map((field) => (
            <div
              key={field.id}
              className={`bg-[#06160c] border rounded-3xl p-5 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                selectedFieldId === field.id
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-emerald-900/60 hover:border-emerald-500/50'
              }`}
            >
              <div className="space-y-4">
                {/* Header: Field Name & Actions */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                      Field #{field.fieldNumber}
                    </span>
                    <h3 className="text-base font-bold text-white line-clamp-1">{field.name}</h3>
                    <p className="text-[11px] text-gray-400 line-clamp-1">{field.location}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditField(field)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
                      title="Edit Field"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {fields.length > 1 && (
                      <button
                        onClick={() => deleteField(field.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition"
                        title="Delete Field"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Acreage & Current Crop Badge */}
                <div className="bg-[#030e07] border border-emerald-900/60 rounded-2xl p-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Acreage</div>
                    <div className="text-base font-black text-white">
                      {field.areaAcres} <span className="text-xs font-normal text-gray-400">Acres</span>
                    </div>
                    <div className="text-[10px] text-emerald-400">{field.areaHectares} ha</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Current Crop</div>
                    <div className="text-sm font-bold text-emerald-300">{field.currentCrop}</div>
                    <div className="text-[10px] text-gray-400">{field.cropVariety}</div>
                  </div>
                </div>

                {/* Soil & Agronomic Metrics */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-gray-300 py-1 border-b border-white/5">
                    <span className="text-gray-400">Soil Type:</span>
                    <strong className="text-white">{field.soilType}</strong>
                  </div>
                  <div className="flex items-center justify-between text-gray-300 py-1 border-b border-white/5">
                    <span className="text-gray-400">Soil pH & Fertility:</span>
                    <span className="font-bold text-emerald-300">pH {field.soilPh} • {field.fertilityLevel}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300 py-1 border-b border-white/5">
                    <span className="text-gray-400">NPK (kg/ha):</span>
                    <span className="font-mono text-gray-200">
                      N:{field.nitrogenKgHa} P:{field.phosphorusKgHa} K:{field.potassiumKgHa}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300 py-1 border-b border-white/5">
                    <span className="text-gray-400">Irrigation:</span>
                    <strong className="text-white">{field.irrigationType}</strong>
                  </div>
                  <div className="flex items-center justify-between text-gray-300 py-1">
                    <span className="text-gray-400">Growth Stage:</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {field.growthStage}
                    </span>
                  </div>
                </div>

                {/* Soil Moisture Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400 flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-cyan-400" />
                      Moisture
                    </span>
                    <strong className="text-cyan-300">{field.soilMoisturePercent}%</strong>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${field.soilMoisturePercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-emerald-900/60 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFieldDetailsModal(field)}
                  className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-bold transition flex items-center justify-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Full Details</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedFieldId(field.id);
                    onNavigate('crop-selection');
                  }}
                  className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-md"
                >
                  <span>Select Crop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ACTIVE SMART FARM REMINDERS & NOTIFICATION SECTION */}
      <div className="bg-[#05150c] border border-emerald-800/60 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Smart Farm Reminders & Timelines</h3>
              <p className="text-xs text-emerald-300/80">
                AI notifications generated from field soil moisture, weather, and crop growth stages.
              </p>
            </div>
          </div>

          <span className="text-xs text-gray-400 hidden sm:block">
            {activeReminders.length} Active Notifications
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {activeReminders.map((notif) => (
            <div
              key={notif.id}
              className="bg-[#030e07] border border-emerald-900/80 hover:border-emerald-500/50 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-md"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">{notif.fieldName}</span>
                  <span className="text-[10px] text-gray-400">{notif.date}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{notif.message}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                <button
                  onClick={() => onNavigate(notif.targetTab)}
                  className="text-emerald-400 font-bold flex items-center gap-1 hover:underline text-[11px]"
                >
                  <span>Go to Module</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-2 text-[11px]">
                  <button
                    onClick={() => snoozeNotification(notif.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    Snooze
                  </button>
                  <button
                    onClick={() => completeNotification(notif.id)}
                    className="text-emerald-400 font-bold hover:text-emerald-300"
                  >
                    Mark Done
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MODAL A: ADD / EDIT FIELD MODAL
          ========================================================================= */}
      {fieldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#05140b] border border-emerald-500/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setFieldModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>{editingFieldId ? 'Edit Field Record' : 'Add New Agricultural Field'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {editingFieldId ? 'Update Field Information' : 'Register New Field Plot'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Field Name / Number</label>
                <input
                  type="text"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Area (Acres)</label>
                <input
                  type="number"
                  step="0.25"
                  value={fieldAreaAcres}
                  onChange={(e) => setFieldAreaAcres(parseFloat(e.target.value) || 1)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Soil Type</label>
                <select
                  value={fieldSoilType}
                  onChange={(e) => setFieldSoilType(e.target.value as SoilType)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Clay Loam">Clay Loam (களிமண் கலவை)</option>
                  <option value="Alluvial">Alluvial Soil (வண்டல் மண்)</option>
                  <option value="Red Loam">Red Loam (செம்மண்)</option>
                  <option value="Black Cotton">Black Cotton Soil (கரிசல் மண்)</option>
                  <option value="Sandy Loam">Sandy Loam (மணல் கலந்த மண்)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Soil pH (5.0 – 9.0)</label>
                <input
                  type="number"
                  step="0.1"
                  value={fieldSoilPh}
                  onChange={(e) => setFieldSoilPh(parseFloat(e.target.value) || 7)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Soil Fertility Level</label>
                <select
                  value={fieldFertility}
                  onChange={(e) => setFieldFertility(e.target.value as 'High' | 'Medium' | 'Low')}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="High">High Fertility</option>
                  <option value="Medium">Medium Fertility</option>
                  <option value="Low">Low Fertility</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Water Holding Capacity</label>
                <select
                  value={fieldWaterCapacity}
                  onChange={(e) => setFieldWaterCapacity(e.target.value as 'High' | 'Moderate' | 'Low')}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="High">High Retention (Wetland)</option>
                  <option value="Moderate">Moderate Retention</option>
                  <option value="Low">Low Retention (Well-drained)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Irrigation Type</label>
                <select
                  value={fieldIrrigation}
                  onChange={(e) => setFieldIrrigation(e.target.value as IrrigationType)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Canal / Sluice">Canal / Sluice Gate</option>
                  <option value="Drip Irrigation">Drip Irrigation System</option>
                  <option value="Borewell Sprinkler">Borewell Sprinkler</option>
                  <option value="Open Well Lift">Open Well Lift</option>
                  <option value="Rainfed">Rainfed Only</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Water Availability</label>
                <select
                  value={fieldWaterAvail}
                  onChange={(e) => setFieldWaterAvail(e.target.value as WaterAvailability)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Abundant (Year-round)">Abundant (Year-round)</option>
                  <option value="Adequate (Seasonal)">Adequate (Seasonal)</option>
                  <option value="Scarce / Critical">Scarce / Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Current Crop</label>
                <input
                  type="text"
                  value={fieldCurrCrop}
                  onChange={(e) => setFieldCurrCrop(e.target.value)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Crop Variety</label>
                <input
                  type="text"
                  value={fieldCropVariety}
                  onChange={(e) => setFieldCropVariety(e.target.value)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Previous Crop</label>
                <input
                  type="text"
                  value={fieldPrevCrop}
                  onChange={(e) => setFieldPrevCrop(e.target.value)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Sowing Date</label>
                <input
                  type="date"
                  value={fieldSowingDate}
                  onChange={(e) => setFieldSowingDate(e.target.value)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-900/60 flex items-center justify-end gap-3">
              <button
                onClick={() => setFieldModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveField}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg"
              >
                Save Field
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL B: FULL FIELD DETAILS MODAL
          ========================================================================= */}
      {fieldDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#05140b] border border-emerald-500/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setFieldDetailsModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300">
                Field #{fieldDetailsModal.fieldNumber} Dossier
              </span>
              <h2 className="text-2xl font-black text-white mt-1">{fieldDetailsModal.name}</h2>
              <p className="text-xs text-gray-300">{fieldDetailsModal.location}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="text-gray-400 block text-[10px]">Area</span>
                <strong className="text-white text-sm">{fieldDetailsModal.areaAcres} Acres</strong>
                <span className="text-gray-400 block text-[10px]">({fieldDetailsModal.areaHectares} ha)</span>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="text-gray-400 block text-[10px]">Soil Type & pH</span>
                <strong className="text-white text-sm">{fieldDetailsModal.soilType}</strong>
                <span className="text-emerald-300 block text-[10px]">pH {fieldDetailsModal.soilPh}</span>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="text-gray-400 block text-[10px]">Current Crop</span>
                <strong className="text-white text-sm">{fieldDetailsModal.currentCrop}</strong>
                <span className="text-gray-400 block text-[10px]">{fieldDetailsModal.cropVariety}</span>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="text-gray-400 block text-[10px]">Growth Stage</span>
                <strong className="text-emerald-300 text-sm">{fieldDetailsModal.growthStage}</strong>
                <span className="text-gray-400 block text-[10px]">DAS: {fieldDetailsModal.daysAfterSowing}</span>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="text-gray-400 block text-[10px]">Irrigation Setup</span>
                <strong className="text-white text-sm">{fieldDetailsModal.irrigationType}</strong>
                <span className="text-cyan-300 block text-[10px]">{fieldDetailsModal.waterAvailability}</span>
              </div>

              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="text-gray-400 block text-[10px]">Previous Crop</span>
                <strong className="text-white text-sm">{fieldDetailsModal.previousCrop}</strong>
                <span className="text-gray-400 block text-[10px]">Crop Rotation OK</span>
              </div>
            </div>

            {/* Soil Nutrient Values */}
            <div className="bg-black/40 border border-emerald-900/60 rounded-2xl p-4 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Soil Available Nutrients (Lab Test STCR Values)
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/5 p-2 rounded-xl">
                  <span className="text-gray-400 block text-[10px]">Nitrogen (N)</span>
                  <strong className="text-emerald-400 text-sm">{fieldDetailsModal.nitrogenKgHa} kg/ha</strong>
                </div>
                <div className="bg-white/5 p-2 rounded-xl">
                  <span className="text-gray-400 block text-[10px]">Phosphorus (P)</span>
                  <strong className="text-emerald-400 text-sm">{fieldDetailsModal.phosphorusKgHa} kg/ha</strong>
                </div>
                <div className="bg-white/5 p-2 rounded-xl">
                  <span className="text-gray-400 block text-[10px]">Potassium (K)</span>
                  <strong className="text-emerald-400 text-sm">{fieldDetailsModal.potassiumKgHa} kg/ha</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-900/60">
              <button
                onClick={() => setFieldDetailsModal(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedFieldId(fieldDetailsModal.id);
                  setFieldDetailsModal(null);
                  onNavigate('crop-selection');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2"
              >
                <span>AI Crop Recommendation for this Field</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL C: EDIT FARMER PROFILE MODAL
          ========================================================================= */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#05140b] border border-emerald-500/50 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setProfileModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-black text-white">Edit Farmer Profile</h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Farmer Full Name</label>
                <input
                  type="text"
                  value={profName}
                  onChange={(e) => setProfName(e.target.value)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={profPhone}
                  onChange={(e) => setProfPhone(e.target.value)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Village</label>
                  <input
                    type="text"
                    value={profVillage}
                    onChange={(e) => setProfVillage(e.target.value)}
                    className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">District</label>
                  <input
                    type="text"
                    value={profDistrict}
                    onChange={(e) => setProfDistrict(e.target.value)}
                    className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Farming Experience (Years)</label>
                <input
                  type="number"
                  value={profExp}
                  onChange={(e) => setProfExp(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-end gap-3">
              <button
                onClick={() => setProfileModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
