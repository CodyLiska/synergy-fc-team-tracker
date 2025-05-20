import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/team-stats`;

export const teamStatsService = {
  async getTeamStats() {
    const response = await axios.get(API_URL);
    return response.data;
  },
};
