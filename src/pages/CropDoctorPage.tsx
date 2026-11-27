import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useFarmer } from '../context/FarmerContext';
import { DiseaseDetectionResult, StageNutrientSchedule } from '../types';
import {
  cropDiseasesDatabase,
  diagnoseCropCondition,
  DiseaseRecord
} from '../data/cropDoctorData';
import {
  Camera,
  Upload,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  Sparkles,
  Layers,
  Sprout,
  Droplets,
  Calendar,
  Clock,
  ArrowRight,
  Info,
  Phone,
  FileText,
  Volume2,
  Check,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function CropDoctorPage() {
  const { fields, selectedFieldId, setSelectedFieldId, setRecentDiagnosis, addNotification } = useFarmer();

  const currentField = fields.find((f) => f.id === selectedFieldId) || fields[0];

  // Tab: 'disease-doctor' | 'fertilizer-advisor'
  const [activeTab, setActiveTab] = useState<'disease-doctor' | 'fertilizer-advisor'>('disease-doctor');

  // Disease detection state
  const [selectedImage, setSelectedImage] = useState<string>('/crops/paddy.jpg');
  const [symptomDescription, setSymptomDescription] = useState<string>(
    'Spindle-shaped brownish elliptical spots on leaves with ash-grey center.'
  );
  const [selectedPresetId, setSelectedPresetId] = useState<string>('paddy_blast');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<DiseaseRecord>(cropDiseasesDatabase[0]);

  // Toast confirmation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sample Presets covering all major crops
  const samplePresets = [
    {
      id: 'paddy_blast',
      label: 'Paddy Blast (குலை நோய்)',
      crop: 'Paddy',
      imageUrl: '/crops/paddy.jpg',
      description: 'Spindle-shaped brown lesions on leaves with grey center and neck rot.'
    },
    {
      id: 'groundnut_tikka',
      label: 'Groundnut Tikka (டிக்கா புள்ளி)',
      crop: 'Groundnut',
      imageUrl: '/crops/groundnut.jpg',
      description: 'Circular dark reddish-brown spots with prominent yellow halos causing defoliation.'
    },
    {
      id: 'banana_sigatoka',
      label: 'Banana Sigatoka (சிகடோகா)',
      crop: 'Banana',
      imageUrl: '/crops/banana.jpg',
      description: 'Linear spindle streaks parallel to leaf veins with necrotic centers.'
    },
    {
      id: 'banana_borer',
      label: 'Banana Stem Weevil (தண்டு வண்டு)',
      crop: 'Banana',
      imageUrl: '/crops/banana.jpg',
      description: 'Pinhead holes on pseudostem with transparent jelly exudation and stem hollow.'
    },
    {
      id: 'sugarcane_red_rot',
      label: 'Sugarcane Red Rot (செவ்வழுகல்)',
      crop: 'Sugarcane',
      imageUrl: '/crops/sugarcane.jpg',
      description: 'Yellowing top leaves; split stalk shows bright red pith with white cross-bands.'
    },
    {
      id: 'cotton_bollworm',
      label: 'Cotton Pink Bollworm (காய்ப்புழு)',
      crop: 'Cotton',
      imageUrl: '/crops/cotton.jpg',
      description: 'Rosette flowers and entry holes into young bolls damaging lint.'
    },
    {
      id: 'paddy_bph',
      label: 'Paddy BPH (புகையான்)',
      crop: 'Paddy',
      imageUrl: '/crops/paddy.jpg',
      description: 'Circular hopper-burn patches with hoppers swarming at stem base.'
    },
    {
      id: 'paddy_blb',
      label: 'Paddy BLB (பாக்டீரியா கருகல்)',
      crop: 'Paddy',
      imageUrl: '/paddy-golden-panicle.jpg',
      description: 'Yellow wavy water-soaked streaks along leaf margins drying inward.'
    },
    {
      id: 'paddy_brown_spot',
      label: 'Paddy Brown Spot (புள்ளி நோய்)',
      crop: 'Paddy',
      imageUrl: '/paddy-macro.jpg',
      description: 'Numerous oval dark-brown sesame-like spots with yellow halos.'
    },
    {
      id: 'tomato_early_blight',
      label: 'Tomato Blight (இலைக்கருகல்)',
      crop: 'Tomato',
      imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop&q=80',
      description: 'Target board concentric rings on leaves and dark sunken fruit rot.'
    }
  ];

  // Synchronize when field changes
  useEffect(() => {
    if (currentField) {
      const crop = currentField.currentCrop.toLowerCase();
      let matchedPreset = samplePresets[0];

      if (crop.includes('groundnut') || crop.includes('peanut')) {
        matchedPreset = samplePresets.find(p => p.id === 'groundnut_tikka') || samplePresets[1];
      } else if (crop.includes('banana')) {
        matchedPreset = samplePresets.find(p => p.id === 'banana_sigatoka') || samplePresets[2];
      } else if (crop.includes('sugar') || crop.includes('cane')) {
        matchedPreset = samplePresets.find(p => p.id === 'sugarcane_red_rot') || samplePresets[4];
      } else if (crop.includes('cotton')) {
        matchedPreset = samplePresets.find(p => p.id === 'cotton_bollworm') || samplePresets[5];
      }

      setSelectedPresetId(matchedPreset.id);
      setSelectedImage(matchedPreset.imageUrl);
      setSymptomDescription(matchedPreset.description);
      const initialDiag = cropDiseasesDatabase.find(d => d.id === matchedPreset.id) || cropDiseasesDatabase[0];
      setDiagnosis(initialDiag);
    }
  }, [currentField?.id]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analyze uploaded leaf photo RGB/pixel signature via offscreen canvas
  const extractImageStats = (dataUrl: string): Promise<{
    yellowRatio: number;
    brownRatio: number;
    darkSpotRatio: number;
    whiteRatio: number;
    greenRatio: number;
  } | undefined> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 96;
          canvas.height = 96;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(undefined);
          ctx.drawImage(img, 0, 0, 96, 96);
          const pixels = ctx.getImageData(0, 0, 96, 96).data;
          let yellow = 0, brown = 0, dark = 0, white = 0, green = 0;
          const total = pixels.length / 4;
          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
            if (r > 200 && g > 200 && b > 195) white++;
            else if (r < 65 && g < 65 && b < 65) dark++;
            else if (r > 155 && g > 135 && b < 95 && r - b > 60) yellow++;
            else if (r > 100 && g > 55 && g < 130 && b < 75 && r > g) brown++;
            else if (g > r && g > b) green++;
          }
          resolve({
            yellowRatio: yellow / total,
            brownRatio: brown / total,
            darkSpotRatio: dark / total,
            whiteRatio: white / total,
            greenRatio: green / total
          });
        } catch {
          resolve(undefined);
        }
      };
      img.onerror = () => resolve(undefined);
      img.src = dataUrl;
    });
  };

  // Handle Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPresetId('');
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        setSelectedImage(dataUrl);
        const stats = await extractImageStats(dataUrl);
        runInference(undefined, currentField.currentCrop, `${file.name} ${symptomDescription}`, stats);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run AI Inference Simulation with Exact Matching (no stale preset override)
  const runInference = (
    presetId?: string,
    customCrop?: string,
    customSymptom?: string,
    imageStats?: {
      yellowRatio: number;
      brownRatio: number;
      darkSpotRatio: number;
      whiteRatio: number;
      greenRatio: number;
    }
  ) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const diagRecord = diagnoseCropCondition({
        presetId,
        crop: customCrop || currentField.currentCrop,
        symptomText: customSymptom || symptomDescription,
        imageStats
      });

      setDiagnosis(diagRecord);
      setRecentDiagnosis(diagRecord);
      setIsAnalyzing(false);

      addNotification({
        fieldId: currentField.id,
        fieldName: currentField.name,
        type: 'disease',
        title: `Pathology Alert: ${diagRecord.diseaseName}`,
        message: `Identified ${diagRecord.diseaseName} on ${currentField.name}. Treatment with ${diagRecord.verifiedMedicines[0]?.name || 'recommended medicine'} prescribed.`,
        date: 'Just now',
        priority: 'high',
        targetTab: 'crop-doctor',
        status: 'active'
      });

      setToastMessage(`✓ Diagnosis Complete: ${diagRecord.diseaseName}`);
      setTimeout(() => setToastMessage(null), 3500);
    }, 850);
  };

  // Dynamic Crop Fertilizer Schedule tailored per standing crop
  const nutrientSchedule: StageNutrientSchedule[] = useMemo(() => {
    const crop = (currentField.currentCrop || '').toLowerCase();

    // 1. GROUNDNUT FERTILIZER SCHEDULE
    if (crop.includes('groundnut') || crop.includes('peanut')) {
      return [
        {
          stageName: '1. Basal Application (At Sowing)',
          timingDays: 'Day 1 to 3',
          nutrientRequirement: 'All Phosphorus (P) + 50% Nitrogen (N) + 50% Potassium (K) + Borax',
          recommendedFertilizers: [
            {
              fertilizerName: 'Single Super Phosphate (SSP 16% P2O5)',
              quantityKgPerAcre: 100,
              applicationMethod: 'Broadcast and plow into furrows before sowing',
              precautions: 'Supplies essential sulphur and calcium for groundnut pegs'
            },
            {
              fertilizerName: 'Urea (46% N) + MOP (60% K2O)',
              quantityKgPerAcre: 20,
              applicationMethod: 'Basal band placement along seed line',
              precautions: 'Do not place in direct physical contact with inoculated seeds'
            },
            {
              fertilizerName: 'Agricultural Borax',
              quantityKgPerAcre: 4,
              applicationMethod: 'Soil application at sowing',
              precautions: 'Prevents hollow-heart defect in groundnut kernels'
            }
          ]
        },
        {
          stageName: '2. Pegging & Pod Formation Booster',
          timingDays: 'Day 40 to 45 DAS (Critical Stage)',
          nutrientRequirement: 'High Calcium and Sulphur for effortless subterranean peg penetration',
          recommendedFertilizers: [
            {
              fertilizerName: 'Agricultural Gypsum (CaSO4.2H2O)',
              quantityKgPerAcre: 160,
              applicationMethod: 'Broadcast around plant base followed by gentle earthing up and light hoeing',
              precautions: 'Essential for shell hardening and bold kernel oil filling; do not skip'
            }
          ]
        },
        {
          stageName: '3. Pod Filling Foliar Nourishment',
          timingDays: 'Day 60 to 70 DAS',
          nutrientRequirement: 'Foliar micronutrients and nitrogen for bold seed size',
          recommendedFertilizers: [
            {
              fertilizerName: 'DAP 1% + Urea 0.5% Foliar Solution',
              quantityKgPerAcre: 2,
              applicationMethod: 'Dissolve 2 kg DAP overnight, filter supernatant, add 1 kg Urea, spray in 200L water',
              precautions: 'Spray in late afternoon to maximize leaf absorption'
            }
          ]
        }
      ];
    }

    // 2. BANANA FERTILIZER SCHEDULE
    if (crop.includes('banana')) {
      return [
        {
          stageName: '1. Pit Basal Organic Dressing',
          timingDays: 'At Planting',
          nutrientRequirement: 'Heavy organic matter + root bio-stimulants + starter phosphorus',
          recommendedFertilizers: [
            {
              fertilizerName: 'Farm Yard Manure (FYM) + Neem Cake',
              quantityKgPerAcre: 1000,
              applicationMethod: '10 kg composted FYM + 250g Neem cake per planting pit',
              precautions: 'Prevents root nematodes and provides steady organic humus'
            },
            {
              fertilizerName: 'Single Super Phosphate (SSP)',
              quantityKgPerAcre: 80,
              applicationMethod: '200g per pit incorporated in lower soil layer',
              precautions: 'Stimulates vigorous primary taproot and sword root anchoring'
            }
          ]
        },
        {
          stageName: '2. Vegetative Canopy Fertigation',
          timingDays: 'Month 2 to Month 6 (Weekly Splits)',
          nutrientRequirement: 'High Nitrogen (N) for rapid leaf emergence (1 leaf every 6 days)',
          recommendedFertilizers: [
            {
              fertilizerName: 'Neem Coated Urea via Drip Fertigation',
              quantityKgPerAcre: 35,
              applicationMethod: 'Deliver in 15 weekly splits through venturi injector',
              precautions: 'Flush drip lines with plain water for 15 minutes after fertigation'
            },
            {
              fertilizerName: 'Water Soluble 19:19:19 NPK',
              quantityKgPerAcre: 25,
              applicationMethod: 'Drip fertigation every 10 days',
              precautions: 'Maintains balanced pseudostem thickness and dark green leaf canopy'
            }
          ]
        },
        {
          stageName: '3. Shooting & Bunch Development Booster',
          timingDays: 'Month 7 to Month 10',
          nutrientRequirement: 'Massive Potassium (K) + Boron for fruit elongation and Brix accumulation',
          recommendedFertilizers: [
            {
              fertilizerName: 'Muriate of Potash (MOP 0:0:60) or SOP',
              quantityKgPerAcre: 60,
              applicationMethod: '300g per plant delivered in 10 weekly doses after flower emergence',
              precautions: 'Increases bunch finger length, weight, and shelf life by 35%'
            },
            {
              fertilizerName: 'Foliar Borax 0.2% + SOP 1%',
              quantityKgPerAcre: 2,
              applicationMethod: 'Direct spray on tender bunch fingers after denavelling',
              precautions: 'Prevents finger tip blackening and promotes uniform finger size'
            }
          ]
        }
      ];
    }

    // 3. SUGARCANE FERTILIZER SCHEDULE
    if (crop.includes('sugar') || crop.includes('cane')) {
      return [
        {
          stageName: '1. Furrow Basal Application',
          timingDays: 'At Planting',
          nutrientRequirement: '100% Phosphorus + 25% Nitrogen + Zinc Sulphate',
          recommendedFertilizers: [
            {
              fertilizerName: 'DAP (Di-Ammonium Phosphate 18:46:0)',
              quantityKgPerAcre: 65,
              applicationMethod: 'Band placement in furrows before sett placement',
              precautions: 'Incorporate into soil; avoid direct eye-bud contact'
            },
            {
              fertilizerName: 'Zinc Sulphate (ZnSO4 21%)',
              quantityKgPerAcre: 15,
              applicationMethod: 'Basal furrow application',
              precautions: 'Crucial for internode cell elongation and enzymatic photosynthesis'
            }
          ]
        },
        {
          stageName: '2. Tillering Stage Top-Dressing',
          timingDays: 'Day 45 (1st Earthing Up)',
          nutrientRequirement: '50% Nitrogen + 50% Potassium for clump tillering',
          recommendedFertilizers: [
            {
              fertilizerName: 'Neem Coated Urea (46% N)',
              quantityKgPerAcre: 45,
              applicationMethod: 'Side band dressing along cane rows followed by partial earthing up',
              precautions: 'Irrigate immediately after application'
            },
            {
              fertilizerName: 'MOP (Muriate of Potash 0:0:60)',
              quantityKgPerAcre: 25,
              applicationMethod: 'Side band placement along rows',
              precautions: 'Enhances cane stalk strength to prevent lodging'
            }
          ]
        },
        {
          stageName: '3. Grand Growth Final Top-Dressing',
          timingDays: 'Day 90 (Final Earthing Up)',
          nutrientRequirement: 'Final 25% Nitrogen + 50% Potassium completed before 100 days',
          recommendedFertilizers: [
            {
              fertilizerName: 'Neem Coated Urea + MOP',
              quantityKgPerAcre: 45,
              applicationMethod: 'Apply in deep furrows followed by heavy earthing up',
              precautions: 'No nitrogen application after 100 days to avoid late tillers and low sucrose'
            }
          ]
        }
      ];
    }

    // DEFAULT: PADDY FERTILIZER SCHEDULE
    return [
      {
        stageName: '1. Basal Application (At Sowing / Puddling)',
        timingDays: 'Day 1 to 5',
        nutrientRequirement: 'All Phosphorus (P) + 25% Nitrogen (N) + 25% Potassium (K) + Zinc Sulphate',
        recommendedFertilizers: [
          {
            fertilizerName: 'DAP (Di-Ammonium Phosphate 18:46:0)',
            quantityKgPerAcre: 50,
            applicationMethod: 'Broadcast and incorporate into soil during final puddling',
            precautions: 'Do not mix directly with zinc sulphate; apply zinc 3 days later'
          },
          {
            fertilizerName: 'MOP (Muriate of Potash 0:0:60)',
            quantityKgPerAcre: 15,
            applicationMethod: 'Basal soil incorporation',
            precautions: 'Ensure adequate soil moisture to prevent root burn'
          },
          {
            fertilizerName: 'Zinc Sulphate (ZnSO4 21%)',
            quantityKgPerAcre: 10,
            applicationMethod: 'Broadcast on surface before planting',
            precautions: 'Prevents Khaira deficiency leaf rust'
          }
        ]
      },
      {
        stageName: '2. Active Tillering Top Dressing',
        timingDays: 'Day 20 to 25 DAS',
        nutrientRequirement: '50% Nitrogen (N) for vigorous tiller emergence',
        recommendedFertilizers: [
          {
            fertilizerName: 'Neem Coated Urea (46% N)',
            quantityKgPerAcre: 35,
            applicationMethod: 'Top dress into standing water with conoweeding incorporation',
            precautions: 'Apply in morning hours when leaves are dry to avoid leaf scorching'
          }
        ]
      },
      {
        stageName: '3. Panicle Initiation Booster',
        timingDays: 'Day 45 to 50 DAS',
        nutrientRequirement: '25% Nitrogen (N) + 50% Potassium (K) for panicle primordium',
        recommendedFertilizers: [
          {
            fertilizerName: 'Neem Coated Urea (46% N)',
            quantityKgPerAcre: 25,
            applicationMethod: 'Top dressing into 2-3 cm standing water',
            precautions: 'Do not apply if active blast spots are visible on leaves'
          },
          {
            fertilizerName: 'MOP (Muriate of Potash)',
            quantityKgPerAcre: 20,
            applicationMethod: 'Top dressing',
            precautions: 'Strengthens stem walls and prevents crop lodging during monsoon winds'
          }
        ]
      },
      {
        stageName: '4. Flowering & Grain Set Foliar Spray',
        timingDays: 'Day 75 to 80 DAS',
        nutrientRequirement: 'Foliar micronutrients and potassium for complete grain filling',
        recommendedFertilizers: [
          {
            fertilizerName: '13:0:45 Potassium Nitrate (KNO3) + 0.2% Borax',
            quantityKgPerAcre: 2,
            applicationMethod: 'Dissolve in 200 Litres water and spray evenly on flag leaves',
            precautions: 'Spray between 3:00 PM and 5:00 PM; avoid intense hot mid-day sun'
          }
        ]
      }
    ];
  }, [currentField?.currentCrop]);

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
              3
            </span>
            <span>Module 3 • AI Crop Doctor & Exact Medicine Recommendation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            AI Crop Doctor & Clinical Medicine Advisor
          </h1>
          <p className="text-sm text-emerald-300/80 mt-1 max-w-2xl">
            Accurate computer-vision plant pathology, verified ICAR/TNAU certified chemical & organic medicines, precise dosages, and tailored field fertilizer schedules.
          </p>
        </div>

        {/* View Switcher: Crop Doctor vs Fertilizer Schedule */}
        <div className="flex items-center gap-2 bg-[#05160c] p-1.5 rounded-2xl border border-emerald-900/80 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('disease-doctor')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'disease-doctor'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Disease Doctor & Store</span>
          </button>

          <button
            onClick={() => setActiveTab('fertilizer-advisor')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'fertilizer-advisor'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Field Fertilizer Schedule</span>
          </button>
        </div>
      </div>

      {/* 2. FIELD CONTEXT BAR */}
      <div className="bg-[#05170d] border border-emerald-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-400 uppercase tracking-wider font-mono">Target Field:</span>
          <select
            value={selectedFieldId}
            onChange={(e) => setSelectedFieldId(e.target.value)}
            className="bg-[#030e07] border border-emerald-700 rounded-xl px-3 py-1.5 text-white font-bold text-xs"
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                Field #{f.fieldNumber}: {f.name} ({f.currentCrop} • {f.soilType})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-gray-300">
          <span>Standing Crop: <strong className="text-emerald-300">{currentField.currentCrop}</strong> ({currentField.cropVariety})</span>
          <span>Soil: <strong>{currentField.soilType} (pH {currentField.soilPh})</strong></span>
          <span>Stage: <strong className="text-emerald-400">{currentField.growthStage}</strong></span>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: AI CROP DOCTOR & DIRECT PURCHASING
          ========================================================================= */}
      {activeTab === 'disease-doctor' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Upload & Diagnostic Trigger Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Image Upload & Preset Selector (5 cols) */}
            <div className="lg:col-span-5 bg-[#06160c] border border-emerald-900/60 rounded-3xl p-6 shadow-xl space-y-5">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>Inspect Leaf / Crop Damage</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Select a test case or upload an authentic photograph of diseased leaves/stems.
                </p>
              </div>

              {/* Upload Dropzone / Preview */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative h-56 w-full rounded-2xl overflow-hidden border-2 border-dashed border-emerald-700/60 hover:border-emerald-400/80 bg-black/40 cursor-pointer flex flex-col items-center justify-center p-3 transition group"
              >
                <img
                  src={selectedImage}
                  alt="Crop Disease Leaf"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/crops/paddy.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold gap-2">
                  <Camera className="w-4 h-4" />
                  <span>Click to Change / Upload Photo</span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Farmer Symptom Description Input */}
              <div className="space-y-1">
                <label className="block text-gray-300 text-xs font-semibold">
                  Symptom Notes & Visual Clues:
                </label>
                <textarea
                  rows={2}
                  value={symptomDescription}
                  onChange={(e) => setSymptomDescription(e.target.value)}
                  placeholder="Describe lesions, discoloration, pest presence, or fungal spots..."
                  className="w-full bg-[#030e07] border border-emerald-800 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Instant Test Presets for All Crops */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block font-mono">
                  Verified Disease Pathology Presets (Click to Test):
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {samplePresets.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setSelectedPresetId(preset.id);
                          setSelectedImage(preset.imageUrl);
                          setSymptomDescription(preset.description);
                          runInference(preset.id, preset.crop, preset.description);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                            : 'bg-white/5 hover:bg-emerald-500/20 border-white/5 text-gray-300'
                        }`}
                      >
                        <span className="font-bold block text-[11px] line-clamp-1">{preset.label}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                          {preset.crop}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Trigger Button */}
              <button
                onClick={() => runInference()}
                disabled={isAnalyzing}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing Cellular Pathology...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Run AI Clinical Diagnosis</span>
                  </>
                )}
              </button>
            </div>

            {/* Right: Diagnosis Dossier & Verified Medicine Store (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {diagnosis && (
                <div className="bg-[#06160c] border border-emerald-800/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
                  {/* Diagnosis Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-emerald-900/60 pb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
                          {diagnosis.severity} Severity
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                          {diagnosis.confidence}% Confidence
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-white mt-1.5">{diagnosis.diseaseName}</h3>
                      <p className="text-xs text-emerald-300 font-mono">{diagnosis.scientificName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Crop Affected: <strong className="text-white">{diagnosis.cropAffected}</strong></p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Detected Symptoms & Environmental Causes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#030e07] border border-emerald-950 p-4 rounded-2xl space-y-2">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Detected Clinical Symptoms
                      </span>
                      <ul className="space-y-1.5 text-gray-300">
                        {diagnosis.detectedSymptoms.map((sym, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400">•</span>
                            <span>{sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#030e07] border border-emerald-950 p-4 rounded-2xl space-y-2">
                      <span className="text-[10px] font-bold text-amber-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Environmental Triggers
                      </span>
                      <ul className="space-y-1.5 text-gray-300">
                        {diagnosis.possibleCauses.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-400">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Certified Treatment Protocol: Chemical vs Organic */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono">
                      Recommended Clinical Prescriptions:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Chemical Treatment */}
                      <div className="bg-[#081a0e] border border-emerald-800/60 p-4 rounded-2xl space-y-2">
                        <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Exact Chemical Fungicide / Insecticide:</span>
                        </span>
                        <ul className="space-y-1.5 text-xs text-gray-200">
                          {diagnosis.recommendedTreatments.chemical.map((chem, i) => (
                            <li key={i} className="flex items-start gap-1.5 bg-black/40 p-2 rounded-xl border border-white/5">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>{chem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Organic Bio-Control Treatment */}
                      <div className="bg-[#081a0e] border border-emerald-800/60 p-4 rounded-2xl space-y-2">
                        <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                          <Sprout className="w-4 h-4 text-emerald-400" />
                          <span>Organic & Biological Control:</span>
                        </span>
                        <ul className="space-y-1.5 text-xs text-gray-200">
                          {diagnosis.recommendedTreatments.organic.map((org, i) => (
                            <li key={i} className="flex items-start gap-1.5 bg-black/40 p-2 rounded-xl border border-white/5">
                              <span className="text-emerald-400 font-bold">🌿</span>
                              <span>{org}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Certified Medicine Store & Direct Purchase Links */}
                  <div className="space-y-3 pt-2 border-t border-emerald-900/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <ShoppingBag className="w-4 h-4 text-emerald-400" />
                        <span>Exact Prescribed Medicines & Certified Store Links:</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        ICAR / CIB&RC Approved
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {diagnosis.verifiedMedicines.map((med, idx) => (
                        <div
                          key={idx}
                          className="bg-[#030e07] border border-emerald-800/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-md"
                        >
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                              Active: {med.activeIngredient}
                            </span>
                            <h5 className="text-sm font-black text-white">{med.name}</h5>
                            <div className="bg-[#06160c] p-2.5 rounded-xl border border-emerald-950 text-xs">
                              <span className="text-gray-400 block text-[10px] uppercase font-bold">Exact Dosage:</span>
                              <strong className="text-emerald-300">{med.dosage}</strong>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-tight">
                              <strong>Safety:</strong> {med.safetyPrecautions}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                            <span className="text-[10px] text-gray-400 font-bold">Direct Buy:</span>
                            <div className="flex items-center gap-1.5">
                              {med.buyLinks.map((link, lIdx) => (
                                <a
                                  key={lIdx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white text-[11px] font-bold transition flex items-center gap-1"
                                >
                                  <span>{link.platform}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expert Advice Note */}
                  {diagnosis.expertAdvice && (
                    <div className="bg-[#041208] border border-emerald-900 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-200">
                      <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{diagnosis.expertAdvice}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: FIELD-SPECIFIC FERTILIZER SCHEDULE
          ========================================================================= */}
      {activeTab === 'fertilizer-advisor' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#05180d] border border-emerald-800/80 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-5">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  Agronomic STCR Schedule For {currentField.name}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Fertilizer Management for {currentField.currentCrop}
                </h3>
                <p className="text-xs text-emerald-300/80 mt-1">
                  Customized for <strong>{currentField.soilType}</strong> (pH {currentField.soilPh}) with NPK {currentField.nitrogenKgHa}:{currentField.phosphorusKgHa}:{currentField.potassiumKgHa} kg/ha.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
                  {nutrientSchedule.length} Growth Splits
                </span>
              </div>
            </div>

            {/* Stage Nutrient Cards */}
            <div className="space-y-5">
              {nutrientSchedule.map((sched, idx) => (
                <div
                  key={idx}
                  className="bg-[#030e07] border border-emerald-900/70 rounded-2xl p-5 space-y-4 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                        {sched.timingDays}
                      </span>
                      <h4 className="text-base font-black text-white mt-0.5">{sched.stageName}</h4>
                    </div>
                    <div className="text-xs text-gray-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                      <strong>Target: </strong>{sched.nutrientRequirement}
                    </div>
                  </div>

                  {/* Fertilizers List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    {sched.recommendedFertilizers.map((fert, fIdx) => (
                      <div
                        key={fIdx}
                        className="bg-[#06160c] border border-emerald-950 rounded-xl p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-bold text-white text-sm">{fert.fertilizerName}</h5>
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold whitespace-nowrap">
                            {fert.quantityKgPerAcre} kg / acre
                          </span>
                        </div>

                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">
                            Application Method
                          </span>
                          <p className="text-gray-200 text-[11px]">{fert.applicationMethod}</p>
                        </div>

                        <div className="pt-1">
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">
                            Precautions
                          </span>
                          <p className="text-amber-200/90 text-[11px]">{fert.precautions}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
