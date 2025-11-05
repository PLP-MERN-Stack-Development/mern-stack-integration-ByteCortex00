import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to restore user session
    try {
      const currentUser = authService.getCurrentUser();
      console.log('🔐 Restored user session:', currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error('Error restoring user session:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      // backend may return user info at top-level or under `user`
      const userObj = data.user ?? data;
      setUser(userObj);
      // return a consistent shape
      return { ...data, user: userObj };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
     try {
       setLoading(true);

       // Basic validation - match User model requirements
       if (!userData.name?.trim()) {
         throw new Error('Name is required');
       }
       if (userData.name.trim().length < 2) {
         throw new Error('Name must be at least 2 characters');
       }
       if (userData.name.trim().length > 50) {
         throw new Error('Name cannot be more than 50 characters');
       }
       if (!userData.email?.trim()) {
         throw new Error('Email is required');
       }
       if (!userData.password) {
         throw new Error('Password is required');
       }
       if (userData.password.length < 6) {
         throw new Error('Password must be at least 6 characters');
       }

       console.log('📤 Registering with data:', userData);

       const data = await authService.register(userData);
  const userObj = data.user ?? data;
  setUser(userObj);
  return { ...data, user: userObj };
     } catch (error) {
       console.error('Registration error:', error);
       throw error;
     } finally {
       setLoading(false);
     }
};

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = !!user;
  console.log('🔑 Auth State:', { isAuthenticated, user });

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated
  };

  // Always return the provider so consumers can access the context object.
  // Show a loading fallback inside the provider until auth is initialized.
  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
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

export default AuthContext;