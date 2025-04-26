import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import SideNavSearchBox from "../searchBox/SideNavSearchBox";
import classes from "./SideNavTabs.module.css";
import SearchInput from "../plateExplorer/SearchInput";

const onChange = (key: string) => {
  //////////console.loglog(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Plate`,
    children: <SearchInput />,
  },
  {
    key: "2",
    label: `Chasis`,
    children: <SearchInput />,
  },
  {
    key: "3",
    label: `Engine`,
    children: <SearchInput />,
  },
  {
    key: "4",
    label: `Name`,
    children: <SearchInput />,
  },
  {
    key: "5",
    label: `Cell`,
    children: <SearchInput />,
  },
];

const SideNavTabs: React.FC = React.memo(() => (
  <Tabs
    defaultActiveKey="1"
    items={items}
    onChange={onChange}

    // tabBarStyle={{  }}
  />
));

export default SideNavTabs;
