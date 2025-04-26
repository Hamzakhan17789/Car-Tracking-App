import { useMutation } from "@apollo/client";
import { Button, message } from "antd";
import React, { useState } from "react";
import { UNASSIGNED_GEOFENCE } from "../../graphqlOperations/mutation";

const UnassignGeofenceModal = ({
  isModalOpen,
  setIsModalOpen,
  rowData,
  vehicleId,
}: any) => {
  const [method] = useMutation(UNASSIGNED_GEOFENCE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log("rowData", rowData);
  const unassignedHandler = async () => {
    try {
      setIsLoading(true);
      const response = await method({
        variables: {
          input: {
            geofenceId: Number(rowData?.id),
            locationId: Number(vehicleId),
          },
        },
      });
      message.success({
        content: "Geofence unassigned Successfully",
      });
      setIsModalOpen(false);
    } catch (error: any) {
      message.error({
        content: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <p style={{ textAlign: "center" }}>
        Are you sure you want to Unassigned Geofence {rowData?.name} from this
        vehicle?
      </p>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        {isLoading ? (
          <Button style={{ marginRight: 10 }} loading>
            Yes
          </Button>
        ) : (
          <Button style={{ marginRight: 10 }} onClick={unassignedHandler}>
            Yes
          </Button>
        )}

        <Button
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default UnassignGeofenceModal;
