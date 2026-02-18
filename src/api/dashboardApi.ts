import axiosInstance from "./axiosInstance";


export const getDashboardStatsApi = () =>
  axiosInstance.get("/api/marriage/visitors/dashboard");
