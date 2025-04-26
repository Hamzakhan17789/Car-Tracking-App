import React, { useEffect, useState, useContext } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Modal, Spin, message } from "antd";
import { ClientDetailPlateExplorerContext } from "../../context/PlateExplorerContext";
import { useQuery } from "@apollo/client";
import { GET_GEOFENCES_BY_LOCATION_ID } from "../../graphqlOperations/query";

const GeofenceVehicleMap = ({ geofenceSelect, setGeofenceSelect }: any) => {
  const [polygonArrayData, setPolygonArrayData] = useState<any>();
  const [vehicleId, setVehicleId] = useState<string | null>();
  const clientCtx = useContext(ClientDetailPlateExplorerContext); //Context

  useEffect(() => {
    const id = sessionStorage.getItem("vehicleIDforClientDetail");
    setVehicleId(id);
    setGeofenceSelect();
  }, [vehicleId, clientCtx.isItemClicked]);

  const { loading, data, error, refetch } = useQuery(
    GET_GEOFENCES_BY_LOCATION_ID,
    {
      variables: {
        locationId: Number(vehicleId),
      },
    }
  );
  useEffect(() => {
    if (error) {
      message.warning(error.message);
    }
  }, [error]);

  const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const staticCordsCenter = {
    lat: 24.906095,
    lng: 67.080299,
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY!,
  });
  const handleMapClick = () => {
    console.log("Clicked on map geofence select data", geofenceSelect);
  };
  useEffect(() => {
    if (geofenceSelect) {
      polyToArray();
    }
  }, [geofenceSelect]);
  const polyToArray: any = () => {
    const polygonString = geofenceSelect?.area;
    const coordinatesString = polygonString?.match(/\(\((.*?)\)\)/)[1];
    const coordinatesArray = coordinatesString.split(", ");

    let polygonArray = coordinatesArray.map((coordinates: any) => {
      const [lat, lng] = coordinates.split(" ");
      return { lat: parseFloat(lat), lng: parseFloat(lng) };
    });
    setPolygonArrayData(polygonArray);
  };
  console.log("polygonArrayData", polygonArrayData);

  if (!isLoaded) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <Spin style={{ alignSelf: "center" }} />
      </div>
    );
  }
  return (
    <>
      <h4>Geofence Map</h4>
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <Spin style={{ alignSelf: "center" }} />
        </div>
      ) : (
        <div style={{ position: "relative", height: "100%" }}>
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
            {geofenceSelect && (
              <Polyline
                path={polygonArrayData}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            )}
            {/* {!geofenceSelect &&
              data?.getGeofencesByLocationId &&
              data?.getGeofencesByLocationId.map((item: any) => {
                const polygonString = geofenceSelect?.area;
                const coordinatesString =
                  polygonString?.match(/\(\((.*?)\)\)/)[1];
                const coordinatesArray = coordinatesString.split(", ");

                let polygonArray = coordinatesArray.map((coordinates: any) => {
                  const [lat, lng] = coordinates.split(" ");
                  return { lat: parseFloat(lat), lng: parseFloat(lng) };
                });
                return (
                  <Polyline
                    path={polygonArray}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                    }}
                  />
                );
              })} */}
          </GoogleMap>
        </div>
      )}
    </>
  );
};

export default GeofenceVehicleMap;
