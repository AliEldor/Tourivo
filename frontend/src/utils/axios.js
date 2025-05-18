import axios from "axios";
import { BASE_URL } from "./config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});


axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      
      if (error.response.status === 401) {
        
        console.log("Unauthorized access");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
