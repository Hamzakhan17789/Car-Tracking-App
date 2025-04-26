import React, { useState } from "react";
import {
  Layout,
  Menu,
  theme,
  DrawerProps,
  RadioChangeEvent,
  Card,
  Row,
  Col,
  Divider,
  Collapse,
} from "antd";
import explorerData from "../../../data/explorerData";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content, Footer } = Layout;
import classes from "./SideNav.module.css";
import SideNavCard from "../../cards/SideNavCard";
import SideNavTabs from "../../tabs/SideNavTabs";

const SideNav: React.FC = React.memo(() => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const [open, setOpen] = useState(true);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "10px 0px",
        }}
      >
        <Row
          style={{
            width: "100%",
            overflow: "auto",
          }}
        >
          <Col span={24}>
            <SideNavTabs />
          </Col>
          {explorerData.map(
            (
              {
                name,
                number,
                plateNumber,
                chassisNumber,
                engineNumber,
                imei,
                deviceID,
              },
              index
            ) => (
              <Col span={24} key={index}>
                <SideNavCard
                  name={name}
                  cellPhone={number}
                  plate={plateNumber}
                  chassis={chassisNumber}
                  engine={engineNumber}
                  imei={imei}
                  sendImeiNumber={function (item: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  deviceID={deviceID}
                />
              </Col>
            )
          )}
        </Row>
      </div>
    </>
  );
});

export default SideNav;
