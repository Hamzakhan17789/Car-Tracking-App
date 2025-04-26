import React, { useState, useEffect } from "react";
import { Col, Row, Card, theme, Layout, Spin } from "antd";
import classes from "../../../pages/clients/clients.module.css";

import Maps from "../../map";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_ONE_CLIENT_DETAIL } from "../../../graphqlOperations/querry";
import StatisticsModal from "../../modal/StatisticsModal";

const { Content } = Layout;
const ClientDetails = React.memo(() => {
  const router = useRouter();
  // const [routePath, setRoutePath] = useState<string[] | undefined | string>();
  const routePath = router?.query?.clientId;
  //////console.log("routePAth", routePath);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [orgID, setOrgId] = useState<number | null>();
  useEffect(() => {
    let isOrgId: number | null = Number(localStorage.getItem("orgId"));
    setOrgId(isOrgId);
  }, []);

 ////console.log("Clients detail tab content");
  const errorMessage = "Failed to Fetch";

  const { data, loading, error } = useQuery(GET_ONE_CLIENT_DETAIL, {
    variables: {
      where: {
        org: {
          id: Number(orgID),
        },
        id: Number(routePath),
      },
    },
  });


  return (
    <Row style={{ marginTop: "5px" }}>
      <Col span={24}>
        <Card
          style={{
            // margin: "10px 10px",
            //   padding: 10,
            minHeight: "210px",
            marginBottom: "5px",
            // height: "100%",
            background: colorBgContainer,
          }}
          bodyStyle={{ padding: "5px" }}
        >
          <Row gutter={[42, 8]}>
            <Col span={24} xl={12} lg={12}>
              {/* <ul style={{ listStyle: "none" }}> */}
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",

                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Name</p>

                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.firstName == null ||
                      data?.getAllClient[0]?.lastName == null
                        ? "-"
                        : `${data?.getAllClient[0]?.firstName}  ${data?.getAllClient[0]?.lastName}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Father Name</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.fatherName == null
                        ? "-"
                        : `${data?.getAllClient[0]?.fatherName}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>CNIC</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.identity == null
                        ? "-"
                        : `${data?.getAllClient[0]?.identity}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Address</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.address == null
                        ? "-"
                        : `${data?.getAllClient[0]?.address}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Contact Number</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.contactNumber == null
                        ? "-"
                        : `${data?.getAllClient[0]?.contactNumber}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Email</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.email == null
                        ? "-"
                        : `${data?.getAllClient[0]?.email}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
            </Col>
            <Col span={24} xl={12} lg={12}>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Client Type</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.clientType == null
                        ? "-"
                        : `${data?.getAllClient[0]?.clientType}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Secondary Contact</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.secondaryName == null ||
                      data?.getAllClient[0]?.secondaryNumber == null
                        ? "-"
                        : `${data?.getAllClient[0]?.secondaryName}  (${data?.getAllClient[0]?.secondaryNumber})`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Emergency Contact</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.emergencyName == null ||
                      data?.getAllClient[0]?.emergencyNumber == null
                        ? "-"
                        : `${data?.getAllClient[0]?.emergencyName} (${data?.getAllClient[0]?.emergencyNumber})`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Password</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.password == null
                        ? "-"
                        : `${data?.getAllClient[0]?.password}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Emergency Password</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.emergencyPassword == null
                        ? "-"
                        : `${data?.getAllClient[0]?.emergencyPassword}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",

                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Security Question</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.securityQuestion == null
                        ? "-"
                        : `${data?.getAllClient[0]?.securityQuestion}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  padding: "5px",

                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Answer</p>
                {loading ? (
                  <Spin size="small" />
                ) : !loading && error === undefined ? (
                  <p style={{ color: "#495057" }}>
                    {`${
                      data?.getAllClient[0]?.securityAnswer == null
                        ? "-"
                        : `${data?.getAllClient[0]?.securityAnswer}`
                    } `}
                  </p>
                ) : (
                  <p style={{ color: "#495057" }}>{errorMessage}</p>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        {/* <Content className={classes.clientDetailsMapContent}>
         <Maps
           overlayHeight={"394px"}
           fullScreenControlOption={true}
           toggleMapHandler={true}
         />
       </Content> */}
       {<StatisticsModal isModalOpen={false} />}
      </Col>
    </Row>
  );
});

export default ClientDetails;
