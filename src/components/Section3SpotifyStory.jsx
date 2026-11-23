import React, { useState, useEffect } from 'react';
import { 
  Heart, Send, Download, Sparkles, ChevronLeft, ChevronRight, 
  RotateCcw, Share2, MessageCircle, Calendar, CheckCircle2, 
  User, ShieldCheck, EyeOff, Tag, Clock, MapPin, ZoomIn, PartyPopper
} from 'lucide-react';
import { sound } from '../utils/audio';
import { launchConfetti } from '../utils/confetti';

export default function Section3SpotifyStory({ selectedOption, setSelectedOption }) {
  // 5 Steps: 0 = Lễ tốt nghiệp nào?, 1 = Bạn là?, 2 = Lời nhắn, 3 = Lời cảm ơn, 4 = Thư mời
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form State
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [anonymousTitle, setAnonymousTitle] = useState('Người bạn giấu tên 🕶️');
  const [relationTag, setRelationTag] = useState('Bạn bè tri kỷ 🌻');
  const [vibeTag, setVibeTag] = useState('Đến chung vui hết mình 🥳');
  const [message, setMessage] = useState('');
  const [chosenSticker, setChosenSticker] = useState('🎓');
  const [hasSentWish, setHasSentWish] = useState(false);

  // Wishes List (Loaded from localStorage or initial list)
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('baodinh_wishes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 1,
        displayName: "Người bạn giấu tên 🕶️",
        isAnon: true,
        tag: "Đồng đội chạy đồ án",
        vibe: "Sẵn sàng làm phó nháy 📸",
        text: "Chúc mừng Bảo Đinh tốt nghiệp! 4 năm thâu đêm làm đồ án đã được đền đáp xứng đáng. Ra trường sự nghiệp thăng hoa nhé!",
        sticker: "🚀",
        time: "Vừa xong"
      },
      {
        id: 2,
        displayName: "Bạn học KHTN (Ẩn danh)",
        isAnon: true,
        tag: "Bạn cùng khóa IT",
        vibe: "Đến chung vui hết mình 🥳",
        text: "Nhất định ngày 26/11 sẽ đến quẩy banh nóc sân trường cùng Bảo! Chúc mừng tân cử nhân!",
        sticker: "💐",
        time: "15 phút trước"
      },
      {
        id: 3,
        displayName: "Fan cứng giấu mặt 🕵️",
        isAnon: true,
        tag: "Người dõi theo thanh xuân",
        vibe: "Mang hoa siêu to 💐",
        text: "Chúc mừng Bảo Đinh! Tự hào về hành trình 4 năm đại học của bạn rất nhiều!",
        sticker: "💖",
        time: "1 giờ trước"
      }
    ];
  });

  // Save wishes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('baodinh_wishes', JSON.stringify(wishes));
    } catch {}
  }, [wishes]);

  const TOTAL_SLIDES = 5;

  const nextSlide = () => {
    sound.playTap();
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(s => s + 1);
    }
  };

  const prevSlide = () => {
    sound.playTap();
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
    }
  };

  const jumpToSlide = (idx) => {
    sound.playTap();
    setCurrentSlide(idx);
  };

  // Submit wish from Slide 3
  const handleSubmitWish = (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) {
      nextSlide();
      return;
    }

    sound.playSuccess();
    launchConfetti();

    // Determine final displayed name
    let finalName = "";
    if (isAnonymous) {
      finalName = anonymousTitle;
    } else {
      finalName = senderName.trim() ? senderName.trim() : "Người bạn giấu tên 🕶️";
    }

    const newWish = {
      id: Date.now(),
      displayName: finalName,
      isAnon: isAnonymous || !senderName.trim(),
      tag: relationTag,
      vibe: vibeTag,
      text: message.trim(),
      sticker: chosenSticker,
      time: "Vừa xong"
    };

    setWishes(prev => [newWish, ...prev]);
    setHasSentWish(true);

    // Advance to Slide 4 (Lời cảm ơn)
    setTimeout(() => {
      setCurrentSlide(3);
    }, 600);
  };

  // Quick wish chip presets
  const quickWishes = [
    "🎓 Chúc mừng cử nhân IT Đinh Nguyễn Gia Bảo!",
    "🚀 Ra trường lương nghìn đô, vạn sự hanh thông!",
    "📸 Hẹn ngày đó có mặt chụp ảnh cháy máy!",
    "💖 Tự hào về bạn rất nhiều!"
  ];

  // Graduation card image according to option
  const invitationImage = selectedOption === 'option1' ? 'graduation_01.png' : 'graduation_02.png';
  const invitationTitle = selectedOption === 'option1' 
    ? 'Lễ Trường • Thứ 5, 26.11.2026' 
    : 'Lễ Khoa CNTT • Chủ Nhật, 06.12.2026';

  return (
    <section id="part3" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          Interactive Story & Guestbook
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Những Lời Nhắn Nhủ Bạn Muốn Gửi Đến Mình
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
          Thực hiện qua 5 bước để chọn buổi tham dự, gửi lời chúc (hỗ trợ ẩn danh), 
          nhận lời tri ân và mở tấm thiệp mời chính thức nhé!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: The 9:16 Interactive Story Device (Phone Mockup) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[9/16] bg-slate-950 rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 shadow-slate-900/40 flex flex-col justify-between overflow-hidden">
            
            {/* Phone Speaker Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-40 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-1.5 bg-slate-800 rounded-full"></div>
            </div>

            {/* Top 5 Segmented Progress Bars (1, 2, 3, 4, 5) */}
            <div className="relative z-30 pt-6 px-3 flex items-center gap-1.5 select-none">
              {[0, 1, 2, 3, 4].map((idx) => {
                const isPassed = idx < currentSlide;
                const isCurrent = idx === currentSlide;

                return (
                  <div
                    key={idx}
                    onClick={() => jumpToSlide(idx)}
                    className="flex-1 h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all"
                    title={`Bước ${idx + 1}`}
                  >
                    <div 
                      className={`h-full transition-all duration-300 ${
                        isPassed ? 'w-full bg-white' : isCurrent ? 'w-full bg-amber-400' : 'w-0'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Story Header */}
            <div className="relative z-30 px-3 pt-2.5 flex items-center justify-between text-white select-none">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 flex items-center justify-center font-bold text-xs shadow">
                  🎓
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                    <span>Bảo Đinh</span>
                    <span className="text-[10px] bg-white/20 text-amber-300 font-mono px-2 py-0.2 rounded-full">
                      Trang {currentSlide + 1}/5
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {currentSlide === 0 && "1. Bạn sẽ đến dự lễ nào?"}
                    {currentSlide === 1 && "2. Bạn là ai?"}
                    {currentSlide === 2 && "3. Lời nhắn gửi đến Bảo"}
                    {currentSlide === 3 && "4. Lời cảm ơn từ Bảo Đinh"}
                    {currentSlide === 4 && "5. Thư mời chính thức"}
                  </div>
                </div>
              </div>

              {/* Step dots shortcut */}
              <div className="text-[11px] font-mono font-bold text-slate-400">
                #{currentSlide + 1}
              </div>
            </div>

            {/* Circular Instagram-style Navigation Arrows on Left and Right Sides */}
            {currentSlide > 0 && (
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-xl flex items-center justify-center transition-all absolute left-2.5 top-1/2 -translate-y-1/2 z-40 hover:scale-110 active:scale-95 border border-slate-200/50"
                title="Quay lại bước trước (<)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {currentSlide < TOTAL_SLIDES - 1 && (
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-xl flex items-center justify-center transition-all absolute right-2.5 top-1/2 -translate-y-1/2 z-40 hover:scale-110 active:scale-95 border border-slate-200/50"
                title="Tiếp tục sang bước tiếp (>)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Story Content Area */}
            <div className="relative z-20 flex-1 flex flex-col justify-center px-4 py-2 select-none overflow-y-auto scrollbar-none">
              
              {/* ============================================================== */}
              {/* TRANG 1: Bạn sẽ đến dự lễ tốt nghiệp nào? */}
              {/* ============================================================== */}
              {currentSlide === 0 && (
                <div className="space-y-4 animate-fadeIn text-white text-center">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow">
                      Bước 1 / 5 • Chọn Buổi Tham Dự
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold mt-3 leading-tight">
                      Bạn Sẽ Đến Dự Lễ Tốt Nghiệp Nào? 🎓
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Chọn buổi bạn dự định đến chụp ảnh cùng Bảo nhé:
                    </p>
                  </div>

                  <div className="space-y-3 pt-1 text-left">
                    {/* Option 1 Card */}
                    <div
                      onClick={() => {
                        sound.playTap();
                        setSelectedOption('option1');
                      }}
                      className={`cursor-pointer rounded-2xl p-3.5 border-2 transition-all relative ${
                        selectedOption === 'option1'
                          ? 'bg-blue-900/60 border-blue-400 shadow-lg shadow-blue-500/30 scale-[1.02]'
                          : 'bg-white/10 border-white/15 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[10px] font-mono font-bold text-blue-300 uppercase">
                            Option 1 • Lễ Trường
                          </div>
                          <div className="text-sm font-bold text-white mt-0.5">
                            Thứ 5 - Ngày 26.11.2026
                          </div>
                          <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>11:00 am - 12:30 pm</span>
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-rose-400" />
                            <span>Sân trường KHTN - 227 Nguyễn Văn Cừ</span>
                          </div>
                        </div>
                        {selectedOption === 'option1' && (
                          <div className="p-1 rounded-full bg-blue-500 text-white shadow">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Option 2 Card */}
                    <div
                      onClick={() => {
                        sound.playTap();
                        setSelectedOption('option2');
                      }}
                      className={`cursor-pointer rounded-2xl p-3.5 border-2 transition-all relative ${
                        selectedOption === 'option2'
                          ? 'bg-amber-900/60 border-amber-400 shadow-lg shadow-amber-500/30 scale-[1.02]'
                          : 'bg-white/10 border-white/15 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                            Option 2 • Lễ Khoa CNTT
                          </div>
                          <div className="text-sm font-bold text-white mt-0.5">
                            Chủ Nhật - Ngày 06.12.2026
                          </div>
                          <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>Buổi sáng / Trưa</span>
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-rose-400" />
                            <span>Sân trường & Giảng đường Khoa CNTT</span>
                          </div>
                        </div>
                        {selectedOption === 'option2' && (
                          <div className="p-1 rounded-full bg-amber-500 text-white shadow">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={nextSlide}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all mt-2"
                  >
                    <span>Tiếp tục bước 2</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ============================================================== */}
              {/* TRANG 2: Bạn là? (Họ tên / Biệt danh / Ẩn danh / Biến tấu) */}
              {/* ============================================================== */}
              {currentSlide === 1 && (
                <div className="space-y-3.5 animate-fadeIn text-white text-center">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-blue-500 text-white px-3 py-1 rounded-full shadow">
                      Bước 2 / 5 • Thông Tin Của Bạn
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold mt-2 leading-tight">
                      Bạn Là Ai Thế? ✨
                    </h3>
                    <p className="text-xs text-slate-300">
                      Bật mí một chút danh xưng để Bảo tiện xưng hô nhé:
                    </p>
                  </div>

                  <div className="space-y-2.5 text-left text-xs bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                    
                    {/* Tùy chọn Ẩn danh Toggle */}
                    <div 
                      onClick={() => {
                        sound.playTap();
                        setIsAnonymous(!isAnonymous);
                      }}
                      className={`cursor-pointer p-2 rounded-xl border flex items-center justify-between transition-all ${
                        isAnonymous 
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200' 
                          : 'bg-black/30 border-white/15 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">🕶️</span>
                        <div>
                          <div className="font-bold text-white text-xs">Gửi Dưới Dạng Ẩn Danh</div>
                          <div className="text-[10px] text-slate-300">Giấu tên thật để tạo bất ngờ</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isAnonymous ? 'bg-amber-400 border-amber-400 text-slate-900' : 'border-slate-500'
                      }`}>
                        {isAnonymous && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Họ tên hoặc Danh xưng ẩn danh */}
                    {isAnonymous ? (
                      <div>
                        <label className="text-[10px] font-mono uppercase text-amber-300 font-bold block mb-1">
                          Chọn danh xưng ẩn danh:
                        </label>
                        <select
                          value={anonymousTitle}
                          onChange={(e) => setAnonymousTitle(e.target.value)}
                          className="w-full bg-black/60 border border-amber-400/50 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
                        >
                          <option value="Người bạn giấu tên 🕶️">Người bạn giấu tên 🕶️</option>
                          <option value="Đồng đội IT bí mật 💻">Đồng đội IT bí mật 💻</option>
                          <option value="Người dõi theo thanh xuân 🌻">Người dõi theo thanh xuân 🌻</option>
                          <option value="Fan cứng giấu mặt 🕵️">Fan cứng giấu mặt 🕵️</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="text-[10px] font-mono uppercase text-amber-300 font-bold block mb-1">
                          Họ tên / Biệt danh của bạn:
                        </label>
                        <input
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="VD: Tuấn KHTN, Bạn thân..."
                          className="w-full bg-black/50 border border-white/20 rounded-xl px-3 py-1.5 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    )}

                    {/* Biến tấu: Mối quan hệ với Bảo */}
                    <div>
                      <label className="text-[10px] font-mono uppercase text-amber-300 font-bold block mb-1">
                        Mối quan hệ với Bảo Đinh:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        {[
                          "Bạn cùng khóa KHTN 🎓",
                          "Đồng đội chạy đồ án 💻",
                          "Bạn bè tri kỷ 🌻",
                          "Người thân gia đình 🏠"
                        ].map((rel) => (
                          <button
                            key={rel}
                            type="button"
                            onClick={() => setRelationTag(rel)}
                            className={`p-1.5 rounded-lg border text-left truncate transition-all ${
                              relationTag === rel
                                ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow'
                                : 'bg-black/30 text-slate-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {rel}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Biến tấu: Vibe khi đến */}
                    <div>
                      <label className="text-[10px] font-mono uppercase text-amber-300 font-bold block mb-1">
                        Vibe bạn sẽ mang đến:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        {[
                          "Làm phó nháy 📸",
                          "Mang hoa siêu to 💐",
                          "Bao trà sữa 🧋",
                          "Quẩy hết mình 🥳"
                        ].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setVibeTag(v)}
                            className={`p-1.5 rounded-lg border text-left truncate transition-all ${
                              vibeTag === v
                                ? 'bg-blue-500 text-white font-bold border-blue-400 shadow'
                                : 'bg-black/30 text-slate-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={prevSlide}
                      className="w-1/3 py-2 rounded-xl bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1 hover:bg-white/25 active:scale-95"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Lùi lại
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-2/3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow-lg hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>Tiếp: Viết lời chúc</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* TRANG 3: Lời nhắn bạn muốn gửi đến Bảo là? */}
              {/* ============================================================== */}
              {currentSlide === 2 && (
                <div className="space-y-3 animate-fadeIn text-white text-center">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-rose-500 text-white px-3 py-1 rounded-full shadow">
                      Bước 3 / 5 • Lời Nhắn Nhủ
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold mt-2 leading-tight">
                      Lời Nhắn Gửi Đến Bảo 💌
                    </h3>
                    <p className="text-xs text-slate-300">
                      Gửi lời chúc mừng hoặc vài dòng kỷ niệm tới Bảo nhé:
                    </p>
                  </div>

                  <form 
                    onSubmit={handleSubmitWish}
                    className="space-y-2 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-left text-xs"
                  >
                    <div>
                      <label className="text-[10px] font-mono uppercase text-amber-300 font-bold block mb-1">
                        Nội dung lời nhắn nhủ:
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Chúc mừng Bảo Đinh tốt nghiệp! 4 năm qua thật tuyệt vời..."
                        className="w-full bg-black/50 border border-white/20 rounded-xl p-2.5 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-amber-400 resize-none"
                      />
                    </div>

                    {/* Quick chips presets */}
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono mb-1">Gợi ý nhanh:</div>
                      <div className="flex flex-wrap gap-1">
                        {quickWishes.map((q, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setMessage(q)}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 truncate max-w-full text-left"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sticker Selector & Submit */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex gap-1">
                        {['🎓', '🚀', '💐', '☕', '💖', '🎉'].map((stk) => (
                          <button
                            key={stk}
                            type="button"
                            onClick={() => setChosenSticker(stk)}
                            className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                              chosenSticker === stk ? 'bg-amber-400 text-slate-900 scale-110 shadow' : 'bg-white/10 text-white'
                            }`}
                          >
                            {stk}
                          </button>
                        ))}
                      </div>

                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all"
                      >
                        <Send className="w-3 h-3" />
                        <span>Gửi & Tiếp</span>
                      </button>
                    </div>

                    {hasSentWish && (
                      <div className="text-center text-emerald-400 text-[11px] font-bold animate-pulse pt-1">
                        🎉 Đã lưu lời chúc thành công vào Sổ Lưu Bút!
                      </div>
                    )}
                  </form>

                  <div className="flex justify-between items-center text-xs text-slate-400 px-1">
                    <button 
                      onClick={prevSlide}
                      className="hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      <ChevronLeft className="w-3 h-3" /> Quay lại sửa
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] font-bold"
                    >
                      Bỏ qua & Xem cảm ơn <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* TRANG 4: Lời cảm ơn từ Bảo Đinh */}
              {/* ============================================================== */}
              {currentSlide === 3 && (
                <div className="space-y-4 animate-fadeIn text-white text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-1 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🌻</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow">
                      Bước 4 / 5 • Tri Ân
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold mt-2 leading-tight">
                      Lời Cảm Ơn Chân Thành
                    </h3>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs text-slate-200 leading-relaxed font-sans text-left space-y-2">
                    <p>
                      "Cảm ơn bạn rất nhiều vì đã dành thời gian quý báu ghé thăm và gửi gắm những lời chúc ấm áp cho Bảo!"
                    </p>
                    <p>
                      Bảo Đinh rất hạnh phúc và vinh dự vì chúng ta đã có cơ hội gặp gỡ và đồng hành cùng nhau trong những năm tháng thanh xuân đại học rực rỡ tại 227 Nguyễn Văn Cừ.
                    </p>
                    <p className="text-amber-300 font-semibold">
                      Đừng quên lịch hẹn chúng ta đã chọn nhé! Tấm thiệp mời chính thức đang đợi bạn ở trang tiếp theo. ^^
                    </p>
                  </div>

                  <div className="font-handwriting text-2xl text-amber-300">
                    — Bảo Đinh (Đinh Nguyễn Gia Bảo) —
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={prevSlide}
                      className="w-1/3 py-2 rounded-xl bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1 hover:bg-white/25 active:scale-95"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Lùi lại
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>Mở Thư Mời 🎟️</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* TRANG 5: Thư mời chính thức */}
              {/* ============================================================== */}
              {currentSlide === 4 && (
                <div className="space-y-2.5 animate-fadeIn text-white text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold">
                    <Sparkles className="w-3 h-3" />
                    Bước 5 / 5 • Thư Mời Tốt Nghiệp Chính Thức
                  </div>

                  {/* The Invitation Card Image */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-white max-h-[300px] flex items-center justify-center">
                    <img
                      src={invitationImage}
                      alt="Thư mời tốt nghiệp Bảo Đinh"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[10px] font-mono font-bold">
                      {selectedOption === 'option1' ? 'LỄ TRƯỜNG' : 'LỄ KHOA'}
                    </div>
                  </div>

                  <div className="text-[11px] text-amber-300 font-semibold">
                    {invitationTitle}
                  </div>

                  {/* Actions inside story */}
                  <div className="flex items-center justify-center gap-2 pt-0.5" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={invitationImage}
                      download={`Thu_Moi_Tot_Nghiep_BaoDinh_${selectedOption}.png`}
                      onClick={() => sound.playSuccess()}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Tải thiệp về
                    </a>

                    <button
                      onClick={() => {
                        sound.playSuccess();
                        launchConfetti();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs flex items-center gap-1 border border-white/20 active:scale-95"
                    >
                      <PartyPopper className="w-3.5 h-3.5 text-amber-300" />
                      <span>Pháo hoa</span>
                    </button>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={prevSlide}
                      className="text-slate-400 hover:text-white text-[11px] flex items-center gap-1 mx-auto"
                    >
                      <ChevronLeft className="w-3 h-3" /> Quay lại xem các bước trước
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Story Footer (Quick Slide Dots & Replay) */}
            <div className="relative z-30 px-3 pb-3 pt-1 flex items-center justify-between text-slate-400 text-xs border-t border-white/10 select-none">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map(idx => (
                  <button
                    key={idx}
                    onClick={() => jumpToSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlide === idx ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => jumpToSlide(0)}
                  className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white"
                  title="Xem lại từ đầu"
                >
                  <RotateCcw className="w-3 h-3" />
                  Xem lại
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Sổ Lưu Bút Kỷ Niệm (Hiển thị lời chúc dưới dạng ẩn danh) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Quick Option Switcher for Invitation Card Preview */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 paper-shadow flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase">
                Chế độ xem thư mời ở Trang 5:
              </div>
              <div className="font-display font-bold text-slate-800 text-sm mt-0.5">
                {selectedOption === 'option1' ? 'Option 1: Lễ trường (26.11.2026)' : 'Option 2: Lễ Khoa (06.12.2026)'}
              </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => {
                  sound.playTap();
                  setSelectedOption('option1');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedOption === 'option1'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Option 1
              </button>
              <button
                onClick={() => {
                  sound.playTap();
                  setSelectedOption('option2');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedOption === 'option2'
                    ? 'bg-amber-500 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Option 2
              </button>
            </div>
          </div>

          {/* Sổ Lưu Bút Kỷ Niệm (Wish Wall - Hiển thị dưới dạng ẩn danh) */}
          <div className="bg-[#fcfbf7] rounded-3xl p-6 border border-amber-900/10 paper-shadow">
            
            <div className="flex items-center justify-between mb-4 border-b border-amber-900/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📌</span>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-lg">
                    Sổ Lưu Bút Kỷ Niệm ({wishes.length})
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Những lời nhắn nhủ (hỗ trợ ẩn danh) gửi trao đến Bảo Đinh
                  </p>
                </div>
              </div>

              <button
                onClick={() => jumpToSlide(2)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors flex items-center gap-1 shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Gửi lời chúc
              </button>
            </div>

            {/* List of wishes formatted in anonymous-friendly cards */}
            <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-sm relative group hover:border-amber-300 transition-all"
                >
                  {/* Decorative tape top right */}
                  <div className="absolute -top-1.5 right-4 w-12 h-4 bg-amber-200/60 rotate-2 border-l border-r border-dashed border-amber-400"></div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{w.sticker}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-bold text-slate-800 text-sm">
                            {w.displayName}
                          </span>
                          {w.isAnon && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-mono font-bold px-1.5 py-0.2 rounded">
                              Ẩn danh
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-sans mt-0.5">
                          <span>{w.tag}</span>
                          {w.vibe && <span>• {w.vibe}</span>}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {w.time}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pl-1 border-l-2 border-amber-300/80 my-1">
                    "{w.text}"
                  </p>
                </div>
              ))}
            </div>

            {/* Footer tip */}
            <div className="mt-4 pt-3 border-t border-amber-900/10 text-center text-xs text-slate-400 font-handwriting text-base">
              "Mỗi lời chúc (dù giấu tên hay công khai) đều là món quà quý giá với Bảo!"
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
