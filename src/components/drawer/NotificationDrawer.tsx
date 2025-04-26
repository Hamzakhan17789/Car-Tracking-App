import React, { useState } from "react";
import { Button, Drawer, Radio, Row, Space, Col, Card } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import type { RadioChangeEvent } from "antd/es/radio";
import DataCard from "../cards/DataCard";
import NotificationDrawerCards from "../cards/NotificationDrawerCards";
import { PoweroffOutlined } from "@ant-design/icons";
import { BellIcon, } from '@heroicons/react/24/outline';

const NotificationDrawer: React.FC = React.memo(() => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space style={{  }}>
        
      </Space>
      <BellIcon style={{ width: 20, height: 20, margin: "16px 22px -4px 0px", cursor: "pointer" }} onClick={showDrawer} />

      <Drawer
        title="Notifications"
        placement={placement}
        width={400}
        onClose={onClose}
        open={open}
        bodyStyle={{ padding: 5 }}
      >
        <Row gutter={2}>
          <Col span={6}>
            <DataCard
              color="#72CC8A"
              title="Ignitions"
              number="48"
              height="100%"
              numberFontSize={"20px"}
              titleFontSize={"12px"}
            />
          </Col>
          <Col span={6}>
            <DataCard
              color="#DF685E"
              title="Battery"
              number="13"
              height="100%"
              numberFontSize={"20px"}
              titleFontSize={"12px"}
            />
          </Col>
          <Col span={6}>
            <DataCard
              color="#D1AF54"
              title="Zone"
              number="4"
              height="100%"
              numberFontSize={"20px"}
              titleFontSize={"12px"}
            />
          </Col>
          <Col span={6}>
            <DataCard
              color="#DEDEDE"
              title="Over Speed"
              number="105"
              height="100%"
              numberFontSize={"20px"}
              titleFontSize={"12px"}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <NotificationDrawerCards
              date="12/10/2020"
              time={"13:25:21"}
              messageDetails="Ignition Off"
              plateNumber="AFR-2022"
              color="#72cc8a"
              icon={<PoweroffOutlined style={{ padding: "5px" }} />}
            />
          </Col>
          <Col span={24}>
            <NotificationDrawerCards
              date="12/10/2020"
              time={"13:25:21"}
              messageDetails="Ignition Off"
              plateNumber="AFR-2022"
              color="#72cc8a"
              icon={<PoweroffOutlined style={{ padding: "5px" }} />}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
});

export default NotificationDrawer;
