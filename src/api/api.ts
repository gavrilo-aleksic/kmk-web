import axios from "axios";
import { LoginModel, UserModel } from "./types";
import { formatDate } from "../utils/format/date";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ROUTE,
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

export const getUsersFn = () => axiosInstance.get<string[]>("/users");

export const getExpensesFn = (dateFrom: Date, dateTo: Date) =>
  axiosInstance.get<string[]>("/query/troskovi", {
    params: { od: formatDate(dateFrom), do: formatDate(dateTo) },
  });

export default axiosInstance;
