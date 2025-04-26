import { useQuery } from "@apollo/client";
import { Button, Divider, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { GET_ALL_GEOFENCES } from "../../graphqlOperations/query";
import GeoFenceDataCard from "../cards/GeoFenceDataCard";

const GeoFenceExplorer = ({
  isGeofenceDone,
  GeofenceCardHandler,
  setIsCreateGeofence,
  isCreateGeofence,
}: any) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_GEOFENCES, {
    variables: {
      page: 1,
      limit: 1000,
    },
  });
  const [geofenceData, setGeoFenceData] = useState<any>();
  useEffect(() => {
    if (data) {
      console.log("GEOFENCES", data);
      setGeoFenceData(data?.getGeofences);
    }
    if (error) {
      message.warning({
        content: error?.message,
      });
    }
  }, [data, error, geofenceData]);
  useEffect(() => {
    if (isGeofenceDone) {
      console.log("isGeoFenceDone refetch useEffect called");
      refetch();
    }
  }, [isGeofenceDone]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ marginLeft: "2px", padding: "10px" }}>GEOFENCES</h3>
        {!isCreateGeofence && (
          <Button
            size="small"
            style={{ alignSelf: "center" }}
            onClick={() => setIsCreateGeofence(true)}
          >
            Create Geofence
          </Button>
        )}
      </div>

      <Divider style={{ margin: 0 }} />
      {loading ? (
        <Spin
          size="small"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        />
      ) : (
        <div>
          {geofenceData?.map((item: any) => (
            <GeoFenceDataCard
              item={item}
              key={item?.id}
              GeofenceCardHandler={GeofenceCardHandler}
            />
          ))}
        </div>
      )}
      <div></div>
    </div>
  );
};

export default GeoFenceExplorer;
