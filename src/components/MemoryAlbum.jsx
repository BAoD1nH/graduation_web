import React, { useState } from 'react';
import { Camera, Sparkles, X, ChevronLeft, ChevronRight, Tag, Calendar, Heart, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { memoryPhotos } from '../data/galleryData';
import { sound } from '../utils/audio';

export default function MemoryAlbum() {
  const [selectedTag, setSelectedTag] = useState('Tất cả');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const tags = ['Tất cả', 'KHTN Campus', 'Bạn bè & Đồ án', 'Đời sinh viên'];

  const filteredPhotos = selectedTag === 'Tất cả'
    ? memoryPhotos
    : memoryPhotos.filter(p => p.tag === selectedTag);

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const openLightbox = (idx) => {
    sound.playPop();
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    sound.playTap();
    setLightboxIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    sound.playTap();
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    sound.playTap();
    setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  // Keyboard navigation for Lightbox
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  return (
    <div className="my-14">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Camera className="w-3.5 h-3.5 text-amber-700" />
          Memories Scrapbook • 2022 - 2026
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Album Kỷ Niệm Thời Đại Học
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
          Những khoảnh khắc đáng nhớ nhất cùng bạn bè, giảng đường và những năm tháng thanh xuân tại HCMUS
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                sound.playTap();
                setSelectedTag(tag);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedTag === tag
                  ? 'bg-slate-900 text-white shadow-md scale-105'
                  : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0">
        {filteredPhotos.map((photo, index) => {
          const hasError = imageErrors[photo.id];

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className={`group cursor-pointer bg-white p-3.5 sm:p-4 pb-6 sm:pb-8 rounded-2xl shadow-md hover:shadow-2xl border border-slate-200/90 transition-all duration-300 transform ${photo.rotate} hover:rotate-0 hover:scale-[1.03] hover:z-20 relative`}
            >
              {/* Decorative Masking Tape */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 ${photo.tapeColor} -rotate-1 border-l-2 border-r-2 border-dashed shadow-xs z-10 pointer-events-none`}></div>

              {/* Photo Frame Container */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 flex items-center justify-center">
                {hasError ? (
                  // Aesthetic Nostalgic Placeholder when file is not yet uploaded
                  <div className="w-full h-full bg-gradient-to-br from-amber-50 via-orange-50 to-sky-50 flex flex-col items-center justify-center p-4 text-center select-none">
                    <span className="text-4xl mb-2">{photo.emoji}</span>
                    <div className="text-xs font-bold text-slate-700">{photo.title}</div>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                      <ImageIcon className="w-3 h-3 text-amber-500" />
                      <span>Thêm ảnh vào public/{photo.src}</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.title}
                    onError={() => handleImageError(photo.id)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-2 rounded-full bg-slate-900/70 backdrop-blur-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Tag pill */}
                <div className="absolute top-2 left-2 bg-slate-900/75 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[10px] font-mono font-medium">
                  {photo.tag}
                </div>
              </div>

              {/* Handwriting Caption & Date under Polaroid */}
              <div className="mt-3.5 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-500" />
                    {photo.date}
                  </span>
                  <span>#{photo.id}</span>
                </div>
                
                <h3 className="font-display font-bold text-slate-800 text-sm sm:text-base leading-snug">
                  {photo.title}
                </h3>
                
                <p className="font-handwriting text-lg sm:text-xl text-slate-600 leading-tight">
                  "{photo.caption}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helper Banner for dropping photos */}
      <div className="mt-8 bg-white/70 border border-dashed border-amber-300 rounded-2xl p-4 text-center max-w-xl mx-auto text-xs text-slate-500">
        <span className="font-bold text-amber-800">📸 Hướng dẫn thêm ảnh:</span> Bạn có thể lưu các file ảnh của mình vào thư mục <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono">public/gallery/</code> (ví dụ: <code className="font-mono">photo_01.jpg</code>, <code className="font-mono">photo_02.jpg</code>...) là ảnh sẽ hiển thị ngay lập tức!
      </div>

      {/* Lightbox Modal (Phóng to xem ảnh full size) */}
      {lightboxIndex !== null && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            title="Đóng (ESC)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
            title="Ảnh trước (Mũi tên trái)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextPhoto}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
            title="Ảnh tiếp theo (Mũi tên phải)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Card */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/20"
          >
            {/* Image Preview */}
            <div className="relative bg-slate-900 aspect-[16/10] sm:aspect-[16/10] flex items-center justify-center overflow-hidden">
              {imageErrors[filteredPhotos[lightboxIndex].id] ? (
                <div className="flex flex-col items-center justify-center text-white text-center p-6">
                  <span className="text-6xl mb-3">{filteredPhotos[lightboxIndex].emoji}</span>
                  <div className="text-lg font-bold">{filteredPhotos[lightboxIndex].title}</div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">public/{filteredPhotos[lightboxIndex].src}</div>
                </div>
              ) : (
                <img
                  src={filteredPhotos[lightboxIndex].src}
                  alt={filteredPhotos[lightboxIndex].title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Photo Details Footer */}
            <div className="p-5 sm:p-6 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  {filteredPhotos[lightboxIndex].date} • {filteredPhotos[lightboxIndex].tag}
                </span>
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl">
                {filteredPhotos[lightboxIndex].title}
              </h3>

              <p className="font-handwriting text-xl sm:text-2xl text-slate-700 leading-snug">
                "{filteredPhotos[lightboxIndex].caption}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
