import React, { createContext, useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRIPS } from "../../graphqlOperations/query";

type TripsContextType = {
  allTrips: any[];
  deviceId: any;
  driverName: any;
  endAddress: any;
  startAddress: any;
  deviceName: any;
};

export const TripsContext = createContext<TripsContextType>({
  allTrips: [],
  deviceId: null,
  driverName: null,
  startAddress: null,
  endAddress: null,
  deviceName: null,
});

export const TripsProvider = React.memo(({ children }: any) => {
  const [allTrips, setAllTrips] = useState<any[]>([]);
  const [locationId, setLocationId] = useState<any>();

  useEffect(() => {
    const vehicleId = sessionStorage.getItem("vehicleID");
    setLocationId(vehicleId);
    console.log("locationId changed");
  }, [locationId]);
  const { data, loading, error } = useQuery(GET_ALL_TRIPS, {
    variables: {
      from: null,
      to: null,
      locationId: 2,
    },
  });
  //console.log(data)
  const [driverName, setDriverName] = useState();
  const [deviceId, setDeviceId] = useState();
  const [deviceName, setDeviceName] = useState();
  const [startAddress, setStartAddress] = useState();
  const [endAddress, setEndAddress] = useState();
  useEffect(() => {
    setAllTrips(data?.getAllTrip);
  }, [data?.getAllTrips?.length, loading]);
  //console.log("get all  trips", allTrips);
  const valueObj = {
    allTrips,
    driverName,
    deviceId,
    deviceName,
    startAddress,
    endAddress,
    loading,
  };
  return (
    <TripsContext.Provider value={valueObj}>{children}</TripsContext.Provider>
  );
});
