import { Progress } from "antd";
import React, { useState } from "react";
import {
  SwapOutlined,
  FireOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import CarSectionProgressBar from "./CarSectionProgressBar";
import Image from "next/image";
import VectorFuel from "../../../../public/assets/images/VectorFuel.png";
import IconBreakFluid from "../../../../public/assets/images/IconBreakFluid.png";
import VectorLeftArrow from "../../../../public/assets/images/VectorLeftArrow.png";
import VectorRightArrow from "../../../../public/assets/images/VectorRightArrow.png";
import BlueCarImage from "../../../../public/assets/images/blueCar.png";
import Ellipse from "../../../../public/assets/images/Ellipse.png";
import Line from "../../../../public/assets/images/Line.png";

const VehicleDetailsTabContentCarSection = React.memo(() => {
  // //////console.log("img", BlueCarImage);
  const [carName, setCarName] = useState("Toyota Prius 2017");
  const progressBarDetails = [
    {
      id: "1",
      icon: <Image src={VectorFuel} alt="fuel" />,
      color: "rgba(255, 11, 11, 0.56)",
      percentageValue: 40,
      label: "Fuel",
      labelIcon: "%",
    },
    {
      id: "2",
      icon: (
        // <>
        //   <Image src={VectorLeftArrow} />
        //   <Image src={VectorRightArrow} />
        // </>
        <SwapOutlined
          style={{
            fontSize: "25px",
            color: "#4488F0",
            padding: "2px",
          }}
        />
      ),
      color: "#4488F0",
      percentageValue: 62,
      label: "Range",
      labelIcon: "Km",
    },
    {
      id: "3",
      icon: <Image src={IconBreakFluid} alt="iconBreak-fluid" />,
      color: "rgba(255, 11, 11, 0.56)",
      percentageValue: 8,
      label: "Break Fluid",
      labelIcon: "%",
    },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {progressBarDetails.map(
          ({ id, icon, percentageValue, label, labelIcon, color }) => {
            return (
              <CarSectionProgressBar
                key={id}
                percentageValue={percentageValue}
                icon={icon}
                label={label}
                labelIcon={labelIcon}
                color={color}
              />
            );
          }
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          position: "relative",
        }}
      >
        <Image
          src={BlueCarImage.src}
          width={"428px"}
          height={"224px"}
          alt="blueCar-img"
        />
        <div style={{ position: "absolute" }}>
          {/* <Image src={Ellipse} style={{}}/>
          <Image src={Line} /> */}
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <p style={{ fontSize: "16px" }}>{carName}</p>
      </div>
    </>
  );
})

export default VehicleDetailsTabContentCarSection;
