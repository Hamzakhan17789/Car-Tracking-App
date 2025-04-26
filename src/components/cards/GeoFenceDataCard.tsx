import React, { useState } from "react";
import { Card, Modal } from "antd";
import {
  CarOutlined,
  ExclamationOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import AssignToVehicleForm from "../forms/AssignToVehicleForm";

const GeoFenceDataCard = ({ item, GeofenceCardHandler }: any) => {
  const { name } = item;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  console.log("name", name);
  return (
    <>
      <Card
        style={{ margin: "5px" }}
        bodyStyle={{ padding: "15px" }}
        onClick={() => GeofenceCardHandler(item)}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>{name}</h4>
          <div>
            {/* <button style={{ backgroundColor: "transparent", border: "none" }}>
              <EyeOutlined />
            </button> */}

            <button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <ExclamationOutlined />
            </button>
          </div>
        </div>
      </Card>
      <Modal
        title="Assign to Vehicle"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        width={320}
      >
        <AssignToVehicleForm
          item={item}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </>
  );
};

export default GeoFenceDataCard;
