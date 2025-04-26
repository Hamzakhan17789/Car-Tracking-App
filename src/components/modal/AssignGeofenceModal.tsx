import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_ALL_GEOFENCES } from "../../graphqlOperations/query";
import { Form, Select, Spin, Button, message } from "antd";
import { AnyCnameRecord } from "dns";
import { ASSIGN_GEOFENCE } from "../../graphqlOperations/mutation";
const { Option } = Select;

const AssignGeofenceModal = ({ vehicleId, setIsGeofenceModalOpen }: any) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [method] = useMutation(ASSIGN_GEOFENCE);

  const { error, data, loading } = useQuery(GET_ALL_GEOFENCES, {
    variables: {
      page: 1,
      limit: 1000,
    },
  });
  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const submitHandler = async (values: { select: any }) => {
    console.log("values", values.select);
    //location Id & Geofence Xid
    try {
      setIsLoading(true);
      const response = await method({
        variables: {
          input: {
            locationId: Number(vehicleId),
            geofenceId: Number(values?.select),
          },
        },
      });
      setIsGeofenceModalOpen(false);
      message.success({
        content: "Vehicle Assigned.",
      });
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
    <div>
      <Form form={form} layout="vertical" onFinish={submitHandler}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Item name={"select"} label="Select Geofence" required>
            <Select
              showSearch
              placeholder="Select Geofence"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              style={{ width: "250px", margin: "10px" }}
            >
              {loading ? (
                <Option value="Loading...">
                  <Spin
                    size="small"
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </Option>
              ) : (
                data?.getGeofences.map((item: any) => {
                  console.log("itemdata", item);
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  );
                })
              )}
            </Select>
          </Form.Item>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {isLoading ? (
            <Button loading>Loading</Button>
          ) : (
            <Button htmlType="submit">Assign</Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AssignGeofenceModal;
