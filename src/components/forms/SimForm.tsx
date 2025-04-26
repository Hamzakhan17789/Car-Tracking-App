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
} from "antd";
import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { SIM_FORM } from "../../graphqlOperations/mutation";
import Link from "next/link";

const { Option } = Select;

const SimForm = React.memo(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [method] = useMutation(SIM_FORM);
  const [orgId, setOrgId] = useState<number | null>();
  const [form] = Form.useForm();

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
            orgId: orgId,
            network: values.network,
            number: values.simNumber,
            status: "active",
            serialNo: values.serialNumber,
            ip: values.ip,
            type: values.type,
          },
        },
      });
      message.success({
        content: "Device Registered",
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
              <h1>Add Sim</h1>
            </Col>
            <Divider />
            <Col span={12} md={12} xs={24}>
              <Form.Item
                name="network"
                label="Network Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your network name!",
                  },
                ]}
              >
                <Select placeholder="Select Network">
                  <Option value="jazz">jazz</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={12} md={12} xs={24}>
              <Form.Item label="Network Name">
                <Input
                  value={simForm.network}
                  name="network"
                  onChange={valueHandler}
                />
              </Form.Item>
            </Col> */}
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Sim #"
                name="simNumber"
                rules={[{ required: true, message: "Please enter sim number" }]}
              >
                <Input placeholder="03001234569" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Serial #"
                name="serialNumber"
                rules={[
                  { required: true, message: "Please enter serial Number" },
                ]}
              >
                <Input placeholder="0000123459877454465" />
              </Form.Item>
            </Col>

            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select type" }]}
              >
                <Select placeholder="Select type">
                  <Option value="vehicle">vehicle</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* <Col span={12} md={12} xs={24}>
              <Form.Item label="Type">'
                <Input
                  value={simForm.type}
                  name="type"
                  onChange={valueHandler}
                />
              </Form.Item>
            </Col> */}

            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Ip"
                name="ip"
                rules={[{ required: true, message: "Please enter sim number" }]}
              >
                <Input placeholder="192.168.192.696" />
              </Form.Item>
            </Col>

            {/* <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item label="Org Id">
                <Input
                  value={simForm.orgId}
                  name="orgId"
                  onChange={valueHandler}
                />
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

          <a href={"/sim"}>
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

export default SimForm;
