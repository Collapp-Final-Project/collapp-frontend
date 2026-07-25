import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const savedToken = localStorage.getItem('collapp_token');
    const savedUser = localStorage.getItem('collapp_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parseando el usuario almacenado:', error);
        localStorage.removeItem('collapp_token');
        localStorage.removeItem('collapp_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    
    setToken(data.token);
    setUser(data);

    localStorage.setItem('collapp_token', data.token);
    localStorage.setItem('collapp_user', JSON.stringify(data));

    return data;
  };

  const register = async (registerData) => {
    const data = await authService.register(registerData);

    setToken(data.token);
    setUser(data);

    localStorage.setItem('collapp_token', data.token);
    localStorage.setItem('collapp_user', JSON.stringify(data));

    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('collapp_token');
    localStorage.removeItem('collapp_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};