import React from 'react';
import { Phone, ExternalLink, ShieldCheck, Heart, Download, FileSpreadsheet, GitBranch, Github } from 'lucide-react';

export default function Footer({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <footer className="bg-[#030d07] border-t border-emerald-950/80 text-xs text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1M1B Green Internship & GitHub Project Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#061d11] to-emerald-950/40 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-black text-sm">1M1B Green Internship (YIRP) Weekly Tracker</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  Mentor: Paramjeet
                </span>
              </div>
              <p className="text-gray-400 text-[11px] mt-0.5">
                Official internship progress workbook with weekly milestones, architecture, and live repository synchronization.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://github.com/Rohith-1301/Agronex-Farming"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/10 shadow-sm"
            >
              <Github className="w-4 h-4 text-emerald-400" />
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>

            <a
              href="/Rohith_AGRONEX_1M1B_Tracker.xlsx"
              download="Rohith_AGRONEX_1M1B_Tracker.xlsx"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs transition shadow-lg shadow-emerald-900/40"
            >
              <Download className="w-4 h-4" />
              <span>Download Tracker (.XLSX)</span>
            </a>

            <a
              href="/Rohith_YIRP_Weekly_Tracker.csv"
              download="Rohith_YIRP_Weekly_Tracker.csv"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-300 font-semibold text-xs transition border border-white/10"
              title="Download Weekly Milestones as CSV"
            >
              <span>CSV</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          {/* Brand Info with AGRONEX Logo */}
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-[#020a05] border border-emerald-500/40 p-0.5 shadow-md">
                <img
                  src="/agronex-logo.jpg"
                  alt="AGRONEX Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-wider font-mono">
                  AGRONEX
                </span>
                <span className="text-[10px] text-emerald-400 font-bold ml-2 uppercase">
                  AI PRO
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Smarter Farming • Greener Tomorrow. Empowering farmers across India with precision multi-field telemetry, AI crop pathology, and verified government welfare schemes.
            </p>
          </div>

          {/* Quick Helpline Badge */}
          <div className="flex items-center gap-4 bg-[#05140b] p-4 rounded-2xl border border-emerald-900/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">
                Kisan Call Centre (Toll-Free 24x7)
              </span>
              <a href="tel:18001801551" className="text-emerald-400 font-black text-base hover:underline">
                1800-180-1551
              </a>
            </div>
          </div>

          {/* Six Module Quick Links */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition text-[11px]"
            >
              1. Dashboard
            </button>
            <button
              onClick={() => onNavigate('crop-selection')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition text-[11px]"
            >
              2. Crop Selection
            </button>
            <button
              onClick={() => onNavigate('crop-doctor')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition text-[11px]"
            >
              3. Crop Doctor
            </button>
            <button
              onClick={() => onNavigate('agro-ai')}
              className="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 hover:text-white transition text-[11px] font-bold"
            >
              4. AGRI AI
            </button>
            <button
              onClick={() => onNavigate('schemes')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition text-[11px]"
            >
              5. Schemes (20)
            </button>
            <button
              onClick={() => onNavigate('profit-calc')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition text-[11px]"
            >
              6. Profit & Loss
            </button>
          </div>
        </div>

        {/* Bottom Credits & Verification */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} <strong>AGRONEX</strong>. Built for Indian Farmers with ICAR & TNAU Agricultural Datasets.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cyber Compliant & Data Protected</span>
            </span>
            <span>All India Coverage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
