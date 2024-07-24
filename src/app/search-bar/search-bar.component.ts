import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    MatInputModule,
    FormsModule,
    MatSuffix,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  value = '';
}
