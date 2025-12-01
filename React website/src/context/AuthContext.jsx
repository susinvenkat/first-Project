import { createContext, useState, useEffect } from 'react';
import { mockCheckSession, mockLogout, isMockMode } from '../utils/mockAuth';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in from session
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (isMockMode()) {
        // Use mock session check
        const data = await mockCheckSession();
        if (data.logged_in) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } else {
        // Use real backend session check
        const response = await fetch('/backend/auth/check_session.php', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.logged_in) {
            setUser(data.user);
            setIsAuthenticated(true);
          }
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Store user data in sessionStorage for persistence across page refreshes
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      if (isMockMode()) {
        await mockLogout();
      } else {
        await fetch('/backend/auth/logout.php', {
          method: 'POST',
          credentials: 'include'
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem('user');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
