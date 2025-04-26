import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_MAP_API } from "../../helper/api";
import { Modal, Spin } from "antd";
import GeofenceForm from "../forms/GeofenceForm";

const GeoFenceMap = ({
  isGeofenceDone,
  setIsGeofenceDone,
  geofenceCardHandlerData,
  isCreateGeofence,
}: any) => {
  const [zoneCoordinates, setZoneCoordinates] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [polygonArrayData, setPolygonArrayData] = useState<any>();
  console.log("geofenceCardhandlerdata", geofenceCardHandlerData?.area);
  //Regex Code for string to array conversion later added to the helper function file
  useEffect(() => {
    if (geofenceCardHandlerData && !isCreateGeofence) {
      const polygonString = geofenceCardHandlerData?.area;
      const coordinatesString = polygonString?.match(/\(\((.*?)\)\)/)[1];
      const coordinatesArray = coordinatesString.split(", ");

      let polygonArray = coordinatesArray.map((coordinates: any) => {
        const [lat, lng] = coordinates.split(" ");
        return { lat: parseFloat(lat), lng: parseFloat(lng) };
      });
      setPolygonArrayData(polygonArray);
      // console.log("stateArray", polygonArray);
    }
  }, [geofenceCardHandlerData, isCreateGeofence]);

  // console.log("stateArray", polygonArray);

  const staticCordsCenter = {
    lat: 24.906095,
    lng: 67.080299,
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API,
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter" && zoneCoordinates.length > 1) {
        console.log("Enter pressed");
        setIsModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoneCoordinates]);

  if (!isLoaded) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <Spin style={{ alignSelf: "center" }} />
      </div>
    );
  }

  const handleMapClick = (event: any) => {
    if (isCreateGeofence) {
      const clickedCoords = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setZoneCoordinates((prevCoordinates: any) => [
        ...prevCoordinates,
        clickedCoords,
      ]);
      console.log("zoneCoordinates", zoneCoordinates);
    }
  };

  return (
    <div style={{ width: "100%", height: "595px", position: "relative" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
        center={staticCordsCenter}
        zoom={10}
        options={{
          panControl: true,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onClick={handleMapClick}
      >
        {zoneCoordinates.length > 1 && isCreateGeofence && (
          <Polyline
            path={zoneCoordinates}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        )}
        {geofenceCardHandlerData && !isCreateGeofence && (
          <Polyline
            path={polygonArrayData}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
      <Modal
        title="Save Geofence As"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          setZoneCoordinates([]);
        }}
        width={350}
      >
        <GeofenceForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          zoneCoordinates={zoneCoordinates}
          setZoneCoordinates={setZoneCoordinates}
          setIsGeofenceDone={setIsGeofenceDone}
          isGeofenceDone={isGeofenceDone}
        />
      </Modal>
    </div>
  );
};

export default GeoFenceMap;
