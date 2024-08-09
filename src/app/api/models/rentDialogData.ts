import clientModel from "./apiModels/clientModel";
import vehicleClientHistoryModel from "./apiModels/vehicleClientHistoryModel";
import vehicleModel from "./apiModels/vehicleModel";

export default interface rentDialogData {
    clients: clientModel[],
    vehicles: vehicleModel[],
    vehicleClientHistoryToEdit?: vehicleClientHistoryModel
}