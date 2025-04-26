import { ApolloError, useQuery } from "@apollo/client";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from "react";
import { GET_ALL_TRIPS, GET_JOURNEY } from "../../graphqlOperations/query";
import React from "react";
import { ClientDetailPlateExplorerContext } from "../PlateExplorerContext";
import client from "../../helper/apollo";

export type GPS = {
  longitude?: number;
  latitude?: number;
  altitude?: number;
  angle?: number;
  speed?: number;
  satellites?: number;
}[][];
export type GetJourneyType = {
  startTime?: number;
  avgSpeed?: number;
  durationMin?: number;
  maxSpeed?: number;
  endTime?: number;
  gps: GPS;
}[];

type JourneyMapType = {
  journey: GetJourneyType[] | undefined;
  gps: GPS | undefined;
  isDateSelected: boolean;
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTrip: any;
  setSelectedTrip: React.Dispatch<React.SetStateAction<any>>;
  calculatingRoute: (gettingRoute: () => any) => void;
  // MAP JOURNEY WORK
  allTrips: any[];
  mappedPath: any[];
  latLng: any;
  moveMarker: () => void;
  getRoute: () => void;
  isError: boolean;
  hideMap: boolean;
  setHideMap: React.Dispatch<React.SetStateAction<boolean>>;
  setGps: React.Dispatch<React.SetStateAction<GPS | undefined>>;
  gettingDateFromInput: (from: string) => void;
  fromDate: any;
  toDate: any;
  fromUnix: any;
  toUnix: any;
  setAllTrips:React.Dispatch<React.SetStateAction<any[]>>
  // fromUnixVar: any;
  // toUnixVar: any
};

export const JourneyMapContext = createContext<JourneyMapType>({
  journey: [],
  gps: [],
  allTrips: [],
  isDateSelected: false,
  setIsDateSelected: () => {},
  selectedTrip: null,
  setSelectedTrip: () => {},
  calculatingRoute: (gettingRoute: () => {}) => {},
  mappedPath: [],
  latLng: {},
  moveMarker: () => {},
  getRoute: () => {},
  isError: false,
  hideMap: true,
  setHideMap: () => {},
  setGps: () => {},
  gettingDateFromInput: (from) => {},
  fromDate: null,
  toDate: null,
  fromUnix: null,
  toUnix: null,
  setAllTrips:()=>{}
  //  fromUnixVar: null,
  // toUnixVar: null
});
type Props = {
  children: React.ReactNode;
};
type LatLng = {
  lat: number;
  lng: number;
};

const JourneyMapContextProvider = React.memo(({ children }: Props) => {
  const [journey, setJourney] = useState<GetJourneyType[] | undefined | any>(
    []
  );
  const [gps, setGps] = useState<GPS | undefined>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  //  MAP JOURNEY WORK
  //const clientCtx = useContext(ClientDetailPlateExplorerContext)
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const [fromUnix, setFromUnix] = useState<any>(null);
  const [toUnix, setToUnix] = useState<any>(null);
  let dateFrom: any;
  let dateTo: any;
  const gettingDateFromInput = (from: string) => {
    if (from !== undefined || from !== null) {
      const givenDate = new Date(from!);
      //  //console.log("first ", givenDate);

      givenDate.setDate(givenDate.getDate() + 7);
      ////console.log("given date", givenDate);
      ////console.log(
      // `New date after subtracting 7 days: ${givenDate?.toISOString()}`
      // );
      setFromDate(from);
      setToDate(givenDate.toISOString());

      //        let dateFrom = new Date(fromDate);
      //       const fromUnixTimestamp = Math.floor(.getTime() / 1000);

      //       let dateTo = new Date(toDate);
      //       const toUnixTimestamp = Math.floor(dateTo.getTime() / 1000);

      // //      //console.log(fromUnixTimestamp);
      //  //     //console.log(toUnixTimestamp);
      //       // if (!Number.isNaN(fromUnixTimestamp) && !Number.isNaN(toUnixTimestamp)) {
      //         setFromUnix(fromUnixTimestamp);
      //         setToUnix(toUnixTimestamp);
      //       // setFromUnix((prev : any) => fromUnixTimestamp)
      //       // setToUnix((prev : any) => toUnixTimestamp)
      //        //console.log(fromUnix)
      //        //console.log(toUnix)
      //    //   }
    }
  };

  useEffect(() => {
    if (fromDate && toDate) {
      const dateFrom = new Date(fromDate);
      const fromUnixTimestamp = Math.floor(dateFrom.getTime() / 1000);

      const dateTo = new Date(toDate);
      const toUnixTimestamp = Math.floor(dateTo.getTime() / 1000);

      setFromUnix(fromUnixTimestamp);
      setToUnix(toUnixTimestamp);

      //   //console.log(fromUnixTimestamp);
      //  //console.log(toUnixTimestamp);
    }
  }, [fromDate, toDate]);

  const [previousTrips, setPreviousTrips] = useState<any[]>([]);
  const [latLng, setLatLng] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });

  const [hideMap, setHideMap] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  let mappedPath: any[] = [];
  ////console.log("journey map context");
  //  mappedPath = journeyMapCtx?.gps![selectedTripByUser]?.map((item, i) => {

  // return { lat: item.latitude, lng: item.longitude };
  // });

  //  mappedPath = gps![selectedTrip]?.map((item , i)=>{
  //   return { lat : item.latitude , lng : item.longitude}
  //  })

  //   const moveMarker = () => {
  //     // setInterval(()=>{
  //     //   setInterval(()=>{
  //     //     //////console.log(mappedPath[key])
  //     //   },6000)

  //     //   // setLatLng(mappedPath[key])
  //     // },6000)

  //     const uniquePath = Array.from(new Set(mappedPath));
  //     //////console.log(uniquePath);
  //     let delay = 0;

  //     let timer;
  //     for (let key in uniquePath) {
  //       timer = setTimeout(() => {
  //         //    //////console.log(mappedPath[key]);
  //         setLatLng(uniquePath[key]);
  //       }, delay);
  //       delay += 0.99;
  //     }
  //   };

  // const getRoute =()=>{
  //   //////console.log('GET ROUTE RUNS')

  // //   mappedPath = journeyMapCtx?.gps![selectedTripByUser]?.map((item , i)=>{
  // //    return {lat : item.latitude , lng: item.longitude}
  // //  })

  // mappedPath = gps![selectedTrip]?.map((item , i)=>{
  //   return { lat : item.latitude ,  lng: item.longitude}
  // })
  // //////console.log(mappedPath)
  // ////////console.log(path)
  //   const directionService = new google.maps.DirectionsService();
  //   directionService.route(
  //     {
  //        origin:{
  //         lat: Number(gps![selectedTrip]?.[0].latitude),
  //         lng: Number(gps![selectedTrip]?.[0].longitude)
  //        }
  //  ,destination:{
  //   lat:Number(gps![selectedTrip][gps![selectedTrip].length - 1]!.latitude),
  //   lng:Number(gps![selectedTrip][gps![selectedTrip].length - 1]!.longitude),
  //  },

  //       // origin: {
  //       //   lat: Number(journeyMapCtx.gps![selectedTripByUser]?.[0]?.latitude),
  //       //   lng: Number(journeyMapCtx.gps![selectedTripByUser]?.[0]?.longitude),
  //       // },
  //       // destination: {
  //       //   lat: Number(
  //       //    journeyMapCtx.gps![selectedTripByUser][journeyMapCtx.gps![selectedTripByUser].length - 1]!.latitude

  //       //   ),
  //       //   lng: Number(
  //       //     journeyMapCtx.gps![selectedTripByUser][journeyMapCtx.gps![selectedTripByUser].length - 1]!.longitude
  //       //      ),
  //       // },

  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //     //   setDirections(result?.routes[0].overview_path);

  //         //////console.log(result);
  //        setPreviousTrips([...previousTrips, result?.routes[0].overview_path]);
  //     //    setPreviousTrips([...previousTrips, journeyMapCtx.gps![0]] )
  //       } else {
  //         console.error(`error fetching directions ${result}`);
  //       }
  //     }
  //   );

  //   //////console.log(gps)
  //   ////////console.log(previousTrips[0]?.[0]?.lat())
  //  // //////console.log(previousTrips);

  // //  //////console.log("Direction", directions);
  //   }
  //  // journeyMapCtx.calculatingRoute(getRoute())

  // MAP JOURNEY WORK

  const [selectedVehicleID, setSelectedVehicleID] = useState<any>();

  //   const { data, loading, error } = useQuery(GET_JOURNEY, {
  //     variables: {
  //       date: selectedDate,
  //       locationId: Number(selectedVehicleID),
  //     },
  // skip: selectedDate === null || selectedVehicleID === null,
  // onCompleted(data) {
  //   ////console.log("completed =>" ,data)
  //   if (data?.getJourney?.length > 0) {
  //     setHideMap(false);
  //   ////console.log(hideMap, "hidemap");
  //   }
  // },

  //   });
  const [allTrips, setAllTrips] = useState<any[]>([]);

  let gettingDateFromLocalStorage: any;
  let gettingVehicleIDFromSessionStorage: any;

  if (typeof window !== "undefined") {
    gettingDateFromLocalStorage = localStorage.getItem("selectedDate");
    gettingVehicleIDFromSessionStorage = sessionStorage.getItem(
      "vehicleIDforClientDetail"
    );
  }

  //////console.log('JOURNEY MAP CONTEXT')

  useEffect(() => {
    setSelectedVehicleID(gettingVehicleIDFromSessionStorage);

    setSelectedDate(gettingDateFromLocalStorage);
    //console.log(selectedVehicleID);
  }, [
    Number(gettingDateFromLocalStorage),

    isDateSelected,
    Number(selectedVehicleID),
  ]);
  const { data, loading, error } = useQuery(GET_ALL_TRIPS, {
    variables: {
      from: `${fromDate}`,
      to: toDate,

      locationId: Number(selectedVehicleID),
    },
    skip: selectedDate === null || selectedVehicleID === null,
    onCompleted(data) {
      //  console.log("completed =>" ,data)
      if (data?.getAllTrip?.length > 0) {
        setHideMap(false);
      }
    },
  });

  //console.log("getJourney ", data);

  let gpsArray: GPS | undefined = [];

  const calculatingJourney = () => {
    setJourney(data?.getJourney);
    if(data?.getAllTrip?.length > 0){
    setAllTrips(data?.getAllTrip);
    ////console.log("calculating journey function");
    for (let key in journey) {
      let numKey = Number(key);

      gpsArray?.push(journey[numKey]?.gps);
    }
  };
  }
  //////console.log(error)
  useEffect(() => {
    calculatingJourney();
    if (error !== undefined) {
      setIsError(true);
    }
    ////console.log(data);
    setGps(gpsArray);
  }, [loading, journey?.length, isDateSelected, selectedTrip, error]);

  const calculatingRoute = (gettingRoute = () => {}) => {
    gettingRoute();
  };

  // MAP JOURNEY WORK

  if (gps!.length > 0) {
    //  setHideMap(false)
    mappedPath = gps![selectedTrip]?.map((item, i) => {
      return { lat: item.latitude, lng: item.longitude };
    });
  }

  const moveMarker = () => {
    const uniquePath = Array.from(new Set(mappedPath));
    let delay: number = 0;

    let timer: any;

    if (gps!.length > 0) {
      for (let key in mappedPath) {
        timer = setTimeout(() => {
          setLatLng(mappedPath[key]);
        }, delay);
        ////console.log("timer");
        delay += 2000;
      }
    }

    setSelectedTrip(null);
  };

  const getRoute = () => {
    if (gps!.length > 0) {
      mappedPath = gps![selectedTrip]?.map((item, i) => {
        return { lat: item.latitude, lng: item.longitude };
      });
      ////console.log("getRoute");
    }

    const directionService = new google.maps.DirectionsService();
    directionService.route(
      {
        origin: {
          lat: gps!.length > 0 ? Number(gps![selectedTrip]?.[0].latitude) : 0,
          lng: gps!.length > 0 ? Number(gps![selectedTrip]?.[0].longitude) : 0,
        },
        destination: {
          lat: gps!.length > 0 ? Number(gps![selectedTrip][0]!.latitude) : 0,
          lng: gps!.length > 0 ? Number(gps![selectedTrip][0]!.longitude) : 0,
        },

        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setPreviousTrips([...previousTrips, result?.routes[0].overview_path]);
        } else {
        }
      }
    );
  };

  const valueObj: JourneyMapType = {
    journey,
    gps,
    isDateSelected,
    setIsDateSelected,
    selectedTrip,
    setSelectedTrip,
    calculatingRoute,
    // MAP JOURNEYS WORK
    mappedPath,
    latLng,
    moveMarker: moveMarker,
    getRoute: getRoute,
    isError,
    hideMap: hideMap,
    setHideMap: setHideMap,
    setGps: setGps,
    allTrips: allTrips,
    gettingDateFromInput,
    fromDate,
    toDate,
    fromUnix,
    toUnix,
    setAllTrips
  };

  return (
    <JourneyMapContext.Provider value={valueObj}>
      {children}
    </JourneyMapContext.Provider>
  );
});

export default JourneyMapContextProvider;
