import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { ClientDetailPlateExplorerContext } from "../../../context/PlateExplorerContext";
import { GET_ONE_LOCATION_DETAIL } from "../../../graphqlOperations/querry";

const VehicleInfoCard = React.memo(() => {
  const locationLS = localStorage.getItem("locationId");
  const [locationId, setLocationId] = useState<string | null>(locationLS);
  //////console.log("LS", locationId);
  useEffect(() => {
    setLocationId(locationLS);
  }, [locationId]);

////console.log('vehicleinfocard')
  const [vehicleID , setVehicleID] = useState<string | null>()
 let isVehicleId 

const clientCtx = useContext(ClientDetailPlateExplorerContext)
  useEffect(()=>{
    isVehicleId = sessionStorage.getItem('vehicleIDforClientDetail')
   
   setVehicleID(isVehicleId)
  },[isVehicleId, clientCtx.isItemClicked , vehicleID])

const [ orgID ,setOrgID ] = useState<number | null>()
useEffect(()=>{
let isOrgId = Number(localStorage.getItem('orgId'))
setOrgID(isOrgId)
},[])
const { data, loading, error } = useQuery(GET_ONE_LOCATION_DETAIL, {
  variables: {
    where: {
      org: {
        id: orgID,
      },
      id: Number(vehicleID),
    },
  },
  skip: vehicleID === null || orgID === null,
});
  //////console.log("data:", data?.getAllLocation);
  const errorMessage = "Failed to Fetch"
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Model</p>
        {loading ? (
          <Spin size="small" />
        ) : !loading && error === undefined ? (
          <p style={{ color: "#495057" }}>
            {`${
              data?.getAllLocation[0]?.model == null
                ? "-"
                : `${data?.getAllLocation[0]?.model}`
            } `}
          </p>
        ) : (
          <p style={{ color: "#495057" }}>{errorMessage}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Model Year</p>
        {loading ? (
          <Spin size="small" />
        ) : !loading && error === undefined ? (
          <p style={{ color: "#495057" }}>
            {`${
             data?.getAllLocation[0]?.year == null
                ? "-"
                : `${ data?.getAllLocation[0]?.year}`
            } `}
          </p>
        ) : (
          <p style={{ color: "#495057" }}>{errorMessage}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Registration</p>
        {loading ? (
          <Spin size="small" />
        ) : !loading && error === undefined ? (
          <p style={{ color: "#495057" }}>
            {`${
              data?.getAllLocation[0]?.identity == null
                ? "-"
                : `${data?.getAllLocation[0]?.identity}`
            } `}
          </p>
        ) : (
          <p style={{ color: "#495057" }}>{errorMessage}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Chasis</p>
        {loading ? (
          <Spin size="small" />
        ) : !loading && error === undefined ? (
          <p style={{ color: "#495057" }}>
            {`${
              data?.getAllLocation[0]?.chassis == null
                ? "-"
                : `${data?.getAllLocation[0]?.chassis}`
            } `}
          </p>
        ) : (
          <p style={{ color: "#495057" }}>{errorMessage}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Engine No</p>
        {loading ? (
          <Spin size="small" />
        ) : !loading && error === undefined ? (
          <p style={{ color: "#495057" }}>
            {`${
              data?.getAllLocation[0]?.engine == null
                ? "-"
                : `${data?.getAllLocation[0]?.engine}`
            } `}
          </p>
        ) : (
          <p style={{ color: "#495057" }}>{errorMessage}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Engine Hours</p>
        {loading ? (
          <Spin size="small" />
        ) : !loading && error === undefined ? (
          <p style={{ color: "#495057" }}>
            {`${
              data?.getAllLocation[0]?.engineHours == null ||
              data?.getAllLocation[0]?.engineHours == undefined
                ? "-"
                : `${ data?.getAllLocation[0]?.engineHours}`
            } `}
          </p>
        ) : (
          <p style={{ color: "#495057" }}>{errorMessage}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Engine Horsepower</p>
        {loading ? (
          <Spin size="small" />
        ) : !loading && error === undefined ? (
          <p style={{ color: "#495057" }}>
            {`${
              data?.getAllLocation[0]?.engineHoursPower == null ||
              data?.getAllLocation[0]?.engineHoursPower == undefined
                ? "-"
                : `${ data?.getAllLocation[0]?.engineHoursPower}`
            } `}
          </p>
        ) : (
          <p style={{ color: "#495057" }}>{errorMessage}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Manufacturer</p>
        {loading ? (
          <Spin size="small" />
        ) : !loading && error === undefined ? (
          <p style={{ color: "#495057" }}>
            {`${
              data?.getAllLocation[0]?.manufacturer == null ||
              data?.getAllLocation[0]?.manufacturer == undefined
                ? "-"
                : `${ data?.getAllLocation[0]?.manufacturer}`
            } `}
          </p>
        ) : (
          <p style={{ color: "#495057" }}>{errorMessage}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Colour</p>
        {loading ? (
          <Spin size="small" />
        ) : !loading && error === undefined ? (
          <p style={{ color: "#495057" }}>
            {`${
              data?.getAllLocation[0]?.color == null ||
              data?.getAllLocation[0]?.color == undefined
                ? "-"
                : `${ data?.getAllLocation[0]?.color}`
            } `}
          </p>
        ) : (
          <p style={{ color: "#495057" }}>{errorMessage}</p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Odometer</p>
        {loading ? (
          <Spin size="small" />
        ) : !loading && error === undefined ? (
          <p style={{ color: "#495057" }}>
            {`${
              data?.getAllLocation[0]?.odometer == null ||
              data?.getAllLocation[0]?.odometer == undefined
                ? "-"
                : `${ data?.getAllLocation[0]?.odometer}`
            } `}
          </p>
        ) : (
          <p style={{ color: "#495057" }}>{errorMessage}</p>
        )}
      </div>
    </>
  );
});

export default VehicleInfoCard;
