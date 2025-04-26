import React, { useState, useEffect } from "react";
import { Button, DatePicker, Spin, message, Select, Form } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_BY_SEARCH_LOCATION } from "../../graphqlOperations/query";
import { ASSIGN_GEOFENCE } from "../../graphqlOperations/mutation";
const { Option } = Select;

const AssignToVehicleForm = ({ item, isModalOpen, setIsModalOpen }: any) => {
  const [orgId, setOrgId] = useState<any>();
  const [locationData, setLocationData] = useState<any>();
  const [form] = Form.useForm();
  const [method] = useMutation(ASSIGN_GEOFENCE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log("item.id", item?.id);

  useEffect(() => {
    const id = sessionStorage.getItem("ORGID");
    setOrgId(id);
  }, []);

  const { data, loading, error } = useQuery(GET_ALL_BY_SEARCH_LOCATION, {
    variables: {
      orgId: Number(orgId),
    },
  });

  console.log("data from", data?.getAllBySearchLocation);

  useEffect(() => {
    console.log("replayPage useEffect called data error");
    if (data) {
      console.log("data RangePicker", data);
      setLocationData(data?.getAllBySearchLocation);
    }
    if (error) {
      message.warning(error?.message);
    }
  }, [data, error, locationData]);
  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const submitHandler = async (values: any) => {
    console.log("values", values.select);
    //location Id & Geofence Xid
    try {
      setIsLoading(true);
      const response = await method({
        variables: {
          input: {
            locationId: Number(values.select),
            geofenceId: Number(item?.id),
          },
        },
      });
      setIsModalOpen(false);
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
          <Form.Item name={"select"} label="Select Vehicle" required>
            <Select
              showSearch
              placeholder="Select Device"
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
                data?.getAllBySearchLocation.map((item: any) => {
                  console.log("itemdata", item);
                  return (
                    <Option key={item?.id} value={item?.id}>
                      {item?.identity}
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

export default AssignToVehicleForm;
