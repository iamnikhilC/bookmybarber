import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// On 401 → Auto Refresh
axiosClient.interceptors.response.use(
  response => response,
  async (error) => {
      const originalRequest = error.config;

      // If 401 => try refresh token
      if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
              await axios.get("http://mybarber.local/refresh-token", {
                  withCredentials: true
              });

              return axiosClient(originalRequest); // retry old request
          } catch (refreshError) {
              console.log("Refresh failed, redirect to login");
              window.location.href = "/login";
          }
      }

      return Promise.reject(error);
  }
);

export default axiosClient;
