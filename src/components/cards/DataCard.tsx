import React from "react";
import { Card } from "antd";

type propsType = {
  title: string;
  color: string;
  number: any;
  height: string;
  numberFontSize: string;
  titleFontSize: string;
};

const DataCard = React.memo(({
  title,
  color,
  number,
  height,
  numberFontSize,
  titleFontSize,
}: propsType) => (
  <Card
    style={{ backgroundColor: color, height: height }}
    bodyStyle={{ padding: "0px" }}
  >
    <div>
      <p
        style={{
          textAlign: "center",
          color: "white",
          fontSize: numberFontSize,
        }}
      >
        {number}
      </p>
      <p
        style={{
          textAlign: "center",
          color: "#5B5B5B",
          fontSize: titleFontSize,
        }}
      >
        {title}
      </p>
    </div>
  </Card>
))

export default DataCard;
