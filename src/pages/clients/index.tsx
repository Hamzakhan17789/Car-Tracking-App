import { Button, Col, Row, Input, Card, message } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import LayoutDesign from "../../components/layout/FullLayout";
import SideNavSearchBox from "../../components/searchBox/SideNavSearchBox";
import ClientsTable from "../../components/tables/ClientsTable";
import { useQuery } from "@apollo/client";
import { GET_ALL_CLIENTS_SEARCH } from "../../graphqlOperations/querry";
import dynamic from "next/dynamic";
//import "../../styles/globals.css"

const { Search } = Input;

const Clients = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [orgId, setOrgId] = useState<number | null>();

  useEffect(() => {
    const lsOrgId = localStorage?.getItem("orgId");
    setOrgId(Number(lsOrgId));
  }, []);

  const [searchInput, setSearchInput] = useState();
 // ////console.log(searchInput)
  const whereCondition = { id: null, org: {} };
const skip = Object.values(whereCondition).every((value) => value === null || value === undefined || value === '');

  const { data, loading, error } = useQuery(GET_ALL_CLIENTS_SEARCH, {
    variables: {
   
   //skip: skip,
      limit: 10,
      page: 1,
      where: {
        id: Number(searchInput),
        org: {
          id: orgId,
        },

      },
  },
  skip: searchInput === null || orgId === null || orgId === undefined || typeof orgId !== "number",
  });
  // //////console.log(Number(searchInput));
  // //////console.log("searchData", data);

  ////////////console.loglog(data, loading, error);
  const onSearch = (e: any) => {
    ////////////console.loglog(e);
    setSearchInput(e.target.value);
  };

  const ClientsTableComponent =dynamic(() => import("../../components/tables/ClientsTable"), {
    ssr: false,
  });
  


  return (
   
      <div style={{ margin: "10px" }}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Row>
              <Col span={12} sm={12} xs={24}>
                <h1 style={{ fontSize: "24px" }}>CLIENTS</h1>
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
                    placeholder="Search By Client ID"
                  />
                  <Link href={"/addClients"}>
                    <Button type="primary" style={{ width: "109px" }}>
                      ADD CLIENT
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <ClientsTable
              searchData={data?.getAllClient}
              loadingData={loading}
              errorData={error}
              searchInput={searchInput}
            />
          </Col>
        </Row>
      </div>

  );
};





export default Clients;
   