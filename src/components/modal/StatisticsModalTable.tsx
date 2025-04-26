import React, { useEffect, useState } from "react";
import classes from "./StatisticsModalTable.module.css";
import {
  Space,
  Spin,
  Table,
  Tag,
  Pagination,
  DatePicker,
  TimePicker,
  Input,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import PickerButton from "antd/es/date-picker/PickerButton";
import SearchInput from "../plateExplorer/SearchInput";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const dummyObject = [
  {
    key: "1",
    time: "Hamza",
    latitude: "3210125114815112",
    longitude: "AFR-2022",
    status: "waqas@gmail.com",
    event: "Active",
    speed: "0321789456321",
    address: "test",
    map: "map",
  },

];

type PropsType ={
  trips?: any[]
}

const StatisticsModalTable = React.memo(({trips} : PropsType) => {
  ////console.log("StatisticsModalTable");
  const columns: ColumnsType<any> = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      filters: [
        {
          text: "Active",
          value: "Active",
        },

        {
          text: "fuel low",
          value: "fuel low",
        },
      ],
      onFilter: (value: string | number | boolean, record: any) => {
        return record.event === value;
      },
    },
    {
      title: "Speed",
      dataIndex: "speed",
      key: "speed",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Map",
      dataIndex: "map",
      key: "map",
    },
  ];

  const [selectedDateValue, setSelectedDateValue] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const onChangeDateHandler = (time: any, timeString: any) => {
    setSelectedDateValue(() => [timeString]);
    ////console.log(selectedDateValue);
  };

  useEffect(() => {
    ////console.log(selectedDateValue);
  }, [onChangeDateHandler, selectedDateValue]);

  const [filteredObject, setFilteredObject] = useState<any[]>([]);

  const filterTable = (input: string) => {
    const filteredData = dummyObject.filter((item, i) => {
      return item.event === input;
    });
    ////console.log(filteredData);
    setFilteredObject(filteredData);
  };

  useEffect(() => {
    filterTable(searchInput);
  }, [searchInput]);

  const pageSize = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  //const { RangePicker } = DatePicker;
  const { RangePicker } = TimePicker;
  // //console.log(DatePicker)






const dataSourceForTripsData =[]



  return (
    <>
      <div className={classes.tableFilter}>
        <div className={classes.dateRange}>
          <Space direction="vertical" size={6}>
            {/* <RangePicker
              style={{ width: "200px" }}
              onChange={onChangeDateHandler}
            /> */}
            <RangePicker 
           
           
            />
          </Space>
        </div>
      </div>
      <div
        className={classes.modalTableWrapper}
        style={{ position: "relative", top: "10px" }}
      >
        <Table
          columns={columns}
     //   columns={trips}
          dataSource={dummyObject}
          style={{ whiteSpace: "normal", textAlign: "center", color: "red" }}
          pagination={{
            pageSize: 7,
            style: { color: "red", marginRight: "400px" },
          }}
          //loading={{ indicator: <Spin />}}
          //  scroll={{ x: 'hidden' , y: "hidden"}}
        />
      </div>
    </>
  );
});

export default StatisticsModalTable;
