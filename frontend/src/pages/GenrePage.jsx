import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Star, Eye, Play, Film, ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GenrePage = () => {
  const { genreName } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreVideos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/videos?genre=${encodeURIComponent(genreName)}`);
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        }
      } catch (err) {
        console.error('Error fetching genre videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreVideos();
  }, [genreName]);

  return (
    <div className="min-h-screen flex flex-col font-body bg-bg-main text-white">
      <Navbar />
      
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-8 py-10 pt-24">
        <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-6 transition-colors">
          <ChevronLeft size={20} />
          Back to Home
        </Link>
        
        <div className="mb-10">
          <span className="inline-block px-3 py-1 bg-brand-red/20 text-brand-red border border-brand-red/30 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Genre Explorer
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {genreName} <span className="text-text-muted font-normal">Movies & Shows</span>
          </h1>
          <p className="text-text-muted max-w-2xl text-lg">
            Discover our entire catalog of {genreName.toLowerCase()} content. Sit back, relax, and find your next favorite watch.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
             <div className="w-10 h-10 border-4 border-[#333] border-t-brand-red rounded-full animate-spin"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="bg-[#141414] border border-[#222] rounded-3xl p-16 text-center shadow-lg w-full flex flex-col items-center mt-8">
             <div className="p-6 bg-[#1A1A1A] rounded-full text-text-muted mb-6">
                <Film size={64} />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">No Content Available</h3>
             <p className="text-text-muted max-w-sm">We don't have any {genreName} content right now. Check back later for new uploads!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {videos.map(video => (
              <Link to="/movie" state={{ video }} key={video._id} className="group flex flex-col bg-bg-card rounded-2xl overflow-hidden border border-border-card hover:border-[#444] hover:shadow-2xl transition-all duration-300">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-bold border border-white/10">
                    HD
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-mono font-bold flex items-center gap-1 border border-white/10">
                    <Clock size={12} /> {video.duration}
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                     <div className="w-14 h-14 bg-brand-red rounded-full flex justify-center items-center transform scale-75 group-hover:scale-100 transition-transform shadow-[0_0_20px_rgba(229,0,0,0.5)]">
                       <Play fill="white" size={24} className="ml-1" />
                     </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg font-bold text-white line-clamp-1">{video.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {video.genre && video.genre.slice(0, 2).map((g, i) => (
                      <span key={i} className="text-[10px] bg-[#1A1A1A] border border-[#333] text-text-muted px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {g.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between text-xs text-text-muted pt-3 border-t border-[#222]">
                    <span className="flex items-center gap-1 font-medium"><Star size={14} className="text-yellow-500" /> 4.8</span>
                    <span className="bg-[#1A1A1A] px-2 py-1 rounded border border-[#222] font-mono">{video.releaseYear}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GenrePage;
