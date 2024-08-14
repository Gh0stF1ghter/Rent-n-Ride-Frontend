import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import vehicleModel from '../api/models/apiModels/vehicleModel';
import clientModel from '../api/models/apiModels/clientModel';
import { MatDatepickerModule } from '@angular/material/datepicker';
import rentDialogData from '../api/models/rentDialogData';
import createVehicleClientHistoryModel from '../api/models/createModels/createVehicleClientHistoryModel';

@Component({
  selector: 'app-dialog-rent',
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
    MatDatepickerModule,
  ],
  templateUrl: './dialog-rent.component.html',
  styleUrl: './dialog-rent.component.scss',
})
export class DialogRentComponent implements OnInit {
  dialogref = inject(
    MatDialogRef<DialogRentComponent, createVehicleClientHistoryModel>
  );
  data = inject<rentDialogData>(MAT_DIALOG_DATA);

  formBuilder = inject(FormBuilder);

  vehicles: vehicleModel[] = [];
  clients: clientModel[] = [];

  formGroup = this.formBuilder.group({
    clientId: new FormControl(
      this.data.vehicleClientHistoryToEdit?.clientId ?? '',
      [Validators.required]
    ),
    vehicleId: new FormControl(
      this.data.vehicleClientHistoryToEdit?.vehicleId ?? '',
      [Validators.required]
    ),
    startDate: new FormControl(
      new Date(this.data.vehicleClientHistoryToEdit?.startDate ?? new Date())
    ),
    endDate: new FormControl(
      new Date(this.data.vehicleClientHistoryToEdit?.endDate ?? new Date()),
      [Validators.required]
    ),
  });

  startDateConstraint =
    this.formGroup.value.startDate?.getDate() ?? new Date().getDate();

  changeEndDate() {
    if (this.formGroup.value.startDate && this.formGroup.value.endDate) {
      if (this.formGroup.value.startDate >= this.formGroup.value.endDate) {
        const startDateCopy = new Date(this.formGroup.value.startDate);

        this.formGroup.controls.endDate.setValue(
          new Date(startDateCopy.setHours(+24))
        );
      }
    }
  }

  startDateFilter = (d: Date | null): boolean => {
    const startDate = (d || new Date()).getDate();

    return startDate >= this.startDateConstraint;
  };

  endDateFilter = (d: Date | null): boolean => {
    const endDate = (d || new Date()).getDate();

    const currentStartDate =
      this.formGroup.value.startDate?.getDate() || new Date().getDate();

    return endDate > currentStartDate;
  };

  constructor() {
    if (this.data.clients && this.data.vehicles) {
      this.vehicles = this.data.vehicles;
      this.clients = this.data.clients;
    }
  }

  ngOnInit(): void {
    this.changeEndDate()
  }

  closeDialog() {
    console.log('unsaved rent session');
    console.log(this.data);

    this.dialogref.close();
  }

  createVehicleClientHistory() {
    if (this.formGroup.valid) {
      const formValues = this.formGroup.value;

      if (
        formValues.clientId &&
        formValues.vehicleId &&
        formValues.startDate &&
        formValues.endDate
      ) {
        let vehicleClientHistory: createVehicleClientHistoryModel = {
          clientId: formValues.clientId,
          vehicleId: formValues.vehicleId,

          startDate: formValues.startDate,
          endDate: formValues.endDate,
        };
        
        this.dialogref.close(vehicleClientHistory);
      }
    }
  }
}
