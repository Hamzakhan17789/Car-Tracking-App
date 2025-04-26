// import { useMemo } from "react";
// import { ITabItem, Tab } from "forging-react";
import type { NextPage } from "next";
// import SideCollapse from "../components/shared/SideCollapse";
import styles from "../styles/Home.module.css";
// import App from "./_app";
import Login from "./login";
import HomePage from "./monitor";
// import PlateExplorer from "../components/home/PlateExplorer";
// import GoogleMap from "../components/shared/Map";

const filteredStat = [{}];

const Dashboard: NextPage = () => {
  // const sideTabs: ITabItem = useMemo(() => {
  //   return {
  //     Plate: <PlateExplorer />,
  //     Chasis: null,
  //     Engine: null,
  //     Client: null,
  //     Cell: null,
  //   };
  // }, []);

  // const renderMapFilters = useMemo(() => {
  //   return filteredStat.map(() => {
  //     return <div key={""}></div>;
  //   });
  // }, []);


let token: any;

if(typeof  window !== "undefined"){
  token = sessionStorage.getItem('token')
}

////console.log( "token is "+Boolean(token))
////console.log(token)

const render = token === false ? <Login /> : <HomePage />
  return render
    
    
};

 export default Dashboard;
