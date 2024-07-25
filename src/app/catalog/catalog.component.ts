import { Component } from '@angular/core';
import { FilterListComponent } from "../filter-list/filter-list.component";
import { SortFieldComponent } from "../sort-field/sort-field.component";
import { CarBoxComponent } from "../car-box/car-box.component";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [FilterListComponent, SortFieldComponent, CarBoxComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {

}
