import React, { useState, useMemo } from 'react';
import { useFarmer } from '../context/FarmerContext';
import { getFieldCropImage } from '../utils/cropImages';
import {
  Sprout,
  ShieldAlert,
  TrendingUp,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  CloudRain,
  Sun,
  Bug,
  Coins,
  ArrowRight,
  Info,
  ShieldCheck
} from 'lucide-react';

type LongDurationCropKey = 'Sugarcane' | 'Banana' | 'Coconut' | 'Turmeric';
type RiskScenarioKey = 'normal' | 'drought' | 'flood' | 'pest' | 'price_drop';

interface IntercropOption {
  id: string;
  name: string;
  durationDays: number;
  spacingRule: string;
  synergyBenefit: string;
  extraCostPerAcre: number;
  bonusRevenuePerAcre: number;
  fertilizerSavingsPerAcre: number;
  droughtResilienceBoost: number; // % loss reduction
  floodResilienceBoost: number;
  pestResilienceBoost: number;
}

interface MainCropProfile {
  key: LongDurationCropKey;
  title: string;
  durationLabel: string;
  imageUrl: string;
  baseRevenuePerAcre: number;
  baseCostPerAcre: number;
  intercrops: IntercropOption[];
}

const LONG_DURATION_CROPS: Record<LongDurationCropKey, MainCropProfile> = {
  Sugarcane: {
    key: 'Sugarcane',
    title: 'Sugarcane (Co 86032)',
    durationLabel: '300 – 360 Days',
    imageUrl: '/crops/sugarcane.jpg',
    baseRevenuePerAcre: 145000,
    baseCostPerAcre: 58000,
    intercrops: [
      {
        id: 'sc_blackgram',
        name: 'Black Gram (VBN 8)',
        durationDays: 65,
        spacingRule: '2 rows between 150 cm wide sugarcane trenches',
        synergyBenefit: 'Fixes +25 kg/acre atmospheric Nitrogen & suppresses early weeds during cane formative phase.',
        extraCostPerAcre: 4200,
        bonusRevenuePerAcre: 22500,
        fertilizerSavingsPerAcre: 2400,
        droughtResilienceBoost: 14,
        floodResilienceBoost: 8,
        pestResilienceBoost: 12
      },
      {
        id: 'sc_soybean',
        name: 'Soybean / Green Gram',
        durationDays: 70,
        spacingRule: 'Paired rows on ridge shoulders at Day 1 of cane planting',
        synergyBenefit: 'Living soil mulch reduces soil evaporation by 22% and improves soil organic carbon.',
        extraCostPerAcre: 4500,
        bonusRevenuePerAcre: 21000,
        fertilizerSavingsPerAcre: 2100,
        droughtResilienceBoost: 16,
        floodResilienceBoost: 6,
        pestResilienceBoost: 10
      },
      {
        id: 'sc_onion',
        name: 'Small Onion / Coriander',
        durationDays: 55,
        spacingRule: 'Shallow bed strips between wide cane rows',
        synergyBenefit: 'Fast 55-day cash flow covers early cane weeding & fertigation labor expenses.',
        extraCostPerAcre: 7500,
        bonusRevenuePerAcre: 29500,
        fertilizerSavingsPerAcre: 800,
        droughtResilienceBoost: 8,
        floodResilienceBoost: 5,
        pestResilienceBoost: 14
      }
    ]
  },
  Banana: {
    key: 'Banana',
    title: 'Banana (Grand Naine)',
    durationLabel: '270 – 330 Days',
    imageUrl: '/crops/banana.jpg',
    baseRevenuePerAcre: 210000,
    baseCostPerAcre: 82000,
    intercrops: [
      {
        id: 'bn_marigold',
        name: 'African Marigold (Nematode Shield)',
        durationDays: 90,
        spacingRule: '1 row between 1.8m x 1.8m banana pits',
        synergyBenefit: 'Root exudates naturally suppress burrowing & root-knot nematodes + attracts pollinators.',
        extraCostPerAcre: 5500,
        bonusRevenuePerAcre: 27500,
        fertilizerSavingsPerAcre: 1800,
        droughtResilienceBoost: 10,
        floodResilienceBoost: 10,
        pestResilienceBoost: 24
      },
      {
        id: 'bn_turmeric',
        name: 'Erode Turmeric (Shade Intercrop)',
        durationDays: 220,
        spacingRule: 'Raised beds in inter-row corridors (Months 1–7)',
        synergyBenefit: 'Thrives under partial banana canopy shade and shares twin-drip fertigation lines.',
        extraCostPerAcre: 18000,
        bonusRevenuePerAcre: 56000,
        fertilizerSavingsPerAcre: 3200,
        droughtResilienceBoost: 12,
        floodResilienceBoost: 12,
        pestResilienceBoost: 15
      },
      {
        id: 'bn_cowpea',
        name: 'Vegetable Cowpea / Amaranthus',
        durationDays: 50,
        spacingRule: 'Broadcast/line-sown in basin alleys',
        synergyBenefit: 'Covers bare soil in first 60 days, preventing moisture evaporation and generating weekly cash.',
        extraCostPerAcre: 3200,
        bonusRevenuePerAcre: 17500,
        fertilizerSavingsPerAcre: 1900,
        droughtResilienceBoost: 13,
        floodResilienceBoost: 7,
        pestResilienceBoost: 11
      }
    ]
  },
  Coconut: {
    key: 'Coconut',
    title: 'Coconut (Perennial Tall/Hybrid)',
    durationLabel: 'Perennial (365+ Days)',
    imageUrl: '/crops/banana.jpg',
    baseRevenuePerAcre: 95000,
    baseCostPerAcre: 28000,
    intercrops: [
      {
        id: 'cn_cocoa',
        name: 'Cocoa (Multi-Tier Understory)',
        durationDays: 365,
        spacingRule: 'Single row at 3m spacing along coconut alley center',
        synergyBenefit: 'Utilizes 60% filtered sunlight; fallen cocoa leaves create thick natural humus mulch.',
        extraCostPerAcre: 12000,
        bonusRevenuePerAcre: 44000,
        fertilizerSavingsPerAcre: 3500,
        droughtResilienceBoost: 18,
        floodResilienceBoost: 14,
        pestResilienceBoost: 12
      },
      {
        id: 'cn_pineapple',
        name: 'Pineapple + Black Pepper',
        durationDays: 300,
        spacingRule: 'Twin-row pineapple beds + pepper vines trained on palm trunks',
        synergyBenefit: 'Maximizes vertical + ground space for 2.2x total land equivalent ratio (LER).',
        extraCostPerAcre: 16500,
        bonusRevenuePerAcre: 58000,
        fertilizerSavingsPerAcre: 2000,
        droughtResilienceBoost: 15,
        floodResilienceBoost: 10,
        pestResilienceBoost: 14
      }
    ]
  },
  Turmeric: {
    key: 'Turmeric',
    title: 'Erode Turmeric',
    durationLabel: '210 – 240 Days',
    imageUrl: '/crops/turmeric.jpg',
    baseRevenuePerAcre: 195000,
    baseCostPerAcre: 70000,
    intercrops: [
      {
        id: 'tm_onion',
        name: 'Small Onion / Fenugreek',
        durationDays: 55,
        spacingRule: 'Sown on raised bed edges before turmeric broad leaves close canopy',
        synergyBenefit: 'Quick harvest at Day 55 leaves zero competition during rhizome bulking.',
        extraCostPerAcre: 6500,
        bonusRevenuePerAcre: 26000,
        fertilizerSavingsPerAcre: 1200,
        droughtResilienceBoost: 10,
        floodResilienceBoost: 8,
        pestResilienceBoost: 12
      },
      {
        id: 'tm_castor',
        name: 'Castor / Maize Shade Border',
        durationDays: 140,
        spacingRule: '1 border row every 4.5 meters for afternoon sun-scorch protection',
        synergyBenefit: 'Reduces midday heat stress on tender turmeric leaves and acts as trap crop for Spodoptera.',
        extraCostPerAcre: 2800,
        bonusRevenuePerAcre: 14500,
        fertilizerSavingsPerAcre: 1000,
        droughtResilienceBoost: 16,
        floodResilienceBoost: 6,
        pestResilienceBoost: 20
      }
    ]
  }
};

const SCENARIOS: {
  id: RiskScenarioKey;
  label: string;
  icon: any;
  monoYieldLossPct: number;
  priceImpactPct: number;
  summary: string;
}[] = [
  {
    id: 'normal',
    label: 'Normal Season',
    icon: Sun,
    monoYieldLossPct: 0,
    priceImpactPct: 0,
    summary: 'Ideal monsoon distribution and stable APMC Mandi prices.'
  },
  {
    id: 'drought',
    label: 'Drought (-40% Rain)',
    icon: AlertTriangle,
    monoYieldLossPct: 34,
    priceImpactPct: 5,
    summary: 'Severe soil moisture deficit slows main crop growth; living intercrop mulch retains moisture.'
  },
  {
    id: 'flood',
    label: 'Cyclone / Flood',
    icon: CloudRain,
    monoYieldLossPct: 38,
    priceImpactPct: 0,
    summary: 'Heavy waterlogging damages main crop; early-harvested intercrops already secured partial income.'
  },
  {
    id: 'pest',
    label: 'Pest / Disease Outbreak',
    icon: Bug,
    monoYieldLossPct: 30,
    priceImpactPct: 0,
    summary: 'Monocrop pest spread is rapid; trap/repellent intercrops break pest life cycle.'
  },
  {
    id: 'price_drop',
    label: 'Mandi Price Crash (-20%)',
    icon: Coins,
    monoYieldLossPct: 0,
    priceImpactPct: -22,
    summary: 'Oversupply drops primary crop price by 22%; secondary intercrop diversifies cash revenue.'
  }
];

export default function IntercropSimulatorPage() {
  const { fields } = useFarmer();

  const [selectedCropKey, setSelectedCropKey] = useState<LongDurationCropKey>('Sugarcane');
  const [selectedIntercropId, setSelectedIntercropId] = useState<string>('sc_blackgram');
  const [scenario, setScenario] = useState<RiskScenarioKey>('drought');
  const [acres, setAcres] = useState<number>(1.5);
  const [stressIntensity, setStressIntensity] = useState<number>(100); // 50% to 150%
  const [shortCropWarningField, setShortCropWarningField] = useState<string | null>(null);

  const mainProfile = LONG_DURATION_CROPS[selectedCropKey];
  const activeIntercrop =
    mainProfile.intercrops.find((i) => i.id === selectedIntercropId) || mainProfile.intercrops[0];
  const activeScenario = SCENARIOS.find((s) => s.id === scenario) || SCENARIOS[0];

  const handleSelectCropKey = (key: LongDurationCropKey) => {
    setSelectedCropKey(key);
    setSelectedIntercropId(LONG_DURATION_CROPS[key].intercrops[0].id);
    setShortCropWarningField(null);
  };

  // Handle clicking any of the farmer's fields
  const handleFieldClick = (fieldCrop: string, fieldName: string, fieldAcres: number) => {
    const c = fieldCrop.toLowerCase();
    if (c.includes('sugar') || c.includes('cane')) {
      setAcres(fieldAcres);
      handleSelectCropKey('Sugarcane');
    } else if (c.includes('banana')) {
      setAcres(fieldAcres);
      handleSelectCropKey('Banana');
    } else if (c.includes('turmeric')) {
      setAcres(fieldAcres);
      handleSelectCropKey('Turmeric');
    } else if (c.includes('coconut')) {
      setAcres(fieldAcres);
      handleSelectCropKey('Coconut');
    } else {
      setShortCropWarningField(
        `${fieldName} (${fieldCrop}) is a short-duration dense crop. Intercropping is ONLY recommended for long-duration wide-spaced crops like Sugarcane, Banana, Coconut, or Turmeric.`
      );
    }
  };

  // Financial & Risk Simulation Math
  const sim = useMemo(() => {
    const intensityFactor = stressIntensity / 100;
    const rawLossPct = Math.min(75, activeScenario.monoYieldLossPct * intensityFactor);
    const priceFactor = 1 + (activeScenario.priceImpactPct * intensityFactor) / 100;

    // Monocrop outcome
    const monoGross = Math.round(
      mainProfile.baseRevenuePerAcre * acres * (1 - rawLossPct / 100) * priceFactor
    );
    const monoCost = Math.round(mainProfile.baseCostPerAcre * acres);
    const monoNet = monoGross - monoCost;

    // Intercrop resilience boost
    let resilienceBoost = 0;
    if (scenario === 'drought') resilienceBoost = activeIntercrop.droughtResilienceBoost;
    else if (scenario === 'flood') resilienceBoost = activeIntercrop.floodResilienceBoost;
    else if (scenario === 'pest') resilienceBoost = activeIntercrop.pestResilienceBoost;

    const bufferedMainLossPct = Math.max(0, rawLossPct - resilienceBoost);
    const interMainGross = Math.round(
      mainProfile.baseRevenuePerAcre * acres * (1 - bufferedMainLossPct / 100) * priceFactor
    );

    // Bonus intercrop revenue (only slightly affected by stress if short-cycle)
    const interBonusLossFactor = scenario === 'normal' ? 1 : scenario === 'price_drop' ? 0.92 : 0.85;
    const bonusRevenue = Math.round(activeIntercrop.bonusRevenuePerAcre * acres * interBonusLossFactor);
    const fertSavings = Math.round(activeIntercrop.fertilizerSavingsPerAcre * acres);
    const totalCost = monoCost + Math.round(activeIntercrop.extraCostPerAcre * acres) - fertSavings;
    const interNet = interMainGross + bonusRevenue - totalCost;

    const extraProfitProtected = interNet - monoNet;
    const resilienceScore =
      scenario === 'normal'
        ? 95
        : Math.min(96, Math.round(62 + resilienceBoost * 1.4));

    return {
      monoGross,
      monoCost,
      monoNet,
      rawLossPct: Math.round(rawLossPct),
      bufferedMainLossPct: Math.round(bufferedMainLossPct),
      bonusRevenue,
      fertSavings,
      totalCost,
      interNet,
      extraProfitProtected,
      resilienceScore
    };
  }, [mainProfile, activeIntercrop, activeScenario, scenario, acres, stressIntensity]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04180c] via-[#051d0e] to-[#031008] text-gray-100 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 1. HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/25 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Intercropping & What-If Risk Simulator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Long-Duration Intercropping & Risk Lab
            </h1>
            <p className="text-sm text-emerald-100/80 mt-1 max-w-2xl">
              Exclusively recommends compatible intercrops for long-duration crops (Sugarcane, Banana, Coconut, Turmeric) and simulates net farm profit under drought, flood, pest, or market-crash scenarios.
            </p>
          </div>
        </div>

        {/* 2. YOUR FARM FIELDS FILTER (Shows Long-Duration Eligible vs Short-Duration Monocrop) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-300 uppercase tracking-wider">
              Select From Your Farm Plots or Long-Duration Crops:
            </span>
            <span className="text-gray-400">
              Only wide-spaced long-duration crops qualify for intercropping
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {fields.map((f) => {
              const c = f.currentCrop.toLowerCase();
              const isLongDuration =
                c.includes('sugar') || c.includes('banana') || c.includes('turmeric') || c.includes('coconut');
              return (
                <button
                  key={f.id}
                  onClick={() => handleFieldClick(f.currentCrop, f.name, f.areaAcres)}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                    isLongDuration
                      ? 'bg-[#062413]/85 border-emerald-400/40 hover:border-emerald-300'
                      : 'bg-black/40 border-white/10 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={getFieldCropImage(f.currentCrop)}
                      alt={f.currentCrop}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-black text-white truncate">{f.name}</span>
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                          isLongDuration
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {isLongDuration ? 'Eligible' : 'Sole Crop'}
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-300 truncate">{f.currentCrop}</div>
                    <div className="text-[10px] text-gray-400">{f.areaAcres} Acres</div>
                  </div>
                </button>
              );
            })}
          </div>

          {shortCropWarningField && (
            <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-200 flex items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{shortCropWarningField}</span>
              </div>
              <button
                onClick={() => handleSelectCropKey('Sugarcane')}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-black font-black text-[11px] shrink-0 cursor-pointer"
              >
                Switch to Sugarcane ➔
              </button>
            </div>
          )}
        </div>

        {/* 3. LONG-DURATION BASE CROP TABS */}
        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(LONG_DURATION_CROPS) as LongDurationCropKey[]).map((key) => (
            <button
              key={key}
              onClick={() => handleSelectCropKey(key)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2 cursor-pointer border ${
                selectedCropKey === key
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg'
                  : 'bg-[#062112]/80 text-gray-300 border-emerald-900/60 hover:border-emerald-500/40'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>{LONG_DURATION_CROPS[key].title}</span>
              <span className="text-[10px] opacity-80 font-mono">
                ({LONG_DURATION_CROPS[key].durationLabel})
              </span>
            </button>
          ))}
        </div>

        {/* 4. MAIN SIMULATOR WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Compatible Intercrops + Stress Scenario Controls */}
          <div className="lg:col-span-5 space-y-5">
            {/* Compatible Intercrops List */}
            <div className="bg-[#062112]/85 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                  1. AI Compatible Intercrops for {selectedCropKey}
                </h3>
                <span className="text-[10px] text-gray-400">
                  {mainProfile.intercrops.length} Verified Matches
                </span>
              </div>

              <div className="space-y-3">
                {mainProfile.intercrops.map((ic) => {
                  const isActive = ic.id === activeIntercrop.id;
                  return (
                    <button
                      key={ic.id}
                      onClick={() => setSelectedIntercropId(ic.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition space-y-2 cursor-pointer ${
                        isActive
                          ? 'bg-emerald-600/20 border-emerald-400 shadow-lg'
                          : 'bg-black/30 border-white/10 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-white">{ic.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          +{ic.durationDays} Days
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                        {ic.synergyBenefit}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/10">
                        <span>Spacing: {ic.spacingRule}</span>
                        <strong className="text-lime-400">
                          +₹{ic.bonusRevenuePerAcre.toLocaleString('en-IN')}/ac
                        </strong>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* What-If Stress Scenario Selector */}
            <div className="bg-[#062112]/85 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                2. "What-If" Climate & Market Stress Scenario
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SCENARIOS.map((sc) => {
                  const Icon = sc.icon;
                  const active = sc.id === scenario;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setScenario(sc.id)}
                      className={`p-3 rounded-2xl border text-left text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                        active
                          ? 'bg-amber-500/20 border-amber-400 text-white'
                          : 'bg-black/30 border-white/10 text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-amber-300' : 'text-gray-400'}`} />
                      <span>{sc.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-emerald-900/60 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 font-bold">Plot Area</span>
                    <span className="font-mono font-black text-emerald-300">{acres} Acres</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={acres}
                    onChange={(e) => setAcres(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 font-bold">Stress Severity</span>
                    <span className="font-mono font-black text-amber-300">{stressIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    step="10"
                    value={stressIntensity}
                    onChange={(e) => setStressIntensity(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Simulation Results & Monocrop vs Intercrop Financial Comparison */}
          <div className="lg:col-span-7 space-y-6">
            {/* Hero Outcome Banner */}
            <div className="bg-gradient-to-br from-[#072b17] via-[#051d0f] to-[#031109] border border-emerald-400/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                    Simulation Result • {acres} Acres ({selectedCropKey} + {activeIntercrop.name})
                  </span>
                  <h2 className="text-2xl font-black text-white mt-0.5">
                    +₹{sim.extraProfitProtected.toLocaleString('en-IN')} Extra Profit Protected
                  </h2>
                  <p className="text-xs text-gray-300 mt-1">{activeScenario.summary}</p>
                </div>

                <div className="bg-black/40 border border-emerald-400/30 px-4 py-3 rounded-2xl text-center shrink-0">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">
                    Resilience Score
                  </span>
                  <span className="text-2xl font-black text-emerald-400">{sim.resilienceScore}%</span>
                </div>
              </div>

              {/* Side-by-Side Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Monocrop Outcome */}
                <div className="bg-black/40 border border-rose-500/30 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-300 uppercase">
                      Sole {selectedCropKey} (Monocrop)
                    </span>
                    {sim.rawLossPct > 0 && (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                        -{sim.rawLossPct}% Stress Loss
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 block">Projected Net Profit</span>
                    <span className="text-2xl font-black text-white">
                      ₹{sim.monoNet.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-[11px] text-gray-300 space-y-1 pt-2 border-t border-white/10">
                    <div className="flex justify-between">
                      <span>Main Crop Revenue:</span>
                      <strong>₹{sim.monoGross.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Cultivation Cost:</span>
                      <strong>-₹{sim.monoCost.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between text-rose-300">
                      <span>Bonus Intercrop Income:</span>
                      <strong>₹0</strong>
                    </div>
                  </div>
                </div>

                {/* AI Intercrop Outcome */}
                <div className="bg-emerald-950/60 border border-emerald-400/50 rounded-2xl p-5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-300 uppercase">
                      AI Intercropping Plan
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/25 text-emerald-200 text-[10px] font-bold">
                      Dual Income
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-emerald-200/80 block">Combined Net Profit</span>
                    <span className="text-2xl font-black text-emerald-300">
                      ₹{sim.interNet.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-[11px] text-gray-200 space-y-1 pt-2 border-t border-emerald-400/20">
                    <div className="flex justify-between">
                      <span>Buffered {selectedCropKey} Loss:</span>
                      <strong className="text-emerald-300">
                        {sim.bufferedMainLossPct}% (vs {sim.rawLossPct}%)
                      </strong>
                    </div>
                    <div className="flex justify-between text-lime-300">
                      <span>Bonus {activeIntercrop.name.split(' ')[0]} Revenue:</span>
                      <strong>+₹{sim.bonusRevenue.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between text-emerald-300">
                      <span>Fertilizer / Input Savings:</span>
                      <strong>+₹{sim.fertSavings.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Profit Comparison Bars */}
              <div className="bg-black/35 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-bold text-white">Net Profit Comparison ({acres} Acres)</div>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Monocrop Net</span>
                      <span className="font-mono font-bold text-white">
                        ₹{sim.monoNet.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-rose-400/80 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(8, Math.min(100, Math.round((sim.monoNet / Math.max(1, sim.interNet)) * 100)))}%`
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-emerald-300 font-bold">AI Intercropping Net</span>
                      <span className="font-mono font-black text-emerald-300">
                        ₹{sim.interNet.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full transition-all duration-500"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Agronomic Survival & Spacing Protocol */}
              <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-100">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">
                    AI Intercropping Execution Guide
                  </strong>
                  <span>
                    Plant <strong>{activeIntercrop.name}</strong> using{' '}
                    <strong>{activeIntercrop.spacingRule}</strong>. {activeIntercrop.synergyBenefit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
