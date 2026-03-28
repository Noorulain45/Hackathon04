import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false, requireSubscription = false }) => {
  const { user } = useContext(AuthContext);

  // If no user is logged in, redirect to home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If route is adminOnly but user is not admin, redirect to home page
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  // New Subscription guard logic
  if (requireSubscription && user.role !== 'admin' && !user.subscription?.isActive) {
    // If they aren't subscribed (and not an admin bypassing it), reject them back to homepage
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the child routes natively via Outlet
  return <Outlet />;
};

export default ProtectedRoute;
