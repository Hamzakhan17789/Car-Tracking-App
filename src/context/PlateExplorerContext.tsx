import React, { useState, useEffect, useCallback } from "react";
import { ClientDetailList } from "../model/plateExplorerTypes/plateExplorerTypes";
import { VehicleResult } from "../model/plateExplorerTypes/plateExplorerTypes";
// import { vehicleResults } from "../../data/plate-explorer-data";
// import { filterByName } from "../../helpers/plate-explorer-utility";
import { filterByName } from "../helpers/plateExplorerUtility";
import { clientDetailList, clientResults } from "../data/plate-explorer-data";

type ContextType = {
  clientList?: ClientDetailList[];
  onChangeHandler: (input: string) => void;
  vehicleResult?: VehicleResult[];
  imei: string | undefined;
  setImei: React.Dispatch<React.SetStateAction<string | undefined>>;
  xDeviceId: string | undefined;
  setxDeviceId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setVehicleIDinToken: React.Dispatch<React.SetStateAction<string | null>>;
  vehicleIDinToken: string | null;
  onClick: boolean;
  setOnClick: React.Dispatch<React.SetStateAction<boolean>>;
  isItemClicked: boolean;
  setIsItemClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isVehicleListCardClicked: boolean;
  setIsVehicleListCardClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ClientDetailPlateExplorerContext =
  React.createContext<ContextType>({
    clientList: [],
    onChangeHandler: (input: string) => {},
    vehicleResult: [],
    imei: "",
    setImei: () => {},
    setVehicleIDinToken: () => {},
    vehicleIDinToken: null,
    onClick: false,
    setOnClick: () => {},
    isItemClicked: false,
    setIsItemClicked: () => {},
    isVehicleListCardClicked: false,
    setIsVehicleListCardClicked: () => {},
    setxDeviceId: () => {},
    xDeviceId: "",
  });

type Props = {
  children: React.ReactNode;
};

const PlateExplorerProvider = React.memo(({ children }: Props) => {
  const [clientList, setClientList] = useState<ClientDetailList[]>([]);
  const [filteredVehicleList, setFilteredVehicleList] = useState<
    VehicleResult[]
  >([]);
  const [isVehicleListCardClicked, setIsVehicleListCardClicked] =
    useState<boolean>(false);
  const [isItemClicked, setIsItemClicked] = useState<boolean>(false);

  const [vehicleIDinToken, setVehicleIDinToken] = useState<string | null>(null);
  const [onClick, setOnClick] = useState(false);
  ////////console.log('on click in ' , onClick)
  ////////console.log("vehicleID TOKEN IN  plateexplorer context " , vehicleIDinToken)

  //////console.log("Plate Explorer Provider");

  //   const [vehicleIDinToken, setVehicleIDinToken] = useState<string | null>(null)
  //   const [ onClick , setOnClick] = useState(false)
  // ////////console.log('on click in ' , onClick)
  ////////console.log("vehicleID TOKEN IN  plateexplorer context " , vehicleIDinToken)

  const [imei, setImei] = useState<string | undefined>("");
  const [xDeviceId, setxDeviceId] = useState<string | undefined>("");
  useEffect(() => {
    setClientList(clientDetailList);
    //////console.log(clientDetailList)
  }, []);

  let filteredList: ClientDetailList[];

  let filteredClientList: React.SetStateAction<VehicleResult[]> = [];
  //////////////console.loglog(filteredClientList);

  const onChangeHandler = useCallback(
    (input: string) => {
      //  ////console.log("PLATEcontext", input);
      const result: ClientDetailList[] = clientDetailList.filter((item, i) => {
        if (input.toLowerCase().trim() === "") {
          return item;
        } else if (input !== "") {
          return item.vehicleName.toLowerCase() === input.toLowerCase().trim();
        }
      });
      filteredList = result;
      setClientList(filteredList);

      filteredClientList = filterByName(input, clientResults);
      setFilteredVehicleList(filteredClientList);
      //  ////////////console.loglog(filteredClientList);
    },
    [filteredVehicleList]
  );

  //console.log('plate explorer context')
  const valueObj: ContextType = {
    clientList,
    onChangeHandler: onChangeHandler,
    vehicleResult: filteredVehicleList,
    // onChangeHandlerForVehicleList
    imei: imei,
    setImei: setImei,
    xDeviceId: xDeviceId,
    setxDeviceId: setxDeviceId,
    setVehicleIDinToken: setVehicleIDinToken,
    vehicleIDinToken,
    onClick: onClick,
    setOnClick: setOnClick,
    isItemClicked,
    setIsItemClicked,
    isVehicleListCardClicked,
    setIsVehicleListCardClicked,
  };

  return (
    <ClientDetailPlateExplorerContext.Provider value={valueObj}>
      {children}
    </ClientDetailPlateExplorerContext.Provider>
  );
});

export default PlateExplorerProvider;
