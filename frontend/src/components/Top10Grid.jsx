import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Top10Grid = ({ title, categories }) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-bg-card p-5 rounded-2xl border border-border-card group hover:border-[#333] transition-all cursor-pointer">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 mb-4">
               {cat.images.map((img, i) => (
                 <img key={i} src={img} alt={cat.name} className="w-full h-[120px] object-cover rounded shadow-md group-hover:scale-105 transition-transform duration-300" />
               ))}
            </div>
            
            <div className="flex items-center justify-between text-white mt-1">
              <div className="flex flex-col gap-1 items-start">
                 <span className="bg-brand-red text-white text-xs font-bold px-2 py-0.5 rounded">Top 10</span>
                 <span className="font-semibold text-sm">{cat.name}</span>
              </div>
              <ArrowRight size={18} className="text-text-muted group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Top10Grid;
