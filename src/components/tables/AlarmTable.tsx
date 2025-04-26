import React, { useState } from "react";
import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";
import { Avatar } from "antd";

// import type { FC } from "react";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { PoweroffOutlined, CheckOutlined } from "@ant-design/icons";
import TableActionDropDown from "../dropdowns/TableActionDropDown";

interface DataType {
  key: string;
  type: string;
  status: string;
  plate: string;
  gpsTime: string;
  createTime: string;
  user: string;
  actionTime: string;
  action: JSX.Element;
}

const data: DataType[] = [
  {
    key: "1",
    type: "Ignition",
    status: "On",
    plate: "AFR-2022",
    gpsTime: "28 Nov 2022, 6:10:19pm",
    createTime: "28 Nov 2022, 6:10:19pm",
    user: "Admin",
    actionTime: "28 Nov 2022, 6:10:19pm",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    type: "Ignition",
    status: "On",
    plate: "AFR-2022",
    gpsTime: "28 Nov 2022, 6:10:19pm",
    createTime: "28 Nov 2022, 6:10:19pm",
    user: "Admin",
    actionTime: "28 Nov 2022, 6:10:19pm",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
];

const AlarmTable: React.FC = React.memo(() => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});


////console.log('Alarms table')

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    ////////////console.loglog("Various parameters", pagination, filters, sorter);
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      // filters: [
      //   { text: "Joe", value: "Joe" },
      //   { text: "Jim", value: "Jim" },
      // ],
      // filteredValue: filteredInfo.name || null,
      // // onFilter: (value: string, record) => record.name.includes(value),
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      // ellipsis: true,
      render: (title) => (
        <>
          <Avatar
            icon={<PoweroffOutlined />}
            style={{ marginRight: "5px", backgroundColor: "#72cc8a" }}
          />
          {title}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "Plate",
      dataIndex: "plate",
      key: "plate",
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
      title: "GPS Time",
      dataIndex: "gpsTime",
      key: "gpsTime",
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
      title: "Create Time",
      dataIndex: "createTime",
      key: "createTime",
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
      title: "User",
      dataIndex: "user",
      key: "user",
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
      title: "Action Time",
      dataIndex: "actionTime",
      key: "actionTime",
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => {
        return <TableActionDropDown />;
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        scroll={{ x: "auto" }}
        // scroll={{ x: 500, y: 400 }}
      />
    </>
  );
});

export default AlarmTable;
