import { Button, Card, Col, Empty, Row } from "antd";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { CLIENT_RENEG_LIMIT } from "tls";
import Map from "../../map";
import VehicleDetailsAreaChart from "./VehicleDetailsAreaChart";
import VehicleDetailsBarChart from "./VehicleDetailsBarChart";
import VehicleDetailsTabContentCarSection from "./VehicleDetailsTabContentCarSection";
import VehicleInfoCard from "./VehicleInfoCard";
import BlueCarImage from "../../../../public/assets/images/blueCar.png";
import Image from "next/image";
// import arrowImg from "../../../public/assets/images/arrow-narrow-right.png";
// import arrowLeftImg from "../../../public/assets/images/IconLeft.png";
import arrowLeftImg from "../../../../public/assets/images/IconLeft.png";
import arrowImg from "../../../../public/assets/images/arrow-narrow-right.png";
import { SocketContext } from "../../../context/socketContext/socketContext";
import classes from "./VehicleDetailsTabContent.module.css";
import VehicleInformation from "../../mapOverlays/VehicleInformation";
import VehicleSpeed from "../../mapOverlays/VehicleSpeedInformation";
import collapseArrow from "../../../../public/assets/images/collapse.png";
import { ClientDetailPlateExplorerContext } from "../../../context/PlateExplorerContext";
import GeofenceVehicleTable from "../../tables/GeofenceVehicleTable";
import GeofenceVehicleMap from "../../map/GeofenceVehicleMap";

const VehicleDetailsTabContent = React.memo(() => {
  const [toggleMapHandler, setToggleMapHandler] = useState(true);
  const [toggleMapFullScreenHandler, setToggleMapFullScreenHandler] =
    useState(false);
  const socketCtx = useContext(SocketContext);
  const [socketDataLoaded, setSocketDataLoaded] = useState(
    socketCtx.socketDataLoaded
  );
  const [geofenceSelect, setGeofenceSelect] = useState<any>(); //Ontable geofance name select
  const [allGeofence, setAllGeofence] = useState<any>(); //whole table geofence data

  const [speed, setSpeed] = useState<number | null>(0);
  ////console.log("vehicle details tab content");
  const [vehicleInformationCollapse, setVehicleInformationCollapse] =
    useState<boolean>(false);
  useEffect(() => {
    setSocketDataLoaded(socketCtx.socketDataLoaded);
  }, [socketCtx.socketDataLoaded]);

  const onClickToggleMapHandler = () => {
    setToggleMapHandler(false);
    setToggleMapFullScreenHandler(true);
    //console.log("toggleMapHandler", toggleMapHandler);
  };
  //console.log("toggleMapHandler", toggleMapHandler);
  const onClickToggleMapHandlerFullScreen = useCallback(() => {
    setToggleMapFullScreenHandler(true);
    setToggleMapHandler(true);

    //console.log("toggleMapFullScreen", toggleMapFullScreenHandler);
  }, []);

  //console.log("Vehicle detail tab content");
  //console.log("setToggleMAp", setToggleMapHandler);
  //console.log("toggleMapFullScreen", toggleMapFullScreenHandler);
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
  //console.log(" IS VEHICLE CARD SELECTED?", clientCtx.isVehicleListCardClicked);

  return (
    <>
      {toggleMapHandler && (
        <Row gutter={[12, 12]} style={{ marginTop: "5px" }}>
          <Col span={24}>
            <Card>
              {/* style={{ height: "501px" }} */}
              <Row>
                <Col span={15} sm={24} lg={24} xl={15}>
                  <VehicleDetailsTabContentCarSection />
                </Col>
                <Col span={9} sm={24} xs={24} lg={24} xl={9}>
                  <Row gutter={[12, 12]}>
                    <Col span={24} sm={24} xs={24} lg={24}>
                      <div style={{ height: "213px", position: "relative" }}>
                        <Map
                          overlayHeight={"0px"}
                          fullScreenControlOption={false}
                          onClickToggleMapHandler={onClickToggleMapHandler}
                          onClickToggleMapHandlerFullScreen={
                            onClickToggleMapHandlerFullScreen
                          }
                          toggleMapHandler={toggleMapHandler}
                        />
                        {socketDataLoaded && (
                          <Button
                            type="text"
                            size="small"
                            style={{
                              position: "absolute",
                              right: 10,
                              top: 2,
                              backgroundColor: "white",
                              // zIndex: 100,
                            }}
                            onClick={onClickToggleMapHandler}
                          >
                            <Image src={arrowImg} alt="arrow-img" />
                          </Button>
                        )}
                      </div>
                    </Col>
                    <Col
                      span={24}
                      xs={24}
                      lg={24}
                      style={{
                        background: "rgba(68, 136, 240, 0.02)",
                        borderRadius: "4px",

                        padding: "2px",
                      }}
                    >
                      <VehicleInfoCard />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          {/* GeoFence Start */}
          <Col span={24}>
            <Card style={{ padding: 10 }}>
              <Row gutter={[12, 12]}>
                <Col
                  span={15}
                  sm={24}
                  lg={24}
                  xl={12}
                  style={{ height: 280, overflowY: "scroll" }}
                >
                  <GeofenceVehicleTable setGeofenceSelect={setGeofenceSelect} />
                </Col>
                <Col span={15} sm={24} lg={24} xl={12}>
                  <GeofenceVehicleMap
                    geofenceSelect={geofenceSelect}
                    setGeofenceSelect={setGeofenceSelect}
                  />
                </Col>
              </Row>
            </Card>
          </Col>

          {/* GeoFence End */}

          <Col span={24}>
            <Row gutter={[12, 12]}>
              <Col span={12} xs={24} sm={12} md={24} lg={12}>
                <Card>
                  <VehicleDetailsBarChart />
                </Card>
              </Col>
              <Col span={12} xs={24} sm={12} md={24} lg={12}>
                <Card>
                  <VehicleDetailsAreaChart />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {toggleMapFullScreenHandler && !toggleMapHandler && (
        <div style={{ height: "calc(100vh - 190px)", position: "relative" }}>
          {/* <Map
            overlayHeight={"0"}
            fullScreenControlOption={true}
            onClickToggleMapHandler={onClickToggleMapHandler}
            onClickToggleMapHandlerFullScreen={
              onClickToggleMapHandlerFullScreen
            }
            toggleMapHandler={toggleMapHandler}
          /> */}
          {socketDataLoaded && (
            <div
              className={`${
                !vehicleInformationCollapse
                  ? classes.vehicleInformation
                  : classes.vehicleInformationCollapse
              }`}
            >
              <VehicleInformation />
            </div>
          )}
          {socketDataLoaded && (
            <>
              <div
                className={
                  !vehicleInformationCollapse
                    ? classes.collapseArrow
                    : classes.collapseArrowCollapased
                }
                onClick={() =>
                  setVehicleInformationCollapse(!vehicleInformationCollapse)
                }
                // onClick={()=>{
                //   socket.disconnect()
                // }}
              >
                <Image
                  src={collapseArrow.src}
                  width={"8px"}
                  height={"10px"}
                  alt="collapse-img"
                />
              </div>
            </>
          )}
          {socketDataLoaded && (
            <>
              <div className={classes.speedOverlay}>
                <VehicleSpeed speed={speed} />
              </div>
            </>
          )}
          <Button
            type="text"
            size="small"
            style={{
              position: "absolute",
              left: 5,
              top: 2,
              backgroundColor: "white",
            }}
            onClick={onClickToggleMapHandlerFullScreen}
          >
            <Image src={arrowLeftImg} alt="arrow-img" />
          </Button>
        </div>
      )}
    </>
  );
});

export default VehicleDetailsTabContent;
