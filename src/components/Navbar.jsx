import React, { useState } from 'react';
import { Terminal, Volume2, VolumeX, Sparkles, MapPin, BookOpen, MessageSquareHeart } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({ onOpenTerminal, selectedOption }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    sound.toggleLoFiMusic((playing) => {
      setIsPlayingMusic(playing);
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#faf8f3]/85 border-b border-amber-900/10 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#part1" 
          className="flex items-center gap-2.5 group cursor-pointer"
          onClick={() => sound.playTap()}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            🎓
          </div>
          <div>
            <div className="font-display font-bold text-slate-800 text-base leading-tight group-hover:text-blue-600 transition-colors">
              Bảo Đinh
            </div>
            <div className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              HCMUS • 2026
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          <a
            href="#part1"
            onClick={() => sound.playTap()}
            className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-blue-50/80 transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            1. Graduation Announcement
          </a>

          <a
            href="#part2"
            onClick={() => sound.playTap()}
            className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-blue-50/80 transition-all flex items-center gap-1.5"
          >
            <MapPin className="w-4 h-4 text-emerald-500" />
            2. Hướng dẫn gửi xe & Sơ đồ KHTN
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Lo-Fi Music Button */}
          <button
            onClick={toggleMusic}
            title={isPlayingMusic ? "Tắt nhạc lofi" : "Bật nhạc lofi chúc mừng"}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
              isPlayingMusic 
                ? 'bg-amber-100/90 text-amber-900 border-amber-300 shadow-sm'
                : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className={`inline-block text-sm ${isPlayingMusic ? 'animate-spin' : ''}`}>💿</span>
            <span className="hidden sm:inline">Lo-fi Beat</span>
            {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5 text-amber-700" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {/* Dev Console Easter Egg */}
          <button
            onClick={() => {
              sound.playTap();
              onOpenTerminal();
            }}
            title="Chế độ Lập trình viên (IT Flex)"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-slate-900 text-emerald-400 hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dev Mode</span>
            <span className="text-slate-400">&gt;_</span>
          </button>
        </div>

      </div>
    </header>
  );
}
