import React from "react";
import { Progress } from "antd";

import { FireOutlined } from "@ant-design/icons";
type propsType = {
  percentageValue: number;
  icon: JSX.Element;
  label: string;
  labelIcon: string;
  color: string;
};

const CarSectionProgressBar = React.memo(({
  percentageValue,
  icon,
  label,
  labelIcon,
  color,
}: propsType) => {
  return (
    <Progress
      type="circle"
      percent={percentageValue}
      showInfo={true}
      style={{ marginRight: "10px" }}
      strokeColor={color}
      format={(percentage) => {
        return (
          <>
            {icon}
            {/* <FireOutlined
              style={{
                fontSize: "25px",
                color: "rgba(255, 11, 11, 0.56)",
                padding: "2px",
              }}
            /> */}
            <p style={{ fontSize: "10px", padding: "2px" }}>{label}</p>
            <p
              style={{
                fontSize: "13px",
                padding: "2px",
                fontWeight: "bold",
              }}
            >
              {percentage} {labelIcon}
            </p>
          </>
        );
      }}
    />
  );
})

export default CarSectionProgressBar;
