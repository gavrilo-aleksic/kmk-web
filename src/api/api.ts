import axios from "axios";
import {
  CultureQueryModel,
  ExpenseQueryModel,
  LoginModel,
  MachineQueryModel,
  OperationQueryModel,
  PortionQueryModel,
  UserModel,
} from "./types";
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

export const getEntitiesFn = () =>
  axiosInstance.get<{
    operacije: OperationQueryModel[];
    kulture: CultureQueryModel[];
    masine: MachineQueryModel[];
    parcele: PortionQueryModel[];
  }>("/query/entiteti");

export const getExpensesFn = (dateFrom: Date, dateTo: Date) =>
  axiosInstance
    .get<ExpenseQueryModel[]>("/query/troskovi", {
      params: { od: formatDate(dateFrom), do: formatDate(dateTo) },
    })
    .then((res) =>
      res.data.map((e) => ({
        ...e,
        datum_rashoda: formatDate(e.datum_rashoda!!),
      }))
    );

export default axiosInstance;
