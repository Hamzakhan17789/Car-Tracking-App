import { Card, Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import carChasis from "../../../public/assets/images/car-wit-chassis@2x.png";
import carEngine from "../../../public/assets/images/Group 1881@2x.png";
import { PoweroffOutlined } from "@ant-design/icons";

type PropsType = {
  date: string;
  time: string;
  plateNumber: string;
  messageDetails: string;
  icon: JSX.Element;
  color: string;
};

const NotificationDrawerCards = React.memo(({
  date,
  time,
  plateNumber,
  messageDetails,
  icon,
  color,
}: PropsType) => {
  return (
    <Card style={{ marginTop: "5px" }} bodyStyle={{ padding: "5px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Row style={{ alignItems: "center" }}>
            <Col
              span={5}
              style={{ backgroundColor: color, borderRadius: "25px" }}
            >
              {icon}
            </Col>
            <Col span={19}>
              <div style={{ margin: "0px 5px" }}>
                <h6>{plateNumber}</h6>
                <h4>{messageDetails}</h4>
              </div>
            </Col>
          </Row>
          {/* <div style={{ padding: "10px" }}>
            <PoweroffOutlined />
            <div style={{ display: "inline" }}>
              <h5 style={{ display: "inline" }}>AFR-2022</h5>
              <h3 style={{ display: "inline" }}>Ignition off</h3>
            </div>
          </div> */}
        </div>
        <div>
          <h6>{date}</h6>
          <span>
            <h6 style={{ display: "inline", margin: "0px 2px" }}>{time}</h6>
          </span>
        </div>
      </div>
    </Card>
  );
})

export default NotificationDrawerCards;
