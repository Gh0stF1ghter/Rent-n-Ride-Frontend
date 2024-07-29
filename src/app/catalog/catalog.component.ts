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
