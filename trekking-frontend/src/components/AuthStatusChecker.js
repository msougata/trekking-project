// src/components/AuthStatusChecker.js
import { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext directly

const AuthStatusChecker = () => {
  const { checkAuth } = useContext(AuthContext); // Destructure checkAuth from AuthContext

  useEffect(() => {
    checkAuth();
    const intervalId = setInterval(checkAuth, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(intervalId);
  }, [checkAuth]);

  return null;
};

export default AuthStatusChecker;