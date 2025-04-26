import React, { useState, useEffect } from "react";
import { Input, Modal, Spin, Form, Button, message } from "antd";
import { useMutation } from "@apollo/client";
import { GEOFENCE_FORM } from "../../graphqlOperations/mutation";

const GeofenceForm = ({
  setIsModalOpen,
  isModalOpen,
  zoneCoordinates,
  isGeofenceDone,
  setIsGeofenceDone,
  setZoneCoordinates,
}: any) => {
  const [form] = Form.useForm();
  const [method] = useMutation(GEOFENCE_FORM);
  console.log("zoneCoordinates in geofenceform", zoneCoordinates);
  const [orgId, setOrgId] = useState<number | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const zoneCoordinatesString = `POLYGON ((${zoneCoordinates
    ?.map((state: { lat: any; lng: any }) => `${state.lat} ${state.lng}`)
    .join(", ")}))`;
  console.log("polygonString", zoneCoordinatesString);
  useEffect(() => {
    const lsOrgId = sessionStorage?.getItem("ORGID");
    setOrgId(Number(lsOrgId));
  }, []);
  const submitHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await method({
        variables: {
          input: {
            name: values.name,
            description: null,
            orgId: orgId,
            type: "org",
            status: "active",
            attributes: "{color: '#f0000000'}",
            area: zoneCoordinatesString,
          },
        },
      });
      sessionStorage.setItem("isGeofenceCreated", "true");
      setIsModalOpen(false);
      setIsGeofenceDone(true);
      message.success({
        content: "Geofence created.",
      });
      setZoneCoordinates([]);
      form.resetFields();
    } catch (err: any) {
      message.error({
        content: err?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form form={form} layout="vertical" onFinish={submitHandler}>
      <Form.Item
        label="Enter Name"
        name={"name"}
        required
        tooltip="This is a required field"
      >
        <Input placeholder="ABC-AREA" required />
      </Form.Item>
      <Form.Item>
        {isLoading ? (
          <Button loading>Loading...</Button>
        ) : (
          <Button htmlType="submit">Save</Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default GeofenceForm;
