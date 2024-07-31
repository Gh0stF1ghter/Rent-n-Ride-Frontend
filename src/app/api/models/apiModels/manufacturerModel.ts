import carModel from "./carModel";

export default interface manufacturerModel {
    id: string,
    name: string,
    carModels: carModel[]
}