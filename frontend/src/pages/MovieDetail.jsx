import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import { Play, Plus, ThumbsUp, VolumeX, Calendar, Languages, Star, User2, Music2, PlusCircle, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const MovieDetail = () => {
  const { user, setIsAuthModalOpen, setIsSubModalOpen } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const video = location.state?.video;

  const [isPlaying, setIsPlaying] = useState(false);

  // For this hackathon, we require authentication to play, and subscription if it's premium.
  // We can assume uploaded videos are premium by default or just require standard auth.
  const isPremiumMovie = true; 

  const handlePlayClick = () => {
     if (!user) {
        setIsAuthModalOpen(true);
     } else if (isPremiumMovie && user.role !== 'admin' && (!user.subscription?.isActive || user.subscription?.plan === 'basic')) {
        setIsSubModalOpen(true);
     } else {
        setIsPlaying(true);
     }
  };

  // Fallback dummy data if no video object is passed
  const title = video?.title || "Kantara";
  const description = video?.description || "When greed paves the way for betrayal, scheming and murder, a young tribal reluctantly dons the traditions of his ancestors to seek justice.";
  const thumbnailUrl = video?.thumbnailUrl || "https://image.tmdb.org/t/p/original/bQLmMUVy5LSZc13F2v2n4K0hGzJ.jpg";
  const releaseYear = video?.releaseYear || "2022";
  const genres = video?.genre || ['Action', 'Adventure', 'Mythology'];
  const videoUrl = video?.videoUrl || null;

  return (
    <div className="min-h-screen flex flex-col font-body bg-bg-main text-white">
      <Navbar />
      
      <main className="flex-1 pb-16 pt-24 px-8 max-w-[1400px] mx-auto w-full">
        {/* Banner Section */}
        <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden mb-12 bg-black">
          {isPlaying && videoUrl ? (
            <video 
              src={videoUrl} 
              autoPlay 
              controls 
              className="absolute inset-0 w-full h-full object-contain bg-black z-30"
            />
          ) : (
            <>
              {/* Background Image */}
              <img 
                src={thumbnailUrl} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent z-10" />

              {/* Banner Content */}
              <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center justify-end px-4 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                  {title}
                </h1>
                <p className="text-text-muted text-sm md:text-base max-w-2xl mb-8 leading-relaxed drop-shadow">
                  {description}
                </p>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={handlePlayClick}
                    className="bg-brand-red hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition-all shadow-lg"
                  >
                    {isPremiumMovie && user?.role !== 'admin' && (!user || !user.subscription?.isActive || user.subscription?.plan === 'basic') ? (
                       <><Lock size={18} className="mr-1" /> Unlock to Play</>
                    ) : (
                       <><Play fill="currentColor" size={20} /> Play Now</>
                    )}
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
            </>
          )}
        </div>

        {/* Info Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left Column - 2/3 width */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
            {/* Description */}
            <div className="bg-bg-card border border-border-card rounded-2xl p-8">
               <h3 className="text-xl font-semibold mb-4 text-text-muted">Description</h3>
               <p className="text-white text-sm md:text-base leading-relaxed">
                 {description}
               </p>
            </div>

            {/* Cast */}
            <div className="bg-bg-card border border-border-card rounded-2xl p-8">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-semibold text-text-muted">Cast</h3>
               </div>
               {/* Horizontal scrolling avatars avatar list */}
               <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
                 {[
                   { name: 'Rishab Shetty', src: 'https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg' },
                   { name: 'Kishore', src: 'https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg' },
                   { name: 'Achyuth Kumar', src: 'https://image.tmdb.org/t/p/w200/yF1eOkaYvwiORauRCPWznV9xVvi.jpg' },
                   { name: 'Sapthami Gowda', src: 'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg' },
                   { name: 'Pramod Shetty', src: 'https://image.tmdb.org/t/p/w200/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg' },
                   { name: 'Manasi', src: 'https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg' },
                 ].map((actor, idx) => (
                   <div key={idx} className="shrink-0 flex flex-col items-center w-24 gap-2">
                     <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-brand-red transition-all cursor-pointer">
                        <img src={actor.src} alt={actor.name} className="w-full h-full object-cover" />
                     </div>
                     <span className="text-xs text-center text-text-muted">{actor.name}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Reviews */}
            <div className="bg-bg-card border border-border-card rounded-2xl p-8">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-semibold text-text-muted">Reviews</h3>
                 <button className="flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-border-card hover:bg-[#333] transition-colors text-sm">
                   <PlusCircle size={16} />
                   Add Your Review
                 </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   { name: 'Anikethana', rating: 5, text: 'This movie is a masterpiece! The pacing, the cinematography, and especially the ending sequence... Just absolute perfection. I have watched it three times already.' },
                   { name: 'Sujith', rating: 4, text: 'A completely unique experience. It starts a bit slowly but builds into a mind-bending climax. Best movie from Indian cinema last year.' }
                 ].map((review, idx) => (
                   <div key={idx} className="bg-[#141414] border border-[#222] p-5 rounded-xl">
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-semibold text-white">{review.name}</span>
                        <div className="flex gap-1 text-brand-red">
                          {Array.from({ length: 5 }).map((_, i) => (
                             <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} className={i >= review.rating ? 'opacity-30' : ''} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed">"{review.text}"</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Right Column - 1/3 width Info Sidebar */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="bg-bg-card border border-border-card rounded-2xl p-6 flex flex-col gap-6">
               
               {/* Released Year */}
               <div>
                  <div className="flex items-center gap-2 text-text-muted mb-2">
                     <Calendar size={18} />
                     <span className="text-sm">Released Year</span>
                  </div>
                  <span className="text-white font-semibold">{releaseYear}</span>
               </div>

               {/* Available Languages */}
               <div>
                  <div className="flex items-center gap-2 text-text-muted mb-3">
                     <Languages size={18} />
                     <span className="text-sm">Available Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada'].map((lang, idx) => (
                       <span key={idx} className="bg-[#1A1A1A] border border-border-card text-white text-xs px-3 py-1.5 rounded-lg">
                         {lang}
                       </span>
                     ))}
                  </div>
               </div>

               {/* Ratings */}
               <div>
                  <div className="flex items-center gap-2 text-text-muted mb-3">
                     <Star size={18} />
                     <span className="text-sm">Ratings</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="bg-[#1A1A1A] border border-border-card p-3 rounded-xl">
                        <span className="block text-xs text-text-muted mb-1">IMDb</span>
                        <div className="flex items-center gap-1 text-brand-red">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                            <span className="text-white text-xs ml-1 font-semibold">8.3</span>
                        </div>
                     </div>
                     <div className="bg-[#1A1A1A] border border-border-card p-3 rounded-xl">
                        <span className="block text-xs text-text-muted mb-1">StreamVibe</span>
                        <div className="flex items-center gap-1 text-brand-red">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                            <span className="text-white text-xs ml-1 font-semibold">9.1</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Genres */}
               <div>
                  <div className="flex items-center gap-2 text-text-muted mb-3">
                     <div className="grid grid-cols-2 gap-0.5 w-4 h-4 opacity-70">
                        <div className="bg-current rounded-[1px]" />
                        <div className="bg-current rounded-[1px]" />
                        <div className="bg-current rounded-[1px]" />
                        <div className="bg-current rounded-[1px]" />
                     </div>
                     <span className="text-sm">Genres</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {genres.map((genre, idx) => (
                       <span key={idx} className="bg-[#1A1A1A] border border-border-card text-white text-xs px-3 py-1.5 rounded-lg">
                         {genre}
                       </span>
                     ))}
                  </div>
               </div>

               {/* Director */}
               <div>
                  <div className="text-text-muted text-sm mb-3">Director</div>
                  <div className="flex items-center gap-3 bg-[#1A1A1A] border border-border-card p-3 rounded-xl">
                     <img src="https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg" alt="Rishab Shetty" className="w-10 h-10 rounded-lg object-cover" />
                     <div className="flex flex-col">
                        <span className="text-white text-sm font-semibold">Rishab Shetty</span>
                        <span className="text-text-muted text-xs">From India</span>
                     </div>
                  </div>
               </div>

               {/* Music */}
               <div>
                  <div className="text-text-muted text-sm mb-3">Music</div>
                  <div className="flex items-center gap-3 bg-[#1A1A1A] border border-border-card p-3 rounded-xl">
                     <img src="https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg" alt="B. Ajaneesh Loknath" className="w-10 h-10 rounded-lg object-cover" />
                     <div className="flex flex-col">
                        <span className="text-white text-sm font-semibold">B. Ajaneesh Loknath</span>
                        <span className="text-text-muted text-xs">From India</span>
                     </div>
                  </div>
               </div>

            </div>
          </div>

        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetail;
