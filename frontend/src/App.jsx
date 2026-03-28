import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import MoviesShows from './pages/MoviesShows';
import MovieDetail from './pages/MovieDetail';
import GenrePage from './pages/GenrePage';
import AuthModal from './components/AuthModal';
import SubscriptionModal from './components/SubscriptionModal';

import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageContent from './pages/admin/ManageContent';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthModal />
        <SubscriptionModal />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Content Routes (Browsable without sub) */}
          <Route path="/movies" element={<MoviesShows />} />
          <Route path="/movie" element={<MovieDetail />} />
          <Route path="/genre/:genreName" element={<GenrePage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute adminOnly={true} />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="content" element={<ManageContent />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
