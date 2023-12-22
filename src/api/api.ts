import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});

export const loginFn = ({
  username,
  password,
  rememberMe,
}: {
  username: string;
  password: string;
  rememberMe: boolean;
}) => axiosInstance.post("/login", { username, password, rememberMe });

export default axiosInstance;
