import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ShieldAlert, ShieldCheck, Mail, Lock, Unlock } from 'lucide-react';

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if(res.ok) {
        setUsers(await res.json());
      }
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line
  }, []);

  const toggleStatus = async (userId, currentStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/${userId}/status`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if(res.ok) {
        // Optmistically update UI
        setUsers(users.map(u => u._id === userId ? { ...u, status: currentStatus === 'blocked' ? 'active' : 'blocked' } : u));
      }
    } catch(err) {
      console.error(err);
    }
  };

  if(!users || loading) return <div className="text-xl p-10 font-bold text-text-muted">Loading Users...</div>;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-text-muted">Control roles, monitor statuses, and manage access.</p>
      </div>

      <div className="bg-bg-card border border-border-card rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1A1A1A] border-b border-[#222] text-text-muted text-sm uppercase tracking-wide">
                <th className="px-6 py-4 font-semibold">User details</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Subscription</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {users.map((row) => (
                <tr key={row._id} className="hover:bg-[#141414] transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center text-brand-red font-bold">
                         {row.name.charAt(0).toUpperCase()}
                       </div>
                       <div>
                         <p className="text-white font-medium">{row.name}</p>
                         <div className="text-text-muted text-xs flex items-center gap-1 mt-0.5">
                           <Mail size={12} /> {row.email}
                         </div>
                       </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${row.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                      {row.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {row.subscription?.isActive ? (
                      <div className="flex flex-col">
                        <span className="text-sm text-green-400 font-medium capitalize">{row.subscription.plan}</span>
                        <span className="text-xs text-text-muted mt-0.5">Expires {new Date(row.subscription.endDate).toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-text-muted italic bg-[#111] px-2 py-1 rounded">No active plan</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {row.status !== 'blocked' ? (
                       <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1.5 inline-flex rounded-lg text-sm font-semibold border border-green-500/20">
                         <ShieldCheck size={16} /> Active
                       </div>
                    ) : (
                       <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-1.5 inline-flex rounded-lg text-sm font-semibold border border-red-500/20 animate-pulse">
                         <ShieldAlert size={16} /> Blocked
                       </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {row._id !== user._id && (
                       <button 
                         onClick={() => toggleStatus(row._id, row.status)}
                         className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ml-auto ${row.status === 'blocked' ? 'bg-white text-black hover:bg-gray-200' : 'bg-brand-red text-white hover:bg-red-700 shadow-md hover:shadow-red-500/20'}`}
                       >
                         {row.status === 'blocked' ? <Unlock size={14} /> : <Lock size={14} />}
                         {row.status === 'blocked' ? 'Unblock Access' : 'Restrict User'}
                       </button>
                    )}
                    {row._id === user._id && (
                       <span className="text-xs text-text-muted italic mr-2">Your Account</span>
                    )}
                  </td>
                </tr>
              ))}
              
              {users.length === 0 && (
                <tr>
                   <td colSpan="5" className="px-6 py-10 text-center text-text-muted">
                      No users found.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
