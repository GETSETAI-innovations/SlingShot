import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch fresh user data from server
  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.data.user;
        setUser(userData);
        localStorage.setItem('esac_user', JSON.stringify(userData));
        return userData;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    return null;
  };

  useEffect(() => {
    // Check for user in localStorage on mount
    try {
      const storedUser = localStorage.getItem('esac_user');
      const storedToken = localStorage.getItem('esac_token');

      if (storedUser && storedToken) {
        // Fetch fresh data from server to ensure we have the latest updates
        fetchUserData(storedToken).then((freshUserData) => {
          if (!freshUserData) {
            // If fetch fails, fall back to stored data
            setUser(JSON.parse(storedUser));
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      setLoading(false);
    }
  }, []);

  const login = async (userData, token) => {
    try {
      localStorage.setItem('esac_token', token);
      // Fetch fresh data from server to ensure we have all latest fields
      const freshUserData = await fetchUserData(token);
      if (freshUserData) {
        setUser(freshUserData);
      } else {
        // Fallback to login response data if fetch fails
        setUser(userData);
        localStorage.setItem('esac_user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('esac_user');
      localStorage.removeItem('esac_token');
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  };

  const updateUser = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem('esac_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error updating user in localStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
