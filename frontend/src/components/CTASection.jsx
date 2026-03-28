import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Using the mock images for the background grid pattern
const mockImages = [
  'https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg',
  'https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg',
  'https://image.tmdb.org/t/p/w200/vQWk5YCbZzZCQHuUPbyEhn25kX4.jpg',
  'https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  'https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
  'https://image.tmdb.org/t/p/w200/xVKQow3wTioKlyyS6C86XnJpxkH.jpg',
  'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  'https://image.tmdb.org/t/p/w200/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
  'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
  'https://image.tmdb.org/t/p/w200/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
  'https://image.tmdb.org/t/p/w200/4nssGWxTeyDOPzWfE58D2pXfG7b.jpg',
  'https://image.tmdb.org/t/p/w200/gEu2QniE6OMKgIQweDOKcHIQcmH.jpg',
];

const CTASection = () => {
  const { user, setIsAuthModalOpen, setIsSubModalOpen } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <section className="py-16 px-8 max-w-[1400px] mx-auto w-full mb-12">
      <div className="relative w-full rounded-2xl overflow-hidden border border-border-card bg-[#0F0F0F]">
        {/* Background Grid Cover */}
        <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1 opacity-20">
          {[...mockImages, ...mockImages, ...mockImages].slice(0, 32).map((src, idx) => (
            <img 
              key={`cta-bg-${idx}`} 
              src={src} 
              alt="Background Poster Pattern" 
              className="w-full h-24 sm:h-32 object-cover rounded-sm"
            />
          ))}
        </div>

        {/* Gradient overlays to darken edges and make text pop */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-main via-bg-main/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent z-10" />

        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 h-full text-center md:text-left">
          {/* Left Text */}
          <div className="max-w-2xl mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Start your free trial today!
            </h2>
            <p className="text-text-muted text-sm md:text-base leading-relaxed">
              This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.
            </p>
          </div>

          {/* Right Button */}
          <div className="shrink-0">
            <button 
              onClick={() => {
                 if (!user) setIsAuthModalOpen(true);
                 else if (!user.subscription?.isActive) setIsSubModalOpen(true);
                 else navigate('/movies');
              }}
              className="bg-brand-red hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Start a Free Trail
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
