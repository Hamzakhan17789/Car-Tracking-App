import React, { useContext, useState, useEffect } from "react";
import { GraphqlMapContext } from "../../context/graphqlOperationsContext/graphqlMapContext";
import classes from "./Widget.module.css";
import { SocketContext } from "../../context/socketContext/socketContext";
import { Col, Row, Typography } from "antd";
import moment from "moment";
import { xTimeDateFormat } from "../../helper/xformat";
import { xF } from "../../utils/xdevices/xformat";

const Widget = React.memo(() => {
  const graphlqlMapCtx = useContext(GraphqlMapContext);
  const socketCtx = useContext(SocketContext);
  const { Title, Paragraph, Text, Link } = Typography;

  // DB

  const [batteryFromDB, setBatteryFromDB] = useState<any>();
  const [speedFromDB, setSpeedFromDB] = useState<any>();
  const [ignitionFromDB, setIgnitionFromDB] = useState<any>();
  const [powerFromDB, setPowerFromDB] = useState<any>();
  const [dallasTempFromDB, setDallasTempFromDB] = useState<any>();
  const [totalDistanceFromDB, setTotalDistanceFromDB] = useState<any>();
  const [hoursFromDB, setHoursFromDB] = useState<any>();
  const [serverTimeFromDB, setServerTimeFromDB] = useState<any>();
  const [deviceTimeFromDB, setDeviceTimeFromDB] = useState<any>();
  const [fuelLevelFromDB, setFuelLevelFromDB] = useState<any>();
  const [bleTempFromDB, setBleTempFromDB] = useState<any>();
  // Socket

  const [batteryFromSocket, setBatteryFromSocket] = useState<any>();
  const [speedFromSocket, setSpeedFromSocket] = useState<any>();
  const [ignitionFromSocket, setIgnitionFromSocket] = useState<any>();
  const [serverTimeFromSocket, setServerTimeFromSocket] = useState<any>();
  const [deviceTimeFromSocket, setDeviceTimeFromSocket] = useState<any>();
  const [dallasTempFromSocket, setDallasTempFromSocket] = useState<any>();
  const [powerFromSocket, setPowerFromSocket] = useState<any>();
  const [totalDistanceFromSocket, setTotalDistanceFromSocket] = useState<any>();
  const [hoursFromSocket, setHoursFromSocket] = useState<any>();
  const [fuelLevelFromSocket, setFuelLevelFromSocket] = useState<any>();
  const [bleTempFromSocket, setBleTempFromSocket] = useState<any>();
  useEffect(() => {
    setBatteryFromDB(graphlqlMapCtx.graphqlBatteryVoltage);
    setSpeedFromDB(graphlqlMapCtx.graphqlSpeed);
    setIgnitionFromDB(graphlqlMapCtx.graphqlIgnition);
    setPowerFromDB(graphlqlMapCtx.graphqlPower);
    setDallasTempFromDB(graphlqlMapCtx.graphqlDallasTemp);
    setTotalDistanceFromDB(graphlqlMapCtx.graphqlTotalDistance);
    setHoursFromDB(graphlqlMapCtx.graphqlHours);
    setServerTimeFromDB(graphlqlMapCtx.graphqlServerTime);
    setDeviceTimeFromDB(graphlqlMapCtx.graphqlDeviceTime);
    setFuelLevelFromDB(graphlqlMapCtx.graphqlFuelLevel)
    setBleTempFromDB(graphlqlMapCtx.graphqlBleTemp)

    setBatteryFromSocket(socketCtx.batteryVoltage);
    setSpeedFromSocket(socketCtx.speed);
    setIgnitionFromSocket(socketCtx.ignition);
    setServerTimeFromSocket(socketCtx.serverTime);
    setDeviceTimeFromSocket(socketCtx.deviceTime);
    setDallasTempFromSocket(socketCtx.dallasTemp);
    setPowerFromSocket(socketCtx.power);
    setTotalDistanceFromSocket(socketCtx.totalDistance);
    setHoursFromSocket(socketCtx.hours);
    setFuelLevelFromSocket(socketCtx.fuelLevel)
    setBleTempFromSocket(socketCtx.bleTemp)
  }, [

    //Graphql Map Context Dependencies
    graphlqlMapCtx.graphqlMapDataLoaded,
    socketCtx.socketDataLoaded,
    graphlqlMapCtx.graphqlTotalDistance,
    graphlqlMapCtx.graphqlBatteryVoltage,
    graphlqlMapCtx.graphqlSpeed,
    graphlqlMapCtx.graphqlIgnition,
    graphlqlMapCtx.graphqlPower,
    graphlqlMapCtx.graphqlDallasTemp,
    graphlqlMapCtx.graphqlHours,
    graphlqlMapCtx.graphqlServerTime,
    graphlqlMapCtx.graphqlDeviceTime,
    graphlqlMapCtx.graphqlFuelLevel,
    graphlqlMapCtx.graphqlBleTemp,


    //Socket Context Dependencies
    socketCtx.batteryVoltage,
    socketCtx.speed,
    socketCtx.ignition,
    socketCtx.power,
    socketCtx.serverTime,
    socketCtx.totalDistance,
    socketCtx.hours,
    socketCtx.deviceTime,
    socketCtx.dallasTemp,
    socketCtx.bleTemp,
  ]);

  const getValue = (
    sockedDataLoaded: boolean,
    graphqlMapDataLoaded: boolean,
    parameter: any
  ) => {
    if (parameter === "battery") {
      const batteryValue =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? batteryFromDB
          : batteryFromSocket;
      const  batteryValueResult = batteryValue !== undefined && batteryValue !== null
        ? Number(batteryValue).toFixed(2)
        : "-";
      //  return batteryValueResult
return xF.xBatteryPowerFormat(Number(batteryValue), false)
    } else if (parameter === "speed") {
      const speedValue =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? speedFromDB
          : speedFromSocket;
      const speedValueResult = speedValue !== undefined && speedValue !== null
        ? Number(speedValue).toFixed(2)
        : "-";
       // return speedValueResult
        return xF.xSpeedFormat(speedValue, false)
    } else if (parameter === "serverTime") {
      const serverTimeResult =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? serverTimeFromDB
          : serverTimeFromSocket;
      const formattedServerTimeResult =
        serverTimeResult === undefined ||
        serverTimeResult === null ||
        typeof serverTimeResult !== "string"
          ? "-"
          : moment(serverTimeResult).format("hh:mm:ss a, DD.MM.YY");

//      return formattedServerTimeResult;

return xF.xTimeDateFormat(serverTimeResult,false)
    } else if (parameter === "deviceTime") {
      const deviceTimeResult =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? deviceTimeFromDB
          : deviceTimeFromSocket;
      const formattedDeviceTimeResult =
        deviceTimeResult === undefined ||
        deviceTimeResult === null ||
        typeof deviceTimeResult !== "string"
          ? "-"
          : moment(deviceTimeResult).format("hh:mm:ss a, DD.MM.YY");
  //    return formattedDeviceTimeResult;
  return xF.xTimeDateFormat(deviceTimeResult , false)
    } else if (parameter === "dallasTemp") {
      const dallastempValue =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? dallasTempFromDB
          : dallasTempFromSocket;
      const dallasTempResult =
        typeof dallastempValue !== "number"
          ? "-"
          : (dallastempValue * 0.1).toFixed(2);
   //   return dallasTempResult;
   return  xF.xio72Format(dallastempValue, false)
    } else if (parameter === "ignition") {
      const ignitionValue =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? ignitionFromDB
          : ignitionFromSocket;
      const igntionResult = ignitionValue === 1 ? "ON" : "OFF";
   //   return igntionResult;
   console.log('ignition Value ' , ignitionValue)
   return xF.xIgnitionFormat(ignitionValue,true)
    } else if (parameter === "power") {
      const powerValue =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? powerFromDB
          : powerFromSocket;
      const powerResult =  powerValue === undefined || powerValue === null
          ? "-"
          : `${powerValue} mV`;
   //   return powerResult;
   return xF.xBatteryPowerFormat(powerValue, false)
    } else if (parameter === "totalDistance") {
      const totalDistanceValue =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? totalDistanceFromDB
          : totalDistanceFromSocket;
      const totalDistanceResult =
        totalDistanceValue === undefined || totalDistanceValue === undefined
          ? "-"
          : totalDistanceValue;
     // return totalDistanceResult;
     return xF.xMtoKM(totalDistanceValue, false)
    } else if (parameter === "hours") {
      const hoursValue =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? hoursFromDB
          : hoursFromSocket;
      const formattedHours =
        typeof hoursValue === "number"
          ? moment(hoursValue).format("hh:mm:ss")
          : "-";
     // return formattedHours;
     return xF.xTimeFormat(hoursValue, false)
    } else if (parameter === "bleTemp") {
      const bleTempValue =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? bleTempFromDB
          : bleTempFromSocket;
      const bleTempResult =
        bleTempValue === undefined ||
        bleTempValue === null ||
        typeof bleTempValue !== "number"
          ? "-"
          : Math.round(bleTempValue * 0.1) * 100;
 //     return bleTempResult;
 return xF.xio25Format(bleTempValue , false)
    } else if (parameter === "fuelLevel") {
      const fuelLevelValue =
        !sockedDataLoaded && graphqlMapDataLoaded
          ? fuelLevelFromDB
          : fuelLevelFromSocket;
      const fuelLevelResult =
        fuelLevelValue === undefined ||
        fuelLevelValue === null ||
        typeof fuelLevelValue !== "number"
          ? "-"
          : Math.round(fuelLevelValue * 0.1) * 100;
 //     return fuelLevelResult;
 return xF.xio270Format(fuelLevelValue , false)
    }
  };

  return (
    <div
      className={classes.widgetContainer}
      style={{
        // position: "absolute",
        // top: 10,
        // right: 10,
        padding: "10px 20px",
        backgroundColor: "rgba(255, 255, 255, .7)",
      }}
    >
      <Row gutter={[24, 10]}>
        <Col span={10}>
          <Typography style={{ minWidth: 84, maxWidth: 84 }}>
            <Paragraph style={{ fontSize: 12 }}>Server Time:</Paragraph>
            <Paragraph style={{ fontSize: 12 }}>Device Time:</Paragraph>
            <Paragraph style={{ fontSize: 12 }}>Ignition:</Paragraph>
            <Paragraph style={{ fontSize: 12 }}>Speed:</Paragraph>
            <Paragraph style={{ fontSize: 12 }}>Power:</Paragraph>
            <Paragraph style={{ fontSize: 12 }}>Battery:</Paragraph>
            <Paragraph style={{ fontSize: 12 }}>Engine Hrs:</Paragraph>
            <Paragraph style={{ fontSize: 12 }}>Total Distance:</Paragraph>
            <Paragraph style={{ fontSize: 12 }}>Dallas Temp.:</Paragraph>
            <Paragraph style={{ fontSize: 12 }}>BLE Temp.:</Paragraph>
            <Paragraph style={{ fontSize: 12 }}>Fuel Level:</Paragraph>
          </Typography>
        </Col>

        <Col span={14}>
          <Typography
            style={{ minWidth: 140, maxWidth: 140, textAlign: "right" }}
          >
            <Paragraph style={{ fontSize: 12 }}>
              {getValue(
                socketCtx.socketDataLoaded,
                graphlqlMapCtx.graphqlMapDataLoaded,
                "serverTime"
              )}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              {getValue(
                socketCtx.socketDataLoaded,
                graphlqlMapCtx.graphqlMapDataLoaded,
                "deviceTime"
              )}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              {getValue(
                socketCtx.socketDataLoaded,
                graphlqlMapCtx.graphqlMapDataLoaded,
                "ignition"
              )}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              {getValue(
                socketCtx.socketDataLoaded,
                graphlqlMapCtx.graphqlMapDataLoaded,
                "speed"
              )}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              {getValue(
                socketCtx.socketDataLoaded,
                graphlqlMapCtx.graphqlMapDataLoaded,
                "power"
              )}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              {getValue(
                socketCtx.socketDataLoaded,
                graphlqlMapCtx.graphqlMapDataLoaded,
                "battery"
              )}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              {getValue(
                socketCtx.socketDataLoaded,
                graphlqlMapCtx.graphqlMapDataLoaded,
                "hours"
              )}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              {getValue(
                socketCtx.socketDataLoaded,
                graphlqlMapCtx.graphqlMapDataLoaded,
                "totalDistance"
              )}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              {getValue(
                socketCtx.socketDataLoaded,
                graphlqlMapCtx.graphqlMapDataLoaded,
                "dallasTemp"
              )} °C
              
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              {getValue(
                socketCtx.socketDataLoaded,
                graphlqlMapCtx.graphqlMapDataLoaded,
                "bleTemp"
              )}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>{getValue(socketCtx.socketDataLoaded, graphlqlMapCtx.graphqlMapDataLoaded , 'fuelLevel')}</Paragraph>
          </Typography>
        </Col>
      </Row>

      {/* <p>
        Latitude:
        {latitudeValueFinal === undefined || latitudeValueFinal === null
          ? "-"
          : latitudeValueFinal}{" "}
      </p>
      <p>
        Battery:{" "}
        {batteryValueFinal === undefined || batteryValueFinal === null
          ? "-"
          : batteryValueFinal}{" "}
      </p> */}
    </div>
  );
});

export default Widget;
