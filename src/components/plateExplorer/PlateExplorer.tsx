import React, { useContext, useEffect, useState } from "react";
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
  Button,
  Spin,
  message,
} from "antd";
// import explorerData from "../../../data/explorerData";
import {
  plateExplorerHomeOption,
  clientDetailOptions,
} from "../../data/plate-explorer-data";

import ExplorerData from "../../data/explorerData";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content, Footer } = Layout;
import classes from "./SideNav.module.css";
// import SideNavCard from "../../cards/SideNavCard";
import SideNavCard from "../cards/SideNavCard";
import explorerData from "../../data/explorerData";
import PlateExplorerTabs from "./plateExplorerTabs";
import { useRouter } from "next/router";
import PlateExplorerListItem from "./PlateExplorerListItem";
import { GraphQlOperationContext } from "../../context/graphqlOperationsContext/graphqlOperationsContext";

// import SideNavTabs from "../../tabs/SideNavTabs";

const PlateExplorer = React.memo(
  ({ plateExplorerOptions, tabBarGutterValue }: any) => {
    ////console.log('plate explorer')
    ////console.log(plateExplorerOptions)
    ////console.log(tabBarGutterValue)

    const [open, setOpen] = useState(true);
    const [placement, setPlacement] =
      useState<DrawerProps["placement"]>("left");
    const [plateExplorerState, setPlateExplorerState] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };

    const onChange = (e: RadioChangeEvent) => {
      setPlacement(e.target.value);
    };
    const router = useRouter();
    const graphQLGetAllClientsCtx = useContext(GraphQlOperationContext);

    const [showClientList, setShowClientList] = useState<boolean>(false);
    const [showVehicleList, setShowVehicleList] = useState<boolean>(false);

    useEffect(() => {
      if (router.pathname === "/monitor" || router.pathname === "alarms") {
        setShowClientList(true);
      } else if (router.pathname === "/clients/[clientId]") {
        setShowClientList(false);
        setShowVehicleList(true);
        console.log("it  is  clients page");
        //   setClientID(router.query.clientId);
      }
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allClients, setAllClients] = useState<any[]>([]);
    const [isError, setIsError] = useState<boolean>(false);

  const [errorMessageApi , contextHolder] = message.useMessage()



    useEffect(() => {
      setIsLoading(graphQLGetAllClientsCtx.loading);
      setAllClients(graphQLGetAllClientsCtx.mergeData);

      if (graphQLGetAllClientsCtx.error) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    }, [
      graphQLGetAllClientsCtx.loading,
      graphQLGetAllClientsCtx.mergeData?.length,
      graphQLGetAllClientsCtx.error,
    ]);

    const showPlateExplorerListItems = isLoading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Spin />
      </div>
    ) : allClients?.length <= 0 && !allClients ? (
      <p>No Results Found</p>
    ) : isError ? (
      <p>Error Fetching Data</p>
    ) : (
      <PlateExplorerListItem
        showClientList={showClientList}
        showVehicleList={showVehicleList}
      />
    );
    console.log("allClients", allClients);
    console.log(isLoading, graphQLGetAllClientsCtx?.mergeData);
    console.log(showClientList, showVehicleList);
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "10px 0px",
            position: "relative",
          }}
        >
          <Row
            style={{
              width: "100%",
            }}
          >
            <Col span={24}>
              <PlateExplorerTabs
                plateExplorerOptions={plateExplorerOptions}
                tabBarGutterValue={tabBarGutterValue}
              />
            </Col>
            <Col span={24}>{showPlateExplorerListItems}</Col>
          </Row>
        </div>
      </>
    );
  }
);

export default PlateExplorer;
