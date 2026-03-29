import React, { useContext } from 'react';
import { Play } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const mockImages = [
  'https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg',
  'https://image.tmdb.org/t/p/w200/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
  'https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  'https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
  'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
  'https://image.tmdb.org/t/p/w200/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
];

const HeroBanner = () => {
  const { user, setIsAuthModalOpen, setIsSubModalOpen } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
      {/* Background Poster Grid Mock */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-2 opacity-30 mask-image-b transform scale-105">
        {[...mockImages, ...mockImages, ...mockImages].slice(0, 24).map((src, idx) => (
          <img key={`hero-img-${idx}`} src={src} alt="poster" className="w-full h-full object-cover rounded-md" />
        ))}
      </div>

      {/* Dark overlay gradient fading to bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-main/70 to-bg-main z-10" />

      {/* Top Gradient for navbar */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-bg-main to-transparent z-10" />

      {/* Center Icon Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10">
        <Play size={300} fill="currentColor" className="text-white" />
      </div>

      {/* Content */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex flex-col items-center justify-end h-full px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">The Best Streaming Experience</h1>
        <p className="text-text-muted text-sm md:text-base max-w-3xl mb-8 leading-relaxed">
          StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.
        </p>
        <button 
          onClick={() => {
            if (!user) setIsAuthModalOpen(true);
            else if (user.role !== 'admin' && !user.subscription?.isActive) setIsSubModalOpen(true);
            else navigate('/movies');
          }}
          className="bg-brand-red hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition-all"
        >
          <Play fill="currentColor" size={20} />
          Start Watching Now
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
