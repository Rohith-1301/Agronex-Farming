import React, { useState, useRef, useEffect } from 'react';
import { useFarmer } from '../context/FarmerContext';
import { Language } from '../types';
import {
  Bot,
  Send,
  User,
  Sparkles,
  Globe,
  Mic,
  Volume2,
  RefreshCw,
  Layers,
  Sprout,
  Droplets,
  Coins,
  Landmark,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: 'irrigation' | 'fertilizer' | 'disease' | 'schemes' | 'profit' | 'general';
  fieldReferenced?: string;
}

export default function AgroAIAssistantPage() {
  const { profile, fields, selectedField, recentDiagnosis, fieldProfits } = useFarmer();
  const [activeLang, setActiveLang] = useState<Language>('ta');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Trilingual Welcome & Contextual Awareness
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `வணக்கம் ${profile.name}! நான் உங்கள் AGRONEX AGRI AI வேளாண் உதவியாளர். உங்கள் தஞ்சாவூர் நிலங்களின் 4 பண்ணை விவரங்கள் (நெல் 2 ஏக்கர், தென்னை 1.5 ஏக்கர், வாழை 3 ஏக்கர், மஞ்சள் 1 ஏக்கர்) மற்றும் நடப்பு மண் பரிசோதனை தகவல்கள் என்னிடம் இணைக்கப்பட்டுள்ளன. பாசனம், உர அளவு, பூச்சி மருந்து அல்லது அரசு மானியங்கள் பற்றி என்னிடம் கேளுங்கள்.`,
      timestamp: 'Just now',
      category: 'general'
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Quick Prompt Pills
  const promptPills = [
    {
      label: '💧 When should I water my paddy field?',
      query: 'When should I water my paddy field in Field 1?'
    },
    {
      label: '🍂 Why are leaves showing brown spots in Field 1?',
      query: 'Why are my paddy leaves turning brown in Field 1?'
    },
    {
      label: '🌱 What fertilizer dose is due for Field 1?',
      query: 'Which fertilizer dose should I apply for Field 1 Paddy?'
    },
    {
      label: '🏛️ Which govt schemes can I apply for my 7.5 acres?',
      query: 'Which government schemes and subsidies match my farm in Thanjavur?'
    },
    {
      label: '💰 What is my estimated profit from Field 1 Paddy?',
      query: 'What is my projected profit and yield from Field 1 Samba Paddy?'
    },
    {
      label: '🌴 How to prevent button shedding in Field 2 Coconut?',
      query: 'How to prevent button shedding in Field 2 Coconut Grove?'
    }
  ];

  // Context-Aware Response Engine
  const generateAIResponse = (userText: string): string => {
    const q = userText.toLowerCase();

    // 1. Irrigation Query
    if (q.includes('water') || q.includes('irriga') || q.includes('பாசனம்') || q.includes('தண்ணீர்')) {
      const f1 = fields.find((f) => f.id === 'field-1') || fields[0];
      return `💧 **Field #1 (Samba Paddy) Smart Irrigation Advisory:**
- **Current Status:** Your last irrigation was on **${f1.lastIrrigationDate}** (3 days ago).
- **Soil Moisture:** Currently at **${f1.soilMoisturePercent}%** in ${f1.soilType}.
- **Growth Stage:** **${f1.growthStage}** (Day ${f1.daysAfterSowing} DAS).
- **Recommendation:** Maintain shallow 2 to 3 cm water layer. Because Thanjavur weather forecast indicates a 40% probability of light showers today, do not flood the field. Next scheduled irrigation date is **${f1.nextIrrigationDate}**.`;
    }

    // 2. Disease / Pathology / Yellowing Query
    if (q.includes('brown') || q.includes('yellow') || q.includes('blast') || q.includes('நோய்') || q.includes('இலை')) {
      return `🍂 **Pathology Assessment for ${profile.district} Region:**
- **Crop Doctor Finding:** Recent visual scan identified early symptoms of **Paddy Blast (Magnaporthe oryzae)** with spindle-shaped elliptical lesions.
- **Cause:** High night humidity (>85%) and temperature between 20°C–24°C in Thanjavur delta.
- **Immediate Action:**
  1. *Organic:* Foliar spray of **Pseudomonas fluorescens @ 10g/L** or 5% Neem Seed Kernel Extract (NSKE).
  2. *Chemical:* Spray **Tricyclazole 75% WP @ 120 grams/acre** dissolved in 200 liters of water.
- **Warning:** Postpone any heavy un-split urea top dressing until lesions are checked.`;
    }

    // 3. Fertilizer Query
    if (q.includes('fertiliz') || q.includes('urea') || q.includes('dap') || q.includes('உரம்')) {
      const f1 = fields[0];
      return `🌱 **STCR Fertilizer Schedule for Field #1 (${f1.currentCrop}):**
- **Soil Baseline:** Available Nitrogen is **${f1.nitrogenKgHa} kg/ha**, Phosphorus **${f1.phosphorusKgHa} kg/ha**, Potassium **${f1.potassiumKgHa} kg/ha** with **pH ${f1.soilPh}**.
- **Stage (Tillering):** Apply second top dressing:
  - **Neem Coated Urea:** 35 kg per acre.
  - **MOP (Potash):** 15 kg per acre to build stem strength.
- **Application Method:** Top dress in the morning into thin water film; incorporate with a rotary conoweeder for 30% higher nitrogen use efficiency.`;
    }

    // 4. Government Schemes Query
    if (q.includes('scheme') || q.includes('subsidy') || q.includes('அரசு') || q.includes('திட்டம்')) {
      return `🏛️ **Official Schemes Matched to Your Profile (${profile.totalLandAreaAcres} Acres, ${profile.district}):**
1. **PM-KISAN:** As an agricultural landholder with Patta, you receive **₹6,000/year** DBT in 3 installments.
2. **Tamil Nadu Micro-Irrigation (PDMC):** For your Coconut (Field 2) and Banana (Field 3), you are eligible for **100% subsidy (Small/Marginal)** or **75% subsidy** on drip irrigation.
3. **PMFBY Crop Insurance:** Notified in Thanjavur district for Samba Paddy at only 1.5% farmer premium.
4. **SMAM Machinery Subsidy:** 40%–50% subsidy on rotavators, power tillers, and tractor implements.`;
    }

    // 5. Profit & Loss Query
    if (q.includes('profit') || q.includes('income') || q.includes('loss') || q.includes('revenue') || q.includes('லாபம்')) {
      const p1 = fieldProfits[0] || {
        expectedRevenue: 110400,
        totalCultivationCost: 45300,
        estimatedNetProfit: 65100,
        profitPerAcre: 32550
      };
      return `💰 **Field #1 Samba Paddy Projected Financial Economics:**
- **Area:** 2.0 Acres
- **Total Cultivation Cost:** ₹${p1.totalCultivationCost.toLocaleString()} (Seeds, puddling, fertilizers, weeding, harvest)
- **Expected Yield:** 48 Quintals (24 Quintals/acre)
- **MSP / Market Rate:** ₹2,300 per Quintal
- **Gross Revenue:** ₹${p1.expectedRevenue.toLocaleString()}
- **Estimated Net Profit:** **₹${p1.estimatedNetProfit.toLocaleString()}** (₹${p1.profitPerAcre.toLocaleString()} per acre).`;
    }

    // 6. Coconut Query
    if (q.includes('coconut') || q.includes('தென்னை') || q.includes('button')) {
      return `🌴 **Field #2 Coconut Grove (1.5 Acres) Health Advisory:**
- **Button Shedding Prevention:**
  1. Apply **Borax @ 50 grams per tree** along with 500g Magnesium Sulphate around the root ring basin (1.5m radius).
  2. Maintain regular drip irrigation (80–100 Litres/palm/day) to prevent drought stress.
  3. Apply 5 kg vermicompost and 2 kg neem cake per palm to suppress soil-borne pathogens.`;
    }

    // Default Fallback Context Response
    return `🌾 **AGRONEX Agronomic Intelligence:**
Thank you for your question. Based on your active farm profile in **${profile.district}, ${profile.state}** holding **${profile.totalLandAreaAcres} acres across ${fields.length} plots**:
- All recommendations are verified against TNAU and ICAR Crop Production Guides.
- You can ask specifically about:
  1. *Field 1 Paddy* water level, blast control, or urea dosage.
  2. *Field 2 Coconut* button shedding or drip emitter rate.
  3. *Field 3 Banana* sigatoka spray or bunch fertilizer.
  4. *Field 4 Turmeric* rhizome rot prevention.
  5. *Govt Schemes* application procedure for KCC or PMKSY drip subsidy.`;
  };

  const handleSendMessage = () => {
    if (!inputQuery.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQ = inputQuery;
    setInputQuery('');
    setIsTyping(true);

    // AI thinking delay
    setTimeout(() => {
      const responseText = generateAIResponse(currentQ);
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleVoiceReadout = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Strip markdown symbols for clean audio speech
      const cleanText = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. Header Banner matching Reference Screen 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/50 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 p-0.5 shadow-lg shadow-emerald-950/50">
            <div className="w-full h-full bg-[#031107] rounded-[14px] flex items-center justify-center text-emerald-400">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AGRI AI Assistant
            </h1>
            <p className="text-xs text-emerald-400/90 font-medium">
              Your Smart Farming Guide
            </p>
          </div>
        </div>

        {/* Language Selection Bar with Flag Icons matching Screen 3 */}
        <div className="flex items-center gap-1.5 bg-[#06180e] border border-emerald-900/80 p-1.5 rounded-2xl self-start sm:self-auto">
          {[
            { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
            { code: 'ta' as Language, label: 'Tamil', flag: '🇮🇳' },
            { code: 'hi' as Language, label: 'Hindi', flag: '🇮🇳' },
            { code: 'te' as Language, label: 'Telugu', flag: '🇮🇳' },
            { code: 'kn' as Language, label: 'Kannada', flag: '🇮🇳' },
            { code: 'ml' as Language, label: 'Malayalam', flag: '🇮🇳' }
          ].map((l) => (
            <button
              key={l.code}
              onClick={() => setActiveLang(l.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeLang === l.code
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Mascot Greeting Card matching Reference Screen 3 */}
      <div className="bg-[#05150c]/90 backdrop-blur-md border border-emerald-900/70 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-4xl shadow-inner shrink-0">
          🤖🌾
        </div>
        <div className="space-y-3 flex-1 text-center sm:text-left">
          <div className="bg-[#030e07] border border-emerald-800/80 rounded-2xl p-4 text-xs sm:text-sm text-gray-200 relative inline-block shadow-md">
            <span className="font-bold text-emerald-400 block mb-1">Hello Ramesh! 🌱</span>
            <span>How can I help you today? Ask anything about farming, soil nutrients, pests, or government schemes...</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            <button
              onClick={() => setInputQuery('When should I water my paddy field in Field 1?')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/40 text-emerald-300 text-xs font-semibold transition"
            >
              🍃 When to irrigate paddy?
            </button>
            <button
              onClick={() => setInputQuery('Which fertilizer dose should I apply for Field 1 Paddy?')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/40 text-emerald-300 text-xs font-semibold transition"
            >
              🌾 Which fertilizer to use?
            </button>
            <button
              onClick={() => setInputQuery('Which government schemes and subsidies match my farm in Thanjavur?')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/40 text-emerald-300 text-xs font-semibold transition"
            >
              🏛️ Government schemes?
            </button>
          </div>
        </div>
      </div>

      {/* 2. Connected Data Context Pill Banner */}
      <div className="bg-[#05170d] border border-emerald-800/80 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-300">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Active RAG Context:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/5 font-mono">
            Farmer: {profile.name} ({profile.district})
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/5 font-mono">
            Holding: {profile.totalLandAreaAcres} Acres • 4 Plots
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/5 font-mono">
            Live Weather: 31°C (Partly Cloudy)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
            TNAU & ICAR Knowledge Base Connected
          </span>
        </div>
      </div>

      {/* 3. Main Chat Container */}
      <div className="bg-[#06160c] border border-emerald-900/60 rounded-3xl shadow-2xl flex flex-col h-[650px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full bg-[#031107] rounded-[14px] flex items-center justify-center text-emerald-400">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
              )}

              <div
                className={`max-w-2xl rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-lg relative group ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-[#041208] border border-emerald-800/80 text-gray-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                <div
                  className={`flex items-center justify-between gap-4 mt-2 pt-2 border-t text-[10px] ${
                    msg.sender === 'user'
                      ? 'border-emerald-500/50 text-emerald-100'
                      : 'border-white/5 text-gray-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>

                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => handleVoiceReadout(msg.text)}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Speak</span>
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Bot className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-[#041208] border border-emerald-800/80 rounded-2xl p-4 text-xs text-gray-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>AGRI AI is synthesizing farm records & agronomic knowledge...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 border-t border-emerald-900/60 bg-[#030e07] flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
            Suggested Queries:
          </span>
          {promptPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuery(pill.query);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/40 text-gray-300 hover:text-emerald-300 text-[11px] whitespace-nowrap transition"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#041008] border-t border-emerald-900/60">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything about your crops, irrigation, fertilizer dosage, schemes or profit... (e.g. When should I water Field 1?)"
              className="flex-1 bg-[#020b06] border border-emerald-800 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center shadow-lg disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
