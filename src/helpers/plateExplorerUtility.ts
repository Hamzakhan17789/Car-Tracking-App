import { VehicleResult } from "../model/plateExplorerTypes/plateExplorerTypes";
export const filterByName = (
  searchedName: string,
  vehicleList: VehicleResult[]
) => {
  const result = vehicleList.filter((vehicle, i) => {
    return vehicle.name === searchedName;
  });
  ////////////console.loglog(searchedName);
  ////////////console.loglog("result", result);
  return result;
};
