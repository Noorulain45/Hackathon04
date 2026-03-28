import React, { useEffect, useState, useContext } from 'react';
import { Users, Clapperboard, Activity, CheckCircle } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscribers: 0,
    totalVideos: 0,
    recentActivity: 0
  });
  const [loading, setLoading] = useState(true);

  // Example metric card
  const MetricCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-bg-card border border-border-card p-6 rounded-2xl flex items-center gap-4 transition-transform hover:scale-105 duration-300 shadow-xl">
      <div className={`p-4 rounded-xl ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-text-muted text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-wide">{value}</h3>
      </div>
    </div>
  );

  useEffect(() => {
    // We fetch users & videos from the backend endpoints we wired up to derive stats
    const fetchDashboardStats = async () => {
      try {
        const token = user.token;
        const opts = { headers: { Authorization: `Bearer ${token}` } };
        
        // Parallel fetching
        const [usersRes, videosRes] = await Promise.all([
          fetch('http://localhost:5000/api/users', opts),
          fetch('http://localhost:5000/api/videos') // videos is public in backend controller
        ]);

        if(usersRes.ok && videosRes.ok) {
           const usersData = await usersRes.json();
           const videosData = await videosRes.json();

           const activeSubs = usersData.filter(u => u.subscription?.isActive).length;

           setStats({
             totalUsers: usersData.length,
             activeSubscribers: activeSubs,
             totalVideos: videosData.length,
             recentActivity: Math.floor(Math.random() * 50) + 10 // Mock metric
           });
        }
      } catch (error) {
        console.error("Failed to load dashboard metrics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [user]);

  if (loading) {
    return <div className="text-center py-20 animate-pulse text-brand-red font-bold text-xl">Loading Metrics...</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full h-full font-body opacity-0 animate-in fade-in duration-500 fill-mode-forwards">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white mb-2">Platform Overview</h1>
        <p className="text-text-muted">Welcome back, get a quick snapshot of StreamVibe's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total Registered Users" value={stats.totalUsers} icon={Users} colorClass="bg-blue-600/80" />
        <MetricCard title="Active Subscribers" value={stats.activeSubscribers} icon={CheckCircle} colorClass="bg-green-600/80" />
        <MetricCard title="Content Library Size" value={stats.totalVideos} icon={Clapperboard} colorClass="bg-brand-red/90" />
        <MetricCard title="Activity Today" value={`+${stats.recentActivity}%`} icon={Activity} colorClass="bg-purple-600/80" />
      </div>

      {/* Placeholder for future charts or logs */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl flex-1 min-h-[400px] flex items-center justify-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1A] to-transparent opacity-50 pointer-events-none" />
         <div className="text-center text-text-muted opacity-60">
            <Activity size={48} className="mx-auto mb-4" />
            <p>Advanced real-time analytics chart coming in Phase 2</p>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
