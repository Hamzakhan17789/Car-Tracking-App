import { ClientDetailList } from "../model/plateExplorerTypes/plateExplorerTypes";
import type { TabsProps } from "antd";
export const clientResults = [
  {
    name: "Hamza",
    cellPhone: +923337421505,
    plate: "AFR-2021",
    engine: 96778,
    chassis: 1084201,
    imei: "357544373289574",
  },

  {
    name: "Waqas",
    cellPhone: +923337421505,
    plate: "AFR-2022",
    engine: 967111,
    chassis: 1134251,
    imei: "350424066309061",
  },
];
// export const clientDetailOptions: string[] = [
//   "All",
//   "Stop",
//   "Moving",
//   "Idle",
//   "Offline",
//   "Expired",
// ];
export const clientDetailOptions: TabsProps["items"] = [
  {
    key: "1",
    label: `Alll`,
    // children: <SearchInput />,
  },
  {
    key: "2",
    label: `Stop`,
    // children: <SearchInput />,
  },
  {
    key: "3",
    label: `Moving`,
    // children: <SearchInput />,
  },
  {
    key: "4",
    label: `Idle`,
    // children: <SearchInput />,
  },
  {
    key: "5",
    label: `Offline`,
    // children: <SearchInput />,
  },
  {
    key: "6",
    label: `Expired`,
    // children: <SearchInput />,
  },
];
export const clientDetailList: ClientDetailList[] = [
  {
    vehicleName: "Cultus",
    vehicleColor: "Blue",
    cities: [" Khi", "Hyd"],
    numPlate: "AFR-2022",
    chasis: "1082201",
    engine: "96778",
  },
  {
    vehicleName: "Civic",
    vehicleColor: "Red",
    cities: [" Khi"],
    numPlate: "AFR-2022",
    chasis: "1082201",
    engine: "96778",
  },
];
// export const plateExplorerHomeOption: string[] = [
//   "Plate",
//   "Chasis",
//   "Engine",
//   "Client",
//   "Cell",
// ];
export const plateExplorerHomeOption: TabsProps["items"] = [
  {
    key: "1",
    label: `Plate`,
    // children: <SearchInput />,
  },
  {
    key: "2",
    label: `Chasis`,
    // children: <SearchInput />,
  },
  {
    key: "3",
    label: `Engine`,
    // children: <SearchInput />,
  },
  {
    key: "4",
    label: `Name`,
    // children: <SearchInput />,
  },
  {
    key: "5",
    label: `Cell`,
    // children: <SearchInput />,
  },
];
