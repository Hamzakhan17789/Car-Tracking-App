import React, { useState, useEffect } from "react";
import { Button, Space, Table, Spin, message, TableProps } from "antd";
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
import { GET_ALL_VEHICLES } from "../../graphqlOperations/querry";

interface DataType {
  key: string;
  chasisNo: string;
  plateNo: string;
  engineNo: string;
  brand: string;
  model: string;
  year: string;
  vehicleType: string;
  device: string;
  status: string;
  action: JSX.Element;
}

const customData: DataType[] = [
  {
    key: "1",
    chasisNo: "987455",
    plateNo: "3210125114815112",
    engineNo: "969844584711",
    brand: "Toyota",
    model: "Grande",
    year: "2022",
    vehicleType: "personal",
    device: "61898898989889",
    status: "Active",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    chasisNo: "987455",
    plateNo: "3210125114815112",
    engineNo: "969844584711",
    brand: "Honda",
    model: "Civic",
    year: "2022",
    vehicleType: "personal",
    device: "71898898989889",
    status: "Not Active",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
];
const VehicleTable = React.memo(
  ({ searchData, errorData, loadingData, searchInput }: any) => {
    const [orgId, setOrgId] = useState<number | null | any>();

    useEffect(() => {
      const lsOrgId = localStorage?.getItem("orgId");
      setOrgId(Number(lsOrgId));
    }, []);
    const { loading, error, data } = useQuery(GET_ALL_VEHICLES, {
      variables: {
        limit: 1000,
        page: 1,
        where: {
          org: {
            id: orgId,
          },
        },
      },
      skip: orgId === null || isNaN(orgId),
    });
    if (error) {
      message.error({
        content: error?.message,
      });
    }
    // //////console.log("vehicle", data?.getAllLocation);
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
        title: "Chasis #",
        dataIndex: "chassis",
        key: "chassis",
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
        title: "Plate Number",
        dataIndex: "identity",
        key: "identity",
        // sorter: (a, b) => a.age - b.age,
        // sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
        // ellipsis: true,
      },
      {
        title: "Engine Number",
        dataIndex: "engine",
        key: "engine",
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
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
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
        title: "Year",
        dataIndex: "year",
        key: "year",
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
        title: "Vehicle Type",
        dataIndex: "type",
        key: "type",
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
        title: "Device Imei",
        dataIndex: "device",
        key: "device",
        // filters: [
        //   { text: "London", value: "London" },
        //   { text: "New York", value: "New York" },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value: string, record) => record.address.includes(value),
        // sorter: (a, b) => a.address.length - b.address.length,
        // sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
        // ellipsis: true,
        render: (item) => (item?.imei ? item?.imei : "Not Assigned"),
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
        dataSource={searchInput ? searchData : data?.getAllLocation}
        onChange={handleChange}
        loading={{ indicator: <Spin />, spinning: loading || loadingData }}
        scroll={{ x: 500 }}
      />
    );
  }
);

export default VehicleTable;
