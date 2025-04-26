import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../../url/socket-url";
import { ClientDetailPlateExplorerContext } from "../PlateExplorerContext";
import { useRouter } from "next/router";
import moment from "moment";
import { GraphqlMapContext } from "../graphqlOperationsContext/graphqlMapContext";
import { AuthContext } from "../AuthContext";

type GPS = {
  latitude?: number;
  longitude?: number;
  altitude?: number;
  angle?: number;
  satelittes?: number;
  speed?: number;
};

type NewGPS = {
  latitude: number;
  longitude: number;
};

type SocketType = {
  socketData: any[];
  
  setSocketData: React.Dispatch<React.SetStateAction<any[]>>;
  filteredPositionData: any[];
  setFilteredPositionData: React.Dispatch<React.SetStateAction<any[]>>;
  selectImei: () => void;
  sendImeiToSocket: (imei: string) => void;
  lat: number | null;
  lng: number | null;
  angle: number;
  ignition: number | null;
  speed: number | null;
  odometer: number | null;
  batteryVoltage: number;
  gsm: number | null;
  timestamp: number | undefined;
  path: any[];
  socketDataLoaded: boolean;
  // socketConnection?: Socket;
  gps?: GPS;
  setSocketDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setPath: React.Dispatch<React.SetStateAction<any[]>>;
  //socket: any
  socketDisconnectHandler: () => void;
  socketConnection: any;
  socketDisconnected: boolean;
  setSocketDisconnected: React.Dispatch<React.SetStateAction<boolean>>;
  showPlaceHolder: boolean;
  setShowPlaceHolder: React.Dispatch<React.SetStateAction<boolean>>;
  newGps?: NewGPS;
  address: string;
  serverTime: any;
  deviceTime: any;
  dallasTemp: any;
  power: any;
  totalDistance: any;
  hours: any;
  fuelLevel: any;
  bleTemp: any;
};

export const SocketContext = React.createContext<SocketType>({
  socketData: [],
  filteredPositionData: [],
  setSocketData: () => [],
  setFilteredPositionData: () => [],
  selectImei: () => {},
  sendImeiToSocket: () => {},
  setSocketDataLoaded: () => {},
  lat: null,
  lng: null,
  ignition: null,
  speed: null,
  gsm: null,
  timestamp: undefined,
  angle: 0,
  odometer: null,
  batteryVoltage: 0,
  socketDataLoaded: false,
  path: [],
  gps: {
    latitude: 0,
    longitude: 0,
    speed: 0,
    angle: 0,
    satelittes: 0,
    altitude: 0,
  },
  setPath: () => [],
  socketDisconnectHandler: () => {},
  socketConnection: null,
  socketDisconnected: false,
  setSocketDisconnected: () => {},
  showPlaceHolder: false,
  setShowPlaceHolder: () => {},
  newGps: {
    latitude: 0,
    longitude: 0,
  },
  address: "",
  serverTime: undefined,
  deviceTime: undefined,
  dallasTemp: undefined,
  power: undefined,
  totalDistance: undefined,
  hours: undefined,
  fuelLevel: undefined,
  bleTemp: undefined,
});

type Props = {
  children: React.ReactNode;
};

const SocketProvider = React.memo(({ children }: Props) => {
  const clientCtx = useContext(ClientDetailPlateExplorerContext);

  const graphlqlMapCtx = useContext(GraphqlMapContext);
  const [socketData, setSocketData] = useState<any>([]);

  const [isImeiSelected, setIsImeiSelected] = useState(false);

  const selectImei = () => {
    setIsImeiSelected(!isImeiSelected);
  };

  const [result, setResult] = useState<any>();

  const [angle, setAngle] = useState<number>(0);

  const [gsm, setGsm] = useState<number | null>(0);
  const [path, setPath] = useState<any[]>([]);
  const [socketDataLoaded, setSocketDataLoaded] = useState<boolean>(false);

  const [socketConnection, setSocketConnection] = useState<any>(null);
  const [socketDisconnected, setSocketDisconnected] = useState<boolean>(true);

  const [showPlaceHolder, setShowPlaceHolder] = useState<boolean>(true);

  // New Socket Method
  const [filteredPostionData, setFilteredPositionData] = useState<any[]>([]);
  const [newLat, setNewLat] = useState<number | null>(null);
  const [newLng, setNewLng] = useState<number | null>(null);
  const [newPath, setNewPath] = useState<any[]>([]);
  const [newIgnition, setNewIgnition] = useState<number | null>(0);
  const [newBatteryVoltage, setNewBatteryVoltage] = useState<number>(0);
  const [newGps, setNewGps] = useState<any>(undefined);
  const [newTripOdometer, setNewTripOdometer] = useState<number | null>(0);
  const [newSpeed, setNewSpeed] = useState<number | null>(0);
  const [newTimestamp, setNewTimestamp] = useState<number | undefined>(
    undefined
  );
  const [address, setAddress] = useState<string>("");
  const [serverTime, setServerTime] = useState<any>(undefined);
  const [deviceTime, setDeviceTime] = useState<any>(undefined);
  const [dallasTemp, setDallasTemp] = useState<any>(undefined);
  const [power, setPower] = useState<any>(undefined);
  const [totalDistance, setTotaDistance] = useState<any>(undefined);
  const [hours, setHours] = useState<any>(undefined);
  const [fuelLevel, setFuelLevel] = useState<any>(undefined);
  const [bleTemp, setBleTemp] = useState<any>(undefined);

  const sendImeiToSocket = useCallback(
    async (xDeviceId: string | undefined) => {
      let xDeviceIdFromSessionStorage = sessionStorage.getItem("xDeviceId");

      if (
        xDeviceId === undefined ||
        xDeviceId !== xDeviceIdFromSessionStorage ||
        xDeviceId === null
      ) {
        console.log("selected new device");
        setSocketData([]);
        setResult("-");
        // setNewPath([]);
        setNewPath((prev) => []);
      }

      const socket = io("http://54.252.32.156:3111/");

      setSocketConnection(socket);

      if (xDeviceId === null || xDeviceId === undefined) {
        return;
      }

      socket.on(xDeviceId!, (data: any) => {
        console.log(data);

        console.log(typeof xDeviceId, typeof xDeviceIdFromSessionStorage);
        console.log("xDeviceID", xDeviceId, xDeviceIdFromSessionStorage);
        if (xDeviceId === xDeviceIdFromSessionStorage && data != undefined) {
          setSocketData((prev: any) => [...prev, data]);
        }

        return () => {
          socket.disconnect();
        };
      });
    },
    []
  );

  const socketDataHandler = async () => {
    let filteredData = await socketData.filter((ele: any) => {
      return ele.positions !== undefined;
    });
    let positions = await filteredData.map((ele: any) => ele.positions);

    if (positions[positions.length - 1] !== undefined) {
      setFilteredPositionData(positions[positions.length - 1]);
    }

    const extractingTimestamp = filteredPostionData[0]?.deviceTime;

    const date = new Date(extractingTimestamp);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    setNewTimestamp(unixTimestamp);

    return filteredPostionData[0]!;
  };

  useEffect(() => {
    socketDataHandler().then((res) => {
      if (res !== undefined) {
        setNewLat(res?.latitude);
        setNewLng(res?.longitude);
        setNewBatteryVoltage(res?.attributes?.battery);
        setNewGps({ lat: res?.latitude, lng: res?.longitude });
        setNewSpeed(res?.speed);
        setNewTripOdometer(res?.attributes?.odometer);
        setServerTime(res?.serverTime);
        setDeviceTime(res?.deviceTime);
        setDallasTemp(res?.attributes?.io72);
        if (res?.attributes.ignition === true) {
          setNewIgnition(1);
        } else {
          setNewIgnition(0);
        }
        setPower(res?.attributes?.power);
        setTotaDistance(res?.attributes?.distance);
        setHours(res?.attributes?.hours);
        setFuelLevel(res?.attributes?.io270);
        setBleTemp(res?.attributes?.io25);
      }

      if (typeof res?.latitude === "number" || res !== undefined) {
        setNewPath((prev) => [
          ...prev,
          { lat: res?.["latitude"], lng: res?.["longitude"] },
        ]);
      }
    });
    getAddressFromLatLng(newLat, newLng);

    console.log(socketData);
  }, [socketData?.length, newTimestamp, filteredPostionData]);

  function getAddressFromLatLng(latitude: any, longitude: any) {
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

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK") {
        if (results![0]) {
          setResult(results![0].formatted_address);
          setAddress(result);
        } else {
          setAddress("No address found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  }

  useEffect(() => {
    if (filteredPostionData.length > 0) {
      setSocketDataLoaded(true);
    } else if (filteredPostionData.length <= 0) {
      setSocketDataLoaded(false);
    }
  }, [socketData, socketData.length]);

  const socketDisconnectHandler = () => {
    socketConnection?.disconnect();
    setSocketDisconnected(true);
    setSocketDataLoaded(false);
    setSocketData([]);
    clientCtx.setOnClick(false);
    setShowPlaceHolder(true);
    graphlqlMapCtx.setCoordinates([]);
  };

  const socketContextValue = {
    socketData: socketData,
    selectImei,
    sendImeiToSocket,
    lat: newLat,
    lng: newLng,
    ignition: newIgnition,
    speed: newSpeed,
    gsm: gsm,
    odometer: newTripOdometer,
    angle,
    timestamp: newTimestamp,
    gps: newGps,
    batteryVoltage: newBatteryVoltage,
    socketDataLoaded,
    path: newPath,
    setSocketDataLoaded,
    setSocketData,
    setPath,
    socketDisconnectHandler,
    socketConnection,
    socketDisconnected,
    setSocketDisconnected,
    showPlaceHolder,
    setShowPlaceHolder,
    filteredPositionData: filteredPostionData,
    setFilteredPositionData: setFilteredPositionData,
    address: address,
    serverTime: serverTime,
    deviceTime: deviceTime,
    dallasTemp: dallasTemp,
    power: power,
    totalDistance: totalDistance,
    hours: hours,
    fuelLevel: fuelLevel,
    bleTemp: bleTemp,
  };
  return (
    <SocketContext.Provider value={socketContextValue}>
      {children}
    </SocketContext.Provider>
  );
});

export default SocketProvider;
