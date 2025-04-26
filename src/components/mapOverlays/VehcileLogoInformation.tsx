import React, { useContext, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { SocketContext } from "../../context/socketContext/socketContext";
import { GraphqlMapContext } from "../../context/graphqlOperationsContext/graphqlMapContext";

type PageProps = {
  image1: StaticImageData;
  title1: any;
  value1: any;
  image2: StaticImageData;
  title2: any;
  value2: any;
  image3: StaticImageData;
  title3: any;
  value3: any;
  style1?: any;
  style2?: any;
  style3?: any;
};

const VehcileLogoInformation = React.memo(
  ({
    image1,
    title1,
    value1,
    image2,
    title2,
    value2,
    image3,
    title3,
    value3,
    style1,
    style2,
    style3,
  }: PageProps) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "5px 0px 5px 0px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            width: "72px",
            height: "53px",
            border: "1px solid #F2F2F5",
          }}
        >
          <Image src={image1} width={style1} height={"16px"} alt="img" />
          <p style={{ fontSize: "9px" }}>{title1}</p>
          <p style={{ fontSize: "8px" }}>{value1}</p>
        </div>
        <div
          style={{
            textAlign: "center",
            width: "72px",
            height: "53px",
            border: "1px solid #F2F2F5",
          }}
        >
          <Image src={image2} width={style2} height={"16px"} alt="img" />
          <p style={{ fontSize: "9px" }}>{title2}</p>
          <p style={{ fontSize: "8px" }}>{value2}</p>
        </div>
        <div
          style={{
            textAlign: "center",
            width: "72px",
            height: "53px",
            border: "1px solid #F2F2F5",
          }}
        >
          <Image src={image3} width={style3} height={"16px"} alt="img" />
          <p style={{ fontSize: "9px" }}>{title3}</p>
          <p style={{ fontSize: "8px" }}>{value3}</p>
        </div>
      </div>
    );
  }
);

export default VehcileLogoInformation;
