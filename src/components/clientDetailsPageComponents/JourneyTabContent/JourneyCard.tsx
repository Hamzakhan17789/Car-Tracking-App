import React, { useContext, useState } from "react";
import { Card, Col, DatePicker, Row, Tabs, Timeline } from "antd";
import Image from "next/image";
import playImg from "../../../../public/assets/images/playImg.png";
import recordImg from "../../../../public/assets/images/recordImg.png";
import zigImg from "../../../../public/assets/images/zigImg.png";
import barImg from "../../../../public/assets/images/barImg.png";
import { JourneyMapContext } from "../../../context/journeyMapContext/JourneyMapContext";
import Statistics from "../../modal/StatisticsModal";
import StatisticsModal from "../../modal/StatisticsModal";
import { RoutesContext } from "../../../context/routesContext/RoutesContext";
import { start } from "repl";

type Props = {
  avgSpeed?: number;
  durationMin?: number;
  endTime?: number;
  gps?: any[];
  maxSpeed?: number;
  startTime?: number;
  indexOfSelectedTrip: number | undefined;
};

const JourneyCard = React.memo(({
  avgSpeed,
  durationMin,
  endTime,
  indexOfSelectedTrip,
  gps,
  maxSpeed,
  startTime,
  
}: Props) => {
  const journeyMapCtx = useContext(JourneyMapContext);
const [isModalOpen , setIsModalOpen] = useState<boolean>(false)
//console.log('start Time ' , startTime)

const showModal=()=>{
  setIsModalOpen(true)
  ////console.log(isModalOpen)
}

const closeModal=()=>{
  setIsModalOpen(false)
}

  let journeyStartingDate;
  if (typeof window !== "undefined") {
    journeyStartingDate = localStorage.getItem("selectedDate");
  }

  if (typeof indexOfSelectedTrip !== "undefined") {
    // //////console.log('it is not undefined')
  }
////console.log(startTime)
  const journeyEndDate = new Date(endTime!).getDate();
  const journeyEndMonth = new Date(endTime!).getMonth();
  const journeyEndYear = new Date(endTime!).getFullYear();

  const journeyEndingFullDate = `${journeyEndDate}/${
    journeyEndMonth + 1
  }/${journeyEndYear}`;

  const hours = new Date(startTime!).getHours();
  const minutes = new Date(startTime!).getMinutes();
  const seconds = new Date(startTime!).getSeconds();

  const startingTime = `${hours}:${minutes} :${seconds}`;

  const endHours = new Date(endTime!).getHours();
  const endMinutes = new Date(endTime!).getMinutes();
  const endSeconds = new Date(endTime!).getSeconds();

  const endingTime = `${endHours}:${endMinutes}:${endSeconds}`;

  const gettingIndexOfSelectedTrip = (iOfSelectedTrip: number | undefined) => {
    journeyMapCtx.setSelectedTrip(iOfSelectedTrip);
  };
  const routesCtx = useContext(RoutesContext)

//  console.log(indexOfSelectedTrip)
//console.log( startTime)
//console.log(endTime)

  return (
    <Card
      style={{ marginTop: "5px" }}
      actions={[
        // <Image src={playImg} key="play" onClick={journeyMapCtx.moveMarker} />,
         <Image src={playImg} key="play" onClick={routesCtx.moveMarker} />,
        <Image src={recordImg} key="record" alt="record-img" />,
        <Image
          src={zigImg}
       //   onClick={() => gettingIndexOfSelectedTrip(indexOfSelectedTrip)}
        
       onClick={()=>routesCtx.gettingTripOfSelectedCard(startTime, endTime , indexOfSelectedTrip)}
       key="zigImg"
          alt="zig-img"
        />,
        <Image src={barImg} key="barImg" alt="bar-img" onClick={showModal} />,
      ]}
    >
  {isModalOpen && <StatisticsModal isModalOpen={isModalOpen} closeModal={closeModal} />}
      <Timeline>
        <Timeline.Item color={"green"}>
          <p style={{ fontSize: "10px" }}>
            {startTime}, { /*journeyStartingDate */}
          </p>
          {/* <p style={{ fontSize: "10px" }}>
            Liaquat National Hospital and Medical College, National Stadium
            Rd,Karachi
          </p> */}
          <p style={{ fontSize: "10px" }}>
            Mileage: <span>245.787 Km, {indexOfSelectedTrip}</span>
          </p>
          <p style={{ fontSize: "10px" }}>
            Duration: <span>{durationMin?.toFixed(0)} Min</span>
          </p>
          <p style={{ fontSize: "10px" }}>
            Max speed: <span>{maxSpeed?.toFixed(0)} Km/hr</span>
          </p>
          <p style={{ fontSize: "10px" }}>
            Avg speed: <span>{avgSpeed?.toFixed(2)} Km/hr</span>
          </p>
        </Timeline.Item>
        <Timeline.Item color={"red"}>
          <p style={{ fontSize: "10px" }}>
            {endTime}, {/*journeyEndingFullDate */}
          </p>
          {/* <p style={{ fontSize: "10px" }}>
            Allama Shabbir Ahmed Usmani Rd, Block 3 Gulshan-e-Iqbal, Karachi
          </p> */}
        </Timeline.Item>
      </Timeline>
    </Card>
  );
})

export default JourneyCard;
