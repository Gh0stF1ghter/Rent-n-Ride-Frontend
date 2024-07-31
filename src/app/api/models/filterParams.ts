import { fuelType } from "./apiModels/enums/fuelType";
import { vehicleState } from "./apiModels/enums/vehicleState";
import { vehicleType } from "./apiModels/enums/vehicleType";

export default interface filterParams {
    carModelId: string,
    fuelType: fuelType | undefined,
    vehicleState: vehicleState | undefined,
    vehicleType: vehicleType | undefined
  }