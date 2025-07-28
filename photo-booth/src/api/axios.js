import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
}); 


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.accessToken) {
      localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
    }
    if (response.data && response.data.refreshToken) {
      localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;