import React, { useState, useEffect } from "react";
import {
  Button,
  Spin,
  message,
  Col,
  Row,
  Divider,
  Typography,
  Drawer,
} from "antd";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { CAR_ICON_SVG, GOOGLE_MAP_API } from "../../helper/api";
import { useQuery } from "@apollo/client";
import { GET_ALL_ROUTES_AND_TRIPS } from "../../graphqlOperations/query";
import { dateConversionToISO } from "../helperFunctions/ReportFunctions";
import moment from "moment";
import {
  CarFilled,
  CarTwoTone,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import RoutesTable from "../tables/RoutesTable";
import RoutesTableDrawer from "../tables/RoutesTableDrawer";
import { 
  xTureFalseFormat, xMtoKM, xTimeHourMins, xTimeDateFormat, xTimeFormat, xIgnitionFormat, xSpeedFormat, xBatteryPowerFormat, xio72Format, xio270Format, xio25Format, xio9Format, xBatteryLevelFormat
} from "../../helper/xformat";
import {xF} from "../../utils/xdevices/xformat";

const { Title, Paragraph, Text, Link } = Typography;

const staticCordsCenter = {
  lat: 24.906095,
  lng: 67.080299,
};

const car = CAR_ICON_SVG;
const icon = {
  path: car,
  scale: 0.5,
  strokeColor: "white",
  strokeWeight: 0.1,
  fillOpacity: 1,
  fillColor: "#151515",
  offset: "2%",
  rotation: 240,
};

const iconx = {
  path: "M584.551 527.266L629.321 507.861L629.326 507.872C629.602 507.747 629.88 507.626 630.161 507.509C656.819 496.344 693.74 524.107 712.627 569.519C731.513 614.93 725.213 660.794 698.555 671.959C698.286 672.072 698.016 672.18 697.745 672.285L654.317 691.137L632.012 638.745C625.954 630.303 620.525 620.613 616.09 609.949C611.998 600.111 609.089 590.252 607.312 580.729L584.551 527.266Z",
  scale: 0.5,
  strokeColor: "white",
  strokeWeight: 0.1,
  fillOpacity: 1,
  fillColor: "#151515",
  offset: "2%",
  rotation: 240,
};

const iconStart = {
  url: "https://cloudornate.com/icons/pin2.png",
  anchor: { x: 0, y: 32 },
  scaledSize: { width: 32, height: 32 },
};

const iconEnd = {
  url: "https://cloudornate.com/icons/pin-end.gif",
  anchor: { x: 0, y: 0 },
  scaledSize: { width: 0, height: 0 },
};

const iconCar = {
  url: "https://cloudornate.com/icons/car.png",
  anchor: { x: 0, y: 32 },
  scaledSize: { width: 32, height: 32 },
};

const ReplayMap = React.memo(
  ({ fromDate, toDate, selectedLocationId }: any) => {
    const [info, setInfo] = useState(null); // Waqas
    const [carMove, setCarMove] = useState<any>();
    const [carMoveAllData, setCarMoveAllData] = useState<any>();
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: GOOGLE_MAP_API,
    });
    // console.log("fromDate ReplayMaps", fromDate);
    // console.log("toDate ReplayMaps", toDate);
    const [isVideoPlayer, setIsVideoPlayer] = useState<boolean>(false);
    //Drawer
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };

    const { data, loading, error } = useQuery(GET_ALL_ROUTES_AND_TRIPS, {
      variables: {
        from: fromDate,
        to: toDate,
        locationId: Number(selectedLocationId),
        getAllTripFrom2: fromDate,
        getAllTripTo2: toDate,
        getAllTripLocationId2: Number(selectedLocationId),
      },
    });

    const [letLongArr, setLetLongArr] = useState<any>({ lat: 0, lng: 0 });
    const [velocity, setVelocity] = useState<any>(2000);

    useEffect(() => {
      if (data) {
        // console.log("data", data);
        const path = data?.getAllRoute?.map((item: any) => {
          return { lat: item.latitude, lng: item.longitude };
        });
        setLetLongArr(path);
      }
      if (error) {
        console.log("error", error?.message);
        message.warning(error?.message);
      }
    }, [error, data]);

    if (!isLoaded) {
      return (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <Spin style={{ alignSelf: "center" }} />
        </div>
      );
    }
    let intervalID: any;

    const videoPlayHandler = () => {
      setIsVideoPlayer(true);
      let interValId: any;
      let delay = 0;
      const newVar = data?.getAllRoute.map((item: any) => {
        intervalID = setTimeout(() => {
          return setCarMove((prev: any) => {
            return { lat: item.latitude, lng: item.longitude };
          });
        }, delay);
        delay += 1000;
        setTimeout(() => {
          return setCarMoveAllData((prev: any) => {
            return item;
          });
        }, delay);
        delay += 1000;
      });

      // console.log("newVar", newVar);
      // setCarMove(newVar);
    };
    // console.log("velocity: ", velocity);
    // console.log("carMoveAllData: ", carMoveAllData);
    const speedUpHandler = () => {
      // clearTimeout(intervalID);
      // setCarMove({ lat: 0, lng: 0 });
      setVelocity((prev: any) => prev + 1000);
    };

    // console.log("carMove - OnPlay:", carMove);

    // useEffect(() => {
    //   let interValId: any;
    //   if (isVideoPlayer) {
    //     interValId = setInterval(() => {
    //       const newVar = data?.getAllRoute.map((item: any) => {
    //         return { lat: item?.latitude, lng: item?.longitude };
    //       });
    //       console.log("newVar", newVar);
    //       setCarMove(newVar);
    //     }, 1000);
    //   }

    //   return () => {
    //     clearInterval(interValId);
    //   };
    // }, [carMove]);
    // let { finalDTo, finalDFrom } =
    //   carMoveAllData?.deviceTime &&
    //   dateConversionToISO(carMoveAllData?.deviceTime);
    const deviceFuelIncrease = "deviceFuelIncrease";

    return (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Spin style={{ alignSelf: "center" }} />
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={{
              height: "100%",
              width: "100%",
              position: "relative",
            }}
            center={staticCordsCenter}
            zoom={10}
            options={{
              panControl: true,
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {/* Main Path */}
            <Polyline
              path={letLongArr}
              options={{
                strokeColor: "#001469",
                strokeOpacity: 0.75,
                strokeWeight: 2,
              }}
            />
            {data?.getAllTrip.map((item: any, index: any) => (
              <>
                <Marker
                  key={index}
                  position={{ lat: item?.startLat, lng: item?.startLon }}
                  // label={`${index + 1} S`}
                  // icon={iconStart}
                />
              </>
            ))}

            {data?.getAllTrip.map((item: any, index: any) => (
              <>
                <Marker
                  key={index}
                  position={{ lat: item?.endLat, lng: item?.endLon }}
                  // label={`${index + 1} E`}
                  // icon={iconEnd}
                />
              </>
            ))}
            <Marker position={carMove} icon={icon} />
          </GoogleMap>
        )}
        {carMoveAllData && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
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
                  <Paragraph style={{ fontSize: 12 }}>
                    Total Distance:
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>Dallas Temp.:</Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>BLE Temp.:</Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>Fuel Level:</Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>Analog Input 1:</Paragraph>
                </Typography>
              </Col>
              <Col span={14}>
                <Typography
                  style={{ minWidth: 140, maxWidth: 140, textAlign: "right" }}
                >
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.deviceTime ? newDateserverTime : "-"} */}
                    {xF.xTimeDateFormat(carMoveAllData?.serverTime, false)}
                    {/* {xF.xTextEventMapping(deviceFuelIncrease)} */}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.deviceTime ? newDatedeviceTime : "-"} */}
                    {xTimeDateFormat(carMoveAllData?.deviceTime, false)}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.attributes?.ignition===true ? 'On' : carMoveAllData?.attributes?.ignition === false ? 'Off' : '-'}
                    <span style={{ color: ignitionColor, fontWeight: 600 }}>
                      {ignitionStatus === true
                        ? "ON"
                        : ignitionStatus === false
                        ? "OFF"
                        : "-"}{" "}
                      <CarFilled twoToneColor={ignitionColor} />
                    </span> */}
                    {xIgnitionFormat(carMoveAllData?.attributes?.ignition, true)}

                    {xIgnitionFormat(carMoveAllData?.attributes?.ignition, true)}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.speed
                      ? carMoveAllData?.speed.toFixed(2)
                      : "0"}{" "}
                    {carMoveAllData?.speed.toFixed(2) ? "km/h" : ""} */}
                    {xSpeedFormat(carMoveAllData?.speed, true)}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.attributes?.power.toFixed(2)
                      ? carMoveAllData?.attributes?.power.toFixed(2)
                      : "-"}{" "}
                    mV */}
                    {xBatteryPowerFormat(carMoveAllData?.attributes?.power, true)}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.attributes?.battery.toFixed(2)
                      ? carMoveAllData?.attributes?.battery.toFixed(2)
                      : "-"}{" "}
                    mV */}
                    {xBatteryPowerFormat(carMoveAllData?.attributes?.battery, true)}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.attributes?.hours ? newDatehours : "-"} */}
                    {xTimeHourMins(carMoveAllData?.attributes?.hours, false)}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.attributes?.totalDistance.toFixed(2)
                      ? Math.round(
                          carMoveAllData?.attributes?.totalDistance * 0.1
                        ) * 100
                      : "-"} */}
                      {xMtoKM(carMoveAllData?.attributes?.totalDistance, true)}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.attributes?.io72 ? carMoveAllData?.attributes?.io72 * 0.1 : '-'} °C */}
                    {/* {carMoveAllData?.attributes?.io72
                      ? (carMoveAllData?.attributes?.io72 * 0.1).toFixed(2)
                      : "-"}{" "}
                    °C */}
                    {xio72Format(carMoveAllData?.attributes?.io72, true)}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.attributes?.io25
                      ? Math.round(carMoveAllData?.attributes?.io25 * 0.01) *
                        100
                      : "-"}{" "}
                    °C */}
                    {xio25Format(carMoveAllData?.attributes?.io25, true)}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {/* {carMoveAllData?.attributes?.io270
                      ? Math.round(carMoveAllData?.attributes?.io270 * 0.1) *
                        100
                      : "-"}{" "}
                    ltr */}
                    {xio270Format(carMoveAllData?.attributes?.io270, true)}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 12 }}>
                    {xio9Format(carMoveAllData?.attributes?.io9, true)}
                  </Paragraph>
                </Typography>
              </Col>
            </Row>

            {/* {carMoveAllData?.attributes?.totalDistance
                  ? carMoveAllData?.attributes?.totalDistance * 0.1
                  : "null"} 
                  
                {carMoveAllData?.attributes?.totalDistance
                  ? Math.round(carMoveAllData?.attributes?.totalDistance * 0.1) * 100
                  : "null"}
                  
                  {carMoveAllData?.deviceTime ? newDate : "null"}
                  
                  {carMoveAllData?.attributes?.ignition===true ? 'On' : carMoveAllData?.attributes?.ignition === false ? 'Off': '-'}
            */}
          </div>
        )}

        <div style={{ position: "absolute", bottom: 20 }}>
          <Button onClick={videoPlayHandler}>Play</Button>
          <Button onClick={showDrawer}>Show Reports</Button>
        </div>
        <Drawer
          title="Routes"
          placement="bottom"
          onClose={onClose}
          open={open}
          width={750}
          maskClosable={false}
          mask={false}
        >
          <RoutesTableDrawer data={data?.getAllRoute} loading={loading} />
        </Drawer>
      </div>
    );
  }
);

export default ReplayMap;
