import axios from "axios";
import env from "../config/env";

const axiosInstance = axios.create({
  baseURL: env.API_URL,
  withCredentials: true, // IMPORTANT for HttpOnly cookies
});

export default axiosInstance;
