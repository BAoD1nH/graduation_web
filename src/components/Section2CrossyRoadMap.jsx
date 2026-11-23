import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, AlertTriangle, CheckCircle2, Car, Info, Footprints, ExternalLink, Sparkles, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Section2CrossyRoadMap() {
  const [selectedSpot, setSelectedSpot] = useState(0); // Default to Nowzone
  const [chickenPos, setChickenPos] = useState({ x: 180, y: 320 });
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);

  const parkingSpots = [
    {
      id: "nowzone",
      name: "Bãi xe TTTM Nowzone",
      badge: "Lựa chọn số 1 ⭐⭐⭐⭐⭐",
      badgeColor: "bg-emerald-500 text-white",
      address: "235 Nguyễn Văn Cừ (Góc Nguyễn Văn Cừ & An Dương Vương)",
      distance: "~200m đi bộ (3 phút)",
      capacity: "Rất lớn (Ô tô & Xe máy)",
      price: "10.000đ - 15.000đ",
      recommendLevel: "RẤT KHUYẾN KHÍCH",
      recommendColor: "text-emerald-700 bg-emerald-50 border-emerald-300",
      pros: "Hầm xe rộng rãi, mát lạnh có máy lạnh, bảo vệ chuyên nghiệp, 100% không lo hết chỗ vào ngày lễ.",
      cons: "Mất 3 phút đi bộ tản bộ qua cổng KHTN.",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=TTTM+Nowzone+235+Nguyen+Van+Cu",
      targetCoords: { x: 90, y: 130 },
      icon: "🏬"
    },
    {
      id: "lhp",
      name: "Bãi xe THPT Chuyên Lê Hồng Phong",
      badge: "Lựa chọn an toàn ⭐⭐⭐⭐",
      badgeColor: "bg-blue-500 text-white",
      address: "280 An Dương Vương, P.4, Q.5 (Đối diện xéo KHTN)",
      distance: "~100m đi bộ (2 phút)",
      capacity: "Trung bình - Lớn (Xe máy)",
      price: "5.000đ - 10.000đ",
      recommendLevel: "KHUYẾN KHÍCH",
      recommendColor: "text-blue-700 bg-blue-50 border-blue-300",
      pros: "Sân trường râm mát nhiều cây cổ thụ, an ninh tốt, đi bộ qua cổng trường KHTN rất nhanh.",
      cons: "Ưu tiên xe máy, thường đông từ 10h trưa.",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=THPT+Chuyen+Le+Hong+Phong+TPHCM",
      targetCoords: { x: 260, y: 140 },
      icon: "🏫"
    },
    {
      id: "khtn",
      name: "Bãi xe ĐH Khoa học Tự nhiên",
      badge: "Ngay tại trường ⭐⭐⭐",
      badgeColor: "bg-amber-500 text-white",
      address: "227 Nguyễn Văn Cừ, P. Chợ Quán, Q.5",
      distance: "0m (Bước lên là tới sân trường)",
      capacity: "Bãi xe sinh viên KHTN",
      price: "5.000đ",
      recommendLevel: "CẦN ĐẾN SỚM",
      recommendColor: "text-amber-700 bg-amber-50 border-amber-300",
      pros: "Gửi xong đi thẳng vào khu vực sân khấu chụp ảnh với Bảo, không phải đi bộ ngoài đường.",
      cons: "⚠️ CỰC KỲ DỄ FULL CHỖ VÀO NGÀY LỄ TỐT NGHIỆP! Khuyên bạn phải đến trước 10:30 ít nhất 30 phút.",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=227+Nguyen+Van+Cu+HCMUS",
      targetCoords: { x: 190, y: 220 },
      icon: "🎓"
    },
    {
      id: "sp",
      name: "Bãi xe ĐH Sư Phạm (HCMUE)",
      badge: "Không khuyến khích :\"( ⚠️",
      badgeColor: "bg-rose-500 text-white",
      address: "280 An Dương Vương, P.4, Q.5 (Sát vách KHTN)",
      distance: "~50m đi bộ",
      capacity: "Xe máy",
      price: "5.000đ",
      recommendLevel: "KHÔNG NÊN VÀO :\"",
      recommendColor: "text-rose-700 bg-rose-50 border-rose-300",
      pros: "Vị trí rất gần trường KHTN.",
      cons: "❌ BẢO VỆ KHÁ KHÓ TÍNH! Ngày lễ tốt nghiệp thường kiểm tra thẻ sinh viên Sư Phạm nghiêm ngặt, khách ngoài rất dễ bị từ chối bắt quay đầu.",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dai+hoc+Su+Pham+TPHCM+280+An+Duong+Vuong",
      targetCoords: { x: 310, y: 280 },
      icon: "🚫"
    }
  ];

  // Hop Chicken
  const hopChicken = (dx, dy) => {
    sound.playHop();
    setChickenPos(prev => {
      const newX = Math.max(30, Math.min(370, prev.x + dx));
      const newY = Math.max(40, Math.min(380, prev.y + dy));
      return { x: newX, y: newY };
    });
    setScore(s => s + 1);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        hopChicken(0, -25);
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        hopChicken(0, 25);
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        hopChicken(-25, 0);
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        hopChicken(25, 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Jump to specific parking spot
  const selectSpot = (index) => {
    sound.playHop();
    setSelectedSpot(index);
    const target = parkingSpots[index].targetCoords;
    setChickenPos({ x: target.x, y: target.y + 25 });
  };

  // Animated Crossy Road Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let tick = 0;

    // Moving elements
    const cars = [
      { x: 20, y: 175, speed: 1.8, color: '#38bdf8', len: 45 },
      { x: 190, y: 175, speed: 1.8, color: '#fb923c', len: 40 },
      { x: 280, y: 250, speed: -1.5, color: '#facc15', len: 50 },
      { x: 100, y: 250, speed: -1.5, color: '#ec4899', len: 42 },
      { x: 50, y: 310, speed: 2.2, color: '#4ade80', len: 40 }
    ];

    const logs = [
      { x: 30, y: 80, speed: 1.2, len: 65 },
      { x: 180, y: 80, speed: 1.2, len: 75 },
      { x: 320, y: 80, speed: 1.2, len: 60 }
    ];

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Background: Isometric / Voxel Style Lanes ---
      
      // Top grass zone (Nowzone & LHP area)
      ctx.fillStyle = '#6bc752';
      ctx.fillRect(0, 0, 400, 70);
      // Grass voxel pattern
      ctx.fillStyle = '#59b042';
      for (let i = 0; i < 400; i += 30) {
        ctx.fillRect(i, 0, 15, 70);
      }

      // River / Canal
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(0, 70, 400, 35);
      // River ripples
      ctx.fillStyle = '#7dd3fc';
      ctx.fillRect((tick % 80) * 5, 82, 40, 4);
      ctx.fillRect(((tick + 30) % 80) * 5, 92, 35, 3);

      // River logs floating
      logs.forEach(log => {
        log.x += log.speed;
        if (log.x > 420) log.x = -log.len;
        // Draw wood log
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(log.x, log.y, log.len, 16);
        ctx.fillStyle = '#a16207';
        ctx.fillRect(log.x + 4, log.y + 2, log.len - 8, 12);
        // Log rings
        ctx.fillStyle = '#ca8a04';
        ctx.beginPath();
        ctx.arc(log.x + 3, log.y + 8, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Middle Grass strip
      ctx.fillStyle = '#6bc752';
      ctx.fillRect(0, 105, 400, 50);
      ctx.fillStyle = '#59b042';
      for (let i = 0; i < 400; i += 30) {
        ctx.fillRect(i, 105, 15, 50);
      }

      // Main Road 1 (Nguyen Van Cu Ave)
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 155, 400, 50);
      // Road markings
      ctx.fillStyle = '#f8fafc';
      for (let x = 10; x < 400; x += 35) {
        ctx.fillRect(x, 178, 18, 4);
      }

      // Middle Campus Entrance Grass (KHTN Campus Yard)
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(0, 205, 400, 30);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, 215, 400, 10);

      // Main Road 2 (An Duong Vuong Ave)
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 235, 400, 50);
      ctx.fillStyle = '#f8fafc';
      for (let x = 10; x < 400; x += 35) {
        ctx.fillRect(x, 258, 18, 4);
      }

      // Secondary Road 3
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, 295, 400, 45);
      ctx.fillStyle = '#cbd5e1';
      for (let x = 5; x < 400; x += 30) {
        ctx.fillRect(x, 316, 14, 3);
      }

      // Bottom Grass strip (Starting Point)
      ctx.fillStyle = '#6bc752';
      ctx.fillRect(0, 340, 400, 60);
      ctx.fillStyle = '#59b042';
      for (let i = 0; i < 400; i += 30) {
        ctx.fillRect(i, 340, 15, 60);
      }

      // Train track at bottom
      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, 365, 400, 16);
      // Railroad ties
      ctx.fillStyle = '#78350f';
      for (let x = 0; x < 400; x += 15) {
        ctx.fillRect(x, 362, 7, 22);
      }
      // Rails
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(0, 368, 400, 3);
      ctx.fillRect(0, 375, 400, 3);

      // --- Moving Cars ---
      cars.forEach(car => {
        car.x += car.speed;
        if (car.speed > 0 && car.x > 420) car.x = -car.len;
        if (car.speed < 0 && car.x < -car.len) car.x = 420;

        // Voxel car body
        ctx.fillStyle = car.color;
        ctx.fillRect(car.x, car.y - 12, car.len, 24);
        // Cabin
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(car.x + (car.speed > 0 ? 10 : 8), car.y - 10, car.len - 18, 20);
        // Roof
        ctx.fillStyle = car.color;
        ctx.fillRect(car.x + (car.speed > 0 ? 14 : 12), car.y - 8, car.len - 26, 16);
        // Headlights
        ctx.fillStyle = '#fef08a';
        if (car.speed > 0) {
          ctx.fillRect(car.x + car.len - 2, car.y - 10, 3, 5);
          ctx.fillRect(car.x + car.len - 2, car.y + 5, 3, 5);
        } else {
          ctx.fillRect(car.x - 1, car.y - 10, 3, 5);
          ctx.fillRect(car.x - 1, car.y + 5, 3, 5);
        }
      });

      // --- Voxel Trees around map ---
      const trees = [
        { x: 30, y: 35 }, { x: 360, y: 35 },
        { x: 140, y: 125 }, { x: 20, y: 125 }, { x: 370, y: 125 },
        { x: 40, y: 220 }, { x: 360, y: 220 },
        { x: 20, y: 345 }, { x: 370, y: 345 }
      ];
      trees.forEach(t => {
        // Tree trunk (voxel)
        ctx.fillStyle = '#78350f';
        ctx.fillRect(t.x + 6, t.y + 14, 6, 12);
        // Tree leaves (voxel cube)
        ctx.fillStyle = '#15803d';
        ctx.fillRect(t.x, t.y, 18, 16);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(t.x + 2, t.y + 2, 14, 12);
      });

      // --- Draw Parking Spots Landmarks ---
      parkingSpots.forEach((spot, idx) => {
        const isSelected = selectedSpot === idx;
        const target = spot.targetCoords;

        // Voxel building pad
        ctx.fillStyle = isSelected ? '#fbbf24' : '#ffffff';
        ctx.beginPath();
        ctx.roundRect(target.x - 18, target.y - 18, 36, 36, [8]);
        ctx.fill();
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.strokeStyle = isSelected ? '#b45309' : '#94a3b8';
        ctx.stroke();

        // Icon inside landmark
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(spot.icon, target.x, target.y);

        // Name tag label
        ctx.font = 'bold 9px "Space Grotesk", sans-serif';
        const labelWidth = ctx.measureText(spot.name.split(' ')[2] || spot.name).width + 8;
        ctx.fillStyle = isSelected ? '#0f172a' : 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(target.x - labelWidth / 2, target.y + 22, labelWidth, 14);
        ctx.fillStyle = isSelected ? '#facc15' : '#ffffff';
        ctx.fillText(spot.name.split(' ')[2] || spot.name, target.x, target.y + 29);
      });

      // --- Draw The Crossy Road Chicken (Character) ---
      const cx = chickenPos.x;
      const cy = chickenPos.y;

      // Chicken shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 10, 9, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Body (White Voxel cube)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 7, cy - 8, 14, 14);
      // Red comb
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(cx - 3, cy - 13, 6, 6);
      // Yellow beak
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(cx + 4, cy - 4, 5, 5);
      // Eyes
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(cx + 2, cy - 6, 2, 3);
      // Little feet
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(cx - 4, cy + 6, 3, 4);
      ctx.fillRect(cx + 1, cy + 6, 3, 4);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [chickenPos, selectedSpot]);

  const activeSpot = parkingSpots[selectedSpot];

  return (
    <section id="part2" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Title & Crossy Road Intro */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <span>🎮</span> Crossy Road Navigation System
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Cẩm Nang Hướng Dẫn Gửi Xe
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
          Trường KHTN ngày lễ tốt nghiệp sẽ rất đông và bãi xe trường dễ full sớm. 
          Bảo đã "quy hoạch" sẵn 4 bãi xe xung quanh trường để bạn tiện di chuyển nhất!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Crossy Road Game Map */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xl border-4 border-slate-800 flex flex-col items-center">
          
          {/* Game Top HUD */}
          <div className="w-full flex items-center justify-between text-xs font-mono text-emerald-400 mb-2 px-1 select-none">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              CROSSY HCMUS v1.0
            </span>
            <div className="flex items-center gap-3">
              <span className="text-amber-400">HOPS: {score}</span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">Phím: W A S D / Mũi tên</span>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-inner bg-slate-800">
            <canvas 
              ref={canvasRef} 
              width={400} 
              height={400} 
              className="block max-w-full h-auto cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = ((e.clientX - rect.left) / rect.width) * 400;
                const clickY = ((e.clientY - rect.top) / rect.height) * 400;

                // Check if clicked close to any spot
                parkingSpots.forEach((spot, idx) => {
                  const dist = Math.hypot(spot.targetCoords.x - clickX, spot.targetCoords.y - clickY);
                  if (dist < 35) {
                    selectSpot(idx);
                  }
                });
              }}
            />

            {/* In-game quick jump overlay */}
            <div className="absolute top-2 left-2 right-2 flex justify-between gap-1 pointer-events-auto">
              {parkingSpots.map((spot, idx) => (
                <button
                  key={spot.id}
                  onClick={() => selectSpot(idx)}
                  className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold transition-all ${
                    selectedSpot === idx
                      ? 'bg-amber-400 text-slate-900 shadow-md scale-105'
                      : 'bg-slate-900/80 text-white hover:bg-slate-800'
                  }`}
                >
                  {spot.name.split(' ')[2] || spot.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* D-Pad Controls for Mobile & Quick play */}
          <div className="mt-4 flex flex-col items-center gap-1 select-none">
            <div className="text-[11px] font-mono text-slate-400 mb-1">
              Điều khiển chú gà nhảy thăm bãi xe:
            </div>
            <button
              onClick={() => hopChicken(0, -25)}
              className="w-12 h-10 bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold rounded-lg border border-slate-600 shadow flex items-center justify-center text-sm"
            >
              ⬆️
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => hopChicken(-25, 0)}
                className="w-12 h-10 bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold rounded-lg border border-slate-600 shadow flex items-center justify-center text-sm"
              >
                ⬅️
              </button>
              <button
                onClick={() => hopChicken(0, 25)}
                className="w-12 h-10 bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold rounded-lg border border-slate-600 shadow flex items-center justify-center text-sm"
              >
                ⬇️
              </button>
              <button
                onClick={() => hopChicken(25, 0)}
                className="w-12 h-10 bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold rounded-lg border border-slate-600 shadow flex items-center justify-center text-sm"
              >
                ➡️
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Detailed Parking Guides */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Quick Select Tabs */}
          <div className="grid grid-cols-2 gap-2">
            {parkingSpots.map((spot, idx) => (
              <button
                key={spot.id}
                onClick={() => selectSpot(idx)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedSpot === idx
                    ? 'bg-white shadow-lg border-amber-400 ring-2 ring-amber-400/20'
                    : 'bg-white/60 hover:bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{spot.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${spot.badgeColor}`}>
                    {spot.id === 'sp' ? 'Cảnh báo ⚠️' : 'Bãi #' + (idx + 1)}
                  </span>
                </div>
                <div className="font-display font-bold text-xs sm:text-sm text-slate-800 truncate">
                  {spot.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {spot.distance}
                </div>
              </button>
            ))}
          </div>

          {/* Active Spot Detail Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 paper-shadow space-y-4">
            
            {/* Header info */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-md border ${activeSpot.recommendColor} mb-1.5`}>
                  {activeSpot.recommendLevel}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  {activeSpot.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  {activeSpot.address}
                </p>
              </div>
              <div className="text-3xl p-2 bg-slate-50 rounded-2xl border border-slate-100 shrink-0">
                {activeSpot.icon}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Khoảng cách</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{activeSpot.distance}</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Sức chứa</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{activeSpot.capacity}</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Giá gửi tham khảo</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-600 mt-0.5">{activeSpot.price}</div>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="space-y-2.5 text-xs sm:text-sm font-sans pt-1">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Ưu điểm:</strong> {activeSpot.pros}
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-start gap-2 ${
                activeSpot.id === 'sp'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-amber-50/70 border-amber-200/80 text-amber-900'
              }`}>
                <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${activeSpot.id === 'sp' ? 'text-rose-600' : 'text-amber-600'}`} />
                <div>
                  <strong>Lưu ý:</strong> {activeSpot.cons}
                </div>
              </div>
            </div>

            {/* Action Direct Link */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Footprints className="w-3.5 h-3.5" />
                Đi bộ vào cổng 227 Nguyễn Văn Cừ
              </span>

              <a
                href={activeSpot.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSuccess()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all hover:scale-105"
              >
                <span>Chỉ đường Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Quick Tip Banner */}
          <div className="bg-amber-100/70 border border-amber-300/80 rounded-2xl p-4 flex items-center gap-3 text-xs sm:text-sm text-amber-900">
            <span className="text-2xl">💡</span>
            <div>
              <strong>Lời khuyên từ Bảo Đinh:</strong> Nếu bạn đi ô tô hoặc xe máy vào khung giờ 10:30 - 11:30 trưa, gửi ở <strong>TTTM Nowzone</strong> là phương án thảnh thơi nhất, vừa mát mẻ lại không sợ cảnh chen chúc nghẽn bãi xe cổng trường!
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
