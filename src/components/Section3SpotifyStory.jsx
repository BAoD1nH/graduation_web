import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Send, Download, Sparkles, ChevronLeft, ChevronRight, 
  Play, Pause, RotateCcw, Share2, MessageCircle, Calendar,
  Volume2, VolumeX, CheckCircle, Smile
} from 'lucide-react';
import { sound } from '../utils/audio';
import { launchConfetti } from '../utils/confetti';

export default function Section3SpotifyStory({ selectedOption, setSelectedOption }) {
  const [currentSlide, setCurrentSlide] = useState(0); // 0, 1, 2, 3, 4 (5 slides total)
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Wish form state
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [chosenSticker, setChosenSticker] = useState('🎓');
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: "Team Đồ Án KHTN",
      text: "Chúc mừng Bảo Đinh tốt nghiệp! Đồ án 10 điểm, ra trường làm việc lương ngàn đô nhé!",
      sticker: "🚀",
      time: "Vừa xong"
    },
    {
      id: 2,
      name: "Hội Bạn Thân",
      text: "Nhất định ngày 26/11 sẽ đến quẩy banh nóc sân trường cùng Bảo!",
      sticker: "💐",
      time: "10 phút trước"
    },
    {
      id: 3,
      name: "Người Bạn 4 Năm",
      text: "Chúc mừng cử nhân IT Đinh Nguyễn Gia Bảo! Tự hào về bạn rất nhiều!",
      sticker: "💖",
      time: "1 giờ trước"
    }
  ]);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Floating reactions on Slide 2
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  const SLIDE_DURATION = 7000; // 7 seconds per slide
  const TOTAL_SLIDES = 5;

  // Auto progression timer
  useEffect(() => {
    if (isPaused) return;

    const interval = 50; // update progress every 50ms
    const step = (interval / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentSlide < TOTAL_SLIDES - 1) {
            setCurrentSlide(c => c + 1);
            return 0;
          } else {
            // Reached last slide, stay on last slide
            setIsPaused(true);
            return 100;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  // Navigate slides
  const nextSlide = () => {
    sound.playTap();
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(s => s + 1);
      setProgress(0);
    }
  };

  const prevSlide = () => {
    sound.playTap();
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
      setProgress(0);
    }
  };

  const jumpToSlide = (idx) => {
    sound.playTap();
    setCurrentSlide(idx);
    setProgress(0);
  };

  // Add floating reaction
  const triggerReaction = (emoji) => {
    sound.playPop();
    const id = Date.now() + Math.random();
    setFloatingEmojis(prev => [...prev, { id, emoji, left: Math.floor(Math.random() * 70) + 15 }]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(item => item.id !== id));
    }, 1800);
  };

  // Submit wish
  const handleSendWish = (e) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    sound.playSuccess();
    launchConfetti();

    const newWish = {
      id: Date.now(),
      name: senderName.trim(),
      text: message.trim(),
      sticker: chosenSticker,
      time: "Vừa xong"
    };

    setWishes(prev => [newWish, ...prev]);
    setSenderName('');
    setMessage('');
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

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
          Spotify Recap & Instagram Story Experience
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Nhắn Nhủ Yêu Thương & Thư Mời Chính Thức
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
          Chạm vào 2 bên màn hình để chuyển story qua lại giữa 5 chương, gửi lời nhắn nhủ đến Bảo và nhận tấm thiệp mời chính thức nhé!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: The 9:16 Story Device (Phone Mockup) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[360px] sm:max-w-[390px] aspect-[9/16] bg-slate-950 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 shadow-slate-900/30 flex flex-col justify-between overflow-hidden">
            
            {/* Phone Speaker Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-40 flex items-center justify-center">
              <div className="w-10 h-1.5 bg-slate-800 rounded-full"></div>
            </div>

            {/* Top Instagram/Spotify Segmented Progress Bars (1, 2, 3, 4, 5) */}
            <div className="relative z-30 pt-6 px-3 flex items-center gap-1.5 select-none">
              {[0, 1, 2, 3, 4].map((idx) => {
                let fillPercent = 0;
                if (idx < currentSlide) fillPercent = 100;
                else if (idx === currentSlide) fillPercent = progress;
                else fillPercent = 0;

                return (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      jumpToSlide(idx);
                    }}
                    className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all"
                  >
                    <div 
                      className="h-full bg-white transition-all duration-75"
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Story Header */}
            <div className="relative z-30 px-3 pt-3 flex items-center justify-between text-white select-none">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 flex items-center justify-center font-bold text-xs shadow">
                  🎓
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight flex items-center gap-1">
                    Bảo Đinh
                    <span className="text-[10px] text-amber-300 font-mono">#{currentSlide + 1}/5</span>
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {currentSlide === 4 ? "Official Invitation" : "Graduation Recap"}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPaused(p => !p)}
                  className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
                  title={isPaused ? "Tiếp tục" : "Tạm dừng"}
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Touch/Click Navigation Areas (Left & Right halves) */}
            <div 
              onClick={prevSlide}
              className="absolute inset-y-16 left-0 w-1/4 z-20 cursor-pointer"
              title="Story trước"
            />
            <div 
              onClick={nextSlide}
              className="absolute inset-y-16 right-0 w-1/4 z-20 cursor-pointer"
              title="Story tiếp theo"
            />

            {/* Story Body Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-4 py-2 select-none overflow-hidden">
              
              {/* SLIDE 1: Spotify Wrapped Stats */}
              {currentSlide === 0 && (
                <div className="space-y-4 animate-fadeIn text-white">
                  <div className="text-center">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase bg-amber-400 text-slate-900 px-3 py-1 rounded-full shadow">
                      Spotify Wrapped • 2022-2026
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold mt-3 leading-tight">
                      Bảo Đinh’s Top Stats Tại KHTN
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Thanh xuân 4 năm của dân IT được đo bằng gì?
                    </p>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between border border-white/15">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">📅</span>
                        <div>
                          <div className="font-bold text-white">1,460 Ngày</div>
                          <div className="text-[10px] text-slate-300">Thanh xuân tại 227 Nguyễn Văn Cừ</div>
                        </div>
                      </div>
                      <span className="text-amber-300 font-bold">#Top1</span>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between border border-white/15">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">💻</span>
                        <div>
                          <div className="font-bold text-white">999+ Commits Git</div>
                          <div className="text-[10px] text-slate-300">Những đêm debug không ngủ</div>
                        </div>
                      </div>
                      <span className="text-amber-300 font-bold">#Hardcore</span>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between border border-white/15">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">☕</span>
                        <div>
                          <div className="font-bold text-white">350+ Ly Cà Phê</div>
                          <div className="text-[10px] text-slate-300">Đồng hành qua mọi mùa deadline</div>
                        </div>
                      </div>
                      <span className="text-amber-300 font-bold">#Fuel</span>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between border border-amber-400/30">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🎓</span>
                        <div>
                          <div className="font-bold text-amber-300">Bằng Cử Nhân IT</div>
                          <div className="text-[10px] text-slate-200">ĐH Khoa học Tự nhiên - ĐHQG-HCM</div>
                        </div>
                      </div>
                      <span className="text-xs bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">DONE</span>
                    </div>
                  </div>

                  <p className="text-center text-xs text-amber-200 font-handwriting text-lg">
                    "Cảm ơn vì bạn đã luôn là một phần tuyệt vời trong hành trình này!"
                  </p>
                </div>
              )}

              {/* SLIDE 2: Check-in Mood & Interactive Reactions */}
              {currentSlide === 1 && (
                <div className="space-y-4 animate-fadeIn text-white text-center">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest uppercase bg-rose-500 text-white px-3 py-1 rounded-full shadow">
                      Check-in Vibe
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold mt-3 leading-tight">
                      Khi Đến Gặp Bảo, <br />Bạn Sẽ Mang Theo Gì?
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Chạm vào các biểu tượng để thả tim và gửi vibe ngay nhé!
                    </p>
                  </div>

                  {/* Reaction Grid */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {[
                      { emoji: "💐", title: "Bó hoa siêu to khổng lồ", desc: "Tặng tân cử nhân rạng rỡ" },
                      { emoji: "📸", title: "Thợ chụp ảnh có tâm", desc: "Sẵn sàng chụp 1000 tấm sống ảo" },
                      { emoji: "🧋", title: "Trà sữa full topping", desc: "Tiếp năng lượng sau giờ lễ" },
                      { emoji: "💖", title: "Tấm lòng & Nụ cười", desc: "Chỉ cần bạn đến là Bảo vui rồi!" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerReaction(item.emoji);
                        }}
                        className="bg-white/10 hover:bg-white/20 active:scale-95 transition-all p-2.5 rounded-2xl border border-white/15 flex items-center gap-3 text-left"
                      >
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <div className="text-xs font-bold text-white">{item.title}</div>
                          <div className="text-[10px] text-slate-300">{item.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Floating emojis animation overlay */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {floatingEmojis.map(item => (
                      <div
                        key={item.id}
                        className="absolute bottom-10 text-3xl animate-floatUp"
                        style={{ left: `${item.left}%` }}
                      >
                        {item.emoji}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 3: Quick Wish Input Inside Story */}
              {currentSlide === 2 && (
                <div className="space-y-3 animate-fadeIn text-white text-center">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest uppercase bg-amber-400 text-slate-900 px-3 py-1 rounded-full shadow">
                      Gửi Lời Nhắn Nhủ
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold mt-2">
                      Để Lại Lời Chúc Cho Bảo 💌
                    </h3>
                    <p className="text-xs text-slate-300">
                      Lời nhắn của bạn sẽ xuất hiện ngay trên Bảng Lưu Bút!
                    </p>
                  </div>

                  <form 
                    onSubmit={handleSendWish}
                    onClick={(e) => e.stopPropagation()}
                    className="space-y-2 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-left text-xs"
                  >
                    <div>
                      <label className="text-[10px] uppercase font-mono text-amber-300 font-bold block mb-1">
                        Tên / Biệt danh của bạn:
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="VD: Tuấn KHTN, Bạn thân..."
                        className="w-full bg-black/40 border border-white/20 rounded-xl px-3 py-1.5 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-amber-300 font-bold block mb-1">
                        Lời nhắn gửi đến Bảo:
                      </label>
                      <textarea
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Chúc Bảo tốt nghiệp rực rỡ..."
                        className="w-full bg-black/40 border border-white/20 rounded-xl px-3 py-1.5 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 text-xs resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex gap-1.5">
                        {['🎓', '🚀', '💐', '☕', '💖'].map((stk) => (
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
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-xs flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all"
                      >
                        <Send className="w-3 h-3" />
                        Gửi
                      </button>
                    </div>

                    {sentSuccess && (
                      <div className="text-center text-emerald-400 text-[11px] font-bold animate-pulse pt-1">
                        🎉 Đã gửi lời chúc thành công! Cảm ơn bạn rất nhiều!
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* SLIDE 4: Emotional Message from Bao */}
              {currentSlide === 3 && (
                <div className="space-y-4 animate-fadeIn text-white text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-1 flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🌻</span>
                  </div>

                  <h3 className="text-2xl font-display font-extrabold leading-snug">
                    Lời Cảm Ơn Từ Tận Đáy Lòng
                  </h3>

                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs text-slate-200 leading-relaxed font-sans text-left space-y-2">
                    <p>
                      "Vậy là câu chuyện thời sinh viên của Bảo Đinh đến đây là trọn vẹn rồi. 
                      Trước khi nói lời tạm biệt giảng đường KHTN, mình chỉ muốn nói lời cảm ơn chân thành nhất."
                    </p>
                    <p>
                      Cảm ơn gia đình luôn là hậu phương vững chắc, cảm ơn thầy cô đã tận tình chỉ dạy, 
                      và đặc biệt cảm ơn những người bạn tuyệt vời đã cùng Bảo thức khuya chạy đồ án, 
                      cùng chia sẻ từng ly trà sữa và kỷ niệm thời thanh xuân.
                    </p>
                  </div>

                  <div className="font-handwriting text-2xl text-amber-300">
                    — Bảo Đinh (Đinh Nguyễn Gia Bảo) —
                  </div>
                </div>
              )}

              {/* SLIDE 5: The Grand Finale - Official Graduation Invitation */}
              {currentSlide === 4 && (
                <div className="space-y-2.5 animate-fadeIn text-white text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-bold">
                    <Sparkles className="w-3 h-3" />
                    Thư Mời Chính Thức Dành Cho Bạn
                  </div>

                  {/* The Invitation Card Image */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-white max-h-[310px] flex items-center justify-center">
                    <img
                      src={invitationImage}
                      alt="Thư mời tốt nghiệp Bảo Đinh"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[10px] font-mono font-bold">
                      {selectedOption === 'option1' ? 'OPTION 1' : 'OPTION 2'}
                    </div>
                  </div>

                  <div className="text-[11px] text-amber-300 font-semibold">
                    {invitationTitle}
                  </div>

                  {/* Actions inside story */}
                  <div className="flex items-center justify-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
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
                      <span>Pháo hoa 🎉</span>
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
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === idx ? 'w-5 bg-amber-400' : 'bg-white/30'
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

        {/* Right Column: Wish Wall (Bảng Lưu Bút Kỷ Yếu) & Quick Switcher */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Option Switcher for Invitation Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 paper-shadow flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-slate-500 uppercase">
                Chế độ xem thư mời ở Slide 5:
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

          {/* Sổ Lưu Bút Corkboard */}
          <div className="bg-[#fcfbf7] rounded-3xl p-6 border border-amber-900/10 paper-shadow">
            
            <div className="flex items-center justify-between mb-4 border-b border-amber-900/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📌</span>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-lg">
                    Sổ Lưu Bút Kỷ Niệm ({wishes.length})
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Những lời nhắn nhủ gửi trao đến Bảo Đinh
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  jumpToSlide(2);
                  sound.playTap();
                }}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Viết lời chúc
              </button>
            </div>

            {/* List of wishes */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-sm relative group hover:border-amber-300 transition-all"
                >
                  {/* Tape top right */}
                  <div className="absolute -top-1.5 right-4 w-12 h-4 bg-amber-200/60 rotate-2 border-l border-r border-dashed border-amber-400"></div>

                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{w.sticker}</span>
                      <span className="font-display font-bold text-slate-800 text-sm">
                        {w.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {w.time}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    "{w.text}"
                  </p>
                </div>
              ))}
            </div>

            {/* Footer tip */}
            <div className="mt-4 pt-3 border-t border-amber-900/10 text-center text-xs text-slate-400 font-handwriting text-base">
              "Mỗi lời chúc của bạn là một niềm vui to lớn đối với Bảo!"
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
