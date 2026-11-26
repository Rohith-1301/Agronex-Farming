import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  ExternalLink,
  Share2,
  Calendar,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function ProjectTrackerPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tracker'>('overview');
  const [copied, setCopied] = useState(false);

  const handleCopyClipboard = () => {
    let text = "";
    if (activeTab === 'overview') {
      text = `1M1B GREEN INTERNSHIP (YIRP) — PROJECT OVERVIEW
Intern Name: Rohith
Project Title: AGRI VISION 3D — Next-Gen Smart Agriculture
Domain: Agriculture & Environment (Priority 1)
Mentor: paramjeet@onemoneb.org

PART 1: PROBLEM DEFINITION
1. Severe Freshwater Wastage in Irrigation: Traditional flood irrigation wastes 30% to 40% of fresh groundwater due to evaporation and uncontrolled field flooding because farmers lack visual root-zone moisture data.
2. Delayed Crop Disease Diagnosis: Crop diseases (Paddy Blast, Tomato Blight, Root Wilt) are diagnosed after visible damage spreads. Farmers rely on excessive chemical sprays that degrade soil and enter food supply.
3. Financial Exploitation by Middlemen: Farmers lack direct access to wholesale buyers and live APMC mandi pricing, forcing them to sell through multiple commission agents at low prices.
4. Digital Literacy & Language Barriers: Most existing smart agriculture apps are in English, cluttered with complex text and forms, and require typing, making them inaccessible to rural farmers.

PART 2: PROJECT IDEATION & SOLUTION
1. 3D Digital Twin Farm & Soil Stratum: Interactive Three.js 3D representation of farmer plots showing topsoil, root depth, and 5 dynamic layers: Crop growth, Soil moisture, Irrigation lines, Health index, and Soil type.
2. AI Crop Doctor (Organic-First): Mobile camera leaf photo diagnosis using AI agronomy. Suggests TNAU-verified organic remedies (Panchagavya, Pseudomonas fluorescens) before chemical IPM.
3. Smart Precision Irrigation Management: Converts crop evapotranspiration (mm/day) and root-zone sensor moisture into exact daily liter requirements with scheduled drip runtimes.
4. Direct Farmer-to-Buyer Marketplace: Commission-free marketplace with live Tamil Nadu APMC Mandi price tickers, allowing farmers to post harvest listings and connect directly with verified buyers via Call / WhatsApp.
5. Tamil-First Voice Accessibility: Native Tamil interface with built-in voice navigation and text-to-speech audio explanations so illiterate farmers can speak queries and listen to guidance.`;
    } else {
      text = `Date / Week\tProject Milestone / Module\tWork Done in Detail\tProject Links\tOverall Progress (%)\tAny Help from 1M1B
06 Nov 2026\tProject Ideation & Problem Definition\tSelected Agriculture & Environment domain. Drafted problem statement on water wastage, delayed disease diagnosis, and fair trade. Defined AGRI VISION 3D scope for Indian farmers.\tProject Overview Tab\tCompleted (100%)\tGuidance on 1M1B evaluation rubric.
10 Nov 2026\tFramework & Architecture Setup\tInitialized project with React 18, TypeScript, Vite, and Tailwind CSS. Structured modular architecture for 3D digital twins, agronomy modules, and multilingual support.\tLocal Repository\tCompleted (100%)\tNone at this stage.
13 Nov 2026\tCore Agri Modules & AI Integration\tImplemented AI Crop Doctor (TNAU verified organic/IPM remedies), Smart Irrigation water budgeting calculator, Open-Meteo live weather telemetry for Tamil Nadu districts, and Mandi trade listings.\tWorking Feature Suite\tCompleted (100%)\tSuggested agricultural API recommendations.
14 Nov 2026\t3D Digital Twin & 7-Stage Crop Phenology\tBuilt Three.js WebGL 3D farm environment with 5,600+ instanced rice plants, moving tractor, and coconut palms. Created interactive 7-stage botanical crop growth visualization with root depth tracking.\t3D WebGL Engine\tCompleted (100%)\tMentor review on prototype usability for rural farmers.
15 Nov 2026\tCinematic Video Hero & Visual Upgrade\tIntegrated 4K drone agricultural video hero with glassmorphic telemetry cards (Crop health, moisture, temp waveforms), Tamil voice navigation, and 6-scene agricultural storytelling scroll.\tCinematic Interface\tCompleted (100%)\tReview on alignment with 1M1B Green Innovation standards.
17 Nov 2026 (Today)\tPrototype Testing & Tracker Submission\tVerified zero-error production build. Documented Problem Definition, Project Ideation, and created official Google Sheets tracker for Paramjeet Sir's review.\tRohith_YIRP Tracker\tPrototype Ready (90%)\tSeeking initial approval from Paramjeet Sir for prototype phase.
Upcoming (Nov 20-30)\tCloud Deployment & Mentor Feedback\tDeploying to cloud hosting (Vercel/Netlify), connecting custom domain, and incorporating feedback from Thursday mentoring sessions.\tDeployment Pending\tScheduled (Next Step)\tAssistance in scheduling mentor presentation slot.`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0a2c17] to-[#05160d] border border-emerald-600/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase mb-2 border border-emerald-500/30">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>1M1B Green Internship — Official Project Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Rohith_YIRP — Spreadsheet & Submission Hub
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
            Mentor: <strong className="text-white">paramjeet@onemoneb.org</strong> • Domain: <strong className="text-emerald-400">Agriculture & Environment</strong> • Project: <strong className="text-white">AGRI VISION 3D</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/Rohith_YIRP.xlsx"
            download="Rohith_YIRP.xlsx"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-950/80 transition transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Excel (.xlsx)</span>
          </a>

          <button
            onClick={handleCopyClipboard}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Table to Clipboard'}</span>
          </button>
        </div>
      </div>

      {/* 3-Step Guide to Upload to Google Sheets */}
      <div className="bg-[#081e12]/80 backdrop-blur-md border border-emerald-900/60 rounded-3xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-emerald-400" />
          <span>How to open and share in Google Sheets in 30 seconds:</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-300">
          <div className="bg-[#04120a] p-3.5 rounded-2xl border border-emerald-900/40">
            <strong className="text-emerald-400 block mb-1">Step 1: Download File</strong>
            Click the green <strong>"Download Excel (.xlsx)"</strong> button above to save <code>Rohith_YIRP.xlsx</code> to your computer.
          </div>
          <div className="bg-[#04120a] p-3.5 rounded-2xl border border-emerald-900/40">
            <strong className="text-sky-400 block mb-1">Step 2: Upload to Google Drive</strong>
            Open <a href="https://drive.google.com" target="_blank" rel="noreferrer" className="text-emerald-300 underline font-semibold">Google Drive</a> ➔ Click <strong>+ New</strong> (top left) ➔ <strong>File upload</strong> ➔ Select the downloaded file.
          </div>
          <div className="bg-[#04120a] p-3.5 rounded-2xl border border-emerald-900/40">
            <strong className="text-amber-400 block mb-1">Step 3: Share with Mentor</strong>
            Open the uploaded file in Google Sheets ➔ Click green <strong>Share</strong> button (top right) ➔ Add <code>paramjeet@onemoneb.org</code>.
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-3 border-b border-emerald-900/60 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-[#081e12] text-gray-300 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Tab 1: Problem Definition & Ideation</span>
        </button>

        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            activeTab === 'tracker'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-[#081e12] text-gray-300 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Tab 2: Weekly Progress Tracker</span>
        </button>
      </div>

      {/* Tab 1 Content: Project Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Problem Definition Table */}
          <div className="bg-[#081e12]/90 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <span>PART 1: PROBLEM DEFINITION (Challenges Faced by Indian Farmers)</span>
              </h3>
              <span className="text-xs text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/30">
                4 Critical Challenges
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-emerald-800/60 text-emerald-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">S.No</th>
                    <th className="py-2.5 px-3">Problem Area</th>
                    <th className="py-2.5 px-3">Detailed Problem Definition</th>
                    <th className="py-2.5 px-3">Real-World Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/40 text-gray-200">
                  <tr className="bg-[#05140b]/50">
                    <td className="py-3 px-3 font-bold text-emerald-400">1</td>
                    <td className="py-3 px-3 font-bold text-white">Severe Freshwater Wastage in Irrigation</td>
                    <td className="py-3 px-3">Traditional flood irrigation wastes 30% to 40% of fresh groundwater due to evaporation and uncontrolled field flooding because farmers lack visual root-zone moisture data.</td>
                    <td className="py-3 px-3 text-amber-300">Groundwater depletion across agricultural river basins; increased pumping electricity expenses.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-emerald-400">2</td>
                    <td className="py-3 px-3 font-bold text-white">Delayed Crop Disease Diagnosis</td>
                    <td className="py-3 px-3">Crop diseases (Paddy Blast, Tomato Blight, Root Wilt) are diagnosed after visible damage spreads. Farmers rely on excessive chemical sprays that degrade soil and enter food supply.</td>
                    <td className="py-3 px-3 text-amber-300">Annual crop losses of 20-30%; toxic chemical runoff into freshwater streams; high pesticide debt.</td>
                  </tr>
                  <tr className="bg-[#05140b]/50">
                    <td className="py-3 px-3 font-bold text-emerald-400">3</td>
                    <td className="py-3 px-3 font-bold text-white">Financial Exploitation by Middlemen</td>
                    <td className="py-3 px-3">Farmers lack direct access to wholesale buyers and live APMC mandi pricing, forcing them to sell through multiple commission agents at low prices.</td>
                    <td className="py-3 px-3 text-amber-300">Farmers receive 20% to 35% below fair market value; severe economic distress in farming households.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-emerald-400">4</td>
                    <td className="py-3 px-3 font-bold text-white">Digital Literacy & Language Barriers</td>
                    <td className="py-3 px-3">Most existing smart agriculture apps are in English, cluttered with complex text and forms, and require typing, making them inaccessible to rural farmers.</td>
                    <td className="py-3 px-3 text-amber-300">High barrier to technological adoption; smallholder farmers are left behind in the digital transition.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Project Ideation & Solution Table */}
          <div className="bg-[#081e12]/90 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>PART 2: PROJECT IDEATION & SOLUTION (How AGRI VISION 3D Solves It)</span>
              </h3>
              <span className="text-xs text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600/30">
                5 Solution Pillars
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-emerald-800/60 text-emerald-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">S.No</th>
                    <th className="py-2.5 px-3">Solution Pillar</th>
                    <th className="py-2.5 px-3">Technical Implementation</th>
                    <th className="py-2.5 px-3">Environmental & Farmer Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/40 text-gray-200">
                  <tr className="bg-[#05140b]/50">
                    <td className="py-3 px-3 font-bold text-emerald-400">1</td>
                    <td className="py-3 px-3 font-bold text-white">3D Digital Twin Farm & Soil Stratum</td>
                    <td className="py-3 px-3">Interactive Three.js 3D representation of farmer plots showing topsoil, root depth, and 5 dynamic layers: Crop growth, Soil moisture, Irrigation lines, Health index, and Soil type.</td>
                    <td className="py-3 px-3 text-emerald-300">Visual clarity for farmers without complex graphs; precise plot-by-plot monitoring.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-emerald-400">2</td>
                    <td className="py-3 px-3 font-bold text-white">AI Crop Doctor (Organic-First)</td>
                    <td className="py-3 px-3">Mobile camera leaf photo diagnosis using AI agronomy. Suggests TNAU-verified organic remedies (Panchagavya, Pseudomonas fluorescens) before chemical IPM.</td>
                    <td className="py-3 px-3 text-emerald-300">Restores soil microbiome; eliminates toxic chemical runoff; cuts pesticide costs by 40%.</td>
                  </tr>
                  <tr className="bg-[#05140b]/50">
                    <td className="py-3 px-3 font-bold text-emerald-400">3</td>
                    <td className="py-3 px-3 font-bold text-white">Smart Precision Irrigation Management</td>
                    <td className="py-3 px-3">Converts crop evapotranspiration (mm/day) and root-zone sensor moisture into exact daily liter requirements with scheduled drip runtimes.</td>
                    <td className="py-3 px-3 text-emerald-300">Conserves up to 30% to 40% irrigation freshwater; prevents root rot and fertilizer leaching.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-emerald-400">4</td>
                    <td className="py-3 px-3 font-bold text-white">Direct Farmer-to-Buyer Marketplace</td>
                    <td className="py-3 px-3">Commission-free marketplace with live Tamil Nadu APMC Mandi price tickers, allowing farmers to post harvest listings and connect directly with verified buyers via Call / WhatsApp.</td>
                    <td className="py-3 px-3 text-emerald-300">Eliminates middlemen cuts; increases farmer net profit by 20% to 30%.</td>
                  </tr>
                  <tr className="bg-[#05140b]/50">
                    <td className="py-3 px-3 font-bold text-emerald-400">5</td>
                    <td className="py-3 px-3 font-bold text-white">Tamil-First Voice Accessibility</td>
                    <td className="py-3 px-3">Native Tamil interface with built-in voice navigation and text-to-speech audio explanations so illiterate farmers can speak queries and listen to guidance.</td>
                    <td className="py-3 px-3 text-emerald-300">Ensures 100% inclusivity for rural farmers across varying literacy levels.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 Content: Project Tracker Table */}
      {activeTab === 'tracker' && (
        <div className="bg-[#081e12]/90 border border-emerald-900/60 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>WEEKLY PROGRESS TRACKER (Log of Work Done)</span>
              </h3>
              <p className="text-xs text-gray-400">Format specified in 1M1B Minutes of Meeting (MOM)</p>
            </div>
            <span className="text-xs text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600/30">
              Prototype Ready
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-emerald-800/60 text-emerald-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Date / Week</th>
                  <th className="py-2.5 px-3">Milestone / Module</th>
                  <th className="py-2.5 px-3">Detailed Work Completed</th>
                  <th className="py-2.5 px-3">Links</th>
                  <th className="py-2.5 px-3">Progress</th>
                  <th className="py-2.5 px-3">Any Help from 1M1B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/40 text-gray-200">
                <tr className="bg-[#05140b]/50">
                  <td className="py-3 px-3 font-bold whitespace-nowrap">06 Nov 2026</td>
                  <td className="py-3 px-3 font-bold text-white">Project Ideation & Problem Definition</td>
                  <td className="py-3 px-3">Selected Agriculture & Environment domain. Drafted problem statement on water wastage, delayed disease diagnosis, and fair trade. Defined AGRI VISION 3D scope for Indian farmers.</td>
                  <td className="py-3 px-3 text-sky-400 underline">Project Overview Tab</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">Completed (100%)</td>
                  <td className="py-3 px-3 text-gray-400">Guidance on 1M1B evaluation rubric.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold whitespace-nowrap">10 Nov 2026</td>
                  <td className="py-3 px-3 font-bold text-white">Framework & Architecture Setup</td>
                  <td className="py-3 px-3">Initialized project with React 18, TypeScript, Vite, and Tailwind CSS. Structured modular architecture for 3D digital twins, agronomy modules, and multilingual support.</td>
                  <td className="py-3 px-3 text-sky-400 underline">Local Repository</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">Completed (100%)</td>
                  <td className="py-3 px-3 text-gray-400">None at this stage.</td>
                </tr>
                <tr className="bg-[#05140b]/50">
                  <td className="py-3 px-3 font-bold whitespace-nowrap">13 Nov 2026</td>
                  <td className="py-3 px-3 font-bold text-white">Core Agri Modules & AI Integration</td>
                  <td className="py-3 px-3">Implemented AI Crop Doctor (TNAU verified organic/IPM remedies), Smart Irrigation water budgeting calculator, Open-Meteo live weather telemetry for Tamil Nadu districts, and Mandi trade listings.</td>
                  <td className="py-3 px-3 text-sky-400 underline">Working Feature Suite</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">Completed (100%)</td>
                  <td className="py-3 px-3 text-gray-400">Suggested agricultural API recommendations.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold whitespace-nowrap">14 Nov 2026</td>
                  <td className="py-3 px-3 font-bold text-white">3D Digital Twin & 7-Stage Crop Phenology</td>
                  <td className="py-3 px-3">Built Three.js WebGL 3D farm environment with 5,600+ instanced rice plants, moving tractor, and coconut palms. Created interactive 7-stage botanical crop growth visualization with root depth tracking.</td>
                  <td className="py-3 px-3 text-sky-400 underline">3D WebGL Engine</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">Completed (100%)</td>
                  <td className="py-3 px-3 text-gray-400">Mentor review on prototype usability for rural farmers.</td>
                </tr>
                <tr className="bg-[#05140b]/50">
                  <td className="py-3 px-3 font-bold whitespace-nowrap">15 Nov 2026</td>
                  <td className="py-3 px-3 font-bold text-white">Cinematic Video Hero & Visual Upgrade</td>
                  <td className="py-3 px-3">Integrated 4K drone agricultural video hero with glassmorphic telemetry cards (Crop health, moisture, temp waveforms), Tamil voice navigation, and 6-scene agricultural storytelling scroll.</td>
                  <td className="py-3 px-3 text-sky-400 underline">Cinematic Interface</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">Completed (100%)</td>
                  <td className="py-3 px-3 text-gray-400">Review on alignment with 1M1B Green Innovation standards.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold whitespace-nowrap text-emerald-400">17 Nov 2026 (Today)</td>
                  <td className="py-3 px-3 font-bold text-white">Prototype Testing & Tracker Submission</td>
                  <td className="py-3 px-3">Verified zero-error production build. Documented Problem Definition, Project Ideation, and created official Google Sheets tracker for Paramjeet Sir's review.</td>
                  <td className="py-3 px-3 text-sky-400 underline">Rohith_YIRP Tracker</td>
                  <td className="py-3 px-3 font-bold text-sky-400">Prototype Ready (90%)</td>
                  <td className="py-3 px-3 text-emerald-300">Seeking initial approval from Paramjeet Sir for prototype phase.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold whitespace-nowrap text-emerald-400">20 Nov 2026 (Today)</td>
                  <td className="py-3 px-3 font-bold text-white">All-India Datasets, RAG Agro AI & 3D Farm</td>
                  <td className="py-3 px-3">Integrated official TNAU & ICAR datasets (STCR equations, AWD irrigation, Ramsar wetlands), Trilingual RAG AI assistant (En/Ta/Hi), Personalized procedural 3D farm (State/District/Crop/Soil), 8-stage botanical crop growth with root absorption X-ray, and Dataset Admin pipeline with benchmark test suite.</td>
                  <td className="py-3 px-3 text-sky-400 underline">Production Platform</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">Milestone Completed (98%)</td>
                  <td className="py-3 px-3 text-emerald-300">Reviewed Paramjeet Sir's remarks; verified dataset grounding and official source citations.</td>
                </tr>
                <tr className="bg-[#05140b]/50">
                  <td className="py-3 px-3 font-bold whitespace-nowrap text-gray-400">Upcoming (Nov 25-30)</td>
                  <td className="py-3 px-3 font-bold text-gray-300">Cloud Deployment & Mentor Feedback</td>
                  <td className="py-3 px-3 text-gray-400">Deploying to cloud hosting (Vercel/Netlify), connecting custom domain, and incorporating feedback from Thursday mentoring sessions.</td>
                  <td className="py-3 px-3 text-gray-400">Deployment Pending</td>
                  <td className="py-3 px-3 text-amber-400">Scheduled (Next Step)</td>
                  <td className="py-3 px-3 text-gray-400">Assistance in scheduling mentor presentation slot.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
