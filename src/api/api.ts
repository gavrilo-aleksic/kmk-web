import axios from "axios";
import {
  CultureQueryModel,
  ExpenseQueryModel,
  LoginModel,
  MachineQueryModel,
  OperationQueryModel,
  PortionQueryModel,
  ExpenseUsageQueryModel,
  UsagesWorkerQueryModel,
  UserModel,
  WorkTypeQueryModel,
  WorkerQueryModel,
  ExpenditureQueryModel,
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
    tipoviRada: WorkTypeQueryModel[];
    radnici: WorkerQueryModel[];
    utrosci: ExpenditureQueryModel[];
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

export const updateExpensesFn = (expense: ExpenseQueryModel) =>
  axiosInstance.put("/query/troskovi", {
    id_rashoda: expense.id_rashoda,
    datum_rashoda: expense.datum_rashoda,
    sifra_masine: expense.sifra_masine,
    sifra_parcele: expense.sifra_parcele,
    sifra_kulture: expense.sifra_kulture,
    sifra_operacije: expense.sifra_operacije,
  });

export const getUsagesWorkerFn = (utrosakId: string | number) =>
  axiosInstance.get<UsagesWorkerQueryModel[]>("/query/utrosak-radnik", {
    params: { utrosakId },
  });

export const getUsagesFn = (utrosakId: string | number) =>
  axiosInstance.get<ExpenseUsageQueryModel[]>("/query/utrosak", {
    params: { utrosakId },
  });

export default axiosInstance;
