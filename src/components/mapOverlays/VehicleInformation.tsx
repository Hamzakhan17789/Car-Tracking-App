import { Card, Col, Row } from "antd";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import VehicleInformationHeader from "./VehicleInformationHeader";
import carEngine from "../../../public/assets/images/car-engine@2x.png";
import batteryIcon from "../../../public/assets/images/battery-5@2x.png";
import gsmIcon from "../../../public/assets/images/signal@2x.png";
import immbolizerIcon from "../../../public/assets/images/Group 1915@2x.png";
import gpsIcon from "../../../public/assets/images/outline-gps-fixed@2x.png";
import seatBetlIcon from "../../../public/assets/images/seatbelt@2x.png";
import kmIcon from "../../../public/assets/images/efficiency@2x.png";
import deviceTimeIcon from "../../../public/assets/images/time@2x.png";
import fuelIcon from "../../../public/assets/images/fuel (2)@2x.png";
import VehcileLogoInformation from "./VehcileLogoInformation";
import { SocketContext } from "../../context/socketContext/socketContext";
import { GraphQlOperationContext } from "../../context/graphqlOperationsContext/graphqlOperationsContext";
import { GraphqlMapContext } from "../../context/graphqlOperationsContext/graphqlMapContext";
import { xF } from "../../utils/xdevices/xformat";

const VehicleInformation = React.memo(({ overlayHeight }: any) => {
  const socketCtx = useContext(SocketContext);
  ////////////console.loglog(socketCtx);
  const graphqlCtx = useContext(GraphQlOperationContext);

  const [ignition, setIgnition] = useState<any>(socketCtx.ignition);
  const [batteryVoltage, setBatteryVoltage] = useState<any>(
    socketCtx.batteryVoltage
  );
  const [gsm, setGsm] = useState<number | null>(socketCtx.gsm);
  const [speed, setSpeed] = useState<number | null>(null);
  ////////////console.loglog(ignition, batteryVoltage);
  const [timestamp, setTimestamp] = useState<number | undefined | any>(
    undefined
  );
  const [gps, setGps] = useState<any>(undefined);
  const [odometer, setOdometer] = useState<number | null>(null);

  const [vehicleInformation, setVehicleInformation] = useState(
    graphqlCtx.vehicleInformation
  );

  useEffect(() => {
    setVehicleInformation(graphqlCtx.vehicleInformation);
  }, []);

  useEffect(() => {
    setIgnition(socketCtx.ignition);
    setBatteryVoltage(socketCtx.batteryVoltage);
    setSpeed(socketCtx.speed);
    setGsm(socketCtx.gsm);

    setGps(socketCtx.gps);

    setOdometer(socketCtx.odometer);
    setTimestamp(socketCtx.timestamp);
  }, [
    socketCtx.ignition,
    socketCtx.batteryVoltage,
    socketCtx.gsm,
    socketCtx.gps?.latitude,
    socketCtx?.gps?.longitude,
    socketCtx?.odometer,
  ]);
  ////console.log("timestamp in vehicleinfo", timestamp);
  ////console.log(typeof timestamp);
  const date = new Date(timestamp! * 1000);
  ////console.log("date in vehicleInfo", date);
  let dd = String(date.getDate());
  let mm = String(date.getMonth() + 1);
  let yyyy = date.getFullYear();
  let hh = String(date.getHours()).padStart(2);
  let min = String(date.getMinutes());

  let formattedDate = dd + "-" + mm + "-" + yyyy + "-" + hh + ":" + min;
  let formattedDateValue = timestamp === undefined ? "No Value" : formattedDate;
  ////console.log("formattedDateValue", formattedDateValue);
  let ignitonValue: any = ignition === 1 ? "ON" : "OFF";
  let batteryVoltageValue: any =
    typeof batteryVoltage === "number" && socketCtx.socketDataLoaded
      ? batteryVoltage
      : "No Value";
  let gsmValue: string =
    typeof gsm === "number" ? gsm?.toString() : "No Signal";

  let gpsValue =
    (gps?.latitude === 0 && gps?.longitude === 0) || gps === undefined
      ? "Off"
      : "On From Socket";

  let odometerValue = odometer === null ? "0" : String(odometer);

  // Working on  Vehicle Information card
  const graphQLGetAllClientsCtx = useContext(GraphQlOperationContext);
  // //////console.log("Vehicle Information Card", graphQLGetAllClientsCtx.mergeData);

  const [model, setModel] = useState<string | undefined>("");
  const [registration, setRegistration] = useState<string | undefined>("");
  const [chassis, setChassis] = useState<string | undefined>("");
  const [engineNo, setEngineNo] = useState<string | undefined>("");
  const [deviceID, setDeviceID] = useState<string | undefined>("");
  const [simNumber, setSimNumber] = useState<string | undefined>("");
  useEffect(() => {
    setModel(graphQLGetAllClientsCtx.model);
    setRegistration(graphQLGetAllClientsCtx.registration);
    setChassis(graphQLGetAllClientsCtx.chassis);
    setEngineNo(graphQLGetAllClientsCtx.engine);
    setDeviceID(graphQLGetAllClientsCtx.deviceID);
    setSimNumber(graphQLGetAllClientsCtx.simNumber);

    ////////console.log(graphQLGetAllClientsCtx.engine);
  }, [
    graphQLGetAllClientsCtx.model,
    graphQLGetAllClientsCtx.registration,
    graphQLGetAllClientsCtx.chassis,
    graphQLGetAllClientsCtx.engine,
    graphQLGetAllClientsCtx.deviceID,
    graphQLGetAllClientsCtx.simNumber,
  ]);

  const modelValue = model === undefined || model === null ? "-" : model;
  const registrationValue =
    registration === undefined || registration === null ? "-" : registration;
  const chassisValue =
    chassis === undefined || chassis === null ? "-" : chassis;
  const engineNoValue =
    engineNo === undefined || engineNo === null ? "-" : engineNo;
  const deviceIDValue =
    deviceID === undefined || deviceID == null ? "-" : deviceID;
  const simNumberValue =
    simNumber === undefined || simNumber === null ? "-" : simNumber;

  // DATA FETCHING FROM DATABASE INCASE SOCKET TAKES TIME OR FAILS

  const mapCtx = useContext(GraphqlMapContext);
  const [ignitionFromDB, setIgnitionFromDB] = useState<any>(
    mapCtx.graphqlIgnition
  );
  const [timestampFromDB, setTimestampFromDB] = useState(
    mapCtx.graphqlTimestamp
  );
  const [gpsFromDB, setGPSFromDB] = useState(mapCtx.gps);
  const [batteryVoltageFromDB, setBatteryVoltageFromDB] = useState<any>(
    mapCtx.graphqlBatteryVoltage
  );
  const [odometerFromDB, setOdometerFromDB] = useState(mapCtx.graphqlOdometer);
  useEffect(() => {
    setIgnitionFromDB(mapCtx.graphqlIgnition);
    //   setTimestampFromDB(Number(mapCtx.graphqlTimestamp));
    setTimestampFromDB(mapCtx.graphqlTimestamp);
    setGps(mapCtx.gps);
    // //////console.log(ignitionFromDB)
    ////////console.log(mapCtx.graphqlBatteryVoltage)
    setBatteryVoltageFromDB(mapCtx.graphqlBatteryVoltage);
    setOdometerFromDB(mapCtx.graphqlOdometer);
  }, [
    mapCtx.graphqlIgnition,
    mapCtx.graphqlTimestamp,
    mapCtx.gps,
    mapCtx.graphqlBatteryVoltage,
    mapCtx.graphqlOdometer,
  ]);

  const ignitionFromDbValue = ignitionFromDB === 1 ? "ON" : "OFF";

  const batteryVolFromDBValue =
    batteryVoltageFromDB === undefined || batteryVoltageFromDB === null
      ? "-"
      : `${batteryVoltageFromDB.toFixed(2)}`;

  const odometerValueFromDB =
    odometerFromDB === null || odometerFromDB === undefined
      ? "-"
      : `${odometerFromDB}`;

  let ddDB;
  let mmDB;
  let yyyyDB;
  let hhDB;
  let minDB;

  // if (!Number.isNaN(timestampFromDB)) {
  //   const dateDB = new Date(timestampFromDB!);
  //   //////console.log("dateDB", dateDB.getDate());
  //   //////console.log(Number.isNaN(dateDB.getDate()));
  //   ddDB = String(dateDB.getDate());
  //   mmDB = String(dateDB.getMonth() + 1);
  //   yyyyDB = dateDB.getFullYear();
  //   hhDB = String(dateDB.getHours()).padStart(2);
  //   minDB = `: ${String(dateDB.getMinutes())}`;
  // } else {
  //   ddDB = "-";
  //   mmDB = "-";
  //   yyyyDB = "-";
  //   hhDB = "-";
  //   minDB = "-";
  // }
  let formattedDateDB = ddDB + "-" + mmDB + "-" + yyyyDB + "-" + hhDB + minDB;

  //TEMP SOLUTION
  let tempYear;
  let tempMonth;
  let tempDay;
  let tempHours;
  let tempMinutes;
  let tempDate;

  if (timestampFromDB) {
    const date = new Date(timestampFromDB);
    const unixTimestamp = Math.floor(date.getTime() / 1000);

    tempDate = new Date(unixTimestamp! * 1000);

    tempDay = String(tempDate.getDate());
    tempMonth = String(tempDate.getMonth() + 1);
    tempYear = tempDate.getFullYear();
    tempHours = String(tempDate.getHours()).padStart(2);
    tempMinutes = String(tempDate.getMinutes());
  } else {
    tempYear = "-";
    tempMonth = "-";
    tempDay = "-";
    tempHours = "-";
    tempMinutes = "-";
  }

  const tempFormattedDate =
    tempDay +
    "-" +
    tempMonth +
    "-" +
    tempYear +
    "-" +
    tempHours +
    ":" +
    tempMinutes;

  //  //console.log( "finalDate From DB" ,tempFormattedDate);

  //////console.log("ddDB", ddDB);

  let gpsFromDBValue =
    (gpsFromDB?.latitude === 0 && gpsFromDB?.longitude === 0) ||
    gpsFromDB === undefined
      ? "Off"
      : "On";

  const batteryValueFinal =
    !socketCtx.socketDataLoaded && mapCtx.graphqlMapDataLoaded
      ? `${batteryVolFromDBValue}`
      : batteryVoltageValue;
  // console.log(xF.xBatteryPowerFormat(batteryValueFinal, false))

  // New Solution
  const newBatteryValue =
    !socketCtx.socketDataLoaded && mapCtx.graphqlMapDataLoaded
      ? batteryVoltageFromDB
      : batteryVoltage;
  const batteryResult = xF.xBatteryPowerFormat(newBatteryValue, false);

  const newIgnitionValue =
    !socketCtx.socketDataLoaded && mapCtx.graphqlMapDataLoaded
      ? ignitionFromDB
      : ignition;
  const ignitionResult = xF.xIgnitionFormat(newIgnitionValue, false);

  const newDeviceTime =
    !socketCtx.socketDataLoaded && mapCtx.graphqlMapDataLoaded
      ? timestampFromDB
      : timestamp;

  const deviceTimeResult = xF.xTimeDateFormat(newDeviceTime, false);

  const ignitionValueFinal =
    !socketCtx.socketDataLoaded && mapCtx.graphqlMapDataLoaded
      ? ignitionFromDbValue
      : ignitonValue;
  const odometerValueFinal =
    !socketCtx.socketDataLoaded && mapCtx.graphqlMapDataLoaded
      ? odometerValueFromDB
      : odometerValue;
  const gpsValueFinal =
    !socketCtx.socketDataLoaded && mapCtx.graphqlMapDataLoaded
      ? gpsFromDBValue
      : gpsValue;
  const formattedDateValueFinal =
    !socketCtx.socketDataLoaded && mapCtx.graphqlMapDataLoaded
      ? `${formattedDateDB}`
      : formattedDateValue;
  const gsmValueFinal =
    !socketCtx.socketDataLoaded && mapCtx.graphqlMapDataLoaded
      ? "No Signal"
      : gsmValue;

  // TEMP DATE
  ////console.log("tempFormattedDate",tempFormattedDate)
  const tempFormattedDateValueFinal =
    !socketCtx.socketDataLoaded && mapCtx.graphqlMapDataLoaded
      ? `${tempFormattedDate}`
      : formattedDateValue;
  ////console.log(tempFormattedDateValueFinal)

  const [socketData, setSocketData] = useState<any>([]);
  useEffect(() => {
    setSocketData(socketCtx.filteredPositionData);
  }, [socketCtx.socketData?.length]);
  console.log("socketData in Vehicle Information", socketData);
  // const renderingListFromSocket = socketData.map((ele: any) => {
  //   return (
  //     <>
  //       <p>{ele.latitude} FROM SOCKET</p>
  //       <p>{ele.longitude}</p>
  //       <p>{ele.accuracy}</p>
  //       <p>{ele.network} Network</p>
  //       <ul>
  //         {Object.entries(ele?.attributes).map((item: any, i) => {
  //           return (
  //             <p>
  //               {" "}
  //               {item[0]} {item[1]}
  //             </p>
  //           );
  //         })}
  //       </ul>
  //     </>
  //   );
  // });

  const uiPropertyNames = [
    "battery",
    "bleTemp1",
    "distance",
    "event",
    "hours",
    "ignition",
    "in1",
    "io9",
    "io24",
    "io29",
    "io80",
    "io113",
    "io263",
    "io270",
    "io387",
    "motion",
    "odometer",
    "operator",
    "power",
    "priority",
    "rssi",
    "sat",
    "totalDistance",
    "tripOdometer",
  ];
console.log("socketData" ,socketCtx.filteredPositionData)

const filteredArrayForSocket = socketCtx.filteredPositionData?.map((obj) => {
    const newObj: any = {};
    uiPropertyNames.forEach((propName) => {
      if (obj?.attributes?.hasOwnProperty(propName)) {
        return (newObj[propName] = obj?.attributes[propName]);
      }
    });
    console.log( "socketOBJ" ,newObj);
    return newObj;
  });


console.log(filteredArrayForSocket)

// const filteredArrayForGraphQL = mapCtx.coordinates?.map((obj) => {
//   const newObj: any = {};
//   uiPropertyNames.forEach((propName) => {
//     if (obj?.geo_location?.attributes?.hasOwnProperty(propName)) {
//       return (newObj[propName] = obj.geo_location.attributes[propName]);
//     }
//   });
//   //console.log(newObj);
//   return newObj;
// });



const renderingListFromSocket = filteredArrayForSocket?.map(
  (obj, index) => {
//      console.log(obj);
//    console.log(Object.entries(obj));

    return (
      <li key={index}>
        {Object.entries(obj).map((item, i) => {
          console.log(item);
          const key: any = item[0];
          const value: any = item[1];
          //console.log(key);
          //console.log("value is", value);

          if (key === "battery") {
            return (
              <p>
                {key}: {value} from socket
              </p>
            );
          }
          if (key === "bleTemp1") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "distance") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "event") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "hours") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "ignition") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "in1") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "io9") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "i024") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "i029") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "i080") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "i0113") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "io263") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "io270") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "io387") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "motion") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "odometer") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "operator") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "power") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "priority") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "rssi") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "sat") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "totalDistance") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
          if (key === "tripOdometer") {
            return (
              <p>
                {key} : {value}
              </p>
            );
          }
        })}
      </li>
    );
  }
);











































  const filteredArrayForGraphQL = mapCtx.coordinates?.map((obj) => {
    const newObj: any = {};
    uiPropertyNames.forEach((propName) => {
      if (obj?.geo_location?.attributes?.hasOwnProperty(propName)) {
        return (newObj[propName] = obj.geo_location.attributes[propName]);
      }
    });
    //console.log(newObj);
    return newObj;
  });

  const renderingListFromGraphQL = filteredArrayForGraphQL?.map(
    (obj, index) => {
//      console.log(obj);
  //    console.log(Object.entries(obj));

      return (
        <li key={index}>
          {Object.entries(obj).map((item, i) => {
            console.log(item);
            const key: any = item[0];
            const value: any = item[1];
            //console.log(key);
            //console.log("value is", value);

            if (key === "battery") {
              return (
                <p>
                  {key}: {value}
                </p>
              );
            }
            if (key === "bleTemp1") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "distance") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "event") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "hours") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "ignition") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "in1") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "io9") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "i024") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "i029") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "i080") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "i0113") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "io263") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "io270") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "io387") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "motion") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "odometer") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "operator") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "power") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "priority") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "rssi") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "sat") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "totalDistance") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
            if (key === "tripOdometer") {
              return (
                <p>
                  {key} : {value}
                </p>
              );
            }
          })}
        </li>
      );
    }
  );








  return (
    <Card
      //394px
      style={{
        width: "250px",
        maxHeight: "400px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
      bodyStyle={{ padding: "12px" }}
    >
      <p style={{ fontSize: "14px", fontWeight: "bold" }}>
        Vehicle Information
      </p>
      <VehicleInformationHeader title={"Model"} value={modelValue} />
      <VehicleInformationHeader
        title={"Registration"}
        value={registrationValue}
      />
      <VehicleInformationHeader title={"Chasis"} value={chassisValue} />
      <VehicleInformationHeader title={"Engine No"} value={engineNoValue} />
      <VehicleInformationHeader title={"Device ID"} value={deviceIDValue} />
      <VehicleInformationHeader title={"Sim Number"} value={simNumberValue} />

      {/* {renderingListFromGraphQL} */}
      <Row>
        {renderingListFromSocket}
        {/* <Col span={24}>
          <VehcileLogoInformation
            image1={carEngine}
            title1={"Ignition"}
            //  value1={ignitonValue}
       //     value1={ignitionValueFinal}
            // value1={ignitionValueFromDBFinal}
            value1={ignitionResult}
            image2={batteryIcon}
            title2={"Battery Voltage"}
            //   value2={batteryVoltageValue}
            //     value2={ batteryVolFromDBfinalValue}
         //   value2={batteryValueFinal}
         value2={batteryResult}
            image3={gsmIcon}
            title3={"GSM"}
            //   value3={gsmValue}
            value3={gsmValueFinal}
            style1="23px"
            style2="12px"
            style3="17px"
          />
        </Col>
        <Col span={24}>
          <VehcileLogoInformation
            image1={immbolizerIcon}
            title1={"Immobilzier"}
            value1={"On"}
            image2={gpsIcon}
            title2={"GPS"}
            //  value2={gpsValue}
            value2={gpsValueFinal}
            image3={seatBetlIcon}
            title3={"Seat belt"}
            value3={"On"}
            style1="21px"
            style2="15px"
            style3="14px"
          />
        </Col>
        <Col span={24}>
          <VehcileLogoInformation
            image1={kmIcon}
            title1={"Odometer"}
            //        value1={odometerValue}
            // value1={odometerValueFromDBfinal}
            value1={odometerValueFinal}
            image2={deviceTimeIcon}
            title2={"Device Time"}
            //  value2={formattedDateValue}
            //  value2={formattedDateValueDBFinal}
            // value2={formattedDateValueFinal}
            // value2={
            //   tempFormattedDateValueFinal === "NaN-NaN-NaN-NaN:NaN"
            //     ? "-"
            //     : tempFormattedDateValueFinal
            // }
            //  value2={tempFormattedDate}
            value2={deviceTimeResult}
            image3={fuelIcon}
            title3={"Fuel"}
            value3={"On"}
            style1="15px"
            style2="16px"
            style3="16px"
          />
        </Col> */}
      </Row>
    </Card>
  );
});

export default VehicleInformation;
