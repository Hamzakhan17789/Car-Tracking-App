import React, { useState } from "react";
import { Button, Col, Row, theme } from "antd";
import SideNav from "../SideNav";
import { VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons";
import LayoutDesign from "../FullLayout";
import PlateExplorer from "../../plateExplorer/PlateExplorer";

type propsType = {
  children: any;
};

const ExplorerLayout = React.memo((props: propsType) => {
  const [siderSpan, setSiderSpan] = useState(5);
  const [contentSpan, setContentSpan] = useState(19);
  const [buttonLeftPosition, setbuttonLeftPosition] = useState("242px");
  const [isButtonClick, setIsButtonClick] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const buttonHandler = () => {
    if (!isButtonClick) {
      setIsButtonClick(true);
      setContentSpan(24);
      setSiderSpan(0);
      setbuttonLeftPosition("-20px");
    } else {
      setContentSpan(19);
      setSiderSpan(5);
      setbuttonLeftPosition("242px");
      setIsButtonClick(false);
    }
  };
  return (
    <LayoutDesign>
      <div
        style={{
          margin: "10px 24px 10px 12px",
          position: "relative",
        }}
      >
        <Button
          type="text"
          size="small"
          style={{
            position: "absolute",
            top: "1px",
            left: buttonLeftPosition,
            transitionDuration: "0s",
            zIndex: 100,
          }} //0-210
          onClick={buttonHandler}
        >
          {isButtonClick ? <VerticalLeftOutlined /> : <VerticalRightOutlined />}
        </Button>

        <Row gutter={[12, 12]} style={{ overflow: "auto" }}>
          <Col
            span={siderSpan}
            style={{
              backgroundColor: "white",
              height: "calc(100vh - 120px)",
              padding: "0px",
            }}
          >
            <PlateExplorer />
          </Col>
          <Col span={contentSpan}>{props.children}</Col>
        </Row>
      </div>
    </LayoutDesign>
  );
});

export default ExplorerLayout;
