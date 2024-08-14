import { Injectable } from '@angular/core';
import pagination from '../../models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { paginationKeys } from '../../constants/paramKeys';
import { AdminPanelServiceEndpoints } from '../../constants/environment';
import carModel from '../../models/apiModels/carModel';
import manufacturerModel from '../../models/apiModels/manufacturerModel';
import vehicleModel from '../../models/apiModels/vehicleModel';
import vehicleClientHistoryModel from '../../models/apiModels/vehicleClientHistoryModel';
import clientModel from '../../models/apiModels/clientModel';
import createVehicleModel from '../../models/apiModels/apiCreateModels/createVehicleModel';
import createVehicleClientHistoryApiModel from '../../models/apiModels/apiCreateModels/createVehicleClientHistoryModel';
import createVehicleClientHistoryModel from '../../models/createModels/createVehicleClientHistoryModel';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllCarModels(pageParams: pagination) {
    let params = new HttpParams()
      .set(paginationKeys.page, pageParams.currentPage)
      .set(paginationKeys.pageSize, pageParams.pageSize);

    return this.http.get<carModel[]>(AdminPanelServiceEndpoints.carModels, {
      observe: 'response',
      headers: { Accept: 'application/json' },
      params: params,
    });
  }

  getCarModelById(id: string) {
    return this.http.get<carModel>(
      `${AdminPanelServiceEndpoints.carModels}/${id}`
    );
  }

  getAllManufacturers(pageParams: pagination) {
    let params = new HttpParams()
      .set(paginationKeys.page, pageParams.currentPage)
      .set(paginationKeys.pageSize, pageParams.pageSize);

    return this.http.get<manufacturerModel[]>(
      AdminPanelServiceEndpoints.manufacturers,
      {
        observe: 'response',
        headers: { Accept: 'application/json' },
        params: params,
      }
    );
  }

  getManufacturerById(id: string) {
    return this.http.get<manufacturerModel>(
      `${AdminPanelServiceEndpoints.manufacturers}/${id}`
    );
  }

  getAllVehicles(pageParams: pagination) {
    let params = new HttpParams()
      .set(paginationKeys.page, pageParams.currentPage)
      .set(paginationKeys.pageSize, pageParams.pageSize);

    return this.http.get<vehicleModel[]>(AdminPanelServiceEndpoints.vehicles, {
      observe: 'response',
      headers: { Accept: 'application/json' },
      params: params,
    });
  }

  getVehicleById(id: string) {
    return this.http.get<vehicleModel>(
      `${AdminPanelServiceEndpoints.vehicles}/${id}`
    );
  }

  getAllVehicleClientHistories(pageParams: pagination) {
    let params = new HttpParams()
      .set(paginationKeys.page, pageParams.currentPage)
      .set(paginationKeys.pageSize, pageParams.pageSize);

    return this.http.get<vehicleClientHistoryModel[]>(
      AdminPanelServiceEndpoints.historyOfUse,
      {
        observe: 'response',
        headers: { Accept: 'application/json' },
        params: params,
      }
    );
  }

  getVehicleClientHistoryById(id: string) {
    return this.http.get<vehicleClientHistoryModel>(
      `${AdminPanelServiceEndpoints.historyOfUse}/${id}`
    );
  }

  getClients(pageParams: pagination) {
    let params = new HttpParams()
      .set(paginationKeys.page, pageParams.currentPage)
      .set(paginationKeys.pageSize, pageParams.pageSize);

    return this.http.get<clientModel[]>(AdminPanelServiceEndpoints.users, {
      observe: 'response',
      headers: { Accept: 'application/json' },
      params: params,
    });
  }

  getClientById(id: string) {
    return this.http.get<clientModel>(
      `${AdminPanelServiceEndpoints.users}/${id}`
    );
  }

  addVehicle(createVehicleModel: createVehicleModel) {
    return this.http.post<createVehicleModel>(
      `${AdminPanelServiceEndpoints.vehicles}`,
      createVehicleModel
    );
  }

  updateVehicle(id: string, createVehicleModel: createVehicleModel) {
    return this.http.put<createVehicleModel>(
      `${AdminPanelServiceEndpoints.vehicles}/${id}`,
      createVehicleModel
    );
  }

  deleteVehicle(id: string) {
    return this.http.delete(`${AdminPanelServiceEndpoints.vehicles}/${id}`);
  }

  addVehicleClientHistory(
    createVehicleClientHistoryModel: createVehicleClientHistoryModel
  ) {
    let createVehicleClientHistoryApiModel: createVehicleClientHistoryApiModel =
      {
        clientId: createVehicleClientHistoryModel.clientId,
        vehicleId: createVehicleClientHistoryModel.vehicleId,

        startDate: createVehicleClientHistoryModel.startDate.toJSON(),
        endDate: createVehicleClientHistoryModel.endDate.toJSON(),
      };

      console.log('in service');
      console.log(createVehicleClientHistoryApiModel);

    return this.http.post<createVehicleClientHistoryApiModel>(
      `${AdminPanelServiceEndpoints.historyOfUse}`,
      createVehicleClientHistoryApiModel
    );
  }

  updateVehicleClientHistory(
    id: string,
    createVehicleClientHistoryModel: createVehicleClientHistoryModel
  ) {
    let createVehicleClientHistoryApiModel: createVehicleClientHistoryApiModel =
      {
        clientId: createVehicleClientHistoryModel.clientId,
        vehicleId: createVehicleClientHistoryModel.vehicleId,

        startDate: createVehicleClientHistoryModel.startDate.toJSON(),
        endDate: createVehicleClientHistoryModel.endDate.toJSON(),
      };

    return this.http.put<createVehicleClientHistoryApiModel>(
      `${AdminPanelServiceEndpoints.historyOfUse}/${id}`,
      createVehicleClientHistoryApiModel
    );
  }

  deleteVehicleClientHistory(id: string) {
    return this.http.delete(`${AdminPanelServiceEndpoints.historyOfUse}/${id}`);
  }
}
