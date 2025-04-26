import React, { useState, useContext, useEffect, useCallback, useMemo, } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, } from "@ant-design/icons";
import { Dropdown, Space, Layout, Menu, theme } from "antd";
import { DownOutlined, SmileOutlined, LogoutOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import Logo from "./../../../../public/logo.svg";
import LogoLight from "./../../../../public/logo.png";

import { routes } from "./routes";
import Link from "next/link";
import { Router, useRouter } from "next/router";

import Image from "next/image";

import classes from "./LayoutDesign.module.css";
import { AuthContext } from "../../../context/AuthContext";
import type { MenuProps } from "antd";
import NotificationDrawer from "../../drawer/NotificationDrawer";
import { SocketContext } from "../../../context/socketContext/socketContext";
import { GraphqlMapContext } from "../../../context/graphqlOperationsContext/graphqlMapContext";
import Login from "../../../pages/login";
import dynamic from "next/dynamic";

import {
  CalendarIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  GlobeAsiaAustraliaIcon,
  Bars3Icon,
  XMarkIcon,

  HomeIcon,
  Squares2X2Icon,
  ComputerDesktopIcon,
  BellAlertIcon,
  UsersIcon,
  TruckIcon,
  CpuChipIcon,
  IdentificationIcon,
  MapPinIcon,
  ChartPieIcon,
  AdjustmentsHorizontalIcon,
  ArrowLeftOnRectangleIcon,

  BellIcon,

} from '@heroicons/react/24/outline';

import Head from 'next/head';

const { Header, Sider, Content, Footer } = Layout;

const LayoutDesign = React.memo(
  ({
    collapsed,
    children,
    setCollapsed,
    clickedOnRoute,
    setClickedOnRoute,
  }: any) => {
    // const [collapsed, setCollapsed] = useState<boolean>(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const { signout } = useContext(AuthContext);
    const router = useRouter();
    const [link] = useState<String>(router.pathname);
    //console.log("collapse From Layout:", collapsed);
    const items: MenuProps["items"] = [
      {
        key: "logout",
        label: (
          <a
            onClick={() => {
              signout();
              socketCtx.socketDisconnectHandler();
              // socketCtx.setSocketDataLoaded(false)
              graphlqlMapCtx.setGraphqlMapDataLoaded(false);
              // console.log(graphlqlMapCtx.graphqlMapDataLoaded)
            }}
          >
            Logout
          </a>
        ),
        icon: <LogoutOutlined />,
      },
    ];
    // console.log("Full Layout Index");
    let orgId;
    if (typeof window !== "undefined") {
      orgId = sessionStorage?.getItem("ORGID");
    }
    const socketCtx = useContext(SocketContext);
    const graphlqlMapCtx = useContext(GraphqlMapContext);

    //

    const [item, setItem] = useState([
      {
        key: "/dashboard",
        icon: <Squares2X2Icon style={{ width: 20, height: 20 }} />,
        label: "Dashboard",
      },
      {
        key: "/monitor",
        icon: <ComputerDesktopIcon style={{ width: 20, height: 20 }} />,
        label: "Monitor",
      },
      {
        key: "/alarms",
        icon: <BellAlertIcon style={{ width: 20, height: 20 }} />,
        label: "Alarms",
      },
      {
        key: "/clients",
        icon: <UsersIcon style={{ width: 20, height: 20 }} />,
        label: "Clients",
      },
      {
        key: "/vehicle",
        icon: <TruckIcon style={{ width: 20, height: 20 }} />,
        label: "Vehicles",
      },
      {
        key: "/device",
        icon: <CpuChipIcon style={{ width: 20, height: 20 }} />,
        label: "Devices",
      },
      {
        key: "/sim",
        icon: <IdentificationIcon style={{ width: 20, height: 20 }} />,
        label: "SIMs",
      },
      {
        key: "/geoFence",
        icon: <MapPinIcon style={{ width: 20, height: 20 }} />,
        label: "GeoFence",
      },
      {
        key: "#",
        icon: <ChartPieIcon style={{ width: 20, height: 20 }} />,
        label: "Reports",
        children: [
          {
            key: "/trips",
            label: "Trips",
          },
          {
            key: "/route",
            label: "Routes",
          },
          {
            key: "/events",
            label: "Events",
          },
          {
            key: "/replay",
            label: "Journey",
          },
        ],
      },
      {
        key: "/settings",
        icon: <AdjustmentsHorizontalIcon style={{ width: 20, height: 20 }} />,
        label: "Settings",
      },
      {
        key: "/logout",
        icon: <ArrowLeftOnRectangleIcon style={{ width: 20, height: 20 }} />,
        label: (
          <a
            onClick={() => {
              signout();
              socketCtx.socketDisconnectHandler();
              // socketCtx.setSocketDataLoaded(false)
              graphlqlMapCtx.setGraphqlMapDataLoaded(false);
              // console.log(graphlqlMapCtx.graphqlMapDataLoaded)
            }}
          >
            Logout
          </a>
        ),
      },
    ]);

    // const menuItems =item.map((item) => {
    //   const menuItem = (
    //     <Link href={item?.key}>
    //       <p>{item?.label}</p>
    //     </Link>
    //   );
    //   return {
    //     ...item,
    //     label: menuItem,
    //   };
    // });

    const menuItems = useMemo(() => {
      return item.map((item) => {
        const menuItem = (
          <Link href={item?.key}>
            <p>{item?.label}</p>
          </Link>
        );
        return {
          ...item,
          label: menuItem,
        };
      });
    }, [item]);
    // useEffect(()=>{
    //   setItem(menuItems)
    // },[])

    let GLSToken;
    const [token, setToken] = useState<any>(null);
    if (typeof window !== "undefined") {
      GLSToken = sessionStorage.getItem("token");
    }

    useEffect(() => {
      if (typeof window !== "undefined") {
        const LSToken = sessionStorage.getItem("token");
        setToken(LSToken);
      }
    }, [GLSToken]);

    // console.log(collapsed, "collapsed")

    const LoginComponent = dynamic(() => import("../../../pages/login/index"), {
      ssr: false,
    });

    return (
      <>
        <Head>
          <title>s3ctr | Security and tracking, made simple.</title>
          <meta name="description" content="Track your vehicles, protect your assets, and keep your fleet safe and secure with s3ctr. Our cloud-based platform provides real-time visibility and control over your fleet, so you can always know where your assets are and whats happening." key="s3ctr, fleet management, vehicle tracking, security surveillance, business security, asset tracking, 24/7 surveillance, easy to use" />
          <meta property="og:title" content="Track your vehicles, protect your assets, and keep your fleet safe and secure with s3ctr." />
          <meta
            property="og:description"
            content="Track your vehicles, protect your assets, and keep your fleet safe and secure with s3ctr."
          />
        </Head>
       (
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              breakpoint="lg"
              trigger={null}
              collapsible
              collapsed={collapsed}
              style={{ overflow: "hidden" }}
              onCollapse={(value) => setCollapsed(value)}
              collapsedWidth="100"
            >
              <div style={{ margin: "20px 10px 20px 10px" }}>
                {orgId == "3" ? (
                  <Image
                    src={LogoLight}
                    width={"140px"}
                    height={"28.23px"}
                    alt="logo"
                  />
                ) : (
                  <Image
                    src={LogoLight}
                    width={"140px"}
                    height={"28.23px"}
                    alt="logo"
                  />
                )}
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[`${link}`]}
                onClick={({ key }) => {
                  //console.log("changed route");
                  socketCtx.socketDisconnectHandler();
                  graphlqlMapCtx.setCoordinates([]);
                  graphlqlMapCtx.setRouteChanged(true);

                  if (key === "signout") {
                    //signout Logic
                    signout();
                  } else {
                    router.push(key);
                  }
                }}
                items={menuItems}
              />
            </Sider>
            <Layout className="site-layout">
              <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                  // position: "relative",
                  height: "60px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0px 22px 0px 0px",
                  }}
                >
                  {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: classes.trigger,
                      onClick: () => setCollapsed(!collapsed),
                    }
                  )}
                  <div>
                    <NotificationDrawer />
                    <Dropdown menu={{ items }}>
                      <a
                        onClick={(e) => {
                          // (e);
                          // if (key == "logout") {
                          //   //signout Logic
                          //   signout();
                          // }
                        }}
                      >
                        <Space>
                          Admin
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                </div>
                {/* <Menu mode="horizontal" items={items1} /> */}
              </Header>
              <div className={classes.content}>{children}</div>
              {/* <Content
        style={{
          margin: "24px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        {props.children}
      </Content> */}
              <Footer
                style={{
                  textAlign: "center",
                  padding: "10px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p style={{ color: "#74788D", fontSize: "11px", alignSelf: "center", }}                >
                {/* {(new Date().getFullYear())} © DSPACO INC. Version 0.1.0 */}
                </p>
              </Footer>
            </Layout>
          </Layout>
        )}
      </>
    );
  }
);

export default LayoutDesign;
