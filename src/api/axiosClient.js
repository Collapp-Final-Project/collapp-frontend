import axios from "axios";
import { STORAGE_KEYS } from "../utils/constants";


const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para inyectar el JWT
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Manejar errores globales como token expirado
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;