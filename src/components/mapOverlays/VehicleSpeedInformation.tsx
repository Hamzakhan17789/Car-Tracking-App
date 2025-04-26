import React from "react";
type PageProps = {
  speed?: number | null | string;
};

const VehicleSpeed = React.memo(({ speed }: PageProps) => {
 
  return (
    <div style={{ width: "101px", height: "125px" }}>
      <p
        style={{
          fontSize: "94px",
          textShadow: "0px 1px 3px #1CACE2",
          fontStyle: "italic",
        }}
      >
        {Math.floor(Number(speed))}
        <span
          style={{
            fontSize: "12px",
            textShadow: "0px 3px 6px #00000029",
          }}
        >
          Km/h
        </span>
      </p>
    </div>
  );
});

export default VehicleSpeed;
