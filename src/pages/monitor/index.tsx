import React, { useCallback, useContext, useEffect, useState } from "react";

import LayoutDesign from "../../components/layout/FullLayout";
import {
  Button,
  Card,
  Col,
  Collapse,
  Layout,
  Row,
  Spin,
  Tabs,
  theme,
  Drawer,
} from "antd";
import DataCard from "../../components/cards/DataCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Maps from "../../components/map";
import classes from "./home.module.css";
import { plateExplorerHomeOption } from "../../data/plate-explorer-data";
import PlateExplorer from "../../components/plateExplorer/PlateExplorer";
import VehicleInformation from "../../components/mapOverlays/VehicleInformation";
import VehicleSpeed from "../../components/mapOverlays/VehicleSpeedInformation";
import { SocketContext } from "../../context/socketContext/socketContext";
import collapseArrow from "../../../public/assets/images/collapse.png";
import Image from "next/image";
import { ClientDetailPlateExplorerContext } from "../../context/PlateExplorerContext";
import { GraphqlMapContext } from "../../context/graphqlOperationsContext/graphqlMapContext";
import { GET_OWN_ORG } from "../../graphqlOperations/querry";
import { useQuery } from "@apollo/client";
import { GraphQlOperationContext } from "../../context/graphqlOperationsContext/graphqlOperationsContext";
import VehicleAddressLocation from "../../components/mapOverlays/VehicleAddressLocation";
import StatisticsModal from "../../components/modal/StatisticsModal";
import TripsTable from "../../components/tables/TripsTable";
import EventsTable from "../../components/tables/EventsTable";
import RoutesTable from "../../components/tables/RoutesTable";
import Widget from "../../components/mapOverlays/Widget";
import TodaysActivity from "../../components/mapOverlays/TodaysActivity";
import moment from "moment";

const now = moment();
const utcNow = moment().utc();
const xTimeFromx = utcNow.format("YYYY-MM-DD");
const xTimeFrom = (xTimeFromx + 'T00:00:00.000Z');
const xTimeTo = utcNow.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

console.log("xxx", xTimeFrom )
console.log("aaa", xTimeTo )

const { Content, Sider } = Layout;

const CustomCardData = [
  {
    title: "All",
    color: "#333333",
    number: 32,
    textColor: "#8B8B8B",
  },
  {
    title: "Stopped",
    color: "#EE685D",
    number: 8,
    textColor: "#BB3F35",
  },
  {
    title: "Moving",
    color: "#5CB975",
    number: 7,
    textColor: "#2D8B46",
  },
  {
    title: "Idle",
    color: "#679DF6",
    number: 3,
    textColor: "#3F71C4",
  },
  {
    title: "Offline",
    color: "#909090",
    number: 10,
    textColor: "#5B5B5B",
  },
  {
    title: "Expired",
    color: "#9D7B5F",
    number: 2,
    textColor: "#653D1C",
  },
];

const HomePage = React.memo(({ collapsed, setCollapsed, token }: any) => {
  ////console.log("%c HOME PAGE RUNNING" , "color:red");

  //////console.log('token from getServerSide'  , token)

  // const [collapsed, setCollapsed] = useState(false);
  const [siderSpan, setSiderSpan] = useState("270px");
  const [contentSpan, setContentSpan] = useState("270px");
  const [buttonLeftPosition, setbuttonLeftPosition] = useState("455px");
  const [isButtonClick, setIsButtonClick] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [orgId, setOrgId] = useState();
  const graphqlOperationCtx = useContext(GraphQlOperationContext);

  const { data, loading, error, refetch } = useQuery(GET_OWN_ORG);

  useEffect(() => {
    if (data) {
      setOrgId(data?.getOwnOrg[0]?.id);
      localStorage.setItem("orgId", data?.getOwnOrg[0]?.id);
      sessionStorage.setItem("ORGID", data?.getOwnOrg[0]?.id);
      graphqlOperationCtx.setOrgID(data?.getOwnOrg[0]?.id);
    }
  }, [data, refetch, data?.getOwnOrg[0]?.id]);

  useEffect(() => {
    refetch();
    return () => {
      graphqlOperationCtx.setOrgID(null);
    };
  }, []);

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

  const socketCtx = useContext(SocketContext);
  const clientCtx = useContext(ClientDetailPlateExplorerContext);
  const [speed, setSpeed] = useState<number | null>(0);

  const [vehicleInformationCollapse, setVehicleInformationCollapse] =
    useState<boolean>(false);
  const [onClick, setOnCick] = useState(false);

  const graphlqlMapCtx = useContext(GraphqlMapContext);
  //Tabs useEffect
  const [locationId, setLocationId] = useState<any>();

  let id = sessionStorage.getItem("vehicleID");
  useEffect(() => {
    setLocationId(id);
    console.log("onClick", onClick);
    console.log("clientCtx.Onclick", clientCtx.onClick);
  }, [onClick, clientCtx.onClick, locationId, id]);
  console.log("location-->ID", locationId);
  useEffect(() => {
    setSpeed(socketCtx.speed);
  }, [socketCtx.speed]);

  const [socketDataLoaded, setSocketDataLoaded] = useState(
    socketCtx.socketDataLoaded
  );

  useEffect(() => {
    setSocketDataLoaded(socketCtx.socketDataLoaded);
    setOnCick(clientCtx.onClick);
  }, [
    socketCtx.socketDataLoaded,
    clientCtx.onClick,
    onClick,
    socketDataLoaded,
  ]);
  const [speedFromDB, setSpeedFromDB] = useState<any>(
    graphlqlMapCtx.graphqlSpeed
  );

  useEffect(() => {
    setSpeedFromDB(graphlqlMapCtx.graphqlSpeed);
  }, [graphlqlMapCtx.graphqlSpeed]);

  const speedValueFinal =
    !socketCtx.socketDataLoaded && graphlqlMapCtx.graphqlMapDataLoaded
      ? `${speedFromDB}`
      : speed;
  // ////console.log(speedValueFinal);
  // ////console.log(speedValueFinal);
  //////console.log(speedFromDB);
  console.log(
    socketDataLoaded,
    console.log(
      socketDataLoaded,
      graphlqlMapCtx.graphqlMapDataLoaded,
      clientCtx.onClick
    )
  );
  ////////console.log('Speed Value  ' , speedValueFinal)

  //////console.log(typeof speedValueFinal);
  const [isShowReport, setIsShowReport] = useState(false);
  const switchReports = () => {
    setIsShowReport(true);
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
        <PlateExplorer
          plateExplorerOptions={plateExplorerHomeOption}
          tabBarGutterValue={6}
        />
      </div>
      <Row gutter={[12, 12]} style={{ marginLeft: contentSpan }}>
        <Col span={24}>
          <Row gutter={[12, 12]}>
            {CustomCardData.map(({ title, color, number }, index) => (
              <Col key={index} span={24} xl={4} sm={8}>
                <DataCard
                  title={title}
                  color={color}
                  number={number}
                  height={"64px"}
                  numberFontSize={"28px"}
                  titleFontSize={"12px"}
                />
              </Col>
            ))}
          </Row>
          <Content
            style={{
              background: colorBgContainer,
              position: "relative",
            }}
            className={classes.mapContent}
          >
            <Maps overlayHeight={"394px"}></Maps>

            {(socketDataLoaded || graphlqlMapCtx.graphqlMapDataLoaded) && (
              <div
                // className={classes.widgetWrapper}
                style={{ width:290, height:"auto",  position: "absolute", right: 10, top: 52, zIndex:0 }}
              >
                <Widget />
              </div>
            )}

            {/* Today Activity */}
            {(socketDataLoaded || graphlqlMapCtx.graphqlMapDataLoaded) && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  padding: "10px 20px",
                  backgroundColor: "rgba(255, 255, 255, .7)",
                  borderRadius: 5,
                }}
              >
                <TodaysActivity />
              </div>
            )}

            {(socketDataLoaded || graphlqlMapCtx.graphqlMapDataLoaded) && (
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

            {(socketDataLoaded || graphlqlMapCtx.graphqlMapDataLoaded) && (
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

            {(socketDataLoaded ||
              clientCtx.onClick ||
              graphlqlMapCtx.graphqlMapDataLoaded) && (
              <div className={classes.speedOverlay}>
                <VehicleSpeed
                  speed={
                    speedValueFinal === "undefined" ||
                    speedValueFinal === "null"
                      ? 0
                      : speedValueFinal
                  }
                />
              </div>
            )}

            {/* Address */}
            {(socketDataLoaded || graphlqlMapCtx.graphqlMapDataLoaded) && (
              <div className={classes.vehicleAddressOverlay}>
                <VehicleAddressLocation
                  address={socketCtx.address}
                  addressFromDb={graphlqlMapCtx.addressFromDb}
                />
              </div>
            )}
          </Content>
        </Col>
        {locationId != "null" && (
          <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
            {!isShowReport ? (
              <Button onClick={switchReports}>Show Reports</Button>
            ) : (
              <Button
                onClick={() => {
                  setIsShowReport(false);
                }}
              >
                Hide Report
              </Button>
            )}
          </Col>
        )}

        {isShowReport && (
          <Col span={24}>
            <Tabs
              defaultActiveKey="1"
              centered
              items={[
                {
                  label: "Trips",
                  key: "1",
                  children: (
                    <TripsTable
                      fromDate={"2023-07-13T19:00:00.000Z"}
                      toDate={"2023-07-14T14:45:58.503Z"}
                      selectedLocationId={locationId}
                    />
                  ),
                },
                {
                  label: "Events",
                  key: "2",
                  children: (
                    <EventsTable
                      fromDate={"2023-07-13T19:00:00.000Z"}
                      toDate={"2023-07-14T14:45:58.503Z"}
                      selectedLocationId={locationId}
                    />
                  ),
                },
                {
                  label: "Routes",
                  key: "3",
                  children: (
                    <RoutesTable
                      fromDate={"2023-07-13T19:00:00.000Z"}
                      toDate={"2023-07-14T14:45:58.503Z"}
                      selectedLocationId={locationId}
                    />
                  ),
                },
              ]}
            />
          </Col>
        )}
      </Row>
    </div>
  );
});

export default HomePage;
