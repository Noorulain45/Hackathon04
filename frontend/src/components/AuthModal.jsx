import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { X } from 'lucide-react';

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const url = `${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5000"}`}${endpoint}`; // You can swap this with process.env if deployed

      const bodyData = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Success Flows
      if (!isLogin) {
         // Registration flow: Redirect to Sign In Tab
         setIsLogin(true);
         setFormData({ ...formData, password: '' });
         setSuccessMessage('Account created successfully! Please sign in.');
      } else {
         // Login flow: Show success message temporarily, then close and inject auth context
         setSuccessMessage('Successfully logged in!');
         setTimeout(() => {
            login(data);
            setIsAuthModalOpen(false);
            setSuccessMessage('');
         }, 1200);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-body p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsAuthModalOpen(false)}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-bg-card border border-border-card rounded-2xl p-8 shadow-2xl flex flex-col transform animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors bg-[#1A1A1A] rounded-full p-2 border border-border-card"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-text-muted text-sm">
            {isLogin ? 'Enter your details to access your account' : 'Sign up to start your streaming journey'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex w-full mb-8 bg-[#1A1A1A] p-1 rounded-xl border border-border-card">
           <button 
             onClick={() => { setIsLogin(true); setError(''); }}
             className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${isLogin ? 'bg-bg-card text-white shadow' : 'text-text-muted hover:text-white'}`}
           >
             Sign In
           </button>
           <button 
             onClick={() => { setIsLogin(false); setError(''); }}
             className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${!isLogin ? 'bg-bg-card text-white shadow' : 'text-text-muted hover:text-white'}`}
           >
             Sign Up
           </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-brand-red text-red-500 text-sm rounded-lg text-center animate-in min-h-12 w-full flex items-center justify-center">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 text-green-400 text-sm rounded-xl text-center font-bold shadow-lg shadow-green-500/5 animate-in slide-in-from-top-4 fade-in duration-300 relative z-50 transform min-h-12 w-full flex items-center justify-center">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
           {!isLogin && (
             <div>
               <label className="block text-sm text-text-muted mb-2 font-medium">Full Name</label>
               <input 
                 type="text" 
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 placeholder="John Doe"
                 required={!isLogin}
                 className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-colors"
               />
             </div>
           )}
           <div>
             <label className="block text-sm text-text-muted mb-2 font-medium">Email Address</label>
             <input 
               type="email" 
               name="email"
               value={formData.email}
               onChange={handleChange}
               placeholder="name@example.com"
               required
               className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-colors"
             />
           </div>
           <div>
             <label className="block text-sm text-text-muted mb-2 font-medium">Password</label>
             <input 
               type="password" 
               name="password"
               value={formData.password}
               onChange={handleChange}
               placeholder="••••••••"
               required
               className="w-full bg-[#141414] border border-[#222] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-colors"
             />
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="mt-4 w-full bg-brand-red hover:bg-red-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 flex justify-center items-center"
           >
             {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
             ) : (
                isLogin ? 'Sign In' : 'Sign Up'
             )}
           </button>
        </form>

      </div>
    </div>
  );
};

export default AuthModal;
