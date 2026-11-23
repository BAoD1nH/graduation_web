import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, 
  Share2, Award, Heart, Laptop, Camera, Smile, X, ZoomIn, Download, MessageCircle
} from 'lucide-react';
import { sound } from '../utils/audio';
import { launchConfetti } from '../utils/confetti';

export default function Section1Intro({ selectedOption, setSelectedOption }) {
  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);

  const invitationCards = [
    {
      id: 'option1',
      pageLabel: '1/2',
      title: 'Lễ Trường (Toàn Trường KHTN)',
      dateText: 'Thứ 5 - Ngày 26.11.2026',
      timeText: '10:45 am - 12:30 pm',
      location: 'Sân trường KHTN - 227 Nguyễn Văn Cừ, Q.5',
      image: 'graduation_01.png',
      caption: '"The time has come. Come join with me!"',
      badge: 'Lễ Trường'
    },
    {
      id: 'option2',
      pageLabel: '2/2',
      title: 'Lễ Khoa Công Nghệ Thông Tin',
      dateText: 'Chủ Nhật - Ngày 06.12.2026',
      timeText: '10:45 am - 12:30 pm',
      location: 'Sân trường KHTN - 227 Nguyễn Văn Cừ, Q.5',
      image: 'graduation_02.png',
      caption: '"Khoảnh khắc ấm cúng cùng Khoa CNTT!"',
      badge: 'Lễ Khoa CNTT'
    }
  ];

  const currentCardIndex = selectedOption === 'option1' ? 0 : 1;
  const currentCard = invitationCards[currentCardIndex];

  // Carousel Next & Prev
  const handleNextCard = (e) => {
    if (e) e.stopPropagation();
    sound.playTap();
    setSelectedOption(prev => prev === 'option1' ? 'option2' : 'option1');
  };

  const handlePrevCard = (e) => {
    if (e) e.stopPropagation();
    sound.playTap();
    setSelectedOption(prev => prev === 'option1' ? 'option2' : 'option1');
  };

  const openPhotoModal = () => {
    sound.playPop();
    setIsPhotoPopupOpen(true);
  };

  const closePhotoModal = () => {
    sound.playTap();
    setIsPhotoPopupOpen(false);
  };

  // Keyboard navigation for Facebook-style modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPhotoPopupOpen) return;
      if (e.key === 'Escape') closePhotoModal();
      if (e.key === 'ArrowRight') handleNextCard();
      if (e.key === 'ArrowLeft') handlePrevCard();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPhotoPopupOpen]);

  useEffect(() => {
    // Target dates
    const targetDate = (selectedOption === 'option1' || selectedOption === 'both')
      ? new Date('2026-11-26T11:00:00+07:00').getTime()
      : new Date('2026-12-06T08:30:00+07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [selectedOption]);

  const handleSelectOption = (opt) => {
    sound.playTap();
    setSelectedOption(opt);
    launchConfetti();
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    if (selectedOption === 'option2') {
      return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=L%E1%BB%85+T%E1%BB%91t+Nghi%E1%BB%87p+B%E1%BA%A3o+%C4%90inh+(L%E1%BB%85+Khoa+CNTT)&dates=20261206T013000Z/20261206T043000Z&details=Ch%E1%BB%A5p+%E1%BA%A3nh+k%E1%BB%B7+ni%E1%BB%87m+c%C3%B9ng+B%E1%BA%A3o+%C4%90inh+(L%E1%BB%85+Khoa+CNTT)+t%E1%BA%A1i+KHTN.+Hotline:+0358180131&location=227+Nguy%E1%BB%85n+V%C4%83n+C%E1%BB%AB,+Ph%C6%B0%E1%BB%9Dng+Ch%E1%BB%A3+Qu%C3%A1n,+Qu%E1%BA%ADn+5,+TP.HCM";
    }
    // option1 or both → show Lễ Trường (earliest date)
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=L%E1%BB%85+T%E1%BB%91t+Nghi%E1%BB%87p+B%E1%BA%A3o+%C4%90inh+(L%E1%BB%85+Tr%C6%B0%E1%BB%9Dng)&dates=20261126T040000Z/20261126T053000Z&details=Ch%E1%BB%A5p+%E1%BA%A3nh+k%E1%BB%B7+ni%E1%BB%87m+c%C3%B9ng+B%E1%BA%A3o+%C4%90inh+t%E1%BA%A1i+S%C3%A2n+tr%C6%B0%E1%BB%9Dng+KHTN.+Hotline:+0358180131&location=227+Nguy%E1%BB%85n+V%C4%83n+C%E1%BB%AB,+Ph%C6%B0%E1%BB%9Dng+Ch%E1%BB%A3+Qu%C3%A1n,+Qu%E1%BA%ADn+5,+TP.HCM";
  };

  return (
    <section id="part1" className="pt-8 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Banner / Scrapbook Header */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/10 paper-shadow overflow-hidden mb-12">
        {/* Decorative Tape Strips */}
        <div className="absolute -top-3 left-12 w-28 h-8 bg-amber-200/80 -rotate-3 border-l-2 border-r-2 border-dashed border-amber-400 shadow-sm z-10 pointer-events-none"></div>
        <div className="absolute -top-3 right-12 w-28 h-8 bg-sky-200/80 rotate-2 border-l-2 border-r-2 border-dashed border-sky-400 shadow-sm z-10 pointer-events-none"></div>

        {/* Floating Scrapbook Elements */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center gap-2 opacity-80 pointer-events-none">
          <span className="text-2xl animate-bounce">🌻</span>
          <span className="text-xl">✈️</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Greeting & Intro */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Graduation Announcement
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
              Chào bạn, mình là <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-amber-500 to-orange-500">
                Đinh Nguyễn Gia Bảo
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200/60 flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5" /> Công nghệ thông tin
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200/60 flex items-center gap-1.5">
                🏛️ ĐH Khoa học Tự nhiên (HCMUS)
              </span>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
              Sau 4 năm miệt mài chạy deadline đồ án tại Trường đại học Khoa học tự nhiên, ĐHQG-TPHCM. Mình đã chính thức tốt nghiệp và hoàn thành chặng đường sinh viên, chuẩn bị nhận tấm bằng cử nhân CNTT! 
              Và để ngày vui thêm phần trọn vẹn, rất hân hạnh được mời bạn đến chung vui và chụp cùng mình vài tấm ảnh kỷ niệm nhé! 🎉
            </p>

            {/* Quick Contact & Info Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>227 Nguyễn Văn Cừ, P. Chợ Quán, TP.HCM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base">📞</span>
                <span>Hotline: <strong className="text-slate-700">0358 180 131</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Polaroid with Instagram Carousel & Facebook-Style Modal */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-xs sm:max-w-sm">
              
              {/* Polaroid Frame */}
              <div className="bg-white p-4 pt-5 pb-6 rounded-2xl shadow-xl border border-slate-200/80 transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                
                {/* Photo container (Click to zoom like Facebook) */}
                <div 
                  onClick={openPhotoModal}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-100 cursor-pointer select-none group/img shadow-inner"
                  title="Click để phóng to xem thiệp mời"
                >
                  <img
                    src={currentCard.image}
                    alt={currentCard.title}
                    className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                  />

                  {/* Instagram-style Top Right Counter Badge (1/2, 2/2) */}
                  <div className="absolute top-2.5 right-2.5 bg-slate-900/75 backdrop-blur-md text-white text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow border border-white/20 flex items-center gap-1 z-20">
                    <span>{currentCard.pageLabel}</span>
                  </div>

                  {/* Instagram-style Prev Button (<) */}
                  <button
                    onClick={handlePrevCard}
                    className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg flex items-center justify-center transition-all absolute left-2.5 top-1/2 -translate-y-1/2 z-20 hover:scale-110 active:scale-95 border border-slate-200/50"
                    title="Xem thư mời trước"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Instagram-style Next Button (>) */}
                  <button
                    onClick={handleNextCard}
                    className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg flex items-center justify-center transition-all absolute right-2.5 top-1/2 -translate-y-1/2 z-20 hover:scale-110 active:scale-95 border border-slate-200/50"
                    title="Xem thư mời tiếp theo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Click to Zoom Hint Overlay */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                    <div className="p-2 rounded-full bg-slate-900/70 backdrop-blur-sm flex items-center gap-1.5 text-xs font-medium">
                      <ZoomIn className="w-4 h-4" />
                      <span>Xem ảnh lớn</span>
                    </div>
                  </div>

                  {/* Bottom bar inside photo */}
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[11px] flex items-center justify-between pointer-events-none">
                    <span>{currentCard.badge}</span>
                    <span className="text-amber-400 font-mono">HCMUS '26</span>
                  </div>
                </div>

                {/* Instagram-style Pagination Dots (Active is blue, Inactive is gray) */}
                <div className="flex items-center justify-center gap-2 mt-3 select-none">
                  {invitationCards.map((card, idx) => (
                    <button
                      key={card.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playTap();
                        setSelectedOption(card.id);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentCardIndex === idx 
                          ? 'w-6 bg-blue-600' 
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      title={card.title}
                    />
                  ))}
                </div>

                {/* Handwriting note */}
                <div className="mt-2 text-center">
                  <p className="font-handwriting text-2xl text-slate-700 leading-none">
                    {currentCard.caption}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                    Kỷ niệm thời sinh viên • 2022 - 2026
                  </p>
                </div>
              </div>

              {/* Floating stickers */}
              <div className="absolute -bottom-3 -left-3 bg-amber-400 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg border-2 border-white -rotate-6 pointer-events-none">
                🌻 Cử nhân IT
              </div>
              <div className="absolute -top-3 -right-2 bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg border-2 border-white rotate-6 pointer-events-none">
                🎉 Graduated!
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Option Selector: Chọn buổi đến chụp ảnh */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            Lựa chọn buổi tham dự
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight">
            Bạn Sẽ Đi Chụp Ảnh Cùng Bảo Vào Buổi Nào?
          </h2>
          <p className="text-sm text-slate-300">
            Hãy chọn buổi bạn rảnh nhất bên dưới để web hiển thị đúng thông tin, đếm ngược và xuất thư mời tương ứng cho bạn nhé!
          </p>

          {/* 2 Options Cards + Option 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-left">
            
            {/* OPTION 1 */}
            <div 
              onClick={() => handleSelectOption('option1')}
              className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${
                selectedOption === 'option1'
                  ? 'bg-blue-900/40 border-blue-400 shadow-lg shadow-blue-500/20 scale-[1.02]'
                  : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 opacity-80 hover:opacity-100'
              }`}
            >
              {selectedOption === 'option1' && (
                <div className="absolute top-3 right-3 bg-blue-500 text-white p-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <div className="text-xs font-mono font-bold text-blue-300 uppercase tracking-wider mb-1">
                Option 1 • Lễ Trường
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Thứ 5 - Ngày 26.11.2026
              </h3>
              <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>11:00 am - 12:30 pm</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Sân trường KHTN - 227 Nguyễn Văn Cừ, Q.5</span>
                </div>
              </div>
              <div className="mt-3 inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                🎉 Lễ tốt nghiệp cấp Trường
              </div>
            </div>

            {/* OPTION 2 */}
            <div 
              onClick={() => handleSelectOption('option2')}
              className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${
                selectedOption === 'option2'
                  ? 'bg-amber-900/40 border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 opacity-80 hover:opacity-100'
              }`}
            >
              {selectedOption === 'option2' && (
                <div className="absolute top-3 right-3 bg-amber-500 text-white p-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider mb-1">
                Option 2 • Lễ Khoa CNTT
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Chủ Nhật - Ngày 06.12.2026
              </h3>
              <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>10:45am - 12:30pm</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Sân trường KHTN - 227 Nguyễn Văn Cừ, Q.5</span>
                </div>
              </div>
              <div className="mt-3 inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                💻 Lễ tốt nghiệp cấp Khoa của Khoa CNTT
              </div>
            </div>

            {/* OPTION 3: Tham dự cả 2 */}
            <div
              onClick={() => handleSelectOption('both')}
              className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative md:col-span-2 ${
                selectedOption === 'both'
                  ? 'bg-emerald-900/40 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.01]'
                  : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 opacity-80 hover:opacity-100'
              }`}
            >
              {selectedOption === 'both' && (
                <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <div className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider mb-1">
                Option 3 • Tham Dự Cả 2 🎉
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Thứ 5 (26.11) & Chủ Nhật (06.12.2026)
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Tham dự cả Lễ Tốt Nghiệp cấp Trường lẫn Lễ Khoa CNTT — đếm ngược sẽ hiển thị theo ngày gần nhất (26.11).
              </p>
            </div>

          </div>

          {/* Realtime Countdown Timer */}
          <div className="pt-6">
            <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-3">
              ⏳ Đếm ngược đến ngày hẹn:
            </div>
            <div className="flex justify-center items-center gap-2 sm:gap-4">
              {[
                { label: "Ngày", val: timeLeft.days },
                { label: "Giờ", val: timeLeft.hours },
                { label: "Phút", val: timeLeft.minutes },
                { label: "Giây", val: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-800/90 border border-slate-700 rounded-xl px-3 sm:px-5 py-2 sm:py-3 text-center min-w-[65px] sm:min-w-[85px] shadow-inner">
                  <div className="text-xl sm:text-3xl font-mono font-bold text-amber-400">
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-sans uppercase font-semibold">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-wrap justify-center items-center gap-3">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSuccess()}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              Thêm vào Google Calendar
            </a>

            <a
              href="#part2"
              onClick={() => sound.playHop()}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 border border-white/20 transition-colors"
            >
              <span>Xem chỗ gửi xe & Sơ đồ KHTN</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#part3"
              onClick={() => sound.playPop()}
              className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              Viết lời chúc cho Bảo
            </a>
          </div>

        </div>
      </div>

      {/* Facebook-style Fullscreen Photo Lightbox Modal */}
      {isPhotoPopupOpen && (
        <div 
          onClick={closePhotoModal}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fadeIn select-none"
        >
          {/* Top Header Bar */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-4 sm:px-8 z-50 text-white">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-base sm:text-lg">
                {currentCard.title}
              </span>
              <span className="bg-white/20 text-white text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
                {currentCard.pageLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={currentCard.image}
                download={`Thu_Moi_Tot_Nghiep_${currentCard.id}.png`}
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                title="Tải ảnh gốc về máy"
              >
                <Download className="w-5 h-5" />
              </a>

              <button
                onClick={closePhotoModal}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                title="Đóng (ESC)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrevCard}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white p-3 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md transition-all z-50 hover:scale-110 active:scale-95"
            title="Xem thiệp trước (Mũi tên trái)"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNextCard}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white p-3 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md transition-all z-50 hover:scale-110 active:scale-95"
            title="Xem thiệp tiếp theo (Mũi tên phải)"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          {/* Image Center View */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
          >
            <img
              src={currentCard.image}
              alt={currentCard.title}
              className="max-h-[82vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Bottom Caption Bar */}
          <div className="absolute bottom-4 inset-x-4 text-center text-xs text-slate-300 font-sans pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
              📅 {currentCard.dateText} • ⏰ {currentCard.timeText} • 📍 {currentCard.location}
            </span>
          </div>

        </div>
      )}

    </section>
  );
}
