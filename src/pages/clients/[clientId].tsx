import { useRouter } from "next/router";
import React, { useCallback, useState , useContext} from "react";
import LayoutDesign from "../../components/layout/FullLayout";
import {
  Button,
  Card,
  Col,
  Collapse,
  Image,
  Layout,
  Row,
  theme,
  Tabs,
} from "antd";
import PlateExplorer from "../../components/plateExplorer/PlateExplorer";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { clientDetailOptions } from "../../data/plate-explorer-data";
import AlarmTable from "../../components/tables/AlarmTable";
import classes from "./clients.module.css";
import Maps from "../../components/map";
import type { TabsProps } from "antd";
import ClientDetails from "../../components/clientDetailsPageComponents/ClientDetailsTabContent/ClientDetailsTabContent";
import VehicleDetailsTabContent from "../../components/clientDetailsPageComponents/VehicleDetailsTabContent/VehicleDetailsTabContent";
import JourneyTabContent from "../../components/clientDetailsPageComponents/JourneyTabContent/JourneyTabContent";
import JourneyTabOverlay from "../../components/clientDetailsPageComponents/JourneyTabContent/JourneyTabOverlay";
import CommandsTabContent from "../../components/clientDetailsPageComponents/CommandsTabContent/CommandsTabContent";
import WatermarkPage from "../../components/clientDetailsPageComponents/WatermarkPage";
import Alarms from "../../components/clientDetailsPageComponents/alarms";
import { RoutesContext } from "../../context/routesContext/RoutesContext";

const { Content, Sider } = Layout;
const TabPane = Tabs.TabPane;

export const clientDetailTabs: TabsProps["items"] = [
  {
    key: "1",
    label: `Client Details`,
    children: "Client Details",
  },
  {
    key: "2",
    label: `Vehicle Information`,
    children: "Vehicle Information",
  },
  {
    key: "3",
    label: `Journey`,
    children: "Journey",
  },
  {
    key: "4",
    label: `Alarms`,
    children: "Alarms",
  },
  {
    key: "5",
    label: `Logs`,
    children: "Logs",
  },
  {
    key: "6",
    label: `Commands`,
    children: "Commands",
  },
];

const ClientDetailPage = React.memo(({collapsed, setCollapsed} : any) => {
//  const [collapsed, setCollapsed] = useState(false);
////console.log('CLIENT ID ')
  const router = useRouter();
  const routesCtx = useContext(RoutesContext)
  const { clientId } = router.query;
  const [siderSpan, setSiderSpan] = useState("270px");
  const [contentSpan, setContentSpan] = useState("270px");
  const [buttonLeftPosition, setbuttonLeftPosition] = useState("475px");
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [keyState, setKeyState] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const buttonHandler =useCallback( () => {
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

  },[isButtonClick])

  return (
   
      <div
        style={{
          margin: "10px 24px 10px 5px",
        }}
      >
        <Button
          size="small"
          style={{
            // position: "absolute",
            top: "100px",
            left:
              !collapsed && !isButtonClick
                ? "474px"
                : collapsed && isButtonClick
                ? "100px"
                : isButtonClick && !collapsed
                ? "200px"
                : "374px",

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
          // span={siderSpan}

          style={{
            backgroundColor: "white",
            // height: "100%",
            height: "calc(100vh - 120px)",
            padding: "0px",
            width: "270px", //270px
            position: "fixed",
            display: isButtonClick ? "none" : "block",
            overflowY: "auto",
          }}
        >
          <PlateExplorer
            plateExplorerOptions={clientDetailOptions}
            tabBarGutterValue={6}
          />
        </div>
        <Row gutter={[12, 12]} style={{ marginLeft: contentSpan }}>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Tabs
                  defaultActiveKey={keyState}
                  tabBarGutter={80}
                  className={classes.tabStyle}
                  centered
                  tabBarStyle={{
                    margin: "0px",
                  }}
                  onChange={(e) => {
                    setKeyState(e);
                  }}
                >
                  {/* Client Details Tab */}
                  <TabPane
                  
                    key="1"
                    tab={
                      
                      <p
                  //   onClick={routesCtx.removingVehicleIDFromSessionStorage()}
                        className={
                          "1" !== keyState
                            ? classes.tabTextStyle
                            : classes.tabStyleSelected
                        }
                      >
                        Client Details
                      </p>
                    }
                    style={{ background: "#f5f5f5" }}
                  >
                    <ClientDetails />
                  </TabPane>
                  {/* Vehicle Information Tab */}
                  <TabPane
                    key="2"
                    tab={
                      <p
                        className={
                          "2" !== keyState
                            ? classes.tabTextStyle
                            : classes.tabStyleSelected
                        }
                      >
                        Vehicle Details
                      </p>
                    }
                    style={{ background: "#f5f5f5" }}
                  >
                    <VehicleDetailsTabContent />
                  </TabPane>
                  {/* Journey */}
                  <TabPane
                    key="3"
                    tab={
                      <p
                        className={
                          "3" !== keyState
                            ? classes.tabTextStyle
                            : classes.tabStyleSelected
                        }
                      >
                        Journey
                      </p>
                    }
                    style={{ background: "#f5f5f5" }}
                  >
                    <JourneyTabContent />
                  </TabPane>
                  {/* Alarms */}
                  <TabPane 
                  
                    key="4"
                    tab={
                      <p
                     
                        className={
                          "4" !== keyState
                            ? classes.tabTextStyle
                            : classes.tabStyleSelected
                        }
                      >
                        Alarms
                      </p>
                    }
                    style={{ background: "#f5f5f5" }}
                  >
                    <Alarms />
                  </TabPane>
                  {/* Logs */}
                  <TabPane
                    key="5"
                    tab={
                      <p
                        className={
                          "5" !== keyState
                            ? classes.tabTextStyle
                            : classes.tabStyleSelected
                        }
                      >
                        Logs
                      </p>
                    }
                    style={{ background: "#f5f5f5" }}
                  >
                    <WatermarkPage />
                  </TabPane>
                  {/* Commands */}
                  <TabPane
                    key="6"
                    tab={
                      <p
                        className={
                          "6" !== keyState
                            ? classes.tabTextStyle
                            : classes.tabStyleSelected
                        }
                      >
                        Commands
                      </p>
                    }
                    style={{ background: "#f5f5f5" }}
                  >
                    <CommandsTabContent />
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    
  );
});

export default ClientDetailPage;
