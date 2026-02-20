import axiosInstance from "./axiosInstance";

export const getVisitorsApi = (page: number, limit: number) =>
  axiosInstance.get(`/api/marriage/visitors?page=${page}&limit=${limit}`);

export const getPrintVisitorsApi = () =>
  axiosInstance.get("/api/marriage/visitors/export");


export const addVisitorApi = (data:any) =>
  axiosInstance.post("/api/marriage/visitors" , data);
