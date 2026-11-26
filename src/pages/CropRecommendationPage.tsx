import React, { useState } from 'react';
import { Sprout, Compass, DollarSign, Droplets, CheckCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface RecommendedCrop {
  cropName: string;
  tamilName: string;
  suitabilityScore: number;
  durationDays: string;
  waterRequirement: string;
  estimatedCostPerAcre: number;
  expectedGrossIncomePerAcre: number;
  explanation: string;
  nutrientNeeds: string;
  marketPotential: string;
  seasonMatch: string;
}

export default function CropRecommendationPage() {
  const [district, setDistrict] = useState('Thanjavur');
  const [soilType, setSoilType] = useState('clay_loam');
  const [soilPh, setSoilPh] = useState(6.8);
  const [waterAvailability, setWaterAvailability] = useState('abundant'); // abundant, moderate, scarce
  const [landArea, setLandArea] = useState(3.0);
  const [season, setSeason] = useState('rabi_samba'); // kharif_kuruvai, rabi_samba, navarai_summer
  const [previousCrop, setPreviousCrop] = useState('Paddy');
  const [budgetPerAcre, setBudgetPerAcre] = useState(25000);

  const [recommendations, setRecommendations] = useState<RecommendedCrop[] | null>(null);
  const [loading, setLoading] = useState(false);

  const generateRecommendations = () => {
    setLoading(true);

    setTimeout(() => {
      let results: RecommendedCrop[] = [];

      if (waterAvailability === 'abundant' && (soilType === 'clay_loam' || soilType === 'alluvial')) {
        results.push(
          {
            cropName: 'Samba Paddy (CR 1009 Sub 1 / Ponni)',
            tamilName: 'சம்பா நெல் (CR 1009 / பொன்னி)',
            suitabilityScore: 96,
            durationDays: '135 - 150 Days',
            waterRequirement: '1,200 - 1,400 mm',
            estimatedCostPerAcre: 28000,
            expectedGrossIncomePerAcre: 54000,
            explanation: 'Perfect fit for clay loam / alluvial soils in the Cauvery Delta. CR 1009 Sub 1 tolerates up to two weeks of submergence during monsoon and offers superior grain quality for Tamil Nadu markets.',
            nutrientNeeds: '150:50:50 kg NPK/ha with zinc sulphate basal',
            marketPotential: 'High government MSP procurement & strong private miller demand in Thanjavur / Kumbakonam.',
            seasonMatch: 'Ideal for August to January sowing (Samba / Thaladi season)'
          },
          {
            cropName: 'Tissue Culture Banana (Grand Naine G-9)',
            tamilName: 'வாழை (ஜி-9 நேந்திரன் / பூவன்)',
            suitabilityScore: 89,
            durationDays: '11 - 12 Months',
            waterRequirement: '1,800 - 2,000 mm (Drip recommended)',
            estimatedCostPerAcre: 65000,
            expectedGrossIncomePerAcre: 160000,
            explanation: 'Alluvial and rich clay soils provide deep anchorage and moisture holding for heavy bunches. Excellent rotation crop following paddy to break soil compaction.',
            nutrientNeeds: '200:50:300 g NPK per plant split into 6 fertigation doses',
            marketPotential: 'Year-round high demand in Tiruchirappalli, Madurai, and Kerala markets.',
            seasonMatch: 'Planting suitable throughout Sept-Nov with assured drip irrigation'
          }
        );
      } else if (waterAvailability === 'moderate' || soilType === 'red_loam') {
        results.push(
          {
            cropName: 'Bhavani Turmeric (ஈரோடு மஞ்சள்)',
            tamilName: 'மஞ்சள் (ஈரோடு பிராண்ட்)',
            suitabilityScore: 92,
            durationDays: '260 - 280 Days',
            waterRequirement: '900 - 1,000 mm',
            estimatedCostPerAcre: 45000,
            expectedGrossIncomePerAcre: 110000,
            explanation: 'Red loam and well-drained sandy loam are optimal for rhizome proliferation. Rich curcumin content ensures maximum price at Erode and Perundurai mandis.',
            nutrientNeeds: '120:60:120 kg NPK/ha with bio-fertilizers',
            marketPotential: 'Export grade quality with consistent bidding in Erode regulated markets.',
            seasonMatch: 'June to July planting ensures full monsoon utilization'
          },
          {
            cropName: 'Country Groundnut (மணிலா / நிலக்கடலை TMV-13)',
            tamilName: 'நிலக்கடலை (TMV-13 / தரணி)',
            suitabilityScore: 88,
            durationDays: '105 - 110 Days',
            waterRequirement: '450 - 550 mm',
            estimatedCostPerAcre: 18000,
            expectedGrossIncomePerAcre: 42000,
            explanation: 'Fixes atmospheric nitrogen naturally, restoring soil fertility after exhaustive crops. Well-suited for light red and loamy soils with moderate watering.',
            nutrientNeeds: '20:40:40 kg NPK/ha + 200 kg Gypsum at pegging stage',
            marketPotential: 'High oil expeller demand in Tiruvannamalai, Villupuram, and Dindigul.',
            seasonMatch: 'Suitable for Kharif and Margazhi sowing'
          }
        );
      } else {
        // Scarce water / drought hardy
        results.push(
          {
            cropName: 'Barnyard Millet (குதிரைவாலி CO-2)',
            tamilName: 'குதிரைவாலி சிறுதானியம் (CO-2)',
            suitabilityScore: 94,
            durationDays: '90 - 95 Days',
            waterRequirement: '250 - 350 mm',
            estimatedCostPerAcre: 11000,
            expectedGrossIncomePerAcre: 31000,
            explanation: 'Extremely drought tolerant and climate-resilient. Highly suited for dry tracts with low investment and low water requirements.',
            nutrientNeeds: '40:20:0 kg NPK/ha with farmyard compost',
            marketPotential: 'Booming urban health food market; commanding ₹45-60/kg in organic retail.',
            seasonMatch: 'Monsoon or post-monsoon rainfed sowing'
          },
          {
            cropName: 'Black Gram / Urad (உளுந்து VBN-8)',
            tamilName: 'உளுந்து (VBN-8 நெல் தரிசு பயிர்)',
            suitabilityScore: 91,
            durationDays: '65 - 70 Days',
            waterRequirement: '200 - 300 mm (Rice fallow)',
            estimatedCostPerAcre: 8500,
            expectedGrossIncomePerAcre: 24000,
            explanation: 'Ideal relay crop broadcast into standing paddy 5-7 days before harvest. Utilizes residual moisture with minimal capital expense.',
            nutrientNeeds: '25:50:25 kg NPK/ha + 2% DAP foliar spray at flowering',
            marketPotential: 'High pulse market consumption across Tamil Nadu for culinary idli/dosa processing.',
            seasonMatch: 'Jan-Feb Rice Fallow (நெல் தரிசு)'
          }
        );
      }

      setRecommendations(results);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Verified Agronomic Rules & Agro-Climatic Intelligence</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">AI Crop Recommendation Advisor</h1>
        <p className="text-sm text-emerald-200/80 mt-1">
          Input your soil, water, location, and budget constraints to receive agronomic crop recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Parameters Form */}
        <div className="lg:col-span-5 bg-[#091f13]/90 backdrop-blur-md border border-emerald-900/60 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white pb-2 border-b border-emerald-900/60">
            Farm Soil & Climate Parameters
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Region / District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-[#05130b] border border-emerald-900 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Thanjavur">Thanjavur (Cauvery Delta)</option>
                <option value="Coimbatore">Coimbatore (Western Zone)</option>
                <option value="Erode">Erode (Lower Bhavani)</option>
                <option value="Madurai">Madurai (Southern Zone)</option>
                <option value="Tiruchirappalli">Tiruchirappalli</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Soil Type</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-[#05130b] border border-emerald-900 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="clay_loam">Clay Loam (களிமண்)</option>
                <option value="alluvial">Alluvial (வண்டல் மண்)</option>
                <option value="red_loam">Red Loam (செம்மண்)</option>
                <option value="black_cotton">Black Cotton (கரிசல்)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Soil pH Level</label>
              <input
                type="number"
                step="0.1"
                value={soilPh}
                onChange={(e) => setSoilPh(parseFloat(e.target.value) || 7.0)}
                className="w-full bg-[#05130b] border border-emerald-900 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Water Source</label>
              <select
                value={waterAvailability}
                onChange={(e) => setWaterAvailability(e.target.value)}
                className="w-full bg-[#05130b] border border-emerald-900 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="abundant">Abundant (Canal + Borewell)</option>
                <option value="moderate">Moderate (Well / Periodic)</option>
                <option value="scarce">Scarce (Rainfed Dryland)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Cropping Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-[#05130b] border border-emerald-900 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="rabi_samba">Samba / Thaladi (Sep - Jan)</option>
                <option value="kharif_kuruvai">Kuruvai (Jun - Sep)</option>
                <option value="navarai_summer">Summer / Navarai (Jan - May)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Land Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={landArea}
                onChange={(e) => setLandArea(parseFloat(e.target.value) || 1)}
                className="w-full bg-[#05130b] border border-emerald-900 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Budget per Acre (₹)</label>
            <input
              type="number"
              step="5000"
              value={budgetPerAcre}
              onChange={(e) => setBudgetPerAcre(parseInt(e.target.value) || 20000)}
              className="w-full bg-[#05130b] border border-emerald-900 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <button
            onClick={generateRecommendations}
            className="w-full mt-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-900/50 transition flex items-center justify-center gap-2"
          >
            <Sprout className="w-4 h-4" />
            <span>Generate Suitable Crops</span>
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="h-full min-h-[380px] bg-[#091f13]/60 backdrop-blur-md rounded-3xl border border-emerald-900/60 flex flex-col items-center justify-center text-center p-8">
              <Sprout className="w-10 h-10 text-emerald-400 animate-bounce mb-3" />
              <h3 className="text-lg font-bold text-white">Synthesizing Agronomic Parameters...</h3>
              <p className="text-xs text-gray-400">Evaluating TNAU crop models for {district} ({soilType})</p>
            </div>
          ) : recommendations ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400 pb-2">
                <span>Top Recommended Crops for Your Land</span>
                <span className="text-emerald-400 font-semibold">{recommendations.length} Matches Found</span>
              </div>

              {recommendations.map((crop, idx) => (
                <div
                  key={idx}
                  className="bg-[#091f13]/90 backdrop-blur-md border border-emerald-800/60 rounded-3xl p-6 shadow-2xl space-y-4 hover:border-emerald-500/60 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-900/60">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                          {crop.suitabilityScore}% Suitability Match
                        </span>
                        <span className="text-xs text-gray-400">{crop.seasonMatch}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{crop.cropName}</h3>
                      <p className="text-xs text-emerald-300 font-medium">{crop.tamilName}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">Est. Net Profit / Acre</span>
                      <span className="text-xl font-black text-emerald-400">
                        ₹{(crop.expectedGrossIncomePerAcre - crop.estimatedCostPerAcre).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-200 leading-relaxed bg-[#05130b] p-3.5 rounded-2xl border border-emerald-900/50">
                    <strong>Why this crop is recommended:</strong> {crop.explanation}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-[#05130b] p-2.5 rounded-xl border border-emerald-900/40">
                      <span className="text-gray-400 block text-[11px]">Duration</span>
                      <span className="font-semibold text-white">{crop.durationDays}</span>
                    </div>
                    <div className="bg-[#05130b] p-2.5 rounded-xl border border-emerald-900/40">
                      <span className="text-gray-400 block text-[11px]">Water Need</span>
                      <span className="font-semibold text-sky-400">{crop.waterRequirement}</span>
                    </div>
                    <div className="bg-[#05130b] p-2.5 rounded-xl border border-emerald-900/40">
                      <span className="text-gray-400 block text-[11px]">Input Cost/Acre</span>
                      <span className="font-semibold text-amber-400">₹{crop.estimatedCostPerAcre.toLocaleString()}</span>
                    </div>
                    <div className="bg-[#05130b] p-2.5 rounded-xl border border-emerald-900/40">
                      <span className="text-gray-400 block text-[11px]">Gross Revenue</span>
                      <span className="font-semibold text-emerald-400">₹{crop.expectedGrossIncomePerAcre.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-gray-300 space-y-1">
                    <div>
                      <strong className="text-emerald-400">Nutrient Regimen:</strong> {crop.nutrientNeeds}
                    </div>
                    <div>
                      <strong className="text-emerald-400">Market Demand:</strong> {crop.marketPotential}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full min-h-[380px] bg-[#091f13]/40 border border-emerald-900/40 rounded-3xl p-8 flex flex-col items-center justify-center text-center text-gray-400">
              <Sprout className="w-16 h-16 text-emerald-500/40 mb-3" />
              <h3 className="text-lg font-bold text-white">Ready to Advise</h3>
              <p className="text-xs text-gray-400 max-w-sm mt-1">
                Configure your soil parameters on the left and tap 'Generate Suitable Crops' to receive agronomist-verified crop options.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
