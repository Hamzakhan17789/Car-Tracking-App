import { Card } from "antd";
import Image from "next/image";
import React, { useContext, useState } from "react";
import carChasis from "../../../../public/assets/images/car-wit-chassis@2x.png";
import carEngine from "../../../../public/assets/images/Group 1881@2x.png";
import { ClientDetailPlateExplorerContext } from "../../../context/PlateExplorerContext";
import { RoutesContext } from "../../../context/routesContext/RoutesContext";
import { JourneyMapContext } from "../../../context/journeyMapContext/JourneyMapContext";

type PropsType = {
  name?: string;
  plate?: string;
  engine?: string;
  chassis?: string;
  imei?: string;
  cities?: string[];
  vehicleId?: string | undefined;
};

const SideNavCarDetailsCard =React.memo(({
  name ,
  cities,
  plate,
  chassis,
  engine,
  
  vehicleId,
}: PropsType) => {
  const clientCtx = useContext(ClientDetailPlateExplorerContext);
  
  const [clickedCard, setClickedCard] = useState<string | undefined>("");
console.log('sidenavcarddetailscard')
const routesCtX = useContext(RoutesContext)
const journeyMapCtx = useContext(JourneyMapContext)

  const sendingvehicleIDtoSessionStorage = (vehicleID: string | undefined) => {
    //////console.log(vehicleId);
    sessionStorage.setItem("vehicleIDforClientDetail", vehicleID!);
    clientCtx.setIsItemClicked(!clientCtx.isItemClicked);
    clientCtx.setIsVehicleListCardClicked(true);
   // console.log(clientCtx.isItemClicked)
    routesCtX.setRouteLoaded(false)
    journeyMapCtx.setAllTrips([])
    routesCtX.setAllRoutes([])
    //console.log( "isItemClicked" ,clientCtx.isItemClicked)
   
    if(routesCtX.timeouts && routesCtX.timeouts?.length> 0 ){
      routesCtX.timeouts.forEach((timeout: any) => {
        clearTimeout(timeout);
      });
      routesCtX.setTimeouts([])
      
    }
    console.log(routesCtX.getAllRoutes, routesCtX.routeLoaded , journeyMapCtx.allTrips)
    
    
  };
 

  return (
    <Card
      style={
        clickedCard == sessionStorage.getItem("vehicleIDforClientDetail")
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
        setClickedCard(vehicleId);
        sendingvehicleIDtoSessionStorage(vehicleId);
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3 style={{ fontSize: "13px" }}>{name}</h3>
          <span>
            {cities?.map((item, index) => {
              return (
                <p
                  key={index}
                  style={{
                    display: "inline",
                    fontSize: "11px",
                    color: "#555555",
                  }}
                >
                  {`${item} `}
                </p>
              );
            })}
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
              {chassis}
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
              {engine}
            </p>
          </span>
        </div>
      </div>
    </Card>
  );
});

export default SideNavCarDetailsCard;
