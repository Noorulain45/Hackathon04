import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import FeaturedBanner from '../components/FeaturedBanner';
import CategoryGrid from '../components/CategoryGrid';
import Top10Grid from '../components/Top10Grid';
import MediaSlider from '../components/MediaSlider';

// Mocks
const movieCategories = [
  { name: 'Action', images: ['https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg', 'https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg', 'https://image.tmdb.org/t/p/w200/jc73G0h2x1HIfaD0P2kX4zH6t1e.jpg', 'https://image.tmdb.org/t/p/w200/vQWk5YCbZzZCQHuUPbyEhn25kX4.jpg'] },
  { name: 'Adventure', images: ['https://image.tmdb.org/t/p/w200/xVKQow3wTioKlyyS6C86XnJpxkH.jpg', 'https://image.tmdb.org/t/p/w200/9kCbMiv68S0I5XyWjG4OaK9q7q.jpg', 'https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg', 'https://image.tmdb.org/t/p/w200/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg'] },
  { name: 'Comedy', images: ['https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg', 'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', 'https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'https://image.tmdb.org/t/p/w200/xVKQow3wTioKlyyS6C86XnJpxkH.jpg'] },
  { name: 'Drama', images: ['https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'https://image.tmdb.org/t/p/w200/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', 'https://image.tmdb.org/t/p/w200/gEu2QniE6OMKgIQweDOKcHIQcmH.jpg'] },
  { name: 'Horror', images: ['https://image.tmdb.org/t/p/w200/yF1eOkaYvwiORauRCPWznV9xVvi.jpg', 'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', 'https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg', 'https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg'] },
];

const top10Categories = [
    { name: 'Action', images: ['https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg', 'https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg', 'https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'https://image.tmdb.org/t/p/w200/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg'] },
    { name: 'Adventure', images: ['https://image.tmdb.org/t/p/w200/yF1eOkaYvwiORauRCPWznV9xVvi.jpg', 'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', 'https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg', 'https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg'] },
    { name: 'Comedy', images: ['https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg', 'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', 'https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg'] },
    { name: 'Drama', images: ['https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'https://image.tmdb.org/t/p/w200/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', 'https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg'] },
];

const MoviesShows = () => {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/videos')
      .then(res => res.json())
      .then(data => {
         // assign fixed demo link for all
         const demoLink = data.length > 0 && data[0].videoUrl 
           ? data[0].videoUrl 
           : "https://www.w3schools.com/html/mov_bbb.mp4";
           
         const updated = data.map(item => ({
            ...item,
            videoUrl: demoLink,
            poster: item.thumbnailUrl || item.poster
         }));
         setMovies(updated);
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="min-h-screen flex flex-col font-body bg-bg-main text-white">
      <Navbar />
      
      <main className="flex-1 pb-16">
        <FeaturedBanner />

        {/* --- MOVIES SECTION --- */}
        <div className="max-w-[1400px] mx-auto w-full px-8 pt-10 pb-4">
           <span className="inline-block bg-brand-red text-white px-4 py-1.5 rounded-lg font-semibold text-sm">
             Movies
           </span>
        </div>
        
        {/* We override CategoryGrid title/padding to fit tight flow */}
        <div className="-mt-8">
            <CategoryGrid title="Our Genres" description={false} />
        </div>
        
        <Top10Grid title="Popular Top 10 In Genres" categories={top10Categories} />
        <MediaSlider title="Trending Now" mediaList={movies} />
        <MediaSlider title="New Releases" mediaList={movies} />
        <MediaSlider title="Must - Watch Movies" mediaList={movies} showRatings={true} />

        {/* --- SHOWS SECTION --- */}
        <div className="max-w-[1400px] mx-auto w-full px-8 pt-16 pb-4">
           <span className="inline-block bg-brand-red text-white px-4 py-1.5 rounded-lg font-semibold text-sm">
             Shows
           </span>
        </div>

        <div className="-mt-8">
            <CategoryGrid title="Our Genres" description={false} />
        </div>
        
        <Top10Grid title="Popular Top 10 In Genres" categories={top10Categories} />
        <MediaSlider title="Trending Shows Now" mediaList={movies} />
        <MediaSlider title="New Released Shows" mediaList={movies} />
        <MediaSlider title="Must - Watch Shows" mediaList={movies} showRatings={true} />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default MoviesShows;
