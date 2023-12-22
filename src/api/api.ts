import axios from "axios";
import { LoginModel, UserModel } from "./types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("accessToken");
  return config;
});

export const loginFn = ({
  username,
  password,
  rememberMe,
}: {
  username: string;
  password: string;
  rememberMe: boolean;
}) =>
  axiosInstance.post<LoginModel>("/login", {
    username,
    password,
    rememberMe,
  });

export const getUserFn = () => axiosInstance.get<UserModel>("/user");

export default axiosInstance;
