import { Card, Watermark } from "antd";
import React from "react";

const WatermarkPage = () => {
  return (
    <Watermark content={["Working", "In Progress"]}>
      <Card style={{ height: "520px", marginTop: "10px" }} />
    </Watermark>
  );
};

export default WatermarkPage;
