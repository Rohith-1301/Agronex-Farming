import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  Activity,
  Droplets,
  Thermometer,
  Sparkles,
  Layers,
  ChevronDown,
  ShieldCheck,
  Bot,
  Compass,
  ShoppingBag
} from 'lucide-react';

interface HeroVideoSectionProps {
  onNavigate: (tab: string) => void;
  onExploreVirtualFarm: () => void;
}

export default function HeroVideoSection({
  onNavigate,
  onExploreVirtualFarm
}: HeroVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden bg-black text-white">
      {/* Background High-Definition Cinematic Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/hero-farm-video.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.82] contrast-[1.05]"
        />

        {/* Cinematic Vignette & Atmospheric Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#051109] via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051109]/90 via-[#051109]/50 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-8 flex-1 flex flex-col justify-between">
        {/* Top-Mid Grid: Headline & Floating Real-Time Telemetry Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-bold tracking-wide uppercase shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Next-Gen Agri Platform</span>
            </div>

            {/* Main Headline matching user mockup */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-xl">
              Agriculture <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-lime-400">
                Reimagined
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-xl drop-shadow-md">
              Empowering Indian farmers with AI, smart technology, and intelligent farming solutions.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-black font-extrabold text-sm shadow-xl shadow-green-950/80 transition transform hover:-translate-y-0.5"
              >
                <span>Explore Smart Farming</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => onNavigate('schemes')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-400/50 text-emerald-300 font-bold text-sm shadow-lg transition transform hover:-translate-y-0.5"
              >
                <span>🏛️ Govt Schemes (20 Schemes)</span>
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm shadow-lg transition transform hover:-translate-y-0.5"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating Glassmorphism Telemetry Cards */}
          <div className="lg:col-span-5 flex flex-col items-end space-y-3.5">
            {/* 1. Crop Health Card */}
            <div className="w-full max-w-xs bg-black/45 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl transition hover:border-emerald-400/50">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-300">Crop Health</span>
                </div>
                <span className="text-xl font-black text-emerald-400">92%</span>
              </div>
              {/* Animated Wave SVG */}
              <svg className="w-full h-8 text-emerald-400" viewBox="0 0 200 40" fill="none">
                <path
                  d="M0 25 Q25 10 50 20 T100 15 T150 28 T200 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 2. Soil Moisture Card */}
            <div className="w-full max-w-xs bg-black/45 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl transition hover:border-sky-400/50">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-300">Soil Moisture</span>
                </div>
                <span className="text-xl font-black text-sky-400">78%</span>
              </div>
              <svg className="w-full h-8 text-sky-400" viewBox="0 0 200 40" fill="none">
                <path
                  d="M0 20 Q30 32 60 18 T120 24 T170 12 T200 22"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 3. Temperature Card */}
            <div className="w-full max-w-xs bg-black/45 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl transition hover:border-amber-400/50">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-300">Temperature</span>
                </div>
                <span className="text-xl font-black text-amber-400">28°C</span>
              </div>
              <svg className="w-full h-8 text-amber-400" viewBox="0 0 200 40" fill="none">
                <path
                  d="M0 22 Q40 8 80 20 T140 16 T180 26 T200 18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Video Controls Pill */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={togglePlay}
                className="px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 text-xs text-gray-300 hover:text-white transition flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause Video' : 'Play Video'}</span>
              </button>

              <button
                onClick={toggleMute}
                className="px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 text-xs text-gray-300 hover:text-white transition flex items-center gap-1.5"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clean Scroll Indicator */}
        <div className="pt-8 pb-2 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400" />
          <span>Scroll down to explore real-time field intelligence</span>
        </div>
      </div>

      {/* Video Modal popup when clicking "Watch Video" */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-black border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-emerald-600 transition"
            >
              ✕
            </button>
            <video
              src="/hero-farm-video.mp4"
              controls
              autoPlay
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
