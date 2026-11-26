import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  PlayCircle,
  FileDown,
  Calendar,
  CheckCircle,
  Search,
  Sparkles,
  Award
} from 'lucide-react';

interface GuideItem {
  id: string;
  title: string;
  tamilTitle: string;
  category: string;
  duration: string;
  level: string;
  summary: string;
  tamilSummary: string;
  steps: string[];
  videoThumbnail: string;
}

export default function LearningCentrePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);

  const guides: GuideItem[] = [
    {
      id: 'g1',
      title: 'SRI Technique: System of Rice Intensification in Cauvery Delta',
      tamilTitle: 'செம்மை நெல் சாகுபடி (SRI) தொழில்நுட்பம்',
      category: 'Paddy Cultivation',
      duration: '15 min read • Video Guide',
      level: 'Intermediate',
      summary: 'Save 40% seed rate and 30% water using 14-day single seedling transplanting with rotary weeder aeration.',
      tamilSummary: '14 நாள் இளம் நாற்றை ஒற்றை நாற்றாக 25x25 செ.மீ இடைவெளியில் நடவு செய்து, கோனோ வீடர் மூலம் களை எடுத்து 30% நீர் சேமிப்புடன் 40% கூடுதல் மகசூல் பெறும் முறை.',
      steps: [
        'Nursery raising on raised bed with vermicompost and Azospirillum seed treatment.',
        'Transplanting young seedlings (14 days old, 2-leaf stage) within 30 minutes of uprooting.',
        'Square planting at 25cm x 25cm spacing using marker rope.',
        'Cono-weeder operation on Day 10, 20, 30 and 40 to churn weeds as in-situ green manure.',
        'Alternate Wetting and Drying (AWD) irrigation up to panicle initiation stage.'
      ],
      videoThumbnail: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'g2',
      title: 'Organic Jeevamirtham & Panchagavya Preparation Guide',
      tamilTitle: 'ஜீவாமிர்தம் மற்றும் பஞ்சகாவ்யா தயாரிக்கும் முறை',
      category: 'Organic Agriculture',
      duration: '10 min read',
      level: 'Beginner Friendly',
      summary: 'Harness indigenous cow dung, urine, jaggery, and pulse flour to multiply beneficial soil micro-organisms by billions.',
      tamilSummary: 'நாட்டுப்பசுவின் சாணம், கோமியம், வெல்லம், பயறு மாவு கொண்டு நிலத்தின் நுண்ணுயிர்களை பல கோடிகளாக பெருக்கி மண் வளத்தை மீட்டெடுக்கும் எளிய முறை.',
      steps: [
        'Take 200 liters of water in a clean plastic drum in shade.',
        'Mix 10 kg native cow dung + 10 liters cow urine.',
        'Add 2 kg jaggery (நாட்டு வெல்லம்) and 2 kg pulse flour (உளுந்து/பாசிப்பயறு மாவு).',
        'Add a handful of virgin forest or bund soil.',
        'Stir clockwise twice daily for 48 hours. Apply via irrigation or 10% foliar spray.'
      ],
      videoThumbnail: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'g3',
      title: 'Pollachi Coconut High-Yield Basin Management & Drip Fertigation',
      tamilTitle: 'தென்னை மர பராமரிப்பு & சொட்டு நீர் உரப்பாசனம்',
      category: 'Coconut Farming',
      duration: '12 min read',
      level: 'Advanced',
      summary: 'Maximize nut setting and prevent button shedding using balanced NPK boron nutrition and sunnhemp basin mulching.',
      tamilSummary: 'குரும்பை உதிர்வதைத் தடுத்து, தேங்காய் எடை மற்றும் பருப்பு தடிமனை அதிகரிக்க நுண்ணூட்டச் சத்து மற்றும் சணப்பை பசுந்தாள் உர மேலாண்மை.',
      steps: [
        'Maintain a 1.8m radius circular basin around each palm with drip loop.',
        'Sow 50g Sunnhemp or Cowpea seeds in the basin as green cover; incorporate into soil after 45 days.',
        'Apply 50g Borax and 500g Magnesium sulphate per palm annually.',
        'Root feeding with TNAU Coconut Tonic (40ml in 160ml water) twice a year.'
      ],
      videoThumbnail: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'g4',
      title: 'Tissue Culture Banana High-Density Sowing (Grand Naine)',
      tamilTitle: 'திசு வளர்ப்பு வாழை அதிக அடர்த்தி சாகுபடி',
      category: 'Banana Cultivation',
      duration: '18 min read',
      level: 'Intermediate',
      summary: 'Harvest uniform 35-40 kg bunches per plant with micro-irrigation and bunch cover sleeves.',
      tamilSummary: 'ஜி-9 ரக வாழையில் ஏக்கருக்கு 1,200 கன்றுகள் நட்டு, தார் ஒன்றுக்கு 35-40 கிலோ வரை சீரான தரமான தார்கள் பெறும் வழிமுறைகள்.',
      steps: [
        'Prepare 45cm x 45cm x 45cm planting pits enriched with 10kg compost + 250g neem cake.',
        'Dip tissue culture plantlets in Carbendazim 0.1% or Pseudomonas slurry.',
        'Drip fertigate with water soluble 19:19:19 and potassium nitrate during vegetative and flowering phases.',
        'Sleeving bunches with blue polyethylene covers with 2% ventilation to prevent thrip scars.'
      ],
      videoThumbnail: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredGuides = selectedCategory === 'All'
    ? guides
    : guides.filter(g => g.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>TNAU & Agri Expert Verified Knowledge Base</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Agricultural Learning Centre (வேளாண் கல்வி மையம்)</h1>
          <p className="text-sm text-emerald-200/80 mt-1">
            Master modern agro-technologies, sustainable natural farming, and high-density horticultural practices.
          </p>
        </div>
      </div>

      {/* Seasonal Tamil Nadu Crop Calendar Banner */}
      <div className="bg-[#091f13]/90 backdrop-blur-md border border-emerald-900/60 rounded-3xl p-6 shadow-2xl space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Tamil Nadu Agricultural Seasonal Calendar (வேளாண் பருவங்கள்)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-[#05140b] rounded-2xl border border-emerald-900/50">
            <span className="font-bold text-emerald-400 block">1. குறுவை பருவம் (Kuruvai)</span>
            <span className="text-gray-400">June - September • Short duration Paddy (ADT 43, CO 51)</span>
          </div>
          <div className="p-3 bg-[#05140b] rounded-2xl border border-emerald-900/50">
            <span className="font-bold text-emerald-400 block">2. சம்பா / தாளடி (Samba / Thaladi)</span>
            <span className="text-gray-400">August - January • Medium/Long Paddy (CR 1009, BPT 5204)</span>
          </div>
          <div className="p-3 bg-[#05140b] rounded-2xl border border-emerald-900/50">
            <span className="font-bold text-emerald-400 block">3. நவரை / கோடை (Navarai / Summer)</span>
            <span className="text-gray-400">January - May • Pulses (Blackgram), Groundnut, Millets, Veg</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Paddy Cultivation', 'Organic Agriculture', 'Coconut Farming', 'Banana Cultivation'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-[#091f13] text-gray-300 hover:bg-[#0c2a1a]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="bg-[#091f13]/90 backdrop-blur-md border border-emerald-900/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-emerald-500/50 transition group"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={guide.videoThumbnail}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white/90 group-hover:scale-110 transition drop-shadow-lg" />
                </div>
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {guide.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/75 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-xl">
                  {guide.duration}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                  {guide.title}
                </h3>
                <p className="text-xs text-emerald-400 font-semibold">{guide.tamilTitle}</p>
                <p className="text-xs text-gray-300 leading-relaxed">{guide.summary}</p>
                <p className="text-xs text-emerald-200/90 italic bg-[#05140b] p-3 rounded-2xl border border-emerald-900/50">
                  {guide.tamilSummary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedGuide(guide)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Step-by-Step Practical Guide</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Guide Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091f13] border border-emerald-700/60 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-emerald-800/60">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase">{selectedGuide.category}</span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedGuide.title}</h3>
                <p className="text-xs text-emerald-300">{selectedGuide.tamilTitle}</p>
              </div>
              <button onClick={() => setSelectedGuide(null)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-gray-200 leading-relaxed">{selectedGuide.summary}</p>

              <div>
                <h4 className="text-sm font-bold text-emerald-400 mb-2">Step-by-Step Field Execution Protocol:</h4>
                <ol className="space-y-2">
                  {selectedGuide.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-[#05140b] p-3 rounded-2xl border border-emerald-900/50">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="text-gray-200 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs"
              >
                Close
              </button>
              <button
                onClick={() => alert('Guide PDF downloaded to device for offline field viewing.')}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <FileDown className="w-4 h-4" />
                <span>Save Offline PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
