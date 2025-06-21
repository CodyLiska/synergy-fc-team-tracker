import axios from "axios";
import { getToken, getCoachId } from "./authService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  const coachId = getCoachId();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (coachId) {
    config.headers["X-Coach-ID"] = coachId;
  }

  return config;
});

export default axiosInstance;
