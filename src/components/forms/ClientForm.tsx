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
import { CLIENT_FORM } from "../../graphqlOperations/mutation";
import Link from "next/link";
import { Router, useRouter } from "next/router";

const { Option } = Select;

const clientFormInitialValue = {
  firstName: "",
  lastName: "",
  fatherName: "",
  cnic: "",
  phoneNumber: "",
  email: "",
  title: "",
  orgId: "",
  status: "",
};

const ClientForm = React.memo(() => {
  ////console.log('client form')
  const router = useRouter();
  const [clientForm, setClientForm] = useState(clientFormInitialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [method] = useMutation(CLIENT_FORM);
  const [form] = Form.useForm();

  const statusType = clientForm.status === "Active" ? 1 : 0;
  // //////console.log(statusType);
  const [orgId, setOrgId] = useState<number | null>();

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
            contactNumber: values.phoneNumber,
            title: values.title,
            status: "active",
            firstName: values.firstName,
            fatherName: values.fatherName,
            lastName: values.lastName,
            orgId: orgId,
            identity: values.cnic,
            userEmail: values.email,
            userPassword: values.password,
          },
        },
      });
      //////////console.loglog(response);
      message.success({
        content: "Client Registered",
      });
      //////////console.loglog(clientForm);
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
        <Form layout="vertical" form={form} onFinish={submitHandler}>
          <Row gutter={[32, 6]}>
            <Col span={24}>
              <h1>Add Client</h1>
            </Col>
            <Divider />
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input placeholder="Mr/Mrs" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input placeholder="FirstName" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input placeholder="lastname" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Father Name"
                name="fatherName"
                rules={[
                  { required: true, message: "Please enter father name" },
                ]}
              >
                <Input placeholder="fathername" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter email address" },
                ]}
              >
                <Input placeholder="abc@teltonica.com" type="email" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input placeholder="******" type="password" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Cnic"
                name="cnic"
                rules={[
                  { required: true, message: "Please enter cnic number" },
                ]}
              >
                <Input placeholder="3210120957867" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Phone #"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input placeholder="03001234567" />
              </Form.Item>
            </Col>

            {/* <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item label="Org Id">
                <Input
                  value={clientForm.orgId}
                  name="orgId"
                  onChange={valueHandler}
                />
              </Form.Item>
            </Col> */}
            {/* <Col span={6} md={6} xs={24} sm={12}>
              <Form.Item name={"status"} label="Status">
                <Select placeholder="Select Status" onChange={selectHandler}>
                  <Option value="active">active</Option>
                  <Option value="in active">not active</Option>
                </Select>
              </Form.Item>
            </Col> */}

            <Divider />
          </Row>
          <a href={"/clients"}>
            {/* <a href="/clients"> */}
            <Button type="text" style={{ marginRight: "10px" }}>
              Back
            </Button>
            {/* </a> */}
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

export default ClientForm;
