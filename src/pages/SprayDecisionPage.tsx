import React, { useState, useMemo } from 'react';
import { useFarmer } from '../context/FarmerContext';
import { getFieldCropImage } from '../utils/cropImages';
import {
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BellPlus,
  Sparkles,
  Calendar,
  ShieldCheck,
  Sprout,
  Sun,
  ArrowRight,
  BellRing,
  Check
} from 'lucide-react';

type SprayActionType =
  | 'fungicide'
  | 'insecticide'
  | 'foliar_npk'
  | 'herbicide'
  | 'irrigation';

interface HourlySlot {
  time: string;
  temp: number;
  windKmh: number;
  rainProb: number;
  humidity: number;
  status: 'optimal' | 'caution' | 'avoid';
  note: string;
}

export default function SprayDecisionPage() {
  const {
    fields,
    selectedFieldId,
    setSelectedFieldId,
    recentDiagnosis,
    notifications,
    addNotification
  } = useFarmer();

  const currentField = fields.find((f) => f.id === selectedFieldId) || fields[0];

  // Action & Micro-climate Controls (pre-filled with realistic Thanjavur telemetry)
  const [actionType, setActionType] = useState<SprayActionType>('fungicide');
  const [windSpeed, setWindSpeed] = useState<number>(12);
  const [rainProb, setRainProb] = useState<number>(40);
  const [temperature, setTemperature] = useState<number>(31);
  const [humidity, setHumidity] = useState<number>(76);
  const [justScheduledMsg, setJustScheduledMsg] = useState<string | null>(null);

  const actionOptions: { id: SprayActionType; label: string; sub: string; rainfastHrs: number }[] = [
    {
      id: 'fungicide',
      label: 'Fungicide Spray',
      sub: recentDiagnosis?.verifiedMedicines?.[0]?.name || 'Tricyclazole / Propiconazole',
      rainfastHrs: 4
    },
    {
      id: 'insecticide',
      label: 'Insecticide Spray',
      sub: 'Imidacloprid / Emamectin Benzoate',
      rainfastHrs: 4
    },
    {
      id: 'foliar_npk',
      label: 'Foliar NPK / Micronutrients',
      sub: '19:19:19 / Zinc Sulphate / KNO3',
      rainfastHrs: 3
    },
    {
      id: 'herbicide',
      label: 'Weedicide / Herbicide',
      sub: 'Pre / Post-Emergence Spray',
      rainfastHrs: 6
    },
    {
      id: 'irrigation',
      label: 'Field Irrigation',
      sub: currentField.irrigationType,
      rainfastHrs: 0
    }
  ];

  const selectedActionMeta = actionOptions.find((a) => a.id === actionType) || actionOptions[0];

  // Core AI Decision Engine
  const decision = useMemo(() => {
    const reasonsNotNow: string[] = [];
    const costAtRisk = Math.round((currentField.areaAcres || 1.5) * 650);

    if (actionType === 'irrigation') {
      const moisture = currentField.soilMoisturePercent;
      if (moisture >= 68) {
        reasonsNotNow.push(
          `Soil moisture in ${currentField.name} is already optimal (${moisture}%). Adding water now risks root asphyxiation & nutrient leaching.`
        );
      }
      if (rainProb >= 45) {
        reasonsNotNow.push(
          `${rainProb}% rainfall probability within the next 6 hours will naturally replenish soil moisture — save pump electricity & canal water.`
        );
      }
      if (temperature >= 33) {
        reasonsNotNow.push(
          `Midday heat (${temperature}°C) causes up to 28% surface evaporation loss during open-channel irrigation.`
        );
      }

      if (reasonsNotNow.length === 0 && moisture < 62) {
        return {
          verdict: 'GO' as const,
          headline: 'GO AHEAD — Irrigate Now',
          recommendedWindow: 'Today 5:30 AM – 8:30 AM or 5:00 PM – 7:00 PM',
          reminderDateLabel: 'Today • 5:00 PM',
          confidence: 96,
          reasonsNotNow: [],
          benefitsText: `Moisture is at ${moisture}%. Timely irrigation prevents tillering/flowering stress.`,
          savedText: 'Optimal root-zone uptake (~94% efficiency)'
        };
      }

      return {
        verdict: moisture >= 70 || rainProb >= 55 ? ('AVOID' as const) : ('WAIT' as const),
        headline:
          moisture >= 70 || rainProb >= 55
            ? 'SKIP IRRIGATION TODAY'
            : 'WAIT — Irrigate During Cooler Evening Window',
        recommendedWindow:
          moisture >= 70
            ? 'In 2 Days • 6:00 AM – 8:00 AM (Re-check moisture)'
            : 'Today 5:15 PM – 7:15 PM',
        reminderDateLabel: moisture >= 70 ? 'In 48 Hours • 6:00 AM' : 'Today • 5:15 PM',
        confidence: 94,
        reasonsNotNow,
        benefitsText: `Holding irrigation until ${moisture >= 70 ? 'moisture drops below 60%' : 'evening cooling'} protects root aeration.`,
        savedText: `Saves ~${Math.round(currentField.areaAcres * 4200)} Liters water & pump power`
      };
    }

    // Spraying Rules (Fungicide / Insecticide / Foliar / Herbicide)
    if (rainProb >= 35) {
      reasonsNotNow.push(
        `${rainProb}% rain forecast in the next ${selectedActionMeta.rainfastHrs} hours will wash off ${selectedActionMeta.label} before absorption (wasting ~₹${costAtRisk.toLocaleString('en-IN')}).`
      );
    }
    if (windSpeed > 15) {
      reasonsNotNow.push(
        `Wind velocity (${windSpeed} km/h) exceeds the 15 km/h safe spray threshold, causing up to 35% off-target chemical drift.`
      );
    } else if (windSpeed > 10) {
      reasonsNotNow.push(
        `Moderate breeze (${windSpeed} km/h) reduces fine droplet settling on leaf undersides; calmer evening air (<8 km/h) is safer.`
      );
    }
    if (temperature >= 33) {
      reasonsNotNow.push(
        `High temperature (${temperature}°C) causes rapid droplet evaporation and risks leaf-tip phytotoxicity scorch.`
      );
    }
    if (humidity < 45) {
      reasonsNotNow.push(
        `Low relative humidity (${humidity}%) dries spray droplets before stomata can absorb the active ingredient.`
      );
    }

    if (reasonsNotNow.length === 0) {
      return {
        verdict: 'GO' as const,
        headline: 'GO NOW — Ideal Spray Conditions',
        recommendedWindow: 'Right Now (Next 2.5 Hours)',
        reminderDateLabel: 'Today • Immediate Window',
        confidence: 97,
        reasonsNotNow: [],
        benefitsText: `Calm wind (${windSpeed} km/h), low rain risk (${rainProb}%), and ideal leaf absorption humidity (${humidity}%).`,
        savedText: `95%+ active ingredient retention • Zero chemical waste`
      };
    }

    const isSevereBlock = rainProb >= 55 || windSpeed >= 18;
    const windowStr = isSevereBlock
      ? 'Tomorrow 6:00 AM – 8:30 AM'
      : 'Today 4:30 PM – 6:15 PM';

    return {
      verdict: isSevereBlock ? ('AVOID' as const) : ('WAIT' as const),
      headline: isSevereBlock
        ? 'DO NOT SPRAY NOW — High Wash-Off / Drift Risk'
        : 'WAIT — Spray During Calm Evening Window',
      recommendedWindow: windowStr,
      reminderDateLabel: isSevereBlock ? 'Tomorrow • 6:00 AM' : 'Today • 4:30 PM',
      confidence: 95,
      reasonsNotNow,
      benefitsText: `Waiting for ${windowStr} ensures a full ${selectedActionMeta.rainfastHrs}-hour rainfast window and calm <7 km/h wind.`,
      savedText: `Protects ~₹${costAtRisk.toLocaleString('en-IN')} in input & labor cost`
    };
  }, [actionType, windSpeed, rainProb, temperature, humidity, currentField, selectedActionMeta]);

  // 24-Hour Hourly Forecast Window Breakdown
  const hourlySlots: HourlySlot[] = useMemo(() => {
    const baseRain = rainProb;
    const baseWind = windSpeed;
    const baseTemp = temperature;
    return [
      {
        time: '6:00 AM',
        temp: Math.max(22, baseTemp - 6),
        windKmh: Math.max(4, baseWind - 6),
        rainProb: Math.max(10, Math.round(baseRain * 0.35)),
        humidity: Math.min(92, humidity + 8),
        status: baseRain > 70 ? 'caution' : 'optimal',
        note: 'Calm air, dew settling'
      },
      {
        time: '10:00 AM',
        temp: baseTemp - 1,
        windKmh: baseWind,
        rainProb: Math.round(baseRain * 0.7),
        humidity,
        status: baseWind > 14 || baseRain >= 40 ? 'caution' : 'optimal',
        note: 'Rising thermal breeze'
      },
      {
        time: '1:00 PM',
        temp: baseTemp + 2,
        windKmh: baseWind + 4,
        rainProb: baseRain,
        humidity: Math.max(45, humidity - 12),
        status: 'avoid',
        note: 'Peak heat / convective rain risk'
      },
      {
        time: '4:30 PM',
        temp: Math.max(25, baseTemp - 3),
        windKmh: Math.max(5, baseWind - 5),
        rainProb: Math.max(10, Math.round(baseRain * 0.3)),
        humidity: Math.min(86, humidity + 4),
        status: baseRain >= 65 ? 'caution' : 'optimal',
        note: 'Best Evening Spray Window'
      },
      {
        time: '7:00 PM',
        temp: Math.max(24, baseTemp - 5),
        windKmh: Math.max(4, baseWind - 7),
        rainProb: Math.max(12, Math.round(baseRain * 0.4)),
        humidity: Math.min(90, humidity + 8),
        status: 'caution',
        note: 'Low visibility after dusk'
      },
      {
        time: '6:00 AM (Tmrw)',
        temp: Math.max(22, baseTemp - 6),
        windKmh: 5,
        rainProb: 12,
        humidity: 80,
        status: 'optimal',
        note: 'Fresh morning clear window'
      }
    ];
  }, [rainProb, windSpeed, temperature, humidity]);

  // Add Spray Window directly to Farmer Reminders (Navbar Bell + Dashboard Alerts)
  const handleScheduleSprayReminder = () => {
    const title =
      actionType === 'irrigation'
        ? `Irrigation Window: ${decision.recommendedWindow}`
        : `Spray Window (${selectedActionMeta.label}): ${decision.recommendedWindow}`;

    const message = `${currentField.name} (${currentField.currentCrop}) — ${decision.benefitsText} ${decision.savedText}.`;

    addNotification({
      fieldId: currentField.id,
      fieldName: currentField.name,
      type: actionType === 'irrigation' ? 'irrigation' : 'disease',
      title,
      message,
      date: decision.reminderDateLabel,
      priority: 'high',
      targetTab: 'spray-advisor',
      status: 'active'
    });

    setJustScheduledMsg(`✓ Scheduled in Farm Reminders: "${title}"`);
    setTimeout(() => setJustScheduledMsg(null), 5000);
  };

  const sprayReminders = notifications.filter(
    (n) =>
      n.status === 'active' &&
      (n.targetTab === 'spray-advisor' ||
        n.title.toLowerCase().includes('spray') ||
        n.title.toLowerCase().includes('irrigation'))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04180c] via-[#051d0e] to-[#031008] text-gray-100 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Toast Confirmation */}
        {justScheduledMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-300/50 flex items-center gap-2.5 text-xs font-bold animate-fadeIn">
            <BellRing className="w-4 h-4 animate-bounce" />
            <span>{justScheduledMsg}</span>
          </div>
        )}

        {/* 1. HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/25 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Spray & Irrigation Timing Copilot</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Should I Spray or Irrigate Today?
            </h1>
            <p className="text-sm text-emerald-100/80 mt-1 max-w-2xl">
              Real-time AI decision engine analyzing wind drift, rain wash-off risk, temperature evaporation, and soil moisture—automatically syncing optimal spray windows to your Farm Reminders.
            </p>
          </div>

          <button
            onClick={handleScheduleSprayReminder}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/70 flex items-center gap-2 cursor-pointer transition self-start md:self-auto"
          >
            <BellPlus className="w-4 h-4" />
            <span>Add Window to Reminders</span>
          </button>
        </div>

        {/* 2. FIELD SELECTOR STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {fields.map((f) => {
            const isSelected = f.id === currentField.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFieldId(f.id)}
                className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-900/50 border-emerald-400 shadow-lg ring-1 ring-emerald-400/40'
                    : 'bg-[#062112]/80 border-emerald-900/60 hover:border-emerald-500/40'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <img
                    src={getFieldCropImage(f.currentCrop)}
                    alt={f.currentCrop}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-white truncate">{f.name}</div>
                  <div className="text-[11px] text-emerald-300 font-semibold truncate">{f.currentCrop}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    Moisture: <strong className="text-sky-300">{f.soilMoisturePercent}%</strong> • {f.areaAcres} Ac
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. MAIN DECISION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT CONTROLS: Action + Weather Telemetry Sliders */}
          <div className="lg:col-span-5 bg-[#062112]/85 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div>
              <h3 className="text-xs font-black text-emerald-300 uppercase tracking-wider mb-3">
                1. Select Planned Farm Operation
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {actionOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActionType(opt.id)}
                    className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                      actionType === opt.id
                        ? 'bg-emerald-600/25 border-emerald-400 text-white'
                        : 'bg-black/30 border-white/10 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{opt.label}</div>
                      <div className="text-[10px] text-emerald-300/80">{opt.sub}</div>
                    </div>
                    {actionType === opt.id && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                  2. Local Micro-Climate Conditions
                </h3>
                <span className="text-[10px] text-gray-400">Live + Adjustable</span>
              </div>

              {/* Rain Probability */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-sky-300 font-bold">
                    <CloudRain className="w-3.5 h-3.5" /> Rain Risk (Next 4h)
                  </span>
                  <span className="font-mono font-black text-white">{rainProb}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rainProb}
                  onChange={(e) => setRainProb(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              {/* Wind Speed */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-teal-300 font-bold">
                    <Wind className="w-3.5 h-3.5" /> Wind Speed
                  </span>
                  <span className="font-mono font-black text-white">{windSpeed} km/h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="28"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer"
                />
              </div>

              {/* Temperature */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <Thermometer className="w-3.5 h-3.5" /> Air Temperature
                  </span>
                  <span className="font-mono font-black text-white">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="44"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Humidity */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
                    <Droplets className="w-3.5 h-3.5" /> Relative Humidity
                  </span>
                  <span className="font-mono font-black text-white">{humidity}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="96"
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* RIGHT OUTPUT: AI Verdict, WHY NOT NOW, WHEN TO SPRAY, Hourly Timeline & Reminders */}
          <div className="lg:col-span-7 space-y-6">
            {/* AI Verdict Hero Card */}
            <div
              className={`rounded-3xl p-6 sm:p-7 border shadow-2xl space-y-5 ${
                decision.verdict === 'GO'
                  ? 'bg-gradient-to-br from-emerald-950/90 to-[#062a16] border-emerald-400/60'
                  : decision.verdict === 'WAIT'
                  ? 'bg-gradient-to-br from-amber-950/70 to-[#1f1605] border-amber-400/60'
                  : 'bg-gradient-to-br from-rose-950/80 to-[#24080e] border-rose-400/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                      decision.verdict === 'GO'
                        ? 'bg-emerald-500 text-black'
                        : decision.verdict === 'WAIT'
                        ? 'bg-amber-400 text-black'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {decision.verdict === 'GO' ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : decision.verdict === 'WAIT' ? (
                      <Clock className="w-8 h-8" />
                    ) : (
                      <XCircle className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/75 block">
                      AI Verdict • {currentField.name} ({currentField.currentCrop})
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {decision.headline}
                    </h2>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-black/40 border border-white/15 text-xs font-mono font-bold text-white self-start sm:self-auto">
                  {decision.confidence}% Confidence
                </div>
              </div>

              {/* WHEN TO SPRAY / IRRIGATE BOX */}
              <div className="bg-black/40 border border-white/15 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Recommended Optimal Window
                  </span>
                  <div className="text-lg font-black text-white">{decision.recommendedWindow}</div>
                  <p className="text-xs text-gray-300">{decision.benefitsText}</p>
                </div>

                <button
                  onClick={handleScheduleSprayReminder}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer transition"
                >
                  <BellPlus className="w-4 h-4" />
                  <span>Schedule in Reminders</span>
                </button>
              </div>

              {/* WHY NOT NOW (Blocking Reasons) */}
              {decision.reasonsNotNow.length > 0 && (
                <div className="bg-black/35 border border-white/10 rounded-2xl p-4 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Why Not Now? (AI Weather & Soil Diagnostics)</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-200">
                    {decision.reasonsNotNow.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{decision.savedText}</span>
              </div>
            </div>

            {/* 24-HOUR HOURLY SPRAY TIMING STRIP */}
            <div className="bg-[#062112]/85 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>24-Hour Spray & Irrigation Windows</span>
                </h3>
                <div className="flex items-center gap-3 text-[10px] font-bold">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Optimal
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Caution
                  </span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400" /> Avoid
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {hourlySlots.map((slot) => (
                  <div
                    key={slot.time}
                    className={`p-3 rounded-2xl border text-center space-y-1.5 ${
                      slot.status === 'optimal'
                        ? 'bg-emerald-500/15 border-emerald-400/40'
                        : slot.status === 'caution'
                        ? 'bg-amber-500/10 border-amber-400/30'
                        : 'bg-rose-500/10 border-rose-400/30'
                    }`}
                  >
                    <div className="text-[11px] font-black text-white">{slot.time}</div>
                    <div className="text-[10px] text-gray-300">
                      {slot.temp}°C • {slot.windKmh} km/h
                    </div>
                    <div className="text-[10px] text-sky-300 font-semibold">
                      Rain: {slot.rainProb}%
                    </div>
                    <div
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block ${
                        slot.status === 'optimal'
                          ? 'bg-emerald-500 text-black'
                          : slot.status === 'caution'
                          ? 'bg-amber-400 text-black'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      {slot.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVE SPRAY & IRRIGATION REMINDERS LOG */}
            <div className="bg-[#062112]/85 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-emerald-400" />
                  <span>Scheduled Spray & Irrigation Reminders ({sprayReminders.length})</span>
                </h3>
                <span className="text-[10px] text-emerald-300 font-mono">
                  Synced with Top Notification Bell
                </span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {sprayReminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="p-3 rounded-2xl bg-black/35 border border-emerald-900/60 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{rem.title}</div>
                      <div className="text-[11px] text-gray-300 mt-0.5">{rem.message}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold shrink-0">
                      {rem.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
