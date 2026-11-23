import React, { useState } from 'react';
import { 
  MapPin, ExternalLink, Navigation, Sparkles, CheckCircle2, 
  AlertTriangle, Map, ZoomIn, X, Download, Footprints, Layers 
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function Section2CrossyRoadMap() {
  const [selectedSpot, setSelectedSpot] = useState(0);
  const [selectedMapIndex, setSelectedMapIndex] = useState(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const mapViews = [
    { id: 'nowzone', label: '#1 Nowzone', image: 'nowzone.png' },
    { id: 'lhp', label: '#2 THPT LHP', image: 'lhp.png' },
    { id: 'hcmue', label: '#3 HCMUE', image: 'hcmue.jpg' },
    { id: 'hcmus', label: '#4 HCMUS', image: 'hcmus.png' },
    { id: 'map', label: '#5 Map', image: 'map.png' }
  ];

  const parkingSpots = [
    {
      id: "nowzone",
      mapId: 'nowzone',
      priority: 1,
      priorityLabel: "ƯU TIÊN 1",
      name: "Bãi xe Nowzone",
      badge: "Lựa chọn số 1 ⭐⭐⭐⭐⭐",
      badgeColor: "bg-emerald-500 text-white",
      address: "235 Nguyễn Văn Cừ, Cầu Ông Lãnh, Hồ Chí Minh",
      distance: "~200m đi bộ (3 phút)",
      capacity: "Rất lớn (Ô tô & Xe máy)",
      price: "5.000đ",
      recommendLevel: "RẤT KHUYẾN KHÍCH",
      recommendColor: "text-emerald-700 bg-emerald-50 border-emerald-300",
      pros: "Hầm xe rộng rãi, 100% không lo hết chỗ vào ngày lễ.",
      cons: "Phải sang đường, đi bộ thêm 1 khoảng hơi lâu nữa",
      googleMapsUrl: "https://maps.app.goo.gl/uYtkmbGVDWaaZ7bHA",
      icon: "🏬"
    },
    {
      id: "lhp",
      mapId: 'lhp',
      priority: 2,
      priorityLabel: "ƯU TIÊN 2",
      name: "Bãi xe THPT Chuyên LHP",
      badge: "Lựa chọn an toàn ⭐⭐⭐⭐",
      badgeColor: "bg-blue-500 text-white",
      address: "235 Nguyễn Văn Cừ, Chợ Quán, Hồ Chí Minh",
      distance: "~100m đi bộ (2 phút)",
      capacity: "Trung bình - Lớn (Xe máy)",
      price: "4.000đ",
      recommendLevel: "KHUYẾN KHÍCH",
      recommendColor: "text-blue-700 bg-blue-50 border-blue-300",
      pros: "Mình hay gửi đây, dễ gửi dễ lấy không cần phải đợi lâu.",
      cons: "Chắc không có đâu",
      googleMapsUrl: "https://maps.app.goo.gl/GDKASLir5XvnroQh7",
      icon: "🏫"
    },
    {
      id: "khtn",
      mapId: 'hcmus',
      priority: 4,
      priorityLabel: "ƯU TIÊN 4",
      name: "bãi xe ĐH KHTN",
      badge: "Ngay tại trường ⭐⭐⭐",
      badgeColor: "bg-amber-500 text-white",
      address: "227 Nguyễn Văn Cừ, P. Chợ Quán, Hồ Chí Minh",
      distance: "0m (Bước lên là tới sân trường)",
      capacity: "Bãi xe sinh viên KHTN",
      price: "4.000đ",
      recommendLevel: "Không khuyến khích",
      recommendColor: "text-amber-700 bg-amber-50 border-amber-300",
      pros: "Ngay trong trường, tiện đi lên sân trường.",
      cons: "Hơi chật với lại phải đến sớm trước 9:00 thì may ra còn chỗ =)))",
      googleMapsUrl: "https://maps.app.goo.gl/zoMs42Yr9ZaQbbBNA",
      icon: "🎓"
    },
    {
      id: "sp",
      mapId: 'hcmue',
      priority: 3,
      priorityLabel: "ƯU TIÊN 3",
      name: "Bãi xe ĐH Sư phạm",
      badge: "Thích thì gửi thôi",
      badgeColor: "bg-rose-500 text-white",
      address: "280 An Dương Vương, Chợ Quán, Hồ Chí Minh",
      distance: "~50m đi bộ",
      capacity: "Xe máy",
      price: "5.000đ",
      recommendLevel: "Sao cũng được",
      recommendColor: "text-rose-700 bg-rose-50 border-rose-300",
      pros: "Bãi xe rộng rãi",
      cons: "Hên xui hết chỗ, tội nghiệp sv sư phạm bị chiếm chỗ =))",
      googleMapsUrl: "https://maps.app.goo.gl/uMwfRXAAG4qNJHz6A",
      icon: "🏫"
    },
  ];

  const activeSpot = parkingSpots[selectedSpot];
  const activeMap = mapViews[selectedMapIndex];

  const handleSpotClick = (index) => {
    sound.playTap();
    setSelectedSpot(index);
    const mapIndex = mapViews.findIndex((view) => view.id === parkingSpots[index].mapId);
    if (mapIndex >= 0) setSelectedMapIndex(mapIndex);
  };

  const openMapModal = () => {
    sound.playPop();
    setIsMapModalOpen(true);
  };

  return (
    <section id="part2" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <span>🗺️</span> Campus Navigation & Parking Guide
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Hướng dẫn gửi xe
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
          Nên ưu tiên bãi xe Nowzone và THPT Chuyên Lê Hồng Phong nha mọi người ^^
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Sơ Đồ Thực Tế map.png */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-200/80 paper-shadow flex flex-col items-center">
          
          {/* Top Bar on Card */}
          <div className="w-full flex items-center justify-between text-xs font-sans font-bold text-slate-700 mb-3 px-1 select-none">
            <span className="flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-600" />
              {activeMap.label}
            </span>
          </div>

          {/* Image Container with Zoom On Click */}
          <div 
            onClick={openMapModal}
            className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-900 w-full aspect-[4/3] sm:aspect-square flex items-center justify-center cursor-pointer group"
            title="Click để phóng to sơ đồ xem chi tiết"
          >
            <img
              src={activeMap.image}
              alt={`${activeMap.label} parking and campus map`}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <div className="px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center gap-2 text-xs font-bold shadow-lg">
                <ZoomIn className="w-4 h-4 text-amber-400" />
                <span>Phóng to xem chi tiết</span>
              </div>
            </div>

            {/* Bottom bar on image */}
            <div className="absolute bottom-2.5 inset-x-2.5 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[11px] flex items-center justify-between border border-white/10 select-none">
              <span className="flex items-center gap-1.5 font-medium">
                <Footprints className="w-3.5 h-3.5 text-amber-400" />
                Xem vị trí Nowzone, Lê Hồng Phong, KHTN
              </span>
              <span className="text-amber-300 font-bold hidden sm:inline">Click để zoom</span>
            </div>
          </div>

          {/* 4 Quick Priority Selector Pills under Image */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-1.5 mt-3 select-none">
            {mapViews.map((mapView, idx) => (
              <button
                key={mapView.id}
                onClick={() => {
                  sound.playTap();
                  setSelectedMapIndex(idx);
                  const spotIndex = parkingSpots.findIndex((spot) => spot.mapId === mapView.id);
                  if (spotIndex >= 0) setSelectedSpot(spotIndex);
                }}
                className={`py-2 px-1 rounded-xl text-[11px] font-mono font-bold transition-all truncate text-center ${
                  selectedMapIndex === idx
                    ? 'bg-slate-900 text-amber-400 shadow-md scale-105 border border-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {mapView.label}
              </button>
            ))}
          </div>

          {/* Quick Note under map */}
          <div className="w-full mt-3 text-center text-xs text-slate-500 font-sans">
            💡 Bạn có thể click vào ảnh sơ đồ để phóng to toàn màn hình bất kỳ lúc nào!
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

            {/* Action Buttons: Direct Google Maps Link + Phóng to map.png */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
              {/* Button mở sơ đồ map.png */}
              <button
                onClick={openMapModal}
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-blue-200"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Phóng to sơ đồ KHTN</span>
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
              <strong>Tips:</strong> Nên ưu tiên gửi ở <strong>Nowzone</strong> hoặc <strong>Lê Hồng Phong</strong> xong đi bộ qua KHTN là thuận tiện nhất!
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
                {activeMap.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activeMap.image}
                download={activeMap.image}
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
              src={activeMap.image}
              alt={`${activeMap.label} parking and campus map`}
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
