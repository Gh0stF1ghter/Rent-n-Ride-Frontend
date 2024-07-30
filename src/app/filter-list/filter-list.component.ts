import { Component, EventEmitter, OnInit, output, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import manufacturerModel from '../api/models/apiModels/manufacturerModel';
import { ManufacturerService } from '../api/services/manufacturer/manufacturer.service';
import pagination from '../api/models/pagination';
import { AsyncPipe, CommonModule } from '@angular/common';
import carModel from '../api/models/apiModels/carModel';
import { CarModelService } from '../api/services/car-model/car-model.service';

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRippleModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss',
})
export class FilterListComponent implements OnInit {
  ngOnInit(): void {
    this.getManufacturers();
  }

  @Output() onFilterUpdated = new EventEmitter<any>();

  formGroup = new FormGroup({
    manufacturerControl: new FormControl(),
    carModelControl: new FormControl(),
  });

  manufacturers: manufacturerModel[] = [];
  selectedManufacturer: manufacturerModel | undefined;

  carModels: carModel[] = [];
  selectedCarModel: carModel | undefined;

  @Output() onCarModelSelected = new EventEmitter<string>();

  constructor(
    private manufacturerService: ManufacturerService,
    private carModelService: CarModelService
  ) {}

  getManufacturers() {
    let pagination: pagination = {
      pageSize: 100,
      currentPage: 1,
    };

    this.manufacturerService.getAll(pagination).subscribe((response) => {
      if (response.body) {
        this.manufacturers = response.body;
      }
    });

    this.formGroup.get('carModelControl')?.disable();
  }

  getManufacturer(id: string) {
    this.manufacturerService.getById(id).subscribe((manufacturer) => {
      this.selectedManufacturer = manufacturer;
      console.log(manufacturer);

      this.carModels = manufacturer.carModels;
      this.formGroup.get('carModelControl')?.enable();
    });
  }

  getCarModel(id: string) {
    this.carModelService.getById(id).subscribe((carModel) => {
      this.selectedCarModel = carModel;
      console.log(this.selectedCarModel);

      if (this.selectedCarModel) {
        this.onCarModelSelected.emit(this.selectedCarModel.id);
      }
    });
  }
  //Implement logstash debouncer
}
