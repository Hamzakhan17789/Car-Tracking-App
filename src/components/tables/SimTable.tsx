import React, { useState, useEffect } from "react";
import type { TableProps } from "antd";
import { Button, Space, Table, Spin } from "antd";
import { Avatar } from "antd";

// import type { FC } from "react";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { PoweroffOutlined, CheckOutlined } from "@ant-design/icons";
import TableActionDropDown from "../dropdowns/TableActionDropDown";
import { useQuery } from "@apollo/client";
import { GET_ALL_NETWORK } from "../../graphqlOperations/querry";

interface DataType {
  key: string;
  network: string;
  simNo: string;
  serialNo: string;
  status: string;
  action: JSX.Element;
}

const data: DataType[] = [
  {
    key: "1",
    network: "Ufone",
    simNo: "3210125114815112",
    serialNo: "969844584711",
    status: "Active",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    network: "Jazz",
    simNo: "3210125114815112",
    serialNo: "969844584711",
    status: "Active",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
];
const SimTable = React.memo(
  ({ searchData, errorData, loadingData, searchInput }: any) => {
    const [orgId, setOrgId] = useState<number | null | any>();

    useEffect(() => {
      const lsOrgId = localStorage?.getItem("orgId");
      setOrgId(Number(lsOrgId));
    }, []);
    const { data, loading, error } = useQuery(GET_ALL_NETWORK, {
      variables: {
        limit: 1000,
        page: 10,
        where: {
          org: {
            id: orgId,
          },
        },
      },
      skip: orgId === null || isNaN(orgId),
    });

    // //////console.log(data?.getAllNetwork);
    const [filteredInfo, setFilteredInfo] = useState<
      Record<string, FilterValue | null>
    >({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

    const handleChange: TableProps<DataType>["onChange"] = (
      pagination,
      filters,
      sorter
    ) => {
      //////////console.loglog("Various parameters", pagination, filters, sorter);
      setFilteredInfo(filters);
      setSortedInfo(sorter as SorterResult<DataType>);
    };

    const clearFilters = () => {
      setFilteredInfo({});
    };

    const clearAll = () => {
      setFilteredInfo({});
      setSortedInfo({});
    };

    const setAgeSort = () => {
      setSortedInfo({
        order: "descend",
        columnKey: "age",
      });
    };

    const columns: ColumnsType<DataType> = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Network",
        dataIndex: "network",
        key: "network",
        // filters: [
        //   { text: "Joe", value: "Joe" },
        //   { text: "Jim", value: "Jim" },
        // ],
        // filteredValue: filteredInfo.name || null,
        // // onFilter: (value: string, record) => record.name.includes(value),
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
        // ellipsis: true,
        render: (title) => <>{title}</>,
      },
      {
        title: "Sim #",
        dataIndex: "number",
        key: "number",
        // sorter: (a, b) => a.age - b.age,
        // sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
        // ellipsis: true,
      },
      {
        title: "Serial #",
        dataIndex: "serialNo",
        key: "serialNo",
        // filters: [
        //   { text: "London", value: "London" },
        //   { text: "New York", value: "New York" },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value: string, record) => record.address.includes(value),
        // sorter: (a, b) => a.address.length - b.address.length,
        // sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
        // ellipsis: true,
      },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        // filters: [
        //   { text: "London", value: "London" },
        //   { text: "New York", value: "New York" },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value: string, record) => record.address.includes(value),
        //   sorter: (a, b) => a.address.length - b.address.length,
        //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
        //   ellipsis: true,
        render: (item) => {
          return item == "active" ? "Active" : "Not Active";
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        // filters: [
        //   { text: "London", value: "London" },
        //   { text: "New York", value: "New York" },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value: string, record) => record.address.includes(value),
        // sorter: (a, b) => a.address.length - b.address.length,
        // sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
        // ellipsis: true,
        render: () => {
          return <TableActionDropDown />;
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={searchInput ? searchData : data?.getAllNetwork}
        loading={{ indicator: <Spin />, spinning: loading || loadingData }}
        onChange={handleChange}
        scroll={{ x: "auto" }}

        // scroll={{ x: 500, y: "calc(100vh - 280px)" }}
      />
    );
  }
);

export default SimTable;
