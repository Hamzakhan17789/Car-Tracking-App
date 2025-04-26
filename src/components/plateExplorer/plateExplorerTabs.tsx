import React, { useState, useEffect } from "react";
// import { clientDetailOptions } from "../../data/plate-explorer-data";
// import "../../../public/css/tabsStyle.css";
import { Button, Tabs } from "antd";
import type { TabsProps } from "antd";
// import classes from "./plateExplorerTabs.module.css";
import SearchInput from "./SearchInput";

const TabPane = Tabs.TabPane;

interface PlateExplorerPlateOptions {
  plateExplorerOptions?: string[];
  tabBarGutterValue: number;
}
const customStyleTabs = {
  fontSize: "11px",
  fontWeight: "500",
  background: "#fff 0% 0% no-repeat padding-box",
  borderRadius: "3px",
  padding: "5px",
};
const customStyleTabsOnHover = {
  background: "#011223 0% 0% no-repeat padding-box",
  borderRadius: "3px",
  padding: "5px",
  color: "white ",
};

const PlateExplorerTabs =React.memo(({
  plateExplorerOptions,
  tabBarGutterValue,
}: PlateExplorerPlateOptions) => {
  const [plateExplorerHeaderOptions, setPlateExplorerHeaderOptions] = useState<
    string[]
  >([]);
  const [keyState, setKeyState] = useState("5");
 // ////console.log('Plate Explorer tabs')
  useEffect(() => {
    
    setPlateExplorerHeaderOptions(plateExplorerOptions!);
  }, []);
   return (
    <Tabs
      defaultActiveKey={keyState}
      tabPosition={"top"}
      animated={false}
      size={"small"}
      tabBarGutter={tabBarGutterValue}
      onChange={(e) => {
        setKeyState(e);
      }}
      // items={plateExplorerOptions?.map(({ label, key }: any) => {
      //   return {
      //     label: label,
      //     key: key,
      //     children: <SearchInput />,
      //     style: { margin: "5px 0px 5px 12px" },
      //   };
      // })}
      //   onChange={onChange}
    >
      {plateExplorerOptions?.map(({ label, key }: any) => (
        <TabPane
          key={key}
          tab={
            <p
              style={
                key !== keyState ? customStyleTabs : customStyleTabsOnHover
              }
            >
              {label}
            </p>
          }
          disabled
        >
          <SearchInput />
        </TabPane>
      ))}
    </Tabs>
  );
});

export default PlateExplorerTabs;
