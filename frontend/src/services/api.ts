import axios from "axios";
import { getData } from "../utils/storage";

// export const baseURL = "http://localhost:5000";
// export const baseURL = "http://172.20.10.2:5000";
export const baseURL = "https://pinpoint-72yf.onrender.com";
// export const baseURL = "http://192.168.0.33:5000";
// export const baseURL = "http://192.168.0.131:5000";
export const imageURL = baseURL + "/api/images/";
// baseURL: process.env.EXPO_PUBLIC_API_URL,

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL + "/api",
  // timeout: 10000, // Set a timeout for requests (optional)
});

// Add a request interceptor to attach the token to every request (if needed)
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getData("token"); // Assuming you store the token in localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(config.url, config.baseURL);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error responses here (like 401 unauthorized, etc.)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., logout the user
      console.error("Unauthorized access - logging out...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
