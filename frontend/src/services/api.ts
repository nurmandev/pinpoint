import axios from "axios";
import { getData } from "../utils/storage";

export const baseURL = "http://192.168.0.131:5000/api";
export const imageURL = "http://192.168.0.131:5000/api/images/";
// baseURL: process.env.EXPO_PUBLIC_API_URL,
// baseURL: "http://172.20.10.4:5000/api",
// baseURL: "https://pinpoint-72yf.onrender.com/api",

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL,
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
