import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { checkAuthStatus, logout, getUserProfile } from '../utils/api';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // useCallback to memoize the function reference
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("AuthProvider: Checking authentication status");
      const status = await checkAuthStatus();
      console.log("AuthProvider: Auth status result:", status);
      setIsAuthenticated(status);
      
      // If authenticated, fetch user profile
      if (status) {
        try {
          const profile = await getUserProfile();
          console.log("AuthProvider: User profile fetched:", profile);
          setUserProfile(profile);
          
          // Check if user is admin (email is bdbishaldeb987@gmail.com)
          setIsAdmin(profile?.email === "bdbishaldeb987@gmail.com");
          console.log("AuthProvider: Admin status:", profile?.email === "bdbishaldeb987@gmail.com");
        } catch (profileError) {
          console.error("AuthProvider: Failed to fetch profile:", profileError);
          // Don't change authentication status if profile fetch fails
          setIsAdmin(false);
        }
      } else {
        setUserProfile(null);
        setIsAdmin(false);
      }
      
      return status;
    } catch (error) {
      console.error("AuthProvider: Auth check failed:", error);
      setIsAuthenticated(false);
      setUserProfile(null);
      setIsAdmin(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("AuthProvider: Initial auth check");
    checkAuth();
  }, [checkAuth]);

  const handleLogout = useCallback(async () => {
    try {
      console.log("AuthProvider: Logging out");
      await logout();
      setIsAuthenticated(false);
      setUserProfile(null);
      setIsAdmin(false);
      navigate('/login');
      console.log("AuthProvider: Logout successful");
    } catch (error) {
      console.error("AuthProvider: Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  }, [navigate]);

  // Debug auth state changes
  useEffect(() => {
    console.log("AuthProvider: Authentication state changed:", isAuthenticated);
  }, [isAuthenticated]);

  const contextValue = {
    isAuthenticated,
    isLoading,
    userProfile,
    isAdmin,
    checkAuth,
    handleLogout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
