import axiosInstance from "./axiosInstance";

export const getVisitorsApi = (page: number, limit: number) =>
  axiosInstance.get(`/api/marriage/visitors?page=${page}&limit=${limit}`);

export const getPrintVisitorsApi = () =>
  axiosInstance.get("/api/marriage/visitors/export");
