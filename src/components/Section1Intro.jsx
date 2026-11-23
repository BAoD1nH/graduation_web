import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2, ChevronRight, Share2, Award, Heart, Laptop, Camera, Smile } from 'lucide-react';
import MemoryAlbum from './MemoryAlbum';
import { sound } from '../utils/audio';
import { launchConfetti } from '../utils/confetti';

export default function Section1Intro({ selectedOption, setSelectedOption }) {
  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target dates
    const targetDate = selectedOption === 'option1'
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
    if (selectedOption === 'option1') {
      return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=L%E1%BB%85+T%E1%BB%91t+Nghi%E1%BB%87p+B%E1%BA%A3o+%C4%90inh+(L%E1%BB%85+Tr%C6%B0%E1%BB%9Dng)&dates=20261126T040000Z/20261126T053000Z&details=Ch%E1%BB%A5p+%E1%BA%A3nh+k%E1%BB%B7+ni%E1%BB%87m+c%C3%B9ng+B%E1%BA%A3o+%C4%90inh+t%E1%BA%A1i+S%C3%A2n+tr%C6%B0%E1%BB%9Dng+KHTN.+Hotline:+0358180131&location=227+Nguy%E1%BB%85n+V%C4%83n+C%E1%BB%AB,+Ph%C6%B0%E1%BB%9Dng+Ch%E1%BB%A3+Qu%C3%A1n,+Qu%E1%BA%ADn+5,+TP.HCM";
    } else {
      return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=L%E1%BB%85+T%E1%BB%91t+Nghi%E1%BB%87p+B%E1%BA%A3o+%C4%90inh+(L%E1%BB%85+Khoa+CNTT)&dates=20261206T013000Z/20261206T043000Z&details=Ch%E1%BB%A5p+%E1%BA%A3nh+k%E1%BB%B7+ni%E1%BB%87m+c%C3%B9ng+B%E1%BA%A3o+%C4%90inh+(L%E1%BB%85+Khoa+CNTT)+t%E1%BA%A1i+KHTN.+Hotline:+0358180131&location=227+Nguy%E1%BB%85n+V%C4%83n+C%E1%BB%AB,+Ph%C6%B0%E1%BB%9Dng+Ch%E1%BB%A3+Qu%C3%A1n,+Qu%E1%BA%ADn+5,+TP.HCM";
    }
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
              Sau 4 năm miệt mài cùng những dòng code, thuật toán và những đêm thâu đồ án tại cơ sở 227 Nguyễn Văn Cừ, 
              mình đã chính thức hoàn thành chặng đường sinh viên và chuẩn bị nhận tấm bằng cử nhân IT! 
              Rất vinh hạnh và hạnh phúc nếu được đón bạn đến chung vui và chụp cùng mình vài tấm ảnh kỷ niệm nhé! 🎉
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

          {/* Right Column: Hero Visual Polaroid */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-xs sm:max-w-sm">
              {/* Polaroid Frame */}
              <div className="bg-white p-4 pt-5 pb-8 rounded-2xl shadow-xl border border-slate-200/80 transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                {/* Photo container */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-blue-100 to-amber-50 flex items-center justify-center border border-slate-100">
                  <img
                    src="graduation_01.png"
                    alt="Đinh Nguyễn Gia Bảo - Thiệp Mời Tốt Nghiệp"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[11px] flex items-center justify-between">
                    <span>Đinh Nguyễn Gia Bảo</span>
                    <span className="text-amber-400 font-mono">HCMUS '26</span>
                  </div>
                </div>
                {/* Handwriting note */}
                <div className="mt-4 text-center">
                  <p className="font-handwriting text-2xl text-slate-700 leading-none">
                    "The time has come. Come join with me!"
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                    Kỷ niệm thời sinh viên • 2022 - 2026
                  </p>
                </div>
              </div>

              {/* Floating stickers */}
              <div className="absolute -bottom-3 -left-3 bg-amber-400 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg border-2 border-white -rotate-6">
                🌻 Cử nhân IT
              </div>
              <div className="absolute -top-3 -right-2 bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg border-2 border-white rotate-6">
                🎉 Graduated!
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Memory Scrapbook Album (Thay thế phần tiểu sử 4 năm bằng album ảnh kỷ niệm) */}
      <MemoryAlbum />

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

          {/* 2 Options Cards */}
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
                  <span><strong>11:00 am - 12:30 pm</strong> (Khung giờ đón khách & chụp ảnh)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Sân trường KHTN - 227 Nguyễn Văn Cừ, Q.5</span>
                </div>
              </div>
              <div className="mt-3 inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                🎉 Lễ tốt nghiệp chính thức toàn trường
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
                  <span><strong>Buổi sáng / Trưa</strong> (Ấm cúng cùng thầy cô & bạn bè Khoa IT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Sân trường & Giảng đường Khoa CNTT - KHTN</span>
                </div>
              </div>
              <div className="mt-3 inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                💻 Lễ tốt nghiệp riêng của Khoa Công nghệ Thông tin
              </div>
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
              <span>Xem chỗ gửi xe Crossy Road</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}
