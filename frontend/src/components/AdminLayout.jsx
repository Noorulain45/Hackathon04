import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Clapperboard, LogOut, Play } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/admin/users', name: 'Manage Users', icon: Users },
    { path: '/admin/content', name: 'Manage Content', icon: Clapperboard },
  ];

  return (
    <div className="flex h-screen bg-bg-main text-white font-body overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-bg-card border-r border-border-card flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          {/* Brand */}
          <div className="p-6 border-b border-border-card mb-4 flex items-center gap-2">
            <div className="bg-brand-red text-white p-1 rounded-md">
               <Play fill="currentColor" size={20} />
            </div>
            <span className="text-xl font-bold tracking-wide">StreamVibe</span>
            <span className="text-[10px] uppercase text-brand-red ml-2 tracking-widest font-bold">Admin</span>
          </div>

          {/* Navigation */}
          <nav className="px-4 flex flex-col gap-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    isActive 
                      ? 'bg-brand-red text-white shadow-lg' 
                      : 'text-text-muted hover:bg-bg-card-hover hover:text-white'
                  }`
                }
              >
                <item.icon size={18} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User / Logout */}
        <div className="p-4 border-t border-border-card">
          <div className="flex items-center gap-3 mb-4 px-2">
             <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border-2 border-border-card flex items-center justify-center text-sm font-bold text-brand-red">
               {user?.name?.charAt(0).toUpperCase() || 'A'}
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-semibold truncate w-32">{user?.name}</span>
                <span className="text-xs text-text-muted">Super Admin</span>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#141414] border border-border-card text-text-muted hover:text-white hover:border-[#333] rounded-lg transition-colors text-sm font-semibold"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="md:hidden flex items-center justify-between p-4 bg-bg-card border-b border-border-card">
           <div className="flex items-center gap-2">
             <Play fill="currentColor" size={20} className="text-brand-red" />
             <span className="font-bold">Admin Panel</span>
           </div>
           <button onClick={handleLogout} className="text-text-muted">
             <LogOut size={20} />
           </button>
        </header>

        <div className="p-8 max-w-7xl mx-auto min-h-full">
           <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
