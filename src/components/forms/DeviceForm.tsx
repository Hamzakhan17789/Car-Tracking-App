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
import { DEVICE_FORM } from "../../graphqlOperations/mutation";
import Link from "next/link";
import { GET_ALL_NETWORK_SEARCH } from "../../graphqlOperations/querry";
import { useRouter } from "next/router";

const { Option } = Select;

const DeviceForm = React.memo(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [method] = useMutation(DEVICE_FORM);
  const [form] = Form.useForm();
  const [orgId, setOrgId] = useState<number | null>();
  const { data, loading, error } = useQuery(GET_ALL_NETWORK_SEARCH, {
    variables: {
      limit: 1000,
      page: 1,
      where: {
        org: {
          id: orgId,
        },
        state: "unused",
      },
    },
  });
  // //////console.log("simDropDownData:", data?.getAllNetwork);
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
            // status: deviceForm.status,
            type: values.deviceType,
            model: values.model,
            imei: values.imei,
            serial: values.serialNumber,
            brand: values.brandName,
            status: "active",
            orgId: orgId,
            networkId: Number(values.simNumber),
            password: values.password,
          },
        },
      });
      //////////console.loglog(response);
      message.success({
        content: "Device Registered",
      });
      //////////console.loglog(deviceForm);
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
        <Form layout="vertical" onFinish={submitHandler} form={form}>
          <Row gutter={[32, 6]}>
            <Col span={24}>
              <h1>Add Device</h1>
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
                <Select placeholder="Select Brand Name">
                  <Option value="Teltonica">Teltonica</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Device Type"
                name="deviceType"
                rules={[
                  { required: true, message: "Please enter device type" },
                ]}
              >
                <Input placeholder="vehicle tracking" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Model"
                name="model"
                rules={[
                  { required: true, message: "Please enter model number" },
                ]}
              >
                <Input placeholder="ABC221" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Serial Number"
                name="serialNumber"
                rules={[
                  { required: true, message: "Please enter serial number" },
                ]}
              >
                <Input placeholder="656449798789" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Device password"
                name="password"
                rules={[
                  { required: true, message: "Please enter device password" },
                ]}
              >
                <Input type="password" placeholder="******" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Imei"
                name="imei"
                rules={[
                  { required: true, message: "Please enter imei number" },
                ]}
              >
                <Input placeholder="350424066309061" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Sim Number"
                name="simNumber"
                rules={[
                  { required: true, message: "Please select sim number" },
                ]}
              >
                <Select placeholder="Select sim number">
                  {loading ? (
                    <Option>
                      <Spin
                        size="small"
                        style={{ display: "flex", justifyContent: "center" }}
                      />
                    </Option>
                  ) : data?.getAllNetwork.length !== 0 &&
                    data?.getAllNetwork !== undefined ? (
                    data?.getAllNetwork.map(({ id, number }: any) => {
                      return (
                        <Option key={id} value={id}>
                          {number}
                        </Option>
                      );
                    })
                  ) : (
                    <Option disabled>Please add network first</Option>
                  )}
                </Select>
              </Form.Item>
            </Col>

            {/* <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item label="Id">
                <Input
                  value={deviceForm.id}
                  name="id"
                  onChange={valueHandler}
                />
              </Form.Item>
            </Col> */}
            {/* <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item label="Org Id">
                <Input
                  value={deviceForm.orgId}
                  name="orgId"
                  onChange={valueHandler}
                />
              </Form.Item>
            </Col> */}

            {/* <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item
                label="Network Id"
                name="networkId"
                rules={[{ required: true, message: "Please enter network id" }]}
              >
                <Input placeholder="1" />
              </Form.Item>
            </Col> */}

            {/* <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item name={"status"} label="Status">
                <Select placeholder="Select Status" onChange={selectHandler}>
                  <Option value="active">Active</Option>
                  <Option value="inActive">Not Active</Option>
                </Select>
              </Form.Item>
            </Col> */}

            <Divider />
          </Row>

          <a href={"/device"}>
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

export default DeviceForm;
