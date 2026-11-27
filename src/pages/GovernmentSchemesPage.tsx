import React, { useState, useMemo, useEffect } from 'react';
import { governmentSchemesData, Scheme, searchSchemes } from '../data/schemesData';
import { useFarmer } from '../context/FarmerContext';
import {
  Landmark,
  ShieldCheck,
  FileText,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Search,
  AlertCircle,
  ArrowRight,
  Info,
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
  Send,
  BookmarkCheck,
  Zap,
  UserCheck,
  FileCheck2
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
  cropName: string;
  appliedDate: string;
  status: 'Draft Prepared' | 'Redirected to Official Portal' | 'Under Local Review';
  officialUrl: string;
}

export default function GovernmentSchemesPage() {
  const { profile, fields } = useFarmer();

  // Navigation & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [naturalQuery, setNaturalQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'schemes' | 'apply' | 'my-applications'>('schemes');

  // Follow-up AI Filter Questions wired to farmer profile
  const [stateFilter, setStateFilter] = useState<string>(profile.state || 'Tamil Nadu');
  const [districtFilter, setDistrictFilter] = useState<string>(profile.district || 'Thanjavur');
  const [cropFilter, setCropFilter] = useState<string>(fields[0]?.currentCrop || 'Paddy / Rice');
  const [acreageFilter, setAcreageFilter] = useState<string>(
    profile.totalLandAreaAcres.toString() || '5.5'
  );
  const [ownershipFilter, setOwnershipFilter] = useState<string>('Owner Cultivator');
  const [assistanceFilter, setAssistanceFilter] = useState<string>('All');
  const [showFollowUpFilters, setShowFollowUpFilters] = useState<boolean>(false);

  // Modals & Active Apply Scheme
  const [detailsModalScheme, setDetailsModalScheme] = useState<Scheme | null>(null);
  const [applyScheme, setApplyScheme] = useState<Scheme>(governmentSchemesData[0]);
  const [aiAutoFilledBanner, setAiAutoFilledBanner] = useState<string | null>(null);

  // AI Auto-Filled Application Form State
  const [applicantName, setApplicantName] = useState<string>(profile.name);
  const [applicantMobile, setApplicantMobile] = useState<string>(profile.phone);
  const [applicantAadhaar, setApplicantAadhaar] = useState<string>(profile.aadhaarMasked);
  const [applicantKisanId, setApplicantKisanId] = useState<string>(profile.kisanId);
  const [applicantVillage, setApplicantVillage] = useState<string>(profile.village);
  const [applicantSurvey, setApplicantSurvey] = useState<string>(
    fields[0]?.location || 'Survey Plot 142/3'
  );
  const [applicantCrop, setApplicantCrop] = useState<string>(
    fields[0]?.currentCrop || 'Paddy (CR 1009 Sub 1)'
  );
  const [applicantSoilIrrigation, setApplicantSoilIrrigation] = useState<string>(
    `${fields[0]?.soilType || 'Sandy Loam'} • ${fields[0]?.irrigationType || 'Canal / Sluice'}`
  );
  const [uploadedDocFiles, setUploadedDocFiles] = useState<{ [docName: string]: string }>({});
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

    if (assistanceFilter !== 'All') {
      list = list.filter((s) => s.category === assistanceFilter);
    }

    const acres = parseFloat(acreageFilter) || 2;

    return list.map((scheme) => {
      let matchReason = 'Matches your farming profile and landholding.';

      if (naturalQuery) {
        matchReason = `Matched to your query: "${naturalQuery.slice(0, 52)}${naturalQuery.length > 52 ? '...' : ''}"`;
      } else if (scheme.id === 'pm-kisan') {
        matchReason = `With ${acres} acres in ${stateFilter}, you qualify for ₹6,000/year direct income support.`;
      } else if (scheme.id === 'pdmc' || scheme.id === 'pmksy') {
        matchReason =
          acres <= 5
            ? `Small & Marginal farmer in ${stateFilter} qualifies for up to 100% micro-irrigation subsidy.`
            : `Subsidy available for drip & sprinkler micro-irrigation systems.`;
      } else if (scheme.id === 'pmfby') {
        matchReason = `Protects your ${cropFilter} crop against flood & drought with subsidized premium.`;
      } else if (scheme.id === 'smam') {
        matchReason = `40%–50% subsidy on tractors and agricultural machinery for your land.`;
      } else if (scheme.id === 'soil-health-card') {
        matchReason = `Free lab testing of 12 soil parameters for your ${cropFilter} fields.`;
      }

      return { ...scheme, matchReason };
    });
  }, [naturalQuery, selectedCategory, assistanceFilter, acreageFilter, cropFilter, stateFilter]);

  /**
   * AI Auto-Fill & Navigate to Apply Tab:
   * Extracts crop/acreage/state from query + matches FarmerContext profile & fields,
   * pre-fills all basic details automatically, and takes farmer straight to the Apply tab!
   */
  const triggerAiAutoFillAndApply = (targetScheme: Scheme, queryContext?: string) => {
    const q = (queryContext ?? naturalQuery).toLowerCase();

    // Match most relevant field from FarmerContext
    let matchedField = fields[0];
    if (q.includes('sugarcane') || q.includes('cane')) {
      matchedField = fields.find((f) => f.currentCrop.toLowerCase().includes('sugar')) || fields[0];
    } else if (q.includes('banana') || q.includes('drip')) {
      matchedField = fields.find((f) => f.currentCrop.toLowerCase().includes('banana')) || fields[0];
    } else if (q.includes('groundnut') || q.includes('peanut')) {
      matchedField = fields.find((f) => f.currentCrop.toLowerCase().includes('groundnut')) || fields[0];
    } else if (q.includes('paddy') || q.includes('rice')) {
      matchedField = fields.find((f) => f.currentCrop.toLowerCase().includes('paddy')) || fields[0];
    }

    // Parse acreage if explicitly mentioned in natural query (e.g. "2 acres", "3 acres")
    const acreMatch = q.match(/(\d+(\.\d+)?)\s*(acre|acres|ac)/i);
    const detectedAcres = acreMatch
      ? acreMatch[1]
      : (matchedField?.areaAcres || profile.totalLandAreaAcres || 2.0).toString();

    // Auto-fill all basic details from profile & matched field
    setApplyScheme(targetScheme);
    setApplicantName(profile.name);
    setApplicantMobile(profile.phone);
    setApplicantAadhaar(profile.aadhaarMasked);
    setApplicantKisanId(profile.kisanId);
    setStateFilter(profile.state || 'Tamil Nadu');
    setDistrictFilter(profile.district || 'Thanjavur');
    setApplicantVillage(profile.village);
    setApplicantSurvey(matchedField?.location || 'Survey Plot 142/3');
    setApplicantCrop(
      q.includes('sugarcane')
        ? 'Sugarcane (Co 86032)'
        : q.includes('groundnut')
        ? 'Groundnut (Kadiri 6 Bold)'
        : q.includes('banana')
        ? 'Banana (Grand Naine)'
        : matchedField?.currentCrop || 'Paddy (CR 1009 Sub 1)'
    );
    setApplicantSoilIrrigation(
      `${matchedField?.soilType || 'Sandy Loam'} • ${matchedField?.irrigationType || 'Canal / Sluice'}`
    );
    setAcreageFilter(detectedAcres);
    setOwnershipFilter(
      q.includes('shg') || q.includes('fpo') || q.includes('drone')
        ? 'FPO / SHG'
        : 'Owner Cultivator'
    );
    setUploadedDocFiles({});
    setSubmittedApp(null);

    setAiAutoFilledBanner(
      `AI matched "${targetScheme.shortName}" and auto-filled all basic farmer & land details from ${profile.name}'s profile (${detectedAcres} Acres, ${matchedField?.location || 'Thanjavur'}). Only upload your required documents below.`
    );

    // Take the farmer directly to the Apply tab
    setActiveTab('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle "AI MATCH" button click: match top scheme & take farmer straight to pre-filled Apply tab
  const handleAiMatchSubmit = () => {
    const matched = searchSchemes(naturalQuery, 'All');
    const topScheme = matched[0] || governmentSchemesData[0];
    triggerAiAutoFillAndApply(topScheme, naturalQuery);
  };

  // Handle Quick Query Chip click
  const handleChipClick = (queryText: string) => {
    setNaturalQuery(queryText);
    const matched = searchSchemes(queryText, 'All');
    const topScheme = matched[0] || governmentSchemesData[0];
    triggerAiAutoFillAndApply(topScheme, queryText);
  };

  // Handle real file upload for required scheme documents
  const handleDocumentFileChange = (docName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDocFiles((prev) => ({
        ...prev,
        [docName]: file.name
      }));
    }
  };

  // Finalize & save application dossier
  const handleFinalizeApplication = () => {
    const newApp: SavedApplication = {
      id: `AGRONEX-GOV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      schemeId: applyScheme.id,
      schemeName: applyScheme.name,
      farmerName: applicantName,
      mobile: applicantMobile,
      state: stateFilter,
      district: districtFilter,
      acreage: parseFloat(acreageFilter) || 2.0,
      ownership: ownershipFilter,
      surveyNo: applicantSurvey,
      cropName: applicantCrop,
      appliedDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      status: 'Redirected to Official Portal',
      officialUrl: applyScheme.officialUrl
    };

    saveApplicationLocally(newApp);
    setSubmittedApp(newApp);
  };

  const quickQueries = [
    { label: 'I cultivate paddy on 2 acres in Tamil Nadu', icon: Wheat },
    { label: 'I grow sugarcane on 3 acres', icon: Sprout },
    { label: 'I need a drip irrigation subsidy', icon: Droplets },
    { label: 'I want financial support for my farming', icon: Wallet },
    { label: 'I need crop insurance against flood', icon: ShieldCheck },
    { label: 'I want to purchase a tractor', icon: Tractor },
    { label: 'I am an organic farmer', icon: Leaf },
    { label: 'I want drone services / Namo Drone Didi', icon: Radio }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f8ee] via-[#f6fcf8] to-[#e9f8ef] text-gray-900 pb-20 font-sans">
      {/* =========================================================================
          1. TOP AGRICULTURAL HERO BANNER (Matches Uploaded Reference Design)
         ========================================================================= */}
      <section className="relative overflow-hidden border-b border-emerald-200/70">
        {/* Bright Farmland Sky & Farmer Backdrop */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-[center_top]"
          style={{ backgroundImage: "url('/agronex-hero-backdrop-2k.jpg')" }}
        >
          {/* Bright crisp left readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4fbf6]/95 via-[#f4fbf6]/80 to-transparent md:w-[70%]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 sm:pb-24">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left Title & Module Badge */}
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-800 to-green-700 text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                <span>Module 5 • Government Agriculture Schemes & Insurance</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 leading-tight">
                Government{' '}
                <span className="text-emerald-700">Agriculture Schemes</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed max-w-xl">
                Verified central and state agricultural subsidies, direct income support, crop insurance, and machinery grants with AI eligibility matching & auto-filled applications.
              </p>
            </div>

            {/* Right Tab Switcher: All 20 Schemes | AI Apply Tab | My Applications */}
            <div className="flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-xl border border-emerald-200 p-1.5 rounded-full shadow-lg self-start lg:self-auto">
              <button
                onClick={() => setActiveTab('schemes')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'schemes'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-gray-700 hover:bg-emerald-50'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>All 20 Schemes</span>
              </button>

              <button
                onClick={() => setActiveTab('apply')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'apply'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-gray-700 hover:bg-emerald-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Apply ({applyScheme.shortName})</span>
              </button>

              <button
                onClick={() => setActiveTab('my-applications')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'my-applications'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-gray-700 hover:bg-emerald-50'
                }`}
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>My Applications ({savedApplications.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FLOATING WHITE AI SCHEME RECOMMENDATION CARD (Matches Reference)
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 space-y-8">
        <div className="bg-white/95 backdrop-blur-xl border border-emerald-200/90 rounded-3xl p-5 sm:p-8 shadow-[0_20px_50px_-12px_rgba(16,185,129,0.22)] space-y-5">
          {/* Card Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300/60 flex items-center justify-center text-emerald-700 shadow-xs shrink-0">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  Find the Right Government Scheme for{' '}
                  <span className="text-emerald-700">Your Farm</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  AI-powered natural language scheme recommendations — automatically fills & opens your application tab
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFollowUpFilters(!showFollowUpFilters)}
              className="px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{showFollowUpFilters ? 'Hide Farmer Profile' : 'Refine Farmer Profile'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search Bar + Bright Green AI MATCH Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAiMatchSubmit();
                }}
                placeholder="Tell us about your farming... e.g. I cultivate paddy on 2 acres in Tamil Nadu."
                className="w-full bg-gray-50/80 border border-gray-200 rounded-full pl-12 pr-10 py-3.5 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition shadow-inner"
              />
              {naturalQuery && (
                <button
                  onClick={() => setNaturalQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={handleAiMatchSubmit}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Match & Apply</span>
            </button>
          </div>

          {/* Quick Farmer Queries (Light Green Pills) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Farmer Queries (Click to AI Match & Auto-Fill Application):</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickQueries.map((item) => {
                const QIcon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleChipClick(item.label)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 border cursor-pointer ${
                      naturalQuery === item.label
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : 'bg-emerald-50/90 hover:bg-emerald-100 text-emerald-900 border-emerald-200/80'
                    }`}
                  >
                    <QIcon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Refine Farmer Profile Follow-Up Filters */}
          {showFollowUpFilters && (
            <div className="pt-4 border-t border-emerald-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs animate-fadeIn">
              <div>
                <label className="block text-gray-700 font-bold mb-1">State / District</label>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-xs focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="All India">Other / All India</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Crop Cultivated</label>
                <select
                  value={cropFilter}
                  onChange={(e) => setCropFilter(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-xs focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Paddy / Rice">Paddy / Rice</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Banana">Banana</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Maize">Maize</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Total Acreage</label>
                <input
                  type="number"
                  step="0.5"
                  value={acreageFilter}
                  onChange={(e) => setAcreageFilter(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Ownership</label>
                <select
                  value={ownershipFilter}
                  onChange={(e) => setOwnershipFilter(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-xs"
                >
                  <option value="Owner Cultivator">Owner Cultivator (Patta)</option>
                  <option value="Tenant / Lessee">Tenant / Lessee</option>
                  <option value="FPO / SHG">FPO / Women SHG</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Assistance Type</label>
                <select
                  value={assistanceFilter}
                  onChange={(e) => setAssistanceFilter(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-xs"
                >
                  <option value="All">All Schemes</option>
                  <option value="Income Support">Income Support</option>
                  <option value="Irrigation">Drip / Irrigation</option>
                  <option value="Mechanization">Tractor / Machinery</option>
                  <option value="Crop Insurance">Crop Insurance</option>
                  <option value="Organic & Natural">Organic Farming</option>
                </select>
              </div>
            </div>
          )}

          {/* Preliminary Eligibility Guidance Box */}
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3 text-xs text-gray-700">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-gray-900 uppercase tracking-wider block mb-0.5">
                  Preliminary Eligibility Guidance
                </span>
                <span>
                  Recommendations provided by AGRONEX are preliminary guidance derived from verified official scheme criteria. Final sanction and subsidy disbursement are subject to document verification by the designated Government Department.
                </span>
              </div>
            </div>
            <Landmark className="w-10 h-10 text-emerald-700/25 hidden sm:block shrink-0" />
          </div>
        </div>

        {/* =========================================================================
            TAB A: ALL 20 SCHEMES GRID
           ========================================================================= */}
        {activeTab === 'schemes' && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-200/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>
                Showing <strong className="text-gray-900">{aiRecommendedSchemes.length}</strong> verified Government Schemes
              </span>
              {naturalQuery && (
                <span className="text-emerald-700 font-bold">
                  Sorted by AI relevance to "{naturalQuery}"
                </span>
              )}
            </div>

            {/* Scheme Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiRecommendedSchemes.map((scheme, index) => (
                <div
                  key={scheme.id}
                  className="group bg-white border border-emerald-200/80 hover:border-emerald-500 rounded-3xl p-6 shadow-md hover:shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-600 via-green-500 to-lime-400" />

                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition">
                        {renderIcon(scheme.icon, 'w-6 h-6')}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          {scheme.category}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {scheme.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-black text-emerald-700 uppercase tracking-wider">
                        #{index + 1} {scheme.shortName}
                      </div>
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-emerald-700 transition line-clamp-1">
                        {scheme.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{scheme.tamilName}</p>
                    </div>

                    {scheme.matchReason && (
                      <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2.5 text-[11px] text-emerald-900 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 font-medium">{scheme.matchReason}</span>
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-3">
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                        Financial Assistance & Subsidy
                      </div>
                      <p className="text-xs font-extrabold text-emerald-800 mt-0.5 line-clamp-2">
                        {scheme.financialBenefit}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Purpose</h4>
                      <p className="text-xs text-gray-700 mt-1 line-clamp-2 leading-relaxed">{scheme.purpose}</p>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Key Benefits
                      </h4>
                      <ul className="space-y-1 text-xs text-gray-700">
                        {scheme.benefits.slice(0, 2).map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Required Documents
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {scheme.requiredDocuments.slice(0, 3).map((doc, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-[10px] text-gray-700 font-medium"
                          >
                            {doc.length > 22 ? doc.slice(0, 20) + '...' : doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-emerald-100 grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => setDetailsModalScheme(scheme)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    <button
                      onClick={() => triggerAiAutoFillAndApply(scheme)}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Auto-Apply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB B: AI AUTO-FILLED SCHEME APPLICATION TAB
           ========================================================================= */}
        {activeTab === 'apply' && (
          <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            {/* AI Auto-Fill Confirmation Banner */}
            {aiAutoFilledBanner && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-emerald-900">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-emerald-950">AI Auto-Filled Your Application!</strong>
                    <span>{aiAutoFilledBanner}</span>
                  </div>
                </div>
                <button
                  onClick={() => setAiAutoFilledBanner(null)}
                  className="text-emerald-700 hover:text-emerald-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Header with Scheme Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                  {renderIcon(applyScheme.icon, 'w-6 h-6')}
                </div>
                <div>
                  <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider">
                    AI-Assisted Application Dossier
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Apply for {applyScheme.name}
                  </h2>
                  <p className="text-xs text-gray-600">{applyScheme.financialBenefit}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={applyScheme.id}
                  onChange={(e) => {
                    const found = governmentSchemesData.find((s) => s.id === e.target.value);
                    if (found) triggerAiAutoFillAndApply(found);
                  }}
                  className="bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-900"
                >
                  {governmentSchemesData.map((s) => (
                    <option key={s.id} value={s.id}>
                      Switch Scheme: {s.shortName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!submittedApp ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT COLUMN: Basic Details Auto-Filled by AI */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span>1. Basic Farmer & Land Details</span>
                    </h3>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Auto-Filled by AI
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs bg-emerald-50/40 p-4 rounded-2xl border border-emerald-200/70">
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Farmer Full Name</label>
                      <input
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-gray-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Mobile Number</label>
                      <input
                        type="text"
                        value={applicantMobile}
                        onChange={(e) => setApplicantMobile(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-gray-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">State & District</label>
                      <input
                        type="text"
                        value={`${districtFilter}, ${stateFilter}`}
                        onChange={(e) => setDistrictFilter(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-gray-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Revenue Village</label>
                      <input
                        type="text"
                        value={applicantVillage}
                        onChange={(e) => setApplicantVillage(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-gray-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Survey / Patta No.</label>
                      <input
                        type="text"
                        value={applicantSurvey}
                        onChange={(e) => setApplicantSurvey(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-gray-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Cultivable Area (Acres)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={acreageFilter}
                        onChange={(e) => setAcreageFilter(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-gray-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Crop Cultivated</label>
                      <input
                        type="text"
                        value={applicantCrop}
                        onChange={(e) => setApplicantCrop(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-gray-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Soil & Irrigation</label>
                      <input
                        type="text"
                        value={applicantSoilIrrigation}
                        onChange={(e) => setApplicantSoilIrrigation(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-gray-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Kisan ID</label>
                      <input
                        type="text"
                        value={applicantKisanId}
                        onChange={(e) => setApplicantKisanId(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-gray-900 font-mono font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">Aadhaar (Masked Privacy)</label>
                      <input
                        type="text"
                        value={applicantAadhaar}
                        readOnly
                        className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-gray-600 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Farmer Only Uploads Supporting Documents */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    <span>2. Upload Required Documents</span>
                  </h3>
                  <p className="text-xs text-gray-600">
                    All basic fields are pre-filled. Simply upload any required forms/documents for{' '}
                    <strong>{applyScheme.shortName}</strong>:
                  </p>

                  <div className="space-y-2.5">
                    {applyScheme.requiredDocuments.map((doc, idx) => {
                      const fileName = uploadedDocFiles[doc];
                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                              <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="truncate">{doc}</span>
                            </div>
                            {fileName && (
                              <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5 truncate">
                                ✓ Uploaded: {fileName}
                              </span>
                            )}
                          </div>

                          <label className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{fileName ? 'Change' : 'Upload'}</span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleDocumentFileChange(doc, e)}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleFinalizeApplication}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition mt-4"
                  >
                    <span>Save Dossier & Open Official Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* SUBMITTED & SAVED CONFIRMATION */
              <div className="space-y-5 max-w-2xl mx-auto py-4">
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">
                    Application Dossier Prepared & Saved!
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Reference ID: <strong className="font-mono">{submittedApp.id}</strong>
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-0.5">Official Government Portal Routing</strong>
                    <span>
                      To ensure statutory compliance, finalize your submission directly on the official{' '}
                      <strong>{applyScheme.shortName}</strong> government portal using the button below.
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={submittedApp.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Proceed to Official {applyScheme.shortName} Portal</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setActiveTab('my-applications')}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold cursor-pointer"
                  >
                    View in My Applications
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB C: MY SAVED APPLICATIONS
           ========================================================================= */}
        {activeTab === 'my-applications' && (
          <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-gray-900">My Saved Applications & Progress Register</h2>
                <p className="text-xs text-gray-600">
                  Track applications prepared on AGRONEX and open official government portals.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('schemes')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Landmark className="w-4 h-4" />
                <span>Browse Schemes</span>
              </button>
            </div>

            {savedApplications.length === 0 ? (
              <div className="border-2 border-dashed border-emerald-200 rounded-3xl p-12 text-center space-y-3">
                <BookmarkCheck className="w-12 h-12 text-emerald-500/50 mx-auto" />
                <h3 className="text-base font-bold text-gray-900">No Applications Saved Yet</h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  Use the AI Match search box or click "AI Auto-Apply" on any scheme to auto-fill and save your application dossier.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedApplications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                          {app.id}
                        </span>
                        <span className="text-xs text-gray-500">Prepared: {app.appliedDate}</span>
                      </div>
                      <h3 className="text-base font-black text-gray-900">{app.schemeName}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700">
                        <span>Applicant: <strong>{app.farmerName}</strong></span>
                        <span>Location: <strong>{app.district}, {app.state}</strong></span>
                        <span>Survey: <strong>{app.surveyNo}</strong></span>
                        <span>Area: <strong>{app.acreage} Acres</strong></span>
                      </div>
                    </div>

                    <a
                      href={app.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shrink-0"
                    >
                      <span>Open Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* =========================================================================
          VIEW DETAILS MODAL
         ========================================================================= */}
      {detailsModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-emerald-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-gray-900">
            <button
              onClick={() => setDetailsModalScheme(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                {renderIcon(detailsModalScheme.icon, 'w-7 h-7')}
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                  {detailsModalScheme.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                  {detailsModalScheme.name}
                </h2>
                <p className="text-xs text-gray-500">{detailsModalScheme.tamilName}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">{detailsModalScheme.fullDescription}</p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <div className="text-xs font-bold text-emerald-700 uppercase">Verified Financial Benefit</div>
              <div className="text-base font-black text-gray-900 mt-1">
                {detailsModalScheme.financialBenefit}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
                <h4 className="font-black text-emerald-800 uppercase">Eligibility Conditions</h4>
                <ul className="space-y-1 text-gray-700">
                  {detailsModalScheme.eligibilityConditions.map((e, i) => (
                    <li key={i}>• {e}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
                <h4 className="font-black text-emerald-800 uppercase">Required Documents</h4>
                <ul className="space-y-1 text-gray-700">
                  {detailsModalScheme.requiredDocuments.map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Deadline: <strong className="text-gray-900">{detailsModalScheme.applicationDeadline}</strong>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={detailsModalScheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => {
                    const sc = detailsModalScheme;
                    setDetailsModalScheme(null);
                    triggerAiAutoFillAndApply(sc);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Auto-Fill & Apply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
