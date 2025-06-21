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
      // For Production
      // config.headers["X-Coach-ID"] = coachId;

      // For Development
      config.headers["X-Coach-ID"] =
        localStorage.getItem("coachId") || "665f1234567890abcdef1111";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
