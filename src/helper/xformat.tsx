import moment from "moment";
import { 
  CheckOutlined, CloseOutlined, ExclamationOutlined, CarFilled, FieldTimeOutlined, PoweroffOutlined, ThunderboltOutlined, WifiOutlined
} from "@ant-design/icons";

// Example For Import
// import { 
//  xTureFalseFormat, xRound2Format, xMtoKM, xTimeHourMins, xTimeDateFormat, xTimeFormat, xIgnitionFormat, xSpeedFormat, xBatteryPowerFormat, xio72Format, xio270Format, xio25Format, xio9Format
// } from "./utils";
// {xTimeFormat(data?.deviceTime, true)}
// xBatteryPower(data?.attributes?.power, false) // To show Unit

// True/False
const xTureFalseFormat = (x: boolean, show: boolean) => {
  if (show) {
    return x === true ? (
      <div style={{ color: "green" }}><CheckOutlined /></div>
    ) : x === false ? (
      <div style={{ color: "red" }}><CloseOutlined /></div>
    ) : (
      <div style={{ color: "grey" }}><ExclamationOutlined /></div>
    );
  } else {
    return x === true ? (
      <div style={{ color: "green" }}>ON</div>
    ) : x === false ? (
      <div style={{ color: "red" }}>OFF</div>
    ) : (
      <div>NoData</div>
    );
  }
};

// True/False
const xRound2Format = (x: number, show: boolean) => {
  if (show) { return x ? x.toFixed(2) + " km" : "-" + " km"; } else { return x ? x.toFixed(2) : "-"; }
};

// M to KM - Distance
const xMtoKM = (x: number, show: boolean) => {
  if (show) { return x ? (x / 1000).toFixed(2) + " km" : "-" + " km"; } else { return x ? (x / 1000).toFixed(2) : "-"; }
};

// Milliseconds To h m - hours
const xTimeHourMins = (x: string, show: boolean) => {
  if (show) { return x === "" ? "-" : <div><FieldTimeOutlined /> {moment.duration(x).asHours().toFixed(0)}h {moment.duration(x).minutes().toFixed(0)}m</div>; } 
  else { return x === "" ? "-" : <div>{moment.duration(x).asHours().toFixed(0)}h {moment.duration(x).minutes().toFixed(0)}m</div>; }
};

// const xTimeHourMins = (x: number, show: boolean) => {
//   if (show) {
//     return x ? (Math.floor(x / 3600000)) : "-" + "h";
//   } else {
//     return x ? (x * 0.01).toFixed(2) : "-";
//   }
// };

// Time & Date
// const xTimeDateFormat = (x: string) => {
//   if (x) {
//     return moment(x).format("hh:mm:ss a, DD.MM.YY");
//   } else {
//     return "-";
//   }
// };
const xTimeDateFormat = (x: string, show: boolean) => {
  if (show) { return x === "" ? "-" : <div>{moment(x).format("hh:mm:ss a, DD.MM.YY")} <FieldTimeOutlined /></div>; } 
  else { return x === "" ? "-" : moment(x).format("hh:mm:ss a, DD.MM.YY"); }
};

// Time
const xTimeFormat = (x: string, show: boolean) => {
  if (show) { return x === "" ? "-" : <div>{moment(x).format("hh:mm:ss")} hrs</div>; } 
  else { return x === "" ? "- hrs" : moment(x).format("hh:mm:ss"); }
};

// Ignition
const xIgnitionFormat = (x: boolean, show: boolean) => {
  if (show) {
    return x === true ? (
      <div style={{ color: "green" }}>ON <CarFilled/></div>
    ) : x === false ? (
      <div style={{ color: "red" }}>OFF <CarFilled/></div>
    ) : (
      <div style={{ color: "grey" }}>NoData <CarFilled/></div>
    );
  } else {
    return x === true ? (
      <div style={{ color: "green" }}>ON</div>
    ) : x === false ? (
      <div style={{ color: "red" }}>OFF</div>
    ) : (
      <div style={{ color: "grey" }}>NoData</div>
    );
  }
};

// Speed
const xSpeedFormat = (x: number, show: boolean) => {
  if (show) { return x ? x.toFixed(2) + " km/h" : "0" + " km/h"; } else { return x ? x.toFixed(2) : "0"; }
};

// Battery / Power
const xBatteryPowerFormat = (x: number, show: boolean) => {
  if (show) { return x ? x.toFixed(2) + " mV" : "0" + " mV"; } else { return x ? x.toFixed(2) : ""; }
};

// 0.1 - io72(Dallas Temperature 1) - io270(BLE Fuel Level #1)
const xio72Format = (x: number, show: boolean) => {
  if (show) { return x ? (x * 0.1).toFixed(2) + " °C" : "-" + " °C"; } else { return x ? (x * 0.1).toFixed(2) : "-"; }
};
const xio270Format = (x: number, show: boolean) => {
  if (show) { return x ? (x).toFixed(2) + " ltr" : "-" + " ltr"; } else { return x ? (x).toFixed(2) : "-"; }
};

// 0.01 - io25(BLE Temperature #1)
const xio25Format = (x: number, show: boolean) => {
  if (show) { return x ? (x * 0.01).toFixed(2) + " °C" : "-" + " °C"; } else { return x ? (x * 0.01).toFixed(2) : "-"; }
};

// 0.001 - io9(Analog Input 1)
const xio9Format = (x: number, show: boolean) => {
  if (show) { return x ? (x * 0.001).toFixed(2) + " V" : "-" + " V"; } else { return x ? (x * 0.001).toFixed(2) : "-"; }
};

// io113(Battery Level) - io29(BLE Battery #1)
const xBatteryLevelFormat = (x: number, show: boolean) => {
  if (show) { return x ? x + " %" : "0" + " %"; } else { return x ? x : ""; }
};

// io24(Speed)
const xio24Format = (x: number, show: boolean) => {
  if (show) { return x ? x.toFixed(2) + " km/h" : "0" + " km/h"; } else { return x ? x.toFixed(2) : "0"; }
};

// io252(Unplug - Battery)
const xio252Format = (x: number, show: boolean) => {
  if (show) {
    return x === 0 ? (
      <div style={{ color: "red" }}>Plugged <ThunderboltOutlined /></div>
    ) : x === 1 ? (
      <div style={{ color: "green" }}>Unplugged <ThunderboltOutlined /></div>
    ) : (
      <div style={{ color: "grey" }}>- <ThunderboltOutlined /></div>
    );
  } else {
    return x === 0 ? (
      <div style={{ color: "red" }}>Plugged</div>
    ) : x === 1 ? (
      <div style={{ color: "green" }}>Unplugged</div>
    ) : (
      <div>NoData</div>
    );
  }
};

// io251(Idling)
const xio251Format = (x: number, show: boolean) => {
  if (show) {
    return x === 0 ? (
      <div style={{ color: "green" }}>Moving <ThunderboltOutlined /></div>
    ) : x === 1 ? (
      <div style={{ color: "peru" }}>Idling <ThunderboltOutlined /></div>
    ) : (
      <div style={{ color: "grey" }}>- <ThunderboltOutlined /></div>
    );
  } else {
    return x === 0 ? (
      <div style={{ color: "green" }}>Moving</div>
    ) : x === 1 ? (
      <div style={{ color: "peru" }}>Idling</div>
    ) : (
      <div>NoData</div>
    );
  }
};

export {
  xTureFalseFormat, xRound2Format, xMtoKM, xTimeHourMins, xTimeDateFormat, xTimeFormat, xIgnitionFormat, xSpeedFormat, xBatteryPowerFormat, xio72Format, 
  xio270Format, xio25Format, xio9Format, xBatteryLevelFormat
};