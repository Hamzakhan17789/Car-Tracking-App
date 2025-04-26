import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Col, Row, Input, Empty, Modal } from "antd";
import { JourneyMapContext } from "../../context/journeyMapContext/JourneyMapContext";
import { RoutesContext } from "../../context/routesContext/RoutesContext";
import { Spin } from "antd";

const staticCordsCenter = {
  lat: 24.906095,
  lng: 67.080299,
};

type LatLng = {
  lat: number;
  lng: number;
};

const JourneyMaps = React.memo(() => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB2k_2Wcx9y7qjIg2M9OWZOuDpzwmeHNVU",
  });
  // //////console.log(isLoaded);
  const journeyMapCtx = useContext(JourneyMapContext);
  const routesCtx = useContext(RoutesContext);
  const [latLng, setLatLng] = useState<any>({
    lat: 0,
    lng: 0,
  });
  const [polyline, setPolyline] = useState<any>([]);

  useEffect(() => {
  
    setLatLng(routesCtx.latLngForMarker);
  
  setPolyline(routesCtx.latLng)
    
  }, [journeyMapCtx.mappedPath, journeyMapCtx.latLng, routesCtx.latLng ]);

 
  console.log('routes Loaded' ,routesCtx.routeLoaded)
  if(routesCtx.routeLoaded !== true  ){
    return (
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        //alignSelf: 'center',
        height: "600px",
      }}
    >
      <Empty
        description={"Please Select a Vehicle and Date and Trip."}
        style={{
          height: "300px",

          alignSelf: "center",
        }}
      />
    </div>
    )
  }
 
  
  if (!isLoaded) {
    return <p>Please Wait</p>;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
      }}
    >
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={staticCordsCenter}
        zoom={10}
        options={{
          panControl: true,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
        }}
      >
        <Marker
          position={latLng}
          //position={routesCtx.latLngForMarker}
        />
        <Polyline
          path={polyline}
          //    path={latLng}
          options={{
            strokeColor: "#ff2527",
            strokeOpacity: 0.75,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </div>
  );
});

export default JourneyMaps;
