import manufacturerModel from "./manufacturerModel";
import vehicleModel from "./vehicleModel";

export default interface carModel {
    id: string,
    name: string,
    manufacturer: manufacturerModel,
    vehicles: vehicleModel[]
}