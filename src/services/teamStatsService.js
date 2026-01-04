import axios from './axiosInstance';

// const API_URL = `${import.meta.env.VITE_API_URL}/team-stats`;
const API_URL = `http://localhost:3000/api/team-stats`;

export const teamStatsService = {
  async getTeamStats() {
    const response = await axios.get(API_URL);
    return response.data;
  },
};
