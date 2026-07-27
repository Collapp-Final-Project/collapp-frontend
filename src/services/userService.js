import axiosClient from "../api/axiosClient";

export const userService = {
  async getMe() {
    const response = await axiosClient.get("/users/me");
    return response.data;
  },
};