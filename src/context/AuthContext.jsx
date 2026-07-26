import { createContext, useState } from "react";
import { authService } from "../services/authService";
import { STORAGE_KEYS } from "../utils/constants";


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (!savedUser) return null;
    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (!savedToken || !savedUser) return null;
    return savedToken;
  });

  const login = async (credentials) => {
    const data = await authService.login(credentials);

    setToken(data.token);
    setUser(data);

    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));

    return data;
  };

  const register = async (registerData) => {
    const data = await authService.register(registerData);

    setToken(data.token);
    setUser(data);

    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));

    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
