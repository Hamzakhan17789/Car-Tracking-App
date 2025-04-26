import React, { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import {
  InfoCircleOutlined,
  EnvironmentOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table/interface";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRIPS } from "../../graphqlOperations/query";
import Link from "next/link";
import {
  xTureFalseFormat, xRound2Format, xMtoKM, xTimeHourMins, xTimeDateFormat, xTimeFormat, xIgnitionFormat, xSpeedFormat, xBatteryPowerFormat, xio72Format, xio270Format, xio25Format
} from "../../helper/xformat";

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

const TripsTable = React.memo(
  ({ fromDate, toDate, selectedLocationId }: any) => {
    const { data, loading, error } = useQuery(GET_ALL_TRIPS, {
      variables: {
        from: fromDate,
        to: toDate,
        locationId: Number(selectedLocationId),
      },
    });
    useEffect(() => {
      if (error) {
        message.warning(error.message);
      }
    }, [error]);

    const columns: ColumnsType<DataType> = [
      // {
      //   title: "",
      //   dataIndex: "id",
      //   key: "id",
      //   render: (item: any, data: any) => {
      //     console.log("item", item);
      //     console.log("data", data);
  
      //     return (
      //       <Link
      //         href={`http://maps.google.com/?q=${data?.latitude},${data?.longitude}&om=1`}
      //         passHref
      //       >
      //         <a target="_blank">
      //           <EnvironmentOutlined className="teamSocialIcon" />
      //         </a>
      //       </Link>
      //     );
      //   },
      // },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        render: (item: any, data: any) => {
          return (
            xTimeHourMins(data?.duration, false)
          );
        },
      },
      {
        title: "Distance",
        dataIndex: "distance",
        key: "distance",
        render: (item: any, data: any) => {
          return (
            xMtoKM(data?.distance, true)
          );
        },
      },
      {
        title: "Start Address",
        dataIndex: "startAddress",
        key: "startAddress",
      },
      {
        title: "End Address",
        dataIndex: "endAddress",
        key: "endAddress",
      },
      {
        title: "Start Odometer",
        dataIndex: "startOdometer",
        key: "startOdometer",
        render: (item: any, data: any) => {
          return (
            xMtoKM(data?.startOdometer, true)
          );
        },
      },
      {
        title: "End Odometer",
        dataIndex: "endOdometer",
        key: "endOdometer",
        render: (item: any, data: any) => {
          return (
            xMtoKM(data?.endOdometer, true)
          );
        },
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
        key: "startTime",
        render: (item: any, data: any) => {
          return (
            xTimeDateFormat(data?.startTime, false)
          );
        },
      },
      {
        title: "End Time",
        dataIndex: "endTime",
        key: "endTime",
        render: (item: any, data: any) => {
          return (
            xTimeDateFormat(data?.endTime, false)
          );
        },
      },
      {
        title: "Max Speed",
        dataIndex: "maxSpeed",
        key: "maxSpeed",
        render: (item: any, data: any) => {
          return (
            xRound2Format(data?.maxSpeed, true)
          );
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={data?.getAllTrip}
        loading={{ indicator: <Spin />, spinning: loading }}
        scroll={{ x: 500 }}
      />
    );
  }
);

export default TripsTable;
