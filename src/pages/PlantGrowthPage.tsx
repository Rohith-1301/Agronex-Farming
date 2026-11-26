import React, { useState } from 'react';
import {
  Sprout,
  Droplets,
  Calendar,
  Activity,
  Layers,
  ChevronRight,
  Volume2,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Eye,
  Sliders,
  Check,
  AlertTriangle
} from 'lucide-react';
import { TNAU_CROPS_DATABASE } from '../data/tnauMasterDataset';

interface GrowthStageData {
  stage: number;
  name: string;
  tamilName: string;
  das: string; // Days after sowing
  heightCm: number;
  rootDepthCm: number;
  waterLitersPerAcre: number;
  npkRatio: string;
  description: string;
  tamilDescription: string;
  imageSrc: string;
  farmerTasks: string[];
}

export const CROP_8_STAGES_RICE: GrowthStageData[] = [
  {
    stage: 1,
    name: '1. Seed Imbibition & Activation (விதை உறங்குதல்)',
    tamilName: 'விதை மண்ணில் உறங்குதல்',
    das: 'Day 0 - 3',
    heightCm: 0,
    rootDepthCm: 2,
    waterLitersPerAcre: 8000,
    npkRatio: '0:0:0 (Basal soil organic matter only)',
    description: 'Imbibition phase. Seed absorbs moisture from the damp seedbed, activating alpha-amylase cellular enzymes. The embryo swells and prepares to split the protective lemma and palea seed coat.',
    tamilDescription: 'மண்ணின் ஈரப்பதத்தை விதை உறிஞ்சி முளைக்கத் தயாராகும் பருவம். விதை நேர்த்தி செய்தல் அவசியம்.',
    imageSrc: '/paddy-macro.jpg',
    farmerTasks: [
      'Seed treatment with Pseudomonas fluorescens (10g/kg) and Azospirillum (600g/ha)',
      'Maintain saturated nursery bed without stagnant standing water'
    ]
  },
  {
    stage: 2,
    name: '2. Germination & Radicle Emergence (முளைப்பு)',
    tamilName: 'முளைத்தல் பருவம்',
    das: 'Day 4 - 7',
    heightCm: 1.5,
    rootDepthCm: 5,
    waterLitersPerAcre: 10000,
    npkRatio: 'Basal Phosphorus for root trigger',
    description: 'Radicle breaks through the seed coat and gravitropically anchors downwards into soil. The pale green coleoptile emerges upward seeking sunlight.',
    tamilDescription: 'முளைவேர் கீழ்நோக்கியும், இளங்குருத்து மேல்நோக்கியும் வளரும் நிலை.',
    imageSrc: '/paddy-macro.jpg',
    farmerTasks: [
      'Ensure gentle drainage of excess evening rainwater',
      'Protect nursery from bird pick and rat damage'
    ]
  },
  {
    stage: 3,
    name: '3. Root Multiplication & Seedling (நாற்று & வேர்)',
    tamilName: 'வேர் வளர்ச்சி நிலை',
    das: 'Day 8 - 18',
    heightCm: 15,
    rootDepthCm: 15,
    waterLitersPerAcre: 14000,
    npkRatio: '15:25:10 kg/ha equivalent',
    description: 'Adventitious crown roots multiply rapidly, creating a fine fibrous root web in topsoil (0-15 cm) to absorb dissolved phosphates and nitrogen.',
    tamilDescription: 'ஆணிவேர் மற்றும் சல்லிவேர்கள் மண்ணில் ஆழமாகப் பாய்ந்து சத்துக்களை உறிஞ்சும் பருவம்.',
    imageSrc: '/root-cross-section.jpg',
    farmerTasks: [
      'Transplant 14-day young single seedlings under SRI technique',
      'Apply light spray of 1% DAP or Panchagavya'
    ]
  },
  {
    stage: 4,
    name: '4. Active Tillering & Crown Spread (தூர்கட்டுதல்)',
    tamilName: 'வீரியமான தூர்கட்டும் பருவம்',
    das: 'Day 19 - 42',
    heightCm: 45,
    rootDepthCm: 28,
    waterLitersPerAcre: 28000,
    npkRatio: '25% N + 25% K (First top-dressing)',
    description: 'First tillers branch out from base. The crown produces 15 to 25 vigorous tillers with lush, dark-green linear leaves. Heavy vegetative biomass accumulation.',
    tamilDescription: 'செழிப்பான இளம் நாற்று தூர்கட்டி புதர் போல வளரும் நிலை. களை மேலாண்மை மிக முக்கியம்.',
    imageSrc: '/paddy-macro.jpg',
    farmerTasks: [
      'Operate rotary cono-weeder at 10 and 20 DAT to churn weeds and aerate root zone',
      'Apply first top-dressing of neem-coated urea and potash'
    ]
  },
  {
    stage: 5,
    name: '5. Stem Elongation & Jointing (தண்டு நீட்சி)',
    tamilName: 'தண்டு உருளும் பருவம்',
    das: 'Day 43 - 60',
    heightCm: 70,
    rootDepthCm: 38,
    waterLitersPerAcre: 38000,
    npkRatio: '25% N + 25% K (Second top-dressing)',
    description: 'Internodes elongate rapidly. Internode 1 to 4 extend upwards, elevating the apical meristem. Microspore mother cells form inside the embryonic panicle.',
    tamilDescription: 'தண்டுகள் நீண்டு வளரும் நிலை. பூச்சி கண்காணிப்பு மற்றும் பார்வை சால் அமைத்தல் அவசியம்.',
    imageSrc: '/root-cross-section.jpg',
    farmerTasks: [
      'Provide 30 cm alleyways (Paarvai saal) every 2.5 meters',
      'Check for Yellow Stem Borer dead hearts and BPH nymphs'
    ]
  },
  {
    stage: 6,
    name: '6. Panicle Booting & Anthesis (பூக்கும் பருவம்)',
    tamilName: 'பூக்கும் & கதிர் வரும் பருவம்',
    das: 'Day 61 - 85',
    heightCm: 90,
    rootDepthCm: 46,
    waterLitersPerAcre: 52000,
    npkRatio: 'High Potash (K) for grain weight',
    description: 'Panicle initiation and booting stage. The flag leaf swells, enclosing the developing panicle. Emergence of pollen-bearing florets followed by milky grain filling.',
    tamilDescription: 'கொடி இலை உருவாகி கதிர்கள் வெளிவந்து பால் பிடிக்கும் மிக முக்கியமான பருவம்.',
    imageSrc: '/paddy-golden-panicle.jpg',
    farmerTasks: [
      'Maintain 3-5 cm standing water continuously (critical period)',
      'Foliar spray of 1% Potassium chloride or 3% Panchagavya'
    ]
  },
  {
    stage: 7,
    name: '7. Grain Filling & Ripening (பொற்கதிர் முதிர்ச்சி)',
    tamilName: 'முழு முதிர்ச்சி பருவம்',
    das: 'Day 86 - 110',
    heightCm: 95,
    rootDepthCm: 48,
    waterLitersPerAcre: 15000,
    npkRatio: 'Nil fertilization (Matured grain)',
    description: 'Dough and ripening stage complete. Foliage turns golden amber. Grain moisture drops to 18-20%. Heavy drooping panicles ready for harvest.',
    tamilDescription: 'கதிர்கள் பொன் நிறமாக மாறி அறுவடைக்கு தயாரான நிலை. களம் காய வைத்தல்.',
    imageSrc: '/paddy-golden-panicle.jpg',
    farmerTasks: [
      'Drain all standing water 10 days before harvest to hasten ripening',
      'Check grain moisture (ideal 14-15% for mandi storage)'
    ]
  },
  {
    stage: 8,
    name: '8. Harvest & Soil Recharging Cover (மறுசுழற்சி)',
    tamilName: 'அறுவடை & பசுந்தாள் உழவு',
    das: 'Day 111 - 130',
    heightCm: 15,
    rootDepthCm: 50,
    waterLitersPerAcre: 4000,
    npkRatio: 'Broadcast Daincha / Sunnhemp seed @ 50 kg/ha',
    description: 'Post-harvest stubble incorporation. Residual paddy straw is chopped and ploughed in with summer showers. Daincha or blackgram relay sowing captures residual soil moisture.',
    tamilDescription: 'அறுவடைக்குப் பின் தக்கைப்பூண்டு அல்லது உளுந்து விதைத்து மண்ணின் அங்ககச் சத்தை அதிகரிக்கும் பருவம்.',
    imageSrc: '/tractor-field-real.jpg',
    farmerTasks: [
      'Broadcast blackgram @ 30 kg/ha in standing crop 4-6 days prior to harvest (Rice Fallow Pulses)',
      'Chop and incorporate rice straw with 20 kg urea/ha to hasten composting'
    ]
  }
];

export default function PlantGrowthPage() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(3); // Stage 4: Tillering
  const [showRootDetails, setShowRootDetails] = useState<boolean>(true);

  const stage = CROP_8_STAGES_RICE[activeStageIdx];

  const handleAudioTTS = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${stage.name}. ${stage.description} Days after sowing: ${stage.das}. Recommended agronomic action: ${stage.farmerTasks[0]}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-[#061e11] to-black border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5" />
            <span>Botanical Phenology & Subterranean Nutrition</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Crop Growth Lifecycle & Root Architecture
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Day-by-day morphological development of Samba Paddy (CR 1009 Sub 1) and underground root absorption based on TNAU CPG 2020.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowRootDetails(!showRootDetails)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition border ${
              showRootDetails
                ? 'bg-blue-600/30 text-blue-200 border-blue-400/50 shadow-md'
                : 'bg-black/50 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{showRootDetails ? 'Root Stratum Active' : 'View Root Stratum'}</span>
          </button>

          <button
            onClick={handleAudioTTS}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white transition text-xs font-bold border border-emerald-500/40"
          >
            <Volume2 className="w-4 h-4" />
            <span>Audio Guidance</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Visual Botanical Stage Viewer + Agronomic Action Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: High-Definition Botanical Phenology & Root Cross-Section (7 Cols) */}
        <div className="lg:col-span-7 bg-[#040f08] border border-emerald-900/50 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-between">
          <div className="relative h-[360px] sm:h-[420px] overflow-hidden">
            <img
              src={stage.imageSrc}
              alt={stage.name}
              className="w-full h-full object-cover filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

            {/* Stage Title Overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-black text-xs font-black uppercase tracking-wider shadow-lg">
                Stage {stage.stage} of 8
              </span>
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 text-xs font-bold border border-white/10">
                {stage.das}
              </span>
            </div>

            {/* Bottom Root Penetration Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-semibold uppercase block">
                  Root Penetration Depth
                </span>
                <span className="text-xl font-black text-amber-400">{stage.rootDepthCm} cm Subterranean</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 font-semibold uppercase block">
                  Canopy Height
                </span>
                <span className="text-xl font-black text-emerald-400">{stage.heightCm} cm</span>
              </div>
            </div>
          </div>

          {/* Subterranean Nutrient Absorption Diagram Explanation */}
          {showRootDetails && (
            <div className="p-5 bg-black/70 border-t border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-400 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4" />
                  <span>Subterranean Xylem & Phloem Transport Mechanism</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">TNAU Soil Physics</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-[11px]">
                Active root hairs in Horizon A (0–15 cm) absorb dissolved Orthophosphate ($H_2PO_4^-$) and Ammonium ($NH_4^+$) via passive root interception. Water moves via transpirational pull through the stele vascular bundles into expanding tillers.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: In-Depth Agronomic Actions & Fertilizer Schedule (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#081e12] to-black border border-emerald-800/60 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Agronomic Phase Details
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">{stage.name}</h3>
                <p className="text-xs text-emerald-300">{stage.tamilName}</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
                {stage.das}
              </span>
            </div>

            {/* Phenological Metrics */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-black/50 p-3 rounded-2xl border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">
                  Daily Water Demand
                </span>
                <span className="text-lg font-black text-sky-400">
                  {stage.waterLitersPerAcre.toLocaleString()} L / ac
                </span>
              </div>

              <div className="bg-black/50 p-3 rounded-2xl border border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">
                  NPK Protocol
                </span>
                <span className="text-xs font-bold text-emerald-300 line-clamp-1 mt-1">
                  {stage.npkRatio}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-200 leading-relaxed bg-black/40 p-3.5 rounded-2xl border border-white/5 mb-4">
              {stage.description}
            </p>

            {/* Farmer Actions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Mandatory Farmer Actions (களப் பணிகள்)
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {stage.farmerTasks.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span>Botanical Reference: TNAU CPG 2020</span>
            <span className="text-emerald-400 font-semibold">[Verified Protocol]</span>
          </div>
        </div>
      </div>

      {/* Clickable 8-Stage Timeline Navigation Bar */}
      <div className="bg-[#07190f]/90 backdrop-blur-md border border-emerald-900/60 rounded-3xl p-5 shadow-2xl space-y-3">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
          Select Botanical Phenology Stage (8 Stages):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {CROP_8_STAGES_RICE.map((s, idx) => {
            const active = idx === activeStageIdx;
            return (
              <button
                key={s.stage}
                onClick={() => setActiveStageIdx(idx)}
                className={`p-3 rounded-2xl border text-left transition ${
                  active
                    ? 'bg-emerald-600 text-white border-white shadow-lg shadow-emerald-900/50 scale-102'
                    : 'bg-[#041208] border-white/5 text-gray-300 hover:bg-[#0c2b1a]'
                }`}
              >
                <span className={`text-[10px] font-bold block ${active ? 'text-white' : 'text-emerald-400'}`}>
                  Stage {s.stage}
                </span>
                <h5 className="text-xs font-bold line-clamp-1">{s.name.split('.')[1]}</h5>
                <span className={`text-[10px] block mt-1 ${active ? 'text-emerald-100' : 'text-gray-400'}`}>
                  {s.das}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
