import React, { useState, useMemo, useEffect } from 'react';
import { governmentSchemesData, Scheme, searchSchemes } from '../data/schemesData';
import {
  Landmark,
  ShieldCheck,
  FileText,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Search,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Info,
  Calendar,
  Wallet,
  CreditCard,
  HeartHandshake,
  Waves,
  Scale,
  Tractor,
  Leaf,
  TestTube,
  Apple,
  Droplets,
  Building2,
  Users,
  Sprout,
  Cpu,
  Hexagon,
  Radio,
  Wheat,
  Trees,
  Droplet,
  Upload,
  Check,
  X,
  Clock,
  Eye,
  Send,
  Download,
  BookmarkCheck,
  Phone
} from 'lucide-react';

interface SavedApplication {
  id: string;
  schemeId: string;
  schemeName: string;
  farmerName: string;
  mobile: string;
  state: string;
  district: string;
  acreage: number;
  ownership: string;
  surveyNo: string;
  appliedDate: string;
  status: 'Draft Prepared' | 'Redirected to Official Portal' | 'Under Local Review';
  officialUrl: string;
}

import { useFarmer } from '../context/FarmerContext';

export default function GovernmentSchemesPage() {
  const { profile, fields } = useFarmer();

  // Category & Query states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [naturalQuery, setNaturalQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'schemes' | 'my-applications'>('schemes');

  // Follow-up AI Filter Questions wired to farmer profile
  const [stateFilter, setStateFilter] = useState<string>(profile.state || 'Tamil Nadu');
  const [cropFilter, setCropFilter] = useState<string>('Paddy / Rice');
  const [acreageFilter, setAcreageFilter] = useState<string>(profile.totalLandAreaAcres.toString() || '7.5');
  const [ownershipFilter, setOwnershipFilter] = useState<string>('Owner Cultivator');
  const [assistanceFilter, setAssistanceFilter] = useState<string>('All');
  const [showFollowUpFilters, setShowFollowUpFilters] = useState<boolean>(false);

  // Modals
  const [detailsModalScheme, setDetailsModalScheme] = useState<Scheme | null>(null);
  const [applyModalScheme, setApplyModalScheme] = useState<Scheme | null>(null);

  // Application Form State wired to farmer profile
  const [applyStep, setApplyStep] = useState<1 | 2 | 3>(1);
  const [applicantName, setApplicantName] = useState<string>(profile.name);
  const [applicantMobile, setApplicantMobile] = useState<string>(profile.phone);
  const [applicantAadhaar, setApplicantAadhaar] = useState<string>(profile.aadhaarMasked);
  const [applicantVillage, setApplicantVillage] = useState<string>(profile.village);
  const [applicantSurvey, setApplicantSurvey] = useState<string>('142/3A');
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: boolean }>({});
  const [submittedApp, setSubmittedApp] = useState<SavedApplication | null>(null);

  // Saved Applications in LocalStorage
  const [savedApplications, setSavedApplications] = useState<SavedApplication[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('agri_vision_saved_applications');
      if (stored) {
        setSavedApplications(JSON.parse(stored));
      }
    } catch {
      // Ignore JSON error
    }
  }, []);

  const saveApplicationLocally = (app: SavedApplication) => {
    const updated = [app, ...savedApplications];
    setSavedApplications(updated);
    try {
      localStorage.setItem('agri_vision_saved_applications', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Icon mapping
  const renderIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Wallet': return <Wallet className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'CreditCard': return <CreditCard className={className} />;
      case 'HeartHandshake': return <HeartHandshake className={className} />;
      case 'Waves': return <Waves className={className} />;
      case 'Scale': return <Scale className={className} />;
      case 'Tractor': return <Tractor className={className} />;
      case 'Leaf': return <Leaf className={className} />;
      case 'TestTube': return <TestTube className={className} />;
      case 'Apple': return <Apple className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Sprout': return <Sprout className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Hexagon': return <Hexagon className={className} />;
      case 'Radio': return <Radio className={className} />;
      case 'Wheat': return <Wheat className={className} />;
      case 'Trees': return <Trees className={className} />;
      case 'Droplet': return <Droplet className={className} />;
      default: return <Landmark className={className} />;
    }
  };

  // Categories list
  const categories = [
    'All',
    'Income Support',
    'Crop Insurance',
    'Credit & Loan',
    'Irrigation',
    'Mechanization',
    'Organic & Natural',
    'Price Support',
    'Horticulture',
    'Infrastructure',
    'Technology',
    'Agro-Allied'
  ];

  // AI Matching Logic
  const aiRecommendedSchemes = useMemo(() => {
    let list = searchSchemes(naturalQuery, selectedCategory);

    // Apply Assistance filter if selected
    if (assistanceFilter !== 'All') {
      list = list.filter((s) => s.category === assistanceFilter);
    }

    // Dynamic scoring based on follow-up questions
    const acres = parseFloat(acreageFilter) || 2;
    const cropLower = cropFilter.toLowerCase();

    // Map each scheme with match rationale
    return list.map((scheme) => {
      let matchReason = 'Matches your farming query and profile.';

      if (naturalQuery) {
        matchReason = `Directly addresses your request regarding "${naturalQuery.slice(0, 45)}...".`;
      } else if (scheme.id === 'pm-kisan') {
        matchReason = `As a cultivator with ${acres} acres in ${stateFilter}, you are eligible for ₹6,000 direct income assistance.`;
      } else if (scheme.id === 'pdmc' || scheme.id === 'pmksy') {
        matchReason = acres <= 5
          ? `Small & Marginal landholder (< 5 acres) in ${stateFilter} qualifies for up to 100% micro-irrigation subsidy.`
          : `Assistance available for high-efficiency drip & sprinkler systems.`;
      } else if (scheme.id === 'pmfby') {
        matchReason = `Protects your ${cropFilter} crop against seasonal climate risks with subsidized premium.`;
      } else if (scheme.id === 'smam') {
        matchReason = `Provides 40%–50% subsidy on tractors and mechanized field implements for your acreage.`;
      } else if (scheme.id === 'soil-health-card') {
        matchReason = `Free laboratory testing of 12 soil parameters for your ${cropFilter} plots in ${stateFilter}.`;
      }

      return {
        ...scheme,
        matchReason
      };
    });
  }, [naturalQuery, selectedCategory, assistanceFilter, acreageFilter, cropFilter, stateFilter]);

  // Handle Quick Chips
  const handleChipClick = (queryText: string) => {
    setNaturalQuery(queryText);
    setShowFollowUpFilters(true);
  };

  // Handle Application Submit
  const handleFinalizeApplication = () => {
    if (!applyModalScheme) return;

    const newApp: SavedApplication = {
      id: `AGRI-GOV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      schemeId: applyModalScheme.id,
      schemeName: applyModalScheme.name,
      farmerName: applicantName,
      mobile: applicantMobile,
      state: stateFilter,
      district: 'Thanjavur',
      acreage: parseFloat(acreageFilter) || 2.5,
      ownership: ownershipFilter,
      surveyNo: applicantSurvey,
      appliedDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      status: 'Redirected to Official Portal',
      officialUrl: applyModalScheme.officialUrl
    };

    saveApplicationLocally(newApp);
    setSubmittedApp(newApp);
    setApplyStep(3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-emerald-900/50 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center font-mono text-[10px]">
              5
            </span>
            <span>Module 5 • Government Agriculture Schemes & Insurance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Government Agriculture Schemes
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-2xl">
            Verified central and state agricultural subsidies, direct income support, crop insurance, and machinery grants with AI eligibility matching.
          </p>
        </div>

        {/* View Switcher: Schemes vs My Saved Applications */}
        <div className="flex items-center gap-2 bg-black/50 border border-emerald-900/60 p-1.5 rounded-2xl self-start md:self-auto">
          <button
            onClick={() => setActiveTab('schemes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'schemes'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>All 20 Schemes</span>
          </button>
          <button
            onClick={() => setActiveTab('my-applications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'my-applications'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>My Applications ({savedApplications.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'schemes' ? (
        <>
          {/* 2. AI Scheme Recommendation Search Box */}
          <div className="relative bg-gradient-to-br from-[#072414] via-[#05170d] to-[#020b06] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-md">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Find the Right Government Scheme for Your Farm
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-300/80">
                    AI-powered natural language scheme recommendations tailored to your land and crops
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowFollowUpFilters(!showFollowUpFilters)}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 self-start sm:self-auto py-1 px-3 rounded-lg bg-emerald-950/60 border border-emerald-800/60"
              >
                <span>{showFollowUpFilters ? 'Hide Profile Questions' : 'Refine Farmer Profile'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Natural Language Input Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                placeholder="Tell us about your farming... e.g. I cultivate paddy on 2 acres in Tamil Nadu."
                className="w-full bg-[#030e07] border border-emerald-500/40 rounded-2xl pl-12 pr-28 py-4 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-inner"
              />
              {naturalQuery && (
                <button
                  onClick={() => setNaturalQuery('')}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-400/30 uppercase">
                AI Match
              </div>
            </div>

            {/* Quick Natural Language Sample Chips */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Quick Farmer Queries (Click to Test):
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'I cultivate paddy on 2 acres in Tamil Nadu',
                  'I grow sugarcane on 3 acres',
                  'I need a drip irrigation subsidy',
                  'I want financial support for my farming',
                  'I need crop insurance against flood',
                  'I want to purchase a tractor',
                  'I am an organic farmer',
                  'I am interested in starting beekeeping',
                  'I want drone services / Namo Drone Didi'
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-gray-300 hover:text-emerald-300 text-xs transition"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Follow-Up Questions (Collapsible) */}
            {showFollowUpFilters && (
              <div className="pt-4 border-t border-emerald-900/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs animate-fadeIn">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">State / District</label>
                  <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="Tamil Nadu">Tamil Nadu (Thanjavur / Coimbatore)</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="All India">Other / All India</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Crop Cultivated</label>
                  <select
                    value={cropFilter}
                    onChange={(e) => setCropFilter(e.target.value)}
                    className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="Paddy / Rice">Paddy / Rice (நெல்)</option>
                    <option value="Sugarcane">Sugarcane (கரும்பு)</option>
                    <option value="Cotton">Cotton (பருத்தி)</option>
                    <option value="Maize">Maize / Corn (மக்காச்சோளம்)</option>
                    <option value="Coconut">Coconut (தென்னை)</option>
                    <option value="Banana">Banana (வாழை)</option>
                    <option value="Groundnut">Groundnut (வேர்க்கடலை)</option>
                    <option value="Millets">Millets (சிறு தானியங்கள்)</option>
                    <option value="Vegetables">Vegetables / Fruits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Total Acreage</label>
                  <select
                    value={acreageFilter}
                    onChange={(e) => setAcreageFilter(e.target.value)}
                    className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="1.5">Marginal Farmer (&lt; 2.5 Acres)</option>
                    <option value="3.5">Small Farmer (2.5 – 5.0 Acres)</option>
                    <option value="8.0">Medium / Large (&gt; 5.0 Acres)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Land Ownership</label>
                  <select
                    value={ownershipFilter}
                    onChange={(e) => setOwnershipFilter(e.target.value)}
                    className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="Owner Cultivator">Landowner Cultivator (Patta Holder)</option>
                    <option value="Tenant / Lessee">Tenant Farmer / Lessee (Adangal/Lease)</option>
                    <option value="FPO / SHG">Farmer Producer Group / Women SHG</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Assistance Needed</label>
                  <select
                    value={assistanceFilter}
                    onChange={(e) => setAssistanceFilter(e.target.value)}
                    className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2 text-white text-xs focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="All">All Types of Schemes</option>
                    <option value="Income Support">Direct Income Support</option>
                    <option value="Irrigation">Drip / Sprinkler Irrigation</option>
                    <option value="Mechanization">Tractor & Farm Machinery</option>
                    <option value="Crop Insurance">Crop Loss Insurance</option>
                    <option value="Organic & Natural">Organic / Natural Farming</option>
                    <option value="Credit & Loan">Subsidized Bank Loans (KCC)</option>
                    <option value="Technology">Drone / AgriStack Technology</option>
                  </select>
                </div>
              </div>
            )}

            {/* Preliminary Guidance Disclaimer */}
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-3 sm:p-4 flex items-start gap-3 text-xs text-emerald-200/90">
              <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white uppercase tracking-wider block mb-0.5">
                  Preliminary Eligibility Guidance
                </span>
                <span>
                  Recommendations provided by AGRI VISION 3D are preliminary guidance derived from verified official scheme criteria. Final sanction and subsidy disbursement are subject to physical document verification and approval by the designated Government Department / Agency.
                </span>
              </div>
            </div>
          </div>

          {/* 3. Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                    : 'bg-[#06180e] text-gray-300 hover:text-white border border-emerald-900/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4. Schemes Grid Header */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>
              Showing <strong className="text-white">{aiRecommendedSchemes.length}</strong> verified Government Schemes
            </span>
            {naturalQuery && (
              <span className="text-emerald-400">
                Sorted by AI relevance to "{naturalQuery}"
              </span>
            )}
          </div>

          {/* 5. 20 Official Schemes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiRecommendedSchemes.map((scheme, index) => (
              <div
                key={scheme.id}
                className="group bg-[#06160c] border border-emerald-900/60 hover:border-emerald-500/60 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/80 relative overflow-hidden"
              >
                {/* Top decorative gradient sheen */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400 opacity-60 group-hover:opacity-100 transition" />

                <div className="space-y-4">
                  {/* Scheme Icon & Badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600/30 to-green-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition">
                      {renderIcon(scheme.icon, 'w-6 h-6')}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                        {scheme.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {scheme.status}
                      </span>
                    </div>
                  </div>

                  {/* Scheme Title & Multilingual Subtitle */}
                  <div>
                    <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      #{index + 1} {scheme.shortName}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition line-clamp-1">
                      {scheme.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                      {scheme.tamilName}
                    </p>
                  </div>

                  {/* AI Recommendation Reason (if natural query or profile active) */}
                  {scheme.matchReason && (
                    <div className="bg-emerald-950/50 border border-emerald-800/50 rounded-xl p-2.5 text-[11px] text-emerald-300/90 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{scheme.matchReason}</span>
                    </div>
                  )}

                  {/* Financial Assistance Verified Badge */}
                  <div className="bg-gradient-to-r from-[#0a2314] to-[#041309] border border-emerald-500/30 rounded-2xl p-3 shadow-sm">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      Financial Assistance & Subsidy
                    </div>
                    <p className="text-xs font-bold text-emerald-300 mt-0.5 line-clamp-2">
                      {scheme.financialBenefit}
                    </p>
                  </div>

                  {/* Purpose */}
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Purpose
                    </h4>
                    <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                      {scheme.purpose}
                    </p>
                  </div>

                  {/* Key Benefits Preview */}
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Key Benefits to Farmers
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-300">
                      {scheme.benefits.slice(0, 2).map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents Tags */}
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Required Documents
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {scheme.requiredDocuments.slice(0, 3).map((doc, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300"
                        >
                          {doc.length > 22 ? doc.slice(0, 20) + '...' : doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions: Apply Now & View Details */}
                <div className="pt-5 mt-5 border-t border-emerald-900/60 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setDetailsModalScheme(scheme)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => {
                      setApplyModalScheme(scheme);
                      setApplyStep(1);
                      setSubmittedApp(null);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* 6. My Saved Applications & Tracking View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">My Saved Applications & Progress Register</h2>
              <p className="text-xs text-gray-400">
                Track applications prepared on AGRI VISION 3D and directly open the official government portals.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('schemes')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <Landmark className="w-4 h-4" />
              <span>Browse More Schemes</span>
            </button>
          </div>

          {savedApplications.length === 0 ? (
            <div className="bg-[#06160c] border border-dashed border-emerald-800/60 rounded-3xl p-12 text-center space-y-4">
              <BookmarkCheck className="w-12 h-12 text-emerald-500/40 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No Applications Saved Yet</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  When you click "Apply Now" on any scheme, our system compiles your application dossier and saves your reference number here for easy tracking.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('schemes')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
              >
                Explore Government Schemes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-[#06160c] border border-emerald-900/60 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                        {app.id}
                      </span>
                      <span className="text-xs text-gray-400">Applied: {app.appliedDate}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{app.schemeName}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300">
                      <span>Applicant: <strong>{app.farmerName}</strong></span>
                      <span>Location: <strong>{app.district}, {app.state}</strong></span>
                      <span>Survey No: <strong>{app.surveyNo}</strong></span>
                      <span>Acreage: <strong>{app.acreage} Acres</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{app.status}</span>
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1">Dossier Saved Locally</p>
                    </div>

                    <a
                      href={app.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
                    >
                      <span>Open Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODAL 1: VIEW DETAILS (Comprehensive Full Scheme Information)
          ========================================================================= */}
      {detailsModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#05140b] border border-emerald-600/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setDetailsModalScheme(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scheme Header */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                {renderIcon(detailsModalScheme.icon, 'w-7 h-7')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300">
                    {detailsModalScheme.category}
                  </span>
                  <span className="text-xs text-gray-400">Status: {detailsModalScheme.status}</span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">
                  {detailsModalScheme.name}
                </h2>
                <p className="text-xs text-emerald-300/80 mt-0.5">
                  {detailsModalScheme.tamilName} • {detailsModalScheme.hindiName}
                </p>
              </div>
            </div>

            {/* Verified Financial Benefit Highlight */}
            <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-4">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Official Financial Assistance & Subsidy
              </div>
              <p className="text-sm font-bold text-emerald-300 mt-1">
                {detailsModalScheme.financialBenefit}
              </p>
            </div>

            {/* Purpose & Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Scheme Purpose & Objective
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                {detailsModalScheme.purpose}
              </p>
            </div>

            {/* Benefits to Farmers */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Full Benefits to Farmers
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                {detailsModalScheme.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-white/5 rounded-xl p-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who Can Apply & Eligibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 bg-black/40 border border-emerald-900/60 rounded-2xl p-4">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Who Can Apply
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {detailsModalScheme.whoCanApply.map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 bg-black/40 border border-emerald-900/60 rounded-2xl p-4">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Eligibility Conditions
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {detailsModalScheme.eligibilityConditions.map((e, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Required Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                {detailsModalScheme.requiredDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5 border border-white/5">
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step How to Apply */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Step-by-Step Application Process
              </h3>
              <div className="space-y-2 text-xs text-gray-300">
                {detailsModalScheme.howToApplySteps.map((step, i) => (
                  <div key={i} className="p-2.5 bg-emerald-950/30 rounded-xl border border-emerald-900/40">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Application Deadline & Official Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-900/60">
              <div className="text-xs text-gray-400">
                <span>Application Deadline: </span>
                <strong className="text-white">{detailsModalScheme.applicationDeadline}</strong>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={detailsModalScheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    const sc = detailsModalScheme;
                    setDetailsModalScheme(null);
                    setApplyModalScheme(sc);
                    setApplyStep(1);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: FARMER APPLICATION FEATURE ("Apply Now" 3-Step Guided Wizard)
          ========================================================================= */}
      {applyModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#05140b] border border-emerald-500/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setApplyModalScheme(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Farmer Application Dossier & Portal Route</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Apply for {applyModalScheme.name}
              </h2>
              <p className="text-xs text-gray-300 mt-0.5">
                Prepare your official verified application dossier before final transmission to the government portal.
              </p>
            </div>

            {/* Stepper Indicator */}
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`p-2 rounded-xl text-center text-xs font-bold border transition ${
                  applyStep === 1
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : 'bg-white/5 text-gray-400 border-white/10'
                }`}
              >
                1. Farmer Details
              </div>
              <div
                className={`p-2 rounded-xl text-center text-xs font-bold border transition ${
                  applyStep === 2
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : 'bg-white/5 text-gray-400 border-white/10'
                }`}
              >
                2. Documents
              </div>
              <div
                className={`p-2 rounded-xl text-center text-xs font-bold border transition ${
                  applyStep === 3
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : 'bg-white/5 text-gray-400 border-white/10'
                }`}
              >
                3. Review & Portal
              </div>
            </div>

            {/* STEP 1: Farmer & Land Details */}
            {applyStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      Farmer Full Name (as in Aadhaar)
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      Mobile Number (Aadhaar linked)
                    </label>
                    <input
                      type="text"
                      value={applicantMobile}
                      onChange={(e) => setApplicantMobile(e.target.value)}
                      className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      Aadhaar Number (Masked for privacy)
                    </label>
                    <input
                      type="text"
                      value={applicantAadhaar}
                      onChange={(e) => setApplicantAadhaar(e.target.value)}
                      className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      Revenue Village / Panchayat
                    </label>
                    <input
                      type="text"
                      value={applicantVillage}
                      onChange={(e) => setApplicantVillage(e.target.value)}
                      className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      Field Survey / Patta / Khata Number
                    </label>
                    <input
                      type="text"
                      value={applicantSurvey}
                      onChange={(e) => setApplicantSurvey(e.target.value)}
                      className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      Cultivable Area (Acres)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={acreageFilter}
                      onChange={(e) => setAcreageFilter(e.target.value)}
                      className="w-full bg-[#030e07] border border-emerald-800 rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setApplyStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2"
                  >
                    <span>Proceed to Document Checklist</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Document Checklist & Verification */}
            {applyStep === 2 && (
              <div className="space-y-4">
                <p className="text-xs text-gray-300">
                  Select and confirm ready documents required for <strong>{applyModalScheme.shortName}</strong>:
                </p>

                <div className="space-y-2.5">
                  {applyModalScheme.requiredDocuments.map((doc, idx) => {
                    const isUploaded = uploadedDocs[doc];
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center gap-2.5 text-xs text-white">
                          <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{doc}</span>
                        </div>

                        <button
                          onClick={() =>
                            setUploadedDocs((prev) => ({
                              ...prev,
                              [doc]: !prev[doc]
                            }))
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                            isUploaded
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-white/10 text-gray-300 hover:bg-white/15'
                          }`}
                        >
                          {isUploaded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Ready / Verified</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5" />
                              <span>Mark Available</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setApplyStep(1)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleFinalizeApplication}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg"
                  >
                    <span>Generate Dossier & Open Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review, Local Dossier Saved & Official Portal Routing */}
            {applyStep === 3 && submittedApp && (
              <div className="space-y-5 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    Application Dossier Prepared & Saved!
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Application Reference: <strong className="font-mono text-white">{submittedApp.id}</strong>
                  </p>
                </div>

                {/* Important Truth in Advertising / Official Submission Notice */}
                <div className="bg-amber-950/30 border border-amber-600/40 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-200">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">
                      Final Step: Submission on Official Government Portal
                    </strong>
                    <span>
                      To adhere to official cyber compliance and statutory rules, government applications must be finalized through the official Government of India / State portal. Click below to proceed with your pre-validated details.
                    </span>
                  </div>
                </div>

                {/* Applicant Summary */}
                <div className="bg-black/40 border border-emerald-900/60 rounded-2xl p-4 text-xs space-y-2">
                  <div className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                    Dossier Summary
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-gray-200">
                    <div>Applicant: <strong>{submittedApp.farmerName}</strong></div>
                    <div>Mobile: <strong>{submittedApp.mobile}</strong></div>
                    <div>Location: <strong>{submittedApp.district}, {submittedApp.state}</strong></div>
                    <div>Survey Number: <strong>{submittedApp.surveyNo}</strong></div>
                    <div>Land Area: <strong>{submittedApp.acreage} Acres</strong></div>
                    <div>Scheme: <strong>{submittedApp.schemeName}</strong></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <a
                    href={submittedApp.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white text-xs font-black tracking-wide uppercase transition flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/80"
                  >
                    <span>Proceed to Official {applyModalScheme.shortName} Portal</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setApplyModalScheme(null);
                      setActiveTab('my-applications');
                    }}
                    className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold transition"
                  >
                    View in My Applications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
