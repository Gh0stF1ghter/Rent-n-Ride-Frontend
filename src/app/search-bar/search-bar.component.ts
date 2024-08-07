import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  MatFormField,
  MatInput,
  MatInputModule,
  MatSuffix,
} from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatSuffix,
    MatIconModule,
    MatFormFieldModule,
    MatRippleModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent {
  value = '';
}
