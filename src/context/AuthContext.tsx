import { useMutation } from "@apollo/client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { LOGIN_USER } from "../graphqlOperations/mutation";
import { Button, message, Space } from "antd";
import { useRouter } from "next/router";
type ContextType = {
  userInfo: any;
  isLoading: boolean;
  signIn: (email: string, password: string) => any;
  signout: () => void;
};
export const AuthContext = createContext<ContextType>({
  userInfo: [],
  isLoading: false,
  signIn: (email: string, password: string) => {},
  signout: () => {},
});
type Props = {
  children: React.ReactNode;
};

export const AuthProvider = React.memo(({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [method] = useMutation(LOGIN_USER);
//////console.log('AUTH PROVIDER')
  const [userInfo, setUserInfo] = useState();
  //////////console.loglog("context");
  const router = useRouter();

  const signIn = useCallback(async (userEmail: string, userPassword: string) => {
    try {
      setIsLoading(true);
      const response = await method({
        variables: {
          input: {
            email: userEmail,
            password: userPassword,
          },
        },
      });
      // //////console.log("response->", response?.data?.login?.access_token);
      localStorage.setItem("token", response?.data?.login?.access_token);
      sessionStorage.setItem("token", response?.data?.login?.access_token);
      message.success({
        content: "Login Succesfully",
      });
      router.push("/monitor");
    } catch (err: any) {
      message.error({
        content: err?.message,
      });
      ////////////console.loglog(err.message);
    } finally {
      setIsLoading(false);
     
    }
  },[])

  const signout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("orgId");
    sessionStorage.removeItem("ORGID");
    sessionStorage.removeItem("imei");
    sessionStorage.removeItem("vehicleID");
    localStorage.removeItem("dateSelected");
    localStorage.removeItem("locationId");
    localStorage.removeItem("selectedDate");
    sessionStorage.removeItem("vehicleIDforClientDetail");
    sessionStorage.removeItem('token')
    setUserToken("");
    router.push("/login");
   
  },[userToken]);

  const isLogedIn = () => {
 //   let userToken = localStorage.getItem("token");
 let userToken = sessionStorage.getItem('token')

    if (userToken) {
      setUserToken(userToken);
    }
  };
  useEffect(() => {
    isLogedIn();
  }, []);

  const valueObj = {
    isLoading,
    signIn,
    signout,
    userToken,
    userInfo,
  };

  return (
    <AuthContext.Provider value={valueObj}>{children}</AuthContext.Provider>
  );
});
