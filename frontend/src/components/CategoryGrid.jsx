import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'Action', images: ['https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg', 'https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg', 'https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'https://image.tmdb.org/t/p/w200/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg'] },
  { name: 'Adventure', images: ['https://image.tmdb.org/t/p/w200/yF1eOkaYvwiORauRCPWznV9xVvi.jpg', 'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', 'https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg', 'https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg'] },
  { name: 'Comedy', images: ['https://image.tmdb.org/t/p/w200/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg', 'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', 'https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg'] },
  { name: 'Drama', images: ['https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'https://image.tmdb.org/t/p/w200/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', 'https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg'] },
  { name: 'Horror', images: ['https://image.tmdb.org/t/p/w200/yF1eOkaYvwiORauRCPWznV9xVvi.jpg', 'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', 'https://image.tmdb.org/t/p/w200/nJUHX3XL1jMkk8honUZnUmudFb9.jpg', 'https://image.tmdb.org/t/p/w200/hYqOjJ7Gh1fbqXrxlIao1g8ZehF.jpg'] },
];

const CategoryGrid = ({ title, description }) => {
  return (
    <section className="py-16 px-8 max-w-[1400px] mx-auto w-full">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-3 text-white">
             {title || "Explore our wide variety of categories"}
          </h2>
          {description !== false && (
            <p className="text-text-muted text-sm max-w-2xl">
              {description || "Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new"}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 bg-[#0F0F0F] p-2 rounded-xl border border-border-card hidden md:flex">
          <button className="bg-bg-card p-3 rounded-xl hover:bg-bg-card-hover transition">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
             <span className="w-4 h-1 bg-brand-red rounded-full"></span>
             <span className="w-1 h-1 bg-border-card rounded-full"></span>
             <span className="w-1 h-1 bg-border-card rounded-full"></span>
             <span className="w-1 h-1 bg-border-card rounded-full"></span>
          </div>
          <button className="bg-bg-card p-3 rounded-xl hover:bg-bg-card-hover transition">
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat, idx) => (
          <Link to={`/genre/${cat.name}`} key={idx} className="bg-bg-card p-5 rounded-2xl border border-border-card group hover:border-[#333] transition-all cursor-pointer block">
            {/* 2x2 Image Grid */}
            <div className="grid grid-cols-2 grid-rows-2 gap-2 mb-4">
               {cat.images.map((img, i) => (
                 <img key={i} src={img} alt={cat.name} className="w-full h-[100px] object-cover rounded shadow-md group-hover:scale-105 transition-transform duration-300" />
               ))}
            </div>
            
            <div className="flex items-center justify-between text-white mt-1">
              <span className="font-semibold text-sm">{cat.name}</span>
              <ArrowRight size={18} className="text-text-muted group-hover:text-white transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
