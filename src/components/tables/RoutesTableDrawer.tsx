import React, { useState, useEffect } from "react";
import { Table, Spin, Row, Col, message, Tooltip, Typography, Button } from "antd";
import type { ColumnsType } from "antd/es/table/interface";
import {
  InfoCircleOutlined,
  EnvironmentOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import moment from "moment";
import classes from "./routesTableDrawer.module.css";

import Link from "next/link";
import {
  xTureFalseFormat, xMtoKM, xTimeHourMins, xTimeDateFormat, xTimeFormat, xIgnitionFormat, xSpeedFormat, xBatteryPowerFormat, xio72Format, xio270Format, xio25Format
} from "../../helper/xformat";

const { Title, Paragraph, Text } = Typography;
interface DataType {
  [x: string]: any;
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
const xAttributesFormat = (item: any) => {
  const attributes = Object.keys(item);
  const formattedAttributes = attributes.map((attribute) => {
    const value = item[attribute];
    const label = attribute.replace(":", " : ");
    return (
      <p key={attribute}>
        <span style={{textTransform: "uppercase"}}>{label}</span>: {value}
      </p>
    );
  });
  return formattedAttributes;
};

const RoutesTableDrawer = React.memo(({ data, loading }: any) => {
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
          xSpeedFormat(data?.speed, false)
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
          xio72Format(data?.attributes?.io72, false)
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
    //       // `${moment(data?.fixTime).format("hh:mm:ss a, DD.MM.YY")}`
    //       xTimeDateFormat(data?.fixTime, false)
    //     );
    //   },
    // },
    {
      title: "Lat/Long",
      dataIndex: "latlong",
      key: "latlong",
      render: (item: any, data: any) => {
        return (
          `${data?.latitude}, ${data?.longitude}`
          // xTimeDateFormat(data?.fixTime, false)
        );
      },
    },
    // {
    //   title: "Course",
    //   dataIndex: "course",
    //   key: "course",
    // },
    // {
    //   title: "Attributes",
    //   dataIndex: "attributes",
    //   key: "attributes",
    //   render: (item) => {
    //     const itemValue = JSON.stringify(item);
    //     return (
    //       <Tooltip title={itemValue}>
    //         <InfoCircleOutlined />
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      title: "Attributes",
      dataIndex: "attributes",
      key: "attributes",
      render: (item) => {
        return (
          // <Tooltip title={xAttributesFormat(item)}>
          //   <InfoCircleOutlined />
          // </Tooltip>
          <Tooltip title={<div>
            <Row gutter={[24, 10]}>
              <Col span={10}>
                <Typography style={{ minWidth: 84, maxWidth: 84 }}>
                  <Title style={{ fontSize: 12, color: "#fff" }}>Odometer:</Title>
                  <Title style={{ fontSize: 12, color: "#fff" }}>Hours:</Title>
                  <Title style={{ fontSize: 12, color: "#fff" }}>Distance:</Title>
                  <Title style={{ fontSize: 12, color: "#fff" }}>Total Distance:</Title>
                </Typography>
              </Col>
              <Col span={14}>
                <Typography style={{ minWidth: 84, maxWidth: 84 }}>
                  <Title style={{ fontSize: 12, color: "#fff" }}>{xMtoKM(item?.odometer, true)}</Title>
                  <Title style={{ fontSize: 12, color: "#fff" }}>{xTimeHourMins(item?.hours, false)}</Title>
                  <Title style={{ fontSize: 12, color: "#fff" }}>{xMtoKM(item?.distance, true)}</Title>
                  <Title style={{ fontSize: 12, color: "#fff" }}>{xMtoKM(item?.totalDistance, true)}</Title>
                </Typography>
              </Col>
            </Row>
            </div>}>
            <InfoCircleOutlined />
          </Tooltip>
        );
      },
    },
  ];

  const getRowClassName = (record: DataType, index: number): any => {
    console.log("record", record?.attributes?.ignition);
    // if (record?.attributes?.ignition === false) {
    const colors = ["red", "green", "blue", "yellow"];
    const colorIndex = index % colors.length;
    return `row-color-${colorIndex}`;
    // }
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={{ indicator: <Spin />, spinning: loading }}
      scroll={{ x: 500 }}
      rowClassName={getRowClassName}
    />
  );
});

export default RoutesTableDrawer;
