import React from 'react';
import { Play, Plus, ThumbsUp, VolumeX } from 'lucide-react';

const FeaturedBanner = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
      {/* Background Image */}
      <img 
        src="https://image.tmdb.org/t/p/original/orjiB3oUIsyz60hoEqkiGpy5CeO.jpg" 
        alt="Avengers Endgame" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/40 to-transparent z-10" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-bg-main to-transparent z-10" />

      {/* Content */}
      <div className="absolute bottom-16 left-0 right-0 z-20 flex flex-col items-center justify-end h-full px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Avengers : Endgame
        </h1>
        <p className="text-text-muted text-sm md:text-base max-w-3xl mb-8 leading-relaxed drop-shadow">
          With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-brand-red hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition-all shadow-lg">
            <Play fill="currentColor" size={20} />
            Play Now
          </button>
          
          <div className="flex gap-4">
             <button className="bg-bg-card border border-border-card text-white p-3 rounded-lg hover:bg-bg-card-hover transition-colors">
               <Plus size={20} />
             </button>
             <button className="bg-bg-card border border-border-card text-white p-3 rounded-lg hover:bg-bg-card-hover transition-colors">
               <ThumbsUp size={20} />
             </button>
             <button className="bg-bg-card border border-border-card text-white p-3 rounded-lg hover:bg-bg-card-hover transition-colors hidden md:block">
               <VolumeX size={20} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
