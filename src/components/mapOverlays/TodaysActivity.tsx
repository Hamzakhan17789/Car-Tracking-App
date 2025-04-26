import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { GET_ALL_TRIPS } from "../../graphqlOperations/query";
import { Col, Row, Spin, Typography, message } from "antd";
import {
  xTureFalseFormat, xMtoKM, xTimeHourMins, xTimeDateFormat, xTimeFormat, xIgnitionFormat, xSpeedFormat, xBatteryPowerFormat, xio72Format, xio270Format, xio25Format
} from "../../helper/xformat";

const { Title, Paragraph, Text, Link } = Typography;

const TodaysActivity = () => {
  const [locationId, setLocationId] = useState();
  useEffect(() => {
    const id: any = sessionStorage.getItem("vehicleID");
    console.log("vehicleID", id);
    setLocationId(id);
  }, []);
  const { data, loading, error } = useQuery(GET_ALL_TRIPS, {
    variables: {
      from: "2023-07-19T00:00:00.000Z",
      locationId: Number(locationId),
    },
  });
  useEffect(() => {
    if (data) {
      console.log("data.getAlltrips", data?.getAllTrip);
    }
    if (error) {
      message.error({
        content: error?.message,
      });
    }
  }, [data, error]);
  const todaysData = data?.getAllTrip.map((item: any): any => {
    let totalDistance = item.distance;
    const totalDuration = item.duration;
    // console.log("todaysData.totalDistance", totalDistance);

    return { totalDistance, totalDuration };
  });
  const totalDistance = todaysData?.reduce(
    (accumulator: any, item: any) => accumulator + item.totalDistance,
    0
  );
  const totalDuration = todaysData?.reduce(
    (accumulator: any, item: any) => accumulator + item.totalDuration,
    0
  );

  return (
    <>
      {loading ? (
        <Spin
          style={{ display: "flex", justifyContent: "center" }}
          size="small"
        />
      ) : (
        <div>
          <h4
            style={{
              display: "flex",
              justifyContent: "left",
              marginBottom: 10,
            }}
          >
            Today's Activity
          </h4>
          <Row gutter={[12, 12]}>
            <Col>
              <Typography style={{ textAlign: "right" }}>
                <Paragraph style={{ fontSize: 12 }}>Total Distance:</Paragraph>
                <Paragraph style={{ fontSize: 12 }}>Total Duration:</Paragraph>
              </Typography>
            </Col>
            <Col>
              <Typography style={{ textAlign: "left" }}>
                <Paragraph style={{ fontSize: 12 }}>
                  {xMtoKM(totalDistance, true)}
                </Paragraph>
                <Paragraph style={{ fontSize: 12 }}>
                  {xTimeHourMins(totalDuration, false)}
                </Paragraph>
              </Typography>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default TodaysActivity;
