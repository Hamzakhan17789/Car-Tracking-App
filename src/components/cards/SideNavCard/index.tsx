import { Card } from "antd";
import Item from "antd/es/list/Item";
import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import carChasis from "../../../../public/assets/images/car-wit-chassis@2x.png";
import carEngine from "../../../../public/assets/images/Group 1881@2x.png";
import { GraphqlMapContext } from "../../../context/graphqlOperationsContext/graphqlMapContext";
import { GraphQlOperationContext } from "../../../context/graphqlOperationsContext/graphqlOperationsContext";
import { ClientDetailPlateExplorerContext } from "../../../context/PlateExplorerContext";
import { SocketContext } from "../../../context/socketContext/socketContext";

type PropsType = {
  name?: string;
  cellPhone?: string;
  plate?: any;
  engine?: any;
  chassis?: any;
  imei?: string;
  sendImeiNumber: (imei: string, vehicleId: string | undefined, xDeviceId: string) => void;
  model?: string;
  simNumber?: string;
  deviceID: string;
  vehicleID?: string;
  myKey?: number;
  geoLocation?: any;
  xDeviceId?: any
};

const SideNavCard = React.memo(
  ({
    name,
    cellPhone,
    plate,
    chassis,
    engine,
    imei,
    xDeviceId,
    sendImeiNumber,
    model,
    simNumber,
    deviceID,
    vehicleID,
    myKey,
  }: // geoLocation,
  PropsType) => {
    const plateExplorerCtx = useContext(ClientDetailPlateExplorerContext);
  //  ////console.log("SIDE NAV CARD");
    const socketCtx = useContext(SocketContext);
    const graphQLGetAllClientsCtx = useContext(GraphQlOperationContext);
    const graphlqlMapCtx = useContext(GraphqlMapContext);

    const sendImeiToContext =useCallback(() => {
     // plateExplorerCtx.setImei(imei);
     plateExplorerCtx.setxDeviceId(xDeviceId)
    //  socketCtx.sendImeiToSocket(imei as string);
    socketCtx.sendImeiToSocket(xDeviceId as string)
      sendImeiNumber(imei as string, vehicleID as string, xDeviceId as string);
 
      graphQLGetAllClientsCtx.selectingItemHandler(
        model,
        plate,
        engine,
        chassis,
        deviceID,
        simNumber,
        xDeviceId
      );
    },[plateExplorerCtx.imei])


    const [clickedCard, setClickedCard] = useState<string | undefined>("");
    // useEffect(() => {
    //   setVehicleInformation({
    //     model: model,
    //     plate: plate,
    //     chassis: chassis,
    //     engineNo: engine,
    //     deviceID: deviceID,
    //     simNumber: simNumber,
    //   });

    // }, [selectedModel, plateExplorerCtx.onClick, vehicleID]);

    const settingTheSocketHandler = (vehicleID: any) => {
      socketCtx.socketDisconnectHandler();
      graphlqlMapCtx.setCoordinates([]);
      let gettingVehicleIDFromSessionStorage =
        sessionStorage.getItem("vehicleID");
      if (vehicleID === gettingVehicleIDFromSessionStorage) {
        //////console.log("it is same");
      } else {
        //////console.log("it is not same");
        socketCtx.socketDisconnectHandler();
        socketCtx.setPath([]);
        socketCtx.setSocketData([]);
        plateExplorerCtx.setOnClick(false);
        graphlqlMapCtx.setGraphqlMapDataLoaded(false);
        socketCtx.setSocketDataLoaded(false);
        graphlqlMapCtx.setCoordinates([]);
        // New Implementation of socket
        socketCtx.setFilteredPositionData([])
      }
    };

    return (
      <Card
        key={myKey}
        style={
          clickedCard == sessionStorage.getItem("imei")
            ? {
                background: "#F5FBFF 0% 0% no-repeat padding-box",
                marginTop: "5px",
                cursor: "pointer",
              }
            : {
                marginTop: "5px",
                cursor: "pointer",
              }
        }
        bodyStyle={{ padding: "10px", height: "57px" }}
        onClick={() => {
          sendImeiToContext();
          setClickedCard(imei);
          graphlqlMapCtx.setGraphqlMapDataLoaded(false);
          settingTheSocketHandler(vehicleID);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ fontSize: "13px" }}>Mr. {name}</h3>
            <span>
              <p
                style={{
                  display: "inline",
                  fontSize: "11px",
                  color: "#555555",
                }}
              >
                {cellPhone}
              </p>
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: "13px", textAlign: "end" }}>{plate}</h3>
            <span>
              <Image
                src={carChasis}
                alt="carChassis"
                width={"10px"}
                height={"10px"}
              />
              <p
                style={{
                  display: "inline",
                  margin: "0px 2px",
                  fontSize: "11px",
                  color: "#555555",
                }}
              >
                {chassis === null ? "-" : chassis}
              </p>
              <Image
                src={carEngine}
                alt="carChassis"
                width={"10px"}
                height={"10px"}
              />
              <p
                style={{
                  display: "inline",
                  margin: "0px 2px",
                  fontSize: "11px",
                  color: "#555555",
                }}
              >
                {engine === null ? "-" : engine}
              </p>
            </span>
          </div>
        </div>
      </Card>
    );
  }
);

export default SideNavCard;
