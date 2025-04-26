import { useMutation } from "@apollo/client";
import {
  Card,
  Col,
  Form,
  Row,
  Input,
  Select,
  Switch,
  Divider,
  Button,
  message,
  Empty,
} from "antd";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { ClientDetailPlateExplorerContext } from "../../../context/PlateExplorerContext";
import { COMMANDS_FORM } from "../../../graphqlOperations/mutation";
import CommandsTable from "../../tables/CommandsTable";

const { Option } = Select;

const CommandsTabContent = React.memo(() => {
  ////console.log("COMMANDS TAB");
  const [isToggle, setIsToggle] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const locationLS = localStorage.getItem("locationId");
  const [locationId, setLocationId] = useState<string | null>(locationLS);
  //////console.log("LS", locationId);
  const [method] = useMutation(COMMANDS_FORM);

  useEffect(() => {
    setLocationId(locationLS);
    const gettingVehicleIDFromSessionStorage = sessionStorage.getItem(
      "vehicleIDforClientDetail"
    );
    //setLocationId()
    setLocationId(gettingVehicleIDFromSessionStorage);
  }, [locationId]);
  const submitHandler = async (value: any) => {
    //////console.log(value);
    //////console.log("locationID" ,locationId)
    try {
      setIsLoading(true);
      const response = await method({
        variables: {
          input: {
            command: value.command,
            locationId: Number(locationId),
          },
        },
      });
      //////console.log("response", response);
      message.success({
        content: "Command sends succesfully",
      });
      form.resetFields();
      // router.reload();
    } catch (err: any) {
      message.error({
        content: err?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clientCtx = useContext(ClientDetailPlateExplorerContext);

  if (!clientCtx.isVehicleListCardClicked) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          //alignSelf: 'center',
          height: "600px",
        }}
      >
        <Empty
          description={"Please select a vehicle."}
          style={{
            height: "300px",

            alignSelf: "center",
          }}
        />
      </div>
    );
  }
  
  return (
    <Card style={{ marginTop: "10px" }}>
      <Row>
        <Col span={24}>
          <h1>Command</h1>
        </Col>
        <Divider />
        <Col span={24}>
          <Form layout="vertical" form={form} onFinish={submitHandler}>
            <Row gutter={[12, 12]}>
              <Col span={4} xl={4} lg={6} md={12} sm={24} xs={24}>
                <Form.Item label="Custom Command" valuePropName="checked">
                  <Switch
                    onChange={(e) => {
                      setIsToggle(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={7} xl={7} lg={9} md={12} sm={24} xs={24}>
                {!isToggle ? (
                  <Form.Item
                    name={"command"}
                    label="Command"
                    rules={[
                      { required: true, message: "Please select command" },
                    ]}
                  >
                    <Select placeholder="Select Command">
                      <Option value="ggps">GGPS</Option>
                      <Option value="getinfo">GET_INFO</Option>
                    </Select>
                  </Form.Item>
                ) : (
                  <Form.Item
                    name={"command"}
                    label="Command"
                    rules={[
                      { required: true, message: "Please enter command" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                )}
              </Col>
              <Col span={7} xl={7} lg={9} md={12} sm={24} xs={24}>
                <Form.Item
                  name={"gateway"}
                  label="Gateway"
                  // rules={[{ required: true, message: "Please select gateway" }]}
                >
                  <Select placeholder="GPRS" disabled defaultActiveFirstOption>
                    <Option value="gprs" defaultValue>GPRS</Option>
                    <Option value="sms" disabled>
                      SMS
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col
                span={6}
                xl={6}
                md={12}
                sm={24}
                xs={24}
                style={{ alignSelf: "center" }}
              >
                {isLoading ? (
                  <Button type="primary" loading style={{ width: "100%" }}>
                    Loading
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Submit
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
        <Divider />
        <Col span={24}>
          <Row>
            <Col span={24}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Command History</h1>
                <Button disabled>Download all</Button>
              </div>
            </Col>
            <Col span={24} style={{ marginTop: "10px" }}>
              <CommandsTable />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
});

export default CommandsTabContent;
