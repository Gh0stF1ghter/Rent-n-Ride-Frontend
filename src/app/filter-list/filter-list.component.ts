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
import { AsyncPipe } from '@angular/common';
import carModel from '../api/models/apiModels/carModel';
import { CarModelService } from '../api/services/car-model/car-model.service';
import { MatRadioModule } from '@angular/material/radio';
import { fuelType } from '../api/models/apiModels/enums/fuelType';
import { vehicleState } from '../api/models/apiModels/enums/vehicleState';
import { vehicleType } from '../api/models/apiModels/enums/vehicleType';

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
    MatRadioModule,
  ],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss',
})
export class FilterListComponent implements OnInit {
  constructor(
    private manufacturerService: ManufacturerService,
    private carModelService: CarModelService
  ) {}

  ngOnInit(): void {
    this.getManufacturers();
  }

  manufacturers: manufacturerModel[] = [];
  selectedManufacturer: manufacturerModel | undefined;

  carModels: carModel[] = [];
  selectedCarModel: carModel | undefined;

  formGroup = new FormGroup({
    manufacturerControl: new FormControl(),
    carModelControl: new FormControl(),
  });

  fuelTypes = [
    { value: undefined, name: 'none' },
    { value: fuelType.gasoline, name: 'gasoline' },
    { value: fuelType.diesel, name: 'diesel' },
    { value: fuelType.electro, name: 'electro' },
  ];

  vehicleStates = [
    {value: undefined, name: 'none'},
    {value: vehicleState.new, name: 'new'},
    {value: vehicleState.used, name: 'used'},
    {value: vehicleState.crashed, name: 'crashed'},
  ];

  vehicleTypes = [
    {value: undefined, name: 'none'},
    {value: vehicleType.light, name: 'light'},
    {value: vehicleType.motorcycle, name: 'motorcycle'},
    {value: vehicleType.sport, name: 'sport'},
    {value: vehicleType.suv, name: 'suv'},
    {value: vehicleType.truck, name: 'truck'},
  ]

  @Output() onFilterUpdated = new EventEmitter<any>();
  @Output() onCarModelSelected = new EventEmitter<string>();

  @Output() onFuelTypeSelected = new EventEmitter<fuelType>();
  @Output() onVehicleStateSelected = new EventEmitter<vehicleState>();
  @Output() onVehicleTypeSelected = new EventEmitter<vehicleType>();

  getFuelType(fuelType: fuelType | undefined) {
    this.onFuelTypeSelected.emit(fuelType);
  }

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
