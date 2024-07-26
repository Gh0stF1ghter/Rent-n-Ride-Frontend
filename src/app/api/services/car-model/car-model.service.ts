import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { paginationKeys } from '../../constants/paramKeys';
import pagination from '../../models/pagination';
import carModel from '../../models/apiModels/carModel';
import { catalogServiceEndpoints } from '../../constants/environment';
import manufacturerModel from '../../models/apiModels/manufacturerModel';

@Injectable({
  providedIn: 'root',
})
export class CarModelService {
  constructor(private http: HttpClient) {}

  getAll(pageParams: pagination) {
    let params = new HttpParams()
      .set(paginationKeys.page, pageParams.page)
      .set(paginationKeys.pageSize, pageParams.pageSize);

      return this.http.get<carModel[]>(catalogServiceEndpoints.carModels, {
        observe: 'response',
        headers: { Accept: 'application/json' },
        params: params
      })
  }

  getById(id: string) {
    return this.http.get<carModel>(`${catalogServiceEndpoints.carModels}/${id}`)
  }
}
