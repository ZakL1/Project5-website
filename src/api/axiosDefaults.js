import axios from "axios";

const api = axios.create({
  baseURL: "https://shutter-api-aad07b464590.herokuapp.com/",
});

// Always attach token to every request dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;