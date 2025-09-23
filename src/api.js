import axios from "axios";

// Use Railway backend URL for both development and production
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://nbbackend-production.up.railway.app/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    console.log("🌐 Client making request to:", config.baseURL + config.url);
    console.log("🔧 Environment:", process.env.NODE_ENV);
    console.log("🔧 API URL:", config.baseURL);
    return config;
  },
  (error) => {
    console.error("❌ Client request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    console.log("✅ Client API Response received:", response.status);
    return response;
  },
  (error) => {
    console.error("❌ Client API Error:", error);
    console.error("❌ Error response:", error.response?.data);

    if (error.code === "ECONNABORTED") {
      console.error("⏰ Request timeout - Server might be slow");
    }
    if (error.code === "ERR_NETWORK") {
      console.error("🌐 Network Error: Check server availability");
    }
    return Promise.reject(error);
  }
);

export default API;
