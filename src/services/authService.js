import axiosClient from "../api/axiosClient";

export const authService = {

  async register(registerData) {
    const response = await axiosClient.post("/auth/register", registerData);
    return response.data; 
  },

  async login(credentials) {
    const response = await axiosClient.post("/auth/login", credentials);
    return response.data;
  },
};