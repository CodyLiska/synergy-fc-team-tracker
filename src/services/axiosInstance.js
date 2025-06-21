import axios from "axios";
import { getCoachId } from "./coachService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const coachId = getCoachId();
    if (coachId) {
      config.headers["X-Coach-ID"] = coachId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
