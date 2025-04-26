import React, { useState, useEffect } from "react";
import { Table, Spin, message, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table/interface";
import { useQuery } from "@apollo/client";
import { GET_ALL_ROUTE } from "../../graphqlOperations/query";
import Link from "next/link";
import {
  InfoCircleOutlined,
  EnvironmentOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import {
  xTureFalseFormat, xMtoKM, xTimeHourMins, xTimeDateFormat, xTimeFormat, xIgnitionFormat, xSpeedFormat, xBatteryPowerFormat, xio72Format, xio270Format, xio25Format
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

const RoutesTable = React.memo(
  ({ fromDate, toDate, selectedLocationId }: any) => {
    const { loading, data, error } = useQuery(GET_ALL_ROUTE, {
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
      {
        title: "",
        dataIndex: "id",
        key: "id",
        render: (item: any, data: any) => {
          console.log("item", item);
          console.log("data", data);
  
          return (
            <Link
              href={`http://maps.google.com/?q=${data?.latitude},${data?.longitude}&om=1`}
              passHref
            >
              <a target="_blank">
                <EnvironmentOutlined className="teamSocialIcon" />
              </a>
            </Link>
          );
        },
      },
      {
        title: "Ignition",
        dataIndex: "ignition",
        key: "ignition",
        render: (item: any, data: any) => {
          return (
            // `${data?.attributes?.ignition === true ? "ON" : data?.attributes?.ignition === false ? "OFF" : "-"}`
            xIgnitionFormat(data?.attributes?.ignition, true)
          );
        },
      },
      {
        title: "Power",
        dataIndex: "power",
        key: "power",
        render: (item: any, data: any) => {
          return (
            // `${data?.attributes?.power.toFixed(2)}`
            xBatteryPowerFormat(data?.attributes?.power, false)
          );
        },
      },
      {
        title: "Motion",
        dataIndex: "motion",
        key: "motion",
        render: (item: any, data: any) => {
          return (
            // `${data?.attributes?.motion === true ? "Yes" : data?.attributes?.motion === false ? "No" : "-"}`
            xTureFalseFormat(data?.attributes?.motion, true)
          );
        },
      },
      {
        title: "Speed",
        dataIndex: "speed",
        key: "speed",
        render: (item: any, data: any) => {
          return (
            // `${data?.speed.toFixed(2)}`
            xSpeedFormat(data?.speed, true)
          );
        },
      },
      {
        title: "Dallas Temp",
        dataIndex: "io72",
        key: "io72",
        render: (item: any, data: any) => {
          return (
            // `${(data?.attributes?.io72 * 0.1).toFixed(2)}`
            xio72Format(data?.attributes?.io72, true)
          );
        },
      },
      {
        title: "Server Time",
        dataIndex: "serverTime",
        key: "serverTime",
        render: (item: any, data: any) => {
          return (
            // `${moment(data?.serverTime).format("hh:mm:ss a, DD.MM.YY")}`
            xTimeDateFormat(data?.serverTime, false)
          );
        },
  
      },
      {
        title: "Device Time",
        dataIndex: "deviceTime",
        key: "deviceTime",
        render: (item: any, data: any) => {
          return (
            // `${moment(data?.deviceTime).format("hh:mm:ss a, DD.MM.YY")}`
            xTimeDateFormat(data?.deviceTime, false)
          );
        },
      },
      // {
      //   title: "Fix Time",
      //   dataIndex: "fixTime",
      //   key: "fixTime",
      //   render: (item: any, data: any) => {
      //     return (
      //       xTimeDateFormat(data?.fixTime, false)
      //     );
      //   },
      // },

      // {
      //   title: "Longitude",
      //   dataIndex: "longitude",
      //   key: "longitude",
      // },
      // {
      //   title: "Latitude",
      //   dataIndex: "latitude",
      //   key: "latitude",
      // },
      // {
      //   title: "Lat/Long",
      //   dataIndex: "latlong",
      //   key: "latlong",
      //   render: (item: any, data: any) => {
      //     return (
      //       `${data?.latitude}, ${data?.longitude}`
      //       // xTimeDateFormat(data?.fixTime, false)
      //     );
      //   },
      // },

      {
        title: "Odometer",
        dataIndex: "odometer",
        key: "odometer",
        render: (item: any, data: any) => {
          return (
            xMtoKM(data?.attributes?.odometer, true)
          );
        },
      },
      {
        title: "Hours",
        dataIndex: "hours",
        key: "hours",
        render: (item: any, data: any) => {
          return (
            xTimeHourMins(data?.attributes?.hours, false)
          );
        },
      },
      {
        title: "Total Distance",
        dataIndex: "totalDistance",
        key: "totalDistance",
        render: (item: any, data: any) => {
          return (
            xMtoKM(data?.attributes?.totalDistance, true)
          );
        },
      },

      {
        title: "Attributes",
        dataIndex: "attributes",
        key: "attributes",
        render: (item) => {
          const itemValue = JSON.stringify(item);
          return (
            <Tooltip title={itemValue}>
              <InfoCircleOutlined />
            </Tooltip>
          );
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={data?.getAllRoute}
        loading={{ indicator: <Spin />, spinning: loading }}
        scroll={{ x: 500 }}
      />
    );
  }
);

export default RoutesTable;
