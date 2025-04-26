import React, { useState, useEffect } from "react";
import { Table, Spin, message, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table/interface";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "../../graphqlOperations/query";
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
const xAttributesFormat = (item: any) => {
  const attributes = Object.keys(item);
  const formattedAttributes = attributes.map((attribute) => {
    const value = item[attribute];
    const label = attribute.replace(":", " : ");
    return (
      <p key={attribute}>
        <b>{label}</b>: {value}
      </p>
    );
  });

  if (formattedAttributes.length === 0) {
    return "-";
  } else {
    return formattedAttributes;
  }
};

const EventsTable = React.memo(
  ({ fromDate, toDate, selectedLocationId }: any) => {
    const { loading, data, error } = useQuery(GET_ALL_EVENTS, {
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
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (text, record) => {
          if (text === 'commandResult') {
            return 'Command Result';
          } else if (text === 'deviceOnline') {
            return 'Online';
          } else if (text === 'deviceUnknown') {
              return 'Unknown';
          } else if (text === 'deviceOffline') {
              return 'Offline';
          } else if (text === 'deviceInactive') {
              return 'Inactive';
          } else if (text === 'deviceMoving') {
              return 'Moving';
          } else if (text === 'deviceStopped') {
              return 'Stopped';
          } else if (text === 'deviceOverspeed') {
              return 'OverSpeed';
          } else if (text === 'deviceFuelDrop') {
              return 'Fuel Drop';
          } else if (text === 'deviceFuelIncrease') {
              return 'Fuel Increase';
          } else if (text === 'geofenceEnter') {
              return 'GeoFence - Enter';
          } else if (text === 'geofenceExit') {
              return 'GeoFence - Exit';
          } else if (text === 'alarm') {
              return 'Alarm';
          } else if (text === 'ignitionOn') {
              return 'Alarm';
          } else if (text === 'ignitionOff') {
              return 'Alarm';
          } else if (text === 'maintenance') {
              return '-';
          } else if (text === 'textMessage') {
              return '-';
          } else if (text === 'media') {
              return 'Media';
          } else if (text === 'driverChanged') {
              return '-';
          } else {
            return text;
          }
        },
      },
      {
        title: "Event Time",
        dataIndex: "eventTime",
        key: "eventTime",
        render: (item: any, data: any) => {
          return (
            xTimeDateFormat(data?.eventTime, false)
          );
        },
      },
      {
        title: "Attributes",
        dataIndex: "attributes",
        key: "attributes",
        render: (item) => xAttributesFormat(item),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={data?.getAllEvents}
        loading={{ indicator: <Spin />, spinning: loading }}
        scroll={{ x: 500 }}
      />
    );
  }
);

export default EventsTable;
