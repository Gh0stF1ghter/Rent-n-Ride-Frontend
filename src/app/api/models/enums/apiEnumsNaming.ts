import { fuelType } from "../apiModels/enums/fuelType";
import { vehicleState } from "../apiModels/enums/vehicleState";
import { vehicleType } from "../apiModels/enums/vehicleType";

export const FuelTypeNames = [
  { value: fuelType.gasoline, name: 'gasoline' },
  { value: fuelType.diesel, name: 'diesel' },
  { value: fuelType.electro, name: 'electro' },
];

export const vehicleStateNames = [
  { value: vehicleState.new, name: 'new' },
  { value: vehicleState.used, name: 'used' },
  { value: vehicleState.crashed, name: 'crashed' },
];

export const vehicleTypeNames = [
  { value: vehicleType.light, name: 'light' },
  { value: vehicleType.motorcycle, name: 'motorcycle' },
  { value: vehicleType.sport, name: 'sport' },
  { value: vehicleType.suv, name: 'suv' },
  { value: vehicleType.truck, name: 'truck' },
];
