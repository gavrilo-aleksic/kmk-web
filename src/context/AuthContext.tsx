import { createContext, useCallback, useEffect } from "react";
import { useMutation } from "react-query";
import { getUserFn, loginFn } from "../api/api";
import { UserModel } from "../api/types";

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  isLoading: boolean;
  loginLoading: boolean;
  userLoading: boolean;
  login: any;
  error: any;
  loginResponse?: any;
  user?: null | UserModel;
}>({
  isLoggedIn: false,
  isLoading: false,
  login: () => {},
  error: null,
  loginResponse: null,
  user: null,
  loginLoading: false,
  userLoading: false,
});

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const {
    isLoading: loginLoading,
    mutate: loginUser,
    error: loginError,
    data: loginResponse,
  } = useMutation(loginFn);

  const {
    isLoading: userLoading,
    mutate: getUser,
    error: userError,
    data: user,
  } = useMutation(getUserFn);

  useEffect(() => {
    if (loginResponse) {
      localStorage.setItem("accessToken", loginResponse.data.accessToken);
      getUser();
    }
  }, [loginResponse]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUser();
    }
  }, []);

  const isLoggedIn = !!user?.data;

  const isLoading = loginLoading || userLoading;
  const error = userError || loginError;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        login: loginUser,
        error,
        loginResponse: loginResponse?.data,
        loginLoading,
        userLoading,
        user: user?.data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
