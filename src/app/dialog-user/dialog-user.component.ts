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
}
