import React, { useState, useEffect } from "react";
import ReplayMap from "../../components/journeyMaps/ReplayMap";
import { Button, DatePicker, Spin, message } from "antd";
import RangePickerSearchBox from "../../components/searchBox/RangePickerSearchBox";
import { dateConversionToISO } from "../../components/helperFunctions/ReportFunctions";
import { useQuery } from "@apollo/client";
import { GET_ALL_BY_SEARCH_LOCATION } from "../../graphqlOperations/query";
const { RangePicker } = DatePicker;

const Replay = () => {
  const [dFrom, setValueFrom] = useState(null);
  const [dTo, setValueTo] = useState(null);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [showReplayMap, setReplayMap] = useState<boolean>(false);

  const showHandler = () => {
    console.log("play btn clicked");
    setReplayMap(true);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setReplayMap(false);
    setSelectedLocationId(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const DatePickerHandler = (value: any[]) => {
    setReplayMap(false);
    const dateResultObj = dateConversionToISO(value);
    setToDate(dateResultObj.finalDTo);
    setFromDate(dateResultObj.finalDFrom);
  };
  // console.log("pages/replay/index.tsx - 1")

  return (
    <>
      <div style={{ height: "100%", width: "100%", position: "relative" }}>
        {showReplayMap ? (
          <ReplayMap
            fromDate={fromDate}
            toDate={toDate}
            selectedLocationId={selectedLocationId}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <p
              style={{
                alignSelf: "center",
              }}
            >
              Please Select Device & Date First
            </p>
          </div>
        )}
        <div style={{ position: "absolute", top: 2, left: 4 }}>
          <RangePickerSearchBox
            onChange={onChange}
            onSearch={onSearch}
            DatePickerHandler={DatePickerHandler}
            showHandler={showHandler}
            selectedLocationId={selectedLocationId}
            fromDate={fromDate}
            toDate={toDate}
          />
        </div>
      </div>
    </>
  );
};

export default Replay;
