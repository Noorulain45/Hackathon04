import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0F0F0F] pt-16 pb-8 px-8 border-t border-border-card">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
        <div>
           <h4 className="text-white font-semibold mb-6">Home</h4>
           <ul className="space-y-4">
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Categories</Link></li>
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Devices</Link></li>
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Pricing</Link></li>
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">FAQ</Link></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-semibold mb-6">Movies</h4>
           <ul className="space-y-4">
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Genres</Link></li>
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Trending</Link></li>
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">New Release</Link></li>
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Popular</Link></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-semibold mb-6">Shows</h4>
           <ul className="space-y-4">
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Genres</Link></li>
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Trending</Link></li>
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">New Release</Link></li>
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Popular</Link></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-semibold mb-6">Support</h4>
           <ul className="space-y-4">
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Contact Us</Link></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-semibold mb-6">Subscription</h4>
           <ul className="space-y-4">
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Plans</Link></li>
             <li><Link to="#" className="text-text-muted hover:text-white text-sm transition-colors">Features</Link></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-semibold mb-6">Connect With Us</h4>
           <div className="flex gap-4">
             <Link to="#" className="bg-[#1A1A1A] hover:bg-[#333] transition-colors p-3 rounded-lg border border-border-card text-white">
               <FaFacebook size={20} />
             </Link>
             <Link to="#" className="bg-[#1A1A1A] hover:bg-[#333] transition-colors p-3 rounded-lg border border-border-card text-white">
               <FaTwitter size={20} />
             </Link>
             <Link to="#" className="bg-[#1A1A1A] hover:bg-[#333] transition-colors p-3 rounded-lg border border-border-card text-white">
               <FaLinkedin size={20} />
             </Link>
           </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full pt-8 border-t border-border-card flex flex-col md:flex-row items-center justify-between text-text-muted text-sm">
        <p>&copy;2026 streamvibe, All Rights Reserved</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="#" className="hover:text-white transition-colors">Terms of Use</Link>
          <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
