import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_USE_EMULATOR
  ? "http://localhost:5001/YOUR_PROJECT/us-central1"
  : "https://your-production-api.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Automatically attach Bearer token if available
axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token"); // Adjust storage method if needed
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
