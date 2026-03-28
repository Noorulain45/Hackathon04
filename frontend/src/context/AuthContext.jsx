import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };
  
  const updateUser = (updatedFields) => {
    if (user) {
       const updatedUser = { ...user, ...updatedFields };
       localStorage.setItem('userInfo', JSON.stringify(updatedUser));
       setUser(updatedUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setNotifications([]);
  };

  const addNotification = (message) => {
    setNotifications((prev) => [{ id: Date.now(), message, read: false }, ...prev]);
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, updateUser, 
      isAuthModalOpen, setIsAuthModalOpen, 
      isSubModalOpen, setIsSubModalOpen,
      notifications, addNotification, markNotificationsRead
    }}>
      {children}
    </AuthContext.Provider>
  );
};
