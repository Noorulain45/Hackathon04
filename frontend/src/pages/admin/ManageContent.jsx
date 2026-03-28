import React, { useEffect, useState, useContext } from 'react';
import { Plus, Film, Eye, Play, Star, Clock, Trash, Edit3, EyeOff } from 'lucide-react';
import VideoUploadForm from '../../components/VideoUploadForm';
import EditVideoModal from '../../components/EditVideoModal';
import { AuthContext } from '../../context/AuthContext';

const ManageContent = () => {
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const fetchVideos = async () => {
    try {
      if (!user?.token) return;
      const res = await fetch('http://localhost:5000/api/videos/admin', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      if (res.ok) {
        setVideos(await res.json());
      }
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchVideos();
    }
  }, [user]);

  const handleUploadSuccess = (newVideo) => {
    setVideos([newVideo, ...videos]);
    setShowUploadModal(false);
  };

  const handleEditSuccess = (updatedVideo) => {
    setVideos(videos.map(v => v._id === updatedVideo._id ? updatedVideo : v));
    setShowEditModal(false);
    setEditingVideo(null);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this video?")) return;
    try {
       const res = await fetch(`http://localhost:5000/api/videos/${id}`, {
         method: 'DELETE',
         headers: {
           Authorization: `Bearer ${user.token}`
         }
       });
       if(res.ok) {
         setVideos(videos.filter(v => v._id !== id));
       }
    } catch (err) {
      console.error("Failed to delete video", err);
    }
  };

  const handleToggleVisibility = async (video) => {
    try {
      const newVisibility = video.visibility === 'public' ? 'private' : 'public';
      const res = await fetch(`http://localhost:5000/api/videos/${video._id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${user.token}`
         },
         body: JSON.stringify({ visibility: newVisibility })
      });
      if(res.ok) {
         const updatedVideo = await res.json();
         setVideos(videos.map(v => v._id === updatedVideo._id ? updatedVideo : v));
      }
    } catch (err) {
      console.error("Failed to toggle visibility", err);
    }
  };

  if(!videos || loading) return <div className="text-xl p-10 font-bold text-text-muted">Loading Content...</div>;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300 relative">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Film className="text-brand-red" />
            Content Library
          </h1>
          <p className="text-text-muted">Manage your entire video catalog and deploy new content.</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="bg-brand-red text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg hover:bg-red-700 transition-transform active:scale-95"
        >
          <Plus size={20} />
          Upload New Video
        </button>
      </div>

      {videos.length === 0 ? (
         <div className="bg-[#141414] border border-[#222] rounded-3xl p-16 text-center shadow-lg w-full flex flex-col items-center">
             <div className="p-6 bg-brand-red/10 rounded-full text-brand-red mb-6">
                <Film size={64} />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">No Content Yet</h3>
             <p className="text-text-muted mb-8 max-w-sm">Your library is currently empty. Start uploading videos to attract subscribers!</p>
             <button onClick={() => setShowUploadModal(true)} className="px-8 py-3 bg-brand-red text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(229,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(229,0,0,0.23)] transition duration-200">
               Upload Your First Video
             </button>
         </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <div key={video._id} className="bg-bg-card border border-border-card rounded-2xl overflow-hidden shadow-lg group hover:border-[#444] transition-all flex flex-col">
                 <div className="relative aspect-video overflow-hidden">
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded font-mono font-bold flex items-center gap-1">
                      <Clock size={12} /> {video.duration}
                    </div>
                    {/* Actions overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity backdrop-blur-sm">
                       <button onClick={() => { setEditingVideo(video); setShowEditModal(true); }} className="bg-[#1A1A1A] hover:bg-[#333] border border-[#444] text-white p-3 rounded-full shadow-2xl transition-transform hover:scale-110" title="Edit">
                          <Edit3 size={20} />
                       </button>
                       <button onClick={() => handleToggleVisibility(video)} className="bg-[#1A1A1A] hover:bg-[#333] border border-[#444] text-white p-3 rounded-full shadow-2xl transition-transform hover:scale-110" title={video.visibility === 'public' ? 'Hide' : 'Show'}>
                          {video.visibility === 'public' ? <EyeOff size={20} /> : <Eye size={20} />}
                       </button>
                       <button onClick={() => handleDelete(video._id)} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-2xl transition-transform hover:scale-110" title="Delete">
                          <Trash size={20} />
                       </button>
                    </div>
                 </div>
                 <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-lg font-bold text-white leading-tight truncate px-1 pr-4">{video.title}</h3>
                       <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded bg-[#111] border ${video.visibility === 'public' ? 'text-green-500 border-green-500/20' : 'text-orange-500 border-orange-500/20'}`}>
                         {video.visibility}
                       </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                       {video.genre && video.genre.map((g, i) => (
                         <span key={i} className="text-xs bg-[#1A1A1A] border border-[#222] text-text-muted px-2 py-0.5 rounded-full">{g.trim()}</span>
                       ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-medium text-text-muted mt-auto pt-4 border-t border-[#222]">
                       <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> 0.0</span>
                       <span className="flex items-center gap-1"><Eye size={14} /> 0 views</span>
                       <span className="bg-[#1A1A1A] px-2 py-0.5 rounded ml-auto border border-[#222]">{video.releaseYear}</span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      )}

      {/* Upload Modal Portal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowUploadModal(false)} />
           <VideoUploadForm 
             onSuccess={handleUploadSuccess} 
             onCancel={() => setShowUploadModal(false)} 
           />
        </div>
      )}

      {/* Edit Modal Portal */}
      {showEditModal && editingVideo && (
        <div className="fixed inset-0 z-[100] flex justify-center items-center p-4">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setShowEditModal(false); setEditingVideo(null); }} />
           <EditVideoModal 
             video={editingVideo}
             onSuccess={handleEditSuccess} 
             onCancel={() => { setShowEditModal(false); setEditingVideo(null); }} 
           />
        </div>
      )}
    </div>
  );
};

export default ManageContent;
