import React, { useState, useEffect } from "react";
import { Dropdown, TableProps, Table, Button, Spin } from "antd";
import { Avatar } from "antd";
import { useQuery } from "@apollo/client";

import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { PoweroffOutlined, CheckOutlined } from "@ant-design/icons";
import { render } from "react-dom";
import type { MenuProps } from "antd";
import TableActionDropDown from "../dropdowns/TableActionDropDown";
import { GET_ALL_DEVICES } from "../../graphqlOperations/querry";

interface DataType {
  key: string;
  brandName: string;
  deviceType: string;
  model: string;
  serialNo: string;
  imei: string;
  status: string;
  simNo: string;
  action: JSX.Element;
}

const customData: DataType[] = [
  {
    key: "1",
    brandName: "Waqas",
    deviceType: "3210125114815112",
    model: "AFR-2022",
    serialNo: "waqas@gmail.com",
    imei: "611651561561561",
    status: "Active",
    simNo: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    brandName: "Talha",
    deviceType: "3210125114815112",
    model: "AFR-2022",
    serialNo: "talha@gmail.com",
    imei: "711651561561561",
    status: "Active",
    simNo: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
];
const DeviceTable = React.memo(
  ({ searchData, errorData, loadingData, searchInput }: any) => {
    const [orgId, setOrgId] = useState<number | null | any>();

    useEffect(() => {
      const lsOrgId = localStorage?.getItem("orgId");
      setOrgId(Number(lsOrgId));
    }, []);
    const { loading, data, error } = useQuery(GET_ALL_DEVICES, {
      variables: {
        limit: 1000,
        page: 1,
        where: {
          org: {
            id: orgId,
          },
        },
      },
      skip: orgId === null || isNaN(orgId), // Skip the query if orgId is null or NaN
    });
    // //////console.log("device data", data);
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

    const columns: any = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Brand Name",
        dataIndex: "brand",
        key: "brand",
        // filters: [
        //   { text: "Joe", value: "Joe" },
        //   { text: "Jim", value: "Jim" },
        // ],
        // filteredValue: filteredInfo.name || null,
        // // onFilter: (value: string, record) => record.name.includes(value),
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
        // ellipsis: true,
        // render: (title) => <>{title}</>,
      },
      {
        title: "Device Type",
        dataIndex: "type",
        key: "type",
        // sorter: (a, b) => a.age - b.age,
        // sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
        // ellipsis: true,
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
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
        title: "Serial #",
        dataIndex: "serial",
        key: "serial",
        // filters: [
        //   { text: "London", value: "London" },
        //   { text: "New York", value: "New York" },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value: string, record) => record.address.includes(value),
        //   sorter: (a, b) => a.address.length - b.address.length,
        //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
        //   ellipsis: true,
      },
      {
        title: "Imei",
        dataIndex: "imei",
        key: "imei",
        // filters: [
        //   { text: "London", value: "London" },
        //   { text: "New York", value: "New York" },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value: string, record) => record.address.includes(value),
        //   sorter: (a, b) => a.address.length - b.address.length,
        //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
        //   ellipsis: true,
      },
      // {
      //   title: "Sim #",
      //   dataIndex: "simNo",
      //   key: "simNo",

      // },
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
        render: (item: any) => {
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
        dataSource={searchInput ? searchData : data?.getAllDevice}
        onChange={handleChange}
        loading={{ indicator: <Spin />, spinning: loading || loadingData }}
        scroll={{ x: 500 }}

        // scroll={{ x: 500, y: "calc(100vh - 280px)" }}
        // footer={() => {
        //   return (
        //     <tr>
        //       <td style={{ paddingRight: "90px" }}>Brand Name</td>
        //       <td style={{ paddingRight: "90px" }}>Device Type</td>
        //       <td style={{ paddingRight: "90px" }}>Model</td>
        //       <td style={{ paddingRight: "90px" }}>Serial #</td>
        //       <td style={{ paddingRight: "90px" }}>Imei</td>
        //       <td style={{ paddingRight: "90px" }}>Sim #</td>
        //       <td style={{ paddingRight: "90px" }}>Status</td>
        //       <td style={{ paddingRight: "90px" }}>Action</td>
        //     </tr>
        //   );
        // }}
      />
    );
  }
);

export default DeviceTable;
