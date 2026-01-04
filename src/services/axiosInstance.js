import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export default axiosInstance;

// import axios from "axios";
// import { getAccessToken, setAccessToken, logout } from "./authService";
// import { logout } from "./authService";

// const axiosInstance = axios.create({
//   // baseURL: import.meta.env.VITE_API_URL,
//   baseURL: "http://localhost:3000/api/",
//   withCredentials: true,
//   timeout: 5000,
// });

// axiosInstance.interceptors.request.use((config) => {
//   config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// });

// axiosInstance.interceptors.request.use((config) => {
//   const coachId = getCoachId();
//   if (coachId) {
//     config.headers["X-Coach-ID"] = coachId;
//  }
// });

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;
//     if (
//       err.response &&
//       err.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const response = await axiosInstance.post("/auth/refresh-token");
//         const newToken = response.data.accessToken;
//         setAccessToken(newToken);
//         originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshErr) {
//         logout();
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;
