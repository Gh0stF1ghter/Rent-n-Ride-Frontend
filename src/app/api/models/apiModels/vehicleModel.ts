import carModel from './carModel';
import { fuelType } from './enums/fuelType';
import { vehicleState } from './enums/vehicleState';
import { vehicleType } from './enums/vehicleType';

export default interface vehicleModel {
  id: string;
  plateNumber: string;
  odo: number;
  rentCost: number;
  isRented: boolean;
  vehicleType: vehicleType;
  vehicleState: vehicleState;
  fuelType: fuelType;
  carModel: carModel | null;
}
