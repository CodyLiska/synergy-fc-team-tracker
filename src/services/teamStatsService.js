import axios from 'axios';

const API_URL = "http://localhost:5000/api/team-stats";

export const teamStatsService = {
  async getTeamStats() {
    const response = await axios.get(API_URL);
    return response.data;
  },
};