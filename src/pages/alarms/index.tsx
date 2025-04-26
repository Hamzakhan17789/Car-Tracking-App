import React, { useEffect, useState , useContext } from "react";
import LayoutDesign from "../../components/layout/FullLayout";
import { Button, Card, Col, Collapse, Image, Layout, Row, theme } from "antd";
import AlarmTable from "../../components/tables/AlarmTable";
import ExplorerLayout from "../../components/layout/ExplorerLayout";
import PlateExplorerTabs from "../../components/plateExplorer/plateExplorerTabs";
import {
  clientDetailOptions,
  plateExplorerHomeOption,
} from "../../data/plate-explorer-data";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import PlateExplorer from "../../components/plateExplorer/PlateExplorer";
import { SocketContext } from "../../context/socketContext/socketContext";
import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "../../graphqlOperations/query";
import GraphQlOperationProvider, { GraphQlOperationContext } from "../../context/graphqlOperationsContext/graphqlOperationsContext";
import { GET_OWN_ORG } from "../../graphqlOperations/querry";

const { Content, Sider } = Layout;

const Alarms = React.memo(({collapsed, setCollapsed} : any) => {
//  const [collapsed, setCollapsed] = useState(false);
  const [siderSpan, setSiderSpan] = useState("270px");
  const [contentSpan, setContentSpan] = useState("270px");
  const [buttonLeftPosition, setbuttonLeftPosition] = useState("455px");
  const [isButtonClick, setIsButtonClick] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();



// const {data, loading, error  } = useQuery(GET_ALL_EVENTS,{
//   variables:{
//     locationId:2,
//     type: "allEvents"
//   }
// })




const { data, loading, error, refetch } = useQuery(GET_OWN_ORG);







const [orgId ,  setOrgId] = useState(null)
const graphqlOperationCtx = useContext(GraphQlOperationContext)

useEffect(() => {
  if (data) {
    setOrgId(data?.getOwnOrg[0]?.id);
    localStorage.setItem("orgId", data?.getOwnOrg[0]?.id);
    sessionStorage.setItem("ORGID", data?.getOwnOrg[0]?.id);
    graphqlOperationCtx.setOrgID(data?.getOwnOrg[0]?.id);
  }
}, [data,  data?.getOwnOrg[0]?.id]);

useEffect(() => {

  return () => {
    graphqlOperationCtx.setOrgID(null);
  };
}, []);



////console.log("alarms data",data)

  const buttonHandler = () => {
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
  };

const sockectCtx = useContext(SocketContext)
 useEffect(()=>{
//sockectCtx.socket?.disconnect()
sockectCtx.socketDisconnectHandler()
//////console.log("alarms useeffect runs")
 },[])

  return (
   <GraphQlOperationProvider>
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
          // span={siderSpan}

          style={{
            backgroundColor: "white",
            // height: "100%",
            height: "calc(100vh - 120px)",
            padding: "0px",
            width: "250px", //270px
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
        <Row gutter={[32, 12]} style={{ marginLeft: contentSpan }}>
          <Col span={24}>
            <div style={{ margin: "10px" }}>
              <h2>Alarms</h2>
            </div>
            {/* <PlateExplorerTabs plateExplorerOptions={clientDetailOptions} /> */}
          </Col>
          <Col span={24}>
            <AlarmTable />
          </Col>
        </Row>
      </div>
      </GraphQlOperationProvider>
   
  );
});

export default Alarms;
