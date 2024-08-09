import { fuelType } from "../enums/fuelType";
import { vehicleState } from "../enums/vehicleState";
import { vehicleType } from "../enums/vehicleType";

export default interface createVehicleModel {
    plateNumber: string;
    odo: number;
    rentCost: number;
    isRented: boolean;
    vehicleType: vehicleType;
    vehicleState: vehicleState;
    fuelType: fuelType;
    carModelId: string;
  }
  