import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Section1Intro from './components/Section1Intro';
import Section2CrossyRoadMap from './components/Section2CrossyRoadMap';
import Section3SpotifyStory from './components/Section3SpotifyStory';
import DevConsoleModal from './components/DevConsoleModal';
import { Heart, MapPin, Phone, MessageSquare, Sparkles, ArrowUp } from 'lucide-react';
import { sound } from './utils/audio';

export default function App() {
  const [selectedOption, setSelectedOption] = useState('option1'); // 'option1' or 'option2'
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const scrollToTop = () => {
    sound.playTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 relative selection:bg-amber-300 selection:text-slate-900">
      
      {/* Sticky Navigation */}
      <Navbar 
        onOpenTerminal={() => setIsTerminalOpen(true)}
        selectedOption={selectedOption}
      />

      {/* Main Single Page Content */}
      <main className="flex-1">
        {/* Phần 1: Graduation Announcement */}
        <Section1Intro 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        {/* Phần 2: Hướng dẫn gửi xe (Crossy Road Map) */}
        <Section2CrossyRoadMap />

        {/* Phần 3: Những lời nhắn nhủ bạn muốn gửi đến mình */}
        <Section3SpotifyStory 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-900/10 py-12 px-4 sm:px-6 mt-16 text-center relative overflow-hidden">
        {/* Subtle decorative tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-3 bg-amber-200/60 border-l border-r border-dashed border-amber-400"></div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-sm">
            🎓
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
              Đinh Nguyễn Gia Bảo • HCMUS IT Graduate
            </h3>
            <p className="font-handwriting text-2xl sm:text-3xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              "Vậy là câu chuyện thời sinh viên của Bảo Đinh đến đây là hết rồi. Trước khi nói lời tạm biệt, cùng nhau lưu giữ những khoảnh khắc cuối cùng nhé! ^^"
            </p>
          </div>

          {/* Contact pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium text-slate-600">
            <a 
              href="tel:0358180131"
              className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>0358 180 131</span>
            </a>
            <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Messenger / Zalo: Bảo Đinh</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>227 Nguyễn Văn Cừ, P. Chợ Quán, TP.HCM</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>© Author: Bao Dinh</span>
            <div className="flex items-center gap-2">
              <span>Host on GitHub Pages</span>
              <span>•</span>
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="hover:text-emerald-500 font-mono transition-colors"
              >
                &gt;_ Dev Mode
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-slate-900/90 text-white shadow-xl hover:bg-slate-800 transition-all hover:scale-110 active:scale-95 border border-white/20"
        title="Lên đầu trang"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Dev Console Terminal Modal */}
      <DevConsoleModal 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

    </div>
  );
}
