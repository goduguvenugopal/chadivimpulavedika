import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // IMPORTANT for HttpOnly cookies
});

export default axiosInstance;
