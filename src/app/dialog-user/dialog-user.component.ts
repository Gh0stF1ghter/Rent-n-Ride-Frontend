import { Component, inject } from '@angular/core';
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
import createUserApiModel from '../api/models/apiModels/apiCreateModels/createUserApiModel';
import clientModel from '../api/models/apiModels/clientModel';
import updateUserApiModel from '../api/models/apiModels/apiUpdateModels/updateUserApiModel';

@Component({
  selector: 'app-dialog-user',
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
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.scss',
})
export class DialogUserComponent {
  dialogRef = inject(MatDialogRef<DialogUserComponent, createUserApiModel>);
  data = inject<clientModel>(MAT_DIALOG_DATA);

  formbuilder = inject(FormBuilder);

  formGroup = this.formbuilder.group({
    firstName: new FormControl(this.data?.firstName ?? '', Validators.required),
    lastName: new FormControl(this.data?.lastName ?? '', Validators.required),
    email: new FormControl(this.data?.email ?? '', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
        )
      ),
    ]),
    balance: new FormControl(this.data?.balance ?? 0, Validators.min(0)),
    isRenting: new FormControl(this.data?.isRenting ?? false),
  });

  constructor() {
    if (this.data) {
      this.formGroup.controls.firstName.disable();
      this.formGroup.controls.lastName.disable();
      this.formGroup.controls.email.disable();
      this.formGroup.controls.password.clearValidators()
      this.formGroup.controls.password.disable()
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createUser() {
    if (this.formGroup.valid) {
      const formValues = this.formGroup.value;

      let user: createUserApiModel = {
        firstName: formValues.firstName || '',
        lastName: formValues.lastName || '',
        email: formValues.email || '',
        password: formValues.password || '',
        balance: formValues.balance || 0,
        isRenting: formValues.isRenting || false,
      };

      this.dialogRef.close(user);
    }
  }
  updateUser() {
    if(this.formGroup.valid) {
      const formValues = this.formGroup.value;

      let user: updateUserApiModel = {
        balance: formValues.balance || 0,
        isRenting: formValues.isRenting || false
      }

      this.dialogRef.close(user);
    }
  }
}
