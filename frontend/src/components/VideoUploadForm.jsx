import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UploadCloud, FileVideo, Image as ImageIcon, CheckCircle, X } from 'lucide-react';

const GENRES = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Sci-Fi', 'Documentary', 'Adventure'];

const VideoUploadForm = ({ onSuccess, onCancel }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseYear: new Date().getFullYear(),
    duration: '',
    visibility: 'public'
  });
  
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const toggleGenre = (genre) => {
    if(selectedGenres.includes(genre)) setSelectedGenres(selectedGenres.filter(g => g !== genre));
    else setSelectedGenres([...selectedGenres, genre]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if(type === 'thumbnail') setThumbnailFile(file);
    if(type === 'video') setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedGenres.length === 0) return setError('Please select at least one genre');
    if (!thumbnailFile) return setError('Thumbnail file is required');
    if (!videoFile) return setError('Video file is required');

    setLoading(true);
    setError(null);

    // Using FormData to handle multipart upload
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('genre', selectedGenres.join(',')); // backend splits string by comma
    data.append('releaseYear', formData.releaseYear);
    data.append('duration', formData.duration);
    data.append('visibility', formData.visibility);
    data.append('thumbnail', thumbnailFile);
    data.append('video', videoFile);

    try {
      const res = await fetch('http://localhost:5000/api/videos', {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${user.token}`
        },
        body: data
      });

      if(res.ok) {
        onSuccess(await res.json());
      } else {
        const errData = await res.json();
        setError(errData.message || 'Failed to upload video');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during upload. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-card border border-border-card rounded-2xl p-6 shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
      
      <button onClick={onCancel} className="absolute top-6 right-6 text-text-muted hover:text-white bg-[#141414] p-2 rounded-full border border-[#222]">
        <X size={20} />
      </button>

      <div className="mb-8 border-b border-[#222] pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
           <UploadCloud className="text-brand-red" />
           Upload New Content
        </h2>
        <p className="text-text-muted text-sm mt-1">Upload trailers, movies, and episodes directly to Cloudinary via backend.</p>
      </div>

      {error && <div className="bg-red-500/10 border border-brand-red text-red-500 p-4 rounded-xl mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
             <div>
               <label className="block text-sm text-text-muted mb-2 font-medium">Title</label>
               <input 
                 type="text" 
                 name="title"
                 value={formData.title}
                 onChange={handleChange}
                 required
                 className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red"
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
                 className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red resize-none"
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

          {/* Right Column */}
          <div className="flex flex-col gap-5">
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm text-text-muted mb-2 font-medium">Release Year</label>
                   <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} required className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red" />
                </div>
                <div>
                   <label className="block text-sm text-text-muted mb-2 font-medium">Duration</label>
                   <input type="text" name="duration" placeholder="e.g. 1h 45m" value={formData.duration} onChange={handleChange} required className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red" />
                </div>
             </div>
             <div>
                <label className="block text-sm text-text-muted mb-2 font-medium">Visibility</label>
                <select name="visibility" value={formData.visibility} onChange={handleChange} className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red appearance-none">
                  <option value="public">Public</option>
                  <option value="private">Private (Restricted)</option>
                </select>
             </div>

             {/* File Uploads */}
             <div className="flex flex-col gap-4 mt-2 border-t border-[#222] pt-6">
                
                {/* Thumbnail Drop */}
                <div className="relative border-2 border-dashed border-[#333] hover:border-brand-red rounded-xl p-6 flex flex-col items-center justify-center transition-colors bg-[#141414] group cursor-pointer">
                   <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'thumbnail')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                   <div className="bg-[#1A1A1A] p-3 rounded-full mb-3 text-brand-red border border-[#333] group-hover:scale-110 transition-transform">
                      <ImageIcon size={24} />
                   </div>
                   <p className="text-white text-sm font-semibold mb-1">Upload Thumbnail Poster</p>
                   {thumbnailFile ? (
                     <p className="text-green-500 text-xs w-full truncate text-center font-mono bg-green-500/10 px-2 py-1 rounded inline-flex justify-center items-center gap-1"><CheckCircle size={10} /> {thumbnailFile.name}</p>
                   ) : (
                     <p className="text-text-muted text-xs">JPG, PNG (16:9 or 2:3 ratio)</p>
                   )}
                </div>

                {/* Video Drop */}
                <div className="relative border-2 border-dashed border-[#333] hover:border-brand-red rounded-xl p-6 flex flex-col items-center justify-center transition-colors bg-[#141414] group cursor-pointer">
                   <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                   <div className="bg-[#1A1A1A] p-3 rounded-full mb-3 text-brand-red border border-[#333] group-hover:scale-110 transition-transform">
                      <FileVideo size={24} />
                   </div>
                   <p className="text-white text-sm font-semibold mb-1">Upload Video File</p>
                   {videoFile ? (
                     <p className="text-green-500 text-xs w-full truncate text-center font-mono bg-green-500/10 px-2 py-1 rounded inline-flex justify-center items-center gap-1"><CheckCircle size={10} /> {videoFile.name}</p>
                   ) : (
                     <p className="text-text-muted text-xs">MP4, WebM up to 50MB</p>
                   )}
                </div>

             </div>
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
                  Uploading...
                </div>
             ) : 'Upload Content'}
           </button>
        </div>

      </form>
    </div>
  );
};

export default VideoUploadForm;
