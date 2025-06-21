import axios from "axios";
import { getAccessToken, setAccessToken, logout } from "./authService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response &&
      err.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post("/auth/refresh-token");
        const newToken = response.data.accessToken;
        setAccessToken(newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
