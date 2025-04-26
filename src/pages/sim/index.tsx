import { useQuery } from "@apollo/client";
import { Button, Col, Row, Input, Card } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LayoutDesign from "../../components/layout/FullLayout";
import SimTable from "../../components/tables/SimTable";
import { GET_ALL_NETWORK_SEARCH } from "../../graphqlOperations/querry";
// import classes from "./clients.module.css";

const { Search } = Input;

const Sim = React.memo(() => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [orgId, setOrgId] = useState<number | null>();
  ////console.log("Sim page");
  useEffect(() => {
    const lsOrgId = localStorage?.getItem("orgId");
    setOrgId(Number(lsOrgId));
  }, []);
  const { data, loading, error } = useQuery(GET_ALL_NETWORK_SEARCH, {
    variables: {
      limit: 1000,
      page: 10,
      where: {
        id: Number(searchInput),
        org: {
          id: orgId,
        },
      },
    },
    skip:
      searchInput === null ||
      orgId === null ||
      orgId === undefined ||
      typeof orgId !== "number",
  });

  const onSearch = (e: any) => {
    setSearchInput(e.target.value);
    ////console.log("search input  function");
  };
  return (
    <div style={{ margin: "10px" }}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row>
            <Col span={12} sm={12} xs={24}>
              <h1 style={{ fontSize: "24px" }}>SIM</h1>
            </Col>
            <Col span={12} sm={12} xs={24}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Search
                  // options={options}
                  style={{ width: "240px", marginRight: "5px" }}
                  // onSelect={onSelect}
                  onChange={onSearch}
                  type="number"
                  // onSearch={onSearch}
                  placeholder="Search By Sim ID"
                />

                <Link href={"/addSim"}>
                  <Button type="primary" style={{ width: "109px" }}>
                    ADD SIM
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <SimTable
            searchData={data?.getAllNetwork}
            loadingData={loading}
            errorData={error}
            searchInput={searchInput}
          />
        </Col>
      </Row>
    </div>
  );
});

export default Sim;
