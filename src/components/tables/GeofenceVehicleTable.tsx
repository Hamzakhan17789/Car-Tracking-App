import React, { useState, useEffect, useContext } from "react";
import { Table, Spin, message, Tooltip, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table/interface";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_ROUTE,
  GET_GEOFENCES_BY_LOCATION_ID,
} from "../../graphqlOperations/query";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ClientDetailPlateExplorerContext } from "../../context/PlateExplorerContext";
import UnassignGeofenceModal from "../modal/UnassignGeofenceModal";
import AssignGeofenceModal from "../modal/AssignGeofenceModal";

interface DataType {
  key: string;
  chasisNo: string;
  plateNo: string;
  engineNo: string;
  brand: string;
  model: string;
  year: string;
  vehicleType: string;
  device: string;
  status: string;
  action: JSX.Element;
}

const GeofenceVehicleTable = React.memo(({ setGeofenceSelect }: any) => {
  const [vehicleId, setVehicleId] = useState<string | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isGeofenceModalOpen, setIsGeofenceModalOpen] =
    useState<boolean>(false);
  const [rowData, setRowData] = useState<any>();

  const clientCtx = useContext(ClientDetailPlateExplorerContext); //Context

  useEffect(() => {
    const id = sessionStorage.getItem("vehicleIDforClientDetail");
    setVehicleId(id);
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
  useEffect(() => {
    if (!isModalOpen || !isGeofenceModalOpen) {
      refetch();
    }
  }, [isModalOpen, isGeofenceModalOpen]);
  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (item: any, data: any) => {
        return (
          <button
            onClick={() => setGeofenceSelect(data)}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            {item}
          </button>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (item: any) => {
        return <span>{item == null ? "-" : item}</span>;
      },
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      render: (item: any) => {
        const coordinatesString = item
          .replace("POLYGON ((", "")
          .replace("))", "");
        const points = coordinatesString.split(", ");
        const extractedCoordinates = points.map(
          (point: {
            split: (arg0: string) => {
              (): any;
              new (): any;
              map: {
                (arg0: (string: string) => number): [any, any];
                new (): any;
              };
            };
          }) => {
            const [Latitude, Longitude] = point.split(" ").map(parseFloat);
            return { Latitude, Longitude };
          }
        );
        let newItem = JSON.stringify(extractedCoordinates);
        let final = newItem.replace(/"/g, "");
        return <span>{final}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Attributes",
      dataIndex: "attributes",
      key: "attributes",
      render: (item) => {
        const itemValue = JSON.stringify(item);
        return (
          <Tooltip title={itemValue}>
            <InfoCircleOutlined />
          </Tooltip>
        );
      },
    },
    {
      title: "Unassign",
      key: "addDelete",
      render: (item: any, data: any) => {
        return (
          <Button
            onClick={() => {
              console.log("button clicked");
              setIsModalOpen(true);
              setRowData(data);
            }}
          >
            <DeleteOutlined />
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <h3>Assigned Geofences</h3>
        <Button
          onClick={() => {
            setIsGeofenceModalOpen(true);
          }}
        >
          Assign Geofence
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data?.getGeofencesByLocationId}
        loading={{ indicator: <Spin />, spinning: loading }}
        scroll={{ x: 500 }}
      />
      <Modal
        title="Unassign Geofence"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        width={320}
      >
        <UnassignGeofenceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          rowData={rowData}
          vehicleId={vehicleId}
        />
      </Modal>
      <Modal
        title="Assign Geofence"
        open={isGeofenceModalOpen}
        footer={null}
        onCancel={() => {
          setIsGeofenceModalOpen(false);
        }}
        width={320}
      >
        <AssignGeofenceModal
          vehicleId={vehicleId}
          isGeofenceModalOpen={isGeofenceModalOpen}
          setIsGeofenceModalOpen={setIsGeofenceModalOpen}
        />
      </Modal>
    </>
  );
});

export default GeofenceVehicleTable;
