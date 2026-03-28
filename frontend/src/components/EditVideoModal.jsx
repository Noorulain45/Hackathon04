import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Edit3, CheckCircle, X } from 'lucide-react';

const GENRES = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Sci-Fi', 'Documentary', 'Adventure'];

const EditVideoModal = ({ video, onSuccess, onCancel }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: video.title || '',
    description: video.description || '',
    releaseYear: video.releaseYear || new Date().getFullYear(),
    duration: video.duration || '',
    visibility: video.visibility || 'public'
  });
  
  const [selectedGenres, setSelectedGenres] = useState(video.genre || []);

  const toggleGenre = (genre) => {
    if(selectedGenres.includes(genre)) setSelectedGenres(selectedGenres.filter(g => g !== genre));
    else setSelectedGenres([...selectedGenres, genre]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedGenres.length === 0) return setError('Please select at least one genre');

    setLoading(true);
    setError(null);

    const payload = {
        ...formData,
        genre: selectedGenres
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/videos/${video._id}`, {
        method: 'PUT',
        headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });

      if(res.ok) {
        onSuccess(await res.json());
      } else {
        const errData = await res.json();
        setError(errData.message || 'Failed to update video');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during update. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-card border border-border-card rounded-2xl p-6 shadow-2xl relative w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
      
      <button onClick={onCancel} className="absolute top-6 right-6 text-text-muted hover:text-white bg-[#141414] p-2 rounded-full border border-[#222] transition-colors">
        <X size={20} />
      </button>

      <div className="mb-8 border-b border-[#222] pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
           <Edit3 className="text-brand-red" />
           Edit Content
        </h2>
        <p className="text-text-muted text-sm mt-1">Update metadata for "{video.title}"</p>
      </div>

      {error && <div className="bg-red-500/10 border border-brand-red text-red-500 p-4 rounded-xl mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div className="flex flex-col gap-5">
            <div>
            <label className="block text-sm text-text-muted mb-2 font-medium">Title</label>
            <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-colors"
            />
            </div>
            <div>
            <label className="block text-sm text-text-muted mb-2 font-medium">Description</label>
            <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red resize-none transition-colors"
            />
            </div>
            
            {/* Genres */}
            <div>
            <label className="block text-sm text-text-muted mb-2 font-medium">Genres</label>
            <div className="flex flex-wrap gap-2 bg-[#141414] border border-[#222] p-3 rounded-xl min-h-[60px]">
                {GENRES.map(genre => {
                const isSelected = selectedGenres.includes(genre);
                return (
                    <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isSelected ? 'bg-brand-red text-white shadow' : 'bg-[#1A1A1A] text-text-muted border border-[#333] hover:text-white'}`}
                    >
                    {genre}
                    {isSelected && <CheckCircle size={12} className="inline ml-1" />}
                    </button>
                );
                })}
            </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm text-text-muted mb-2 font-medium">Release Year</label>
                <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} required className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-colors" />
            </div>
            <div>
                <label className="block text-sm text-text-muted mb-2 font-medium">Duration</label>
                <input type="text" name="duration" placeholder="e.g. 1h 45m" value={formData.duration} onChange={handleChange} required className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-colors" />
            </div>
            <div className="col-span-2">
                <label className="block text-sm text-text-muted mb-2 font-medium">Visibility</label>
                <select name="visibility" value={formData.visibility} onChange={handleChange} className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red appearance-none transition-colors">
                <option value="public">Public</option>
                <option value="private">Private (Restricted/Hidden)</option>
                </select>
            </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 pt-6 border-t border-[#222] flex justify-end gap-4">
            <button type="button" onClick={onCancel} disabled={loading} className="px-6 py-3 rounded-xl font-semibold text-text-muted hover:text-white border border-[#333] hover:bg-[#1A1A1A] transition-all disabled:opacity-50">
                Cancel
            </button>
            <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl font-bold bg-brand-red hover:bg-red-700 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center min-w-[160px]">
                {loading ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                </div>
                ) : 'Save Changes'}
            </button>
        </div>

      </form>
    </div>
  );
};

export default EditVideoModal;
