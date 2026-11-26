import React, { useState, useMemo } from 'react';
import { useFarmer } from '../context/FarmerContext';
import { FieldProfitLossCalculation } from '../types';
import {
  Coins,
  TrendingUp,
  Scale,
  PieChart,
  Layers,
  Sprout,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  HelpCircle,
  RefreshCw,
  Edit2,
  ShieldAlert,
  BarChart3,
  Sparkles,
  Percent
} from 'lucide-react';

export default function ProfitCalculatorPage() {
  const { profile, fields, selectedFieldId, setSelectedFieldId, fieldProfits, updateFieldProfit, recentDiagnosis } = useFarmer();

  const currentField = fields.find((f) => f.id === selectedFieldId) || fields[0];

  // Active Field's P&L calculation
  const activeProfit = useMemo(() => {
    return (
      fieldProfits.find((p) => p.fieldId === currentField.id) || {
        fieldId: currentField.id,
        fieldName: currentField.name,
        areaAcres: currentField.areaAcres,
        cropName: currentField.currentCrop,
        variety: currentField.cropVariety,
        seedCost: 2800,
        landPreparationCost: 5500,
        fertilizerCost: 6400,
        pesticideCost: 3200,
        irrigationCost: 2400,
        labourCost: 11000,
        machineryCost: 4500,
        harvestingCost: 6000,
        transportationCost: 2000,
        otherExpenses: 1500,
        totalCultivationCost: 45300,
        expectedYieldQuintals: 48,
        sellingPricePerQuintal: 2300,
        expectedRevenue: 110400,
        estimatedNetProfit: 65100,
        profitPerAcre: 32550
      }
    );
  }, [fieldProfits, currentField]);

  // Form Inputs State (allows farmer to edit values)
  const [seedCost, setSeedCost] = useState(activeProfit.seedCost);
  const [landPrepCost, setLandPrepCost] = useState(activeProfit.landPreparationCost);
  const [fertCost, setFertCost] = useState(activeProfit.fertilizerCost);
  const [pestCost, setPestCost] = useState(activeProfit.pesticideCost);
  const [irrigCost, setIrrigCost] = useState(activeProfit.irrigationCost);
  const [labourCost, setLabourCost] = useState(activeProfit.labourCost);
  const [machCost, setMachCost] = useState(activeProfit.machineryCost);
  const [harvestCost, setHarvestCost] = useState(activeProfit.harvestingCost);
  const [transpCost, setTranspCost] = useState(activeProfit.transportationCost);
  const [otherCost, setOtherCost] = useState(activeProfit.otherExpenses);

  const [expectedYield, setExpectedYield] = useState(activeProfit.expectedYieldQuintals);
  const [actualYield, setActualYield] = useState<number | undefined>(activeProfit.actualYieldQuintals);
  const [sellingPrice, setSellingPrice] = useState(activeProfit.sellingPricePerQuintal);

  // Disease Impact toggle
  const [includeDiseaseImpact, setIncludeDiseaseImpact] = useState(true);

  // Update local inputs when active field changes
  React.useEffect(() => {
    setSeedCost(activeProfit.seedCost);
    setLandPrepCost(activeProfit.landPreparationCost);
    setFertCost(activeProfit.fertilizerCost);
    setPestCost(activeProfit.pesticideCost);
    setIrrigCost(activeProfit.irrigationCost);
    setLabourCost(activeProfit.labourCost);
    setMachCost(activeProfit.machineryCost);
    setHarvestCost(activeProfit.harvestingCost);
    setTranspCost(activeProfit.transportationCost);
    setOtherCost(activeProfit.otherExpenses);
    setExpectedYield(activeProfit.expectedYieldQuintals);
    setActualYield(activeProfit.actualYieldQuintals);
    setSellingPrice(activeProfit.sellingPricePerQuintal);
  }, [activeProfit]);

  // Dynamic calculations
  const totalExpenses =
    seedCost +
    landPrepCost +
    fertCost +
    pestCost +
    irrigCost +
    labourCost +
    machCost +
    harvestCost +
    transpCost +
    otherCost;

  const yieldToUse = actualYield !== undefined && actualYield > 0 ? actualYield : expectedYield;
  const grossRevenue = yieldToUse * sellingPrice;
  const netProfit = grossRevenue - totalExpenses;
  const profitPerAcre = currentField.areaAcres > 0 ? Math.round(netProfit / currentField.areaAcres) : 0;
  const roiPercent = totalExpenses > 0 ? Math.round((netProfit / totalExpenses) * 100) : 0;

  // Disease Financial Impact Simulation (Connected with Crop Doctor)
  const diseaseImpact = useMemo(() => {
    if (!recentDiagnosis || !includeDiseaseImpact) return null;
    const isFieldAffected = currentField.currentCrop.toLowerCase().includes('paddy');
    if (!isFieldAffected) return null;

    const yieldReductionPercent = 14; // Estimated 14% yield loss without full containment
    const lostYieldQuintals = Math.round(expectedYield * (yieldReductionPercent / 100));
    const revenueLoss = lostYieldQuintals * sellingPrice;
    const additionalMedicineCost = 950; // Tricyclazole 250g + labor spray

    const revisedRevenue = grossRevenue - revenueLoss;
    const revisedExpenses = totalExpenses + additionalMedicineCost;
    const revisedNetProfit = revisedRevenue - revisedExpenses;

    return {
      diseaseName: recentDiagnosis.diseaseName,
      affectedAcreage: 0.6,
      yieldReductionPercent,
      revenueLoss,
      additionalMedicineCost,
      revisedNetProfit,
      revisedProfitPerAcre: Math.round(revisedNetProfit / currentField.areaAcres)
    };
  }, [recentDiagnosis, includeDiseaseImpact, currentField, expectedYield, sellingPrice, grossRevenue, totalExpenses]);

  // Save changes to context
  const handleSaveCalculation = () => {
    const updated: FieldProfitLossCalculation = {
      ...activeProfit,
      seedCost,
      landPreparationCost: landPrepCost,
      fertilizerCost: fertCost,
      pesticideCost: pestCost,
      irrigationCost: irrigCost,
      labourCost,
      machineryCost: machCost,
      harvestingCost: harvestCost,
      transportationCost: transpCost,
      otherExpenses: otherCost,
      totalCultivationCost: totalExpenses,
      expectedYieldQuintals: expectedYield,
      actualYieldQuintals: actualYield,
      sellingPricePerQuintal: sellingPrice,
      expectedRevenue: grossRevenue,
      estimatedNetProfit: netProfit,
      profitPerAcre
    };
    updateFieldProfit(updated);
    alert(`Financial calculation saved for ${currentField.name}!`);
  };

  // Farm-wide Total Aggregations
  const farmTotalExpenses = fieldProfits.reduce((sum, p) => sum + p.totalCultivationCost, 0);
  const farmTotalRevenue = fieldProfits.reduce((sum, p) => sum + p.expectedRevenue, 0);
  const farmTotalProfit = farmTotalRevenue - farmTotalExpenses;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/50 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-2">
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center font-mono text-[10px]">
              6
            </span>
            <span>Module 6 • AI-Based Farm Profit & Loss Calculation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Farm Profit & Loss Economics
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-1 max-w-2xl">
            Field-by-field cost of cultivation breakdown, market MSP revenues, disease risk adjustments, and profitability comparisons across all your plots.
          </p>
        </div>

        <button
          onClick={handleSaveCalculation}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-950/80 self-start md:self-auto"
        >
          <Coins className="w-4 h-4" />
          <span>Save Field Financials</span>
        </button>
      </div>

      {/* 2. FIELD SELECTOR CAROUSEL */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          Select Field to Calculate P&L ({fields.length} Active Fields)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {fields.map((f) => {
            const isSelected = selectedFieldId === f.id;
            const p = fieldProfits.find((calc) => calc.fieldId === f.id);
            return (
              <div
                key={f.id}
                onClick={() => setSelectedFieldId(f.id)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 text-left ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#0c2e1b] to-[#04140b] border-emerald-400 shadow-xl ring-2 ring-emerald-500/20'
                    : 'bg-[#06160c] border-emerald-900/60 hover:border-emerald-500/40 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-emerald-400 font-bold">Field #{f.fieldNumber}</span>
                  <span className="text-[10px] text-gray-400">{f.areaAcres} Acres</span>
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{f.name}</h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px]">
                  <span className="text-gray-400">{f.currentCrop}</span>
                  <span className="font-bold text-emerald-400">
                    +₹{(p ? p.estimatedNetProfit : 50000).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. KEY FINANCIAL METRICS BENTO FOR SELECTED FIELD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Cost */}
        <div className="bg-[#06180e] border border-emerald-900/60 rounded-3xl p-5 shadow-xl space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Total Cultivation Expenses
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            ₹{totalExpenses.toLocaleString()}
          </div>
          <span className="text-[11px] text-gray-400 block">
            ₹{Math.round(totalExpenses / currentField.areaAcres).toLocaleString()} per acre
          </span>
        </div>

        {/* Gross Revenue */}
        <div className="bg-[#06180e] border border-emerald-900/60 rounded-3xl p-5 shadow-xl space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Projected Gross Revenue
          </span>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">
            ₹{grossRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-gray-400 block">
            {yieldToUse} Quintals @ ₹{sellingPrice}/q
          </span>
        </div>

        {/* Estimated Net Profit */}
        <div className="bg-[#06180e] border border-emerald-900/60 rounded-3xl p-5 shadow-xl space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Estimated Net Profit
          </span>
          <div className={`text-2xl sm:text-3xl font-black ${netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {netProfit >= 0 ? '+' : ''}₹{netProfit.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-300 font-bold block">
            ₹{profitPerAcre.toLocaleString()} per acre
          </span>
        </div>

        {/* ROI % */}
        <div className="bg-[#06180e] border border-emerald-900/60 rounded-3xl p-5 shadow-xl space-y-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Return on Investment (ROI)
          </span>
          <div className="text-2xl sm:text-3xl font-black text-lime-400">
            {roiPercent}%
          </div>
          <span className="text-[11px] text-gray-400 block">
            Healthy Delta Agronomic Margin
          </span>
        </div>
      </div>

      {/* 4. DISEASE-RELATED FINANCIAL IMPACT (Connected to Crop Doctor) */}
      {diseaseImpact && (
        <div className="bg-gradient-to-br from-[#201004] to-[#0d0702] border border-amber-600/50 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Crop Doctor Pathology Financial Linkage
                </span>
                <h3 className="text-lg font-black text-white">
                  Estimated Financial Impact: {diseaseImpact.diseaseName}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIncludeDiseaseImpact(!includeDiseaseImpact)}
              className="text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-700/60 px-3 py-1.5 rounded-xl hover:bg-amber-900 transition self-start sm:self-auto"
            >
              {includeDiseaseImpact ? 'Ignore Disease Impact' : 'Apply Disease Impact'}
            </button>
          </div>

          <p className="text-xs text-amber-100/90 leading-relaxed">
            Crop Doctor identified <strong>{diseaseImpact.diseaseName}</strong> on {currentField.name}. Without timely containment, potential yield reduction is estimated at <strong>{diseaseImpact.yieldReductionPercent}%</strong> on affected patches ({diseaseImpact.affectedAcreage} acres).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
              <span className="text-gray-400 block text-[10px]">Predicted Yield Loss</span>
              <strong className="text-amber-300 text-sm">~{Math.round(expectedYield * 0.14)} Quintals</strong>
            </div>

            <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
              <span className="text-gray-400 block text-[10px]">Gross Revenue Impact</span>
              <strong className="text-red-400 text-sm">-₹{diseaseImpact.revenueLoss.toLocaleString()}</strong>
            </div>

            <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
              <span className="text-gray-400 block text-[10px]">Treatment Cost (Fungicide)</span>
              <strong className="text-amber-300 text-sm">+₹{diseaseImpact.additionalMedicineCost}</strong>
            </div>

            <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
              <span className="text-gray-400 block text-[10px]">Revised Projected Profit</span>
              <strong className="text-emerald-400 text-sm">₹{diseaseImpact.revisedNetProfit.toLocaleString()}</strong>
            </div>
          </div>

          <div className="text-[11px] text-amber-300/80 italic">
            * Note: Predicted disease impact is an agronomic risk forecast to assist budgeting. Prompt biocontrol spraying (Pseudomonas/Tricyclazole) preserves maximum potential yield.
          </div>
        </div>
      )}

      {/* 5. ITEMIZED COST OF CULTIVATION (Farmer Editable Form) */}
      <div className="bg-[#06160c] border border-emerald-900/60 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
          <div>
            <h3 className="text-xl font-black text-white">
              Itemized Cost of Cultivation Inputs ({currentField.name})
            </h3>
            <p className="text-xs text-gray-400">
              Modify values to reflect your actual spending on seeds, labor, fertilizer, and machinery.
            </p>
          </div>

          <button
            onClick={handleSaveCalculation}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
          >
            Update Calculations
          </button>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Seed Cost (₹)</label>
            <input
              type="number"
              value={seedCost}
              onChange={(e) => setSeedCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Land Preparation (₹)</label>
            <input
              type="number"
              value={landPrepCost}
              onChange={(e) => setLandPrepCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Fertilizer Cost (₹)</label>
            <input
              type="number"
              value={fertCost}
              onChange={(e) => setFertCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Pesticide / Spray (₹)</label>
            <input
              type="number"
              value={pestCost}
              onChange={(e) => setPestCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Irrigation / Diesel (₹)</label>
            <input
              type="number"
              value={irrigCost}
              onChange={(e) => setIrrigCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Labour Wages (₹)</label>
            <input
              type="number"
              value={labourCost}
              onChange={(e) => setLabourCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Machinery / Tractor (₹)</label>
            <input
              type="number"
              value={machCost}
              onChange={(e) => setMachCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Harvesting Cost (₹)</label>
            <input
              type="number"
              value={harvestCost}
              onChange={(e) => setHarvestCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Transport to Mandi (₹)</label>
            <input
              type="number"
              value={transpCost}
              onChange={(e) => setTranspCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Other Overheads (₹)</label>
            <input
              type="number"
              value={otherCost}
              onChange={(e) => setOtherCost(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>
        </div>

        {/* Yield & Price Inputs */}
        <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Expected Yield (Quintals)</label>
            <input
              type="number"
              value={expectedYield}
              onChange={(e) => setExpectedYield(parseFloat(e.target.value) || 1)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Actual Harvested Yield (Optional)</label>
            <input
              type="number"
              value={actualYield || ''}
              placeholder="Enter post-harvest yield"
              onChange={(e) => setActualYield(e.target.value ? parseFloat(e.target.value) : undefined)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Selling Price / MSP (₹ per Quintal)</label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 1)}
              className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white"
            />
          </div>
        </div>
      </div>

      {/* 6. COMPARISON BETWEEN ALL 4 FIELDS (Visual Table & Breakdown) */}
      <div className="bg-[#06160c] border border-emerald-900/60 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
        <div>
          <h3 className="text-xl font-black text-white">
            Whole-Farm Financial Comparison ({profile.totalLandAreaAcres} Acres Across 4 Fields)
          </h3>
          <p className="text-xs text-gray-400">
            Compare cost efficiency, revenue generation, and net profit per acre between your different crops.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-900/80 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Field</th>
                <th className="py-3 px-3">Crop & Area</th>
                <th className="py-3 px-3">Cultivation Cost</th>
                <th className="py-3 px-3">Yield</th>
                <th className="py-3 px-3">Gross Revenue</th>
                <th className="py-3 px-3">Net Profit</th>
                <th className="py-3 px-3">Profit / Acre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {fieldProfits.map((fp) => (
                <tr key={fp.fieldId} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-3 font-bold text-white">{fp.fieldName}</td>
                  <td className="py-3.5 px-3">
                    <span className="text-emerald-400 font-bold">{fp.cropName}</span>
                    <span className="text-gray-400 block text-[10px]">{fp.areaAcres} Acres</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono">₹{fp.totalCultivationCost.toLocaleString()}</td>
                  <td className="py-3.5 px-3 font-mono">{fp.expectedYieldQuintals} q</td>
                  <td className="py-3.5 px-3 font-mono text-cyan-300">₹{fp.expectedRevenue.toLocaleString()}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-emerald-400">
                    +₹{fp.estimatedNetProfit.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-white">
                    ₹{fp.profitPerAcre.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-emerald-500/40 font-bold text-white text-xs bg-emerald-950/20">
                <td className="py-3.5 px-3">Farm Total</td>
                <td className="py-3.5 px-3">{profile.totalLandAreaAcres} Acres (4 Fields)</td>
                <td className="py-3.5 px-3 font-mono text-amber-300">₹{farmTotalExpenses.toLocaleString()}</td>
                <td className="py-3.5 px-3">—</td>
                <td className="py-3.5 px-3 font-mono text-cyan-300">₹{farmTotalRevenue.toLocaleString()}</td>
                <td className="py-3.5 px-3 font-mono text-emerald-400 text-sm">
                  +₹{farmTotalProfit.toLocaleString()}
                </td>
                <td className="py-3.5 px-3 font-mono text-white">
                  ₹{Math.round(farmTotalProfit / profile.totalLandAreaAcres).toLocaleString()} avg
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
