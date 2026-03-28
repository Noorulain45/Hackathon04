import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell, Play, LogOut, CheckCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/Logo.png';

const Navbar = () => {
  const { user, logout, notifications, markNotificationsRead } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) => 
    `px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-[#1A1A1A] text-white' : 'text-text-muted hover:text-white hover:bg-bg-card-hover'
    }`;

  return (
    <nav className="fixed w-full z-50 top-0 bg-transparent py-4 px-8 transition-all duration-300 flex justify-between items-center backdrop-blur-sm bg-bg-main/50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="StreamVibe Logo" className="h-10 w-auto object-contain" />
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center bg-[#0F0F0F] rounded-xl border border-border-card p-1">
        <NavLink to="/" className={navLinkClass} end>
          Home
        </NavLink>
        <NavLink to="/movies" className={navLinkClass}>
          Movies & Shows
        </NavLink>
        <NavLink to="/support" className={navLinkClass}>
          Support
        </NavLink>
        <NavLink to="/subscriptions" className={navLinkClass}>
          Subscriptions
        </NavLink>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6 relative">
        <button className="text-text-muted hover:text-white transition-colors">
          <Search size={24} />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (unreadCount > 0) markNotificationsRead();
            }}
            className="text-text-muted hover:text-white transition-colors relative flex items-center"
          >
            <Bell size={24} />
            {unreadCount > 0 && (
               <span className="absolute -top-1 -right-1.5 bg-brand-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0F0F0F]">
                 {unreadCount}
               </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-10 right-0 w-80 bg-bg-card border border-[#333] rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200 z-[100]">
              <div className="p-4 border-b border-[#333] bg-[#1A1A1A]">
                 <h4 className="font-bold text-white text-sm">Notifications</h4>
              </div>
              <div className="max-h-64 overflow-y-auto">
                 {notifications?.length === 0 ? (
                    <div className="p-6 text-center text-text-muted text-sm italic">
                       No new notifications
                    </div>
                 ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-[#222] hover:bg-[#141414] transition-colors flex gap-3 text-sm text-text-muted items-start">
                         <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                         <span className="leading-snug text-white">{notif.message}</span>
                      </div>
                    ))
                 )}
              </div>
            </div>
          )}
        </div>
        
        {/* Conditional Admin Portal Jump */}
        {user?.role === 'admin' && (
           <Link 
             to="/admin"
             className="hidden md:flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-purple-500 hover:text-white transition-colors"
           >
             Admin Portal
           </Link>
        )}
        {user && (
           <button 
             onClick={handleLogout}
             title="Sign Out"
             className="text-brand-red bg-red-500/10 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all border border-brand-red/20"
           >
             <LogOut size={20} />
           </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
