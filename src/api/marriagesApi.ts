import axiosInstance from "./axiosInstance";

export const getAllMarriagesApi = () => axiosInstance.get("/api/marriages");
