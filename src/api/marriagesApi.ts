import axiosInstance from "./axiosInstance";

export const getAllMarriagesApi = () => axiosInstance.get("/api/marriages");

export const updateMarriageAccessApi = (marriageId: string, data: any) =>
  axiosInstance.put(`/api/marriages/${marriageId}/access`, data);

export const deleteMarriageApi = (marriageId: string) =>
  axiosInstance.delete(`/api/marriages/delete/${marriageId}`);
