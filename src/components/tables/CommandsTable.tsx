import React, { useState, useEffect, useContext } from "react";
import { Spin, TableProps } from "antd";
import { Button, Space, Table, Avatar, Tag, Input } from "antd";
import commandTrackingStop from "../../../public/assets/images/commandTrackingStop.png";
import avatarCommand from "../../../public/assets/images/AvatarCommand.png";
import Image from "next/image";
import moment from "moment";

// import type { FC } from "react";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { PoweroffOutlined, CheckOutlined } from "@ant-design/icons";
import TableActionDropDown from "../dropdowns/TableActionDropDown";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_CLIENTS,
  GET_ALL_COMMANDS,
} from "../../graphqlOperations/querry";
import Link from "next/link";
import { ClientDetailPlateExplorerContext } from "../../context/PlateExplorerContext";
interface DataType {
  gateway: string;
  command: string;
  sendingTime: string;
  receivingTime: String;
  replyCommand: String;
  status: string[] | string;
  action: JSX.Element;
  // id: any;
}

const CustomData: DataType[] = [
  {
    gateway: "1",
    command: "Waqas",
    sendingTime: "19:22:13 pm",
    receivingTime: "19:22:13 pm",
    replyCommand:
      '"GPS:1 Sat:0 Lat:54.666042 Long:25.225031 Alt:0 Speed:0 Dir:0 Date: 2017/6/16 Time: 12:52:30"',
    status: "Active",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
];
const CommandsTable = React.memo(() => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [locationId, setLocationId] = useState<number | null>();

  const clientCtx = useContext(ClientDetailPlateExplorerContext)
  //////console.log(clientCtx.onClick)

  let lsLocationId;
  useEffect(() => {
    lsLocationId = Number(sessionStorage?.getItem("vehicleIDforClientDetail"));
    setLocationId(lsLocationId);

    //////console.log(data)
  }, [locationId]);

  //////console.log(lsLocationId)
  //////console.log( 'LOCATION ID IN COMMANDS' ,  Number(sessionStorage?.getItem("vehicleIDforClientDetail")))
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const { data, loading, error, refetch } = useQuery(GET_ALL_COMMANDS, {
    variables: {

      //    locationId: locationId,
      locationId: Number(sessionStorage?.getItem("vehicleIDforClientDetail"))
    },
  });

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     refetch()
  //     // console.log('refetch interval')
  //   }, 1000)
  //   return () => {
  //     clearInterval(timer)
  //   }

  // },
  //   [])

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    // console.log("Various parameters", pagination, filters, sorter);
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

  const setcreatedAt = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "createdAt",
    });
  };


  const columns: ColumnsType<DataType> = [
    {
      title: "Gateway",
      dataIndex: "gateway",
      key: "gateway",
      render: () => {
        return (
          <Avatar
            style={{
              background: " rgba(68, 136, 240, 0.09)",
              borderRadius: "13.9881px",
            }}
          >
            <Image src={avatarCommand} width="12px" height="9px" alt="GPRS" />
          </Avatar>
        );
      },
      //   render: () => {
      //     return (
      //       <>
      //         <Avatar
      //           icon={
      //             <Image
      //               src={commandTrackingStop}
      //               width={"10px"}
      //               height={"10px"}
      //             />
      //           }
      //         />
      //       </>
      //     );
      //   },
    },
    // {
    //   title: "Command",
    //   dataIndex: "command",
    //   key: "command",
    //   // filters: [
    //   //   { text: "Joe", value: "Joe" },
    //   //   { text: "Jim", value: "Jim" },
    //   // ],
    //   // filteredValue: filteredInfo.name || null,
    //   // // onFilter: (value: string, record) => record.name.includes(value),
    //   // sorter: (a, b) => a.name.length - b.name.length,
    //   // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
    //   // ellipsis: true,
    // },
    {
      title: "Reply Command",
      dataIndex: "respond",
      key: "respond",
      render: (item) => {
        const value = JSON.stringify(item);
        const parsedValue = value.replace(/[{}]/g, "");
        //   //////console.log(parsedValue.length);
        return <>{parsedValue.length > 0 ? parsedValue : "-"}</>;
      },
    },
    {
      title: "Sending Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return moment(text).format('hh:mm:ss a, DD.MM.YY');
      },
      // sorter: (data.a, data.b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
      // sortDirections: ['ascend', 'descend'],
      // defaultSortOrder: 'ascend', // ascend descend
      // sorter: (a, b) => new Date(a.setcreatedAt) - new Date(b.setcreatedAt)
    },
    // {
    //   title: "Recieving Time",
    //   dataIndex: "respond",
    //   key: "respond",
    //   render: (item) => {
    //     //////console.log(item.rtc);
    //     return <>{`${item.rtc || item.d + item.t || "-"} `}</>;
    //   },
    // },

    {
      title: "Status",
      dataIndex: "hasReplied",
      key: "hasReplied",
      // filters: [
      //   { text: "London", value: "London" },
      //   { text: "New York", value: "New York" },
      // ],
      // filteredValue: filteredInfo.address || null,
      // onFilter: (value: string, record) => record.address.includes(value),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      //   ellipsis: true,
      render: (tags: any) => {
        return (
          <span>
            {tags == 0 ? (
              <Tag
                style={{ background: "#FEF3F2", borderRadius: "11px" }}
                key={tags}
              >
                <p style={{ color: "#B42318", fontWeight: 500 }}>Failed</p>
              </Tag>
            ) : (
              <Tag
                style={{ background: "#ECFDF3", borderRadius: "11px" }}
                key={tags}
              >
                <p style={{ color: "#027A48", fontWeight: 500 }}>Executed</p>
              </Tag>
            )}
          </span>
        );
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   // filters: [
    //   //   { text: "London", value: "London" },
    //   //   { text: "New York", value: "New York" },
    //   // ],
    //   // filteredValue: filteredInfo.address || null,
    //   // onFilter: (value: string, record) => record.address.includes(value),
    //   // sorter: (a, b) => a.address.length - b.address.length,
    //   // sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
    //   // ellipsis: true,
    //   render: () => {
    //     return <TableActionDropDown />;
    //   },
    // },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data?.getAllCommand}
      loading={{ indicator: <Spin />, spinning: loading }}
      onChange={handleChange}
      scroll={{ x: 500 }}
    />
  );
})

export default CommandsTable;
