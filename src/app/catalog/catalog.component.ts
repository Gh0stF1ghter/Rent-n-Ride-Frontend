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

      console.log(
        'Current pages ' + routePages.currentPage + ' ' + routePages.pageSize
      );

      if (routePages.currentPage && routePages.pageSize) {
        this.currentPageSize = routePages.pageSize;
        this.pageIndex = routePages.currentPage - 1;

        this.getVehicles(routePages);
      } else {
        this.router.navigate([], { queryParams: this.pagination });
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

    this.router.navigate([], { queryParams: this.pagination });
  }

  getVehicles(pages: pagination) {
    this.vehicleService.getAll(pages).subscribe((response) => {
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
        this.vehicles.sort((a,b) => a.odo - b.odo)        
        
        break;
      }

      case sort.cost: {
        this.vehicles.sort((a, b) => a.rentCost - b.rentCost);
  
        break;
      }
    }
  }

  reverse() {
    this.vehicles.reverse()
  }
}
