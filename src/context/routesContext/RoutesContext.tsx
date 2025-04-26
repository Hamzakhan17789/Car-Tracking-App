import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_ROUTES } from "../../graphqlOperations/query";
import { JourneyMapContext } from "../journeyMapContext/JourneyMapContext";
import client from "../../helper/apollo";

type RoutesContextType = {
  getAllRoutes: any[];
  gettingInput: (from: string) => void;
  latLng: any;
  moveMarker: () => void;
  latLngForMarker: any;
  gettingTripOfSelectedCard: (
    from?: any,
    to?: any,
    indexOfSelectedTrip?: any
  ) => void;
  hideMap: boolean;
  routeLoaded: boolean;
  setRouteLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setAllRoutes: React.Dispatch<React.SetStateAction<any[]>>;
  setTimeouts:React.Dispatch<React.SetStateAction<any[]>>
  timeouts:any[]
 // removingVehicleIDFromSessionStorage: ()=>{}
};

export const RoutesContext = createContext<RoutesContextType>({
  getAllRoutes: [],
  gettingInput: (from) => {},
  latLng: { lat: 0, lng: 0 },
  moveMarker: () => {},
  latLngForMarker: { lat: 0, lng: 0 },
  gettingTripOfSelectedCard: (from, to, indexOfSelectedTrip) => {},
  hideMap: true,
  routeLoaded: false,
  setRouteLoaded: () => {},
  setAllRoutes: () => {},
  setTimeouts:()=>{},
  timeouts:[],
 // removingVehicleIDFromSessionStorage:()=>{}
});

export const RoutesProvider = ({ children }: any) => {
  const journeyMapCtx = useContext(JourneyMapContext);
  const [allRoutes, setAllRoutes] = useState<any[]>([]);
  const [selectedVehicleID, setSelectedVehicleID] = useState<any>(null);
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const [hideMap, setHideMap] = useState(true);
  const [timeouts, setTimeouts] = useState<any>([]);
  const [ isLoading , setIsLoading] = useState<boolean>(false)
  const [ tripSelected , setTripSelected] = useState(false)

  const [latLngForMarker, setLatLngForMarker] = useState<any>(null);
  let gettingVehicleIDFromSessionStorage: any;
  if (typeof window !== "undefined") {
    gettingVehicleIDFromSessionStorage = sessionStorage.getItem(
      "vehicleIDforClientDetail"
    );
  }

  useEffect(() => {
    setSelectedVehicleID(gettingVehicleIDFromSessionStorage);
  });

  let selectedCardIndexInSessionStorage: any;
  const [indexOfSelectedCard, setIndexOfSelectedCard] = useState<any>(null);
  const [routeLoaded, setRouteLoaded] = useState<boolean>(false);
  if (typeof window !== "undefined") {
    selectedCardIndexInSessionStorage = Number(
      sessionStorage.getItem("selectedCardID")
    );
  }

  const gettingTripOfSelectedCard = async (
    from?: any,
    to?: any,
    indexOfSelectedTrip?: any
  ) => {
    setTripSelected(!tripSelected)
    setLatLngForMarker(null);
    setRouteLoaded(false);
    if (timeouts && timeouts.length > 0) {
      timeouts.forEach((timeout: any) => {
        clearTimeout(timeout);
      });

      setTimeouts([]);
    }

    try {
      const { data , loading , error }: any = await client.query({
        query: GET_ALL_ROUTES,
        variables: {
          from: from,
          to: to,
          locationId: Number(selectedVehicleID),
          //   locationId:indexOfSelectedTrip
        },
      });
      setIsLoading(loading)
      setAllRoutes(data?.getAllRoute);
      if (allRoutes?.length > 0) {
        // setRouteLoaded(true);
      }
      setIndexOfSelectedCard(indexOfSelectedTrip);
      sessionStorage.setItem("selectedCardID", indexOfSelectedCard);
    } catch (error) {
      console.log("Error fetching");
    }
    return allRoutes;
  };

  console.log(allRoutes)
  useEffect(() => {
    if (allRoutes?.length > 0) {
      console.log("in IF  Block of allRoutes and its length");
      setRouteLoaded(true);
    } else {
      console.log("in else block and making setRouteLoaded false");
      setRouteLoaded(false);
    }
  }, [allRoutes?.length, isLoading , indexOfSelectedCard , tripSelected]);

  function gettingInput(from: string) {
    if (from !== undefined || from !== null) {
      const givenDate = new Date(from!);

      givenDate.setDate(givenDate.getDate() + 1);

      setFromDate(from);
      setToDate(givenDate.toISOString());
    }
  }

  useEffect(() => {
    if (fromDate && toDate) {
      const dateFrom = new Date(fromDate);
      const fromUnixTimestamp = Math.floor(dateFrom.getTime() / 1000);

      const dateTo = new Date(toDate);
      const toUnixTimestamp = Math.floor(dateTo.getTime() / 1000);
    }
  }, [fromDate, toDate]);

  // MAP JOURNEY WORK
  const [latLng, setLatLng] = useState<any>({
    lat: 0,
    lng: 0,
  });

  let mappedPath: any;

  const getRoute = () => {
    mappedPath = allRoutes?.map((item, i) => {
      return { lat: item.latitude, lng: item.longitude };
    });

    setLatLng(mappedPath);
  };

  const moveMarker = () => {
    if (timeouts && timeouts.length > 0) {
      timeouts.forEach((timeout: any) => {
        clearTimeout(timeout);
      });

      setTimeouts([]);
      setLatLngForMarker(null);
    }

    let delay = 0;

    if (allRoutes?.length > 0) {
      console.log(latLng);
      for (let i = 0; i < latLng.length; i++) {
        const isLastElement = i === latLng.length - 1;
        const timer = setTimeout(() => {
          setLatLngForMarker(latLng[i]);
        }, delay);

        setTimeouts((oldTimeouts: any) => [...oldTimeouts, timer]);
        console.log(timeouts);
        delay += 1000;
      }
    }
   
  };

  useEffect(() => {
    if (allRoutes?.length > 0) {
      getRoute();
      console.log("if condition is  running in useEffect");
    }

    if (allRoutes?.length <= 0) {
      setRouteLoaded(false);
    }
  }, [
    latLng?.lat,
    latLng?.lng,
    allRoutes?.length,
    latLngForMarker?.lat,
    latLngForMarker?.lng,
    latLngForMarker,
  ]);





// Removing Vehicle ID from  Session Storage

const removingVehicleIDFromSessionStorage =()=>{
  selectedVehicleID(null)
  sessionStorage.removeItem('vehicleIDforClientDetail')
}




  const valueObj = {
    latLng,
    getAllRoutes: allRoutes,
    gettingInput,
    moveMarker,
    latLngForMarker,
    gettingTripOfSelectedCard,
    hideMap,
    routeLoaded,
    setRouteLoaded,
    setAllRoutes,
    setTimeouts,
    timeouts
  };
  return (
    <RoutesContext.Provider value={valueObj}>{children}</RoutesContext.Provider>
  );
};
