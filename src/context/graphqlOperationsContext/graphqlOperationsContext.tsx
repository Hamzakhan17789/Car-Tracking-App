import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApolloError, useApolloClient, useQuery } from "@apollo/client";
import {
  GET_ALL_BY_SEARCH_LOCATION,
  GET_CLIENT_VEHICLE_DEVICE_DATA,
} from "../../graphqlOperations/query";
import React from "react";

interface ContextType {
  allClients: any[];
  searchedValue: string;
  gettingSearchedValue: (input: string) => void;
  loading: boolean;
  error?: ApolloError | undefined;
  vehicleInformation: any[];
  combineData: any[] | undefined;
  isLoaded: boolean;
  data: any;
  mergeData: any[];
  lengthOfData: number;
  selectedItem: any[];
  // setSelectedItem: (value: any[])=>  React.Dispatch<React.SetStateAction<any[]>>
  selectingItemHandler: (
    model: string | undefined,
    registration: string | undefined,
    engine: string | undefined,
    chassis: string | undefined,
    deviceID: string | undefined,
    simNumber: string | undefined,
    xDeviceId: string | undefined
  ) => void;
  model: string | undefined;
  registration: string | undefined;
  engine: string | undefined;
  chassis: string | undefined;
  deviceID: string | undefined;
  simNumber: string | undefined;
  xDeviceId: string | undefined;
  orgID: any;
  setOrgID: React.Dispatch<React.SetStateAction<any>>;
}
export const GraphQlOperationContext = createContext<ContextType>({
  allClients: [],
  searchedValue: "",
  gettingSearchedValue: (input: string) => {},
  loading: true,
  error: undefined,
  vehicleInformation: [],
  combineData: undefined,
  isLoaded: false,
  data: undefined,
  mergeData: [],
  lengthOfData: 0,
  selectedItem: [],
  selectingItemHandler: (
    model: string | undefined,
    registration: string | undefined,
    engine: string | undefined,
    chassis: string | undefined,
    deviceID: string | undefined,
    simNumber: string | undefined,
    xDeviceId: string | undefined
  ) => {},
  model: "",
  registration: "",
  engine: "",
  chassis: "",
  deviceID: "",
  simNumber: "",
  xDeviceId: "",
  orgID: null,
  setOrgID: () => {},
});

const GraphQlOperationProvider = React.memo(({ children }: any) => {
  const [allClients, setAllClients] = useState<any[]>([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [vehicleInformation, setVehicleInformation] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [combineData, setCombineData] = useState<any[] | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);

  const [orgId, setOrgId] = useState<number | null>(0);
  // ////console.log("GRAPHQL OPERTAION Context");
  const client = useApolloClient();

  // useEffect(() => {
  //   const lsOrgId = sessionStorage?.getItem("ORGID");
  //   setOrgId(Number(lsOrgId));
  //   //////console.log( "org id in useEffect" , orgId)
  // }, []);
  ////////console.log('org id outside useEffect'  , orgId)

  ////////console.log( "orgID IN OPERATION CONTEXT " ,orgId)
  const { loading, error, data, refetch } = useQuery(
    GET_ALL_BY_SEARCH_LOCATION,
    {
      skip: orgId === null || orgId === 0,
      //skip: searchedValue?.length < 7,
      variables: {
        contactNumber: searchedValue,
        orgId: Number(orgId),
        // orgId: typeof window !== "undefined"  ? Number(sessionStorage?.getItem("ORGID")) : 0
      },
    }
  );
  // //console.log(searchedValue, orgId)
  //console.log("data in graphqlOperationContext",data)
  const [mergeData, setMergeData] = useState<any[]>([]);
  const [geoLocation, setGeoLocation] = useState<any[]>([]);
 
  let geoLocationArr: any[] = [];

  useEffect(() => {
    setMergeData(data?.getAllBySearchLocation);

    for (let key in data?.getAllBySearchLocation) {
      geoLocationArr.push(data?.getAllBySearchLocation[key]?.["geo_location"]);
    }

    setGeoLocation(geoLocationArr);
  }, [data?.getAllBySearchLocation.length]);

  const gettingSearchedValue = useCallback(
    (input: string) => {
      const trimmedInput = input.trim();
      setSearchedValue((prev) => trimmedInput);
    },
    [searchedValue, setSearchedValue]
  );

  const [model, setModel] = useState<string | undefined>("");
  const [registration, setRegistration] = useState<string | undefined>("");
  const [engine, setEngine] = useState<string | undefined>("");
  const [chassis, setChassis] = useState<string | undefined>("");
  const [deviceID, setDeviceID] = useState<string | undefined>("");
  const [simNumber, setSimNumber] = useState<string | undefined>("");
  const [xDeviceId, setxDeviceId] = useState<string | undefined>("");

  const selectingItemHandler = useCallback(
    (
      model: string | undefined,
      registration: string | undefined,
      engine: string | undefined,
      chassis: string | undefined,
      deviceID: string | undefined,
      number: string | undefined,
      xDeviceId: string | undefined
    ) => {
      setModel(model);
      setRegistration(registration);
      setEngine(engine);
      setChassis(chassis);
      setDeviceID(deviceID);
      setSimNumber(number);
      setxDeviceId(xDeviceId);
      //   ////console.log("selectingItemHandler");
      ////console.log('DEVICE ID', xDeviceId)
    },
    [model, registration, engine, chassis, deviceID, simNumber, xDeviceId]
  );

  const valueObj: ContextType = {
    allClients: allClients,
    searchedValue: searchedValue,
    gettingSearchedValue: gettingSearchedValue,
    loading: loading,
    error: error,
    vehicleInformation: vehicleInformation,
    combineData: combineData,
    isLoaded: isLoaded,
    data: data,
    mergeData: mergeData,
    lengthOfData: 0,
    selectedItem: selectedItem,
    selectingItemHandler: selectingItemHandler,
    model: model,
    registration,
    engine,
    chassis,
    deviceID,
    simNumber,
    xDeviceId: xDeviceId,
    orgID: orgId,
    setOrgID: setOrgId,
  };
  return (
    <GraphQlOperationContext.Provider value={valueObj}>
      {children}
    </GraphQlOperationContext.Provider>
  );
});

export default GraphQlOperationProvider;
function setClientAndVehicleData() {
  throw new Error("Function not implemented.");
}
