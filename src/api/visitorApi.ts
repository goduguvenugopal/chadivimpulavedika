import axiosInstance from "./axiosInstance";

export const getVisitorsApi = (page: number, limit: number, search: string) =>
  axiosInstance.get(
    `/api/marriage/visitors?page=${page}&limit=${limit}&search=${search}`,
  );

export const getPrintVisitorsApi = () =>
  axiosInstance.get("/api/marriage/visitors/export");

export const addVisitorApi = (data: any) =>
  axiosInstance.post("/api/marriage/visitors", data);

export const deleteVisitorApi = (id: string) =>
  axiosInstance.delete(`/api/marriage/visitors/${id}`);

export const updateVisitorApi = (id: string, data: any) =>
  axiosInstance.put(`/api/marriage/visitors/update/${id}`, data);
