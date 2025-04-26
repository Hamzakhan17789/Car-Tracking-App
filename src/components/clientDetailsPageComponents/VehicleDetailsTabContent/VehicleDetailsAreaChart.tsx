import { Spin } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import classes from "./VehicleDetailsTabContent.module.css";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const VehicleDetailsAreaChart = React.memo(() => {
  const options = {
    chart: {
      height: 186,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
      },
    },
  };

  const series = [
    {
      name: "All Tasks",
      data: [31, 40, 28, 51, 42, 109],
    },
  ];

  return (
    <div className={classes.chartContainer}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
})

export default VehicleDetailsAreaChart;
