import React, { useState, useEffect } from "react";
import { Button, Col, Row, Input, Card } from "antd";
import Link from "next/link";
import LayoutDesign from "../../components/layout/FullLayout";
import VehicleTable from "../../components/tables/VehicleTable";
import { useQuery } from "@apollo/client";
import { GET_ALL_VEHICLES_SEARCH } from "../../graphqlOperations/querry";
// import classes from "./clients.module.css";

const { Search } = Input;

const Vehicle = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [orgId, setOrgId] = useState<number | null>();

  useEffect(() => {
    const lsOrgId = localStorage?.getItem("orgId");
    setOrgId(Number(lsOrgId));
  }, []);
  const { loading, data, error } = useQuery(GET_ALL_VEHICLES_SEARCH, {
    variables: {
      limit: 1000,
      page: 1,
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
  // //////console.log("vehicle data");
  const onSearch = (e: any) => {
    // setSearchInput(e);
    ////////////console.loglog(e.target.value);
    setSearchInput(e.target.value);
  };
  return (
    <div style={{ margin: "10px" }}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row>
            <Col span={12} sm={12} xs={24}>
              <h1 style={{ fontSize: "24px" }}>VEHICLE</h1>
            </Col>
            <Col span={12} sm={12} xs={24}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Search
                  // options={options}
                  style={{ width: "240px", marginRight: "5px" }}
                  // onSelect={onSelect}
                  // onSearch={onSearch}
                  type="number"
                  onChange={onSearch}
                  placeholder="Search By Vehicle Id"
                />

                <Link href={"/addVehicle"}>
                  <Button type="primary" style={{ width: "109px" }}>
                    ADD Vehicle
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <VehicleTable
            searchData={data?.getAllLocation}
            loadingData={loading}
            errorData={error}
            searchInput={searchInput}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Vehicle;
