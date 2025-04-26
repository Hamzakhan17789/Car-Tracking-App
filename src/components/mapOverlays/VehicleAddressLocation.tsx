import React, { useContext, useEffect, useState } from "react";
import classes from "./VehicleAddressLocation.module.css";
import { SocketContext } from "../../context/socketContext/socketContext";
import { GraphqlMapContext } from "../../context/graphqlOperationsContext/graphqlMapContext";

type PropsType = {
  address?: string;
  addressFromDb: string;
};

const VehicleAddressLocation = React.memo(
  ({ address, addressFromDb }: PropsType) => {
    const [addressText, setAddressText] = useState<string>("");
    const [ addressTextFromDb, setAddressTextFromDb] = useState<string>("")
    const socketCtx = useContext(SocketContext)
    const graphlqlMapCtx = useContext(GraphqlMapContext)

    useEffect(() => {
      if (typeof address !== "string") {
        setAddressText("No Address");
      } else {
        setAddressText(address);
      }
    
    setAddressTextFromDb(addressFromDb)
    
    });


    const addressFinalValue = !socketCtx.socketDataLoaded && graphlqlMapCtx.graphqlMapDataLoaded ? addressFromDb : addressText
   console.log(socketCtx.socketDataLoaded , graphlqlMapCtx.graphqlMapDataLoaded)
    return (
      <div className={classes.vehicleAddressContainer}>
        <p className={classes.vehicleAddressText}>{addressFinalValue} </p>
      </div>
    );
  }
);

export default VehicleAddressLocation;
