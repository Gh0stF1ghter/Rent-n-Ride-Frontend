import { Component, inject, } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import createVehicleModel from '../api/models/apiModels/apiCreateModels/createVehicleModel';
import { MatInputModule } from '@angular/material/input';
import manufacturerModel from '../api/models/apiModels/manufacturerModel';
import carModel from '../api/models/apiModels/carModel';
import {
  FuelTypeNames,
  vehicleStateNames,
  vehicleTypeNames,
} from '../api/models/enums/apiEnumsNaming';
import pagination from '../api/models/pagination';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { fuelType } from '../api/models/apiModels/enums/fuelType';
import { vehicleType } from '../api/models/apiModels/enums/vehicleType';
import { vehicleState } from '../api/models/apiModels/enums/vehicleState';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import vehicleModel from '../api/models/apiModels/vehicleModel';
import { ManufacturerService } from '../api/services/manufacturer/manufacturer.service';

@Component({
  selector: 'app-dialog-vehicle',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatDialogContent,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './dialog-vehicle.component.html',
  styleUrl: './dialog-vehicle.component.scss',
})
export class DialogVehicleComponent {
  dialogref = inject(MatDialogRef<DialogVehicleComponent, createVehicleModel>);
  data? = inject<vehicleModel>(MAT_DIALOG_DATA);

  formBuilder = inject(FormBuilder);

  manufacturers: manufacturerModel[] = [];
  selectedManufacturer: manufacturerModel | undefined;
  selectedManufacturerId: string = '';

  carModels: carModel[] = [];

  fuelTypes = FuelTypeNames;
  vehicleStates = vehicleStateNames;
  vehicleTypes = vehicleTypeNames;

  formGroup = this.formBuilder.group({
    manufacturerControl: new FormControl(
      this.data?.carModel?.manufacturer?.id ?? '', Validators.required
    ),
    carModelId: new FormControl(
      this.data?.carModel?.id ?? '',
      Validators.required
    ),
    plateNumber: new FormControl(
      this.data?.plateNumber ?? '',
      Validators.minLength(1)
    ),
    odo: new FormControl(this.data?.odo ?? 0, Validators.min(0)),
    rentCost: new FormControl(this.data?.rentCost ?? 0, Validators.min(0)),
    isRented: new FormControl(
      this.data?.isRented ?? false,
      Validators.required
    ),
    fuelType: new FormControl(
      this.data?.fuelType ?? fuelType.none,
      Validators.required
    ),
    vehicleType: new FormControl(
      this.data?.vehicleType ?? vehicleType.none,
      Validators.required
    ),
    vehicleState: new FormControl(
      this.data?.vehicleState ?? vehicleState.none,
      Validators.required
    ),
  });

  constructor(private manufacturerService: ManufacturerService) {
    this.getManufacturers();

    if (this.data?.carModel) {
      let manufacturerId = this.data.carModel.manufacturer?.id;

      this.getManufacturer(manufacturerId);
    } else {
      this.formGroup.get('carModelId')?.disable();
    }
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
  }

  getManufacturer(id: string | null | undefined) {
    if (id) {
      this.manufacturerService.getById(id).subscribe((manufacturer) => {
        this.selectedManufacturer = manufacturer;

        this.carModels = manufacturer.carModels;
        this.formGroup.get('carModelId')?.enable();
      });
    }
  }

  closeDialog() {
    console.log('Unsaved vehicle in dialog');
    console.log(this.data);

    this.dialogref.close();
  }

  createVehicle() {
    if (this.formGroup.valid) {
      const formValues = this.formGroup.value;

      if (formValues.carModelId) {
        let vehicle: createVehicleModel = {
          plateNumber: formValues.plateNumber || '',
          odo: formValues.odo || 0,
          rentCost: formValues.rentCost || 0,
          isRented: formValues.isRented || false,
          vehicleType: formValues.vehicleType || vehicleType.none,
          vehicleState: formValues.vehicleState || vehicleState.none,
          fuelType: formValues.fuelType || fuelType.none,
          carModelId: formValues.carModelId,
        };

        this.dialogref.close(vehicle);
      }
    }
  }
}
