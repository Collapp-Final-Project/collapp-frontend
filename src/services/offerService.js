import axiosClient from "../api/axiosClient";

export const offerService = {
  async list(params = {}) {
    const response = await axiosClient.get("/offers", { params });
    return response.data;
  },

  async getById(id) {
    const response = await axiosClient.get(`/offers/${id}`);
    return response.data;
  },

  async create(offerData) {
    const response = await axiosClient.post("/offers", offerData);
    return response.data;
  },

  async update(id, offerData) {
    const response = await axiosClient.put(`/offers/${id}`, offerData);
    return response.data;
  },

  async updateStatus(id, status) {
    const response = await axiosClient.patch(`/offers/${id}/status`, { status });
  return response.data;
},

  async remove(id) {
    await axiosClient.delete(`/offers/${id}`);
  },
};