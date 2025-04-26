import React, { useState, useEffect } from "react";
import { Button, DatePicker, Spin, message, Select } from "antd";
import { useQuery } from "@apollo/client";
import { GET_ALL_BY_SEARCH_LOCATION } from "../../graphqlOperations/query";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const RangePickerSearchBox = ({
  onChange,
  onSearch,
  DatePickerHandler,
  showHandler,
  selectedLocationId,
  fromDate,
  toDate,
}: any) => {
  const [vehicleID, setVehicleID] = useState<any>();
  const [locationData, setLocationData] = useState<any>();

  const RangePickerSearchBox = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
  }[] = [
    // { label: 'Last 24 Hours', value: [dayjs().add(-1, 'd'), dayjs()] },
    { label: "Today", value: [dayjs(), dayjs().startOf("day")] },
    { label: "Last 3 Days", value: [dayjs().add(-3, "d"), dayjs()] },
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
  ];

  useEffect(() => {
    const id = sessionStorage.getItem("ORGID");
    setVehicleID(id);
  }, []);
  const { data, loading, error } = useQuery(GET_ALL_BY_SEARCH_LOCATION, {
    variables: {
      orgId: Number(vehicleID),
    },
  });
  // console.log("data from", data?.getAllBySearchLocation);

  useEffect(() => {
    // console.log("replayPage useEffect called data error");
    if (data) {
      // console.log("data RangePicker", data);
      setLocationData(data?.getAllBySearchLocation);
    }
    if (error) {
      message.warning(error?.message);
    }
  }, [data, error, locationData]);

  //Conditions used In return
  const buttonDisplayCondition = selectedLocationId && fromDate && toDate;

  return (
    <div
      style={{
        width: "280px",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <div>
        <Select
          showSearch
          placeholder="Select Device"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          style={{ width: "250px", margin: "10px" }}
        >
          {loading ? (
            <Option value="Loading...">
              <Spin
                size="small"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </Option>
          ) : (
            data?.getAllBySearchLocation.map((item: any) => {
              // console.log("itemdata", item);
              return (
                <Option key={item?.id} value={item?.id}>
                  {item?.identity}
                </Option>
              );
            })
          )}
        </Select>
      </div>

      <div>
        <RangePicker
          allowClear={false}
          presets={rangePresets}
          showTime
          format="YYYY/MM/DD HH:mm:ss"
          onChange={DatePickerHandler}
          style={{ width: "250px", margin: "10px" }}
        />
      </div>
      <div>
        {buttonDisplayCondition ? (
          <Button
            style={{ width: "250px", margin: "10px" }}
            onClick={showHandler}
          >
            Show
          </Button>
        ) : (
          <Button
            style={{ width: "250px", margin: "10px" }}
            onClick={showHandler}
            disabled
          >
            Show
          </Button>
        )}
      </div>
    </div>
  );
};

export default RangePickerSearchBox;
