import axiosInstance from "./axiosInstance";

export const loginApi = (data: { adminMobileNumber: string , password : string}) =>
  axiosInstance.post("/api/marriages/login", data);

export const registerApi = (data: any) =>
  axiosInstance.post("/api/marriages/register", data);

export const logoutApi = () => axiosInstance.post("/api/marriages/logout");

export const getMeApi = () => axiosInstance.get("/api/marriages/me");
