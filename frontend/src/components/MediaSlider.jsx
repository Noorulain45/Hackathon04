import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, Play, Star } from 'lucide-react';

const MediaSlider = ({ title, mediaList, showRatings = false }) => {
  return (
    <section className="py-8 px-8 max-w-[1400px] mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-4 bg-[#0F0F0F] p-2 rounded-xl border border-border-card hidden md:flex">
          <button className="bg-bg-card p-2 rounded-xl hover:bg-bg-card-hover transition">
            <ChevronLeft size={16} className="text-white" />
          </button>
          <div className="flex items-center gap-1 mx-2">
             <span className="w-4 h-1 bg-brand-red rounded-full"></span>
             <span className="w-1 h-1 bg-border-card rounded-full"></span>
             <span className="w-1 h-1 bg-border-card rounded-full"></span>
          </div>
          <button className="bg-bg-card p-2 rounded-xl hover:bg-bg-card-hover transition">
            <ChevronRight size={16} className="text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {mediaList.map((media, idx) => (
          <Link to="/movie" state={{ video: media }} key={idx} className="bg-bg-card p-3 rounded-2xl border border-border-card group hover:border-[#333] transition-all cursor-pointer block">
            <div className="relative w-full aspect-[2/3] mb-3 overflow-hidden rounded-xl">
               <img src={media.poster || media.thumbnailUrl} alt="poster" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            
            <div className="flex flex-col gap-2">
               <div className="flex items-center justify-between text-xs text-text-muted bg-[#1A1A1A] p-2 rounded-md border border-border-card">
                  <div className="flex items-center gap-1 bg-[#141414] px-2 py-1 rounded-full border border-[#222]">
                    <Eye size={12} /> <span className="font-medium">{media.views || '1K'}</span>
                  </div>
                  {showRatings ? (
                     <div className="flex items-center gap-1 text-brand-red">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} className="opacity-30" />
                     </div>
                  ) : (
                     <div className="flex items-center gap-1 bg-[#141414] px-2 py-1 rounded-full border border-[#222]">
                       <Play size={12} /> <span className="font-medium">{media.duration || '1h 30m'}</span>
                     </div>
                  )}
               </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MediaSlider;
