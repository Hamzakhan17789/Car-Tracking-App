import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  useRef,
  useState,
} from "react";
import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
// import { createReduxStore } from "../redux/store";
import { useRouter } from "next/router";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "../helper/apollo";
import "../../public/css/global.css";

import { AuthContext, AuthProvider } from "../context/AuthContext";
import PlateExplorerProvider from "../context/PlateExplorerContext";
import GraphQlOperationProvider from "../context/graphqlOperationsContext/graphqlOperationsContext";
import SocketProvider from "../context/socketContext/socketContext";
import GraphqlMapProvider from "../context/graphqlOperationsContext/graphqlMapContext";
import JourneyMapContextProvider from "../context/journeyMapContext/JourneyMapContext";
import LayoutDesign from "../components/layout/FullLayout";
import dynamic from "next/dynamic";
import { TripsProvider } from "../context/tripsContext/TripsContext";
import { RoutesContext, RoutesProvider } from "../context/routesContext/RoutesContext";



const App = React.memo(({ Component, pageProps }: AppProps) => {
  //   const store = useMemo(() => createReduxStore(), []);
  // const { userToken } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [clickedOnRoute, setClickedOnRoute] = useState(false);
  const router = useRouter();
  const checkToken = () => {
    //let userToken = localStorage.getItem("token");
    let userToken = sessionStorage.getItem("token");
    // let userToken = "asad";
    if (!userToken) {
      router.push("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  ////console.log("APP.TSX");

  // const LayoutDesignComponent =dynamic(() => import("../components/layout/FullLayout/index"), {
  //   ssr: false,
  // });
  // function wave(str: any) {
  //   // Code here

  //   let splittedStr = str.split("");
  //   let result = [];
  //   for (let i = 0; i < splittedStr.length; i++) {
  //     //////console.log(splittedStr[i].toUpperCase())
  //   //  ////console.log(i)
  //     result.push(str);
  //   }
  //   // ////console.log(result);
  //   const finalResult : any = [];
  //   ////console.log('result length',result.length)
  //   for (let i = 0; i < result.length; i++) {
   
  //   ////console.log(result[i][i].toUpperCase())
  //    ////console.log(i)
  //   //  finalResult.push(temp);
  //   }
  //   //////console.log(finalResult);
  // //  ////console.log(result);
  //   return splittedStr;
  // }

  // ////console.log(wave("hamza"));
  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  //////console.log( GOOGLE_MAP_API_KEY)

  return (
    // <Provider store={store}>
    <>
      <ApolloProvider client={client}>
        <AuthProvider>
        {/* <TripsProvider> */}
          <GraphqlMapProvider>
            <PlateExplorerProvider>
              <GraphQlOperationProvider>
             
                <SocketProvider>
          <RoutesProvider>
                  <LayoutDesign
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    clickedOnRoute={clickedOnRoute}
                    setClickedOnRoute={setClickedOnRoute}
                  >
                    <Component
                      {...pageProps}
                      collapsed={collapsed}
                      setCollapsed={setCollapsed}
                    />
                  </LayoutDesign>
                  </RoutesProvider>
                 
                </SocketProvider>
               
              </GraphQlOperationProvider>
            </PlateExplorerProvider>
          </GraphqlMapProvider>
          {/* </TripsProvider> */}
        </AuthProvider>
      </ApolloProvider>{" "}
    </>

    // </Provider>
  );
});

// export default App;
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
