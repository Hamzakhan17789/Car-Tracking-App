import React, { useCallback, useState } from "react";
import { Button, Col, Row, theme } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import GeoFenceExplorer from "../../components/plateExplorer/GeoFenceExplorer";
import GeoFenceMap from "../../components/map/GeoFenceMap";

const GeoFence = React.memo(({ collapsed, setCollapsed, token }: any) => {
  const [siderSpan, setSiderSpan] = useState("270px");
  const [contentSpan, setContentSpan] = useState("270px");
  const [buttonLeftPosition, setbuttonLeftPosition] = useState("455px");
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [isGeofenceDone, setIsGeofenceDone] = useState(false);
  const [geofenceCardHandlerData, setGeofenceCardHandlerData] = useState<any>();
  const [isCreateGeofence, setIsCreateGeofence] = useState<boolean>(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const buttonHandler = useCallback(() => {
    if (!isButtonClick) {
      setIsButtonClick(true);
      setContentSpan("0px");
      setSiderSpan("270px");
      setbuttonLeftPosition("200px");
    } else {
      setContentSpan("270px");
      setSiderSpan("0px");
      setbuttonLeftPosition("475px");
      setIsButtonClick(false);
    }
    // ////console.log("button handler");
    // ////console.log("button handler");
  }, [isButtonClick]);

  const GeofenceCardHandler = (item: any) => {
    console.log("GeofenceCardHandler", item);
    setGeofenceCardHandlerData(item);
    setIsCreateGeofence(false);
  };

  return (
    <div
      style={{
        margin: "10px 24px 10px 5px",
      }}
    >
      {/* <StatisticsModal  isModalOpen={true}/> */}
      <Button
        size="small"
        style={{
          top: "100px",
          left:
            !collapsed && !isButtonClick
              ? "455px"
              : collapsed && isButtonClick
              ? "100px"
              : isButtonClick && !collapsed
              ? "200px"
              : "355px",

          transition: "0s",
          width: "15px",
          height: "36px",
          transitionDuration: "0s",
          zIndex: "10",
          position: "fixed",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          boxShadow: "0px 3px 6px #00000012",
          borderRadius: "0px 3px 3px 0px",
        }} //0-210
        onClick={buttonHandler}
      >
        {isButtonClick ? (
          <RightOutlined
            style={{ position: "absolute", top: "10px", left: 0 }}
          />
        ) : (
          <LeftOutlined
            style={{ position: "absolute", top: "10px", left: 0 }}
          />
        )}
      </Button>

      <div
        style={{
          backgroundColor: "white",
          height: "calc(100vh - 120px)",
          padding: "0px",
          width: "250px",
          position: "fixed",
          display: isButtonClick ? "none" : "block",
          overflowY: "auto",
        }}
      >
        <GeoFenceExplorer
          isGeofenceDone={isGeofenceDone}
          GeofenceCardHandler={GeofenceCardHandler}
          setIsCreateGeofence={setIsCreateGeofence}
          isCreateGeofence={isCreateGeofence}
        />
      </div>
      <Row gutter={[12, 12]} style={{ marginLeft: contentSpan }}>
        <Col span={24}>
          <div style={{ width: "100%", height: "100%" }}>
            <GeoFenceMap
              isGeofenceDone={isGeofenceDone}
              setIsGeofenceDone={setIsGeofenceDone}
              geofenceCardHandlerData={geofenceCardHandlerData}
              isCreateGeofence={isCreateGeofence}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
});

export default GeoFence;
