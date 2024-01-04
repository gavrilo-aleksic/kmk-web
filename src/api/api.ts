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

export const updateWorkerUsageFn = (usageWorker: UsagesWorkerQueryModel) =>
  axiosInstance.put("/query/utrosak-radnik", {
    id_rashodi_radnici: usageWorker.id_rashodi_radnici,
    cas: Number(usageWorker.cas),
    cas_cena: Number(usageWorker.cas_cena),
    cas_ucinak: Number(usageWorker.cas_ucinak),
    cas_zastoj: Number(usageWorker.cas_zastoj),
    pov_ucinak: Number(usageWorker.pov_ucinak),
    sifra_radnika: usageWorker.sifra_radnika,
    sifra_tip_rada: usageWorker.sifra_tip_rada,
    ucinak: Number(usageWorker.ucinak),
    zastoj: Number(usageWorker.zastoj),
  });

export const updateExpenseUsageFn = (expense: ExpenseUsageQueryModel) =>
  axiosInstance.put("/query/utrosak", {
    id_rashodi_utrosci: expense.id_rashodi_utrosci,
    kolicina_utroska: Number(expense.kolicina_utroska),
    sifra_utroska: expense.sifra_utroska,
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
