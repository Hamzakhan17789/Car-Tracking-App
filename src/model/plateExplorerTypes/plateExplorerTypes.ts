export type VehicleResult = {
  name: string;
  cellPhone: number;
  plate: string;
  engine: number;
  chassis: number;
  imei: string;
};
export interface ClientDetailList {
  vehicleName: string;
  vehicleColor: string;
  cities: string[];
  numPlate: string;
  chasis: string;
  engine: string;
  imei?: string;
}
