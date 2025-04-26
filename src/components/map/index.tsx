import React, { useContext, useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  OverlayViewF,
  Marker,
  Polyline,
} from "@react-google-maps/api";
//import VehicleInformationContent from "../../homepage/vehicleInformation/vehicle-information-content";
import VehicleInformation from "../mapOverlays/VehicleInformation";
import VehicleSpeed from "../mapOverlays/VehicleSpeedInformation";
import classes from "./Map.module.css";
// import { io } from "socket.io-client";
import { ClientDetailPlateExplorerContext } from "../../context/PlateExplorerContext";
import { SocketContext } from "../../context/socketContext/socketContext";
import { GraphqlMapContext } from "../../context/graphqlOperationsContext/graphqlMapContext";
import { Button } from "antd";
//import { socket } from "../../../url/socket-url";
import arrowImg from "../../../public/assets/images/arrow-narrow-right.png";
import arrowLeftImg from "../../../public/assets/images/IconLeft.png";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_JOURNEY } from "../../graphqlOperations/query";

type UserLocation = {
  lat: number;
  lng: number;
};

const userLocation: UserLocation = {
  // lat: 24.9049113,
  // lng: 67.0780415,
  lat: 24.9599633,
  lng: 67.0632066,
};

const center: UserLocation = {
  lat: 24.9049113,
  lng: 67.0780415,
};

const staticCordsCenter = {
  lat: 24.906095,
  lng: 67.080299,
};
const staticCordsMarker = {
  lat: 24.921007,
  lng: 67.101059,
};

type Props = {
  socketData?: any[];
  overlayHeight?: string;
  fullScreenControlOption?: boolean;
  toggleMapHandler?: boolean;
  onClickToggleMapHandler?:
    | (React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLButtonElement>)
    | undefined;
  onClickToggleMapHandlerFullScreen?:
    | (React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLButtonElement>)
    | undefined;
};

const Map = React.memo(
  ({
    socketData,
    overlayHeight,
    fullScreenControlOption,
    toggleMapHandler,
    onClickToggleMapHandler,
    onClickToggleMapHandlerFullScreen,
  }: Props) => {
    const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: GOOGLE_MAP_API_KEY!,
    });
    const graphlqlMapCtx = useContext(GraphqlMapContext);
    const clientDetailPlateExploreCtx = useContext(
      ClientDetailPlateExplorerContext
    );
    const [dataFromSocket, setDataFromSocket] = useState<any>([]);

    useEffect(() => {
      setDataFromSocket(socketData);
    }, []);

    const socketCtx = useContext(SocketContext);
    const clientCtx = useContext(ClientDetailPlateExplorerContext);
    const [latFromSocket, setLatFromSocket] = useState<number | null>(null);
    const [lngFromSocket, setLngFromSocket] = useState<number | null>(null);
    const [angleFromSocket, setAngleFromSocket] = useState<number>(
      socketCtx.angle
    );
    const [speed, setSpeed] = useState<number | null>(socketCtx.speed);

    useEffect(() => {
      setSpeed(socketCtx.speed);
    }, [socketCtx.speed]);

    useEffect(() => {
      setLatFromSocket(socketCtx.lat);
      setLngFromSocket(socketCtx.lng);
    }, [socketCtx.lat, socketCtx.lng]);

    const [path, setPath] = useState<any>([]);

    type LatLng = {
      lat: number | null;
      lng: number | null;
    };

    const [latFromGraphql, setLatFromGraphql] = useState<number | null>(null);
    const [lngFromGraphql, setLngFromGraphql] = useState<number | null>(null);

    useEffect(() => {
      setLatFromGraphql(graphlqlMapCtx.graphqlLat);
      setLngFromGraphql(graphlqlMapCtx.graphqlLng);
    }, [graphlqlMapCtx.graphqlLat, graphlqlMapCtx.graphqlLng]);

    const [userDestination, setUserDestination] = useState({
      lat: latFromSocket,
      lng: lngFromSocket,
    });
    const onMapClick = (e: any) => {
      setUserDestination({
        lat: e.latLng.lat(e),
        lng: e.latLng.lng(e),
      });

      //   //////////console.loglog(userDestinataion);
    };

    //////////console.loglog(socketCtx.socketDataLoaded);

    // useEffect(() => {
    //   setPath((prev: any) => [
    //     ...prev,
    //     { lat: latFromSocket, lng: lngFromSocket },
    //   ]);
    //   //////////console.loglog("USEEFFECT OF PATH");
    //   //////////console.loglog(path);
    // }, [latFromSocket, lngFromSocket]);

    // if (socketCtx.socketDataLoaded === false && clientCtx.onClick === false && graphlqlMapCtx.graphqlMapDataLoaded === false ) {
    //   return <p> Please search and select client to view details.</p>;
    // }

    useEffect(() => {
      if (graphlqlMapCtx.graphqlMapDataLoaded || socketCtx.socketDataLoaded) {
        socketCtx.setShowPlaceHolder(false);
      }
    });

    if (
      graphlqlMapCtx?.coordinates![0]?.geo_location! === null ||
      graphlqlMapCtx?.coordinates![0]?.geo_location! === undefined
    ) {
    //  //console.log('it is null')
      graphlqlMapCtx.setGraphqlMapDataLoaded(false);
      socketCtx.setShowPlaceHolder(true)
    }

    if (socketCtx.showPlaceHolder) {
      return <p>Please search and select client to view Details</p>;
    }
    ////console.log("GRAPHQL MAP DATA LOADED", graphlqlMapCtx.graphqlMapDataLoaded);
    ////console.log(graphlqlMapCtx.gps)
    const speedValue = typeof speed === "number" ? Number(speed) : 0;

    if (!isLoaded) {
      return <p> Please Wait...</p>;
    }

    const icon = {
      //  path: "M29.395 0H17.636c-3.117 0-5.643 3.467-5.643 6.584v34.804c0 3.116 2.526 5.644 5.643 5.644h11.759c3.116 0 5.644-2.527 5.644-5.644V6.584C35.037 3.467 32.511 0 29.395 0zM34.05 14.188v11.665l-2.729.351v-4.806L34.05 14.188zM32.618 10.773c-1.016 3.9-2.219 8.51-2.219 8.51H16.631l-2.222-8.51C14.41 10.773 23.293 7.755 32.618 10.773zM15.741 21.713v4.492l-2.73-.349V14.502L15.741 21.713zM13.011 37.938V27.579l2.73.343v8.196L13.011 37.938zM14.568 40.882l2.218-3.336h13.771l2.219 3.336H14.568zM31.321 35.805v-7.872l2.729-.355v10.048L31.321 35.805z",

      fillColor: "green",
      fillOpacity: 1,
      strokeWeight: 2,
      rotation: angleFromSocket,
      scale: 1,
    };

    //////////////console.loglog(latFromSocket, lngFromSocket);
    ////////////console.loglog(socketCtx.path);
    // //////console.log("socket Connected",socketCtx.socketConnection)
    ////////console.log("socket disconnected " , socketCtx.socketDisconnected)

    const positionValueFinal =
      !socketCtx.socketDataLoaded && graphlqlMapCtx.graphqlMapDataLoaded
        ? { lat: Number(latFromGraphql), lng: Number(lngFromGraphql) }
        : { lat: Number(latFromSocket), lng: Number(lngFromSocket) };


        console.log(positionValueFinal)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <GoogleMap
          center={staticCordsCenter}
          zoom={10}
          mapContainerStyle={{ height: "100%", width: "100%" }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: fullScreenControlOption,
            scrollwheel: false,
            scaleControl: false,
            panControl: true,
          }}
        >
          <MarkerF
            position={positionValueFinal}
            animation={google.maps.Animation.DROP}
          />
          <Polyline
            path={socketCtx.path}
            options={{ strokeColor: "#EE685D", strokeWeight: 4 }}
          />
        </GoogleMap>
      </div>
    );
  }
);

export default Map;
