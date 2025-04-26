import { useApolloClient, useQuery } from "@apollo/client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GET_VEHICLE_COORDINATES,
  GET_VEHICLE_COORDINATES_FROM_SEARCH_LOCATION,
} from "../../graphqlOperations/query";
import { ClientDetailPlateExplorerContext } from "../PlateExplorerContext";

import { GraphQlOperationContext } from "./graphqlOperationsContext";
import React from "react";

type GraphqlContextType = {
  coordinates: any[] | null;
  graphqlLat: number | null;
  graphqlLng: number | null;
  graphqlAltitude: number | null;
  graphqlSpeed: number | null;
  graphqlAngle: number | null;
  graphqlSatellites: number | null;
  graphqlIgnition: number | null;
  graphqlTimestamp: number | null;
  graphqlBatteryVoltage: number | null;
  graphqlOdometer: number | null;
  // gettingSelectedItem: (item: boolean) => void;
  gps: any;
  graphqlMapDataLoaded: boolean;
  setGraphqlMapDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;

  // gettingVehicleCoordinatesFromItem: (data: any) => void;
  setCoordinates: (newCoordinates: any[]) => void;
  routeChanged: boolean;
  setRouteChanged: React.Dispatch<React.SetStateAction<boolean>>;
  onClickDataFromDatabase: (vehicleId: any) => void;
  handleClick: (vehicleId: any) => void;
  addressFromDb: string;
  setAddressFromDb:React.Dispatch<React.SetStateAction<string>>
  graphqlPower:any
  graphqlDallasTemp:any
  graphqlTotalDistance:any
  graphqlHours:any;
  graphqlServerTime:any;
  graphqlDeviceTime:any;
  graphqlFuelLevel:any;
  graphqlBleTemp:any
};

type Coodinates = {
  coordinates: () => [];
};
export const GraphqlMapContext = createContext<GraphqlContextType>({
  coordinates: [],
  graphqlLat: null,
  graphqlLng: null,
  graphqlAltitude: null,
  graphqlSpeed: null,
  graphqlAngle: null,
  graphqlSatellites: null,
  graphqlIgnition: null,
  graphqlTimestamp: null,
  graphqlBatteryVoltage: null,
  graphqlOdometer: null,
  //gettingSelectedItem: () => {},
  gps: {},
  graphqlMapDataLoaded: false,
  setGraphqlMapDataLoaded: () => {},
  //gettingVehicleCoordinatesFromItem: (data: any) => {},
  setCoordinates: (newCoordinates: any[]) => {},
  routeChanged: false,
  setRouteChanged: () => {},
  onClickDataFromDatabase: (vehicleId: any) => {},
  handleClick: (vehicleId: any) => {},
  addressFromDb:"",
  setAddressFromDb:()=>{},
  graphqlPower:undefined,
  graphqlDallasTemp:undefined,
  graphqlTotalDistance:undefined,
  graphqlHours:undefined,
  graphqlServerTime:undefined,
  graphqlDeviceTime:undefined,
  graphqlFuelLevel: undefined,
  graphqlBleTemp:undefined
});

type Props = {
  children: React.ReactNode;
};

const GraphqlMapProvider = React.memo(({ children }: Props) => {
  const clientCtx = useContext(ClientDetailPlateExplorerContext);

  
 const [result , setResult] = useState<any>()
 const [ address, setAddress] = useState<string>("")


  const [coordinates, setCoordinates] = useState<any[]>([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [speed, setSpeed] = useState(0);
  const [angle, setAngle] = useState(0);
  const [satelittes, setSatelittes] = useState(null);
  const [ignition, setIgnition] = useState<any>(null);
  const [timestamp, setTimestamp] = useState(null);
  const [ power, setPower] = useState<any>(undefined)
  const [dallasTemp, setDallasTemp] = useState<any>(undefined)
  const [totalDistance, setTotalDistance] = useState<any>(undefined)
  const [hours, setHours] = useState<any>(undefined)
  const [serverTime, setServerTime] = useState<any>(undefined)
  const [deviceTime, setDeviceTime] = useState<any>(undefined)
  const [fuelLevel , setFuelLevel] = useState<any>(undefined)
  const [bleTemp ,  setBleTemp] = useState<any>(undefined)
 ;

  const [gps, setGps] = useState<any | null>(null);
  const [graphqlMapDataLoaded, setGraphqlMapDataLoaded] =
    useState<boolean>(false);
    

  const [batteryVoltage, setBatteryVoltage] = useState<number | null>(null);
  const [odometer, setOdometer] = useState<number | null>(null);

  const [geoLocation, setGeoLocation] = useState<any>();
  

  const client = useApolloClient();
  const [routeChanged, setRouteChanged] = useState<boolean>(false);

  const vehicleIdRef = useRef(null);

  let filteredCoordinates: any[] = [];

  const onClickDataFromDatabase = async (vehicleId: any) => {
    if (vehicleId === null) {
    
      return;
    }

    const orgID = sessionStorage.getItem("ORGID");
    const { data, loading } = await client.query({
      query: GET_VEHICLE_COORDINATES_FROM_SEARCH_LOCATION,
      variables: {
        orgId: Number(orgID),
      
      },
    });


    filteredCoordinates = data?.getAllBySearchLocation.filter(
      (ele: any, i: number) => {
        return ele.id === vehicleId;
      }
    );
   
    setCoordinates(filteredCoordinates);
    console.log("coordinates" ,coordinates);
  };

  useEffect(() => {
    setGeoLocation(coordinates[0]?.geo_location);
    if (geoLocation != null) {
      setGraphqlMapDataLoaded(true);
    } else {
      setGraphqlMapDataLoaded(false);
    }
console.log(coordinates)
    setLat(coordinates[0]?.geo_location?.gps?.latitude);
    setLng(coordinates[0]?.geo_location?.gps?.longitude);
    setBatteryVoltage(coordinates[0]?.geo_location?.["Battery_Voltage"]);
    setTimestamp(coordinates[0]?.geo_location?.timestamp);
    setIgnition(coordinates[0]?.geo_location?.Ignition);
    setSpeed(coordinates[0]?.geo_location?.Speed);
    setGps(coordinates[0]?.geo_location?.gps);
    setOdometer(coordinates[0]?.geo_location?.["Total_Odometer"]);
    setPower(coordinates[0]?.geo_location?.attributes?.power)
 
    setDallasTemp(coordinates[0]?.geo_location?.attributes?.io72)
    setTotalDistance(coordinates[0]?.geo_location?.attributes?.totalDistance)
    setHours(coordinates[0]?.geo_location?.attributes?.hours)
    setServerTime(coordinates[0]?.geo_location?.attributes?.serverTime)
    setDeviceTime(coordinates[0]?.geo_location?.attributes?.deviceTime)
    setFuelLevel(coordinates[0]?.geo_location?.attributes?.io270)
    setBleTemp(coordinates[0]?.geo_location?.attributes?.io25)

  getAddressFromLatLng(lat , lng)
 
  }, [coordinates?.length, vehicleIdRef, onClickDataFromDatabase]);


   function getAddressFromLatLng(latitude : any, longitude : any) {
    if (
      latitude === null ||
      longitude === null ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return;
    }
    const geocoder = new window.google.maps.Geocoder();

    const latLng = new window.google.maps.LatLng(latitude, longitude);

    geocoder.geocode({ location: latLng }, (results , status) => {
    
      if (status === "OK" ) {
        if (results![0]) {
          setResult(results![0].formatted_address);
          setAddress(result +"from DB")
          latitude = ""
          longitude = ""
         
        } else {
          setAddress('No address found');
          
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
    
  }





  const handleClick = (vehicleId: any) => {
    onClickDataFromDatabase(vehicleId);
    };

  const valueObj = {
    coordinates,
    graphqlLat: lat,
    graphqlLng: lng,
    graphqlAltitude: altitude,
    graphqlSpeed: speed,
    graphqlAngle: angle,
    graphqlSatellites: satelittes,
    graphqlIgnition: ignition,
    graphqlTimestamp: timestamp,
   
    gps,
    graphqlMapDataLoaded,
    setGraphqlMapDataLoaded,
   
    graphqlBatteryVoltage: batteryVoltage,
    graphqlOdometer: odometer,
    setCoordinates,
    routeChanged,
    setRouteChanged,
    onClickDataFromDatabase,
    handleClick,
    addressFromDb:address,
    setAddressFromDb: setAddress,
    graphqlPower:power,
    graphqlDallasTemp:dallasTemp,
    graphqlTotalDistance:totalDistance,
    graphqlHours:hours,
    graphqlServerTime:serverTime,
    graphqlDeviceTime:deviceTime,
    graphqlFuelLevel: fuelLevel,
    graphqlBleTemp: bleTemp
  };
  return (
    <GraphqlMapContext.Provider value={valueObj}>
      {children}
    </GraphqlMapContext.Provider>
  );
});

export default GraphqlMapProvider;
