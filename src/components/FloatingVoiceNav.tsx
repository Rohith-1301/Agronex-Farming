import React, { useState } from 'react';
import { Mic, MicOff, Volume2, X, Compass, Sparkles } from 'lucide-react';

interface FloatingVoiceNavProps {
  onNavigate: (tab: string) => void;
}

export default function FloatingVoiceNav({ onNavigate }: FloatingVoiceNavProps) {
  const [isListening, setIsListening] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);

  const startVoiceNav = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'ta-IN';
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => {
      setIsListening(true);
      setSpeechFeedback('பேசுங்கள்... e.g. "3D பண்ணை", "வளர்ச்சி", or "Weather"');
    };

    rec.onend = () => setIsListening(false);
    rec.onerror = () => {
      setIsListening(false);
      setSpeechFeedback(null);
    };

    rec.onresult = (e: any) => {
      const phrase = e.results[0][0].transcript.toLowerCase();
      setSpeechFeedback(`Recognized: "${phrase}"`);

      // Match navigation phrases
      if (phrase.includes('வளர்ச்சி') || phrase.includes('growth') || phrase.includes('stage') || phrase.includes('விதை')) {
        onNavigate('plant-growth');
      } else if (phrase.includes('பண்ணை') || phrase.includes('twin') || phrase.includes('3d') || phrase.includes('digital')) {
        onNavigate('digital-twin');
      } else if (phrase.includes('மருத்துவர்') || phrase.includes('doctor') || phrase.includes('disease') || phrase.includes('நோய்')) {
        onNavigate('crop-doctor');
      } else if (phrase.includes('பாசனம்') || phrase.includes('irrigation') || phrase.includes('தண்ணீர்') || phrase.includes('நீர்')) {
        onNavigate('irrigation');
      } else if (phrase.includes('வானிலை') || phrase.includes('weather') || phrase.includes('மழை')) {
        onNavigate('weather');
      } else if (phrase.includes('சந்தை') || phrase.includes('market') || phrase.includes('விலை') || phrase.includes('மண்டி')) {
        onNavigate('marketplace');
      } else if (phrase.includes('திட்டம்') || phrase.includes('scheme') || phrase.includes('மானியம்')) {
        onNavigate('schemes');
      } else if (phrase.includes('டாஷ்போர்டு') || phrase.includes('dashboard')) {
        onNavigate('dashboard');
      } else if (phrase.includes('லாபம்') || phrase.includes('profit') || phrase.includes('கணக்கு')) {
        onNavigate('profit-calc');
      } else {
        onNavigate('agro-ai');
      }

      setTimeout(() => setSpeechFeedback(null), 3000);
    };

    rec.start();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {speechFeedback && (
        <div className="bg-[#091f13] border border-emerald-500 text-white text-xs px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{speechFeedback}</span>
        </div>
      )}

      <button
        onClick={startVoiceNav}
        title="Voice Navigation (குரல் வழிசெலுத்தல்)"
        className={`flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl transition border font-bold text-xs ${
          isListening
            ? 'bg-red-600 text-white border-white animate-pulse'
            : 'bg-[#0b2716] text-emerald-300 border-emerald-500/60 hover:bg-emerald-600 hover:text-white'
        }`}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-emerald-400" />}
        <span className="hidden sm:inline">
          {isListening ? 'Listening...' : 'குரல் வழிசெலுத்தல் (Voice Nav)'}
        </span>
      </button>
    </div>
  );
}
