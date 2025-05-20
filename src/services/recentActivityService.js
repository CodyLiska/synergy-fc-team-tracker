import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/recent-activity`;

export const recentActivityService = {
  async getRecentActivity() {
    const response = await axios.get(API_URL);
    return response.data;
  },
  async addActivity(activity) {
    const response = await axios.post(API_URL, activity);
    return response.data;
  },
  async deleteActivity(id) {
    await axios.delete(`${API_URL}/${id}`);
  },
};
