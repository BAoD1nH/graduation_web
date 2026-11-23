import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, ExternalLink, Navigation, Sparkles, CheckCircle2, 
  AlertTriangle, Map, Image as ImageIcon, ZoomIn, X, Download, Footprints 
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function Section2CrossyRoadMap() {
  const [selectedSpot, setSelectedSpot] = useState(0); // Default to Nowzone (Priority 1)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('crossy'); // 'crossy' or 'satellite'
  const canvasRef = useRef(null);

  const parkingSpots = [
    {
      id: "nowzone",
      priority: 1,
      priorityLabel: "ƯU TIÊN 1",
      name: "TTTM Nowzone",
      badge: "Lựa chọn số 1 ⭐⭐⭐⭐⭐",
      badgeColor: "bg-emerald-500 text-white",
      address: "235 Nguyễn Văn Cừ (Góc Nguyễn Văn Cừ & An Dương Vương)",
      distance: "~200m đi bộ (3 phút)",
      capacity: "Rất lớn (Ô tô & Xe máy)",
      price: "10.000đ - 15.000đ",
      recommendLevel: "RẤT KHUYẾN KHÍCH",
      recommendColor: "text-emerald-700 bg-emerald-50 border-emerald-300",
      pros: "Hầm xe rộng rãi, máy lạnh mát rượi, bảo vệ chuyên nghiệp, 100% không lo hết chỗ vào ngày lễ.",
      cons: "Mất 3 phút đi bộ tản bộ qua cổng KHTN.",
      googleMapsUrl: "https://maps.app.goo.gl/uYtkmbGVDWaaZ7bHA",
      targetCoords: { x: 100, y: 110 },
      icon: "🏬"
    },
    {
      id: "lhp",
      priority: 2,
      priorityLabel: "ƯU TIÊN 2",
      name: "THPT Chuyên Lê Hồng Phong",
      badge: "Lựa chọn an toàn ⭐⭐⭐⭐",
      badgeColor: "bg-blue-500 text-white",
      address: "280 An Dương Vương, P.4, Q.5 (Đối diện xéo KHTN)",
      distance: "~100m đi bộ (2 phút)",
      capacity: "Trung bình - Lớn (Xe máy)",
      price: "5.000đ - 10.000đ",
      recommendLevel: "KHUYẾN KHÍCH",
      recommendColor: "text-blue-700 bg-blue-50 border-blue-300",
      pros: "Sân trường rợp bóng cây cổ thụ mát mẻ, an ninh tốt, đi bộ sang cổng KHTN chỉ 2 phút.",
      cons: "Ưu tiên xe máy, thường đông từ 10h trưa.",
      googleMapsUrl: "https://maps.app.goo.gl/GDKASLir5XvnroQh7",
      targetCoords: { x: 280, y: 120 },
      icon: "🏫"
    },
    {
      id: "khtn",
      priority: 3,
      priorityLabel: "ƯU TIÊN 3",
      name: "ĐH Khoa học Tự nhiên (KHTN)",
      badge: "Ngay tại trường ⭐⭐⭐",
      badgeColor: "bg-amber-500 text-white",
      address: "227 Nguyễn Văn Cừ, P. Chợ Quán, Q.5",
      distance: "0m (Bước lên là tới sân trường)",
      capacity: "Bãi xe sinh viên KHTN",
      price: "5.000đ",
      recommendLevel: "CẦN ĐẾN SỚM",
      recommendColor: "text-amber-700 bg-amber-50 border-amber-300",
      pros: "Gửi xong đi thẳng vào khu vực sân khấu chụp ảnh với Bảo, có sơ đồ map.png hướng dẫn cách đi.",
      cons: "⚠️ CỰC KỲ DỄ FULL CHỖ VÀO NGÀY LỄ TỐT NGHIỆP! Khuyên bạn phải đến trước 10:30 ít nhất 30 phút.",
      googleMapsUrl: "https://maps.app.goo.gl/zoMs42Yr9ZaQbbBNA",
      targetCoords: { x: 190, y: 220 },
      icon: "🎓"
    },
    {
      id: "sp",
      priority: 4,
      priorityLabel: "ƯU TIÊN 4",
      name: "Đại học Sư Phạm (HCMUE)",
      badge: "Không khuyến khích :\"( ⚠️",
      badgeColor: "bg-rose-500 text-white",
      address: "280 An Dương Vương, P.4, Q.5 (Sát vách KHTN)",
      distance: "~50m đi bộ",
      capacity: "Xe máy",
      price: "5.000đ",
      recommendLevel: "KHÔNG NÊN VÀO :\"",
      recommendColor: "text-rose-700 bg-rose-50 border-rose-300",
      pros: "Vị trí sát vách trường KHTN.",
      cons: "❌ BẢO VỆ KHÁ KHÓ TÍNH! Ngày lễ tốt nghiệp thường kiểm tra thẻ sinh viên Sư Phạm nghiêm ngặt, khách ngoài rất dễ bị từ chối bắt quay đầu.",
      googleMapsUrl: "https://maps.app.goo.gl/uMwfRXAAG4qNJHz6A",
      targetCoords: { x: 310, y: 290 },
      icon: "🚫"
    }
  ];

  // Animated Crossy Road Isometric Map Canvas (No game controls, just aesthetic visual map)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let tick = 0;

    // Moving voxel cars
    const cars = [
      { x: 30, y: 165, speed: 1.5, color: '#38bdf8', len: 45 },
      { x: 210, y: 165, speed: 1.5, color: '#fb923c', len: 40 },
      { x: 320, y: 255, speed: -1.3, color: '#facc15', len: 50 },
      { x: 140, y: 255, speed: -1.3, color: '#ec4899', len: 42 },
      { x: 70, y: 325, speed: 1.8, color: '#4ade80', len: 40 }
    ];

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Background: Voxel / Isometric Lanes ---
      
      // Top grass zone (Nowzone & LHP area)
      ctx.fillStyle = '#6bc752';
      ctx.fillRect(0, 0, 400, 65);
      ctx.fillStyle = '#59b042';
      for (let i = 0; i < 400; i += 30) {
        ctx.fillRect(i, 0, 15, 65);
      }

      // River canal
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(0, 65, 400, 30);
      ctx.fillStyle = '#7dd3fc';
      ctx.fillRect((tick % 70) * 6, 75, 40, 4);

      // Middle Grass strip
      ctx.fillStyle = '#6bc752';
      ctx.fillRect(0, 95, 400, 50);
      ctx.fillStyle = '#59b042';
      for (let i = 0; i < 400; i += 30) {
        ctx.fillRect(i, 95, 15, 50);
      }

      // Main Road 1: Nguyen Van Cu Ave
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 145, 400, 50);
      // Dashed lane markings
      ctx.fillStyle = '#f8fafc';
      for (let x = 10; x < 400; x += 35) {
        ctx.fillRect(x, 168, 18, 4);
      }

      // Middle Campus Entrance Grass (KHTN Campus Yard)
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(0, 195, 400, 40);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, 208, 400, 14);

      // Main Road 2: An Duong Vuong Ave
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 235, 400, 50);
      ctx.fillStyle = '#f8fafc';
      for (let x = 10; x < 400; x += 35) {
        ctx.fillRect(x, 258, 18, 4);
      }

      // Secondary road
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, 305, 400, 45);
      ctx.fillStyle = '#cbd5e1';
      for (let x = 5; x < 400; x += 30) {
        ctx.fillRect(x, 326, 14, 3);
      }

      // Bottom Grass strip
      ctx.fillStyle = '#6bc752';
      ctx.fillRect(0, 350, 400, 50);
      ctx.fillStyle = '#59b042';
      for (let i = 0; i < 400; i += 30) {
        ctx.fillRect(i, 350, 15, 50);
      }

      // --- Moving Voxel Cars ---
      cars.forEach(car => {
        car.x += car.speed;
        if (car.speed > 0 && car.x > 420) car.x = -car.len;
        if (car.speed < 0 && car.x < -car.len) car.x = 420;

        // Voxel car body
        ctx.fillStyle = car.color;
        ctx.fillRect(car.x, car.y - 10, car.len, 20);
        // Cabin
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(car.x + (car.speed > 0 ? 8 : 6), car.y - 8, car.len - 15, 16);
        // Roof
        ctx.fillStyle = car.color;
        ctx.fillRect(car.x + (car.speed > 0 ? 12 : 10), car.y - 6, car.len - 22, 12);
        // Headlights
        ctx.fillStyle = '#fef08a';
        if (car.speed > 0) {
          ctx.fillRect(car.x + car.len - 2, car.y - 8, 3, 4);
          ctx.fillRect(car.x + car.len - 2, car.y + 4, 3, 4);
        } else {
          ctx.fillRect(car.x - 1, car.y - 8, 3, 4);
          ctx.fillRect(car.x - 1, car.y + 4, 3, 4);
        }
      });

      // --- Voxel Trees around map ---
      const trees = [
        { x: 25, y: 30 }, { x: 365, y: 30 },
        { x: 180, y: 110 }, { x: 20, y: 110 }, { x: 365, y: 110 },
        { x: 30, y: 210 }, { x: 365, y: 210 },
        { x: 20, y: 365 }, { x: 370, y: 365 }
      ];
      trees.forEach(t => {
        ctx.fillStyle = '#78350f';
        ctx.fillRect(t.x + 5, t.y + 12, 5, 10);
        ctx.fillStyle = '#15803d';
        ctx.fillRect(t.x, t.y, 16, 14);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(t.x + 2, t.y + 2, 12, 10);
      });

      // --- Draw Parking Landmark Pins on the Map ---
      parkingSpots.forEach((spot, idx) => {
        const isSelected = selectedSpot === idx;
        const target = spot.targetCoords;

        // Voxel building pad
        ctx.fillStyle = isSelected ? '#fbbf24' : '#ffffff';
        ctx.beginPath();
        ctx.roundRect(target.x - 18, target.y - 18, 36, 36, [10]);
        ctx.fill();
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.strokeStyle = isSelected ? '#b45309' : '#94a3b8';
        ctx.stroke();

        // Icon inside landmark
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(spot.icon, target.x, target.y);

        // Priority Badge Pill (Ưu tiên 1, 2, 3, 4)
        ctx.font = 'bold 8px "Space Grotesk", sans-serif';
        const badgeText = `#${spot.priority} ${spot.name.split(' ')[0]}`;
        const labelWidth = ctx.measureText(badgeText).width + 8;
        ctx.fillStyle = isSelected ? '#0f172a' : 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(target.x - labelWidth / 2, target.y + 22, labelWidth, 14);
        ctx.fillStyle = isSelected ? '#facc15' : '#ffffff';
        ctx.fillText(badgeText, target.x, target.y + 29);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [selectedSpot]);

  const activeSpot = parkingSpots[selectedSpot];

  const handleSpotClick = (index) => {
    sound.playTap();
    setSelectedSpot(index);
  };

  return (
    <section id="part2" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <span>🚗</span> Crossy Road Style Campus & Parking Guide
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Hướng Dẫn Chỗ Gửi Xe & Sơ Đồ Đến KHTN
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
          Bản đồ thiết kế phong cách Crossy Road trực quan với 4 bãi xe theo thứ tự ưu tiên, 
          kèm link Google Maps và sơ đồ khuôn viên (map.png) hướng dẫn cách đi bộ vào sân trường!
        </p>

        {/* View Switcher: Crossy Road Map vs Sơ đồ thực tế map.png */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <button
            onClick={() => {
              sound.playTap();
              setActiveViewTab('crossy');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeViewTab === 'crossy'
                ? 'bg-slate-900 text-white shadow-md scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>🎮 Bản Đồ Crossy Road</span>
          </button>

          <button
            onClick={() => {
              sound.playTap();
              setActiveViewTab('satellite');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeViewTab === 'satellite'
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>🗺️ Sơ Đồ Thực Tế (map.png)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Crossy Road Isometric Map Canvas OR Satellite Map Preview */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xl border-4 border-slate-800 flex flex-col items-center">
          
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between text-xs font-mono text-emerald-400 mb-2 px-1 select-none">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {activeViewTab === 'crossy' ? 'CROSSY ROAD CAMPUS MAP' : 'SƠ ĐỒ VỆ TINH KHTN (map.png)'}
            </span>
            <span className="text-amber-400 font-bold">
              4 ĐỊA ĐIỂM ƯU TIÊN
            </span>
          </div>

          {activeViewTab === 'crossy' ? (
            /* Crossy Road Canvas */
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-inner bg-slate-800 w-full">
              <canvas 
                ref={canvasRef} 
                width={400} 
                height={400} 
                className="block w-full h-auto cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = ((e.clientX - rect.left) / rect.width) * 400;
                  const clickY = ((e.clientY - rect.top) / rect.height) * 400;

                  // Click on any spot landmark to select it
                  parkingSpots.forEach((spot, idx) => {
                    const dist = Math.hypot(spot.targetCoords.x - clickX, spot.targetCoords.y - clickY);
                    if (dist < 35) {
                      handleSpotClick(idx);
                    }
                  });
                }}
              />

              {/* Click hints overlay */}
              <div className="absolute bottom-2 inset-x-2 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[11px] flex items-center justify-between border border-white/10 select-none">
                <span className="text-amber-300 font-mono">💡 Chạm vào các điểm trên map để xem</span>
                <span className="text-slate-300">Đang chọn: <strong>{activeSpot.name}</strong></span>
              </div>
            </div>
          ) : (
            /* Sơ Đồ Thực Tế map.png */
            <div 
              onClick={() => setIsMapModalOpen(true)}
              className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-inner bg-slate-800 w-full aspect-square flex items-center justify-center cursor-pointer group"
              title="Click để phóng to toàn màn hình"
            >
              <img
                src="map.png"
                alt="Sơ đồ vệ tinh trường KHTN"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center gap-2 text-xs font-bold">
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>Phóng to sơ đồ</span>
                </div>
              </div>
              <div className="absolute bottom-2 inset-x-2 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[11px] flex items-center justify-between border border-white/10">
                <span>📍 Sơ đồ toàn cảnh KHTN & bãi xe</span>
                <span className="text-amber-300 font-bold">Click để phóng to</span>
              </div>
            </div>
          )}

          {/* Quick jump pills */}
          <div className="w-full grid grid-cols-4 gap-1.5 mt-3">
            {parkingSpots.map((spot, idx) => (
              <button
                key={spot.id}
                onClick={() => handleSpotClick(idx)}
                className={`py-1.5 px-1 rounded-xl text-[11px] font-mono font-bold transition-all truncate text-center ${
                  selectedSpot === idx
                    ? 'bg-amber-400 text-slate-900 shadow-md scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                #{spot.priority} {spot.name.split(' ')[0]}
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Detailed Parking Guides with Exact Google Maps Links */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* 4 Priority Select Tabs */}
          <div className="grid grid-cols-2 gap-2">
            {parkingSpots.map((spot, idx) => (
              <button
                key={spot.id}
                onClick={() => handleSpotClick(idx)}
                className={`p-3 rounded-2xl border text-left transition-all relative ${
                  selectedSpot === idx
                    ? 'bg-white shadow-lg border-amber-400 ring-2 ring-amber-400/20'
                    : 'bg-white/60 hover:bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{spot.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${spot.badgeColor}`}>
                    {spot.priorityLabel}
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
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-md border ${activeSpot.recommendColor}`}>
                    {activeSpot.recommendLevel}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {activeSpot.priorityLabel}
                  </span>
                </div>
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
                <div className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Giá tham khảo</div>
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

            {/* Action Buttons: Direct Google Maps Link + Xem map.png */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
              {/* Button mở sơ đồ map.png */}
              <button
                onClick={() => {
                  sound.playPop();
                  setIsMapModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-200"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Xem sơ đồ KHTN (map.png)</span>
              </button>

              {/* Exact Google Maps Link provided by user */}
              <a
                href={activeSpot.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSuccess()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all hover:scale-105 active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Mở Google Maps chỉ đường</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Quick Tip Banner */}
          <div className="bg-amber-100/70 border border-amber-300/80 rounded-2xl p-4 flex items-center gap-3 text-xs sm:text-sm text-amber-900">
            <span className="text-2xl">💡</span>
            <div>
              <strong>Lời khuyên từ Bảo Đinh:</strong> Bạn nên ưu tiên gửi ở <strong>Ưu tiên 1: TTTM Nowzone</strong> (rộng rãi, mát mẻ không lo hết chỗ) hoặc <strong>Ưu tiên 2: THPT Lê Hồng Phong</strong>. Sau đó tản bộ vào cổng KHTN theo sơ đồ <strong>map.png</strong> là thuận tiện nhất!
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal: Xem toàn cảnh sơ đồ KHTN map.png */}
      {isMapModalOpen && (
        <div 
          onClick={() => setIsMapModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none"
        >
          {/* Top Bar */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-4 sm:px-8 z-50 text-white">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-amber-400" />
              <span className="font-display font-bold text-base sm:text-lg">
                Sơ Đồ Vệ Tinh & Hướng Đi Đến Sân Trường KHTN
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="map.png"
                download="So_Do_KHTN_map.png"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                title="Tải ảnh sơ đồ về máy"
              >
                <Download className="w-5 h-5" />
              </a>

              <button
                onClick={() => setIsMapModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                title="Đóng (ESC)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Centered Image */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-[92vw] flex items-center justify-center rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900"
          >
            <img
              src="map.png"
              alt="Sơ đồ chi tiết khuôn viên KHTN và các bãi xe"
              className="max-h-[82vh] max-w-[90vw] w-auto h-auto object-contain"
            />
          </div>

          {/* Bottom Note */}
          <div className="absolute bottom-4 inset-x-4 text-center text-xs text-slate-300 font-sans pointer-events-none">
            <span className="bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
              💡 Tham khảo vị trí Nowzone, Lê Hồng Phong, KHTN và ĐH Sư Phạm trên ảnh vệ tinh
            </span>
          </div>
        </div>
      )}

    </section>
  );
}
