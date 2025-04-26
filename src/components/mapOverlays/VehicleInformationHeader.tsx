import React from "react";
type PropsType = {
  title: string;
  value: string;
};

const VehicleInformationHeader = React.memo(({ title, value }: PropsType) => {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "5px 0px 5px 0px",
      }}
    >
      <p style={{ fontSize: "12px" }}>{title}</p>
      <p style={{ fontSize: "12px" }}>{value}</p>
    </div>
  );
});

export default VehicleInformationHeader;
