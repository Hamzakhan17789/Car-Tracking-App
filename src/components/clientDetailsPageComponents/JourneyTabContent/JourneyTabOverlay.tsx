import {
  Card,
  Col,
  DatePicker,
  Row,
  Tabs,
  Timeline,
  ConfigProvider,
} from "antd";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import arrowDown from "../../../../public/assets/images/arrowDown.png";
import { arr } from "../../../api/app";
import classes from "./JourneyTabContent.module.css";
import mapImg from "../../../../public/assets/images/mapImg.png";
import playImg from "../../../../public/assets/images/playImg.png";
import recordImg from "../../../../public/assets/images/recordImg.png";
import zigImg from "../../../../public/assets/images/zigImg.png";
import barImg from "../../../../public/assets/images/barImg.png";
import JourneyCard from "./JourneyCard";
import moment from "moment";

import {
  GetJourneyType,
  JourneyMapContext,
} from "../../../context/journeyMapContext/JourneyMapContext";
import { Dayjs } from "dayjs";
import * as dayjs from "dayjs";
import { Button } from "antd";
import { RoutesContext } from "../../../context/routesContext/RoutesContext";

const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;

// const initialData: string[] = [];
// const sendInitialData: string[] = [];
// const generateIntitalDate = () => {
//   const currentDate = moment();
//   const weekStart = currentDate.clone().startOf("isoWeek");

//   for (var i = 0; i <= 6; i++) {
//     initialData.push(moment(weekStart).add(i, "days").format("D/MM"));
//     sendInitialData.push(moment(weekStart).add(i, "days").format("D/MM"));
//   }
//   //////console.log("initialDate", initialData[0]);
// };

const JourneyTabOverlay = React.memo(() => {
  const [keyState, setKeyState] = useState<string | undefined>("1");
  // const initialData: string[] = [];
  // const sendInitialData: string[] = [];
  const journeyMapCtx = useContext(JourneyMapContext);
  const routesCtx = useContext(RoutesContext);
  // //////console.log("placeHolderDate", placeHolderDate);
  // useEffect(() => {
  //   const currentDate = moment();
  //   const weekStart = currentDate.clone().startOf("isoWeek");

  //   for (var i = 0; i <= 6; i++) {
  //     initialData.push(moment(weekStart).add(i, "days").format("D/MM"));
  //     sendInitialData.push(moment(weekStart).add(i, "days").format("D/MM"));
  //   }
  //   //////console.log("initialDate", initialData[0]);
  // }, []);

  const [week, setWeek] = useState<string[] | undefined>([""]);
  const [sendDaysData, setSendDaysData] = useState<string[] | undefined>();
  // const placeHolderDate = new Date();
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    localStorage.removeItem("selectedDate");
  }, []);

  const dateSelectionHandler = (date: string) => {
    journeyMapCtx.mappedPath = [];

    journeyMapCtx.setIsDateSelected(!journeyMapCtx.isDateSelected);

    // localStorage.setItem('dateSelected' , date )
  };

  const onChangeDateHandler = (value: any) => {
    journeyMapCtx.setIsDateSelected(!journeyMapCtx.isDateSelected);
    setIsClick(true);
    // const selectedDate: any = value?.$d;
    // const dateNew = new Date(selectedDate);
    // const formatedDate = `${
    //   dateNew.getMonth() + 1
    // }/${dateNew.getDate()}/${dateNew.getFullYear()}`;
    // //////console.log("formatedDate", formatedDate);
    // const currentDate = moment(formatedDate);
    // const weekStart = currentDate.clone().startOf("isoWeek");
    // const days = [];
    // const sendDays = [];
    // for (var i = 0; i <= 6; i++) {
    //   days.push(moment(weekStart).add(i, "days").format("MM/D"));
    //   sendDays.push(moment(weekStart).add(i, "days").format("MM/D/YYYY"));
    // }
    // setWeek(days);
    // setSendDaysData(sendDays);
    // localStorage.setItem("selectedDate", sendDays[0]);
    //////console.log("days", week);
    //////console.log("sendDays", sendDays);
    journeyMapCtx.setIsDateSelected(!journeyMapCtx.isDateSelected);
    setIsClick(true);
    const selectedDate: any = value?.$d;
    const dateNew = new Date(selectedDate);
    const year = dateNew.getUTCFullYear();
    const month = String(dateNew.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateNew.getUTCDate()).padStart(2, "0");
    const hours = String(dateNew.getUTCHours()).padStart(2, "0");
    const minutes = String(dateNew.getUTCMinutes()).padStart(2, "0");
    const seconds = String(dateNew.getUTCSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+00:00`;
    // //console.log("formattedDate", formattedDate);
    journeyMapCtx.gettingDateFromInput(formattedDate);
    routesCtx.gettingInput(formattedDate);
    const currentDate = moment(formattedDate);
    // //console.log("currentDate", currentDate);
    const weekStart = currentDate.clone().startOf("isoWeek");
    const days = [];
    const sendDays = [];
    for (var i = 0; i <= 6; i++) {
      // days.push(moment(weekStart).add(i, "days").format("MM/D"));
      // sendDays.push(moment(weekStart).add(i, "days").format("MM/D/YYYY"));
      days.push(moment(weekStart).add(i, "days").format("MM/D"));
      sendDays.push(
        moment(weekStart).add(i, "days").format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      );
    }
    setWeek(days);
    setSendDaysData(sendDays);
    //  localStorage.setItem("selectedDate", sendDays[0]);
    localStorage.setItem("selectedDate", formattedDate);
    ////console.log(sendDays);
  };

  //////console.log("journey in  journey tab overlay", journeyMapCtx.journey);

  // NEW IMPLEMENTATION OF JOURNEY CARDS

  const { RangePicker } = DatePicker;
  const [selectedDates, setSelectedDates] = useState([]);

  // const handleDateChange = (dates: any) => {
  //   setSelectedDates(dates);
  //   if(dates === null || dates === undefined || dates.length <= 0 ) return
  //   //console.log("Start Date:", dates[0]);
  //   //console.log("End Date:", dates[1]);
  //   //console.log(selectedDates)

  // };

  // const [selectedStartDate, setSelectedStartDate] = useState(null);
  // const [selectedEndDate, setSelectedEndDate] = useState(null);

  // const handleDateChange = (dates: any) => {
  //   setSelectedStartDate(dates[0]);
  //   setSelectedEndDate(dates[1]);

  //   if (dates[1]) {
  //     const formattedStartDate = moment(dates[0]).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  //     const formattedEndDate = moment(dates[1]).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  //     //console.log('Start Date:', formattedStartDate);
  //     //console.log('End Date:', formattedEndDate);
  //     //console.log(dates)
  //   }
  // };

  // useEffect(()=>{
  //   //console.log(selectedStartDate, selectedEndDate)
  // })

  // useEffect(()=>{
  //   if(selectedDates === null || selectedDates === undefined || selectedDates.length <= 0 ) return
  //   if (selectedDates && selectedDates.length === 2) {
  //     const formattedStartDate = moment(selectedDates[0]).format(
  //       "YYYY-MM-DDTHH:mm:ss.SSSZ"
  //     );
  //     const formattedEndDate = moment(selectedDates[1]).format(
  //       "YYYY-MM-DDTHH:mm:ss.SSSZ"
  //     );
  //     //console.log(selectedDates)
  //     //console.log(formattedStartDate === formattedEndDate);
  //      let test1 =  Math.floor(new Date(formattedStartDate).getTime() / 1000)
  //      let test2 =  Math.floor(new Date(formattedEndDate).getTime() / 1000)
  //      //console.log(new Date(test1 * 1000))
  //      //console.log(new Date(test2 * 1000))
  //   }
  // },[selectedDates, selectedDates?.length])

  return (
    <Card
      style={{
        width: "317px",
        height: "511px",
        overflowY: "auto",
        marginTop: "5px",
      }}
      bodyStyle={{ padding: "10px" }}
    >
      <Row>
        <Col span={24}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>All Journey</p>
          </div>
        </Col>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            {/* <ConfigProvider locale={locale}> */}
            <DatePicker
              suffixIcon={<Image src={arrowDown} alt="arrowDown" />}
              bordered={false}
              picker="week"
              onChange={onChangeDateHandler}
              // defaultValue={dayjs(placeHolderDate)}
              allowClear={false}
            />
          </div>
        </Col>
        {/* day selector */}
        <Col span={24}>
          {isClick ? (
            <Tabs
              defaultActiveKey={keyState}
              tabBarGutter={15}
              className={classes.tabStyle}
              onChange={(e) => {
                setKeyState(e);
              }}
              tabBarStyle={{ margin: "0px" }}
            >
              <div style={{ background: "#f5f5f5" }}>
                <div style={{ marginTop: "10px" }}>
                  <Image src={mapImg} alt="map-img" />
                  <span style={{ fontSize: "12px", margin: "0px 5px" }}>
                    {journeyMapCtx?.journey?.length} Trips
                  </span>
                  <Image src={mapImg} alt="map-img" />
                  <span style={{ fontSize: "12px" }}></span>
                </div>
                {journeyMapCtx.allTrips?.map((item: any, index: number) => {
                  return (
                    <>
                      <JourneyCard
                        avgSpeed={item?.averageSpeed!}
                        maxSpeed={item?.maxSpeed}
                        durationMin={item?.duration}
                        startTime={item?.startTime}
                        endTime={item?.endTime}
                        indexOfSelectedTrip={index}
                      />
                    </>
                  );
                })}
              </div>
            </Tabs>
          ) : (
            <p>Please Select Date</p>
          )}
        </Col>
      </Row>
    </Card>
  );
});

export default JourneyTabOverlay;