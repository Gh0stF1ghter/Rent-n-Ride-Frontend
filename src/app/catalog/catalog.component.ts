import { Component, OnInit } from '@angular/core';
import { FilterListComponent } from '../filter-list/filter-list.component';
import { SortFieldComponent } from '../sort-field/sort-field.component';
import { CarBoxComponent } from '../car-box/car-box.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import vehicleModel from '../api/models/apiModels/vehicleModel';
import { VehicleService } from '../api/services/vehicle/vehicle.service';
import pagination from '../api/models/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { sort } from '../api/models/enums/sort';
import filterParams from '../api/models/filterParams';
import { fuelType } from '../api/models/apiModels/enums/fuelType';
import { vehicleState } from '../api/models/apiModels/enums/vehicleState';
import { vehicleType } from '../api/models/apiModels/enums/vehicleType';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    FilterListComponent,
    SortFieldComponent,
    CarBoxComponent,
    MatPaginatorModule,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  ngOnInit(): void {
    let routeParams = this.route.queryParams;

    routeParams.subscribe((params) => {
      const routePages: pagination = {
        currentPage: params['currentPage'],
        pageSize: params['pageSize'],
      };

      const filterParams: filterParams = {
        carModelId: params['carModel'],
        fuelType: params['fuelType'],
        vehicleState: params['vehicleState'],
        vehicleType: params['vehicleType']
      }

      console.log('car model' + filterParams.carModelId);
      if(filterParams.carModelId) {
        this.filterParams.carModelId = filterParams.carModelId;
      }

      console.log(
        'Current pages ' + routePages.currentPage + ' ' + routePages.pageSize
      );

      if (routePages.currentPage && routePages.pageSize) {
        this.currentPageSize = routePages.pageSize;
        this.pageIndex = routePages.currentPage - 1;

        this.getVehicles(routePages, filterParams);
      } else {
        this.getVehicles(this.pagination, filterParams);
      }
    });
  }

  vehicles: vehicleModel[] = [];

  currentPageSize = 10;
  pageSizeOptions = [10, 20, 100];
  pageIndex = 0;

  pagination: pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  filterParams: filterParams = {
    carModelId: '',
    vehicleState: undefined,
    fuelType: undefined,
    vehicleType: undefined
  }

  pageEvent: PageEvent = new PageEvent();

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.currentPageSize = e.pageSize;

    this.pagination.currentPage = e.pageIndex + 1;
    this.pagination.pageSize = this.currentPageSize;

    this.router.navigate([], {
      queryParams: this.pagination,
      queryParamsHandling: 'merge',
    });
  }

  getVehicles(pages: pagination, filterParams: filterParams) {
    this.vehicleService.getAll(pages, filterParams).subscribe((response) => {
      if (response.body) {
        this.vehicles = response.body;
        console.log(this.vehicles);
      }
    });
  }

  sortVehicles(sortBy: sort) {
    switch (sortBy) {
      case sort.name: {
        this.vehicles.sort((a, b) => {
          if (a.carModel && b.carModel) {
            return a.carModel?.name.localeCompare(b.carModel?.name);
          }

          return 0;
        });

        break;
      }

      case sort.odo: {
        this.vehicles.sort((a, b) => a.odo - b.odo);

        break;
      }

      case sort.cost: {
        this.vehicles.sort((a, b) => a.rentCost - b.rentCost);

        break;
      }
    }
  }

  reverse() {
    this.vehicles.reverse();
  }

  filterByCarModel(carModelId: string) {
      console.log(carModelId);

      this.router.navigate([], {
        queryParams: { carModel: carModelId },
      });  
    }

  filterByFuelType(filterFuelType: fuelType) {
    console.log('fuelType ' + filterFuelType);
    
      this.router.navigate([], {queryParams: {fuelType: filterFuelType}, queryParamsHandling: 'merge'})
  }

  filterByVehicleState(filterVehicleState: vehicleState) {
    console.log('vehiclestate ' + filterVehicleState);
    
    this.router.navigate([], {queryParams: {vehicleState: filterVehicleState}, queryParamsHandling: 'merge'})
  }

  filterByVehicleType(filterVehicleType: vehicleType) {
    console.log('vehicletype ' + filterVehicleType);
    
    this.router.navigate([], {queryParams: {vehicleType: filterVehicleType}, queryParamsHandling: 'merge'})
  }
}
