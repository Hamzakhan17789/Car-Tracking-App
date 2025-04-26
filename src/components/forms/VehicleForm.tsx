import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  message,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { VEHICLE_FORM } from "../../graphqlOperations/mutation";
import Link from "next/link";
import { GET_ALL_CLIENTS_AND_UNUSED_DEVICES } from "../../graphqlOperations/querry";
import { Router, useRouter } from "next/router";

const { Option } = Select;

const VehicleForm = React.memo(() => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [method] = useMutation(VEHICLE_FORM);
  const [form] = Form.useForm();
  const [orgId, setOrgId] = useState<number | null>();
  const { data, loading, error } = useQuery(
    GET_ALL_CLIENTS_AND_UNUSED_DEVICES,
    {
      variables: {
        page: 1,
        limit: 1000,
        where: {
          org: {
            id: orgId,
          },
        },
        getAllDeviceWhere2: {
          state: "unused",
        },
      },
    }
  );
  // //////console.log(
  //   "length",
  //   data?.getAllDevice.length !== 0 && data?.getAllDevice !== undefined
  //     ? "length != 0"
  //     : "length==0"
  // );
  // //////console.log(data?.getAllDevice);
  useEffect(() => {
    //////console.log("render");
  }, [isLoading]);

  useEffect(() => {
    const lsOrgId = localStorage?.getItem("orgId");
    setOrgId(Number(lsOrgId));
  }, []);

  const submitHandler = async (values: any) => {
    // //////console.log("values", values);
    try {
      setIsLoading(true);
      const response = await method({
        variables: {
          input: {
            chassis: values.chasisNumber,
            engine: values.engineNumber,
            model: values.model,
            type: values.vehicleType,
            year: values.year,
            brand: values.brandName,
            clientId: Number(values.clientId),
            deviceId: Number(values.deviceId),
            identity: values.plateNumber,
            orgId: orgId,
            status: "active",
          },
        },
      });
      //////////console.loglog(response);
      message.success({
        content: "Device Registered",
      });
      //////////console.loglog(vehicleForm);
      form.resetFields();
      router.reload();
    } catch (err: any) {
      message.error({
        content: err?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card
        style={{
          margin: "10px 60px",
        }}
        bodyStyle={{}}
      >
        <Form layout="vertical" form={form} onFinish={submitHandler}>
          <Row gutter={[32, 6]}>
            <Col span={24}>
              <h1>Add Vehicle</h1>
            </Col>
            <Divider />
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Brand Name"
                name="brandName"
                rules={[
                  { required: true, message: "Please select brand number" },
                ]}
              >
                <Input placeholder="Please enter brand name" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Chasis Number"
                name="chasisNumber"
                rules={[
                  { required: true, message: "Please enter chasis number" },
                ]}
              >
                <Input placeholder="0123456" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Plate Number"
                name="plateNumber"
                rules={[
                  { required: true, message: "Please enter plate number" },
                ]}
              >
                <Input placeholder="AFR-2023" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Engine Number"
                name="engineNumber"
                rules={[
                  { required: true, message: "Please enter engine number" },
                ]}
              >
                <Input placeholder="0123321200" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Model"
                name="model"
                rules={[
                  { required: true, message: "Please enter vehicle model" },
                ]}
              >
                <Input placeholder="201452" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Year"
                name="year"
                rules={[{ required: true, message: "Please enter year" }]}
              >
                <Input placeholder="2023" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Vehicle Type"
                name="vehicleType"
                rules={[
                  { required: true, message: "Please enter vehicle type" },
                ]}
              >
                <Input placeholder="Car" />
              </Form.Item>
            </Col>
            {/* <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Device Imei"
                name="deviceImei"
                rules={[
                  { required: true, message: "Please enter device imei" },
                ]}
              >
                <Input placeholder="1654684651561" />
              </Form.Item>
            </Col> */}

            <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item
                label="Select Client"
                name="clientId"
                rules={[
                  { required: true, message: "Please select client number" },
                ]}
              >
                <Select placeholder="Select client number">
                  {loading ? (
                    <Option>
                      <Spin
                        size="small"
                        style={{ display: "flex", justifyContent: "center" }}
                      />
                    </Option>
                  ) : data?.getAllClient.length !== 0 &&
                    data?.getAllClient !== undefined ? (
                    data?.getAllClient.map(({ id, contactNumber }: any) => {
                      return (
                        <Option key={id} value={id}>
                          {contactNumber}
                        </Option>
                      );
                    })
                  ) : (
                    <Option disabled>Please register client first</Option>
                  )}
                </Select>
              </Form.Item>
            </Col>

            {/* <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item label="Org Id">
                <Input
                  value={vehicleForm.orgId}
                  name="orgId"
                  onChange={valueHandler}
                />
              </Form.Item>
            </Col> */}

            <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item
                label="Select Device "
                name="deviceId"
                rules={[
                  { required: true, message: "Please select device imei" },
                ]}
              >
                <Select placeholder="Select device imei">
                  {loading ? (
                    <Option>
                      <Spin
                        size="small"
                        style={{ display: "flex", justifyContent: "center" }}
                      />
                    </Option>
                  ) : data?.getAllDevice.length !== 0 &&
                    data?.getAllDevice !== undefined ? (
                    data?.getAllDevice.map(({ id, imei }: any) => {
                      return (
                        <Option key={id} value={id}>
                          {imei}
                        </Option>
                      );
                    })
                  ) : (
                    <Option disabled>Please Register Device First</Option>
                  )}
                </Select>
              </Form.Item>
            </Col>

            {/* <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item name={"status"} label="Status">
                <Select
                  placeholder="Select Status"
                  onChange={selectHandlerStatus}
                >
                  <Option value="active">Active</Option>
                  <Option value="inActive">Not Active</Option>
                </Select>
              </Form.Item>
            </Col> */}

            <Divider />
          </Row>

          <a href={"/vehicle"}>
            <Button type="text" style={{ marginRight: "10px" }}>
              Back
            </Button>
          </a>
          {isLoading ? (
            <Button type="primary" loading>
              Loading
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </Form>
      </Card>
    </>
  );
});

export default VehicleForm;
