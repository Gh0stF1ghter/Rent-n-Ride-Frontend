import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import pagination from '../../models/pagination';
import { filterKeys, paginationKeys } from '../../constants/paramKeys';
import vehicleModel from '../../models/apiModels/vehicleModel';
import { catalogServiceEndpoints } from '../../constants/environment';
import filterParams from '../../models/filterParams';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  getAll(pageParams: pagination, filterParams: filterParams) {
    let params = new HttpParams()
      .set(paginationKeys.page, pageParams.currentPage)
      .set(paginationKeys.pageSize, pageParams.pageSize)

      if(filterParams.carModelId) {
        params = params.set(filterKeys.carModelId, filterParams.carModelId);
      }

      return this.http.get<vehicleModel[]>(catalogServiceEndpoints.vehicles, {
        observe: 'response',
        headers: { Accept: 'application/json' },
        params: params
      })
  }

  getById(id: string) {
    return this.http.get<vehicleModel>(`${catalogServiceEndpoints.vehicles}/${id}`)
  }
}
