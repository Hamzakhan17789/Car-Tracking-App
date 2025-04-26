import React, { useState, useEffect } from "react";
import { Spin, TableProps } from "antd";
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
import { useQuery } from "@apollo/client";

import { GET_ALL_CLIENTS } from "../../graphqlOperations/querry";
import Link from "next/link";
interface DataType {
  key: string;
  name: string;
  cnic: string;
  phoneNumber: string;
  email: string;
  status: string;
  action: JSX.Element;
  plate: string;
  // id: any;
}

const CustomData: DataType[] = [
  {
    key: "1",
    name: "Waqas",
    cnic: "3210125114815112",
    plate: "AFR-2022",
    email: "waqas@gmail.com",
    status: "Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    name: "Talha",
    cnic: "7210125114815112",
    plate: "AFR-2022",
    email: "talha@gmail.com",
    status: "Not Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    name: "Talha",
    cnic: "7210125114815112",
    plate: "AFR-2022",
    email: "talha@gmail.com",
    status: "Not Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    name: "Talha",
    cnic: "7210125114815112",
    plate: "AFR-2022",
    email: "talha@gmail.com",
    status: "Not Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    name: "Talha",
    cnic: "7210125114815112",
    plate: "AFR-2022",
    email: "talha@gmail.com",
    status: "Not Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    name: "Talha",
    cnic: "7210125114815112",
    plate: "AFR-2022",
    email: "talha@gmail.com",
    status: "Not Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    name: "Talha",
    cnic: "7210125114815112",
    plate: "AFR-2022",
    email: "talha@gmail.com",
    status: "Not Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    name: "Talha",
    cnic: "7210125114815112",
    plate: "AFR-2022",
    email: "talha@gmail.com",
    status: "Not Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    name: "Talha",
    cnic: "7210125114815112",
    plate: "AFR-2022",
    email: "talha@gmail.com",
    status: "Not Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    name: "Talha",
    cnic: "7210125114815112",
    plate: "AFR-2022",
    email: "talha@gmail.com",
    status: "Not Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
  {
    key: "2",
    name: "Talha",
    cnic: "7210125114815112",
    plate: "AFR-2022",
    email: "talha@gmail.com",
    status: "Not Active",
    phoneNumber: "0321789456321",
    action: (
      <Button type="text">
        <CheckOutlined />
      </Button>
    ),
  },
];
const ClientsTable = React.memo(
  ({ searchData, errorData, loadingData, searchInput }: any) => {
    const [clientData, setClientData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [checkData, setCheckData] = useState(false);
    const [orgId, setOrgId] = useState<number | null | any>();
    ////console.log(searchData, errorData, loadingData, searchInput);
    useEffect(() => {
      const lsOrgId = localStorage?.getItem("orgId");
      setOrgId(Number(lsOrgId));
    }, []);
    ////console.log("rendering");
    ////console.log(typeof orgId, orgId);
    ////console.log(typeof orgId === "number");
    ////console.log(!isNaN(orgId));

    const { data, loading, error } = useQuery(GET_ALL_CLIENTS, {
      variables: {
        //     skip: orgId === null || orgId === 0  || orgId === undefined ,

        limit: 1000,
        page: 1,
        where: {
          org: {
            id: orgId,
            //  id:  orgId && { org: { id: orgId } }
          },
        },
        //skip: !isNaN(orgId),
      },
      skip: orgId === null || isNaN(orgId), // Skip the query if orgId is null or NaN
    });

    ////console.log("ordId", orgId);
    // //////console.log("data", data);
    // //////console.log("clientLoading", loading);
    useEffect(() => {
      setClientData(data?.getAllClient);
      setIsLoading(loading);
    }, [data, loading]);
    // //////console.log("clientData", clientData);
    // //////console.log("data", data);
    // //////console.log("loading", loading);
    // //////console.log("error", error);
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
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",

        render: (title, data: any) => (
          <Link href={`/clients/${[data.id]}`}>{title}</Link>
        ),
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: "Father Name",
        dataIndex: "fatherName",
        key: "fatherName",
      },
      {
        title: "Cnic",
        dataIndex: "identity",
        key: "identity",
      },
      {
        title: "Phone #",
        dataIndex: "contactNumber",
        key: "contactNumber",
      },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",

        render: (item) => {
          return item == "active" ? "Active" : "Not Active";
        },
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
    //////////console.loglog("searchData", searchData ? "true" : "false");
    //////////console.loglog("searchInput", searchInput ? "true" : false);
    //////////console.loglog("error", errorData);
    return (
      <Table
        columns={columns}
        dataSource={searchInput ? searchData : clientData}
        onChange={handleChange}
        loading={{ indicator: <Spin />, spinning: isLoading || loadingData }}
        scroll={{ x: 500 }}
      />
    );
  }
);

export default ClientsTable;
