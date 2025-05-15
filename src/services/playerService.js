import axios from "axios";

const API_URL = "http://localhost:5000/api/players";

export const playerService = {
  getAllPlayers: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    }
  },

  getPlayer: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createPlayer: async (playerData) => {
    try {
      const response = await axios.post(API_URL, playerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePlayer: async (id, playerData) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, playerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  archivePlayer:async (playerId) => {
    await axios.post(`${API_URL}/${playerId}/archive`);
  },
  
};
