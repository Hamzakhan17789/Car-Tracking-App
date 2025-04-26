import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  ClientDetailList,
  VehicleResult,
} from "../../model/plateExplorerTypes/plateExplorerTypes";
// import classes from "./client-list-item.module.css";
import engineLogo from "../../../public/assets/images/car-engine@2x.png";
import chassisLogo from "../../../public/assets/images/car-wit-chassis@2x.png";
// import engineLogo from "../../../../public/assets/group 1881.png";
// import chassisLogo from "../../../../public/assets/car-wit-chassis.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { ClientDetailPlateExplorerContext } from "../../context/PlateExplorerContext";
import SideNavCard from "../cards/SideNavCard";
import { Col, Row, Spin } from "antd";
import SideNavCarDetailsCard from "../cards/SideNavCard/SideNavCarDetailsCard";
import { GraphQlOperationContext } from "../../context/graphqlOperationsContext/graphqlOperationsContext";
import { GraphqlMapContext } from "../../context/graphqlOperationsContext/graphqlMapContext";
import { SocketContext } from "../../context/socketContext/socketContext";
import { useQuery } from "@apollo/client";
import { GET_CLIENT_VEHICLE } from "../../graphqlOperations/query";

// import { SocketContext } from "../../../context/socket-context/socket-context";
//import { socket } from "../../../url/socket-url";
// import { io } from "socket.io-client";
interface PropTypes {
  searchResult?: ClientDetailList[];
  homePageTest?: string;
  showClientList?: boolean;
  showVehicleList?: boolean;
}

const PlateExplorerListItem = React.memo(
  ({ showClientList, showVehicleList }: PropTypes) => {
    const clientCtx = useContext(ClientDetailPlateExplorerContext);

    const [clientID, setClientID] = useState<any>();
    const router = useRouter();

    const socketCtx = useContext(SocketContext);
    useEffect(() => {
      if (router.pathname === "/monitor" || router.pathname === "alarms") {
        //   setShowClientList(true);
      } else if (router.pathname === "/clients/[clientId]") {
        // setShowClientList(false)
        // setShowVehicleList(true);
        setClientID(router.query.clientId);
      }
    }, []);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [ isError , setIsError] = useState<boolean>(false)


    let orgID;
    if (typeof window !== "undefined") {
      orgID = sessionStorage?.getItem("ORGID");
    }

    const { data, error, loading } = useQuery(GET_CLIENT_VEHICLE, {
      variables: {
        clientId: Number(router.query.clientId),
        orgId: Number(orgID),
      },
    });
    useEffect(() => {
      setIsLoading(loading);
      if(error){
        setIsError(true)
      }else{
        setIsError(false)
      }
    }, [loading , error]);

    const renderVehicleList = data?.getAllBySearchLocation?.map(
      (item: any, i: number) => (
        <SideNavCarDetailsCard
          key={i}
          name={item.model}
          plate={item.year}
          engine={item.engine}
          chassis={item.chassis}
          vehicleId={item.id}
        />
      )
    );



    // const showRenderVehicleList = isLoading ? (
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       marginTop: "10px",
    //     }}
    //   >
    //     <Spin />
    //   </div>
    // ) : (
    //   renderVehicleList
    // ) : isError ===true  ? (<p>Error Fetching Data</p>)
    const showRenderVehicleList = isLoading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Spin />
      </div>
    ) : isError ? (
      <p>Error Fetching Data</p>
    ) : (
      renderVehicleList
    );

    const graphlqlMapCtx = useContext(GraphqlMapContext);
    const [clientSelected, setClientSelected] = useState(false);

    const sendingImeiNumber = useCallback(
      (
        imei: string | undefined,
        vehicleID: string | undefined,
        xDeviceId: string
      ) => {
        clientCtx.setImei(imei);
        sessionStorage.setItem("imei", imei!);
        sessionStorage.setItem("xDeviceId", xDeviceId);
        clientCtx.setVehicleIDinToken(vehicleID!);
        setClientSelected(!clientSelected);
        clientCtx.setOnClick(true);
        socketCtx.setSocketDataLoaded(false);
        socketCtx.setSocketData([]);
        socketCtx.setPath([]);
        graphlqlMapCtx.handleClick(vehicleID);

        socketCtx.setFilteredPositionData([]);
      },
      [clientCtx.setOnClick]
    );
    //////console.log(clientCtx.onClick)
    useEffect(() => {
      sessionStorage.setItem("vehicleID", clientCtx.vehicleIDinToken!);
    }, [clientCtx.vehicleIDinToken]);

    const graphQLGetAllClientsCtx = useContext(GraphQlOperationContext);

    useEffect(() => {}, [
      graphQLGetAllClientsCtx.data?.lengthOfData,
      graphQLGetAllClientsCtx?.data?.getAllBySearchLocation?.length,
      graphQLGetAllClientsCtx.searchedValue,
      graphQLGetAllClientsCtx.data?.getAllClient?.length,
      showClientList,
      showVehicleList,
    ]);
    ////console.log(graphQLGetAllClientsCtx.mergeData)
    const renderFilteredClient = (
      <>
        <>
          {graphQLGetAllClientsCtx.mergeData?.map((item: any, i: number) => {
            return (
              <>
                <SideNavCard
                  key={i}
                  myKey={i}
                  name={item?.client?.firstName}
                  cellPhone={item?.client?.contactNumber}
                  chassis={item.chassis}
                  engine={item.engine}
                  plate={item.identity}
                  imei={item?.device?.imei}
                  sendImeiNumber={sendingImeiNumber}
                  model={item?.model}
                  simNumber={item?.device?.network?.number}
                  deviceID={item?.device?.id}
                  vehicleID={item?.id}
                  xDeviceId={item?.xDeviceId}
                  geoLocation={item?.geo_location}
                />
              </>
            );
          })}
        </>
      </>
    );

    return (
      <>
        {showClientList && renderFilteredClient}
        {/* {showVehicleList && renderVehicleList} */}
        {showVehicleList && showRenderVehicleList}
      </>
    );
  }
);
export default PlateExplorerListItem;
