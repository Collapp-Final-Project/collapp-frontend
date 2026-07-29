import axiosClient from "../api/axiosClient";

export const applicationService = {
  async create(offerId, message) {
    const response = await axiosClient.post("/applications", { offerId, message });
    return response.data;
  },

  async listMine() {
    const response = await axiosClient.get("/applications/mine");
    return response.data;
  },

  async updateStatus(applicationId, status) {
    const response = await axiosClient.patch(`/applications/${applicationId}/status`, { status });
    return response.data;
  },

  async listByOffer(offerId) {
    const response = await axiosClient.get(`/offers/${offerId}/applications`);
    return response.data;
  },
};