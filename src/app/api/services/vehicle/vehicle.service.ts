import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import pagination from '../../models/pagination';
import { paginationKeys } from '../../constants/paramKeys';
import vehicleModel from '../../models/apiModels/vehicleModel';
import { catalogServiceEndpoints } from '../../constants/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  getAll(pageParams: pagination) {
    let params = new HttpParams()
      .set(paginationKeys.page, pageParams.currentPage)
      .set(paginationKeys.pageSize, pageParams.pageSize);

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
